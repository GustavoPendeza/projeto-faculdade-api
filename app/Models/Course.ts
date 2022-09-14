import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Lesson from './Lesson'
import Employee from './Employee'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public updatedAt: DateTime

  @manyToMany(() => Student, {
    pivotTable: 'student_courses',
    pivotColumns: ['status', 'created_at', 'updated_at']
  })
  public student: ManyToMany<typeof Student>

  @manyToMany(() => Lesson, {
    pivotTable: 'schedules'
  })
  public lesson: ManyToMany<typeof Lesson>
  
  @manyToMany(() => Employee, {
    pivotTable: 'schedules'
  })
  public employee: ManyToMany<typeof Employee>

}
