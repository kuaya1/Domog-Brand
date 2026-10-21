import { test } from 'node:test';
import assert from 'node:assert/strict';
import en from '../messages/en.json';
import mn from '../messages/mn.json';

type Tree = { [key: string]: string | Tree };

function leaves(tree: Tree, prefix = ''): Map<string, string> {
    const out = new Map<string, string>();
    for (const [key, value] of Object.entries(tree)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'string') out.set(path, value);
        else for (const [p, v] of leaves(value, path)) out.set(p, v);
    }
    return out;
}

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

const enLeaves = leaves(en as Tree);
const mnLeaves = leaves(mn as Tree);

test('English and Mongolian catalogs have the same keys', () => {
    const missingInMn = [...enLeaves.keys()].filter((k) => !mnLeaves.has(k));
    const missingInEn = [...mnLeaves.keys()].filter((k) => !enLeaves.has(k));
    assert.deepEqual(missingInMn, [], 'keys missing from mn.json');
    assert.deepEqual(missingInEn, [], 'keys missing from en.json');
});

test('no message is empty', () => {
    const empty = [...enLeaves, ...mnLeaves].filter(([, v]) => v.trim() === '').map(([k]) => k);
    assert.deepEqual(empty, []);
});

test('placeholders match between languages', () => {
    const mismatched = [...enLeaves.keys()].filter(
        (k) => mnLeaves.has(k) && placeholders(enLeaves.get(k)!).join() !== placeholders(mnLeaves.get(k)!).join()
    );
    assert.deepEqual(mismatched, []);
});

test('plural messages define both one and other', () => {
    const pluralParents = new Set(
        [...enLeaves.keys()].filter((k) => /\.(one|other)$/.test(k)).map((k) => k.replace(/\.(one|other)$/, ''))
    );
    for (const parent of pluralParents) {
        for (const leavesOf of [enLeaves, mnLeaves]) {
            assert.ok(leavesOf.has(`${parent}.one`) && leavesOf.has(`${parent}.other`), `${parent} needs one and other`);
        }
    }
});

// Latin words allowed inside Mongolian copy: size systems, currency, platform names.
const ALLOWED_LATIN = new Set(['EU', 'US', 'UK', 'USD', 'Instagram', 'Facebook']);

test('Mongolian messages contain no stray English words', () => {
    const offenders: string[] = [];
    for (const [key, value] of mnLeaves) {
        const withoutPlaceholders = value.replace(/\{\w+\}|%s/g, '');
        const latinWords = withoutPlaceholders.match(/[A-Za-z]+/g) ?? [];
        const stray = latinWords.filter((w) => !ALLOWED_LATIN.has(w));
        if (stray.length) offenders.push(`${key}: ${stray.join(' ')}`);
    }
    assert.deepEqual(offenders, []);
});
