import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import Employee from 'App/Models/Employee'
import CreateAdminValidator from 'App/Validators/CreateAdminValidator'

export default class AdminsController {
    
    /**
     * Retorna uma lista dos Admins
     * 
     * @returns Array<Admin, Employee>
     */
    public async list() {
        const admins = await Admin.query().select('*')
            .preload('employee')

        return admins
    }

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
        await Employee.findOrFail(params.id)

        // Verifica se o funcionário está cadastrado como admin
        try {
            const admin = await Admin.findByOrFail('employeeId', params.id)

            await admin.delete()

            return response.status(204)
        } catch (error) {
            return response.badGateway('O(A) funcionário(a) não é um admin')
        }
    }

}