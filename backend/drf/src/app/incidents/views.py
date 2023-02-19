from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from src.app.core.permissions import IsAdmin
from .models import Incident
from .serializers import IncidentSerializer, NotificationSerializer
from rest_framework.permissions import AllowAny


class IncidentView(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAdmin]
        return super(IncidentView, self).get_permissions()

    def get(self, request, slug=None):
        if slug:
            incident = get_object_or_404(Incident.objects.all(), slug=slug)
            serializer_one = IncidentSerializer(incident)
            return Response(serializer_one.data)
        incidents = Incident.objects.all()
        serializer = IncidentSerializer(incidents, many=True)

        return Response(serializer.data)

    def post(self, request):
        data = request.data["incident"]
        serializer_context = {
            "username": request.user,
            "slot_id": data["slot_id"],
            "title": data["title"],
            "body": data["body"],
        }
        incident = IncidentSerializer.create(serializer_context)
        return Response(IncidentSerializer.to_incident(incident))

    def put(self, request, slug):
        incident = IncidentSerializer.updateStatus(slug)
        return Response(IncidentSerializer.to_incident(incident))

    def delete(self, request, slug):
        incident = get_object_or_404(Incident.objects.all(), slug=slug)
        incident.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IncidentAuthView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            IncidentSerializer(
                IncidentSerializer.getIncidentUser(request.user), many=True
            ).data
        )


class NotificationsAuthView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            NotificationSerializer(
                NotificationSerializer.getNotificationUser(request.user), many=True
            ).data
        )

    def seenNotification(self, request, id):
        serializer_context = {"username": request.user, "id": id}
        serializer = NotificationSerializer.seeNotification(context=serializer_context)
        return Response(NotificationSerializer.to_notification(serializer))
