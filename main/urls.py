from django.urls import path
from . import views

urlpatterns = [
    path("", views.Main.as_view(), name="main"),
    path("contact/", views.Contact.as_view(), name="contact"),
    path("about/", views.About.as_view(), name="about"),
    path("vacancies", views.Vacancies.as_view(), name="vacancies")
]
