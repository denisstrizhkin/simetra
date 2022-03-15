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
    # 1. Безопасность и устойчивое развитие (
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
    #  1. Численность населения

    #  2. Протяженность УДС первой/второй категории
    #  3. Площадь активной зоны города
    #  4. Пассажиропоток наземного общественного транспорта (год)
    #  5. Пассажиропоток метрополитена (год)
    #  6. Количество действующих остановочных пунктов
    #  7. Количество остановочных пунктов в черте активной зоны города
    #  8. Кол-во многоквартирных домов
    #  9. Доля домов в зоне покрытия
    # 10. Доля населения в зоне покрытия
    # 11. Площадь покрытия активной зоны города пунктами остановок:
    # 12. Доля домов в зоне покрытия метрополитеном
    # 13. Доля населения в зоне покрытия метрополитеном
    # 14. Площадь покрытия станциями метрополитена
    # 15. Плотность остановок распределения остановочных пунктов по территории активной зоны города
    # 16. Процент покрытой территории (700 м)
    # 17. Процент покрытой территории от станций метрополитена (1000 м)
    # 18. Население и доля населения с доступом к метрополитену
    # 19. Население и доля населения с доступом к общественному транспорту
