
# Django
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils import timezone 

# Models
from api.models import BaseModel


class CustomUserManager(UserManager):

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError('Email is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)
    
class User(BaseModel, AbstractUser):
    """ Model for the handling of all users of the application """

    OTHER = 0
    MALE = 1
    FEMALE = 2

    GENDERS = (
        (MALE, 'Hombre'),
        (FEMALE, 'Mujer'),
        (OTHER, 'Otro'),
    )

    # Status
    ACTIVE = 1
    PENDING = 2
    INACTIVE = 3

    TYPE_STATUS = (
        (ACTIVE, 'Activo'),
        (PENDING, 'Por activar'),
        (INACTIVE, 'Inactivo'),
    )

    birthday = models.DateField()
    gender = models.PositiveSmallIntegerField(choices=GENDERS)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    status = models.PositiveIntegerField(choices=TYPE_STATUS, default=PENDING)

    # To determinate if the user has a temporary password
    has_temp_pwd = models.BooleanField(default=False)

    # Overring the default manager
    objects = CustomUserManager()


    def __unicode__(self):
        return self.user.username

    def delete(self, *args):
        delete_username =f"{self.username}-{timezone.now()}"
        self.username = delete_username[:150]
        self.active = False
        self.save()
        return True

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)