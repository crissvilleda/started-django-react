# rest framework
from rest_framework import serializers

# models
from api.models import User

class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'read_only': True}}


class UserReadSerializer(serializers.ModelSerializer):

   
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'birthday',
            'gender',
            'status',
            'email',
            'telephone',
            'has_temp_pwd'
        )