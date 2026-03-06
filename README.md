# College Blockchain Voting System 🗳️🏢

A secure, transparent, and immutable voting system designed specifically for educational institutions. Powered by Ethereum (Ganache) and the MERN stack.

---

## 🛠️ Technology Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide Icons, Recharts
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Blockchain**: Solidity, Hardhat, Ethers.js
- **Network**: Local RPC (Ganache / Hardhat Node)

---

## 🔑 Default Credentials (Development)
Stored in `backend/.env` for testing:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `super@vote.com` | `password123` |
| **Admin** | `admin@vote.com` | `password123` |
| **Voter (Student)** | `voter@vote.com` | `password123` |

---

## 🚀 Setup Instructions

### 1. Smart Contract Deployment
```bash
cd smart-contract
# 1. Start Ganache (GUI or CLI on port 7545)
# 2. Deploy Contract
npx hardhat run scripts/deploy.js --network ganache
```
*Take the deployed contract address and update it in `frontend/.env` and `backend/.env`.*

### 2. Backend Setup
```bash
cd backend
npm install
# 1. Sync Database with Contract
node scripts/clearCandidates.js
# 2. Seed Default Users
node scripts/seedUsers.js
# 3. Start Server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 💡 Workflow For Every Session

1. **Start Ganache**: Ensure the RPC URL is `HTTP://127.0.0.1:7545`.
2. **Deploy Contract**: If you restart Ganache, you **MUST** redeploy and update `.env` files.
3. **Reset Database**: Run `node scripts/clearCandidates.js` in the backend after any contract change.
4. **MetaMask**: 
   - Connect MetaMask to Ganache Local Network (Chain ID: 1337).
   - If a student has already voted, you **MUST switch accounts** in MetaMask manually to vote as a different student.

---

## ✨ Features
- **Real-Time Analytics**: Live vote counts and departmental distribution charts.
- **Voter Protection**: Prevents double voting at both the blockchain and application level.
- **Role-Based Access**: Specialized dashboards for SuperAdmin, Admin, and Students.
- **Audit Logs**: Transparent tracking of administrative actions.

---

## 📄 License
MIT License - Developed for Institutional Excellence.
