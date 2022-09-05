import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Course from './Course'

export default class StudentCourse extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>

  @column()
  public courseId: number

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
