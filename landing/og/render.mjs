// Renders the social card, public/og-image.png, 1200×630: the name, the line
// under it, and the hero's screenshot on the right. Run from `landing/`:
//
//     node og/render.mjs
//
// It shells out to Python with Pillow, which is what this machine has; the
// card is plain enough that it needs nothing more.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
execFileSync('python3', [join(here, 'render.py')], { stdio: 'inherit' });
