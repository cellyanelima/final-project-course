/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()

  // Inserts seed entries
  await knex('transactions').insert([
    {
      id: 1,
      user_id: 1,
      description: 'Salary',
      amount: 7500.0,
      type: 'income',
    },
    {
      id: 2,
      user_id: 1,
      description: 'Groceries',
      amount: 200.0,
      type: 'expense',
    },
    {
      id: 3,
      user_id: 2,
      description: 'Salary',
      amount: 5000.0,
      type: 'income',
    },
    {
      id: 4,
      user_id: 2,
      description: 'Utilities',
      amount: 150.0,
      type: 'expense',
    },
    {
      id: 5,
      user_id: 3,
      description: 'Freelance Work',
      amount: 1000.0,
      type: 'income',
    },
    {
      id: 6,
      user_id: 3,
      description: 'Dining Out',
      amount: 50.0,
      type: 'expense',
    },
  ])
}
