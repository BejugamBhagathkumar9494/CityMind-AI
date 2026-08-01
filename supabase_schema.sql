-- ==============================================================================
-- CityMind AI — Master Supabase / PostgreSQL Schema Definition & Seed Script
-- Execute this entire script directly in your Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'City Admin Officer', -- Roles: 'City Admin Officer', 'Municipal Inspector', 'Citizen Resident'
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INFRASTRUCTURE ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.infrastructure (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- Road, Water, Electricity, Transport, Critical Facility
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    installation_year INT DEFAULT 2015,
    age_years INT DEFAULT 9,
    condition_rating DOUBLE PRECISION DEFAULT 5.0,
    failure_probability DOUBLE PRECISION DEFAULT 0.50,
    risk_level TEXT DEFAULT 'Medium', -- High, Medium, Low
    population_affected INT DEFAULT 10000,
    last_inspection_date TEXT,
    status TEXT DEFAULT 'Operational', -- Operational, Degraded, Critical, Under Repair
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CITIZEN COMPLAINTS & CLUSTER TABLE
CREATE TABLE IF NOT EXISTS public.complaints (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Open', -- Open, In Progress, Resolved
    priority TEXT DEFAULT 'Medium', -- High, Medium, Low
    location TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    cluster_id INT DEFAULT 0,
    cluster_name TEXT DEFAULT 'General Issues',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DEPARTMENT BUDGETS & ALLOCATION TABLE
CREATE TABLE IF NOT EXISTS public.budgets (
    id TEXT PRIMARY KEY,
    department TEXT NOT NULL,
    allocated_amount NUMERIC(15, 2) NOT NULL,
    spent_amount NUMERIC(15, 2) DEFAULT 0.00,
    fiscal_year TEXT DEFAULT 'FY2026',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MUNICIPAL POLICY & RAG VECTOR DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding_json TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MULTI-AGENT RUN LOGS & TRACES TABLE
CREATE TABLE IF NOT EXISTS public.agent_runs (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL,
    agent_name TEXT NOT NULL,
    step_number INT DEFAULT 1,
    input_summary TEXT,
    output_log TEXT,
    confidence_score DOUBLE PRECISION DEFAULT 0.90,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CITY ALERTS & WARNINGS TABLE
CREATE TABLE IF NOT EXISTS public.alerts (
    id TEXT PRIMARY KEY,
    asset_id TEXT REFERENCES public.infrastructure(id) ON DELETE SET NULL,
    severity TEXT DEFAULT 'Warning', -- Critical, Warning, Info
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_infra_type ON public.infrastructure(type);
CREATE INDEX IF NOT EXISTS idx_infra_risk_level ON public.infrastructure(risk_level);
CREATE INDEX IF NOT EXISTS idx_infra_status ON public.infrastructure(status);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON public.complaints(category);
CREATE INDEX IF NOT EXISTS idx_complaints_cluster ON public.complaints(cluster_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_run_id ON public.agent_runs(run_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON public.alerts(severity);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.infrastructure ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to infrastructure, complaints, budgets, documents, alerts
CREATE POLICY "Public Read Access" ON public.infrastructure FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.complaints FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.budgets FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.agent_runs FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.alerts FOR SELECT USING (true);

-- Allow authenticated insertion / updates
CREATE POLICY "Public Insert Access" ON public.infrastructure FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Access" ON public.complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Access" ON public.documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Access" ON public.agent_runs FOR INSERT WITH CHECK (true);

-- User Profiles Security Policy
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ==============================================================================
-- SEED MASTER SMART CITY DATASETS
-- ==============================================================================

-- Seed Infrastructure Assets
INSERT INTO public.infrastructure (id, name, type, location, latitude, longitude, installation_year, age_years, condition_rating, failure_probability, risk_level, population_affected, status)
VALUES
('INF-RO-001', 'MG Road Flyover', 'Road', 'Central Corridor', 12.9716, 77.5946, 2012, 14, 2.8, 0.87, 'High', 150000, 'Critical'),
('INF-WA-002', 'Indiranagar Water Main Pipe', 'Water', 'Indiranagar Sector 12', 12.9784, 77.6408, 2010, 16, 3.1, 0.79, 'High', 85000, 'Degraded'),
('INF-EL-003', 'Koramangala Power Substation B', 'Electricity', 'Koramangala 4th Block', 12.9352, 77.6245, 2014, 12, 4.2, 0.64, 'Medium', 62000, 'Degraded'),
('INF-CF-004', 'Hyderabad General Hospital Grid', 'Critical Facility', 'Hyderabad Medical Zone', 17.3850, 78.4867, 2018, 8, 2.4, 0.91, 'High', 220000, 'Critical'),
('INF-TR-005', 'Namma Metro Purple Line Pillar 42', 'Transport', 'Old Airport Road', 12.9592, 77.6531, 2016, 10, 7.5, 0.22, 'Low', 110000, 'Operational')
ON CONFLICT (id) DO NOTHING;

-- Seed Municipal Budgets
INSERT INTO public.budgets (id, department, allocated_amount, spent_amount, fiscal_year)
VALUES
('BUD-001', 'Roads & Bridges', 150000000.00, 42000000.00, 'FY2026'),
('BUD-002', 'Water Supply & Sanitation', 120000000.00, 38000000.00, 'FY2026'),
('BUD-003', 'Power Grid & Lighting', 90000000.00, 25000000.00, 'FY2026'),
('BUD-004', 'Public Health Infrastructure', 80000000.00, 18000000.00, 'FY2026')
ON CONFLICT (id) DO NOTHING;

-- Seed Policy Guidelines
INSERT INTO public.documents (id, title, category, content)
VALUES
('DOC-POL-001', 'Smart Infrastructure Repair Protocol 2026', 'Policy', 'All high-risk infrastructure assets with failure probabilities exceeding 75% located near hospitals or high-density transit corridors must be prioritized for immediate emergency intervention under statutory budget provisions.'),
('DOC-POL-002', 'Water Grid Leakage Containment Act', 'Regulation', 'Water main pipelines exhibiting condition ratings below 4.0 must undergo pressurized hydro-testing within 14 days of complaint cluster identification.')
ON CONFLICT (id) DO NOTHING;

-- Seed Critical Alert
INSERT INTO public.alerts (id, asset_id, severity, title, description)
VALUES
('ALT-001', 'INF-RO-001', 'Critical', 'Structural Degradation Alert', 'MG Road Flyover failure probability reached 87% with 482 unhandled citizen complaints.'),
('ALT-002', 'INF-CF-004', 'Critical', 'Emergency Grid Risk', 'Hyderabad General Hospital grid instability reported with severe power surge risks.')
ON CONFLICT (id) DO NOTHING;
