from django.urls import path
from .views import StationView
from .views import BikeView
from .views import SlotView

urlpatterns = [
    # Stations
    path('station', StationView.as_view({'get': 'get'})),
    path('station', StationView.as_view({'post': 'post'})),
    path('station/<str:slug>', StationView.as_view({'get': 'get'})),
    path('station/<str:slug>', StationView.as_view({'delete': 'delete'})),
    path('station/<str:slug>', StationView.as_view({'put': 'put'})),
    # Bikes
    path('bikes', BikeView.as_view({"get": "get"})),
    path('bikes/<str:slug>', BikeView.as_view({"get": "get"})),
    path('bikes', BikeView.as_view({"post": "post"})),
    path('bikes/<str:slug>', BikeView.as_view({"put": "put"})),
    path('bikes/<str:slug>', BikeView.as_view({"get": "get"})),
    # Slots
    path('slot', SlotView.as_view({"get": "get"})),
    path('slot/<int:id>', SlotView.as_view({"get": "get"})),
    path('slot/status/<int:id>', SlotView.as_view({"put": "put_status_only"})),
    path('slot/detach_bike/<int:id>',
         SlotView.as_view({"put": "detach_bike"})),
]
