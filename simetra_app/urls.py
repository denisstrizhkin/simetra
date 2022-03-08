from importlib.resources import path
from django.urls import path

from simetra_app import views

app_name = 'simetra_app'


urlpatterns = [
    path('', views.main_page, name='main'),
    path('methodogoly/', views.methodology_page, name='methodology'),
]
