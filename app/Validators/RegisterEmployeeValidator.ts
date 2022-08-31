import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterEmployeeValidator {
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
    role: schema.enum(
      ['Coordenador(a)', 'Professor(a)', 'Secretario(a)'] as const
    ),
    cnpj: schema.number.nullableAndOptional([
      rules.trim(),
      rules.unique({ table: 'employees', column: 'cnpj', caseInsensitive: true })
    ]),
    admin: schema.boolean([])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'email.required': 'O campo e-mail é obrigatório',
    'email.unique': 'Esse e-mail já está sendo utilizado',
    'password.required': 'O campo senha é obrigatório',
    'password_confirmation.confirmed': 'Os campos senha e confirmar senha devem ser iguais',
    'password.minLength': 'O campo senha deve ter no mínimo 6 caracteres',
    'role.required': 'O campo de cargo é obrigatório',
    'cnpj.number': 'Digite apenas os números do CNPJ',
    'cnpj.unique': 'Esse CNPJ já está sendo utilizado por outro funcionário',
    'admin.required': 'O campo admin é obrigatório',
    'admin.boolean': 'O campo admin é boolean, deve ser verdadeiro ou falso'
  }
}
