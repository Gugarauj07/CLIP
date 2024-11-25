from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import logging
from typing import List
import json

# Configuração do Logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Advanced CLIP Demo",
    description="An interactive application to demonstrate the functionalities of OpenAI's CLIP model.",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Atualize com origens específicas em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carregar modelo e processador CLIP
logger.info("Loading CLIP model...")
model = CLIPModel.from_pretrained("openai/clip-vit-large-patch14")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-large-patch14")
logger.info("CLIP model loaded successfully.")

@app.post("/process/")
async def process(texts: str = Form(...), image: UploadFile = File(...)):
    logger.info("Received new processing request.")

    try:
        # Parsear a string JSON para uma lista
        texts_list = json.loads(texts)
        if not isinstance(texts_list, list) or not all(isinstance(t, str) for t in texts_list):
            logger.warning("Invalid format for texts. It should be a JSON list of strings.")
            raise HTTPException(status_code=400, detail="Invalid format for texts. It should be a JSON list of strings.")
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing texts: {e}")
        raise HTTPException(status_code=400, detail="Texts must be a valid JSON list of strings.") from e

    if not texts_list:
        logger.warning("No texts provided for comparison.")
        raise HTTPException(status_code=400, detail="No texts provided for comparison.")

    try:
        logger.info(f"Reading uploaded image: {image.filename}")
        image_content = Image.open(image.file).convert("RGB")
    except Exception as e:
        logger.error(f"Error opening image: {e}")
        raise HTTPException(status_code=400, detail="Invalid image file.") from e

    try:
        logger.info("Processing image and texts with CLIP model.")
        inputs = processor(
            images=image_content,
            text=texts_list,
            return_tensors="pt",
            padding=True
        )

        outputs = model(**inputs)
        logits = outputs.logits_per_image
        probabilities = torch.softmax(logits, dim=1)[0].tolist()

        logger.info("Processing completed successfully.")
    except Exception as e:
        logger.error(f"Error during CLIP model processing: {e}")
        raise HTTPException(status_code=500, detail="Error processing the image and texts.") from e

    # Criar lista de resultados com as probabilidades normalizadas
    results = [
        {
            "description": text,
            "probability": float(prob)
        }
        for text, prob in zip(texts_list, probabilities)
    ]

    # Ordenar resultados por probabilidade (maior para menor)
    results = sorted(results, key=lambda x: x["probability"], reverse=True)

    return {"results": results}