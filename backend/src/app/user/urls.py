from django.urls import path
from .views import UserView, UserAuthenticatedView


urlpatterns = [
    # Users
    path('register', UserView.as_view({'post': 'register'})),
    path('login', UserView.as_view({'post': 'login'})),
    
    path('refreshToken', UserAuthenticatedView.as_view({'post': 'refreshToken'})),
    path('user', UserAuthenticatedView.as_view({'get': 'getUser'})),
]
