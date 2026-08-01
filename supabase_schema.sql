-- ==============================================================================
-- CityMind AI — Master Scalable PostgreSQL / Supabase Enterprise Database Schema
-- Designed for Large-Scale Urban Data Architecture & AI Intelligence Engine
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- pgvector extension for AI RAG embeddings

-- 2. USER PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'City Admin Officer', -- 'City Admin Officer', 'Municipal Inspector', 'Citizen Resident'
    department TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CRITICAL HEALTHCARE & HOSPITAL NETWORK
CREATE TABLE IF NOT EXISTS public.hospitals (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    pincode TEXT,
    category TEXT DEFAULT 'Public', -- Public, Private, Trust, Multispecialty
    total_beds INT DEFAULT 0,
    icu_beds INT DEFAULT 0,
    ventilators INT DEFAULT 0,
    emergency_power_backup BOOLEAN DEFAULT TRUE,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ELECTRICAL POWER GRID DISRUPTIONS
CREATE TABLE IF NOT EXISTS public.grid_disruptions (
    id TEXT PRIMARY KEY,
    substation_id TEXT,
    feeder_code TEXT,
    disruption_type TEXT NOT NULL, -- Voltage Fluctuation, Transformer Overload, Blackout, Cable Fault
    disruption_start TIMESTAMPTZ NOT NULL,
    disruption_end TIMESTAMPTZ,
    duration_minutes DOUBLE PRECISION,
    customers_affected INT DEFAULT 0,
    voltage_kv DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    status TEXT DEFAULT 'Resolved', -- Active, Under Investigation, Resolved
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. WATER SENSOR TELEMETRY & LEAK DETECTION
CREATE TABLE IF NOT EXISTS public.water_sensor_telemetry (
    id TEXT PRIMARY KEY,
    sensor_id TEXT NOT NULL,
    pipe_id TEXT NOT NULL,
    zone_name TEXT NOT NULL,
    flow_rate_lps DOUBLE PRECISION,
    pressure_bar DOUBLE PRECISION,
    acoustic_noise_db DOUBLE PRECISION,
    leak_probability DOUBLE PRECISION DEFAULT 0.0,
    status TEXT DEFAULT 'Normal', -- Normal, Warning, Leak Detected
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PUBLIC TRANSPORT & URBAN MOBILITY TELEMETRY
CREATE TABLE IF NOT EXISTS public.public_transport_telemetry (
    id TEXT PRIMARY KEY,
    route_id TEXT NOT NULL,
    vehicle_id TEXT NOT NULL,
    stop_id TEXT,
    passenger_count INT DEFAULT 0,
    speed_kmh DOUBLE PRECISION,
    delay_minutes DOUBLE PRECISION DEFAULT 0.0,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. DEMOGRAPHIC CENSUS & HOUSING INFRASTRUCTURE
CREATE TABLE IF NOT EXISTS public.census_demographics (
    id TEXT PRIMARY KEY,
    state_name TEXT NOT NULL,
    district_name TEXT NOT NULL,
    total_population INT NOT NULL,
    male_population INT,
    female_population INT,
    literacy_rate DOUBLE PRECISION,
    total_households INT,
    water_access_pct DOUBLE PRECISION,
    electricity_access_pct DOUBLE PRECISION,
    updated_year INT DEFAULT 2026,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DISTRICT MACROECONOMIC GDP METRICS
CREATE TABLE IF NOT EXISTS public.district_gdp (
    id TEXT PRIMARY KEY,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    fiscal_year TEXT NOT NULL,
    gdp_amount_cr NUMERIC(15, 2) NOT NULL,
    growth_rate_pct DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. UNIFIED INFRASTRUCTURE ASSET RISK REGISTER
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
    hospital_proximity_km DOUBLE PRECISION DEFAULT 2.5,
    last_inspection_date TEXT,
    status TEXT DEFAULT 'Operational', -- Operational, Degraded, Critical, Under Repair
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CITIZEN COMPLAINTS & TF-IDF CLUSTERS
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

-- 11. MUNICIPAL BUDGET ALLOCATION & FISCAL EXPENDITURE
CREATE TABLE IF NOT EXISTS public.budgets (
    id TEXT PRIMARY KEY,
    department TEXT NOT NULL,
    allocated_amount NUMERIC(15, 2) NOT NULL,
    spent_amount NUMERIC(15, 2) DEFAULT 0.00,
    fiscal_year TEXT DEFAULT 'FY2026',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. MUNICIPAL POLICY & AI RAG VECTOR DOCUMENTS
CREATE TABLE IF NOT EXISTS public.documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding vector(384), -- pgvector 384-dimensional embedding for semantic search
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. MULTI-AGENT RUN LOGS & DECISION TRACES
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

-- 14. REAL-TIME CITY ALERTS & RISK WARNINGS
CREATE TABLE IF NOT EXISTS public.alerts (
    id TEXT PRIMARY KEY,
    asset_id TEXT REFERENCES public.infrastructure(id) ON DELETE SET NULL,
    severity TEXT DEFAULT 'Warning', -- Critical, Warning, Info
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- HIGH-PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_hospitals_district ON public.hospitals(district);
CREATE INDEX IF NOT EXISTS idx_grid_disruptions_type ON public.grid_disruptions(disruption_type);
CREATE INDEX IF NOT EXISTS idx_water_telemetry_status ON public.water_sensor_telemetry(status);
CREATE INDEX IF NOT EXISTS idx_transport_route ON public.public_transport_telemetry(route_id);
CREATE INDEX IF NOT EXISTS idx_infra_risk_level ON public.infrastructure(risk_level);
CREATE INDEX IF NOT EXISTS idx_infra_status ON public.infrastructure(status);
CREATE INDEX IF NOT EXISTS idx_complaints_cluster ON public.complaints(cluster_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_run_id ON public.agent_runs(run_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON public.alerts(severity);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grid_disruptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_sensor_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_transport_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.census_demographics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.district_gdp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.infrastructure ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies
CREATE POLICY "Public Read" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.grid_disruptions FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.water_sensor_telemetry FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.public_transport_telemetry FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.census_demographics FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.district_gdp FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.infrastructure FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.complaints FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.budgets FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.agent_runs FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.alerts FOR SELECT USING (true);

-- Public Insert Access Policies
CREATE POLICY "Public Insert" ON public.hospitals FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert" ON public.grid_disruptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert" ON public.water_sensor_telemetry FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert" ON public.public_transport_telemetry FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert" ON public.infrastructure FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert" ON public.complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert" ON public.documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert" ON public.agent_runs FOR INSERT WITH CHECK (true);

-- Profiles Access Policies
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
