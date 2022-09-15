import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment'
import Student from 'App/Models/Student'
import CreateEnrollmentValidator from 'App/Validators/CreateEnrollmentValidator'

export default class EnrollmentsController {

    public async store({ auth, request, response }: HttpContextContract) {
        const data = await request.validate(CreateEnrollmentValidator)
        
        const student = await Student.findByOrFail('userId', auth.user!.id)

        const max = await Enrollment.query()
            .where('studentId', student.id)
            .andWhere('status', 'Ativo')

        if (max.length == 4) {
            return response.badGateway('Já está cadastrado no máximo de matérias no momento')
        }

        const verification = await Enrollment.query()
            .where('studentId', student.id)
            .andWhere('scheduleId', data.scheduleId)
            .where('status', 'Ativo')
            .orWhere('status', 'Aprovado')

        if (verification[0]) {
            return response.badGateway('Você já está cadastrado nessa matéria')
        }

        const enrollment = new Enrollment()
        enrollment.studentId = student.id
        enrollment.scheduleId = data.scheduleId
        await enrollment.save()

        return response.created(enrollment)
    }

}
