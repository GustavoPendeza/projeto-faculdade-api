import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Schedule from './Schedule'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>
  
  @column()
  public scheduleId: number

  @belongsTo(() => Schedule)
  public schedule: BelongsTo<typeof Schedule>

  @column()
  public status: string

  @column()
  public grade: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
