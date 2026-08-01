from typing import List, Dict, Any, Optional
from backend.app.repositories.complaints_repository import complaints_repository
from backend.ml_engine import ml_engine
from backend.app.core.logging import logger

class ComplaintsService:
    def get_complaints(self, search_term: Optional[str] = None) -> List[Dict[str, Any]]:
        logger.info(f"Fetching citizen complaints: search_term='{search_term}'")
        return complaints_repository.search_complaints(search_term)

    def get_complaint_clusters(self) -> List[Dict[str, Any]]:
        logger.info("Executing TF-IDF & K-Means complaint clustering")
        complaints = complaints_repository.get_all()
        return ml_engine.cluster_complaints(complaints)

complaints_service = ComplaintsService()
