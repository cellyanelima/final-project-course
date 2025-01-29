/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('goals').del()

  // Inserts seed entries
  await knex('goals').insert([
    {
      id: 1,
      user_id: 1,
      title: 'Vacation Fund',
      target_amount: 5000.0,
      current_amount: 1500.0,
    },
    {
      id: 2,
      user_id: 1,
      title: 'Emergency Fund',
      target_amount: 10000.0,
      current_amount: 2500.0,
    },
    {
      id: 3,
      user_id: 1,
      title: 'New Car',
      target_amount: 20000.0,
      current_amount: 5000.0,
    },
  ])
}
