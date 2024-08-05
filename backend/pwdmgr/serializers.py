from rest_framework import serializers

from pwdmgr.models import Category, Password


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class PasswordSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

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
