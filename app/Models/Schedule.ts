import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'
import Lesson from './Lesson'
import Employee from './Employee'
import Student from './Student'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public courseId: number

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @column()
  public lessonId: number

  @belongsTo(() => Lesson)
  public lesson: BelongsTo<typeof Lesson>

  @column()
  public employeeId: number

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Student, {
    pivotTable: 'enrollments',
    pivotColumns: ['status', 'grade', 'created_at', 'updated_at']
  })
  public student: ManyToMany<typeof Student>

}
