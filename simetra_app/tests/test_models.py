from django.test import TestCase

from simetra_app.models import Boss, Employee, City
from django.db import models


# Create your tests here.

class TestBoss(TestCase):

    def setUp(self):
        self.boss_1 = Boss.objects.create(
            name="Freddie Mercury",
            position="Singer",
            quote="They wouldn't let us into Russia. They thought we'd corrupt the youth or something."
        )

    def test_image_default_path(self):
        default_image = "main_page/bosses/default-avatar.jpg"
        self.assertEqual(self.boss_1.image.name, default_image)


class TestEmployee(TestCase):

    def setUp(self):
        self.employee_1 = Employee.objects.create(
            name="Simetra Employee",
            position="Trainee"
        )

    def test_image_default_path(self):
        default_image = "main_page/employees/default-avatar.jpg"
        self.assertEqual(self.employee_1.image.name, default_image)