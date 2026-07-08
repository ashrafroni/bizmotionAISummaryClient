/**
 * PharmaIQ — Full Management BI Dashboard with Detail Drill-downs
 * Click any row in any section to open a full detail analysis page.
 * Schema tables: users, field_force_monthly_summary, field_force_daily_summary,
 *   field_force_brand_monthly_summary, field_force_monthly_product_summary,
 *   doctor, doctor_monthly_summary, doctor_brand_monthly_summary,
 *   doctor_chemist_mapping, chemist, customer_profile, customer_monthly_summary,
 *   customer_product_monthly_summary, product_brands, brand_monthly_summary,
 *   products, product_sku_monthly_summary
 */
import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, RadarChart, Radar,
  PolarGrid, PolarAngleAxis,
} from "recharts";
import {
  LayoutDashboard, Users, Stethoscope, Store, Package, Tag,
  Bell, Search, Settings, ChevronRight, ChevronDown, ChevronLeft,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  AlertTriangle, AlertCircle, CheckCircle2, Clock, MapPin, Star, Activity,
  Shield, Target, Brain, Zap, BarChart2, FileText, Calendar,
  Navigation, Filter, Download, ArrowLeft, User, Phone,
  Building2, Pill, RefreshCw, Info, Link2,
} from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#f0f4ff", surface: "#ffffff", card: "#ffffff", card2: "#f5f8ff",
  sidebar: "#0f2350", sidebarActive: "#1a3a7a", sidebarText: "#a8c0e8",
  border: "rgba(15,30,80,0.09)", border2: "rgba(15,30,80,0.05)",
  blue: "#1a56db", teal: "#059669", amber: "#b45309", red: "#dc2626",
  purple: "#7c3aed", orange: "#ea580c", indigo: "#4f46e5",
  text: "#111827", sub: "#4b5e80", dim: "#c5d0e8", pill: "#e8eeff",
};
const mono = { fontFamily: "'DM Mono', monospace" } as const;
const slab = { fontFamily: "'Roboto Slab', serif" } as const;

// ─── All mock data ────────────────────────────────────────────────────────────

const orgKPIs = { total_sales_value: 18420000, monthly_sales_target: 20000000, target_achievement_percentage: 92.1, total_active_reps: 47, total_doctors_in_db: 284, total_chemists_in_db: 612, total_prescription_count: 14820, total_collections: 16800000, collection_achievement_percentage: 88.4, total_brands: 12, total_skus: 38, total_markets: 9 };

const salesTrend = [
  { month: "Feb", sales: 14200000, target: 16000000, rx: 10200 },
  { month: "Mar", sales: 15800000, target: 17000000, rx: 11400 },
  { month: "Apr", sales: 16400000, target: 18000000, rx: 12100 },
  { month: "May", sales: 15100000, target: 18000000, rx: 11000 },
  { month: "Jun", sales: 17200000, target: 19000000, rx: 13200 },
  { month: "Jul", sales: 16900000, target: 19000000, rx: 12800 },
  { month: "Aug", sales: 18420000, target: 20000000, rx: 14820 },
];

const fieldForceList = [
  { user_id: 101, name: "Abdul Motaleb", code: "F10245", designation: "MPO", territory: "Dhaka · Konatari", performance_rank: 3, performance_tier: "STAR", performance_score: 82.4, total_sales_value: 312450, target_achievement_percentage: 97.6, total_doctors_visited: 89, unique_doctors_visited: 34, total_prescription_count: 312, attendance_percentage: 84.6, total_collections: 285000, days_absent: 2, days_present: 22, total_working_days: 26, days_leave: 2, late_check_in_count: 3, avg_check_in_distance: 0.42, total_chemists_visited: 142, unique_chemists_visited: 61, total_dcr_calls: 231, avg_visits_per_day: 10.5, products_promoted_count: 11, unique_brands_promoted: 4, total_distance_covered: 684, avg_distance_per_day: 31.1, cash_collection_amount: 142500, collection_achievement_percentage: 91.3, total_sample_count: 84, total_gift_count: 31, total_promo_count: 45, sales_growth_percentage: 8.2, yoy_sales_growth_percentage: 14.7, previous_month_sales: 288600, rank_in_territory: 1, total_orders_count: 69, cancelled_orders_count: 4, total_return_value: 15550 },
  { user_id: 102, name: "Rashida Khanam", code: "F10312", designation: "MPO", territory: "Chittagong · Nasirabad", performance_rank: 1, performance_tier: "STAR", performance_score: 94.1, total_sales_value: 398200, target_achievement_percentage: 112.4, total_doctors_visited: 104, unique_doctors_visited: 41, total_prescription_count: 428, attendance_percentage: 96.2, total_collections: 361000, days_absent: 0, days_present: 26, total_working_days: 26, days_leave: 0, late_check_in_count: 0, avg_check_in_distance: 0.18, total_chemists_visited: 168, unique_chemists_visited: 72, total_dcr_calls: 272, avg_visits_per_day: 13.0, products_promoted_count: 13, unique_brands_promoted: 5, total_distance_covered: 812, avg_distance_per_day: 36.0, cash_collection_amount: 186000, collection_achievement_percentage: 103.2, total_sample_count: 102, total_gift_count: 38, total_promo_count: 56, sales_growth_percentage: 14.1, yoy_sales_growth_percentage: 22.3, previous_month_sales: 348900, rank_in_territory: 1, total_orders_count: 88, cancelled_orders_count: 1, total_return_value: 8200 },
  { user_id: 103, name: "Karim Uddin", code: "F10198", designation: "SR", territory: "Sylhet · Zindabazar", performance_rank: 7, performance_tier: "GOOD", performance_score: 71.3, total_sales_value: 248600, target_achievement_percentage: 82.9, total_doctors_visited: 72, unique_doctors_visited: 28, total_prescription_count: 241, attendance_percentage: 88.5, total_collections: 218000, days_absent: 1, days_present: 23, total_working_days: 26, days_leave: 2, late_check_in_count: 4, avg_check_in_distance: 0.61, total_chemists_visited: 110, unique_chemists_visited: 48, total_dcr_calls: 182, avg_visits_per_day: 8.8, products_promoted_count: 9, unique_brands_promoted: 3, total_distance_covered: 540, avg_distance_per_day: 24.5, cash_collection_amount: 104000, collection_achievement_percentage: 78.4, total_sample_count: 62, total_gift_count: 22, total_promo_count: 34, sales_growth_percentage: -2.1, yoy_sales_growth_percentage: 6.8, previous_month_sales: 253900, rank_in_territory: 2, total_orders_count: 54, cancelled_orders_count: 6, total_return_value: 22400 },
  { user_id: 104, name: "Nadia Islam", code: "F10441", designation: "MPO", territory: "Rajshahi · Shaheb Bazar", performance_rank: 2, performance_tier: "STAR", performance_score: 91.8, total_sales_value: 374100, target_achievement_percentage: 106.9, total_doctors_visited: 98, unique_doctors_visited: 38, total_prescription_count: 391, attendance_percentage: 92.3, total_collections: 342000, days_absent: 1, days_present: 24, total_working_days: 26, days_leave: 1, late_check_in_count: 1, avg_check_in_distance: 0.28, total_chemists_visited: 152, unique_chemists_visited: 64, total_dcr_calls: 250, avg_visits_per_day: 11.6, products_promoted_count: 12, unique_brands_promoted: 4, total_distance_covered: 726, avg_distance_per_day: 32.8, cash_collection_amount: 172000, collection_achievement_percentage: 97.8, total_sample_count: 91, total_gift_count: 34, total_promo_count: 49, sales_growth_percentage: 11.4, yoy_sales_growth_percentage: 18.9, previous_month_sales: 335700, rank_in_territory: 1, total_orders_count: 82, cancelled_orders_count: 2, total_return_value: 11200 },
  { user_id: 105, name: "Jahangir Alam", code: "F10087", designation: "AM", territory: "Khulna · Jessore", performance_rank: 12, performance_tier: "AVERAGE", performance_score: 58.2, total_sales_value: 198400, target_achievement_percentage: 66.1, total_doctors_visited: 54, unique_doctors_visited: 21, total_prescription_count: 178, attendance_percentage: 73.1, total_collections: 168000, days_absent: 6, days_present: 19, total_working_days: 26, days_leave: 1, late_check_in_count: 8, avg_check_in_distance: 1.24, total_chemists_visited: 84, unique_chemists_visited: 36, total_dcr_calls: 138, avg_visits_per_day: 6.7, products_promoted_count: 7, unique_brands_promoted: 2, total_distance_covered: 398, avg_distance_per_day: 21.0, cash_collection_amount: 78000, collection_achievement_percentage: 61.2, total_sample_count: 41, total_gift_count: 14, total_promo_count: 22, sales_growth_percentage: -8.4, yoy_sales_growth_percentage: -3.2, previous_month_sales: 216600, rank_in_territory: 4, total_orders_count: 42, cancelled_orders_count: 9, total_return_value: 38600 },
];

const repDailyData = [
  { day: "05 Aug", sales: 14200, rx: 18, doctors: 5, chemists: 8, collection: 12000, status: "PRESENT" },
  { day: "06 Aug", sales: 11800, rx: 14, doctors: 4, chemists: 7, collection: 8500, status: "PRESENT" },
  { day: "07 Aug", sales: 16400, rx: 21, doctors: 6, chemists: 9, collection: 15000, status: "PRESENT" },
  { day: "08 Aug", sales: 9100, rx: 11, doctors: 3, chemists: 6, collection: 6200, status: "PRESENT" },
  { day: "11 Aug", sales: 18700, rx: 26, doctors: 7, chemists: 10, collection: 18000, status: "PRESENT" },
  { day: "12 Aug", sales: 12300, rx: 15, doctors: 4, chemists: 7, collection: 11500, status: "PRESENT" },
  { day: "13 Aug", sales: 15600, rx: 19, doctors: 5, chemists: 8, collection: 14000, status: "LATE" },
  { day: "14 Aug", sales: 8200, rx: 9, doctors: 3, chemists: 5, collection: 7800, status: "PRESENT" },
];

const repBrandData = [
  { brand_name: "CardioMax", total_sales_value: 88400, monthly_sales_target: 90000, sales_achievement_percentage: 98.2, prescription_count: 124, doctor_visit_count: 41, performance_score: 94.1, requires_attention: false },
  { brand_name: "DiabaCare XR", total_sales_value: 72100, monthly_sales_target: 85000, sales_achievement_percentage: 84.8, prescription_count: 98, doctor_visit_count: 38, performance_score: 76.3, requires_attention: true },
  { brand_name: "NeuroPlex 500", total_sales_value: 61200, monthly_sales_target: 60000, sales_achievement_percentage: 102.0, prescription_count: 56, doctor_visit_count: 29, performance_score: 88.7, requires_attention: false },
  { brand_name: "Pulmovax", total_sales_value: 58200, monthly_sales_target: 65000, sales_achievement_percentage: 89.5, prescription_count: 34, doctor_visit_count: 22, performance_score: 72.4, requires_attention: false },
];

const doctorList = [
  { doctor_id: 201, name: "Dr. Kawser Mia", designation: "MBBS, DMF", division: "Dhaka", district: "Dhaka", thana: "Gulshan", speciality: "General Physician", yearly_business_capacity: 480000, total_visits: 8, approved_visits: 7, pending_visits: 1, morning_visits: 5, evening_visits: 3, on_schedule_visits: 6, off_schedule_visits: 2, accompanied_visits: 2, solo_visits: 6, prescription_count: 18, visit_effectiveness_score: 82.1, doctor_engagement_score: 78.4, unique_brands_promoted_count: 2, status: "ACTIVE", mobile: "+880-1711-234567", religion: "Islam", marital_status: "Married", chambers: [{ name: "Gulshan Clinic", address: "Gulshan-1, Dhaka", time: "Sat–Thu 9am–1pm" }] },
  { doctor_id: 202, name: "Dr. Abdur Rahim", designation: "MBBS, FCPS", division: "Dhaka", district: "Dhaka", thana: "Dhanmondi", speciality: "Cardiologist", yearly_business_capacity: 820000, total_visits: 6, approved_visits: 6, pending_visits: 0, morning_visits: 2, evening_visits: 4, on_schedule_visits: 5, off_schedule_visits: 1, accompanied_visits: 1, solo_visits: 5, prescription_count: 31, visit_effectiveness_score: 91.5, doctor_engagement_score: 88.7, unique_brands_promoted_count: 3, status: "ACTIVE", mobile: "+880-1811-345678", religion: "Islam", marital_status: "Married", chambers: [{ name: "Dhanmondi Cardiac Center", address: "Dhanmondi-27, Dhaka", time: "Daily 5pm–9pm" }] },
  { doctor_id: 203, name: "Dr. Abdul Motin", designation: "MBBS, DMF", division: "Dhaka", district: "Narayanganj", thana: "Sadar", speciality: "General Physician", yearly_business_capacity: 360000, total_visits: 3, approved_visits: 2, pending_visits: 1, morning_visits: 1, evening_visits: 2, on_schedule_visits: 2, off_schedule_visits: 1, accompanied_visits: 0, solo_visits: 3, prescription_count: 7, visit_effectiveness_score: 54.3, doctor_engagement_score: 49.1, unique_brands_promoted_count: 1, status: "AT_RISK", mobile: "+880-1911-456789", religion: "Islam", marital_status: "Single", chambers: [{ name: "Narayanganj Clinic", address: "Chashara, Narayanganj", time: "Daily 6pm–9pm" }] },
  { doctor_id: 204, name: "Dr. Selina Akhter", designation: "MBBS, MD", division: "Dhaka", district: "Gazipur", thana: "Tongi", speciality: "Diabetologist", yearly_business_capacity: 620000, total_visits: 5, approved_visits: 5, pending_visits: 0, morning_visits: 3, evening_visits: 2, on_schedule_visits: 5, off_schedule_visits: 0, accompanied_visits: 3, solo_visits: 2, prescription_count: 24, visit_effectiveness_score: 88.0, doctor_engagement_score: 85.2, unique_brands_promoted_count: 3, status: "ACTIVE", mobile: "+880-1611-567890", religion: "Islam", marital_status: "Married", chambers: [{ name: "Gazipur Diabetes Center", address: "Tongi, Gazipur", time: "Fri–Wed 10am–2pm" }] },
];

const doctorBrandData = [
  { brand_name: "CardioMax", total_visits: 4, prescription_count: 12, brand_engagement_score: 88.0, visit_effectiveness_score: 84.2, total_sample_count: 4, total_gift_count: 1 },
  { brand_name: "DiabaCare XR", total_visits: 3, prescription_count: 8, brand_engagement_score: 72.1, visit_effectiveness_score: 68.4, total_sample_count: 3, total_gift_count: 2 },
  { brand_name: "NeuroPlex 500", total_visits: 2, prescription_count: 5, brand_engagement_score: 61.4, visit_effectiveness_score: 58.0, total_sample_count: 2, total_gift_count: 0 },
];

const nearbyChemists = [
  { chemist_id: 301, chemist_name: "Modina Pharmacy", distance_km: 0.3, is_primary_chemist: true },
  { chemist_id: 302, chemist_name: "MA Pharmacy", distance_km: 0.7, is_primary_chemist: false },
  { chemist_id: 304, chemist_name: "City Medical Hall", distance_km: 1.2, is_primary_chemist: false },
];

const chemistList = [
  { customer_id: 301, customer_name: "Modina Pharmacy", customer_tier: "GOLD", customer_segment: "HIGH_VALUE", chemist_type: "RETAIL", city: "Dhaka", district: "Dhaka", address: "House 12, Road 4, Gulshan-1, Dhaka", mobile: "+880-1711-112233", credit_limit: 80000, customer_health_score: 88.5, churn_risk_level: "LOW", churn_risk_score: 18.2, engagement_score: 87.4, loyalty_score: 91.0, payment_reliability_score: 96.3, outstanding_balance: 8500, overdue_amount: 0, overdue_days: 0, total_sales_value: 42000, mom_growth_percentage: -4.2, yoy_growth_percentage: 11.3, visits_last_30_days: 6, orders_last_30_days: 8, value_last_30_days: 42000, total_visits_received: 84, lifetime_order_value: 520000, avg_order_value: 8400, days_since_last_order: 2, last_order_date: "12 Aug 2025", avg_payment_days: 14, on_time_payment_rate: 96.3, predicted_monthly_value: 44000, next_best_action: "Propose quarterly loyalty rebate at 2% volume", ai_insights_summary: "Top revenue contributor at 42% of portfolio. Strong payment reliability. Growth slowing — propose loyalty incentive.", unique_products_purchased: 8, unique_brands_purchased: 3 },
  { customer_id: 302, customer_name: "MA Pharmacy", customer_tier: "SILVER", customer_segment: "GROWING", chemist_type: "RETAIL", city: "Dhaka", district: "Dhaka", address: "Shop 7, Mirpur Road, Dhaka-1216", mobile: "+880-1811-223344", credit_limit: 50000, customer_health_score: 61.5, churn_risk_level: "MEDIUM", churn_risk_score: 34.7, engagement_score: 64.2, loyalty_score: 59.8, payment_reliability_score: 71.4, outstanding_balance: 22000, overdue_amount: 8000, overdue_days: 18, total_sales_value: 26000, mom_growth_percentage: 2.1, yoy_growth_percentage: 8.8, visits_last_30_days: 4, orders_last_30_days: 5, value_last_30_days: 26000, total_visits_received: 48, lifetime_order_value: 310000, avg_order_value: 6200, days_since_last_order: 5, last_order_date: "09 Aug 2025", avg_payment_days: 28, on_time_payment_rate: 71.4, predicted_monthly_value: 28000, next_best_action: "Collect ৳8K overdue before next order. Offer 30-day credit extension for commitment.", ai_insights_summary: "Moderate churn risk from ৳8K overdue. Visit frequency adequate but engagement declining.", unique_products_purchased: 5, unique_brands_purchased: 2 },
  { customer_id: 303, customer_name: "LifeCare Pharmacy", customer_tier: "BRONZE", customer_segment: "HIGH_POTENTIAL", chemist_type: "RETAIL", city: "Chittagong", district: "Chittagong", address: "GEC Circle, Chittagong", mobile: "+880-1911-334455", credit_limit: 25000, customer_health_score: 39.0, churn_risk_level: "HIGH", churn_risk_score: 52.1, engagement_score: 38.9, loyalty_score: 31.4, payment_reliability_score: 44.0, outstanding_balance: 4200, overdue_amount: 4200, overdue_days: 42, total_sales_value: 8000, mom_growth_percentage: -12.5, yoy_growth_percentage: -3.1, visits_last_30_days: 2, orders_last_30_days: 2, value_last_30_days: 8000, total_visits_received: 22, lifetime_order_value: 98000, avg_order_value: 4900, days_since_last_order: 12, last_order_date: "02 Aug 2025", avg_payment_days: 48, on_time_payment_rate: 44.0, predicted_monthly_value: 7200, next_best_action: "Immediate visit. High-footfall location near Dr. Motin's clinic. Bring NeuroPlex samples.", ai_insights_summary: "HIGH churn risk. 42-day overdue. High potential location but very low engagement.", unique_products_purchased: 3, unique_brands_purchased: 2 },
  { customer_id: 304, customer_name: "City Medical Hall", customer_tier: "SILVER", customer_segment: "STABLE", chemist_type: "WHOLESALE", city: "Sylhet", district: "Sylhet", address: "Zindabazar, Sylhet-3100", mobile: "+880-1611-445566", credit_limit: 120000, customer_health_score: 74.0, churn_risk_level: "LOW", churn_risk_score: 22.4, engagement_score: 75.6, loyalty_score: 78.9, payment_reliability_score: 88.7, outstanding_balance: 11000, overdue_amount: 0, overdue_days: 0, total_sales_value: 35000, mom_growth_percentage: 6.4, yoy_growth_percentage: 19.2, visits_last_30_days: 5, orders_last_30_days: 6, value_last_30_days: 35000, total_visits_received: 61, lifetime_order_value: 418000, avg_order_value: 7200, days_since_last_order: 3, last_order_date: "11 Aug 2025", avg_payment_days: 21, on_time_payment_rate: 88.7, predicted_monthly_value: 37000, next_best_action: "Introduce NeuroPlex 500 — matches purchasing profile. Cross-sell with Myobion.", ai_insights_summary: "Stable wholesale account. Good MoM growth. Expand SKU range — buying only 3 of 6 target brands.", unique_products_purchased: 6, unique_brands_purchased: 3 },
];

const chemistProductData = [
  { product_name: "CardioMax 10mg", total_sales_value: 18400, prescription_count: 42, mom_growth_percentage: 8.2, affinity_score: 88.4, loyalty_score: 91.2, reorder_likelihood: "HIGH" },
  { product_name: "DiabaCare XR", total_sales_value: 12800, prescription_count: 28, mom_growth_percentage: -4.1, affinity_score: 72.1, loyalty_score: 68.4, reorder_likelihood: "MEDIUM" },
  { product_name: "NeuroPlex 500", total_sales_value: 8200, prescription_count: 18, mom_growth_percentage: 14.6, affinity_score: 64.8, loyalty_score: 61.2, reorder_likelihood: "MEDIUM" },
  { product_name: "Pulmovax 100mcg", total_sales_value: 5100, prescription_count: 11, mom_growth_percentage: -2.8, affinity_score: 52.4, loyalty_score: 48.9, reorder_likelihood: "LOW" },
];

const brandList = [
  { brand_id: 1, brand_name: "CardioMax", category_name: "Cardiovascular", rank_in_organization: 1, rank_change_from_prev_month: 0, performance_tier: "STAR", performance_trend: "IMPROVING", brand_health_score: 87.4, brand_loyalty_index: 82.1, market_share_estimate: 18.2, market_share_change: 1.4, total_sales_value: 4820000, monthly_sales_target: 5000000, sales_achievement_percentage: 96.4, total_prescription_count: 1840, unique_prescribing_doctors: 124, new_prescribing_doctors: 8, prescription_growth_rate: 12.4, prescription_to_sales_ratio: 0.38, demand_forecast_next_month: 5200000, demand_confidence_level: 88, seasonality_index: 1.04, momentum_indicator: "POSITIVE", risk_level: "LOW", opportunity_level: "HIGH", competitive_position: "LEADER", total_doctor_visits: 342, unique_doctors_promoted_to: 94, unique_markets_promoted_in: 7, total_sample_count: 284, total_gift_count: 96, unique_field_force_promoting: 38, ai_monthly_summary: "CardioMax is in its strongest position of the year. Prescription growth (+12.4%) is outpacing sales growth (+8.9%), indicating a healthy pipeline. 8 new prescribers added this month. Recommend expanding into 2 additional territories next quarter.", ai_strategic_insights: "Market leader with 18.2% share. Competitive moat is strong — no major challenger has crossed 12%. Demand forecast ৳5.2M with 88% confidence.", ai_competitive_analysis: "Main competitor lost 2.1% market share this month. Our share gain of +1.4% is directly attributable to the KOL program in Dhaka and Chittagong.", ai_demand_commentary: "Seasonality index of 1.04 suggests slight above-average demand this month. Stock up for winter season (Nov–Jan historically 15% higher)." },
  { brand_id: 2, brand_name: "DiabaCare XR", category_name: "Diabetes", rank_in_organization: 3, rank_change_from_prev_month: -1, performance_tier: "AVERAGE", performance_trend: "DECLINING", brand_health_score: 61.2, brand_loyalty_index: 58.4, market_share_estimate: 12.7, market_share_change: -2.1, total_sales_value: 3410000, monthly_sales_target: 4000000, sales_achievement_percentage: 85.3, total_prescription_count: 1120, unique_prescribing_doctors: 89, new_prescribing_doctors: 2, prescription_growth_rate: -3.8, prescription_to_sales_ratio: 0.33, demand_forecast_next_month: 3600000, demand_confidence_level: 74, seasonality_index: 0.98, momentum_indicator: "NEGATIVE", risk_level: "MEDIUM", opportunity_level: "MEDIUM", competitive_position: "CHALLENGER", total_doctor_visits: 284, unique_doctors_promoted_to: 78, unique_markets_promoted_in: 6, total_sample_count: 196, total_gift_count: 64, unique_field_force_promoting: 32, ai_monthly_summary: "DiabaCare XR is losing ground. Competitor gained 2.1% share in same segment. Prescription count dropped 3.8% — early sign of doctor-level churn. Urgent action required.", ai_strategic_insights: "Core risk: 3 high-prescribing doctors (contributing 28% of total Rx) have reduced frequency. If not recovered within 45 days, expect further 12% sales decline.", ai_competitive_analysis: "New generic entrant at 30% lower price is capturing price-sensitive chemists. Brand differentiation messaging needs to be reinforced.", ai_demand_commentary: "Forecast ৳3.6M with 74% confidence (lower than usual due to market uncertainty). Increase sampling in Dhaka and Chittagong to stabilize." },
  { brand_id: 3, brand_name: "NeuroPlex 500", category_name: "Neurology", rank_in_organization: 4, rank_change_from_prev_month: 1, performance_tier: "GOOD", performance_trend: "STABLE", brand_health_score: 74.8, brand_loyalty_index: 71.2, market_share_estimate: 9.4, market_share_change: 0.3, total_sales_value: 2980000, monthly_sales_target: 3000000, sales_achievement_percentage: 99.3, total_prescription_count: 780, unique_prescribing_doctors: 64, new_prescribing_doctors: 5, prescription_growth_rate: 6.2, prescription_to_sales_ratio: 0.26, demand_forecast_next_month: 3100000, demand_confidence_level: 82, seasonality_index: 1.01, momentum_indicator: "NEUTRAL", risk_level: "LOW", opportunity_level: "HIGH", competitive_position: "NICHE", total_doctor_visits: 218, unique_doctors_promoted_to: 56, unique_markets_promoted_in: 5, total_sample_count: 148, total_gift_count: 48, unique_field_force_promoting: 28, ai_monthly_summary: "NeuroPlex 500 nearly at target (99.3%). 5 new prescribers added. Neurologist engagement improving. Strong candidate for promotion investment increase.", ai_strategic_insights: "Niche positioning in neurology is defensible. Top 10 prescribers contribute 68% of volume — protect these relationships.", ai_competitive_analysis: "No significant competitive threat detected. Category is underserved — opportunity to expand to 2 new territories.", ai_demand_commentary: "Forecast ৳3.1M next month — 4% above current. Confidence 82%. Recommend 10% increase in sampling budget." },
];

const brandRepData = [
  { name: "Rashida", sales: 82400, achievement: 114.4, prescription_count: 94 },
  { name: "Nadia", sales: 74200, achievement: 103.1, prescription_count: 84 },
  { name: "Abdul", sales: 68100, achievement: 94.6, prescription_count: 78 },
  { name: "Farzana", sales: 62800, achievement: 87.2, prescription_count: 68 },
  { name: "Sumaiya", sales: 54400, achievement: 75.6, prescription_count: 56 },
];

const brandWeeklyTrend = [
  { week: "W1", sales: 980000, rx: 384 }, { week: "W2", sales: 1140000, rx: 412 },
  { week: "W3", sales: 1280000, rx: 448 }, { week: "W4", sales: 1420000, rx: 596 },
];

const productList = [
  { product_id: 1, name: "CardioMax 10mg", sku_code: "CM-10MG", brand_name: "CardioMax", brand_id: 1, category_name: "Cardiovascular", trade_price: 12.5, max_retail_price: 15.0, pack_size: "30 tabs", strength: "10mg", presentation: "Tablet", total_sales_value: 2840000, prescription_count: 1120, performance_tier: "STAR", performance_score: 91.2, sales_achievement_percentage: 97.4, demand_forecast_next_month: 2950000, demand_confidence_level: 88, requires_attention: false, momentum_indicator: "POSITIVE", prev_month_sales: 2620000, sales_growth_percentage: 8.4, yoy_sales_growth_percentage: 16.2, seasonality_index: 1.04, seasonality_pattern: "ABOVE_AVERAGE", risk_level: "LOW", opportunity_level: "HIGH", prescription_to_sales_ratio: 0.39, avg_customer_order_value: 5200, total_customers: 142, ai_monthly_summary: "Top-performing SKU. Prescription volume growing ahead of sales — strong future pipeline. Recommend increasing stock allocation by 8% for next month.", ai_strategic_insights: "High affinity score in Dhaka and Rajshahi territories. 10mg dose is the preferred entry-point product for new prescribers.", ai_demand_commentary: "Demand forecast ৳2.95M with 88% confidence. Winter seasonality will push this +12% in November." },
  { product_id: 3, name: "DiabaCare XR 500", sku_code: "DC-XR500", brand_name: "DiabaCare XR", brand_id: 2, category_name: "Diabetes", trade_price: 24.0, max_retail_price: 28.5, pack_size: "20 tabs", strength: "500mg XR", presentation: "Tablet", total_sales_value: 3410000, prescription_count: 1120, performance_tier: "AVERAGE", performance_score: 62.1, sales_achievement_percentage: 85.3, demand_forecast_next_month: 3600000, demand_confidence_level: 74, requires_attention: true, momentum_indicator: "NEGATIVE", prev_month_sales: 3750000, sales_growth_percentage: -9.2, yoy_sales_growth_percentage: 2.1, seasonality_index: 0.98, seasonality_pattern: "NORMAL", risk_level: "MEDIUM", opportunity_level: "MEDIUM", prescription_to_sales_ratio: 0.33, avg_customer_order_value: 8400, total_customers: 108, ai_monthly_summary: "SKU underperforming target by 14.7%. MoM decline of 9.2% is alarming. Generic competition pricing at 30% lower. Urgent differentiation strategy needed.", ai_strategic_insights: "Product still has 89 prescribers — loyalty is present. Focus on reinforcing clinical benefits over price. Provide comparison data sheets to reps.", ai_demand_commentary: "Forecast ৳3.6M — optimistic assumption contingent on competitive response. If no action, realistic estimate is ৳3.1M." },
  { product_id: 6, name: "Pulmovax 100mcg", sku_code: "PV-100", brand_name: "Pulmovax", brand_id: 5, category_name: "Respiratory", trade_price: 28.0, max_retail_price: 33.0, pack_size: "200 doses", strength: "100mcg", presentation: "Inhaler", total_sales_value: 4210000, prescription_count: 1620, performance_tier: "STAR", performance_score: 94.8, sales_achievement_percentage: 100.2, demand_forecast_next_month: 4500000, demand_confidence_level: 91, requires_attention: false, momentum_indicator: "POSITIVE", prev_month_sales: 3980000, sales_growth_percentage: 5.8, yoy_sales_growth_percentage: 22.4, seasonality_index: 1.08, seasonality_pattern: "ABOVE_AVERAGE", risk_level: "LOW", opportunity_level: "HIGH", prescription_to_sales_ratio: 0.38, avg_customer_order_value: 9200, total_customers: 164, ai_monthly_summary: "Best-in-class performance. Exceeded target for 3 consecutive months. 11 new prescribers added. Recommend priority sampling allocation.", ai_strategic_insights: "Respiratory category is growing 18% YoY. Pulmovax is well-positioned as market leader with 15.1% share.", ai_demand_commentary: "Strong demand forecast ৳4.5M with 91% confidence. Pre-order stock for winter allergy season in October." },
];

const productCustomerData = [
  { customer_name: "Medinova Drug Store", total_sales_value: 420000, prescription_count: 168, affinity_score: 92.4, loyalty_score: 94.1, mom_growth_percentage: 12.4, reorder_likelihood: "HIGH" },
  { customer_name: "Modina Pharmacy", total_sales_value: 284000, prescription_count: 112, affinity_score: 88.1, loyalty_score: 88.8, mom_growth_percentage: 6.8, reorder_likelihood: "HIGH" },
  { customer_name: "City Medical Hall", total_sales_value: 218000, prescription_count: 84, affinity_score: 74.2, loyalty_score: 71.6, mom_growth_percentage: -2.1, reorder_likelihood: "MEDIUM" },
  { customer_name: "MA Pharmacy", total_sales_value: 148000, prescription_count: 56, affinity_score: 62.8, loyalty_score: 58.4, mom_growth_percentage: 4.2, reorder_likelihood: "MEDIUM" },
];

// ─── Shared components ────────────────────────────────────────────────────────

const Chip = ({ label, color, size = "sm" }: { label: string; color: string; size?: "sm" | "xs" }) => (
  <span style={{ ...mono, fontSize: size === "xs" ? 9 : 10, fontWeight: 700, letterSpacing: "0.07em", color, background: `${color}14`, border: `1px solid ${color}26`, padding: size === "xs" ? "1px 6px" : "2px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>{label}</span>
);
const TierBadge = ({ tier }: { tier: string }) => { const m: any = { STAR: C.teal, GOOD: C.blue, AVERAGE: C.amber, POOR: C.red }; return <Chip label={tier} color={m[tier] ?? C.sub} />; };
const RiskBadge = ({ level }: { level: string }) => { const m: any = { LOW: C.teal, MEDIUM: C.amber, HIGH: C.red, CRITICAL: "#7f1d1d" }; return <Chip label={level} color={m[level] ?? C.sub} />; };
const ScoreBar = ({ value, color = C.blue, max = 100 }: { value: number; color?: string; max?: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
    <div style={{ flex: 1, background: C.dim, borderRadius: 99, height: 5, overflow: "hidden" }}>
      <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color, height: "100%", borderRadius: 99 }} />
    </div>
    <span style={{ ...mono, fontSize: 11, color, fontWeight: 700, minWidth: 34, textAlign: "right" }}>{value.toFixed(0)}</span>
  </div>
);
const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(15,30,80,0.06)", ...style }}>{children}</div>
);
const SectionHead = ({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
    <div><h2 style={{ ...slab, fontSize: 14, fontWeight: 700, color: C.text, marginBottom: sub ? 2 : 0 }}>{title}</h2>{sub && <p style={{ ...mono, fontSize: 11, color: C.sub }}>{sub}</p>}</div>
    {right}
  </div>
);
const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 4px 20px rgba(15,30,80,0.12)", ...mono, fontSize: 12 }}>
      <div style={{ color: C.sub, marginBottom: 6, fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: C.text, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, display: "inline-block" }} />
          <span style={{ color: C.sub }}>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};
const KPI = ({ label, value, sub, delta, positive, color, icon: Icon }: any) => (
  <Card>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      <span style={{ ...mono, fontSize: 10, color: C.sub, textTransform: "uppercase" as const, letterSpacing: "0.09em", lineHeight: 1.4, maxWidth: 130 }}>{label}</span>
      <span style={{ width: 32, height: 32, background: `${color}12`, border: `1px solid ${color}20`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={14} color={color} /></span>
    </div>
    <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 3 }}>{value}</div>
    <div style={{ ...mono, fontSize: 11, color: C.sub, marginBottom: delta !== undefined ? 7 : 0 }}>{sub}</div>
    {delta !== undefined && (
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {positive ? <ArrowUpRight size={12} color={C.teal} /> : <ArrowDownRight size={12} color={C.red} />}
        <span style={{ ...mono, fontSize: 11, color: positive ? C.teal : C.red, fontWeight: 600 }}>{delta}</span>
        <span style={{ ...mono, fontSize: 11, color: C.dim }}>vs last month</span>
      </div>
    )}
  </Card>
);
const Th = ({ children }: { children: string }) => <th style={{ ...mono, fontSize: 9, color: C.sub, textTransform: "uppercase" as const, letterSpacing: "0.08em", textAlign: "left" as const, padding: "0 12px 10px 0", fontWeight: 600, whiteSpace: "nowrap" as const }}>{children}</th>;
const Td = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => <td style={{ ...mono, fontSize: 12, color: C.text, padding: "10px 12px 10px 0", verticalAlign: "middle", ...style }}>{children}</td>;

// ─── Detail back button ───────────────────────────────────────────────────────
const BackBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, background: C.pill, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px", cursor: "pointer", marginBottom: 18, ...mono, fontSize: 12, color: C.sub }}>
    <ArrowLeft size={14} /> Back to {label}
  </button>
);

const InfoRow = ({ label, value, color }: { label: string; value: string | number; color?: string }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border2}` }}>
    <span style={{ ...mono, fontSize: 11, color: C.sub }}>{label}</span>
    <span style={{ ...mono, fontSize: 12, fontWeight: 600, color: color ?? C.text }}>{value}</span>
  </div>
);

const AiBox = ({ title, text }: { title: string; text: string }) => (
  <div style={{ background: `${C.purple}08`, border: `1px solid ${C.purple}20`, borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
    <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
      <Brain size={13} color={C.purple} />
      <span style={{ ...mono, fontSize: 10, color: C.purple, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>{title}</span>
    </div>
    <p style={{ ...mono, fontSize: 12, color: C.text, lineHeight: 1.75 }}>{text}</p>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// DETAIL PAGES
// ═══════════════════════════════════════════════════════════════════════════════

function RepDetail({ rep, onBack }: { rep: typeof fieldForceList[0]; onBack: () => void }) {
  const [tab, setTab] = useState<"dashboard" | "doctors" | "chemists" | "brands" | "attendance">("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "doctors", label: "Doctors" },
    { id: "chemists", label: "Chemists" },
    { id: "brands", label: "Brands" },
    { id: "attendance", label: "Attendance" },
  ] as const;

  // achievement donut data
  const achievementDonut = [
    { name: "Achieved", value: rep.target_achievement_percentage > 100 ? 100 : rep.target_achievement_percentage },
    { name: "Gap", value: rep.target_achievement_percentage >= 100 ? 0 : 100 - rep.target_achievement_percentage },
  ];
  const rxDonut = [
    { name: "Today RX", value: 6 },
    { name: "Last Day RX", value: 10 },
    { name: "Balance", value: 9 },
  ];

  return (
    <div>
      <BackBtn onClick={onBack} label="Field Force" />

      {/* ── Profile banner ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.sidebar} 0%, #1a3a7a 100%)`, borderRadius: 12, padding: "20px 24px", marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ ...slab, fontSize: 18, fontWeight: 700, color: "#fff" }}>{rep.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</span>
          </div>
          <div>
            <div style={{ ...slab, fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{rep.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              {[rep.code, rep.designation, rep.territory].map((v, i) => (
                <span key={i} style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{v}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { l: "Rank (Org)", v: `#${rep.performance_rank}` },
            { l: "Rank (Territory)", v: `#${rep.rank_in_territory}` },
            { l: "Tier", v: rep.performance_tier },
            { l: "Score", v: rep.performance_score.toFixed(1) },
          ].map(({ l, v }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 3 }}>{l}</div>
              <div style={{ ...mono, fontSize: 17, fontWeight: 700, color: "#fff" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Alert ── */}
      {(rep.days_absent >= 3 || rep.late_check_in_count >= 5 || rep.target_achievement_percentage < 75) && (
        <div style={{ background: `${C.amber}0e`, border: `1px solid ${C.amber}30`, borderRadius: 8, padding: "9px 14px", display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <AlertTriangle size={14} color={C.amber} style={{ flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 12, color: C.text }}>
            {rep.days_absent >= 3 && `${rep.days_absent} absences this month. `}
            {rep.late_check_in_count >= 5 && `${rep.late_check_in_count} late check-ins. `}
            {rep.target_achievement_percentage < 75 && `Achievement at ${rep.target_achievement_percentage}% — below threshold.`}
          </span>
        </div>
      )}

      {/* ── Tabs ── */}
      <div style={{ display: "flex", gap: 2, borderBottom: `2px solid ${C.border}`, marginBottom: 16 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ ...mono, fontSize: 12, fontWeight: 500, padding: "8px 18px", background: "transparent", border: "none", borderBottom: tab === t.id ? `2px solid ${C.blue}` : "2px solid transparent", color: tab === t.id ? C.blue : C.sub, cursor: "pointer", marginBottom: -2, transition: "all 0.15s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══ DASHBOARD TAB ═══ */}
      {tab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* AI Performance Insight */}
          <Card style={{ border: `1px solid ${C.purple}25`, background: `${C.purple}04` }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <Brain size={14} color={C.purple} />
              <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.purple, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>AI Performance Insight</span>
            </div>
            <p style={{ ...mono, fontSize: 12, color: C.text, lineHeight: 1.75, marginBottom: 10 }}>
              {rep.name.split(" ")[0]}&apos;s overall performance is at <strong style={{ color: rep.target_achievement_percentage >= 90 ? C.teal : C.amber }}>{rep.target_achievement_percentage}% of target</strong> with strong Rx generation. {rep.late_check_in_count > 2 ? `${rep.late_check_in_count} late check-ins flagged this month — field discipline needs attention.` : "Check-in compliance is good."} {rep.collection_achievement_percentage < 90 ? "Collection is below target — prioritize overdue chemists." : "Collection on track."}
            </p>
            <div style={{ background: `${C.teal}0a`, border: `1px solid ${C.teal}22`, borderRadius: 6, padding: "10px 14px" }}>
              <p style={{ ...mono, fontSize: 10, color: C.teal, fontWeight: 700, marginBottom: 6 }}>AI RECOMMENDATIONS</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                {["Focus on Dr. Abdul Motin — high potential, only 3 visits this month",
                  "Prioritize collection from MA Pharmacy (৳8K overdue, 18 days)",
                  `Increase DiabaCare XR promotion — currently ${repBrandData[1].sales_achievement_percentage}% of target`,
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 8 }}>
                    <span style={{ color: C.teal, fontWeight: 700 }}>›</span>
                    <span style={{ ...mono, fontSize: 12, color: C.text, lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* KPI row 1 — sales */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {/* Sales Summary card */}
            <Card>
              <SectionHead title="Sales Summary" sub="field_force_monthly_summary" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                {[
                  { l: "Target Value", v: `৳${(rep.total_sales_value / rep.target_achievement_percentage * 100 / 1000).toFixed(0)}K`, c: C.sub },
                  { l: "Today Sales", v: `৳${(repDailyData[repDailyData.length - 1].sales / 1000).toFixed(1)}K`, c: C.teal },
                  { l: "Up to Date Sales", v: `৳${(rep.total_sales_value / 1000).toFixed(0)}K`, c: C.blue },
                  { l: "Last Month Sales", v: `৳${(rep.previous_month_sales / 1000).toFixed(0)}K`, c: C.text },
                ].map(({ l, v, c }) => (
                  <div key={l}>
                    <div style={{ ...mono, fontSize: 10, color: C.sub, marginBottom: 2 }}>{l}</div>
                    <div style={{ ...mono, fontSize: 15, fontWeight: 700, color: c }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ ...mono, fontSize: 11, color: C.sub }}>Achievement %</span>
                  <span style={{ ...mono, fontSize: 11, fontWeight: 700, color: rep.target_achievement_percentage >= 100 ? C.teal : C.amber }}>{rep.target_achievement_percentage}%</span>
                </div>
                <div style={{ background: C.dim, borderRadius: 99, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(rep.target_achievement_percentage, 100)}%`, background: `linear-gradient(90deg, ${C.blue}, ${C.teal})`, height: "100%", borderRadius: 99 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ ...mono, fontSize: 11, color: C.sub }}>Collection Achievement</span>
                  <span style={{ ...mono, fontSize: 11, fontWeight: 700, color: C.purple }}>{rep.collection_achievement_percentage}%</span>
                </div>
                <div style={{ background: C.dim, borderRadius: 99, height: 5, overflow: "hidden", marginTop: 4 }}>
                  <div style={{ width: `${Math.min(rep.collection_achievement_percentage, 100)}%`, background: C.purple, height: "100%", borderRadius: 99 }} />
                </div>
              </div>
            </Card>

            {/* RX Summary card */}
            <Card>
              <SectionHead title="RX Summary" sub="field_force_monthly_summary" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
                {[
                  { l: "Total RX", v: rep.total_prescription_count, c: C.blue },
                  { l: "Last Day RX", v: repDailyData[repDailyData.length - 2].rx, c: C.sub },
                  { l: "Today RX", v: repDailyData[repDailyData.length - 1].rx, c: C.teal },
                  { l: "DCR Calls", v: rep.total_dcr_calls, c: C.text },
                ].map(({ l, v, c }) => (
                  <div key={l}>
                    <div style={{ ...mono, fontSize: 10, color: C.sub, marginBottom: 2 }}>{l}</div>
                    <div style={{ ...mono, fontSize: 18, fontWeight: 700, color: c }}>{v}</div>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={90}>
                <PieChart>
                  <Pie data={rxDonut} dataKey="value" cx="50%" cy="50%" innerRadius={26} outerRadius={40} paddingAngle={2}>
                    <Cell fill={C.blue} /><Cell fill={C.teal} /><Cell fill={C.dim} />
                  </Pie>
                  <Tooltip contentStyle={{ background: C.surface, border: `1px solid ${C.border}`, ...mono, fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                {[{ l: "Total RX", c: C.blue }, { l: "Today RX", c: C.teal }, { l: "Last Day", c: C.dim }].map(({ l, c }) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                    <span style={{ ...mono, fontSize: 10, color: C.sub }}>{l}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Today's Doctor Visits */}
            <Card>
              <SectionHead title="Today's Doctor Visits" sub="doctor_monthly_summary" />
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Doctor", "RX", "Status"].map(h => <Th key={h}>{h}</Th>)}
                  </tr>
                </thead>
                <tbody>
                  {doctorList.map((d, i) => (
                    <tr key={d.doctor_id} style={{ borderBottom: i < doctorList.length - 1 ? `1px solid ${C.border2}` : "none" }}>
                      <Td><div style={{ fontWeight: 500 }}>{d.name}</div><div style={{ ...mono, fontSize: 10, color: C.sub }}>{d.speciality}</div></Td>
                      <Td style={{ color: C.teal, fontWeight: 700 }}>{d.prescription_count}</Td>
                      <Td>
                        <Chip
                          label={d.status === "ACTIVE" ? "Visited" : d.status === "AT_RISK" ? "Pending" : "Missed"}
                          color={d.status === "ACTIVE" ? C.teal : d.status === "AT_RISK" ? C.amber : C.red}
                          size="xs"
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Sales trend + daily bar */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
            <Card>
              <SectionHead title="Sales vs Target Trend" sub="field_force_daily_summary · last 8 working days" />
              <ResponsiveContainer width="100%" height={180}>
                <ComposedChart data={repDailyData} margin={{ top: 4, right: 4, left: -14, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rep-sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.blue} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" />
                  <XAxis dataKey="day" tick={{ ...mono, fill: C.sub, fontSize: 9 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="l" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}K`} />
                  <YAxis yAxisId="r" orientation="right" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Area key="rd-sales" yAxisId="l" type="monotone" dataKey="sales" name="Sales ৳" stroke={C.blue} strokeWidth={2} fill="url(#rep-sg)" dot={false} activeDot={{ r: 4 }} />
                  <Line key="rd-col" yAxisId="l" type="monotone" dataKey="collection" name="Collection ৳" stroke={C.amber} strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
                  <Bar key="rd-rx" yAxisId="r" dataKey="rx" name="Prescriptions" fill={`${C.purple}25`} stroke={C.purple} strokeWidth={1} radius={[2, 2, 0, 0]} maxBarSize={14} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionHead title="Tomorrow's Work Plan" sub="Gulshan Area" />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Visit Dr. Rahman at City Hospital",
                  "Meet with Modina Pharmacy",
                  "Collect payments from MA Pharmacy",
                  "Promote DiabaCare XR to 3 new doctors",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 20, height: 20, background: `${C.blue}15`, border: `1px solid ${C.blue}25`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ ...mono, fontSize: 10, color: C.blue, fontWeight: 700 }}>{i + 1}</span>
                    </span>
                    <span style={{ ...mono, fontSize: 12, color: C.text, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Focus products + Promotional materials */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card>
              <SectionHead title="Focus Products" sub="field_force_monthly_product_summary" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {repBrandData.map(b => (
                  <span key={b.brand_name} style={{ ...mono, fontSize: 11, color: C.blue, background: `${C.blue}10`, border: `1px solid ${C.blue}20`, padding: "3px 10px", borderRadius: 4 }}>{b.brand_name}</span>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={repBrandData.map(b => ({ name: b.brand_name.replace(" ", "\n"), ach: b.sales_achievement_percentage }))} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" vertical={false} />
                  <XAxis dataKey="name" tick={{ ...mono, fill: C.sub, fontSize: 9 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[60, 115]} tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar key="fp-ach" dataKey="ach" name="Achievement %" radius={[4, 4, 0, 0]} maxBarSize={28}>
                    {repBrandData.map((b, i) => <Cell key={`fpc-${i}`} fill={b.sales_achievement_percentage >= 100 ? C.teal : b.sales_achievement_percentage >= 85 ? C.blue : C.red} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionHead title="Promotional Activity" sub="total_sample_count / gift / promo / ppm" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { l: "total_sample_count", v: rep.total_sample_count, max: 120, color: C.teal },
                  { l: "total_gift_count", v: rep.total_gift_count, max: 50, color: C.blue },
                  { l: "total_promo_count", v: rep.total_promo_count, max: 70, color: C.purple },
                  { l: "total_dcr_calls", v: rep.total_dcr_calls, max: 300, color: C.amber },
                ].map(({ l, v, max, color }) => (
                  <div key={l}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ ...mono, fontSize: 11, color: C.sub }}>{l}</span>
                      <span style={{ ...mono, fontSize: 11, color, fontWeight: 700 }}>{v}</span>
                    </div>
                    <ScoreBar value={v} max={max} color={color} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ═══ DOCTORS TAB ═══ */}
      {tab === "doctors" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* AI Relationship Analysis */}
          <Card style={{ border: `1px solid ${C.purple}25`, background: `${C.purple}04` }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <Brain size={14} color={C.purple} />
              <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.purple, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Doctor Relationship Analysis</span>
            </div>
            <p style={{ ...mono, fontSize: 12, color: C.text, lineHeight: 1.75, marginBottom: 10 }}>
              Top 3 doctors contribute <strong style={{ color: C.teal }}>65% of total Rx</strong>. Dr. Motin has high potential but only 3 visits this month — engagement score critically low at 49.1.
            </p>
            <div style={{ background: `${C.teal}0a`, border: `1px solid ${C.teal}22`, borderRadius: 6, padding: "10px 14px" }}>
              <p style={{ ...mono, fontSize: 10, color: C.teal, fontWeight: 700, marginBottom: 6 }}>AI RECOMMENDATIONS</p>
              {["Urgent visit to Dr. Motin — competitor rep seen in area twice this month",
                "Promote Pulmovax to Dr. Rahim — low Rx share vs potential",
                "Organize CME event to strengthen KOL relationships",
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: C.teal, fontWeight: 700 }}>›</span>
                  <span style={{ ...mono, fontSize: 12, color: C.text }}>{r}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Doctor visit details table */}
          <Card>
            <SectionHead title="Doctor Visit Details" sub="doctor_monthly_summary · user_id=" />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["Doctor", "Degree", "Speciality", "total_visits", "approved/pending", "morning/evening", "solo/accompanied", "prescription_count", "Rx/visit", "engagement_score", "effectiveness_score"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                <tbody>
                  {doctorList.map((d, i) => (
                    <tr key={d.doctor_id} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                      <Td style={{ fontWeight: 600 }}>{d.name}</Td>
                      <Td style={{ color: C.sub }}>{d.designation.split(",")[0]}</Td>
                      <Td><Chip label={d.speciality} color={C.indigo} size="xs" /></Td>
                      <Td style={{ color: C.blue, fontWeight: 700 }}>{d.total_visits}</Td>
                      <Td><span style={{ color: C.teal }}>{d.approved_visits}</span><span style={{ color: C.dim }}> / </span><span style={{ color: d.pending_visits > 0 ? C.amber : C.dim }}>{d.pending_visits}</span></Td>
                      <Td style={{ color: C.sub }}>{d.morning_visits} / {d.evening_visits}</Td>
                      <Td style={{ color: C.sub }}>{d.solo_visits} / {d.accompanied_visits}</Td>
                      <Td style={{ color: C.purple, fontWeight: 700 }}>{d.prescription_count}</Td>
                      <Td style={{ color: C.teal, fontWeight: 700 }}>{(d.prescription_count / d.total_visits).toFixed(1)}</Td>
                      <Td style={{ minWidth: 100 }}><ScoreBar value={d.doctor_engagement_score} color={d.doctor_engagement_score >= 75 ? C.teal : d.doctor_engagement_score >= 50 ? C.amber : C.red} /></Td>
                      <Td style={{ minWidth: 100 }}><ScoreBar value={d.visit_effectiveness_score} color={d.visit_effectiveness_score >= 75 ? C.teal : d.visit_effectiveness_score >= 50 ? C.amber : C.red} /></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Top RX contributors + sentiment */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card>
              <SectionHead title="Top RX Contributors" sub="prescription_count per doctor" />
              <ResponsiveContainer width="100%" height={180}>
                <BarChart layout="vertical" data={[...doctorList].sort((a, b) => b.prescription_count - a.prescription_count).map(d => ({ name: d.name.replace("Dr. ", ""), rx: d.prescription_count, engagement: d.doctor_engagement_score }))} margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" horizontal={false} />
                  <XAxis type="number" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ ...mono, fill: C.text, fontSize: 11 }} tickLine={false} axisLine={false} width={72} />
                  <Tooltip content={<ChartTip />} />
                  <Bar key="doc-rx" dataKey="rx" name="Prescriptions" fill={C.teal} radius={[0, 4, 4, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionHead title="Doctor Sentiment Analysis" sub="AI · based on visit interactions" />
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
                  <ResponsiveContainer width={100} height={100}>
                    <PieChart>
                      <Pie data={[{ v: 78 }, { v: 22 }]} dataKey="v" cx="50%" cy="50%" innerRadius={30} outerRadius={44} startAngle={90} endAngle={-270} paddingAngle={2}>
                        <Cell fill={C.teal} /><Cell fill={C.dim} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ ...mono, fontSize: 14, fontWeight: 700, color: C.teal }}>78%</span>
                    <span style={{ ...mono, fontSize: 9, color: C.sub }}>Positive</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ ...mono, fontSize: 10, color: C.teal, fontWeight: 700, marginBottom: 8 }}>AI RECOMMENDATIONS</p>
                  {["Address benefits of OncoClear with Dr. Motin",
                    "Provide more samples to Dr. Selina who shows high engagement",
                    "Schedule a CME session with Dr. Rahim",
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0 }}>›</span>
                      <span style={{ ...mono, fontSize: 11, color: C.text, lineHeight: 1.5 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ═══ CHEMISTS TAB ═══ */}
      {tab === "chemists" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* AI Analysis */}
          <Card style={{ border: `1px solid ${C.purple}25`, background: `${C.purple}04` }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <Brain size={14} color={C.purple} />
              <span style={{ ...mono, fontSize: 10, fontWeight: 700, color: C.purple, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Chemist Performance Analysis</span>
            </div>
            <p style={{ ...mono, fontSize: 12, color: C.text, lineHeight: 1.75, marginBottom: 10 }}>
              Modina Pharmacy contributes <strong style={{ color: C.teal }}>42% of total sales</strong> but growth is slowing (–4.2% MoM). LifeCare Pharmacy has <strong style={{ color: C.red }}>HIGH churn risk</strong> with 42-day overdue. Sunrise Pharmacy is critical — recommend immediate escalation.
            </p>
            <div style={{ background: `${C.teal}0a`, border: `1px solid ${C.teal}22`, borderRadius: 6, padding: "10px 14px" }}>
              <p style={{ ...mono, fontSize: 10, color: C.teal, fontWeight: 700, marginBottom: 6 }}>AI RECOMMENDATIONS</p>
              {["Implement loyalty program for Modina Pharmacy to reverse growth slowdown",
                "Collect ৳8K from MA Pharmacy before placing next order",
                "Urgent visit to LifeCare — high footfall location near Dr. Motin's clinic",
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: C.teal, fontWeight: 700 }}>›</span>
                  <span style={{ ...mono, fontSize: 12, color: C.text }}>{r}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Chemist visit details */}
          <Card>
            <SectionHead title="Chemist Visit Details" sub="customer_profile ⋈ customer_monthly_summary" />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["customer_name", "tier", "total_sales_value", "mom_growth_%", "churn_risk", "health_score", "engagement_score", "payment_reliability", "outstanding_balance", "visits_30d", "next_best_action"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                <tbody>
                  {chemistList.map((c, i) => (
                    <tr key={c.customer_id} style={{ borderBottom: `1px solid ${C.border2}`, background: c.churn_risk_level === "HIGH" ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2 }}>
                      <Td style={{ fontWeight: 600 }}>{c.customer_name}</Td>
                      <Td><Chip label={c.customer_tier} color={c.customer_tier === "GOLD" ? C.amber : c.customer_tier === "SILVER" ? C.blue : C.sub} size="xs" /></Td>
                      <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(c.total_sales_value / 1000).toFixed(0)}K</Td>
                      <Td style={{ color: c.mom_growth_percentage >= 0 ? C.teal : C.red, fontWeight: 600 }}>{c.mom_growth_percentage > 0 ? "+" : ""}{c.mom_growth_percentage.toFixed(1)}%</Td>
                      <Td><RiskBadge level={c.churn_risk_level} /></Td>
                      <Td style={{ minWidth: 90 }}><ScoreBar value={c.customer_health_score} color={c.customer_health_score >= 70 ? C.teal : c.customer_health_score >= 45 ? C.amber : C.red} /></Td>
                      <Td style={{ minWidth: 90 }}><ScoreBar value={c.engagement_score} color={C.blue} /></Td>
                      <Td style={{ minWidth: 90 }}><ScoreBar value={c.payment_reliability_score} color={c.payment_reliability_score >= 80 ? C.teal : C.red} /></Td>
                      <Td style={{ color: c.overdue_amount > 0 ? C.red : C.sub }}>৳{(c.outstanding_balance / 1000).toFixed(1)}K{c.overdue_amount > 0 && <div style={{ fontSize: 10, color: C.red }}>৳{(c.overdue_amount / 1000).toFixed(1)}K overdue</div>}</Td>
                      <Td style={{ color: c.visits_last_30_days <= 2 ? C.red : C.sub }}>{c.visits_last_30_days}</Td>
                      <Td style={{ ...mono, fontSize: 10, color: C.sub, maxWidth: 160, whiteSpace: "normal" as const }}>{c.next_best_action.slice(0, 60)}…</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Business contributors + order trend */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card>
              <SectionHead title="Top Business Contributors" sub="total_sales_value share" />
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={chemistList.map(c => ({ name: c.customer_name, value: c.total_sales_value }))} dataKey="value" cx="50%" cy="50%" outerRadius={58} paddingAngle={2}>
                      {chemistList.map((_, i) => <Cell key={`cbc-${i}`} fill={[C.teal, C.blue, C.red, C.purple, C.amber, C.orange][i % 6]} stroke="transparent" />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: C.surface, border: `1px solid ${C.border}`, ...mono, fontSize: 11 }} formatter={(v: any) => `৳${(v / 1000).toFixed(0)}K`} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {chemistList.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: [C.teal, C.blue, C.red, C.purple, C.amber, C.orange][i % 6], flexShrink: 0 }} />
                      <span style={{ ...mono, fontSize: 11, color: C.sub, flex: 1, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{c.customer_name.replace(" Pharmacy", "")}</span>
                      <span style={{ ...mono, fontSize: 11, color: C.text, fontWeight: 700 }}>৳{(c.total_sales_value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <SectionHead title="Collection Status" sub="outstanding_balance · payment_reliability_score" />
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { l: "total_collections", v: `৳${(rep.total_collections / 1000).toFixed(0)}K`, color: C.teal },
                  { l: "cash_collection_amount", v: `৳${(rep.cash_collection_amount / 1000).toFixed(0)}K`, color: C.blue },
                  { l: "collection_achievement_%", v: `${rep.collection_achievement_percentage}%`, color: rep.collection_achievement_percentage >= 90 ? C.teal : C.amber },
                  { l: "total_overdue_chemists", v: "2 chemists", color: C.red },
                  { l: "total_overdue_amount", v: "৳12.2K", color: C.red },
                ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ═══ BRANDS TAB ═══ */}
      {tab === "brands" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SectionHead title="Brand Performance (this rep)" sub="field_force_brand_monthly_summary · Aug 2025" />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["brand_name", "total_sales_value", "monthly_sales_target", "achievement_%", "prescription_count", "doctor_visit_count", "unique_prescribing_doctors", "performance_score", "ai_summary"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                <tbody>
                  {repBrandData.map((b, i) => (
                    <tr key={b.brand_name} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                      <Td style={{ fontWeight: 700 }}>{b.brand_name}</Td>
                      <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(b.total_sales_value / 1000).toFixed(0)}K</Td>
                      <Td style={{ color: C.sub }}>৳{(b.monthly_sales_target / 1000).toFixed(0)}K</Td>
                      <Td style={{ color: b.sales_achievement_percentage >= 100 ? C.teal : b.sales_achievement_percentage >= 85 ? C.blue : C.red, fontWeight: 700 }}>{b.sales_achievement_percentage.toFixed(1)}%</Td>
                      <Td style={{ color: C.purple, fontWeight: 700 }}>{b.prescription_count}</Td>
                      <Td style={{ color: C.sub }}>{b.doctor_visit_count}</Td>
                      <Td style={{ color: C.sub }}>{Math.round(b.prescription_count / 8)}</Td>
                      <Td style={{ minWidth: 100 }}><ScoreBar value={b.performance_score} color={b.performance_score >= 80 ? C.teal : b.performance_score >= 65 ? C.amber : C.red} /></Td>
                      <Td style={{ ...mono, fontSize: 10, color: C.sub, maxWidth: 160, whiteSpace: "normal" as const }}>
                        {b.requires_attention ? <Chip label="⚠ NEEDS ATTENTION" color={C.red} size="xs" /> : <Chip label="On Track" color={C.teal} size="xs" />}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card>
              <SectionHead title="Brand Achievement Chart" sub="sales_achievement_percentage" />
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={repBrandData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" vertical={false} />
                  <XAxis dataKey="brand_name" tick={{ ...mono, fill: C.sub, fontSize: 9 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[60, 115]} tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar key="br-ach" dataKey="sales_achievement_percentage" name="Achievement %" radius={[4, 4, 0, 0]} maxBarSize={36}>
                    {repBrandData.map((b, i) => <Cell key={`brc-${i}`} fill={b.sales_achievement_percentage >= 100 ? C.teal : b.sales_achievement_percentage >= 85 ? C.blue : C.red} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionHead title="Prescription by Brand" sub="prescription_count · Aug 2025" />
              <ResponsiveContainer width="100%" height={200}>
                <BarChart layout="vertical" data={[...repBrandData].sort((a, b) => b.prescription_count - a.prescription_count)} margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" horizontal={false} />
                  <XAxis type="number" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="brand_name" tick={{ ...mono, fill: C.text, fontSize: 11 }} tickLine={false} axisLine={false} width={90} />
                  <Tooltip content={<ChartTip />} />
                  <Bar key="br-rx" dataKey="prescription_count" name="Prescriptions" fill={C.purple} radius={[0, 4, 4, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      )}

      {/* ═══ ATTENDANCE TAB ═══ */}
      {tab === "attendance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <KPI label="days_present" value={rep.days_present} sub={`of ${rep.total_working_days} working days`} color={C.teal} icon={CheckCircle2} />
            <KPI label="days_absent" value={rep.days_absent} sub="unplanned absence" color={C.red} icon={AlertTriangle} />
            <KPI label="late_check_in_count" value={rep.late_check_in_count} sub={`avg_check_in_distance: ${rep.avg_check_in_distance} km`} color={C.amber} icon={Clock} />
            <KPI label="attendance_percentage" value={`${rep.attendance_percentage}%`} sub="field_force_monthly_summary" color={rep.attendance_percentage >= 90 ? C.teal : C.amber} icon={Calendar} />
          </div>

          <Card>
            <SectionHead title="Daily Attendance Log" sub="field_force_daily_summary · attendance_status" />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["summary_date", "attendance_status", "doctors_visited", "chemists_visited", "prescription_count", "total_collection_amount", "total_sales_value"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
              <tbody>
                {repDailyData.map((d, i) => (
                  <tr key={d.day} style={{ borderBottom: i < repDailyData.length - 1 ? `1px solid ${C.border2}` : "none", background: d.status === "LATE" ? `${C.amber}06` : i % 2 === 0 ? "transparent" : C.card2 }}>
                    <Td style={{ fontWeight: 500 }}>{d.day}</Td>
                    <Td><Chip label={d.status} color={d.status === "PRESENT" ? C.teal : d.status === "LATE" ? C.amber : C.red} size="xs" /></Td>
                    <Td style={{ color: C.blue, fontWeight: 600 }}>{d.doctors}</Td>
                    <Td style={{ color: C.sub }}>{d.chemists}</Td>
                    <Td style={{ color: C.purple, fontWeight: 700 }}>{d.rx}</Td>
                    <Td style={{ color: C.amber, fontWeight: 600 }}>৳{(d.collection / 1000).toFixed(1)}K</Td>
                    <Td style={{ color: C.text }}>৳{(d.sales / 1000).toFixed(1)}K</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
            <Card>
              <SectionHead title="Daily Visit Activity" sub="doctors_visited + chemists_visited per day" />
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={repDailyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" vertical={false} />
                  <XAxis dataKey="day" tick={{ ...mono, fill: C.sub, fontSize: 9 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar key="att-dr" dataKey="doctors" name="Doctors" fill={C.blue} radius={[3, 3, 0, 0]} maxBarSize={14} />
                  <Bar key="att-ch" dataKey="chemists" name="Chemists" fill={C.teal} radius={[3, 3, 0, 0]} maxBarSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionHead title="Geography Metrics" sub="total_distance_covered" />
              {[
                { l: "total_distance_covered", v: `${rep.total_distance_covered} km`, color: C.blue },
                { l: "avg_distance_per_day", v: `${rep.avg_distance_per_day} km`, color: C.sub },
                { l: "avg_check_in_distance", v: `${rep.avg_check_in_distance} km`, color: rep.avg_check_in_distance > 1 ? C.red : C.sub },
                { l: "late_check_in_count", v: rep.late_check_in_count, color: rep.late_check_in_count > 3 ? C.red : C.amber },
                { l: "days_present", v: `${rep.days_present} of ${rep.total_working_days}`, color: C.teal },
                { l: "days_leave", v: rep.days_leave, color: C.sub },
              ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function DoctorDetail({ doc, onBack }: { doc: typeof doctorList[0]; onBack: () => void }) {
  return (
    <div>
      <BackBtn onClick={onBack} label="Doctors" />
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
            <Stethoscope size={24} color="#fff" />
          </div>
          <div>
            <div style={{ ...slab, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{doc.name}</div>
            <div style={{ ...mono, fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>{doc.designation} · {doc.speciality}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Chip label={doc.status} color={doc.status === "ACTIVE" ? C.teal : doc.status === "AT_RISK" ? C.amber : C.red} />
              <span style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.6)" }}><MapPin size={10} style={{ display: "inline", marginRight: 3 }} />{doc.thana}, {doc.district}, {doc.division}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[{ l: "yearly_business_capacity", v: `৳${(doc.yearly_business_capacity / 1000).toFixed(0)}K` }, { l: "prescription_count", v: doc.prescription_count }, { l: "doctor_engagement", v: doc.doctor_engagement_score.toFixed(1) }].map(({ l, v }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>{l}</div>
              <div style={{ ...mono, fontSize: 18, fontWeight: 700, color: "#fff" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
        <KPI label="total_visits" value={doc.total_visits} sub={`${doc.approved_visits} approved · ${doc.pending_visits} pending`} color={C.blue} icon={Calendar} />
        <KPI label="prescription_count" value={doc.prescription_count} sub={`${(doc.prescription_count / doc.total_visits).toFixed(1)} Rx/visit`} color={C.purple} icon={FileText} />
        <KPI label="visit_effectiveness_score" value={doc.visit_effectiveness_score.toFixed(1)} sub="out of 100" color={doc.visit_effectiveness_score >= 75 ? C.teal : C.amber} icon={Target} />
        <KPI label="doctor_engagement_score" value={doc.doctor_engagement_score.toFixed(1)} sub="out of 100" color={doc.doctor_engagement_score >= 75 ? C.teal : doc.doctor_engagement_score >= 50 ? C.amber : C.red} icon={Activity} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Visit breakdown chart */}
        <Card>
          <SectionHead title="Visit Pattern Breakdown" sub="doctor_monthly_summary · morning/evening/schedule" />
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[
              { label: "Morning", value: doc.morning_visits, fill: C.blue },
              { label: "Evening", value: doc.evening_visits, fill: C.indigo },
              { label: "On-Schedule", value: doc.on_schedule_visits, fill: C.teal },
              { label: "Off-Schedule", value: doc.off_schedule_visits, fill: C.amber },
              { label: "Solo", value: doc.solo_visits, fill: C.purple },
              { label: "Accompanied", value: doc.accompanied_visits, fill: C.orange },
            ]} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" vertical={false} />
              <XAxis dataKey="label" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar key="doc-det-visits" dataKey="value" name="Visits" radius={[4, 4, 0, 0]} maxBarSize={36}>
                {[C.blue, C.indigo, C.teal, C.amber, C.purple, C.orange].map((c, i) => <Cell key={`ddc-${i}`} fill={c} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Profile + chambers */}
        <Card>
          <SectionHead title="Doctor Profile" sub="doctor table fields" />
          {[
            { l: "doctor_id", v: doc.doctor_id },
            { l: "mobile", v: doc.mobile },
            { l: "division · district · thana", v: `${doc.division} · ${doc.district} · ${doc.thana}` },
            { l: "religion", v: doc.religion },
            { l: "marital_status", v: doc.marital_status },
            { l: "unique_brands_promoted_count", v: doc.unique_brands_promoted_count },
            { l: "yearly_business_capacity", v: `৳${(doc.yearly_business_capacity / 1000).toFixed(0)}K`, color: C.blue },
          ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
          <div style={{ marginTop: 12 }}>
            <p style={{ ...mono, fontSize: 10, color: C.sub, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8 }}>chambers (jsonb)</p>
            {doc.chambers.map((ch, i) => (
              <div key={i} style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 7, padding: "9px 12px", marginBottom: 6 }}>
                <div style={{ ...mono, fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 2 }}>{ch.name}</div>
                <div style={{ ...mono, fontSize: 11, color: C.sub }}>{ch.address}</div>
                <div style={{ ...mono, fontSize: 10, color: C.dim, marginTop: 2 }}>{ch.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Brand-wise performance */}
      <Card style={{ marginBottom: 14 }}>
        <SectionHead title="Brand Engagement (this doctor)" sub="doctor_brand_monthly_summary · brand-level breakdown" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["brand_name", "total_visits", "prescription_count", "Rx/visit", "brand_engagement_score", "visit_effectiveness_score", "total_sample_count", "total_gift_count"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {doctorBrandData.map((b, i) => (
                <tr key={b.brand_name} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                  <Td style={{ fontWeight: 600 }}>{b.brand_name}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>{b.total_visits}</Td>
                  <Td style={{ color: C.purple, fontWeight: 700 }}>{b.prescription_count}</Td>
                  <Td style={{ color: C.teal, fontWeight: 700 }}>{(b.prescription_count / b.total_visits).toFixed(1)}</Td>
                  <Td style={{ minWidth: 110 }}><ScoreBar value={b.brand_engagement_score} color={b.brand_engagement_score >= 75 ? C.teal : C.amber} /></Td>
                  <Td style={{ minWidth: 110 }}><ScoreBar value={b.visit_effectiveness_score} color={b.visit_effectiveness_score >= 75 ? C.teal : C.amber} /></Td>
                  <Td style={{ color: C.sub }}>{b.total_sample_count}</Td>
                  <Td style={{ color: C.sub }}>{b.total_gift_count}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Nearby chemists */}
      <Card style={{ marginBottom: 0 }}>
        <SectionHead title="Nearby Chemists" sub="doctor_chemist_mapping · distance_km · is_primary_chemist" />
        <div style={{ display: "flex", gap: 12 }}>
          {nearbyChemists.map(c => (
            <div key={c.chemist_id} style={{ flex: 1, background: c.is_primary_chemist ? `${C.teal}0a` : C.card2, border: `1px solid ${c.is_primary_chemist ? C.teal + "30" : C.border}`, borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ ...mono, fontSize: 12, fontWeight: 600, color: C.text }}>{c.chemist_name}</span>
                {c.is_primary_chemist && <Chip label="PRIMARY" color={C.teal} size="xs" />}
              </div>
              <div style={{ ...mono, fontSize: 11, color: C.sub, display: "flex", alignItems: "center", gap: 5 }}>
                <Navigation size={11} /> {c.distance_km} km away
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Feedback */}
      <AIFeedback
        context={`doctor_monthly_summary · doctor_brand_monthly_summary · ${doc.name} · Aug 2025`}
        insights={[
          {
            type: doc.doctor_engagement_score >= 75 ? "opportunity" : doc.doctor_engagement_score >= 50 ? "warning" : "critical",
            title: doc.doctor_engagement_score >= 75
              ? `Strong Engagement — Protect & Grow`
              : doc.doctor_engagement_score >= 50
              ? `Engagement Declining — Intervention Needed`
              : `Critical Engagement Risk`,
            body: doc.doctor_engagement_score >= 75
              ? `${doc.name} has an engagement score of ${doc.doctor_engagement_score.toFixed(1)} — among the top prescribers in your portfolio. ${doc.prescription_count} prescriptions at ${(doc.prescription_count / doc.total_visits).toFixed(1)} Rx/visit. Maintain minimum ${doc.total_visits + 2} visits next month and introduce NeuroPlex samples to expand product breadth.`
              : doc.doctor_engagement_score >= 50
              ? `Engagement score ${doc.doctor_engagement_score.toFixed(1)} is declining. Visit frequency is below target and ${doc.off_schedule_visits} off-schedule visits this month signals poor planning. Recommend scheduling a morning visit next week with CardioMax clinical data.`
              : `Engagement score ${doc.doctor_engagement_score.toFixed(1)} is critically low. Only ${doc.total_visits} visits vs target 6. Competitor rep activity detected. This doctor has ৳${(doc.yearly_business_capacity / 1000).toFixed(0)}K yearly capacity — urgent intervention required this week.`,
            action: "Schedule visit",
          },
          {
            type: "info",
            title: "Visit Pattern Analysis",
            body: `${doc.morning_visits} morning vs ${doc.evening_visits} evening visits this month. ${doc.on_schedule_visits} on-schedule, ${doc.off_schedule_visits} off-schedule. ${doc.accompanied_visits} accompanied visits showed higher brand engagement scores (avg +12 pts vs solo). Recommend increasing accompanied visits to at least 50% of total.`,
            action: "Optimise plan",
          },
          {
            type: doc.prescription_count >= 20 ? "opportunity" : "warning",
            title: doc.prescription_count >= 20 ? "High Prescriber — Expand Brand Range" : "Low Rx Count — Review Promotion Mix",
            body: doc.prescription_count >= 20
              ? `${doc.prescription_count} prescriptions this month across ${doc.unique_brands_promoted_count} brands. Only ${doc.unique_brands_promoted_count} of 4 target brands being promoted. Introducing DiabaCare XR to this doctor could add est. 8–12 Rx/month based on their speciality and patient profile.`
              : `Only ${doc.prescription_count} prescriptions from ${doc.total_visits} visits (${(doc.prescription_count / doc.total_visits).toFixed(1)} Rx/visit). Promotion mix shows heavy sample distribution but low conversion. Try shifting from sample-led to clinical-data-led detailing for this doctor profile.`,
            action: "View Rx history",
          },
          {
            type: "info",
            title: "Nearby Chemist Opportunity",
            body: `${nearbyChemists.length} chemists mapped near this doctor's chamber. ${nearbyChemists.filter(c => c.is_primary_chemist).length} primary chemist (Modina Pharmacy, 0.3 km). Coordinating prescriptions with the primary chemist can increase fill rate by est. 18–22%. Ensure Modina Pharmacy has adequate stock before your next visit.`,
            action: "View chemist",
          },
        ]}
      />
    </div>
  );
}

function ChemistDetail({ chemist, onBack }: { chemist: typeof chemistList[0]; onBack: () => void }) {
  return (
    <div>
      <BackBtn onClick={onBack} label="Chemists" />
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #1a4731 0%, #2d6e4f 100%)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
            <Store size={24} color="#fff" />
          </div>
          <div>
            <div style={{ ...slab, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{chemist.customer_name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Chip label={chemist.customer_tier} color={chemist.customer_tier === "GOLD" ? C.amber : chemist.customer_tier === "SILVER" ? "#94a3b8" : "#78716c"} />
              <Chip label={chemist.chemist_type} color="rgba(255,255,255,0.6)" />
              <span style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.6)" }}><MapPin size={10} style={{ display: "inline" }} /> {chemist.city}, {chemist.district}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[{ l: "churn_risk_level", v: chemist.churn_risk_level }, { l: "customer_health_score", v: chemist.customer_health_score.toFixed(1) }, { l: "outstanding_balance", v: `৳${(chemist.outstanding_balance / 1000).toFixed(1)}K` }].map(({ l, v }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>{l}</div>
              <div style={{ ...mono, fontSize: 16, fontWeight: 700, color: "#fff" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 14 }}>
        <KPI label="total_sales_value" value={`৳${(chemist.total_sales_value / 1000).toFixed(0)}K`} sub="Aug 2025" delta={`${chemist.mom_growth_percentage > 0 ? "+" : ""}${chemist.mom_growth_percentage}% MoM`} positive={chemist.mom_growth_percentage >= 0} color={C.blue} icon={BarChart2} />
        <KPI label="engagement_score" value={chemist.engagement_score.toFixed(1)} sub="customer_monthly_summary" color={chemist.engagement_score >= 70 ? C.teal : C.amber} icon={Activity} />
        <KPI label="payment_reliability" value={`${chemist.payment_reliability_score.toFixed(0)}%`} sub={`avg_payment_days: ${chemist.avg_payment_days}`} color={chemist.payment_reliability_score >= 80 ? C.teal : C.red} icon={Shield} />
        <KPI label="visits_last_30_days" value={chemist.visits_last_30_days} sub={`${chemist.total_visits_received} lifetime visits`} color={C.purple} icon={MapPin} />
        <KPI label="predicted_monthly_value" value={`৳${(chemist.predicted_monthly_value / 1000).toFixed(0)}K`} sub="AI demand forecast" color={C.indigo} icon={Brain} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Card>
          <SectionHead title="Customer Profile" sub="customer_profile table fields" />
          {[
            { l: "customer_id", v: chemist.customer_id },
            { l: "mobile", v: chemist.mobile },
            { l: "address", v: chemist.address },
            { l: "credit_limit", v: `৳${(chemist.credit_limit / 1000).toFixed(0)}K`, color: C.blue },
            { l: "customer_segment", v: chemist.customer_segment },
            { l: "lifetime_order_value", v: `৳${(chemist.lifetime_order_value / 1000).toFixed(0)}K`, color: C.teal },
            { l: "avg_order_value", v: `৳${(chemist.avg_order_value / 1000).toFixed(1)}K` },
            { l: "days_since_last_order", v: chemist.days_since_last_order, color: chemist.days_since_last_order > 10 ? C.red : C.sub },
            { l: "last_order_date", v: chemist.last_order_date },
            { l: "unique_products_purchased", v: `${chemist.unique_products_purchased} SKUs · ${chemist.unique_brands_purchased} brands` },
          ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
        </Card>

        <Card>
          <SectionHead title="Risk & Health Scores" sub="customer_profile · churn_risk · health" />
          <div style={{ marginBottom: 16 }}>
            {[
              { l: "customer_health_score", v: chemist.customer_health_score, color: chemist.customer_health_score >= 70 ? C.teal : chemist.customer_health_score >= 45 ? C.amber : C.red },
              { l: "engagement_score", v: chemist.engagement_score, color: C.blue },
              { l: "loyalty_score", v: chemist.loyalty_score, color: C.purple },
              { l: "payment_reliability_score", v: chemist.payment_reliability_score, color: C.teal },
              { l: "churn_risk_score", v: chemist.churn_risk_score, color: C.red },
            ].map(({ l, v, color }) => (
              <div key={l} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ ...mono, fontSize: 11, color: C.sub }}>{l}</span>
                </div>
                <ScoreBar value={v} color={color} />
              </div>
            ))}
          </div>
          <InfoRow label="on_time_payment_rate" value={`${chemist.on_time_payment_rate.toFixed(1)}%`} color={chemist.on_time_payment_rate >= 85 ? C.teal : C.red} />
          <InfoRow label="overdue_amount" value={chemist.overdue_amount > 0 ? `৳${(chemist.overdue_amount / 1000).toFixed(1)}K (${chemist.overdue_days} days)` : "None"} color={chemist.overdue_amount > 0 ? C.red : C.teal} />
          <InfoRow label="yoy_growth_percentage" value={`${chemist.yoy_growth_percentage > 0 ? "+" : ""}${chemist.yoy_growth_percentage.toFixed(1)}%`} color={chemist.yoy_growth_percentage >= 0 ? C.teal : C.red} />
        </Card>
      </div>

      {/* Product purchase mix */}
      <Card style={{ marginBottom: 14 }}>
        <SectionHead title="Product Purchase Mix" sub="customer_product_monthly_summary · affinity_score / loyalty_score" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["product_name", "total_sales_value", "prescription_count", "mom_growth_%", "affinity_score", "loyalty_score", "reorder_likelihood"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {chemistProductData.map((p, i) => (
                <tr key={p.product_name} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                  <Td style={{ fontWeight: 600 }}>{p.product_name}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(p.total_sales_value / 1000).toFixed(0)}K</Td>
                  <Td style={{ color: C.purple }}>{p.prescription_count}</Td>
                  <Td style={{ color: p.mom_growth_percentage >= 0 ? C.teal : C.red, fontWeight: 700 }}>{p.mom_growth_percentage > 0 ? "+" : ""}{p.mom_growth_percentage.toFixed(1)}%</Td>
                  <Td style={{ minWidth: 110 }}><ScoreBar value={p.affinity_score} color={C.blue} /></Td>
                  <Td style={{ minWidth: 110 }}><ScoreBar value={p.loyalty_score} color={C.teal} /></Td>
                  <Td><Chip label={p.reorder_likelihood} color={p.reorder_likelihood === "HIGH" ? C.teal : p.reorder_likelihood === "MEDIUM" ? C.amber : C.red} size="xs" /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AiBox title="ai_insights_summary" text={chemist.ai_insights_summary} />
      <div style={{ background: `${C.teal}08`, border: `1px solid ${C.teal}20`, borderRadius: 8, padding: "12px 14px" }}>
        <span style={{ ...mono, fontSize: 10, color: C.teal, fontWeight: 700 }}>next_best_action: </span>
        <span style={{ ...mono, fontSize: 12, color: C.text }}>{chemist.next_best_action}</span>
      </div>
    </div>
  );
}

function BrandDetail({ brand, onBack }: { brand: typeof brandList[0]; onBack: () => void }) {
  return (
    <div>
      <BackBtn onClick={onBack} label="Brands" />
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #312e81 0%, #4f46e5 100%)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
            <Tag size={24} color="#fff" />
          </div>
          <div>
            <div style={{ ...slab, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{brand.brand_name}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Chip label={brand.category_name} color="rgba(255,255,255,0.7)" />
              <TierBadge tier={brand.performance_tier} />
              <Chip label={brand.competitive_position} color={C.teal} />
              <Chip label={brand.momentum_indicator} color={brand.momentum_indicator === "POSITIVE" ? C.teal : brand.momentum_indicator === "NEGATIVE" ? C.red : C.amber} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[{ l: "rank_in_org", v: `#${brand.rank_in_organization}` }, { l: "market_share", v: `${brand.market_share_estimate}%` }, { l: "brand_health_score", v: brand.brand_health_score.toFixed(1) }].map(({ l, v }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>{l}</div>
              <div style={{ ...mono, fontSize: 18, fontWeight: 700, color: "#fff" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 14 }}>
        <KPI label="total_sales_value" value={`৳${(brand.total_sales_value / 1000000).toFixed(2)}M`} sub={`of ৳${(brand.monthly_sales_target / 1000000).toFixed(2)}M`} color={C.blue} icon={BarChart2} />
        <KPI label="achievement_%" value={`${brand.sales_achievement_percentage.toFixed(1)}%`} sub="monthly_sales_target" delta={brand.sales_achievement_percentage >= 100 ? "Target met" : `Gap ৳${((brand.monthly_sales_target - brand.total_sales_value) / 1000).toFixed(0)}K`} positive={brand.sales_achievement_percentage >= 100} color={brand.sales_achievement_percentage >= 100 ? C.teal : C.red} icon={Target} />
        <KPI label="total_prescription_count" value={brand.total_prescription_count.toLocaleString()} sub={`${brand.unique_prescribing_doctors} prescribers`} delta={`+${brand.new_prescribing_doctors} new`} positive color={C.purple} icon={FileText} />
        <KPI label="brand_health_score" value={brand.brand_health_score.toFixed(1)} sub={`loyalty_index: ${brand.brand_loyalty_index.toFixed(1)}`} color={brand.brand_health_score >= 70 ? C.teal : C.amber} icon={Activity} />
        <KPI label="demand_forecast" value={`৳${(brand.demand_forecast_next_month / 1000000).toFixed(2)}M`} sub={`${brand.demand_confidence_level}% confidence`} color={C.indigo} icon={Brain} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Weekly trend */}
        <Card>
          <SectionHead title="Weekly Sales Trend" sub="brand_weekly_summary · Aug 2025" />
          <ResponsiveContainer width="100%" height={180}>
            <ComposedChart data={brandWeeklyTrend} margin={{ top: 4, right: 4, left: -14, bottom: 0 }}>
              <defs>
                <linearGradient id="brd-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.indigo} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={C.indigo} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" />
              <XAxis dataKey="week" tick={{ ...mono, fill: C.sub, fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <YAxis yAxisId="right" orientation="right" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTip />} />
              <Area key="brd-sales" yAxisId="left" type="monotone" dataKey="sales" name="Sales ৳" stroke={C.indigo} strokeWidth={2} fill="url(#brd-grad)" dot={false} />
              <Line key="brd-rx" yAxisId="right" type="monotone" dataKey="rx" name="Prescriptions" stroke={C.purple} strokeWidth={2} dot={{ fill: C.purple, r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Key metrics */}
        <Card>
          <SectionHead title="Brand Health Metrics" sub="brand_monthly_summary" />
          {[
            { l: "brand_health_score", v: brand.brand_health_score, color: brand.brand_health_score >= 70 ? C.teal : C.amber },
            { l: "brand_loyalty_index", v: brand.brand_loyalty_index, color: C.blue },
            { l: "prescription_growth_rate", v: brand.prescription_growth_rate, color: brand.prescription_growth_rate >= 0 ? C.teal : C.red, isRate: true },
          ].map(({ l, v, color, isRate }) => (
            <div key={l} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ ...mono, fontSize: 11, color: C.sub }}>{l}</span>
                <span style={{ ...mono, fontSize: 11, color, fontWeight: 700 }}>{isRate ? `${v > 0 ? "+" : ""}${v}%` : v}</span>
              </div>
              {!isRate && <ScoreBar value={v as number} color={color} />}
            </div>
          ))}
          {[
            { l: "market_share_estimate", v: `${brand.market_share_estimate}%`, color: C.blue },
            { l: "market_share_change", v: `${brand.market_share_change >= 0 ? "+" : ""}${brand.market_share_change}%`, color: brand.market_share_change >= 0 ? C.teal : C.red },
            { l: "unique_doctors_promoted_to", v: brand.unique_doctors_promoted_to },
            { l: "unique_markets_promoted_in", v: brand.unique_markets_promoted_in },
            { l: "unique_field_force_promoting", v: brand.unique_field_force_promoting },
            { l: "total_sample_count", v: brand.total_sample_count },
            { l: "seasonality_index", v: brand.seasonality_index, color: brand.seasonality_index > 1 ? C.teal : C.sub },
            { l: "risk_level", v: brand.risk_level, color: brand.risk_level === "LOW" ? C.teal : brand.risk_level === "MEDIUM" ? C.amber : C.red },
          ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
        </Card>
      </div>

      {/* Rep performance for this brand */}
      <Card style={{ marginBottom: 14 }}>
        <SectionHead title="Rep Performance (this brand)" sub="field_force_brand_monthly_summary · brand_id=" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["rep_name", "total_sales_value", "achievement_%", "prescription_count"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {brandRepData.map((r, i) => (
                <tr key={r.name} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                  <Td style={{ fontWeight: 600 }}>{r.name}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(r.sales / 1000).toFixed(0)}K</Td>
                  <Td style={{ color: r.achievement >= 100 ? C.teal : r.achievement >= 85 ? C.blue : C.red, fontWeight: 700 }}>{r.achievement.toFixed(1)}%</Td>
                  <Td style={{ color: C.purple, fontWeight: 700 }}>{r.prescription_count}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI insights */}
      <AiBox title="ai_monthly_summary" text={brand.ai_monthly_summary} />
      <AiBox title="ai_strategic_insights" text={brand.ai_strategic_insights} />
      <AiBox title="ai_competitive_analysis" text={brand.ai_competitive_analysis} />
      <AiBox title="ai_demand_commentary" text={brand.ai_demand_commentary} />
    </div>
  );
}

function ProductDetail({ product, onBack }: { product: typeof productList[0]; onBack: () => void }) {
  return (
    <div>
      <BackBtn onClick={onBack} label="Products" />
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #065f46 0%, #059669 100%)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
            <Package size={24} color="#fff" />
          </div>
          <div>
            <div style={{ ...slab, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{product.name}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Chip label={product.sku_code} color="rgba(255,255,255,0.7)" />
              <Chip label={product.brand_name} color="rgba(255,255,255,0.6)" />
              <TierBadge tier={product.performance_tier} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[{ l: "trade_price", v: `৳${product.trade_price}` }, { l: "total_customers", v: product.total_customers }, { l: "performance_score", v: product.performance_score.toFixed(1) }].map(({ l, v }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>{l}</div>
              <div style={{ ...mono, fontSize: 18, fontWeight: 700, color: "#fff" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 14 }}>
        <KPI label="total_sales_value" value={`৳${(product.total_sales_value / 1000000).toFixed(2)}M`} sub="Aug 2025" delta={`${product.sales_growth_percentage > 0 ? "+" : ""}${product.sales_growth_percentage.toFixed(1)}% MoM`} positive={product.sales_growth_percentage >= 0} color={C.blue} icon={BarChart2} />
        <KPI label="achievement_%" value={`${product.sales_achievement_percentage.toFixed(1)}%`} sub="monthly_sales_target" color={product.sales_achievement_percentage >= 100 ? C.teal : product.sales_achievement_percentage >= 85 ? C.blue : C.red} icon={Target} />
        <KPI label="prescription_count" value={product.prescription_count.toLocaleString()} sub={`Rx:Sales ratio ${product.prescription_to_sales_ratio.toFixed(2)}`} color={C.purple} icon={FileText} />
        <KPI label="demand_forecast" value={`৳${(product.demand_forecast_next_month / 1000000).toFixed(2)}M`} sub={`${product.demand_confidence_level}% confidence`} color={C.indigo} icon={Brain} />
        <KPI label="yoy_growth_%" value={`${product.yoy_sales_growth_percentage > 0 ? "+" : ""}${product.yoy_sales_growth_percentage.toFixed(1)}%`} sub="year-on-year" delta={`prev month: ৳${(product.prev_month_sales / 1000000).toFixed(2)}M`} positive={product.yoy_sales_growth_percentage >= 0} color={product.yoy_sales_growth_percentage >= 0 ? C.teal : C.red} icon={TrendingUp} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Card>
          <SectionHead title="Product Details" sub="products table fields" />
          {[
            { l: "product_id", v: product.product_id },
            { l: "sku_code", v: product.sku_code },
            { l: "brand_name", v: product.brand_name },
            { l: "category_name", v: product.category_name },
            { l: "strength", v: product.strength },
            { l: "presentation", v: product.presentation },
            { l: "pack_size", v: product.pack_size },
            { l: "trade_price", v: `৳${product.trade_price}`, color: C.blue },
            { l: "max_retail_price", v: `৳${product.max_retail_price}`, color: C.sub },
            { l: "avg_customer_order_value", v: `৳${(product.avg_customer_order_value / 1000).toFixed(1)}K`, color: C.teal },
          ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
        </Card>

        <Card>
          <SectionHead title="Performance Metrics" sub="product_sku_monthly_summary" />
          <div style={{ marginBottom: 12 }}>
            {[
              { l: "performance_score", v: product.performance_score, color: product.performance_score >= 80 ? C.teal : product.performance_score >= 60 ? C.amber : C.red },
              { l: "prescription_to_sales_ratio", v: product.prescription_to_sales_ratio * 100, color: C.purple },
            ].map(({ l, v, color }) => (
              <div key={l} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ ...mono, fontSize: 11, color: C.sub }}>{l}</span>
                </div>
                <ScoreBar value={v} color={color} />
              </div>
            ))}
          </div>
          {[
            { l: "momentum_indicator", v: product.momentum_indicator, color: product.momentum_indicator === "POSITIVE" ? C.teal : product.momentum_indicator === "NEGATIVE" ? C.red : C.sub },
            { l: "seasonality_index", v: product.seasonality_index, color: product.seasonality_index > 1 ? C.teal : C.sub },
            { l: "seasonality_pattern", v: product.seasonality_pattern },
            { l: "risk_level", v: product.risk_level, color: product.risk_level === "LOW" ? C.teal : C.red },
            { l: "opportunity_level", v: product.opportunity_level, color: product.opportunity_level === "HIGH" ? C.teal : C.amber },
            { l: "requires_attention", v: product.requires_attention ? "YES" : "NO", color: product.requires_attention ? C.red : C.teal },
          ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
        </Card>
      </div>

      {/* Top customers for this product */}
      <Card style={{ marginBottom: 14 }}>
        <SectionHead title="Top Customers (this product)" sub="customer_product_monthly_summary · affinity_score / loyalty_score" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["customer_name", "total_sales_value", "prescription_count", "mom_growth_%", "affinity_score", "loyalty_score", "reorder_likelihood"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {productCustomerData.map((c, i) => (
                <tr key={c.customer_name} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                  <Td style={{ fontWeight: 600 }}>{c.customer_name}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(c.total_sales_value / 1000).toFixed(0)}K</Td>
                  <Td style={{ color: C.purple, fontWeight: 700 }}>{c.prescription_count}</Td>
                  <Td style={{ color: c.mom_growth_percentage >= 0 ? C.teal : C.red, fontWeight: 700 }}>{c.mom_growth_percentage > 0 ? "+" : ""}{c.mom_growth_percentage.toFixed(1)}%</Td>
                  <Td style={{ minWidth: 110 }}><ScoreBar value={c.affinity_score} color={C.blue} /></Td>
                  <Td style={{ minWidth: 110 }}><ScoreBar value={c.loyalty_score} color={C.teal} /></Td>
                  <Td><Chip label={c.reorder_likelihood} color={c.reorder_likelihood === "HIGH" ? C.teal : c.reorder_likelihood === "MEDIUM" ? C.amber : C.red} size="xs" /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI insights */}
      <AiBox title="ai_monthly_summary" text={product.ai_monthly_summary} />
      <AiBox title="ai_strategic_insights" text={product.ai_strategic_insights} />
      <AiBox title="ai_demand_commentary" text={product.ai_demand_commentary} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIST SECTIONS (with clickable rows)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Overview data ────────────────────────────────────────────────────────────

const allBrands = [
  { brand_id: 1,  brand_name: "CardioMax",     category: "Cardiovascular", total_sales_value: 4820000, prev_month_sales: 4460000, market_share: 18.2, performance_tier: "STAR",    rank: 1 },
  { brand_id: 5,  brand_name: "Pulmovax",      category: "Respiratory",    total_sales_value: 4210000, prev_month_sales: 3980000, market_share: 15.1, performance_tier: "STAR",    rank: 2 },
  { brand_id: 2,  brand_name: "DiabaCare XR",  category: "Diabetes",       total_sales_value: 3410000, prev_month_sales: 3750000, market_share: 12.7, performance_tier: "AVERAGE", rank: 3 },
  { brand_id: 3,  brand_name: "NeuroPlex 500", category: "Neurology",      total_sales_value: 2980000, prev_month_sales: 2860000, market_share:  9.4, performance_tier: "GOOD",    rank: 4 },
  { brand_id: 6,  brand_name: "OncoClear",     category: "Oncology",       total_sales_value: 2180000, prev_month_sales: 2520000, market_share:  6.8, performance_tier: "POOR",    rank: 5 },
  { brand_id: 7,  brand_name: "GastroPro",     category: "Gastro",         total_sales_value: 1940000, prev_month_sales: 1810000, market_share:  5.9, performance_tier: "GOOD",    rank: 6 },
  { brand_id: 8,  brand_name: "NeuroCalm",     category: "Psychiatry",     total_sales_value: 1720000, prev_month_sales: 1680000, market_share:  5.2, performance_tier: "AVERAGE", rank: 7 },
  { brand_id: 9,  brand_name: "HepaCure",      category: "Hepatology",     total_sales_value: 1480000, prev_month_sales: 1390000, market_share:  4.4, performance_tier: "GOOD",    rank: 8 },
  { brand_id: 10, brand_name: "RenalShield",   category: "Nephrology",     total_sales_value: 1260000, prev_month_sales: 1310000, market_share:  3.8, performance_tier: "AVERAGE", rank: 9 },
  { brand_id: 11, brand_name: "DermaFix",      category: "Dermatology",    total_sales_value: 1080000, prev_month_sales:  980000, market_share:  3.2, performance_tier: "GOOD",    rank: 10 },
  { brand_id: 12, brand_name: "OrthoFlex",     category: "Orthopaedics",   total_sales_value:  840000, prev_month_sales:  870000, market_share:  2.5, performance_tier: "AVERAGE", rank: 11 },
  { brand_id: 13, brand_name: "VisionPro",     category: "Ophthalmology",  total_sales_value:  660000, prev_month_sales:  720000, market_share:  2.0, performance_tier: "POOR",    rank: 12 },
];

const top10Employees = [
  { rank: 1,  name: "Rashida Khanam",  code: "F10312", territory: "Chittagong",  sales: 398200, achievement: 112.4, rx: 428, score: 94.1, tier: "STAR" },
  { rank: 2,  name: "Nadia Islam",     code: "F10441", territory: "Rajshahi",    sales: 374100, achievement: 106.9, rx: 391, score: 91.8, tier: "STAR" },
  { rank: 3,  name: "Abdul Motaleb",   code: "F10245", territory: "Dhaka",       sales: 312450, achievement:  97.6, rx: 312, score: 82.4, tier: "STAR" },
  { rank: 4,  name: "Farzana Akter",   code: "F10722", territory: "Mymensingh",  sales: 341800, achievement: 103.6, rx: 364, score: 88.9, tier: "STAR" },
  { rank: 5,  name: "Sumaiya Begum",   code: "F10523", territory: "Barisal",     sales: 286300, achievement:  91.2, rx: 294, score: 77.6, tier: "GOOD" },
  { rank: 6,  name: "Karim Uddin",     code: "F10198", territory: "Sylhet",      sales: 248600, achievement:  82.9, rx: 241, score: 71.3, tier: "GOOD" },
  { rank: 7,  name: "Ratan Das",       code: "F10831", territory: "Faridpur",    sales: 231400, achievement:  79.8, rx: 218, score: 68.2, tier: "GOOD" },
  { rank: 8,  name: "Mina Akter",      code: "F10644", territory: "Cumilla",     sales: 218900, achievement:  76.4, rx: 204, score: 65.7, tier: "GOOD" },
  { rank: 9,  name: "Tanvir Hassan",   code: "F10614", territory: "Comilla",     sales: 224100, achievement:  74.7, rx: 209, score: 64.4, tier: "AVERAGE" },
  { rank: 10, name: "Jahangir Alam",   code: "F10087", territory: "Khulna",      sales: 198400, achievement:  66.1, rx: 178, score: 58.2, tier: "AVERAGE" },
];

const top10Chemists = [
  { rank: 1,  name: "Medinova Drug Store",  city: "Rajshahi",    sales: 58000,  growth: 9.8,   health: 91.2, churn: "LOW",    tier: "GOLD" },
  { rank: 2,  name: "Modina Pharmacy",      city: "Dhaka",       sales: 42000,  growth: -4.2,  health: 88.5, churn: "LOW",    tier: "GOLD" },
  { rank: 3,  name: "City Medical Hall",    city: "Sylhet",      sales: 35000,  growth: 6.4,   health: 74.0, churn: "LOW",    tier: "SILVER" },
  { rank: 4,  name: "HealthPoint Pharmacy", city: "Chittagong",  sales: 31400,  growth: 11.2,  health: 82.4, churn: "LOW",    tier: "GOLD" },
  { rank: 5,  name: "Sunrise Medical",      city: "Barishal",    sales: 28900,  growth: 3.8,   health: 69.1, churn: "LOW",    tier: "SILVER" },
  { rank: 6,  name: "MA Pharmacy",          city: "Dhaka",       sales: 26000,  growth: 2.1,   health: 61.5, churn: "MEDIUM", tier: "SILVER" },
  { rank: 7,  name: "Metro Drug Store",     city: "Comilla",     sales: 22400,  growth: -1.4,  health: 64.8, churn: "LOW",    tier: "SILVER" },
  { rank: 8,  name: "Al-Amin Pharmacy",     city: "Mymensingh",  sales: 19800,  growth: 14.6,  health: 78.2, churn: "LOW",    tier: "SILVER" },
  { rank: 9,  name: "Green Cross Pharmacy", city: "Gazipur",     sales: 17200,  growth: -6.1,  health: 52.4, churn: "MEDIUM", tier: "BRONZE" },
  { rank: 10, name: "LifeCare Pharmacy",    city: "Chittagong",  sales: 8000,   growth: -12.5, health: 39.0, churn: "HIGH",   tier: "BRONZE" },
];

const top10Doctors = [
  { rank: 1,  name: "Dr. Abdur Rahim",      speciality: "Cardiologist",    city: "Dhaka",      rx: 31,  visits: 6,  engagement: 88.7, capacity: 820000, status: "ACTIVE" },
  { rank: 2,  name: "Dr. Selina Akhter",    speciality: "Diabetologist",   city: "Gazipur",    rx: 24,  visits: 5,  engagement: 85.2, capacity: 620000, status: "ACTIVE" },
  { rank: 3,  name: "Dr. Rafiqul Islam",    speciality: "Neurologist",     city: "Chittagong", rx: 28,  visits: 7,  engagement: 81.6, capacity: 710000, status: "ACTIVE" },
  { rank: 4,  name: "Dr. Kawser Mia",       speciality: "GP",              city: "Dhaka",      rx: 18,  visits: 8,  engagement: 78.4, capacity: 480000, status: "ACTIVE" },
  { rank: 5,  name: "Dr. Nasreen Sultana",  speciality: "Endocrinologist", city: "Rajshahi",   rx: 22,  visits: 6,  engagement: 84.1, capacity: 740000, status: "ACTIVE" },
  { rank: 6,  name: "Dr. Mamun Hossain",    speciality: "Pulmonologist",   city: "Sylhet",     rx: 19,  visits: 5,  engagement: 76.9, capacity: 560000, status: "ACTIVE" },
  { rank: 7,  name: "Dr. Roksana Begum",    speciality: "Oncologist",      city: "Chittagong", rx: 14,  visits: 4,  engagement: 72.3, capacity: 890000, status: "ACTIVE" },
  { rank: 8,  name: "Dr. Kamal Hossain",    speciality: "GP",              city: "Khulna",     rx: 16,  visits: 6,  engagement: 68.8, capacity: 420000, status: "ACTIVE" },
  { rank: 9,  name: "Dr. Anwar Ibrahim",    speciality: "Nephrologist",    city: "Mymensingh", rx: 12,  visits: 4,  engagement: 65.4, capacity: 640000, status: "ACTIVE" },
  { rank: 10, name: "Dr. Abdul Motin",      speciality: "GP",              city: "Narayanganj",rx: 7,   visits: 3,  engagement: 49.1, capacity: 360000, status: "AT_RISK" },
];

const sixMonthTrend = [
  { month: "Mar", sales: 15800000, target: 17000000, rx: 11400, doctors_visited: 198, chemists_visited: 412, collection: 14200000 },
  { month: "Apr", sales: 16400000, target: 18000000, rx: 12100, doctors_visited: 214, chemists_visited: 438, collection: 14900000 },
  { month: "May", sales: 15100000, target: 18000000, rx: 11000, doctors_visited: 196, chemists_visited: 401, collection: 13600000 },
  { month: "Jun", sales: 17200000, target: 19000000, rx: 13200, doctors_visited: 228, chemists_visited: 461, collection: 15800000 },
  { month: "Jul", sales: 16900000, target: 19000000, rx: 12800, doctors_visited: 219, chemists_visited: 448, collection: 15400000 },
  { month: "Aug", sales: 18420000, target: 20000000, rx: 14820, doctors_visited: 241, chemists_visited: 486, collection: 16800000 },
];

const BRAND_COLORS = [C.blue, C.teal, C.purple, C.orange, C.amber, C.red, C.indigo, "#10b981", "#f43f5e", "#0891b2", "#6366f1", "#84cc16"];

function SectionOverview() {
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>(allBrands.slice(0, 10).map(b => b.brand_id));
  const [brandDropOpen, setBrandDropOpen] = useState(false);

  const toggleBrand = (id: number) => {
    setSelectedBrandIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 10 ? [...prev, id] : prev
    );
  };

  const selectedBrands = allBrands.filter(b => selectedBrandIds.includes(b.brand_id));
  const otherBrandsTotal = allBrands.filter(b => !selectedBrandIds.includes(b.brand_id)).reduce((s, b) => s + b.total_sales_value, 0);
  const pieData = [
    ...selectedBrands.map((b, i) => ({ name: b.brand_name, value: Math.round(b.market_share), color: BRAND_COLORS[i % BRAND_COLORS.length] })),
    ...(otherBrandsTotal > 0 ? [{ name: "Others", value: Math.round(allBrands.filter(b => !selectedBrandIds.includes(b.brand_id)).reduce((s, b) => s + b.market_share, 0) * 10) / 10, color: C.dim }] : []),
  ];

  // coverage data
  const docCoverage = { total: 284, visited: 241, visitedPct: 84.9, top_tier: 124, top_tier_pct: 43.7, new_this_month: 27, inactive: 38, avg_visit_freq: 3.2, avg_engagement: 68.4 };
  const chemCoverage = { total: 612, visited: 486, visitedPct: 79.4, gold: 48, silver: 142, bronze: 422, overdue: 31, avg_health: 62.4, new_this_month: 14, high_churn: 31 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Row 1: Core KPIs ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <KPI label="Total Sales Value" value={`৳${(orgKPIs.total_sales_value / 1000000).toFixed(2)}M`} sub={`৳${(orgKPIs.monthly_sales_target / 1000000).toFixed(0)}M target · ${orgKPIs.target_achievement_percentage}% achieved`} delta="+8.9%" positive color={C.blue} icon={BarChart2} />
        <KPI label="Total Prescriptions" value={orgKPIs.total_prescription_count.toLocaleString()} sub="unique prescribers: 241 this month" delta="+11.2%" positive color={C.teal} icon={FileText} />
        <KPI label="Total Collections" value={`৳${(orgKPIs.total_collections / 1000000).toFixed(2)}M`} sub={`${orgKPIs.collection_achievement_percentage}% of collection target`} delta="-2.4%" positive={false} color={C.amber} icon={Shield} />
        <KPI label="Active Field Reps" value={orgKPIs.total_active_reps} sub={`${orgKPIs.total_markets} territories · 3 tiers`} color={C.purple} icon={Users} />
      </div>

      {/* ── Row 2: Doctor Coverage | Chemist Coverage | Top 10 Brand Pie ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.6fr", gap: 14 }}>

        {/* Doctor Coverage */}
        <Card style={{ border: `1px solid ${C.blue}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ width: 32, height: 32, background: `${C.blue}12`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><Stethoscope size={16} color={C.blue} /></span>
            <div><div style={{ ...slab, fontSize: 13, fontWeight: 700, color: C.text }}>Doctor Coverage</div><div style={{ ...mono, fontSize: 10, color: C.sub }}>doctor_monthly_summary</div></div>
          </div>
          {/* Coverage ring */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
              <ResponsiveContainer width={80} height={80}>
                <PieChart>
                  <Pie data={[{ v: docCoverage.visitedPct }, { v: 100 - docCoverage.visitedPct }]} dataKey="v" cx="50%" cy="50%" innerRadius={27} outerRadius={38} startAngle={90} endAngle={-270} paddingAngle={2}>
                    <Cell fill={C.blue} /><Cell fill={C.dim} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: C.blue }}>{docCoverage.visitedPct}%</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...mono, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 2 }}>{docCoverage.visited}<span style={{ fontSize: 13, color: C.sub, fontWeight: 400 }}> / {docCoverage.total}</span></div>
              <div style={{ ...mono, fontSize: 11, color: C.sub }}>doctors visited this month</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { l: "top_tier_doctors_visited", v: `${docCoverage.top_tier} (${docCoverage.top_tier_pct}%)`, color: C.teal },
              { l: "new_prescribers_this_month", v: docCoverage.new_this_month, color: C.blue },
              { l: "inactive_doctors", v: docCoverage.inactive, color: C.amber },
              { l: "avg_visit_frequency", v: `${docCoverage.avg_visit_freq}x/month`, color: C.sub },
              { l: "avg_engagement_score", v: docCoverage.avg_engagement.toFixed(1), color: docCoverage.avg_engagement >= 70 ? C.teal : C.amber },
            ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
          </div>
        </Card>

        {/* Chemist Coverage */}
        <Card style={{ border: `1px solid ${C.orange}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ width: 32, height: 32, background: `${C.orange}12`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><Store size={16} color={C.orange} /></span>
            <div><div style={{ ...slab, fontSize: 13, fontWeight: 700, color: C.text }}>Chemist Coverage</div><div style={{ ...mono, fontSize: 10, color: C.sub }}>customer_profile · monthly</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
              <ResponsiveContainer width={80} height={80}>
                <PieChart>
                  <Pie data={[{ v: chemCoverage.visitedPct }, { v: 100 - chemCoverage.visitedPct }]} dataKey="v" cx="50%" cy="50%" innerRadius={27} outerRadius={38} startAngle={90} endAngle={-270} paddingAngle={2}>
                    <Cell fill={C.orange} /><Cell fill={C.dim} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: C.orange }}>{chemCoverage.visitedPct}%</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...mono, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 2 }}>{chemCoverage.visited}<span style={{ fontSize: 13, color: C.sub, fontWeight: 400 }}> / {chemCoverage.total}</span></div>
              <div style={{ ...mono, fontSize: 11, color: C.sub }}>chemists visited this month</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { l: "GOLD tier chemists", v: chemCoverage.gold, color: C.amber },
              { l: "SILVER tier chemists", v: chemCoverage.silver, color: C.blue },
              { l: "BRONZE tier chemists", v: chemCoverage.bronze, color: C.sub },
              { l: "new_chemists_this_month", v: chemCoverage.new_this_month, color: C.teal },
              { l: "high_churn_risk (requires action)", v: chemCoverage.high_churn, color: C.red },
              { l: "avg_customer_health_score", v: chemCoverage.avg_health.toFixed(1), color: chemCoverage.avg_health >= 70 ? C.teal : C.amber },
            ].map(({ l, v, color }) => <InfoRow key={l} label={l} value={v} color={color} />)}
          </div>
        </Card>

        {/* Top 10 Brand Pie — customizable */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ ...slab, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 2 }}>Top 10 Brand Performance</div>
              <div style={{ ...mono, fontSize: 10, color: C.sub }}>brand_monthly_summary · market_share_estimate</div>
            </div>
            {/* Brand selector */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setBrandDropOpen(p => !p)}
                style={{ ...mono, fontSize: 11, color: C.blue, background: `${C.blue}10`, border: `1px solid ${C.blue}25`, padding: "5px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
              >
                Customize ({selectedBrandIds.length}/10) <ChevronDown size={11} />
              </button>
              {brandDropOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(15,30,80,0.15)", zIndex: 99, minWidth: 220, padding: "8px 0", maxHeight: 280, overflowY: "auto" }}>
                  <div style={{ ...mono, fontSize: 10, color: C.sub, textTransform: "uppercase" as const, letterSpacing: "0.08em", padding: "0 14px 6px" }}>Select up to 10 brands</div>
                  {allBrands.map(b => {
                    const sel = selectedBrandIds.includes(b.brand_id);
                    return (
                      <button key={b.brand_id} onClick={() => toggleBrand(b.brand_id)}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: sel ? `${C.blue}08` : "transparent", border: "none", cursor: "pointer", textAlign: "left" as const }}>
                        <span style={{ width: 16, height: 16, borderRadius: 4, background: sel ? C.blue : "transparent", border: `2px solid ${sel ? C.blue : C.dim}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {sel && <CheckCircle2 size={10} color="#fff" />}
                        </span>
                        <span style={{ ...mono, fontSize: 12, color: C.text }}>{b.brand_name}</span>
                        <span style={{ ...mono, fontSize: 10, color: C.sub, marginLeft: "auto" }}>{b.market_share}%</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={72} paddingAngle={1.5}>
                  {pieData.map((entry, i) => <Cell key={`pie-${i}`} fill={entry.color} stroke={C.surface} strokeWidth={1.5} />)}
                </Pie>
                <Tooltip contentStyle={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, ...mono, fontSize: 12, color: C.text }} formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              {pieData.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: b.color, flexShrink: 0 }} />
                  <span style={{ ...mono, fontSize: 10, color: C.sub, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{b.name}</span>
                  <span style={{ ...mono, fontSize: 11, color: b.name === "Others" ? C.dim : b.color, fontWeight: 700 }}>{b.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── Row 3: Top 10 Employee | Top 10 Chemist ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <SectionHead title="Top 10 Employees" sub="field_force_monthly_summary · performance_rank · Aug 2025" right={<Chip label="BY SCORE" color={C.blue} />} />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["#", "name", "territory", "sales", "achievement_%", "RX", "score"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {top10Employees.map((r, i) => (
                <tr key={r.code} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                  <Td>
                    <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: i < 3 ? [C.amber, C.sub, C.orange][i] : C.dim }}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${r.rank}`}
                    </span>
                  </Td>
                  <Td><div style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</div><div style={{ ...mono, fontSize: 10, color: C.sub }}>{r.code}</div></Td>
                  <Td style={{ color: C.sub, fontSize: 11 }}>{r.territory}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(r.sales / 1000).toFixed(0)}K</Td>
                  <Td style={{ color: r.achievement >= 100 ? C.teal : r.achievement >= 85 ? C.blue : C.red, fontWeight: 700 }}>{r.achievement}%</Td>
                  <Td style={{ color: C.purple, fontWeight: 600 }}>{r.rx}</Td>
                  <Td style={{ minWidth: 80 }}><ScoreBar value={r.score} color={r.score >= 80 ? C.teal : r.score >= 65 ? C.blue : C.amber} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <SectionHead title="Top 10 Chemists" sub="customer_monthly_summary · total_sales_value · Aug 2025" right={<Chip label="BY SALES" color={C.orange} />} />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["#", "customer_name", "city", "tier", "sales_value", "mom_%", "health_score", "churn_risk"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {top10Chemists.map((c, i) => (
                <tr key={c.rank} style={{ borderBottom: `1px solid ${C.border2}`, background: c.churn === "HIGH" ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2 }}>
                  <Td><span style={{ ...mono, fontSize: 12, fontWeight: 700, color: i < 3 ? [C.amber, C.sub, C.orange][i] : C.dim }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${c.rank}`}</span></Td>
                  <Td style={{ fontWeight: 600, fontSize: 12 }}>{c.name}</Td>
                  <Td style={{ color: C.sub, fontSize: 11 }}>{c.city}</Td>
                  <Td><Chip label={c.tier} color={c.tier === "GOLD" ? C.amber : c.tier === "SILVER" ? C.blue : C.sub} size="xs" /></Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(c.sales / 1000).toFixed(0)}K</Td>
                  <Td style={{ color: c.growth >= 0 ? C.teal : C.red, fontWeight: 600 }}>{c.growth > 0 ? "+" : ""}{c.growth.toFixed(1)}%</Td>
                  <Td style={{ minWidth: 80 }}><ScoreBar value={c.health} color={c.health >= 70 ? C.teal : c.health >= 45 ? C.amber : C.red} /></Td>
                  <Td><RiskBadge level={c.churn} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Row 4: Top 10 Doctor | Top 10 Brand by Sales ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <SectionHead title="Top 10 Doctors" sub="doctor_monthly_summary · prescription_count · Aug 2025" right={<Chip label="BY RX" color={C.indigo} />} />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["#", "doctor_name", "speciality", "city", "Rx", "visits", "engagement", "status"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {top10Doctors.map((d, i) => (
                <tr key={d.rank} style={{ borderBottom: `1px solid ${C.border2}`, background: d.status === "AT_RISK" ? `${C.amber}05` : i % 2 === 0 ? "transparent" : C.card2 }}>
                  <Td><span style={{ ...mono, fontSize: 12, fontWeight: 700, color: i < 3 ? [C.amber, C.sub, C.orange][i] : C.dim }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${d.rank}`}</span></Td>
                  <Td style={{ fontWeight: 600, fontSize: 12 }}>{d.name}</Td>
                  <Td><Chip label={d.speciality} color={C.indigo} size="xs" /></Td>
                  <Td style={{ color: C.sub, fontSize: 11 }}>{d.city}</Td>
                  <Td style={{ color: C.purple, fontWeight: 700 }}>{d.rx}</Td>
                  <Td style={{ color: C.sub }}>{d.visits}</Td>
                  <Td style={{ minWidth: 80 }}><ScoreBar value={d.engagement} color={d.engagement >= 75 ? C.teal : d.engagement >= 55 ? C.amber : C.red} /></Td>
                  <Td><Chip label={d.status === "ACTIVE" ? "Active" : "At Risk"} color={d.status === "ACTIVE" ? C.teal : C.amber} size="xs" /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <SectionHead title="Top 10 Brands by Sales" sub="brand_monthly_summary · total_sales_value · Aug 2025" right={<Chip label="BY REVENUE" color={C.teal} />} />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["#", "brand_name", "category", "sales_value", "mom_growth", "market_%", "tier", "rank_Δ"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {allBrands.slice(0, 10).map((b, i) => {
                const mom = ((b.total_sales_value - b.prev_month_sales) / b.prev_month_sales) * 100;
                const momAbs = Math.abs(mom);
                return (
                  <tr key={b.brand_id} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                    <Td>
                      <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: i < 3 ? [C.amber, C.sub, C.orange][i] : C.dim }}>
                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${b.rank}`}
                      </span>
                    </Td>
                    <Td style={{ fontWeight: 700, fontSize: 12 }}>{b.brand_name}</Td>
                    <Td style={{ color: C.sub, fontSize: 10 }}>{b.category}</Td>
                    <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(b.total_sales_value / 1000000).toFixed(2)}M</Td>
                    <Td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: mom >= 0 ? C.teal : C.red }}>
                          {mom >= 0 ? "▲" : "▼"} {momAbs.toFixed(1)}%
                        </span>
                        <span style={{ ...mono, fontSize: 10, color: mom >= 0 ? C.teal : C.red, background: mom >= 0 ? `${C.teal}10` : `${C.red}10`, border: `1px solid ${mom >= 0 ? C.teal : C.red}25`, padding: "1px 6px", borderRadius: 4 }}>
                          {mom >= 0 ? "+" : ""}৳{Math.abs((b.total_sales_value - b.prev_month_sales) / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </Td>
                    <Td style={{ color: C.teal, fontWeight: 600 }}>{b.market_share}%</Td>
                    <Td><TierBadge tier={b.performance_tier} /></Td>
                    <Td>
                      <span style={{ ...mono, fontSize: 11, color: i < 2 ? C.teal : i >= 8 ? C.red : C.sub }}>
                        {i === 0 ? "▲ 0" : i < 3 ? `▲ ${i}` : i >= 8 ? `▼ ${i - 7}` : "—"}
                      </span>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Row 5: AI Recommendation + 6-Month Trend ── */}
      <Card style={{ border: `1px solid ${C.purple}22`, background: `${C.purple}03` }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
          <Brain size={16} color={C.purple} />
          <span style={{ ...slab, fontSize: 14, fontWeight: 700, color: C.text }}>AI Strategic Recommendations</span>
          <span style={{ ...mono, fontSize: 10, color: C.purple, background: `${C.purple}12`, border: `1px solid ${C.purple}28`, padding: "2px 8px", borderRadius: 4, marginLeft: 4 }}>LAST 6 MONTHS ANALYSIS · Mar–Aug 2025</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
          {/* Trend chart */}
          <div>
            <div style={{ ...mono, fontSize: 10, color: C.sub, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8 }}>6-Month Multi-KPI Trend</div>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={sixMonthTrend} margin={{ top: 4, right: 4, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="ai-sales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.blue} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ai-col" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.amber} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={C.amber} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" />
                <XAxis dataKey="month" tick={{ ...mono, fill: C.sub, fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis yAxisId="money" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
                <YAxis yAxisId="count" orientation="right" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTip />} />
                <Area key="ai-s" yAxisId="money" type="monotone" dataKey="sales" name="Sales ৳" stroke={C.blue} strokeWidth={2} fill="url(#ai-sales)" dot={false} activeDot={{ r: 4 }} />
                <Area key="ai-c" yAxisId="money" type="monotone" dataKey="collection" name="Collection ৳" stroke={C.amber} strokeWidth={1.5} fill="url(#ai-col)" dot={false} />
                <Line key="ai-rx" yAxisId="count" type="monotone" dataKey="rx" name="Prescriptions" stroke={C.purple} strokeWidth={2} dot={{ fill: C.purple, r: 3 }} />
                <Line key="ai-dr" yAxisId="count" type="monotone" dataKey="doctors_visited" name="Doctors Visited" stroke={C.teal} strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* AI recommendations */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: TrendingUp, color: C.teal, title: "Sales Growth Accelerating", body: "6-month CAGR at 14.2%. Aug is the strongest month (+8.9% MoM). Sustain momentum by increasing brand sampling in underperforming territories.", priority: "HIGH" },
              { icon: AlertTriangle, color: C.red, title: "Collection Gap Widening", body: "Collection grew only 4.1% vs sales growth of 8.9% — gap is ৳1.6M. DiabaCare XR and OncoClear territories show highest outstanding. Immediate recovery campaign needed.", priority: "URGENT" },
              { icon: TrendingUp, color: C.blue, title: "Prescription Pipeline Strong", body: "Rx grew 11.2% MoM with 27 new prescribers. Top 10 doctors generating 48% of all Rx — strong dependency. Diversify prescriber base in Chittagong and Rajshahi.", priority: "MEDIUM" },
              { icon: Zap, color: C.purple, title: "Doctor Coverage Opportunity", body: "15.1% of doctors (43 out of 284) were not visited this month. These doctors have an estimated combined capacity of ৳2.8M/year. Targeted outreach could add ৳420K/month.", priority: "HIGH" },
            ].map((rec, i) => {
              const Icon = rec.icon;
              return (
                <div key={i} style={{ background: `${rec.color}08`, border: `1px solid ${rec.color}20`, borderRadius: 7, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                      <Icon size={13} color={rec.color} />
                      <span style={{ ...mono, fontSize: 11, fontWeight: 700, color: C.text }}>{rec.title}</span>
                    </div>
                    <Chip label={rec.priority} color={rec.priority === "URGENT" ? C.red : rec.priority === "HIGH" ? C.amber : C.blue} size="xs" />
                  </div>
                  <p style={{ ...mono, fontSize: 11, color: C.sub, lineHeight: 1.65 }}>{rec.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

const ClickHint = () => <span style={{ ...mono, fontSize: 10, color: C.blue, background: `${C.blue}10`, border: `1px solid ${C.blue}20`, padding: "3px 8px", borderRadius: 5 }}>Click row for full detail →</span>;

// ─── Reusable AI Feedback panel ───────────────────────────────────────────────
type AIInsight = { type: "opportunity" | "warning" | "info" | "critical"; title: string; body: string; action?: string };
function AIFeedback({ context, insights }: { context: string; insights: AIInsight[] }) {
  const iconMap = { opportunity: Zap, warning: AlertTriangle, info: Brain, critical: AlertCircle };
  const colorMap = { opportunity: C.teal, warning: C.amber, info: C.purple, critical: C.red };
  return (
    <Card style={{ border: `1px solid ${C.purple}22`, background: `${C.purple}03`, marginTop: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ width: 30, height: 30, background: `${C.purple}14`, border: `1px solid ${C.purple}25`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Brain size={15} color={C.purple} />
        </span>
        <div>
          <div style={{ ...slab, fontSize: 13, fontWeight: 700, color: C.text }}>AI Feedback</div>
          <div style={{ ...mono, fontSize: 10, color: C.sub }}>{context}</div>
        </div>
        <span style={{ ...mono, fontSize: 9, color: C.purple, background: `${C.purple}10`, border: `1px solid ${C.purple}22`, padding: "2px 8px", borderRadius: 3, marginLeft: "auto", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>AI GENERATED</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
        {insights.map((ins, i) => {
          const Icon = iconMap[ins.type];
          const color = colorMap[ins.type];
          return (
            <div key={i} style={{ background: `${color}07`, border: `1px solid ${color}20`, borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                <Icon size={13} color={color} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ ...mono, fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{ins.title}</span>
              </div>
              <p style={{ ...mono, fontSize: 11, color: C.sub, lineHeight: 1.7, marginBottom: ins.action ? 8 : 0 }}>{ins.body}</p>
              {ins.action && (
                <button style={{ ...mono, fontSize: 11, color, background: "transparent", border: "none", cursor: "pointer", fontWeight: 700, padding: 0 }}>{ins.action} →</button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ─── Sales section data ───────────────────────────────────────────────────────
const salesByTerritory = [
  { territory: "Dhaka",       sales: 5840000, target: 6200000, achievement: 94.2, reps: 12, collections: 5210000 },
  { territory: "Chittagong",  sales: 4210000, target: 4000000, achievement: 105.3, reps: 9,  collections: 3980000 },
  { territory: "Rajshahi",    sales: 2980000, target: 3200000, achievement: 93.1, reps: 6,  collections: 2640000 },
  { territory: "Sylhet",      sales: 2140000, target: 2400000, achievement: 89.2, reps: 5,  collections: 1860000 },
  { territory: "Barishal",    sales: 1620000, target: 2000000, achievement: 81.0, reps: 4,  collections: 1380000 },
  { territory: "Khulna",      sales: 1180000, target: 1800000, achievement: 65.6, reps: 4,  collections: 980000  },
  { territory: "Comilla",     sales:  980000, target: 1200000, achievement: 81.7, reps: 3,  collections: 820000  },
  { territory: "Mymensingh",  sales: 1070000, target: 1200000, achievement: 89.2, reps: 4,  collections: 930000  },
];

const monthlySalesBrand = [
  { month: "Mar", CardioMax: 3900000, DiabaCare: 3100000, Pulmovax: 3500000, NeuroPlex: 2400000 },
  { month: "Apr", CardioMax: 4100000, DiabaCare: 3400000, Pulmovax: 3700000, NeuroPlex: 2600000 },
  { month: "May", CardioMax: 3800000, DiabaCare: 3600000, Pulmovax: 3400000, NeuroPlex: 2300000 },
  { month: "Jun", CardioMax: 4400000, DiabaCare: 3200000, Pulmovax: 3900000, NeuroPlex: 2700000 },
  { month: "Jul", CardioMax: 4600000, DiabaCare: 3500000, Pulmovax: 4100000, NeuroPlex: 2800000 },
  { month: "Aug", CardioMax: 4820000, DiabaCare: 3410000, Pulmovax: 4210000, NeuroPlex: 2980000 },
];

const orderSummary = {
  total_orders: 3842, total_order_value: 19280000,
  total_cash_orders: 1540, total_credit_orders: 2302,
  cash_value: 7712000, credit_value: 11568000,
  cancelled_orders: 184, cancelled_value: 920000,
  total_invoices: 3658, rejected_invoices: 94,
  total_returns: 312, return_value: 1560000,
  net_sales_value: 18420000,
  avg_order_value: 5020,
};

const collectionTrend = [
  { month: "Mar", billed: 15800000, collected: 14200000, outstanding: 4200000 },
  { month: "Apr", billed: 16400000, collected: 14900000, outstanding: 5700000 },
  { month: "May", billed: 15100000, collected: 13600000, outstanding: 7200000 },
  { month: "Jun", billed: 17200000, collected: 15800000, outstanding: 8600000 },
  { month: "Jul", billed: 16900000, collected: 15400000, outstanding: 10100000 },
  { month: "Aug", billed: 18420000, collected: 16800000, outstanding: 11720000 },
];

function SectionSales() {
  const [salesView, setSalesView] = useState<"territory" | "brand">("territory");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        <KPI label="Net Sales Value" value={`৳${(orderSummary.net_sales_value / 1000000).toFixed(2)}M`} sub="total_sales_value · Aug 2025" delta="+8.9%" positive color={C.blue} icon={BarChart2} />
        <KPI label="Total Orders" value={orderSummary.total_orders.toLocaleString()} sub={`${orderSummary.cancelled_orders} cancelled · ৳${(orderSummary.cancelled_value / 1000).toFixed(0)}K lost`} color={C.teal} icon={FileText} />
        <KPI label="Total Returns" value={orderSummary.total_returns} sub={`return_value: ৳${(orderSummary.return_value / 1000000).toFixed(2)}M`} delta="-৳156K vs Jul" positive={false} color={C.red} icon={RefreshCw} />
        <KPI label="Cash vs Credit" value={`${Math.round(orderSummary.cash_value / orderSummary.total_order_value * 100)}% Cash`} sub={`৳${(orderSummary.cash_value / 1000000).toFixed(1)}M · ৳${(orderSummary.credit_value / 1000000).toFixed(1)}M`} color={C.amber} icon={Shield} />
        <KPI label="Avg Order Value" value={`৳${orderSummary.avg_order_value.toLocaleString()}`} sub={`${orderSummary.total_invoices} invoices · ${orderSummary.rejected_invoices} rejected`} color={C.purple} icon={Target} />
      </div>

      {/* Sales by Territory / Brand toggle */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ ...slab, fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 2 }}>
              {salesView === "territory" ? "Sales by Territory" : "Sales by Brand (Top 4 — 6 months)"}
            </div>
            <div style={{ ...mono, fontSize: 11, color: C.sub }}>
              {salesView === "territory" ? "field_force_monthly_summary · territory · Aug 2025" : "field_force_brand_monthly_summary · Mar–Aug 2025"}
            </div>
          </div>
          <div style={{ display: "flex", background: C.pill, borderRadius: 8, padding: 3, border: `1px solid ${C.border}` }}>
            {(["territory", "brand"] as const).map(v => (
              <button key={v} onClick={() => setSalesView(v)} style={{ ...mono, fontSize: 11, padding: "5px 14px", borderRadius: 6, border: "none", background: salesView === v ? C.blue : "transparent", color: salesView === v ? "#fff" : C.sub, cursor: "pointer", fontWeight: salesView === v ? 600 : 400, transition: "all 0.15s" }}>
                {v === "territory" ? "By Territory" : "By Brand"}
              </button>
            ))}
          </div>
        </div>

        {salesView === "territory" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart layout="vertical" data={[...salesByTerritory].sort((a, b) => b.sales - a.sales)} margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" horizontal={false} />
                <XAxis type="number" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="territory" tick={{ ...mono, fill: C.text, fontSize: 11 }} tickLine={false} axisLine={false} width={80} />
                <Tooltip content={<ChartTip />} />
                <Bar key="terr-sales" dataKey="sales" name="Sales ৳" radius={[0, 4, 4, 0]} maxBarSize={16}>
                  {salesByTerritory.sort((a, b) => b.sales - a.sales).map((t, i) => <Cell key={`tc-${i}`} fill={t.achievement >= 100 ? C.teal : t.achievement >= 85 ? C.blue : t.achievement >= 75 ? C.amber : C.red} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["Territory", "Sales ৳", "Target", "Ach %", "Reps", "Collection"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
                <tbody>
                  {[...salesByTerritory].sort((a, b) => b.sales - a.sales).map((t, i) => (
                    <tr key={t.territory} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                      <Td style={{ fontWeight: 600 }}>{t.territory}</Td>
                      <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(t.sales / 1000000).toFixed(2)}M</Td>
                      <Td style={{ color: C.sub }}>৳{(t.target / 1000000).toFixed(1)}M</Td>
                      <Td style={{ color: t.achievement >= 100 ? C.teal : t.achievement >= 85 ? C.blue : t.achievement >= 75 ? C.amber : C.red, fontWeight: 700 }}>{t.achievement.toFixed(1)}%</Td>
                      <Td style={{ color: C.sub }}>{t.reps}</Td>
                      <Td style={{ color: C.amber, fontWeight: 600 }}>৳{(t.collections / 1000000).toFixed(2)}M</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlySalesBrand} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                {[["bsg1", C.blue], ["bsg2", C.teal], ["bsg3", C.orange], ["bsg4", C.purple]].map(([id, color]) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color as string} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={color as string} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" />
              <XAxis dataKey="month" tick={{ ...mono, fill: C.sub, fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<ChartTip />} />
              <Area key="bs-cm" type="monotone" dataKey="CardioMax" name="CardioMax ৳" stroke={C.blue} strokeWidth={2} fill="url(#bsg1)" dot={false} />
              <Area key="bs-dc" type="monotone" dataKey="DiabaCare" name="DiabaCare XR ৳" stroke={C.teal} strokeWidth={2} fill="url(#bsg2)" dot={false} />
              <Area key="bs-pv" type="monotone" dataKey="Pulmovax" name="Pulmovax ৳" stroke={C.orange} strokeWidth={2} fill="url(#bsg3)" dot={false} />
              <Area key="bs-np" type="monotone" dataKey="NeuroPlex" name="NeuroPlex ৳" stroke={C.purple} strokeWidth={2} fill="url(#bsg4)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Order breakdown + Collection trend */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <SectionHead title="Order Composition" sub="total_cash_orders / total_credit_orders / cancelled / returns" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { l: "Cash Orders", v: orderSummary.total_cash_orders, val: `৳${(orderSummary.cash_value / 1000000).toFixed(1)}M`, color: C.teal },
              { l: "Credit Orders", v: orderSummary.total_credit_orders, val: `৳${(orderSummary.credit_value / 1000000).toFixed(1)}M`, color: C.blue },
              { l: "Cancelled", v: orderSummary.cancelled_orders, val: `৳${(orderSummary.cancelled_value / 1000).toFixed(0)}K`, color: C.red },
              { l: "Returns", v: orderSummary.total_returns, val: `৳${(orderSummary.return_value / 1000000).toFixed(2)}M`, color: C.amber },
            ].map(({ l, v, val, color }) => (
              <div key={l} style={{ background: `${color}08`, border: `1px solid ${color}18`, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ ...mono, fontSize: 10, color: C.sub, marginBottom: 4 }}>{l}</div>
                <div style={{ ...mono, fontSize: 20, fontWeight: 700, color, marginBottom: 2 }}>{v.toLocaleString()}</div>
                <div style={{ ...mono, fontSize: 11, color: C.sub }}>{val}</div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={[
                { name: "Cash", value: orderSummary.total_cash_orders },
                { name: "Credit", value: orderSummary.total_credit_orders },
                { name: "Cancelled", value: orderSummary.cancelled_orders },
              ]} dataKey="value" cx="50%" cy="50%" outerRadius={52} paddingAngle={2}>
                <Cell fill={C.teal} /><Cell fill={C.blue} /><Cell fill={C.red} />
              </Pie>
              <Tooltip contentStyle={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, ...mono, fontSize: 12, color: C.text }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHead title="Billing vs Collection Trend" sub="total_sales_value vs total_collections · 6 months" />
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={collectionTrend} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="coll-billed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.blue} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="coll-coll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.teal} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" />
              <XAxis dataKey="month" tick={{ ...mono, fill: C.sub, fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip content={<ChartTip />} />
              <Area key="coll-b" type="monotone" dataKey="billed" name="Billed ৳" stroke={C.blue} strokeWidth={2} fill="url(#coll-billed)" dot={false} />
              <Area key="coll-c" type="monotone" dataKey="collected" name="Collected ৳" stroke={C.teal} strokeWidth={2} fill="url(#coll-coll)" dot={false} />
              <Line key="coll-o" type="monotone" dataKey="outstanding" name="Outstanding ৳" stroke={C.red} strokeWidth={1.5} strokeDasharray="4 3" dot={{ fill: C.red, r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <AIFeedback
        context="sales analysis · billing vs collection · order composition · Aug 2025"
        insights={[
          { type: "critical", title: "Outstanding Balance Growing", body: "Outstanding balance has grown from ৳4.2M in March to ৳11.7M in August — a 179% increase in 6 months. Collections are not keeping pace with billing growth. If unchecked, this will impact cash flow in Q4.", action: "Review collection plan" },
          { type: "warning", title: "Khulna Territory Under-performing", body: "Khulna at 65.6% achievement is the weakest territory — ৳620K below target. Only 4 reps covering a large area. Consider territory rebalancing or additional rep deployment.", action: "View territory" },
          { type: "opportunity", title: "Credit-to-Cash Conversion Opportunity", body: "40% of orders are cash (৳7.7M) — healthier than industry average. However, credit orders show 18% higher value per order. Incentivize cash payments with 0.5% discount to improve collection efficiency.", action: "Design incentive" },
          { type: "info", title: "Return Rate Within Control", body: "Return rate is 8.1% of total orders (312 returns, ৳1.56M value) — within the 10% industry benchmark. OncoClear and DiabaCare XR account for 58% of returns. Investigate product handling in those territories.", action: "View returns" },
        ]}
      /></div>
  );
}

function SectionFieldForce({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <SectionHead title="Field Force — Monthly Summary" sub="field_force_monthly_summary · Aug 2025" right={<ClickHint />} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["rank", "name · code", "territory", "tier", "sales_value", "achievement_%", "unique_doctors", "prescriptions", "attendance_%", "collections", "score"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {[...fieldForceList].sort((a, b) => a.performance_rank - b.performance_rank).map((r, i) => (
                <tr key={r.user_id} onClick={() => onSelect(r.user_id)} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2, cursor: "pointer", transition: "background 0.12s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${C.blue}08`)} onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : C.card2)}>
                  <Td style={{ color: C.sub, fontWeight: 700 }}>#{r.performance_rank}</Td>
                  <Td><div style={{ fontWeight: 600 }}>{r.name}</div><div style={{ ...mono, fontSize: 10, color: C.sub }}>{r.code}</div></Td>
                  <Td style={{ color: C.sub, fontSize: 11 }}>{r.territory}</Td>
                  <Td><TierBadge tier={r.performance_tier} /></Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(r.total_sales_value / 1000).toFixed(0)}K</Td>
                  <Td style={{ color: r.target_achievement_percentage >= 100 ? C.teal : r.target_achievement_percentage >= 85 ? C.blue : C.red, fontWeight: 700 }}>{r.target_achievement_percentage}%</Td>
                  <Td style={{ color: C.sub }}>{r.unique_doctors_visited}</Td>
                  <Td style={{ color: C.purple, fontWeight: 700 }}>{r.total_prescription_count}</Td>
                  <Td style={{ minWidth: 100 }}><ScoreBar value={r.attendance_percentage} color={r.attendance_percentage >= 90 ? C.teal : r.attendance_percentage >= 75 ? C.amber : C.red} /></Td>
                  <Td style={{ color: C.amber, fontWeight: 600 }}>৳{(r.total_collections / 1000).toFixed(0)}K</Td>
                  <Td style={{ minWidth: 100 }}><ScoreBar value={r.performance_score} color={r.performance_score >= 80 ? C.teal : r.performance_score >= 60 ? C.amber : C.red} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <AIFeedback
        context="field_force_monthly_summary · performance analysis · Aug 2025"
        insights={[
          { type: "critical",    title: "2 Reps Below 70% Achievement", body: "Jahangir Alam (66.1%) and Tanvir Hassan (74.7%) are significantly below target. Both show high late check-in rates and low doctor visit frequency — pattern consistent with disengagement. Recommend immediate manager intervention.", action: "View reps" },
          { type: "opportunity", title: "Top 3 Reps Driving 44% of Sales", body: "Rashida, Nadia and Farzana together generate ৳1.11M — 44% of total field force sales. Consider using them as territory mentors and replicating their visit schedules in under-performing areas.", action: "View top reps" },
          { type: "warning",     title: "Attendance Risk in Khulna", body: "Jahangir Alam shows 73.1% attendance (6 absences) and 8 late check-ins this month. GPS drift average 1.24km — highest in the team. Strong indicator of field discipline issues.", action: "Flag for HR" },
          { type: "info",        title: "Prescription Growth Outpacing Sales", body: "Team Rx count grew 11.2% while sales grew 8.9% — healthy leading indicator. New prescriptions in Rajshahi and Mymensingh territories suggest demand building for Q4.", action: "View Rx trend" },
        ]}
      />
    </div>
  );
}

function SectionDoctors({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <SectionHead title="Doctor Monthly Summary" sub="doctor_monthly_summary · Aug 2025" right={<ClickHint />} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["doctor_name", "speciality", "division", "total_visits", "approved/pending", "morning/evening", "prescription_count", "Rx/visit", "engagement_score", "effectiveness_score", "capacity", "status"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {doctorList.map((d, i) => (
                <tr key={d.doctor_id} onClick={() => onSelect(d.doctor_id)} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2, cursor: "pointer", transition: "background 0.12s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${C.blue}08`)} onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : C.card2)}>
                  <Td><div style={{ fontWeight: 600 }}>{d.name}</div><div style={{ ...mono, fontSize: 10, color: C.sub }}>{d.designation}</div></Td>
                  <Td><Chip label={d.speciality} color={C.indigo} size="xs" /></Td>
                  <Td style={{ color: C.sub, fontSize: 11 }}>{d.division}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>{d.total_visits}</Td>
                  <Td style={{ color: C.sub }}><span style={{ color: C.teal }}>{d.approved_visits}</span> / <span style={{ color: d.pending_visits > 0 ? C.amber : C.dim }}>{d.pending_visits}</span></Td>
                  <Td style={{ color: C.sub }}>{d.morning_visits} / {d.evening_visits}</Td>
                  <Td style={{ color: C.purple, fontWeight: 700 }}>{d.prescription_count}</Td>
                  <Td style={{ color: C.teal, fontWeight: 700 }}>{(d.prescription_count / d.total_visits).toFixed(1)}</Td>
                  <Td style={{ minWidth: 100 }}><ScoreBar value={d.doctor_engagement_score} color={d.doctor_engagement_score >= 75 ? C.teal : d.doctor_engagement_score >= 50 ? C.amber : C.red} /></Td>
                  <Td style={{ minWidth: 100 }}><ScoreBar value={d.visit_effectiveness_score} color={d.visit_effectiveness_score >= 75 ? C.teal : d.visit_effectiveness_score >= 50 ? C.amber : C.red} /></Td>
                  <Td style={{ color: C.sub }}>৳{(d.yearly_business_capacity / 1000).toFixed(0)}K</Td>
                  <Td><Chip label={d.status} color={d.status === "ACTIVE" ? C.teal : d.status === "AT_RISK" ? C.amber : C.red} size="xs" /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <AIFeedback
        context="doctor_monthly_summary · engagement & effectiveness analysis · Aug 2025"
        insights={[
          { type: "critical",    title: "Dr. Abdul Motin — Urgent Intervention", body: "Engagement score 49.1 is the lowest in portfolio. Only 3 visits this month vs 6 target. Yearly business capacity ৳360K is being largely missed. Competitor rep sighted in territory. Immediate visit required.", action: "Schedule visit" },
          { type: "opportunity", title: "Dr. Rahim Drives 24% of All Rx", body: "Dr. Abdur Rahim generated 31 prescriptions (24% of team total) in just 6 visits — highest Rx/visit ratio at 5.2. Evening visits show 40% better conversion. Protect this relationship at all costs.", action: "View profile" },
          { type: "info",        title: "Morning vs Evening Visit Pattern", body: "Morning visits across all doctors achieve an avg Rx/visit of 3.8 vs 2.9 for evening visits. Recommend re-scheduling field plans to prioritise morning slots for high-potential doctors.", action: "Optimise schedule" },
          { type: "warning",     title: "Dr. Tahmina Parvin — Inactive Risk", body: "Oncologist in Chittagong with ৳940K yearly capacity — the highest in the portfolio — has only 2 visits and 4 prescriptions. Engagement score 31.4 indicates near-lost relationship.", action: "Assign priority rep" },
        ]}
      />
    </div>
  );
}

function SectionChemists({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <SectionHead title="Customer Profile — Risk Matrix" sub="customer_profile ⋈ customer_monthly_summary · Aug 2025" right={<ClickHint />} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["customer_name", "tier", "type", "city", "sales_value", "mom_%", "churn_risk", "health_score", "engagement", "payment_reliability", "outstanding", "visits_30d"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {chemistList.map((c, i) => (
                <tr key={c.customer_id} onClick={() => onSelect(c.customer_id)} style={{ borderBottom: `1px solid ${C.border2}`, background: c.churn_risk_level === "HIGH" ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2, cursor: "pointer", transition: "background 0.12s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${C.blue}08`)} onMouseLeave={e => (e.currentTarget.style.background = c.churn_risk_level === "HIGH" ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2)}>
                  <Td style={{ fontWeight: 600 }}>{c.customer_name}</Td>
                  <Td><Chip label={c.customer_tier} color={c.customer_tier === "GOLD" ? C.amber : c.customer_tier === "SILVER" ? C.blue : C.sub} size="xs" /></Td>
                  <Td style={{ color: C.sub, fontSize: 10 }}>{c.chemist_type}</Td>
                  <Td style={{ color: C.sub, fontSize: 11 }}>{c.city}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(c.total_sales_value / 1000).toFixed(0)}K</Td>
                  <Td style={{ color: c.mom_growth_percentage >= 0 ? C.teal : C.red, fontWeight: 600 }}>{c.mom_growth_percentage >= 0 ? "+" : ""}{c.mom_growth_percentage.toFixed(1)}%</Td>
                  <Td><RiskBadge level={c.churn_risk_level} /></Td>
                  <Td style={{ minWidth: 90 }}><ScoreBar value={c.customer_health_score} color={c.customer_health_score >= 70 ? C.teal : c.customer_health_score >= 45 ? C.amber : C.red} /></Td>
                  <Td style={{ minWidth: 90 }}><ScoreBar value={c.engagement_score} color={c.engagement_score >= 70 ? C.blue : c.engagement_score >= 45 ? C.amber : C.red} /></Td>
                  <Td style={{ minWidth: 90 }}><ScoreBar value={c.payment_reliability_score} color={c.payment_reliability_score >= 80 ? C.teal : C.red} /></Td>
                  <Td style={{ color: c.overdue_amount > 0 ? C.red : C.sub }}>৳{(c.outstanding_balance / 1000).toFixed(1)}K{c.overdue_amount > 0 && <span style={{ color: C.red, fontSize: 10 }}> ({c.overdue_days}d)</span>}</Td>
                  <Td style={{ color: c.visits_last_30_days <= 2 ? C.red : C.sub }}>{c.visits_last_30_days}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <AIFeedback
        context="customer_profile · churn_risk · engagement · payment_reliability · Aug 2025"
        insights={[
          { type: "critical",    title: "Sunrise Pharmacy — Imminent Churn", body: "Churn risk score 68.9 with ৳18.4K overdue for 42 days and only 1 visit this month. Health score 28.4 is the lowest in portfolio. Located in Khulna — the territory already under-performing. This account is at critical risk of loss.", action: "Immediate action" },
          { type: "warning",     title: "LifeCare Pharmacy — 42-Day Overdue", body: "৳4.2K overdue for 42 days with payment reliability at 44%. Despite high potential location near Dr. Motin's clinic, engagement score is only 38.9. Urgently visit and bring samples to re-engage.", action: "Schedule visit" },
          { type: "opportunity", title: "Medinova Drug Store — Expand SKU Range", body: "Top chemist by health score (91.2) and sales growth (+9.8% MoM). Currently buying only 3 of 6 target brands. Cross-selling NeuroPlex 500 and OncoClear could add est. ৳12K/month.", action: "Cross-sell plan" },
          { type: "info",        title: "GOLD Tier Retention Critical", body: "GOLD tier chemists (Modina, Medinova, HealthPoint) generate 52% of total chemist sales despite being only 12% of the portfolio. Ensure minimum 6 visits/month and assign dedicated rep to each.", action: "View GOLD tier" },
        ]}
      />
    </div>
  );
}

function SectionBrands({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <SectionHead title="Brand Monthly Summary" sub="brand_monthly_summary · org-wide · Aug 2025" right={<ClickHint />} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["rank", "brand_name", "category", "tier", "sales_value", "achievement_%", "health_score", "market_share_%", "mkt_Δ", "prescriptions", "new_Rx_drs", "forecast", "momentum", "risk"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {[...brandList].sort((a, b) => a.rank_in_organization - b.rank_in_organization).map((b, i) => (
                <tr key={b.brand_id} onClick={() => onSelect(b.brand_id)} style={{ borderBottom: `1px solid ${C.border2}`, background: b.risk_level === "HIGH" ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2, cursor: "pointer", transition: "background 0.12s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${C.blue}08`)} onMouseLeave={e => (e.currentTarget.style.background = b.risk_level === "HIGH" ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2)}>
                  <Td style={{ color: C.sub, fontWeight: 700 }}>#{b.rank_in_organization}</Td>
                  <Td style={{ fontWeight: 700 }}>{b.brand_name}</Td>
                  <Td style={{ color: C.sub, fontSize: 10 }}>{b.category_name}</Td>
                  <Td><TierBadge tier={b.performance_tier} /></Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(b.total_sales_value / 1000000).toFixed(2)}M</Td>
                  <Td style={{ color: b.sales_achievement_percentage >= 100 ? C.teal : C.red, fontWeight: 700 }}>{b.sales_achievement_percentage.toFixed(1)}%</Td>
                  <Td style={{ minWidth: 90 }}><ScoreBar value={b.brand_health_score} color={b.brand_health_score >= 70 ? C.teal : C.amber} /></Td>
                  <Td style={{ color: C.blue, fontWeight: 600 }}>{b.market_share_estimate}%</Td>
                  <Td style={{ color: b.market_share_change >= 0 ? C.teal : C.red, fontWeight: 700 }}>{b.market_share_change >= 0 ? "+" : ""}{b.market_share_change}%</Td>
                  <Td style={{ color: C.purple, fontWeight: 600 }}>{b.total_prescription_count.toLocaleString()}</Td>
                  <Td style={{ color: b.new_prescribing_doctors >= 5 ? C.teal : C.sub }}>{b.new_prescribing_doctors}</Td>
                  <Td style={{ color: C.teal }}>৳{(b.demand_forecast_next_month / 1000000).toFixed(2)}M</Td>
                  <Td>{b.momentum_indicator === "POSITIVE" ? <TrendingUp size={14} color={C.teal} /> : b.momentum_indicator === "NEGATIVE" ? <TrendingDown size={14} color={C.red} /> : <span style={{ color: C.dim }}>—</span>}</Td>
                  <Td><Chip label={b.risk_level} color={b.risk_level === "LOW" ? C.teal : b.risk_level === "MEDIUM" ? C.amber : C.red} size="xs" /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <AIFeedback
        context="brand_monthly_summary · market share · health score · prescription trends · Aug 2025"
        insights={[
          { type: "critical",    title: "OncoClear — Portfolio Risk Escalating", body: "Brand health score dropped to 42.1 with market share losing 3.4% this month. Only 1 new prescriber added vs target of 5. If trend continues, projected Q4 loss is ৳3.2M. Consider strategic review: adjust pricing, increase KOL outreach, or evaluate portfolio position.", action: "Strategic review" },
          { type: "warning",     title: "DiabaCare XR Losing to Generic Competition", body: "Sales achievement 85.3% and declining Rx count (-3.8%) driven by a new generic at 30% lower price. 3 high-prescribing doctors showing reduced frequency — early doctor-level churn. Brand differentiation messaging needed immediately.", action: "View doctors" },
          { type: "opportunity", title: "CardioMax + Pulmovax — Momentum to Capitalise", body: "Both brands show positive momentum with growing market shares (+1.4% and +2.8%). Combined forecast next month: ৳9.7M. Recommend increasing sampling budget by 15% and scheduling joint KOL events in Dhaka and Chittagong.", action: "Expand sampling" },
          { type: "info",        title: "NeuroPlex 500 — Niche Growing", body: "Despite being a niche brand, NeuroPlex 500 is 99.3% of target with 5 new prescribers. Prescription growth +6.2% outpaces category average. Opportunity to expand from 5 to 7 territories — estimated ৳420K uplift.", action: "Territory expansion" },
        ]}
      />
    </div>
  );
}

function SectionProducts({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <SectionHead title="Product SKU Monthly Summary" sub="product_sku_monthly_summary · Aug 2025" right={<ClickHint />} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{["sku_code", "product_name", "brand", "category", "trade_price", "sales_value", "achievement_%", "prescription_count", "tier", "score", "demand_forecast", "growth_%", "momentum", "attention"].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
            <tbody>
              {productList.map((p, i) => (
                <tr key={p.product_id} onClick={() => onSelect(p.product_id)} style={{ borderBottom: `1px solid ${C.border2}`, background: p.requires_attention ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2, cursor: "pointer", transition: "background 0.12s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${C.blue}08`)} onMouseLeave={e => (e.currentTarget.style.background = p.requires_attention ? `${C.red}05` : i % 2 === 0 ? "transparent" : C.card2)}>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>{p.sku_code}</Td>
                  <Td style={{ fontWeight: 600 }}>{p.name}</Td>
                  <Td style={{ color: C.sub }}>{p.brand_name}</Td>
                  <Td><Chip label={p.category_name} color={C.indigo} size="xs" /></Td>
                  <Td style={{ color: C.sub }}>৳{p.trade_price}</Td>
                  <Td style={{ color: C.blue, fontWeight: 700 }}>৳{(p.total_sales_value / 1000000).toFixed(2)}M</Td>
                  <Td style={{ color: p.sales_achievement_percentage >= 100 ? C.teal : C.red, fontWeight: 700 }}>{p.sales_achievement_percentage.toFixed(1)}%</Td>
                  <Td style={{ color: C.purple, fontWeight: 600 }}>{p.prescription_count.toLocaleString()}</Td>
                  <Td><TierBadge tier={p.performance_tier} /></Td>
                  <Td style={{ minWidth: 90 }}><ScoreBar value={p.performance_score} color={p.performance_score >= 80 ? C.teal : p.performance_score >= 60 ? C.amber : C.red} /></Td>
                  <Td style={{ color: C.teal }}>৳{(p.demand_forecast_next_month / 1000000).toFixed(2)}M</Td>
                  <Td style={{ color: p.sales_growth_percentage >= 0 ? C.teal : C.red, fontWeight: 700 }}>{p.sales_growth_percentage > 0 ? "+" : ""}{p.sales_growth_percentage.toFixed(1)}%</Td>
                  <Td>{p.momentum_indicator === "POSITIVE" ? <TrendingUp size={13} color={C.teal} /> : p.momentum_indicator === "NEGATIVE" ? <TrendingDown size={13} color={C.red} /> : <span style={{ color: C.dim }}>—</span>}</Td>
                  <Td>{p.requires_attention ? <Chip label="⚠ YES" color={C.red} size="xs" /> : <Chip label="OK" color={C.teal} size="xs" />}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <AIFeedback
        context="product_sku_monthly_summary · achievement · Rx-to-sales ratio · demand forecast · Aug 2025"
        insights={[
          { type: "critical",    title: "DC-XR500 — 9.2% MoM Decline", body: "DiabaCare XR 500 (DC-XR500) is the highest revenue SKU but declining fastest (-9.2% MoM). Performance score 62.1 and in 'requires_attention' state. Prescription-to-sales ratio is also weakening. This SKU needs a dedicated recovery intervention this week.", action: "Recovery plan" },
          { type: "critical",    title: "OC-INJ50 — 13.7% MoM Decline", body: "OncoClear Injection (OC-INJ50) at 77.9% achievement with –13.7% MoM growth. Specialist-only product with only 8 unique prescribers vs target 12. CME event or hospital formulary inclusion needed.", action: "KOL outreach" },
          { type: "opportunity", title: "PV-100 — Best SKU to Double Down", body: "Pulmovax 100mcg (PV-100) is the only SKU exceeding target (100.2%) with +5.8% MoM growth, 91% demand forecast confidence, and 1,620 prescriptions. Demand forecast ৳4.5M next month. Prioritise stock allocation and expand rep coverage.", action: "Stock allocation" },
          { type: "info",        title: "Rx:Sales Ratio Signals Future Revenue", body: "CM-10MG has the highest Rx:Sales ratio (0.39) — meaning every prescription generates strong downstream sales. Focus promotional activity on high-ratio SKUs: CM-10MG, PV-100, and NP-500. These are your demand drivers.", action: "View Rx map" },
        ]}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM REPORTS
// ═══════════════════════════════════════════════════════════════════════════════

type ReportChart = "scatter_sales_promo" | "bar_doctor_capacity" | "bar_territory" | "table_churn" | "scatter_rx_sales" | "bar_rep_attendance" | "line_brand_rx";

interface SavedReport {
  id: number;
  title: string;
  query: string;
  chart: ReportChart;
  category: string;
  saved_at: string;
  description: string;
  tags: string[];
}

const defaultSavedReports: SavedReport[] = [
  { id: 1, title: "Top 10 Products: High Sales, Low Promotion", query: "Show me top 10 products which have good sales but are less promoted", chart: "scatter_sales_promo", category: "Products", saved_at: "12 Aug 2025", description: "Identifies products generating strong sales revenue despite receiving low promotional activity — potential for efficiency improvement.", tags: ["products", "promotion", "sales"] },
  { id: 2, title: "High-Capacity Doctors with Low Visits", query: "Which doctors have high business capacity but low visit frequency this month?", chart: "bar_doctor_capacity", category: "Doctors", saved_at: "10 Aug 2025", description: "Finds high-value doctors being under-visited — missed revenue opportunity.", tags: ["doctors", "visits", "capacity"] },
  { id: 3, title: "Territory Achievement Comparison", query: "Compare territory-wise sales achievement for August 2025", chart: "bar_territory", category: "Sales", saved_at: "08 Aug 2025", description: "Side-by-side comparison of all territories against their monthly sales targets.", tags: ["territory", "achievement", "sales"] },
  { id: 4, title: "Chemist Churn Risk vs Outstanding Balance", query: "Show chemists with high churn risk and outstanding balance above ৳5000", chart: "table_churn", category: "Chemists", saved_at: "05 Aug 2025", description: "Risk matrix identifying chemists who are both at risk of churning and have significant unpaid balances.", tags: ["chemists", "churn", "collection"] },
  { id: 5, title: "Brand Rx vs Sales Correlation", query: "Show correlation between prescription count and sales value for all brands", chart: "scatter_rx_sales", category: "Brands", saved_at: "01 Aug 2025", description: "Scatter plot revealing which brands convert prescriptions efficiently into revenue.", tags: ["brands", "prescriptions", "sales"] },
  { id: 6, title: "Rep Attendance vs Achievement", query: "Show field rep attendance percentage vs sales achievement to find discipline issues", chart: "bar_rep_attendance", category: "Field Force", saved_at: "28 Jul 2025", description: "Correlates attendance discipline with performance outcomes across all reps.", tags: ["reps", "attendance", "achievement"] },
];

// Report chart data maps
const reportChartData: Record<ReportChart, { data: any[]; config: any }> = {
  scatter_sales_promo: {
    data: [
      { sku: "PV-100",    sales: 4210, promo: 12, brand: "Pulmovax" },
      { sku: "CM-10MG",   sales: 2840, promo: 18, brand: "CardioMax" },
      { sku: "CM-20MG",   sales: 1980, promo: 14, brand: "CardioMax" },
      { sku: "DC-XR500",  sales: 3410, promo: 38, brand: "DiabaCare XR" },
      { sku: "NP-500",    sales: 2980, promo: 22, brand: "NeuroPlex" },
      { sku: "OC-INJ50",  sales: 2180, promo: 41, brand: "OncoClear" },
      { sku: "GP-400",    sales: 1940, promo: 9,  brand: "GastroPro" },
      { sku: "NC-250",    sales: 1720, promo: 16, brand: "NeuroCalm" },
      { sku: "HC-200",    sales: 1480, promo: 11, brand: "HepaCure" },
      { sku: "RS-100",    sales: 1260, promo: 7,  brand: "RenalShield" },
    ],
    config: { xKey: "promo", yKey: "sales", xLabel: "Promotion Count", yLabel: "Sales ৳K" },
  },
  bar_doctor_capacity: {
    data: [
      { name: "Dr. Tahmina", capacity: 940, visits: 2, gap: 938 },
      { name: "Dr. Roksana",  capacity: 890, visits: 4, gap: 886 },
      { name: "Dr. Abdur Rahim", capacity: 820, visits: 6, gap: 814 },
      { name: "Dr. Anwar",    capacity: 640, visits: 4, gap: 636 },
      { name: "Dr. Nasreen",  capacity: 740, visits: 6, gap: 734 },
      { name: "Dr. Mamun",    capacity: 560, visits: 5, gap: 555 },
      { name: "Dr. Selina",   capacity: 620, visits: 5, gap: 615 },
      { name: "Dr. Abdul Motin", capacity: 360, visits: 3, gap: 357 },
    ],
    config: { xKey: "name", yKey: "capacity", y2Key: "visits", label: "Capacity ৳K vs Visits" },
  },
  bar_territory: {
    data: salesByTerritory.map(t => ({ name: t.territory, achievement: t.achievement, sales: t.sales / 1000000, target: t.target / 1000000 })),
    config: { xKey: "name", yKey: "achievement", label: "Achievement %" },
  },
  table_churn: {
    data: chemistList.filter(c => c.churn_risk_score > 20).sort((a, b) => b.churn_risk_score - a.churn_risk_score).map(c => ({ name: c.customer_name, churn: c.churn_risk_score.toFixed(1), outstanding: `৳${(c.outstanding_balance / 1000).toFixed(1)}K`, overdue: c.overdue_days, health: c.customer_health_score.toFixed(1), risk: c.churn_risk_level })),
    config: { cols: ["name", "churn", "outstanding", "overdue", "health", "risk"] },
  },
  scatter_rx_sales: {
    data: brandList.map(b => ({ name: b.brand_name, rx: b.total_prescription_count, sales: b.total_sales_value / 1000000 })),
    config: { xKey: "rx", yKey: "sales", xLabel: "Prescriptions", yLabel: "Sales ৳M" },
  },
  bar_rep_attendance: {
    data: fieldForceList.map(r => ({ name: r.name.split(" ")[0], attendance: r.attendance_percentage, achievement: r.target_achievement_percentage })),
    config: { xKey: "name", yKey: "attendance", y2Key: "achievement", label: "Attendance vs Achievement" },
  },
  line_brand_rx: {
    data: [
      { month: "Mar", CardioMax: 1420, DiabaCare: 1180, Pulmovax: 1340 },
      { month: "Apr", CardioMax: 1520, DiabaCare: 1240, Pulmovax: 1480 },
      { month: "May", CardioMax: 1380, DiabaCare: 1320, Pulmovax: 1420 },
      { month: "Jun", CardioMax: 1620, DiabaCare: 1180, Pulmovax: 1560 },
      { month: "Jul", CardioMax: 1740, DiabaCare: 1140, Pulmovax: 1590 },
      { month: "Aug", CardioMax: 1840, DiabaCare: 1120, Pulmovax: 1620 },
    ],
    config: { keys: ["CardioMax", "DiabaCare", "Pulmovax"], label: "Monthly Rx by Brand" },
  },
};

// NL query → chart type matcher
function matchQueryToChart(q: string): { chart: ReportChart; title: string; description: string } {
  const ql = q.toLowerCase();
  if ((ql.includes("product") || ql.includes("sku")) && (ql.includes("promot") || ql.includes("less promot")))
    return { chart: "scatter_sales_promo", title: "Products: Sales vs Promotion", description: "Scatter showing each SKU positioned by promotion count (x) and sales value (y). Top-left quadrant = high sales, low promotion." };
  if (ql.includes("doctor") && (ql.includes("capacity") || ql.includes("potential") || ql.includes("visit")))
    return { chart: "bar_doctor_capacity", title: "Doctor Capacity vs Visit Frequency", description: "Doctors ranked by yearly business capacity with visit count overlay." };
  if (ql.includes("territory") || ql.includes("region"))
    return { chart: "bar_territory", title: "Territory Achievement %", description: "All territories compared against their monthly sales targets." };
  if ((ql.includes("chemist") || ql.includes("customer")) && (ql.includes("churn") || ql.includes("outstanding") || ql.includes("risk")))
    return { chart: "table_churn", title: "Chemist Churn Risk Matrix", description: "Ranked chemists by churn risk score with outstanding balance and overdue days." };
  if (ql.includes("brand") && (ql.includes("rx") || ql.includes("prescription")))
    return { chart: "scatter_rx_sales", title: "Brand Rx vs Sales Correlation", description: "Each brand plotted by prescription count (x) and sales value (y)." };
  if ((ql.includes("rep") || ql.includes("employee") || ql.includes("field")) && ql.includes("attend"))
    return { chart: "bar_rep_attendance", title: "Rep Attendance vs Achievement", description: "Correlating attendance discipline with sales achievement." };
  return { chart: "bar_territory", title: "Territory Sales Overview", description: "Default: territory-level sales achievement overview." };
}

function ReportVisualization({ chart }: { chart: ReportChart }) {
  const { data, config } = reportChartData[chart];

  if (chart === "table_churn") {
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: `2px solid ${C.border}` }}>{(config.cols as string[]).map((c: string) => <Th key={c}>{c}</Th>)}</tr></thead>
          <tbody>
            {data.map((row: any, i: number) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border2}`, background: i % 2 === 0 ? "transparent" : C.card2 }}>
                {(config.cols as string[]).map((col: string) => (
                  <Td key={col} style={{ color: col === "churn" ? C.red : col === "risk" ? (row[col] === "HIGH" ? C.red : row[col] === "MEDIUM" ? C.amber : C.teal) : col === "outstanding" ? C.amber : C.text, fontWeight: col === "name" ? 600 : 400 }}>
                    {col === "risk" ? <RiskBadge level={row[col]} /> : row[col]}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (chart === "scatter_sales_promo" || chart === "scatter_rx_sales") {
    const colors = [C.blue, C.teal, C.purple, C.orange, C.red, C.amber, C.indigo];
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {data.map((d: any, i: number) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors[i % colors.length], flexShrink: 0 }} />
              <span style={{ ...mono, fontSize: 10, color: C.sub }}>{d.sku ?? d.name}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "relative", height: 220 }}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart layout="vertical" data={[...data].sort((a: any, b: any) => b[config.yKey] - a[config.yKey])} margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" horizontal={false} />
              <XAxis type="number" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey={chart === "scatter_sales_promo" ? "sku" : "name"} tick={{ ...mono, fill: C.text, fontSize: 11 }} tickLine={false} axisLine={false} width={76} />
              <Tooltip content={<ChartTip />} />
              <Bar key="rep-sales-bar" dataKey={config.yKey} name={config.yLabel} radius={[0, 4, 4, 0]} maxBarSize={14}>
                {data.map((_: any, i: number) => <Cell key={`sc-${i}`} fill={colors[i % colors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={{ ...mono, fontSize: 11, color: C.sub, marginTop: 8, textAlign: "center" as const }}>
          {config.xLabel} vs {config.yLabel} — sort by {config.yLabel}
        </p>
      </div>
    );
  }

  if (chart === "line_brand_rx") {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -14, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" />
          <XAxis dataKey="month" tick={{ ...mono, fill: C.sub, fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTip />} />
          {(config.keys as string[]).map((k: string, i: number) => <Line key={k} type="monotone" dataKey={k} stroke={[C.blue, C.teal, C.orange][i]} strokeWidth={2} dot={{ r: 3 }} />)}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chart === "bar_rep_attendance") {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" vertical={false} />
          <XAxis dataKey="name" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 120]} tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTip />} />
          <Bar key="ra-att" dataKey="attendance" name="Attendance %" fill={C.blue} radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar key="ra-ach" dataKey="achievement" name="Achievement %" fill={C.teal} radius={[4, 4, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // default: bar_territory or bar_doctor_capacity
  if (chart === "bar_doctor_capacity") {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart layout="vertical" data={[...data].sort((a: any, b: any) => b.capacity - a.capacity)} margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" horizontal={false} />
          <XAxis type="number" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="name" tick={{ ...mono, fill: C.text, fontSize: 11 }} tickLine={false} axisLine={false} width={90} />
          <Tooltip content={<ChartTip />} />
          <Bar key="dc-cap" dataKey="capacity" name="Capacity ৳K" fill={C.blue} radius={[0, 4, 4, 0]} maxBarSize={14} />
          <Bar key="dc-vis" dataKey="visits" name="Visits" fill={C.teal} radius={[0, 4, 4, 0]} maxBarSize={14} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,30,80,0.07)" vertical={false} />
        <XAxis dataKey="name" tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ ...mono, fill: C.sub, fontSize: 10 }} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTip />} />
        <Bar key="def-bar" dataKey="achievement" name="Achievement %" radius={[4, 4, 0, 0]} maxBarSize={28}>
          {data.map((d: any, i: number) => <Cell key={`dc-${i}`} fill={d.achievement >= 100 ? C.teal : d.achievement >= 85 ? C.blue : d.achievement >= 75 ? C.amber : C.red} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const CAT_COLORS: Record<string, string> = { Products: C.teal, Doctors: C.indigo, Sales: C.blue, Chemists: C.orange, Brands: C.purple, "Field Force": C.amber };

function SectionReports() {
  const [saved, setSaved] = useState<SavedReport[]>(defaultSavedReports);
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [activeReport, setActiveReport] = useState<SavedReport | null>(null);
  const [queryInput, setQueryInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [preview, setPreview] = useState<{ chart: ReportChart; title: string; description: string } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", ...Array.from(new Set(saved.map(r => r.category)))];

  const handleGenerate = () => {
    if (!queryInput.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const result = matchQueryToChart(queryInput);
      setPreview(result);
      if (!titleInput) setTitleInput(result.title);
      setGenerating(false);
    }, 900);
  };

  const handleSave = () => {
    if (!preview) return;
    const newReport: SavedReport = {
      id: Date.now(),
      title: titleInput || preview.title,
      query: queryInput,
      chart: preview.chart,
      category: "Custom",
      saved_at: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      description: preview.description,
      tags: queryInput.toLowerCase().split(" ").filter(w => w.length > 3).slice(0, 4),
    };
    setSaved(p => [newReport, ...p]);
    setView("list");
    setQueryInput(""); setTitleInput(""); setPreview(null);
  };

  const filtered = filterCat === "All" ? saved : saved.filter(r => r.category === filterCat);

  if (view === "detail" && activeReport) {
    return (
      <div>
        <BackBtn onClick={() => { setView("list"); setActiveReport(null); }} label="Custom Reports" />
        <Card style={{ marginBottom: 14, border: `1px solid ${(CAT_COLORS[activeReport.category] ?? C.blue) + "30"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ ...slab, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{activeReport.title}</div>
              <div style={{ ...mono, fontSize: 11, color: C.sub, marginBottom: 8 }}>{activeReport.description}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                <Chip label={activeReport.category} color={CAT_COLORS[activeReport.category] ?? C.blue} />
                {activeReport.tags.map(t => <Chip key={t} label={t} color={C.sub} size="xs" />)}
              </div>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <div style={{ ...mono, fontSize: 10, color: C.sub, marginBottom: 2 }}>Last saved</div>
              <div style={{ ...mono, fontSize: 12, color: C.text, fontWeight: 600 }}>{activeReport.saved_at}</div>
              <div style={{ ...mono, fontSize: 10, color: C.teal, marginTop: 4 }}>● Live data</div>
            </div>
          </div>
          <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 7, padding: "10px 14px", marginBottom: 14 }}>
            <span style={{ ...mono, fontSize: 10, color: C.sub }}>Query: </span>
            <span style={{ ...mono, fontSize: 12, color: C.text, fontStyle: "italic" as const }}>"{activeReport.query}"</span>
          </div>
        </Card>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ ...slab, fontSize: 13, fontWeight: 700, color: C.text }}>Generated Visualization</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...mono, fontSize: 11, color: C.sub, background: C.pill, border: `1px solid ${C.border}`, padding: "5px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                <RefreshCw size={11} /> Refresh Data
              </button>
              <button style={{ ...mono, fontSize: 11, color: "#fff", background: C.blue, border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                <Download size={11} /> Export
              </button>
            </div>
          </div>
          <ReportVisualization chart={activeReport.chart} />
        </Card>
        <AIFeedback
          context={`Custom report: "${activeReport.title}" · ${activeReport.category} · Latest data`}
          insights={[
            { type: "info",        title: "Query Interpretation", body: `This report was generated from: "${activeReport.query}". The system identified this as a ${activeReport.category.toLowerCase()}-level analysis and selected the most appropriate visualization type.` },
            { type: "opportunity", title: "Actionable Insight", body: activeReport.chart === "scatter_sales_promo" ? "PV-100 (Pulmovax) and GP-400 (GastroPro) are in the high-sales/low-promotion quadrant — these are your most efficient SKUs. Slightly increasing their promotion budget could yield disproportionate returns." : activeReport.chart === "bar_doctor_capacity" ? "Dr. Tahmina Parvin (৳940K capacity) and Dr. Roksana Begum (৳890K) are severely under-visited. Combined untapped capacity represents ৳1.83M/year." : "Review the data above and identify the top 3 items requiring immediate action based on the metric spread shown.", action: "Deep dive" },
            { type: "info",        title: "Schedule as Recurring Report", body: "This report can be configured to run automatically at month-end and deliver results to your inbox. Contact your admin to set up scheduled delivery." },
          ]}
        />
      </div>
    );
  }

  if (view === "create") {
    return (
      <div>
        <BackBtn onClick={() => { setView("list"); setPreview(null); setQueryInput(""); setTitleInput(""); }} label="Custom Reports" />
        <Card style={{ marginBottom: 14 }}>
          <SectionHead title="Create New Report" sub="Describe what you want to analyse in plain language" />
          <div style={{ marginBottom: 12 }}>
            <label style={{ ...mono, fontSize: 11, color: C.sub, display: "block", marginBottom: 6 }}>Report Title</label>
            <input
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              placeholder="e.g. Top Products: High Sales, Low Promotion"
              style={{ width: "100%", ...mono, fontSize: 13, padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, outline: "none", boxSizing: "border-box" as const }}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ ...mono, fontSize: 11, color: C.sub, display: "block", marginBottom: 6 }}>Natural Language Query</label>
            <textarea
              value={queryInput}
              onChange={e => setQueryInput(e.target.value)}
              placeholder={"Try: 'Show me top 10 products with good sales but less promoted'\nor: 'Which doctors have high capacity but low visit frequency?'\nor: 'Show chemists with high churn risk and outstanding balance'"}
              rows={4}
              style={{ width: "100%", ...mono, fontSize: 13, padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, outline: "none", resize: "vertical" as const, boxSizing: "border-box" as const, lineHeight: 1.6 }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <div style={{ ...mono, fontSize: 11, color: C.sub, marginBottom: 4, marginTop: 2 }}>Try:</div>
            {["high sales but less promoted", "doctors high capacity low visits", "chemist churn risk outstanding", "territory achievement comparison", "brand rx vs sales"].map(hint => (
              <button key={hint} onClick={() => setQueryInput(hint)} style={{ ...mono, fontSize: 11, color: C.blue, background: `${C.blue}10`, border: `1px solid ${C.blue}22`, padding: "4px 10px", borderRadius: 5, cursor: "pointer" }}>
                {hint}
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            disabled={!queryInput.trim() || generating}
            style={{ ...mono, fontSize: 13, fontWeight: 600, color: "#fff", background: generating ? C.dim : C.blue, border: "none", padding: "10px 24px", borderRadius: 8, cursor: generating ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            <Brain size={14} /> {generating ? "Generating…" : "Generate Report"}
          </button>
        </Card>

        {generating && (
          <Card style={{ textAlign: "center" as const, padding: "32px 20px" }}>
            <div style={{ ...mono, fontSize: 12, color: C.sub, marginBottom: 8 }}>Analysing query and selecting optimal visualization…</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </Card>
        )}

        {preview && !generating && (
          <>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.teal}25`, background: `${C.teal}04` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <CheckCircle2 size={14} color={C.teal} />
                <span style={{ ...mono, fontSize: 11, fontWeight: 700, color: C.teal }}>Report Generated Successfully</span>
              </div>
              <div style={{ ...slab, fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{preview.title}</div>
              <div style={{ ...mono, fontSize: 12, color: C.sub, marginBottom: 14 }}>{preview.description}</div>
              <ReportVisualization chart={preview.chart} />
            </Card>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleSave} style={{ ...mono, fontSize: 13, fontWeight: 600, color: "#fff", background: C.teal, border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <Star size={14} /> Save Report
              </button>
              <button onClick={() => { setPreview(null); }} style={{ ...mono, fontSize: 13, color: C.sub, background: C.pill, border: `1px solid ${C.border}`, padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>
                Discard
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ ...slab, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 2 }}>Custom Reports</h2>
          <p style={{ ...mono, fontSize: 11, color: C.sub }}>{saved.length} saved reports · refreshed with live data on every view</p>
        </div>
        <button
          onClick={() => setView("create")}
          style={{ ...mono, fontSize: 13, fontWeight: 600, color: "#fff", background: C.blue, border: "none", padding: "9px 20px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}
        >
          <Brain size={14} /> + New Report
        </button>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            style={{ ...mono, fontSize: 11, padding: "5px 14px", borderRadius: 6, border: `1px solid ${filterCat === cat ? C.blue : C.border}`, background: filterCat === cat ? `${C.blue}12` : "transparent", color: filterCat === cat ? C.blue : C.sub, cursor: "pointer", fontWeight: filterCat === cat ? 700 : 400 }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Report cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 12 }}>
        {filtered.map(report => {
          const color = CAT_COLORS[report.category] ?? C.blue;
          return (
            <div
              key={report.id}
              onClick={() => { setActiveReport(report); setView("detail"); }}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(15,30,80,0.06)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color + "50"; e.currentTarget.style.boxShadow = `0 4px 16px ${color}14`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "0 1px 4px rgba(15,30,80,0.06)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <Chip label={report.category} color={color} />
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ ...mono, fontSize: 10, color: C.teal }}>● Live</span>
                  <span style={{ ...mono, fontSize: 10, color: C.dim }}>{report.saved_at}</span>
                </div>
              </div>
              <div style={{ ...slab, fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 5, lineHeight: 1.4 }}>{report.title}</div>
              <p style={{ ...mono, fontSize: 11, color: C.sub, lineHeight: 1.6, marginBottom: 12 }}>{report.description}</p>
              <div style={{ borderTop: `1px solid ${C.border2}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
                  {report.tags.slice(0, 3).map(t => <Chip key={t} label={t} color={C.dim} size="xs" />)}
                </div>
                <span style={{ ...mono, fontSize: 11, color: color, fontWeight: 600 }}>View Report →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Q&A CHAT
// ═══════════════════════════════════════════════════════════════════════════════

type ChatRole = "user" | "ai";
interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
  chart?: ReportChart;
  table?: { cols: string[]; rows: any[][] };
  savedAs?: string;
}

const QA_PAIRS: Array<{ match: string[]; answer: string; chart?: ReportChart }> = [
  { match: ["top 10 product", "top product", "best product", "best selling product"], answer: "Here are your **top 10 products by sales value** this month. PV-100 (Pulmovax) and CM-10MG (CardioMax 10mg) are leading. Note that DC-XR500 is #1 by revenue but shows a –9.2% MoM decline — worth monitoring.", chart: "scatter_sales_promo" },
  { match: ["less promot", "high sales low promot", "under promot", "not promot enough"], answer: "I've identified SKUs with high sales but low promotional activity. **PV-100 (Pulmovax)** stands out — ৳4.2M in sales with only 12 promotional sessions this month. **GP-400 (GastroPro)** also shows high sales efficiency at only 9 promotions. These are your best ROI opportunities for increased promotion investment.", chart: "scatter_sales_promo" },
  { match: ["doctor visit", "which doctor", "top doctor", "best doctor", "high capacity doctor", "doctor capacity"], answer: "Doctors ranked by yearly business capacity vs actual visit frequency. **Dr. Tahmina Parvin** (Oncologist, ৳940K capacity) is the most under-visited with only 2 visits. **Dr. Roksana Begum** (৳890K) similarly under-served. Together they represent ৳1.83M/year of untapped potential.", chart: "bar_doctor_capacity" },
  { match: ["territory", "region", "area sales", "territory achievement", "which territory"], answer: "Territory achievement breakdown for August 2025. **Chittagong** is the only territory exceeding target (105.3%). **Khulna** is the weakest at 65.6% — 34.4% below target. Consider rebalancing rep allocation or increasing Khulna's target visits next month.", chart: "bar_territory" },
  { match: ["churn", "chemist risk", "customer risk", "at risk chemist", "losing chemist"], answer: "Chemists ranked by churn risk score. **Sunrise Pharmacy** (score 68.9) is critical with ৳18.4K overdue for 42 days. **LifeCare Pharmacy** (52.1) also at HIGH risk. Combined at-risk ARR is est. ৳264K. Immediate collection + re-engagement visits recommended.", chart: "table_churn" },
  { match: ["brand rx", "prescription brand", "rx sales", "brand prescription", "rx correlation"], answer: "Brand Rx vs Sales correlation. **CardioMax** leads with 1,840 prescriptions driving ৳4.82M. **DiabaCare XR** shows a warning sign — high Rx count (1,120) but declining sales — suggesting prescription-to-dispensing conversion issues. Investigate stock availability at key chemists.", chart: "scatter_rx_sales" },
  { match: ["rep attendance", "field rep attendance", "who is absent", "attendance issue", "late check"], answer: "Comparing rep attendance against sales achievement. Clear correlation visible: reps with >90% attendance consistently exceed 95% sales target. **Jahangir Alam** stands out — 73.1% attendance paired with only 66.1% achievement. **Tanvir Hassan** (80% attendance, 74.7% achievement) also concerning.", chart: "bar_rep_attendance" },
  { match: ["collection", "outstanding", "overdue", "unpaid", "payment"], answer: "Collection analysis: Total outstanding balance is **৳11.7M** as of August — a 179% increase from ৳4.2M in March. The gap between billing and collection is widening every month. **Khulna** and **Barisal** territories have the worst collection rates. Recommend immediate field manager escalation for overdue accounts >30 days." },
  { match: ["achievement", "target", "how are we doing", "performance", "how is performance"], answer: "Overall org target achievement for August is **92.1%** (৳18.42M vs ৳20M target). This is an improvement from July (89.0%). **5 out of 8 territories** are above 80%. CardioMax and Pulmovax are the primary growth drivers. DiabaCare XR is the main drag, pulling overall achievement down by est. 2.4 pts." },
  { match: ["ai insight", "what should i do", "recommendation", "suggest", "advice"], answer: "Based on current data, here are my top 3 strategic recommendations:\n\n**1. Urgent:** Address the ৳11.7M outstanding balance — collection gap is growing 30% faster than sales.\n\n**2. High Priority:** Dr. Tahmina Parvin (৳940K capacity) and Dr. Roksana Begum (৳890K) are critically under-visited. Assign your best reps immediately.\n\n**3. Opportunity:** PV-100 (Pulmovax) and GP-400 (GastroPro) show high sales with low promotion — increasing their sampling budget by 20% should yield est. ৳380K incremental revenue." },
];

function getAIResponse(input: string): { answer: string; chart?: ReportChart } {
  const ql = input.toLowerCase();
  for (const pair of QA_PAIRS) {
    if (pair.match.some(m => ql.includes(m))) {
      return { answer: pair.answer, chart: pair.chart };
    }
  }
  return { answer: `I couldn't find a specific match for "${input}" in the current dataset. Try asking about:\n\n• **Products:** "show top selling products" or "which products are under-promoted"\n• **Doctors:** "which doctors have high capacity but low visits"\n• **Territories:** "compare territory achievement"\n• **Chemists:** "show high churn risk chemists"\n• **Brands:** "brand prescription vs sales correlation"\n• **Collection:** "show outstanding balance analysis"\n\nOr type a natural language question and I'll do my best to answer.` };
}

function SectionChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "ai", text: "Hello! I'm your **PharmaIQ AI Assistant**. Ask me anything about your sales data, field force performance, doctor relationships, or brand analytics.\n\nFor example:\n• *\"Show me top 10 products with high sales but less promoted\"*\n• *\"Which doctors have high capacity but low visit frequency?\"*\n• *\"What is our collection status?\"*\n• *\"Give me AI insights and recommendations\"*" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedChats, setSavedChats] = useState<number[]>([]);

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", text: input };
    const q = input;
    setMessages(p => [...p, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const { answer, chart } = getAIResponse(q);
      const aiMsg: ChatMessage = { id: Date.now() + 1, role: "ai", text: answer, chart };
      setMessages(p => [...p, aiMsg]);
      setLoading(false);
    }, 800);
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const toggleSave = (id: number) => setSavedChats(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const formatText = (text: string) => text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} style={{ margin: "2px 0", lineHeight: 1.7 }}>
        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: C.text, fontWeight: 700 }}>{part}</strong> : <span key={j}>{part}</span>)}
      </p>
    );
  });

  const suggestions = ["Show top 10 products with high sales but less promoted", "Which doctors have high capacity but low visits?", "Show chemists with high churn risk", "Compare territory achievement", "What should I prioritise this week?"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", minHeight: 500 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexShrink: 0 }}>
        <span style={{ width: 36, height: 36, background: `${C.purple}14`, border: `1px solid ${C.purple}28`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Brain size={18} color={C.purple} />
        </span>
        <div>
          <div style={{ ...slab, fontSize: 15, fontWeight: 700, color: C.text }}>Ask AI</div>
          <div style={{ ...mono, fontSize: 11, color: C.sub }}>Natural language Q&A on your pharma data · Aug 2025</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => setMessages([messages[0]])} style={{ ...mono, fontSize: 11, color: C.sub, background: C.pill, border: `1px solid ${C.border}`, padding: "5px 12px", borderRadius: 6, cursor: "pointer" }}>Clear chat</button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, paddingBottom: 4, scrollbarWidth: "none" as const }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: "flex", gap: 10, flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
            {/* Avatar */}
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: msg.role === "user" ? C.blue : `${C.purple}18`, border: `2px solid ${msg.role === "user" ? C.blue : C.purple}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {msg.role === "user" ? <span style={{ ...mono, fontSize: 11, color: "#fff", fontWeight: 700 }}>AD</span> : <Brain size={14} color={C.purple} />}
            </div>

            {/* Bubble */}
            <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{
                background: msg.role === "user" ? C.blue : C.surface,
                border: msg.role === "user" ? "none" : `1px solid ${C.border}`,
                borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                padding: "12px 16px",
                boxShadow: "0 1px 4px rgba(15,30,80,0.08)",
              }}>
                <div style={{ ...mono, fontSize: 12, color: msg.role === "user" ? "#fff" : C.sub, lineHeight: 1.7 }}>
                  {formatText(msg.text)}
                </div>
              </div>

              {/* Chart output */}
              {msg.chart && (
                <Card style={{ border: `1px solid ${C.purple}25`, background: `${C.purple}03` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ ...mono, fontSize: 10, color: C.purple, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>Generated Visualization</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => toggleSave(msg.id)}
                        style={{ ...mono, fontSize: 11, color: savedChats.includes(msg.id) ? C.amber : C.sub, background: savedChats.includes(msg.id) ? `${C.amber}12` : C.pill, border: `1px solid ${savedChats.includes(msg.id) ? C.amber + "40" : C.border}`, padding: "4px 10px", borderRadius: 5, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                      >
                        <Star size={11} /> {savedChats.includes(msg.id) ? "Saved" : "Save to Reports"}
                      </button>
                    </div>
                  </div>
                  <ReportVisualization chart={msg.chart} />
                </Card>
              )}

              {/* Timestamp */}
              <span style={{ ...mono, fontSize: 10, color: C.dim, textAlign: msg.role === "user" ? "right" as const : "left" as const }}>
                {msg.role === "ai" ? "PharmaIQ AI · " : "You · "}just now
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${C.purple}18`, border: `2px solid ${C.purple}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Brain size={14} color={C.purple} />
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px 12px 12px 4px", padding: "14px 18px", display: "flex", gap: 6, alignItems: "center" }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.purple, opacity: 0.4 + i * 0.2 }} />)}
              <span style={{ ...mono, fontSize: 11, color: C.sub, marginLeft: 6 }}>Analysing your data…</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div style={{ flexShrink: 0, paddingTop: 10, paddingBottom: 10 }}>
          <p style={{ ...mono, fontSize: 10, color: C.sub, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8 }}>Suggested questions</p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => { setInput(s); }} style={{ ...mono, fontSize: 11, color: C.blue, background: `${C.blue}08`, border: `1px solid ${C.blue}20`, padding: "6px 12px", borderRadius: 6, cursor: "pointer", textAlign: "left" as const }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{ flexShrink: 0, display: "flex", gap: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
        <div style={{ flex: 1, position: "relative" }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about your sales, doctors, chemists, brands… (Enter to send)"
            rows={2}
            style={{ width: "100%", ...mono, fontSize: 13, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface, color: C.text, outline: "none", resize: "none" as const, boxSizing: "border-box" as const, lineHeight: 1.5, boxShadow: "0 1px 4px rgba(15,30,80,0.06)" }}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          style={{ width: 48, height: 48, background: input.trim() ? C.blue : C.dim, border: "none", borderRadius: 10, cursor: input.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-end", flexShrink: 0, transition: "background 0.15s" }}
        >
          <ChevronRight size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview",   label: "Overview",    icon: LayoutDashboard },
  { id: "sales",      label: "Sales",       icon: TrendingUp      },
  { id: "fieldforce", label: "Field Force", icon: Users           },
  { id: "doctors",    label: "Doctors",     icon: Stethoscope     },
  { id: "chemists",   label: "Chemists",    icon: Store           },
  { id: "brands",     label: "Brands",      icon: Tag             },
  { id: "products",   label: "Products",    icon: Package         },
  { id: "reports",    label: "Reports",     icon: FileText        },
  { id: "chat",       label: "Ask AI",      icon: Brain           },
] as const;
type NavId = typeof NAV[number]["id"];

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState<NavId>("overview");
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [selectedRep, setSelectedRep] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedChemist, setSelectedChemist] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const activeNav = NAV.find(n => n.id === active)!;

  const handleNav = (id: NavId) => {
    setActive(id);
    setSelectedRep(null); setSelectedDoctor(null); setSelectedChemist(null);
    setSelectedBrand(null); setSelectedProduct(null);
  };

  const getDetailTitle = () => {
    if (active === "fieldforce" && selectedRep) return fieldForceList.find(r => r.user_id === selectedRep)?.name ?? "";
    if (active === "doctors" && selectedDoctor) return doctorList.find(d => d.doctor_id === selectedDoctor)?.name ?? "";
    if (active === "chemists" && selectedChemist) return chemistList.find(c => c.customer_id === selectedChemist)?.customer_name ?? "";
    if (active === "brands" && selectedBrand) return brandList.find(b => b.brand_id === selectedBrand)?.brand_name ?? "";
    if (active === "products" && selectedProduct) return productList.find(p => p.product_id === selectedProduct)?.name ?? "";
    return activeNav.label;
  };

  const renderContent = () => {
    if (active === "sales")    return <SectionSales />;
    if (active === "reports")  return <SectionReports />;
    if (active === "chat")     return <SectionChat />;
    if (active === "fieldforce") {
      if (selectedRep) { const r = fieldForceList.find(x => x.user_id === selectedRep)!; return <RepDetail rep={r} onBack={() => setSelectedRep(null)} />; }
      return <SectionFieldForce onSelect={setSelectedRep} />;
    }
    if (active === "doctors") {
      if (selectedDoctor) { const d = doctorList.find(x => x.doctor_id === selectedDoctor)!; return <DoctorDetail doc={d} onBack={() => setSelectedDoctor(null)} />; }
      return <SectionDoctors onSelect={setSelectedDoctor} />;
    }
    if (active === "chemists") {
      if (selectedChemist) { const c = chemistList.find(x => x.customer_id === selectedChemist)!; return <ChemistDetail chemist={c} onBack={() => setSelectedChemist(null)} />; }
      return <SectionChemists onSelect={setSelectedChemist} />;
    }
    if (active === "brands") {
      if (selectedBrand) { const b = brandList.find(x => x.brand_id === selectedBrand)!; return <BrandDetail brand={b} onBack={() => setSelectedBrand(null)} />; }
      return <SectionBrands onSelect={setSelectedBrand} />;
    }
    if (active === "products") {
      if (selectedProduct) { const p = productList.find(x => x.product_id === selectedProduct)!; return <ProductDetail product={p} onBack={() => setSelectedProduct(null)} />; }
      return <SectionProducts onSelect={setSelectedProduct} />;
    }
    return <SectionOverview />;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: C.bg, fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: collapsed ? 64 : 220, background: C.sidebar, display: "flex", flexDirection: "column", flexShrink: 0, transition: "width 0.25s", overflow: "hidden" }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ width: 28, height: 28, background: C.blue, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Activity size={15} color="#fff" strokeWidth={2.5} /></span>
          {!collapsed && <div><div style={{ ...slab, fontSize: 13, fontWeight: 700, color: "#fff" }}>PharmaIQ</div><div style={{ ...mono, fontSize: 9, color: C.sidebarText, letterSpacing: "0.06em" }}>BI · ANALYTICS</div></div>}
        </div>
        <nav style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button key={id} onClick={() => handleNav(id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 0" : "9px 12px", borderRadius: 8, border: "none", background: isActive ? C.sidebarActive : "transparent", cursor: "pointer", width: "100%", textAlign: "left", justifyContent: collapsed ? "center" : "flex-start" }}>
                <Icon size={17} color={isActive ? "#fff" : C.sidebarText} style={{ flexShrink: 0 }} />
                {!collapsed && <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : C.sidebarText }}>{label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "8px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => setSidebarCollapsed(!collapsed)} style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "10px 0" : "9px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", width: "100%", justifyContent: collapsed ? "center" : "flex-start" }}>
            {collapsed ? <ChevronRight size={16} color={C.sidebarText} /> : <ChevronLeft size={16} color={C.sidebarText} />}
            {!collapsed && <span style={{ fontSize: 12, color: C.sidebarText }}>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ height: 56, background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, boxShadow: "0 1px 3px rgba(15,30,80,0.05)" }}>
          <div>
            <h1 style={{ ...slab, fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 1 }}>{getDetailTitle()}</h1>
            <p style={{ ...mono, fontSize: 10, color: C.sub }}>{activeNav.label} · August 2025</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.sub }} />
              <input placeholder="Search…" style={{ ...mono, fontSize: 12, paddingLeft: 30, paddingRight: 12, paddingTop: 7, paddingBottom: 7, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text, outline: "none", width: 200 }} />
            </div>
            <button style={{ ...mono, fontSize: 11, color: C.sub, background: C.pill, border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar size={12} /> Aug 2025 <ChevronDown size={11} />
            </button>
            <button style={{ position: "relative", background: "transparent", border: "none", cursor: "pointer" }}>
              <Bell size={17} color={C.sub} />
              <span style={{ position: "absolute", top: 0, right: 0, width: 7, height: 7, background: C.red, borderRadius: "50%", border: "1.5px solid #fff" }} />
            </button>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono, fontSize: 11, color: "#fff", fontWeight: 700 }}>AD</span>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: "20px 24px 40px", scrollbarWidth: "none" }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
