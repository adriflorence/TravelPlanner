const formHandler = require('./formHandler.js')

test("Correctly calculates days between two dates", () => {
    const start_date = new Date('2020-05-16')
    const end_date = new Date('2020-05-20')

    expect(formHandler.daysBetween(start_date, end_date)).toBe(4)
})