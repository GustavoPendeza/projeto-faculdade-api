import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEnrollmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    scheduleId: schema.number([
      rules.exists({ table: 'schedules', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'scheduleId.required': 'O campo scheduleId é obrigatório',
  }
}
