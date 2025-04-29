import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

EXPO_PUSH_TOKEN = os.getenv("EXPO_PUSH_TOKEN")

if not EXPO_PUSH_TOKEN:
    raise ValueError("Expo push token not set in .env file.")

def send_push_notification(title, body, data=None):
    message = {
        'to': EXPO_PUSH_TOKEN,
        'sound': 'default',
        'title': title,
        'body': body,
        'data': data or {}
    }

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    response = requests.post(
        'https://exp.host/--/api/v2/push/send',
        headers=headers,
        data=json.dumps(message)
    )

    print("Status:", response.status_code)
    print("Response:", response.text)
