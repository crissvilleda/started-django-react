
# Rest framework
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

# Django
from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db import transaction


# JWt Token
from rest_framework_simplejwt.tokens import RefreshToken

# Model
from api.models import User
from api.serializers import (UserSerializer, UserReadSerializer, UserBaseSerializer)

#utils
from api.utils.emails import send_mail_password_recovery, send_mail_admins_new_user, send_mail_active_account
from api.utils.generators import generate_temporary_password
from api.utils.emails import send_mail_temporary_password

# Others
from datetime import timedelta
import json
import jwt

# Permissions
# from api.permissions import UserPermissions

# copy
import copy


def userExists(username):
    """verified if user exists"""
    if username.isspace():
        raise ValidationError('El nombre de usuario está en blanco')

    if User.objects.filter(username=username.strip()).exists():
        message = {'detail': 'El nombre de usuario ya existe.'}
        raise ValidationError(message)


def validatePassword(value):
    """Valid that the password comes in the correct format"""
    import re
    compile_regex = re.compile(
        r'^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,}$')
    if not compile_regex.match(value):
        message = {
            'detail': 'La contraseña debe contener al menos 6 caracteres alfanuméricos(letras y números), un carácter especial y un numero.'}
        raise ValidationError(message)


def generate_jwt_token(user):
    """Function to generate password change token"""
    exp_date = timezone.now() + timedelta(hours=6)
    payload = {
        'username': user.username,
        'exp': int(exp_date.timestamp()),
        'type': 'password_recovery'
    }
    token = jwt.encode(payload, settings.SECRET_KEY +
                       str(user.password), algorithm='HS256')
    return token


def decode_jwt_token(username, token):
    try:
        user = User.objects.filter(username=username).last()
        last_password = str(user.password) if user else ""
        payload = jwt.decode(token, settings.SECRET_KEY +
                             last_password, algorithms=['HS256'])
        if payload['type'] != 'password_recovery':
            message = {'detail': ('Link invalido')}
            raise ValidationError(message)
        if payload['username'] != username:
            message = {'detail': ('Link invalido')}
            raise ValidationError(message)

        return payload
    except jwt.ExpiredSignatureError:
        message = {'detail': (
            'El enlace de recuperación de contraseña ha expirado')}
        raise ValidationError(message)
    except jwt.PyJWTError:
        message = {'detail': ('Link invalido')}
        raise ValidationError(message)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "email")
    search_fields = ("username", "first_name", "last_name", "email")
    ordering_fields = ("username", "first_name", "last_name", "email")


    def get_serializer_class(self):
        """Define serializer for API"""
        async_options = self.request.query_params.get('async_options', False)

        if async_options:
            return UserBaseSerializer
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permissions for resources """

        if self.action in ["login", "logout", "password_recovery", "validate_token", "update_password"]:
            permission_classes = [AllowAny]
        elif self.action == "create" and self.request.user.id is None:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        data = request.data

        # Validamos usuario
        userExists(data.get('username', None))

        with transaction.atomic():
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            user_password = data.get('password', None)
            if user_password is None:
                temp_pwd = generate_temporary_password()
                user.set_password(temp_pwd)
                user.has_temp_pwd = True
                user.save()
                send_mail_temporary_password(
                    user, temp_pwd, data.get('email', None))
            else:
                validatePassword(data.get('password', ''))
                user.set_password(data.get("password", ''))
                user.status = User.PENDING
                user.save()

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        data = request.data
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        copy_user = copy.deepcopy(instance)

        with transaction.atomic():
            serializer = self.get_serializer(
                instance, data=data, partial=partial)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            # The status of the user has change, and we send a mail to let her/him know
            if copy_user.status in [User.PENDING, User.INACTIVE] and user.status == User.ACTIVE:
                send_mail_active_account(user)

            return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance).data

        return Response(serializer)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def login(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            if user.check_password(data["password"]):
                if user.status == User.PENDING:
                    return Response({"detail": "Su cuenta aun no ha sido aprobada por los administradores"},
                                    status=status.HTTP_400_BAD_REQUEST)
                elif user.status == User.INACTIVE:
                    return Response({"detail": "Su cuenta ha sido desactivada por los administradores"},
                                    status=status.HTTP_400_BAD_REQUEST)

                refresh_token = RefreshToken.for_user(user)
                serializer = UserReadSerializer(user)
                response = Response(serializer.data, status=status.HTTP_200_OK)
                response.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value=refresh_token.access_token,
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
                return response

            return Response({"detail": "Contraseña incorrecta"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no existe"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(key=settings.SIMPLE_JWT['AUTH_COOKIE'])
        return response

    @action(detail=False, methods=['post'])
    def password_recovery(self, request):
        data = request.data
        try:
            user = User.objects.get(username=data.get(
                'username', None), active=True)
            token = generate_jwt_token(user)
            send_mail_password_recovery(user, token)
            return Response(status=status.HTTP_200_OK)
        except User.DoesNotExist as e:
            return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def validate_token(self, request):
        data = request.data
        username = data.get('username', None)
        token = data.get('token', None)
        decode_jwt_token(username, token)
        message = {'detail': 'Token valido'}
        return Response(data=message, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def update_password(self, request):
        """Update password for not authenticated user, must come with a jwt token"""
        data = request.data
        username = data.get('username', None)
        token = data.get('token', None)
        payload = decode_jwt_token(username, token)
        user = User.objects.get(username=payload['username'])
        validatePassword(data.get('password', ''))
        user.set_password(data.get('password', ''))
        user.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def update_password_auth(self, request):
        """ Update the password for authenticated user """
        data = request.data
        user = self.request.user
        validatePassword(data.get('password', ''))
        user.set_password(data.get('password', ''))
        user.has_temp_pwd = False
        user.save()
        return Response(status=status.HTTP_200_OK)


    @action(detail=True, methods=['post'])
    def restore_pwd(self, request, *args, **kwargs):
        user = self.get_object()
        temp_pwd = generate_temporary_password()
        user.set_password(temp_pwd)
        user.has_temp_pwd = True
        user.save()
        send_mail_temporary_password(user, temp_pwd)
        return Response()
