import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        date: Date,
        draw_number: String,
        next_prize: String,
        numbers: [String],
        prizes: [{ hits: String, prize: String, winners: String }],
    },
    {
        collection: 'brinco',
    }
)

export default model('Brinco', schema)
