from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Password(models.Model):
    website_name = models.CharField(max_length=255)
    favicon = models.ImageField(upload_to="favicons", blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255)
    url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(
        "auth.User",
        related_name="passwords",
        on_delete=models.CASCADE,
    )

    def clean(self):
        if not self.email and not self.username:
            raise ValueError("Either email or username is required")
        return super().clean()

    def __str__(self):
        return self.website_name
