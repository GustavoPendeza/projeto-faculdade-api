import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import StudentCourse from 'App/Models/StudentCourse'

export default class extends BaseSeeder {
  public async run () {
    await StudentCourse.createMany([
      {
        studentId: 1,
        courseId: 2
      },
    ])
  }
}
