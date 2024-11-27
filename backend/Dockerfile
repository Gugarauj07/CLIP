# backend/Dockerfile
FROM python:3.10-slim

# Define variáveis de ambiente
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Define o diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar apenas requirements primeiro para aproveitar o cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Baixar o modelo CLIP durante a construção
RUN python -c "from transformers import CLIPProcessor, CLIPModel; model = CLIPModel.from_pretrained('openai/clip-vit-large-patch14'); processor = CLIPProcessor.from_pretrained('openai/clip-vit-large-patch14')"

# Copiar o resto do código
COPY . .

# Cloud Run vai definir a porta via PORT
ENV PORT 8080

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]