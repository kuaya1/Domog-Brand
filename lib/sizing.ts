/**
 * The one size chart and calculator used by the size-guide page and the
 * product size modal.
 *
 * Source: the chart previously published on the standalone size guide
 * (/size-guide). The product modal carried a different chart; that one was
 * removed so both views agree. These values have not been confirmed by the
 * family yet (see docs/content/OPEN-QUESTIONS.md), and no conversions were
 * added or recalculated here. Inches are derived from centimetres.
 */

export interface SizeRow {
    /** EU size, the system products are sold in. */
    eu: number;
    us: number;
    uk: number;
    /** Foot length in centimetres. */
    footLengthCm: number;
}

export const SIZE_CHART: readonly SizeRow[] = [
    { eu: 36, us: 4, uk: 3.5, footLengthCm: 22.5 },
    { eu: 37, us: 5, uk: 4, footLengthCm: 23 },
    { eu: 38, us: 5.5, uk: 4.5, footLengthCm: 23.5 },
    { eu: 39, us: 6, uk: 5.5, footLengthCm: 24.5 },
    { eu: 40, us: 7, uk: 6.5, footLengthCm: 25.5 },
    { eu: 41, us: 8, uk: 7.5, footLengthCm: 26 },
    { eu: 42, us: 8.5, uk: 8, footLengthCm: 26.5 },
    { eu: 43, us: 9.5, uk: 9, footLengthCm: 27.5 },
    { eu: 44, us: 10.5, uk: 10, footLengthCm: 28.5 },
    { eu: 45, us: 11.5, uk: 11, footLengthCm: 29 },
];

const CM_PER_INCH = 2.54;

/** Comfort allowance added to the measured foot length (as on the original guide). */
const COMFORT_ALLOWANCE_CM = 0.5;

/** Measurements further than this from the chart's ends get no suggestion. */
const OUT_OF_RANGE_MARGIN_CM = 1;

export type LengthUnit = 'cm' | 'in';

export function toCentimetres(length: number, unit: LengthUnit): number {
    return unit === 'in' ? length * CM_PER_INCH : length;
}

export function toInches(cm: number): number {
    return Math.round((cm / CM_PER_INCH) * 100) / 100;
}

export type SizeSuggestion =
    | { status: 'ok'; row: SizeRow }
    | { status: 'invalid' }
    | { status: 'out-of-range' };

/**
 * Suggest an EU size for a measured foot length: the chart row whose foot
 * length is closest to the measurement plus a small comfort allowance. Ties
 * go to the larger size, matching the guide's "between sizes, choose the
 * larger size" advice.
 */
export function suggestSize(length: number, unit: LengthUnit): SizeSuggestion {
    if (!Number.isFinite(length) || length <= 0) return { status: 'invalid' };

    const target = toCentimetres(length, unit) + COMFORT_ALLOWANCE_CM;
    const smallest = SIZE_CHART[0].footLengthCm;
    const largest = SIZE_CHART[SIZE_CHART.length - 1].footLengthCm;

    if (target < smallest - OUT_OF_RANGE_MARGIN_CM || target > largest + OUT_OF_RANGE_MARGIN_CM) {
        return { status: 'out-of-range' };
    }

    let best = SIZE_CHART[0];
    for (const row of SIZE_CHART) {
        if (Math.abs(row.footLengthCm - target) <= Math.abs(best.footLengthCm - target)) {
            best = row;
        }
    }
    return { status: 'ok', row: best };
}

/** Whether a product offers the chart row's EU size. Products list sizes as plain EU strings. */
export function isSizeOffered(row: SizeRow, offeredSizes: readonly string[]): boolean {
    return offeredSizes.includes(String(row.eu));
}
