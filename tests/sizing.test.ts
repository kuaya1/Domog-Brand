import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SIZE_CHART, suggestSize, isSizeOffered, toInches } from '../lib/sizing';

test('chart rows ascend in EU size and foot length', () => {
    for (let i = 1; i < SIZE_CHART.length; i++) {
        assert.ok(SIZE_CHART[i].eu > SIZE_CHART[i - 1].eu, `EU order at row ${i}`);
        assert.ok(SIZE_CHART[i].footLengthCm > SIZE_CHART[i - 1].footLengthCm, `length order at row ${i}`);
    }
});

test('invalid measurements get no suggestion', () => {
    for (const value of [0, -3, Number.NaN, Number.POSITIVE_INFINITY]) {
        assert.equal(suggestSize(value, 'cm').status, 'invalid');
    }
});

test('measurements far outside the chart get no suggestion', () => {
    assert.equal(suggestSize(15, 'cm').status, 'out-of-range');
    assert.equal(suggestSize(35, 'cm').status, 'out-of-range');
});

test('suggestions never decrease as the foot gets longer', () => {
    let previous = 0;
    for (let mm = 215; mm <= 295; mm++) {
        const result = suggestSize(mm / 10, 'cm');
        if (result.status !== 'ok') continue;
        assert.ok(result.row.eu >= previous, `${mm / 10} cm suggested EU ${result.row.eu} after EU ${previous}`);
        previous = result.row.eu;
    }
});

test('inches and centimetres give the same suggestion', () => {
    const cm = suggestSize(25, 'cm');
    const inches = suggestSize(25 / 2.54, 'in');
    assert.equal(cm.status, 'ok');
    assert.deepEqual(inches, cm);
    assert.equal(toInches(25.4), 10);
});

test('size availability matches the product size strings exactly', () => {
    const row36 = SIZE_CHART.find((r) => r.eu === 36)!;
    const row40 = SIZE_CHART.find((r) => r.eu === 40)!;
    const tengerSizes = ['40', '41', '42', '43', '44', '45'];
    assert.equal(isSizeOffered(row36, tengerSizes), false);
    assert.equal(isSizeOffered(row40, tengerSizes), true);
});
