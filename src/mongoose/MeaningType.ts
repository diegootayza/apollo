import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        details: [{ image: String, meaning: String, number: String }],
        isName: Number,
        name: String,
        position: Number,
    },
    {
        collection: 'meaning_type',
    }
)

export default model('meaning_type', schema)
