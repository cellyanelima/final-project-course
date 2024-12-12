/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.integer('id').primary()
    table.integer('user_id')
    table.string('description')
    table.decimal('amount', 10, 2)
    table.enum('type', ['income', 'expense'])
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('transactions')
}
