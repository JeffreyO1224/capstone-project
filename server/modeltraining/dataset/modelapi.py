#import necessary libraries for model prediction
from PIL import Image
import torch
from torchvision import transforms
import torchvision.models as models
from fastapi import FastAPI, UploadFile, File
import torch.nn as nn

#initialize fastapi server
app = FastAPI()

#need to redifine model architrcture, in order to create a prediction
data_transforms = transforms.Compose([
    transforms.Resize((224, 224)), 
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

#include breeds in order to be able to map prediction with actual breed
class_names = [
    "Abyssinian", "Bengal", "Birman", "Bombay", "British_Shorthair", "Egyptian_Mau",
    "Maine_Coon", "Persian", "Ragdoll", "Russian_Blue", "Siamese", "Sphynx",
    "American_Bulldog", "American_Pit_Bull_Terrier", "Basset_Hound", "Beagle",
    "Boxer", "Chihuahua", "English_Cocker_Spaniel", "English_Setter", "German_Shorthaired",
    "Great_Pyrenees", "Havanese", "Japanese_Chin", "Keeshond", "Leonberger",
    "Miniature_Pinscher", "Newfoundland", "Pomeranian", "Pug", "Saint_Bernard",
    "Samoyed", "Scottish_Terrier", "Shiba_Inu", "Staffordshire_Bull_Terrier",
    "Wheaten_Terrier", "Yorkshire_Terrier"
]
#redifining model architecture
model = models.resnet50(pretrained=True) 

model.fc = nn.Sequential(
    nn.Linear(model.fc.in_features, 1024),
    nn.ReLU(),
    nn.BatchNorm1d(1024),
    nn.Dropout(0.5),
    nn.Linear(1024, 512),
    nn.ReLU(),
    nn.BatchNorm1d(512),
    nn.Dropout(0.5),
    nn.Linear(512, 37)
)

model.load_state_dict(torch.load("pet_breed_classifier.pth", map_location=torch.device('cpu')))
#put model in evaluation mode so that we only make predictions
model.eval() 

#declare request where images where will be uploaded
@app.post("/predict/") 
async def make_prediction(file: UploadFile = File(...)):
    image = Image.open(file.file).convert('RGB')
    image = data_transforms(image)
    image = image.unsqueeze(0)

    with torch.no_grad():
        output = model(image)
        _, predicted_class = output.max(1)

    breed_name = class_names[predicted_class.item()]

    return {"breed":breed_name}