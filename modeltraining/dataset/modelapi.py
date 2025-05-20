#import necessary libraries for model prediction
from PIL import Image
import torch
from torchvision import transforms
import torchvision.models as models
from fastapi import FastAPI, UploadFile, File
import torch.nn as nn
from fastapi.middleware.cors import CORSMiddleware

#initialize fastapi server
app = FastAPI()
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#add middleware for cross origin resource sharing (because using different ports)
app.add_middleware(
    CORSMiddleware,
    #allows react frontend to communicate with fastapi
    allow_origins=["*"], 
    #perains to authentication(e.g.,tokens)
    allow_credentials=True,
    #allows usage of HTTP POST request for prediction
    allow_methods=["*"],  
    #allows for files to be uploaded
    allow_headers=["*"],  
)

#need to redifine model architrcture, in order to create a prediction
data_transforms = transforms.Compose([
    transforms.Resize((224, 224)), 
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

#include breeds in order to be able to map prediction with actual breed
class_names = [
    "Abyssinian",                    "American Bulldog",        "American Pit Bull Terrier",
    "Basset Hound",                  "Beagle",                  "Bengal",
    "Birman",                        "Bombay",                  "Boxer",
    "British Shorthair",             "Chihuahua",               "Egyptian Mau",
    "English Cocker Spaniel",        "English Setter",          "German Shorthaired",
    "Great Pyrenees",                "Havanese",                "Japanese Chin",
    "Keeshond",                      "Leonberger",              "Maine Coon",
    "Miniature Pinscher",            "Newfoundland",            "Persian",
    "Pomeranian",                    "Pug",                     "Ragdoll",
    "Russian Blue",                  "Saint Bernard",           "Samoyed",
    "Scottish Terrier",              "Shiba Inu",               "Siamese",
    "Sphynx",                        "Staffordshire Bull Terrier", "Wheaten Terrier",
    "Yorkshire Terrier",
]
#redifining model architecture
model = torch.load("pet_breed_classifier_full.pth", map_location = device, weights_only = False)
#put model in evaluation mode so that we only make predictions
model.eval()

#declare request where images where will be uploaded
@app.post("/predict/") 
async def make_prediction(file: UploadFile = File(...)):
    image = Image.open(file.file).convert('RGB')
    image = data_transforms(image)
    image = image.unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        _, predicted_class = output.max(1)

    breed_name = class_names[predicted_class.item()]

    return {"breed":breed_name}