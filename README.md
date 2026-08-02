<div align="center">

# 🏛️ CityMind AI
### The Intelligence Layer for Future Smart Cities

**Transforming fragmented urban data into intelligent, AI-driven city decisions.**

![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10+-yellow?style=for-the-badge&logo=python)
![XGBoost](https://img.shields.io/badge/XGBoost-ML%20Engine-red?style=for-the-badge)
![FAISS](https://img.shields.io/badge/FAISS-RAG%20Vector-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📖 Overview

Modern cities generate enormous amounts of data every day—from citizen complaints and infrastructure inspections to budget reports, utility records, and maintenance logs.

Unfortunately, these datasets exist in isolated systems, making decision-making slow, manual, and reactive.

**CityMind AI** is an AI-powered Urban Decision Intelligence Platform that unifies fragmented municipal data and helps city administrators determine:

- **What infrastructure should be repaired first?**
- **Which projects will benefit the most citizens?**
- **How should limited budgets be allocated?**
- **Which assets are at the highest risk of failure?**
- **Why did AI make a particular recommendation?**

Instead of simply visualizing data, CityMind AI combines **XGBoost Machine Learning, FAISS RAG Policy Intelligence, and Multi-Agent AI System** to generate explainable, evidence-based recommendations for smarter city management.

---

# 🌟 Key Features

### 1. ⚡ Predictive Risk & Failure Intelligence (XGBoost Engine)
- **Asset Failure Modeling**: Continuously computes risk scores (0–100) and probability of failure across 5 urban asset categories: *Road Corridors, Water Networks, Power Grid Substations, Public Transit, and Critical Healthcare Facilities*.
- **Multi-Factor Risk Scoring**: Combines asset age, condition rating, historical failure count, citizen complaint density, live weather telemetry, and population reach.

### 2. 🌲 Repair Priority Classification Engine (Random Forest Classifier)
- **Multi-Class Administrative Tiers**: Classifies assets into 4 distinct repair priority classes: **Critical** (*Immediate Repair Required*), **High** (*Repair within 7 Days*), **Medium** (*Schedule Maintenance*), and **Low** (*Continue Monitoring*).
- **High-Accuracy Classification**: Evaluated at 99.33% Accuracy and 99.34% F1-score across 13 municipal features.

### 🧠 Why Both Models Work Together in the Dual-ML Pipeline

```
Infrastructure Telemetry & Features
                ↓
Feature Engineering & Normalization
                ↓
    ⚡ XGBoost Risk Engine
(Risk Score + Failure Probability)
                ↓
🌲 Random Forest Priority Classifier
(Critical / High / Medium / Low + Confidence %)
                ↓
    📚 RAG Policy Engine (DMC Act 1957)
                ↓
    🤖 AI Multi-Agent System
                ↓
💰 0/1 Knapsack Budget Optimization
                ↓
    🚨 Emergency Dispatch & GIS Dashboard
```

- **Why XGBoost?** XGBoost is optimized for continuous regression targets, outputting precise, non-linear failure probabilities (0.00–1.00) and risk scores based on physical telemetry.
- **Why Random Forest?** Random Forest excels at robust multi-class decision boundary partitioning, converting continuous risk scores and multi-variable operational constraints into clear, un-ambiguous administrative priority tiers (*Critical, High, Medium, Low*).

### 3. 📚 Grounded Policy RAG Engine (FAISS + TF-IDF Vector Search)
- **Statutory Law & Guideline Retrieval**: Integrates the official **Delhi Municipal Corporation (DMC) Act 1957** (160+ chunks) and smart city infrastructure standard operating procedures.
- **Explainable AI Decisions**: Every repair recommendation and budget clearance is backed by statutory section citations and confidence scoring up to 98%.
- **PDF & Document Ingestion**: Upload municipal policy PDFs directly via the UI or backend pipeline for instant FAISS vector re-indexing.

### 3. 💰 Knapsack Budget & Capital Optimization Engine
- **Maximized Citizen Impact**: Uses 0/1 Knapsack optimization algorithms to select project portfolios that maximize population reach and risk reduction under strict fiscal budget constraints.
- **What-If Scenario Simulation**: Real-time simulation of budget reductions (e.g., impact of reducing capital from ₹10 Cr to ₹5 Cr) showing deferred projects and citizen exposure metrics.

### 4. 🤖 Autonomous Multi-Agent AI System
- Specialized AI agents (*Infrastructure Inspector Agent, Citizen Complaint NLP Agent, Budget Optimizer Agent, Emergency Dispatcher Agent*) continuously monitor city telemetry, prioritize maintenance backlogs, and trigger emergency bypass alerts.

---

# 🚀 Quick Start Guide

### Step 1: Install Backend Dependencies & Ingest Datasets
```bash
pip install -r requirements.txt
python backend/ingest_datasets.py
python backend/main.py
```

### Step 2: Launch Frontend Dashboard
```bash
cd frontend
npm install
npm run dev
```

---

# 📜 License
Distributed under the **MIT License**. See `LICENSE` for more details.

---

<p align="center">
  <strong>CityMind AI</strong> — <em>Empowering Municipalities with Data-Driven Intelligence</em> 🏙️✨
</p>
