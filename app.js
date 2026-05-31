/**
 * Smart Society Management System - Client Logic & State Engine
 * Integrated with REST API backend & local fallback storage
 */

// ==========================================================================
// 1. DATA MODELS & SEED DATABASE (Fallback only)
// ==========================================================================

const DEFAULT_VENDORS = [
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

// Local state container & fallback manager (initialized with in-memory defaults)
let db = {
    residents: INITIAL_RESIDENTS,
    vehicles: INITIAL_VEHICLES,
    bills: INITIAL_BILLS,
    bookings: INITIAL_BOOKINGS,
    tickets: INITIAL_TICKETS,
    visitors: INITIAL_VISITORS,
    vendors: DEFAULT_VENDORS,
    emergencyLogs: INITIAL_EMERGENCY_LOGS,
    resident_members: INITIAL_RESIDENT_MEMBERS
};
let currentRole = "resident";
let activeResidentId = 1;
let currentResidentView = "dashboard";
let currentAdminView = "dashboard";
let currentPayingBillId = null;
let audioContext = null;
let soundInterval = null;
let backendConnected = false;
let adminAuthenticated = false;
let residentLoggedIn = false;

// ==========================================================================
// 2. STATE SYNCHRONIZATION & SERVER FETCHES
// ==========================================================================

async function syncWithServer() {
    try {
        const response = await fetch('/api/db');
        if (response.ok) {
            db = await response.json();
            
            // Database Schema Validation Guard
            if (!db || typeof db !== 'object') db = {};
            if (!Array.isArray(db.residents) || db.residents.length === 0) db.residents = INITIAL_RESIDENTS;
            if (!Array.isArray(db.vehicles) || db.vehicles.length === 0) db.vehicles = INITIAL_VEHICLES;
            if (!Array.isArray(db.bills) || db.bills.length === 0) db.bills = INITIAL_BILLS;
            if (!Array.isArray(db.bookings) || db.bookings.length === 0) db.bookings = INITIAL_BOOKINGS;
            if (!Array.isArray(db.tickets) || db.tickets.length === 0) db.tickets = INITIAL_TICKETS;
            if (!Array.isArray(db.visitors) || db.visitors.length === 0) db.visitors = INITIAL_VISITORS;
            if (!Array.isArray(db.vendors) || db.vendors.length === 0) db.vendors = DEFAULT_VENDORS;
            if (!Array.isArray(db.emergencyLogs) || db.emergencyLogs.length === 0) db.emergencyLogs = INITIAL_EMERGENCY_LOGS;
            if (!Array.isArray(db.resident_members)) db.resident_members = INITIAL_RESIDENT_MEMBERS;
            if (!Array.isArray(db.meetings)) db.meetings = [];
            if (!Array.isArray(db.news)) db.news = [];

            backendConnected = true;
            updateConnectionStatus(true);
        } else {
            throw new Error("HTTP error " + response.status);
        }
    } catch (e) {
        console.warn("Backend API unavailable. Falling back to local storage.", e.message);
        backendConnected = false;
        updateConnectionStatus(false);
        initLocalDatabase();
    }
    updateViews();
}

function initLocalDatabase() {
    try {
        const rawData = localStorage.getItem("smart_society_db");
        if (rawData) {
            db = JSON.parse(rawData);
            // Verify structure
            if (!db || typeof db !== 'object') db = {};
            if (!Array.isArray(db.residents) || db.residents.length === 0) db.residents = INITIAL_RESIDENTS;
            if (!Array.isArray(db.vehicles) || db.vehicles.length === 0) db.vehicles = INITIAL_VEHICLES;
            if (!Array.isArray(db.bills) || db.bills.length === 0) db.bills = INITIAL_BILLS;
            if (!Array.isArray(db.bookings) || db.bookings.length === 0) db.bookings = INITIAL_BOOKINGS;
            if (!Array.isArray(db.tickets) || db.tickets.length === 0) db.tickets = INITIAL_TICKETS;
            if (!Array.isArray(db.visitors) || db.visitors.length === 0) db.visitors = INITIAL_VISITORS;
            if (!Array.isArray(db.vendors) || db.vendors.length === 0) db.vendors = DEFAULT_VENDORS;
            if (!Array.isArray(db.emergencyLogs) || db.emergencyLogs.length === 0) db.emergencyLogs = INITIAL_EMERGENCY_LOGS;
            if (!Array.isArray(db.resident_members)) db.resident_members = INITIAL_RESIDENT_MEMBERS;
            if (!Array.isArray(db.meetings)) db.meetings = [];
            if (!Array.isArray(db.news)) db.news = [];
        } else {
            seedLocalDatabase();
        }
    } catch (e) {
        console.error("Local storage access failed, using in-memory defaults", e);
        // Fallback to in-memory seed (don't save to localStorage since it's failing)
        db = {
            residents: INITIAL_RESIDENTS,
            vehicles: INITIAL_VEHICLES,
            bills: INITIAL_BILLS,
            bookings: INITIAL_BOOKINGS,
            tickets: INITIAL_TICKETS,
            visitors: INITIAL_VISITORS,
            vendors: DEFAULT_VENDORS,
            emergencyLogs: INITIAL_EMERGENCY_LOGS,
            resident_members: INITIAL_RESIDENT_MEMBERS,
            meetings: [],
            news: []
        };
    }
}

function seedLocalDatabase() {
    db = {
        residents: INITIAL_RESIDENTS,
        vehicles: INITIAL_VEHICLES,
        bills: INITIAL_BILLS,
        bookings: INITIAL_BOOKINGS,
        tickets: INITIAL_TICKETS,
        visitors: INITIAL_VISITORS,
        vendors: DEFAULT_VENDORS,
        emergencyLogs: INITIAL_EMERGENCY_LOGS,
        resident_members: INITIAL_RESIDENT_MEMBERS,
        meetings: []
    };
    saveDatabase();
}

function saveDatabase() {
    if (!backendConnected) {
        try {
            localStorage.setItem("smart_society_db", JSON.stringify(db));
        } catch (e) {
            console.error("Failed to save to local storage:", e);
        }
    }
    updateViews();
}

// API request helper wrapper
async function apiRequest(url, method = 'GET', body = null) {
    if (!backendConnected) return null;
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (body) options.body = JSON.stringify(body);
        
        const response = await fetch(url, options);
        if (response.ok) {
            return await response.json();
        }
        const err = await response.json();
        throw new Error(err.error || response.statusText);
    } catch (e) {
        console.error(`API Request to ${url} failed:`, e.message);
        showToast(`Server Error: ${e.message}`, "danger");
        return null;
    }
}

// Update cloud connection badge dynamically in the header
function updateConnectionStatus(isConnected) {
    let badge = document.getElementById("connection-status-badge");
    if (!badge) {
        const logoSub = document.querySelector(".logo-sub");
        if (logoSub) {
            badge = document.createElement("span");
            badge.id = "connection-status-badge";
            badge.style.marginLeft = "8px";
            logoSub.parentNode.appendChild(badge);
        }
    }

    if (badge) {
        badge.className = `badge ${isConnected ? 'badge-success' : 'badge-warning badge-pill'}`;
        badge.textContent = isConnected ? "🟢 Cloud Mode" : "🟡 Local Mode";
    }
}

// ==========================================================================
// 3. UTILITY & CALCULATION ENGINES
// ==========================================================================

// Calculate dynamic penalty based on missed months
function calculateBillDues(bill) {
    if (bill.status !== "unpaid") {
        if (bill.status === "paid") {
            return {
                baseFee: bill.base_fee || bill.baseFee,
                missedMonths: bill.missed_months || 0,
                penalty: bill.penalty || 0,
                total: bill.paid_amount || bill.paidAmount || (bill.base_fee || bill.baseFee)
            };
        }
    }

    const base = bill.base_fee || bill.baseFee;
    let penalty = 0;
    let total = base;

    if (!bill.waived) {
        if (bill.missed_months === 1) {
            penalty = 500;
            total = base + 500;
        } else if (bill.missed_months === 2) {
            penalty = 1000;
            total = (base * 2) + 1000;
        } else if (bill.missed_months >= 3) {
            penalty = 1500;
            total = (base * 3) + 1500;
        }
    } else {
        penalty = 0;
        if (bill.missed_months === 0) {
            total = base;
        } else {
            total = base * (bill.missed_months === 1 ? 1 : bill.missed_months);
        }
    }

    return {
        baseFee: base,
        missedMonths: bill.missed_months,
        penalty: penalty,
        total: total
    };
}

// Validate booking 5 days advance restriction
function validateBookingDate(selectedDateStr) {
    const selectedDate = new Date(selectedDateStr);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = selectedDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 5;
}

// Date format helper (returns dd/mm/yyyy)
function formatDateToDDMMYYYY(dateStr) {
    if (!dateStr) return "—";
    try {
        const dateOnly = dateStr.split('T')[0];
        const parts = dateOnly.split('-');
        if (parts.length === 3) {
            // yyyy-mm-dd format
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    } catch (e) {
        return dateStr;
    }
}

// Passcode helper
function generatePasscode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Toast alerts helper
function showToast(message, type = "primary") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// Web audio synthesized SOS alarm
function playSOSSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.start();
    osc.stop(audioContext.currentTime + 0.4);
}

function startSiren() {
    if (soundInterval) clearInterval(soundInterval);
    playSOSSound();
    soundInterval = setInterval(playSOSSound, 1000);
}

function stopSiren() {
    if (soundInterval) {
        clearInterval(soundInterval);
        soundInterval = null;
    }
}

// ==========================================================================
// 4. ROUTING & CONTROLLERS
// ==========================================================================

function switchRole(role) {
    if (role === "admin" && !adminAuthenticated) {
        // Intercept and request authentication
        openAdminAuthModal();
        return;
    }

    if (role === "resident") {
        // Automatically lock admin access
        adminAuthenticated = false;
    }

    currentRole = role;
    document.getElementById("view-resident-btn").classList.toggle("active", role === "resident");
    document.getElementById("view-admin-btn").classList.toggle("active", role === "admin");
    
    document.getElementById("resident-portal").classList.toggle("hidden", role !== "resident");
    document.getElementById("admin-portal").classList.toggle("hidden", role !== "admin");

    const resSelect = document.getElementById("resident-selector-container");
    resSelect.classList.toggle("hidden", role !== "resident" || !residentLoggedIn);

    const bellContainer = document.getElementById("res-notification-container");
    if (bellContainer) {
        bellContainer.classList.toggle("hidden", role !== "resident" || !residentLoggedIn);
    }

    if (role === "admin") {
        updateAdminViews();
    } else {
        updateResidentViews();
    }
}

function switchResidentView(viewName, element = null) {
    currentResidentView = viewName;
    const panels = document.querySelectorAll("#resident-portal .content-panel");
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(`res-view-${viewName}`).classList.add("active");

    if (element) {
        const navItems = document.querySelectorAll("#resident-portal .nav-item");
        navItems.forEach(item => item.classList.remove("active"));
        element.classList.add("active");
    }

    // Mark notifications as read when navigating to relevant views
    const resident = getCurrentResident();
    if (resident) {
        if (viewName === 'news') {
            markNewsAsRead(resident.id);
        } else if (viewName === 'dashboard') {
            markMeetingsAsRead(resident.id);
        }
    }
}

function switchAdminView(viewName, element = null) {
    currentAdminView = viewName;
    const panels = document.querySelectorAll("#admin-portal .content-panel");
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(`admin-view-${viewName}`).classList.add("active");

    if (element) {
        const navItems = document.querySelectorAll("#admin-portal .nav-item");
        navItems.forEach(item => item.classList.remove("active"));
        element.classList.add("active");
    }

    if (viewName === 'settings') {
        loadAdminSettingsForm();
    }
}

function changeActiveResident(residentId) {
    activeResidentId = parseInt(residentId);
    updateResidentViews();
    showToast(`Switched simulation to: ${getCurrentResident().name}`, "success");
}

function getCurrentResident() {
    if (!db || !db.residents || db.residents.length === 0) {
        return null;
    }
    return db.residents.find(r => r.id === activeResidentId) || db.residents[0] || null;
}

function navigateToAdminSOS() {
    switchAdminView('sos-logs', document.getElementById("admin-nav-sos"));
}

function dismissEmergencyBanner() {
    document.getElementById("admin-emergency-banner").classList.add("hidden");
    stopSiren();
}

// ==========================================================================
// 5. VIEW RENDERERS
// ==========================================================================

function updateViews() {
    populateResidentSelectDropdown();
    if (currentRole === "resident") {
        updateResidentViews();
    } else {
        updateAdminViews();
    }
    updateSOSIndicators();
}

function populateResidentSelectDropdown() {
    const select = document.getElementById("active-resident-select");
    const currentVal = select.value || activeResidentId;
    select.innerHTML = "";
    
    if (db.residents && db.residents.length > 0) {
        db.residents.forEach(res => {
            const opt = document.createElement("option");
            opt.value = res.id;
            opt.textContent = `${res.name} (Flat ${res.flat})`;
            select.appendChild(opt);
        });
        select.value = currentVal;
    }
}

function updateResidentViews() {
    const loginPanel = document.getElementById("resident-login-panel");
    const portalSidebar = document.querySelector("#resident-portal .sidebar");
    const portalContent = document.querySelector("#resident-portal .main-content");
    const resSelect = document.getElementById("resident-selector-container");

    if (!residentLoggedIn) {
        if (loginPanel) loginPanel.classList.remove("hidden");
        if (portalSidebar) portalSidebar.classList.add("hidden");
        if (portalContent) portalContent.classList.add("hidden");
        if (resSelect) resSelect.classList.add("hidden");
        renderDemoResidentChips();
        return;
    }

    if (loginPanel) loginPanel.classList.add("hidden");
    if (portalSidebar) portalSidebar.classList.remove("hidden");
    if (portalContent) portalContent.classList.remove("hidden");
    if (currentRole === "resident" && resSelect) {
        resSelect.classList.remove("hidden");
    }

    const resident = getCurrentResident();
    if (!resident) return;

    // Header badge
    document.getElementById("res-name-badge").textContent = resident.name;
    document.getElementById("res-welcome-name").textContent = resident.name;
    document.getElementById("res-flat-badge").textContent = `Flat ${resident.flat}`;
    
    const avatar = document.getElementById("res-avatar");
    avatar.textContent = resident.name.charAt(0);

    const badge = document.getElementById("res-occupancy-badge");
    badge.className = `badge badge-${resident.occupancy === 'owner' ? 'success' : 'warning'}`;
    badge.textContent = resident.occupancy === "owner" ? "🟢 Owner" : "🟡 Tenant";

    // Dashboard Profile details
    document.getElementById("res-phone-detail").textContent = resident.phone || '';
    document.getElementById("res-status-detail").textContent = resident.occupancy.toUpperCase();
    document.getElementById("res-approved-detail").innerHTML = resident.approved 
        ? `<span class="text-success font-semibold">Verified ✓</span>` 
        : `<span class="text-warning font-semibold">Awaiting Verification</span>`;

    // Vehicles
    const vehicles = db.vehicles.filter(v => v.resident_id === resident.id);
    const vList = document.getElementById("res-vehicles-list");
    vList.innerHTML = "";
    if (vehicles.length === 0) {
        vList.innerHTML = `<div class="empty-state">No vehicles registered.</div>`;
    } else {
        vehicles.forEach(v => {
            const item = document.createElement("div");
            item.className = "vehicle-plate-badge";
            item.innerHTML = `
                <div class="plate-left">
                    <span class="nav-icon">${v.type === 'Car' ? '🚗' : '🏍️'}</span>
                    <div>
                        <span class="plate-number">${v.plate}</span>
                        <span class="plate-type block">${v.type}</span>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline text-danger" onclick="removeVehicle(${v.id})">Remove</button>
            `;
            vList.appendChild(item);
        });
    }

    // Flat Members
    const members = (db.resident_members || []).filter(m => m.resident_id === resident.id);
    const mList = document.getElementById("res-members-list");
    if (mList) {
        mList.innerHTML = "";
        if (members.length === 0) {
            mList.innerHTML = `<div class="empty-state">No members registered.</div>`;
        } else {
            members.forEach(m => {
                const item = document.createElement("div");
                item.className = "vehicle-plate-badge";
                item.innerHTML = `
                    <div class="plate-left">
                        <span class="nav-icon">👤</span>
                        <div>
                            <strong style="color:var(--text-main); font-size:0.95rem; display:block;">${m.name}</strong>
                            <span class="plate-type block" style="margin-top:2px;">${m.relationship}${m.phone ? ` • ${m.phone}` : ''}</span>
                        </div>
                    </div>
                `;
                mList.appendChild(item);
            });
        }
    }

    // Bills Outstandings
    const myBills = db.bills.filter(b => b.resident_id === resident.id && b.status === "unpaid");
    let totalDues = 0;
    myBills.forEach(b => {
        totalDues += calculateBillDues(b).total;
    });

    document.getElementById("res-dues-amount").textContent = totalDues.toLocaleString('en-IN');
    const duesSubtext = document.getElementById("res-dues-subtext");
    const payDuesBtn = document.getElementById("res-pay-dues-btn");
    
    if (totalDues > 0) {
        duesSubtext.textContent = `You have ${myBills.length} outstanding bills.`;
        duesSubtext.className = "text-danger font-semibold";
        payDuesBtn.classList.remove("hidden");
    } else {
        duesSubtext.textContent = "No pending payments for this month. All clear!";
        duesSubtext.className = "text-success font-semibold";
        payDuesBtn.classList.add("hidden");
    }

    // Bills ledger body
    document.getElementById("res-total-unpaid-amount").textContent = `₹${totalDues.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    document.getElementById("res-bill-count-status").textContent = `${myBills.length} unpaid bill cycle(s)`;
    document.getElementById("res-pay-all-btn").classList.toggle("hidden", totalDues === 0);

    const billsBody = document.getElementById("res-bills-list-body");
    billsBody.innerHTML = "";
    const allMyBills = db.bills.filter(b => b.resident_id === resident.id);
    if (allMyBills.length === 0) {
        billsBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No bill records available.</td></tr>`;
    } else {
        allMyBills.forEach(b => {
            const calc = calculateBillDues(b);
            const tr = document.createElement("tr");
            let statusBadge = "";
            let actionBtn = "";

            if (b.status === "paid") {
                statusBadge = `<span class="badge badge-success">PAID</span>`;
                actionBtn = `<button class="btn btn-sm btn-outline" onclick="viewReceipt(${b.id})">📄 Receipt</button>`;
            } else {
                statusBadge = `<span class="badge badge-danger">UNPAID</span>`;
                actionBtn = `<button class="btn btn-sm btn-primary" onclick="initiatePayment(${b.id})">Pay Now</button>`;
            }

            tr.innerHTML = `
                <td><strong>${b.month}</strong></td>
                <td>₹${calc.baseFee}</td>
                <td>${calc.missedMonths}</td>
                <td><span class="${calc.penalty > 0 ? 'text-danger font-semibold' : ''}">₹${calc.penalty}</span></td>
                <td><strong>₹${calc.total}</strong></td>
                <td>${statusBadge}</td>
                <td>${actionBtn}</td>
            `;
            billsBody.appendChild(tr);
        });
    }

    // Render Transaction History
    const txBody = document.getElementById("res-transactions-list-body");
    if (txBody) {
        txBody.innerHTML = "";
        if (allMyBills.length === 0) {
            txBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No transactions recorded.</td></tr>`;
        } else {
            allMyBills.forEach(b => {
                const calc = calculateBillDues(b);
                const tr = document.createElement("tr");
                
                let txRef = "";
                let statusBadge = "";
                let dateDisplay = "—";
                let actionBtn = "";
                
                if (b.status === "paid") {
                    txRef = `TXN-COMP-${b.id}`;
                    statusBadge = `<span class="badge badge-success">Completed</span>`;
                    dateDisplay = formatDateToDDMMYYYY(b.paid_date || b.paidDate);
                    actionBtn = `<button class="btn btn-sm btn-outline" onclick="viewReceipt(${b.id})">📄 Receipt</button>`;
                } else {
                    txRef = `TXN-PEND-${b.id}`;
                    statusBadge = `<span class="badge badge-warning">Not Completed</span>`;
                    dateDisplay = "—";
                    actionBtn = `<button class="btn btn-sm btn-primary" onclick="initiatePayment(${b.id})">Pay Now</button>`;
                }
                
                tr.innerHTML = `
                    <td><code>${txRef}</code></td>
                    <td><strong>${b.month}</strong></td>
                    <td>₹${calc.total.toLocaleString('en-IN')}</td>
                    <td>${statusBadge}</td>
                    <td>${dateDisplay}</td>
                    <td>${actionBtn}</td>
                `;
                txBody.appendChild(tr);
            });
        }
    }

    // Bookings
    const myBookings = db.bookings.filter(bk => bk.resident_id === resident.id);
    const bkList = document.getElementById("res-booking-history");
    bkList.innerHTML = "";
    if (myBookings.length === 0) {
        bkList.innerHTML = `<div class="empty-state">No bookings found.</div>`;
    } else {
        myBookings.forEach(bk => {
            const item = document.createElement("div");
            item.className = "verify-item-widget margin-b-1";
            let statusClass = "warning";
            let statusText = "Pending Approval";
            
            if (bk.status === "approved") {
                statusClass = "success";
                statusText = "Approved";
            } else if (bk.status === "rejected") {
                statusClass = "danger";
                statusText = "Rejected";
            }

            item.innerHTML = `
                <div>
                    <h4 class="font-bold">${bk.facility}</h4>
                    <p class="text-xs text-secondary">Reserved Date: ${bk.date}</p>
                </div>
                <span class="badge badge-${statusClass}">${statusText}</span>
            `;
            bkList.appendChild(item);
        });
    }

    // Visitor Passes (Ticket & Barcode layout)
    const myPasses = db.visitors.filter(v => v.resident_id === resident.id && v.status === "active");
    const passesList = document.getElementById("res-active-passes");
    passesList.innerHTML = "";
    if (myPasses.length === 0) {
        passesList.innerHTML = `<div class="empty-state">No active passes. Create one to allow visitor access.</div>`;
    } else {
        myPasses.forEach(p => {
            const card = document.createElement("div");
            card.className = "pass-card";
            card.innerHTML = `
                <div class="pass-main">
                    <div class="pass-header">
                        <h4 class="font-bold">${p.name}</h4>
                        <span class="badge badge-pill badge-primary">${p.category}</span>
                    </div>
                    <div class="pass-code-display">${p.passcode}</div>
                    <div class="pass-footer-text">Gate Authorization Passcode</div>
                </div>
                <div class="pass-divider"></div>
                <div class="pass-barcode-area">
                    <div class="barcode">
                        <div class="bar bar-1"></div>
                        <div class="bar bar-2"></div>
                        <div class="bar bar-3"></div>
                        <div class="bar bar-4"></div>
                        <div class="bar bar-5"></div>
                        <div class="bar bar-6"></div>
                        <div class="bar bar-7"></div>
                        <div class="bar bar-8"></div>
                    </div>
                    <button class="btn btn-sm btn-outline text-danger" onclick="revokePass(${p.id})">Revoke</button>
                </div>
            `;
            passesList.appendChild(card);
        });
    }

    // Helpdesk Tickets
    const myTickets = db.tickets.filter(t => t.resident_id === resident.id);
    const ticketsBody = document.getElementById("res-tickets-list-body");
    ticketsBody.innerHTML = "";
    if (myTickets.length === 0) {
        ticketsBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No tickets raised.</td></tr>`;
    } else {
        myTickets.forEach(t => {
            const tr = document.createElement("tr");
            if (t.priority === "urgent" && t.status !== "resolved") {
                tr.className = "ticket-row-urgent";
            }

            let statusBadge = "";
            if (t.status === "pending") statusBadge = `<span class="badge badge-warning">Awaiting Assignment</span>`;
            else if (t.status === "assigned") statusBadge = `<span class="badge badge-pill badge-admin">Vendor Assigned</span>`;
            else statusBadge = `<span class="badge badge-success">Resolved ✓</span>`;

            const vendor = t.vendor_id ? db.vendors.find(v => v.id === t.vendor_id) : null;
            const vendorText = vendor ? `${vendor.name} (${vendor.category})` : `<span class="text-muted">Not assigned</span>`;

            tr.innerHTML = `
                <td>#TC-${t.id}</td>
                <td><strong>${t.category}</strong></td>
                <td class="text-sm text-secondary">${t.description}</td>
                <td><span class="badge badge-${t.priority === 'urgent' ? 'danger' : t.priority === 'medium' ? 'warning' : 'admin'}">${t.priority}</span></td>
                <td>${statusBadge}</td>
                <td>${vendorText}</td>
            `;
            ticketsBody.appendChild(tr);
        });
    }

    // Render Resident Upcoming Meetings
    const resMeetingsList = document.getElementById("res-dashboard-meetings-list");
    if (resMeetingsList) {
        resMeetingsList.innerHTML = "";
        const myMeetings = (db.meetings || []).filter(m => {
            if (m.target_group === "all") return true;
            if (m.target_group === "committee" && resident.is_committee_member) return true;
            if (m.target_group === "individual" && Number(m.target_resident_id) === Number(resident.id)) return true;
            return false;
        });

        if (myMeetings.length === 0) {
            resMeetingsList.innerHTML = `<div class="empty-state">No upcoming meetings scheduled.</div>`;
        } else {
            myMeetings.forEach(m => {
                const item = document.createElement("div");
                item.className = "vehicle-plate-badge";
                item.style.flexDirection = "column";
                item.style.alignItems = "flex-start";
                item.style.gap = "0.25rem";
                item.style.padding = "0.75rem";
                
                let audienceLabel = "";
                if (m.target_group === "all") audienceLabel = `<span class="badge badge-success text-xs">📢 General Meeting</span>`;
                else if (m.target_group === "committee") audienceLabel = `<span class="badge badge-warning text-xs">👥 Committee Only</span>`;
                else audienceLabel = `<span class="badge badge-admin text-xs">🔒 Private Meeting</span>`;

                item.innerHTML = `
                    <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                        <span style="font-size:1.05rem; font-weight:700; color:var(--text-main);">${m.title}</span>
                        ${audienceLabel}
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
                        📅 <strong>${formatDateToDDMMYYYY(m.meeting_date)}</strong> at ⏰ <strong>${m.meeting_time}</strong>
                    </div>
                    <div class="plate-type" style="margin-top:4px; font-size:0.85rem; line-height:1.3; color:var(--text-main); white-space:pre-wrap;">${m.agenda || 'No agenda provided.'}</div>
                `;
                resMeetingsList.appendChild(item);
            });
        }
    }

    // Check for unseen meetings to show real-time notifications (toasts/push alerts)
    if (resident && Array.isArray(db.meetings)) {
        const myMeetings = db.meetings.filter(m => {
            if (m.target_group === "all") return true;
            if (m.target_group === "committee" && resident.is_committee_member) return true;
            if (m.target_group === "individual" && Number(m.target_resident_id) === Number(resident.id)) return true;
            return false;
        });

        const toastedStorageKey = `toasted_meetings_resident_${resident.id}`;
        let toastedMeetings = [];
        try {
            toastedMeetings = JSON.parse(localStorage.getItem(toastedStorageKey)) || [];
        } catch (e) {
            toastedMeetings = [];
        }

        let newMeetingsFound = false;
        myMeetings.forEach(m => {
            if (!toastedMeetings.includes(m.id)) {
                toastedMeetings.push(m.id);
                newMeetingsFound = true;
                
                // 1. Show in-app Toast notification
                showToast(`📢 New Meeting: "${m.title}" scheduled on ${formatDateToDDMMYYYY(m.meeting_date)} at ${m.meeting_time}`, "success");
                
                // 2. Trigger native HTML5 Desktop push notification if allowed
                if (window.Notification && Notification.permission === "granted") {
                    try {
                        new Notification("SmartSociety Meeting", {
                            body: `New meeting: ${m.title} on ${formatDateToDDMMYYYY(m.meeting_date)} at ${m.meeting_time}`,
                            icon: "favicon.ico"
                        });
                    } catch (err) {
                        console.error("Desktop Notification failed to send:", err);
                    }
                }
            }
        });

        if (newMeetingsFound) {
            localStorage.setItem(toastedStorageKey, JSON.stringify(toastedMeetings));
        }
    }

    // Check for unseen news to show real-time toast alerts
    if (resident && Array.isArray(db.news)) {
        const toastedNewsStorageKey = `toasted_news_resident_${resident.id}`;
        let toastedNews = [];
        try {
            toastedNews = JSON.parse(localStorage.getItem(toastedNewsStorageKey)) || [];
        } catch (e) {
            toastedNews = [];
        }

        let newNewsFound = false;
        db.news.forEach(n => {
            if (!toastedNews.includes(n.id)) {
                toastedNews.push(n.id);
                newNewsFound = true;
                
                // Show in-app Toast notification
                showToast(`📢 New Announcement: "${n.title}"`, "success");
                
                // Trigger native HTML5 Desktop push notification if allowed
                if (window.Notification && Notification.permission === "granted") {
                    try {
                        new Notification("SmartSociety Announcement", {
                            body: `New Announcement: ${n.title}`,
                            icon: "favicon.ico"
                        });
                    } catch (err) {
                        console.error("Desktop Notification failed to send:", err);
                    }
                }
            }
        });

        if (newNewsFound) {
            localStorage.setItem(toastedNewsStorageKey, JSON.stringify(toastedNews));
        }
    }

    // Auto mark meetings as read if currently viewing the Overview dashboard
    if (currentResidentView === 'dashboard') {
        // Run immediately or after a short grace period
        const seenMeetingsKey = `seen_meetings_resident_${resident.id}`;
        let seenMeetings = [];
        try {
            seenMeetings = JSON.parse(localStorage.getItem(seenMeetingsKey)) || [];
        } catch (e) {
            seenMeetings = [];
        }
        
        const myMeetings = db.meetings.filter(m => {
            if (m.target_group === "all") return true;
            if (m.target_group === "committee" && resident.is_committee_member) return true;
            if (m.target_group === "individual" && Number(m.target_resident_id) === Number(resident.id)) return true;
            return false;
        });

        let updated = false;
        myMeetings.forEach(m => {
            if (!seenMeetings.includes(m.id)) {
                seenMeetings.push(m.id);
                updated = true;
            }
        });

        if (updated) {
            localStorage.setItem(seenMeetingsKey, JSON.stringify(seenMeetings));
        }
    }

    updateResidentNewsFeed();
    updateResidentNotificationsUI(resident);
}

function updateAdminViews() {
    // 1. STATS OVERVIEW
    const totalResidents = db.residents.filter(r => r.approved).length;
    const pendingResidents = db.residents.filter(r => !r.approved).length;
    
    document.getElementById("stat-residents-count").textContent = totalResidents;
    document.getElementById("stat-residents-pending").textContent = `${pendingResidents} Pending Verification`;

    let totalCollected = 0;
    let totalOutstanding = 0;
    let totalPenalties = 0;

    db.bills.forEach(b => {
        const calc = calculateBillDues(b);
        if (b.status === "paid") {
            totalCollected += calc.total;
        } else {
            totalOutstanding += calc.baseFee * (b.missed_months === 0 ? 1 : b.missed_months);
            totalPenalties += calc.penalty;
        }
    });

    document.getElementById("stat-collections-collected").textContent = `₹${totalCollected.toLocaleString('en-IN')}`;
    document.getElementById("stat-collections-outstanding").textContent = `₹${(totalOutstanding + totalPenalties).toLocaleString('en-IN')} Unpaid`;

    const pendingBookingsCount = db.bookings.filter(b => b.status === "pending").length;
    document.getElementById("stat-bookings-pending").textContent = pendingBookingsCount;

    const openTickets = db.tickets.filter(t => t.status !== "resolved");
    const urgentTickets = openTickets.filter(t => t.priority === "urgent");
    document.getElementById("stat-tickets-open").textContent = openTickets.length;
    document.getElementById("stat-tickets-urgent").textContent = `${urgentTickets.length} Urgent Red Flags`;

    // 2. LIVE SOS MONITOR
    const liveSosList = document.getElementById("admin-dashboard-sos-list");
    const activeSosLogs = db.emergencyLogs ? db.emergencyLogs.filter(e => e.status === "active") : [];
    liveSosList.innerHTML = "";
    if (activeSosLogs.length === 0) {
        liveSosList.innerHTML = `<div class="empty-state text-success font-semibold">🟢 All residents secure. No active SOS signals.</div>`;
    } else {
        activeSosLogs.forEach(e => {
            const resident = db.residents.find(r => r.id === e.resident_id);
            const item = document.createElement("div");
            item.className = "emergency-alert-item";
            item.innerHTML = `
                <div class="emergency-alert-details">
                    <h4>🚨 Flat ${e.flat} - PANIC BUTTON TRIGGERED</h4>
                    <p>${resident ? resident.name : 'Unknown'} (${resident ? resident.phone : ''}) - Triggered at ${new Date(e.timestamp).toLocaleTimeString()}</p>
                </div>
                <button class="btn btn-sm btn-outline btn-danger" onclick="resolveSOS(${e.id})">RESOLVE</button>
            `;
            liveSosList.appendChild(item);
        });
    }

    // 3. QUICK APPROVALS
    const quickVerifList = document.getElementById("admin-dashboard-approvals-list");
    const pendingVerificationResidents = db.residents.filter(r => !r.approved);
    quickVerifList.innerHTML = "";
    if (pendingVerificationResidents.length === 0) {
        quickVerifList.innerHTML = `<div class="empty-state text-muted">All registration requests verified.</div>`;
    } else {
        pendingVerificationResidents.forEach(r => {
            const item = document.createElement("div");
            item.className = "verify-item-widget margin-b-05";
            item.innerHTML = `
                <div>
                    <h4 class="font-bold">${r.name}</h4>
                    <p class="text-xs text-secondary">Flat ${r.flat} • ${r.phone}</p>
                </div>
                <button class="btn btn-sm btn-primary" onclick="approveResident(${r.id})">Verify</button>
            `;
            quickVerifList.appendChild(item);
        });
    }

    // 4. RESIDENT REGISTRY
    const residentRegistryBody = document.getElementById("admin-residents-list-body");
    residentRegistryBody.innerHTML = "";
    db.residents.forEach(r => {
        const tr = document.createElement("tr");
        const vehicles = db.vehicles.filter(v => v.resident_id === r.id);
        const vehiclesText = vehicles.length > 0 
            ? vehicles.map(v => `<span class="plate-number block text-xs" style="margin-bottom:2px">${v.plate} (${v.type})</span>`).join('') 
            : `<span class="text-muted text-xs">No vehicles</span>`;

        let statusBadge = "";
        let actionBtn = "";

        if (r.approved) {
            statusBadge = `<span class="badge badge-success">Approved</span>`;
            actionBtn = `<button class="btn btn-sm btn-outline text-danger" onclick="toggleApprovalResident(${r.id}, false)">Revoke</button>`;
        } else {
            statusBadge = `<span class="badge badge-warning">Pending</span>`;
            actionBtn = `<button class="btn btn-sm btn-success" onclick="toggleApprovalResident(${r.id}, true)">Approve</button>`;
        }

        const occupancyText = r.occupancy === "owner" ? "🟢 Owner" : "🟡 Tenant";
        const committeeBadge = r.is_committee_member ? `<span class="badge badge-admin text-xs" style="margin-left: 5px;">👥 Committee</span>` : '';

        tr.innerHTML = `
            <td><strong>${r.name}</strong>${committeeBadge}</td>
            <td>Flat ${r.flat}</td>
            <td>${r.phone}</td>
            <td><span class="badge badge-${r.occupancy === 'owner' ? 'success' : 'warning'}">${occupancyText}</span></td>
            <td>${vehiclesText}</td>
            <td>${statusBadge}</td>
            <td class="flex-row gap-05">${actionBtn} <button class="btn btn-sm btn-outline" onclick="openVehicleEditModal(${r.id})">🚗 Vehicles</button> <button class="btn btn-sm btn-outline" onclick="openAdminMembersModal(${r.id})">👥 Members</button> <button class="btn btn-sm btn-danger" onclick="deleteResident(${r.id})">Delete</button></td>
        `;
        residentRegistryBody.appendChild(tr);
    });

    // 5. DEFAULTER LEDGER
    document.getElementById("finance-total-paid").textContent = `₹${totalCollected.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    document.getElementById("finance-total-unpaid").textContent = `₹${totalOutstanding.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    document.getElementById("finance-total-penalties").textContent = `₹${totalPenalties.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;

    const financeBody = document.getElementById("admin-finance-list-body");
    financeBody.innerHTML = "";
    db.bills.forEach(b => {
        const resident = db.residents.find(r => r.id === b.resident_id);
        if (!resident) return;

        const calc = calculateBillDues(b);
        const tr = document.createElement("tr");

        let statusBadge = "";
        let waiverBtn = "";

        if (b.status === "paid") {
            statusBadge = `<span class="badge badge-success">PAID</span>`;
            waiverBtn = `<span class="text-success text-xs">Receipt Issued</span>`;
        } else {
            statusBadge = `<span class="badge badge-danger">UNPAID</span>`;
            if (b.waived) {
                waiverBtn = `<span class="text-success font-semibold text-xs">Penalty Waived</span>`;
            } else if (calc.penalty > 0) {
                waiverBtn = `<button class="btn btn-sm btn-outline text-warning" onclick="waivePenalty(${b.id})">Waive Penalties</button>`;
            } else {
                waiverBtn = `<span class="text-muted text-xs">No Penalty Accrued</span>`;
            }
        }

        tr.innerHTML = `
            <td>
                <strong>${resident.name}</strong>
                <span class="block text-xs text-secondary">Flat ${resident.flat}</span>
            </td>
            <td>${b.month}</td>
            <td>₹${calc.baseFee}</td>
            <td>${calc.missedMonths} ${calc.missedMonths > 0 ? '⚠️' : ''}</td>
            <td><span class="${calc.penalty > 0 ? 'text-danger font-semibold' : ''}">₹${calc.penalty}</span></td>
            <td><strong>₹${calc.total}</strong></td>
            <td>${statusBadge}</td>
            <td>${waiverBtn}</td>
        `;
        financeBody.appendChild(tr);
    });

    // 6. BOOKINGS & TICKETS MODERATION
    const bookingModerationContainer = document.getElementById("admin-bookings-list-container");
    const pendingBookings = db.bookings.filter(bk => bk.status === "pending");
    bookingModerationContainer.innerHTML = "";
    if (pendingBookings.length === 0) {
        bookingModerationContainer.innerHTML = `<div class="empty-state">No pending bookings to approve.</div>`;
    } else {
        pendingBookings.forEach(bk => {
            const resident = db.residents.find(r => r.id === bk.resident_id);
            const card = document.createElement("div");
            card.className = "item-review-card";
            card.innerHTML = `
                <div class="item-review-header">
                    <div>
                        <h4>${bk.facility}</h4>
                        <p class="text-xs text-secondary">Date: <strong>${bk.date}</strong></p>
                        <p class="text-xs text-muted">Requested by: ${resident ? resident.name : 'Unknown'} (Flat ${resident ? resident.flat : '--'})</p>
                    </div>
                </div>
                <div class="item-review-actions">
                    <button class="btn btn-sm btn-success" onclick="moderateBooking(${bk.id}, 'approved')">Approve</button>
                    <button class="btn btn-sm btn-danger" onclick="moderateBooking(${bk.id}, 'rejected')">Reject</button>
                </div>
            `;
            bookingModerationContainer.appendChild(card);
        });
    }

    const ticketsModerationContainer = document.getElementById("admin-tickets-list-container");
    const activeTickets = db.tickets.filter(t => t.status !== "resolved");
    ticketsModerationContainer.innerHTML = "";
    if (activeTickets.length === 0) {
        ticketsModerationContainer.innerHTML = `<div class="empty-state text-success">All tickets resolved!</div>`;
    } else {
        activeTickets.forEach(t => {
            const resident = db.residents.find(r => r.id === t.resident_id);
            const card = document.createElement("div");
            card.className = `item-review-card ${t.priority === 'urgent' ? 'ticket-row-urgent' : ''}`;
            
            let vendorDropdown = `<select class="btn-sm" onchange="assignVendorToTicket(${t.id}, this.value)" style="background:var(--bg-input); color:var(--text-main); border:1px solid var(--border-color); margin-right:5px; padding:4px 8px; border-radius:var(--radius-sm); cursor:pointer; outline:none;">`;
            vendorDropdown += `<option value="">Select Vendor...</option>`;
            db.vendors.forEach(v => {
                const selected = t.vendor_id === v.id ? "selected" : "";
                vendorDropdown += `<option value="${v.id}" ${selected}>${v.name} (${v.category})</option>`;
            });
            vendorDropdown += `</select>`;

            const isAssigned = t.status === "assigned";
            
            card.innerHTML = `
                <div class="item-review-header">
                    <div>
                        <span class="badge badge-${t.priority === 'urgent' ? 'danger' : t.priority === 'medium' ? 'warning' : 'admin'}">${t.priority}</span>
                        <h4 style="margin-top: 5px">${t.category} Ticket</h4>
                        <p class="text-xs text-secondary">Flat ${resident ? resident.flat : '--'} • ${resident ? resident.name : 'Unknown'}</p>
                        <p class="text-sm text-main" style="margin-top: 8px">"${t.description}"</p>
                    </div>
                </div>
                <div class="item-review-actions border-t padding-t-05 align-center justify-between">
                    <div>
                        <span class="text-xs text-muted block">Status: <strong>${t.status.toUpperCase()}</strong></span>
                        <div class="margin-t-05 flex-row align-center">
                            ${vendorDropdown}
                        </div>
                    </div>
                    <div>
                        ${isAssigned ? `<button class="btn btn-sm btn-success" onclick="resolveTicket(${t.id})">Mark Resolved</button>` : ''}
                    </div>
                </div>
            `;
            ticketsModerationContainer.appendChild(card);
        });
    }

    // 7. SOS LOGS
    const sosLogsBody = document.getElementById("admin-emergency-list-body");
    sosLogsBody.innerHTML = "";
    const logsList = db.emergencyLogs || [];
    if (logsList.length === 0) {
        sosLogsBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No emergency records found.</td></tr>`;
    } else {
        logsList.forEach(e => {
            const resident = db.residents.find(r => r.id === e.resident_id);
            const tr = document.createElement("tr");
            
            let statusBadge = "";
            let actionBtn = "";

            if (e.status === "active") {
                statusBadge = `<span class="badge badge-danger blink-dot pulse">ACTIVE SIREN</span>`;
                actionBtn = `<button class="btn btn-sm btn-danger" onclick="resolveSOS(${e.id})">Resolve & Secure</button>`;
                tr.className = "ticket-row-urgent";
            } else {
                statusBadge = `<span class="badge badge-success">Resolved & Safe</span>`;
                actionBtn = `<span class="text-success text-sm">Resolved at ${new Date(e.resolved_at).toLocaleTimeString()}</span>`;
            }

            tr.innerHTML = `
                <td>#SOS-${e.id}</td>
                <td><strong>${resident ? resident.name : 'Unknown'}</strong><br><span class="text-xs text-muted">${resident ? resident.phone : ''}</span></td>
                <td>Flat ${e.flat}</td>
                <td>${new Date(e.timestamp).toLocaleString()}</td>
                <td>${statusBadge}</td>
                <td>${actionBtn}</td>
            `;
            sosLogsBody.appendChild(tr);
        });
    }

    // 8. VENDOR DIRECTORY
    const vendorsListBody = document.getElementById("admin-vendors-list-body");
    if (vendorsListBody) {
        vendorsListBody.innerHTML = "";
        const vendorsList = db.vendors || [];
        if (vendorsList.length === 0) {
            vendorsListBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No registered vendors found.</td></tr>`;
        } else {
            vendorsList.forEach(v => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>${v.name}</strong></td>
                    <td><span class="badge badge-pill badge-admin">${v.category}</span></td>
                    <td><button class="btn btn-sm btn-outline text-danger" onclick="handleAdminDeleteVendor(${v.id})">Remove</button></td>
                `;
                vendorsListBody.appendChild(tr);
            });
        }
    }

    // Render Admin Scheduled Meetings
    const adminMeetingsList = document.getElementById("admin-scheduled-meetings-list");
    if (adminMeetingsList) {
        adminMeetingsList.innerHTML = "";
        const meetingsList = db.meetings || [];
        if (meetingsList.length === 0) {
            adminMeetingsList.innerHTML = `<div class="empty-state text-muted">No upcoming meetings scheduled.</div>`;
        } else {
            meetingsList.forEach(m => {
                const item = document.createElement("div");
                item.className = "verify-item-widget margin-b-05";
                item.style.flexDirection = "column";
                item.style.alignItems = "stretch";
                item.style.gap = "0.25rem";
                item.style.padding = "0.75rem";
                
                let audienceLabel = "";
                let targetResidentText = "";
                if (m.target_group === "all") {
                    audienceLabel = `<span class="badge badge-success text-xs">📢 All Residents</span>`;
                } else if (m.target_group === "committee") {
                    audienceLabel = `<span class="badge badge-warning text-xs">👥 Committee Only</span>`;
                } else {
                    const resident = db.residents.find(r => r.id === Number(m.target_resident_id));
                    audienceLabel = `<span class="badge badge-admin text-xs">🔒 Private</span>`;
                    targetResidentText = `<span class="block text-xs font-semibold text-accent">Target: ${resident ? `${resident.name} (Flat ${resident.flat})` : 'Unknown'}</span>`;
                }

                item.innerHTML = `
                    <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                        <div>
                            <span style="font-size:1.05rem; font-weight:700; color:var(--text-main);">${m.title}</span>
                            ${targetResidentText}
                        </div>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                            ${audienceLabel}
                            <button class="btn btn-sm btn-outline text-danger" onclick="handleAdminCancelMeeting(${m.id})">Cancel</button>
                        </div>
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
                        📅 <strong>${formatDateToDDMMYYYY(m.meeting_date)}</strong> at ⏰ <strong>${m.meeting_time}</strong>
                    </div>
                    <div class="plate-type" style="margin-top:4px; font-size:0.85rem; line-height:1.3; color:var(--text-secondary); white-space:pre-wrap;">${m.agenda || 'No agenda.'}</div>
                `;
                adminMeetingsList.appendChild(item);
            });
        }
    }
    
    // Populate meeting target select dropdown values
    populateMeetingTargetResidentDropdown();

    // Refresh admin announcements list
    updateAdminNewsFeed();
}

function updateSOSIndicators() {
    const activeAlerts = db.emergencyLogs ? db.emergencyLogs.filter(e => e.status === "active") : [];
    const banner = document.getElementById("admin-emergency-banner");
    const activeSosPill = document.getElementById("admin-sos-pill");

    if (activeAlerts.length > 0) {
        activeSosPill.classList.remove("hidden");
        activeSosPill.textContent = activeAlerts.length;

        if (currentRole === "admin") {
            banner.classList.remove("hidden");
            const lastAlert = activeAlerts[activeAlerts.length - 1];
            document.getElementById("emergency-flat-display").textContent = `Flat ${lastAlert.flat}`;
            startSiren();
        } else {
            banner.classList.add("hidden");
            stopSiren();
        }
    } else {
        activeSosPill.classList.add("hidden");
        banner.classList.add("hidden");
        stopSiren();
    }
}

// ==========================================================================
// 6. ACTION HANDLERS (RESIDENT PORTAL)
// ==========================================================================

function openVehicleModal() {
    document.getElementById("vehicle-modal").classList.remove("hidden");
    updateVehicleModalList();
}

function closeVehicleModal() {
    document.getElementById("vehicle-modal").classList.add("hidden");
}

function updateVehicleModalList() {
    const resident = getCurrentResident();
    const listContainer = document.getElementById("modal-vehicles-list");
    listContainer.innerHTML = "";
    
    const vehicles = db.vehicles.filter(v => v.resident_id === resident.id);
    if (vehicles.length === 0) {
        listContainer.innerHTML = `<p class="text-muted text-sm text-center">No vehicles added.</p>`;
    } else {
        vehicles.forEach(v => {
            const div = document.createElement("div");
            div.className = "flex-row justify-between align-center border-b padding-t-05 margin-t-05";
            div.innerHTML = `
                <div>
                    <strong class="plate-number">${v.plate}</strong>
                    <span class="text-xs text-secondary">(${v.type})</span>
                </div>
                <button class="btn btn-sm btn-outline text-danger" style="padding:2px 8px" onclick="removeVehicle(${v.id}); updateVehicleModalList();">✕</button>
            `;
            listContainer.appendChild(div);
        });
    }
}

async function handleVehicleAddition(event) {
    event.preventDefault();
    const plateInput = document.getElementById("veh-plate");
    const typeSelect = document.getElementById("veh-type");
    
    const resident = getCurrentResident();
    const newVehicle = {
        id: Date.now(),
        resident_id: resident.id,
        plate: plateInput.value.toUpperCase().trim(),
        type: typeSelect.value
    };

    if (backendConnected) {
        const saved = await apiRequest('/api/vehicles', 'POST', newVehicle);
        if (!saved) return;
        db.vehicles.push(saved);
    } else {
        db.vehicles.push(newVehicle);
    }
    saveDatabase();
    
    plateInput.value = "";
    updateVehicleModalList();
    showToast("Vehicle registered successfully!", "success");
}

async function removeVehicle(vehicleId) {
    if (backendConnected) {
        const ok = await apiRequest(`/api/vehicles/${vehicleId}`, 'DELETE');
        if (!ok) return;
        db.vehicles = db.vehicles.filter(v => v.id !== vehicleId);
    } else {
        db.vehicles = db.vehicles.filter(v => v.id !== vehicleId);
    }
    saveDatabase();
    showToast("Vehicle registration removed.", "warning");
}

async function handleAmenityBooking(event) {
    event.preventDefault();
    const facilitySelect = document.getElementById("booking-amenity");
    const dateInput = document.getElementById("booking-date");

    const bookingDate = dateInput.value;
    if (!bookingDate) return;

    if (!validateBookingDate(bookingDate)) {
        showToast("Error: Bookings require at least 5 days advance notice!", "danger");
        return;
    }

    const resident = getCurrentResident();
    const newBooking = {
        id: Date.now(),
        resident_id: resident.id,
        facility: facilitySelect.value,
        date: bookingDate,
        status: "pending"
    };

    if (backendConnected) {
        const saved = await apiRequest('/api/bookings', 'POST', newBooking);
        if (!saved) return;
        db.bookings.push(saved);
    } else {
        db.bookings.push(newBooking);
    }
    saveDatabase();
    
    dateInput.value = "";
    showToast("Booking requested! Awaiting admin approval.", "success");
}

async function handleVisitorPassCreation(event) {
    event.preventDefault();
    const nameInput = document.getElementById("visitor-name");
    const catSelect = document.getElementById("visitor-category");

    const resident = getCurrentResident();
    const passcode = generatePasscode();

    const newPass = {
        id: Date.now(),
        resident_id: resident.id,
        name: nameInput.value.trim(),
        category: catSelect.value,
        passcode: passcode,
        status: "active",
        created_at: new Date().toISOString()
    };

    if (backendConnected) {
        const saved = await apiRequest('/api/visitors', 'POST', newPass);
        if (!saved) return;
        db.visitors.push(saved);
    } else {
        db.visitors.push(newPass);
    }
    saveDatabase();

    nameInput.value = "";
    showToast(`Visitor pass created. 6-Digit Passcode: ${passcode}`, "success");
}

async function revokePass(passId) {
    if (backendConnected) {
        const updated = await apiRequest(`/api/visitors/${passId}/revoke`, 'PUT');
        if (!updated) return;
        const pass = db.visitors.find(p => p.id === passId);
        if (pass) pass.status = "expired";
    } else {
        const pass = db.visitors.find(p => p.id === passId);
        if (pass) pass.status = "expired";
    }
    saveDatabase();
    showToast("Visitor entry passcode revoked.", "warning");
}

async function handleTicketSubmission(event) {
    event.preventDefault();
    const catSelect = document.getElementById("ticket-category");
    const prioritySelect = document.getElementById("ticket-priority");
    const descInput = document.getElementById("ticket-description");

    const resident = getCurrentResident();
    const newTicket = {
        id: Math.floor(100 + Math.random() * 900),
        resident_id: resident.id,
        category: catSelect.value,
        priority: prioritySelect.value,
        description: descInput.value.trim(),
        status: "pending",
        vendor_id: null
    };

    if (backendConnected) {
        const saved = await apiRequest('/api/tickets', 'POST', newTicket);
        if (!saved) return;
        db.tickets.push(saved);
    } else {
        db.tickets.push(newTicket);
    }
    saveDatabase();

    descInput.value = "";
    showToast("Helpdesk ticket submitted successfully.", "success");
}

async function triggerSOS() {
    const resident = getCurrentResident();
    const newSOS = {
        id: Date.now(),
        resident_id: resident.id,
        flat: resident.flat,
        timestamp: new Date().toISOString(),
        status: "active"
    };

    if (backendConnected) {
        const saved = await apiRequest('/api/emergency', 'POST', newSOS);
        if (!saved) return;
        db.emergencyLogs.push(saved);
    } else {
        db.emergencyLogs.push(newSOS);
    }
    saveDatabase();
    showToast("🔴 EMERGENCY SOS TRIGGERED! Admin panel alerted.", "danger");
}

// ==========================================================================
// 7. MAINTENANCE BILLING SIMULATOR
// ==========================================================================

function initiatePayment(billId = null) {
    if (billId) {
        currentPayingBillId = billId;
    } else {
        const unpaid = db.bills.find(b => b.resident_id === activeResidentId && b.status === "unpaid");
        if (!unpaid) {
            showToast("No outstanding payments.", "warning");
            return;
        }
        currentPayingBillId = unpaid.id;
    }

    const bill = db.bills.find(b => b.id === currentPayingBillId);
    if (!bill) return;

    const calc = calculateBillDues(bill);

    document.getElementById("pay-base-fee").textContent = `₹${calc.baseFee.toLocaleString('en-IN')}`;
    document.getElementById("pay-penalty-fee").textContent = `₹${calc.penalty.toLocaleString('en-IN')}`;
    document.getElementById("pay-total-fee").textContent = `₹${calc.total.toLocaleString('en-IN')}`;

    document.getElementById("card-holder").value = getCurrentResident().name;
    document.getElementById("card-number").value = "";
    document.getElementById("card-expiry").value = "";
    document.getElementById("card-cvv").value = "";

    updateCardGraphic();
    document.getElementById("payment-modal").classList.remove("hidden");
}

function updateCardGraphic() {
    const holderVal = document.getElementById("card-holder").value || "Resident Name";
    const numVal = document.getElementById("card-number").value || "•••• •••• •••• ••••";
    const expVal = document.getElementById("card-expiry").value || "MM/YY";

    document.getElementById("cc-name-display").textContent = holderVal.toUpperCase();
    document.getElementById("cc-num-display").textContent = numVal;
    document.getElementById("cc-exp-display").textContent = expVal;
}

function closePaymentModal() {
    document.getElementById("payment-modal").classList.add("hidden");
    document.getElementById("payment-loader").classList.add("hidden");
    document.getElementById("pay-confirm-btn").classList.remove("hidden");
}

async function handlePaymentSubmit(event) {
    event.preventDefault();
    document.getElementById("pay-confirm-btn").classList.add("hidden");
    document.getElementById("payment-loader").classList.remove("hidden");

    setTimeout(async () => {
        const bill = db.bills.find(b => b.id === currentPayingBillId);
        if (bill) {
            const calc = calculateBillDues(bill);
            const paidDate = new Date().toISOString().split('T')[0];

            if (backendConnected) {
                const updated = await apiRequest(`/api/bills/${bill.id}/pay`, 'POST', {
                    paidAmount: calc.total,
                    paidDate: paidDate
                });
                if (updated) {
                    bill.status = "paid";
                    bill.paid_amount = calc.total;
                    bill.paid_date = paidDate;
                    bill.penalty = calc.penalty;
                }
            } else {
                bill.status = "paid";
                bill.paid_amount = calc.total;
                bill.paid_date = paidDate;
                bill.penalty = calc.penalty;
            }
            saveDatabase();
            showToast("Payment received successfully!", "success");
            closePaymentModal();
            viewReceipt(bill.id);
        }
    }, 2000);
}

function viewReceipt(billId) {
    const bill = db.bills.find(b => b.id === billId);
    if (!bill) return;

    const resident = db.residents.find(r => r.id === bill.resident_id);
    if (!resident) return;

    const calc = calculateBillDues(bill);
    const container = document.getElementById("printable-receipt-content");
    const transRef = `TXN-${bill.id}-${Math.floor(1000 + Math.random() * 9000)}`;

    container.innerHTML = `
        <div class="invoice-print-header">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
                <div>
                    <h1 style="margin:0; font-family:var(--font-heading); color:#1e3a8a">🛡️ SmartSociety Hub</h1>
                    <p style="margin:2px 0; font-size:0.85rem; color:#64748b">Resident Welfare Association, Block 4</p>
                </div>
                <div style="text-align:right">
                    <h3 style="margin:0; text-transform:uppercase; color:#0f172a">Payment Receipt</h3>
                    <p style="margin:2px 0; font-size:0.85rem; color:#64748b">Ref: <strong>${transRef}</strong></p>
                </div>
            </div>
        </div>

        <div class="invoice-print-body">
            <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; font-size:0.9rem">
                <div>
                    <span style="color:#64748b; font-size:0.8rem; text-transform:uppercase">Issued To:</span>
                    <h4 style="margin:2px 0">${resident.name}</h4>
                    <p style="margin:2px 0">Flat: ${resident.flat}</p>
                    <p style="margin:2px 0">Phone: ${resident.phone}</p>
                </div>
                <div style="text-align:right">
                    <span style="color:#64748b; font-size:0.8rem; text-transform:uppercase">Receipt Details:</span>
                    <p style="margin:2px 0">Cycle Month: <strong>${bill.month}</strong></p>
                    <p style="margin:2px 0">Payment Date: ${formatDateToDDMMYYYY(bill.paid_date || bill.paidDate)}</p>
                    <p style="margin:2px 0">Method: Credit Card</p>
                </div>
            </div>

            <table class="invoice-print-table">
                <thead>
                    <tr>
                        <th style="text-align:left">Description</th>
                        <th style="text-align:right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Monthly Maintenance Base Fee (${bill.month})</td>
                        <td style="text-align:right">₹${calc.baseFee.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                    </tr>
                    ${calc.missedMonths > 0 ? `
                    <tr>
                        <td>Late Fees Accumulated (${calc.missedMonths} Month(s) Outstanding)</td>
                        <td style="text-align:right; color:#dc2626">₹${calc.penalty.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                    </tr>
                    ` : ''}
                    ${bill.waived ? `
                    <tr>
                        <td>Late Fees Waiver Adjustment</td>
                        <td style="text-align:right; color:#16a34a">-₹${calc.penalty.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                    </tr>
                    ` : ''}
                </tbody>
            </table>
        </div>

        <div class="invoice-print-footer">
            <div style="display:inline-block; text-align:right">
                <span style="color:#64748b; font-size:0.8rem; text-transform:uppercase">Total Amount Paid</span>
                <h2 style="margin:4px 0; color:#1e3a8a">₹${calc.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</h2>
                <div style="background:#dcfce7; color:#15803d; border:1px solid #bbf7d0; padding:4px 12px; border-radius:4px; font-weight:700; display:inline-block; font-size:0.8rem; margin-top:5px">
                    STATUS: TRANSACTION SUCCESSFUL ✓
                </div>
            </div>
            <div style="margin-top:2rem; text-align:center; font-size:0.75rem; color:#64748b; border-top:1px dashed #cbd5e1; padding-top:1rem">
                This is a computer generated document, no physical signatures required. Thank you for paying your dues on time!
            </div>
        </div>
    `;

    document.getElementById("receipt-modal").classList.remove("hidden");
}

function closeReceiptModal() {
    document.getElementById("receipt-modal").classList.add("hidden");
}

// ==========================================================================
// 8. ADMIN ACTIONS
// ==========================================================================

function approveResident(residentId) {
    toggleApprovalResident(residentId, true);
}

async function toggleApprovalResident(residentId, isApproved) {
    if (backendConnected) {
        const updated = await apiRequest(`/api/residents/${residentId}/approve`, 'PUT', { approved: isApproved });
        if (!updated) return;
        const resident = db.residents.find(r => r.id === residentId);
        if (resident) resident.approved = updated.approved;
    } else {
        const resident = db.residents.find(r => r.id === residentId);
        if (resident) resident.approved = isApproved;
    }
    saveDatabase();
    showToast(isApproved ? `Resident approved.` : `Approval revoked.`, "success");
}

function openVehicleEditModal(residentId) {
    activeResidentId = residentId;
    document.getElementById("active-resident-select").value = residentId;
    updateResidentViews();
    openVehicleModal();
}

async function waivePenalty(billId) {
    if (backendConnected) {
        const updated = await apiRequest(`/api/bills/${billId}/waive`, 'PUT');
        if (!updated) return;
        const bill = db.bills.find(b => b.id === billId);
        if (bill) bill.waived = true;
    } else {
        const bill = db.bills.find(b => b.id === billId);
        if (bill) bill.waived = true;
    }
    saveDatabase();
    showToast("Late penalties waived successfully.", "success");
}

async function resolveSOS(logId) {
    const resolvedAt = new Date().toISOString();
    if (backendConnected) {
        const updated = await apiRequest(`/api/emergency/${logId}/resolve`, 'PUT', { resolvedAt });
        if (!updated) return;
        const log = db.emergencyLogs.find(e => e.id === logId);
        if (log) {
            log.status = "resolved";
            log.resolved_at = resolvedAt;
        }
    } else {
        const log = db.emergencyLogs.find(e => e.id === logId);
        if (log) {
            log.status = "resolved";
            log.resolvedAt = resolvedAt;
        }
    }
    saveDatabase();
    showToast(`SOS alert marked resolved.`, "success");
    updateSOSIndicators();
}

function clearAllResolvedEmergency() {
    // Locally clean lists
    db.emergencyLogs = db.emergencyLogs.filter(e => e.status === "active");
    saveDatabase();
    showToast("Resolved items cleared from screen view.", "success");
}

async function moderateBooking(bookingId, newStatus) {
    if (backendConnected) {
        const updated = await apiRequest(`/api/bookings/${bookingId}/status`, 'PUT', { status: newStatus });
        if (!updated) return;
        const booking = db.bookings.find(bk => bk.id === bookingId);
        if (booking) booking.status = newStatus;
    } else {
        const booking = db.bookings.find(bk => bk.id === bookingId);
        if (booking) booking.status = newStatus;
    }
    saveDatabase();
    showToast(`Booking request ${newStatus}.`, "success");
}

async function assignVendorToTicket(ticketId, vendorIdStr) {
    const vId = vendorIdStr === "" ? null : parseInt(vendorIdStr);
    if (backendConnected) {
        const updated = await apiRequest(`/api/tickets/${ticketId}/assign`, 'PUT', { vendorId: vId });
        if (!updated) return;
        const ticket = db.tickets.find(t => t.id === ticketId);
        if (ticket) {
            ticket.vendor_id = vId;
            ticket.status = vId ? 'assigned' : 'pending';
        }
    } else {
        const ticket = db.tickets.find(t => t.id === ticketId);
        if (ticket) {
            ticket.vendor_id = vId;
            ticket.status = vId ? 'assigned' : 'pending';
        }
    }
    saveDatabase();
    showToast(vId ? "Vendor assigned successfully." : "Assignment cleared.", "success");
}

async function resolveTicket(ticketId) {
    if (backendConnected) {
        const updated = await apiRequest(`/api/tickets/${ticketId}/resolve`, 'PUT');
        if (!updated) return;
        const ticket = db.tickets.find(t => t.id === ticketId);
        if (ticket) ticket.status = "resolved";
    } else {
        const ticket = db.tickets.find(t => t.id === ticketId);
        if (ticket) ticket.status = "resolved";
    }
    saveDatabase();
    showToast("Helpdesk ticket resolved.", "success");
}

async function handleAdminAddVendor(event) {
    event.preventDefault();
    const name = document.getElementById("adm-vendor-name").value.trim();
    const category = document.getElementById("adm-vendor-category").value;

    if (!name || !category) {
        showToast("Please fill in name and profession.", "danger");
        return;
    }

    if (backendConnected) {
        const added = await apiRequest('/api/vendors', 'POST', { name, category });
        if (added) {
            db.vendors.push(added);
            showToast(`Vendor ${name} registered successfully.`, "success");
            document.getElementById("admin-add-vendor-form").reset();
            updateAdminViews();
        }
    } else {
        const nextId = db.vendors.length > 0 ? (Math.max(...db.vendors.map(v => v.id)) + 1) : 1;
        const newVendor = { id: nextId, name, category };
        db.vendors.push(newVendor);
        saveDatabase();
        showToast(`Vendor ${name} registered successfully (Offline Mode).`, "success");
        document.getElementById("admin-add-vendor-form").reset();
        updateAdminViews();
    }
}

async function handleAdminDeleteVendor(vendorId) {
    if (!confirm("Are you sure you want to remove this vendor? This will clear assignments for any active tickets under this vendor.")) {
        return;
    }

    if (backendConnected) {
        const res = await apiRequest(`/api/vendors/${vendorId}`, 'DELETE');
        if (res && res.success) {
            db.vendors = db.vendors.filter(v => v.id !== vendorId);
            // Cascade delete - unassign vendor from tickets in local state
            db.tickets.forEach(t => {
                if (t.vendor_id === vendorId) {
                    t.vendor_id = null;
                    t.status = 'pending';
                }
            });
            showToast("Vendor removed successfully.", "success");
            updateAdminViews();
        }
    } else {
        db.vendors = db.vendors.filter(v => v.id !== vendorId);
        // Cascade delete in local state
        db.tickets.forEach(t => {
            if (t.vendor_id === vendorId) {
                t.vendor_id = null;
                t.status = 'pending';
            }
        });
        saveDatabase();
        showToast("Vendor removed successfully (Offline Mode).", "success");
        updateAdminViews();
    }
}

function openNewResidentModal() {
    document.getElementById("admin-resident-modal").classList.remove("hidden");
}

function closeNewResidentModal() {
    document.getElementById("admin-resident-modal").classList.add("hidden");
}

async function handleAdminAddResident(event) {
    event.preventDefault();
    const name = document.getElementById("adm-res-name").value.trim();
    const flat = document.getElementById("adm-res-flat").value.trim();
    const contact = document.getElementById("adm-res-contact").value.trim();
    const occupancy = document.getElementById("adm-res-occupancy").value;
    const status = document.getElementById("adm-res-status").value;
    const isCommittee = document.getElementById("adm-res-committee").checked;

    const newRes = {
        id: Date.now(),
        name: name,
        flat: flat,
        phone: contact,
        occupancy: occupancy,
        approved: status === "approved",
        is_committee_member: isCommittee
    };

    if (backendConnected) {
        const saved = await apiRequest('/api/residents', 'POST', newRes);
        if (!saved) return;
        db.residents.push(saved);
    } else {
        db.residents.push(newRes);
    }
    
    // Auto generate mock bill cycle
    const newBill = {
        id: Date.now() + 1,
        resident_id: newRes.id,
        month: "May 2026",
        base_fee: 2000,
        missed_months: 0,
        waived: false,
        status: "unpaid",
        paid_amount: null,
        paid_date: null
    };

    if (backendConnected) {
        // Create matching unpaid bill on server
        await apiRequest(`/api/residents`, 'POST'); // Placeholder to trigger default seeding/bill generation
        // For simplicity, we sync full database again
        await syncWithServer();
    } else {
        db.bills.push(newBill);
        saveDatabase();
    }

    closeNewResidentModal();
    document.getElementById("adm-res-name").value = "";
    document.getElementById("adm-res-flat").value = "";
    document.getElementById("adm-res-contact").value = "";
    document.getElementById("adm-res-committee").checked = false;

    showToast(`Resident ${name} registered.`, "success");
}

function exportFinancialLedger() {
    let csv = "Resident Name,Flat,Month Cycle,Base Fee (INR),Missed Months,Penalty (INR),Total Outstanding (INR),Status\r\n";
    db.bills.forEach(b => {
        const resident = db.residents.find(r => r.id === b.resident_id);
        if (!resident) return;
        const calc = calculateBillDues(b);
        csv += `"${resident.name}","${resident.flat}","${b.month}",${calc.baseFee},${calc.missedMonths},${calc.penalty},${calc.total},"${b.status.toUpperCase()}"\r\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Society_Financial_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Ledger CSV downloaded successfully.", "success");
    }
}

// Theme Toggle Functionality
window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeToggleIcon('dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeToggleIcon('light');
    }
};

function updateThemeToggleIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ==========================================================================
// 9. APP INITIALIZATION
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
    // Initialize theme icon
    const activeTheme = localStorage.getItem('theme') || 'light';
    updateThemeToggleIcon(activeTheme);

    // Request permission for push notifications
    if (window.Notification && Notification.permission === "default") {
        Notification.requestPermission();
    }

    // Async load database
    syncWithServer();
    
    // Default switch
    switchRole("resident");
    
    const bookingDateInput = document.getElementById("booking-date");
    if (bookingDateInput) {
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 5);
        bookingDateInput.min = minDate.toISOString().split("T")[0];
    }

    // Input listeners for card graphic
    const cardHolderInput = document.getElementById("card-holder");
    const cardNumberInput = document.getElementById("card-number");
    const cardExpiryInput = document.getElementById("card-expiry");

    if (cardHolderInput) cardHolderInput.addEventListener("input", updateCardGraphic);
    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", (e) => {
            let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formatted = "";
            for (let i = 0; i < val.length; i++) {
                if (i > 0 && i % 4 === 0) formatted += " ";
                formatted += val[i];
            }
            e.target.value = formatted.slice(0, 19);
            updateCardGraphic();
        });
    }
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener("input", (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length >= 2) {
                e.target.value = val.slice(0, 2) + "/" + val.slice(2, 4);
            } else {
                e.target.value = val;
            }
            updateCardGraphic();
        });
    }
});

// ==========================================================================
// 8. ADMIN LOGIN AUTHENTICATION (PASSWORD ONLY)
// ==========================================================================

function openAdminAuthModal() {
    document.getElementById("admin-auth-overlay").classList.remove("hidden");
    const passInput = document.getElementById("admin-password-input");
    if (passInput) passInput.focus();
}

function closeAdminAuthModal() {
    document.getElementById("admin-auth-overlay").classList.add("hidden");
}

function cancelAdminAuth() {
    closeAdminAuthModal();
    showAdminAuthLogin(); // Always reset view back to login step
    // Revert role toggles in header back to resident
    currentRole = "resident";
    document.getElementById("view-resident-btn").classList.add("active");
    document.getElementById("view-admin-btn").classList.remove("active");
}

async function handleAdminPasswordLogin(event) {
    event.preventDefault();
    const passInput = document.getElementById("admin-password-input");
    const password = passInput.value;
    
    if (backendConnected) {
        const response = await apiRequest('/api/admin/login', 'POST', { password });
        if (response && response.success) {
            adminAuthenticated = true;
            closeAdminAuthModal();
            passInput.value = "";
            showToast("Access Granted: Admin Workspace Unlocked.", "success");
            switchRole("admin");
        } else {
            showToast("Access Denied: Incorrect Admin Password.", "danger");
            passInput.value = "";
            
            // Shake error animation on password form
            const form = document.getElementById("admin-password-form");
            if (form) {
                form.classList.add("error-shake");
                setTimeout(() => form.classList.remove("error-shake"), 500);
            }
        }
    } else {
        const adminPass = (db.adminSettings && db.adminSettings.password) ? db.adminSettings.password : "admin123";
        if (password === adminPass) {
            adminAuthenticated = true;
            closeAdminAuthModal();
            passInput.value = "";
            showToast("Access Granted: Admin Workspace Unlocked (Offline).", "success");
            switchRole("admin");
        } else {
            showToast("Access Denied: Incorrect Admin Password.", "danger");
            passInput.value = "";
            
            // Shake error animation on password form
            const form = document.getElementById("admin-password-form");
            if (form) {
                form.classList.add("error-shake");
                setTimeout(() => form.classList.remove("error-shake"), 500);
            }
        }
    }
}

function showAdminForgotPassword() {
    document.getElementById("admin-login-card").classList.add("hidden");
    document.getElementById("admin-forgot-card").classList.remove("hidden");
    document.getElementById("admin-reset-card").classList.add("hidden");
    const emailInput = document.getElementById("admin-email-input");
    if (emailInput) {
        emailInput.value = "";
        emailInput.focus();
    }
}

function showAdminResetPassword() {
    document.getElementById("admin-login-card").classList.add("hidden");
    document.getElementById("admin-forgot-card").classList.add("hidden");
    document.getElementById("admin-reset-card").classList.remove("hidden");
    const otpInput = document.getElementById("admin-otp-input");
    if (otpInput) {
        otpInput.value = "";
        otpInput.focus();
    }
    const newPassInput = document.getElementById("admin-new-password-input");
    if (newPassInput) newPassInput.value = "";
}

function showAdminAuthLogin() {
    document.getElementById("admin-login-card").classList.remove("hidden");
    document.getElementById("admin-forgot-card").classList.add("hidden");
    document.getElementById("admin-reset-card").classList.add("hidden");
    const passInput = document.getElementById("admin-password-input");
    if (passInput) {
        passInput.value = "";
        passInput.focus();
    }
}

async function handleAdminForgotPassword(event) {
    event.preventDefault();
    const emailInput = document.getElementById("admin-email-input");
    const email = emailInput.value.trim();

    if (backendConnected) {
        const response = await apiRequest('/api/admin/forgot-password', 'POST', { email });
        if (response && response.success) {
            showToast(response.message, "success");
            if (response.devFallback && response.code) {
                console.log(`🔑 [DEV FALLBACK] Reset code: ${response.code}`);
                showToast(`[Dev Mode] Verification code is: ${response.code}`, "warning");
            }
            showAdminResetPassword();
        } else {
            showToast(response ? "Email not recognized." : "Server Connection Error", "danger");
            const form = document.getElementById("admin-forgot-form");
            if (form) {
                form.classList.add("error-shake");
                setTimeout(() => form.classList.remove("error-shake"), 500);
            }
        }
    } else {
        const adminEmail = (db.adminSettings && db.adminSettings.email) ? db.adminSettings.email : "admin@example.com";
        if (email.toLowerCase() === adminEmail.toLowerCase()) {
            const localCode = "123456";
            if (!db.adminSettings) db.adminSettings = {};
            db.adminSettings.tempCode = localCode;
            db.adminSettings.tempCodeExpiry = Date.now() + 10 * 60 * 1000;
            saveDatabase();
            
            showToast("Offline Mode: Simulated Reset Code generated in console.", "warning");
            console.log(`\n==========================================`);
            console.log(`🔑 [ADMIN PASSWORD RESET OTP - OFFLINE]: ${localCode}`);
            console.log(`📩 Target Email: ${adminEmail}`);
            console.log(`==========================================\n`);
            
            showToast(`[Offline Mode] Verification code is: ${localCode}`, "warning");
            showAdminResetPassword();
        } else {
            showToast("Email address not recognized.", "danger");
            const form = document.getElementById("admin-forgot-form");
            if (form) {
                form.classList.add("error-shake");
                setTimeout(() => form.classList.remove("error-shake"), 500);
            }
        }
    }
}

async function handleAdminResetPassword(event) {
    event.preventDefault();
    const otpInput = document.getElementById("admin-otp-input");
    const code = otpInput.value.trim();
    const newPassInput = document.getElementById("admin-new-password-input");
    const newPassword = newPassInput.value;

    if (newPassword.length < 4) {
        showToast("Password must be at least 4 characters long.", "warning");
        return;
    }

    if (backendConnected) {
        const response = await apiRequest('/api/admin/reset-password', 'POST', { code, newPassword });
        if (response && response.success) {
            showToast("Password reset successfully! Log in with your new password.", "success");
            if (db.adminSettings) db.adminSettings.password = newPassword;
            showAdminAuthLogin();
        } else {
            showToast("Reset failed: Invalid or expired code.", "danger");
            const form = document.getElementById("admin-reset-form");
            if (form) {
                form.classList.add("error-shake");
                setTimeout(() => form.classList.remove("error-shake"), 500);
            }
        }
    } else {
        if (db.adminSettings && db.adminSettings.tempCode === code && Date.now() <= db.adminSettings.tempCodeExpiry) {
            db.adminSettings.password = newPassword;
            delete db.adminSettings.tempCode;
            delete db.adminSettings.tempCodeExpiry;
            saveDatabase();
            showToast("Password reset successfully (Offline Mode). Log in with your new password.", "success");
            showAdminAuthLogin();
        } else {
            showToast("Reset failed: Invalid or expired code.", "danger");
            const form = document.getElementById("admin-reset-form");
            if (form) {
                form.classList.add("error-shake");
                setTimeout(() => form.classList.remove("error-shake"), 500);
            }
        }
    }
}

// ==========================================================================
// 10. RESIDENT AUTHENTICATION & REGISTRY MANAGEMENT HANDLERS
// ==========================================================================

function handleResidentLogin(event) {
    if (event) event.preventDefault();
    const flatInput = document.getElementById("res-login-flat");
    const phoneInput = document.getElementById("res-login-phone");
    
    const flat = flatInput.value.trim().toLowerCase();
    const phone = phoneInput.value.trim();
    
    // Find resident with matching flat and phone
    const resident = db.residents.find(r => 
        r.flat.trim().toLowerCase() === flat && 
        r.phone.trim() === phone
    );
    
    if (resident) {
        if (!resident.approved) {
            showToast("Access Denied: Resident profile is pending admin verification.", "warning");
            
            // Add shake animation
            const loginCard = document.querySelector(".login-card");
            if (loginCard) {
                loginCard.classList.add("error-shake");
                setTimeout(() => loginCard.classList.remove("error-shake"), 500);
            }
            return;
        }
        
        residentLoggedIn = true;
        activeResidentId = resident.id;
        
        // Sync header dropdown
        const select = document.getElementById("active-resident-select");
        if (select) select.value = resident.id;
        
        // Clear fields
        flatInput.value = "";
        phoneInput.value = "";
        
        showToast(`Logged in successfully as ${resident.name}.`, "success");
        updateViews();
    } else {
        showToast("Invalid credentials. Try using one of the pre-seeded accounts below.", "danger");
        
        // Add shake animation
        const loginCard = document.querySelector(".login-card");
        if (loginCard) {
            loginCard.classList.add("error-shake");
            setTimeout(() => loginCard.classList.remove("error-shake"), 500);
        }
    }
}

function handleResidentLogout() {
    residentLoggedIn = false;
    showToast("Logged out of resident portal.", "info");
    updateViews();
}

function handleAdminLogout() {
    adminAuthenticated = false;
    residentLoggedIn = false;
    showToast("Logged out of admin portal.", "info");
    switchRole("resident");
}

function renderDemoResidentChips() {
    const chipsContainer = document.getElementById("demo-login-chips");
    if (!chipsContainer) return;
    
    chipsContainer.innerHTML = "";
    
    // Filter first 4 approved residents to show as chips
    const demoResidents = db.residents.filter(r => r.approved).slice(0, 4);
    
    demoResidents.forEach(r => {
        const chip = document.createElement("div");
        chip.className = "demo-chip";
        chip.innerHTML = `
            <span class="chip-name">${r.name}</span>
            <span class="chip-desc">Flat ${r.flat} • ${r.phone}</span>
        `;
        chip.onclick = () => {
            document.getElementById("res-login-flat").value = r.flat;
            document.getElementById("res-login-phone").value = r.phone;
            handleResidentLogin();
        };
        chipsContainer.appendChild(chip);
    });
}

async function deleteResident(residentId) {
    if (!confirm("Are you sure you want to permanently delete this resident? All their bookings, bills, tickets, visitors, and vehicles will be deleted too.")) {
        return;
    }
    
    if (backendConnected) {
        const result = await apiRequest(`/api/residents/${residentId}`, 'DELETE');
        if (result && result.success) {
            showToast("Resident deleted successfully.", "success");
            
            if (activeResidentId === residentId) {
                residentLoggedIn = false;
            }
            
            await syncWithServer();
        } else {
            showToast("Failed to delete resident from server.", "danger");
        }
    } else {
        // Local database fallback cascading delete
        db.residents = db.residents.filter(r => r.id !== residentId);
        db.vehicles = db.vehicles.filter(v => v.resident_id !== residentId);
        db.bills = db.bills.filter(b => b.resident_id !== residentId);
        db.bookings = db.bookings.filter(b => b.resident_id !== residentId);
        db.tickets = db.tickets.filter(t => t.resident_id !== residentId);
        db.visitors = db.visitors.filter(v => v.resident_id !== residentId);
        if (db.emergencyLogs) {
            db.emergencyLogs = db.emergencyLogs.filter(e => e.resident_id !== residentId);
        }
        
        saveDatabase();
        
        if (activeResidentId === residentId) {
            residentLoggedIn = false;
        }
        
        showToast("Resident deleted (local fallback).", "success");
        updateViews();
    }
}

// ==========================================================================
// 11. ADMIN RESIDENT MEMBERS ACTIONS
// ==========================================================================

let activeMemberResidentId = null;

function openAdminMembersModal(residentId) {
    activeMemberResidentId = residentId;
    const resident = db.residents.find(r => r.id === residentId);
    if (resident) {
        document.getElementById("member-modal-resident-name").textContent = `Resident: ${resident.name}`;
        document.getElementById("member-modal-resident-flat").textContent = `Flat: ${resident.flat}`;
    }
    
    // Clear add form inputs
    document.getElementById("mem-name").value = "";
    document.getElementById("mem-relation").value = "Spouse";
    document.getElementById("mem-phone").value = "";
    
    // Hide custom input group and clear it
    const customGroup = document.getElementById("custom-relation-group");
    if (customGroup) customGroup.classList.add("hidden");
    const customInput = document.getElementById("mem-relation-custom");
    if (customInput) {
        customInput.required = false;
        customInput.value = "";
    }
    
    document.getElementById("admin-members-modal").classList.remove("hidden");
    loadAdminMembersList(residentId);
}

function closeAdminMembersModal() {
    document.getElementById("admin-members-modal").classList.add("hidden");
    activeMemberResidentId = null;
}

function loadAdminMembersList(residentId) {
    const listContainer = document.getElementById("modal-members-list");
    listContainer.innerHTML = "";
    
    const members = (db.resident_members || []).filter(m => m.resident_id === residentId);
    if (members.length === 0) {
        listContainer.innerHTML = `<p class="text-muted text-sm text-center">No flat members added yet.</p>`;
    } else {
        members.forEach(m => {
            const div = document.createElement("div");
            div.className = "flex-row justify-between align-center border-b padding-t-05 margin-t-05";
            div.innerHTML = `
                <div>
                    <strong>${m.name}</strong> <span class="badge badge-pill badge-admin" style="font-size:0.6rem; vertical-align:middle;">${m.relationship}</span>
                    ${m.phone ? `<span class="text-xs text-secondary block" style="margin-top:2px;">📞 ${m.phone}</span>` : ''}
                </div>
                <button class="btn btn-sm btn-outline text-danger" style="padding:2px 8px" onclick="handleAdminDeleteMember(${m.id})">✕</button>
            `;
            listContainer.appendChild(div);
        });
    }
}

async function handleAdminAddMember(event) {
    event.preventDefault();
    if (!activeMemberResidentId) return;

    const nameInput = document.getElementById("mem-name");
    const relationInput = document.getElementById("mem-relation");
    const phoneInput = document.getElementById("mem-phone");

    const relationSelect = relationInput.value;
    const relationVal = relationSelect === "Other" 
        ? document.getElementById("mem-relation-custom").value.trim() 
        : relationSelect;

    if (relationSelect === "Other" && !relationVal) {
        showToast("Please specify the custom relationship.", "warning");
        return;
    }

    const newMember = {
        id: Date.now(),
        resident_id: activeMemberResidentId,
        name: nameInput.value.trim(),
        relationship: relationVal,
        phone: phoneInput.value.trim()
    };

    if (backendConnected) {
        const saved = await apiRequest(`/api/residents/${activeMemberResidentId}/members`, 'POST', newMember);
        if (saved) {
            db.resident_members.push(saved);
            showToast("Flat member added successfully.", "success");
            nameInput.value = "";
            phoneInput.value = "";
            const customInput = document.getElementById("mem-relation-custom");
            if (customInput) customInput.value = "";
            const customGroup = document.getElementById("custom-relation-group");
            if (customGroup) customGroup.classList.add("hidden");
            relationInput.value = "Spouse";
            loadAdminMembersList(activeMemberResidentId);
            updateViews();
        }
    } else {
        db.resident_members.push(newMember);
        saveDatabase();
        showToast("Flat member added (offline mode).", "success");
        nameInput.value = "";
        phoneInput.value = "";
        const customInput = document.getElementById("mem-relation-custom");
        if (customInput) customInput.value = "";
        const customGroup = document.getElementById("custom-relation-group");
        if (customGroup) customGroup.classList.add("hidden");
        relationInput.value = "Spouse";
        loadAdminMembersList(activeMemberResidentId);
        updateViews();
    }
}

async function handleAdminDeleteMember(memberId) {
    if (!confirm("Are you sure you want to remove this flat member?")) {
        return;
    }

    if (backendConnected) {
        const result = await apiRequest(`/api/members/${memberId}`, 'DELETE');
        if (result && result.success) {
            db.resident_members = db.resident_members.filter(m => m.id !== memberId);
            showToast("Member removed successfully.", "success");
            if (activeMemberResidentId) {
                loadAdminMembersList(activeMemberResidentId);
            }
            updateViews();
        }
    } else {
        db.resident_members = db.resident_members.filter(m => m.id !== memberId);
        saveDatabase();
        showToast("Member removed (offline mode).", "success");
        if (activeMemberResidentId) {
            loadAdminMembersList(activeMemberResidentId);
        }
        updateViews();
    }
}

function toggleCustomRelationInput(value) {
    const customGroup = document.getElementById("custom-relation-group");
    const customInput = document.getElementById("mem-relation-custom");
    if (customGroup && customInput) {
        if (value === "Other") {
            customGroup.classList.remove("hidden");
            customInput.required = true;
            customInput.focus();
        } else {
            customGroup.classList.add("hidden");
            customInput.required = false;
            customInput.value = "";
        }
    }
}

// ==========================================================================
// 12. ADMIN SETTINGS ACTIONS
// ==========================================================================

async function loadAdminSettingsForm() {
    const emailInput = document.getElementById("set-admin-email");
    const smtpUserInput = document.getElementById("set-smtp-user");
    const smtpPassInput = document.getElementById("set-smtp-pass");

    if (backendConnected) {
        const settings = await apiRequest('/api/admin/settings');
        if (settings) {
            emailInput.value = settings.email || "";
            smtpUserInput.value = settings.smtpUser || "";
            smtpPassInput.value = settings.hasSmtpPass ? "••••••••" : "";
        }
    } else {
        const email = (db.adminSettings && db.adminSettings.email) ? db.adminSettings.email : "admin@example.com";
        const smtpUser = (db.adminSettings && db.adminSettings.smtpUser) ? db.adminSettings.smtpUser : "";
        const smtpPass = (db.adminSettings && db.adminSettings.smtpPass) ? db.adminSettings.smtpPass : "";
        
        emailInput.value = email;
        smtpUserInput.value = smtpUser;
        smtpPassInput.value = smtpPass ? "••••••••" : "";
    }
}

async function handleAdminChangePassword(event) {
    event.preventDefault();
    const currentPass = document.getElementById("set-current-pass").value;
    const newPass = document.getElementById("set-new-pass").value;
    const confirmPass = document.getElementById("set-confirm-pass").value;

    if (newPass.length < 4) {
        showToast("New password must be at least 4 characters.", "warning");
        return;
    }

    if (newPass !== confirmPass) {
        showToast("Passwords do not match.", "danger");
        return;
    }

    if (backendConnected) {
        const payload = {
            currentPassword: currentPass,
            newPassword: newPass
        };
        const res = await apiRequest('/api/admin/settings', 'PUT', payload);
        if (res && res.success) {
            showToast("Admin password changed successfully!", "success");
            document.getElementById("admin-change-password-form").reset();
            if (db.adminSettings) db.adminSettings.password = newPass;
        } else {
            const form = document.getElementById("admin-change-password-form");
            if (form) {
                form.classList.add("error-shake");
                setTimeout(() => form.classList.remove("error-shake"), 500);
            }
        }
    } else {
        const currentAdminPass = (db.adminSettings && db.adminSettings.password) ? db.adminSettings.password : "admin123";
        if (currentPass !== currentAdminPass) {
            showToast("Incorrect current password.", "danger");
            return;
        }
        if (!db.adminSettings) db.adminSettings = {};
        db.adminSettings.password = newPass;
        saveDatabase();
        showToast("Admin password changed successfully (Offline).", "success");
        document.getElementById("admin-change-password-form").reset();
    }
}

async function handleAdminSaveSMTPSettings(event) {
    event.preventDefault();
    const email = document.getElementById("set-admin-email").value.trim();
    const smtpUser = document.getElementById("set-smtp-user").value.trim();
    const smtpPass = document.getElementById("set-smtp-pass").value;

    const currentPass = prompt("Please enter your current admin password to verify credentials and save settings:");
    if (currentPass === null) return;

    if (backendConnected) {
        const payload = {
            currentPassword: currentPass,
            email: email,
            smtpUser: smtpUser,
            smtpPass: smtpPass
        };
        const res = await apiRequest('/api/admin/settings', 'PUT', payload);
        if (res && res.success) {
            showToast("System settings updated successfully!", "success");
            loadAdminSettingsForm();
        }
    } else {
        const currentAdminPass = (db.adminSettings && db.adminSettings.password) ? db.adminSettings.password : "admin123";
        if (currentPass !== currentAdminPass) {
            showToast("Incorrect password. Settings not saved.", "danger");
            return;
        }
        
        if (!db.adminSettings) db.adminSettings = {};
        db.adminSettings.email = email;
        db.adminSettings.smtpUser = smtpUser;
        if (smtpPass !== '••••••••') {
            db.adminSettings.smtpPass = smtpPass;
        }
        saveDatabase();
        showToast("System settings updated successfully (Offline).", "success");
        loadAdminSettingsForm();
    }
}

// ==========================================================================
// 13. SOCIETY MEETINGS MANAGEMENT HANDLERS
// ==========================================================================

function toggleMeetingTargetOptions(targetValue) {
    const selectGroup = document.getElementById("meet-resident-select-group");
    if (selectGroup) {
        if (targetValue === "individual") {
            selectGroup.classList.remove("hidden");
        } else {
            selectGroup.classList.add("hidden");
        }
    }
}

function populateMeetingTargetResidentDropdown() {
    const select = document.getElementById("meet-target-resident");
    if (!select) return;
    
    // Clear and populate with all approved residents
    select.innerHTML = "";
    const approvedResidents = (db.residents || []).filter(r => r.approved);
    
    if (approvedResidents.length === 0) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = "No approved residents found";
        select.appendChild(opt);
    } else {
        approvedResidents.forEach(res => {
            const opt = document.createElement("option");
            opt.value = res.id;
            opt.textContent = `${res.name} (Flat ${res.flat})`;
            select.appendChild(opt);
        });
    }
}

async function handleAdminScheduleMeeting(event) {
    if (event) event.preventDefault();
    
    const title = document.getElementById("meet-title").value.trim();
    const date = document.getElementById("meet-date").value;
    const time = document.getElementById("meet-time").value;
    const targetGroup = document.getElementById("meet-target-group").value;
    const targetResidentId = targetGroup === "individual" ? document.getElementById("meet-target-resident").value : null;
    const agenda = document.getElementById("meet-agenda").value.trim();

    if (!title || !date || !time) {
        showToast("Please fill all required meeting fields.", "warning");
        return;
    }

    const newMeeting = {
        title: title,
        meeting_date: date,
        meeting_time: time,
        target_group: targetGroup,
        target_resident_id: targetResidentId ? Number(targetResidentId) : null,
        agenda: agenda
    };

    if (backendConnected) {
        const saved = await apiRequest('/api/meetings', 'POST', newMeeting);
        if (saved) {
            db.meetings.push(saved);
            showToast(`Meeting "${title}" scheduled successfully.`, "success");
            document.getElementById("admin-schedule-meeting-form").reset();
            toggleMeetingTargetOptions("all");
            updateViews();
        } else {
            showToast("Failed to schedule meeting.", "danger");
        }
    } else {
        newMeeting.id = Date.now();
        if (!db.meetings) db.meetings = [];
        db.meetings.push(newMeeting);
        saveDatabase();
        showToast(`Meeting "${title}" scheduled successfully (Offline).`, "success");
        document.getElementById("admin-schedule-meeting-form").reset();
        toggleMeetingTargetOptions("all");
        updateViews();
    }
}

async function handleAdminCancelMeeting(meetingId) {
    if (!confirm("Are you sure you want to cancel and remove this scheduled meeting?")) {
        return;
    }

    if (backendConnected) {
        const response = await apiRequest(`/api/meetings/${meetingId}`, 'DELETE');
        if (response && response.success) {
            db.meetings = db.meetings.filter(m => m.id !== meetingId);
            showToast("Meeting canceled successfully.", "success");
            updateViews();
        } else {
            showToast("Failed to cancel meeting.", "danger");
        }
    } else {
        db.meetings = db.meetings.filter(m => m.id !== meetingId);
        saveDatabase();
        showToast("Meeting canceled (Offline).", "success");
    }
}

// ==========================================================================
// RWA NEWS BROADCAST LOGIC
// ==========================================================================

function updateResidentNewsFeed() {
    const feed = document.getElementById("res-news-feed");
    if (!feed) return;
    feed.innerHTML = "";
    
    const newsList = db.news || [];
    const sortedNews = [...newsList].sort((a, b) => b.id - a.id);
    
    if (sortedNews.length === 0) {
        feed.innerHTML = `<div class="empty-state">No society announcements yet. The board is clear.</div>`;
        return;
    }
    
    sortedNews.forEach(n => {
        const item = document.createElement("div");
        item.className = "card";
        item.style.padding = "1rem";
        item.style.border = "1px solid var(--border-color)";
        item.style.background = "var(--bg-accent-el)";
        item.style.display = "flex";
        item.style.flexDirection = "column";
        item.style.gap = "0.5rem";
        item.style.boxShadow = "none";
        item.style.animation = "fadeIn 0.3s ease-out";
        
        const dateStr = n.created_at ? new Date(n.created_at).toLocaleString('en-IN') : new Date(Number(n.id)).toLocaleString('en-IN');
        
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed var(--border-color); padding-bottom:0.5rem;">
                <strong style="color:var(--text-main); font-size:1.05rem;">📢 ${n.title}</strong>
                <span style="font-size:0.75rem; color:var(--text-muted);">${dateStr}</span>
            </div>
            <p style="margin:0; font-size:0.88rem; color:var(--text-secondary); line-height:1.45; white-space:pre-wrap;">${n.content}</p>
        `;
        feed.appendChild(item);
    });
}

function updateAdminNewsFeed() {
    const list = document.getElementById("admin-news-list");
    if (!list) return;
    list.innerHTML = "";
    
    const newsList = db.news || [];
    const sortedNews = [...newsList].sort((a, b) => b.id - a.id);
    
    if (sortedNews.length === 0) {
        list.innerHTML = `<div class="empty-state">No announcements broadcasted yet.</div>`;
        return;
    }
    
    sortedNews.forEach(n => {
        const item = document.createElement("div");
        item.className = "verify-item-widget margin-b-05";
        item.style.flexDirection = "column";
        item.style.alignItems = "stretch";
        item.style.gap = "0.5rem";
        item.style.padding = "0.85rem";
        item.style.animation = "fadeIn 0.3s ease-out";
        
        const dateStr = n.created_at ? new Date(n.created_at).toLocaleString('en-IN') : new Date(Number(n.id)).toLocaleString('en-IN');
        
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <strong style="color:var(--text-main); font-size:0.95rem;">📢 ${n.title}</strong>
                    <span style="display:block; font-size:0.7rem; color:var(--text-muted); margin-top:2px;">${dateStr}</span>
                </div>
                <button class="btn btn-sm btn-outline text-danger" onclick="handleAdminDeleteNews(${n.id})">Delete</button>
            </div>
            <p style="margin:0.25rem 0 0 0; font-size:0.8rem; color:var(--text-secondary); line-height:1.4; white-space:pre-wrap;">${n.content}</p>
        `;
        list.appendChild(item);
    });
}

async function handleAdminPostNews(event) {
    event.preventDefault();
    const titleInput = document.getElementById("news-title");
    const contentInput = document.getElementById("news-content");
    
    if (!titleInput || !contentInput) return;
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    if (!title || !content) return;
    
    const newNotice = {
        id: Date.now(),
        title,
        content,
        created_at: new Date().toISOString()
    };
    
    try {
        let success = false;
        if (backendConnected) {
            const res = await fetch("/api/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNotice)
            });
            if (res.ok) success = true;
        } else {
            // Local fallback
            if (!db.news) db.news = [];
            db.news.push(newNotice);
            saveDatabase();
            success = true;
        }
        
        if (success) {
            titleInput.value = "";
            contentInput.value = "";
            showToast("Announcement broadcasted successfully to all residents!", "success");
            await syncWithServer();
        } else {
            showToast("Failed to broadcast announcement.", "danger");
        }
    } catch (e) {
        console.error("Error posting announcement:", e);
        showToast("Error broadcasting announcement.", "danger");
    }
}

async function handleAdminDeleteNews(newsId) {
    if (!confirm("Are you sure you want to delete this announcement?")) {
        return;
    }
    
    try {
        let success = false;
        if (backendConnected) {
            const res = await fetch(`/api/news/${newsId}`, {
                method: "DELETE"
            });
            if (res.ok) success = true;
        } else {
            // Local fallback
            if (db.news) {
                db.news = db.news.filter(n => n.id !== newsId);
                saveDatabase();
                success = true;
            }
        }
        
        if (success) {
            showToast("Announcement deleted successfully.", "success");
            await syncWithServer();
        } else {
            showToast("Failed to delete announcement.", "danger");
        }
    } catch (e) {
        console.error("Error deleting announcement:", e);
        showToast("Error deleting announcement.", "danger");
    }
}

// ==========================================================================
// RESIDENT NOTIFICATIONS LOGIC & HANDLERS
// ==========================================================================

function updateResidentNotificationsUI(resident) {
    if (!resident) return;

    // 1. Unpaid Bills Count
    const myBills = db.bills.filter(b => b.resident_id === resident.id && b.status === "unpaid");
    const unpaidBillsCount = myBills.length;
    const billsBadge = document.getElementById("res-nav-bills-badge");
    if (billsBadge) {
        if (unpaidBillsCount > 0) {
            billsBadge.textContent = unpaidBillsCount;
            billsBadge.classList.remove("hidden");
        } else {
            billsBadge.classList.add("hidden");
        }
    }

    // 2. Unseen News Count
    const newsList = db.news || [];
    let seenNews = [];
    try {
        seenNews = JSON.parse(localStorage.getItem(`seen_news_resident_${resident.id}`)) || [];
    } catch (e) {
        seenNews = [];
    }
    const unseenNews = newsList.filter(n => !seenNews.includes(n.id));
    const unseenNewsCount = unseenNews.length;
    const newsBadge = document.getElementById("res-nav-news-badge");
    if (newsBadge) {
        if (unseenNewsCount > 0) {
            newsBadge.textContent = unseenNewsCount;
            newsBadge.classList.remove("hidden");
        } else {
            newsBadge.classList.add("hidden");
        }
    }

    // 3. Unseen Meetings Count
    const myMeetings = (db.meetings || []).filter(m => {
        if (m.target_group === "all") return true;
        if (m.target_group === "committee" && resident.is_committee_member) return true;
        if (m.target_group === "individual" && Number(m.target_resident_id) === Number(resident.id)) return true;
        return false;
    });
    let seenMeetings = [];
    try {
        seenMeetings = JSON.parse(localStorage.getItem(`seen_meetings_resident_${resident.id}`)) || [];
    } catch (e) {
        seenMeetings = [];
    }
    const unseenMeetings = myMeetings.filter(m => !seenMeetings.includes(m.id));
    const unseenMeetingsCount = unseenMeetings.length;
    const meetingsBadge = document.getElementById("res-nav-meetings-badge");
    if (meetingsBadge) {
        if (unseenMeetingsCount > 0) {
            meetingsBadge.textContent = unseenMeetingsCount;
            meetingsBadge.classList.remove("hidden");
        } else {
            meetingsBadge.classList.add("hidden");
        }
    }

    // 4. Overall Bell Notification Badge
    const totalUnread = unpaidBillsCount + unseenNewsCount + unseenMeetingsCount;
    const bellBadge = document.getElementById("res-notification-badge");
    const bellContainer = document.getElementById("res-notification-container");

    if (bellContainer) {
        if (residentLoggedIn && currentRole === 'resident') {
            bellContainer.classList.remove("hidden");
        } else {
            bellContainer.classList.add("hidden");
        }
    }

    if (bellBadge) {
        if (totalUnread > 0) {
            bellBadge.textContent = totalUnread;
            bellBadge.classList.remove("hidden");
            
            // Add bounce animation
            const bellBtn = document.getElementById("res-notification-btn");
            if (bellBtn) {
                bellBtn.classList.add("bounce-animation");
                setTimeout(() => bellBtn.classList.remove("bounce-animation"), 1000);
            }
        } else {
            bellBadge.classList.add("hidden");
        }
    }

    // 5. Populate Notification Dropdown list
    const dropdownList = document.getElementById("res-notifications-list");
    if (dropdownList) {
        dropdownList.innerHTML = "";
        
        const notifications = [];

        // Add unpaid bills notifications
        myBills.forEach(b => {
            const calc = calculateBillDues(b);
            notifications.push({
                type: 'bill',
                title: '💳 Unpaid Maintenance Bill',
                message: `Bill for ${b.month} is due. Total outstanding: ₹${calc.total.toLocaleString('en-IN')}`,
                time: 'Action required',
                action: () => switchResidentView('bills', document.querySelector("#resident-portal button[onclick*='bills']"))
            });
        });

        // Add unseen news notifications
        unseenNews.forEach(n => {
            const dateStr = n.created_at ? new Date(n.created_at).toLocaleDateString('en-IN') : new Date(Number(n.id)).toLocaleDateString('en-IN');
            notifications.push({
                type: 'news',
                title: '📢 New Society Announcement',
                message: n.title,
                time: dateStr,
                action: () => {
                    markNewsItemAsRead(resident.id, n.id);
                    switchResidentView('news', document.querySelector("#resident-portal button[onclick*='news']"));
                }
            });
        });

        // Add unseen meetings notifications
        unseenMeetings.forEach(m => {
            const dateStr = formatDateToDDMMYYYY(m.meeting_date);
            notifications.push({
                type: 'meeting',
                title: '📅 New Scheduled Meeting',
                message: `${m.title} on ${dateStr} at ${m.meeting_time}`,
                time: `Meeting: ${dateStr}`,
                action: () => {
                    markMeetingItemAsRead(resident.id, m.id);
                    switchResidentView('dashboard', document.querySelector("#resident-portal button[onclick*='dashboard']"));
                }
            });
        });

        if (notifications.length === 0) {
            dropdownList.innerHTML = `
                <div style="padding: 1.5rem; text-align: center; color: var(--text-secondary);">
                    <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">🔔</div>
                    <div class="font-bold" style="font-size: 0.9rem; color: var(--text-main);">All caught up!</div>
                    <div style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--text-secondary);">No unread notifications.</div>
                </div>
            `;
        } else {
            notifications.forEach(notif => {
                const item = document.createElement("div");
                item.className = "dropdown-item";
                item.innerHTML = `
                    <div class="icon">${notif.type === 'bill' ? '💳' : notif.type === 'news' ? '📢' : '📅'}</div>
                    <div class="content">
                        <span class="title">${notif.title}</span>
                        <span class="message">${notif.message}</span>
                        <span class="time">${notif.time}</span>
                    </div>
                `;
                item.onclick = (e) => {
                    e.stopPropagation();
                    notif.action();
                    document.getElementById("res-notifications-dropdown").classList.add("hidden");
                };
                dropdownList.appendChild(item);
            });
        }
    }
}

function markNewsAsRead(residentId) {
    const newsList = db.news || [];
    const newsIds = newsList.map(n => n.id);
    localStorage.setItem(`seen_news_resident_${residentId}`, JSON.stringify(newsIds));
    const resident = getCurrentResident();
    if (resident && resident.id === residentId) {
        updateResidentNotificationsUI(resident);
    }
}

function markNewsItemAsRead(residentId, newsId) {
    let seenNews = [];
    try {
        seenNews = JSON.parse(localStorage.getItem(`seen_news_resident_${residentId}`)) || [];
    } catch (e) {
        seenNews = [];
    }
    if (!seenNews.includes(newsId)) {
        seenNews.push(newsId);
        localStorage.setItem(`seen_news_resident_${residentId}`, JSON.stringify(seenNews));
    }
    const resident = getCurrentResident();
    if (resident && resident.id === residentId) {
        updateResidentNotificationsUI(resident);
    }
}

function markMeetingsAsRead(residentId) {
    const resident = getCurrentResident();
    if (!resident) return;
    const myMeetings = (db.meetings || []).filter(m => {
        if (m.target_group === "all") return true;
        if (m.target_group === "committee" && resident.is_committee_member) return true;
        if (m.target_group === "individual" && Number(m.target_resident_id) === Number(resident.id)) return true;
        return false;
    });
    const meetingIds = myMeetings.map(m => m.id);
    localStorage.setItem(`seen_meetings_resident_${residentId}`, JSON.stringify(meetingIds));
    if (resident.id === residentId) {
        updateResidentNotificationsUI(resident);
    }
}

function markMeetingItemAsRead(residentId, meetingId) {
    let seenMeetings = [];
    try {
        seenMeetings = JSON.parse(localStorage.getItem(`seen_meetings_resident_${residentId}`)) || [];
    } catch (e) {
        seenMeetings = [];
    }
    if (!seenMeetings.includes(meetingId)) {
        seenMeetings.push(meetingId);
        localStorage.setItem(`seen_meetings_resident_${residentId}`, JSON.stringify(seenMeetings));
    }
    const resident = getCurrentResident();
    if (resident && resident.id === residentId) {
        updateResidentNotificationsUI(resident);
    }
}

function markAllNotificationsAsRead() {
    const resident = getCurrentResident();
    if (!resident) return;
    
    // Mark news as read
    const newsList = db.news || [];
    const newsIds = newsList.map(n => n.id);
    localStorage.setItem(`seen_news_resident_${resident.id}`, JSON.stringify(newsIds));

    // Mark meetings as read
    const myMeetings = (db.meetings || []).filter(m => {
        if (m.target_group === "all") return true;
        if (m.target_group === "committee" && resident.is_committee_member) return true;
        if (m.target_group === "individual" && Number(m.target_resident_id) === Number(resident.id)) return true;
        return false;
    });
    const meetingIds = myMeetings.map(m => m.id);
    localStorage.setItem(`seen_meetings_resident_${resident.id}`, JSON.stringify(meetingIds));

    // Update UI
    updateResidentNotificationsUI(resident);
    showToast("All notifications marked as read.", "success");
}

function toggleResidentNotifications() {
    const dropdown = document.getElementById("res-notifications-dropdown");
    if (dropdown) {
        dropdown.classList.toggle("hidden");
    }
}

// Global click-away listener for Resident Notifications dropdown
window.addEventListener("click", (event) => {
    const dropdown = document.getElementById("res-notifications-dropdown");
    const container = document.getElementById("res-notification-container");
    if (dropdown && !dropdown.classList.contains("hidden")) {
        if (container && !container.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    }
});

