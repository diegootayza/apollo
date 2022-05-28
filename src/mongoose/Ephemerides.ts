import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        number: String,
        image: String,
        description: String,
    },
    {
        collection: 'ephemerides',
    }
)

export default model('Ephemerides', schema)
