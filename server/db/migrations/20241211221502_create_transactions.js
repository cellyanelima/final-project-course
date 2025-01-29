/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.integer('id').primary()
    table.integer('user_id') // Foreign key to users
    table.string('description')
    table.decimal('amount', 10, 2)
    table.enum('frequency', [
      'One-Off',
      'Daily',
      'Weekly',
      'Fortnightly',
      'Monthly',
      'Annually',
    ])
    table.enum('type', ['income', 'expense'])
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
  return knex.schema.dropTable('transactions')
}
