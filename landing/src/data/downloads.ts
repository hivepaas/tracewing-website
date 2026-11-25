// What the download section offers: the release's files, named as tracewing's
// release names them. A new release changes VERSION only.
//
// The names follow the house's convention, the one packwing's releases use
// (`<app>_<version>_<os>_<arch>.<kind>`, and `<app>_<version>_<arch>.deb`),
// and were checked against the files of tracewing's v0.1.0 release. Four
// things here have to agree with tracewing's release workflow
// (.github/workflows/release.yml) and its notes (docs/releases/):
//
//   1. the file names below,
//   2. which Linux packages are built (.deb and .rpm here),
//   3. whether each build is signed, which `firstRun` tells the reader,
//   4. the oldest glibc the Linux build runs on, in `requires`.

import { GITHUB_URL } from './site';

export const VERSION = '0.1.2';
export const RELEASES_URL = `${GITHUB_URL}/releases`;
export const RELEASE_URL = VERSION
  ? `${GITHUB_URL}/releases/tag/v${VERSION}`
  : RELEASES_URL;

/** True once `VERSION` names a release, which is what the page asks. */
export const RELEASED = VERSION !== '';

const file = (name: string) =>
  `${GITHUB_URL}/releases/download/v${VERSION}/${name}`;
const v = VERSION;

export type OsId = 'linux' | 'macos' | 'windows';

export interface Download {
  label: string;
  /** What it is, beside the label: the file's kind or the machine. */
  note: string;
  href: string;
  /** The one the big button offers for this system. */
  primary?: boolean;
}

export interface Os {
  id: OsId;
  name: string;
  requires: string;
  downloads: Download[];
  /** How to install it, in a few steps. */
  steps: string[];
  /** The first launch: what the system asks, and what tracewing asks. */
  firstRun: string;
  /** Commands to paste, if any. */
  commands?: string;
}

/** A system with an app on the way: a tab that says so, and no files. */
export interface ComingSoon {
  id: OsId;
  name: string;
  text: string;
}

export const systems: Os[] = [
  {
    id: 'linux',
    name: 'Linux',
    requires:
      'glibc 2.35 or later (Ubuntu 22.04, Debian 12), Wayland or X11, x86_64 or aarch64',
    downloads: [
      {
        label: 'Debian / Ubuntu',
        note: 'amd64 · .deb',
        href: file(`tracewing_${v}_amd64.deb`),
        primary: true,
      },
      {
        label: 'Debian / Ubuntu',
        note: 'arm64 · .deb',
        href: file(`tracewing_${v}_arm64.deb`),
      },
      {
        label: 'Fedora / openSUSE',
        note: 'x86_64 · .rpm',
        href: file(`tracewing_${v}_x86_64.rpm`),
      },
      {
        label: 'Fedora / openSUSE',
        note: 'aarch64 · .rpm',
        href: file(`tracewing_${v}_aarch64.rpm`),
      },
    ],
    steps: [
      'Debian or Ubuntu: install the .deb with apt. Fedora: the .rpm with dnf. openSUSE: with zypper.',
      'Open tracewing. Its proxy listens on 127.0.0.1:9090.',
      'Set up walks through trusting the certificate authority it just made, and through sending this computer’s traffic to it.',
    ],
    firstRun:
      'The .rpm is not signed: dnf warns and goes on, and zypper needs --no-gpg-checks.',
    commands: `# Debian / Ubuntu
curl -LO ${file(`tracewing_${v}_amd64.deb`)}
sudo apt install ./tracewing_${v}_amd64.deb

# Fedora
curl -LO ${file(`tracewing_${v}_x86_64.rpm`)}
sudo dnf install ./tracewing_${v}_x86_64.rpm

# openSUSE
curl -LO ${file(`tracewing_${v}_x86_64.rpm`)}
sudo zypper --no-gpg-checks install ./tracewing_${v}_x86_64.rpm`,
  },
  {
    id: 'macos',
    name: 'macOS',
    requires: 'macOS 13 Ventura or later',
    downloads: [
      {
        label: 'Apple silicon',
        note: 'M1 and later · .dmg',
        href: file(`tracewing_${v}_macos_aarch64.dmg`),
        primary: true,
      },
      {
        label: 'Intel',
        note: '.dmg',
        href: file(`tracewing_${v}_macos_x86_64.dmg`),
      },
    ],
    steps: [
      'Open the .dmg and drag tracewing into Applications.',
      'Open it from Applications or Spotlight. Its proxy listens on 127.0.0.1:9090.',
      'Set up walks through trusting the certificate authority it just made, and through sending this Mac’s traffic to it.',
    ],
    firstRun:
      'macOS asks once whether to open an app downloaded from the internet: choose Open. Trusting the authority asks for your password, since it goes into the system keychain.',
  },
  {
    id: 'windows',
    name: 'Windows',
    requires: 'Windows 10 or 11, x64',
    downloads: [
      {
        label: 'Installer',
        note: 'x64 · .exe',
        href: file(`tracewing_${v}_windows_x86_64-setup.exe`),
        primary: true,
      },
      {
        label: 'Portable',
        note: 'x64 · .zip',
        href: file(`tracewing_${v}_windows_x86_64.zip`),
      },
    ],
    steps: [
      'Run the installer: for everyone, into Program Files (Windows asks for an administrator), or for you alone.',
      'Start tracewing from the Start menu. Its proxy listens on 127.0.0.1:9090.',
      'Set up walks through trusting the certificate authority it just made, and through sending this computer’s traffic to it.',
    ],
    firstRun:
      'Not signed yet: SmartScreen may say "Windows protected your PC". Choose More info › Run anyway.',
  },
];

export const comingSoon: ComingSoon[] = [];
