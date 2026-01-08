# Manual Walkthrough - Initialize Repository

## Prerequisites
- Node.js (v20+)
- npm

## Setup
1.  Clone the repository (if not already local).
2.  Install dependencies:
    ```bash
    cd frontend && npm install
    cd ../backend && npm install
    ```

## Verification Steps

### 1. Verify Frontend
- **Action**: Start the frontend development server.
    ```bash
    cd frontend
    npm run dev
    ```
- **Expectation**: Open [http://localhost:3000](http://localhost:3000). You should see the default Next.js landing page.
- **Action**: Run linting.
    ```bash
    npm run lint
    ```
- **Expectation**: No linting errors.
- **Action**: Run unit tests.
    ```bash
    npm run test
    ```
- **Expectation**: Tests pass.

### 2. Verify Backend
- **Action**: Build the backend.
    ```bash
    cd backend
    npm run build
    ```
- **Expectation**: Build succeeds (creates `dist` folder).
- **Action**: Start the mock server.
    ```bash
    npm start
    ```
- **Expectation**: Output `Mock API running`.
- **Action**: Run the employee roster generator.
    ```bash
    npm run generate-roster
    ```
- **Expectation**: Output `Successfully generated 500 employees...` and file `backend/data/roster.json` is created/updated.
- **Action**: Run backend unit tests.
    ```bash
    npm run test
    ```
- **Expectation**: Tests pass, verifying generation logic.

### 3. Verify Mock API & WebSocket (CHA-3)
- **Action**: Start the backend server.
    ```bash
    cd backend
    npm start
    ```
- **Expectation**: Output shows `Mock API running on http://localhost:4000` and `WebSocket server running`.
- **Action**: Test Roster Endpoint.
    ```bash
    curl http://localhost:4000/api/roster
    ```
- **Expectation**: JSON response with list of employees.
- **Action**: Test WebSocket (using wscat or similar, or just observe logs if we added them, but wscat is better).
    - If `wscat` is installed: `wscat -c ws://localhost:4000`
    - Or verify console logs in backend terminal showing "Simulating swipe".
- **Expectation**: Receive `SWIPE_IN` events every 2 seconds.

### 4. Verify CI/CD
- **Action**: (Optional) Run GitHub Actions locally using `act` or push to a branch and check the Actions tab on GitHub.
- **Expectation**: `build-and-test` job passes.

### 5. Verify Frontend State & WebSocket (CHA-4)
- **Action**: Start the backend server (if not running).
    ```bash
    cd backend
    npm start
    ```
- **Action**: Start the frontend server.
    ```bash
    cd frontend
    npm run dev
    ```
- **Action**: Open [http://localhost:3000](http://localhost:3000).
- **Expectation**:
    - Open Browser Console.
    - Verify log: "Connected to WebSocket".
    - (Optional) Use React DevTools to inspect `EmployeeProvider` context and watch `presentEmployeeIds` Set grow every few seconds as backend emits events.

### 6. Verify Dashboard UI (CHA-5)
- **Action**: Start Backend and Frontend as above.
- **Action**: Open [http://localhost:3000](http://localhost:3000).
- **Expectation**:
    - **Visual**: Page loads with "Headquarters Overview" title in a dark, "Corporate Chic" theme.
    - **Stats**: "Total Employees" card shows ~500. "Present Today" card updates in real-time.
    - **List**: Grid of employee cards appears.
    - **Filtering**: Click "Engineering" (or other dept) in Filter Bar. The list should filter to only show employees from that department.
    - **Animations**: Cards should stagger in on load.
