from importlib.resources import path
from django.urls import path

from simetra_app import views

from django.conf import settings
from django.conf.urls.static import static

app_name = 'simetra_app'


urlpatterns = [
    path('', views.main_page, name='main'),
    path('methodogoly/', views.methodology_page, name='methodology'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
