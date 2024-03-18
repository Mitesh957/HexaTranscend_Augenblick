from keras.models import load_model  
from keras.models import Model
from keras.layers import DepthwiseConv2D
from PIL import Image, ImageOps
import numpy as np
import streamlit as st 
from dotenv import load_dotenv
import os  

def classify_waste(img):
    np.set_printoptions(suppress=True)
    model = load_model("keras_model.h5", compile=False)

    class_names = open("labels.txt", "r").readlines()

    data = np.ndarray(shape=(1, 224, 224, 5), dtype=np.float32)
    
    image = img.convert("RGB")
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    image_array = np.asarray(image)

    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    data[0] = normalized_image_array

    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]
    return class_name, confidence_score
st.title("SegreGreen Waste Classifier")

input_img = st.file_uploader("Enter your image", type=['jpg', 'png', 'jpeg'])

if input_img is not None:
    if st.button("Classify"):
        
        col1, col2 = st.columns([1,1])

        with col1:
            st.info("Your uploaded Image")
            st.image(input_img, use_column_width=True)

        with col2:
            st.info("Your Result")
            image_file = Image.open(input_img)
            label, confidence_score = classify_waste(image_file)
            if label == "0 trash\n":
                st.success("The image is classified as TRASH.")                
            elif label == "1 plastic\n":
                st.success("The image is classified as PLASTIC.")
            elif label == "2 paper\n":
                st.success("The image is classified as PAPER.")
            elif label == "3 metal\n":
                st.success("The image is classified as METAL.")
            elif label == "4 glass\n":
                st.success("The image is classified as GLASS.")
            elif label == "5 cardboard\n":
                st.success("The image is classified as CARDBOARD.")
            else:
                st.error("The image is not classified as any relevant class.")

