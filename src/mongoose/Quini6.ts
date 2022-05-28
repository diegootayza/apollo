import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        date: Date,
        draw_number: String,
        premio_extra_prizes: { hits: String, prize: String, winners: String },
        premio_extra: String,
        prize_next_move: String,
        revancha_numbers: [String],
        revancha_prizes: { prize: String, winners: String },
        segunda_vuelta_numbers: [String],
        segunda_vuelta_prizes: [{ hits: String, prize: String, winners: String }],
        siempre_sale_numbers: [String],
        siempre_sale_prizes: { prize: String, winners: String },
        tradicional_numbers: [String],
        tradicional_prizes: [{ hits: String, prize: String, winners: String }],
    },
    {
        collection: 'quini6',
    }
)

export default model('quini6', schema)
