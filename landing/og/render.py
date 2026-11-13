"""The social card: 1200x630, the app's dark page, its accent, and the shot."""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

HERE = Path(__file__).resolve().parent
PUBLIC = HERE.parent / "public"

BG = (20, 21, 23)          # the app's dark page, #141517
ACCENT = (122, 162, 255)   # its dark palette's blue, #7aa2ff
WHITE = (255, 255, 255)
MUTED = (162, 165, 173)

INTER = "/usr/share/fonts/opentype/inter/Inter-%s.otf"
MONO = "/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-%s.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


card = Image.new("RGB", (1200, 630), BG)
draw = ImageDraw.Draw(card)

# A faint grid, as the page has behind its hero.
for x in range(0, 1200, 48):
    draw.line([(x, 0), (x, 630)], fill=(28, 29, 33))
for y in range(0, 630, 48):
    draw.line([(0, y), (1200, y)], fill=(28, 29, 33))

# The window, bled off the right edge. It starts at SHOT_X, and nothing
# written on the left may reach that far: the checks below make sure.
SHOT_X = 600
shot = Image.open(PUBLIC / "shots" / "traffic.webp").convert("RGB")
shot = shot.resize((780, 488), Image.LANCZOS)
card.paste(shot, (SHOT_X, 142))
draw.rectangle([SHOT_X, 142, 1199, 629], outline=(42, 44, 50))

# The name and what it is, in a column that stops short of the window.
# Blocks are written one under the other, each from where the last ended, so
# two of them cannot land on top of each other however the words change.
MARGIN = 64
LIMIT = SHOT_X - 40


def write(y, text, fnt, fill, gap=0, spacing=10, x=None):
    """Writes a block at `y` and gives back the y the next one starts at.

    It refuses to let a line run under the window: a card with its words
    cut off by the screenshot is worse than no card.
    """
    x = MARGIN if x is None else x
    for line in text.split("\n"):
        width = draw.textlength(line, font=fnt)
        if x + width > LIMIT:
            raise SystemExit(f"{line!r} is {int(x + width)}px wide, past {LIMIT}px")
    draw.multiline_text((x, y), text, font=fnt, fill=fill, spacing=spacing)
    box = draw.multiline_textbbox((x, y), text, font=fnt, spacing=spacing)
    return box[3] + gap


# The app's own mark, as docs/images/tracewing.svg draws it: a rounded square
# in the light palette's blue, with the pulse through it.
MARK = 44
mark = Image.new("RGB", (MARK * 4, MARK * 4), BG)
pen = ImageDraw.Draw(mark)
pen.rounded_rectangle([0, 0, MARK * 4 - 1, MARK * 4 - 1], radius=42, fill=(47, 85, 180))
# M3 12 h4 l3-7 l4 14 l3-7 h4, over the SVG's 24-unit box.
unit = MARK * 4 / 24
pen.line(
    [(x * unit, y * unit) for x, y in
     [(3, 12), (7, 12), (10, 5), (14, 19), (17, 12), (21, 12)]],
    fill=WHITE,
    width=int(2 * unit),
    joint="curve",
)
card.paste(mark.resize((MARK, MARK), Image.LANCZOS), (MARGIN, 52))
write(56, "tracewing", font(INTER % "Bold", 36), WHITE, x=MARGIN + MARK + 16)

y = 160
y = write(y, "See every request.", font(INTER % "Bold", 43), WHITE, gap=12)
y = write(y, "Even a million of them.", font(INTER % "Bold", 43), ACCENT, gap=40)
y = write(
    y,
    "For everything your browser's\nDevTools can't see: mobile apps,\ndesktop apps, servers and AI agents.",
    font(INTER % "Regular", 23),
    MUTED,
    gap=34,
)
y = write(
    y,
    "HTTP/2 · WebSocket · gRPC · JSON-RPC",
    font(MONO % "Medium", 18),
    ACCENT,
    gap=26,
)
y = write(
    y,
    "Rust + GPUI · GPL-3.0-or-later\nnothing leaves your machine",
    font(MONO % "Regular", 16),
    (125, 129, 139),
)
if y > 600:
    raise SystemExit(f"the words run to {int(y)}px, past the card's 600px")

card.save(PUBLIC / "og-image.png")
print("public/og-image.png", card.size)
