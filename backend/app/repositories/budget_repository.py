from typing import List, Dict, Any
from backend.app.repositories.base_repository import BaseRepository
from backend.app.core.database import get_db_connection

class BudgetRepository(BaseRepository):
    def __init__(self):
        super().__init__("budgets")

    def get_all_budgets(self) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM budgets ORDER BY allocated_amount DESC")
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

budget_repository = BudgetRepository()
