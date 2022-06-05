import { Express } from 'express'
import { WebhookClient } from 'dialogflow-fulfillment'
import moment from 'moment'

import Matutina from '../../mongoose/Matutina'
import Nocturna from '../../mongoose/Nocturna'
import Primera from '../../mongoose/Primera'
import Vespertina from '../../mongoose/Vespertina'

const db_a = [
    { key: 1, icon: '1️⃣', text: 'Previa' },
    { key: 2, icon: '2️⃣', text: 'Matutina' },
    { key: 3, icon: '3️⃣', text: 'Vespertina' },
    { key: 4, icon: '4️⃣', text: 'Nocturna' },
]

const db_b = [
    { key: 1, icon: '1️⃣', text: 'Ciudad' },
    { key: 2, icon: '2️⃣', text: 'Provincia' },
    { key: 3, icon: '3️⃣', text: 'Santa fe' },
    { key: 4, icon: '4️⃣', text: 'Entre ríos' },
    { key: 5, icon: '5️⃣', text: 'Cordoba' },
    { key: 6, icon: '6️⃣', text: 'Montevideo' },
    { key: 7, icon: '7️⃣', text: 'Todas' },
]

const searchData = (db: string, key: number) => {
    let array: any[] = []

    if (db === 'db_a') array = db_a
    if (db === 'db_b') array = db_b

    const result = array.find((item) => item.key === key)

    return result.text
}

const currencyController = (number: number) => {
    const intl = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

    return intl.format(number)
}

export default (app: Express) => {
    app.post('/api/webhook', (req, res) => {
        const WC = new WebhookClient({ request: req, response: res })
        const today = moment().utcOffset('-0300').subtract(1, 'day').startOf('day')
        const query = req.body.queryResult.queryText

        const responseController = (response: any) => {
            const docs: any[] = JSON.parse(JSON.stringify(response))

            const keys = [1, 2, 3, 4, 5, 6]

            const array: any[] = []

            for (const key of keys) {
                for (const doc of docs) {
                    if (key === 1 && doc.id_loteria === '25' && doc.value.length > 0) array.push(`Ciudad ${doc.value}`)
                    if (key === 2 && doc.id_loteria === '24' && doc.value.length > 0) array.push(`Provincia ${doc.value}`)
                    if (key === 3 && doc.id_loteria === '23' && doc.value.length > 0) array.push(`Montevideo ${doc.value}`)
                    if (key === 4 && doc.id_loteria === '38' && doc.value.length > 0) array.push(`Santa Fe ${doc.value}`)
                    if (key === 5 && doc.id_loteria === '28' && doc.value.length > 0) array.push(`Córdoba ${doc.value}`)
                    if (key === 6 && doc.id_loteria === '39' && doc.value.length > 0) array.push(`Entre Ríos ${doc.value}`)
                }
            }

            return array.filter((item) => item !== undefined).join(' ')
        }

        const Webhook = async (agent: any) => {
            const resMA = await Matutina.find({ date: { $gte: today.toDate(), $lt: moment(today).endOf('day').toDate() } }, '-_id id_loteria value', {
                sort: { id_loteria: 'asc' },
            })

            const resNO = await Nocturna.find({ date: { $gte: today.toDate(), $lt: moment(today).endOf('day').toDate() } }, '-_id id_loteria value', {
                sort: { id_loteria: 'asc' },
            })

            const resPR = await Primera.find({ date: { $gte: today.toDate(), $lt: moment(today).endOf('day').toDate() } }, '-_id id_loteria value', {
                sort: { id_loteria: 'asc' },
            })

            const resVE = await Vespertina.find({ date: { $gte: today.toDate(), $lt: moment(today).endOf('day').toDate() } }, '-_id id_loteria value', {
                sort: { id_loteria: 'asc' },
            })

            if (query && query.toLowerCase() === 'que salio hoy')
                agent.add(`
                    Primera
                    ----------
                    ${responseController(resPR)}
                    ----------
                    Matutina
                    ----------
                    ${responseController(resMA)}
                    ----------
                    Vespertina
                    ----------
                    ${responseController(resVE)}
                    ----------
                    Nocturna
                    ----------
                    ${responseController(resNO)}
                `)
            else if (query && query.toLowerCase() === 'matutina')
                agent.add(`
                    Matutina
                    ----------
                    ${responseController(resMA)}
                `)
            else if (query && query.toLowerCase() === 'nocturna')
                agent.add(`
                    Nocturna
                    ----------
                    ${responseController(resNO)}
                `)
            else if (query && query.toLowerCase() === 'primera')
                agent.add(`
                    Primera
                    ----------
                    ${responseController(resPR)}
                `)
            else if (query && query.toLowerCase() === 'vespertina')
                agent.add(`
                    Vespertina
                    ----------
                    ${responseController(resVE)}
                `)
            else agent.add(`Error`)
        }

        const intentMap = new Map()

        intentMap.set('Webhook', Webhook)

        WC.handleRequest(intentMap)
    })

    app.post('/api/webhook/game', (req, res) => {
        const key = req.body.fulfillmentInfo.tag
        const parameters = req.body.sessionInfo.parameters

        let result: any[] = []

        if (key === 'Game - 1') {
            result.push(`¿En dónde jugamos?`)
            result.push(`------------------------------`)

            for (const item of db_a) {
                result.push(`${item.icon} ${item.text}`)
            }
        }

        if (key === 'Game - 2') {
            result.push(`${searchData('db_a', parameters.game_1_option)} - ¿En dónde?`)
            result.push(`------------------------------`)

            for (const item of db_b) {
                result.push(`${item.icon} ${item.text}`)
            }
        }

        if (key === 'Game - 3') {
            result.push(`${searchData('db_a', parameters.game_1_option)} - ${searchData('db_b', parameters.game_2_option)}`)
            result.push(`------------------------------`)
            result.push(`✍️ Ahora escribe los números que quieres jugar`)
        }

        if (key === 'Game - 4') {
            let numbers: any[] = []
            let price = 0
            let position = '[01-01]'

            for (const string of parameters.game_3_option.split(' ')) {
                if (isNaN(Number(string))) break
                else numbers.push(string)
            }

            for (const string of parameters.game_3_option.split(' ')) {
                if (isNaN(Number(string)) && string.includes('$')) {
                    price = Number(string.substring(1))
                    break
                }
            }

            if (parameters.game_3_option.includes('a los premios del 1 al 10') || parameters.game_3_option.includes('a los 10')) position = '[01-10]'
            if (parameters.game_3_option.includes('a los veinte')) position = '[01-20]'
            if (parameters.game_3_option.includes('a los cinco')) position = '[01-05]'

            result.push(`${searchData('db_a', parameters.game_1_option)}`)
            result.push(`------------------------------`)
            result.push(`Numero Ubicación Valor`)

            for (const item of numbers) {
                result.push(`${item.padStart(6, 'X')} ${position.padStart(9, 'X')} ${currencyController(price).padStart(5, 'X')}`)
            }

            result.push(`------------------------------`)
            result.push(`Total: ${currencyController(numbers.length * price * (parameters.game_2_option === 7 ? 7 : 1))}`)
            result.push(`Lotería: ${searchData('db_b', parameters.game_2_option)} `)
            result.push(`------------------------------`)
            result.push(`¿Está bien? `)
        }

        res.status(200).json({
            fulfillment_response: {
                messages: [{ text: { text: [result.join('\n')] } }],
            },
        })
    })
}
