import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import User from 'App/Models/User'
import RegisterStudentValidator from 'App/Validators/RegisterStudentValidator'
import UpdateStudentValidator from 'App/Validators/UpdateStudentValidator'

export default class StudentsController {

    /**
     * Cadastra um aluno
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async register({ request, response }: HttpContextContract) {
        const data = await request.validate(RegisterStudentValidator)

        const user = new User()
        user.name = data.name
        user.email = data.email
        user.password = data.password
        await user.save()

        const student = new Student()
        student.userId = user.id
        student.status = 'Ativo'
        await student.save()

        return response.created({ user, student })
    }

    /**
     * Altera um usuário
     * 
     * @param params id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const data = await request.validate(UpdateStudentValidator)
        
        // Busca o usuário
        const user = await User.findOrFail(params.id)
        // Verifica se é um aluno
        try {
            const student = await Student.findByOrFail('userId', user.id)

            if (data.status) {
                student.status = data.status
                await student.save()
            }
        } catch (error) {
            return response.badRequest('O usuário não é um aluno')
        }

        user.name = data.name
        user.email = data.email
        await user.save()

        return response.status(204)
    }

}
