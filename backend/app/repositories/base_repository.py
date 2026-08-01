from typing import Generic, TypeVar, List, Optional, Dict, Any
from backend.app.core.database import get_db_connection

T = TypeVar("T")

class BaseRepository:
    def __init__(self, table_name: str):
        self.table_name = table_name

    def get_all(self, limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {self.table_name} LIMIT ? OFFSET ?", (limit, offset))
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {self.table_name} WHERE id = ?", (item_id,))
        row = cursor.fetchone()
        conn.close()
        return dict(row) if row else None

    def count(self) -> int:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"SELECT COUNT(*) as total FROM {self.table_name}")
        total = cursor.fetchone()["total"]
        conn.close()
        return total
