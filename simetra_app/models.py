from django.db import models
from pathlib import Path
import uuid


def get_uuid4_filename(filename):
    suffix = Path(filename).suffix
    basename = Path(str(uuid.uuid4()))
    return basename.with_suffix(suffix)


class Boss(models.Model):
    def __str__(self):
        return self.name

    def get_upload_path(self, filename):
        return Path('main_page/bosses', get_uuid4_filename(filename))

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=200)
    quote = models.TextField()
    image = models.ImageField(
        default='default-boss.jpg',
        upload_to=get_upload_path
    )


class Employee(models.Model):
    def __str__(self):
        return self.name

    def get_upload_path(self, filename):
        return Path('main_page/employees', get_uuid4_filename(filename))

    name = models.CharField(max_length=100)
    position = models.CharField(max_length=200)
    image = models.ImageField(
        default='default-employee.jpg',
        upload_to=get_upload_path
    )


class City(models.Model):
    def __str__(self):
        return self.name

    # Имя города
    name = models.CharField(max_length=100)

    """ КАЧЕСТВЕННЫЕ ГРУППЫ (рейтинг 0.0 - 100.0) """
    # 1. Безопасность и устойчивое развитие
    rating_security_n_development = models.FloatField(
        default=0.0, blank=False, null=False)
    # 2. Комфорт и удобство
    rating_comfort_n_convenience = models.FloatField(
        default=0.0, blank=False, null=False)
    # 3. Эффективность маршрутной сети
    rating_route_network_efficiency = models.FloatField(
        default=0.0, blank=False, null=False)
    # 4. Ценовая доступность
    rating_affordability = models.FloatField(
        default=0.0, blank=False, null=False)
    # 5. Физическая доступность
    rating_physical_availability = models.FloatField(
        default=0.0, blank=False, null=False)

    """ ПРОСТРАНСТВЕННЫЕ ХАРАКТЕРИСТИКИ """
    #  1. Численность населения (млн чел.)
    num_population = models.FloatField(default=0.0, blank=False, null=False)
    #  2. Протяженность УДС первой/второй категории (км)
    length_UDS = models.FloatField(default=0.0, blank=False, null=False)
    #  3. Площадь активной зоны города (кв. км)
    area_active_zone = models.FloatField(default=0.0, blank=False, null=False)
    #  4. Пассажиропоток наземного общественного транспорта (год) (млн чел.)
    traffic_transport = models.FloatField(default=0.0, blank=False, null=False)
    #  5. Пассажиропоток метрополитена (год) (млн чел.)
    traffic_metro = models.FloatField(default=0.0, blank=False, null=False)
    #  6. Количество действующих остановочных пунктов (ед.)
    num_working_stops_overall = models.IntegerField(
        default=0, blank=False, null=False)
    #  7. Количество остановочных пунктов в черте активной зоны города (ед.)
    num_working_stops_active_zone = models.IntegerField(
        default=0, blank=False, null=False)
    #  8. Кол-во многоквартирных домов (ед.)
    num_of_apartments = models.IntegerField(default=0, blank=False, null=False)
    #  9. Доля домов в зоне покрытия
    # ??? (не могу найти)
    # 10. Доля населения в зоне покрытия (%)
    percent_people_transport_zone = models.FloatField(
        default=0.0, blank=False, null=False)
    # 11. Площадь покрытия активной зоны города пунктами остановок:
    area_stops_coverage_active_zone = models.FloatField(
        default=0.0, blank=False, null=False)
    # 12. Доля домов в зоне покрытия метрополитеном
    # ??? (не могу найти)
    # 13. Доля населения в зоне покрытия метрополитеном (%)
    percent_people_metro_zone = models.FloatField(
        default=0.0, blank=False, null=False)
    # 14. Площадь покрытия станциями метрополитена
    area_metro_coverage = models.FloatField(
        default=0.0, blank=False, null=False)
    # 15. Плотность остановок распределения остановочных пунктов по территории
    # активной зоны города (ед./кв.км)
    density_stops_active_zone = models.FloatField(
        default=0.0, blank=False, null=False)
    # 16. Процент покрытой территории (700 м) (%)
    percent_transport_covered_area = models.FloatField(
        default=0.0, blank=False, null=False)
    # 17. Процент покрытой территории от станций метрополитена (1000 м) (%)
    percent_metro_covered_area = models.FloatField(
        default=0.0, blank=False, null=False)
    # 18. Население с доступом к метрополитену
    num_people_metro_access = models.IntegerField(
        default=0, blank=False, null=False)
    # 19. Доля населения с доступом к метрополитену
    percent_people_metro_access = models.FloatField(
        default=0.0, blank=False, null=False)
    # 20. Население с доступом к общественному транспорту
    num_people_transport_access = models.IntegerField(
        default=0, blank=False, null=False)
    # 21. Доля населения с доступом к общественному транспорту
    percent_people_transport_access = models.FloatField(
        default=0.0, blank=False, null=False)
    # 22. Средневзвешенное расстояние между остановками (м)
    length_avrg_between_stops = models.FloatField(
        default=0.0, blank=False, null=False)
    # 23. Число погибших на ОТ (чел.)
    num_death_toll = models.IntegerField(default=0, blank=False, null=False)
    # 24. Число раненых на ОТ (чел.)
    num_wounded = models.IntegerField(default=0, blank=False, null=False)
    # 25. Число ДТП с участием ОТ (ед.)
    num_accidents = models.IntegerField(default=0, blank=False, null=False)
    # 26. Число ДТП в расчете на единицу подвижного состава (ед./TC)
    num_accidents_per_unit = models.FloatField(
        default=0.0, blank=False, null=False)
    # 27. Число раненых и погибших в расчете на 1 ДТП (чел./ед.)
    num_wounded_per_accident = models.FloatField(
        default=0.0, blank=False, null=False)
    # 28. Количество раненых и погибших в расчете на млн пассажиров
    # (чел./млн.чел.)
    num_wndd_n_dead_per_people = models.FloatField(
        default=0.0, blank=False, null=False)

    """ ПОДВИЖНОЙ СОСТАВ """

    # Количество трамвайных вагонов
    # Количество троллейбусных машин
    # Количество электробусов
    # Количество автобусов (*по данным о парках городских перевозчиков)
    # Количество вагонов метрополитена
    # Количество исправных трамвайных вагонов
    # Количество исправных троллейбусных машин
    # Количество исправных электробусов
    # Количество исправных автобусов
    # Количество исправных вагонов метрополитена
    # Процент исправных трамвайных вагонов
    # Процент исправных троллейбусных машин
    # Процент исправных электробусов
    # Процент исправных автобусов
    # Процент исправных вагонов метрополитена
    # Количество автобусов по Реестру:
    # из них особо большого класса
    # из них большого класса
    # из них малого класса
    # Количество троллейбусов и электробусов по Реестру:
    # из них большого класса
    # из них особо большого класса
    # Количество трамваев по Реестру:
    # из них большого класса
    # из них особо большого класса
    # Средний возраст трамвайных вагонов
    # Средний возраст троллейбусных машин
    # Средний возраст автобусов(*по данным о парках городских перевозчиков)
    # Средний возраст электробусов
    # Средний возраст вагонов метро
    # Количество низкопольных трамвайных вагонов
    # Количество низкопольных троллейбусных машин
    # Количество низкопольных автобусов(*по данным о парках городских перевозчиков)
    # Количество низкопольных электробусов
    # Обновленный подвижной состав ГЭТ(*с учетом нормативных сроков эксплуатации)
    # Обновленный подвижной состав автобусов(*с учетом нормативных сроков эксплуатации)
    # Доля ТС с низкопольными площадками
    # Доля ТС большой вместимости
    # Доля электротранспорта в парке ТС НОТ
    # Доля рабочего ПС в парке ТС
    # Участие в программах обновления подвижного состава – булев атрибут,
    # вместо галочки может быть логотип БКАД

    """ МАРШРУТЫ """
    #  1. Количество действующих трамвайных маршрутов
    #  2. Количество действующих троллейбусных маршрутов
    #  3. Количество действующих автобусных маршрутов
    #  4. Количество действующих маршрутов – всего.
    #  5. Количество маршрутов на регулируемом тарифе
    #  6. Количество маршрутов на нерегулируемом тарифе
    #  7. Доля маршрутов, работающих на принципах нерегулируемого тарифа
    #  8. Средняя длина трамвайного маршрута
    #  9. Средняя длина троллейбусного маршрута
    # 10. Средняя длина автобусного маршрута
    # 11. Длина существующих трамвайных путей(в двухпутном исчислении)
    # 12. Длина действующих трамвайных путей(в двухпутном исчислении)
    # 13. Длина существующей троллейбусной КС(в двухпутном исчислении)
    # 14. Длина действующей троллейбусной КС(в двухпутном исчислении)
    # 15. Суммарная длина выделенных полос нерельсового ОТ
    # 16. Процент обособления трамвайных путей
    # 17. ***перспективные атрибуты по ВП, обсуждается
    # 18. Коэффициент использования трамвайной сети
    # 19. Коэффициент использования троллейбусной сети
    # 20. Количество сегментов, работающих в режиме средней загрузки
    # 21. Количество сегментов, работающих в режиме повышенной нагрузки
    # 22. Среднее время ожидания любого маршрута на остановке
    # 23. Среднее время ожидания конкретного маршрута на остановке
    # 24. Маршрутный коэффициент
    # 25. Коэффициент непрямолинейности маршрутов НОТ
    # 26. Наличие официального/неофициального транспортного приложения
    # 27. Доступность информации о движении ОТ в режиме реального времени через Интернет
    # 28. Наличие сайта с расписаниями движениями транспорта
    # 29. Наличие карт-схем маршрутной сети
    # 30. Фирменный стиль общественного транспорта

    """ ТАРИФНАЯ СИСТЕМА """

    #  1. Средняя заработная плата по региону
    #  2. Среднедушевые взвешенные доходы населения по региону
    #  3. Стоимость(месячного) проездного билета
    #  4. Отношение стоимость проездного билета к среднедушевым доходам населения
    #  5. Количество маршрутов на которых доступен проездной билет(предусмотреть возможность агрегации данных на основе атрибута маршрутов)
    #  6. Количество маршрутов на которых доступен пересадочный билет(предусмотреть возможность агрегации данных на основе атрибута маршрутов)
    #  7. Социально - ориентированный тариф
    #  8. Стоимость разового билета на проезд
    #  9. Стоимость проезда с учетом максимальной скидки
    # 10. Стоимость пересадочного тарифа
    # 11. Наличие универсальной транспортной карты – булев атрибут
    # 12. Возможность дистанционного пополнения баланса и / или записи билетов на транспортную карту – булев атрибут
    # 13. Возможность оплаты проезда внутри ТС с помощью мобильных устройств или банковских карты
    # 14. Наличие пересадочного тарифа
    # 15. Наличие тарифа на сутки и более
    # 16. Наличие проездных билетов на длительный срок
