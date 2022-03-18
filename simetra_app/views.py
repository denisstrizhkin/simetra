import json

from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.serializers.json import DjangoJSONEncoder

from simetra.settings import MAPBOX_KEY
from .models import Boss, Employee, City
from .forms import BossForm, EmployeeForm, LocationOfCityForm, CityForm


def staff_logout(request):
    logout(request)
    return redirect('simetra_app:staff-login')


def main_page(request):
    mapbox_access_token = MAPBOX_KEY

    form = LocationOfCityForm()

    cities_list_json = []
    for city in City.objects.all():
        city_dictionary = {
            'name': city.name,
            'longitude': city.longitude,
            'latitude': city.latitude,
        }
        city_dictionary_json = json.dumps(city_dictionary, cls=DjangoJSONEncoder)
        cities_list_json.append(city_dictionary_json)

    context = {
        'bosses_list': Boss.objects.all(),
        'employees_list': Employee.objects.all(),
        'number_of_cities': City.objects.all().count(),
        'mapbox_access_token': mapbox_access_token,
        'cities_list_json': cities_list_json,
        'form': form,
    }

    return render(request, 'simetra_app/main.html', context)


def methodology_page(request):
    return render(request, 'simetra_app/methodology.html')


def analytics_page(request):
    return render(request, 'simetra_app/analytics.html')


def data_base_page(request):
    return render(request, 'simetra_app/data-base.html')


def city_page(request, city_name):
    print(city_name)
    city = get_object_or_404(City, name=city_name)
    
    context = {
        'name': city.name,
        'longitude': city.longitude,
        'latitude': city.latitude,
    }

    return render(request, 'simetra_app/city-page.html', context)


def staff_login_page(request):
    if request.user.is_authenticated:
        return redirect('simetra_app:customization')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('simetra_app:customization')
        else:
            messages.info(request, 'Секретное имя ИЛИ секретный ключ некорректны!')
            
    return render(request, 'simetra_app/staff-login.html')


@login_required(login_url='simetra_app:staff-login')
def customization_page(request):
    return render(request, 'simetra_app/customization.html')


@login_required(login_url='simetra_app:staff-login')
def change_boss_model(request):
    context = {
        'list_of_bosses': Boss.objects.all(),
        'number_of_bosses': Boss.objects.all().count(),
    }
    
    return render(request, 'simetra_app/change-boss-model.html', context)


@login_required(login_url='simetra_app:staff-login')
def create_boss(request):
    boss_form = BossForm()

    context = {
        'boss_form': boss_form,
        'title': 'Добавить Нового Босса',
    }

    if request.method == 'POST':
        boss_form = BossForm(request.POST)

        if boss_form.is_valid():
            boss_form.save()

    return render(request, 'simetra_app/create-or-update-boss.html', context)


@login_required(login_url='simetra_app:staff-login')
def update_boss(request, boss_id):
    boss = get_object_or_404(Boss, pk=boss_id)
    boss_form = BossForm(instance=boss)

    context = {
        'boss_form': boss_form,
        'title': 'Изменить Существующего Босса',
    }

    if request.method == 'POST':
        boss_form = BossForm(request.POST, instance=boss)

        if boss_form.is_valid():
            boss_form.save()
    
    return render(request, 'simetra_app/create-or-update-boss.html', context)


@login_required(login_url='simetra_app:staff-login')
def delete_boss(request, boss_id):
    boss = get_object_or_404(Boss, pk=boss_id)
    boss.delete()
    return redirect('simetra_app:change-boss-model')


@login_required(login_url='simetra_app:staff-login')
def change_city_model(request):
    context = {
        'list_of_cities': City.objects.all(),
        'number_of_cities': City.objects.all().count(),
    }

    return render(request, 'simetra_app/change-city-model.html', context)


@login_required(login_url='simetra_app:staff-login')
def create_city(request):
    city_form = CityForm()
    location_of_city_form = LocationOfCityForm()
    
    context = {
        'city_form': city_form,
        'location_of_city_form': location_of_city_form,
        'title': 'Добавить Новый Город',
    }

    if request.method == 'POST':
        if does_city_already_exist(request.POST):
            return HttpResponse('Такой город уже существует! Создайте новый город или обновите существующий.')

        city_form = CityForm(request.POST)
         
        if city_form.is_valid():
            city_form.save()

    return render(request, 'simetra_app/create-or-update-city.html', context)


@login_required(login_url='simetra_app:staff-login')
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
        city_form = CityForm(request.POST, instance=city)
         
        if city_form.is_valid():
            city_form.save()

    return render(request, 'simetra_app/create-or-update-city.html', context)


@login_required(login_url='simetra_app:staff-login')
def delete_city(request, city_id):
    city = get_object_or_404(City, pk=city_id)
    city.delete()
    return redirect('simetra_app:change-city-model')


@login_required(login_url='simetra_app:staff-login')
def change_employee_model(request):
    context = {
        'list_of_employees': Employee.objects.all(),
        'number_of_employees': Employee.objects.all().count(),
    }

    return render(request, 'simetra_app/change-employee-model.html', context)


@login_required(login_url='simetra_app:staff-login')
def create_employee(request):
    employee_form = EmployeeForm()

    context = {
        'employee_form': employee_form,
        'title': 'Добавить Нового Сотрудника'
    }

    if request.method == 'POST':
        employee_form = EmployeeForm(request.POST)

        if employee_form.is_valid():
            employee_form.save()

    return render(request, 'simetra_app/create-or-update-employee.html', context)


@login_required(login_url='simetra_app:staff-login')
def update_employee(request, employee_id):
    employee = get_object_or_404(Employee, pk=employee_id)
    employee_form = EmployeeForm(instance=employee)

    context = {
        'employee_form': employee_form,
        'title': 'Изменить Существующего Сотрудника',
    }

    if request.method == 'POST':
        employee_form = EmployeeForm(request.POST, instance=employee)

        if employee_form.is_valid():
            employee_form.save()

    return render(request, 'simetra_app/create-or-update-employee.html', context)


@login_required(login_url='simetra_app:staff-login')
def delete_employee(request, employee_id):
    employee = get_object_or_404(Employee, pk=employee_id)
    employee.delete()
    return redirect('simetra_app:change-employee-model')


def does_city_already_exist(requestPOST):
    new_city_name = requestPOST['name']

    for city in City.objects.all():
        if city.name == new_city_name:
            return True
    
    return False
