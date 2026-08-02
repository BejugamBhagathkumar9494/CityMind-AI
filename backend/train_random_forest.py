import os
import sys
import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report

# Ensure parent path is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Enforce UTF-8 output encoding for Windows command line compatibility
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

MODEL_PATH = os.path.join(os.path.dirname(__file__), "rf_priority_model.joblib")

def generate_synthetic_training_data(n_samples=1200):
    """Generate realistic synthetic municipal dataset for Random Forest Priority Classification training."""
    np.random.seed(42)
    
    asset_types = ['Road', 'Water', 'Electricity', 'Transport', 'Critical Facility']
    type_encoder = LabelEncoder()
    type_encoder.fit(asset_types)
    
    severities = ['Low', 'Medium', 'High', 'Critical']
    severity_encoder = LabelEncoder()
    severity_encoder.fit(severities)
    
    data = []
    for i in range(n_samples):
        atype = np.random.choice(asset_types)
        age = np.random.randint(1, 40)
        condition = round(np.random.uniform(1.0, 10.0), 1)
        complaints = np.random.randint(0, 600)
        sev = np.random.choice(severities, p=[0.2, 0.3, 0.3, 0.2])
        prev_failures = np.random.randint(0, 8)
        population = np.random.randint(1000, 100000)
        traffic_density = round(np.random.uniform(100, 35000), 0)
        cost = round(np.random.uniform(0.1, 5.0), 2)
        weather_risk = round(np.random.uniform(0.0, 1.0), 2)
        budget_avail = round(np.random.uniform(1.0, 50.0), 2)
        
        # Calculate synthetic XGBoost outputs
        fail_prob = min(0.98, max(0.05, (
            (age / 40.0) * 0.30 +
            ((10.0 - condition) / 10.0) * 0.35 +
            (min(complaints, 500) / 500.0) * 0.15 +
            (min(prev_failures, 6) / 6.0) * 0.15 +
            (weather_risk * 0.05)
        )))
        risk_score = round(fail_prob * 100.0, 1)
        
        # Determine ground truth priority class based on multi-factor thresholds
        if risk_score >= 82.0 or (fail_prob >= 0.78 and (sev == 'Critical' or population >= 50000)):
            priority = 'Critical'
        elif risk_score >= 68.0 or (fail_prob >= 0.65 and complaints >= 200):
            priority = 'High'
        elif risk_score >= 45.0 or (condition <= 5.5):
            priority = 'Medium'
        else:
            priority = 'Low'
            
        data.append({
            'risk_score': risk_score,
            'failure_probability': fail_prob,
            'asset_age': age,
            'condition_score': condition,
            'complaint_count': complaints,
            'complaint_severity_encoded': severity_encoder.transform([sev])[0],
            'previous_failures': prev_failures,
            'population_affected': population,
            'traffic_density': traffic_density,
            'asset_type_encoded': type_encoder.transform([atype])[0],
            'estimated_repair_cost': cost,
            'weather_risk': weather_risk,
            'budget_availability': budget_avail,
            'priority_class': priority
        })
        
    df = pd.DataFrame(data)
    return df, type_encoder, severity_encoder

def train_and_evaluate_random_forest():
    print("🌲 Starting Random Forest Priority Classification Engine Training...")
    
    df, type_encoder, severity_encoder = generate_synthetic_training_data(n_samples=1500)
    
    feature_cols = [
        'risk_score', 'failure_probability', 'asset_age', 'condition_score',
        'complaint_count', 'complaint_severity_encoded', 'previous_failures',
        'population_affected', 'traffic_density', 'asset_type_encoded',
        'estimated_repair_cost', 'weather_risk', 'budget_availability'
    ]
    
    X = df[feature_cols]
    y = df['priority_class']
    
    # Train / Test Split (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # Initialize Random Forest Classifier
    rf_clf = RandomForestClassifier(
        n_estimators=120,
        max_depth=10,
        min_samples_split=4,
        random_state=42
    )
    
    rf_clf.fit(X_train, y_train)
    
    # Predictions & Evaluation
    y_pred = rf_clf.predict(X_test)
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average='weighted')
    rec = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')
    cm = confusion_matrix(y_test, y_pred, labels=['Critical', 'High', 'Medium', 'Low'])
    
    print(f"\n==========================================")
    print(f"🎯 RANDOM FOREST PRIORITY CLASSIFICATION METRICS")
    print(f"==========================================")
    print(f" Accuracy:  {acc * 100:.2f}%")
    print(f" Precision: {prec * 100:.2f}%")
    print(f" Recall:    {rec * 100:.2f}%")
    print(f" F1-Score:  {f1 * 100:.2f}%")
    print(f"------------------------------------------")
    print(f" Confusion Matrix (Critical, High, Medium, Low):\n{cm}")
    print(f"------------------------------------------")
    print(" Detailed Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Serialize model, encoders, and metrics payload
    model_payload = {
        'model': rf_clf,
        'type_encoder': type_encoder,
        'severity_encoder': severity_encoder,
        'feature_cols': feature_cols,
        'metrics': {
            'accuracy': round(acc * 100, 2),
            'precision': round(prec * 100, 2),
            'recall': round(rec * 100, 2),
            'f1_score': round(f1 * 100, 2),
            'confusion_matrix': cm.tolist(),
            'feature_importances': dict(zip(feature_cols, [round(float(fi), 4) for fi in rf_clf.feature_importances_]))
        }
    }
    
    joblib.dump(model_payload, MODEL_PATH)
    print(f"✅ Random Forest Priority Model successfully saved to: {MODEL_PATH}")
    return model_payload

if __name__ == "__main__":
    train_and_evaluate_random_forest()
