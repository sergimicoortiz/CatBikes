from django.contrib import admin
from .models import Incident, Notification

admin.site.register(Incident)
admin.site.register(Notification)
