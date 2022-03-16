from django.shortcuts import get_object_or_404, redirect, render

from simetra.settings import MAPBOX_KEY
from .models import Boss, Employee, City
from .forms import LocationOfCityForm, CityForm


def main_page(request):
    mapbox_access_token = MAPBOX_KEY

    form = LocationOfCityForm()

    context = {
        'bosses_list': Boss.objects.all(),
        'employees_list': Employee.objects.all(),
        'number_of_cities': City.objects.all().count(),
        'mapbox_access_token': mapbox_access_token,
        'form': form,
    }

    return render(request, 'simetra_app/main.html', context)


def methodology_page(request):
    return render(request, 'simetra_app/methodology.html')


def analytics_page(request):
    return render(request, 'simetra_app/analytics.html')


def data_base_page(request):
    return render(request, 'simetra_app/data-base.html')


def customization(request):
    context = {
        'list_of_cities': City.objects.all(),
        'number_of_cities': City.objects.all().count(),
    }
    
    return render(request, 'simetra_app/customization.html', context)


def create_city(request):
    city_form = CityForm()
    location_of_city_form = LocationOfCityForm()
    
    context = {
        'city_form': city_form,
        'location_of_city_form': location_of_city_form,
        'title': 'Добавить Новый Город',
    }

    if request.method == 'POST':
        print(request.POST)
        city_form = CityForm(request.POST)
         
        if city_form.is_valid():
            city_form.save()

    return render(request, 'simetra_app/create-or-update-city.html', context)


def update_city(request, city_id):
    city = get_object_or_404(City, pk=city_id)
    city_form = CityForm(instance=city)
    location_of_city_form = LocationOfCityForm()

    context = {
        'city_form': city_form,
        'location_of_city_form': location_of_city_form,
        'title': 'Изменить Существующий Город',
    }

    if request.method == 'POST':
        print(request.POST)
        city_form = CityForm(request.POST, instance=city)
         
        if city_form.is_valid():
            city_form.save()

    return render(request, 'simetra_app/create-or-update-city.html', context)


def delete_city(request, city_id):
    city = get_object_or_404(City, pk=city_id)
    city.delete()
    return redirect('simetra_app:customization')
