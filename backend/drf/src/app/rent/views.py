from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import RentSerializer
from rest_framework.permissions import IsAuthenticated
from src.app.core.permissions import IsAdmin
from .models import Rent
from rest_framework.permissions import AllowAny


class RentAuthenticatedView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def getOneRent(self, request):
        username = request.user
        serializer_context = {
            "username": username,
        }

        serializer = RentSerializer.getOneRent(context=serializer_context)

        return Response(RentSerializer.to_rent(serializer))

    def rent(self, request):
        data = request.data["rentBike"]
        username = request.user
        serializer_context = {"username": username, "slot_id": data["start_slot"]}

        serializer = RentSerializer.rent(context=serializer_context)

        return Response(RentSerializer.to_rent(serializer))

    def returnBike(self, request):
        data = request.data["returnBike"]
        username = request.user
        serializer_context = {
            "username": username,
            "slot_id": data["end_slot"],
            "bike_id": data["bike_id"],
        }

        serializer = RentSerializer.returnBike(context=serializer_context)

        return Response(RentSerializer.to_rent(serializer))


class RentAdminView(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]

    def getAll(self, request):
        data = Rent.objects.all()
        serializer = RentSerializer(data, many=True)
        return Response(serializer.data)

    def delete(self, request, id):
        context = {"rent_id": id}
        if RentSerializer.delete(context=context):
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
