# Generated by Django 4.0.3 on 2022-03-11 11:29

from django.db import migrations, models
import simetra_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('simetra_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='boss',
            options={'verbose_name_plural': 'Bosses'},
        ),
        migrations.AlterField(
            model_name='boss',
            name='image',
            field=models.ImageField(default='main_page/bosses/default-avatar.jpg', upload_to=simetra_app.models.Boss.get_upload_path),
        ),
        migrations.AlterField(
            model_name='employee',
            name='image',
            field=models.ImageField(default='main_page/employees/default-avatar.jpg', upload_to=simetra_app.models.Employee.get_upload_path),
        ),
    ]