import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cn } from '../lib/utils';

test('cn keeps a text colour next to a custom font size', () => {
    // Regression: primary buttons lost text-cream-50 because text-label-lg
    // was treated as a competing colour class.
    const classes = cn('bg-charcoal-900 text-cream-50', 'text-label-lg uppercase').split(' ');
    assert.ok(classes.includes('text-cream-50'));
    assert.ok(classes.includes('text-label-lg'));
});

test('cn still resolves conflicting font sizes', () => {
    assert.equal(cn('text-label-lg', 'text-body-md'), 'text-body-md');
});
