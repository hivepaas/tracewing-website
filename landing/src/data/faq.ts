// The questions the page is asked, and answers that do not promise anything
// that is not built. They are also the page's FAQPage structured data.

export interface Question {
  question: string;
  answer: string;
}

export const faq: Question[] = [
  {
    question: 'How do I install it?',
    answer:
      'Download the file for your system from this page: a .deb or .rpm on Linux, a .dmg on macOS, an installer or a portable .zip on Windows. It can also be built from source on all three, which is four commands and needs only Rust.',
  },
  {
    question: 'How does it see inside HTTPS?',
    answer:
      'It makes a certificate authority on your machine the first time it runs, and issues a certificate per host from it. That authority never leaves the machine, and nothing you record is sent anywhere: there is no account, no cloud and no telemetry.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Nothing. It is free to download and the source is GPL-3.0-or-later. Whether some parts are paid for later has not been decided, and nothing on this page is a price.',
  },
  {
    question: 'How does it update?',
    answer:
      'Once a day it asks GitHub whether there is a newer version: one request, with nothing of yours in it. The list of releases is signed twice, with Ed25519 and ML-DSA-65, and each file is checked against its SHA-256 before it is used. On Windows and macOS a new version installs in one click, as tracewing quits; with a .deb or .rpm it shows the commands to run. Settings › About turns the daily look off.',
  },
  {
    question: 'Is it an Electron app?',
    answer:
      'No. It is a native app written in Rust on GPUI, the renderer Zed uses, which is why a million rows scroll at the display refresh rate rather than at whatever a web view manages.',
  },
  {
    question: 'Will it keep up with a load test?',
    answer:
      'It has been measured doing so: a million requests at about a hundred thousand a second, all recorded and none dropped, with the window open and the list scrolling. The conditions and the figures are in docs/measurements.md in the repository.',
  },
  {
    question: 'Can I use it with my phone?',
    answer:
      'Yes. A device is set up from a QR code, with help for the certificate rules of Android 14 and later, and for the iOS simulators on a Mac. TLS keys can be written for Wireshark when you need the packets themselves.',
  },
  {
    question: 'Does it understand gRPC and Protobuf?',
    answer:
      'Yes, as the JSON they hold. Fields are named from .proto files or descriptor sets you choose, or fetched from a server by gRPC reflection; a Protobuf body can be written as JSON in Compose and is sent as Protobuf.',
  },
  {
    question: 'What about JSON-RPC and contract calls?',
    answer:
      'A data field is read as the call it names, with its arguments, by the calls every chain shares or by an ABI you choose. Signed transactions are read out of their RLP with the signer recovered from the signature, and Solana and Bitcoin are read too.',
  },
];
