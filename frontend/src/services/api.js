// CityMind AI API Service Layer with live backend connection + fallback mock engine

const API_BASE = 'http://localhost:8000/api';

// Realistic pre-seeded fallback dataset
const MOCK_INFRASTRUCTURE = [
  {
    id: "INF-RD-1024",
    name: "MG Road Flyover & Arterial Stretch",
    type: "Road",
    location: "MG Road - Ward 82",
    latitude: 12.9716,
    longitude: 77.5946,
    condition_rating: 2.4,
    age_years: 18,
    risk_score: 92.5,
    failure_probability: 0.87,
    complaints_count: 482,
    population_affected: 35000,
    repair_cost_inr: 1.25,
    previous_failures: 4,
    urgency: "Critical",
    status: "Pending Repair",
    recommended_action: "Immediate structural reinforcement & resurfacing",
    last_inspected: "2026-07-15"
  },
  {
    id: "INF-WT-8812",
    name: "Main Water Trunk Line - Sector 12",
    type: "Water",
    location: "Indiranagar - Sector 12",
    latitude: 12.9784,
    longitude: 77.6408,
    condition_rating: 3.1,
    age_years: 24,
    risk_score: 84.0,
    failure_probability: 0.78,
    complaints_count: 319,
    population_affected: 28000,
    repair_cost_inr: 0.85,
    previous_failures: 3,
    urgency: "High",
    status: "Pending Repair",
    recommended_action: "Replace degraded cast iron pipe joint assemblies",
    last_inspected: "2026-07-18"
  },
  {
    id: "INF-EL-4091",
    name: "Grid Substation Transformer 4B",
    type: "Electricity",
    location: "Whitefield Industrial Zone 4",
    latitude: 12.9698,
    longitude: 77.7499,
    condition_rating: 4.2,
    age_years: 15,
    risk_score: 76.5,
    failure_probability: 0.69,
    complaints_count: 215,
    population_affected: 42000,
    repair_cost_inr: 1.10,
    previous_failures: 2,
    urgency: "High",
    status: "Under Maintenance",
    recommended_action: "Upgrade cooling system and coil insulation",
    last_inspected: "2026-07-22"
  },
  {
    id: "INF-TR-3302",
    name: "Central Bus Rapid Transit (BRT) Hub",
    type: "Public Transport",
    location: "Majestic Transit Terminal",
    latitude: 12.9774,
    longitude: 77.5708,
    condition_rating: 5.0,
    age_years: 12,
    risk_score: 62.0,
    failure_probability: 0.52,
    complaints_count: 156,
    population_affected: 65000,
    repair_cost_inr: 0.60,
    previous_failures: 1,
    urgency: "Medium",
    status: "Operational",
    recommended_action: "Automated ticketing gate maintenance and tarmac resurfacing",
    last_inspected: "2026-07-10"
  },
  {
    id: "INF-CF-9011",
    name: "City General Hospital Backup Power Feed",
    type: "Critical Facility",
    location: "Malleshwaram Ward 3",
    latitude: 12.9982,
    longitude: 77.5694,
    condition_rating: 3.5,
    age_years: 20,
    risk_score: 89.0,
    failure_probability: 0.83,
    complaints_count: 94,
    population_affected: 18000,
    repair_cost_inr: 0.45,
    previous_failures: 3,
    urgency: "Critical",
    status: "Pending Repair",
    recommended_action: "Redundant feeder cable installation & UPS battery refresh",
    last_inspected: "2026-07-25"
  },
  {
    id: "INF-RD-5510",
    name: "Outer Ring Road Heavy Freight Corridor",
    type: "Road",
    location: "Marathahalli Junction",
    latitude: 12.9569,
    longitude: 77.7011,
    condition_rating: 2.8,
    age_years: 14,
    risk_score: 81.5,
    failure_probability: 0.74,
    complaints_count: 390,
    population_affected: 55000,
    repair_cost_inr: 2.10,
    previous_failures: 5,
    urgency: "High",
    status: "Pending Repair",
    recommended_action: "Bituminous concrete repaving and storm drain cleaning",
    last_inspected: "2026-07-08"
  }
];

const MOCK_COMPLAINTS = [
  { id: "CMP-9012", title: "Severe pothole cluster causing traffic bottlenecks", category: "Road Potholes", description: "Multiple deep potholes near MG Road Metro station causing severe slowdowns and two-wheeler skid hazards.", location: "MG Road", latitude: 12.9716, longitude: 77.5946, severity: "Critical", status: "Open", upvotes: 142 },
  { id: "CMP-9013", title: "Contaminated muddy water supplying Sector 12 homes", category: "Water Quality & Leakage", description: "Tap water in Sector 12 Indiranagar has brown tint and sewage odor since yesterday morning.", location: "Indiranagar", latitude: 12.9784, longitude: 77.6408, severity: "High", status: "Open", upvotes: 98 },
  { id: "CMP-9014", title: "Frequent voltage spikes and transformer spark near IT Park", category: "Power Grid Outage", description: "Substation transformer 4B sparking during peak load hours, resulting in 4-hour power cuts.", location: "Whitefield", latitude: 12.9698, longitude: 77.7499, severity: "High", status: "Open", upvotes: 87 },
  { id: "CMP-9015", title: "Overflown storm drain flooding hospital entrance road", category: "Drainage & Flooding", description: "Clogged storm drain in Malleshwaram flooding access road to City General Hospital during rains.", location: "Malleshwaram", latitude: 12.9982, longitude: 77.5694, severity: "Critical", status: "Open", upvotes: 115 }
];

const MOCK_ALERTS = [
  { id: "ALT-101", title: "CRITICAL RISK: MG Road Flyover degradation exceeds 87% threshold", type: "Risk", severity: "Critical", message: "MG Road Flyover failure probability increased due to 482 citizen complaints and 18y asset age.", asset_id: "INF-RD-1024" },
  { id: "ALT-102", title: "COMPLAINT HOTSPOT: Sector 12 Water Contamination Spikes", type: "Complaint", severity: "High", message: "319 complaints logged in 48 hours for Indiranagar Sector 12 water network.", asset_id: "INF-WT-8812" },
  { id: "ALT-103", title: "FACILITY ALERT: Hospital Power Feed Backup Degraded", type: "Maintenance", severity: "Critical", message: "Backup feeder line for City General Hospital failed routine insulation testing.", asset_id: "INF-CF-9011" },
  { id: "ALT-104", title: "BUDGET ALERT: Road Infrastructure allocation 85% utilized", type: "Budget", severity: "Medium", message: "Roads & Bridges department has ₹0.45 Cr remaining in Q3 budget.", asset_id: "BDG-RD" }
];

export async function fetchInfrastructure(typeFilter = 'All', urgencyFilter = 'All') {
  try {
    const res = await fetch(`${API_BASE}/infrastructure?type_filter=${typeFilter}&urgency_filter=${urgencyFilter}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn("Using fallback infrastructure data", err);
  }
  
  return MOCK_INFRASTRUCTURE.filter(item => {
    if (typeFilter !== 'All' && item.type !== typeFilter) return false;
    if (urgencyFilter !== 'All' && item.urgency !== urgencyFilter) return false;
    return true;
  });
}

export async function fetchComplaints(searchTerm = '') {
  try {
    const res = await fetch(`${API_BASE}/complaints${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn("Using fallback complaints data", err);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    return MOCK_COMPLAINTS.filter(c => 
      c.title.toLowerCase().includes(term) || 
      c.description.toLowerCase().includes(term) || 
      c.location.toLowerCase().includes(term)
    );
  }
  return MOCK_COMPLAINTS;
}

export async function fetchAlerts() {
  try {
    const res = await fetch(`${API_BASE}/alerts`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn("Using fallback alerts data", err);
  }
  return MOCK_ALERTS;
}

export async function fetchAnalytics() {
  try {
    const res = await fetch(`${API_BASE}/analytics`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn("Using fallback analytics data", err);
  }
  
  return {
    kpis: {
      total_complaints: 12842,
      infra_at_risk: 152,
      budget_available_inr_cr: 10.00,
      citizens_impacted: 243000,
      avg_resolution_time_days: 2.4
    },
    type_breakdown: [
      { type: "Road", count: 42, avg_risk: 78.4 },
      { type: "Water", count: 38, avg_risk: 69.2 },
      { type: "Electricity", count: 30, avg_risk: 71.5 },
      { type: "Transport", count: 24, avg_risk: 54.0 },
      { type: "Critical Facility", count: 18, avg_risk: 85.1 }
    ]
  };
}

export async function runAgentAnalysis() {
  try {
    const res = await fetch(`${API_BASE}/agents/run`, { method: 'POST' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Using fallback agent execution pipeline", err);
  }

  // Simulated live execution result
  return {
    run_id: "RUN-DEMO-8812",
    status: "Completed",
    timestamp: new Date().toISOString(),
    logs: [
      { step: 1, agent_id: "agent_complaint", agent_name: "Complaint Intelligence Agent", status: "Completed", message: "✓ Analyzed 12,842 complaints across 28 municipal wards. Clustered into 4 major failure themes." },
      { step: 2, agent_id: "agent_risk", agent_name: "Infrastructure Risk Agent", status: "Completed", message: "✓ Evaluated 1,245 infrastructure assets using XGBoost model. Flagged 152 assets at high risk." },
      { step: 3, agent_id: "agent_budget", agent_name: "Budget Agent", status: "Completed", message: "✓ Evaluated ₹10.00 Cr city budget across 87 proposed projects. Simulated knapsack optimization." },
      { step: 4, agent_id: "agent_impact", agent_name: "Citizen Impact Agent", status: "Completed", message: "✓ Calculated cumulative citizen impact: 243,000 residents directly protected." },
      { step: 5, agent_id: "agent_planning", agent_name: "Planning Agent", status: "Completed", message: "✓ Generated 3-phase repair schedule prioritizing hospital backup lines and MG Road corridor." },
      { step: 6, agent_id: "agent_decision", agent_name: "Decision Agent", status: "Completed", message: "✓ Synthesized final recommendation: Top Priority #1 'Repair Road — MG Road Stretch' (Risk 92.5%, 35,000 citizens)." }
    ],
    summary: {
      top_recommendation: {
        rank: 1,
        title: "Repair Road — MG Road Stretch",
        type: "Road",
        risk_score: 92.5,
        failure_probability: 0.87,
        citizens_impacted: 35000,
        estimated_cost_inr: "₹1.25 Cr",
        confidence: 0.94,
        recommended_action: "Immediate structural reinforcement & bituminous resurfacing",
        reasoning: "MG Road Flyover exhibits critical failure probability (87%) with 482 citizen complaints impacting 35,000 residents daily and access to City Hospital.",
        rag_evidence: [
          {
            doc_title: "Municipal Road Infrastructure Maintenance Policy 2024",
            category: "Roads Policy",
            relevant_section: "SECTION 4.2: Arterial corridors with daily traffic exceeding 25,000 PVUs yielding condition rating below 3.0 mandate emergency budget clearance within 7 days.",
            confidence_score: 0.94
          }
        ]
      }
    }
  };
}

export async function optimizeBudget(totalBudgetCr = 10.0) {
  try {
    const res = await fetch(`${API_BASE}/budget/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total_budget_cr: totalBudgetCr })
    });
    if (res.ok) {
      const data = await res.json();
      return data.optimization;
    }
  } catch (err) {
    console.warn("Using fallback budget optimizer", err);
  }

  return {
    total_budget_cr: totalBudgetCr,
    allocated_cr: 6.25,
    remaining_cr: 3.75,
    citizens_benefited: 243000,
    total_risk_reduced_percent: 74.5,
    sector_breakdown: {
      "Roads": 3.25,
      "Water": 1.70,
      "Electricity": 1.10,
      "Transport": 0.20
    },
    selected_projects: MOCK_INFRASTRUCTURE.map(i => ({
      id: i.id,
      name: i.name,
      type: i.type,
      cost: i.repair_cost_inr,
      population: i.population_affected,
      risk_score: i.risk_score,
      recommended_action: i.recommended_action
    }))
  };
}

export async function queryRAG(query) {
  try {
    const res = await fetch(`${API_BASE}/rag/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Using fallback RAG query", err);
  }

  return {
    status: "success",
    query: query,
    ai_explanation: `CityMind AI analyzed municipal policy framework 'Municipal Road Infrastructure Maintenance Policy 2024 (SECTION 4.2)'. The recommendation to repair MG Road flyover first is mandated due to high traffic (>25k PVUs), 87% failure probability, and proximity to critical hospital facility.`,
    citations: [
      {
        doc_title: "Municipal Road Infrastructure Maintenance Policy 2024",
        category: "Roads Policy",
        relevant_section: "SECTION 4.2: PRIORITY REPAIR CRITERIA FOR ARTERIAL CORRIDORS. Arterial corridors with daily traffic exceeding 25,000 passenger vehicle units must be inspected monthly. Any structural degradation yielding condition rating below 3.0 mandates emergency budget clearance within 7 days.",
        confidence_score: 0.95
      },
      {
        doc_title: "Smart City Water Supply & Sanitation Standards",
        category: "Water Guidelines",
        relevant_section: "SECTION 3.5: TRUNK PIPELINE DEGRADATION PROTOCOL. Mains over 20 years old with complaint clusters >250 per quarter qualify for Emergency Urban Water Resilience Grants.",
        confidence_score: 0.88
      }
    ]
  };
}
