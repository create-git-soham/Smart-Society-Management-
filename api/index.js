/**
 * Smart Society Management System - Backend REST API Server
 * Dual-Mode: Supabase Cloud Database vs Local JSON File Database
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());

// Serve frontend assets statically
app.use(express.static(path.join(__dirname, '..')));

// ==========================================================================
// SEED DATA SETS (For Fresh DB Initialization)
// ==========================================================================

const INITIAL_VENDORS = [
    { id: 1, name: "Raju Mistri", category: "Civil & Masonry" },
    { id: 2, name: "Amit Saini", category: "Carpentry" },
    { id: 3, name: "Ramesh Kumar", category: "Plumbing" },
    { id: 4, name: "Tukaram Patil", category: "Water Supply & Borewell" },
    { id: 5, name: "Suresh Dev", category: "Electrical" },
    { id: 6, name: "Manoj Desai", category: "Fire & Gas Safety" },
    { id: 7, name: "Deepak Shinde", category: "Housekeeping & Waste" },
    { id: 8, name: "Sunil Jadhav", category: "Pest Control" },
    { id: 9, name: "Vikram Mane", category: "Security & Access" },
    { id: 10, name: "Neeraj Gupta", category: "Accounting & Billing" },
    { id: 11, name: "Ashok Kulkarni", category: "Facility Management" },
    { id: 12, name: "Dr. Anjali Joshi", category: "Medical Assistance" }
];

const INITIAL_RESIDENTS = [
    { id: 1, name: "Aarav Sharma", flat: "101-A", phone: "+91 98765 43210", occupancy: "owner", approved: true },
    { id: 2, name: "Priya Patel", flat: "302-B", phone: "+91 98123 45678", occupancy: "tenant", approved: true },
    { id: 3, name: "Rohan Verma", flat: "205-A", phone: "+91 95555 12345", occupancy: "owner", approved: true },
    { id: 4, name: "Sneha Reddy", flat: "404-C", phone: "+91 99887 76655", occupancy: "tenant", approved: false },
    { id: 5, name: "Vikram Singh", flat: "501-B", phone: "+91 88776 65544", occupancy: "owner", approved: true },
    { id: 6, name: "Ananya Iyer", flat: "102-A", phone: "+91 94440 12345", occupancy: "owner", approved: true },
    { id: 7, name: "Kabir Malhotra", flat: "201-B", phone: "+91 93335 98765", occupancy: "tenant", approved: true },
    { id: 8, name: "Meera Joshi", flat: "304-C", phone: "+91 92221 44556", occupancy: "owner", approved: true },
    { id: 9, name: "Arjun Deshmukh", flat: "402-A", phone: "+91 91112 33445", occupancy: "owner", approved: true },
    { id: 10, name: "Aditi Rao", flat: "503-C", phone: "+91 90003 55667", occupancy: "tenant", approved: true },
    { id: 11, name: "Devendra Jha", flat: "104-B", phone: "+91 98884 77889", occupancy: "owner", approved: true },
    { id: 12, name: "Riya Das", flat: "202-C", phone: "+91 97775 66778", occupancy: "tenant", approved: false },
    { id: 13, name: "Sanjay Kulkarni", flat: "301-A", phone: "+91 96666 55443", occupancy: "owner", approved: true },
    { id: 14, name: "Zoya Ahmed", flat: "403-B", phone: "+91 95557 44332", occupancy: "tenant", approved: true },
    { id: 15, name: "Rahul Nair", flat: "502-D", phone: "+91 94448 33221", occupancy: "owner", approved: true },
    { id: 16, name: "Neha Gupta", flat: "601-A", phone: "+91 98881 11223", occupancy: "owner", approved: true },
    { id: 17, name: "Karthik Shetty", flat: "602-B", phone: "+91 97772 22334", occupancy: "tenant", approved: true },
    { id: 18, name: "Shruti Desai", flat: "603-C", phone: "+91 96663 33445", occupancy: "owner", approved: true },
    { id: 19, name: "Manish Tiwari", flat: "701-A", phone: "+91 95554 44556", occupancy: "tenant", approved: true },
    { id: 20, name: "Kavita Gokhale", flat: "702-D", phone: "+91 94445 55667", occupancy: "owner", approved: true },
    { id: 21, name: "Amit Bhosale", flat: "801-A", phone: "+91 93336 66778", occupancy: "owner", approved: true },
    { id: 22, name: "Deepa Nambiar", flat: "802-B", phone: "+91 92227 77889", occupancy: "tenant", approved: true },
    { id: 23, name: "Roshan Chauhan", flat: "803-C", phone: "+91 91118 88990", occupancy: "owner", approved: true },
    { id: 24, name: "Aliya Sheikh", flat: "901-A", phone: "+91 90009 99001", occupancy: "owner", approved: true },
    { id: 25, name: "Varun Apte", flat: "902-B", phone: "+91 98880 00112", occupancy: "tenant", approved: false },
    { id: 26, name: "Kiran Kumar", flat: "903-D", phone: "+91 97771 11223", occupancy: "owner", approved: true },
    { id: 27, name: "Vishal Yadav", flat: "1001-A", phone: "+91 96662 22334", occupancy: "owner", approved: true },
    { id: 28, name: "Harish Patil", flat: "1002-B", phone: "+91 95553 33445", occupancy: "tenant", approved: true },
    { id: 29, name: "Pooja Mhatre", flat: "1003-C", phone: "+91 94444 44556", occupancy: "owner", approved: true },
    { id: 30, name: "Sameer Kadam", flat: "1101-A", phone: "+91 93335 55667", occupancy: "owner", approved: true }
];

const INITIAL_VEHICLES = [
    { id: 1, resident_id: 1, plate: "MH-12-XX-1234", type: "Car" },
    { id: 2, resident_id: 1, plate: "MH-12-YY-5678", type: "Bike" },
    { id: 3, resident_id: 2, plate: "GJ-01-ZZ-9999", type: "Car" },
    { id: 4, resident_id: 5, plate: "DL-03-CC-2222", type: "Car" },
    { id: 5, resident_id: 6, plate: "MH-12-CD-9876", type: "Car" },
    { id: 6, resident_id: 8, plate: "MH-14-EF-1122", type: "Bike" },
    { id: 7, resident_id: 9, plate: "MH-12-GH-3344", type: "Car" },
    { id: 8, resident_id: 10, plate: "KA-03-MM-8899", type: "Car" },
    { id: 9, resident_id: 13, plate: "MH-12-NP-7711", type: "Car" },
    { id: 10, resident_id: 15, plate: "KL-07-CD-4455", type: "Car" },
    { id: 11, resident_id: 16, plate: "MH-12-AB-1010", type: "Bike" },
    { id: 12, resident_id: 18, plate: "MH-14-XY-2020", type: "Car" },
    { id: 13, resident_id: 19, plate: "DL-01-ZA-3030", type: "Bike" },
    { id: 14, resident_id: 21, plate: "MH-01-BB-4040", type: "Car" },
    { id: 15, resident_id: 21, plate: "MH-01-CC-5050", type: "Car" },
    { id: 16, resident_id: 23, plate: "MH-02-DD-6060", type: "Bike" },
    { id: 17, resident_id: 24, plate: "MH-12-EE-7070", type: "Car" },
    { id: 18, resident_id: 26, plate: "MH-14-FF-8080", type: "Car" },
    { id: 19, resident_id: 27, plate: "MH-01-GG-9090", type: "Bike" },
    { id: 20, resident_id: 28, plate: "MH-02-HH-0101", type: "Car" },
    { id: 21, resident_id: 29, plate: "MH-12-II-1212", type: "Car" },
    { id: 22, resident_id: 30, plate: "MH-01-SR-5555", type: "Car" },
    { id: 23, resident_id: 30, plate: "MH-01-KK-9999", type: "Car" },
    { id: 24, resident_id: 30, plate: "MH-01-LL-8888", type: "Bike" }
];

const INITIAL_BILLS = [
    { id: 101, resident_id: 1, month: "May 2026", base_fee: 2000, missed_months: 0, waived: false, status: "paid", paid_amount: 2000, paid_date: "2026-05-02" },
    { id: 102, resident_id: 2, month: "May 2026", base_fee: 1500, missed_months: 0, waived: false, status: "paid", paid_amount: 1500, paid_date: "2026-05-10" },
    { id: 103, resident_id: 3, month: "May 2026", base_fee: 2500, missed_months: 1, waived: false, status: "unpaid", paid_amount: null, paid_date: null },
    { id: 104, resident_id: 4, month: "May 2026", base_fee: 1500, missed_months: 0, waived: false, status: "unpaid", paid_amount: null, paid_date: null },
    { id: 105, resident_id: 5, month: "May 2026", base_fee: 2000, missed_months: 0, waived: false, status: "paid", paid_amount: 2000, paid_date: "2026-05-01" },
    { id: 106, resident_id: 7, month: "May 2026", base_fee: 1500, missed_months: 0, waived: false, status: "paid", paid_amount: 1500, paid_date: "2026-05-05" },
    { id: 107, resident_id: 8, month: "May 2026", base_fee: 2200, missed_months: 0, waived: false, status: "paid", paid_amount: 2200, paid_date: "2026-05-04" },
    { id: 108, resident_id: 9, month: "May 2026", base_fee: 2000, missed_months: 2, waived: false, status: "unpaid", paid_amount: null, paid_date: null },
    { id: 109, resident_id: 11, month: "May 2026", base_fee: 2000, missed_months: 0, waived: false, status: "paid", paid_amount: 2000, paid_date: "2026-05-01" },
    { id: 110, resident_id: 13, month: "May 2026", base_fee: 2000, missed_months: 0, waived: true, status: "paid", paid_amount: 0, paid_date: "2026-05-01" },
    { id: 111, resident_id: 15, month: "May 2026", base_fee: 2500, missed_months: 0, waived: false, status: "paid", paid_amount: 2500, paid_date: "2026-05-03" },
    { id: 112, resident_id: 16, month: "May 2026", base_fee: 2000, missed_months: 0, waived: false, status: "paid", paid_amount: 2000, paid_date: "2026-05-07" },
    { id: 113, resident_id: 17, month: "May 2026", base_fee: 1500, missed_months: 0, waived: false, status: "paid", paid_amount: 1500, paid_date: "2026-05-08" },
    { id: 114, resident_id: 18, month: "May 2026", base_fee: 2200, missed_months: 1, waived: false, status: "unpaid", paid_amount: null, paid_date: null },
    { id: 115, resident_id: 20, month: "May 2026", base_fee: 2000, missed_months: 0, waived: false, status: "paid", paid_amount: 2000, paid_date: "2026-05-11" },
    { id: 116, resident_id: 21, month: "May 2026", base_fee: 3000, missed_months: 0, waived: false, status: "paid", paid_amount: 3000, paid_date: "2026-05-02" },
    { id: 117, resident_id: 22, month: "May 2026", base_fee: 1500, missed_months: 0, waived: false, status: "paid", paid_amount: 1500, paid_date: "2026-05-15" },
    { id: 118, resident_id: 24, month: "May 2026", base_fee: 2000, missed_months: 0, waived: false, status: "paid", paid_amount: 2000, paid_date: "2026-05-04" },
    { id: 119, resident_id: 25, month: "May 2026", base_fee: 1500, missed_months: 3, waived: false, status: "unpaid", paid_amount: null, paid_date: null },
    { id: 120, resident_id: 27, month: "May 2026", base_fee: 2000, missed_months: 0, waived: false, status: "paid", paid_amount: 2000, paid_date: "2026-05-09" },
    { id: 121, resident_id: 30, month: "May 2026", base_fee: 3500, missed_months: 0, waived: false, status: "paid", paid_amount: 3500, paid_date: "2026-05-01" }
];

const INITIAL_BOOKINGS = [
    { id: 201, resident_id: 1, facility: "Party Hall", date: "2026-06-15", status: "approved" },
    { id: 202, resident_id: 2, facility: "Turf", date: "2026-06-20", status: "approved" },
    { id: 203, resident_id: 6, facility: "Gymnasium", date: "2026-05-29", status: "approved" },
    { id: 204, resident_id: 11, facility: "Turf", date: "2026-05-30", status: "approved" },
    { id: 205, resident_id: 13, facility: "Party Hall", date: "2026-06-15", status: "rejected" },
    { id: 206, resident_id: 16, facility: "Turf", date: "2026-06-05", status: "pending" },
    { id: 207, resident_id: 18, facility: "Party Hall", date: "2026-06-10", status: "approved" },
    { id: 208, resident_id: 21, facility: "Gymnasium", date: "2026-06-01", status: "approved" },
    { id: 209, resident_id: 23, facility: "Turf", date: "2026-06-02", status: "pending" },
    { id: 210, resident_id: 30, facility: "Party Hall", date: "2026-07-01", status: "approved" }
];

const INITIAL_TICKETS = [
    { id: 301, resident_id: 1, category: "Plumbing", description: "Leaking pipe in master bathroom, causing dampness.", priority: "urgent", status: "assigned", vendor_id: 3 },
    { id: 302, resident_id: 3, category: "Electrical Fault", description: "Balcony light short circuit, sparks flying.", priority: "urgent", status: "pending", vendor_id: null },
    { id: 303, resident_id: 6, category: "Carpentry", description: "Main door handle is loose and needs tightening.", priority: "low", status: "resolved", vendor_id: 2 },
    { id: 304, resident_id: 8, category: "Elevator Malfunction", description: "Wing C elevator making grinding noise.", priority: "urgent", status: "assigned", vendor_id: 11 },
    { id: 305, resident_id: 9, category: "Plumbing", description: "Low water pressure in kitchen flush line.", priority: "medium", status: "assigned", vendor_id: 3 },
    { id: 306, resident_id: 16, category: "Electrical Fault", description: "Common corridor tube-light flickering continuously.", priority: "medium", status: "resolved", vendor_id: 5 },
    { id: 307, resident_id: 21, category: "Carpentry", description: "Balcony wooden flooring plank coming off.", priority: "low", status: "pending", vendor_id: null },
    { id: 308, resident_id: 25, category: "Elevator Malfunction", description: "Wing B elevator door not closing properly on 9th floor.", priority: "urgent", status: "assigned", vendor_id: 11 },
    { id: 309, resident_id: 28, category: "Plumbing", description: "Water not draining in the guest bathroom.", priority: "urgent", status: "resolved", vendor_id: 3 },
    { id: 310, resident_id: 30, category: "Electrical Fault", description: "Main AC trip switch faulty, keeps tripping.", priority: "urgent", status: "pending", vendor_id: null }
];

const INITIAL_VISITORS = [
    { id: 401, resident_id: 2, name: "Raj Mehta", category: "Guest", passcode: "483921", status: "active", created_at: "2026-05-26T14:30:00Z" },
    { id: 402, resident_id: 1, name: "Amazon Delivery", category: "Delivery", passcode: "109283", status: "expired", created_at: "2026-05-26T15:00:00Z" },
    { id: 403, resident_id: 3, name: "UrbanCompany Cleaner", category: "Service", passcode: "554321", status: "active", created_at: "2026-05-26T16:00:00Z" },
    { id: 404, resident_id: 7, name: "Swiggy Delivery", category: "Delivery", passcode: "887651", status: "expired", created_at: "2026-05-26T17:00:00Z" },
    { id: 405, resident_id: 12, name: "Zomato Delivery", category: "Delivery", passcode: "998012", status: "expired", created_at: "2026-05-26T18:00:00Z" },
    { id: 406, resident_id: 16, name: "Milma Milk Delivery", category: "Service", passcode: "112233", status: "active", created_at: "2026-05-26T19:00:00Z" },
    { id: 407, resident_id: 18, name: "Blinkit Groceries", category: "Delivery", passcode: "776655", status: "active", created_at: "2026-05-26T20:00:00Z" },
    { id: 408, resident_id: 21, name: "Aman Trivedi", category: "Guest", passcode: "111111", status: "expired", created_at: "2026-05-26T21:00:00Z" },
    { id: 409, resident_id: 24, name: "MakeUp Artist", category: "Service", passcode: "222333", status: "active", created_at: "2026-05-26T22:00:00Z" },
    { id: 410, resident_id: 27, name: "Flipkart Delivery", category: "Delivery", passcode: "444555", status: "expired", created_at: "2026-05-26T23:00:00Z" },
    { id: 411, resident_id: 30, name: "Gayatri Phadke", category: "Guest", passcode: "999999", status: "active", created_at: "2026-05-26T23:30:00Z" }
];

const INITIAL_EMERGENCY_LOGS = [
    { id: 501, resident_id: 3, flat: "205-A", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: "resolved", resolved_at: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString() },
    { id: 502, resident_id: 8, flat: "304-C", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), status: "active", resolved_at: null },
    { id: 503, resident_id: 15, flat: "502-D", timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), status: "resolved", resolved_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 504, resident_id: 22, flat: "802-B", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), status: "resolved", resolved_at: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString() },
    { id: 505, resident_id: 29, flat: "1003-C", timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), status: "active", resolved_at: null }
];

const INITIAL_RESIDENT_MEMBERS = [
    { id: 1, resident_id: 1, name: "Kiran Sharma", relationship: "Spouse", phone: "+91 98765 43211" },
    { id: 2, resident_id: 1, name: "Ishaan Sharma", relationship: "Child", phone: "" },
    { id: 3, resident_id: 2, name: "Ketan Patel", relationship: "Spouse", phone: "+91 98123 45679" },
    { id: 4, resident_id: 3, name: "Anila Verma", relationship: "Parent", phone: "" },
    { id: 5, resident_id: 5, name: "Ritu Singh", relationship: "Spouse", phone: "+91 88776 65545" }
];

// ==========================================================================
// DATABASE ADAPTER (SUPABASE VS LOCAL FILE JSON)
// ==========================================================================

const useSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_KEY);
let supabase = null;

if (useSupabase) {
    console.log("⚡ Supabase credentials detected. Initializing Supabase cloud adapter...");
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
} else {
    console.log("📁 Supabase keys not detected. Initializing Local JSON file database adapter...");
}

const LOCAL_DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

let localDBMemoryCache = null;

// Local DB Helpers
function loadLocalDB() {
    if (localDBMemoryCache) {
        return localDBMemoryCache;
    }

    let db;
    if (!fs.existsSync(LOCAL_DB_PATH)) {
        db = {
            residents: INITIAL_RESIDENTS.map(r => ({
                ...r,
                is_committee_member: r.id === 1 || r.id === 3
            })),
            vehicles: INITIAL_VEHICLES,
            bills: INITIAL_BILLS,
            bookings: INITIAL_BOOKINGS,
            tickets: INITIAL_TICKETS,
            visitors: INITIAL_VISITORS,
            vendors: INITIAL_VENDORS,
            emergencyLogs: INITIAL_EMERGENCY_LOGS,
            resident_members: INITIAL_RESIDENT_MEMBERS,
            payments: [],
            meetings: [],
            news: [],
            adminSettings: {
                password: "admin123",
                email: process.env.ADMIN_EMAIL || "admin@example.com",
                smtpUser: process.env.SMTP_USER || "",
                smtpPass: process.env.SMTP_PASS || ""
            }
        };
        try {
            if (!fs.existsSync(path.dirname(LOCAL_DB_PATH))) {
                fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
            }
            fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(db, null, 2));
        } catch (e) {
            console.warn("Unable to write initial local DB file. Using in-memory fallback:", e.message);
        }
    } else {
        try {
            db = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf8'));
        } catch (e) {
            console.error("Failed to read local DB file. Seeding fresh in-memory structure.", e.message);
            db = {};
        }
    }

    // Ensure all critical keys exist
    if (!db.meetings) db.meetings = [];
    if (!db.news) db.news = [];
    if (!db.resident_members) db.resident_members = INITIAL_RESIDENT_MEMBERS;
    
    if (db.residents) {
        let updatedRes = false;
        db.residents.forEach(r => {
            if (r.is_committee_member === undefined) {
                r.is_committee_member = r.id === 1 || r.id === 3;
                updatedRes = true;
            }
        });
        if (updatedRes) saveLocalDB(db);
    }
    
    if (!db.adminSettings) {
        db.adminSettings = {
            password: "admin123",
            email: process.env.ADMIN_EMAIL || "admin@example.com",
            smtpUser: process.env.SMTP_USER || "",
            smtpPass: process.env.SMTP_PASS || ""
        };
        saveLocalDB(db);
    } else {
        let updated = false;
        if (db.adminSettings.smtpUser === undefined) {
            db.adminSettings.smtpUser = process.env.SMTP_USER || "";
            updated = true;
        }
        if (db.adminSettings.smtpPass === undefined) {
            db.adminSettings.smtpPass = process.env.SMTP_PASS || "";
            updated = true;
        }
        if (updated) saveLocalDB(db);
    }

    localDBMemoryCache = db;
    return db;
}

function saveLocalDB(data) {
    localDBMemoryCache = data;
    try {
        if (!fs.existsSync(path.dirname(LOCAL_DB_PATH))) {
            fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
        }
        fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
    } catch (e) {
        console.warn("Unable to write to local DB file. Falling back to in-memory state:", e.message);
    }
}

// Seeder logic for Supabase (if tables are clean/empty)
async function seedSupabaseIfEmpty() {
    if (!useSupabase) return;
    try {
        const { data: resData, error: resErr } = await supabase.from('residents').select('id').limit(1);
        if (resErr) {
            console.error("⚠️ Error checking residents table in Supabase. Ensure tables are created using schema.sql in Supabase SQL editor.", resErr.message);
            return;
        }

        if (resData.length === 0) {
            console.log("🌱 Supabase database is empty. Auto-seeding default records...");
            
            // Seed vendors
            await supabase.from('vendors').upsert(INITIAL_VENDORS);
            // Seed residents
            await supabase.from('residents').upsert(INITIAL_RESIDENTS);
            // Seed vehicles
            await supabase.from('vehicles').upsert(INITIAL_VEHICLES);
            // Seed bills
            await supabase.from('bills').upsert(INITIAL_BILLS);
            // Seed bookings
            await supabase.from('bookings').upsert(INITIAL_BOOKINGS);
            // Seed tickets
            await supabase.from('tickets').upsert(INITIAL_TICKETS);
            // Seed visitors
            await supabase.from('visitors').upsert(INITIAL_VISITORS);
            // Seed emergency logs
            await supabase.from('emergency_logs').upsert(INITIAL_EMERGENCY_LOGS);
            // Seed resident members
            await supabase.from('resident_members').upsert(INITIAL_RESIDENT_MEMBERS);

            // Seed admin settings
            try {
                await supabase.from('admin_settings').upsert([
                    { key: 'password', value: 'admin123' },
                    { key: 'email', value: process.env.ADMIN_EMAIL || 'admin@example.com' }
                ]);
            } catch (err) {
                console.warn("⚠️ Could not seed admin_settings in Supabase. You may need to create the table first.", err.message);
            }

            console.log("✅ Seed complete in Supabase Cloud!");
        } else {
            console.log("🟢 Supabase Cloud Tables already have data. Skipping seeder.");
        }
    } catch (e) {
        console.error("❌ Exception during Supabase seeder check:", e.message);
    }
}

// Call seeder check
if (useSupabase) {
    seedSupabaseIfEmpty();
} else {
    loadLocalDB();
}

// ==========================================================================
// REST API ENDPOINTS
// ==========================================================================

// Get entire database
app.get('/api/db', async (req, res) => {
    if (useSupabase) {
        try {
            // Retrieve all tables in parallel
            const [
                { data: residents },
                { data: vehicles },
                { data: bills },
                { data: bookings },
                { data: tickets },
                { data: visitors },
                { data: vendors },
                { data: emergencyLogs },
                { data: residentMembers },
                { data: meetings },
                { data: news }
            ] = await Promise.all([
                supabase.from('residents').select('*').order('id', { ascending: true }),
                supabase.from('vehicles').select('*'),
                supabase.from('bills').select('*').order('id', { ascending: true }),
                supabase.from('bookings').select('*').order('date', { ascending: true }),
                supabase.from('tickets').select('*').order('id', { ascending: true }),
                supabase.from('visitors').select('*').order('id', { ascending: true }),
                supabase.from('vendors').select('*'),
                supabase.from('emergency_logs').select('*').order('timestamp', { ascending: true }),
                supabase.from('resident_members').select('*').order('id', { ascending: true }),
                supabase.from('meetings').select('*').order('meeting_date', { ascending: true }),
                supabase.from('news').select('*').order('id', { ascending: true })
            ]);

            res.json({
                residents: residents || [],
                vehicles: vehicles || [],
                bills: bills || [],
                bookings: bookings || [],
                tickets: tickets || [],
                visitors: visitors || [],
                vendors: vendors || [],
                emergencyLogs: emergencyLogs || [],
                resident_members: residentMembers || [],
                meetings: meetings || [],
                news: news || []
            });
        } catch (e) {
            console.error("REST Server read failed", e);
            res.status(500).json({ error: "Failed to fetch cloud database", details: e.message });
        }
    } else {
        const local = loadLocalDB();
        res.json(local);
    }
});

// Reset database
app.post('/api/db/reset', async (req, res) => {
    if (useSupabase) {
        try {
            // Drop rows
            await supabase.from('news').delete().neq('id', 0);
            await supabase.from('meetings').delete().neq('id', 0);
            await supabase.from('resident_members').delete().neq('id', 0);
            await supabase.from('emergency_logs').delete().neq('id', 0);
            await supabase.from('tickets').delete().neq('id', 0);
            await supabase.from('visitors').delete().neq('id', 0);
            await supabase.from('bookings').delete().neq('id', 0);
            await supabase.from('bills').delete().neq('id', 0);
            await supabase.from('vehicles').delete().neq('id', 0);
            await supabase.from('residents').delete().neq('id', 0);
            await supabase.from('vendors').delete().neq('id', 0);

            // Reseed
            await supabase.from('vendors').insert(INITIAL_VENDORS);
            await supabase.from('residents').insert(INITIAL_RESIDENTS.map(r => ({
                ...r,
                is_committee_member: r.id === 1 || r.id === 3
            })));
            await supabase.from('vehicles').insert(INITIAL_VEHICLES);
            await supabase.from('bills').insert(INITIAL_BILLS);
            await supabase.from('bookings').insert(INITIAL_BOOKINGS);
            await supabase.from('tickets').insert(INITIAL_TICKETS);
            await supabase.from('visitors').insert(INITIAL_VISITORS);
            await supabase.from('emergency_logs').insert(INITIAL_EMERGENCY_LOGS);
            await supabase.from('resident_members').insert(INITIAL_RESIDENT_MEMBERS);

            res.json({ success: true, message: "Supabase database reset to defaults!" });
        } catch (e) {
            res.status(500).json({ error: "Reset failed", details: e.message });
        }
    } else {
        const defaultDB = {
            residents: INITIAL_RESIDENTS.map(r => ({
                ...r,
                is_committee_member: r.id === 1 || r.id === 3
            })),
            vehicles: INITIAL_VEHICLES,
            bills: INITIAL_BILLS,
            bookings: INITIAL_BOOKINGS,
            tickets: INITIAL_TICKETS,
            visitors: INITIAL_VISITORS,
            vendors: INITIAL_VENDORS,
            emergencyLogs: INITIAL_EMERGENCY_LOGS,
            resident_members: INITIAL_RESIDENT_MEMBERS,
            payments: [],
            meetings: [],
            news: []
        };
        saveLocalDB(defaultDB);
        res.json({ success: true, message: "Local JSON database reset to defaults!" });
    }
});

// POST register resident
app.post('/api/residents', async (req, res) => {
    const resident = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('residents').insert([resident]).select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    } else {
        const local = loadLocalDB();
        local.residents.push(resident);
        saveLocalDB(local);
        res.status(201).json(resident);
    }
});

// PUT resident approval status
app.put('/api/residents/:id/approve', async (req, res) => {
    const id = parseInt(req.params.id);
    const { approved } = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('residents').update({ approved }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const resObj = local.residents.find(r => r.id === id);
        if (resObj) {
            resObj.approved = approved;
            saveLocalDB(local);
            res.json(resObj);
        } else {
            res.status(404).json({ error: "Resident not found" });
        }
    }
});

// DELETE remove resident profile
app.delete('/api/residents/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid resident ID" });
    }

    if (useSupabase) {
        const { error } = await supabase.from('residents').delete().eq('id', id);
        if (error) return res.status(400).json({ error: error.message });
        res.json({ success: true, message: `Resident ${id} permanently deleted` });
    } else {
        const local = loadLocalDB();
        local.residents = local.residents.filter(r => r.id !== id);
        
        // Manual cascading deletes for local DB
        local.vehicles = local.vehicles.filter(v => v.resident_id !== id);
        local.bills = local.bills.filter(b => b.resident_id !== id);
        local.bookings = local.bookings.filter(bk => bk.resident_id !== id);
        local.tickets = local.tickets.filter(t => t.resident_id !== id);
        local.visitors = local.visitors.filter(v => v.resident_id !== id);
        if (local.resident_members) {
            local.resident_members = local.resident_members.filter(m => m.resident_id !== id);
        }
        if (local.emergencyLogs) {
            local.emergencyLogs = local.emergencyLogs.filter(e => e.resident_id !== id);
        }
        
        saveLocalDB(local);
        res.json({ success: true, message: `Resident ${id} permanently deleted (local cascade)` });
    }
});

// POST add resident member
app.post('/api/residents/:residentId/members', async (req, res) => {
    const residentId = parseInt(req.params.residentId);
    const member = req.body;
    member.resident_id = residentId;

    if (useSupabase) {
        const { data, error } = await supabase.from('resident_members').insert([member]).select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    } else {
        const local = loadLocalDB();
        if (!local.resident_members) local.resident_members = [];
        local.resident_members.push(member);
        saveLocalDB(local);
        res.status(201).json(member);
    }
});

// DELETE remove resident member
app.delete('/api/members/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid member ID" });
    }

    if (useSupabase) {
        const { error } = await supabase.from('resident_members').delete().eq('id', id);
        if (error) return res.status(400).json({ error: error.message });
        res.json({ success: true, message: `Member ${id} removed` });
    } else {
        const local = loadLocalDB();
        if (!local.resident_members) local.resident_members = [];
        local.resident_members = local.resident_members.filter(m => m.id !== id);
        saveLocalDB(local);
        res.json({ success: true, message: `Member ${id} removed (local fallback)` });
    }
});

// POST add vehicle
app.post('/api/vehicles', async (req, res) => {
    const vehicle = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('vehicles').insert([vehicle]).select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    } else {
        const local = loadLocalDB();
        local.vehicles.push(vehicle);
        saveLocalDB(local);
        res.status(201).json(vehicle);
    }
});

// DELETE remove vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (useSupabase) {
        const { error } = await supabase.from('vehicles').delete().eq('id', id);
        if (error) return res.status(400).json({ error: error.message });
        res.json({ success: true });
    } else {
        const local = loadLocalDB();
        local.vehicles = local.vehicles.filter(v => v.id !== id);
        saveLocalDB(local);
        res.json({ success: true });
    }
});

// PUT waive penalty
app.put('/api/bills/:id/waive', async (req, res) => {
    const id = parseInt(req.params.id);
    if (useSupabase) {
        const { data, error } = await supabase.from('bills').update({ waived: true }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const bill = local.bills.find(b => b.id === id);
        if (bill) {
            bill.waived = true;
            saveLocalDB(local);
            res.json(bill);
        } else {
            res.status(404).json({ error: "Bill not found" });
        }
    }
});

// POST pay bill
app.post('/api/bills/:id/pay', async (req, res) => {
    const id = parseInt(req.params.id);
    const { paidAmount, paidDate } = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('bills').update({
            status: 'paid',
            paid_amount: paidAmount,
            paid_date: paidDate
        }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const bill = local.bills.find(b => b.id === id);
        if (bill) {
            bill.status = 'paid';
            bill.paid_amount = paidAmount;
            bill.paid_date = paidDate;
            saveLocalDB(local);
            res.json(bill);
        } else {
            res.status(404).json({ error: "Bill not found" });
        }
    }
});

// POST add booking
app.post('/api/bookings', async (req, res) => {
    const booking = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('bookings').insert([booking]).select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    } else {
        const local = loadLocalDB();
        local.bookings.push(booking);
        saveLocalDB(local);
        res.status(201).json(booking);
    }
});

// PUT moderate booking status
app.put('/api/bookings/:id/status', async (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const booking = local.bookings.find(b => b.id === id);
        if (booking) {
            booking.status = status;
            saveLocalDB(local);
            res.json(booking);
        } else {
            res.status(404).json({ error: "Booking not found" });
        }
    }
});

// POST add visitor
app.post('/api/visitors', async (req, res) => {
    const visitor = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('visitors').insert([visitor]).select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    } else {
        const local = loadLocalDB();
        local.visitors.push(visitor);
        saveLocalDB(local);
        res.status(201).json(visitor);
    }
});

// PUT revoke visitor passcode
app.put('/api/visitors/:id/revoke', async (req, res) => {
    const id = parseInt(req.params.id);
    if (useSupabase) {
        const { data, error } = await supabase.from('visitors').update({ status: 'expired' }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const pass = local.visitors.find(p => p.id === id);
        if (pass) {
            pass.status = 'expired';
            saveLocalDB(local);
            res.json(pass);
        } else {
            res.status(404).json({ error: "Visitor pass not found" });
        }
    }
});

// POST raise helpdesk ticket
app.post('/api/tickets', async (req, res) => {
    const ticket = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('tickets').insert([ticket]).select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    } else {
        const local = loadLocalDB();
        local.tickets.push(ticket);
        saveLocalDB(local);
        res.status(201).json(ticket);
    }
});

// PUT assign vendor to ticket
app.put('/api/tickets/:id/assign', async (req, res) => {
    const id = parseInt(req.params.id);
    const { vendorId } = req.body;
    const status = vendorId ? 'assigned' : 'pending';
    if (useSupabase) {
        const { data, error } = await supabase.from('tickets').update({ vendor_id: vendorId, status }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const ticket = local.tickets.find(t => t.id === id);
        if (ticket) {
            ticket.vendor_id = vendorId;
            ticket.status = status;
            saveLocalDB(local);
            res.json(ticket);
        } else {
            res.status(404).json({ error: "Ticket not found" });
        }
    }
});

// PUT resolve ticket
app.put('/api/tickets/:id/resolve', async (req, res) => {
    const id = parseInt(req.params.id);
    if (useSupabase) {
        const { data, error } = await supabase.from('tickets').update({ status: 'resolved' }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const ticket = local.tickets.find(t => t.id === id);
        if (ticket) {
            ticket.status = 'resolved';
            saveLocalDB(local);
            res.json(ticket);
        } else {
            res.status(404).json({ error: "Ticket not found" });
        }
    }
});

// POST trigger SOS panic
app.post('/api/emergency', async (req, res) => {
    const log = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('emergency_logs').insert([log]).select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]);
    } else {
        const local = loadLocalDB();
        local.emergencyLogs.push(log);
        saveLocalDB(local);
        res.status(201).json(log);
    }
});

// PUT resolve SOS log
app.put('/api/emergency/:id/resolve', async (req, res) => {
    const id = parseInt(req.params.id);
    const { resolvedAt } = req.body;
    if (useSupabase) {
        const { data, error } = await supabase.from('emergency_logs').update({
            status: 'resolved',
            resolved_at: resolvedAt
        }).eq('id', id).select();
        if (error) return res.status(400).json({ error: error.message });
        res.json(data[0]);
    } else {
        const local = loadLocalDB();
        const log = local.emergencyLogs.find(e => e.id === id);
        if (log) {
            log.status = 'resolved';
            log.resolvedAt = resolvedAt;
            saveLocalDB(local);
            res.json(log);
        } else {
            res.status(404).json({ error: "Emergency log not found" });
        }
    }
});

// POST register new vendor
app.post('/api/vendors', async (req, res) => {
    const { name, category } = req.body;
    if (!name || !category) {
        return res.status(400).json({ error: "Name and category are required" });
    }
    
    if (useSupabase) {
        try {
            // Find next ID
            const { data: maxData, error: maxError } = await supabase
                .from('vendors')
                .select('id')
                .order('id', { ascending: false })
                .limit(1);
            
            if (maxError) return res.status(400).json({ error: maxError.message });
            const nextId = (maxData && maxData.length > 0) ? (parseInt(maxData[0].id) + 1) : 1;
            
            const { data, error } = await supabase
                .from('vendors')
                .insert([{ id: nextId, name, category }])
                .select();
                
            if (error) return res.status(400).json({ error: error.message });
            res.status(201).json(data[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        const local = loadLocalDB();
        const nextId = local.vendors.length > 0 ? (Math.max(...local.vendors.map(v => v.id)) + 1) : 1;
        const newVendor = { id: nextId, name, category };
        local.vendors.push(newVendor);
        saveLocalDB(local);
        res.status(201).json(newVendor);
    }
});

// DELETE remove vendor
app.delete('/api/vendors/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid vendor ID" });
    }
    
    if (useSupabase) {
        const { error } = await supabase
            .from('vendors')
            .delete()
            .eq('id', id);
            
        if (error) return res.status(400).json({ error: error.message });
        res.json({ success: true, message: `Vendor ${id} removed` });
    } else {
        const local = loadLocalDB();
        local.vendors = local.vendors.filter(v => v.id !== id);
        // Cascading SET NULL for local tickets
        local.tickets.forEach(t => {
            if (t.vendor_id === id) {
                t.vendor_id = null;
                t.status = 'pending';
            }
        });
        saveLocalDB(local);
        res.json({ success: true, message: `Vendor ${id} removed` });
    }
});

// ==========================================================================
// SOCIETY MEETINGS MANAGEMENT ENDPOINTS
// ==========================================================================

// GET fetch meetings
app.get('/api/meetings', async (req, res) => {
    if (useSupabase) {
        try {
            const { data, error } = await supabase
                .from('meetings')
                .select('*')
                .order('meeting_date', { ascending: true })
                .order('meeting_time', { ascending: true });
            if (error) return res.status(400).json({ error: error.message });
            res.json(data || []);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        const local = loadLocalDB();
        const meetings = local.meetings || [];
        meetings.sort((a, b) => {
            const dateA = a.meeting_date + 'T' + a.meeting_time;
            const dateB = b.meeting_date + 'T' + b.meeting_time;
            return dateA.localeCompare(dateB);
        });
        res.json(meetings);
    }
});

// Helper to send meeting notification email
async function sendMeetingNotificationEmail(meeting) {
    const settings = await getAdminSettings();
    const activeSmtpUser = settings.smtpUser || process.env.SMTP_USER;
    const activeSmtpPass = settings.smtpPass || process.env.SMTP_PASS;

    if (activeSmtpUser && activeSmtpPass) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: activeSmtpUser,
                    pass: activeSmtpPass
                }
            });

            let audienceText = "All Residents (General Meeting)";
            if (meeting.target_group === "committee") {
                audienceText = "Committee Members Only";
            } else if (meeting.target_group === "individual") {
                audienceText = `Specific Resident (ID: ${meeting.target_resident_id})`;
            }

            const mailOptions = {
                from: `"SmartSociety Hub" <${activeSmtpUser}>`,
                to: settings.email,
                subject: `📢 SmartSociety - New Meeting Scheduled: ${meeting.title}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                        <h2 style="color: #1e3a8a;">New Society Meeting Arranged</h2>
                        <p>Hello,</p>
                        <p>A new meeting has been scheduled inside the SmartSociety Management Suite:</p>
                        <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 15px 0;">
                            <h3 style="margin-top: 0; color: #1d4ed8;">${meeting.title}</h3>
                            <p style="margin: 5px 0;">📅 <strong>Date:</strong> ${meeting.meeting_date}</p>
                            <p style="margin: 5px 0;">⏰ <strong>Time:</strong> ${meeting.meeting_time}</p>
                            <p style="margin: 5px 0;">👥 <strong>Audience:</strong> ${audienceText}</p>
                            <p style="margin: 10px 0 0 0; padding-top: 10px; border-top: 1px solid #f1f5f9; color: #334155;">
                                <strong>Agenda:</strong><br/>
                                ${meeting.agenda || 'No agenda provided.'}
                            </p>
                        </div>
                        <p>This is an automated notification. Relevant residents will see this update on their Resident Dashboard.</p>
                        <hr style="border: none; border-top: 1px solid #cbd5e1; margin-top: 20px;" />
                        <p style="font-size: 0.8rem; color: #64748b;">SmartSociety Hub System Notification.</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log(`✅ Meeting notification email sent to ${settings.email}`);
        } catch (mailError) {
            console.error("❌ Gmail SMTP meeting notification failed:", mailError.message);
        }
    } else {
        console.log(`ℹ️ SMTP credentials not found. Logged scheduled meeting email alert for: ${meeting.title}`);
    }
}

// POST schedule meeting
app.post('/api/meetings', async (req, res) => {
    const meeting = req.body;
    if (useSupabase) {
        try {
            const { data: maxData, error: maxError } = await supabase
                .from('meetings')
                .select('id')
                .order('id', { ascending: false })
                .limit(1);
            if (maxError) return res.status(400).json({ error: maxError.message });
            const nextId = (maxData && maxData.length > 0) ? (parseInt(maxData[0].id) + 1) : 1;
            meeting.id = nextId;

            const { data, error } = await supabase
                .from('meetings')
                .insert([meeting])
                .select();
            if (error) return res.status(400).json({ error: error.message });
            
            // Send email notification asynchronously
            sendMeetingNotificationEmail(data[0]).catch(err => console.error(err));

            res.status(201).json(data[0]);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        const local = loadLocalDB();
        if (!local.meetings) local.meetings = [];
        const nextId = local.meetings.length > 0 ? (Math.max(...local.meetings.map(m => m.id)) + 1) : 1;
        meeting.id = nextId;
        local.meetings.push(meeting);
        saveLocalDB(local);

        // Send email notification asynchronously
        sendMeetingNotificationEmail(meeting).catch(err => console.error(err));

        res.status(201).json(meeting);
    }
});

// DELETE cancel meeting
app.delete('/api/meetings/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid meeting ID" });
    }

    if (useSupabase) {
        try {
            const { error } = await supabase
                .from('meetings')
                .delete()
                .eq('id', id);
            if (error) return res.status(400).json({ error: error.message });
            res.json({ success: true, message: `Meeting ${id} canceled` });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        const local = loadLocalDB();
        if (!local.meetings) local.meetings = [];
        local.meetings = local.meetings.filter(m => m.id !== id);
        saveLocalDB(local);
        res.json({ success: true, message: `Meeting ${id} canceled` });
    }
});

// ==========================================================================
// RWA NEWS BROADCAST ENDPOINTS
// ==========================================================================

// GET fetch news
app.get('/api/news', async (req, res) => {
    if (useSupabase) {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('id', { ascending: false });
            if (error) return res.status(400).json({ error: error.message });
            res.json(data || []);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        const local = loadLocalDB();
        const news = local.news || [];
        news.sort((a, b) => b.id - a.id);
        res.json(news);
    }
});

// POST broadcast news notice
app.post('/api/news', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    const newsItem = {
        id: Date.now(),
        title,
        content,
        created_at: new Date().toISOString()
    };

    if (useSupabase) {
        try {
            const { data, error } = await supabase
                .from('news')
                .insert(newsItem)
                .select();
            if (error) return res.status(400).json({ error: error.message });
            res.status(201).json(data[0]);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        const local = loadLocalDB();
        if (!local.news) local.news = [];
        local.news.push(newsItem);
        saveLocalDB(local);
        res.status(201).json(newsItem);
    }
});

// DELETE delete news notice
app.delete('/api/news/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid news ID" });
    }

    if (useSupabase) {
        try {
            const { error } = await supabase
                .from('news')
                .delete()
                .eq('id', id);
            if (error) return res.status(400).json({ error: error.message });
            res.json({ success: true, message: `News notice ${id} deleted` });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        const local = loadLocalDB();
        if (!local.news) local.news = [];
        local.news = local.news.filter(n => n.id !== id);
        saveLocalDB(local);
        res.json({ success: true, message: `News notice ${id} deleted` });
    }
});

// ==========================================================================
// ADMIN AUTHENTICATION & PASSWORD RESET SYSTEM
// ==========================================================================

let activeResetToken = null; // Stores { code, email, expiresAt }

// Helper to retrieve admin settings (password, email) from Supabase or Local DB
async function getAdminSettings() {
    let password = "admin123";
    let email = process.env.ADMIN_EMAIL || "admin@example.com";
    let smtpUser = process.env.SMTP_USER || "";
    let smtpPass = process.env.SMTP_PASS || "";
    let settingsLoadedFromSupabase = false;

    if (useSupabase) {
        try {
            const { data, error } = await supabase.from('admin_settings').select('*');
            if (!error && data && data.length > 0) {
                const passItem = data.find(item => item.key === 'password');
                const emailItem = data.find(item => item.key === 'email');
                const userItem = data.find(item => item.key === 'smtp_user');
                const pswItem = data.find(item => item.key === 'smtp_pass');

                if (passItem) password = passItem.value;
                if (emailItem) email = emailItem.value;
                if (userItem) smtpUser = userItem.value;
                if (pswItem) smtpPass = pswItem.value;
                settingsLoadedFromSupabase = true;
            } else if (error) {
                console.warn("⚠️ admin_settings table query in Supabase failed, falling back to local file. Error:", error.message);
            }
        } catch (err) {
            console.warn("⚠️ admin_settings table not found in Supabase. Using fallback.", err.message);
        }
    }

    if (!settingsLoadedFromSupabase) {
        const local = loadLocalDB();
        if (local.adminSettings) {
            password = local.adminSettings.password || password;
            email = local.adminSettings.email || email;
            smtpUser = local.adminSettings.smtpUser || smtpUser;
            smtpPass = local.adminSettings.smtpPass || smtpPass;
        }
    }

    return { password, email, smtpUser, smtpPass };
}

// Helper to save admin setting
async function saveAdminSetting(key, value) {
    if (useSupabase) {
        try {
            const { error } = await supabase.from('admin_settings').upsert([{ key, value }]);
            if (error) {
                console.warn(`⚠️ Failed to save admin setting ${key} in Supabase, falling back to local file. Error:`, error.message);
            }
        } catch (err) {
            console.error(`⚠️ Failed to save admin setting ${key} in Supabase:`, err.message);
        }
    }

    // Always mirror/persist in local JSON database
    const local = loadLocalDB();
    if (!local.adminSettings) local.adminSettings = {};
    const localKey = key === 'smtp_user' ? 'smtpUser' : (key === 'smtp_pass' ? 'smtpPass' : key);
    local.adminSettings[localKey] = value;
    saveLocalDB(local);
}

// POST admin login validation
app.post('/api/admin/login', async (req, res) => {
    const { password } = req.body;
    const settings = await getAdminSettings();
    if (password === settings.password) {
        res.json({ success: true, message: "Logged in successfully." });
    } else {
        res.status(401).json({ error: "Incorrect admin password." });
    }
});

// GET admin settings (excluding actual password/SMTP keys for safety, returning masks)
app.get('/api/admin/settings', async (req, res) => {
    const settings = await getAdminSettings();
    res.json({
        email: settings.email,
        smtpUser: settings.smtpUser,
        hasSmtpPass: !!settings.smtpPass
    });
});

// PUT update admin settings & credentials
app.put('/api/admin/settings', async (req, res) => {
    const { email, smtpUser, smtpPass, currentPassword, newPassword } = req.body;
    const settings = await getAdminSettings();

    // Verify current admin password to save settings
    if (!currentPassword || currentPassword !== settings.password) {
        return res.status(401).json({ error: "Authentication failed. Incorrect current password." });
    }

    // Handle password change if requested
    if (newPassword && newPassword.trim()) {
        if (newPassword.trim().length < 4) {
            return res.status(400).json({ error: "New password must be at least 4 characters long." });
        }
        await saveAdminSetting('password', newPassword.trim());
    }

    // Save general admin settings
    if (email && email.trim()) {
        await saveAdminSetting('email', email.trim());
    }
    if (smtpUser !== undefined) {
        await saveAdminSetting('smtp_user', smtpUser.trim());
    }
    // Only save App Password if it was edited (not the masked placeholder)
    if (smtpPass !== undefined && smtpPass !== '••••••••' && smtpPass.trim() !== '') {
        await saveAdminSetting('smtp_pass', smtpPass.trim());
    } else if (smtpPass === '') {
        await saveAdminSetting('smtp_pass', '');
    }

    res.json({ success: true, message: "Admin system settings updated successfully." });
});

// POST request admin password reset
app.post('/api/admin/forgot-password', async (req, res) => {
    const { email } = req.body;
    const settings = await getAdminSettings();

    if (!email || email.trim().toLowerCase() !== settings.email.trim().toLowerCase()) {
        return res.status(400).json({ error: "Email address not recognized as administrator." });
    }

    // Generate 6-digit OTP code dynamically (different every time)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    activeResetToken = {
        code,
        email: settings.email,
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    console.log(`\n==========================================`);
    console.log(`🔑 [ADMIN PASSWORD RESET OTP]: ${code}`);
    console.log(`📩 Target Email: ${settings.email}`);
    console.log(`==========================================\n`);

    const activeSmtpUser = settings.smtpUser || process.env.SMTP_USER;
    const activeSmtpPass = settings.smtpPass || process.env.SMTP_PASS;

    // Gmail SMTP sending
    if (activeSmtpUser && activeSmtpPass) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: activeSmtpUser,
                    pass: activeSmtpPass
                }
            });

            const mailOptions = {
                from: `"SmartSociety Hub" <${activeSmtpUser}>`,
                to: settings.email,
                subject: "🔑 SmartSociety - Admin Password Reset Code",
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                        <h2 style="color: #1e3a8a;">SmartSociety Management Suite</h2>
                        <p>Hello Administrator,</p>
                        <p>We received a request to reset the Admin Control Panel password. Use the following 6-digit verification code to proceed:</p>
                        <div style="font-size: 2rem; font-weight: bold; background: #e2e8f0; padding: 15px 30px; display: inline-block; letter-spacing: 5px; border-radius: 6px; margin: 15px 0; color: #1d4ed8;">
                            ${code}
                        </div>
                        <p>This verification code is valid for <strong>10 minutes</strong>. If you did not initiate this request, please ignore this message.</p>
                        <hr style="border: none; border-top: 1px solid #cbd5e1; margin-top: 20px;" />
                        <p style="font-size: 0.8rem; color: #64748b;">This is an automated security notification from SmartSociety Hub.</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            return res.json({ success: true, message: "Verification code sent to your Gmail inbox." });
        } catch (mailError) {
            console.error("❌ Gmail SMTP sending failed:", mailError.message);
            // Fall back to dev console message
            return res.json({
                success: true,
                message: "Gmail SMTP failed. Fallback to developer console active.",
                devFallback: true,
                code: code
            });
        }
    } else {
        // Dev fallback
        return res.json({
            success: true,
            message: "SMTP credentials not found. Fallback to developer console active.",
            devFallback: true,
            code: code
        });
    }
});

// POST verify OTP and update admin password
app.post('/api/admin/reset-password', async (req, res) => {
    const { code, newPassword } = req.body;

    if (!activeResetToken) {
        return res.status(400).json({ error: "No active password reset request found." });
    }

    if (Date.now() > activeResetToken.expiresAt) {
        activeResetToken = null;
        return res.status(400).json({ error: "Verification code has expired. Please request a new one." });
    }

    if (!code || code.trim() !== activeResetToken.code) {
        return res.status(400).json({ error: "Invalid verification code. Please check your email." });
    }

    if (!newPassword || newPassword.trim().length < 4) {
        return res.status(400).json({ error: "Password must be at least 4 characters long." });
    }

    // Save the new password
    await saveAdminSetting('password', newPassword);
    
    // Clear active token
    activeResetToken = null;

    res.json({ success: true, message: "Admin password successfully updated." });
});

// Start Web Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Smart Society API Server is running locally at http://localhost:${PORT}`);
    });
}

module.exports = app;
