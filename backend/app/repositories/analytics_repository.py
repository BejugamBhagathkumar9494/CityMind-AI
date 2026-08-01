from typing import Dict, Any
from backend.app.core.database import get_db_connection

class AnalyticsRepository:
    def get_summary_metrics(self) -> Dict[str, Any]:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) as cnt FROM infrastructure WHERE urgency = 'Critical' OR failure_probability >= 0.75")
        critical_infra = cursor.fetchone()['cnt']
        
        cursor.execute("SELECT COUNT(*) as cnt FROM complaints WHERE status = 'Open'")
        open_complaints = cursor.fetchone()['cnt']
        
        cursor.execute("SELECT SUM(allocated_amount) as total_alloc, SUM(spent_amount) as total_spent FROM budgets")
        budget_row = cursor.fetchone()
        
        conn.close()
        
        return {
            "critical_infra_count": critical_infra,
            "open_complaints_count": open_complaints,
            "total_budget_allocated": budget_row['total_alloc'] or 0,
            "total_budget_spent": budget_row['total_spent'] or 0
        }

analytics_repository = AnalyticsRepository()
