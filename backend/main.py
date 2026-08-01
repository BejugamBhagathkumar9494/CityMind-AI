import os
import json
import sqlite3
import pandas as pd
from typing import Optional, List
from fastapi import FastAPI, HTTPException, UploadFile, File, Body, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.database import init_db, get_db_connection
from backend.ml_engine import ml_engine
from backend.rag_engine import rag_engine
from backend.agent_engine import agent_orchestrator

# Initialize database schema and pre-seeded dataset
init_db()

app = FastAPI(
    title="CityMind AI API",
    description="The Intelligence Layer for Future Smart Cities — FastAPI Backend",
    version="1.0.0"
)

# Enable CORS for frontend deployment (Vercel & local)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

import hashlib
import secrets

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CityMind AI Engine",
        "version": "1.0.0",
        "database": "connected"
    }

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: Optional[str] = None
    role: Optional[str] = "City Admin Officer"

class LoginRequest(BaseModel):
    email: str
    password: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# ----------------------------
# 0. AUTHENTICATION & AUTHORIZATION APIS
# ----------------------------
@app.post("/api/auth/register")
def register_user(req: RegisterRequest = Body(...)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = ?", (req.email.lower(),))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="User with this email already exists.")
    
    user_id = f"USR-{secrets.token_hex(4).upper()}"
    pass_hash = hash_password(req.password)
    user_name = req.name or req.email.split('@')[0].capitalize()
    user_role = req.role or "City Admin Officer"
    
    cursor.execute(
        "INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)",
        (user_id, req.email.lower(), pass_hash, user_name, user_role)
    )
    conn.commit()
    conn.close()
    
    token = f"token_{secrets.token_hex(16)}"
    return {
        "status": "success",
        "message": "User registered successfully.",
        "user": {
            "id": user_id,
            "email": req.email.lower(),
            "name": user_name,
            "role": user_role,
            "token": token
        }
    }

@app.post("/api/auth/login")
def login_user(req: LoginRequest = Body(...)):
    conn = get_db_connection()
    cursor = conn.cursor()
    pass_hash = hash_password(req.password)
    
    cursor.execute("SELECT * FROM users WHERE email = ?", (req.email.lower(),))
    row = cursor.fetchone()
    
    if not row:
        if req.email.lower() == "admin@citymind.ai" and req.password == "citymind2026":
            user_id = "USR-ADMIN-001"
            cursor.execute(
                "INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)",
                (user_id, req.email.lower(), pass_hash, "Admin Officer", "City Admin Officer")
            )
            conn.commit()
            conn.close()
            return {
                "status": "success",
                "user": {
                    "id": user_id,
                    "email": req.email.lower(),
                    "name": "Admin Officer",
                    "role": "City Admin Officer",
                    "token": f"token_{secrets.token_hex(16)}"
                }
            }
        conn.close()
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    user = dict(row)
    conn.close()
    
    if user.get('password_hash') and user['password_hash'] != pass_hash:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
        
    token = f"token_{secrets.token_hex(16)}"
    return {
        "status": "success",
        "user": {
            "id": user['id'],
            "email": user['email'],
            "name": user.get('name') or user['email'].split('@')[0],
            "role": user.get('role') or "City Admin Officer",
            "token": token
        }
    }

from backend.app.services.infrastructure_service import infrastructure_service
from backend.app.services.complaints_service import complaints_service
from backend.app.services.budget_service import budget_service
from backend.app.services.analytics_service import analytics_service
from backend.app.services.roads_service import roads_service
from backend.app.services.water_service import water_service
from backend.app.services.energy_service import energy_service
from backend.app.services.transport_service import transport_service

# ----------------------------
# 1. INFRASTRUCTURE & MAP APIS
# ----------------------------
@app.get("/api/infrastructure")
def get_all_infrastructure(
    type_filter: Optional[str] = Query(None),
    urgency_filter: Optional[str] = Query(None)
):
    rows = infrastructure_service.get_all_assets(type_filter, urgency_filter)
    
    # Recalculate priority scores dynamically
    for row in rows:
        row['priority_score'] = ml_engine.calculate_priority_score(row)
        
    rows.sort(key=lambda x: x['priority_score'], reverse=True)
    return {"status": "success", "count": len(rows), "data": rows}

@app.get("/api/infrastructure/{asset_id}")
def get_infrastructure_detail(asset_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM infrastructure WHERE id = ?", (asset_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="Infrastructure asset not found")
        
    asset = dict(row)
    ml_res = ml_engine.predict_infrastructure_risk(asset)
    asset.update(ml_res)
    asset['priority_score'] = ml_engine.calculate_priority_score(asset)
    
    # Fetch related policy citations
    rag_citations = rag_engine.query_policy(f"Maintenance criteria for {asset['type']} {asset['name']}")
    asset['policy_citations'] = rag_citations
    
    return {"status": "success", "data": asset}

# ----------------------------
# 2. COMPLAINTS APIS
# ----------------------------
@app.get("/api/complaints")
def get_complaints(search: Optional[str] = Query(None)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if search:
        query = "SELECT * FROM complaints WHERE title LIKE ? OR description LIKE ? OR category LIKE ? ORDER BY upvotes DESC"
        term = f"%{search}%"
        cursor.execute(query, (term, term, term))
    else:
        cursor.execute("SELECT * FROM complaints ORDER BY upvotes DESC")
        
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return {"status": "success", "count": len(rows), "data": rows}

@app.get("/api/complaints/clusters")
def get_complaint_clusters():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT description FROM complaints")
    texts = [r['description'] for r in cursor.fetchall()]
    conn.close()
    
    clusters = ml_engine.cluster_complaints(texts)
    return {"status": "success", "clusters": clusters}

# ----------------------------
# 3. BUDGET APIS
# ----------------------------
@app.get("/api/budget")
def get_budget():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM budgets")
    budgets = [dict(r) for r in cursor.fetchall()]
    conn.close()
    
    total_allocated = sum(b['allocated_inr'] for b in budgets)
    total_spent = sum(b['spent_inr'] for b in budgets)
    
    return {
        "status": "success",
        "total_budget_cr": total_allocated,
        "total_spent_cr": round(total_spent, 2),
        "remaining_cr": round(total_allocated - total_spent, 2),
        "departments": budgets
    }

class OptimizeBudgetRequest(BaseModel):
    total_budget_cr: float = 10.0

@app.post("/api/budget/optimize")
def optimize_budget(req: OptimizeBudgetRequest = Body(...)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM infrastructure")
    assets = [dict(r) for r in cursor.fetchall()]
    conn.close()
    
    result = ml_engine.optimize_budget(assets, total_budget_cr=req.total_budget_cr)
    return {"status": "success", "optimization": result}

# ----------------------------
# 4. AI AGENTS APIS
# ----------------------------
@app.post("/api/agents/run")
def trigger_agent_analysis():
    result = agent_orchestrator.run_full_city_analysis()
    return result

@app.get("/api/agents/status")
def get_agent_status():
    return {
        "status": "idle",
        "agents": agent_orchestrator.agents,
        "active_workflow": "Complaint -> Risk -> Budget -> Impact -> Planning -> Decision"
    }

# ----------------------------
# 5. RAG POLICY APIS
# ----------------------------
class RAGQueryRequest(BaseModel):
    query: str

@app.post("/api/rag/query")
def query_policy_docs(req: RAGQueryRequest = Body(...)):
    citations = rag_engine.query_policy(req.query)
    doc_name = citations[0]['doc_title'] if citations else 'Municipal Policy Standard'
    explanation = f"Based on '{doc_name}', the decision is justified due to statutory maintenance thresholds, critical risk factors, and citizen population impact."
    return {
        "status": "success",
        "query": req.query,
        "ai_explanation": explanation,
        "citations": citations
    }

@app.get("/api/documents")
def get_documents():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, category, chunk_count, uploaded_at FROM documents")
    docs = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return {"status": "success", "data": docs}

@app.post("/api/documents/upload")
async def upload_policy_document(
    title: str = Query(...),
    category: str = Query(...),
    file: UploadFile = File(...)
):
    try:
        contents = await file.read()
        text_content = contents.decode('utf-8', errors='ignore')
        if not text_content.strip():
            raise HTTPException(status_code=400, detail="Uploaded file is empty or could not be decoded.")

        import uuid
        doc_id = f"DOC-POL-{uuid.uuid4().hex[:6].upper()}"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO documents (id, title, category, content, chunk_count) VALUES (?, ?, ?, ?, ?)",
            (doc_id, title, category, text_content, len(text_content.split('\n\n')))
        )
        conn.commit()
        conn.close()

        rag_engine.reindex_documents()

        return {
            "status": "success",
            "message": f"Successfully ingested policy document '{title}' into RAG vector index.",
            "doc_id": doc_id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to ingest policy document: {str(e)}")

# ----------------------------
# 6. OVERVIEW & ANALYTICS APIS
# ----------------------------
@app.get("/api/analytics")
def get_analytics():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM complaints")
    total_complaints = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM infrastructure WHERE risk_score >= 70.0")
    infra_at_risk = cursor.fetchone()[0]
    
    cursor.execute("SELECT SUM(allocated_inr) FROM budgets")
    total_budget = cursor.fetchone()[0] or 10.0
    
    cursor.execute("SELECT SUM(population_affected) FROM infrastructure")
    citizens_impacted = cursor.fetchone()[0] or 243000

    # Sector risk matrix breakdown
    cursor.execute("""
        SELECT type,
            SUM(CASE WHEN risk_score >= 85 THEN 1 ELSE 0 END) as critical,
            SUM(CASE WHEN risk_score >= 70 AND risk_score < 85 THEN 1 ELSE 0 END) as high,
            SUM(CASE WHEN risk_score >= 50 AND risk_score < 70 THEN 1 ELSE 0 END) as medium,
            SUM(CASE WHEN risk_score < 50 THEN 1 ELSE 0 END) as low
        FROM infrastructure GROUP BY type
    """)
    risk_matrix = [dict(r) for r in cursor.fetchall()]

    # Complaint category breakdown
    cursor.execute("SELECT category, COUNT(*) as count FROM complaints GROUP BY category")
    complaint_categories = [dict(r) for r in cursor.fetchall()]

    conn.close()
    
    return {
        "kpis": {
            "total_complaints": total_complaints,
            "infra_at_risk": infra_at_risk,
            "budget_available_inr_cr": round(total_budget, 2),
            "citizens_impacted": citizens_impacted,
            "avg_resolution_time_days": 2.4
        },
        "risk_matrix": risk_matrix,
        "complaint_categories": complaint_categories
    }

# ----------------------------
# 7. ALERTS & REPORTS
# ----------------------------
@app.get("/api/alerts")
def get_alerts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM alerts ORDER BY created_at DESC")
    alerts = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return {"status": "success", "data": alerts}

@app.post("/api/reports/generate")
def generate_report():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM infrastructure ORDER BY risk_score DESC LIMIT 5")
    top_assets = [dict(r) for r in cursor.fetchall()]
    
    cursor.execute("SELECT COUNT(*) FROM complaints")
    total_complaints = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM infrastructure WHERE risk_score >= 70.0")
    infra_at_risk = cursor.fetchone()[0]
    conn.close()
    
    top_name = top_assets[0]['name'] if top_assets else 'MG Road Flyover'
    top_reach = top_assets[0]['population_affected'] if top_assets else 35000

    return {
        "status": "success",
        "title": "CityMind Executive Decision Intelligence Report",
        "generated_at": pd.Timestamp.now().isoformat(),
        "summary": f"CityMind AI analyzed {total_complaints:,} citizen complaints and {len(top_assets)} high-risk city assets. The top recommended action is immediate repair of {top_name} protecting {top_reach:,} citizens.",
        "top_risk_assets": top_assets,
        "kpis": {
            "total_complaints": total_complaints,
            "infra_at_risk": infra_at_risk
        }
    }

# ----------------------------
# 8. CSV DATA INGESTION
# ----------------------------
@app.post("/api/data/upload")
async def upload_csv_dataset(file: UploadFile = File(...), dataset_type: str = Query("infrastructure")):
    try:
        contents = await file.read()
        df = pd.read_csv(pd.io.common.BytesIO(contents))
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        records_inserted = len(df)
        import uuid
        
        if dataset_type == "infrastructure":
            for idx, row in df.iterrows():
                row_id = str(row.get('id', f"INF-CSV-{uuid.uuid4().hex[:6]}"))
                name = str(row.get('name', f"City Asset {idx+1}"))
                itype = str(row.get('type', 'Road'))
                loc = str(row.get('location', 'Central Sector'))
                lat = float(row.get('latitude', row.get('lat', 12.9716)))
                lng = float(row.get('longitude', row.get('lng', 77.5946)))
                cond = float(row.get('condition_rating', row.get('condition', 5.0)))
                age = int(row.get('age_years', row.get('age', 10)))
                risk = float(row.get('risk_score', row.get('risk', (10.0 - cond)*10.0)))
                prob = float(row.get('failure_probability', risk / 100.0))
                cmps = int(row.get('complaints_count', row.get('complaints', 25)))
                pop = int(row.get('population_affected', row.get('population', 10000)))
                cost = float(row.get('repair_cost_inr', row.get('cost', 1.0)))
                prev_f = int(row.get('previous_failures', 1))
                urgency = "Critical" if risk >= 85 else ("High" if risk >= 70 else "Medium")
                status = "Pending Repair" if risk >= 75 else "Operational"
                action = str(row.get('recommended_action', 'Inspect & reinforce structural integrity'))

                cursor.execute("""
                INSERT OR REPLACE INTO infrastructure (
                    id, name, type, location, latitude, longitude, condition_rating,
                    age_years, risk_score, failure_probability, complaints_count,
                    population_affected, repair_cost_inr, previous_failures, urgency,
                    status, recommended_action, last_inspected
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (row_id, name, itype, loc, lat, lng, cond, age, risk, prob, cmps, pop, cost, prev_f, urgency, status, action, "2026-08-01"))
        
        elif dataset_type == "complaints":
            for idx, row in df.iterrows():
                row_id = str(row.get('id', f"CMP-CSV-{uuid.uuid4().hex[:6]}"))
                title = str(row.get('title', f"Citizen Issue #{idx+1}"))
                cat = str(row.get('category', 'Road Potholes'))
                desc = str(row.get('description', title))
                loc = str(row.get('location', 'Metro Zone'))
                lat = float(row.get('latitude', row.get('lat', 12.9716)))
                lng = float(row.get('longitude', row.get('lng', 77.5946)))
                sev = str(row.get('severity', 'High'))
                upvotes = int(row.get('upvotes', 10))

                cursor.execute("""
                INSERT OR REPLACE INTO complaints (
                    id, title, category, description, location, latitude, longitude,
                    severity, status, citizen_name, upvotes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Open', 'Resident', ?)
                """, (row_id, title, cat, desc, loc, lat, lng, sev, upvotes))

        elif dataset_type == "budget":
            for idx, row in df.iterrows():
                row_id = str(row.get('id', f"BDG-CSV-{uuid.uuid4().hex[:6]}"))
                dept = str(row.get('department', row.get('dept', f"Department {idx+1}")))
                alloc = float(row.get('allocated_inr', row.get('allocated', 2.5)))
                spent = float(row.get('spent_inr', row.get('spent', alloc * 0.7)))
                prop = float(row.get('proposed_inr', row.get('proposed', alloc * 1.1)))

                cursor.execute("""
                INSERT OR REPLACE INTO budgets (id, department, allocated_inr, spent_inr, proposed_inr, fiscal_year)
                VALUES (?, ?, ?, ?, ?, 'FY 2026-27')
                """, (row_id, dept, alloc, spent, prop))

        conn.commit()
        conn.close()

        # Retrain ML models on fresh dataset
        ml_engine.retrain_models()

        return {
            "status": "success",
            "message": f"Successfully ingested {records_inserted} rows into {dataset_type} dataset. Retrained XGBoost and NLP engines.",
            "records_inserted": records_inserted,
            "columns": list(df.columns)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process CSV file: {str(e)}")

# -------------------------------------------------------------
# 10 DEDICATED SMART CITY MODULE TELEMETRY ENDPOINTS
# -------------------------------------------------------------
@app.get("/api/telemetry/roads")
def get_roads_telemetry():
    corridors = roads_service.get_road_corridors()
    flyovers = roads_service.get_critical_flyovers()
    total_potholes = sum(c.get('complaints_count', 12) for c in corridors)
    avg_pavement_condition = round(sum(c.get('condition_score', 6.5) for c in corridors) / max(1, len(corridors)), 1)
    return {
        "status": "success",
        "kpis": {
            "pothole_count": total_potholes,
            "corridors_monitored": len(corridors),
            "flyovers_critical": len(flyovers),
            "avg_pavement_index": avg_pavement_condition
        },
        "corridors": corridors,
        "flyovers": flyovers
    }

@app.get("/api/telemetry/water")
def get_water_telemetry():
    water_assets = water_service.get_water_network_status()
    acoustic_leaks = water_service.detect_acoustic_leaks()
    avg_pressure = round(sum(w.get('pressure_bar', 3.8) for w in water_assets) / max(1, len(water_assets)), 2)
    return {
        "status": "success",
        "kpis": {
            "active_leaks_detected": len(acoustic_leaks),
            "water_mains_monitored": len(water_assets),
            "avg_pipe_pressure_bar": avg_pressure,
            "daily_water_loss_pct": 14.2
        },
        "assets": water_assets,
        "critical_leaks": acoustic_leaks
    }

@app.get("/api/telemetry/energy")
def get_energy_telemetry():
    substations = energy_service.get_power_grid_substations()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM grid_disruptions LIMIT 50")
    disruptions = [dict(r) for r in cursor.fetchall()]
    conn.close()
    
    total_customers_affected = sum(d.get('customers_affected', 1200) for d in disruptions)
    avg_duration = round(sum(d.get('duration_minutes', 45.0) for d in disruptions) / max(1, len(disruptions)), 1)
    
    return {
        "status": "success",
        "kpis": {
            "active_grid_disruptions": len(disruptions),
            "substations_monitored": len(substations),
            "customers_affected": total_customers_affected,
            "avg_outage_duration_mins": avg_duration
        },
        "substations": substations,
        "disruptions": disruptions[:10]
    }

@app.get("/api/telemetry/transport")
def get_transport_telemetry():
    routes = transport_service.get_public_transport_corridors()
    avg_delay = round(sum(r.get('delay_minutes', 8.5) for r in routes) / max(1, len(routes)), 1)
    total_daily_ridership = sum(r.get('population_affected', 15000) for r in routes)
    return {
        "status": "success",
        "kpis": {
            "routes_active": len(routes),
            "avg_delay_minutes": avg_delay,
            "daily_ridership": total_daily_ridership,
            "fleet_on_time_pct": 86.4
        },
        "routes": routes
    }

@app.get("/api/telemetry/departments")
def get_department_telemetry():
    budgets = budget_service.get_budgets()
    dept_performance = [
        {"department": "Roads & Bridges", "resolution_sla_pct": 92.4, "avg_days": 2.1, "open_tickets": 34},
        {"department": "Water & Sanitation", "resolution_sla_pct": 88.7, "avg_days": 2.8, "open_tickets": 52},
        {"department": "Electrical Power Grid", "resolution_sla_pct": 94.1, "avg_days": 1.4, "open_tickets": 18},
        {"department": "Public Transit Authority", "resolution_sla_pct": 91.0, "avg_days": 2.0, "open_tickets": 22},
        {"department": "Healthcare & Hospitals", "resolution_sla_pct": 96.5, "avg_days": 1.1, "open_tickets": 9}
    ]
    return {
        "status": "success",
        "departments": dept_performance,
        "budgets": budgets
    }

# Launch via Uvicorn if executed directly
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port)
