import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Admin from './Admin'
import Lesson from './Lesson'
import Course from './Course'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public role: string

  @column()
  public cnpj: string | null

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public updatedAt: DateTime

  @hasOne(() => Admin)
  public admin: HasOne<typeof Admin>

  @manyToMany(() => Course, {
    pivotTable: 'schedules'
  })
  public course: ManyToMany<typeof Course>
  
  @manyToMany(() => Lesson, {
    pivotTable: 'schedules'
  })
  public lesson: ManyToMany<typeof Lesson>
  
}
