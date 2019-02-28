import { check4InARow } from './board'

test('checks if there is 4 in a row and returns winner', () => {
    expect(check4InARow(['r','r','r','r'])).toBe('r');
    expect(check4InARow([null,null,null,null])).toBe(false);
    expect(check4InARow(['r',null,'r','r','r',])).toBe(false);

});