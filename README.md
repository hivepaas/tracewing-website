# tracewing-website

The website of [tracewing](https://github.com/hivepaas/tracewing), at
[tracewing.app](https://tracewing.app): a landing page built with
[Astro](https://astro.build), in `landing/`.

```sh
yarn install
yarn dev            # http://localhost:3202
yarn build          # landing/dist
yarn lint
```

- **Screenshots.** The pictures in `landing/public/shots/` are the app's own, as
  tracewing's tests draw them with no display attached
  (`cargo test --release -p tracewing --features headless --test screen --test rpc`,
  written to `target/shots/*.png`), resized to 1600×1000 and saved as WebP. Only
  ones that show no path of the machine they were made on: `traffic.webp` is
  `3-request.png` and `rpc.webp` is `92-rpc-transaction.png`.
- **Images.** `cd landing && node og/render.mjs` renders `public/og-image.png`
  from the hero's screenshot and the page's own words. It refuses to write a card
  whose text would run under the screenshot rather than writing a broken one.
- **Downloads.** `landing/src/data/downloads.ts` names the release's files as
  tracewing's releases name them: a new release changes `VERSION` only. The
  names follow the house's convention (packwing's releases), and tracewing has
  no release workflow yet — so when one is written, four things in that file
  have to agree with it, and its comment lists them: the file names, which Linux
  packages are built, whether each build is signed (what `firstRun` tells the
  reader), and the oldest glibc the Linux build runs on.
- **Pricing.** There is no pricing page: what is free and what is paid has not
  been settled, and a price nobody has decided is not something to publish.
  `SHOW_PRICING` in `landing/src/data/site.ts` is where it goes when it is.
- **Release.** A tag `vX.Y.Z` builds the image (nginx serving the static site on 3202) and pushes it to `ghcr.io/hivepaas/tracewing-website`.
