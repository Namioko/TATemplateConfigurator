export function arrayСomparison(target, expected) {
    expect(target.length).toBe(expected.length);

    for(let i = 0; i < expected.length; i++) {
        expect(target[i]).toBe(expected[i]);
    }
}