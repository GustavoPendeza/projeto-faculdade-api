import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'enrollments'

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
        .integer('schedule_id')
        .unsigned()
        .references('schedules.id')
        .onDelete('CASCADE')
        .notNullable()
      table.float('grade', 3, 1).notNullable().defaultTo(0)
      table.string('status', 255).notNullable().defaultTo('Ativo')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
