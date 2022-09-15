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
      {
        name: 'Secretario',
        email: 'secretario@gmail.com',
        password: 'admin123'
      },
      {
        name: 'Gilberto',
        email: 'gil@gmail.com',
        password: 'admin123'
      },
      {
        name: 'Adriana',
        email: 'adri@gmail.com',
        password: 'admin123'
      },
    ])
  }
}
