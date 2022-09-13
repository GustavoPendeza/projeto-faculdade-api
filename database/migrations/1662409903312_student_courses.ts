import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'student_courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('student_id')
        .unsigned()
        .references('students.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('course_id')
        .unsigned()
        .references('courses.id')
        .onDelete('CASCADE')
        .notNullable()
      table.string('status', 255).notNullable().defaultTo("Ativo")
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
