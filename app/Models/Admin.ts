import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public employeeId: number

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public updatedAt: DateTime
}
