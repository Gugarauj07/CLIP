import matplotlib.pyplot as plt
import io
import base64
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import numpy as np
from sklearn.decomposition import PCA
from io import BytesIO

def visualize_embeddings(model: CLIPModel, processor: CLIPProcessor, image: Image.Image, texts: list[str]) -> str:
    # Processar apenas a imagem
    image_inputs = processor(images=image, return_tensors="pt")
    image_embeddings = model.get_image_features(**image_inputs).detach().numpy()

    # Opcional: Processar textos se necessário para a visualização
    text_inputs = processor(text=texts, return_tensors="pt", padding=True)
    text_embeddings = model.get_text_features(**text_inputs).detach().numpy()

    # Combine embeddings for PCA
    combined_embeddings = np.concatenate((image_embeddings, text_embeddings), axis=0)

    # Apply PCA to reduce dimensions to 2D
    pca = PCA(n_components=2)
    reduced_embeddings = pca.fit_transform(combined_embeddings)

    # Separate back the image and text embeddings
    image_reduced = reduced_embeddings[:len(image_embeddings)]
    text_reduced = reduced_embeddings[len(image_embeddings):]

    # Visualization
    plt.figure(figsize=(8, 6))
    plt.scatter(image_reduced[:, 0], image_reduced[:, 1], label='Image Embeddings', color='blue')
    plt.scatter(text_reduced[:, 0], text_reduced[:, 1], label='Text Embeddings', color='red')

    for i, txt in enumerate(texts):
        plt.annotate(txt, (text_reduced[i, 0], text_reduced[i, 1]))

    plt.legend()

    # Convert plot to Base64
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()

    return image_base64