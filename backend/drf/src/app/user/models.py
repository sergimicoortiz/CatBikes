from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.conf import settings
import jwt
from datetime import datetime, timedelta


class UserManager(BaseUserManager):
    def create_user(self, username, email, password):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        user = self.model(
            email=self.normalize_email(email), username=username, types="admin"
        )
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.CharField(
        "uuid", max_length=36, unique=True, editable=False, null=False
    )
    username = models.CharField("username", max_length=30, unique=True, null=False)
    email = models.EmailField("email", unique=True)
    types = models.CharField("types", max_length=10, null=False, default="client")
    is_staff = models.BooleanField(default=False)

    countTokens = models.IntegerField(default=0)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = UserManager()

    @property
    def token(self):
        return self.generate_token_jwt()

    def generate_token_jwt(self):
        dt = datetime.now() + timedelta(minutes=settings.JWT_EXP_TIME)

        token = jwt.encode(
            {"username": self.username, "exp": int(dt.timestamp())},
            # strftime('%s') didnt work in windows 😿
            # https://stackoverflow.com/questions/10807164/python-time-formatting-different-in-windows
            settings.SECRET_KEY,
            algorithm="HS256",
        )

        return token.decode("utf-8")
