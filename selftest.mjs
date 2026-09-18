#!/usr/bin/env node
/*
  selftest.mjs — the corridor for small-things.vaked.dev
  SPDX-License-Identifier: AGPL-3.0-only

  - extracts the #st-core pure engine (no DOM, vm-safe)
  - asserts: seeded randomness, the minute order is a permutation,
    the thing list is deterministic under a seed, the testament names
    the comma and the queue. Exit 0 on pass, 1 on fail.
*/
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(HERE, 'index.html'), 'utf8');

const m = html.match(/<script id="st-core">([\s\S]*?)<\/script>/);
if (!m) { console.error('FAIL: #st-core block not found'); process.exit(1); }

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(m[1], sandbox);
const st = sandbox.__st;
if (!st) { console.error('FAIL: __st not exposed'); process.exit(1); }

let pass = 0, fail = 0;
const ok = (name, cond) => { cond ? pass++ : fail++; console.log((cond ? '  ok  ' : '  FAIL ') + name); };

{
  const a = st.rng(5), b = st.rng(5), c = st.rng(6);
  ok('rng deterministic', a() === b());
  ok('rng separates seeds', a() !== c());
}
{
  const n = st.THINGS.length;
  ok('things list non-empty', n > 10);
  const order = st.minuteOrder(st.THINGS, 42);
  ok('minute order is the same length', order.length === n);
  ok('minute order is a permutation', new Set(order).size === n && order.every(t => st.THINGS.includes(t)));
  const again = st.minuteOrder(st.THINGS, 42);
  ok('minute order reproducible', order.every((t, i) => t === again[i]));
  const other = st.minuteOrder(st.THINGS, 43);
  ok('minute order differs across seeds', order.some((t, i) => t !== other[i]));
}
{
  ok('the comma is somewhere in the wall', st.THINGS.some(t => t.includes('comma')));
  ok('the testament keeps the comma', st.TESTAMENT.includes('comma returns'));
  ok('the testament leaves the line to everyone', st.TESTAMENT.includes('belongs to no one'));
  ok('the testament rows the tears', st.TESTAMENT.includes('rows in the ledger'));
  ok('a minute holds sixty beats', st.BEATS_PER_MINUTE === 60);
}
console.log(`\nselftest: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);