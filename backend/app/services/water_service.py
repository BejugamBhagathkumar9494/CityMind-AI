from typing import List, Dict, Any
from backend.app.repositories.water_repository import water_repository
from backend.app.core.logging import logger

class WaterService:
    def get_water_network_status(self) -> List[Dict[str, Any]]:
        logger.info("Fetching urban water supply network status")
        return water_repository.get_water_assets()

    def detect_acoustic_leaks(self) -> List[Dict[str, Any]]:
        logger.info("Executing acoustic leak detection query on water mains")
        return water_repository.get_critical_water_leaks()

water_service = WaterService()
