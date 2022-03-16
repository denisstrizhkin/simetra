from importlib.resources import path
from django.urls import path

from simetra_app import views

from django.conf import settings
from django.conf.urls.static import static

app_name = 'simetra_app'

urlpatterns = [
    # Main Pages
    path('', views.main_page, name='main'),
    path('methodogoly/', views.methodology_page, name='methodology'),
    path('analytics/', views.analytics_page, name='analytics'),
    path('data-base/', views.data_base_page, name='data-base'),

    # Customization Pages
    path('customization/', views.customization, name='customization'),
    path('create-city/', views.create_city, name='create-city'),
    path('update-city/<str:city_id>/', views.update_city, name='update-city'),
    path('delete-city/<str:city_id>/', views.delete_city, name='delete-city'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
