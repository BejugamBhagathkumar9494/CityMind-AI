import sqlite3
import json
import os
import random
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "citymind.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Create tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password_hash TEXT,
        name TEXT,
        role TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS infrastructure (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT, -- Road, Water, Electricity, Transport, Critical Facility
        location TEXT,
        latitude REAL,
        longitude REAL,
        condition_rating REAL, -- 1-10 (1 critical, 10 perfect)
        age_years INTEGER,
        risk_score REAL, -- 0-100
        failure_probability REAL, -- 0-1
        priority_class TEXT, -- Critical, High, Medium, Low (from Random Forest)
        confidence REAL, -- Random Forest confidence %
        complaints_count INTEGER,
        population_affected INTEGER,
        repair_cost_inr REAL, -- In Lakhs / Crores
        previous_failures INTEGER,
        urgency TEXT, -- Critical, High, Medium, Low
        status TEXT, -- Pending Repair, Under Maintenance, Operational
        recommended_action TEXT,
        last_inspected DATE,
        prediction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Safe Schema Migrations for existing DB tables
    try:
        cursor.execute("ALTER TABLE infrastructure ADD COLUMN priority_class TEXT")
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE infrastructure ADD COLUMN confidence REAL")
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE infrastructure ADD COLUMN prediction_time TIMESTAMP")
    except Exception:
        pass

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS complaints (
        id TEXT PRIMARY KEY,
        title TEXT,
        category TEXT,
        description TEXT,
        location TEXT,
        latitude REAL,
        longitude REAL,
        severity TEXT, -- Critical, High, Medium, Low
        status TEXT, -- Open, In Progress, Resolved
        citizen_name TEXT,
        upvotes INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS budgets (
        id TEXT PRIMARY KEY,
        department TEXT,
        allocated_inr REAL,
        spent_inr REAL,
        proposed_inr REAL,
        fiscal_year TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        title TEXT,
        category TEXT,
        content TEXT,
        file_path TEXT,
        chunk_count INTEGER,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS agent_runs (
        id TEXT PRIMARY KEY,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP,
        status TEXT,
        logs_json TEXT,
        summary_json TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        title TEXT,
        type TEXT, -- Risk, Complaint, Budget, Maintenance
        severity TEXT, -- Critical, High, Medium, Low
        message TEXT,
        asset_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_read INTEGER DEFAULT 0
    )
    """)

    conn.commit()
    seed_data_if_empty(conn)
    conn.close()

def seed_data_if_empty(conn):
    cursor = conn.cursor()
    
    # Check if infrastructure has data
    cursor.execute("SELECT COUNT(*) FROM infrastructure")
    if cursor.fetchone()[0] == 0:
        print("Seeding smart city dataset...")
        
        # 1. Infrastructure Seed Data (Bengaluru / Central Metro context)
        infra_items = [
            {
                "id": "INF-RD-1024",
                "name": "MG Road Flyover & Arterial Stretch",
                "type": "Road",
                "location": "MG Road - Ward 82",
                "latitude": 12.9716,
                "longitude": 77.5946,
                "condition_rating": 2.4,
                "age_years": 18,
                "risk_score": 92.5,
                "failure_probability": 0.87,
                "complaints_count": 482,
                "population_affected": 35000,
                "repair_cost_inr": 1.25, # Cr
                "previous_failures": 4,
                "urgency": "Critical",
                "status": "Pending Repair",
                "recommended_action": "Immediate structural reinforcement & resurfacing",
                "last_inspected": "2026-07-15"
            },
            {
                "id": "INF-WT-8812",
                "name": "Main Water Trunk Line - Sector 12",
                "type": "Water",
                "location": "Indiranagar - Sector 12",
                "latitude": 12.9784,
                "longitude": 77.6408,
                "condition_rating": 3.1,
                "age_years": 24,
                "risk_score": 84.0,
                "failure_probability": 0.78,
                "complaints_count": 319,
                "population_affected": 28000,
                "repair_cost_inr": 0.85, # Cr
                "previous_failures": 3,
                "urgency": "High",
                "status": "Pending Repair",
                "recommended_action": "Replace degraded cast iron pipe joint assemblies",
                "last_inspected": "2026-07-18"
            },
            {
                "id": "INF-EL-4091",
                "name": "Grid Substation Transformer 4B",
                "type": "Electricity",
                "location": "Whitefield Industrial Zone 4",
                "latitude": 12.9698,
                "longitude": 77.7499,
                "condition_rating": 4.2,
                "age_years": 15,
                "risk_score": 76.5,
                "failure_probability": 0.69,
                "complaints_count": 215,
                "population_affected": 42000,
                "repair_cost_inr": 1.10, # Cr
                "previous_failures": 2,
                "urgency": "High",
                "status": "Under Maintenance",
                "recommended_action": "Upgrade cooling system and coil insulation",
                "last_inspected": "2026-07-22"
            },
            {
                "id": "INF-TR-3302",
                "name": "Central Bus Rapid Transit (BRT) Hub",
                "type": "Public Transport",
                "location": "Majestic Transit Terminal",
                "latitude": 12.9774,
                "longitude": 77.5708,
                "condition_rating": 5.0,
                "age_years": 12,
                "risk_score": 62.0,
                "failure_probability": 0.52,
                "complaints_count": 156,
                "population_affected": 65000,
                "repair_cost_inr": 0.60, # Cr
                "previous_failures": 1,
                "urgency": "Medium",
                "status": "Operational",
                "recommended_action": "Automated ticketing gate maintenance and tarmac resurfacing",
                "last_inspected": "2026-07-10"
            },
            {
                "id": "INF-CF-9011",
                "name": "City General Hospital Backup Power Feed",
                "type": "Critical Facility",
                "location": "Malleshwaram Ward 3",
                "latitude": 12.9982,
                "longitude": 77.5694,
                "condition_rating": 3.5,
                "age_years": 20,
                "risk_score": 89.0,
                "failure_probability": 0.83,
                "complaints_count": 94,
                "population_affected": 18000,
                "repair_cost_inr": 0.45, # Cr
                "previous_failures": 3,
                "urgency": "Critical",
                "status": "Pending Repair",
                "recommended_action": "Redundant feeder cable installation & UPS battery refresh",
                "last_inspected": "2026-07-25"
            },
            {
                "id": "INF-RD-5510",
                "name": "Outer Ring Road Heavy Freight Corridor",
                "type": "Road",
                "location": "Marathahalli Junction",
                "latitude": 12.9569,
                "longitude": 77.7011,
                "condition_rating": 2.8,
                "age_years": 14,
                "risk_score": 81.5,
                "failure_probability": 0.74,
                "complaints_count": 390,
                "population_affected": 55000,
                "repair_cost_inr": 2.10, # Cr
                "previous_failures": 5,
                "urgency": "High",
                "status": "Pending Repair",
                "recommended_action": "Bituminous concrete repaving and storm drain cleaning",
                "last_inspected": "2026-07-08"
            },
            {
                "id": "INF-WT-1204",
                "name": "South City Water Filtration Plant #2",
                "type": "Water",
                "location": "Jayanagar 4th Block",
                "latitude": 12.9250,
                "longitude": 77.5938,
                "condition_rating": 6.1,
                "age_years": 9,
                "risk_score": 45.0,
                "failure_probability": 0.35,
                "complaints_count": 78,
                "population_affected": 30000,
                "repair_cost_inr": 0.30, # Cr
                "previous_failures": 1,
                "urgency": "Low",
                "status": "Operational",
                "recommended_action": "Routine filter backwash & sensor calibration",
                "last_inspected": "2026-07-29"
            },
            {
                "id": "INF-EL-7721",
                "name": "Koramangala Underground Cable Vault",
                "type": "Electricity",
                "location": "Koramangala 80ft Road",
                "latitude": 12.9352,
                "longitude": 77.6245,
                "condition_rating": 3.8,
                "age_years": 16,
                "risk_score": 71.0,
                "failure_probability": 0.62,
                "complaints_count": 182,
                "population_affected": 22000,
                "repair_cost_inr": 0.75, # Cr
                "previous_failures": 2,
                "urgency": "High",
                "status": "Pending Repair",
                "recommended_action": "Dewatering & high-voltage joint replacement",
                "last_inspected": "2026-07-14"
            }
        ]

        for item in infra_items:
            cursor.execute("""
            INSERT INTO infrastructure (
                id, name, type, location, latitude, longitude, condition_rating,
                age_years, risk_score, failure_probability, complaints_count,
                population_affected, repair_cost_inr, previous_failures, urgency,
                status, recommended_action, last_inspected
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                item["id"], item["name"], item["type"], item["location"], item["latitude"],
                item["longitude"], item["condition_rating"], item["age_years"], item["risk_score"],
                item["failure_probability"], item["complaints_count"], item["population_affected"],
                item["repair_cost_inr"], item["previous_failures"], item["urgency"], item["status"],
                item["recommended_action"], item["last_inspected"]
            ))

        # 2. Complaints Seed Data
        complaint_samples = [
            ("CMP-9012", "Severe pothole cluster causing traffic bottlenecks", "Road Potholes", "Multiple deep potholes near MG Road Metro station causing severe slowdowns and two-wheeler skid hazards.", "MG Road", 12.9716, 77.5946, "Critical", 142),
            ("CMP-9013", "Contaminated muddy water supplying Sector 12 homes", "Water Quality & Leakage", "Tap water in Sector 12 Indiranagar has brown tint and sewage odor since yesterday morning.", "Indiranagar", 12.9784, 77.6408, "High", 98),
            ("CMP-9014", "Frequent voltage spikes and transformer spark near IT Park", "Power Grid Outage", "Substation transformer 4B sparking during peak load hours, resulting in 4-hour power cuts.", "Whitefield", 12.9698, 77.7499, "High", 87),
            ("CMP-9015", "Overflown storm drain flooding hospital entrance road", "Drainage & Flooding", "Clogged storm drain in Malleshwaram flooding access road to City General Hospital during rains.", "Malleshwaram", 12.9982, 77.5694, "Critical", 115),
            ("CMP-9016", "Streetlights non-functional on Outer Ring Road flyover", "Public Lighting", "Dark stretch on Marathahalli flyover leading to security issues and accidents.", "Marathahalli", 12.9569, 77.7011, "Medium", 64),
            ("CMP-9017", "Low water pressure in high-rise residential apartments", "Water Quality & Leakage", "Water pressure dropped below 0.5 bar across Jayanagar 4th Block households.", "Jayanagar", 12.9250, 77.5938, "Medium", 42),
            ("CMP-9018", "Caved-in asphalt near bus terminal platform 3", "Road Potholes", "Sub-surface erosion caused asphalt cave-in at Majestic bus stand entrance.", "Majestic", 12.9774, 77.5708, "High", 76),
            ("CMP-9019", "Uninsulated high voltage wire hanging dangerously low", "Power Grid Outage", "Fallen tree branch loosened 11kV line on Koramangala 80ft road.", "Koramangala", 12.9352, 77.6245, "Critical", 131)
        ]

        for cid, ctitle, ccat, cdesc, cloc, clat, clng, csev, cup in complaint_samples:
            cursor.execute("""
            INSERT INTO complaints (id, title, category, description, location, latitude, longitude, severity, status, citizen_name, upvotes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Open', 'Concerned Resident', ?)
            """, (cid, ctitle, ccat, cdesc, cloc, clat, clng, csev, cup))

        # 3. Budgets Seed Data
        budget_items = [
            ("BDG-RD", "Roads & Bridges Department", 3.20, 2.10, 3.50, "FY 2026-27"),
            ("BDG-WT", "Water Supply & Sanitation", 2.45, 1.80, 2.80, "FY 2026-27"),
            ("BDG-EL", "Energy & Power Distribution", 2.10, 1.65, 2.30, "FY 2026-27"),
            ("BDG-TR", "Public Transport & Mobility", 1.35, 0.95, 1.50, "FY 2026-27"),
            ("BDG-EM", "Emergency & Critical Facilities", 0.90, 0.50, 1.00, "FY 2026-27")
        ]

        for bid, bdept, balloc, bspent, bprop, bfy in budget_items:
            cursor.execute("""
            INSERT INTO budgets (id, department, allocated_inr, spent_inr, proposed_inr, fiscal_year)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (bid, bdept, balloc, bspent, bprop, bfy))

        # 4. Documents Seed Data (Policy & Guidelines)
        doc_samples = [
            (
                "DOC-POL-001",
                "Municipal Road Infrastructure Maintenance Policy 2024",
                "Roads Policy",
                "SECTION 4.2: PRIORITY REPAIR CRITERIA FOR ARTERIAL CORRIDORS\n"
                "Arterial corridors with daily traffic exceeding 25,000 passenger vehicle units must be inspected monthly. "
                "Any structural degradation yielding a condition rating below 3.0 or a risk probability over 80% mandates "
                "emergency budget clearance within 7 days. Critical facilities within a 1km radius (hospitals, fire stations) "
                "escalate priority score by a factor of +1.5x.\n\n"
                "SECTION 7.1: BITUMINOUS RESURFACING AND DRAINAGE INTEGRATION\n"
                "All road resurfacing must include integrated storm drain clearing to prevent sub-surface water pooling."
            ),
            (
                "DOC-POL-002",
                "Smart City Water Supply & Sanitation Standards",
                "Water Guidelines",
                "SECTION 3.5: TRUNK PIPELINE DEGRADATION PROTOCOL\n"
                "Cast iron water mains over 20 years old exhibiting pressure loss over 20% or complaint clusters exceeding 250 cases "
                "per quarter shall qualify for replacement under Emergency Urban Water Resilience Grants. Immediate isolation "
                "valves must be inspected bi-weekly."
            ),
            (
                "DOC-POL-003",
                "Urban Power Grid Resilience & Critical Backup Guidelines",
                "Energy Regulations",
                "SECTION 5.8: HEALTHCARE AND EMERGENCY SUBSTATION MANDATE\n"
                "Substations serving Level-1 trauma care hospitals must maintain dual-redundant automatic bus transfer switches. "
                "Transformer units exceeding 15 years in service with failure probabilities >0.75 must undergo coil re-insulation "
                "or replacement before monsoons."
            )
        ]

        for did, dtitle, dcat, dcontent in doc_samples:
            cursor.execute("""
            INSERT INTO documents (id, title, category, content, chunk_count)
            VALUES (?, ?, ?, ?, 3)
            """, (did, dtitle, dcat, dcontent))

        # 5. Alerts Seed Data
        alerts_data = [
            ("ALT-101", "CRITICAL RISK: MG Road Flyover degradation exceeds 87% threshold", "Risk", "Critical", "MG Road Flyover failure probability increased due to 482 citizen complaints and 18y asset age.", "INF-RD-1024"),
            ("ALT-102", "COMPLAINT HOTSPOT: Sector 12 Water Contamination Spikes", "Complaint", "High", "319 complaints logged in 48 hours for Indiranagar Sector 12 water network.", "INF-WT-8812"),
            ("ALT-103", "FACILITY ALERT: Hospital Power Feed Backup Degraded", "Maintenance", "Critical", "Backup feeder line for City General Hospital failed routine insulation testing.", "INF-CF-9011"),
            ("ALT-104", "BUDGET ALERT: Road Infrastructure allocation 85% utilized", "Budget", "Medium", "Roads & Bridges department has ₹0.45 Cr remaining in Q3 budget.", "BDG-RD")
        ]

        for aid, atitle, atype, asev, amsg, aasset in alerts_data:
            cursor.execute("""
            INSERT INTO alerts (id, title, type, severity, message, asset_id)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (aid, atitle, atype, asev, amsg, aasset))

        conn.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    init_db()
