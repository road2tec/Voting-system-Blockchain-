const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'voter'],
        default: 'voter'
    },
    isVerified: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
    votedCandidateId: { type: Number },
    walletAddress: { type: String },
    area: { type: String },
    address: { type: String },
    age: { type: Number }
}, { timestamps: true });

// Hash password before saving
// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
