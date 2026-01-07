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

### 3. Verify CI/CD
- **Action**: (Optional) Run GitHub Actions locally using `act` or push to a branch and check the Actions tab on GitHub.
- **Expectation**: `build-and-test` job passes.
