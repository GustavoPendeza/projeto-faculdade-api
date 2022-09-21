import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateStudentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    tenantId: this.ctx.params.id
  })

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim()
    ]),
    email: schema.string({}, [
      rules.trim(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true, whereNot: { id: this.refs.tenantId } })
    ]),
    status: schema.enum.optional(
      ['Ativo', 'Trancado'] as const
    ),
  })

  public messages: CustomMessages = {
    'email.unique': 'Esse e-mail já está sendo utilizado',
  }
}
