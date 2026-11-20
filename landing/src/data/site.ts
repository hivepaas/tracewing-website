// Addresses the landing site links to from more than one page.

export const SITE_URL = 'https://tracewing.app';
export const GITHUB_URL = 'https://github.com/hivepaas/tracewing';
export const HIVEPAAS_URL = 'https://hivepaas.com';
export const SHELLWING_URL = 'https://shellwing.app';
export const PACKWING_URL = 'https://packwing.app';

// Whether /pricing is offered. There is no pricing page yet: what is free and
// what is paid is not settled, and a price nobody has decided is not something
// to publish. The features table in the repository carries the tiers it has so
// far.
export const SHOW_PRICING = false;

// The repository's docs.
export const BUILD_DOC_URL = `${GITHUB_URL}/blob/main/docs/building.md`;
export const CAPTURING_DOC_URL = `${GITHUB_URL}/blob/main/docs/capturing.md`;
export const FEATURES_DOC_URL = `${GITHUB_URL}/blob/main/docs/features.md`;
export const MEASUREMENTS_DOC_URL = `${GITHUB_URL}/blob/main/docs/measurements.md`;
export const SCRIPTS_DOC_URL = `${GITHUB_URL}/blob/main/docs/scripts.md`;
export const LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`;
export const CONTRIBUTING_URL = `${GITHUB_URL}/blob/main/CONTRIBUTING.md`;
export const ISSUES_URL = `${GITHUB_URL}/issues`;

// The hive's products, for the navbar's Products menu and the footer: this
// site's own app is left out of them, the rest link to their own sites.
// The icons are their app icons, in public/products/.

export interface Product {
  id: string;
  name: string;
  href: string;
  icon: string;
  tagline: string;
  description: string;
}

// This site's own app, so the menu can leave it out.
export const PRODUCT_ID = 'tracewing';

export const PRODUCTS: Product[] = [
  {
    id: 'shellwing',
    name: 'shellwing',
    href: SHELLWING_URL,
    icon: '/products/shellwing.svg',
    tagline: 'SSH client',
    description:
      'Tabs, split panes, SFTP and port forwarding in a GPU-rendered terminal, with an encrypted vault that syncs between your devices.',
  },
  {
    id: 'tracewing',
    name: 'tracewing',
    href: SITE_URL,
    icon: '/products/tracewing.svg',
    tagline: 'HTTP debugging proxy',
    description:
      'See, pause and change every request your mobile apps, desktop apps, servers and AI agents make — what DevTools cannot reach.',
  },
  {
    id: 'packwing',
    name: 'packwing',
    href: PACKWING_URL,
    icon: '/products/packwing.svg',
    tagline: 'File archiver',
    description:
      'ZIP, 7z, tar.xz and tar.zst made and opened on all of your cores at once. RAR, disc images and age files, opened safely.',
  },
  {
    id: 'hivepaas',
    name: 'HivePaaS',
    href: HIVEPAAS_URL,
    icon: '/products/hivepaas.svg',
    tagline: 'Self-hosted PaaS',
    description:
      'Deploy your apps on your own servers: a lightweight platform on Docker Swarm, open source, with no vendor lock-in.',
  },
];
