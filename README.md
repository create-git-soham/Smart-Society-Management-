# Smart Society Management System

A high-fidelity, premium dark-mode dashboard interface for managing residential societies, featuring a **Resident Portal** and an **Admin Control Panel**.

---

## 🚀 How to Run the Application

The backend features a **dual-mode persistence engine**:
1. **Local Fallback Mode**: Runs immediately using local file persistence (`data/db.json`) if Supabase is not configured.
2. **Cloud Mode**: Connects to **Supabase (PostgreSQL)** if a `.env` file containing credentials is provided.

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Configure Supabase (Optional)
If you want to use Supabase Cloud as your database:
1. Create a free project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard and run the queries inside **[schema.sql](file:///C:/Users/POONAM/.gemini/antigravity/scratch/smart-society-management/schema.sql)** to set up tables, relationships, and default testing data.
3. Copy **`.env.example`** to a new file named **`.env`**:
   ```bash
   cp .env.example .env
   ```
4. Fill in your Supabase project API credentials:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your-supabase-api-key-here
   ```

### Step 3: Start the Backend Server
Run the startup script:
```bash
npm start
```
The server will boot up and print:
- Cloud Mode: `🚀 Smart Society API Server is running locally...` followed by `⚡ Supabase credentials detected. Initializing Supabase cloud adapter...`
- Local Mode: `📁 Supabase keys not detected. Initializing Local JSON file database adapter...`

### Step 4: Access the Dashboard
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## 🎨 Premium Visual Elements Included
- **Dynamic Credit Card Visualizer**: Updates in real-time on keystroke with auto-spacing and validation formats.
- **Physical Ticket visitor pass**: Dashed perforations and a realistic barcode graphic.
- **Audible Web SOS Siren**: Triggers a pulsing siren warning with emergency notifications on the Admin Control Panel.
- **Defaulter Waiver Controls**: Easily waive penalty fines for residents.
