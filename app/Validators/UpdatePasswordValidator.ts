import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [
      rules.trim(),
      rules.confirmed('password_confirmation'),
      rules.minLength(6)
    ]),
  })

  public messages: CustomMessages = {
    'password.required': 'O campo senha é obrigatório',
    'password_confirmation.confirmed': 'Os campos senha e confirmar senha devem ser iguais',
    'password.minLength': 'O campo senha deve ter no mínimo 6 caracteres',
  }
}
