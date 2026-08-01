from typing import List, Dict, Any, Optional
from backend.app.repositories.base_repository import BaseRepository
from backend.app.core.database import get_db_connection

class InfrastructureRepository(BaseRepository):
    def __init__(self):
        super().__init__("infrastructure")

    def filter_assets(self, type_filter: Optional[str] = None, urgency_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM infrastructure WHERE 1=1"
        params = []

        if type_filter and type_filter != 'All':
            query += " AND type = ?"
            params.append(type_filter)

        if urgency_filter and urgency_filter != 'All':
            query += " AND urgency = ?"
            params.append(urgency_filter)

        query += " ORDER BY failure_probability DESC"
        cursor.execute(query, params)
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_high_risk_assets(self, threshold: float = 0.75) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM infrastructure WHERE failure_probability >= ? ORDER BY failure_probability DESC", (threshold,))
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

infrastructure_repository = InfrastructureRepository()
