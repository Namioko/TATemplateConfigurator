export function validColor(color) {
    //#fff or #ffffff
    return color.match(/#[0-9a-f]{3}([0-9a-f]{3})?/i);
}