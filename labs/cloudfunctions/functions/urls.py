# cloudfunctions/functions/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_functions, name='list_functions'),  # GET to list all functions
    path('deploy/', views.deploy_function, name='deploy_function'),  # POST to deploy a new function
    path('<str:func_name>/activate/', views.activate_function_view, name='activate_function'),  # PUT to activate a function
    path('<str:func_name>/deactivate/', views.deactivate_function_view, name='deactivate_function'),  # DELETE to deactivate a function
    path('run/<str:func_name>/', views.run_function, name='run_function'),  # POST to run a specific function
]

