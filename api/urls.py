from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import viewsets

router = DefaultRouter()
router.register(r'user', viewsets.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]