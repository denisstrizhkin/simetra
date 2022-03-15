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
    security_and_development = models.FloatField(
        default=0.0, blank=False, null=False)
    # 2. Комфорт и удобство
    comvort_and_convenience = models.FloatField(
        default=0.0, blank=False, null=False)
    # 3. Эффективность маршрутной сети
    route_network_efficiency = models.FloatField(
        default=0.0, blank=False, null=False)
    # 4. Ценовая доступность
    affordability = models.FloatField(
        default=0.0, blank=False, null=False)
    # 5. Физическая доступность
    physical_availability = models.FloatField(
        default=0.0, blank=False, null=False)

    """ ПРОСТРАНСТВЕННЫЕ ХАРАКТЕРИСТИКИ """
    #  1. Численность населения (млн чел.)
    population = models.FloatField(default=0.0, blank=False, null=False)
    #  2. Протяженность УДС первой/второй категории (км)
    length_UDS = models.FloatField(default=0.0, blank=False, null=False)
    #  3. Площадь активной зоны города (кв. км)
    active_zone_area = models.FloatField(default=0.0, blank=False, null=False)
    #  4. Пассажиропоток наземного общественного транспорта (год) (млн чел.)
    transport_passenger_traffic = models.FloatField(
        default=0.0, blank=False, null=False)
    #  5. Пассажиропоток метрополитена (год) (млн чел.)
    metro_passenger_traffic = models.FloatField(
        default=0.0, blank=False, null=False)
    #  6. Количество действующих остановочных пунктов (ед.)
    num_of_working_stops_overall = models.IntegerField(
        default=0, blank=False, null=False)
    #  7. Количество остановочных пунктов в черте активной зоны города (ед.)
    num_of_working_stops_active_zone = models.IntegerField(
        default=0, blank=False, null=False)
    #  8. Кол-во многоквартирных домов (ед.)
    num_of_apartments = models.IntegerField(default=0, blank=False, null=False)
    #  9. Доля домов в зоне покрытия
    # ??? (не могу найти)
    # 10. Доля населения в зоне покрытия (%)
    percent_of_people_in_transport_zone = models.FloatField(
        default=0.0, blank=False, null=False)
    # 11. Площадь покрытия активной зоны города пунктами остановок:
    transport_area_coverage = models.FloatField(
        default=0.0, blank=False, null=False)
    # 12. Доля домов в зоне покрытия метрополитеном
    # ??? (не могу найти)
    # 13. Доля населения в зоне покрытия метрополитеном (%)
    percent_of_people_in_metro_zone = models.FloatField(
        default=0.0, blank=False, null=False)
    # 14. Площадь покрытия станциями метрополитена
    metro_area_coverage = models.FloatField(
        default=0.0, blank=False, null=False)
    # 15. Плотность остановок распределения остановочных пунктов по территории
    # активной зоны города (ед./кв.км)
    stops_density_in_active_zone = models.FloatField(
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
