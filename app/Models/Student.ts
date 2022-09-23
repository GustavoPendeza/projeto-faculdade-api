import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Course from './Course'
import Schedule from './Schedule'
import StudentCourse from './StudentCourse'
import Enrollment from './Enrollment'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public status: string

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public updatedAt: DateTime

  @manyToMany(() => Course, {
    pivotTable: 'student_courses',
    pivotColumns: ['status', 'created_at', 'updated_at']
  })
  public course: ManyToMany<typeof Course>

  @manyToMany(() => Schedule, {
    pivotTable: 'enrollments',
    pivotColumns: ['status', 'grade', 'created_at', 'updated_at']
  })
  public schedule: ManyToMany<typeof Schedule>

  /**
     * Altera os status de StudentCourse e Enrollment de um aluno
     * 
     * @param status string: [Trancado, Expulso]
     */
  public async changeStatus(status: string) {

    const studentCourse = await StudentCourse.query().select('*')
      .where('studentId', this.id)
      .andWhere('status', 'Ativo')

    if (studentCourse[0]) {
      studentCourse[0].status = status
      await studentCourse[0].save()
    }

    const enrollments = await Enrollment.query().select('*')
      .where('studentId', this.id)
      .andWhere('status', 'Ativo')

    enrollments.forEach(enrollment => {
      enrollment.status = status
      enrollment.save()
    });

  }

}
