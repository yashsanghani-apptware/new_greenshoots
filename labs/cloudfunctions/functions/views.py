# cloudfunctions/functions/views.py

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Function
from .utils import register_function, activate_function, deactivate_function, handle_uploaded_file
import importlib.util
import os
import json
import requests
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["POST"])
def deploy_function(request):
    try:
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file provided'}, status=400)
        file = request.FILES['file']
        success = register_function(file)
        if success:
            return JsonResponse({'success': 'Function deployed successfully'}, status=201)
        else:
            return JsonResponse({'error': 'Failed to deploy function'}, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
def list_functions(request):
    try:
        functions = Function.objects.all().values('name', 'is_active', 'code_path')
        return JsonResponse(list(functions), safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["PUT"])
def activate_function_view(request, func_name):
    try:
        success = activate_function(func_name)
        if success:
            return JsonResponse({'success': f'Function {func_name} activated'}, status=200)
        else:
            return JsonResponse({'error': f'Function {func_name} not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def deactivate_function_view(request, func_name):
    try:
        success = deactivate_function(func_name)
        if success:
            return JsonResponse({'success': f'Function {func_name} deactivated'}, status=200)
        else:
            return JsonResponse({'error': f'Function {func_name} not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def run_function(request, func_name):
    # Default notification URLs
    on_success = None
    on_fail = None

    try:
        # Load the function
        function = Function.objects.get(name=func_name, is_active=True)
        spec = importlib.util.spec_from_file_location("module.name", os.path.join(function.code_path, 'hello.py'))
        foo = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(foo)

        # Try to extract notification settings from the request
        try:
            data = json.loads(request.body)
            notify_data = data.get('notify', {})
            on_success = notify_data.get('on_success', None)
            on_fail = notify_data.get('on_error', None)
        except json.JSONDecodeError:
            # If there's an error decoding JSON, proceed without notification settings
            pass

        # Execute the function
        result = foo.run()

        # Send notification based on execution results
        message = {'status': 'success', 'result': result}
        if result and on_success:
            requests.post(on_success, json=message)
        elif not result and on_fail:
            message = {'status': 'error', 'result': result}
            requests.post(on_fail, json=message)

        return JsonResponse(message, safe=False)

    except Function.DoesNotExist:
        return JsonResponse({'error': 'Function not found or is not active'}, status=404)
    except Exception as e:
        error_message = {'error': str(e)}
        if on_fail:
            requests.post(on_fail, json={'status': 'error', 'error': str(e)})
        return JsonResponse(error_message, status=500)

