from typing import List, Dict, Any
from backend.app.repositories.budget_repository import budget_repository
from backend.app.repositories.infrastructure_repository import infrastructure_repository
from backend.app.core.logging import logger

class BudgetService:
    def get_budgets(self) -> List[Dict[str, Any]]:
        logger.info("Fetching departmental budget allocations")
        return budget_repository.get_all_budgets()

    def optimize_budget_allocation(self, total_budget_limit: float = 10.0) -> Dict[str, Any]:
        """Knapsack optimization selecting high-risk projects under budget constraints."""
        logger.info(f"Executing Knapsack budget optimization for total_budget_limit={total_budget_limit} Cr")
        assets = infrastructure_repository.filter_assets()
        
        # Knapsack items: repair_cost_inr vs risk reduction
        selected_projects = []
        spent = 0.0
        
        for asset in sorted(assets, key=lambda a: a.get('failure_probability', 0.0), reverse=True):
            cost = asset.get('repair_cost_inr', 1.0)
            if spent + cost <= total_budget_limit:
                selected_projects.append(asset)
                spent += cost

        return {
            "total_budget_limit_cr": total_budget_limit,
            "allocated_budget_cr": round(spent, 2),
            "projects_selected_count": len(selected_projects),
            "selected_projects": selected_projects
        }

budget_service = BudgetService()
