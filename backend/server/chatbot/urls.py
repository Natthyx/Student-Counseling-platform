from django.urls import path
from . import views

urlpatterns = [
    path('chatbot/', views.chatbot, name='chatbot'),
    path('csrf/', views.get_csrf_token, name='get_csrf_token'),# Ensure this matches your view function name
]
