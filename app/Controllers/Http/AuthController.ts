import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    /**
     * Realiza o login do usuário
     * 
     * @param auth AuthContract
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Bearer token
     */
    public async login({ auth, request, response }: HttpContextContract) {
        const { email, password } = request.all()

        const user = await User.query().where('email', email).preload('student')

        if (user[0].student) {
            if (user[0].student.status != 'Ativo') {
                return response.status(403).json({
                    'message': 'A conta desse e-mail foi desativada'
                })
            }
        }

        try {
            const token = await auth.attempt(email, password)

            return token.toJSON()
        } catch (error) {
            return response.badRequest('E-mail e/ou senha inválidos')
        }

    }

    /**
     * Realiza o logout do usuário
     * 
     * @param auth AuthContract
     * @param response ResponseContract
     * @returns Response
     */
    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()

        return response.status(204)
    }

}
