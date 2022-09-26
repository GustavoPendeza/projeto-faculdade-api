# Projeto Faculdade API

## Sobre

Atualização do <a href="https://github.com/GustavoPendeza/projeto-escola-api">Projeto Escola API</a>. <br>
Quis usar o método de herança e melhorar o modelo do banco de dados do projeto.

Um sistema para cadastrar alunos, professores e funcionários da secretaria (Admins). Os professores serão cadastrados na grade de aulas e os alunos podem se matricular nelas (no máximo 4 aulas por vez), mas só se forem do curso ao que pertence.

## Diagrama

Para quem tiver curiosidade, vou deixar <a href="https://user-images.githubusercontent.com/53589614/190512409-bef9d33c-05a4-426d-a84b-4265b3c71219.png" target="_blank">aqui</a> o DER do projeto.

## Tecnologias

<div>
    <img alt="AdonisJS" title="AdonisJS" src="https://img.shields.io/badge/adonis%20js-220052?style=for-the-badge&logo=adonisjs&logoColor=white">
    <img alt="NodeJS" title="NodeJS" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
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

## Rotas

Separei as rotas por categorias para deixar mais organizado. Sendo elas:

- Sem Login
- Com Login (Qualquer tipo de usuário pode utilizar)
- Employee (Funcionários)
- Student (Alunos)
- Admin (Pessoal que administra a faculdade)

------------------------------------------

## Rotas - Sem Login

POST:
```bash
# Login
http://127.0.0.1:3333/api/login
```

------------------------------------------

## Rotas - Com Login

POST: 

```bash
# Logout
http://127.0.0.1:3333/api/logout
```

PATCH:
```bash
# Password Update
# Altera a senha do usuário autenticado
http://127.0.0.1:3333/api/update-password
```

------------------------------------------

## Rotas - Employee

PATCH:
```bash
# Enrollment Grade Update
# Alterar nota de um aluno
# :id de Enrollment
http://127.0.0.1:3333/api/enrollment/grade-update/:id
```

------------------------------------------

## Rotas - Student

### - Enrollment

GET:
```bash
# Enrollment List
# Lista todas as aulas em que o aluno autenticado está matriculado
http://127.0.0.1:3333/api/enrollment/list-student
```

POST:
```bash
# Enrollment Store
# Matricula o aluno autenticado em uma aula
http://127.0.0.1:3333/api/enrollment/store
```

PATCH:
```bash
# Unenroll
# Cancela matrícula do aluno autenticado em uma aula
# :id de Enrollment
http://127.0.0.1:3333/api/enrollment/unenroll/:id
```

### - Schedule

GET:
```bash
# Schedule List
# Lista todas as aulas pertencentes ao curso do aluno autenticado
http://127.0.0.1:3333/api/schedule/list-student
```

-----------------------------------------

## Rotas - Admin

### - Admin

GET:
```bash
# Admin List
# Lista todos os admins
http://127.0.0.1:3333/api/admin/list
```

POST:
```bash
# Admin Store
# Cadastra um funcionário como admin
http://127.0.0.1:3333/api/admin/store
```

DELETE:
```bash
# Admin Delete
# Deleta um funcionário da função de admin
# :id de Admin
http://127.0.0.1:3333/api/admin/delete/:id
```

-----------------------------------------

### - Course

GET:
```bash
# Course List
# Lista todos os cursos
http://127.0.0.1:3333/api/course/list
```

POST:
```bash
# Course Store
# Cadastra um curso
http://127.0.0.1:3333/api/course/store
```

PATCH:
```bash
# Course Update
# Altera um curso
# :id de Course
http://127.0.0.1:3333/api/course/update/:id
```

DELETE:
```bash
# Course Delete
# Deleta um curso
# :id de Course
http://127.0.0.1:3333/api/course/delete/:id
```

------------------------------------------

### - Employee

GET:
```bash
# Employee List
# Lista todos os funcionários
http://127.0.0.1:3333/api/employee/list
```

POST:
```bash
# Employee Register
# Cadastra um funcionário
http://127.0.0.1:3333/api/employee/register
```

PATCH:
```bash
# Employee Update
# Altera um funcionário (User e Employee)
# :id de User
http://127.0.0.1:3333/api/employee/update/:id
```

-----------------------------------------

### - Enrollment

GET:
```bash
# Enrollment List
# Lista todas as matrículas em aulas
http://127.0.0.1:3333/api/enrollment/list-admin
```

-----------------------------------------

### - Lesson

GET:
```bash
# Lesson List
# Lista todas as matérias
http://127.0.0.1:3333/api/lesson/list
```

POST:
```bash
# Lesson Store
# Cadastra uma matéria
http://127.0.0.1:3333/api/lesson/store
```

PATCH:
```bash
# Lesson Update
# Altera uma matéria
# :id de Lesson
http://127.0.0.1:3333/api/lesson/update/:id
```

DELETE:
```bash
# Lesson Delete
# Deleta uma matéria
# :id de Lesson
http://127.0.0.1:3333/api/lesson/delete/:id
```

-----------------------------------------

### - Schedule

GET:
```bash
# Schedule List
# Lista todas as aulas
http://127.0.0.1:3333/api/schedule/list-admin
```

POST:
```bash
# Schedule Store
# Cadastra uma aula
http://127.0.0.1:3333/api/schedule/store
```

PATCH:
```bash
# Schedule Update
# Altera a Lesson e o Employee(Professor) de uma aula
# id: de Schedule
http://127.0.0.1:3333/api/schedule/update/:id
```

DELETE:
```bash
# Schedule Delete
# Deleta uma aula
# :id de Schedule
http://127.0.0.1:3333/api/schedule/delete/:id
```

-----------------------------------------

### - Student

GET:
```bash
# Student List
# Lista todos os alunos
http://127.0.0.1:3333/api/student/list
```

POST:
```bash
# Student Register
# Cadastra um aluno
http://127.0.0.1:3333/api/student/register
```

PATCH:
```bash
# Student Expel
# Expulsa um aluno
# :id de User
http://127.0.0.1:3333/api/student/expel/:id
```

```bash
# Student Update
# Altera um aluno (User e Student)
# :id de User
http://127.0.0.1:3333/api/student/update/:id
```

-----------------------------------------

### - StudentCourses

GET:
```bash
# StudentCourses List
# Lista todas as matrículas de alunos em cursos
http://127.0.0.1:3333/api/student-course/list
```

POST:
```bash
# StudentCourses Store
# Matricula um aluno em um curso
http://127.0.0.1:3333/api/student-course/store
```

PATCH:
```bash
# StudentCourses Update
# Altera o status de uma matrícula de um curso
# :id de StudentCourses
http://127.0.0.1:3333/api/student-course/update/:id
```

-----------------------------------------

### - User

PATCH:
```bash
# Password Update
# Altera a senha de um usuário (Para caso algum Admin precise mudar a senha de qualquer usuário)
# :id de User
http://127.0.0.1:3333/api/user/update-password/:id
```
