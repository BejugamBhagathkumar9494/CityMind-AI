# CityMind AI — Master Data Dictionary & Dataset Analysis Report

This document contains the comprehensive analysis of all **45 municipal, health, transport, census, water grid, and economic datasets** uploaded to CityMind AI.

## Table of Contents
- [DYCD_after-school_programs__Neighborhood_Development_Area__NDA__Family_Support.csv](#dycd_after-school_programs__neighborhood_development_area__nda__family_supportcsv)
- [Grid_Disruption_00_14_standardized - Grid_Disruption_00_14_standardized.csv](#grid_disruption_00_14_standardized---grid_disruption_00_14_standardizedcsv)
- [Health index1.csv](#health-index1csv)
- [Hospitals In India (Anonymized).csv](#hospitals-in-india-anonymizedcsv)
- [elementary_2015_16.csv](#elementary_2015_16csv)
- [fy2022-proposed-city-budget-book-1.csv](#fy2022-proposed-city-budget-book-1csv)
- [gdp_AndhraPradesh1.csv](#gdp_andhrapradesh1csv)
- [gdp_AndhraPradesh2.csv](#gdp_andhrapradesh2csv)
- [gdp_ArunachalPradesh.csv](#gdp_arunachalpradeshcsv)
- [gdp_Assam1.csv](#gdp_assam1csv)
- [gdp_Assam2.csv](#gdp_assam2csv)
- [gdp_Bihar1.csv](#gdp_bihar1csv)
- [gdp_Bihar2.csv](#gdp_bihar2csv)
- [gdp_Chattisgarh.csv](#gdp_chattisgarhcsv)
- [gdp_Haryana.csv](#gdp_haryanacsv)
- [gdp_HimachalPradesh.csv](#gdp_himachalpradeshcsv)
- [gdp_Jharkhand.csv](#gdp_jharkhandcsv)
- [gdp_Karnataka1.csv](#gdp_karnataka1csv)
- [gdp_Karnataka2.csv](#gdp_karnataka2csv)
- [gdp_Kerala1.csv](#gdp_kerala1csv)
- [gdp_Kerala2.csv](#gdp_kerala2csv)
- [gdp_MadhyaPradesh.csv](#gdp_madhyapradeshcsv)
- [gdp_Maharashtra1.csv](#gdp_maharashtra1csv)
- [gdp_Maharashtra2.csv](#gdp_maharashtra2csv)
- [gdp_Manipur.csv](#gdp_manipurcsv)
- [gdp_Meghalaya.csv](#gdp_meghalayacsv)
- [gdp_Mizoram.csv](#gdp_mizoramcsv)
- [gdp_Odisha1.csv](#gdp_odisha1csv)
- [gdp_Odisha2.csv](#gdp_odisha2csv)
- [gdp_Punjab1.csv](#gdp_punjab1csv)
- [gdp_Punjab2.csv](#gdp_punjab2csv)
- [gdp_Rajasthan1.csv](#gdp_rajasthan1csv)
- [gdp_Rajasthan2.csv](#gdp_rajasthan2csv)
- [gdp_Sikkim.csv](#gdp_sikkimcsv)
- [gdp_Tamilnadu.csv](#gdp_tamilnaducsv)
- [gdp_UttarPradesh1.csv](#gdp_uttarpradesh1csv)
- [gdp_UttarPradesh2.csv](#gdp_uttarpradesh2csv)
- [gdp_Uttarakhand.csv](#gdp_uttarakhandcsv)
- [gdp_WestBengal1.csv](#gdp_westbengal1csv)
- [gdp_WestBengal2.csv](#gdp_westbengal2csv)
- [india-districts-census-2011.csv](#india-districts-census-2011csv)
- [india_census_housing-hlpca-full.csv](#india_census_housing-hlpca-fullcsv)
- [population_cities.csv](#population_citiescsv)
- [public_transport.parquet](#public_transportparquet)
- [water_network_leak_dataset.xlsx](#water_network_leak_datasetxlsx)

---

### `DYCD_after-school_programs__Neighborhood_Development_Area__NDA__Family_Support.csv`
- **Dataset Purpose**: Public Education & Youth Family Support Community Facilities
- **Total Record Count**: `464` rows
- **Total Columns**: `17` columns
- **Missing Value Count**: `1,065` cells
- **Duplicate Rows**: `1` rows
- **Latitude Column(s)**: `Latitude`
- **Longitude Column(s)**: `Longitude`
- **Timestamp / Date Column(s)**: None
- **Key Features for AI Models**: `PROGRAM TYPE`, `PROGRAM`, `BOROUGH / COMMUNITY`, `Grade Level / Age Group `, `Postcode`, `Latitude`, `Longitude`, `Community Board`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `PROGRAM TYPE` | `str` | `0` | `0.0%` | `11` |
| `PROGRAM` | `str` | `0` | `0.0%` | `21` |
| `SITE NAME` | `str` | `0` | `0.0%` | `383` |
| `BOROUGH / COMMUNITY` | `str` | `0` | `0.0%` | `18` |
| `AGENCY` | `str` | `0` | `0.0%` | `312` |
| `Contact Number` | `str` | `1` | `0.22%` | `252` |
| `Grade Level / Age Group ` | `str` | `54` | `11.64%` | `15` |
| `Location 1` | `str` | `6` | `1.29%` | `399` |
| `Postcode` | `float64` | `110` | `23.71%` | `96` |
| `Latitude` | `float64` | `110` | `23.71%` | `278` |
| `Longitude` | `float64` | `110` | `23.71%` | `279` |
| `Community Board` | `float64` | `110` | `23.71%` | `19` |
| `Community Council ` | `float64` | `110` | `23.71%` | `47` |
| `Census Tract` | `float64` | `110` | `23.71%` | `210` |
| `BIN` | `float64` | `117` | `25.22%` | `272` |
| `BBL` | `float64` | `117` | `25.22%` | `270` |
| `NTA` | `str` | `110` | `23.71%` | `111` |

---

### `Grid_Disruption_00_14_standardized - Grid_Disruption_00_14_standardized.csv`
- **Dataset Purpose**: Power Grid Stability & Electrical Infrastructure Disruption Logs
- **Total Record Count**: `1,652` rows
- **Total Columns**: `12` columns
- **Missing Value Count**: `671` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`, `Date Event Began`, `Time Event Began`, `Date of Restoration`, `Time of Restoration`
- **Key Features for AI Models**: `Event Description`, `Year`, `Time Event Began`, `Time of Restoration`, `Respondent`, `NERC Region`, `Demand Loss (MW)`, `Number of Customers Affected`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Event Description` | `str` | `0` | `0.0%` | `390` |
| `Year` | `int64` | `0` | `0.0%` | `15` |
| `Date Event Began` | `str` | `0` | `0.0%` | `1030` |
| `Time Event Began` | `str` | `9` | `0.54%` | `810` |
| `Date of Restoration` | `str` | `14` | `0.85%` | `1142` |
| `Time of Restoration` | `str` | `20` | `1.21%` | `732` |
| `Respondent` | `str` | `0` | `0.0%` | `529` |
| `Geographic Areas` | `str` | `1` | `0.06%` | `1001` |
| `NERC Region` | `str` | `2` | `0.12%` | `22` |
| `Demand Loss (MW)` | `str` | `406` | `24.58%` | `363` |
| `Number of Customers Affected` | `str` | `218` | `13.2%` | `713` |
| `Tags` | `str` | `1` | `0.06%` | `89` |

---

### `Health index1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `470` rows
- **Total Columns**: `16` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: None
- **Key Features for AI Models**: `Hydrogen`, `Oxigen`, `Nitrogen`, `Methane`, `CO`, `CO2`, `Ethylene`, `Ethane`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Hydrogen` | `int64` | `0` | `0.0%` | `111` |
| `Oxigen` | `int64` | `0` | `0.0%` | `382` |
| `Nitrogen` | `int64` | `0` | `0.0%` | `317` |
| `Methane` | `int64` | `0` | `0.0%` | `74` |
| `CO` | `int64` | `0` | `0.0%` | `298` |
| `CO2` | `int64` | `0` | `0.0%` | `374` |
| `Ethylene` | `int64` | `0` | `0.0%` | `61` |
| `Ethane` | `int64` | `0` | `0.0%` | `141` |
| `Acethylene` | `int64` | `0` | `0.0%` | `26` |
| `DBDS` | `float64` | `0` | `0.0%` | `57` |
| `Power factor` | `float64` | `0` | `0.0%` | `172` |
| `Interfacial V` | `int64` | `0` | `0.0%` | `29` |
| `Dielectric rigidity` | `int64` | `0` | `0.0%` | `41` |
| `Water content` | `int64` | `0` | `0.0%` | `63` |
| `Health index` | `float64` | `0` | `0.0%` | `65` |
| `Life expectation` | `float64` | `0` | `0.0%` | `43` |

---

### `Hospitals In India (Anonymized).csv`
- **Dataset Purpose**: Healthcare & Hospital Critical Facility Network Monitoring
- **Total Record Count**: `2,566` rows
- **Total Columns**: `9` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: `Latitude`
- **Longitude Column(s)**: `Longitude`
- **Timestamp / Date Column(s)**: None
- **Key Features for AI Models**: `City`, `State`, `District`, `Density`, `Latitude`, `Longitude`, `Rating`, `Number of Reviews`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `str` | `0` | `0.0%` | `2557` |
| `City` | `str` | `0` | `0.0%` | `250` |
| `State` | `str` | `0` | `0.0%` | `25` |
| `District` | `str` | `0` | `0.0%` | `204` |
| `Density` | `float64` | `0` | `0.0%` | `189` |
| `Latitude` | `float64` | `0` | `0.0%` | `2557` |
| `Longitude` | `float64` | `0` | `0.0%` | `2557` |
| `Rating` | `float64` | `0` | `0.0%` | `37` |
| `Number of Reviews` | `int64` | `0` | `0.0%` | `1138` |

---

### `elementary_2015_16.csv`
- **Dataset Purpose**: Public Education & Youth Family Support Community Facilities
- **Total Record Count**: `680` rows
- **Total Columns**: `800` columns
- **Missing Value Count**: `569` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: `TOTAL POULATION`, `PERCENTAGE URBAN POPULATION`, `0-6 POPULATION`, `PERCENTAGE SC POPULATION`, `PERCENTAGE ST POPULATION`
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `YEAR`, `TOTAL (ROADTOT)`, `TOTAL (ESTDTOT)`
- **Key Features for AI Models**: `Unnamed: 0`, `STATE NAME`, `TOTAL POULATION`, `PERCENTAGE URBAN POPULATION`, `0-6 POPULATION`, `GROWTH RATE`, `SEX RATIO`, `PERCENTAGE SC POPULATION`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Unnamed: 0` | `int64` | `0` | `0.0%` | `680` |
| `YEAR` | `str` | `0` | `0.0%` | `1` |
| `STATE NAME` | `str` | `0` | `0.0%` | `36` |
| `DISTRICT NAME` | `str` | `0` | `0.0%` | `680` |
| `TOTAL POULATION` | `float64` | `46` | `6.76%` | `634` |
| `PERCENTAGE URBAN POPULATION` | `float64` | `49` | `7.21%` | `580` |
| `0-6 POPULATION` | `float64` | `47` | `6.91%` | `633` |
| `GROWTH RATE` | `float64` | `46` | `6.76%` | `566` |
| `SEX RATIO` | `float64` | `46` | `6.76%` | `215` |
| `PERCENTAGE SC POPULATION` | `float64` | `47` | `6.91%` | `536` |
| `PERCENTAGE ST POPULATION` | `float64` | `47` | `6.91%` | `463` |
| `OVERALL LITERACY` | `float64` | `46` | `6.76%` | `574` |
| `FEMALE LITERACY` | `float64` | `43` | `6.32%` | `594` |
| `MALE LITERACY` | `float64` | `42` | `6.18%` | `573` |
| `AREA (SQ. KM) (AREA SQKM)` | `float64` | `18` | `2.65%` | `617` |
| `AGE GROUP 6 TO 10 (TOT 6 10 15)` | `float64` | `46` | `6.76%` | `633` |
| `AGE GROUP 11 TO 13 (TOT 11 13 15)` | `float64` | `46` | `6.76%` | `633` |
| `PRIMARY ONLY (SCH1)` | `int64` | `0` | `0.0%` | `597` |
| `PRIMARY WITH UPPER PRIMARY (SCH2)` | `int64` | `0` | `0.0%` | `472` |
| `PRIMARY WITH UPPER PRIMARY SEC/H.SEC (SCH3)` | `int64` | `0` | `0.0%` | `176` |
| `UPPER PRIMARY ONLY (SCH4)` | `int64` | `0` | `0.0%` | `301` |
| `UPPER PRIMARY WITH SEC./H.SEC (SCH5)` | `int64` | `0` | `0.0%` | `179` |
| `PRIMARY WITH UPPER PRIMARY SEC (SCH6)` | `int64` | `0` | `0.0%` | `193` |
| `UPPER PRIMARY WITH  SEC. (SCH7)` | `int64` | `0` | `0.0%` | `202` |
| `NO RESPONSE (SCH9)` | `int64` | `0` | `0.0%` | `1` |
| *...and 775 more columns* | | | | |

---

### `fy2022-proposed-city-budget-book-1.csv`
- **Dataset Purpose**: Municipal Departmental Budget Allocation & Fiscal Expenditure
- **Total Record Count**: `1,533` rows
- **Total Columns**: `12` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: None
- **Key Features for AI Models**: `index`, `Acct-Type`, `Acct-Div`, `Acct-Dept`, `Summ-Acct`, `GL-Account`, `2019-Actual`, `2020-Actual`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `index` | `int64` | `0` | `0.0%` | `1533` |
| `Fund` | `str` | `0` | `0.0%` | `1` |
| `Acct-Type` | `str` | `0` | `0.0%` | `2` |
| `Acct-Div` | `str` | `0` | `0.0%` | `18` |
| `Acct-Dept` | `str` | `0` | `0.0%` | `72` |
| `Summ-Acct` | `str` | `0` | `0.0%` | `50` |
| `GL-Account` | `str` | `0` | `0.0%` | `311` |
| `2019-Actual` | `int64` | `0` | `0.0%` | `1299` |
| `2020-Actual` | `int64` | `0` | `0.0%` | `1259` |
| `2021-Budget` | `int64` | `0` | `0.0%` | `789` |
| `2022-Recommend` | `int64` | `0` | `0.0%` | `795` |
| `2023-Forecast` | `int64` | `0` | `0.0%` | `832` |

---

### `gdp_AndhraPradesh1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `17` rows
- **Total Columns**: `25` columns
- **Missing Value Count**: `4` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Adilabad`, ` Anantapur`, ` Chittoor`, `Godavari East`, `Godavari West`, ` Guntur`, ` Hyderabad`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `9` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Adilabad` | `float64` | `0` | `0.0%` | `17` |
| ` Anantapur` | `float64` | `0` | `0.0%` | `17` |
| ` Chittoor` | `float64` | `0` | `0.0%` | `17` |
| `Godavari East` | `float64` | `0` | `0.0%` | `17` |
| `Godavari West` | `float64` | `0` | `0.0%` | `17` |
| ` Guntur` | `float64` | `0` | `0.0%` | `17` |
| ` Hyderabad` | `float64` | `0` | `0.0%` | `17` |
| ` Kadapa` | `float64` | `0` | `0.0%` | `17` |
| ` Karimnagar` | `float64` | `0` | `0.0%` | `17` |
| ` Khammam` | `float64` | `0` | `0.0%` | `17` |
| ` Krishna` | `float64` | `0` | `0.0%` | `17` |
| ` Kurnool` | `float64` | `0` | `0.0%` | `17` |
| ` Mahabubnagar` | `float64` | `4` | `23.53%` | `13` |
| ` Medak` | `float64` | `0` | `0.0%` | `17` |
| ` Nalgonda` | `float64` | `0` | `0.0%` | `17` |
| ` Nellore` | `float64` | `0` | `0.0%` | `17` |
| ` Nizamabad` | `float64` | `0` | `0.0%` | `17` |
| ` Prakasam` | `float64` | `0` | `0.0%` | `17` |
| ` Rangareddy` | `float64` | `0` | `0.0%` | `17` |
| ` Srikakulam` | `float64` | `0` | `0.0%` | `17` |
| ` Visakapatnam` | `float64` | `0` | `0.0%` | `17` |
| ` Vizianagaram` | `float64` | `0` | `0.0%` | `17` |
| ` Warangal` | `float64` | `0` | `0.0%` | `17` |

---

### `gdp_AndhraPradesh2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `17` rows
- **Total Columns**: `25` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Adilabad`, `Anantapur`, `Chittoor`, `Godavari East`, `Godavari West`, `Guntur`, `Hyderabad`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `9` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Adilabad` | `float64` | `0` | `0.0%` | `17` |
| `Anantapur` | `float64` | `0` | `0.0%` | `17` |
| `Chittoor` | `float64` | `0` | `0.0%` | `17` |
| `Godavari East` | `float64` | `0` | `0.0%` | `17` |
| `Godavari West` | `float64` | `0` | `0.0%` | `17` |
| `Guntur` | `float64` | `0` | `0.0%` | `17` |
| `Hyderabad` | `float64` | `0` | `0.0%` | `17` |
| `Kadapa` | `float64` | `0` | `0.0%` | `17` |
| `Karimnagar` | `float64` | `0` | `0.0%` | `17` |
| `Khammam` | `float64` | `0` | `0.0%` | `17` |
| `Krishna` | `float64` | `0` | `0.0%` | `17` |
| `Kurnool` | `float64` | `0` | `0.0%` | `17` |
| `Mahabubnagar` | `float64` | `0` | `0.0%` | `17` |
| `Medak` | `float64` | `0` | `0.0%` | `17` |
| `Nalgonda` | `float64` | `0` | `0.0%` | `17` |
| `Nellore` | `float64` | `0` | `0.0%` | `17` |
| ` Nizamabad` | `float64` | `0` | `0.0%` | `17` |
| `Prakasam` | `float64` | `0` | `0.0%` | `17` |
| `Rangareddy` | `float64` | `0` | `0.0%` | `17` |
| `Srikakulam` | `float64` | `0` | `0.0%` | `17` |
| `Visakapatnam` | `float64` | `0` | `0.0%` | `17` |
| `Vizianagaram` | `float64` | `0` | `0.0%` | `17` |
| `Warangal` | `float64` | `0` | `0.0%` | `17` |

---

### `gdp_ArunachalPradesh.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `17` rows
- **Total Columns**: `15` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Changlang`, ` Dibang Valley`, ` Kameng: East`, ` Kameng: West`, ` Lohit`, ` Papumpare`, ` Siang: East`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `9` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Changlang` | `float64` | `0` | `0.0%` | `17` |
| ` Dibang Valley` | `float64` | `0` | `0.0%` | `17` |
| ` Kameng: East` | `float64` | `0` | `0.0%` | `17` |
| ` Kameng: West` | `float64` | `0` | `0.0%` | `17` |
| ` Lohit` | `float64` | `0` | `0.0%` | `17` |
| ` Papumpare` | `float64` | `0` | `0.0%` | `17` |
| ` Siang: East` | `float64` | `0` | `0.0%` | `17` |
| ` Siang: Upper` | `float64` | `0` | `0.0%` | `17` |
| ` Siang: West` | `float64` | `0` | `0.0%` | `17` |
| ` Subansiri: Lower` | `float64` | `0` | `0.0%` | `17` |
| ` Subansiri: Upper` | `float64` | `0` | `0.0%` | `17` |
| ` Tawang` | `float64` | `0` | `0.0%` | `17` |
| ` Tirap` | `float64` | `0` | `0.0%` | `17` |

---

### `gdp_Assam1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `17` rows
- **Total Columns**: `29` columns
- **Missing Value Count**: `50` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: ` Karbi Anglong`
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Baksa`, ` Barpeta`, ` Bongaigaon`, ` Cachar`, ` Chirang`, ` Darrang`, ` Dhemaji`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `9` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Baksa` | `float64` | `10` | `58.82%` | `7` |
| ` Barpeta` | `float64` | `0` | `0.0%` | `17` |
| ` Bongaigaon` | `float64` | `0` | `0.0%` | `17` |
| ` Cachar` | `float64` | `0` | `0.0%` | `17` |
| ` Chirang` | `float64` | `10` | `58.82%` | `7` |
| ` Darrang` | `float64` | `0` | `0.0%` | `17` |
| ` Dhemaji` | `float64` | `0` | `0.0%` | `17` |
| ` Dhubri` | `float64` | `0` | `0.0%` | `17` |
| ` Dibrugarh` | `float64` | `0` | `0.0%` | `17` |
| ` Goalpara` | `float64` | `0` | `0.0%` | `17` |
| ` Golaghat` | `float64` | `0` | `0.0%` | `17` |
| ` Hailakandi` | `float64` | `0` | `0.0%` | `17` |
| ` Jorhat` | `float64` | `0` | `0.0%` | `17` |
| ` Kamrup` | `float64` | `10` | `58.82%` | `7` |
| ` Kamrup Metropolitan` | `float64` | `10` | `58.82%` | `7` |
| ` Karbi Anglong` | `float64` | `0` | `0.0%` | `17` |
| ` Karimganj` | `float64` | `0` | `0.0%` | `17` |
| ` Kokrajhar` | `float64` | `0` | `0.0%` | `17` |
| ` Lakhimpur` | `float64` | `0` | `0.0%` | `17` |
| ` Morigaon` | `float64` | `0` | `0.0%` | `17` |
| ` Nagaon` | `float64` | `0` | `0.0%` | `17` |
| ` Nalbari` | `float64` | `0` | `0.0%` | `17` |
| ` North Cachar Hills` | `float64` | `0` | `0.0%` | `17` |
| *...and 4 more columns* | | | | |

---

### `gdp_Assam2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `1` rows
- **Total Columns**: `29` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: ` Karbi-Anglong`
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: None

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `1` |
| `Description` | `str` | `0` | `0.0%` | `1` |
| ` Baksa` | `float64` | `0` | `0.0%` | `1` |
| ` Barpeta` | `float64` | `0` | `0.0%` | `1` |
| ` Bongaigaon` | `float64` | `0` | `0.0%` | `1` |
| ` Cachar` | `float64` | `0` | `0.0%` | `1` |
| ` Chirang` | `float64` | `0` | `0.0%` | `1` |
| ` Darrang` | `float64` | `0` | `0.0%` | `1` |
| ` Dhemaji` | `float64` | `0` | `0.0%` | `1` |
| ` Dhubri` | `float64` | `0` | `0.0%` | `1` |
| ` Dibrugarh` | `float64` | `0` | `0.0%` | `1` |
| ` Dima Hasao` | `float64` | `0` | `0.0%` | `1` |
| ` Goalpara` | `float64` | `0` | `0.0%` | `1` |
| ` Golaghat` | `float64` | `0` | `0.0%` | `1` |
| ` Hailakandi` | `float64` | `0` | `0.0%` | `1` |
| ` Jorhat` | `float64` | `0` | `0.0%` | `1` |
| ` Kamrup (Metropolitan)` | `float64` | `0` | `0.0%` | `1` |
| ` Kamrup Rural` | `float64` | `0` | `0.0%` | `1` |
| ` Karbi-Anglong` | `float64` | `0` | `0.0%` | `1` |
| ` Karimganj` | `float64` | `0` | `0.0%` | `1` |
| ` Kokrajhar` | `float64` | `0` | `0.0%` | `1` |
| ` Lakhimpur` | `float64` | `0` | `0.0%` | `1` |
| ` Morigaon` | `float64` | `0` | `0.0%` | `1` |
| ` Nagaon` | `float64` | `0` | `0.0%` | `1` |
| ` Nalbari` | `float64` | `0` | `0.0%` | `1` |
| *...and 4 more columns* | | | | |

---

### `gdp_Bihar1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `11` rows
- **Total Columns**: `40` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Araria`, ` Arwal`, ` Aurangabad`, ` Banka`, ` Begusarai`, ` Bhabhua`, ` Bhagalpur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `6` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Araria` | `float64` | `0` | `0.0%` | `11` |
| ` Arwal` | `float64` | `0` | `0.0%` | `11` |
| ` Aurangabad` | `float64` | `0` | `0.0%` | `11` |
| ` Banka` | `float64` | `0` | `0.0%` | `11` |
| ` Begusarai` | `float64` | `0` | `0.0%` | `11` |
| ` Bhabhua` | `float64` | `0` | `0.0%` | `11` |
| ` Bhagalpur` | `float64` | `0` | `0.0%` | `11` |
| ` Bhojpur` | `float64` | `0` | `0.0%` | `11` |
| ` Buxar` | `float64` | `0` | `0.0%` | `11` |
| ` East Champaran` | `float64` | `0` | `0.0%` | `11` |
| `West Champaran` | `float64` | `0` | `0.0%` | `11` |
| ` Darbhanga` | `float64` | `0` | `0.0%` | `11` |
| ` Gaya` | `float64` | `0` | `0.0%` | `11` |
| ` Gopalgang` | `float64` | `0` | `0.0%` | `11` |
| ` Jahanabad` | `float64` | `0` | `0.0%` | `11` |
| ` Jamui` | `float64` | `0` | `0.0%` | `11` |
| ` Katihar` | `float64` | `0` | `0.0%` | `11` |
| ` Khagaria` | `float64` | `0` | `0.0%` | `11` |
| ` Kisangang` | `float64` | `0` | `0.0%` | `11` |
| ` Lakhisarai` | `float64` | `0` | `0.0%` | `11` |
| ` Madhepura` | `float64` | `0` | `0.0%` | `11` |
| ` Madhubani` | `float64` | `0` | `0.0%` | `11` |
| ` Munger` | `float64` | `0` | `0.0%` | `11` |
| *...and 15 more columns* | | | | |

---

### `gdp_Bihar2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `40` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Araria`, ` Arwal`, ` Aurangabad`, ` Banka`, ` Begusarai`, ` Bhabhua`, ` Bhagalpur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Araria` | `float64` | `0` | `0.0%` | `13` |
| ` Arwal` | `float64` | `0` | `0.0%` | `13` |
| ` Aurangabad` | `float64` | `0` | `0.0%` | `13` |
| ` Banka` | `float64` | `0` | `0.0%` | `13` |
| ` Begusarai` | `float64` | `0` | `0.0%` | `13` |
| ` Bhabhua` | `float64` | `0` | `0.0%` | `13` |
| ` Bhagalpur` | `float64` | `0` | `0.0%` | `13` |
| ` Bhojpur` | `float64` | `0` | `0.0%` | `13` |
| ` Buxar` | `float64` | `0` | `0.0%` | `13` |
| ` Darbhanga` | `float64` | `0` | `0.0%` | `13` |
| `East Champaran` | `float64` | `0` | `0.0%` | `13` |
| ` Gaya` | `float64` | `0` | `0.0%` | `13` |
| ` Gopalgang` | `float64` | `0` | `0.0%` | `13` |
| ` Jamui` | `float64` | `0` | `0.0%` | `13` |
| ` Jehanabad` | `float64` | `0` | `0.0%` | `13` |
| ` Katihar` | `float64` | `0` | `0.0%` | `13` |
| ` Khagaria` | `float64` | `0` | `0.0%` | `13` |
| `Kisangang` | `float64` | `0` | `0.0%` | `13` |
| ` Lakhisarai` | `float64` | `0` | `0.0%` | `13` |
| ` Madhepura` | `float64` | `0` | `0.0%` | `13` |
| ` Madhubani` | `float64` | `0` | `0.0%` | `13` |
| ` Munger` | `float64` | `0` | `0.0%` | `13` |
| ` Muzaffarpur` | `float64` | `0` | `0.0%` | `13` |
| *...and 15 more columns* | | | | |

---

### `gdp_Chattisgarh.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `18` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Baster`, ` Bilaspur`, ` Damtari`, ` Dantewara`, ` Durg`, ` Janjgir Champa`, ` Jashpur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Baster` | `float64` | `0` | `0.0%` | `15` |
| ` Bilaspur` | `float64` | `0` | `0.0%` | `15` |
| ` Damtari` | `float64` | `0` | `0.0%` | `15` |
| ` Dantewara` | `float64` | `0` | `0.0%` | `15` |
| ` Durg` | `float64` | `0` | `0.0%` | `15` |
| ` Janjgir Champa` | `float64` | `0` | `0.0%` | `15` |
| ` Jashpur` | `float64` | `0` | `0.0%` | `15` |
| ` Kanker` | `float64` | `0` | `0.0%` | `15` |
| ` Kawardha` | `float64` | `0` | `0.0%` | `15` |
| ` Korba` | `float64` | `0` | `0.0%` | `15` |
| ` Koriya` | `float64` | `0` | `0.0%` | `15` |
| ` Mahasamund` | `float64` | `0` | `0.0%` | `15` |
| ` Raigarh` | `float64` | `0` | `0.0%` | `15` |
| ` Raipur` | `float64` | `0` | `0.0%` | `15` |
| ` Rajnangaon` | `float64` | `0` | `0.0%` | `15` |
| ` Surguja` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_Haryana.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `21` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Ambala`, ` Bhiwani`, ` Faridabad`, ` Fatehabad`, ` Gurgaon`, ` Hisar`, ` Jhajjar`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Ambala` | `float64` | `0` | `0.0%` | `13` |
| ` Bhiwani` | `float64` | `0` | `0.0%` | `13` |
| ` Faridabad` | `float64` | `0` | `0.0%` | `13` |
| ` Fatehabad` | `float64` | `0` | `0.0%` | `13` |
| ` Gurgaon` | `float64` | `0` | `0.0%` | `13` |
| ` Hisar` | `float64` | `0` | `0.0%` | `13` |
| ` Jhajjar` | `float64` | `0` | `0.0%` | `13` |
| ` Jind` | `float64` | `0` | `0.0%` | `13` |
| ` Kaithal` | `float64` | `0` | `0.0%` | `13` |
| ` Karnal` | `float64` | `0` | `0.0%` | `13` |
| ` Kurukshetra` | `float64` | `0` | `0.0%` | `13` |
| ` Mahindergarh` | `float64` | `0` | `0.0%` | `13` |
| ` Panchkula` | `float64` | `0` | `0.0%` | `13` |
| ` Panipat` | `float64` | `0` | `0.0%` | `13` |
| ` Rewari` | `float64` | `0` | `0.0%` | `13` |
| ` Rohtak` | `float64` | `0` | `0.0%` | `13` |
| ` Sirsa` | `float64` | `0` | `0.0%` | `13` |
| ` Sonipat` | `float64` | `0` | `0.0%` | `13` |
| ` Yamuna Nagar` | `float64` | `0` | `0.0%` | `13` |

---

### `gdp_HimachalPradesh.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `14` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Bilaspur`, ` Chamba`, ` Hamirpur`, ` Kangra`, ` Kinnaur`, ` Kullu`, ` Lahaul and Spiti`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Bilaspur` | `float64` | `0` | `0.0%` | `13` |
| ` Chamba` | `float64` | `0` | `0.0%` | `13` |
| ` Hamirpur` | `float64` | `0` | `0.0%` | `13` |
| ` Kangra` | `float64` | `0` | `0.0%` | `13` |
| ` Kinnaur` | `float64` | `0` | `0.0%` | `13` |
| ` Kullu` | `float64` | `0` | `0.0%` | `13` |
| ` Lahaul and Spiti` | `float64` | `0` | `0.0%` | `13` |
| ` Mandi` | `float64` | `0` | `0.0%` | `13` |
| ` Shimla` | `float64` | `0` | `0.0%` | `13` |
| ` Sirmaur` | `float64` | `0` | `0.0%` | `13` |
| ` Solan` | `float64` | `0` | `0.0%` | `13` |
| ` Una` | `float64` | `0` | `0.0%` | `13` |

---

### `gdp_Jharkhand.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `24` columns
- **Missing Value Count**: `24` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: ` Latehar`
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Bokaro`, ` Chatra`, ` Deoghar`, ` Dhanbad`, ` Dumka`, ` Garhwa`, ` Giridih`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Bokaro` | `float64` | `0` | `0.0%` | `13` |
| ` Chatra` | `float64` | `0` | `0.0%` | `13` |
| ` Deoghar` | `float64` | `0` | `0.0%` | `13` |
| ` Dhanbad` | `float64` | `0` | `0.0%` | `13` |
| ` Dumka` | `float64` | `0` | `0.0%` | `13` |
| ` Garhwa` | `float64` | `0` | `0.0%` | `13` |
| ` Giridih` | `float64` | `0` | `0.0%` | `13` |
| ` Godda` | `float64` | `0` | `0.0%` | `13` |
| ` Gumla` | `float64` | `0` | `0.0%` | `13` |
| ` Hazaribagh` | `float64` | `0` | `0.0%` | `13` |
| ` Jamtara` | `float64` | `6` | `46.15%` | `7` |
| ` Koderma` | `float64` | `0` | `0.0%` | `13` |
| ` Latehar` | `float64` | `6` | `46.15%` | `7` |
| ` Lohardaga` | `float64` | `0` | `0.0%` | `13` |
| ` Pakur` | `float64` | `0` | `0.0%` | `13` |
| ` Palamu` | `float64` | `0` | `0.0%` | `13` |
| ` Ranchi` | `float64` | `0` | `0.0%` | `13` |
| ` Sahebganj` | `float64` | `0` | `0.0%` | `13` |
| ` Saraykela Kharsawa` | `float64` | `6` | `46.15%` | `7` |
| ` Simdega` | `float64` | `6` | `46.15%` | `7` |
| ` Singhbhum: East` | `float64` | `0` | `0.0%` | `13` |
| ` Singhbhum: West` | `float64` | `0` | `0.0%` | `13` |

---

### `gdp_Karnataka1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `29` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Bagalkote`, `Bangalore Rural`, `Bangalore Urban`, `Belgaum`, `Bellary`, `Bidar`, `Bijapur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Bagalkote` | `float64` | `0` | `0.0%` | `13` |
| `Bangalore Rural` | `float64` | `0` | `0.0%` | `13` |
| `Bangalore Urban` | `float64` | `0` | `0.0%` | `13` |
| `Belgaum` | `float64` | `0` | `0.0%` | `13` |
| `Bellary` | `float64` | `0` | `0.0%` | `13` |
| `Bidar` | `float64` | `0` | `0.0%` | `13` |
| `Bijapur` | `float64` | `0` | `0.0%` | `13` |
| `Chamarajanagar` | `float64` | `0` | `0.0%` | `13` |
| `Chickmagalur` | `float64` | `0` | `0.0%` | `13` |
| `Chitradurga` | `float64` | `0` | `0.0%` | `13` |
| `Dakshina Kannada` | `float64` | `0` | `0.0%` | `13` |
| `Davangere` | `float64` | `0` | `0.0%` | `13` |
| `Dharwad` | `float64` | `0` | `0.0%` | `13` |
| `Gadag` | `float64` | `0` | `0.0%` | `13` |
| `Gulbarga` | `float64` | `0` | `0.0%` | `13` |
| `Hassan` | `float64` | `0` | `0.0%` | `13` |
| `Haveri` | `float64` | `0` | `0.0%` | `13` |
| `Kodagu` | `float64` | `0` | `0.0%` | `13` |
| `Kolar` | `float64` | `0` | `0.0%` | `13` |
| `Koppal` | `float64` | `0` | `0.0%` | `13` |
| `Mandya` | `float64` | `0` | `0.0%` | `13` |
| `Mysore` | `float64` | `0` | `0.0%` | `13` |
| `Raichur` | `float64` | `0` | `0.0%` | `13` |
| *...and 4 more columns* | | | | |

---

### `gdp_Karnataka2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `7` rows
- **Total Columns**: `32` columns
- **Missing Value Count**: `4` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Bagalkote`, ` Bangalore Rural`, ` Bangalore Urban`, ` Belgaum`, ` Bellary`, ` Bidar`, ` Bijapur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `4` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Bagalkote` | `float64` | `0` | `0.0%` | `7` |
| ` Bangalore Rural` | `float64` | `0` | `0.0%` | `7` |
| ` Bangalore Urban` | `float64` | `0` | `0.0%` | `7` |
| ` Belgaum` | `float64` | `0` | `0.0%` | `7` |
| ` Bellary` | `float64` | `0` | `0.0%` | `7` |
| ` Bidar` | `float64` | `0` | `0.0%` | `7` |
| ` Bijapur` | `float64` | `0` | `0.0%` | `7` |
| ` Chamarajanagar` | `float64` | `0` | `0.0%` | `7` |
| ` Chickballapur` | `float64` | `0` | `0.0%` | `7` |
| ` Chickmagalur` | `float64` | `0` | `0.0%` | `7` |
| ` Chitradurga` | `float64` | `0` | `0.0%` | `7` |
| ` Dakshina Kannada` | `float64` | `0` | `0.0%` | `7` |
| ` Davangere` | `float64` | `0` | `0.0%` | `7` |
| ` Dharwad` | `float64` | `0` | `0.0%` | `7` |
| ` Gadag` | `float64` | `0` | `0.0%` | `7` |
| ` Gulbarga` | `float64` | `0` | `0.0%` | `7` |
| ` Hassan` | `float64` | `0` | `0.0%` | `7` |
| ` Haveri` | `float64` | `0` | `0.0%` | `7` |
| ` Kodagu` | `float64` | `0` | `0.0%` | `7` |
| ` Kolar` | `float64` | `0` | `0.0%` | `7` |
| ` Koppal` | `float64` | `0` | `0.0%` | `7` |
| ` Mandya` | `float64` | `0` | `0.0%` | `7` |
| ` Mysore` | `float64` | `0` | `0.0%` | `7` |
| *...and 7 more columns* | | | | |

---

### `gdp_Kerala1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `16` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Alappuzha`, `Ernakulam`, `Idukki`, `Kannur`, `Kasargode`, `Kollam`, `Kottayam`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Alappuzha` | `float64` | `0` | `0.0%` | `15` |
| `Ernakulam` | `float64` | `0` | `0.0%` | `15` |
| `Idukki` | `float64` | `0` | `0.0%` | `15` |
| `Kannur` | `float64` | `0` | `0.0%` | `15` |
| `Kasargode` | `float64` | `0` | `0.0%` | `15` |
| `Kollam` | `float64` | `0` | `0.0%` | `15` |
| `Kottayam` | `float64` | `0` | `0.0%` | `15` |
| `Kozhikode` | `float64` | `0` | `0.0%` | `15` |
| `Malappuram` | `float64` | `0` | `0.0%` | `15` |
| `Palakkad` | `float64` | `0` | `0.0%` | `15` |
| `Pathanamthitta` | `float64` | `0` | `0.0%` | `15` |
| `Thiruvananthapuram` | `float64` | `0` | `0.0%` | `15` |
| `Thrissur` | `float64` | `0` | `0.0%` | `15` |
| `Wayanad` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_Kerala2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `16` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Alappuzha`, `Ernakulam`, ` Idukki`, ` Kannur`, `Kasargode`, ` Kollam`, ` Kottayam`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Alappuzha` | `float64` | `0` | `0.0%` | `15` |
| `Ernakulam` | `float64` | `0` | `0.0%` | `15` |
| ` Idukki` | `float64` | `0` | `0.0%` | `15` |
| ` Kannur` | `float64` | `0` | `0.0%` | `15` |
| `Kasargode` | `float64` | `0` | `0.0%` | `15` |
| ` Kollam` | `float64` | `0` | `0.0%` | `15` |
| ` Kottayam` | `float64` | `0` | `0.0%` | `15` |
| ` Kozhikode` | `float64` | `0` | `0.0%` | `15` |
| ` Malappuram` | `float64` | `0` | `0.0%` | `15` |
| ` Palakkad` | `float64` | `0` | `0.0%` | `15` |
| ` Pathanamthitta` | `float64` | `0` | `0.0%` | `15` |
| ` Thiruvananthapuram` | `float64` | `0` | `0.0%` | `15` |
| ` Thrissur` | `float64` | `0` | `0.0%` | `15` |
| ` Wayanad` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_MadhyaPradesh.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `47` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Balaghat`, `Barwani`, `Betul`, `Bhind`, `Bhopal`, `Chhatarpur`, `Chhindwara`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Balaghat` | `float64` | `0` | `0.0%` | `15` |
| `Barwani` | `float64` | `0` | `0.0%` | `15` |
| `Betul` | `float64` | `0` | `0.0%` | `15` |
| `Bhind` | `float64` | `0` | `0.0%` | `15` |
| `Bhopal` | `float64` | `0` | `0.0%` | `15` |
| `Chhatarpur` | `float64` | `0` | `0.0%` | `15` |
| `Chhindwara` | `float64` | `0` | `0.0%` | `15` |
| `Damoh` | `float64` | `0` | `0.0%` | `15` |
| `Datia` | `float64` | `0` | `0.0%` | `15` |
| `Dewas` | `float64` | `0` | `0.0%` | `15` |
| `Dhar` | `float64` | `0` | `0.0%` | `15` |
| `Dindori` | `float64` | `0` | `0.0%` | `15` |
| `Guna` | `float64` | `0` | `0.0%` | `15` |
| `Gwalior` | `float64` | `0` | `0.0%` | `15` |
| `Harda` | `float64` | `0` | `0.0%` | `15` |
| `Hoshangabad` | `float64` | `0` | `0.0%` | `15` |
| `Indore` | `float64` | `0` | `0.0%` | `15` |
| `Jabalpur` | `float64` | `0` | `0.0%` | `15` |
| `Jhabua` | `float64` | `0` | `0.0%` | `15` |
| `Katni` | `float64` | `0` | `0.0%` | `15` |
| `Mandla` | `float64` | `0` | `0.0%` | `15` |
| `Mandsaur` | `float64` | `0` | `0.0%` | `15` |
| `Morena` | `float64` | `0` | `0.0%` | `15` |
| *...and 22 more columns* | | | | |

---

### `gdp_Maharashtra1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `36` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: `Latur`
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Ahmednagar`, `Akola`, `Amravati`, `Aurangabad`, `Beed`, `Bhandara`, `Buldhana`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Ahmednagar` | `float64` | `0` | `0.0%` | `15` |
| `Akola` | `float64` | `0` | `0.0%` | `15` |
| `Amravati` | `float64` | `0` | `0.0%` | `15` |
| `Aurangabad` | `float64` | `0` | `0.0%` | `15` |
| `Beed` | `float64` | `0` | `0.0%` | `15` |
| `Bhandara` | `float64` | `0` | `0.0%` | `15` |
| `Buldhana` | `float64` | `0` | `0.0%` | `15` |
| `Chandrapur` | `float64` | `0` | `0.0%` | `15` |
| `Dhule` | `float64` | `0` | `0.0%` | `15` |
| `Gadchiroli` | `float64` | `0` | `0.0%` | `15` |
| `Gondia` | `float64` | `0` | `0.0%` | `15` |
| `Hingoli` | `float64` | `0` | `0.0%` | `15` |
| `Jalna` | `float64` | `0` | `0.0%` | `15` |
| `Jalgaon` | `float64` | `0` | `0.0%` | `15` |
| `Kolhapur` | `float64` | `0` | `0.0%` | `15` |
| `Latur` | `float64` | `0` | `0.0%` | `15` |
| `Mumbai` | `float64` | `0` | `0.0%` | `15` |
| `Nagpur` | `float64` | `0` | `0.0%` | `15` |
| `Nanded` | `float64` | `0` | `0.0%` | `15` |
| `Nandhurbar` | `float64` | `0` | `0.0%` | `15` |
| `Nashik` | `float64` | `0` | `0.0%` | `15` |
| `Osmanabad` | `float64` | `0` | `0.0%` | `15` |
| `Parbhani` | `float64` | `0` | `0.0%` | `15` |
| *...and 11 more columns* | | | | |

---

### `gdp_Maharashtra2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `36` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: ` Latur`
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Ahmednagar`, ` Akola`, ` Amravati`, ` Aurangabad`, ` Beed`, ` Bhandara`, ` Buldhana`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Ahmednagar` | `float64` | `0` | `0.0%` | `15` |
| ` Akola` | `float64` | `0` | `0.0%` | `15` |
| ` Amravati` | `float64` | `0` | `0.0%` | `15` |
| ` Aurangabad` | `float64` | `0` | `0.0%` | `15` |
| ` Beed` | `float64` | `0` | `0.0%` | `15` |
| ` Bhandara` | `float64` | `0` | `0.0%` | `15` |
| ` Buldhana` | `float64` | `0` | `0.0%` | `15` |
| ` Chandrapur` | `float64` | `0` | `0.0%` | `15` |
| ` Dhule` | `float64` | `0` | `0.0%` | `15` |
| ` Gadchiroli` | `float64` | `0` | `0.0%` | `15` |
| ` Gondia` | `float64` | `0` | `0.0%` | `15` |
| ` Hingoli` | `float64` | `0` | `0.0%` | `15` |
| ` Jalgaon` | `float64` | `0` | `0.0%` | `15` |
| ` Jalna` | `float64` | `0` | `0.0%` | `15` |
| ` Kolhapur` | `float64` | `0` | `0.0%` | `15` |
| ` Latur` | `float64` | `0` | `0.0%` | `15` |
| ` Mumbai` | `float64` | `0` | `0.0%` | `15` |
| ` Nagpur` | `float64` | `0` | `0.0%` | `15` |
| ` Nanded` | `float64` | `0` | `0.0%` | `15` |
| `Nandhurbar` | `float64` | `0` | `0.0%` | `15` |
| ` Nashik` | `float64` | `0` | `0.0%` | `15` |
| ` Osmanabad` | `float64` | `0` | `0.0%` | `15` |
| ` Parbhani` | `float64` | `0` | `0.0%` | `15` |
| *...and 11 more columns* | | | | |

---

### `gdp_Manipur.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `11` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: `Tamenglong`
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Bishnupur`, `Chandel`, `Churachandpur`, `Imphal East`, `Imphal West`, `Senapati`, `Tamenglong`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Bishnupur` | `float64` | `0` | `0.0%` | `15` |
| `Chandel` | `float64` | `0` | `0.0%` | `15` |
| `Churachandpur` | `float64` | `0` | `0.0%` | `15` |
| `Imphal East` | `float64` | `0` | `0.0%` | `15` |
| `Imphal West` | `float64` | `0` | `0.0%` | `15` |
| `Senapati` | `float64` | `0` | `0.0%` | `15` |
| `Tamenglong` | `float64` | `0` | `0.0%` | `15` |
| `Thoubal` | `float64` | `0` | `0.0%` | `15` |
| `Ukhrul` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_Meghalaya.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `9` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Garo Hills: East`, `Garo Hills: South`, `Garo Hills: West`, `Jaintia Hills`, `Khasi Hills: East`, `Khasi Hills: West`, `Ri Bhoi`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Garo Hills: East` | `float64` | `0` | `0.0%` | `15` |
| `Garo Hills: South` | `float64` | `0` | `0.0%` | `15` |
| `Garo Hills: West` | `float64` | `0` | `0.0%` | `15` |
| `Jaintia Hills` | `float64` | `0` | `0.0%` | `15` |
| `Khasi Hills: East` | `float64` | `0` | `0.0%` | `15` |
| `Khasi Hills: West` | `float64` | `0` | `0.0%` | `15` |
| `Ri Bhoi` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_Mizoram.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `10` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Aizawl`, `Champhai`, `Kolasib`, `Lawngtlai`, `Lunglei`, `Mamit`, `Saiha`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Aizawl` | `float64` | `0` | `0.0%` | `13` |
| `Champhai` | `float64` | `0` | `0.0%` | `13` |
| `Kolasib` | `float64` | `0` | `0.0%` | `13` |
| `Lawngtlai` | `float64` | `0` | `0.0%` | `13` |
| `Lunglei` | `float64` | `0` | `0.0%` | `13` |
| `Mamit` | `float64` | `0` | `0.0%` | `13` |
| `Saiha` | `float64` | `0` | `0.0%` | `13` |
| `Serchhip` | `float64` | `0` | `0.0%` | `13` |

---

### `gdp_Odisha1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `32` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Angul`, `Balangir`, ` Balasore`, `Bargarh`, `Baudh`, `Bhadrak`, `Cuttack`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Angul` | `float64` | `0` | `0.0%` | `15` |
| `Balangir` | `float64` | `0` | `0.0%` | `15` |
| ` Balasore` | `float64` | `0` | `0.0%` | `15` |
| `Bargarh` | `float64` | `0` | `0.0%` | `15` |
| `Baudh` | `float64` | `0` | `0.0%` | `15` |
| `Bhadrak` | `float64` | `0` | `0.0%` | `15` |
| `Cuttack` | `float64` | `0` | `0.0%` | `15` |
| ` Deogarh` | `float64` | `0` | `0.0%` | `15` |
| `Dhenkanal` | `float64` | `0` | `0.0%` | `15` |
| `Gajapati` | `float64` | `0` | `0.0%` | `15` |
| `Ganjam` | `float64` | `0` | `0.0%` | `15` |
| ` Jagatsinghpur` | `float64` | `0` | `0.0%` | `15` |
| ` Jajpur` | `float64` | `0` | `0.0%` | `15` |
| `Jharsuguda` | `float64` | `0` | `0.0%` | `15` |
| `Kalahandi` | `float64` | `0` | `0.0%` | `15` |
| `Kandhamal` | `float64` | `0` | `0.0%` | `15` |
| `Kendrapara` | `float64` | `0` | `0.0%` | `15` |
| `Kendujhar` | `float64` | `0` | `0.0%` | `15` |
| `Khordha` | `float64` | `0` | `0.0%` | `15` |
| `Koraput` | `float64` | `0` | `0.0%` | `15` |
| `Malkangiri` | `float64` | `0` | `0.0%` | `15` |
| `Mayurbhanj` | `float64` | `0` | `0.0%` | `15` |
| ` Nabarangpur` | `float64` | `0` | `0.0%` | `15` |
| *...and 7 more columns* | | | | |

---

### `gdp_Odisha2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `32` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Angul`, ` Balangir`, ` Balasore`, ` Bargarh`, ` Bhadrak`, `Baudh`, ` Cuttack`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Angul` | `float64` | `0` | `0.0%` | `13` |
| ` Balangir` | `float64` | `0` | `0.0%` | `13` |
| ` Balasore` | `float64` | `0` | `0.0%` | `13` |
| ` Bargarh` | `float64` | `0` | `0.0%` | `13` |
| ` Bhadrak` | `float64` | `0` | `0.0%` | `13` |
| `Baudh` | `float64` | `0` | `0.0%` | `13` |
| ` Cuttack` | `float64` | `0` | `0.0%` | `13` |
| ` Deogarh` | `float64` | `0` | `0.0%` | `13` |
| ` Dhenkanal` | `float64` | `0` | `0.0%` | `13` |
| ` Gajapati` | `float64` | `0` | `0.0%` | `13` |
| ` Ganjam` | `float64` | `0` | `0.0%` | `13` |
| ` Jagatsinghpur` | `float64` | `0` | `0.0%` | `13` |
| ` Jajpur` | `float64` | `0` | `0.0%` | `13` |
| ` Jharsuguda` | `float64` | `0` | `0.0%` | `13` |
| ` Kalahandi` | `float64` | `0` | `0.0%` | `13` |
| ` Kandhamal` | `float64` | `0` | `0.0%` | `13` |
| ` Kendrapara` | `float64` | `0` | `0.0%` | `13` |
| ` Kendujhar` | `float64` | `0` | `0.0%` | `13` |
| ` Khordha` | `float64` | `0` | `0.0%` | `13` |
| ` Koraput` | `float64` | `0` | `0.0%` | `13` |
| ` Malkangiri` | `float64` | `0` | `0.0%` | `13` |
| ` Mayurbhanj` | `float64` | `0` | `0.0%` | `13` |
| ` Nabarangpur` | `float64` | `0` | `0.0%` | `13` |
| *...and 7 more columns* | | | | |

---

### `gdp_Punjab1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `19` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Amritsar`, `Bathinda`, `Faridkot`, `Fatehgarh Sahib`, `Firozpur`, `Gurdaspur`, `Hoshiarpur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Amritsar` | `float64` | `0` | `0.0%` | `13` |
| `Bathinda` | `float64` | `0` | `0.0%` | `13` |
| `Faridkot` | `float64` | `0` | `0.0%` | `13` |
| `Fatehgarh Sahib` | `float64` | `0` | `0.0%` | `13` |
| `Firozpur` | `float64` | `0` | `0.0%` | `13` |
| `Gurdaspur` | `float64` | `0` | `0.0%` | `13` |
| `Hoshiarpur` | `float64` | `0` | `0.0%` | `13` |
| `Jalandhar` | `float64` | `0` | `0.0%` | `13` |
| `Kapurthala` | `float64` | `0` | `0.0%` | `13` |
| `Ludhiana` | `float64` | `0` | `0.0%` | `13` |
| `Mansa` | `float64` | `0` | `0.0%` | `13` |
| `Moga` | `float64` | `0` | `0.0%` | `13` |
| `Mukatsar` | `float64` | `0` | `0.0%` | `13` |
| `Patiala` | `float64` | `0` | `0.0%` | `13` |
| `Roopnagar` | `float64` | `0` | `0.0%` | `13` |
| `Sangrur` | `float64` | `0` | `0.0%` | `13` |
| ` Shahid Bhagat Singh Nagar` | `float64` | `0` | `0.0%` | `13` |

---

### `gdp_Punjab2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `22` columns
- **Missing Value Count**: `10` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Amritsar` | `str` | `0` | `0.0%` | `13` |
| ` Barnala` | `str` | `6` | `46.15%` | `7` |
| ` Bathinda` | `str` | `0` | `0.0%` | `13` |
| ` Faridkot` | `str` | `0` | `0.0%` | `13` |
| ` Fatehgarh Sahib` | `str` | `0` | `0.0%` | `13` |
| `Firozpur` | `str` | `0` | `0.0%` | `13` |
| ` Gurdaspur` | `str` | `0` | `0.0%` | `13` |
| ` Hoshiarpur` | `str` | `0` | `0.0%` | `13` |
| ` Jalandhar` | `str` | `0` | `0.0%` | `13` |
| ` Kapurthala` | `str` | `0` | `0.0%` | `12` |
| ` Ludhiana` | `str` | `0` | `0.0%` | `13` |
| ` Mansa` | `str` | `0` | `0.0%` | `13` |
| ` Moga` | `str` | `0` | `0.0%` | `13` |
| `Mukatsar` | `str` | `0` | `0.0%` | `13` |
| ` Patiala` | `str` | `0` | `0.0%` | `13` |
| ` Roopnagar` | `str` | `0` | `0.0%` | `13` |
| ` Sahibzada Ajit Singh Nagar` | `str` | `2` | `15.38%` | `10` |
| ` Sangrur` | `str` | `0` | `0.0%` | `13` |
| ` Shahid Bhagat Singh Nagar` | `str` | `0` | `0.0%` | `13` |
| ` Taran Tarn` | `str` | `2` | `15.38%` | `10` |

---

### `gdp_Rajasthan1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `34` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Ajmer`, `Alwar`, `Banswara`, `Baran`, `Barmer`, `Bharatpur`, `Bhilwara`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Ajmer` | `float64` | `0` | `0.0%` | `13` |
| `Alwar` | `float64` | `0` | `0.0%` | `13` |
| `Banswara` | `float64` | `0` | `0.0%` | `13` |
| `Baran` | `float64` | `0` | `0.0%` | `13` |
| `Barmer` | `float64` | `0` | `0.0%` | `13` |
| `Bharatpur` | `float64` | `0` | `0.0%` | `13` |
| `Bhilwara` | `float64` | `0` | `0.0%` | `13` |
| `Bikaner` | `float64` | `0` | `0.0%` | `13` |
| `Bundi` | `float64` | `0` | `0.0%` | `13` |
| `Chittorgarh` | `float64` | `0` | `0.0%` | `13` |
| `Churu` | `float64` | `0` | `0.0%` | `13` |
| `Dausa` | `float64` | `0` | `0.0%` | `13` |
| `Dholpur` | `float64` | `0` | `0.0%` | `13` |
| `Dungarpur` | `float64` | `0` | `0.0%` | `13` |
| `Ganga Nagar` | `float64` | `0` | `0.0%` | `13` |
| `Hanumangarh` | `float64` | `0` | `0.0%` | `13` |
| `Jaipur` | `float64` | `0` | `0.0%` | `13` |
| `Jaisalmer` | `float64` | `0` | `0.0%` | `13` |
| `Jalore` | `float64` | `0` | `0.0%` | `13` |
| `Jhalawar` | `float64` | `0` | `0.0%` | `13` |
| `Jhunjhunu` | `float64` | `0` | `0.0%` | `13` |
| `Jodhpur` | `float64` | `0` | `0.0%` | `13` |
| `Karauli` | `float64` | `0` | `0.0%` | `13` |
| *...and 9 more columns* | | | | |

---

### `gdp_Rajasthan2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `11` rows
- **Total Columns**: `35` columns
- **Missing Value Count**: `8` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Ajmer`, ` Alwar`, ` Banswara`, ` Baran`, ` Barmer`, ` Bharatpur`, ` Bhilwara`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `6` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Ajmer` | `float64` | `0` | `0.0%` | `11` |
| ` Alwar` | `float64` | `0` | `0.0%` | `11` |
| ` Banswara` | `float64` | `0` | `0.0%` | `11` |
| ` Baran` | `float64` | `0` | `0.0%` | `11` |
| ` Barmer` | `float64` | `0` | `0.0%` | `11` |
| ` Bharatpur` | `float64` | `0` | `0.0%` | `11` |
| ` Bhilwara` | `float64` | `0` | `0.0%` | `11` |
| ` Bikaner` | `float64` | `0` | `0.0%` | `11` |
| ` Bundi` | `float64` | `0` | `0.0%` | `11` |
| ` Chittorgarh` | `float64` | `0` | `0.0%` | `11` |
| ` Churu` | `float64` | `0` | `0.0%` | `11` |
| ` Dausa` | `float64` | `0` | `0.0%` | `11` |
| ` Dholpur` | `float64` | `0` | `0.0%` | `11` |
| ` Dungarpur` | `float64` | `0` | `0.0%` | `11` |
| ` Ganga Nagar` | `float64` | `0` | `0.0%` | `11` |
| ` Hanumangarh` | `float64` | `0` | `0.0%` | `11` |
| ` Jaipur` | `float64` | `0` | `0.0%` | `11` |
| ` Jaisalmer` | `float64` | `0` | `0.0%` | `11` |
| ` Jalore` | `float64` | `0` | `0.0%` | `11` |
| ` Jhalawar` | `float64` | `0` | `0.0%` | `11` |
| ` Jhunjhunu` | `float64` | `0` | `0.0%` | `11` |
| ` Jodhpur` | `float64` | `0` | `0.0%` | `11` |
| ` Karauli` | `float64` | `0` | `0.0%` | `11` |
| *...and 10 more columns* | | | | |

---

### `gdp_Sikkim.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `6` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `East`, `North`, `South`, `West`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `East` | `float64` | `0` | `0.0%` | `15` |
| `North` | `float64` | `0` | `0.0%` | `15` |
| `South` | `float64` | `0` | `0.0%` | `15` |
| `West` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_Tamilnadu.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `32` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Chennai`, `Coimbatore`, `Cuddalore`, `Dharmapuri`, `Dindigul`, `Erode`, `Kancheepuram`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Chennai` | `float64` | `0` | `0.0%` | `15` |
| `Coimbatore` | `float64` | `0` | `0.0%` | `15` |
| `Cuddalore` | `float64` | `0` | `0.0%` | `15` |
| `Dharmapuri` | `float64` | `0` | `0.0%` | `15` |
| `Dindigul` | `float64` | `0` | `0.0%` | `15` |
| `Erode` | `float64` | `0` | `0.0%` | `15` |
| `Kancheepuram` | `float64` | `0` | `0.0%` | `15` |
| `Kanniyakumari` | `float64` | `0` | `0.0%` | `15` |
| `Karur` | `float64` | `0` | `0.0%` | `15` |
| `Krishnagiri` | `float64` | `0` | `0.0%` | `15` |
| `Madurai` | `float64` | `0` | `0.0%` | `15` |
| `Nagapattinam` | `float64` | `0` | `0.0%` | `15` |
| `Namakkal` | `float64` | `0` | `0.0%` | `15` |
| `Perambalur` | `float64` | `0` | `0.0%` | `15` |
| `Pudukkotai` | `float64` | `0` | `0.0%` | `15` |
| `Ramanathapuram` | `float64` | `0` | `0.0%` | `15` |
| `Salem` | `float64` | `0` | `0.0%` | `15` |
| `Sivagangai` | `float64` | `0` | `0.0%` | `15` |
| `Thanjavur` | `float64` | `0` | `0.0%` | `15` |
| `The Nilgris` | `float64` | `0` | `0.0%` | `15` |
| `Theni` | `float64` | `0` | `0.0%` | `15` |
| `Thiruchirappalli` | `float64` | `0` | `0.0%` | `15` |
| `Thirunelveli` | `float64` | `0` | `0.0%` | `15` |
| *...and 7 more columns* | | | | |

---

### `gdp_UttarPradesh1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `72` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Agra`, `Aligarh`, `Allahabad`, `Ambedkar Nagar`, `Auraiyya`, `Azamgarh`, `Badaun`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Agra` | `float64` | `0` | `0.0%` | `13` |
| `Aligarh` | `float64` | `0` | `0.0%` | `13` |
| `Allahabad` | `float64` | `0` | `0.0%` | `13` |
| `Ambedkar Nagar` | `float64` | `0` | `0.0%` | `13` |
| `Auraiyya` | `float64` | `0` | `0.0%` | `13` |
| `Azamgarh` | `float64` | `0` | `0.0%` | `13` |
| `Badaun` | `float64` | `0` | `0.0%` | `13` |
| `Bagpat` | `float64` | `0` | `0.0%` | `13` |
| `Bahraich` | `float64` | `0` | `0.0%` | `13` |
| `Ballia` | `float64` | `0` | `0.0%` | `13` |
| `Balrampur` | `float64` | `0` | `0.0%` | `13` |
| `Banda` | `float64` | `0` | `0.0%` | `13` |
| `Barabanki` | `float64` | `0` | `0.0%` | `13` |
| `Bareilly` | `float64` | `0` | `0.0%` | `13` |
| `Basti` | `float64` | `0` | `0.0%` | `13` |
| `Bijnor` | `float64` | `0` | `0.0%` | `13` |
| `BulandShahar` | `float64` | `0` | `0.0%` | `13` |
| `Chandauli` | `float64` | `0` | `0.0%` | `13` |
| `Chitrakoot` | `float64` | `0` | `0.0%` | `13` |
| `Deoria` | `float64` | `0` | `0.0%` | `13` |
| `Etah` | `float64` | `0` | `0.0%` | `13` |
| `Etawa` | `float64` | `0` | `0.0%` | `13` |
| `Faizabad` | `float64` | `0` | `0.0%` | `13` |
| *...and 47 more columns* | | | | |

---

### `gdp_UttarPradesh2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `74` columns
- **Missing Value Count**: `16` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, ` Amethi`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| ` Agra` | `str` | `0` | `0.0%` | `15` |
| ` Aligarh` | `str` | `0` | `0.0%` | `15` |
| ` Allahabad` | `str` | `0` | `0.0%` | `15` |
| ` Ambedkar Nagar` | `str` | `0` | `0.0%` | `15` |
| ` Amethi` | `str` | `12` | `80.0%` | `3` |
| ` Amorha` | `str` | `0` | `0.0%` | `15` |
| `Auraiyya` | `str` | `0` | `0.0%` | `15` |
| `Azamgarh` | `str` | `0` | `0.0%` | `15` |
| `Badaun` | `str` | `0` | `0.0%` | `15` |
| `Bagpat` | `str` | `0` | `0.0%` | `15` |
| `Bahraich` | `str` | `0` | `0.0%` | `15` |
| `Ballia` | `str` | `0` | `0.0%` | `15` |
| `Balrampur` | `str` | `0` | `0.0%` | `15` |
| `Banda` | `str` | `0` | `0.0%` | `15` |
| `Barabanki` | `str` | `0` | `0.0%` | `15` |
| `Bareilly` | `str` | `0` | `0.0%` | `15` |
| `Basti` | `str` | `0` | `0.0%` | `15` |
| `Bijnor` | `str` | `0` | `0.0%` | `15` |
| `BulandShahar` | `str` | `0` | `0.0%` | `15` |
| `Chandauli` | `str` | `0` | `0.0%` | `15` |
| `Chitrakoot` | `str` | `0` | `0.0%` | `15` |
| `Deoria` | `str` | `0` | `0.0%` | `15` |
| `Etah` | `str` | `0` | `0.0%` | `15` |
| *...and 49 more columns* | | | | |

---

### `gdp_Uttarakhand.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `15` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `Almora`, `Bageshwar`, `Chamoli`, `Champawat`, `Dehradin`, `Garhwal`, `Hardwar`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `Almora` | `float64` | `0` | `0.0%` | `15` |
| `Bageshwar` | `float64` | `0` | `0.0%` | `15` |
| `Chamoli` | `float64` | `0` | `0.0%` | `15` |
| `Champawat` | `float64` | `0` | `0.0%` | `15` |
| `Dehradin` | `float64` | `0` | `0.0%` | `15` |
| `Garhwal` | `float64` | `0` | `0.0%` | `15` |
| `Hardwar` | `float64` | `0` | `0.0%` | `15` |
| `Nainital` | `float64` | `0` | `0.0%` | `15` |
| `Pithoragarh` | `float64` | `0` | `0.0%` | `15` |
| `Rudraprayag` | `float64` | `0` | `0.0%` | `15` |
| `Tehri Garhwal` | `float64` | `0` | `0.0%` | `15` |
| `Udham Singh Nagar` | `float64` | `0` | `0.0%` | `15` |
| `Uttarkashi` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_WestBengal1.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `15` rows
- **Total Columns**: `21` columns
- **Missing Value Count**: `12` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `24-Parganas (North)`, `24-Parganas (South)`, `Bankura`, `Birbhum`, `Burdwan`, `Cooch Behar`, `Dakshin Dinajpur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `8` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `24-Parganas (North)` | `float64` | `0` | `0.0%` | `15` |
| `24-Parganas (South)` | `float64` | `0` | `0.0%` | `15` |
| `Bankura` | `float64` | `0` | `0.0%` | `15` |
| `Birbhum` | `float64` | `0` | `0.0%` | `15` |
| `Burdwan` | `float64` | `0` | `0.0%` | `15` |
| `Cooch Behar` | `float64` | `0` | `0.0%` | `15` |
| `Dakshin Dinajpur` | `float64` | `0` | `0.0%` | `15` |
| `Darjeeling` | `float64` | `0` | `0.0%` | `15` |
| `Hooghly` | `float64` | `0` | `0.0%` | `15` |
| `Howrah` | `float64` | `0` | `0.0%` | `15` |
| `Jalpaiguri` | `float64` | `0` | `0.0%` | `15` |
| `Kolkata` | `float64` | `0` | `0.0%` | `15` |
| `Malda` | `float64` | `0` | `0.0%` | `15` |
| `Midnapore East` | `float64` | `6` | `40.0%` | `9` |
| `Midnapore West` | `float64` | `6` | `40.0%` | `9` |
| `Murshidabad` | `float64` | `0` | `0.0%` | `15` |
| `Nadia` | `float64` | `0` | `0.0%` | `15` |
| `Purulia` | `float64` | `0` | `0.0%` | `15` |
| `Uttar Dinajpur` | `float64` | `0` | `0.0%` | `15` |

---

### `gdp_WestBengal2.csv`
- **Dataset Purpose**: Regional Macroeconomic Growth & State Public Health Benchmark Data
- **Total Record Count**: `13` rows
- **Total Columns**: `21` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Year`
- **Key Features for AI Models**: `Description`, `24-Parganas (North)`, `24-Parganas (South)`, `Bankura`, `Birbhum`, `Burdwan`, `Cooch Behar`, `Dakshin Dinajpur`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Year` | `str` | `0` | `0.0%` | `7` |
| `Description` | `str` | `0` | `0.0%` | `2` |
| `24-Parganas (North)` | `float64` | `0` | `0.0%` | `13` |
| `24-Parganas (South)` | `float64` | `0` | `0.0%` | `13` |
| `Bankura` | `float64` | `0` | `0.0%` | `13` |
| `Birbhum` | `float64` | `0` | `0.0%` | `13` |
| `Burdwan` | `float64` | `0` | `0.0%` | `13` |
| `Cooch Behar` | `float64` | `0` | `0.0%` | `13` |
| `Dakshin Dinajpur` | `float64` | `0` | `0.0%` | `13` |
| `Darjeeling` | `float64` | `0` | `0.0%` | `13` |
| `Hooghly` | `float64` | `0` | `0.0%` | `13` |
| `Howrah` | `float64` | `0` | `0.0%` | `13` |
| `Jalpaiguri` | `float64` | `0` | `0.0%` | `13` |
| `Kolkata` | `float64` | `0` | `0.0%` | `13` |
| `Malda` | `float64` | `0` | `0.0%` | `13` |
| `Midnapore East` | `float64` | `0` | `0.0%` | `13` |
| `Midnapore West` | `float64` | `0` | `0.0%` | `13` |
| `Murshidabad` | `float64` | `0` | `0.0%` | `13` |
| `Nadia` | `float64` | `0` | `0.0%` | `13` |
| `Purulia` | `float64` | `0` | `0.0%` | `13` |
| `Uttar Dinajpur` | `float64` | `0` | `0.0%` | `13` |

---

### `india-districts-census-2011.csv`
- **Dataset Purpose**: Demographic Population Density & Household Infrastructure Census
- **Total Record Count**: `640` rows
- **Total Columns**: `118` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: `Population`, `Having_latrine_facility_within_the_premises_Total_Households`, `Type_of_latrine_facility_Pit_latrine_Households`, `Type_of_latrine_facility_Other_latrine_Households`, `Type_of_latrine_facility_Night_soil_disposed_into_open_drain_Households`, `Type_of_latrine_facility_Flush_pour_flush_latrine_connected_to_other_system_Households`, `Not_having_latrine_facility_within_the_premises_Alternative_source_Open_Households`
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Condition_of_occupied_census_houses_Dilapidated_Households`
- **Key Features for AI Models**: `District code`, `State Name`, `Population`, `Male`, `Female`, `Literate`, `Male_Literate`, `Female_Literate`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `District code` | `int64` | `0` | `0.0%` | `640` |
| `State Name` | `str` | `0` | `0.0%` | `35` |
| `District name` | `str` | `0` | `0.0%` | `634` |
| `Population` | `int64` | `0` | `0.0%` | `640` |
| `Male` | `int64` | `0` | `0.0%` | `640` |
| `Female` | `int64` | `0` | `0.0%` | `640` |
| `Literate` | `int64` | `0` | `0.0%` | `640` |
| `Male_Literate` | `int64` | `0` | `0.0%` | `640` |
| `Female_Literate` | `int64` | `0` | `0.0%` | `640` |
| `SC` | `int64` | `0` | `0.0%` | `610` |
| `Male_SC` | `int64` | `0` | `0.0%` | `608` |
| `Female_SC` | `int64` | `0` | `0.0%` | `604` |
| `ST` | `int64` | `0` | `0.0%` | `584` |
| `Male_ST` | `int64` | `0` | `0.0%` | `583` |
| `Female_ST` | `int64` | `0` | `0.0%` | `582` |
| `Workers` | `int64` | `0` | `0.0%` | `640` |
| `Male_Workers` | `int64` | `0` | `0.0%` | `640` |
| `Female_Workers` | `int64` | `0` | `0.0%` | `640` |
| `Main_Workers` | `int64` | `0` | `0.0%` | `640` |
| `Marginal_Workers` | `int64` | `0` | `0.0%` | `640` |
| `Non_Workers` | `int64` | `0` | `0.0%` | `640` |
| `Cultivator_Workers` | `int64` | `0` | `0.0%` | `639` |
| `Agricultural_Workers` | `int64` | `0` | `0.0%` | `640` |
| `Household_Workers` | `int64` | `0` | `0.0%` | `632` |
| `Other_Workers` | `int64` | `0` | `0.0%` | `640` |
| *...and 93 more columns* | | | | |

---

### `india_census_housing-hlpca-full.csv`
- **Dataset Purpose**: Demographic Population Density & Household Infrastructure Census
- **Total Record Count**: `1,908` rows
- **Total Columns**: `156` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: `Latrine_premise`, `Latrine_PSS`, `Latrine_ST`, `Latrine_OS`, `Pit_latrine_SVI`, `Pit_latrine_SOP`, `Service_Latrine_NRH`, `Service_Latrine_NSA`, `H_latrine_premoses`
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Total Number of Dilapidated`, `Total Number of Residence Dilapidated`, `Residence_cum_Dilapidated`, `Contition_T_Dilapidated`, `Residence_Dilapidated`
- **Key Features for AI Models**: `State Code`, `State Name`, `District code`, `District Name`, `Tehsil Name`, `Area Name`, `Rural/Urban`, `Total Number of Good`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `State Code` | `int64` | `0` | `0.0%` | `35` |
| `State Name` | `str` | `0` | `0.0%` | `35` |
| `District code` | `int64` | `0` | `0.0%` | `640` |
| `District Name` | `str` | `0` | `0.0%` | `634` |
| `Tehsil Code` | `int64` | `0` | `0.0%` | `1` |
| `Tehsil Name` | `str` | `0` | `0.0%` | `634` |
| `Town Code/Village code` | `int64` | `0` | `0.0%` | `1` |
| `Ward No` | `int64` | `0` | `0.0%` | `1` |
| `Area Name` | `str` | `0` | `0.0%` | `634` |
| `Rural/Urban` | `str` | `0` | `0.0%` | `3` |
| `Total Number of households` | `int64` | `0` | `0.0%` | `1` |
| `Total Number of Good` | `float64` | `0` | `0.0%` | `573` |
| `Total Number of Livable` | `float64` | `0` | `0.0%` | `519` |
| `Total Number of Dilapidated` | `float64` | `0` | `0.0%` | `154` |
| `Total Number of Residence households` | `float64` | `0` | `0.0%` | `164` |
| `Total Number of Residence Good` | `float64` | `0` | `0.0%` | `585` |
| `Total Number of Residence Livable` | `float64` | `0` | `0.0%` | `512` |
| `Total Number of Residence Dilapidated` | `float64` | `0` | `0.0%` | `154` |
| `Total Number of Residence cum other` | `float64` | `0` | `0.0%` | `164` |
| `Number of Residence cum Good` | `float64` | `0` | `0.0%` | `88` |
| `Residence_cum_Livable` | `float64` | `0` | `0.0%` | `111` |
| `Residence_cum_Dilapidated` | `float64` | `0` | `0.0%` | `20` |
| `Material_Roof_GTBW` | `float64` | `0` | `0.0%` | `482` |
| `Material_Roof_PP` | `float64` | `0` | `0.0%` | `55` |
| `Material_Roof_HMT` | `float64` | `0` | `0.0%` | `491` |
| *...and 131 more columns* | | | | |

---

### `population_cities.csv`
- **Dataset Purpose**: Demographic Population Density & Household Infrastructure Census
- **Total Record Count**: `81` rows
- **Total Columns**: `4` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: `Population`
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: None
- **Key Features for AI Models**: `Country`, `Continent`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `City` | `str` | `0` | `0.0%` | `81` |
| `Country` | `str` | `0` | `0.0%` | `37` |
| `Population` | `str` | `0` | `0.0%` | `79` |
| `Continent` | `str` | `0` | `0.0%` | `6` |

---

### `public_transport.parquet`
- **Dataset Purpose**: Public Transit, Bus Routes & Urban Mobility Congestion Flow
- **Total Record Count**: `1,048,576` rows
- **Total Columns**: `19` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `4583` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: None
- **Key Features for AI Models**: `operating_day`, `line_id`, `stop_id`, `block_departure`, `block_arrival`, `trip_departure`, `trip_arrival`, `trip_stop_sum`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `operating_day` | `str` | `0` | `0.0%` | `50` |
| `line_id` | `int32` | `0` | `0.0%` | `79` |
| `stop_id` | `int32` | `0` | `0.0%` | `746` |
| `block_departure` | `int32` | `0` | `0.0%` | `816` |
| `block_arrival` | `int32` | `0` | `0.0%` | `864` |
| `trip_departure` | `int32` | `0` | `0.0%` | `1394` |
| `trip_arrival` | `int32` | `0` | `0.0%` | `1436` |
| `trip_stop_sum` | `int32` | `0` | `0.0%` | `111` |
| `pattern_index` | `int32` | `0` | `0.0%` | `73` |
| `pattern_departure_index` | `int32` | `0` | `0.0%` | `44` |
| `pattern_end_index` | `int32` | `0` | `0.0%` | `67` |
| `arrival` | `int32` | `0` | `0.0%` | `2610` |
| `departure` | `int32` | `0` | `0.0%` | `2455` |
| `stop_id_departure` | `int32` | `0` | `0.0%` | `222` |
| `stop_id_end` | `int32` | `0` | `0.0%` | `238` |
| `stop_position` | `float64` | `0` | `0.0%` | `22` |
| `trip_direction` | `int32` | `0` | `0.0%` | `2` |
| `vehicle_seats` | `float64` | `0` | `0.0%` | `16` |
| `passengers` | `int32` | `0` | `0.0%` | `198` |

---

### `water_network_leak_dataset.xlsx`
- **Dataset Purpose**: Urban Water Network Hydraulics & Acoustic Leak Detection Sensors
- **Total Record Count**: `2,000` rows
- **Total Columns**: `9` columns
- **Missing Value Count**: `0` cells
- **Duplicate Rows**: `0` rows
- **Latitude Column(s)**: None
- **Longitude Column(s)**: None
- **Timestamp / Date Column(s)**: `Pipe_Age_Years`
- **Key Features for AI Models**: `Pressure_PSI`, `Flow_GPM`, `Velocity_FPS`, `Temperature_F`, `Pipe_Age_Years`, `Pipe_Material`, `Soil_Corrosivity`, `Leak_Class`

#### Column Schema & Data Types

| Column Name | Data Type | Null Count | Null % | Unique Values |
| :--- | :--- | :--- | :--- | :--- |
| `Pipe_ID` | `str` | `0` | `0.0%` | `2000` |
| `Pressure_PSI` | `float64` | `0` | `0.0%` | `459` |
| `Flow_GPM` | `float64` | `0` | `0.0%` | `921` |
| `Velocity_FPS` | `float64` | `0` | `0.0%` | `57` |
| `Temperature_F` | `int64` | `0` | `0.0%` | `35` |
| `Pipe_Age_Years` | `int64` | `0` | `0.0%` | `29` |
| `Pipe_Material` | `str` | `0` | `0.0%` | `4` |
| `Soil_Corrosivity` | `str` | `0` | `0.0%` | `3` |
| `Leak_Class` | `int64` | `0` | `0.0%` | `2` |

---
