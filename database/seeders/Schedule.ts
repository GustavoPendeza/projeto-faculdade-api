import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Schedule from 'App/Models/Schedule'

export default class extends BaseSeeder {
  public async run () {
    await Schedule.createMany([
      {
        courseId: 1,
        lessonId: 1,
        employeeId: 2
      },
      {
        courseId: 2,
        lessonId: 1,
        employeeId: 2
      },
      {
        courseId: 3,
        lessonId: 1,
        employeeId: 2
      },
    ])
  }
}
