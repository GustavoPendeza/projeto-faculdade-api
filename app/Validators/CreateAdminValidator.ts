import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAdminValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    employeeId: schema.number([
      rules.exists({ table: 'employees', column: 'id' }),
      rules.unique({ table: 'admins', column: 'employee_id' }),
    ]),
  })

  public messages: CustomMessages = {
    'employeeId.required': 'O campo employeeId é obrigatório',
    'employeeId.exists': 'O funcionário não existe. Tente outro ID',
    'employeeId.unique': 'Esse funcionário já é um admin',
  }
}
