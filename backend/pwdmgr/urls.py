from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from pwdmgr.api import CategoryViewSet, PasswordViewSet

router = routers.SimpleRouter()

router.register(r"categories", CategoryViewSet)
router.register(r"passwords", PasswordViewSet)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("admin/", admin.site.urls),
]
