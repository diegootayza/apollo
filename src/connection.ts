import mongoose from 'mongoose'

export default async () => {
    const URI = process.env.MONGODB_URI as string

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB is connected...')
    } catch (error) {
        console.log(error)

        console.log('MongoDB connection error...')
    }
}
