import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
      },
      {
        name: 'Professor',
        email: 'professor@gmail.com',
        password: 'admin123'
      },
      {
        name: 'Aluno',
        email: 'aluno@gmail.com',
        password: 'admin123'
      },
    ])
  }
}
