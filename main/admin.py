from django.contrib import admin
from .models import ContactUsModel, VacancyCategory, Vacancy
from modeltranslation.admin import TranslationAdmin


@admin.register(ContactUsModel)
class ContactUsAdmin(admin.ModelAdmin):
    fields = ("name", "email", "message", "viewed")
    list_display = ("name", "email", "viewed")
    list_filter = ("viewed", )
    search_fields = ("name", "email")


@admin.register(VacancyCategory)
class VacancyCategoryAdmin(TranslationAdmin):
    fields = ("name", )
    list_display = ("name", )


@admin.register(Vacancy)
class VacancyAdmin(TranslationAdmin):
    fields = ("name", "category", "salary_from", "salary_to")
    list_display = ("name", "category", "display_salary")
