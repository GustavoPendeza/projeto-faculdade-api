import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Employee {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {

    const user = await User.findBy('id', auth.user!.id)
    
    const employee = await user!.middlewareEmployee()

    if (!employee) {
      return response.status(403).json({
        message: 'Você não tem permissão para realizar essa ação.'
      })
    }

    await next()
  }
}
