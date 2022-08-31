import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import User from 'App/Models/User'
import RegisterStudentValidator from 'App/Validators/RegisterStudentValidator'
import UpdateStudentValidator from 'App/Validators/UpdateStudentValidator'

export default class StudentsController {

    /**
     * Retorna uma lista com todos os alunos
     * 
     * @returns Array<User, Student>
     */
    public async list() {
        const students = await User.query()
            .join('students', 'users.id', 'students.user_id')
            .select('users.*')
            .preload('student')

        return students
    }

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

    /**
     * Expulsa um aluno
     * 
     * @param params id
     * @param response ResponseContract
     * @returns Response
     */
    public async expelStudent({ params, response }: HttpContextContract) {
        try {
            const student = await Student.findByOrFail('userId', params.id)

            if (student.status == 'Expulso') {
                return response.badRequest('O aluno já foi expulso')
            }

            student.status = 'Expulso'
            student.save()

            return response.status(204)
        } catch (error) {
            return response.badRequest('O usuário não é um aluno')
        }
    }

}
