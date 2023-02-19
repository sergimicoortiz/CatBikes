from django.urls import path
from .views import IncidentView, IncidentAuthView, NotificationsAuthView

urlpatterns = [
    path("incidents", IncidentView.as_view({"get": "get"})),
    path("incidentsUser", IncidentAuthView.as_view({"get": "get"})),
    path("incidents/<str:slug>", IncidentView.as_view({"get": "get"})),
    path("incidents/<str:slug>", IncidentView.as_view({"put": "put"})),
    path("incidents/<str:slug>", IncidentView.as_view({"delete": "delete"})),
    path("incidents", IncidentView.as_view({"post": "post"})),
    path("notifications", NotificationsAuthView.as_view({"get": "get"})),
    path(
        "notifications/<int:id>",
        NotificationsAuthView.as_view({"put": "seenNotification"}),
    ),
]
