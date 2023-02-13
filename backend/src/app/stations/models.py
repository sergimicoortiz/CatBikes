from django.db import models


class Station(models.Model):

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    status = models.CharField(max_length=100)
    image = models.CharField(max_length=100)
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return str(self.id)


class Bike(models.Model):
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=200)

    def __str__(self):
        return str(self.id)


class Slot(models.Model):

    station = models.ForeignKey(
        Station, on_delete=models.CASCADE, null=False, related_name="slots")
    bike = models.OneToOneField(
        Bike, on_delete=models.CASCADE, null=True, unique=True, related_name="slots")
    status = models.CharField(max_length=200)

    def __str__(self):
        return str(self.id)