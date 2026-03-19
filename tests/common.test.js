function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return null;
    }
    return a * b;
}

function double(n) {
    return n * 2; 
}

describe('Szorzás vizsgálata', () => {
    it('2-es és 3-as szorzata 6 kell legyen', () => {
        const eredmeny = multiply(2, 3);
        expect(eredmeny).toEqual(6);
    });

    it('Sztringek esetén null-t kell kapni', () => {
        const eredmeny = multiply('asd', 'nhjk');
        expect(eredmeny).toBeNull();
    });

    it('2 és 3 szorzata legyen nagyobb mint 5', () => {
        const eredmeny = multiply(2, 3);
        expect(eredmeny).toBeGreaterThan(5);
    });

    it('2 és 3 szorzata legyen kisebb mint 7', () => {
        const eredmeny = multiply(2, 3);
        expect(eredmeny).toBeLessThan(7);
    });
});

describe('Duplázás vizsgálata', () => {
    it('2 megadása esetén 4-et kell kapni', () => {
        const eredmeny = double(2);
        expect(eredmeny).toEqual(4);
    });

    it('3 megadása esetén 6-ot kell kapni', () => {
        const eredmeny = double(3);
        expect(eredmeny).toEqual(6);
    });    
});