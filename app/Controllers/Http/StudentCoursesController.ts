import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment'
import Student from 'App/Models/Student'
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
                return response.badGateway('Esse(a) aluno(a) já concluiu esse curso')
            } else if (matriculated[0].status == 'Trancado') {
                return response.badGateway('Esse(a) aluno(a) trancou esse curso. Atualize o status do curso para Ativo novamente')
            }
        }

        const studentCourse = new StudentCourse()
        studentCourse.studentId = data.studentId
        studentCourse.courseId = data.courseId
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
                return response.badGateway('Esse(a) aluno(a) já está cadastrado(a) em um curso no momento')
            }
        }

        if (data.status == 'Aprovado' || data.status == 'Reprovado') {
            const enrollments = await Enrollment.query().select('*')
                .where('studentId', studentCourse.studentId)
                .andWhere('status', 'Ativo')

            if (enrollments[0]) {
                return response.badGateway('O(A) aluno(a) ainda tem aulas ativas')
            }
        }

        if (data.status == 'Trancado' && studentCourse.status == 'Ativo') {
            const student = await Student.findOrFail(studentCourse.studentId)

            await student.changeStatus(data.status)

            return response.status(204)
        }

        studentCourse.status = data.status
        await studentCourse.save()

        return response.status(204)
    }

}
