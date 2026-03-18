function isPositiveNumber(num) {
    return typeof num === 'number' && num > 0;
}

function addition(x, y) {
    return x + y;
}

describe('Álatlános tesztek szám ellenőrzése', () => {
    it('Negatív szám estén hamis értlet kell adnia', () => {
        const eredmeny = isPositiveNumber(-3);
        expect(eredmeny).toBe(false);
    });

    it('Pozitív szám esetén igaz értéket kell adnia', () => {
        const eredmeny = isPositiveNumber(1);
        expect(eredmeny).toBe(true);
    });

    it('Szöveg esetén hamis értéket kell adnia', () => {
        const eredmeny = isPositiveNumber("teszt 😍");
        expect(eredmeny).toBe(false);
    });
});

describe('Összeadás ellenőrzése', () => {
    it('4 + 6 = 10-nek kell lennie', () => {
        const eredmeny = addition(4,6);
        expect(eredmeny).toEqual(10);
    });
    
});