import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer
import xgboost as xgb
import os
import json

class MLEngine:
    def __init__(self):
        self.risk_model = None
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        self.kmeans_model = None
        self._train_initial_risk_model()

    def _train_initial_risk_model(self):
        """Train an initial XGBoost model on synthetic/historical infrastructure failure dataset."""
        np.random.seed(42)
        n_samples = 500
        
        # Synthetic feature generation
        age = np.random.randint(1, 40, n_samples)
        condition = np.random.uniform(1.0, 10.0, n_samples)
        complaints = np.random.randint(0, 600, n_samples)
        prev_failures = np.random.randint(0, 8, n_samples)
        population = np.random.randint(1000, 100000, n_samples)
        
        # Target formula: Higher age, lower condition, higher complaints/failures -> higher failure prob
        failure_prob = (
            (age / 40.0) * 0.35 +
            ((10.0 - condition) / 10.0) * 0.35 +
            (np.minimum(complaints, 500) / 500.0) * 0.15 +
            (np.minimum(prev_failures, 5) / 5.0) * 0.15 +
            np.random.normal(0, 0.03, n_samples)
        )
        failure_prob = np.clip(failure_prob, 0.05, 0.98)
        
        X = pd.DataFrame({
            'age_years': age,
            'condition_rating': condition,
            'complaints_count': complaints,
            'previous_failures': prev_failures,
            'population_affected': population
        })
        y = failure_prob
        
        self.risk_model = xgb.XGBRegressor(n_estimators=50, max_depth=4, learning_rate=0.1)
        self.risk_model.fit(X, y)
        print("XGBoost Infrastructure Risk Model trained successfully.")

    def predict_infrastructure_risk(self, asset):
        """Predict failure probability and calculate risk score for a single infrastructure asset."""
        if not self.risk_model:
            self._train_initial_risk_model()
            
        features = pd.DataFrame([{
            'age_years': asset.get('age_years', 10),
            'condition_rating': asset.get('condition_rating', 5.0),
            'complaints_count': asset.get('complaints_count', 50),
            'previous_failures': asset.get('previous_failures', 1),
            'population_affected': asset.get('population_affected', 10000)
        }])
        
        prob = float(self.risk_model.predict(features)[0])
        prob = max(0.05, min(0.98, prob))
        risk_score = round(prob * 100, 1)
        
        urgency = "Low"
        if risk_score >= 85:
            urgency = "Critical"
        elif risk_score >= 70:
            urgency = "High"
        elif risk_score >= 50:
            urgency = "Medium"
            
        return {
            "failure_probability": round(prob, 2),
            "risk_score": risk_score,
            "urgency": urgency
        }

    def cluster_complaints(self, complaint_texts, n_clusters=4):
        """Cluster citizen complaints into thematic topics using TF-IDF / K-Means."""
        if not complaint_texts:
            return []
            
        X_tfidf = self.tfidf_vectorizer.fit_transform(complaint_texts)
        effective_clusters = min(n_clusters, len(complaint_texts))
        
        kmeans = KMeans(n_clusters=effective_clusters, random_state=42, n_init=10)
        labels = kmeans.fit_predict(X_tfidf)
        
        clusters_res = []
        for i in range(effective_clusters):
            cluster_docs = [complaint_texts[j] for j in range(len(complaint_texts)) if labels[j] == i]
            clusters_res.append({
                "cluster_id": i + 1,
                "count": len(cluster_docs),
                "sample_complaints": cluster_docs[:3]
            })
            
        return clusters_res

    def calculate_priority_score(self, asset):
        """Calculate weighted multi-parameter priority ranking score."""
        risk_score = asset.get('risk_score', 50)
        pop = asset.get('population_affected', 10000)
        complaints = asset.get('complaints_count', 50)
        cost = asset.get('repair_cost_inr', 1.0)
        is_critical = 1.5 if asset.get('type') == 'Critical Facility' else 1.0
        
        # Logarithmic population factor
        pop_factor = np.log10(max(100, pop)) * 10
        complaint_factor = min(25, complaints * 0.05)
        cost_efficiency = min(15, (pop / max(0.1, cost)) / 10000.0)
        
        score = (risk_score * 0.40 + pop_factor * 0.30 + complaint_factor * 0.15 + cost_efficiency * 0.15) * is_critical
        return round(score, 1)

    def optimize_budget(self, infrastructure_list, total_budget_cr=10.0):
        """
        Budget optimization algorithm using multi-constraint knapsack heuristic
        to maximize overall citizen impact and risk reduction.
        """
        items = []
        for asset in infrastructure_list:
            cost = asset.get('repair_cost_inr', 1.0)
            pop = asset.get('population_affected', 10000)
            risk = asset.get('risk_score', 50.0)
            
            # Value = (Risk Score * Population Affected) per Rupee spent
            value = (risk * pop) / max(0.1, cost)
            items.append({
                "id": asset.get('id'),
                "name": asset.get('name'),
                "type": asset.get('type'),
                "cost": cost,
                "population": pop,
                "risk_score": risk,
                "value": value,
                "recommended_action": asset.get('recommended_action')
            })
            
        # Sort items by value density (descending)
        items.sort(key=lambda x: x['value'], reverse=True)
        
        selected_projects = []
        spent = 0.0
        citizens_benefited = 0
        risk_reduced_total = 0.0
        
        for item in items:
            if spent + item['cost'] <= total_budget_cr:
                spent += item['cost']
                citizens_benefited += item['population']
                risk_reduced_total += (item['risk_score'] * 0.8) # 80% risk reduction post repair
                selected_projects.append(item)
                
        # Sector breakdown
        sector_breakdown = {}
        for p in selected_projects:
            t = p['type']
            sector_breakdown[t] = round(sector_breakdown.get(t, 0.0) + p['cost'], 2)
            
        remaining_budget = round(total_budget_cr - spent, 2)
        
        return {
            "total_budget_cr": total_budget_cr,
            "allocated_cr": round(spent, 2),
            "remaining_cr": remaining_budget,
            "citizens_benefited": citizens_benefited,
            "total_risk_reduced_percent": round(risk_reduced_total / max(1, len(selected_projects)), 1),
            "sector_breakdown": sector_breakdown,
            "selected_projects": selected_projects
        }

ml_engine = MLEngine()
