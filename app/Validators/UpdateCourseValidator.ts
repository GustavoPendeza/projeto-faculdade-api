import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    tenantId: this.ctx.params.id
  })

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.unique({ table: 'courses', column: 'name', caseInsensitive: true, whereNot: { id: this.refs.tenantId } }),
    ]),
    description: schema.string({}, [
      rules.trim(),
      rules.escape(),
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'name.unique': 'Esse curso já foi cadastrado',
    'description.required': 'O campo de descrição é obrigatório', 
  }
}
