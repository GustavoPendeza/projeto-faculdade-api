import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator'

export default class UsersController {

    /**
     * Altera a senha do usuário autenticado
     * 
     * @param auth AuthContract
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async updatePassword({ auth, request, response }: HttpContextContract) {
        const user = await User.findOrFail(auth.user!.id)

        const data = await request.validate(UpdatePasswordValidator)

        user.password = data.password
        user.save()

        return response.status(204)
    }

}
