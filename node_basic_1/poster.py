import requests 
import time
from random import seed
from random import random

seed(1)

PRIVATE_KEY = 'a123'

API_ENDPOINT = "http://localhost:8000/api/user"

temp=25.0
press=1000.0

while True:

    temp = temp+2*random()-1
    press = press+2*random()-1

    print(temp,press)

    data = {'private_key':PRIVATE_KEY, 
            'temperature':temp, 
            'pressure':press
            } 

    r = requests.post(url = API_ENDPOINT, json = data) 

    print('posted')

    time.sleep(1)
