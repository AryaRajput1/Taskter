import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { VerificationToken } from "../models/verificationToke.model.js";
import { EMAIL_VERIFICATION_TEMPLATE, PASSWORD_RESET_TEMPLATE, sendMail } from "../libs/sendGrid.js";
import { isArcjetValidated } from "../libs/arcjet.js";

export const register = async (req, res) => {
    try {

        const { fullName, email, password } = req.body

        if (!(await isArcjetValidated(req, res, { email }))) {
            return
        }

        const existingUser = await User.findOne({
            email
        })

        if (existingUser) {
            return res.status(400).json({
                message: 'User is already registerd. Please login.'
            })
        }

        const salt = await bcrypt.genSalt(10)

        const encryptedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            fullName,
            email,
            password: encryptedPassword
        })

        const verificationToken = jwt.sign({
            userId: user._id,
            purpose: 'email-verification'
        }, process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })

        const savedToken = await VerificationToken.create({
            user,
            token: verificationToken,
            purpose: 'email-verification',
            expiredAt: new Date(Date.now() + 1000 * 60 * 60)
        })

        await sendMail({
            to: user.email,
            subject: "Taskter email verification",
            html: EMAIL_VERIFICATION_TEMPLATE(user.fullName, `${process.env.FRONTEND_URL}/verify-email/?token=${verificationToken}`)
        })

        return res.status(201).json({
            message: 'Verification email has sent to your email. Please check and verify your account'
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        if (!user.isEmailVerified) {
            const existingVerification = await VerificationToken.findOne({
                user: user._id,
                purpose: "email-verification",
            })

            if (existingVerification && existingVerification.expiredAt > Date.now()) {
                return res.status(400).json({
                    message: "Your email has not been verified. Check your email/spam folder to verify email."
                })
            } else {
                if (existingVerification) {
                    await VerificationToken.findByIdAndDelete(existingVerification._id)
                }

                const verificationToken = jwt.sign({
                    userId: user._id,
                    purpose: 'email-verification'
                }, process.env.JWT_SECRET,
                    {
                        expiresIn: '1d'
                    })
                const savedToken = await VerificationToken.create({
                    user,
                    token: verificationToken,
                    purpose: 'email-verification',
                    expiredAt: new Date(Date.now() + 1000 * 60 * 60)
                })

                await sendMail({
                    to: user.email,
                    subject: "Taskter email verification",
                    html: EMAIL_VERIFICATION_TEMPLATE(user.fullName, `${process.env.FRONTEND_URL}/verify-email/?token=${verificationToken}`)
                })

                return res.status(400).json({
                    message: 'Verification email has sent to your email. Please check and verify your account'
                })
            }
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(403).json({
                message: "Invalid email or password"
            })
        }

        const token = await jwt.sign({
            userId: user._id, purpose: "login"
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        const userData = { ...user.toObject(), lastLogin: Date.now(), password: undefined }


        res.cookie("token", token, {
            maxAge: 7 * 1000 * 60 * 60 * 24,
            httpOnly: true,
            signed: true
        })

        return res.status(200).json({
            message: "Login successful",
            user: userData
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body

        const tokenPayload = await jwt.verify(token, process.env.JWT_SECRET)

        if (!tokenPayload) {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const { userId, purpose } = tokenPayload

        if (purpose !== 'email-verification') {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const tokenObj = await VerificationToken.findOne({ user: userId, token })

        if (!tokenObj) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const isTokenExpired = tokenObj.expiredAt < Date.now()

        if (!tokenObj) {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                message: "Email is already verified"
            })
        }

        user.isEmailVerified = true
        await user.save()

        await VerificationToken.findByIdAndDelete(tokenObj._id)

        return res.status(200).json({
            message: "Email verified"
        })


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({
                message: "Please verify your email first."
            })
        }

        const existingVerification = await VerificationToken.findOne({
            user: user._id,
            purpose: 'reset-password'
        })

        if (existingVerification && existingVerification.expiredAt > Date.now()) {
            return res.status(400).json({
                message: 'Reset password email has been already sent to your email. Please check'
            })
        }

        if (existingVerification && existingVerification.expiredAt <= Date.now()) {
            await VerificationToken.findByIdAndDelete(existingVerification._id)
        }

        const resetPasswordToken = await jwt.sign({
            userId: user._id, purpose: "reset-password"
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        const verificationToken = await VerificationToken.create({
            token: resetPasswordToken,
            purpose: 'reset-password',
            user: user._id,
            expiredAt: new Date(Date.now() + 24 * 1000 * 60 * 60)
        })

        await sendMail({
            to: user.email,
            subject: "Taskter reset password",
            html: PASSWORD_RESET_TEMPLATE(user.fullName, `${process.env.FRONTEND_URL}/reset-password/?token=${resetPasswordToken}`)
        })

        return res.status(201).json({
            message: 'Reset password mail has been sent to your email. Please check and reset your password'
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const verifyResetPasswordTokenAndResetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body

        const tokenPayload = await jwt.verify(token, process.env.JWT_SECRET)

        if (!tokenPayload) {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const { userId, purpose } = tokenPayload

        if (purpose !== 'reset-password') {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const tokenObj = await VerificationToken.findOne({ user: userId, token })

        if (!tokenObj) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const isTokenExpired = tokenObj.expiredAt < Date.now()

        if (isTokenExpired) {
            return res.status(403).json({
                message: "Expired request"
            })
        }

        if (!tokenObj) {
            return res.status(403).json({
                message: "Invalid request"
            })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Password doesn't match"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashPassword
        await user.save()

        await VerificationToken.findByIdAndDelete(tokenObj._id)

        return res.status(200).json({
            message: "Password reset successfully"
        })


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}