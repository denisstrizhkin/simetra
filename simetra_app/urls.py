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

    ## Customization Pages
    # Main Pages
    path('staff-login/', views.staff_login_page, name='staff-login'),
    path('staff-logout/', views.staff_logout, name='staff-logout'),
    path('customization/', views.customization_page, name='customization'),

    # Boss Pages
    path('change-boss/', views.change_boss_model, name='change-boss-model'),
    path('create-boss/', views.create_boss, name='create-boss'),
    path('update-boss/<str:boss_id>/', views.update_boss, name='update-boss'),
    path('delete-boss/<str:boss_id>/', views.delete_boss, name='delete-boss'),

    # Employee Pages
    path('change-employee/', views.change_employee_model, name='change-employee-model'),
    path('create-employee/', views.create_employee, name='create-employee'),
    path('update-employee/<str:employee_id>/', views.update_employee, name='update-employee'),
    path('delete-employee/<str:employee_id>/', views.delete_employee, name='delete-employee'),

    # City Pages
    path('change-city/', views.change_city_model, name='change-city-model'),
    path('create-city/', views.create_city, name='create-city'),
    path('update-city/<str:city_id>/', views.update_city, name='update-city'),
    path('delete-city/<str:city_id>/', views.delete_city, name='delete-city'),
    path('<str:city_name>/', views.city_page, name='city-page'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
