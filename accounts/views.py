import datetime
from os import stat
from wsgiref.util import request_uri
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from calendar import monthrange
from dateutil.relativedelta import relativedelta



@api_view(['GET'])
def getAllUsers(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = User.objects.all()
        print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",queryset)

        user_serial = UserSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=user_serial.data)
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

