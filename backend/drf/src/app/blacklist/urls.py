from django.urls import path
from .views import BlacklistAuthenticatedView


urlpatterns = [
    path("logout", BlacklistAuthenticatedView.as_view({"post": "logout"})),
]
