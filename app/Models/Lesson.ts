import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'
import Course from './Course'

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Course, {
    pivotTable: 'schedules'
  })
  public course: ManyToMany<typeof Course>

  @manyToMany(() => Employee, {
    pivotTable: 'schedules'
  })
  public employee: ManyToMany<typeof Employee>

}
