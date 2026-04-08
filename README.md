# Countdown Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A clean, native-looking countdown card for Home Assistant. Track birthdays, holidays, vacations, and any important dates right on your dashboard.

![screenshot](screenshot.png)

## Inspiration

The visual style of this card was inspired by the excellent [Countdown – Day Counter: Timer & Widget](https://apps.apple.com/us/app/countdown/id1403367428) iOS app by **Find Appiness LLC**. If you use iOS, go buy their app — it's fantastic and well worth supporting.

This is **not** a direct copy. The codebase is written entirely from scratch for Home Assistant, and many features are original to this project — including the inline visual editor, HA dashboard persistence via WebSocket, the format cycling tap interaction, recurring event logic (daily/weekly/monthly), and the year/month calendar picker. It's a free, open-source card that brings a similar aesthetic to your HA dashboard, with its own ideas on top.

## Features

- **Colored row backgrounds** — each event gets a vibrant full-width colored row
- **Countdown & count-up** — see days left or days since an event
- **Tap to cycle format** — tap the number to switch between days, weeks, months, years, and detailed breakdown (2y 3m 14d)
- **Add events directly from the card** — tap the + button, no need to edit YAML
- **Edit & delete** — tap any event to modify or remove it
- **Synced across devices** — events are saved to the dashboard config, visible on all devices
- **Recurring events** — daily, weekly, monthly, or yearly
- **Visual editor** — full GUI editor in HA edit mode (calendar picker, icon picker, color picker)
- **Year/month picker** — navigate the calendar quickly
- **Upcoming/Past sections** — clear visual separation
- **Material Design icons** — uses `mdi:` icons, consistent with HA
- **"X years ago" display** — recurring events show years elapsed (e.g. "36 years ago" for birthdays)
- **Time support** — countdown to a specific hour (e.g. "7h 25m left")
- **Row styles** — solid (vibrant), soft (subtle tint), or minimal (accent bar only)
- **Customizable** — hide labels, hide add button, custom date format
- **Format persistence** — your chosen display format is remembered across reloads
- **Lightweight** — single JS file, ~50KB, no external dependencies

## Installation

### HACS (Recommended)

1. Open HACS → **Frontend**
2. Click ⋮ → **Custom repositories**
3. Add this repository URL, category: **Dashboard**
4. Search for **Countdown Card** and install it
5. Restart Home Assistant
6. Go to any dashboard → Edit → **+ Add Card** → search for **Countdown Card**
7. Done! Use the **+ New Countdown** button to start adding events

### Manual

1. Download `countdown-card.js` from the [latest release](../../releases/latest)
2. Copy it to your `config/www/` folder
3. Go to **Settings → Dashboards → Resources → Add Resource**
   - URL: `/local/countdown-card.js`
   - Type: JavaScript Module

## Usage

### Adding events

Just tap the **+ New Countdown** button on the card. Fill in the name, pick a date, choose a color and icon, and tap Save. Done — it's synced everywhere.

Tap any existing event to edit or delete it.

### YAML configuration

```yaml
type: custom:countdown-card
title: My Events
show_past: true
show_labels: true       # set false to hide Upcoming/Past headers
show_add: true          # set false to hide the + New Countdown button
date_format: DD/MM/YYYY # custom date format (leave empty for auto)
row_style: solid        # solid | soft | minimal
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
  - name: Pay Rent
    date: "2026-05-01"
    icon: home
    color: "#6A1B9A"
    recurring: monthly
  - name: Friday Lunch
    date: "2026-04-10 12:00"
    icon: food
    color: "#FF5722"
```

### Card options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `Countdowns` | Card header. Set to `false` to hide |
| `show_past` | boolean | `true` | Show events that have already passed |
| `show_labels` | boolean | `true` | Show Upcoming/Past section headers |
| `show_add` | boolean | `true` | Show the "+ New Countdown" button |
| `date_format` | string | auto | Custom date format (see below) |
| `row_style` | string | `solid` | Row background style: `solid`, `soft`, or `minimal` |
| `editable` | boolean | `true` | Allow adding/editing events from the card. Set `false` for read-only |
| `strings` | object | — | Override labels for localization (see below) |
| `events` | list | required | List of events |

### Event options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | required | Event name |
| `date` | string | required | Date in `YYYY-MM-DD` or `YYYY-MM-DD HH:MM` format |
| `icon` | string | `calendar` | Material Design icon name (without `mdi:` prefix) |
| `color` | string | auto | Color as hex (e.g. `#C62828`) |
| `recurring` | string | `false` | `daily`, `weekly`, `monthly`, or `yearly` |

### Date format tokens

| Token | Output | Example |
|-------|--------|---------|
| `DD` | Day (zero-padded) | 07 |
| `D` | Day | 7 |
| `MM` | Month (zero-padded) | 04 |
| `M` | Month | 4 |
| `MMM` | Month (short) | Apr |
| `MMMM` | Month (full) | April |
| `YYYY` | Year (4-digit) | 2026 |
| `YY` | Year (2-digit) | 26 |
| `ddd` | Weekday (short) | Mon |

Examples: `DD/MM/YYYY` → 07/04/2026, `D MMM YYYY` → 7 Apr 2026, `YYYY-MM-DD` → 2026-04-07

Leave empty for automatic formatting based on browser locale.

### Time support

You can add a specific time to any event. When the event is less than 24 hours away, the card shows hours and minutes instead of "0 days":

```yaml
- name: Friday Lunch
  date: "2026-04-10 12:00"
  icon: food
  color: "#FF5722"
```

Shows: **7h 25m left** → **3h 10m left** → **45m left**

- The form editor includes an optional time picker (HH:MM)
- Events without a time work exactly as before
- Works with recurring events (e.g. daily standup at 9am)

### Row styles

| Style | Description |
|-------|-------------|
| `solid` (default) | Full colored background, white text |
| `soft` | Subtle colored tint (~20% opacity), theme text colors |
| `minimal` | Neutral background with colored accent bar |

Use `soft` or `minimal` to blend better with themes like Frosted Glass.

### Localization

Override any label to use your own language:

```yaml
type: custom:countdown-card
strings:
  today: "Hoje!"
  left: "restam"
  ago: "atrás"
  day: "dia"
  days: "dias"
  weeks: "semanas"
  month: "mês"
  months: "meses"
  year: "ano"
  years: "anos"
  upcoming: "Próximos"
  past: "Passados"
  today_label: "hoje"
```

### Read-only mode

Set `editable: false` to disable inline editing — events can only be managed via the dashboard YAML editor:

```yaml
type: custom:countdown-card
editable: false
```

### Tap the countdown number

Tap the number on the right side of any event to cycle through display formats:

| # | Format | Example |
|---|--------|---------|
| 1 | Days | 107 days left |
| 2 | Weeks | 15.3 weeks left |
| 3 | Months | 3 months left |
| 4 | Years | 2 years left |
| 5 | Detail | 2y 3m 14d left |

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

- **Design inspiration**: [Countdown](https://apps.apple.com/us/app/countdown/id1403367428) by Find Appiness LLC — an excellent iOS countdown app. The colored-row visual style comes from them; the rest is original.
- **Code**: Built entirely with [GitHub Copilot](https://github.com/features/copilot) (Claude). The human provided the ideas and vigorous button-clicking. The AI did the rest. 🤖

## License

MIT
