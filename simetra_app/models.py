import uuid

from django.db import models

from pathlib import Path
from mapbox_location_field.models import LocationField


def get_uuid4_filename(filename):
    suffix = Path(filename).suffix
    basename = Path(str(uuid.uuid4()))
    return basename.with_suffix(suffix)


class Boss(models.Model):
    class Meta:
        verbose_name_plural = 'Bosses'

    def __str__(self):
        return self.name

    def get_upload_path(self, filename):
        return Path('main_page/bosses', get_uuid4_filename(filename))

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=200)
    quote = models.TextField()
    image = models.ImageField(
        default='main_page/bosses/default-avatar.jpg',
        upload_to=get_upload_path,
    )


class Employee(models.Model):
    def __str__(self):
        return self.name

    def get_upload_path(self, filename):
        return Path('main_page/employees', get_uuid4_filename(filename))

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=200)
    image = models.ImageField(
        default='main_page/employees/default-avatar.jpg',
        upload_to=get_upload_path,
    )


class City(models.Model):
    class Meta:
        verbose_name_plural = 'Cities'

    def __str__(self):
        return self.name

    # In Mapbox longtitude always goes first and latitude goes second
    # (by the time of 13.03.22)
    # To find coorinates, open 'Response' -> 'features' -> '0' -> 'center'
    # From the page https://docs.mapbox.com/playground/geocoding/
    name = models.CharField(max_length=100)
    longitude = models.DecimalField(
        max_digits=15, decimal_places=12, default=0)
    latitude = models.DecimalField(max_digits=15, decimal_places=12, default=0)

    """ КАЧЕСТВЕННЫЕ ГРУППЫ (рейтинг 0.0 - 100.0) """
    rating_security_n_development = models.FloatField(
        verbose_name='Безопасность и устойчивое развитие', default=0.0)
    rating_comfort_n_convenience = models.FloatField(
        verbose_name='Комфорт и удобство', default=0.0)
    rating_route_network_efficiency = models.FloatField(
        verbose_name='Эффективность маршрутной сети', default=0.0)
    rating_affordability = models.FloatField(
        verbose_name='Ценовая доступность', default=0.0)
    rating_physical_availability = models.FloatField(
        verbose_name='Физическая доступность', default=0.0)

    """ ПРОСТРАНСТВЕННЫЕ ХАРАКТЕРИСТИКИ """
    num_population = models.FloatField(
        verbose_name='Численность населения', default=0.0)
    length_UDS = models.FloatField(
        verbose_name='Протяженность УДС первой/второй категории', default=0.0)
    area_active_city_zone = models.FloatField(
        verbose_name='Площадь активной зоны города', default=0.0)
    traffic_ground_transport = models.FloatField(
        verbose_name='Пассажиропоток наземного общественного транспорта',
        default=0.0)
    traffic_metro = models.FloatField(
        verbose_name='Пассажиропоток метрополитена', default=0.0)
    num_working_stops_overall = models.IntegerField(
        verbose_name='Количество действующих остановочных пунктов', default=0)
    num_working_stops_active_city_zone = models.IntegerField(
        verbose_name='Количество остановочных пунктов в черте активной зоны \
                города', default=0)
    num_of_apartments = models.IntegerField(
        verbose_name='Кол-во многоквартирных домов', default=0)
    proportion_apartments_in_coverage_zone = models.FloatField(
        verbose_name='Доля домов в зоне покрытия', default=0.0)
    proportion_people_in_coverage_zone = models.FloatField(
        verbose_name='Доля населения в зоне покрытия', default=0.0)
    area_stops_active_zone_coverage_500 = models.FloatField(
        verbose_name='Площадь покрытия активной зоны города пунктами \
                остановок 500м', default=0.0)
    area_stops_active_zone_coverage_700 = models.FloatField(
        verbose_name='Площадь покрытия активной зоны города пунктами \
                остановок 700м', default=0.0)
    area_stops_active_zone_coverage_1000 = models.FloatField(
        verbose_name='Площадь покрытия активной зоны города пунктами \
                остановок 1000м', default=0.0)
    proportion_apartments_in_metro_coverage_zone = models.FloatField(
        verbose_name='Доля домов в зоне покрытия метрополитеном', default=0.0)
    proportion_people_in_metro_coverage_zone = models.FloatField(
        verbose_name='Доля населения в зоне покрытия метрополитеном',
        default=0.0)
    area_metro_coverage = models.FloatField(
        verbose_name='Площадь покрытия станциями метрополитена', default=0.0)
    density_stops_active_zone = models.FloatField(
        verbose_name='Плотность остановок распределения остановочных пунктов \
                по территории активной зоны города', default=0.0)
    percent_transport_covered_area = models.FloatField(
        verbose_name='Процент покрытой территории', default=0.0)
    percent_metro_covered_area = models.FloatField(
        verbose_name='Процент покрытой территории от станций метрополитена',
        default=0.0)
    num_people_with_metro_access = models.IntegerField(
        verbose_name='Население с доступом к метрополитену', default=0)
    proportion_people_with_metro_access = models.FloatField(
        verbose_name='Доля населения с доступом к метрополитену', default=0.0)
    num_people_with_transport_access = models.IntegerField(
        verbose_name='Население с доступом к общественному \
                транспорту', default=0)
    proportion_people_with_transport_access = models.FloatField(
        verbose_name='Доля населения с доступом к общественному \
                транспорту', default=0.0)
    avrg_length_between_stops = models.FloatField(
        verbose_name='Средневзвешенное расстояние между остановками',
        default=0.0)
    num_death_toll = models.IntegerField(
        verbose_name='Число погибших на ОТ', default=0)
    num_wounded = models.IntegerField(
        verbose_name='Число раненых на ОТ', default=0)
    num_accidents = models.IntegerField(
        verbose_name='Число ДТП с участием ОТ', default=0)
    num_accidents_per_transport_unit = models.FloatField(
        verbose_name='Число ДТП в расчете на единицу подвижного состава',
        default=0.0)
    num_wounded_n_dead_per_accident = models.FloatField(
        verbose_name='Число раненых и погибших в расчете на 1 ДТП',
        default=0.0)
    num_wounded_n_dead_per_people = models.FloatField(
        verbose_name='Количество раненых и погибших в расчете на млн \
                пассажиров', default=0.0)

    """ ПОДВИЖНОЙ СОСТАВ """
    num_tramway_cars = models.IntegerField(
        verbose_name='Количество трамвайных вагонов', default=0)
    num_trolleybuses = models.IntegerField(
        verbose_name='Количество троллейбусных машин', default=0)
    num_electrobuses = models.IntegerField(
        verbose_name='Количество электробусов', default=0)
    num_buses = models.IntegerField(
        verbose_name='Количество автобусов', default=0)
    num_metro_cars = models.IntegerField(
        verbose_name='Количество вагонов метрополитена', default=0)
    num_working_tramway_cars = models.IntegerField(
        verbose_name='Количество исправных трамвайных вагонов', default=0)
    num_working_trolleybuses = models.IntegerField(
        verbose_name='Количество исправных троллейбусных машин', default=0)
    num_working_electrobuses = models.IntegerField(
        verbose_name='Количество исправных электробусов', default=0)
    num_working_buses = models.IntegerField(
        verbose_name='Количество исправных автобусов', default=0)
    num_working_metro_cars = models.IntegerField(
        verbose_name='Количество исправных вагонов метрополитена', default=0)
    percent_working_tramway_cars = models.FloatField(
        verbose_name='Процент исправных трамвайных вагонов', default=0.0)
    percent_working_trolleybuses = models.FloatField(
        verbose_name='Процент исправных троллейбусных машин', default=0.0)
    percent_working_electrobuses = models.FloatField(
        verbose_name='Процент исправных электробусов', default=0.0)
    percent_working_buses = models.FloatField(
        verbose_name='Процент исправных автобусов', default=0.0)
    percent_working_metro_cars = models.FloatField(
        verbose_name='Процент исправных вагонов метрополитена', default=0.0)
    num_all_buses_registry = models.IntegerField(
        verbose_name='Количество всех автобусов по Реестру', default=0)
    num_very_big_buses_registry = models.IntegerField(
        verbose_name='Количество автобусов особо большого класса по Реестру',
        default=0)
    num_big_buses_registry = models.IntegerField(
        verbose_name='Количество автобусов большого класса по Реестру',
        default=0)
    num_medium_buses_registry = models.IntegerField(
        verbose_name='Количество автобусов среднего класса по Реестру',
        default=0)
    num_small_buses_registry = models.IntegerField(
        verbose_name='Количество автобусов малого класса по Реестру',
        default=0)
    num_all_trolleybuses_registry = models.IntegerField(
        verbose_name='Количество всех троллейбусов и электробусов по Реестру',
        default=0)
    num_big_trolleybuses_registry = models.IntegerField(
        verbose_name='Количество троллейбусов и электробусов большого класса \
                по Реестру', default=0)
    num_very_big_trolleybuses_registry = models.IntegerField(
        verbose_name='Количество троллейбусов и электробусов особо большого \
                класса по Реестру', default=0)
    num_tramway_cars_registry = models.IntegerField(
        verbose_name='Количество всех трамваев по Реестру', default=0)
    num_big_tramway_cars_registry = models.IntegerField(
        verbose_name='Количество трамваев большого класаа по Реестру',
        default=0)
    num_very_big_tramway_cars_registry = models.IntegerField(
        verbose_name='Количество трамваев особо большого класаа по Реестру',
        default=0)
    avrg_age_tramway_car = models.FloatField(
        verbose_name='Средний возраст трамвайных вагонов', default=0.0)
    avrg_age_trolleybus = models.FloatField(
        verbose_name='Средний возраст троллейбусных машин', default=0.0)
    avrg_age_bus = models.FloatField(
        verbose_name='Средний возраст автобусов', default=0.0)
    avrg_age_electrobus = models.FloatField(
        verbose_name='Средний возраст электробусов', default=0.0)
    avrg_age_metro_car = models.FloatField(
        verbose_name='Средний возраст вагонов метро', default=0.0)
    num_low_profile_tramway_cars = models.IntegerField(
        verbose_name='Количество низкопольных трамвайных вагонов', default=0)
    num_low_profile_trolleybuses = models.IntegerField(
        verbose_name='Количество низкопольных троллейбусных машин', default=0)
    num_low_profile_buses = models.IntegerField(
        verbose_name='Количество низкопольных автобусов', default=0)
    num_low_profile_electrobuses = models.IntegerField(
        verbose_name='Количество низкопольных электробусов', default=0)
    num_new_GET = models.IntegerField(
        verbose_name='Обновленный подвижной состав ГЭТ', default=0)
    num_new_buses = models.IntegerField(
        verbose_name='Обновленный подвижной состав автобусов', default=0)
    proportion_low_profile_transport = models.FloatField(
        verbose_name='Доля ТС с низкопольными площадками', default=0.0)
    proportion_big_capacity_transport = models.FloatField(
        verbose_name='Доля ТС большой вместимости', default=0.0)
    proportion_electro_transport = models.FloatField(
        verbose_name='Доля электротранспорта в парке ТС НОТ', default=0.0)
    proportion_working_transport = models.FloatField(
        verbose_name='Доля рабочего ПС в парке ТС', default=0.0)
    percent_renew_program = models.FloatField(
        verbose_name='Участие в программах обновления подвижного состава',
        default=0.0)

    """ МАРШРУТЫ """
    #  1. Количество действующих трамвайных маршрутов
    num_in_use_tramway_routes = models.IntegerField(default=0)
    #  2. Количество действующих троллейбусных маршрутов
    num_in_use_trolleybus_routes = models.IntegerField(default=0)
    #  3. Количество действующих автобусных маршрутов
    num_in_use_bus_routes = models.IntegerField(default=0)
    #  4. Количество действующих маршрутов – всего.
    num_in_use_overall_routes = models.IntegerField(default=0)
    #  5. Количество маршрутов на регулируемом тарифе
    num_regulated_routes = models.IntegerField(default=0)
    #  6. Количество маршрутов на нерегулируемом тарифе
    num_unregulated_routes = models.IntegerField(default=0)
    #  7. Доля маршрутов, работающих на принципах нерегулируемого тарифа
    share_unregulated_routes = models.IntegerField(default=0)
    #  8. Средняя длина трамвайного маршрута
    length_avrg_tramway_route = models.FloatField(default=0.0)
    #  9. Средняя длина троллейбусного маршрута
    length_avrg_trolleybus_route = models.FloatField(default=0.0)
    # 10. Средняя длина автобусного маршрута
    length_avrg_bus_route = models.FloatField(default=0.0)
    # 11. Длина существующих трамвайных путей(в двухпутном исчислении)
    length_existing_tramway_routes = models.FloatField(default=0.0)
    # 12. Длина действующих трамвайных путей(в двухпутном исчислении)
    length_in_use_tramway_routes = models.FloatField(default=0.0)
    # 13. Длина существующей троллейбусной КС(в двухпутном исчислении)
    length_existing_trolleybus_routes = models.FloatField(default=0.0)
    # 14. Длина действующей троллейбусной КС(в двухпутном исчислении)
    length_in_use_trolleybus_routes = models.FloatField(default=0.0)
    # 15. Суммарная длина выделенных полос нерельсового ОТ
    length_overall_unrailed_path = models.FloatField(default=0.0)
    # 16. Процент обособления трамвайных путей
    percent_tramway_routes_isolation = models.FloatField(default=0.0)
    # 17. ***перспективные атрибуты по ВП, обсуждается
    # (???)
    # 18. Коэффициент использования трамвайной сети
    percent_tramway_net_use = models.FloatField(default=0.0)
    # 19. Коэффициент использования троллейбусной сети
    percent_trolleybus_net_use = models.FloatField(default=0.0)
    # 20. Количество сегментов, работающих в режиме средней загрузки
    # (???)
    # 21. Количество сегментов, работающих в режиме повышенной нагрузки
    # (???)
    # 22. Среднее время ожидания любого маршрута на остановке
    time_avrg_waiting_any_transport = models.FloatField(default=0.0)
    # 23. Среднее время ожидания конкретного маршрута на остановке
    time_avrg_waiting_specific_transport = models.FloatField(default=0.0)
    # 24. Маршрутный коэффициент
    route_coefficient = models.FloatField(default=0.0)
    # 25. Коэффициент непрямолинейности маршрутов НОТ
    # (???)
    # 26. Наличие официального/неофициального транспортного приложения
    transport_app_existance = models.FloatField(default=0.0)
    # 27. Доступность информации о движении ОТ в режиме реального времени
    # через Интернет
    real_time_internet_movement_information = models.FloatField(default=0.0)
    # 28. Наличие сайта с расписаниями движениями транспорта
    transport_movement_schedule_website = models.FloatField(default=0.0)
    # 29. Наличие карт-схем маршрутной сети
    transport_route_net_map = models.FloatField(default=0.0)
    # 30. Фирменный стиль общественного транспорта
    unique_transporte_style = models.FloatField(default=0.0)

    """ ТАРИФНАЯ СИСТЕМА """

    #  1. Средняя заработная плата по региону (руб.)
    salary_avrg = models.IntegerField(default=0)
    #  2. Среднедушевые взвешенные доходы населения по региону (руб.)
    income_avrg = models.IntegerField(default=0)
    #  3. Стоимость(месячного) проездного билета (руб.)
    salary_avrg = models.IntegerField(default=0)
    # 4. Отношение стоимость проездного билета к среднедушевым доходам
    # населения (%)
    ratio_ticket_cost_income = models.FloatField(default=0)
    # 5. Количество маршрутов на которых доступен проездной
    # билет(предусмотреть возможность агрегации данных на основе атрибута
    # маршрутов) (ед)
    num_routes_with_ticket = models.IntegerField(default=0)
    # 6. Количество маршрутов на которых доступен пересадочный
    # билет(предусмотреть возможность агрегации данных на основе атрибута
    # маршрутов) (ед.)
    num_routes_with_transfer_ticket = models.IntegerField(default=0)
    #  7. Социально - ориентированный тариф
    # (???)
    #  8. Стоимость разового билета на проезд (руб.)
    cost_one_travel_ticket = models.IntegerField(default=0)
    #  9. Стоимость проезда с учетом максимальной скидки
    # (???)
    # 10. Стоимость пересадочного тарифа (руб.)
    cost_transfer_ticket = models.IntegerField(default=0)
    # 11. Наличие универсальной транспортной карты – булев атрибут
    bool_universal_transport_card = models.BooleanField(default=False)
    # 12. Возможность дистанционного пополнения баланса и / или записи билетов
    # на транспортную карту – булев атрибут
    bool_online_payment = models.BooleanField(default=False)
    # 13. Возможность оплаты проезда внутри ТС с помощью мобильных устройств
    # или банковских карты
    bool_nfc_payment = models.BooleanField(default=False)
    # 14. Наличие пересадочного тарифа
    bool_transfer_tariff = models.BooleanField(default=False)
    # 15. Наличие тарифа на сутки и более
    bool_day_tariff = models.BooleanField(default=False)
    # 16. Наличие проездных билетов на длительный срок
    bool_long_time_tariff = models.BooleanField(default=False)


# Outer API
class LocationOfCity(models.Model):
    location = LocationField()
