

from django.urls import path, include

from .views import *
from accounts import views

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/users/get_all_users/', views.getAllUsers),
]