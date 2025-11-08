import mongoose from "mongoose"

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log('DB Connected successfully')

    } catch (error) {
        console.log('Error in connecting to DB', error)
        process.exit(1)
    }
}