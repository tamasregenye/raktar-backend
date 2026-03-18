function isPositiveNumber(num) {
    return typeof num === 'number' && num > 0;
}

function addition(x, y) {
    return x + y;
}

describe('Pozitivitás ellenőrzése', () => {
    it('Negatív szám esetén hamis értéket kell adnia', () => {
        const eredmeny = isPositiveNumber(-1);
        expect(eredmeny).toBe(false);
    });

    it('Pozitív szám esetén igaz értéket kell adnia ', () => {
        const eredmeny = isPositiveNumber(5);
        expect(eredmeny).toBe(true)
    });

    it('Szöveg esetén hamis értéket kell adnia ', () => {
        const eredmeny = isPositiveNumber("Ez egy szöveg :)👌");
        expect(eredmeny).toBe(false)
    });
});

describe('Összeadás ellenőrzése', () => {
    it('4 + 6 = 10-nek kell kellnie', () => {
        const eredmeny = addition(4,6);
        expect(eredmeny).toEqual(10);
    });
});