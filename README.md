# BlockVote: Advanced Blockchain Governance System

![License](https://img.shields.io/badge/Security-Blockchain-blue)
![Platform](https://img.shields.io/badge/Platform-MERN-green)
![Responsive](https://img.shields.io/badge/Mobile-Android_Ready-orange)

A premium, secure, and decentralized institutional governance platform built on the Ethereum blockchain. Transitioning from traditional voting to a transparent, tamper-proof regional administration model.

## 🚀 Key Features

- **Decentralized Ledger Architecture**: Every vote is anchored to an Ethereum blockchain node, ensuring cryptographic immutability.
- **Regional Administrative Governance**: Area-specific oversight allowing administrators to manage unique voting constituencies and regional voter lists.
- **Mandatory Admin Verification**: Robust security loop where new users must be manually verified by officers before gaining voting rights.
- **Android & Mobile Optimized**: A tailor-made UI experience ensuring full functionality and legibility on mobile viewports and Android devices.
- **Premium Analytics Suite**: Real-time distribution monitoring and voter turnout visualization for institutional transparency.
- **Glassmorphic UI/UX**: High-end light-themed aesthetic with smooth animations and intuitive navigation.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS (Glassmorphism), Framer Motion, Ethers.js, Recharts.
- **Backend**: Node.js, Express.js (v5.x), MongoDB, JWT Auth, Nodemon.
- **Blockchain**: Solidity, Hardhat, Smart Contract (Ethereum Virtual Machine).

## 📋 Prerequisites

- **Node.js**: v20 or higher recommended.
- **Database**: MongoDB (Local instance or Atlas).
- **Wallet**: MetaMask extension (for blockchain transactions).
- **Environment**: Setup `.env` files in `backend`, `frontend`, and `smart-contract`.

## 🚀 Quick Setup

### 1. Smart Contract Deployment
```bash
cd smart-contract
npm install
npx hardhat compile
# Configure .env with RPC URL and PRIVATE_KEY
npx hardhat run scripts/deploy.js --network ganache

```

### 2. Backend API
```bash
cd backend
npm install
# Configure .env with MONGO_URI, JWT_SECRET, PORT
npm run dev
```

### 3. Frontend Dashboard
```bash
cd frontend
npm install
# Configure .env with VITE_CONTRACT_ADDRESS
npm run dev
```

## 🏗️ Production Build
To generate a production-ready optimized build for the frontend:
```bash
cd frontend
npm run build
```

## 🔒 Security Information
This system enforces a **Zero-Bypass** verification policy. 
1. Users register but are blocked from logging in.
2. Admins review identity and confirm 'Area' eligibility.
3. Once verified, the user can log in and cast an immutable vote on the blockchain.

## 📄 License
Custom Institutional License - All rights reserved.
