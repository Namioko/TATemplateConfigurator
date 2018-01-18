import {validColor} from '../utils/validation';

test('color validation', () => {
    expect(validColor("#fff")).toBe(true);
    expect(validColor("#fff000")).toBe(true);
    expect(validColor("#ffffff00")).toBe(true);

    expect(validColor("#ffff")).toBe(false);
    expect(validColor("#fff000fff")).toBe(false);
    expect(validColor("#zzz")).toBe(false);
    expect(validColor("fff000")).toBe(false);
    expect(validColor("00#000")).toBe(false);
});