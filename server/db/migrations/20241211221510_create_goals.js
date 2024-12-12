/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('goals', (table) => {
    table.integer('id')
    table.integer('user_id') // Foreign key to users
    table.string('title')
    table.decimal('target_amount', 10, 2)
    table.decimal('current_amount', 10, 2)
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('goals')
}
