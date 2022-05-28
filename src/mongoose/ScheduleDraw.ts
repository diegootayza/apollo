import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        draw: String,
        day: String,
        hour: String,
    },
    {
        collection: 'schedule_draw',
    }
)

export default model('schedule_draw', schema)
