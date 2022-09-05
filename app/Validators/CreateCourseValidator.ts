import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.unique({ table: 'courses', column: 'name', caseInsensitive: true }),
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
