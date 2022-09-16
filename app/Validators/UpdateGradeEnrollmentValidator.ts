import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateGradeEnrollmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    grade: schema.number([
      rules.range(0, 10),
    ]),
  })

  public messages: CustomMessages = {
    'grade.required': 'O campo aluno é obrigatório',
    'grade.range': 'A nota do aluno só vai de 0 a 10. Verifique se digitou corretamente.',
  }
}
