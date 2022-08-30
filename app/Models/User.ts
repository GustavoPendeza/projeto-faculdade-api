import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'
import Student from './Student'
import Admin from './Admin'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  @hasOne(() => Employee)
  public employee: HasOne<typeof Employee>

  @hasOne(() => Student)
  public student: HasOne<typeof Student>

  /**
   * Verifica se o usuário autenticado tem cadastro como Funcionário
   * 
   * @returns Employee
   */
   public async middlewareEmployee() {
    const employee = await Employee.query().where('userId', this.id).first()

    return employee
  }

  /**
   * Verifica se o usuário autenticado tem cadastro como Admin
   * 
   * @returns Admin
   */
  public async middlewareAdmin() {
    const employee = await Employee.query().where('userId', this.id).first()

    let admin
    
    if(employee) {
      admin = await Admin.query().where('employeeId', employee!.id).first()
    }

    return admin
  }

  /**
   * Verifica se o usuário autenticado tem cadastro como Aluno
   * 
   * @returns Student
   */
  public async middlewareStudent() {
    const student = await Student.query().where('userId', this.id).first()

    return student
  }
}
