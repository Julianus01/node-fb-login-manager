
import User from '../models/User'

class AuthService {
  constructor() {
  }

  updateUserData = async user => {
    try {
      await User.updateOne(
        { uid: user.uid },
        { $set: user },
        { upsert: true },
      );
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthService