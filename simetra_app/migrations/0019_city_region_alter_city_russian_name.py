# Generated by Django 4.0.3 on 2022-04-11 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simetra_app', '0018_city_russian_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='region',
            field=models.CharField(default='', max_length=5, verbose_name='Округ'),
        ),
        migrations.AlterField(
            model_name='city',
            name='russian_name',
            field=models.CharField(default='', max_length=100, verbose_name='Русское название'),
        ),
    ]
