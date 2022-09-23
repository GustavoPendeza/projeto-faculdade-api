import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateStudentCourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    studentId: schema.number([
      rules.exists({ table: 'students', column: 'id', where: { status: 'Ativo' } }),
      rules.unique({ table: 'student_courses', column: 'student_id', where: { status: 'Ativo' } })
    ]),
    courseId: schema.number([
      rules.exists({ table: 'courses', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'studentId.required': 'O campo aluno é obrigatório',
    'studentId.exists': 'Esse(a) aluno(a) não existe ou não está mais ativo',
    'studentId.unique': 'Esse(a) aluno(a) já está cadastrado(a) em um curso no momento',
    'courseId.required': 'O campo curso é obrigatório',
    'courseId.exists': 'Esse curso não existe', 
  }
}
