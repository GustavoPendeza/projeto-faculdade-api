import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateStudentCourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum(
      ['Ativo', 'Aprovado', 'Reprovado', 'Trancado'] as const
    ),
  })

  public messages: CustomMessages = {
    'status.required': 'O campo status é obrigatório',
  }
}
