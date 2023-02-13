from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from .models import Blacklist
from .serializers import blacklistSerializer

from rest_framework.permissions import (IsAuthenticated)


class BlacklistAuthenticatedView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def logout(self, request):
        bearer = request.headers['Authorization'].split()

        serializer_context = {
            'token': bearer[1]
        }

        serializer = blacklistSerializer.newBlackToken(
            context=serializer_context)

        return Response(serializer)
