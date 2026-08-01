// CityMind AI API Service Layer — 100% Real Data Pipeline

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchInfrastructure(typeFilter = 'All', urgencyFilter = 'All') {
  const res = await fetch(`${API_BASE}/infrastructure?type_filter=${typeFilter}&urgency_filter=${urgencyFilter}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch infrastructure data: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data;
}

export async function fetchComplaints(searchTerm = '') {
  const res = await fetch(`${API_BASE}/complaints${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch complaints data: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data;
}

export async function fetchAlerts() {
  const res = await fetch(`${API_BASE}/alerts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch alerts: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data;
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) {
    throw new Error(`Failed to fetch city analytics: ${res.statusText}`);
  }
  return await res.json();
}

export async function runAgentAnalysis() {
  const res = await fetch(`${API_BASE}/agents/run`, { method: 'POST' });
  if (!res.ok) {
    throw new Error(`Failed to execute AI Agent Pipeline: ${res.statusText}`);
  }
  return await res.json();
}

export async function optimizeBudget(totalBudgetCr = 10.0) {
  const res = await fetch(`${API_BASE}/budget/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ total_budget_cr: totalBudgetCr })
  });
  if (!res.ok) {
    throw new Error(`Failed to optimize budget: ${res.statusText}`);
  }
  const data = await res.json();
  return data.optimization;
}

export async function queryRAG(query) {
  const res = await fetch(`${API_BASE}/rag/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  if (!res.ok) {
    throw new Error(`Failed to query RAG vector engine: ${res.statusText}`);
  }
  return await res.json();
}

export async function fetchDocuments() {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) {
    throw new Error(`Failed to fetch documents: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data;
}

export async function uploadPolicyDocument(title, category, file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/documents/upload?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    throw new Error(`Failed to upload policy document: ${res.statusText}`);
  }
  return await res.json();
}

export async function uploadDatasetCSV(file, datasetType = 'infrastructure') {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/data/upload?dataset_type=${datasetType}`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    throw new Error(`Failed to upload CSV dataset: ${res.statusText}`);
  }
  return await res.json();
}

export async function generateReportData() {
  const res = await fetch(`${API_BASE}/reports/generate`, { method: 'POST' });
  if (!res.ok) {
    throw new Error(`Failed to generate report: ${res.statusText}`);
  }
  return await res.json();
}
