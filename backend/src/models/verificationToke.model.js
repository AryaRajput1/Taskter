import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        rel: 'user'
    },
    token: String,
    purpose: String,
    expiredAt: Date,
})

export const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema)