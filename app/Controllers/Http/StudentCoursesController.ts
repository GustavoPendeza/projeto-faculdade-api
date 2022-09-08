import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentCourse from 'App/Models/StudentCourse'
import CreateStudentCourseValidator from 'App/Validators/CreateStudentCourseValidator'
import UpdateStudentCourseValidator from 'App/Validators/UpdateStudentCourseValidator'

export default class StudentCoursesController {

    /**
     * Lista todos os alunos e cursos em que estão cadastrados
     * 
     * @returns Array<StudentCourse, Student, Course>
     */
    public async list() {
        const studentCourse = await StudentCourse.query()
            .select('*')
            .preload('student')
            .preload('course')

        return studentCourse
    }

    /**
     * Matricula um aluno em um curso
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(CreateStudentCourseValidator)

        const matriculated = await StudentCourse.query()
            .where('studentId', data.studentId)
            .andWhere('courseId', data.courseId)

        if (matriculated[0]) {
            if (matriculated[0].status == 'Aprovado') {
                return response.badRequest('Esse(a) aluno(a) já concluiu esse curso')
            } else if (matriculated[0].status == 'Trancado') {
                return response.badRequest('Esse(a) aluno(a) trancou esse curso. Atualize o status do curso para Ativo novamente')
            }
        }

        const studentCourse = new StudentCourse()
        studentCourse.studentId = data.studentId
        studentCourse.courseId = data.courseId
        studentCourse.status = 'Ativo'
        await studentCourse.save()

        return response.created(studentCourse)
    }

    /**
     * Altera o status de uma matrícula de curso
     * 
     * @param params StudentCourse.id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const data = await request.validate(UpdateStudentCourseValidator)

        const studentCourse = await StudentCourse.findOrFail(params.id)

        const verification = await StudentCourse.query()
            .where('studentId', studentCourse.studentId)
            .andWhere('status', 'Ativo')

        if (verification[0]) {
            if (data.status == 'Ativo') {
                return response.badRequest('Esse(a) aluno(a) já está cadastrado(a) em um curso no momento')
            }
        }

        studentCourse.status = data.status
        studentCourse.save()

        return response.status(204)
    }

}
