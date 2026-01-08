# Headquarters Employee Tracker

Monitoring system for real-time employee presence at Headquarters.

## Project Structure
- **/frontend**: Next.js Dashboard Application
- **/backend**: Express Mock API & WebSocket Server
- **/docs**: Documentation

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1.  **Frontend**:
    ```bash
    cd frontend
    npm install
    ```
2.  **Backend**:
    ```bash
    cd backend
    npm install
    ```

### Running the Application (Development)
You need to run both the Backend (API) and Frontend (Dashboard) simultaneously.

**Terminal 1: Start Backend**
```bash
cd backend
npm start
```
*   API runs on: `http://localhost:3001` (default)
*   WebSocket on: `ws://localhost:3001`

**Terminal 2: Start Frontend**
```bash
cd frontend
npm run dev
```
*   Dashboard runs on: `http://localhost:3000`

### Architecture
- **Design Aesthetic**: "Corporate Chic"
- **Tech Stack**: Next.js, Express, Socket.io, Tailwind CSS.
