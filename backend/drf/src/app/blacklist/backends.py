import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from .models import Blacklist


class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = "Bearer"

    def authenticate(self, request):
        request.user = None
        auth_header = authentication.get_authorization_header(request).split()

        if not auth_header:
            return None

        if len(auth_header) != 2:
            return None

        prefix = auth_header[0].decode("utf-8")
        token = auth_header[1].decode("utf-8")

        if prefix != self.authentication_header_prefix:
            return None

        return self._authenticate_credentials(request, token)

    def _authenticate_credentials(self, request, token):
        token = len(Blacklist.objects.filter(token=token))
        if token > 0:
            msg = "Token in Blacklist"
            raise exceptions.AuthenticationFailed(msg)

        return None
