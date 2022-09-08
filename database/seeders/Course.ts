import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Course from 'App/Models/Course'

export default class extends BaseSeeder {
  public async run () {
    await Course.createMany([
      {
        name: "Administração",
        description: "Administração forma profissionais capazes de gerenciar recursos de uma instituição ou empresa, sejam materiais, financeiros ou humanos."
      },
      {
        name: "Análise e Desenvolvimento de Sistemas",
        description: "Análise e desenvolvimento de sistemas é uma área responsável por analisar, desenvolver, projetar, implementar e atualizar sistemas de informação. Os profissionais da área geram softwares, que são executados em hardwares e operados por usuários diversos."
      },
      {
        name: "Medicina",
        description: "A medicina trabalha com a manutenção e a restauração da saúde. Num sentido amplo, lida com a prevenção e cura das doenças humanas. O médico investiga a natureza e as causas das doenças."
      },
    ])
  }
}
