from flask import Flask, request
import requests
import json
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
GEOLOCATION_API_KEY = os.getenv("GEOLOCATION_API_KEY")
latitude = os.getenv("latitude")
longitude = os.getenv("longitude")


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def get_recommendations(restaurantName, distance, cuisine, rating, status):
    global latitude
    global longitude
    resp = requests.get("https://api.spoonacular.com/food/restaurants/search",
                 params = {
                     "apiKey":SPOONACULAR_API_KEY,
                     "query": restaurantName,
                     "lat": latitude,
                     "lng": longitude,
                     "distance": distance,
                     "cuisine": cuisine,
                     "min-rating": rating,
                     "is-open": status
                 })
    data = resp.json()
    return data

@app.route("/", methods=["GET"])
def home():
    # resp = requests.get("https://ipgeolocation.abstractapi.com/v1",
    #                 params = {
    #                    "api_key": GEOLOCATION_API_KEY
    #                 })
    # data = resp.json()
    # global latitude
    # global longitude
    # latitude = data["latitude"]
    # longitude = data["longitude"]
    return "There is nothing for you here!"
    


@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    restaurantName = data["restaurantName"]
    distance = float(data["distance"])
    cuisine = data["cuisine"]
    rating = int(data["rating"])
    status = True if data["open"] == 'true' else False    
    return get_recommendations(restaurantName, distance, cuisine, rating, status)