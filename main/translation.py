from modeltranslation.translator import register, TranslationOptions
from .models import VacancyCategory, Vacancy


@register(VacancyCategory)
class VacancyCategoryOption(TranslationOptions):
    fields = ("name", )


@register(Vacancy)
class VacancyOptions(TranslationOptions):
    fields = ("name", )
