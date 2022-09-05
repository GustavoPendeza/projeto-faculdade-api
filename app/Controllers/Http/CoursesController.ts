import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import CreateCourseValidator from 'App/Validators/CreateCourseValidator'
import UpdateCourseValidator from 'App/Validators/UpdateCourseValidator'

export default class CoursesController {

    /**
     * Retorna uma lista com todos os cursos
     * 
     * @returns Array<Course>
     */
    public async list() {
        const courses = await Course.all()

        return courses
    }

    /**
     * Cadastra um novo curso
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(CreateCourseValidator)

        const course = await Course.create(data)

        return response.created(course)
    }

    /**
     * Altera um curso
     * 
     * @param params Course.id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const course = await Course.findOrFail(params.id)

        const data = await request.validate(UpdateCourseValidator)

        course.name = data.name
        course.description = data.description
        course.save()

        return response.status(204)
    }

    /**
     * Deleta um curso
     * 
     * @param params Course.id
     * @param response ResponseContract
     * @returns Response
     */
    public async destroy({ params, response }: HttpContextContract) {
        const course = await Course.findOrFail(params.id)

        course.delete()
        
        return response.status(204)
    }

}
