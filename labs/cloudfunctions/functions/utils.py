import os
import zipfile
import shutil
from .models import Function
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def handle_uploaded_file(f, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)  # Ensure directory exists
    try:
        with open(file_path, 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)
        return file_path
    except IOError as e:
        logger.error(f"Failed to write file {file_path}: {e}")
        raise

def register_function(file):
    try:
        # Save uploaded file
        filename = file.name
        file_path = handle_uploaded_file(file, filename)

        # Extract ZIP file
        extract_path = os.path.splitext(file_path)[0]
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.extractall(extract_path)

        # Register function in DB
        func_name = os.path.basename(extract_path)
        func, created = Function.objects.get_or_create(name=func_name, defaults={'code_path': extract_path})

        if not created:
            logger.info(f"Function {func_name} updated")
        else:
            logger.info(f"Function {func_name} registered")

        return True
    except Exception as e:
        logger.error("Failed to register function", exc_info=True)
        return False

def get_functions():
    return list(Function.objects.values('name', 'is_active', 'code_path'))

def activate_function(func_name):
    try:
        func = Function.objects.get(name=func_name)
        func.is_active = True
        func.save()
        logger.info(f"Function {func_name} activated")
        return True
    except ObjectDoesNotExist:
        logger.error(f"Function {func_name} not found")
        return False

def deactivate_function(func_name):
    try:
        func = Function.objects.get(name=func_name)
        func.is_active = False
        func.save()
        logger.info(f"Function {func_name} deactivated")
        return True
    except ObjectDoesNotExist:
        logger.error(f"Function {func_name} not found")
        return False

