# Generated by Django 4.0.6 on 2022-07-29 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_vacancycategory_vacancy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vacancy',
            name='salary_to',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Salary to'),
        ),
    ]