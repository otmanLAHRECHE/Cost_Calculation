from dataclasses import fields
from rest_framework import serializers
from .models import *



class UserSerialize(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'type_user', 'last_login', 'date_joined','is_active']