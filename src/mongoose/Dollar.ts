import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        buy: String,
        sell: String,
    },
    {
        collection: 'dollar',
    }
)

export default model('Dollar', schema)
