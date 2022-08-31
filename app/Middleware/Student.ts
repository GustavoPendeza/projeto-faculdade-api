import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Student {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {

    const user = await User.findBy('id', auth.user!.id)

    const student = await user!.middlewareStudent()

    if (!student) {
      return response.status(401).json({
        message: 'Você não tem permissão para realizar essa ação.'
      })
    } else if (student.status != 'Ativo') {
      return response.status(403).json({
        'message': 'Essa conta foi desativada'
      })
    }

    await next()
  }
}
