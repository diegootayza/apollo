import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        date: Date,
        draw_number: String,
        numbers: [String],
        prizes: [{ hits: String, prize: String, winners: String }],
    },
    {
        collection: 'poceada_plus',
    }
)

export default model('poceada_plus', schema)
