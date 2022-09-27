from django.db import models
from django.utils.translation import gettext_lazy as _


class ContactUsModel(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=120, verbose_name="Persons email address")
    message = models.TextField(max_length=1200)
    viewed = models.BooleanField(default=False, blank=True, null=True)

    def get_absolute_url(self):
        return "/contact/"

    def __str__(self):
        return f"Message from {self.name}"

    class Meta:
        verbose_name = _("Contact request")
        verbose_name_plural = _("Contact requests")


class VacancyCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Vacancy category")
        verbose_name_plural = _("Vacancies categories")


class Vacancy(models.Model):
    category = models.ForeignKey("VacancyCategory", on_delete=models.CASCADE, verbose_name=_("category"))
    name = models.CharField(max_length=255, blank=False, verbose_name=_("vacancy name"))
    salary_from = models.PositiveIntegerField(verbose_name=_("Salary from"))
    salary_to = models.PositiveIntegerField(
        blank=True, null=True, help_text=_("not necessary field"), verbose_name=_("Salary to")
    )

    def __str__(self):
        return self.name

    def display_salary(self):
        return f"~{self.salary_from}€ - {self.salary_to}€" if self.salary_to else f"{self.salary_from}€"

    class Meta:
        verbose_name = _("Vacancy")
        verbose_name_plural = _("Vacancies")
