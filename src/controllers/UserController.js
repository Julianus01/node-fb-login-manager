import { Router } from 'express'
import AuthService from '../services/AuthService'

class UserController {
  constructor() {
    this.router = Router()
    this.authService = new AuthService()
    this.initRoutes()
  }

  initRoutes() {
    this.router.patch('/', this.updateUserData)
  }

  updateUserData = async (req, res) => {
    try {
      const { user } = req.body
      await this.authService.updateUserData(user)

      res.sendStatus(204)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserController().router