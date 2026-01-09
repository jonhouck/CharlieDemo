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
The system consists of two main components communicating in real-time:

1.  **Backend (Mock API & Badge Simulator)**:
    *   **Technology**: Node.js, Express, `ws` (WebSocket).
    *   **Role**: Serves as the source of truth for employee data. It initializes a roster of 500 mock employees and runs a simulation loop that periodically emits "SWIPE_IN" and "SWIPE_OUT" events via WebSocket to mimic real badge scanners.
    *   **Data**: Stores in-memory status of present employees.

2.  **Frontend (Dashboard)**:
    *   **Technology**: Next.js, React, Tailwind CSS.
    *   **Role**: Connects to the Backend WebSocket to receive badge events. It maintains a live "EmployeeContext" state and renders the roster in a "Corporate Chic" aesthetic.
    *   **Key Features**: Real-time updates, department filtering (Engineering, Sales, etc.), and responsive design for headquarters displays.

3.  **Data Flow**:
    *   `Simulator` -> `Event Emission` -> `WebSocket` -> `Frontend Client` -> `UI Update`
