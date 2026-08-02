<div align="center">

# 🏛️ CityMind AI
### The Intelligence Layer for Future Smart Cities

**Transforming fragmented urban data into intelligent, AI-driven city decisions.**

![React](https://img.shields.io/badge/React-19-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Python](https://img.shields.io/badge/Python-ML-yellow)
![XGBoost](https://img.shields.io/badge/XGBoost-ML-orange)
![LangGraph](https://img.shields.io/badge/LangGraph-AI%20Agents-purple)
![Supabase](https://img.shields.io/badge/Supabase-Database-success)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

</div>

---

# 📖 Overview

Modern cities generate enormous amounts of data every day—from citizen complaints and infrastructure inspections to budget reports, utility records, and maintenance logs.

Unfortunately, these datasets exist in isolated systems, making decision-making slow, manual, and reactive.

**CityMind AI** is an AI-powered Urban Decision Intelligence Platform that unifies fragmented municipal data and helps city administrators determine:

- What infrastructure should be repaired first?
- Which projects will benefit the most citizens?
- How should limited budgets be allocated?
- Which assets are at the highest risk of failure?
- Why did AI make a particular recommendation?

Instead of simply visualizing data, CityMind AI combines **Machine Learning, Retrieval-Augmented Generation (RAG), and Multi-Agent AI** to generate explainable, evidence-based recommendations for smarter city management.

---

# 🚨 Problem Statement

Cities today rely on multiple disconnected departments such as:

- Road & Infrastructure
- Water Supply
- Electricity
- Public Transport
- Citizen Complaint Systems
- Budget & Finance
- Emergency Services

Each department stores and manages data independently.

As a result:

- Infrastructure failures are detected too late.
- Citizen complaints remain unresolved for longer periods.
- Budget allocation is often reactive rather than optimized.
- Decision-makers lack a unified view of city operations.
- Critical facilities like hospitals and schools are not adequately prioritized.
- Existing workflows require extensive manual analysis across multiple departments.

Current municipal dashboards display information but **do not provide intelligent recommendations**.

CityMind AI addresses this challenge by becoming the **AI Intelligence Layer** that connects all city systems and assists decision-makers with proactive, data-driven recommendations.

---

# 💡 Our Solution

CityMind AI integrates municipal datasets into a centralized intelligence platform.

The platform applies:

- Machine Learning for prediction
- Semantic Search for understanding complaints and documents
- AI Agents for collaborative decision-making
- RAG for policy-aware reasoning
- Interactive analytics for actionable insights

Instead of asking:

> "What data do we have?"

CityMind AI answers:

> "What should the city do next, and why?"

---

# 🎯 Core Features

## 📊 Unified City Dashboard

A centralized command center providing real-time visibility into:

- Citizen Complaints
- Infrastructure Health
- Budget Utilization
- Population Impact
- Resolution Metrics
- Critical Alerts

---

## 🚧 Infrastructure Risk Prediction

Predicts infrastructure failure probability using Machine Learning.

Considers:

- Asset age
- Condition score
- Historical failures
- Repair history
- Complaint frequency
- Maintenance records
- Population affected

Outputs:

- Risk Score
- Failure Probability
- Recommended Action

---

## 📢 Complaint Intelligence

Analyzes thousands of citizen complaints using Natural Language Processing.

Capabilities:

- Complaint clustering
- Duplicate detection
- Semantic search
- Trend analysis
- Hotspot identification

---

## 🤖 Multi-Agent Decision Intelligence

CityMind AI uses specialized AI Agents that collaborate to solve complex urban planning problems.

### Complaint Intelligence Agent

Analyzes citizen complaints and identifies recurring issues.

### Infrastructure Risk Agent

Evaluates infrastructure health using ML predictions.

### Budget Optimization Agent

Determines the most effective allocation of available funds.

### Citizen Impact Agent

Calculates how many citizens and critical facilities will benefit from each intervention.

### Planning Agent

Generates repair schedules and execution plans.

### Decision Agent

Combines all evidence and produces the final recommendation with reasoning.

---

## 📚 Policy-Aware Recommendations (RAG)

City officials can upload:

- Municipal Policies
- Infrastructure Guidelines
- Budget Rules
- Maintenance Standards

CityMind AI retrieves relevant policy sections before generating recommendations, ensuring that AI decisions are supported by official documentation.

---

## 💰 Budget Optimization

Optimizes city spending by balancing:

- Infrastructure risk
- Repair cost
- Citizen impact
- Budget constraints
- Project urgency

---

## 📈 Analytics & Reporting

Interactive dashboards for:

- Infrastructure Risk
- Complaint Trends
- Budget Allocation
- Department Performance
- Population Impact
- Repair Planning

---

# 🧠 AI Workflow

```text
Citizen Data + Infrastructure Data + Budget Data + Policies
                         │
                         ▼
                Data Validation
                         │
                         ▼
                Data Processing
                         │
       ┌─────────────────┴──────────────────┐
       ▼                                    ▼
Machine Learning                    Document Processing
(XGBoost, Clustering)               (OCR + Embeddings)
       │                                    │
       └─────────────────┬──────────────────┘
                         ▼
                  Vector Database
                         │
                         ▼
                 AI Agent Orchestrator
                         │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
Complaint Agent   Risk Agent     Budget Agent
        │               │               │
        └───────────────┼───────────────┘
                        ▼
              Citizen Impact Agent
                        ▼
                 Planning Agent
                        ▼
                 Decision Agent
                        ▼
              Final Recommendation
```

---

# 🏗️ System Architecture

```text
Frontend (React + Tailwind)
            │
            ▼
      FastAPI Backend
            │
            ├──────── Machine Learning Models
            │
            ├──────── AI Agent Layer
            │
            ├──────── RAG Pipeline
            │
            ├──────── Vector Database
            │
            └──────── PostgreSQL / Supabase
```

---

# 🤖 AI Technologies Used

## Machine Learning

### XGBoost

Used for:

- Infrastructure Failure Prediction
- Risk Scoring

---

### Sentence Transformers

Used for:

- Complaint Embeddings
- Semantic Similarity
- Document Embeddings

---

### K-Means Clustering

Used for:

- Complaint Categorization
- Pattern Discovery

---

## Retrieval-Augmented Generation (RAG)

Used to:

- Retrieve relevant municipal policies
- Support AI recommendations
- Improve explainability

---

## AI Agents

Implemented using LangGraph.

Each agent specializes in a different decision-making task while collaborating through structured workflows.

---

# 💻 Technology Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- ShadCN UI
- Recharts
- React Router

---

## Backend

- FastAPI
- Python
- Pydantic
- Uvicorn

---

## Machine Learning

- Scikit-learn
- XGBoost
- Pandas
- NumPy

---

## AI / GenAI

- LangGraph
- LangChain
- Gemini / Qwen / Llama
- Sentence Transformers

---

## Vector Database

- ChromaDB / FAISS

---

## Database

- Supabase PostgreSQL

---

## Authentication

- Supabase Auth

---

## Deployment

Frontend

- Vercel

Backend

- Render

---

# 📂 Expected Data Sources

- Infrastructure Dataset
- Citizen Complaints Dataset
- Budget Dataset
- Population Dataset
- Critical Facilities Dataset
- Historical Repair Dataset
- Municipal Policy Documents

---

# 🚀 Key Benefits

- Intelligent infrastructure prioritization
- Explainable AI recommendations
- Optimized budget allocation
- Reduced manual analysis
- Faster decision-making
- Improved citizen satisfaction
- Policy-aware recommendations

---

# 🎯 Future Scope

- Live IoT integration
- Satellite infrastructure monitoring
- Digital Twin Simulation
- Predictive maintenance scheduling
- Multi-city benchmarking
- Disaster response optimization
- Smart utility management

---

# 👨‍💻 Team

**CityMind AI**

Building the Intelligence Layer for Future Smart Cities.
