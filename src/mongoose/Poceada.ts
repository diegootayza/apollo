import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        date: Date,
        draw_number: String,
        numbers: [String],
        prizes: [{ hits: String, prize: String, winners: String }],
    },
    {
        collection: 'poceada',
    }
)

export default model('poceada', schema)
