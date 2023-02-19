from django.db import models
from src.app.user.models import User
from src.app.stations.models import Bike, Slot


class Rent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE, related_name="bike")
    start_slot = models.ForeignKey(
        Slot, on_delete=models.CASCADE, related_name="start_slot"
    )
    end_slot = models.ForeignKey(
        Slot, on_delete=models.CASCADE, null=True, related_name="end_slot"
    )
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.id)
