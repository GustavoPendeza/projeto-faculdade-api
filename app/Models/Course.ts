import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
