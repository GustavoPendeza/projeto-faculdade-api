import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateScheduleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    courseId: schema.number([
      rules.exists({ table: 'courses', column: 'id' }),
    ]),
    lessonId: schema.number([
      rules.exists({ table: 'lessons', column: 'id' }),
    ]),
    employeeId: schema.number([
      rules.exists({ table: 'employees', column: 'id', where: { role: 'Professor(a)' } }),
    ]),
  })

  public messages: CustomMessages = {
    'courseId.required': 'O campo courseId é obrigatório',
    'courseId.exists': 'O curso não existe. Tente outro ID',
    'lessonId.required': 'O campo lessonId é obrigatório',
    'lessonId.exists': 'A matéria não existe. Tente outro ID',
    'employeeId.required': 'O campo employeeId é obrigatório',
    'employeeId.exists': 'O funcionário não existe ou não é um professor. Tente outro ID',
  }
}
