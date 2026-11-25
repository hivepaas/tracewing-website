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
  tracewing's tests draw them with no display attached, written to
  `target/shots/*.png`, resized to 1600×1000 and saved as WebP. Only ones that
  show no path of the machine they were made on — which rules out most of the
  local-mode shots, whose point is the programs they list by path:

  | The picture    | Is                           | From               |
  | -------------- | ---------------------------- | ------------------ |
  | `traffic.webp` | `3-request.png`              | `--test screen`    |
  | `rpc.webp`     | `92-rpc-transaction.png`     | `--test rpc`       |
  | `setup.webp`   | `306-wizard-local-app.png`   | `--test wizard`    |
  | `apps.webp`    | `local-5-on-keeping-two.png` | `--test local_tab` |
  | `reading.webp` | `124-readings-pane-body.png` | `--test reading`   |

  ```sh
  cargo test --release -p tracewing --features headless \
    --test screen --test rpc --test wizard --test local_tab --test reading
  ```

  The two paths in `apps.webp` are the test's own fixtures (`/usr/bin/curl` and
  `/opt/my build`), not the machine's.

- **Images.** `cd landing && node og/render.mjs` renders `public/og-image.png`
  from the hero's screenshot and the page's own words. It refuses to write a card
  whose text would run under the screenshot rather than writing a broken one.
- **Downloads.** `landing/src/data/downloads.ts` names the release's files as
  tracewing's releases name them: a new release changes `VERSION` only. The
  names follow the house's convention (packwing's releases) and were checked
  against tracewing's v0.1.0 release. Four things in that file have to agree with
  tracewing's release workflow and notes, and its comment lists them: the file
  names, which Linux packages are built, whether each build is signed (what
  `firstRun` tells the reader), and the oldest glibc the Linux build runs on.
- **Pricing.** There is no pricing page: what is free and what is paid has not
  been settled, and a price nobody has decided is not something to publish.
  `SHOW_PRICING` in `landing/src/data/site.ts` is where it goes when it is.
- **Release.** A tag `vX.Y.Z` builds the image (nginx serving the static site on 3202) and pushes it to `ghcr.io/hivepaas/tracewing-website`.
