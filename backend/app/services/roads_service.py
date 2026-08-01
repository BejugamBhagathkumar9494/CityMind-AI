from typing import List, Dict, Any
from backend.app.repositories.infrastructure_repository import infrastructure_repository
from backend.app.core.logging import logger

class RoadsService:
    def get_road_corridors(self) -> List[Dict[str, Any]]:
        logger.info("Fetching road infrastructure corridors")
        return infrastructure_repository.filter_assets(type_filter="Road")

    def get_critical_flyovers(self) -> List[Dict[str, Any]]:
        logger.info("Fetching critical flyovers and arterial bridges")
        assets = infrastructure_repository.filter_assets(type_filter="Road", urgency_filter="Critical")
        return [a for a in assets if "Flyover" in a.get("name", "") or "Bridge" in a.get("name", "")]

roads_service = RoadsService()
