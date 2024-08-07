from dj_rest_auth import urls as dj_rest_auth_urls
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from pwdmgr.api import CategoryViewSet, PasswordViewSet, UserRegistrationViewSet

router = routers.DefaultRouter() if settings.DEBUG else routers.SimpleRouter()

router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"passwords", PasswordViewSet, basename="password")
router.register(r"auth/register", UserRegistrationViewSet, basename="register")

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("api/v1/auth/", include(dj_rest_auth_urls)),
    path("admin/", admin.site.urls),
]
