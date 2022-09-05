import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateEmployeeValidator {
  constructor(protected ctx: HttpContextContract) { }

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
    role: schema.enum(
      ['Coordenador(a)', 'Professor(a)', 'Secretario(a)'] as const
    ),
    cnpj: schema.string.nullableAndOptional([
      rules.trim(),
      rules.minLength(14),
      rules.maxLength(14),
      rules.unique({ table: 'employees', column: 'cnpj', whereNot: { user_id: this.refs.tenantId } })
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'email.required': 'O campo e-mail é obrigatório',
    'email.unique': 'Esse e-mail já está sendo utilizado',
    'role.required': 'O campo de cargo é obrigatório',
    'cnpj.minLength': 'O CNPJ tem 14 digitos. Digite apenas os números do CNPJ',
    'cnpj.maxLength': 'O CNPJ tem 14 digitos. Digite apenas os números do CNPJ',
    'cnpj.unique': 'Esse CNPJ já está sendo utilizado por outro funcionário',
  }
}
