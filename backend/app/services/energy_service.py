from typing import List, Dict, Any
from backend.app.repositories.energy_repository import energy_repository
from backend.app.core.logging import logger

class EnergyService:
    def get_power_grid_substations(self) -> List[Dict[str, Any]]:
        logger.info("Fetching electrical power grid substations")
        return energy_repository.get_energy_assets()

energy_service = EnergyService()
