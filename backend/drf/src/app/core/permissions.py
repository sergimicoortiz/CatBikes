from rest_framework import permissions
from src.app.user.models import User


class IsAdmin(permissions.BasePermission):
    message = "You are not an admin"

    def has_permission(self, request, view):
        try:
            user = User.objects.get(username=request.user)
            return user.types == "admin"
        except:
            return False
