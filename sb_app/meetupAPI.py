import requests

r = requests.get('https://api.meetup.com/find/locations')

print(r)