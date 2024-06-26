# Generated by Django 4.0.6 on 2022-07-29 13:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_vacancy_salary_to'),
    ]

    operations = [
        migrations.AddField(
            model_name='vacancy',
            name='name_en',
            field=models.CharField(max_length=255, null=True, verbose_name='vacancy name'),
        ),
        migrations.AddField(
            model_name='vacancy',
            name='name_ru',
            field=models.CharField(max_length=255, null=True, verbose_name='vacancy name'),
        ),
        migrations.AddField(
            model_name='vacancycategory',
            name='name_en',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='vacancycategory',
            name='name_ru',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='vacancy',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.vacancycategory', verbose_name='category'),
        ),
        migrations.AlterField(
            model_name='vacancy',
            name='name',
            field=models.CharField(max_length=255, verbose_name='vacancy name'),
        ),
        migrations.AlterField(
            model_name='vacancy',
            name='salary_to',
            field=models.PositiveIntegerField(blank=True, help_text='not necessary field', null=True, verbose_name='Salary to'),
        ),
    ]
