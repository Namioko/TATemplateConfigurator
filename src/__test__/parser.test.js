import {extractVariable} from '../utils/parser';

test('parse numbers', () => {
    const code = "static const IntVal = 17;";

    const result = extractVariable(code, "IntVal");
    expect(result).toBe(17);
});

test('parse negative numbers', () => {
    const code = "static const Negative = -100;";

    const result = extractVariable(code, "Negative");
    expect(result).toBe(-100);
});

test('parse string', () => {
    const code = "static var StrVal = \"I'm string value!\"";

    const result = extractVariable(code, "StrVal");
    expect(result).toBe("I'm string value!");
});

test('parse null', () => {
    const code = "static var NullVal = null;";

    const result = extractVariable(code, "NullVal");
    expect(result).toBe(null);
});

test('parse boolean', () => {
    const code = "static const BoolVal = true;";

    const result = extractVariable(code, "BoolVal");
    expect(result).toBe(true);
});

test('parse int array', () => {
    const code = "static var Arr = [10, 20, -5, 14];";
    const expected = [10, 20, -5, 14]

    const result = extractVariable(code, "Arr");
    arrayСomparison(result, expected);
});

test('parse string array', () => {
    const code = "static const Arr = ['first', 'second', '3', '4'];";
    const expected = ['first', 'second', '3', '4'];

    const result = extractVariable(code, "Arr");
    arrayСomparison(result, expected);
});

test('parse nested array', () => {
    const code = "static const NestedArray = [[1, 2, 3], [\"1\", \"2\", \"3\"]];";
    const expectedFirstArray = [1,2,3];
    const expectedSecondArray = ["1", "2", "3"];

    const result = extractVariable(code, "NestedArray");
    expect(result.length).toBe(2);

    arrayСomparison(result[0], expectedFirstArray);
    arrayСomparison(result[1], expectedSecondArray);
});

test('parse object', () => {
    const code = "static const Obj = {foo: \"bar\", \"bar\": 1};";

    const result = extractVariable(code, "Obj");
    expect(result["foo"]).toBe("bar");
    expect(result["bar"]).toBe(1);
});

function arrayСomparison(target, expected) {
    expect(target.length).toBe(expected.length);

    for(let i = 0; i < expected.length; i++) {
        expect(target[i]).toBe(expected[i]);
    }
}