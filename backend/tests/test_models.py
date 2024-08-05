import pytest
from django.contrib.auth.models import User
from django.db import IntegrityError

from pwdmgr.models import Category, Password


@pytest.fixture
def user():
    return User.objects.create_user(username="testuser", password="testpassword")


@pytest.fixture
def category():
    return Category.objects.create(name="Test Category", slug="test-category")


@pytest.mark.django_db
class TestCategoryModel:
    def test_category_creation(self, category):
        assert category.name == "Test Category"
        assert category.slug == "test-category"
        assert category.created_at is not None
        assert category.updated_at is not None

    def test_category_str_representation(self, category):
        assert str(category) == "Test Category"

    def test_unique_slug(self, category):
        with pytest.raises(IntegrityError):
            Category.objects.create(name="Another Category", slug="test-category")


@pytest.mark.django_db
class TestPasswordModel:
    @pytest.fixture
    def password(self, user, category):
        return Password.objects.create(
            website_name="Test Website",
            email="test@example.com",
            username="testuser",
            password="securepassword123",
            url="https://example.com",
            category=category,
            user=user,
        )

    def test_password_creation(self, password, user, category):
        assert password.website_name == "Test Website"
        assert password.email == "test@example.com"
        assert password.username == "testuser"
        assert password.password == "securepassword123"
        assert password.url == "https://example.com"
        assert password.category == category
        assert password.user == user
        assert password.created_at is not None
        assert password.updated_at is not None

    def test_password_str_representation(self, password):
        assert str(password) == "Test Website"

    def test_password_optional_fields(self, user, category):
        password = Password.objects.create(
            website_name="Optional Fields Test",
            password="testpass",
            category=category,
            user=user,
        )
        assert password.email is None
        assert password.username is None
        assert password.url is None

    def test_password_foreign_key_cascade(self, user, category, password):
        assert Password.objects.count() == 1
        category.delete()
        assert Password.objects.count() == 0

        new_category = Category.objects.create(name="New Category", slug="new-category")
        _new_password = Password.objects.create(
            website_name="New Website",
            password="newpass",
            category=new_category,
            user=user,
        )
        assert Password.objects.count() == 1
        user.delete()
        assert Password.objects.count() == 0
