# Projeto Faculdade API (Em andamento)

## Sobre

Atualização do <a href="https://github.com/GustavoPendeza/projeto-escola-api">Projeto Escola API</a>. <br>
Quis usar o método de herança e melhorar o banco de dados do projeto.

Um sistema para cadastrar alunos, professores e funcionários da secretaria (Admins). Os professores serão cadastrados na grade de aulas e os alunos podem se matricular nelas (no máximo 4 por trimestre), mas só se forem do curso ao que pertence.

## Diagrama

Para quem tiver curiosidade, vou deixar <a href="https://user-images.githubusercontent.com/53589614/187549953-e8bfb263-c18d-4afe-b907-11e7270e9895.png">aqui</a> o DER do projeto.

## Tecnologias

<div>
    <img alt="AdonisJS" title="AdonisJS" src="https://img.shields.io/badge/adonis%20js-220052?style=for-the-badge&logo=adonisjs&logoColor=white">
    <img alt="TypeScript" title="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="MySQL" title="MySQL" src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
</div>

## Preparação de ambiente

Instale as dependências utilizando o comando:

```bash
npm install
```

Para utilizar um servidor de teste do projeto é só usar o comando: 

```bash
node ace serve --watch
```

Crie um banco de dados e em seguida rode as migrations com o comando: 

```bash
node ace migration:run
```

Se quiser já ter dados em seu banco de dados, pode utilizar o comando: 

```bash
# Para saber o que será cadastrado é só ir em 'database/seeders/'
node ace db:seed
```