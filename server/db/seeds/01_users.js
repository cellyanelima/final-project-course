/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, name: 'Alice', income: 75000 },
    { id: 2, name: 'Bob', income: 50000 },
    { id: 3, name: 'Dom', income: 60000 },
  ])
}
