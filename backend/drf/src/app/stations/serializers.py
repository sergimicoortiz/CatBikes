from rest_framework import serializers
from .models import Station
from .models import Bike
from .models import Slot
from random import randint


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'slug', 'name', 'status',
                  'image', 'longitude', 'latitude']

    def to_representation(self, instance):
        total_slots = len(Slot.objects.filter(station_id=instance.id))
        total_bikes = len(Slot.objects.filter(
            station_id=instance.id, status='used'))
        return {
            "id": instance.id,
            "slug": instance.slug,
            "name": instance.name,
            "status": instance.status,
            "image": instance.image,
            "longitude": instance.longitude,
            "latitude": instance.latitude,
            "total_slots": total_slots,
            "total_bikes": total_bikes
        }


class BikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bike
        fields = ['id', 'slug', 'name', 'status']

    def to_Bike(instance):
        return {
            "id": instance.id,
            "slug": instance.slug,
            "name": instance.name,
            "status": instance.status,
        }


class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = ['id', 'station_id', 'bike_id', 'status']

    def to_Slot(instance):
        return {
            "id": instance.id,
            "station_id": instance.station_id,
            "bike_id": instance.bike_id,
            "status": instance.status,
        }

    def create(context):
        station_id = context['station_id']
        station = Station.objects.get(pk=station_id)

        if station is None:
            raise serializers.ValidationError(
                'Station is not find'
            )

        slot = Slot.objects.create(
            station_id=station_id,
            bike_id=None,
            status="unused"
        )
        slot.save()
        return slot

    def create_slot_filler(context):
        station_id = context['station_id']
        status = context['status']
        bikes = Bike.objects.filter(status='used')

        if (status == 'used' and len(bikes) > 0):
            bike = Bike.objects.get(pk=bikes[randint(0, len(bikes)-1)].id)
            slot = Slot.objects.create(
                station_id=station_id,
                bike_id=bike.id,
                status="used"
            )
            bike.status = 'unused'
            bike.save()
        else:
            slot = Slot.objects.create(
                station_id=station_id,
                bike_id=None,
                status="unused"
            )
        slot.save()
        return slot

    def update(context, instance):
        bike_id = context['bike_id']
        context_status = context['status']

        if context_status == 'manteinance':
            instance.status = 'manteinance'
            instance.save()
            return instance

        if bike_id != 0 and instance.bike_id is not None:
            raise serializers.ValidationError(
                'Slot is in use'
            )
        if bike_id != 0 and not None:
            bike = Bike.objects.get(pk=bike_id)
            if bike is None:
                raise serializers.ValidationError(
                    'Bike is not find'
                )
            instance.bike_id = bike_id
            instance.status = "used"

        if bike_id == 0:
            instance.bike_id = None
            instance.status = "unused"

        instance.save()
        return instance
