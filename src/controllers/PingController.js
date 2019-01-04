import { Router } from 'express'

class PingController {
  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes() {
    this.router.get('/', this.ping)
  }

  ping = (req, res) => {
    res.send('Ping this shit')
  }
}

export default new PingController().router