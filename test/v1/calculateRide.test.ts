import { calculateFare } from '../../src/v2/calculateRide'

test("Deve calcular uma corrida em horário normal", function() {
    const fare = calculateFare([{distance: 10, date: new Date("2021-03-10T10:00:00")}]);
    expect(fare).toBe(21);
})

test("Deve calcular uma corrida em horário noturno", function() {
    const fare = calculateFare([{distance: 10, date: new Date("2021-03-10T22:00:00")}]);
    expect(fare).toBe(39);
})

test("Deve calcular uma corrida no domingo", function() {
    const fare = calculateFare([{distance: 10, date: new Date("2021-03-07T10:00:00")}]);
    expect(fare).toBe(29);
})

test("Deve calcular uma corrida no domingo em horarário noturno", function() {
    const fare = calculateFare([{distance: 10, date: new Date("2021-03-07T22:00:00")}]);
    expect(fare).toBe(50);
})

test("Não deve calcular corrida com distância inválida", function() {
    expect( () => calculateFare([{distance: -10, date: new Date("2021-03-07T22:00:00")}])).toThrow(new Error('Invalid Distance'));
})

test("Não deve calcular corrida com data inválida", function() {
    expect( () => calculateFare([{distance: 10, date: new Date("javascript")}])).toThrow(new Error('Invalid Date'));
})

test("Deve calcular uma corrida em com valor minímo", function() {
    const fare = calculateFare([{distance: 3, date: new Date("2021-03-10T10:00:00")}]);
    expect(fare).toBe(10);
})
