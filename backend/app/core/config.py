import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "CityMind AI Engine"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{os.path.abspath(os.path.join(os.path.dirname(__file__), '../../citymind.db'))}"
    )
    
    # Supabase / External Services
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    
    # JWT & Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-citymind-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days

settings = Settings()
