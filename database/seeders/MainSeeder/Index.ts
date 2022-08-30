import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {

    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../Employee'))
    await this.runSeeder(await import('../Admin'))
    await this.runSeeder(await import('../Student'))
  }
}
