import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Employee from 'App/Models/Employee'

export default class extends BaseSeeder {
  public async run () {
    await Employee.createMany([
      {
        userId: 1,
        cnpj: 11122233000155
      },
      {
        userId: 2,
        cnpj: 66677788000100
      },
    ])
  }
}
