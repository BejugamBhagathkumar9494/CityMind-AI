FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

WORKDIR /app

# Install system dependencies for C extensions / XGBoost / OpenMP
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install dependencies
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir xgboost scikit-learn pandas numpy faiss-cpu sentence-transformers python-multipart pydantic uvicorn fastapi -r /app/backend/requirements.txt

# Copy datasets and backend code
COPY DataSets /app/DataSets
COPY backend /app/backend

# Run automated real dataset ETL ingestion into SQLite
RUN python /app/backend/ingest_datasets.py

EXPOSE 8000

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
