from datetime import datetime
from rest_framework import serializers
from .models import Rent
from src.app.user.models import User
from src.app.stations.models import Bike, Slot


class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = [
            "id",
            "user_id",
            "bike_id",
            "start_slot_id",
            "end_slot_id",
            "start_date",
            "end_date",
        ]

    def to_rent(instance):
        return {
            "id": instance.id,
            "user": instance.user_id,
            "bike": instance.bike_id,
            "start_slot": instance.start_slot_id,
            "end_slot": instance.end_slot_id,
            "start_date": instance.start_date,
            "end_date": instance.end_date,
        }

    def getOneRent(context):
        username = context["username"]

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError("User is not find")

        rent = Rent.objects.get(user_id=user.id, end_slot_id=None)

        return rent

    def rent(context):
        username = context["username"]
        slot_id = context["slot_id"]

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError("User is not find")

        slot = Slot.objects.get(pk=slot_id)
        if slot is None or slot.bike_id is None:
            raise serializers.ValidationError("Slot is not find")

        bike = Bike.objects.get(pk=slot.bike_id)
        if bike is None:
            raise serializers.ValidationError("Bike is not find")

        rent_user = Rent.objects.filter(user_id=user.id, end_slot_id=None)
        if len(rent_user) > 0:
            raise serializers.ValidationError(
                "The user can only have one rent open at a time"
            )

        # CREATE RENT

        rent = Rent.objects.create(
            user_id=user.id, bike_id=slot.bike_id, start_slot_id=slot_id
        )
        rent.save()

        # SLOT UPDATE

        slot.bike_id = None
        slot.status = "unused"
        slot.save()

        # BIKE UPDATE

        bike.status = "used"
        bike.save()

        return rent

    def returnBike(context):
        username = context["username"]
        bike_id = context["bike_id"]
        slot_id = context["slot_id"]

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError("User is not find")

        bike = Bike.objects.get(pk=bike_id)
        if bike is None:
            raise serializers.ValidationError("Bike is not find")

        rent = Rent.objects.get(user_id=user.id, bike_id=bike_id, end_slot_id=None)
        if rent is None:
            raise serializers.ValidationError("Rent is not find")

        slot_new = Slot.objects.get(pk=slot_id)
        if slot_new is None or slot_new.bike_id is not None:
            raise serializers.ValidationError("Slot is not find or is in use")

        if slot_new.status == "manteinance":
            raise serializers.ValidationError("Slot in manteinance")

        # UPDATE RENT
        rent.end_slot_id = slot_new.id
        rent.end_date = datetime.now()
        rent.save()

        # SLOT UPDATE

        slot_new.bike_id = bike.id
        slot_new.status = "used"
        slot_new.save()

        # BIKE UPDATE

        bike.status = "unused"
        bike.save()

        return rent

    def delete(context):
        rent_id = context["rent_id"]
        rent = Rent.objects.get(pk=rent_id)
        if rent is None:
            raise serializers.ValidationError("Rent is not find")
        if rent.end_slot_id is None:
            raise serializers.ValidationError("Rent is not finished")
        rent.delete()
        return True
