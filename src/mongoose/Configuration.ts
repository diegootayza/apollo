import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        blink_message: { type: String },
        blink: { type: String },
        current_date: { type: Date },
        date: { type: Date },
        showEphemerides: { type: String },
        showNumbers: { type: String },
        showRecomendations: { type: String },
    },
    {
        collection: 'configuration',
    }
)

export default model('Configuration', schema)
