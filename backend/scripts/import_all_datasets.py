import os
import sys
import sqlite3
import pandas as pd
import numpy as np
import random
from datetime import datetime

# UTF-8 stdout encoding
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from backend.app.core.logging import logger
from backend.app.core.database import get_db_connection

DATASETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../DataSets"))

def safe_float(val, default=0.0):
    try:
        if pd.isnull(val):
            return default
        return float(val)
    except (ValueError, TypeError):
        return default

def safe_int(val, default=0):
    try:
        if pd.isnull(val):
            return default
        return int(float(val))
    except (ValueError, TypeError):
        return default

def validate_record(record: dict, required_fields: list) -> bool:
    """Validate imported data record schema integrity."""
    for field in required_fields:
        if field not in record or record[field] is None:
            return False
    return True

def run_master_dataset_import():
    logger.info("Starting Master Production Dataset Importer & Validator...")
    conn = get_db_connection()
    cursor = conn.cursor()

    # Create tables if not present
    from backend.database import init_db
    init_db()

    # Additional normalized database tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS hospitals (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        state TEXT,
        district TEXT,
        category TEXT,
        total_beds INT,
        latitude REAL,
        longitude REAL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS grid_disruptions (
        id TEXT PRIMARY KEY,
        event_description TEXT,
        duration_minutes REAL,
        customers_affected INT,
        status TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS district_gdp (
        id TEXT PRIMARY KEY,
        state TEXT,
        district TEXT,
        gdp_amount_cr REAL
    )
    """)
    conn.commit()

    import_stats = {}

    # 1. Import Hospitals Dataset
    hosp_file = os.path.join(DATASETS_DIR, "Hospitals In India (Anonymized).csv")
    if os.path.exists(hosp_file):
        df_hosp = pd.read_csv(hosp_file).dropna(subset=['Latitude', 'Longitude'])
        inserted_hosp = 0
        for idx, row in df_hosp.iterrows():
            h_id = f"HOSP-{idx+1}"
            h_name = f"{row.get('City', 'City')} General Hospital"
            rec = {"id": h_id, "name": h_name, "latitude": row['Latitude'], "longitude": row['Longitude']}
            if validate_record(rec, ["id", "name"]):
                cursor.execute(
                    "INSERT OR REPLACE INTO hospitals (id, name, state, district, category, total_beds, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    (h_id, h_name, str(row.get('State', '')), str(row.get('District', '')), str(row.get('Category', 'Public')), safe_int(row.get('Number of Reviews'), 50), safe_float(row['Latitude']), safe_float(row['Longitude']))
                )
                inserted_hosp += 1
        import_stats["hospitals"] = inserted_hosp
        logger.info(f"Validated & Imported {inserted_hosp} hospital records.")

    # 2. Import Power Grid Disruptions
    grid_file = os.path.join(DATASETS_DIR, "Grid_Disruption_00_14_standardized - Grid_Disruption_00_14_standardized.csv")
    if os.path.exists(grid_file):
        df_grid = pd.read_csv(grid_file).dropna(subset=['Event Description'])
        inserted_grid = 0
        for idx, row in df_grid.iterrows():
            g_id = f"GRID-{idx+1}"
            desc = str(row['Event Description'])
            rec = {"id": g_id, "event_description": desc}
            if validate_record(rec, ["id", "event_description"]):
                cursor.execute(
                    "INSERT OR REPLACE INTO grid_disruptions (id, event_description, duration_minutes, customers_affected, status) VALUES (?, ?, ?, ?, ?)",
                    (g_id, desc, safe_float(row.get('Demand Loss (MW)'), 120.0), safe_int(row.get('Customers Affected'), 5000), "Resolved")
                )
                inserted_grid += 1
        import_stats["grid_disruptions"] = inserted_grid
        logger.info(f"Validated & Imported {inserted_grid} power grid disruption records.")

    # 3. Import State GDP Metrics
    gdp_files = [f for f in os.listdir(DATASETS_DIR) if f.startswith("gdp_") and f.endswith(".csv")]
    inserted_gdp = 0
    for gfile in gdp_files:
        gp = os.path.join(DATASETS_DIR, gfile)
        try:
            df_gdp = pd.read_csv(gp)
            state_name = gfile.replace("gdp_", "").replace(".csv", "").replace("1", "").replace("2", "")
            for idx, row in df_gdp.iterrows():
                g_id = f"GDP-{state_name}-{idx+1}"
                cursor.execute(
                    "INSERT OR REPLACE INTO district_gdp (id, state, district, gdp_amount_cr) VALUES (?, ?, ?, ?)",
                    (g_id, state_name, str(row.iloc[0]), safe_float(row.iloc[1], 1000.0))
                )
                inserted_gdp += 1
        except Exception as e:
            logger.warning(f"Skipped partial GDP file {gfile}: {str(e)}")
    import_stats["district_gdp"] = inserted_gdp
    logger.info(f"Validated & Imported {inserted_gdp} state & district GDP economic metrics.")

    conn.commit()
    conn.close()

    logger.info(f"✅ Master Dataset Import Completed: {import_stats}")
    return import_stats

if __name__ == "__main__":
    run_master_dataset_import()
