from django.db import models
from pathlib import Path
import uuid


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
        default='main_page/employees/default-avatar.jpg',
        upload_to=get_upload_path
    )


class City(models.Model):
    class Meta:
        verbose_name_plural = 'Cities'

    def __str__(self):
        return self.name

    name = models.CharField(max_length=100)
