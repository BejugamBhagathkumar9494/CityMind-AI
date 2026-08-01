from typing import List, Dict, Any
from backend.app.repositories.base_repository import BaseRepository
from backend.app.core.database import get_db_connection

class EnergyRepository(BaseRepository):
    def __init__(self):
        super().__init__("infrastructure")

    def get_energy_assets(self) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM infrastructure WHERE type = 'Electricity' ORDER BY failure_probability DESC")
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

energy_repository = EnergyRepository()
