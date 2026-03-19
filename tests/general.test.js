function isPositiveNumber(num){
    return typeof num === 'number' && num > 0
}

function additon(x, y){
    return x+y+1
}

describe('Általános tesztek szám elleőrzése', () => {
    it('Negatív szám esetén hamis értéket kell adnia', () => {
        const eredmeny = isPositiveNumber(-1)
        expect(eredmeny).toBe(false)
    });
    it('Pozitív szám esetén igaz értéket kell adnia', () => {
        const eredmeny = isPositiveNumber(5)
        expect(eredmeny).toBe(true)
    });

    it('Szöveg esetén hamis értéket kell adnia', () => {
        const eredmeny = isPositiveNumber("asd")
        expect(eredmeny).toBe(false)
    });    
});

describe('Összeadás ellenőrzése', () => {
    it('4 + 6 = 10-nek kell lennie', () => {
        const eredmeny = additon(4,6)
        expect(eredmeny).toEqual(10)
    });
});