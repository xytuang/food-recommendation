from flask import Flask, request
import requests
import json
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os

SECRET_KEY = os.getenv("API_KEY")
LATITUDE = os.getenv("latitude")
LONGITUDE = os.getenv("longitude")


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def get_recommendations(restaurantName, distance, cuisine, rating, status):
    resp = requests.get("https://api.spoonacular.com/food/restaurants/search",
                 params = {
                     "apiKey":SECRET_KEY,
                     "query": restaurantName,
                     "lat": LATITUDE,
                     "lng": LONGITUDE,
                     "distance": distance,
                     "cuisine": cuisine,
                     "min-rating": rating,
                     "is-open": status
                 })
    data = resp.json()
    return data

@app.route("/")
def home():
    return "nothing"


@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    restaurantName = data["restaurantName"]
    distance = float(data["distance"])
    cuisine = data["cuisine"]
    rating = int(data["rating"])
    status = True if data["open"] == 'true' else False    
    return get_recommendations(restaurantName, distance, cuisine, rating, status)