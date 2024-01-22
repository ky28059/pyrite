/**
 * Converts a hexadecimal color string to a tuple of `[r, g, b]`.
 * See {@link https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb this StackOverflow answer}.
 *
 * Original function ported from
 * {@link https://github.com/GunnWATT/watt/blob/main/client/src/util/progressBarColor.ts WATT}.
 *
 * @param hex The hex color string.
 * @returns A tuple of `[r, g, b]`, or `null` if the hex was invalid.
 */
export function hexToRgb(hex: string): [number, number, number] | null {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})(?:[a-f\d]{2})?$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}
