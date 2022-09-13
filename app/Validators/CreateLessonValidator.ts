import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateLessonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.unique({ table: 'lessons', column: 'name', caseInsensitive: true }),
    ]),
    description: schema.string({}, [
      rules.trim(),
      rules.escape(),
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'name.unique': 'Essa matéria já foi cadastrada',
    'description.required': 'O campo de descrição é obrigatório', 
  }
}
