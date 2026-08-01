from typing import List, Dict, Any, Optional
from backend.app.repositories.infrastructure_repository import infrastructure_repository
from backend.ml_engine import ml_engine
from backend.app.core.logging import logger

class InfrastructureService:
    def get_all_assets(self, type_filter: Optional[str] = None, urgency_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        logger.info(f"Fetching infrastructure assets: type_filter={type_filter}, urgency_filter={urgency_filter}")
        return infrastructure_repository.filter_assets(type_filter, urgency_filter)

    def get_asset_by_id(self, asset_id: str) -> Optional[Dict[str, Any]]:
        logger.info(f"Fetching infrastructure asset by id: {asset_id}")
        return infrastructure_repository.get_by_id(asset_id)

    def predict_asset_failure_risk(self, asset_features: Dict[str, Any]) -> Dict[str, Any]:
        """Predict failure probability using XGBoost model in MLEngine."""
        prob = ml_engine.predict_failure_probability(asset_features)
        risk_level = "High" if prob >= 0.75 else ("Medium" if prob >= 0.50 else "Low")
        return {
            "failure_probability": prob,
            "risk_level": risk_level
        }

infrastructure_service = InfrastructureService()
