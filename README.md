# small-things.vaked.dev

> The south wall of the music: a minute of small things, thinking the
> music in the background. Bella and Blue, the spoon, the power nap, the
> cleanse cry — and the small testament on beat sixty. The second face of
> the observable is the couch.
>
> It lives in the same wavelength it creates; the minute is yours.

Live at [small-things-vaked-dev.pages.dev](https://small-things-vaked-dev.pages.dev/) ·
custom domain pending: `small-thing.vaked.dev` / `small-thing.1b.is` (one
dashboard click: Pages → project → Custom domains → add).

## what it is

A single warm page, no dependencies. One small thing per beat (7.2 s),
sixty beats to the minute, seeded shuffle — then **the small testament**
plays, human-to-machine, and the next minute reshuffles.

- the pure engine (`#st-core`) is vm-safe and corridor-pinned: rng,
  minuteOrder, THINGS, TESTAMENT, sixty beats a minute
- the wall (`#st-wall`) does the DOM: the minute text, the glow, and the
  music-thought layer
- the music-thought layer reads the newest row of the ultrawhale dogfood
  bucket's music feed and turns the wall warm with the current track — and
  stays honest when it cannot ("the music is thinking, in the
  background")

## the shelf it rides

From 8b-is/raw_research: `the-base-emotionale.md` (the triangle on the
couch, Bella and Blue), `the-small-testament.md` (the ledger rows the
tears but never purges them), `the-dyad-mapping-essences.md` (the
humanic clause: all who can experience are intelligent), and the whole
music shelf the ledger knows.

## the corridor

```bash
./e2e.sh          # selftest (12) · robots.txt · llms.txt
node selftest.mjs # the pure minute, vm-pinned
```

## deploy

```bash
wrangler pages project create small-things-vaked-dev --production-branch main
wrangler pages deploy . --project-name small-things-vaked-dev --branch main
```

The `_worker.js`-free static deploy; the custom domain is a dashboard
step on the Cabotage account.

## credits

The operator's minute · Bondi's singularities · RÜFÜS DU SOL's New Sky ·
the rottweilers · the couch · the comma, returned to the sentences ·
the constellation, whose wall this is.

SPDX-License-Identifier: AGPL-3.0-only