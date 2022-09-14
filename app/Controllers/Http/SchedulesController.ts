import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schedule from 'App/Models/Schedule'
import CreateScheduleValidator from 'App/Validators/CreateScheduleValidator'

export default class SchedulesController {

    /**
     * Retorna uma lista de aulas
     * 
     * @returns Array<Schedule>
     */
    public async list() {
        const schedules = await Schedule.query().select('*')
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
            return response.badRequest('Essa aula já está cadastrada nesse curso e com esse professor.')
        }

        const schedule = await Schedule.create(data)

        return response.created(schedule)
    }

}
