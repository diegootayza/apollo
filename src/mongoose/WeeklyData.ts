import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        date: { type: Date },
        number1: { type: String },
        number2: { type: String },
        number3: { type: String },
        number4: { type: String },
        number5: { type: String },
        number6: { type: String },
    },
    {
        collection: 'weekly_data',
    }
)

export default model('weekly_data', schema)
