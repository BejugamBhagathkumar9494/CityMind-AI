from typing import List, Dict, Any, Optional
from backend.app.repositories.base_repository import BaseRepository
from backend.app.core.database import get_db_connection

class ComplaintsRepository(BaseRepository):
    def __init__(self):
        super().__init__("complaints")

    def search_complaints(self, search_term: Optional[str] = None) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        if search_term:
            query = "SELECT * FROM complaints WHERE title LIKE ? OR description LIKE ? OR category LIKE ? ORDER BY created_at DESC"
            pattern = f"%{search_term}%"
            cursor.execute(query, (pattern, pattern, pattern))
        else:
            cursor.execute("SELECT * FROM complaints ORDER BY created_at DESC")
            
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_category_counts(self) -> Dict[str, int]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT category, COUNT(*) as count FROM complaints GROUP BY category")
        counts = {row['category']: row['count'] for row in cursor.fetchall()}
        conn.close()
        return counts

complaints_repository = ComplaintsRepository()
