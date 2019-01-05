import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import PostController from './controllers/PostController'
import PingController from './controllers/PingController'
import { getDbURL } from './db_config'
import UserController from './controllers/UserController'
import * as admin from 'firebase-admin'
import firebaseKey from '../private/loginManagerFirebaseKey'
import firebase from 'firebase'

class App {
  constructor() {
    this.app = express()
    this.initApp()
    this.connectDB()
    this.mountRoutes()
    this.initializeFirebase()
  }

  initApp() {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use(cors())
  }

  async connectDB() {
    await mongoose.connect(getDbURL('manager'), { useNewUrlParser: true, autoReconnect: true })
    console.log('Connected to mongodb')
  }

  mountRoutes() {
    this.app.use('/', PingController)
    this.app.use('/api/v1/user', UserController)
    this.app.use('/api/v1/posts', PostController)
  }

  initializeFirebase() {
    firebase.initializeApp({
      apiKey: process.env.fb_apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId
    })
    admin.initializeApp({
      credential: admin.credential.cert(firebaseKey),
      databaseURL: process.env.databaseURL
    })
  }
}

export default new App().app