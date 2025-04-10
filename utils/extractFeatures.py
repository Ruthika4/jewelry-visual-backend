import numpy as np
import json
import os
import sys
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from sklearn.metrics.pairwise import cosine_similarity

# Paths
base_path = r'C:/Users/ruthi/OneDrive/Desktop/jewlery_search_engine/backend/dataset'
features_path = f'{base_path}/features.npy'
metadata_path = f'{base_path}/metadata.json'

# Load features and metadata
features = np.load(features_path)
with open(metadata_path, 'r') as f:
    metadata = json.load(f)

# Load MobileNetV2 for feature extraction
model = MobileNetV2(weights='imagenet', include_top=False, pooling='avg')

def extract_feature(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    feature = model.predict(img_array, verbose=0)[0]
    return feature

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "No image path provided" }))
        sys.exit(1)

    query_img_path = sys.argv[1]

    try:
        query_feature = extract_feature(query_img_path)
        sims = cosine_similarity([query_feature], features)[0]
        top_indices = np.argsort(sims)[::-1][:5]

        results = [
            {
                "path": metadata[i]["path"],
                "similarity": float(sims[i])
            } for i in top_indices
        ]

        print(json.dumps(results))  # Node.js will parse this
    except Exception as e:
        print(json.dumps({ "error": str(e) }))
        sys.exit(1)
