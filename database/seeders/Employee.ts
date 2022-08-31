import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Employee from 'App/Models/Employee'

export default class extends BaseSeeder {
  public async run () {
    await Employee.createMany([
      {
        userId: 1,
        role: 'Coordenador(a)',
        cnpj: 11122233000155
      },
      {
        userId: 2,
        role: 'Professor(a)',
        cnpj: 66677788000100
      },
    ])
  }
}
