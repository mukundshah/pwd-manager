import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from pwdmgr.models import Category, Password


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return User.objects.create_user(username="testuser", password="testpass")


@pytest.fixture
def category():
    return Category.objects.create(name="Test Category", slug="test-category")


@pytest.fixture
def password(user, category):
    return Password.objects.create(
        website_name="Test Website",
        password="testpass123",
        category=category,
        user=user,
    )


@pytest.mark.django_db
class TestCategoryViewSet:
    def test_list_categories(self, api_client, user, category):
        api_client.force_authenticate(user=user)
        url = reverse("category-list")
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["name"] == "Test Category"

    def test_create_category(self, api_client, user):
        api_client.force_authenticate(user=user)
        url = reverse("category-list")
        data = {"name": "New Category", "slug": "new-category"}
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Category.objects.count() == 1
        assert Category.objects.first().name == "New Category"

    def test_retrieve_category(self, api_client, user, category):
        api_client.force_authenticate(user=user)
        url = reverse("category-detail", kwargs={"pk": category.pk})
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == "Test Category"

    def test_update_category(self, api_client, user, category):
        api_client.force_authenticate(user=user)
        url = reverse("category-detail", kwargs={"pk": category.pk})
        data = {"name": "Updated Category", "slug": "updated-category"}
        response = api_client.put(url, data)
        assert response.status_code == status.HTTP_200_OK
        category.refresh_from_db()
        assert category.name == "Updated Category"

    def test_delete_category(self, api_client, user, category):
        api_client.force_authenticate(user=user)
        url = reverse("category-detail", kwargs={"pk": category.pk})
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Category.objects.count() == 0


@pytest.mark.django_db
class TestPasswordViewSet:
    def test_list_passwords(self, api_client, user, password):
        api_client.force_authenticate(user=user)
        url = reverse("password-list")
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["website_name"] == "Test Website"

    def test_create_password(self, api_client, user, category):
        api_client.force_authenticate(user=user)
        url = reverse("password-list")
        data = {
            "website_name": "New Website",
            "password": "newpass123",
            "category": category.pk,
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Password.objects.count() == 1
        assert Password.objects.first().website_name == "New Website"
        assert Password.objects.first().user == user

    def test_retrieve_password(self, api_client, user, password):
        api_client.force_authenticate(user=user)
        url = reverse("password-detail", kwargs={"pk": password.pk})
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["website_name"] == "Test Website"

    def test_update_password(self, api_client, user, password, category):
        api_client.force_authenticate(user=user)
        url = reverse("password-detail", kwargs={"pk": password.pk})
        data = {
            "website_name": "Updated Website",
            "password": "updatedpass123",
            "category": category.pk,
        }
        response = api_client.put(url, data)
        assert response.status_code == status.HTTP_200_OK
        password.refresh_from_db()
        assert password.website_name == "Updated Website"

    def test_delete_password(self, api_client, user, password):
        api_client.force_authenticate(user=user)
        url = reverse("password-detail", kwargs={"pk": password.pk})
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Password.objects.count() == 0

    def test_user_can_only_access_own_passwords(self, api_client, user, password):
        other_user = User.objects.create_user(
            username="otheruser", password="otherpass"
        )
        api_client.force_authenticate(user=other_user)
        url = reverse("password-list")
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 0


@pytest.mark.django_db
class TestURLConfiguration:
    def test_api_urls(self, api_client):
        category_list_url = reverse("category-list")
        password_list_url = reverse("password-list")

        assert category_list_url == "/api/v1/categories/"
        assert password_list_url == "/api/v1/passwords/"

    def test_unauthenticated_access(self, api_client):
        category_url = reverse("category-list")
        password_url = reverse("password-list")

        category_response = api_client.get(category_url)
        password_response = api_client.get(password_url)

        assert category_response.status_code == status.HTTP_403_FORBIDDEN
        assert password_response.status_code == status.HTTP_403_FORBIDDEN
