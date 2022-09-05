import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    
    const user = await User.findBy('id', auth.user!.id)
    
    const admin = await user!.middlewareAdmin()

    if (!admin) {
      return response.status(403).json({
        message: 'Você não tem permissão para realizar essa ação.'
      })
    }

    await next()
  }
}
