from django.shortcuts import render

from simetra.settings import MAPBOX_ACCESS_TOKEN
from .models import Boss, Employee, City


def main_page(request):
    mapbox_access_token = MAPBOX_ACCESS_TOKEN

    context = {
        'bosses_list': Boss.objects.all(),
        'employees_list': Employee.objects.all(),
        'number_of_cities': City.objects.all().count(),
        'mapbox_access_token': mapbox_access_token,
    }

    return render(request, 'simetra_app/main.html', context)


def methodology_page(request):
    return render(request, 'simetra_app/methodology.html')


def analytics_page(request):
    return render(request, 'simetra_app/analytics.html')


def data_base_page(request):
    return render(request, 'simetra_app/data_base.html')
