from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from .openai_interaction import ask_openai
from django.middleware import csrf


    
@csrf_exempt
@require_http_methods(["POST"])
def chatbot(request):
    try:
        data = json.loads(request.body)
        message = data['message']
        response = ask_openai(message)
        return JsonResponse({'message': message, 'response': response})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)



@csrf_exempt
def get_csrf_token(request):
    csrf_token = csrf.get_token(request)
    response = JsonResponse({'csrfToken': csrf_token})
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response["Access-Control-Allow-Credentials"] = "true"
    return response