from importlib.resources import path

from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from simetra_app import views

app_name = 'simetra_app'

path_customization="XujpR4pC"
urlpatterns = [
    # Main Pages
    path('', views.main_page, name='main'),
    path('methodology/', views.methodology_page, name='methodology'),
    path('analytics/', views.analytics_page, name='analytics'),
    path('data-base/', views.data_base_page, name='data-base'),
    path('cities/<str:city_name>/', views.city_page, name='city-page'),

    # Customization Pages
    # Main Pages
    path('staff-login/', views.staff_login_page, name='staff-login'),
    path('staff-logout/', views.staff_logout, name='staff-logout'),
    path('{}/'.format(path_customization), views.customization_page, name='customization'),

    # Boss Pages
    path(
        '{}/change-boss'.format(path_customization),
        views.change_boss_model,
        name='change-boss'
    ),
    path(
        '{}/change-boss/create-boss'.format(path_customization),
        views.create_boss,
        name='create-boss'
    ),
    path(
        '{}/change-boss/update-boss/<str:boss_id>'.format(path_customization),
        views.update_boss,
        name='update-boss'
    ),
    path(
        '{}/change-boss/delete-boss/<str:boss_id>'.format(path_customization),
        views.delete_boss,
        name='delete-boss'
    ),
    path(
        '{}/change-boss/delete-all-instances-of-boss'.format(path_customization),
        views.delete_all_bosses,
        name='delete-all-instances-of-boss'
    ),

    # Employee Pages
    path(
        '{}/change-employee'.format(path_customization),
        views.change_employee_model,
        name='change-employee'
    ),
    path(
        '{}/change-employee/create-employee'.format(path_customization),
        views.create_employee,
        name='create-employee'
    ),
    path(
        '{}/change-employee/update-employee/<str:employee_id>'.format(path_customization),
        views.update_employee,
        name='update-employee'
    ),
    path(
        '{}/change-employee/delete-employee/<str:employee_id>'.format(path_customization),
        views.delete_employee,
        name='delete-employee'
    ),
    path(
        '{}/change-employee/delete-all-instances-of-employee'.format(path_customization),
        views.delete_all_employees,
        name='delete-all-instances-of-employee'
    ),

    # City Pages
    path(
        '{}/change-city'.format(path_customization),
        views.change_city_model,
        name='change-city'
    ),
    path(
        '{}/change-city/create-city'.format(path_customization),
        views.create_city,
        name='create-city'
    ),
    path(
        '{}/change-city/update-city/<str:city_id>'.format(path_customization),
        views.update_city,
        name='update-city'
    ),
    path(
        '{}/change-city/delete-city/<str:city_id>'.format(path_customization),
        views.delete_city,
        name='delete-city'
    ),
    path(
        '{}/change-city/delete-all-instances-of-city'.format(path_customization),
        views.delete_all_cities,
        name='delete-all-instances-of-city',
    ),
    path(
        'cities/<str:city_name>/',
        views.city_page,
        name='city-page'
    ),
    path(
        '{}/change-city/upload-cities-excel'.format(path_customization),
        views.upload_cities_excel,
        name='upload-cities-excel'
    ),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
