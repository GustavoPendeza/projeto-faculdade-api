import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import Employee from 'App/Models/Employee'
import AdminCreateValidator from 'App/Validators/AdminCreateValidator'

export default class AdminsController {

    /**
     * Cadastra um funcionário como admin
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(AdminCreateValidator)

        const admin = new Admin()
        admin.employeeId = data.employeeId
        await admin.save()

        return response.status(204)
    }

    /**
     * Deleta um funcionário da função de admin
     * 
     * @param params Employee.id
     * @param response ResponseContract
     * @returns Response
     */
    public async delete({ params, response }: HttpContextContract) {
        // Verifica se o funcionário existe
        try {
            await Employee.findOrFail(params.id)
        } catch (error) {
            return response.badRequest('O funcionário não existe')
        }

        // Verifica se o funcionário está cadastrado como admin
        try {
            const admin = await Admin.findByOrFail('employeeId', params.id)

            await admin.delete()

            return response.status(204)
        } catch (error) {
            return response.badRequest('O funcionário não é um admin')
        }
    }

}