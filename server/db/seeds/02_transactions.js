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
      frequency: 'Weekly',
      type: 'income',
    },
    {
      id: 2,
      user_id: 1,
      description: 'Groceries',
      amount: 200.0,
      frequency: 'Monthly',
      type: 'expense',
    },
    {
      id: 3,
      user_id: 1,
      description: 'Utilities',
      amount: 500.0,
      frequency: 'Fortnightly',
      type: 'expense',
    },
    {
      id: 4,
      user_id: 1,
      description: 'Broadband',
      frequency: 'Monthly',
      amount: 150.0,
      type: 'expense',
    },
    {
      id: 5,
      user_id: 1,
      description: 'Dining Out',
      frequency: 'Weekly',
      amount: 100.0,
      type: 'expense',
    },
    {
      id: 6,
      user_id: 1,
      description: 'Rent House',
      frequency: 'Weekly',
      amount: 3000.0,
      type: 'expense',
    },
  ])
}
