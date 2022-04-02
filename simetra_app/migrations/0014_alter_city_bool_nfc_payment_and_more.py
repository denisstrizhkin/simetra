# Generated by Django 4.0.3 on 2022-04-01 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simetra_app', '0013_alter_city_percent_renew_program'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='bool_nfc_payment',
            field=models.BooleanField(default=False, verbose_name='Возможность оплаты проезда внутри ТС с помощью мобильных устройств или банковских карт'),
        ),
        migrations.AlterField(
            model_name='city',
            name='bool_rt_internet_movement_info',
            field=models.FloatField(default=0.0, verbose_name='Доступность информации о движении ОТ в режиме реального времени через Интернет'),
        ),
        migrations.AlterField(
            model_name='city',
            name='bool_transport_app',
            field=models.FloatField(default=0.0, verbose_name='Наличие официального/неофициального транспортного приложения'),
        ),
        migrations.AlterField(
            model_name='city',
            name='num_routes_with_pass',
            field=models.IntegerField(default=0, verbose_name='Количество маршрутов, на которых доступен проездной билет'),
        ),
        migrations.AlterField(
            model_name='city',
            name='num_routes_with_transfer_pass',
            field=models.IntegerField(default=0, verbose_name='Количество маршрутов, на которых доступен пересадочный билет'),
        ),
        migrations.AlterField(
            model_name='city',
            name='num_segments_avrg_load',
            field=models.IntegerField(default=0, verbose_name='Количество сегментов, работающих в режиме средней загрузки'),
        ),
        migrations.AlterField(
            model_name='city',
            name='num_segments_high_load',
            field=models.IntegerField(default=0, verbose_name='Количество сегментов, работающих в режиме повышенной загрузки'),
        ),
        migrations.AlterField(
            model_name='city',
            name='proportion_routes_unregulated_tariff',
            field=models.IntegerField(default=0, verbose_name='Доля маршрутов, работающих на принципах нерегулируемого тарифа'),
        ),
        migrations.AlterField(
            model_name='city',
            name='ratio_pass_cost_to_income',
            field=models.FloatField(default=0, verbose_name='Отношение стоимость проездного билета к среднедушевым доходам населения'),
        ),
        migrations.AlterField(
            model_name='city',
            name='time_avrg_waiting_specific_transport',
            field=models.FloatField(default=0.0, verbose_name='Среднее время ожидания конкретного маршрута на остановке'),
        ),
    ]
