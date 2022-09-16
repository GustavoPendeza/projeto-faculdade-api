import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schedule from 'App/Models/Schedule'
import Student from 'App/Models/Student'
import StudentCourse from 'App/Models/StudentCourse'
import CreateScheduleValidator from 'App/Validators/CreateScheduleValidator'
import UpdateScheduleValidator from 'App/Validators/UpdateScheduleValidator'

export default class SchedulesController {

    /**
     * Retorna uma lista de aulas
     * 
     * @returns Array<Schedule, Course, Lesson, Employee>
     */
    public async listAdmin() {
        const schedules = await Schedule.query().select('*')
            .preload('course')
            .preload('lesson')
            .preload('employee')

        return schedules
    }

    /**
     * Retorna uma lista das aulas do curso em que o aluno autenticado está ativo
     * 
     * @param auth AuthContract
     * @returns Array<Schedule, Course, Lesson, Employee>
     */
    public async listStudent({ auth }: HttpContextContract) {
        const student = await Student.findByOrFail('userId', auth.user!.id)

        const course = await StudentCourse.query()
            .where('studentId', student.id)
            .andWhere('status', 'Ativo')
            .first()

        const schedules = await Schedule.query().select('*')
            .where('courseId', course!.courseId)
            .preload('course')
            .preload('lesson')
            .preload('employee')

        return schedules
    }

    /**
     * Cadastra uma aula (Curso, Matéria e Professor)
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(CreateScheduleValidator)

        const verification = await Schedule.query()
            .where('courseId', data.courseId)
            .andWhere('lessonId', data.lessonId)
            .andWhere('employeeId', data.employeeId)

        if (verification[0]) {
            return response.badGateway('Essa matéria já está cadastrada nesse curso e com esse professor.')
        }

        const schedule = await Schedule.create(data)

        return response.created(schedule)
    }

    /**
     * Altera a matéria e o professor de uma aula
     * 
     * @param params Schedule.id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const schedule = await Schedule.findOrFail(params.id)

        const data = await request.validate(UpdateScheduleValidator)

        const verification = await Schedule.query()
            .where('courseId', schedule.courseId)
            .andWhere('lessonId', data.lessonId)
            .andWhere('employeeId', data.employeeId)

        if (verification[0]) {
            return response.badGateway('Essa matéria já está cadastrada nesse curso e com esse professor.')
        }

        schedule.lessonId = data.lessonId
        schedule.employeeId = data.employeeId
        await schedule.save()

        return response.status(204)
    }

    /**
     * Deleta uma aula
     * 
     * @param params Schedule.id
     * @param response ResponseContract
     * @returns Response
     */
    public async destroy({ params, response }: HttpContextContract) {
        const schedule = await Schedule.findOrFail(params.id)

        await schedule.delete()

        return response.status(204)
    }

}
