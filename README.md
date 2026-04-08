# Countdown Card for Home Assistant

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A clean, native-looking countdown card for Home Assistant. Track birthdays, holidays, vacations, and any important dates right on your dashboard.

![Countdown Card Screenshot](https://raw.githubusercontent.com/semichcsc-byte/ha-countdown-card/main/screenshot.png)

## Features

- **Countdown & count-up** — see days left or days since an event
- **Tap to cycle format** — tap the number to switch between days, weeks, months, years, and a detailed breakdown (2y 3m 14d)
- **Add events directly from the card** — tap the + button, no need to edit YAML
- **Edit & delete** — tap any event to modify or remove it
- **Synced across devices** — events are saved to the dashboard config, visible on all devices
- **Recurring events** — daily, weekly, monthly, or yearly
- **Visual editor** — full GUI editor in HA edit mode (calendar, icon picker, color picker)
- **Material Design icons** — uses `mdi:` icons, consistent with HA
- **Color-coded** — each event gets a colored accent bar and number
- **Past events section** — optionally show events that have passed
- **Lightweight** — single JS file, ~40KB, no external dependencies at runtime

## Installation

### HACS (Recommended)

1. Open **HACS** → **Frontend**
2. Click **⋮** → **Custom repositories**
3. Add this repository URL, category: **Dashboard**
4. Search for **Countdown Card** and install it
5. Restart Home Assistant
6. Go to any dashboard → **Edit** (pencil icon) → **+ Add Card** → search for **Countdown Card**
7. Done! Use the **+ New Countdown** button to start adding events

### Manual

1. Download `countdown-card.js` from the [latest release](https://github.com/semichcsc-byte/ha-countdown-card/releases/latest)
2. Copy it to your `config/www/` folder
3. Go to **Settings → Dashboards → Resources → Add Resource**
   - URL: `/local/countdown-card.js`
   - Type: **JavaScript Module**

## Usage

### Adding events (easy way)

Just tap the **+ New Countdown** button on the card. Fill in the name, pick a date, choose a color and icon, and tap **Save**. Done — it's synced everywhere.

Tap any existing event to **edit** or **delete** it.

### YAML configuration

You can also configure the card via YAML:

```yaml
type: custom:countdown-card
title: My Events
show_past: true
events:
  - name: Summer Vacation
    date: "2026-08-01"
    icon: airplane
    color: "#1565C0"
  - name: "Sarah's Birthday"
    date: "1990-03-15"
    icon: cake
    color: "#7B1FA2"
    recurring: yearly
  - name: New Year
    date: "2027-01-01"
    icon: party-popper
    color: "#2E7D32"
    recurring: yearly
```

### Card options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `Countdowns` | Card header. Set to `false` to hide |
| `show_past` | boolean | `true` | Show events that have already passed |
| `events` | list | required | List of events |

### Event options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | required | Event name |
| `date` | string | required | Date in `YYYY-MM-DD` format |
| `icon` | string | `calendar` | Material Design icon name (without `mdi:` prefix) |
| `color` | string | auto | Color as hex (e.g. `#C62828`) |
| `recurring` | string | `false` | `daily`, `weekly`, `monthly`, or `yearly` |

### Available icons

Any [Material Design Icon](https://pictogrammers.com/library/mdi/) works. Some suggestions:

`calendar` · `cake` · `party-popper` · `airplane` · `home` · `car` · `gift` · `heart` · `ring` · `baby-carriage` · `school` · `briefcase` · `palm-tree` · `snowflake` · `star` · `trophy` · `music` · `paw`

### Tap the countdown number

Tap the number on the right side of any event to cycle through display formats:

| Tap | Format | Example |
|-----|--------|---------|
| 1 | Days | `107 days left` |
| 2 | Weeks | `15.3 weeks left` |
| 3 | Months | `3 months left` |
| 4 | Years | `2 years left` |
| 5 | Detail | `2y 3m 14d left` |

When viewing in "years" and the event is less than 1 year away, it automatically shows months instead.

## Development

```bash
git clone https://github.com/semichcsc-byte/ha-countdown-card.git
cd ha-countdown-card
npm install
npm run build       # build once
npm run watch       # rebuild on changes
```

The compiled card will be at `dist/countdown-card.js`.

## Credits

This entire card was built with the help of **GitHub Copilot (Claude)** — from the first line of code to the final push. The human provided the ideas, opinions, and vigorous button-clicking. The AI did the rest. No developers were harmed in the making of this card, mostly because there weren't any. :robot:

## License

MIT
