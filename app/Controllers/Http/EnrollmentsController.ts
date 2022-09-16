import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import Enrollment from 'App/Models/Enrollment'
import Schedule from 'App/Models/Schedule'
import Student from 'App/Models/Student'
import StudentCourse from 'App/Models/StudentCourse'
import CreateEnrollmentValidator from 'App/Validators/CreateEnrollmentValidator'
import UpdateGradeEnrollmentValidator from 'App/Validators/UpdateGradeEnrollmentValidator'

export default class EnrollmentsController {

    /**
     * Retorna uma lista das matrículas em aulas dos alunos
     * 
     * @returns Array<Enrollment, Student, Schedule>
     */
    public async listAdmin() {
        const enrollments = await Enrollment.query().select('*')
            .preload('student')
            .preload('schedule')

        return enrollments
    }

    /**
     * Retorna uma lista das aulas em que o aluno autenticado está cadastrado
     * 
     * @param auth AuthContract
     * @returns Array<Enrollment, Student, Schedule>
     */
    public async listStudent({ auth }: HttpContextContract) {
        const student = await Student.findByOrFail('userId', auth.user!.id)

        const enrollments = await Enrollment.query().select('*')
            .where('studentId', student.id)
            .preload('student')
            .preload('schedule')
        
        return enrollments
    }

    /**
     * Matricula um aluno em uma aula do seu curso
     * 
     * @param auth AuthContract
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ auth, request, response }: HttpContextContract) {
        const data = await request.validate(CreateEnrollmentValidator)

        const student = await Student.findByOrFail('userId', auth.user!.id)

        const schedule = await Schedule.findOrFail(data.scheduleId)

        const course = await StudentCourse.query()
            .where('studentId', student.id)
            .andWhere('status', 'Ativo')
            .first()

        if (schedule.courseId != course!.courseId) {
            return response.badGateway('Essa aula não faz parte do seu curso, escolha outra.')
        }

        const max = await Enrollment.query()
            .where('studentId', student.id)
            .andWhere('status', 'Ativo')

        if (max.length == 4) {
            return response.badGateway('Já está cadastrado no máximo de matérias no momento')
        }

        const verification = await Enrollment.query()
            .where('studentId', student.id)
            .andWhere('scheduleId', data.scheduleId)
            .andWhere('status', 'Ativo')
            .orWhere('studentId', student.id)
            .andWhere('scheduleId', data.scheduleId)
            .andWhere('status', 'Aprovado')

        if (verification[0]) {
            return response.badGateway('Você já está cadastrado nessa matéria')
        }

        const enrollment = new Enrollment()
        enrollment.studentId = student.id
        enrollment.scheduleId = data.scheduleId
        await enrollment.save()

        return response.created(enrollment)
    }

    /**
     * O professor da matéria altera a nota de um aluno
     * 
     * @param auth AuthContract
     * @param params Enrollment.id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async gradeUpdate({ auth, params, request, response }: HttpContextContract) {
        const enrollment = await Enrollment.findOrFail(params.id)

        const employee = await Employee.findByOrFail('userId', auth.user!.id)

        const schedule = await Schedule.findOrFail(enrollment.scheduleId)

        if (schedule.employeeId != employee.id) {
            return response.status(403).json({
                message: 'Você não pode alterar a nota desse aluno, pois não é o professor dessa matéria'
            })
        }

        const data = await request.validate(UpdateGradeEnrollmentValidator)

        enrollment.grade = data.grade
        
        if (data.grade >= 6) {
            enrollment.status = 'Aprovado'
        } else {
            enrollment.status = 'Reprovado'
        }

        await enrollment.save()

        return response.status(204)
    }

    /**
     * Cancela a matrícula em uma aula do aluno autenticado
     * 
     * @param auth AuthContract
     * @param params Enrollment.id
     * @param response ResponseContract
     * @returns Response
     */
    public async unenroll({ auth, params, response }) {
        const enrollment = await Enrollment.findOrFail(params.id)

        const student = await Student.findByOrFail('userId', auth.user!.id)

        if (enrollment.studentId != student.id) {
            return response.status(403).json({
                message: 'Essa matrícula é de outro aluno'
            })
        }

        if (enrollment.status != 'Ativo') {
            return response.badGateway('Não pode cancelar a matrícula de uma aula que já foi finalizada')
        }

        enrollment.status = 'Reprovado'
        await enrollment.save()

        return response.status(204)
    }

}
