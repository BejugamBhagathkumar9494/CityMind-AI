import sqlite3
import os
from contextlib import contextmanager
from backend.app.core.config import settings
from backend.app.core.logging import logger

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../citymind.db"))

def get_db_connection():
    """Create a raw SQLite database connection with Row factory."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@contextmanager
def get_db():
    """Context manager for managing database connection lifecycles safely."""
    conn = get_db_connection()
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        logger.error(f"Database transaction error: {str(e)}")
        raise e
    finally:
        conn.close()
