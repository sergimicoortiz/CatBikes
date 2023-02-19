from django.db import models
from src.app.user.models import User
from src.app.stations.models import Slot


class Incident(models.Model):
    title = models.CharField(max_length=30)
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    status = models.CharField(max_length=100, default="to_do")
    body = models.CharField(max_length=300)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_incident"
    )
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name="slot")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __str__(self):
        return str(self.id)


class Notification(models.Model):
    seen = models.BooleanField(default=False)
    body = models.CharField(max_length=300)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_notification"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, db_index=True)

    def __str__(self):
        return str(self.id)
