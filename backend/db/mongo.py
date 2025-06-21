from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")  # or your remote URI
db = client["smart_assistant"]
users_collection = db["users"]


