import supertest from 'supertest'
import { app } from '../../index'

export const api = supertest(app)
