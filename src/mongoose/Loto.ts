import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        date: Date,
        desquite_numbers: [String],
        desquite_prizes: [{ label: String, prize: String, winners: String }],
        draw_number: String,
        jackpot1_desquite: String,
        jackpot1_sale_sale: String,
        jackpot1_tradicional: String,
        jackpot2_desquite: String,
        jackpot2_sale_sale: String,
        jackpot2_tradicional: String,
        jackpot3_sale_sale: String,
        jackpot4_sale_sale: String,
        prize_next_move: String,
        sale_sale_duplicador: String,
        sale_sale_numbers: [String],
        sale_sale_prizes: { prize: String, winners: String },
        tradicional_numbers: [String],
        tradicional_prizes: [{ label: String, prize: String, winners: String }],
    },
    {
        collection: 'loto',
    }
)

export default model('Loto', schema)
