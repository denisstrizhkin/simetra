from django.test import TestCase

from simetra_app.models import Boss, Employee, City


class TestBoss(TestCase):

    def setUp(self):
        self.boss_1 = Boss.objects.create(
            name="Freddie Mercury",
            position="Singer",
            quote="They wouldn't let us into Russia. They thought we'd corrupt the youth or something."
        )

    def test_does_name_have_valid_length(self):
        max_length = self.boss_1._meta.get_field('name').max_length
        self.assertEqual(max_length, 100)

    def test_does_position_have_valid_length(self):
        max_length = self.boss_1._meta.get_field("position").max_length
        self.assertEqual(max_length, 200)

    def test_does_image_have_default_path(self):
        default_image = "main_page/bosses/default-avatar.jpg"
        self.assertEqual(self.boss_1.image.name, default_image)


class TestEmployee(TestCase):

    def setUp(self):
        self.employee_1 = Employee.objects.create(
            name="Simetra Employee",
            position="Trainee"
        )

    def test_does_name_have_valid_length(self):
        max_length = self.employee_1._meta.get_field('name').max_length
        self.assertEqual(max_length, 100)

    def test_does_position_have_valid_length(self):
        max_length = self.employee_1._meta.get_field("position").max_length
        self.assertEqual(max_length, 200)

    def test_does_image_have_default_path(self):
        default_image = "main_page/employees/default-avatar.jpg"
        self.assertEqual(self.employee_1.image.name, default_image)


class TestCity(TestCase):

    def setUp(self):
        self.city_1 = City.objects.create(
            name="Saint-Petersburg",
            longitude=30.19,
            latitude=59.57,
            russian_name="Санкт-Петербург",
        )

    def test_does_name_have_valid_length(self):
        max_length_eng = self.city_1._meta.get_field("name").max_length
        max_length_rus = self.city_1._meta.get_field("russian_name").max_length
        self.assertEqual(max_length_eng, 100)
        self.assertEqual(max_length_rus, 100)
