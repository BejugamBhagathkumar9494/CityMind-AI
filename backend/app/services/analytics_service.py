from typing import Dict, Any
from backend.app.repositories.analytics_repository import analytics_repository
from backend.app.repositories.infrastructure_repository import infrastructure_repository
from backend.app.repositories.complaints_repository import complaints_repository
from backend.app.core.logging import logger

class AnalyticsService:
    def get_city_analytics(self) -> Dict[str, Any]:
        logger.info("Computing citywide cross-sector risk analytics")
        summary = analytics_repository.get_summary_metrics()
        assets = infrastructure_repository.filter_assets()
        complaint_counts = complaints_repository.get_category_counts()

        sector_risk = {
            "Roads": round(sum(a['failure_probability'] for a in assets if a['type'] == 'Road') / max(1, sum(1 for a in assets if a['type'] == 'Road')), 2),
            "Water": round(sum(a['failure_probability'] for a in assets if a['type'] == 'Water') / max(1, sum(1 for a in assets if a['type'] == 'Water')), 2),
            "Electricity": round(sum(a['failure_probability'] for a in assets if a['type'] == 'Electricity') / max(1, sum(1 for a in assets if a['type'] == 'Electricity')), 2),
            "Transport": round(sum(a['failure_probability'] for a in assets if a['type'] == 'Transport') / max(1, sum(1 for a in assets if a['type'] == 'Transport')), 2),
            "Critical Facilities": round(sum(a['failure_probability'] for a in assets if a['type'] == 'Critical Facility') / max(1, sum(1 for a in assets if a['type'] == 'Critical Facility')), 2),
        }

        return {
            "summary": summary,
            "sector_risk_matrix": sector_risk,
            "complaint_categories": complaint_counts,
            "total_assets_monitored": len(assets)
        }

analytics_service = AnalyticsService()
