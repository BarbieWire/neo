from django.urls import path
from . import views

from django.urls import path
from .views import set_language


urlpatterns = [
    path("", views.Main.as_view(), name="home"),
    path("contact/", views.Contact.as_view(), name="contact"),
    path("about/", views.About.as_view(), name="about"),
    path("vacancies", views.Vacancies.as_view(), name="vacancies"),

    # non-redirect views (forms)
    path('set-language/', set_language, name='set_language'),
]
