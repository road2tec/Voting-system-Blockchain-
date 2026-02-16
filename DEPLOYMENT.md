# Deployment Guide

Follow these steps to deploy the Full Stack Blockchain Voting System.

## 1. Smart Contract Deployment (Sepolia Testnet)

1.  Navigate to `smart-contract`:
    ```bash
    cd smart-contract
    ```
2.  Install Dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment:
    - Create `.env` file.
    - Add `SEPOLIA_RPC_URL` (from Infura/Alchemy).
    - Add `PRIVATE_KEY` (Metamask Private Key - ensure it has Sepolia ETH).
4.  Deploy:
    ```bash
    npx hardhat run scripts/deploy.js --network sepolia
    ```
5.  **Copy the Contract Address** from the console output. You will need this for the Frontend.
6.  Copy the ABI (Artifact) from `artifacts/contracts/Voting.sol/Voting.json` to the frontend if needed, or configure the frontend to import it.

## 2. Backend Deployment (Render / Railway)

1.  Push code to GitHub.
2.  Connect Repository to Render/Railway.
3.  Set Root Directory to `backend`.
4.  Add Environment Variables:
    - `MONGO_URI`: Your MongoDB Atlas Connection String.
    - `JWT_SECRET`: A secure random string.
    - `PORT`: 5000 (or default).
5.  Build Command: `npm install`
6.  Start Command: `node server.js`

## 3. Frontend Deployment (Vercel / Netlify)

1.  Push code to GitHub.
2.  Connect Repository to Vercel.
3.  Set Root Directory to `frontend`.
4.  Add Environment Variables:
    - `VITE_CONTRACT_ADDRESS`: The address copied from Step 1.
5.  Build Command: `npm run build`
6.  Output Directory: `dist`
7.  Deploy!

## 4. Final Verification

1.  Open the deployed frontend URL.
2.  Connect Metamask (ensure network is Sepolia).
3.  Login as Admin (create account via endpoint or manually in DB for first admin).
4.  Create an Election.
5.  Login as Voter.
6.  Vote and verify transaction on Etherscan.
