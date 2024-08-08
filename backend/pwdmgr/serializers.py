from cryptography.fernet import Fernet
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers

from pwdmgr.models import Category, Password


class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def save(self, request):
        email = self.validated_data["email"]
        password = self.validated_data["password"]
        username = self.validated_data["username"]
        User.objects.create_user(email=email, username=username, password=password)
        return User.objects.get(email=email)

    def create(self, request):
        user = self.save(request)
        return user

    def update(self, instance, validated_data):
        pass


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class PasswordSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()

    class Meta:
        model = Password
        fields = (
            "id",
            "website_name",
            "email",
            "username",
            "password",
            "url",
            "created_at",
            "updated_at",
            "category",
        )

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        fernet = Fernet(settings.ENCRYPTION_KEY.encode())
        print(representation)
        decrypted_password = fernet.decrypt(
            representation["password"].encode()
        ).decode()
        representation["password"] = decrypted_password
        return representation

    def validate_password(self, value):
        print(value)
        fernet = Fernet(settings.ENCRYPTION_KEY.encode())
        encrypted_password = fernet.encrypt(value.encode()).decode()
        return encrypted_password

    # def create(self, validated_data):
    #     encrypted_password = validated_data.get("password")
    #     hashed_password = bcrypt.hashpw(encrypted_password.encode(), bcrypt.gensalt())
    #     validated_data["password"] = hashed_password.decode()
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     if "password" in validated_data:
    #         encrypted_password = validated_data.get("password")
    #         hashed_password = bcrypt.hashpw(
    #             encrypted_password.encode(), bcrypt.gensalt()
    #         )
    #         validated_data["password"] = hashed_password.decode()
    #     return super().update(instance, validated_data)
