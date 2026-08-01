from typing import List, Dict, Any
from backend.app.repositories.base_repository import BaseRepository
from backend.app.core.database import get_db_connection

class WaterRepository(BaseRepository):
    def __init__(self):
        super().__init__("infrastructure")

    def get_water_assets(self) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM infrastructure WHERE type = 'Water' ORDER BY failure_probability DESC")
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_critical_water_leaks(self) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM infrastructure WHERE type = 'Water' AND condition_rating <= 4.0")
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

water_repository = WaterRepository()
