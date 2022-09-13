import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'
import CreateLessonValidator from 'App/Validators/CreateLessonValidator'
import UpdateLessonValidator from 'App/Validators/UpdateLessonValidator'

export default class LessonsController {

    /**
     * Retorna uma lista com todas as matérias
     * 
     * @returns Array<Lesson>
     */
    public async list() {
        const lessons = await Lesson.all()

        return lessons
    }

    /**
     * Cadastra uma matéria
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(CreateLessonValidator)

        const lesson = await Lesson.create(data)

        return response.created(lesson)
    }

    /**
     * Altera uma matéria
     * 
     * @param params Lesson.id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const lesson = await Lesson.findOrFail(params.id)

        const data = await request.validate(UpdateLessonValidator)
        
        lesson.name = data.name
        lesson.description = data.description
        await lesson.save()

        return response.status(204)
    }

    /**
     * Deleta uma matéria
     * 
     * @param params Lesson.id
     * @param response ResponseContract
     * @returns Response
     */
    public async destroy({ params, response}: HttpContextContract) {
        const lesson = await Lesson.findOrFail(params.id)

        await lesson.delete()

        return response.status(204)
    }

}
