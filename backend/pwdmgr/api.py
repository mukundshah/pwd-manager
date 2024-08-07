from rest_framework import permissions, viewsets
from rest_framework.response import Response

from pwdmgr.models import Category, Password
from pwdmgr.serializers import (
    CategorySerializer,
    PasswordSerializer,
    UserRegistrationSerializer,
)


class UserRegistrationViewSet(viewsets.ViewSet):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create(request)
        return Response({"email": user.email, "username": user.username})


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PasswordViewSet(viewsets.ModelViewSet):
    queryset = Password.objects.all()
    serializer_class = PasswordSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
