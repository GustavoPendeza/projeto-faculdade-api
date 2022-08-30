import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterStudentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim()
    ]),
    email: schema.string({}, [
      rules.trim(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true })
    ]),
    password: schema.string({}, [
      rules.trim(),
      rules.confirmed('password_confirmation'),
      rules.minLength(6)
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'email.required': 'O campo e-mail é obrigatório',
    'email.unique': 'Esse e-mail já está sendo utilizado',
    'password.required': 'O campo senha é obrigatório',
    'password_confirmation.confirmed': 'Os campos senha e confirmar senha devem ser iguais',
    'password.minLength': 'O campo senha deve ter no mínimo 6 caracteres',
  }
}
