import json
import urllib

from pyexcel import exceptions as pyex_excpts

from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, HttpResponseBadRequest, \
    HttpResponseRedirect

from simetra.settings import MAPBOX_KEY
from .models import Boss, Employee, City
from .forms import BossForm, EmployeeForm, LocationOfCityForm, CityForm, \
    UploadFileForm


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
            messages.info(
                request, 'Секретное имя ИЛИ секретный ключ некорректны!')

    return render(request, 'simetra_app/staff-login.html')


def staff_logout(request):
    logout(request)
    return redirect('simetra_app:staff-login')


def main_page(request):
    mapbox_access_token = MAPBOX_KEY

    form = LocationOfCityForm()

    required_fields = ['name', 'russian_name', 'longitude', 'latitude']
    city_attrs_json = CityAttributesJSON()
    cities_list_json = city_attrs_json.get_JSON_city_list(required_fields)

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
    required_fields = [
        'name',
        'russian_name',
        'region',
        'rating_security_n_development',
        'rating_comfort_n_convenience',
        'rating_route_network_efficiency',
        'rating_affordability',
        'rating_physical_availability',
        'sum_of_rating',
    ]

    city_attrs_json = CityAttributesJSON()
    cities_list_json = city_attrs_json.get_JSON_city_list(required_fields)
    context = {'cities_list_json': cities_list_json}

    return render(request, 'simetra_app/analytics.html', context)


def data_base_page(request):
    cities_list = City.objects.all().order_by('-sum_of_rating')

    required_fields = ['name', 'longitude']
    city_attrs_json = CityAttributesJSON()
    cities_list_json = city_attrs_json.get_JSON_city_list(required_fields)

    context = {
        'cities_list_json': cities_list_json,
        'cities_list': cities_list,
        'number_of_cities': len(cities_list),
    }

    return render(request, 'simetra_app/data-base.html', context)


def city_page(request, city_name):
    city = get_object_or_404(City, name=city_name)

    required_fields = [
        'name',
        'longitude',
        'latitude',
        'rating_security_n_development',
        'rating_comfort_n_convenience',
        'rating_route_network_efficiency',
        'rating_affordability',
        'rating_physical_availability',
        'num_population',
        'length_UDS',
        'area_active_city_zone',
        'traffic_ground_transport',
        'traffic_metro',
        'num_working_stops_overall',
        'num_working_stops_active_city_zone',
        'num_of_apartments',
        'proportion_apartments_in_coverage_zone',
        'proportion_people_in_coverage_zone',
        'area_stops_active_zone_coverage_500',
        'area_stops_active_zone_coverage_700',
        'area_stops_active_zone_coverage_1000',
        'proportion_apartments_in_metro_coverage_zone',
        'proportion_people_in_metro_coverage_zone',
        'area_metro_coverage',
        'density_stops_active_zone',
        'percent_transport_covered_area',
        'percent_metro_covered_area',
        'num_people_with_metro_access',
        'proportion_people_with_metro_access',
        'num_people_with_transport_access',
        'proportion_people_with_transport_access',
        'avrg_length_between_stops',
        'num_death_toll',
        'num_wounded',
        'num_accidents',
        'num_accidents_per_transport_unit',
        'num_wounded_n_dead_per_accident',
        'num_wounded_n_dead_per_people',
        'num_tramway_cars',
        'num_trolleybuses',
        'num_electrobuses',
        'num_buses',
        'num_metro_cars',
        'num_working_tramway_cars',
        'num_working_trolleybuses',
        'num_working_electrobuses',
        'num_working_buses',
        'num_working_metro_cars',
        'percent_working_tramway_cars',
        'percent_working_trolleybuses',
        'percent_working_electrobuses',
        'percent_working_buses',
        'percent_working_metro_cars',
        'num_all_buses_registry',
        'num_very_big_buses_registry',
        'num_big_buses_registry',
        'num_medium_buses_registry',
        'num_small_buses_registry',
        'num_all_trolleybuses_registry',
        'num_big_trolleybuses_registry',
        'num_very_big_trolleybuses_registry',
        'num_tramway_cars_registry',
        'num_big_tramway_cars_registry',
        'num_very_big_tramway_cars_registry',
        'avrg_age_tramway_car',
        'avrg_age_trolleybus',
        'avrg_age_bus',
        'avrg_age_electrobus',
        'avrg_age_metro_car',
        'num_low_profile_tramway_cars',
        'num_low_profile_trolleybuses',
        'num_low_profile_buses',
        'num_low_profile_electrobuses',
        'num_new_GET',
        'num_new_buses',
        'proportion_low_profile_transport',
        'proportion_big_capacity_transport',
        'proportion_electro_transport',
        'proportion_working_transport',
        'percent_renew_program',
        'num_routes_in_use_tramway',
        'num_routes_in_use_trolleybus',
        'num_routes_in_use_bus',
        'num_routes_in_use_overall',
        'num_routes_regulated_tariff',
        'num_routes_unregulated_tariff',
        'proportion_routes_unregulated_tariff',
        'length_avrg_tramway_route',
        'length_avrg_trolleybus_route',
        'length_avrg_bus_route',
        'length_existing_tramway_routes',
        'length_in_use_tramway_routes',
        'length_existing_trolleybus_routes',
        'length_in_use_trolleybus_routes',
        'length_overall_nonrailed_transport_path',
        'percent_isolated_tramway_routes',
        'coeff_tramway_net_use',
        'coeff_trolleybus_net_use',
        'num_segments_avrg_load',
        'num_segments_high_load',
        'time_avrg_waiting_any_transport',
        'time_avrg_waiting_specific_transport',
        'coeff_route',
        'coeff_non_straight_route',
        'bool_transport_app',
        'bool_rt_internet_movement_info',
        'bool_transport_schedule_website',
        'bool_transport_route_net_map',
        'bool_unique_transporte_style',
        'avrg_region_salary',
        'avrg_region_income',
        'price_monthly_transport_pass',
        'ratio_pass_cost_to_income',
        'num_routes_with_pass',
        'num_routes_with_transfer_pass',
        'price_SOT',
        'price_one_time_ticket',
        'price_one_time_ticket_discount',
        'price_transfer_pass',
        'bool_universal_transport_card',
        'bool_online_payment',
        'bool_nfc_payment',
        'bool_transfer_pass',
        'bool_day_pass',
        'bool_long_period_pass'
    ]

    required_groups = [
        'КАЧЕСТВЕННЫЕ ГРУППЫ',
        'ПРОСТРАНСТВЕННЫЕ_ХАРАКТЕРИСТИКИ',
        'ПОДВИЖНОЙ СОСТАВ',
        'МАРШРУТЫ',
        'ТАРИФНАЯ СИСТЕМА'
    ]

    city_attrs_json = CityAttributesJSON(city)
    # cities_list_json = get_JSON_one_city_attrs(city, required_fields)
    cities_list_json = city_attrs_json.get_JSON_city_list(required_fields)

    # cities_attrs_by_groups_list_json = get_JSON_city_list_by_many_groups(
    #     required_groups, city_name)
    cities_attrs_by_groups_list_json = city_attrs_json.get_JSON_city_list_by_many_groups(
        required_groups)

    # city_attr_verbose_names_json = get_JSON_city_attr_verbose_names_by_groups(
    #     required_groups)
    city_attr_verbose_names_json = city_attrs_json.get_JSON_city_attr_verbose_names_by_groups(
        required_groups)

    context = {
        'city': city,
        'cities_list_json': cities_list_json,
        'cities_attrs_by_groups_list_json': cities_attrs_by_groups_list_json,
        'city_attr_verbose_names_list_json': city_attr_verbose_names_json,
    }

    return render(request, 'simetra_app/city-page.html', context)


@login_required(login_url='simetra_app:staff-login')
def customization_page(request):
    return render(request, 'simetra_app/customization.html')


@login_required(login_url='simetra_app:staff-login')
def change_boss_model(request):
    context = get_context_to_change_model(Boss)
    context['heading'] = 'Руководители'
    context['object_name'] = 'boss'
    context = update_context_for_customization_pages_navbar(request, context)
    return render(request, 'simetra_app/change-model.html', context)


@login_required(login_url='simetra_app:staff-login')
def create_boss(request):
    boss_form = BossForm()

    context = {
        'is_create_page': True,
        'boss_form': boss_form,
    }

    context = update_context_for_customization_pages_navbar(request, context)

    if request.method == 'POST':
        boss_form = BossForm(request.POST, request.FILES)

        if boss_form.is_valid():
            boss_form.save()

            message_text = 'Модель руководителя была успешно создана!'
            messages.success(request, message_text)
        else:
            message_text = 'Не удалось создать модель руководителя!'
            messages.success(request, message_text)

    return render(request, 'simetra_app/create-or-update-boss.html', context)


@login_required(login_url='simetra_app:staff-login')
def update_boss(request, boss_id):
    boss = get_object_or_404(Boss, pk=boss_id)
    boss_form = BossForm(instance=boss)

    context = {
        'is_create_page': False,
        'boss_form': boss_form,
        'boss_image_path': boss.image.url,
    }

    context = update_context_for_customization_pages_navbar(request, context)

    if request.method == 'POST':
        boss_form = BossForm(request.POST, request.FILES, instance=boss)

        if boss_form.is_valid():
            boss_form.save()

            message_text = 'Модель руководителя была успешно изменена!'
            messages.success(request, message_text)
        else:
            message_text = 'Не удалось изменить модель руководителя!'
            messages.success(request, message_text)

    return render(request, 'simetra_app/create-or-update-boss.html', context)


@login_required(login_url='simetra_app:staff-login')
def delete_boss(request, boss_id):
    boss = get_object_or_404(Boss, pk=boss_id)
    boss.delete()
    return redirect('simetra_app:change-boss')


@login_required(login_url='simetra_app:staff-login')
def delete_all_bosses(request):
    bosses_list = Boss.objects.all()

    for boss in bosses_list:
        boss.delete()

    return redirect('simetra_app:change-boss')


@login_required(login_url='simetra_app:staff-login')
def change_city_model(request):
    context = get_context_to_change_model(City)
    context['heading'] = 'Города'
    context['object_name'] = 'city'
    context = update_context_for_customization_pages_navbar(request, context)
    return render(request, 'simetra_app/change-model.html', context)


@login_required(login_url='simetra_app:staff-login')
def create_city(request):
    city_form = CityForm(initial={'sum_of_rating': 0})
    location_of_city_form = LocationOfCityForm()

    context = {
        'city_form': city_form,
        'location_of_city_form': location_of_city_form,
        'title': 'Добавить Новый Город',
        'is_create_page': True,
    }

    context = update_context_for_customization_pages_navbar(request, context)

    if request.method == 'POST':
        if does_city_already_exist(request.POST):
            return HttpResponse(
                'Такой город уже существует! Создайте новый город или \
                обновите существующий.'
            )

        city_form = CityForm(request.POST)

        if city_form.is_valid():
            new_city = city_form.save(commit=False)
            new_city = get_city_sum_of_rating(new_city)
            new_city.save()

            message_text = 'Модель города была успешно создана!'
            messages.success(request, message_text)
        else:
            message_text = 'Не удалось создать модель города!'
            messages.error(request, message_text)

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
        'city_image_path': city.avatar.url,
        'is_create_page': False,
    }

    context = update_context_for_customization_pages_navbar(request, context)

    if request.method == 'POST':
        city_form = CityForm(request.POST, instance=city)

        if city_form.is_valid():
            new_city = city_form.save(commit=False)
            new_city = get_city_sum_of_rating(new_city)
            new_city.save()

            message_text = 'Модель города была успешно изменена!'
            messages.success(request, message_text)
        else:
            message_text = 'Не удалось изменить модель города!'
            messages.error(request, message_text)

    return render(request, 'simetra_app/create-or-update-city.html', context)


@login_required(login_url='simetra_app:staff-login')
def upload_cities_excel(request):
    def write_field(city, sheet, field_name, i):
        field_type = type(getattr(city, field_name))
        vname = City._meta.get_field(field_name).verbose_name

        try:
            val = sheet[vname, i]
        except ValueError:
            err_msg = "Таблица не содержит поля [{}].".format(vname)
            messages.error(request, err_msg)
            return

        cname = getattr(city, 'name')
        fmt = "Город: {}, Значение: [{}] должно быть {}"
        err_msg = ''
        
        if field_type == type(False):
            try:
                val = float(val)

                if val == 0.0:
                    val = False
                elif val == 1.0:
                    val = True
                else:
                    raise ValueError()
            except ValueError:
                err_msg = fmt.format(cname, vname, 'Булевой переменной')
        elif field_type == type("str"):
            val = str(val)
            if val.isnumeric():
                err_msg = fmt.format(cname, vname, 'Строкой')
        elif field_type == type(10) or field_type == type(10.0):
            try:
                val = float(val)
            except ValueError:
                err_msg = fmt.format(cname, vname, 'Числом')

        if err_msg != '':
            messages.error(request, err_msg)
        else:
            setattr(city, field_name, val)

    form = UploadFileForm()
    context = {
        "form": form,
        "error_message": '',
    }
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)

        if form.is_valid():
            #excel_book = request.FILES["file"].get_book()
            try:
                excel_book = request.FILES["file"].get_book()
            except pyex_excpts.FileTypeNotSupported:
                err_msg = "Данный формат файла не поддерживается"
                messages.error(request, err_msg)
                context = update_context_for_customization_pages_navbar(
                    request, context)
                return render(request, "simetra_app/upload-cities-excel.html", context)

            sheet_names = get_city_attrs_by_groups_dict()

            def check_sheet_existance(book, sheet_name) -> bool:
                try:
                    _ = book[sheet_name]
                    return True
                except BaseException:
                    return False

            b_err = False
            for sheet_name in sheet_names:
                if not check_sheet_existance(excel_book, sheet_name):
                    err_msg = 'Документ не содержит следующего листа: \
"{}", Ошибка при загрузке!'.format(sheet_name)
                    b_err = True
                    messages.error(request, err_msg)

            if b_err:
                context = update_context_for_customization_pages_navbar(
                    request, context)
                return render(request, "simetra_app/upload-cities-excel.html", context)

            loc_read = {}

            def write_sheet(sheet_name) -> None:
                # global loc_read, count
                sheet = excel_book[sheet_name]
                field_names = sheet_names[sheet_name]

                sheet.name_rows_by_column(0)
                for i in range(0, sheet.number_of_columns()):
                    try:
                        name = sheet['Город', i]
                    except ValueError:
                        err_msg = "Лист: [{}] не содержит поля [Город]".format(
                            sheet_name)
                        messages.error(request, err_msg)
                        break

                    if(name == ''):
                        continue
                    if not name in loc_read:
                        loc_read[name] = False

                    city = None
                    if City.objects.filter(name=name).exists():
                        city = City.objects.get(name=name)
                    else:
                        city = City(name=name)

                    if not loc_read[name] and is_city_name_correct_to_find_coordinates(city.name):
                        longitude, latitude = CityCoordinates(city.name).\
                            get_longitude_and_latitude_by_city_name()
                        loc_read[name] = True

                        city.longitude = longitude
                        city.latitude = latitude

                    if loc_read[name]:
                        for field_name in field_names:
                            write_field(city, sheet, field_name, i)

                        city = get_city_sum_of_rating(city)
                        city.save()

            for key in sheet_names:
                write_sheet(key)

            message_text = 'Файл был успешно загружен!'
            messages.success(request, message_text)
        else:
            message_text = 'Неверный формат файла!'
            messages.error(request, message_text)

    context = update_context_for_customization_pages_navbar(request, context)
    return render(request, "simetra_app/upload-cities-excel.html", context)


@login_required(login_url='simetra_app:staff-login')
def delete_city(request, city_id):
    city = get_object_or_404(City, pk=city_id)
    city.delete()
    return redirect('simetra_app:change-city')


@login_required(login_url='simetra_app:staff-login')
def delete_all_cities(request):
    cities_list = City.objects.all()

    for city in cities_list:
        city.delete()

    return redirect('simetra_app:change-city')


@login_required(login_url='simetra_app:staff-login')
def change_employee_model(request):
    context = get_context_to_change_model(Employee)
    context['heading'] = 'Сотрудники'
    context['object_name'] = 'employee'
    context = update_context_for_customization_pages_navbar(request, context)
    return render(request, 'simetra_app/change-model.html', context)


@login_required(login_url='simetra_app:staff-login')
def create_employee(request):
    employee_form = EmployeeForm()

    context = {
        'is_create_page': True,
        'employee_form': employee_form,
    }

    context = update_context_for_customization_pages_navbar(request, context)

    if request.method == 'POST':
        employee_form = EmployeeForm(request.POST, request.FILES)

        if employee_form.is_valid():
            employee_form.save()

            message_text = 'Модель сотрудника была успешно создана!'
            messages.success(request, message_text)
        else:
            message_text = 'Не удалось создать модель сотрудника!'
            messages.error(request, message_text)

    return render(
        request, 'simetra_app/create-or-update-employee.html', context)


@login_required(login_url='simetra_app:staff-login')
def update_employee(request, employee_id):
    employee = get_object_or_404(Employee, pk=employee_id)
    employee_form = EmployeeForm(instance=employee)

    context = {
        'is_create_page': False,
        'employee_form': employee_form,
        'employee_image_path': employee.image.url,
    }

    context = update_context_for_customization_pages_navbar(request, context)

    if request.method == 'POST':
        employee_form = EmployeeForm(
            request.POST, request.FILES, instance=employee)

        if employee_form.is_valid():
            employee_form.save()

            message_text = 'Модель сотрудника была успешно создана!'
            messages.success(request, message_text)
        else:
            message_text = 'Не удалось создать модель сотрудника!'
            messages.error(request, message_text)

    return render(
        request, 'simetra_app/create-or-update-employee.html', context)


@login_required(login_url='simetra_app:staff-login')
def delete_employee(request, employee_id):
    employee = get_object_or_404(Employee, pk=employee_id)
    employee.delete()
    return redirect('simetra_app:change-employee')


@login_required(login_url='simetra_app:staff-login')
def delete_all_employees(request):
    employees_list = Employee.objects.all()

    for employee in employees_list:
        employee.delete()

    return redirect('simetra_app:change-employee')


class CityCoordinates():
    def __init__(self, city_english_name):
        self.city = city_english_name
        self.__MAPBOX_KEY = 'pk.eyJ1IjoicmF0aW5nLW9mLWNpdGllcyIsImEiOiJjbDBwMzVxYmEweXV0M2tudG5iNTVoOWEwIn0.-TuXo1E4722kHkQswNZh2A'

    def __parse_coordinates_by_search_pattern(self, unparsed_coordinates):
        pattern = '"center":['
        start = unparsed_coordinates.find(pattern) + len(pattern)
        end = unparsed_coordinates.find(']', start)
        coordinates = unparsed_coordinates[start:end]
        return coordinates

    def __get_city_coordinates_from_mapbox_json_file(self, city):
        unparsed_coordinates_file = urllib.request.urlopen(
            'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city +
            '.json?access_token=' + self.__MAPBOX_KEY
        )
        unparsed_coordinates_string = str(unparsed_coordinates_file.read())

        coordinates = self.__parse_coordinates_by_search_pattern(
            unparsed_coordinates_string)

        return coordinates

    def get_longitude_and_latitude_by_city_name(self):
        city_format_to_get_coordinates = self.city.replace(' ', '+')

        coordinates = self.__get_city_coordinates_from_mapbox_json_file(
            city_format_to_get_coordinates)

        coordinates = coordinates.split(',')
        longitude = float(coordinates[1])
        latitude = float(coordinates[0])

        return longitude, latitude


def get_context_to_change_model(Object):
    context = {
        'list_of_objects': Object.objects.all(),
        'number_of_objects': Object.objects.all().count(),
    }

    is_object_city = ContentType.objects.get_for_model(Object) == \
                     ContentType.objects.get_for_model(City)

    if is_object_city:
        context["is_city"] = True

    return context


def does_city_already_exist(requestPOST):
    new_city_name = requestPOST['name']

    for city in City.objects.all():
        if city.name == new_city_name:
            return True

    return False


def is_city_name_correct_to_find_coordinates(city_name):
    if city_name == 'ВЕС' or city_name == 'ПРОБА':
        return False

    return True


def update_context_for_customization_pages_navbar(request, context):
    def is_it_update_page(url_ancestors_name_list):
        return url_ancestors_name_list[-2][:7] == 'update-'

    url_ancestors_name_list = request.path.split('/')[1:-1]

    if is_it_update_page(url_ancestors_name_list):
        context['update_model'] = url_ancestors_name_list[-2]
        context['model_id'] = url_ancestors_name_list[-1]
        context['is_this_update_page'] = True

        del (url_ancestors_name_list[-2])
        del (url_ancestors_name_list[-1])

    context['url_ancestors_name_list'] = url_ancestors_name_list

    return context


class CityAttributesJSON():
    def __init__(self, city_name=None):
        self.city_name = city_name

    def get_JSON_city_list(self, city_attrs):
        def __get_JSON_city_attr_and_value_list(city_object):
            city_dictionary = {}

            for attr in city_attrs:
                value = getattr(city_object, attr)
                city_dictionary[attr] = value

            city_dictionary_json = json.dumps(
                city_dictionary, cls=DjangoJSONEncoder)

            return city_dictionary_json

        if self.city_name is None:
            cities_list_json = []
            for city in City.objects.all():
                city_dictionary_json = __get_JSON_city_attr_and_value_list(
                    city)
                cities_list_json.append(city_dictionary_json)
        else:
            city = get_object_or_404(City, name=self.city_name)
            city_dictionary_json = __get_JSON_city_attr_and_value_list(city)
            cities_list_json = [city_dictionary_json]

        return cities_list_json

    def get_JSON_city_attr_verbose_names(self, city_attrs):
        verbose_names_list_json = []
        verbose_names_dictionary = {}

        for attr_name in city_attrs:
            verbose_name = City._meta.get_field(attr_name).verbose_name
            verbose_names_dictionary[attr_name] = verbose_name

        verbose_names_dictionary_json = json.dumps(
            verbose_names_dictionary, cls=DjangoJSONEncoder)
        verbose_names_list_json.append(verbose_names_dictionary_json)

        return verbose_names_list_json

    def get_JSON_city_list_by_many_groups(self, group_list):
        def __get_JSON_city_list_by_one_group(group_name):
            attrs_by_groups = get_city_attrs_by_groups_dict()
            current_group_attrs = attrs_by_groups[group_name]
            return self.get_JSON_city_list(current_group_attrs)

        cities_attrs_by_groups_dict = {}

        for group in group_list:
            cities_attrs_by_groups_dict[group] = \
                __get_JSON_city_list_by_one_group(group)

        cities_attrs_by_groups_dict_json = json.dumps(
            cities_attrs_by_groups_dict, cls=DjangoJSONEncoder)
        cities_attrs_by_groups_list_json = [cities_attrs_by_groups_dict_json]

        return cities_attrs_by_groups_list_json

    def get_JSON_city_attr_verbose_names_by_groups(self, group_list):
        required_attrs = []

        attrs_by_groups = get_city_attrs_by_groups_dict()

        for group in group_list:
            required_attrs += attrs_by_groups[group]

        return self.get_JSON_city_attr_verbose_names(required_attrs)


def get_city_attrs_by_groups_dict():
    attrs_by_groups = {
        'ГОРОДА': [
            'region',
            'russian_name'
        ],
        'КАЧЕСТВЕННЫЕ ГРУППЫ': [
            'rating_security_n_development',
            'rating_comfort_n_convenience',
            'rating_physical_availability',
            'rating_affordability',
            'rating_route_network_efficiency'
        ],
        'ПРОСТРАНСТВЕННЫЕ_ХАРАКТЕРИСТИКИ': [
            'num_population',
            'length_UDS',
            'area_active_city_zone',
            'traffic_ground_transport',
            'traffic_metro',
            'num_working_stops_overall',
            'num_working_stops_active_city_zone',
            'num_of_apartments',
            'proportion_apartments_in_coverage_zone',
            'proportion_people_in_coverage_zone',
            'area_stops_active_zone_coverage_500',
            'area_stops_active_zone_coverage_700',
            'area_stops_active_zone_coverage_1000',
            'proportion_apartments_in_metro_coverage_zone',
            'proportion_people_in_metro_coverage_zone',
            'area_metro_coverage',
            'density_stops_active_zone',
            'percent_transport_covered_area',
            'percent_metro_covered_area',
            'num_people_with_metro_access',
            'proportion_people_with_metro_access',
            'num_people_with_transport_access',
            'proportion_people_with_transport_access',
            'avrg_length_between_stops',
            'num_death_toll',
            'num_wounded',
            'num_accidents',
            'num_accidents_per_transport_unit',
            'num_wounded_n_dead_per_accident',
            'num_wounded_n_dead_per_people',
        ],
        'ПОДВИЖНОЙ СОСТАВ': [
            'num_tramway_cars',
            'num_trolleybuses',
            'num_electrobuses',
            'num_buses',
            'num_metro_cars',
            'num_working_tramway_cars',
            'num_working_trolleybuses',
            'num_working_electrobuses',
            'num_working_buses',
            'num_working_metro_cars',
            'percent_working_tramway_cars',
            'percent_working_trolleybuses',
            'percent_working_electrobuses',
            'percent_working_buses',
            'percent_working_metro_cars',
            'num_all_buses_registry',
            'num_very_big_buses_registry',
            'num_big_buses_registry',
            'num_medium_buses_registry',
            'num_small_buses_registry',
            'num_all_trolleybuses_registry',
            'num_big_trolleybuses_registry',
            'num_very_big_trolleybuses_registry',
            'num_tramway_cars_registry',
            'num_big_tramway_cars_registry',
            'num_very_big_tramway_cars_registry',
            'avrg_age_tramway_car',
            'avrg_age_trolleybus',
            'avrg_age_bus',
            'avrg_age_electrobus',
            'avrg_age_metro_car',
            'num_low_profile_tramway_cars',
            'num_low_profile_trolleybuses',
            'num_low_profile_buses',
            'num_low_profile_electrobuses',
            'num_new_GET',
            'num_new_buses',
            'proportion_low_profile_transport',
            'proportion_big_capacity_transport',
            'proportion_electro_transport',
            'proportion_working_transport',
            'percent_renew_program'
        ],
        'МАРШРУТЫ': [
            'num_routes_in_use_tramway',
            'num_routes_in_use_trolleybus',
            'num_routes_in_use_bus',
            'num_routes_in_use_overall',
            'num_routes_regulated_tariff',
            'num_routes_unregulated_tariff',
            'proportion_routes_unregulated_tariff',
            'length_avrg_tramway_route',
            'length_avrg_trolleybus_route',
            'length_avrg_bus_route',
            'length_existing_tramway_routes',
            'length_in_use_tramway_routes',
            'length_existing_trolleybus_routes',
            'length_in_use_trolleybus_routes',
            'length_overall_nonrailed_transport_path',
            'percent_isolated_tramway_routes',
            'coeff_tramway_net_use',
            'coeff_trolleybus_net_use',
            'num_segments_avrg_load',
            'num_segments_high_load',
            'time_avrg_waiting_any_transport',
            'time_avrg_waiting_specific_transport',
            'coeff_route',
            'coeff_non_straight_route',
            'bool_transport_app',
            'bool_rt_internet_movement_info',
            'bool_transport_schedule_website',
            'bool_transport_route_net_map',
            'bool_unique_transporte_style',
        ],
        'ТАРИФНАЯ СИСТЕМА': [
            'avrg_region_salary',
            'avrg_region_income',
            'price_monthly_transport_pass',
            'ratio_pass_cost_to_income',
            'num_routes_with_pass',
            'num_routes_with_transfer_pass',
            'price_SOT',
            'price_one_time_ticket',
            'price_one_time_ticket_discount',
            'price_transfer_pass',
            'bool_universal_transport_card',
            'bool_online_payment',
            'bool_nfc_payment',
            'bool_transfer_pass',
            'bool_day_pass',
            'bool_long_period_pass'
        ],
    }

    return attrs_by_groups


def get_city_sum_of_rating(city):
    city.sum_of_rating = float(city.rating_physical_availability) + \
                         float(city.rating_affordability) + \
                         float(city.rating_route_network_efficiency) + \
                         float(city.rating_comfort_n_convenience) + \
                         float(city.rating_security_n_development)

    return city
