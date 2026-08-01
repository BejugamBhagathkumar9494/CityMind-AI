import os
import sys
import sqlite3
import pandas as pd
import numpy as np
import random
from datetime import datetime

# Enforce UTF-8 output encoding for Windows command line compatibility
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

DATASETS_DIR = os.path.join(os.path.dirname(__file__), "..", "DataSets")
DB_PATH = os.path.join(os.path.dirname(__file__), "citymind.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def ingest_all_datasets():
    print("🚀 Starting CityMind AI Dataset Ingestion Pipeline...")
    conn = get_db_connection()
    cursor = conn.cursor()

    # Ensure tables exist
    from backend.database import init_db
    init_db()

    # Clear existing pre-seeded data if running full ingestion
    cursor.execute("DELETE FROM infrastructure")
    cursor.execute("DELETE FROM complaints")
    cursor.execute("DELETE FROM budgets")
    cursor.execute("DELETE FROM documents")
    conn.commit()

    infra_items = []
    complaint_items = []

    # -------------------------------------------------------------
    # 1. INGEST HOSPITALS (Critical Facility Layer with Lat/Long)
    # -------------------------------------------------------------
    hospitals_csv = os.path.join(DATASETS_DIR, "Hospitals In India (Anonymized).csv")
    if os.path.exists(hospitals_csv):
        print("📍 Ingesting Hospitals & Healthcare Facilities Dataset...")
        df_hosp = pd.read_csv(hospitals_csv)
        df_hosp = df_hosp.dropna(subset=['Latitude', 'Longitude'])
        
        # Take a clean sample across regions
        sample_hosp = df_hosp.sample(n=min(50, len(df_hosp)), random_state=42)
        for idx, row in sample_hosp.iterrows():
            rating = float(row.get('Rating', 3.5)) if pd.notnull(row.get('Rating')) else 3.5
            reviews = int(row.get('Number of Reviews', 50)) if pd.notnull(row.get('Number of Reviews')) else 50
            density = float(row.get('Density', 250)) if pd.notnull(row.get('Density')) else 250.0
            
            risk_score = round(max(25.0, min(96.0, (5.0 - rating) * 16.0 + random.uniform(20, 35))), 1)
            fail_prob = round(risk_score / 100.0, 2)
            pop_affected = int(density * 120 + random.randint(5000, 15000))
            
            urgency = "Critical" if risk_score >= 82 else ("High" if risk_score >= 68 else "Medium")
            status = "Pending Repair" if risk_score >= 75 else "Operational"
            
            h_id = f"INF-CF-{row.get('id', idx)}"
            h_name = f"{row.get('City', 'City')} General Hospital ({row.get('District', 'District')})"
            location = f"{row.get('District', 'District')}, {row.get('State', 'State')}"
            
            infra_items.append((
                h_id,
                h_name,
                "Critical Facility",
                location,
                float(row['Latitude']),
                float(row['Longitude']),
                round(rating * 2.0, 1), # 1-10 scale
                random.randint(10, 35), # age_years
                risk_score,
                fail_prob,
                reviews,
                pop_affected,
                round(0.40 + (10.0 - rating) * 0.18, 2), # repair_cost_inr Cr
                random.randint(1, 4), # previous_failures
                urgency,
                status,
                "Redundant feeder power cable & ICU back-up oxygen line overhaul",
                "2026-07-22"
            ))

    # -------------------------------------------------------------
    # 2. INGEST POWER GRID DISRUPTIONS (Electricity Infrastructure Layer)
    # -------------------------------------------------------------
    grid_csv = os.path.join(DATASETS_DIR, "Grid_Disruption_00_14_standardized - Grid_Disruption_00_14_standardized.csv")
    if os.path.exists(grid_csv):
        print("⚡ Ingesting Power Grid & Substation Disruption Dataset...")
        df_grid = pd.read_csv(grid_csv)
        df_grid_valid = df_grid.dropna(subset=['Event Description']).head(40)
        
        # Grid center point variations around metro areas
        base_coords = [
            (12.9698, 77.7499, "Whitefield Power Zone"),
            (13.0827, 80.2707, "Chennai Metro Grid"),
            (19.0760, 72.8777, "Mumbai Central Substation"),
            (28.6139, 77.2090, "Delhi NCR Distribution Hub"),
            (17.3850, 78.4867, "Hyderabad Cyberabad Grid")
        ]
        
        for idx, row in df_grid_valid.iterrows():
            lat_base, lng_base, zone_name = base_coords[idx % len(base_coords)]
            lat = lat_base + random.uniform(-0.04, 0.04)
            lng = lng_base + random.uniform(-0.04, 0.04)
            
            cust_affected = row.get('Number of Customers Affected', 15000)
            try:
                cust_affected = int(cust_affected) if pd.notnull(cust_affected) else random.randint(10000, 50000)
            except:
                cust_affected = random.randint(12000, 45000)
                
            loss_mw = row.get('Demand Loss (MW)', 150)
            try:
                loss_mw = float(loss_mw) if pd.notnull(loss_mw) else 120.0
            except:
                loss_mw = 100.0
                
            risk_score = round(max(30.0, min(95.0, (loss_mw / 20.0) + random.uniform(40, 60))), 1)
            fail_prob = round(risk_score / 100.0, 2)
            urgency = "Critical" if risk_score >= 80 else ("High" if risk_score >= 65 else "Medium")
            
            g_id = f"INF-EL-{1000 + idx}"
            g_name = f"Grid Substation {idx+1}A - {str(row['Event Description'])[:40]}"
            
            infra_items.append((
                g_id,
                g_name,
                "Electricity",
                f"{zone_name} Sector {idx+1}",
                lat,
                lng,
                round(random.uniform(2.5, 5.5), 1),
                random.randint(8, 28),
                risk_score,
                fail_prob,
                random.randint(80, 420),
                cust_affected,
                round(0.75 + (risk_score / 100.0) * 1.10, 2),
                random.randint(1, 5),
                urgency,
                "Pending Repair" if risk_score >= 75 else "Under Maintenance",
                "Transformer coil insulation upgrade & automated surge protection relays",
                "2026-07-25"
            ))
            
            # Also create corresponding citizen complaints
            complaint_items.append((
                f"CMP-EL-{2000 + idx}",
                f"Grid Disruption: {str(row['Event Description'])[:50]}",
                "Power Grid Outage",
                f"Frequent voltage spikes and transformer overheating reported in {zone_name}.",
                f"{zone_name}",
                lat,
                lng,
                urgency,
                "Open",
                f"Resident Area {idx+1}",
                random.randint(45, 180),
                datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            ))

    # -------------------------------------------------------------
    # 3. INGEST ROADS & WATER INFRASTRUCTURE (Roads + Water Networks)
    # -------------------------------------------------------------
    print("💧 Ingesting Urban Water Networks & Arterial Road Datasets...")
    road_water_seeds = [
        ("INF-RD-1024", "MG Road Flyover & Arterial Stretch", "Road", "MG Road Ward 82", 12.9716, 77.5946, 2.4, 18, 92.5, 0.87, 482, 35000, 1.25, 4, "Critical", "Pending Repair", "Immediate structural reinforcement & bituminous resurfacing"),
        ("INF-WT-8812", "Main Water Trunk Line - Sector 12", "Water", "Indiranagar Sector 12", 12.9784, 77.6408, 3.1, 24, 84.0, 0.78, 319, 28000, 0.85, 3, "High", "Pending Repair", "Replace degraded cast iron pipe joint assemblies"),
        ("INF-TR-3302", "Central Bus Rapid Transit (BRT) Hub", "Public Transport", "Majestic Transit Terminal", 12.9774, 77.5708, 5.0, 12, 62.0, 0.52, 156, 65000, 0.60, 1, "Medium", "Operational", "Automated ticketing gate maintenance and tarmac resurfacing"),
        ("INF-RD-5510", "Outer Ring Road Heavy Freight Corridor", "Road", "Marathahalli Junction", 12.9569, 77.7011, 2.8, 14, 81.5, 0.74, 390, 55000, 2.10, 5, "High", "Pending Repair", "Bituminous concrete repaving and storm drain cleaning"),
        ("INF-WT-9901", "Sub-Surface Distribution Pipeline B3", "Water", "Koramangala Block 4", 12.9352, 77.6245, 3.8, 19, 78.2, 0.71, 210, 31000, 0.95, 2, "High", "Pending Repair", "Acoustic leak sensor installation & pipe re-lining")
    ]
    
    for item in road_water_seeds:
        infra_items.append((*item, "2026-07-28"))

    # Insert all infrastructure items into SQLite
    cursor.executemany("""
    INSERT INTO infrastructure (
        id, name, type, location, latitude, longitude, condition_rating,
        age_years, risk_score, failure_probability, complaints_count,
        population_affected, repair_cost_inr, previous_failures, urgency,
        status, recommended_action, last_inspected
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, infra_items)

    # Insert complaint items
    cursor.executemany("""
    INSERT INTO complaints (
        id, title, category, description, location, latitude, longitude,
        severity, status, citizen_name, upvotes, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, complaint_items)

    # -------------------------------------------------------------
    # 4. INGEST CITY BUDGET BOOK (`fy2022-proposed-city-budget-book-1.csv`)
    # -------------------------------------------------------------
    budget_csv = os.path.join(DATASETS_DIR, "fy2022-proposed-city-budget-book-1.csv")
    if os.path.exists(budget_csv):
        print("💰 Ingesting Municipal City Budget Dataset...")
        df_bud = pd.read_csv(budget_csv)
        dept_summary = df_bud.groupby('Acct-Dept')['2022-Recommend'].sum().reset_index()
        
        budget_items = []
        for idx, row in dept_summary.head(10).iterrows():
            dept = str(row['Acct-Dept']) if pd.notnull(row['Acct-Dept']) else f"Dept {idx}"
            allocated = round(max(0.5, float(row['2022-Recommend']) / 1000000.0), 2)
            spent = round(allocated * random.uniform(0.55, 0.85), 2)
            proposed = round(allocated * random.uniform(1.05, 1.25), 2)
            
            budget_items.append((
                f"BDG-{idx+101}",
                dept,
                allocated,
                spent,
                proposed,
                "FY 2024-2025"
            ))
            
        cursor.executemany("""
        INSERT INTO budgets (id, department, allocated_inr, spent_inr, proposed_inr, fiscal_year)
        VALUES (?, ?, ?, ?, ?, ?)
        """, budget_items)

    # -------------------------------------------------------------
    # 5. INGEST MUNICIPAL POLICIES FOR RAG ENGINE
    # -------------------------------------------------------------
    print("📚 Ingesting Municipal Guidelines & Policies into RAG Database...")
    policies = [
        ("DOC-POL-001", "Municipal Road Infrastructure Maintenance Policy 2024", "Roads Policy", 
         "SECTION 4.2: PRIORITY REPAIR CRITERIA FOR ARTERIAL CORRIDORS. Arterial corridors with daily traffic exceeding 25,000 passenger vehicle units must be inspected monthly. Any structural degradation yielding condition rating below 3.0 mandates emergency budget clearance within 7 days.\n\nSECTION 4.3: Bituminous concrete resurfacing must be prioritized over routine patching if complaint density exceeds 100 per kilometer."),
        
        ("DOC-POL-002", "Smart City Water Supply & Sanitation Standards", "Water Guidelines", 
         "SECTION 3.5: TRUNK PIPELINE DEGRADATION PROTOCOL. Mains over 20 years old with complaint clusters >250 per quarter qualify for Emergency Urban Water Resilience Grants. Immediate acoustic leak detection and sleeve pressure tests are required.\n\nSECTION 3.6: Contamination reports near public healthcare facilities require 24-hour bypass line activation."),
        
        ("DOC-POL-003", "Electricity Grid Reliability & Outage Prevention Act", "Power Standards",
         "SECTION 8.1: HIGH-LOAD SUBSTATION INSULATION. Grid transformers operating above 85% capacity with previous trip history within 6 months must be scheduled for immediate cooling oil replacement and telemetry upgrade.")
    ]
    
    cursor.executemany("""
    INSERT INTO documents (id, title, category, content, chunk_count)
    VALUES (?, ?, ?, ?, 2)
    """, policies)

    conn.commit()
    conn.close()
    print("✅ CityMind AI Dataset Ingestion Completed Successfully!")

if __name__ == "__main__":
    ingest_all_datasets()
