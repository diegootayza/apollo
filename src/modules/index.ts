import { Express } from 'express'

import webhook from './webhook'

export default (app: Express) => {
    webhook(app)
}
