// ways.ts - the ways traffic reaches tracewing, and Set up's question over
// them.
//
// This is the app's own wiring, not a story told about it. Keep it in step
// with three places in the repository:
//
//   1. `Way` in crates/app/src/layout.rs — the ways in, in this order, and
//      the name each tab carries.
//   2. `Target` and `route` in crates/app/src/wizard.rs — the answers Set up
//      offers, and which way in each one leads to.
//   3. docs/capturing.md — what each way in takes and what it does not, which
//      is where the two lines under each way come from.
//
// `takes` and `leaves` are the honest pair: a way in that only said what it
// catches would send somebody to look for a program it was never going to
// reach.

export interface Way {
  id: string;
  /** The tab's name, as `Way::name` writes it. */
  name: string;
  /** Where the tab is on Windows, when it is named differently there. */
  windowsName?: string;
  /** What comes through it. */
  takes: string;
  /** What does not, which is the half that saves an hour. */
  leaves: string;
  icon: string;
}

export interface Answer {
  id: string;
  /** The pill, as Set up writes it. */
  text: string;
  /** The way in this answer leads to. */
  way: string;
}

export const WAYS: Way[] = [
  {
    id: 'system-proxy',
    name: 'System proxy',
    takes:
      'Safari, Chrome and Edge as they are, Mac and Windows apps, and the desktop apps built on Electron — Claude, ChatGPT, Cursor, Slack, Discord.',
    leaves:
      'Command-line tools, which read their environment instead. On macOS, localhost and 127.0.0.1 go straight to the server whatever it says.',
    icon: 'globe',
  },
  {
    id: 'browser',
    name: 'A browser',
    takes:
      "Chrome, Edge, Brave, Opera, Chromium and Firefox, started in a profile of tracewing's own beside the one you work in. Nothing else on the computer changes.",
    leaves:
      'Safari, which has no such profile and comes through the system proxy.',
    icon: 'browser',
  },
  {
    id: 'terminal',
    name: 'A terminal',
    takes:
      'What you start in it: curl, git, Python, Go, Deno, Bun — and AI agents such as Claude Code, Codex and Gemini CLI. It brings its own trust, so nothing is installed on the computer.',
    leaves:
      'Node.js before 22.21, and 23 to 24.4, which send requests straight out whatever HTTPS_PROXY says — Set up says so when it finds one. Java, which keeps an authority store of its own.',
    icon: 'terminal',
  },
  {
    id: 'other-devices',
    name: 'Other devices',
    takes:
      "A phone, a tablet or another computer told the proxy by hand: a QR code carries the address and tracewing's own certificate. Android emulators and the iOS simulators are set up in one step.",
    leaves:
      'Apps that pin their own certificates, which trust nothing new by design.',
    icon: 'phone',
  },
  {
    id: 'socks5',
    name: 'SOCKS5',
    takes:
      "Anything reading ALL_PROXY, git with a socks5h:// proxy, Firefox's own SOCKS setting, proxychains. The name the client asked for is kept as the flow's host.",
    leaves:
      'Programs that read only HTTP_PROXY and HTTPS_PROXY, and anything with no SOCKS setting of its own.',
    icon: 'socket',
  },
  {
    id: 'wireguard',
    name: 'WireGuard',
    takes:
      "Everything a phone sends once it joins the tunnel — apps that ignore its proxy setting included. It joins with the stock WireGuard app, from a QR code. Both ends' keys are made here and kept in the system's keychain.",
    leaves:
      'Apps that pin their own certificates; anything sent before the authority is installed there.',
    icon: 'tunnel',
  },
  {
    id: 'apps',
    name: 'Apps',
    windowsName: 'Programs',
    takes:
      'Whatever a program you chose sends over TCP, whether or not it reads any proxy setting at all: a browser, an Electron app, Node of any version, Java, Go. Everything you did not choose is spliced straight through and never recorded.',
    leaves:
      'Connections to this computer itself, which never leave it. UDP, unless HTTP/3 is switched on for a program you chose. go run, which builds its program somewhere new each time.',
    icon: 'apps',
  },
];

// Set up's question, in the order it asks: the browser first, because it is
// most of the asking, and the awkward cases after.
export const ANSWERS: Answer[] = [
  { id: 'website', text: 'A website in my browser', way: 'system-proxy' },
  { id: 'command-line', text: 'curl, git, a script', way: 'terminal' },
  { id: 'node', text: 'Node, Deno, Bun', way: 'terminal' },
  { id: 'python', text: 'Python', way: 'terminal' },
  { id: 'java', text: 'A Java program', way: 'system-proxy' },
  { id: 'phone', text: 'My phone', way: 'other-devices' },
  { id: 'local-app', text: 'An app that ignores the proxy', way: 'apps' },
  { id: 'container', text: 'Something in Docker', way: 'terminal' },
];
