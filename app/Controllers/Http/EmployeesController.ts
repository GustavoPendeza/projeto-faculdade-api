import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import Employee from 'App/Models/Employee'
import User from 'App/Models/User'
import RegisterEmployeeValidator from 'App/Validators/RegisterEmployeeValidator'
import UpdateEmployeeValidator from 'App/Validators/UpdateEmployeeValidator'

export default class EmployeesController {

    /**
     * Retorna uma lista com todos os funcionários
     * 
     * @returns Array<User, Employee>
     */
    public async list() {
        const employees = await User.query()
            .join('employees', 'users.id', 'employees.user_id')
            .select('users.*')
            .preload('employee')
        
        return employees
    }

    /**
     * Cadastra um funcionário
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async register({ request, response }: HttpContextContract) {
        const data = await request.validate(RegisterEmployeeValidator)

        const user = new User()
        user.name = data.name
        user.email = data.email
        user.password = data.password
        await user.save()

        const employee = new Employee()
        employee.userId = user.id
        employee.role = data.role
        if (data.cnpj != null) {
            employee.cnpj = data.cnpj
        }
        await employee.save()

        if (data.admin == true) {
            const admin = new Admin()
            admin.employeeId = employee.id
            await admin.save()

            return response.created({ user, employee, admin })
        }

        return response.created({ user, employee })
    }

    /**
     * Altera um funcionário
     * 
     * @param params id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const data = await request.validate(UpdateEmployeeValidator)

        // Busca o usuário
        const user = await User.findOrFail(params.id)
        // Verifica se é um funcionário
        try {
            const employee = await Employee.findByOrFail('userId', user.id)
            
            employee.role = data.role
            if (data.cnpj) {
                employee.cnpj = data.cnpj
            }
            await employee.save()
        } catch (error) {
            return response.badRequest('O usuário não é um funcionário')
        }

        user.name = data.name
        user.email = data.email
        await user.save()

        return response.status(204)
    }

}
