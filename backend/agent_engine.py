import time
import json
import uuid
from datetime import datetime
from backend.database import get_db_connection
from backend.ml_engine import ml_engine
from backend.rag_engine import rag_engine

class AgentOrchestrator:
    def __init__(self):
        self.agents = [
            {"id": "agent_complaint", "name": "Complaint Intelligence Agent", "role": "Analyzes citizen complaints and NLP volume spikes"},
            {"id": "agent_risk", "name": "Infrastructure Risk Agent", "role": "Evaluates XGBoost failure probabilities for city assets"},
            {"id": "agent_budget", "name": "Budget Agent", "role": "Evaluates fiscal allocations & optimizes project ROI"},
            {"id": "agent_impact", "name": "Citizen Impact Agent", "role": "Calculates population reach and hospital proximity multipliers"},
            {"id": "agent_planning", "name": "Planning Agent", "role": "Schedules emergency maintenance timeline & logistics"},
            {"id": "agent_decision", "name": "Decision Agent", "role": "Synthesizes agent outputs and RAG policy evidence into final recommendations"}
        ]

    def run_full_city_analysis(self):
        """Execute the multi-agent workflow graph synchronously with live step logs."""
        run_id = f"RUN-{uuid.uuid4().hex[:8].upper()}"
        logs = []
        conn = get_db_connection()
        cursor = conn.cursor()

        # Step 1: Complaint Intelligence Agent
        cursor.execute("SELECT * FROM complaints")
        complaints = [dict(r) for r in cursor.fetchall()]
        complaint_texts = [c['description'] for c in complaints if c.get('description')]
        clusters = ml_engine.cluster_complaints(complaint_texts)
        cluster_titles = [c.get('title', f"Cluster #{c['cluster_id']}") for c in clusters]
        clusters_str = ", ".join(cluster_titles) if cluster_titles else "General Infrastructure Issues"
        logs.append({
            "step": 1,
            "agent_id": "agent_complaint",
            "agent_name": "Complaint Intelligence Agent",
            "status": "Completed",
            "message": f"Analyzed {len(complaints)} complaints across city wards. Identified {len(clusters)} main failure clusters: {clusters_str}.",
            "data": {"total_complaints": len(complaints), "clusters_found": len(clusters), "clusters": clusters}
        })

        # Step 2: Infrastructure Risk Agent
        cursor.execute("SELECT * FROM infrastructure")
        assets = [dict(r) for r in cursor.fetchall()]
        high_risk_assets = []
        for asset in assets:
            ml_res = ml_engine.predict_infrastructure_risk(asset)
            asset['failure_probability'] = ml_res['failure_probability']
            asset['risk_score'] = ml_res['risk_score']
            asset['priority_score'] = ml_engine.calculate_priority_score(asset)
            if asset['risk_score'] >= 70.0:
                high_risk_assets.append(asset)
                
        assets.sort(key=lambda x: x['priority_score'], reverse=True)
        logs.append({
            "step": 2,
            "agent_id": "agent_risk",
            "agent_name": "Infrastructure Risk Agent",
            "status": "Completed",
            "message": f"Evaluated {len(assets)} infrastructure assets using XGBoost model. Found {len(high_risk_assets)} assets above critical risk threshold (70%+ risk score).",
            "data": {"evaluated_assets": len(assets), "high_risk_count": len(high_risk_assets)}
        })

        # Step 3: Budget Agent
        cursor.execute("SELECT * FROM budgets")
        budgets = [dict(r) for r in cursor.fetchall()]
        total_budget = sum(b['allocated_inr'] for b in budgets) if budgets else 10.0
        if total_budget <= 0:
            total_budget = 10.0
        opt_result = ml_engine.optimize_budget(assets, total_budget_cr=total_budget)
        logs.append({
            "step": 3,
            "agent_id": "agent_budget",
            "agent_name": "Budget Agent",
            "status": "Completed",
            "message": f"Evaluated ₹{total_budget:.2f} Cr municipal budget across {len(budgets)} departments. Executed knapsack optimization algorithm for maximum risk reduction.",
            "data": {"total_budget_cr": total_budget, "optimized_allocation_cr": opt_result['allocated_cr'], "sector_breakdown": opt_result['sector_breakdown']}
        })

        # Step 4: Citizen Impact Agent
        total_citizens_benefited = sum(p['population'] for p in opt_result['selected_projects'])
        logs.append({
            "step": 4,
            "agent_id": "agent_impact",
            "agent_name": "Citizen Impact Agent",
            "status": "Completed",
            "message": f"Calculated cumulative citizen impact: {total_citizens_benefited:,} citizens directly protected from infrastructure failure.",
            "data": {"citizens_impacted": total_citizens_benefited}
        })

        # Step 5: Planning Agent
        schedule = []
        for idx, proj in enumerate(opt_result['selected_projects'][:3]):
            schedule.append({
                "phase": f"Phase {idx+1}",
                "asset_id": proj['id'],
                "asset_name": proj['name'],
                "estimated_duration": "14 Days",
                "recommended_action": proj['recommended_action']
            })
        phase_names = [s['asset_name'] for s in schedule]
        logs.append({
            "step": 5,
            "agent_id": "agent_planning",
            "agent_name": "Planning Agent",
            "status": "Completed",
            "message": f"Generated phased repair schedule prioritizing {len(schedule)} critical infrastructure corridors: {', '.join(phase_names)}.",
            "data": {"scheduled_phases": len(schedule), "schedule": schedule}
        })

        # Step 6: Decision Agent + RAG policy lookup
        top_pick = assets[0] if assets else {}
        rag_citations = rag_engine.query_policy(f"Priority repair for {top_pick.get('type', 'Road')} corridor near critical facility")
        
        top_confidence = round(float(top_pick.get('failure_probability', 0.85) * 0.5 + (rag_citations[0]['confidence_score'] if rag_citations else 0.8) * 0.5), 2)
        top_recommendation = {
            "rank": 1,
            "asset_id": top_pick.get('id'),
            "title": f"Repair Infrastructure — {top_pick.get('name')}",
            "type": top_pick.get('type'),
            "location": top_pick.get('location'),
            "risk_score": top_pick.get('risk_score'),
            "failure_probability": top_pick.get('failure_probability'),
            "citizens_impacted": top_pick.get('population_affected'),
            "estimated_cost_inr": f"₹{top_pick.get('repair_cost_inr')} Cr",
            "priority_score": top_pick.get('priority_score'),
            "confidence": top_confidence,
            "recommended_action": top_pick.get('recommended_action'),
            "reasoning": f"{top_pick.get('name')} exhibits critical failure probability ({int(top_pick.get('failure_probability', 0.85)*100)}%) with {top_pick.get('complaints_count')} citizen complaints impacting {top_pick.get('population_affected'):,} residents.",
            "rag_evidence": rag_citations
        }

        logs.append({
            "step": 6,
            "agent_id": "agent_decision",
            "agent_name": "Decision Agent",
            "status": "Completed",
            "message": f"Synthesized final AI recommendation: Top Priority #{top_recommendation['rank']} '{top_recommendation['title']}' backed by Municipal Policy RAG evidence.",
            "data": top_recommendation
        })

        summary = {
            "run_id": run_id,
            "top_recommendation": top_recommendation,
            "budget_optimization": opt_result,
            "scheduled_phases": schedule
        }

        # Save run record into DB
        try:
            cursor.execute(
                "INSERT INTO agent_runs (id, status, logs_json, summary_json) VALUES (?, ?, ?, ?)",
                (run_id, "Completed", json.dumps(logs), json.dumps(summary))
            )
            conn.commit()
        except Exception as e:
            print(f"Error persisting agent run: {e}")

        conn.close()

        return {
            "run_id": run_id,
            "status": "Completed",
            "timestamp": datetime.now().isoformat(),
            "logs": logs,
            "summary": summary
        }

agent_orchestrator = AgentOrchestrator()
