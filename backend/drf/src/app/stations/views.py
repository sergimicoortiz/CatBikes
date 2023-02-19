from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Station
from .serializers import StationSerializer
from .models import Bike
from .serializers import BikeSerializer
from .models import Slot
from .serializers import SlotSerializer
from rest_framework.permissions import AllowAny
from src.app.core.permissions import IsAdmin


class StationView(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdmin]
        return super(StationView, self).get_permissions()

    def get(self, request, slug=None):
        if slug:
            station = get_object_or_404(Station.objects.all(), slug=slug)
            serializer_one = StationSerializer(station)
            return Response(serializer_one.data)
        stations = Station.objects.all()
        serializer = StationSerializer(stations, many=True)
        return Response(serializer.data)

    def post(self, request):
        station = request.data.get("station")
        serializer = StationSerializer(data=station)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        if request.data.get("slot"):
            slots = request.data.get("slot")
            slot_context = {"station_id": serializer.data["id"]}
            for i in range(slots["quantity"]):
                SlotSerializer.create(context=slot_context)
            slots = Slot.objects.filter(station_id=serializer.data["id"])
        return Response(
            {"station": serializer.data, "slots": SlotSerializer(slots, many=True).data}
        )

    def delete(self, request, slug):
        station = get_object_or_404(Station.objects.all(), slug=slug)
        station.delete()
        return Response({"data": "Station deleted"})

    def put(self, request, slug):
        station = get_object_or_404(Station.objects.all(), slug=slug)
        data = request.data.get("station")
        serializer = StationSerializer(instance=station, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)


class BikeView(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdmin]
        return super(BikeView, self).get_permissions()

    def get(self, request, slug=None):
        if slug:
            show_bikes = get_object_or_404(Bike.objects.all(), slug=slug)
            serializer = BikeSerializer(show_bikes)
            return Response(serializer.data)
        bikes = Bike.objects.all()
        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)

    def post(self, request):
        new_bike = request.data.get("bike")
        serializer = BikeSerializer(data=new_bike)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    def put(self, request, slug):
        saved_bike = get_object_or_404(Bike.objects.all(), slug=slug)
        data = request.data.get("bike")
        serializer = BikeSerializer(instance=saved_bike, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        slot = request.data.get("slot")
        if slot:
            if slot["id"] is not None:
                slot_context = {"bike_id": saved_bike.id, "status": "used"}
                saved_slot = get_object_or_404(Slot.objects.all(), pk=slot["id"])
                SlotSerializer.update(instance=saved_slot, context=slot_context)

        return Response(serializer.data)

    def delete(self, request, slug):
        search_bike = get_object_or_404(Bike.objects.all(), slug=slug)
        search_bike.delete()
        return Response("Deleted")


class SlotView(viewsets.GenericViewSet):
    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdmin]
        return super(SlotView, self).get_permissions()

    def get(self, request, id=None):
        if id:
            slot = get_object_or_404(Slot.objects.all(), pk=id)
            serializer_one = SlotSerializer(slot)
            return Response(serializer_one.data)
        if request.GET.get("station_id") is not None:
            slots = Slot.objects.filter(station_id=request.GET.get("station_id"))
        else:
            slots = Slot.objects.all()
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)

    def detach_bike(self, request, id):
        saved_slot = get_object_or_404(Slot.objects.all(), pk=id)

        saved_bike_id = SlotSerializer.to_Slot(saved_slot)

        saved_bike = get_object_or_404(Bike.objects.all(), pk=saved_bike_id["bike_id"])
        data = {"status": "used"}
        serializer = BikeSerializer(instance=saved_bike, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        slot_context = {"bike_id": 0, "status": "unused"}
        serializer_slot = SlotSerializer.update(
            instance=saved_slot, context=slot_context
        )

        return Response(SlotSerializer.to_Slot(serializer_slot))

    def put_status_only(self, request, id):
        saved_slot = get_object_or_404(Slot.objects.all(), pk=id)
        slot_data = request.data.get("slot")
        slot_context = {"bike_id": 0, "status": slot_data["status"]}
        serializer_slot = SlotSerializer.update(
            instance=saved_slot, context=slot_context
        )
        return Response(SlotSerializer.to_Slot(serializer_slot))
