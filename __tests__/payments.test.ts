import { createRevenueReport, parsePayments } from '../src/payments.js'

describe('payments.ts', () => {
  it('parses numeric and object payments', () => {
    expect(
      parsePayments('[1.99, {"amount": "2.50", "description": "PHU AI Pro"}]')
    ).toEqual([
      { amount: 1.99, description: undefined },
      { amount: 2.5, description: 'PHU AI Pro' }
    ])
  })

  it('rejects non-array JSON input', () => {
    expect(() => parsePayments('{"amount": 1.99}')).toThrow(
      'payments must be a JSON array'
    )
  })

  it('renders a report for empty and populated payment lists', () => {
    expect(createRevenueReport([])).toBe(
      'Stripe Revenue\nTotal Revenue: $0.00\nPayments:\n- No payments found.'
    )

    expect(
      createRevenueReport([
        { amount: 1.99 },
        { amount: 3, description: 'New PHU AI payment received!' }
      ])
    ).toBe(
      'Stripe Revenue\n' +
        'Total Revenue: $4.99\n' +
        'Payments:\n' +
        '- Payment 1: $1.99\n' +
        '- Payment 2: $3.00 — New PHU AI payment received!'
    )
  })
})
