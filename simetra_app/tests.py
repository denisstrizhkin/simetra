from email.policy import default
from django.test import TestCase
from django.db import models

from .models import Boss

class TestBoss(TestCase):
    def setUp(self):
        self.boss1 = Boss(
            name='Freddie Mercury',
            position='Singer',
            quote="They wouldn't let us into Russia. They thought we'w corrupt the youth or something.",
        )

    def test_image_default_url(self):
        default_image = models.ImageField('media/employees/default-avatar.jpg')
        self.assertEqual(self.boss1.image, default_image)
