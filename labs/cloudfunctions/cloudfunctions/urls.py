# cloudfunctions/cloudfunctions/urls.py

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/functions/', include('functions.urls')),  # Include the functions app's URLs under the 'api/functions/' path
]

