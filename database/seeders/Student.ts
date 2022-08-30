import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'

export default class extends BaseSeeder {
  public async run () {
    await Student.createMany([
      {
        userId: 3,
        status: 'Ativo'
      },
    ])
  }
}
