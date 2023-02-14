from rest_framework import serializers
from .models import Incident, Notification
from src.app.user.models import User
from src.app.stations.models import Slot


class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['slug', 'title', 'status',
                  'body', 'user_id', 'slot_id', 'created_at', 'modified_at']

    def to_incident(instance):
        return ({
            "slug": instance.slug,
            "title": instance.title,
            "status": instance.status,
            "body": instance.body,
            "user_id": instance.user_id,
            "slot_id": instance.slot_id,
            "created_at": instance.created_at,
            "modified_at": instance.modified_at,
        })

    def create(context):
        username = context['username']
        slot_id = context['slot_id']
        title = context['title']
        body = context['body']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError(
                'User is not find'
            )

        slot = Slot.objects.get(pk=slot_id)
        if slot is None:
            raise serializers.ValidationError(
                'Slot is not find'
            )

        if title is None:
            raise serializers.ValidationError(
                'Title is required'
            )

        if body is None:
            raise serializers.ValidationError(
                'Body is required'
            )

        incident = Incident.objects.create(
            title=title,
            body=body,
            user_id=user.id,
            slot_id=slot.id
        )

        incident.save()
        return incident

    def updateStatus(slug):

        incident = Incident.objects.get(slug=slug)
        if incident is None:
            raise serializers.ValidationError(
                'Slot is not find'
            )

        if (incident.status == 'to_do'):
            incident.status = 'in_progress'
        elif (incident.status == 'in_progress'):
            incident.status = 'in_revision'
        elif (incident.status == 'in_revision'):
            incident.status = 'resolved'
        else:
            raise serializers.ValidationError(
                'The incident is closed'
            )

        incident.save()
        return incident

    def getIncidentUser(username):
        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError(
                'User is not find'
            )
        incidents = Incident.objects.filter(user_id=user.id)
        return incidents


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'body', 'seen',
                  'created_at', 'modified_at']

    def to_notification(instance):
        return ({
            "id": instance.id,
            "body": instance.body,
            "seen": instance.seen,
            "created_at": instance.created_at,
            "modified_at": instance.modified_at,

        })

    def getNotificationUser(username):
        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError(
                'User is not find'
            )
        notification = Notification.objects.filter(user_id=user.id, seen=False)
        return notification

    def seeNotification(context):
        notification_id = context['id']
        username = context['username']
        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError(
                'User is not find'
            )
        notification = Notification.objects.get(pk=notification_id, user_id=user.id, seen=False)
        if notification is None:
            raise serializers.ValidationError(
                'notification is not find'
            )
        notification.seen = True
        notification.save()
        return notification
