-- ==========================================================================
-- SMART SOCIETY MANAGEMENT SYSTEM - POSTGRESQL SCHEMA (SUPABASE)
-- Copy and run these queries in your Supabase SQL Editor to set up tables.
-- ==========================================================================

-- 1. Drop existing tables if they exist (Clean Setup)
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS resident_members CASCADE;
DROP TABLE IF EXISTS emergency_logs CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS visitors CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS bills CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS residents CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;

-- 2. Create tables
CREATE TABLE residents (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    flat TEXT NOT NULL,
    phone TEXT,
    occupancy TEXT NOT NULL CHECK (occupancy IN ('owner', 'tenant')),
    approved BOOLEAN DEFAULT FALSE,
    is_committee_member BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE vehicles (
    id BIGINT PRIMARY KEY,
    resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    plate TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Car', 'Bike')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE bills (
    id BIGINT PRIMARY KEY,
    resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    month TEXT NOT NULL,
    base_fee NUMERIC NOT NULL,
    missed_months INT DEFAULT 0,
    waived BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid')),
    paid_amount NUMERIC,
    paid_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE bookings (
    id BIGINT PRIMARY KEY,
    resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    facility TEXT NOT NULL CHECK (facility IN ('Party Hall', 'Turf', 'Gymnasium')),
    date TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE visitors (
    id BIGINT PRIMARY KEY,
    resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Guest', 'Delivery', 'Service')),
    passcode TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE vendors (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE tickets (
    id BIGINT PRIMARY KEY,
    resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN (
        'Plumbing', 'Electrical Fault', 'Carpentry', 'Elevator Malfunction',
        'Infrastructure Damage', 'Parking Disputes', 'Visitor Management Issues',
        'Property Violations', 'Noise Complaints', 'Pet-Related Issues',
        'Waste Management', 'Terrace Access Unauthorized', 'Common Area Damages',
        'Illegal Commercial Activity', 'Fire & Gas Safety Hazard',
        'Medical & Mobility Request', 'Pest Control', 'Car Washers & Drivers Nuisance',
        'Water Scarcity & Tankers'
    )),
    priority TEXT DEFAULT 'low' CHECK (priority IN ('low', 'medium', 'urgent')),
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'resolved')),
    vendor_id INT REFERENCES vendors(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE emergency_logs (
    id BIGINT PRIMARY KEY,
    resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    flat TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
    resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE resident_members (
    id BIGINT PRIMARY KEY,
    resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Seed Default Vendors Data
INSERT INTO vendors (id, name, category) VALUES
(1, 'Raju Mistri', 'Civil & Masonry'),
(2, 'Amit Saini', 'Carpentry'),
(3, 'Ramesh Kumar', 'Plumbing'),
(4, 'Tukaram Patil', 'Water Supply & Borewell'),
(5, 'Suresh Dev', 'Electrical'),
(6, 'Manoj Desai', 'Fire & Gas Safety'),
(7, 'Deepak Shinde', 'Housekeeping & Waste'),
(8, 'Sunil Jadhav', 'Pest Control'),
(9, 'Vikram Mane', 'Security & Access'),
(10, 'Neeraj Gupta', 'Accounting & Billing'),
(11, 'Ashok Kulkarni', 'Facility Management'),
(12, 'Dr. Anjali Joshi', 'Medical Assistance')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Default Residents & Base Data for Testing
INSERT INTO residents (id, name, flat, phone, occupancy, approved) VALUES
(1, 'Aarav Sharma', '101-A', '+91 98765 43210', 'owner', TRUE),
(2, 'Priya Patel', '302-B', '+91 98123 45678', 'tenant', TRUE),
(3, 'Rohan Verma', '205-A', '+91 95555 12345', 'owner', TRUE),
(4, 'Sneha Reddy', '404-C', '+91 99887 76655', 'tenant', FALSE),
(5, 'Vikram Singh', '501-B', '+91 88776 65544', 'owner', TRUE),
(6, 'Ananya Iyer', '102-A', '+91 94440 12345', 'owner', TRUE),
(7, 'Kabir Malhotra', '201-B', '+91 93335 98765', 'tenant', TRUE),
(8, 'Meera Joshi', '304-C', '+91 92221 44556', 'owner', TRUE),
(9, 'Arjun Deshmukh', '402-A', '+91 91112 33445', 'owner', TRUE),
(10, 'Aditi Rao', '503-C', '+91 90003 55667', 'tenant', TRUE),
(11, 'Devendra Jha', '104-B', '+91 98884 77889', 'owner', TRUE),
(12, 'Riya Das', '202-C', '+91 97775 66778', 'tenant', FALSE),
(13, 'Sanjay Kulkarni', '301-A', '+91 96666 55443', 'owner', TRUE),
(14, 'Zoya Ahmed', '403-B', '+91 95557 44332', 'tenant', TRUE),
(15, 'Rahul Nair', '502-D', '+91 94448 33221', 'owner', TRUE),
(16, 'Neha Gupta', '601-A', '+91 98881 11223', 'owner', TRUE),
(17, 'Karthik Shetty', '602-B', '+91 97772 22334', 'tenant', TRUE),
(18, 'Shruti Desai', '603-C', '+91 96663 33445', 'owner', TRUE),
(19, 'Manish Tiwari', '701-A', '+91 95554 44556', 'tenant', TRUE),
(20, 'Kavita Gokhale', '702-D', '+91 94445 55667', 'owner', TRUE),
(21, 'Amit Bhosale', '801-A', '+91 93336 66778', 'owner', TRUE),
(22, 'Deepa Nambiar', '802-B', '+91 92227 77889', 'tenant', TRUE),
(23, 'Roshan Chauhan', '803-C', '+91 91118 88990', 'owner', TRUE),
(24, 'Aliya Sheikh', '901-A', '+91 90009 99001', 'owner', TRUE),
(25, 'Varun Apte', '902-B', '+91 98880 00112', 'tenant', FALSE),
(26, 'Kiran Kumar', '903-D', '+91 97771 11223', 'owner', TRUE),
(27, 'Vishal Yadav', '1001-A', '+91 96662 22334', 'owner', TRUE),
(28, 'Harish Patil', '1002-B', '+91 95553 33445', 'tenant', TRUE),
(29, 'Pooja Mhatre', '1003-C', '+91 94444 44556', 'owner', TRUE),
(30, 'Sameer Kadam', '1101-A', '+91 93335 55667', 'owner', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5. VEHICLES (24 Vehicles assigned across the 30 residents)
INSERT INTO vehicles (id, resident_id, plate, type) VALUES
(1, 1, 'MH-12-XX-1234', 'Car'),
(2, 1, 'MH-12-YY-5678', 'Bike'),
(3, 2, 'GJ-01-ZZ-9999', 'Car'),
(4, 5, 'DL-03-CC-2222', 'Car'),
(5, 6, 'MH-12-CD-9876', 'Car'),
(6, 8, 'MH-14-EF-1122', 'Bike'),
(7, 9, 'MH-12-GH-3344', 'Car'),
(8, 10, 'KA-03-MM-8899', 'Car'),
(9, 13, 'MH-12-NP-7711', 'Car'),
(10, 15, 'KL-07-CD-4455', 'Car'),
(11, 16, 'MH-12-AB-1010', 'Bike'),
(12, 18, 'MH-14-XY-2020', 'Car'),
(13, 19, 'DL-01-ZA-3030', 'Bike'),
(14, 21, 'MH-01-BB-4040', 'Car'),
(15, 21, 'MH-01-CC-5050', 'Car'),
(16, 23, 'MH-02-DD-6060', 'Bike'),
(17, 24, 'MH-12-EE-7070', 'Car'),
(18, 26, 'MH-14-FF-8080', 'Car'),
(19, 27, 'MH-01-GG-9090', 'Bike'),
(20, 28, 'MH-02-HH-0101', 'Car'),
(21, 29, 'MH-12-II-1212', 'Car'),
(22, 30, 'MH-01-SR-5555', 'Car'),
(23, 30, 'MH-01-KK-9999', 'Car'),
(24, 30, 'MH-01-LL-8888', 'Bike')
ON CONFLICT (id) DO NOTHING;

-- 6. BILLING HISTORY
INSERT INTO bills (id, resident_id, month, base_fee, missed_months, waived, status, paid_amount, paid_date) VALUES
(101, 1, 'May 2026', 2000, 0, FALSE, 'paid', 2000, '2026-05-02'),
(102, 2, 'May 2026', 1500, 0, FALSE, 'paid', 1500, '2026-05-10'),
(103, 3, 'May 2026', 2500, 1, FALSE, 'unpaid', NULL, NULL),
(104, 4, 'May 2026', 1500, 0, FALSE, 'unpaid', NULL, NULL),
(105, 5, 'May 2026', 2000, 0, FALSE, 'paid', 2000, '2026-05-01'),
(106, 7, 'May 2026', 1500, 0, FALSE, 'paid', 1500, '2026-05-05'),
(107, 8, 'May 2026', 2200, 0, FALSE, 'paid', 2200, '2026-05-04'),
(108, 9, 'May 2026', 2000, 2, FALSE, 'unpaid', NULL, NULL),
(109, 11, 'May 2026', 2000, 0, FALSE, 'paid', 2000, '2026-05-01'),
(110, 13, 'May 2026', 2000, 0, TRUE, 'paid', 0, '2026-05-01'), 
(111, 15, 'May 2026', 2500, 0, FALSE, 'paid', 2500, '2026-05-03'),
(112, 16, 'May 2026', 2000, 0, FALSE, 'paid', 2000, '2026-05-07'),
(113, 17, 'May 2026', 1500, 0, FALSE, 'paid', 1500, '2026-05-08'),
(114, 18, 'May 2026', 2200, 1, FALSE, 'unpaid', NULL, NULL),
(115, 20, 'May 2026', 2000, 0, FALSE, 'paid', 2000, '2026-05-11'),
(116, 21, 'May 2026', 3000, 0, FALSE, 'paid', 3000, '2026-05-02'),
(117, 22, 'May 2026', 1500, 0, FALSE, 'paid', 1500, '2026-05-15'),
(118, 24, 'May 2026', 2000, 0, FALSE, 'paid', 2000, '2026-05-04'),
(119, 25, 'May 2026', 1500, 3, FALSE, 'unpaid', NULL, NULL),
(120, 27, 'May 2026', 2000, 0, FALSE, 'paid', 2000, '2026-05-09'),
(121, 30, 'May 2026', 3500, 0, FALSE, 'paid', 3500, '2026-05-01')
ON CONFLICT (id) DO NOTHING;

-- 7. AMENITY BOOKINGS
INSERT INTO bookings (id, resident_id, facility, date, status) VALUES
(201, 1, 'Party Hall', '2026-06-15', 'approved'),
(202, 2, 'Turf', '2026-06-20', 'approved'),
(203, 6, 'Gymnasium', '2026-05-29', 'approved'),
(204, 11, 'Turf', '2026-05-30', 'approved'),
(205, 13, 'Party Hall', '2026-06-15', 'rejected'), 
(206, 16, 'Turf', '2026-06-05', 'pending'),
(207, 18, 'Party Hall', '2026-06-10', 'approved'),
(208, 21, 'Gymnasium', '2026-06-01', 'approved'),
(209, 23, 'Turf', '2026-06-02', 'pending'),
(210, 30, 'Party Hall', '2026-07-01', 'approved')
ON CONFLICT (id) DO NOTHING;

-- 8. HELP DESK / MAINTENANCE TICKETS
INSERT INTO tickets (id, resident_id, category, priority, description, status, vendor_id) VALUES
(301, 1, 'Plumbing', 'urgent', 'Leaking pipe in master bathroom, causing dampness.', 'assigned', 3),
(302, 3, 'Electrical Fault', 'urgent', 'Balcony light short circuit, sparks flying.', 'pending', NULL),
(303, 6, 'Carpentry', 'low', 'Main door handle is loose and needs tightening.', 'resolved', 2),
(304, 8, 'Elevator Malfunction', 'urgent', 'Wing C elevator making grinding noise.', 'assigned', 11),
(305, 9, 'Plumbing', 'medium', 'Low water pressure in kitchen flush line.', 'assigned', 3),
(306, 16, 'Electrical Fault', 'medium', 'Common corridor tube-light flickering continuously.', 'resolved', 5),
(307, 21, 'Carpentry', 'low', 'Balcony wooden flooring plank coming off.', 'pending', NULL),
(308, 25, 'Elevator Malfunction', 'urgent', 'Wing B elevator door not closing properly on 9th floor.', 'assigned', 11),
(309, 28, 'Plumbing', 'urgent', 'Water not draining in the guest bathroom.', 'resolved', 3),
(310, 30, 'Electrical Fault', 'urgent', 'Main AC trip switch faulty, keeps tripping.', 'pending', NULL)
ON CONFLICT (id) DO NOTHING;

-- 9. REAL-TIME VISITOR LOGS
INSERT INTO visitors (id, resident_id, name, category, passcode, status) VALUES
(401, 2, 'Raj Mehta', 'Guest', '483921', 'active'),
(402, 1, 'Amazon Delivery', 'Delivery', '109283', 'expired'),
(403, 3, 'UrbanCompany Cleaner', 'Service', '554321', 'active'),
(404, 7, 'Swiggy Delivery', 'Delivery', '887651', 'expired'),
(405, 12, 'Zomato Delivery', 'Delivery', '998012', 'expired'),
(406, 16, 'Milma Milk Delivery', 'Service', '112233', 'active'),
(407, 18, 'Blinkit Groceries', 'Delivery', '776655', 'active'),
(408, 21, 'Aman Trivedi', 'Guest', '111111', 'expired'),
(409, 24, 'MakeUp Artist', 'Service', '222333', 'active'),
(410, 27, 'Flipkart Delivery', 'Delivery', '444555', 'expired'),
(411, 30, 'Gayatri Phadke', 'Guest', '999999', 'active')
ON CONFLICT (id) DO NOTHING;

-- 10. EMERGENCY LOGS
INSERT INTO emergency_logs (id, resident_id, flat, timestamp, status, resolved_at) VALUES
(501, 3, '205-A', timezone('utc'::text, now() - INTERVAL '5 days'), 'resolved', timezone('utc'::text, now() - INTERVAL '4 hours 30 minutes')),
(502, 8, '304-C', timezone('utc'::text, now() - INTERVAL '2 hours'), 'active', NULL),
(503, 15, '502-D', timezone('utc'::text, now() - INTERVAL '12 days'), 'resolved', timezone('utc'::text, now() - INTERVAL '11 days')),
(504, 22, '802-B', timezone('utc'::text, now() - INTERVAL '1 day'), 'resolved', timezone('utc'::text, now() - INTERVAL '22 hours')),
(505, 29, '1003-C', timezone('utc'::text, now() - INTERVAL '30 minutes'), 'active', NULL)
ON CONFLICT (id) DO NOTHING;

-- 11. RESIDENT MEMBERS
INSERT INTO resident_members (id, resident_id, name, relationship, phone) VALUES
(1, 1, 'Kiran Sharma', 'Spouse', '+91 98765 43211'),
(2, 1, 'Ishaan Sharma', 'Child', NULL),
(3, 2, 'Ketan Patel', 'Spouse', '+91 98123 45679'),
(4, 3, 'Anila Verma', 'Parent', NULL),
(5, 5, 'Ritu Singh', 'Spouse', '+91 88776 65545')
ON CONFLICT (id) DO NOTHING;

-- 12. ADMIN SETTINGS
CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

INSERT INTO admin_settings (key, value) VALUES
('password', 'admin123'),
('email', 'admin@example.com'),
('smtp_user', ''),
('smtp_pass', '')
ON CONFLICT (key) DO NOTHING;

-- 13. MEETINGS
CREATE TABLE IF NOT EXISTS meetings (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    agenda TEXT,
    meeting_date TEXT NOT NULL,
    meeting_time TEXT NOT NULL,
    target_group TEXT NOT NULL CHECK (target_group IN ('all', 'committee', 'individual')),
    target_resident_id BIGINT REFERENCES residents(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Update default committee members (Aarav Sharma [1], Rohan Verma [3])
UPDATE residents SET is_committee_member = TRUE WHERE id IN (1, 3);

-- 14. NEWS COMMUNITY BROADCAST
CREATE TABLE IF NOT EXISTS news (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
