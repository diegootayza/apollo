import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PubSub } from 'graphql-subscriptions'

import moment from 'moment'

import Brinco from './mongoose/Brinco'
import Configuration from './mongoose/Configuration'
import Dollar from './mongoose/Dollar'
import Ephemerides from './mongoose/Ephemerides'
import Loto from './mongoose/Loto'
import Matutina from './mongoose/Matutina'
import MeaningType from './mongoose/MeaningType'
import Nocturna from './mongoose/Nocturna'
import Poceada from './mongoose/Poceada'
import PoceadaPlus from './mongoose/PoceadaPlus'
import Previa from './mongoose/Previa'
import Primera from './mongoose/Primera'
import Quini6 from './mongoose/Quini6'
import Recomendation from './mongoose/Recomendation'
import ScheduleDraw from './mongoose/ScheduleDraw'
import Vespertina from './mongoose/Vespertina'
import WeeklyData from './mongoose/WeeklyData'

const pubsub = new PubSub()

const typeDefs = gql`
    scalar Date

    type Prize {
        hits: String
        prize: String
        winners: String
    }

    type NocturnaNumberDetail {
        number: Int
        value: String
    }

    type Nocturna {
        city: String
        date: Date
        id_draw: String
        id_loteria: String
        id: String
        meaning_image: String
        meaning_number: String
        meaning: String
        numbers: [NocturnaNumberDetail]
        value: String
    }

    type PrizeLoto {
        label: String
        winners: String
        prize: String
    }

    type PrizeSaleSaleLoto {
        winners: String
        prize: String
    }

    type Loto {
        date: Date
        draw_number: String
        tradicional_numbers: [String]
        jackpot1_tradicional: String
        jackpot2_tradicional: String
        tradicional_prizes: [PrizeLoto]
        desquite_numbers: [String]
        jackpot1_desquite: String
        jackpot2_desquite: String
        desquite_prizes: [PrizeLoto]
        sale_sale_numbers: [String]
        jackpot1_sale_sale: String
        jackpot2_sale_sale: String
        jackpot3_sale_sale: String
        jackpot4_sale_sale: String
        sale_sale_prizes: PrizeSaleSaleLoto
        sale_sale_duplicador: String
        prize_next_move: String
    }

    type PoceadaPrize {
        hits: String
        winners: String
        prize: String
    }

    type Poceada {
        date: Date
        draw_number: String
        numbers: [String]
        prizes: [PoceadaPrize]
    }

    type Brinco {
        date: Date
        draw_number: String
        next_prize: String
        numbers: [String]
        prizes: [Prize]
    }

    type Dollar {
        buy: String
        sell: String
    }

    type Configuration {
        blink_message: String
        blink: String
        current_date: Date
        date: Date
        showEphemerides: String
        showNumbers: String
        showRecomendations: String
    }

    type Ephemerides {
        number: String
        image: String
        description: String
    }

    type MatutinaNumberDetail {
        number: Int
        value: String
    }

    type Matutina {
        id: String
        city: String
        value: String
        id_loteria: String
        id_draw: String
        date: Date
        meaning: String
        meaning_image: String
        meaning_number: String
        numbers: [MatutinaNumberDetail]
    }

    type MeaningTypeDetail {
        image: String
        number: String
        meaning: String
    }

    type MeaningType {
        id: String
        name: String
        isName: Int
        position: String
        details: [MeaningTypeDetail]
    }

    type PoceadaPlusPrize {
        hits: String
        winners: String
        prize: String
    }

    type PoceadaPlus {
        date: Date
        draw_number: String
        numbers: [String]
        prizes: [PoceadaPlusPrize]
    }

    type PreviaNumberDetail {
        number: Int
        value: String
    }

    type Previa {
        id: String
        city: String
        value: String
        id_loteria: String
        id_draw: String
        date: Date
        meaning: String
        meaning_image: String
        meaning_number: String
        numbers: [PreviaNumberDetail]
    }

    type PrimeraNumberDetail {
        number: Int
        value: String
    }

    type Primera {
        id: String
        city: String
        value: String
        id_loteria: String
        id_draw: String
        date: Date
        meaning: String
        meaning_image: String
        meaning_number: String
        numbers: [PrimeraNumberDetail]
    }

    type VespertinaNumberDetail {
        number: Int
        value: String
    }

    type Vespertina {
        city: String
        date: Date
        id_draw: String
        id_loteria: String
        id: String
        meaning_image: String
        meaning_number: String
        meaning: String
        numbers: [VespertinaNumberDetail]
        value: String
    }

    type PrizeQuini6 {
        hits: String
        winners: String
        prize: String
    }

    type PrizeRevanchaQuini6 {
        winners: String
        prize: String
    }

    type Quini6 {
        date: Date
        draw_number: String
        tradicional_numbers: [String]
        tradicional_prizes: [PrizeQuini6]
        segunda_vuelta_numbers: [String]
        segunda_vuelta_prizes: [PrizeQuini6]
        revancha_numbers: [String]
        revancha_prizes: PrizeRevanchaQuini6
        siempre_sale_numbers: [String]
        siempre_sale_prizes: PrizeRevanchaQuini6
        premio_extra: String
        premio_extra_prizes: PrizeQuini6
        prize_next_move: String
    }

    type Recomendation {
        date: Date
        id_user: String
        id: String
        image: String
        is_facebook: String
        is_google: String
        name: String
        recomendation: String
    }

    type ScheduleDraw {
        draw: String
        day: String
        hour: String
    }

    type WeeklyData {
        _id: String
        date: Date
        number1: String
        number2: String
        number3: String
        number4: String
        number5: String
        number6: String
    }

    type Query {
        brinco_limit(limit: Int): [Brinco]
        brinco: [Brinco]
        check_recomendations(id_user: String!): Int
        configuration_changed: Configuration
        configuration: Configuration
        dollar: Dollar
        ephemerides: [Ephemerides]
        loto_limit(limit: Int): [Loto]
        loto: [Loto]
        matutina_modified(ids: String): [Matutina]
        matutina(ids: String, date: String): [Matutina]
        meaning_type(id: String!): [MeaningType]
        meaning_types: [MeaningType]
        nocturna_modified(ids: String): [Nocturna]
        nocturna(ids: String, date: String): [Nocturna]
        poceada_limit(limit: Int): [Poceada]
        poceada_plus_limit(limit: Int): [PoceadaPlus]
        poceada_plus: [PoceadaPlus]
        poceada: [Poceada]
        previa_modified(ids: String): [Previa]
        previa(ids: String, date: String): [Previa]
        primera_modified(ids: String): [Primera]
        primera(ids: String, date: String): [Primera]
        quini6_limit(limit: Int): [Quini6]
        quini6: [Quini6]
        recomendation: [Recomendation]
        schedule_draw(draw: String, day: Int): [ScheduleDraw]
        vespertina(ids: String, date: String): [Vespertina]
        vespertina_modified(ids: String): [Vespertina]
        weekly: [WeeklyData]
    }

    type Mutation {
        save_recomendation(
            date: String
            id_user: String
            image: String
            is_facebook: String
            is_google: String
            name: String
            recomendation: String
        ): Recomendation
    }

    type Subscription {
        configuration_changed: Configuration
        matutina_modified: [Matutina]
        nocturna_modified: [Matutina]
        previa_modified: [Previa]
        primera_modified: [Primera]
    }
`

const resolvers = {
    Query: {
        brinco: async (parent: any, {}: any) => {
            return await Brinco.find({}, null, { limit: 1, sort: { date: -1 } })
        },
        brinco_limit: async (parent: any, { limit }: any) => {
            return await Brinco.find({}, null, { limit, sort: { date: -1 } })
        },
        configuration: async (root: any, {}: any) => {
            return await Configuration.findOne()
        },
        configuration_changed: async (root: any, { limit }: any) => {
            const doc = await Configuration.findOne()
            pubsub.publish('configuration_changed', doc)
            return doc
        },
        dollar: async (root: any, {}: any) => {
            return await Dollar.findOne()
        },
        ephemerides: async (root: any, {}: any) => {
            return await Ephemerides.find()
        },
        loto: async (root: any, {}: any) => {
            return await Loto.find({}, null, { limit: 1, sort: { date: -1 } })
        },
        loto_limit: async (root: any, { limit }: any) => {
            return await Loto.find({}, null, { limit, sort: { date: -1 } })
        },
        matutina: async (root: any, { ids, date }: any) => {
            const array = ids ? ids.split(',') : []
            return await Matutina.find({ date: { $eq: date ? new Date(date) : new Date() }, id_loteria: { $in: array } }, null, {})
        },
        matutina_modified: async (root: any, { ids }: any, {}: any) => {
            const array = ids ? ids.split(',') : []
            const docs = await Matutina.find({ _id: { $in: array } }, null, {})
            pubsub.publish('matutina_modified', docs)
            return docs
        },
        meaning_types: async (root: any, {}: any) => {
            return await MeaningType.find({}, null, { sort: { position: 1 } })
        },
        meaning_type: async (root: any, { id }: any) => {
            return await MeaningType.find({ _id: { $eq: id } }, null, {})
        },
        nocturna: async (root: any, { ids, date }: any) => {
            const array = ids ? ids.split(',') : []
            return await Nocturna.find({ date: { $eq: date ? new Date(date) : new Date() }, id_loteria: { $in: array } }, null, {})
        },
        nocturna_modified: async (root: any, { ids }: any, {}: any) => {
            const array = ids ? ids.split(',') : []
            const docs = await Nocturna.find({ _id: { $in: array } }, null, {})
            pubsub.publish('nocturna_modified', docs)
            return docs
        },
        poceada: async (root: any, {}: any) => {
            return await Poceada.find({}, null, { limit: 1, sort: { date: -1 } })
        },
        poceada_limit: async (root: any, { limit }: any) => {
            return await Poceada.find({}, null, { limit, sort: { date: -1 } })
        },
        poceada_plus: async (root: any, {}: any) => {
            return await PoceadaPlus.find({}, null, { limit: 1, sort: { date: -1 } })
        },
        poceada_plus_limit: async (root: any, { limit }: any) => {
            return await PoceadaPlus.find({}, null, { limit, sort: { date: -1 } })
        },
        previa: async (root: any, { ids, date }: any) => {
            const array = ids ? ids.split(',') : []
            return await Previa.find({ date: { $eq: date ? new Date(date) : new Date() }, id_loteria: { $in: array } }, null, {})
        },
        previa_modified: async (root: any, { ids }: any, {}: any) => {
            const array = ids ? ids.split(',') : []
            const docs = await Previa.find({ _id: { $in: array } }, null, {})
            pubsub.publish('previa_modified', docs)
            return docs
        },
        primera: async (root: any, { ids, date }: any) => {
            const array = ids ? ids.split(',') : []
            return await Primera.find({ date: { $eq: date ? new Date(date) : new Date() }, id_loteria: { $in: array } }, null, {})
        },
        primera_modified: async (root: any, { ids }: any, {}: any) => {
            const array = ids ? ids.split(',') : []
            const docs = await Primera.find({ _id: { $in: array } }, null, {})
            pubsub.publish('primera_modified', docs)
            return docs
        },
        quini6: async (root: any, {}: any) => {
            return await Quini6.find({}, null, { limit: 1, sort: { date: -1 } })
        },
        quini6_limit: async (root: any, { limit }: any) => {
            return await Quini6.find({}, null, { limit, sort: { date: -1 } })
        },
        recomendation: async (root: any, {}: any) => {
            const today = moment().utcOffset('-0300')
            return await Recomendation.find({ date: { $gte: today.subtract(2, 'days').toDate(), $lt: today.toDate() } }, null, {})
        },
        check_recomendations: async (root: any, { id_user }: any) => {
            const today = moment().utcOffset('-0300')
            let month: any = today.month().valueOf() + 1
            if (month < 10) month = '0' + month
            const date = today.year() + '-' + month + '-' + today.date()
            return await Recomendation.find({ date: { $eq: date ? new Date(date) : new Date() }, id_user: id_user }, null, {})
        },
        schedule_draw: async (root: any, { draw, day }: any) => {
            return await ScheduleDraw.find({ $and: [{ draw: { $eq: draw }, day: { $gte: day } }] }, null, { limit: 1 })
        },
        vespertina: async (root: any, { ids, date }: any) => {
            const array = ids ? ids.split(',') : []
            return await Vespertina.find({ date: { $eq: date ? new Date(date) : new Date() }, id_loteria: { $in: array } }, null, {})
        },
        vespertina_modified: async (root: any, { ids }: any) => {
            const array = ids ? ids.split(',') : []
            return await Vespertina.find({ _id: { $in: array } }, null, {})
        },
        weekly: async (root: any, {}: any) => {
            return await WeeklyData.find({}, null, { limit: 1 })
        },
    },
    Mutation: {
        save_recomendation: async (root: any, payload: any) => {
            return await Recomendation.create(payload)
        },
    },
    Subscription: {
        configuration_changed: {
            subscribe: () => pubsub.asyncIterator('configuration_changed'),
        },
        matutina_modified: {
            subscribe: () => pubsub.asyncIterator('matutina_modified'),
        },
        nocturna_modified: {
            subscribe: () => pubsub.asyncIterator('nocturna_modified'),
        },
        previa_modified: {
            subscribe: () => pubsub.asyncIterator('previa_modified'),
        },
        primera_modified: {
            subscribe: () => pubsub.asyncIterator('primera_modified'),
        },
    },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
