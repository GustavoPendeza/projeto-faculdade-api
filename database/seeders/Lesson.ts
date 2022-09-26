import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Lesson from 'App/Models/Lesson'

export default class extends BaseSeeder {
  public async run () {
    await Lesson.createMany([
      {
        name: "Ética e Moral",
        description: "A ética está associada ao estudo fundamentado dos valores morais que orientam o comportamento humano em sociedade, enquanto a moral são os costumes, regras, tabus e convenções estabelecidas por cada sociedade."
      },
      {
        name: "Finanças e Orçamentos",
        description: "Finanças é o gerenciamento de dinheiro, principalmente em relação a empresas, organizações ou governos. O orçamento é, basicamente, um documento de início da venda – um demonstrativo da necessidade e do interesse do cliente em seus produtos."
      },
      {
        name: "Anatomia",
        description: "Estuda as estruturas macroscópicas do nosso corpo (como esqueleto, musculatura, veias e artérias, nervos, órgãos, etc.), sua localização, relações anatômicas e funcionais. Esta disciplina envolve a preparação de peças anatômicas e a dissecação de cadáveres."
      },
      {
        name: "Programação Orientada a Objetos",
        description: "É um paradigma de programação baseado no conceito de 'objetos', que podem conter dados na forma de campos, também conhecidos como atributos, e códigos, na forma de procedimentos, também conhecidos como métodos."
      },
      {
        name: "Banco de Dados",
        description: "Nessa disciplina você vai conhecer os principais sistemas de banco de dados e aprender como utilizá-los para armazenar todos os tipos de dados."
      },
      {
        name: "Planejamento Estratégico",
        description: "O conceito de planejamento estratégico se refere a um processo sistêmico que permite definir o melhor caminho a ser seguido por uma organização, para atingir um ou mais objetivos, dentro de um contexto previamente analisado. Isso se faz analisando cenários, definindo metas e ações que permitirão chegar onde se deseja."
      },
    ])
  }
}
