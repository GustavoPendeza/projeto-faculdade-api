import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import Employee from 'App/Models/Employee'
import CreateAdminValidator from 'App/Validators/CreateAdminValidator'

export default class AdminsController {

    /**
     * Cadastra um funcionário como admin
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(CreateAdminValidator)

        const admin = await Admin.create(data)

        return response.created(admin)
    }

    /**
     * Deleta um funcionário da função de admin
     * 
     * @param params Employee.id
     * @param response ResponseContract
     * @returns Response
     */
    public async destroy({ params, response }: HttpContextContract) {
        // Verifica se o funcionário existe
        try {
            await Employee.findOrFail(params.id)
        } catch (error) {
            return response.status(404).json('O(A) funcionário(a) não existe')
        }

        // Verifica se o funcionário está cadastrado como admin
        try {
            const admin = await Admin.findByOrFail('employeeId', params.id)

            await admin.delete()

            return response.status(204)
        } catch (error) {
            return response.badRequest('O(A) funcionário(a) não é um admin')
        }
    }

}