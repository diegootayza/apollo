import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        city: String,
        date: Date,
        id_draw: String,
        id_loteria: String,
        meaning_image: String,
        meaning_number: String,
        meaning: String,
        numbers: [{ number: Number, value: String }],
        value: String,
    },
    {
        collection: 'previa',
    }
)

export default model('previa', schema)
