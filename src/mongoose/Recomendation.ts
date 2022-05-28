import { model, Schema } from 'mongoose'

const schema = new Schema(
    {
        date: { type: Date },
        id_user: { type: String },
        image: { type: String },
        is_facebook: { type: String },
        is_google: { type: String },
        name: { type: String },
        recomendation: { type: String },
    },
    {
        collection: 'recomendations',
    }
)

export default model('recomendations', schema)
