from typing import List, Dict, Any
from backend.app.repositories.transport_repository import transport_repository
from backend.app.core.logging import logger

class TransportService:
    def get_public_transport_corridors(self) -> List[Dict[str, Any]]:
        logger.info("Fetching public transport corridors and transit routes")
        return transport_repository.get_transport_assets()

transport_service = TransportService()
