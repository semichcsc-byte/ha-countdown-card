import { LitElement, html, css, nothing } from 'lit';

// ─────────────────────────────────────────────────────────────────
// Shared constants
// ─────────────────────────────────────────────────────────────────
const MS_PER_DAY = 86400000;
const PRESET_COLORS = [
  '#C62828', '#EF6C00', '#F9A825', '#2E7D32', '#1565C0', '#6A1B9A',
  '#00838F', '#4E342E',
];
const HA_ICONS = [
  'calendar', 'cake', 'party-popper', 'airplane', 'home', 'car',
  'gift', 'heart', 'ring', 'baby-carriage', 'school', 'briefcase',
  'palm-tree', 'snowflake', 'star', 'trophy', 'music', 'paw',
];


// ─────────────────────────────────────────────────────────────────
// Shared form rendering mixin (used by both card overlay and editor)
// ─────────────────────────────────────────────────────────────────
const FormMixin = (Base) => class extends Base {

  _resetForm() {
    const n = new Date();
    this._formName = '';
    this._formIcon = 'calendar';
    this._formColor = PRESET_COLORS[0];
    this._formType = 'event';
    this._formRecurring = 'never';
    this._calY = n.getFullYear();
    this._calM = n.getMonth();
    this._calD = n.getDate();
    this._calView = 'days';
    this._formHour = '';
    this._formMinute = '';
    this._emojiOpen = false;
  }

  _loadEventIntoForm(e) {
    const parts = e.date.split(' ');
    const [y, m, d] = parts[0].split('-').map(Number);
    this._formName = e.name;
    this._formIcon = e.icon || 'calendar';
    this._formColor = e.color || PRESET_COLORS[0];
    this._formType = e.type || 'event';
    this._formRecurring = e.recurring === true ? 'yearly' : (e.recurring || 'never');
    this._calY = y;
    this._calM = m - 1;
    this._calD = d;
    if (parts[1]) {
      const [hh, mi] = parts[1].split(':');
      this._formHour = hh || '';
      this._formMinute = mi || '';
    } else {
      this._formHour = '';
      this._formMinute = '';
    }
    this._calView = 'days';
    this._emojiOpen = false;
  }

  _buildEventFromForm() {
    if (!this._formName.trim()) return null;
    const mm = String(this._calM + 1).padStart(2, '0');
    const dd = String(this._calD).padStart(2, '0');
    const hasTime = this._formHour !== '' && this._formMinute !== '';
    const dateStr = hasTime
      ? `${this._calY}-${mm}-${dd} ${String(this._formHour).padStart(2,'0')}:${String(this._formMinute).padStart(2,'0')}`
      : `${this._calY}-${mm}-${dd}`;
    return {
      name: this._formName.trim(),
      date: dateStr,
      icon: this._formIcon,
      color: this._formColor,
      type: this._formType,
      recurring: this._formRecurring === 'never' ? false : this._formRecurring,
    };
  }

  // Calendar helpers
  _dim(y, m) { return new Date(y, m + 1, 0).getDate(); }
  _fdw(y, m) { return new Date(y, m, 1).getDay(); }

  _prevM() {
    if (this._calM === 0) { this._calM = 11; this._calY--; } else this._calM--;
    const mx = this._dim(this._calY, this._calM);
    if (this._calD > mx) this._calD = mx;
  }

  _nextM() {
    if (this._calM === 11) { this._calM = 0; this._calY++; } else this._calM++;
    const mx = this._dim(this._calY, this._calM);
    if (this._calD > mx) this._calD = mx;
  }
  _renderDayPicker(today) {
    const y = this._calY, m = this._calM;
    const days = this._dim(y, m);
    const first = this._fdw(y, m);
    const isT = (d) => today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
    const monthName = new Date(y, m).toLocaleDateString(navigator.language, { month: 'long' });
    const blanks = Array.from({ length: first }, () => null);
    const nums = Array.from({ length: days }, (_, i) => i + 1);
    const cells = [...blanks, ...nums];

    return html`
      <div class="calh">
        <div class="calh-btns">
          <button class="calm-btn" @click=${() => { this._calView = 'months'; }}>${monthName}</button>
          <button class="calm-btn" @click=${() => { this._calView = 'years'; }}>${y}</button>
        </div>
      </div>
      <div class="calw">${['S','M','T','W','T','F','S'].map(d => html`<span>${d}</span>`)}</div>
      <div class="calg">
        ${cells.map(d => d === null
          ? html`<span class="calc"></span>`
          : html`<button class="calc ${d === this._calD ? 'sel' : ''} ${isT(d) ? 'tod' : ''}"
              @click=${() => { this._calD = d; }}>${d}</button>`
        )}
      </div>
    `;
  }

  _renderMonthPicker() {
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(2000, i).toLocaleDateString(navigator.language, { month: 'short' })
    );
    return html`
      <div class="calh">
        <button class="calm-btn" @click=${() => { this._calView = 'years'; }}>${this._calY}</button>
      </div>
      <div class="month-grid">
        ${months.map((name, i) => html`
          <button class="month-cell ${i === this._calM ? 'sel' : ''}"
                  @click=${() => { this._calM = i; this._calView = 'days';
                    const mx = this._dim(this._calY, this._calM);
                    if (this._calD > mx) this._calD = mx;
                  }}>${name}</button>
        `)}
      </div>
    `;
  }

  _renderYearPicker() {
    const startYear = Math.floor(this._calY / 12) * 12 - 1;
    const years = Array.from({ length: 16 }, (_, i) => startYear + i);
    const thisYear = new Date().getFullYear();
    return html`
      <div class="calh">
        <span class="calm">${startYear + 1} \u2013 ${startYear + 14}</span>
        <div class="caln">
          <button class="calb" @click=${() => { this._calY -= 12; }}>&#8249;</button>
          <button class="calb" @click=${() => { this._calY += 12; }}>&#8250;</button>
        </div>
      </div>
      <div class="year-grid">
        ${years.map(y => html`
          <button class="year-cell ${y === this._calY ? 'sel' : ''} ${y === thisYear ? 'tod' : ''}"
                  @click=${() => { this._calY = y; this._calView = 'months'; }}>${y}</button>
        `)}
      </div>
    `;
  }


  _renderFormBody(isEdit, onSave, onDelete, onClose) {
    const today = new Date();

    return html`
      <div class="fh">
        <button class="ib" @click=${onClose}>✕</button>
        <span class="ftit">${isEdit ? 'Edit Countdown' : 'New Countdown'}</span>
        <button class="savlnk" @click=${onSave} ?disabled=${!this._formName.trim()}>Save</button>
      </div>

      <div class="fl">Title</div>
      <div class="tr">
        <input type="text" class="ni" placeholder="Name your countdown"
               .value=${this._formName}
               @input=${(e) => { this._formName = e.target.value; }}>
      </div>

      <div class="fl">Icon</div>
      <div class="icon-grid">
        ${HA_ICONS.map(ic => html`
          <button class="icon-opt ${ic === this._formIcon ? 'sel' : ''}"
                  @click=${() => { this._formIcon = ic; }}>
            <ha-icon .icon=${`mdi:${ic}`}></ha-icon>
          </button>
        `)}
      </div>

      <div class="fl">Pick a date</div>
      <div class="cal">
        ${this._calView === 'years' ? this._renderYearPicker()
          : this._calView === 'months' ? this._renderMonthPicker()
          : this._renderDayPicker(today)}
      </div>

      <div class="fl">Time <span style="font-weight:400;opacity:.6">(optional)</span></div>
      <div class="time-row">
        <input type="number" class="time-inp" min="0" max="23" placeholder="HH"
               .value=${this._formHour}
               @input=${(e) => { this._formHour = e.target.value; }}>
        <span class="time-sep">:</span>
        <input type="number" class="time-inp" min="0" max="59" placeholder="MM"
               .value=${this._formMinute}
               @input=${(e) => { this._formMinute = e.target.value; }}>
        ${this._formHour !== '' ? html`
          <button class="time-clear" @click=${() => { this._formHour = ''; this._formMinute = ''; }}>✕</button>
        ` : ''}
      </div>

      <div class="fl">Pick a color</div>
      <div class="colr">
        ${PRESET_COLORS.map(c => html`
          <button class="cdot ${c === this._formColor ? 'sel' : ''}"
                  style="background:${c}"
                  @click=${() => { this._formColor = c; }}></button>
        `)}
      </div>

      <div class="fl">Repeat</div>
      <div class="tg tg-wrap">
        ${['never','daily','weekly','monthly','yearly'].map(v => html`
          <button class="tb ${this._formRecurring === v ? 'on' : ''}"
                  @click=${() => { this._formRecurring = v; }}>${v[0].toUpperCase() + v.slice(1)}</button>
        `)}
      </div>

      <button class="savbtn" @click=${onSave} ?disabled=${!this._formName.trim()}>Save</button>

      ${isEdit ? html`
        <button class="delbtn" @click=${onDelete}>Delete this countdown</button>
      ` : nothing}
    `;
  }
};

// Shared form styles used by both card overlay and editor
const FORM_STYLES = css`
  /* Form header */
  .fh {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 0 12px; position: sticky; top: 0;
    background: var(--bg, var(--card-background-color, #fff)); z-index: 1;
  }
  .ftit { font-weight: 600; font-size: 1.05em; }
  .ib {
    background: none; border: none; cursor: pointer; font-size: 1em;
    padding: 4px 8px; border-radius: 6px; font-family: inherit;
    color: var(--t2, var(--secondary-text-color, #888));
  }
  .ib:hover { background: rgba(0,0,0,.06); }
  .savlnk {
    background: none; border: none; font-size: .95em; font-weight: 600;
    cursor: pointer; padding: 4px 8px; font-family: inherit;
    color: var(--a, var(--primary-color, #1976D2));
  }
  .savlnk:disabled { opacity: .3; cursor: default; }

  .fl {
    font-size: .8em; font-weight: 600;
    color: var(--t2, var(--secondary-text-color, #888));
    margin: 16px 0 8px; text-transform: capitalize;
  }

  /* Title row */
  .tr {
    display: flex; align-items: center; gap: 8px;
    background: var(--sf, var(--secondary-background-color, #f5f5f5));
    border-radius: 12px; padding: 8px 12px;
  }
  .emb { font-size: 1.6em; background: none; border: none; cursor: pointer; padding: 2px; line-height: 1; }

  /* Icon grid */
  .icon-grid {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px;
    padding: 8px;
    background: var(--sf, var(--secondary-background-color, #f5f5f5));
    border-radius: 12px;
  }
  .icon-opt {
    display: flex; align-items: center; justify-content: center;
    background: none; border: 2px solid transparent;
    border-radius: 8px; padding: 8px; cursor: pointer;
    color: var(--t2, var(--secondary-text-color, #888));
    transition: .15s;
  }
  .icon-opt:hover { background: rgba(0,0,0,.06); }
  .icon-opt.sel {
    border-color: var(--a, var(--primary-color, #1976D2));
    color: var(--a, var(--primary-color, #1976D2));
    background: rgba(25,118,210,.08);
  }
  .icon-opt ha-icon { --mdc-icon-size: 20px; }
  .ni {
    flex: 1; border: none; background: transparent; font-size: 1em;
    color: var(--t1, var(--primary-text-color, #333));
    outline: none; font-family: inherit;
  }
  .ni::placeholder { color: var(--t2, var(--secondary-text-color, #aaa)); }



  /* Calendar */
  .cal {
    background: var(--sf, var(--secondary-background-color, #f5f5f5));
    border-radius: 12px; padding: 12px;
  }
  .calh { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .calm { font-weight: 600; font-size: .95em; text-transform: capitalize; }
  .caln { display: flex; gap: 8px; }
  .calb {
    background: none; border: none; font-size: 1.3em; cursor: pointer;
    color: var(--a, var(--primary-color, #1976D2)); padding: 0 6px; font-family: inherit;
  }
  .calw {
    display: grid; grid-template-columns: repeat(7, 1fr);
    text-align: center; font-size: .7em; font-weight: 600;
    color: var(--t2, var(--secondary-text-color, #888));
    margin-bottom: 4px; text-transform: uppercase;
  }
  .calg { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
  .calc {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    border: none; background: none; border-radius: 50%;
    font-size: .85em; cursor: pointer;
    color: var(--t1, var(--primary-text-color, #333));
    font-family: inherit; transition: background .1s;
  }
  .calc:hover:not(.empty) { background: rgba(0,0,0,.06); }
  .calc.tod { color: var(--a, var(--primary-color, #1976D2)); font-weight: 700; }
  .calc.sel { background: var(--a, var(--primary-color, #1976D2)); color: #fff; font-weight: 700; }

  /* Month picker */
  .month-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .month-cell {
    padding: 10px 4px; border: none; background: none; border-radius: 8px;
    font-size: .85em; cursor: pointer; text-transform: capitalize;
    color: var(--t1, var(--primary-text-color, #333));
    font-family: inherit; transition: background .1s;
  }
  .month-cell:hover { background: rgba(0,0,0,.06); }
  .month-cell.sel { background: var(--a, var(--primary-color, #1976D2)); color: #fff; font-weight: 600; }

  /* Year picker */
  .year-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  .year-cell {
    padding: 10px 4px; border: none; background: none; border-radius: 8px;
    font-size: .85em; cursor: pointer;
    color: var(--t1, var(--primary-text-color, #333));
    font-family: inherit; transition: background .1s;
  }
  .year-cell:hover { background: rgba(0,0,0,.06); }
  .year-cell.tod { color: var(--a, var(--primary-color, #1976D2)); font-weight: 700; }
  .year-cell.sel { background: var(--a, var(--primary-color, #1976D2)); color: #fff; font-weight: 600; }

  .calh-btns { display: flex; gap: 4px; }
  .calm-btn {
    background: none; border: none; cursor: pointer; padding: 4px 8px;
    font-weight: 600; font-size: .95em; text-transform: capitalize;
    color: var(--a, var(--primary-color, #1976D2)); font-family: inherit;
    border-radius: 6px;
  }
  .calm-btn:hover { background: rgba(0,0,0,.06); }

  /* Colors */
  .colr { display: flex; gap: 10px; flex-wrap: wrap; }
  .cdot {
    width: 36px; height: 36px; border-radius: 50%;
    border: 3px solid transparent; cursor: pointer; transition: transform .15s;
  }
  .cdot:hover { transform: scale(1.12); }
  .cdot.sel { border-color: var(--t1, var(--primary-text-color, #333)); transform: scale(1.12); }

  /* Toggle groups */
  .tg {
    display: flex;
    background: var(--sf, var(--secondary-background-color, #f0f0f0));
    border-radius: 10px; padding: 3px; overflow: hidden;
  }
  .tb {
    flex: 1; padding: 8px 12px; border: none; background: transparent;
    font-size: .82em; font-weight: 500; cursor: pointer; border-radius: 8px;
    color: var(--t2, var(--secondary-text-color, #888));
    font-family: inherit; transition: .15s;
  }
  .tb.on {
    background: var(--bg, var(--card-background-color, #fff));
    color: var(--t1, var(--primary-text-color, #333));
    box-shadow: 0 1px 4px rgba(0,0,0,.1); font-weight: 600;
  }

  /* Time picker */
  .time-row {
    display: flex; align-items: center; gap: 8px;
    background: var(--sf, var(--secondary-background-color, #f5f5f5));
    border-radius: 12px; padding: 8px 12px;
  }
  .time-inp {
    width: 56px; border: none; background: transparent; font-size: 1.1em;
    text-align: center; color: var(--t1, var(--primary-text-color, #333));
    outline: none; font-family: inherit; -moz-appearance: textfield;
  }
  .time-inp::-webkit-outer-spin-button, .time-inp::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .time-inp::placeholder { color: var(--t2, var(--secondary-text-color, #aaa)); }
  .time-sep { font-size: 1.2em; font-weight: 600; color: var(--t2, var(--secondary-text-color, #888)); }
  .time-clear {
    background: none; border: none; cursor: pointer; font-size: .85em;
    color: var(--t2, var(--secondary-text-color, #888)); padding: 4px 8px;
    border-radius: 6px; font-family: inherit;
  }
  .time-clear:hover { background: rgba(0,0,0,.06); }

  /* Save (bottom) */
  .savbtn {
    display: block; width: 100%; margin-top: 20px; padding: 12px;
    border: none; background: var(--a, var(--primary-color, #1976D2)); color: #fff;
    border-radius: 12px; font-size: .9em; font-weight: 600;
    cursor: pointer; font-family: inherit;
  }
  .savbtn:hover { opacity: .88; }
  .savbtn:disabled { opacity: .3; cursor: default; }

  /* Delete */
  .delbtn {
    display: block; width: 100%; margin-top: 20px; padding: 12px;
    border: none; background: #FFEBEE; color: #C62828;
    border-radius: 12px; font-size: .9em; font-weight: 600;
    cursor: pointer; font-family: inherit;
  }
  .delbtn:hover { background: #FFCDD2; }
`;


// ═════════════════════════════════════════════════════════════════
//  MAIN CARD (display + overlay form)
// ═════════════════════════════════════════════════════════════════
class CountdownCard extends FormMixin(LitElement) {

  static get properties() {
    return {
      config: {}, _tick: { state: true },
      _formats: { state: true },
      _showForm: { state: true }, _editIdx: { state: true },
      _formName: { state: true }, _formIcon: { state: true },
      _formColor: { state: true }, _formType: { state: true },
      _formRecurring: { state: true },
      _calY: { state: true }, _calM: { state: true }, _calD: { state: true }, _calView: { state: true },
      _emojiOpen: { state: true },
      _formHour: { state: true }, _formMinute: { state: true },
    };
  }

  constructor() {
    super();
    this._formats = this._loadFormats();
    this._showForm = false;
    this._editIdx = -1;
    this._resetForm();
  }

  static getConfigElement() {
    return document.createElement('countdown-card-editor');
  }

  static getStubConfig() {
    return {
      title: 'Countdowns',
      show_past: true,
      events: [
        { name: 'Gym', date: '2026-04-07', icon: 'trophy', color: '#2E7D32', recurring: 'daily' },
        { name: 'Team Meeting', date: '2026-04-09', icon: 'briefcase', color: '#EF6C00', recurring: 'weekly' },
        { name: 'Pay Rent', date: '2026-05-01', icon: 'home', color: '#6A1B9A', recurring: 'monthly' },
        { name: 'Summer Vacation', date: '2026-08-01', icon: 'airplane', color: '#1565C0' },
        { name: "Sarah's Birthday", date: '1990-03-15', icon: 'cake', color: '#7B1FA2', recurring: 'yearly' },
        { name: 'Got our Dog', date: '2022-06-10', icon: 'paw', color: '#4E342E' },
        { name: 'Bought the House', date: '2019-11-20', icon: 'home', color: '#00838F' },
      ],
    };
  }

  setConfig(config) {
    this.config = { ...config, events: config.events || [] };
  }

  set hass(h) { this._hass = h; }

  // ── Lifecycle ───────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    this._tick = Date.now();
    this._timer = setInterval(() => { this._tick = Date.now(); }, 15000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  // ── All events ──────────────────────────────────────────────────
  _allEvents() {
    return (this.config.events || []).map((e, i) => ({ ...e, _idx: i }));
  }

  // ── Process events ──────────────────────────────────────────────
  _processEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const t0 = today.getTime();
    const showPast = this.config.show_past !== false;

    const now = new Date();

    const proc = this._allEvents().map(evt => {
      const parts = evt.date.split(' ');
      const [py, pm, pd] = parts[0].split('-').map(Number);
      let origH = 0, origMi = 0;
      if (parts[1]) { const [hh, mi] = parts[1].split(':').map(Number); origH = hh || 0; origMi = mi || 0; }
      const hasTime = !!parts[1];
      const orig = new Date(py, pm - 1, pd, origH, origMi);
      let target = new Date(orig);
      const rec = evt.recurring === true ? 'yearly' : (evt.recurring || false);

      const cmpTime = hasTime ? now.getTime() : t0;

      if (rec === 'yearly') {
        target = new Date(today.getFullYear(), orig.getMonth(), orig.getDate(), origH, origMi);
        if (target.getTime() < cmpTime)
          target = new Date(today.getFullYear() + 1, orig.getMonth(), orig.getDate(), origH, origMi);
      } else if (rec === 'monthly') {
        target = new Date(today.getFullYear(), today.getMonth(), orig.getDate(), origH, origMi);
        if (target.getTime() < cmpTime)
          target = new Date(today.getFullYear(), today.getMonth() + 1, orig.getDate(), origH, origMi);
      } else if (rec === 'weekly') {
        const origDay = orig.getDay();
        target = new Date(today);
        const todayDay = today.getDay();
        let daysUntil = origDay - todayDay;
        if (daysUntil < 0) daysUntil += 7;
        if (daysUntil === 0) {
          target.setDate(today.getDate());
          target.setHours(origH, origMi, 0, 0);
          if (target.getTime() < cmpTime) { daysUntil = 7; target.setDate(today.getDate() + daysUntil); }
        } else {
          target.setDate(today.getDate() + daysUntil);
        }
        target.setHours(origH, origMi, 0, 0);
      } else if (rec === 'daily') {
        target = new Date(today.getFullYear(), today.getMonth(), today.getDate(), origH, origMi);
        if (target.getTime() < cmpTime)
          target = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, origH, origMi);
      }

      let ye = today.getFullYear() - orig.getFullYear();
      const md = today.getMonth() - orig.getMonth();
      if (md < 0 || (md === 0 && today.getDate() < orig.getDate())) ye--;

      const diffMs = target.getTime() - (hasTime ? now.getTime() : t0);
      const diff = hasTime ? diffMs / MS_PER_DAY : Math.round(diffMs / MS_PER_DAY);
      const isToday = hasTime ? (diffMs >= 0 && diffMs < MS_PER_DAY) : Math.round(diffMs / MS_PER_DAY) === 0;
      return {
        ...evt, icon: evt.icon || 'calendar', originalDate: orig, targetDate: target,
        diff, absDiff: Math.abs(diff), isToday: !hasTime && isToday, isPast: hasTime ? diffMs < 0 : diff < 0,
        hasTime, diffMs, yearsElapsed: ye,
      };
    });

    const out = showPast ? proc : proc.filter(e => !e.isPast);
    out.sort((a, b) => {
      if (a.isToday !== b.isToday) return a.isToday ? -1 : 1;
      if (!a.isPast && !b.isPast) return a.diff - b.diff;
      if (a.isPast && b.isPast) return b.diff - a.diff;
      return a.isPast ? 1 : -1;
    });
    return out;
  }

  // ── Helpers ─────────────────────────────────────────────────────
  _fmt(d) {
    const fmt = this.config.date_format;
    if (!fmt) {
      return d.toLocaleDateString(navigator.language, {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
      });
    }
    // Custom format: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, DD.MM.YYYY, D MMM YYYY, etc.
    const day = d.getDate(), mon = d.getMonth() + 1, year = d.getFullYear();
    const pad = (n) => String(n).padStart(2, '0');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthsFull = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const wdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return fmt
      .replace('YYYY', year).replace('YY', String(year).slice(-2))
      .replace('MMMM', monthsFull[mon - 1]).replace('MMM', months[mon - 1])
      .replace('MM', pad(mon)).replace('DD', pad(day))
      .replace('D', day).replace('M', mon)
      .replace('ddd', wdays[d.getDay()]);
  }

  _color(e) {
    if (e.color) return e.color;
    let h = 0;
    for (let i = 0; i < e.name.length; i++) h = e.name.charCodeAt(i) + ((h << 5) - h);
    return `hsl(${((h % 360) + 360) % 360}, 55%, 45%)`;
  }

  // ── Translation helper ──────────────────────────────────────────
  _t(key, fallback) {
    return (this.config.strings && this.config.strings[key]) || fallback;
  }

  // ── Format cycling ──────────────────────────────────────────────
  _FORMATS = ['days', 'weeks', 'months', 'years', 'detail'];

  _evtKey(e) { return `${e.name}|${e.date}`; }

  _loadFormats() {
    try { return JSON.parse(localStorage.getItem('countdown-card-formats') || '{}'); }
    catch { return {}; }
  }

  _saveFormats() {
    try { localStorage.setItem('countdown-card-formats', JSON.stringify(this._formats)); }
    catch { /* ignore */ }
  }

  _getFormat(e) { return this._formats[this._evtKey(e)] || 'days'; }

  _cycleFormat(e, ev) {
    ev.stopPropagation();
    const key = this._evtKey(e);
    const cur = this._formats[key] || 'days';
    const idx = this._FORMATS.indexOf(cur);
    this._formats = { ...this._formats, [key]: this._FORMATS[(idx + 1) % this._FORMATS.length] };
    this._saveFormats();
  }

  _detailedBreakdown(e) {
    const from = e.isPast ? e.targetDate : new Date();
    const to = e.isPast ? new Date() : e.targetDate;

    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    if (days > 0 || parts.length === 0) parts.push(`${days}d`);
    return parts.join(' ');
  }

  _calcWeeks(days) { return Math.round(days / 7 * 10) / 10; }

  _calcMonths(from, to) {
    let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    if (to.getDate() < from.getDate()) months--;
    return Math.max(0, months);
  }

  _calcYears(from, to) {
    let years = to.getFullYear() - from.getFullYear();
    const md = to.getMonth() - from.getMonth();
    if (md < 0 || (md === 0 && to.getDate() < from.getDate())) years--;
    return Math.max(0, years);
  }

  _val(e) {
    if (e.isToday) return '';
    // When event has time and is <24h away, show hours/minutes
    if (e.hasTime && e.absDiff < 1 && !e.isPast) {
      const ms = e.diffMs;
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      if (h > 0) return `${h}h ${m}m`;
      return `${m}m`;
    }
    const fmt = this._getFormat(e);
    const d = Math.round(e.absDiff);
    const from = e.isPast ? e.targetDate : new Date();
    const to = e.isPast ? new Date() : e.targetDate;
    switch (fmt) {
      case 'weeks': { const w = this._calcWeeks(d); return w % 1 === 0 ? w : w.toFixed(1); }
      case 'months': return this._calcMonths(from, to);
      case 'years': {
        const y = this._calcYears(from, to);
        if (y > 0) return y;
        return this._calcMonths(from, to); // fallback to months when <1 year
      }
      case 'detail': return this._detailedBreakdown(e);
      default: return d;
    }
  }

  _lbl(e) {
    if (e.isToday) return this._t('today', 'Today!');
    if (e.hasTime && e.absDiff < 1 && !e.isPast) return this._t('left', 'left');
    const fmt = this._getFormat(e);
    const suffix = e.isPast ? this._t('ago', 'ago') : this._t('left', 'left');
    switch (fmt) {
      case 'weeks': return `${this._t('weeks', 'weeks')} ${suffix}`;
      case 'months': { const v = this._calcMonths(
        e.isPast ? e.targetDate : new Date(), e.isPast ? new Date() : e.targetDate
      ); return v === 1 ? `${this._t('month', 'month')} ${suffix}` : `${this._t('months', 'months')} ${suffix}`; }
      case 'years': {
        const yv = this._calcYears(
          e.isPast ? e.targetDate : new Date(), e.isPast ? new Date() : e.targetDate
        );
        if (yv > 0) return yv === 1 ? `${this._t('year', 'year')} ${suffix}` : `${this._t('years', 'years')} ${suffix}`;
        const mv = this._calcMonths(
          e.isPast ? e.targetDate : new Date(), e.isPast ? new Date() : e.targetDate
        );
        return mv === 1 ? `${this._t('month', 'month')} ${suffix}` : `${this._t('months', 'months')} ${suffix}`;
      }
      case 'detail': return suffix;
      default: { const rd = Math.round(e.absDiff); return rd === 1 ? `${this._t('day', 'day')} ${suffix}` : `${this._t('days', 'days')} ${suffix}`; }
    }
  }

  // ── Form actions ────────────────────────────────────────────────
  // ── Persist config to HA dashboard via websocket ─────────────
  async _persistToHA() {
    if (!this._hass) return;
    try {
      const path = window.location.pathname;
      const match = path.match(/^\/([^/]+)/);
      let urlPath = match ? match[1] : null;
      if (urlPath === 'lovelace') urlPath = null;

      const dashConfig = await this._hass.callWS({
        type: 'lovelace/config',
        url_path: urlPath,
      });

      // Recursively find and update the countdown card in any layout structure
      const updateCard = (obj) => {
        if (!obj || typeof obj !== 'object') return false;
        if (Array.isArray(obj)) {
          for (let i = 0; i < obj.length; i++) {
            if (obj[i]?.type === 'custom:countdown-card') {
              obj[i] = { ...obj[i], events: [...this.config.events] };
              return true;
            }
            if (updateCard(obj[i])) return true;
          }
          return false;
        }
        for (const key of Object.keys(obj)) {
          if (updateCard(obj[key])) return true;
        }
        return false;
      };

      if (!updateCard(dashConfig)) return;

      await this._hass.callWS({
        type: 'lovelace/config/save',
        url_path: urlPath,
        config: dashConfig,
      });
    } catch (e) {
      console.warn('countdown-card: failed to persist', e);
    }
  }

  // ── Form actions ──────────────────────────────────────────
  _openNew() {
    this._resetForm();
    this._editIdx = -1;
    this._showForm = true;
  }

  _openEdit(e) {
    this._loadEventIntoForm(e);
    this._editIdx = e._idx;
    this._showForm = true;
  }

  _handleSave() {
    const evt = this._buildEventFromForm();
    if (!evt) return;
    const evts = [...(this.config.events || [])];
    if (this._editIdx >= 0) evts[this._editIdx] = evt;
    else evts.push(evt);
    this.config = { ...this.config, events: evts };
    this._showForm = false;
    // Persist after dialog closes so HA reload notification doesn't cover UI
    setTimeout(() => this._persistToHA(), 100);
  }

  _handleDelete() {
    if (this._editIdx < 0) return;
    const evts = [...(this.config.events || [])];
    evts.splice(this._editIdx, 1);
    this.config = { ...this.config, events: evts };
    this._showForm = false;
    setTimeout(() => this._persistToHA(), 100);
  }

  _closeForm() { this._showForm = false; }

  // ── Render ──────────────────────────────────────────────────────
  render() {
    if (!this.config) return html``;
    const evts = this._processEvents();
    const up = evts.filter(e => !e.isPast);
    const past = evts.filter(e => e.isPast);
    const sp = this.config.show_past !== false;

    return html`
      <ha-card>
        ${this.config.title !== false
          ? html`<div class="hdr">${this.config.title || 'Countdowns'}</div>` : ''}
        <div class="list">
          ${evts.length === 0
            ? html`<div class="empty">No events yet — tap + to add one!</div>`
            : html`
                ${up.length > 0 ? html`
                  ${this.config.show_labels !== false ? html`<div class="divider">${this._t('upcoming', 'Upcoming')}</div>` : ''}
                  ${up.map(e => this._row(e))}
                ` : ''}
                ${sp && past.length > 0 ? html`
                  ${this.config.show_labels !== false ? html`<div class="divider">${this._t('past', 'Past')}</div>` : ''}
                  ${past.map(e => this._row(e))}
                ` : ''}
              `}
        </div>
        ${this.config.show_add !== false && this.config.editable !== false ? html`
        <div class="add-wrap">
          <button class="add-btn" @click=${this._openNew}>
            <span class="add-plus">＋</span> New Countdown
          </button>
        </div>
        ` : ''}

        ${this._showForm ? html`
          <div class="overlay" @click=${this._closeForm}></div>
          <div class="dialog">
            ${this._renderFormBody(
              this._editIdx >= 0,
              () => this._handleSave(),
              () => this._handleDelete(),
              () => this._closeForm(),
            )}
          </div>
        ` : nothing}
      </ha-card>
    `;
  }

  _row(e) {
    const c = this._color(e);
    const rs = this.config.row_style || 'solid';
    const isMdi = e.icon && !e.icon.includes(':') && e.icon.length > 2;
    const rowStyle = rs === 'minimal' ? '' : rs === 'soft' ? `background:${c}33` : `background:${c}`;
    const textWhite = rs === 'solid';
    return html`
      <div class="row ${e.isPast ? 'past' : ''} ${this.config.editable !== false ? 'editable' : ''} ${e.isToday ? 'today' : ''} rs-${rs}"
           style="${rowStyle}"
           @click=${() => { if (this.config.editable !== false) this._openEdit(e); }}>
        ${rs === 'minimal' ? html`<div class="accent" style="background:${c}"></div>` : ''}
        <div class="ico" style="color:${textWhite ? 'rgba(255,255,255,.9)' : c}">
          ${isMdi ? html`<ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>` : html`<ha-icon icon="mdi:calendar"></ha-icon>`}
        </div>
        <div class="det">
          <div class="nm">${e.name}</div>
          <div class="dt">${this._fmt(e.originalDate)}</div>
          ${e.recurring && e.yearsElapsed > 0 ? html`
            <div class="dt since">${e.yearsElapsed} ${e.yearsElapsed === 1 ? this._t('year', 'year') : this._t('years', 'years')} ${this._t('ago', 'ago')}</div>
          ` : ''}
        </div>
        <div class="cd ${e.isToday ? 'cd-today' : ''}"
             @click=${(ev) => { if (!e.isToday) this._cycleFormat(e, ev); }}
             title="${e.isToday ? '' : 'Tap to change format'}">
          ${e.isToday ? html`
            <div class="today-ico" style="color:${textWhite ? 'rgba(255,255,255,.9)' : c}">
              ${isMdi ? html`<ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>` : html`<ha-icon icon="mdi:calendar"></ha-icon>`}
            </div>
            <div class="cl" style="${textWhite ? '' : `color:var(--t2)`}">${this._t('today_label', 'today')}</div>
          ` : html`
            <div class="cv ${this._getFormat(e) === 'detail' ? 'detail' : ''}" style="${!textWhite ? `color:${c}` : ''}">${this._val(e)}</div>
            <div class="cl">${this._lbl(e)}</div>
          `}
        </div>
      </div>
    `;
  }

  static get styles() {
    return [FORM_STYLES, css`
      :host {
        display: block;
        --a: var(--primary-color, #1976D2);
        --bg: var(--card-background-color, #fff);
        --t1: var(--primary-text-color, #333);
        --t2: var(--secondary-text-color, #888);
        --sf: var(--secondary-background-color, #f5f5f5);
      }
      ha-card { overflow: visible; position: relative; min-height: 100%; }
      .hdr { padding: 16px 16px 8px; font-size: 1.2em; font-weight: 500; color: var(--t1); }
      .list { padding: 0 16px 8px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
      .divider {
        padding: 12px 0 4px; font-size: .75em; font-weight: 600;
        text-transform: uppercase; letter-spacing: 1px; color: var(--t2);
      }
      .row {
        display: flex; align-items: center; padding: 12px 14px;
        border-radius: 12px; gap: 12px; cursor: default; position: relative;
        overflow: hidden;
        transition: box-shadow .15s;
      }
      .row:hover { box-shadow: 0 2px 8px rgba(0,0,0,.08); }
      .row.editable { cursor: pointer; }
      .row.today { }

      /* Row style: minimal — accent bar */
      .accent {
        position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
        border-radius: 4px 0 0 4px;
      }
      .row.rs-minimal { background: var(--sf); }
      .row.rs-soft { backdrop-filter: none; }



      .ico {
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        --mdc-icon-size: 24px;
      }
      .det { flex: 1; min-width: 0; }
      .nm {
        font-weight: 500; font-size: .95em; color: var(--t1);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .row.rs-solid .nm { color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.15); }
      .row.rs-solid .dt { color: rgba(255,255,255,.8); }
      .row.rs-solid .cv { color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.15); }
      .row.rs-solid .cl { color: rgba(255,255,255,.8); }
      .dt { font-size: .78em; color: var(--t2); margin-top: 2px; }
      .dt.since { font-style: italic; }
      .cd { text-align: right; flex-shrink: 0; min-width: 64px; cursor: pointer; -webkit-tap-highlight-color: transparent; user-select: none; padding-right: 2px; }
      .cd:active { opacity: .7; }
      .today-ico { display: flex; align-items: center; justify-content: center; --mdc-icon-size: 32px; }
      .cd-today { cursor: default; }
      .cv { font-size: 1.8em; font-weight: 700; line-height: 1; }
      .cv.detail { font-size: 1.1em; letter-spacing: .5px; }
      .cl { font-size: .7em; color: var(--t2); margin-top: 2px; }
      .row.past { opacity: 1; }
      .empty { padding: 32px; text-align: center; color: var(--t2); font-style: italic; }

      /* Add button */
      .add-wrap { display: flex; justify-content: center; padding: 8px 16px 16px; }
      .add-btn {
        display: flex; align-items: center; gap: 6px; width: 100%;
        justify-content: center;
        background: transparent; color: var(--a);
        border: 1px dashed var(--a); border-radius: 12px;
        padding: 10px 24px; font-size: .9em; font-weight: 500;
        cursor: pointer; font-family: inherit;
        transition: background .15s;
      }
      .add-btn:hover { background: rgba(25,118,210,.06); }
      .add-plus { font-size: 1.1em; }

      /* Overlay + Dialog */
      .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 1000; }
      .dialog {
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 92%; max-width: 420px; max-height: 85vh;
        overflow-y: auto; background: var(--bg);
        border-radius: 20px; z-index: 1001;
        padding: 16px 20px 24px;
        box-shadow: 0 24px 48px rgba(0,0,0,.3);
        color: var(--t1);
      }
    `];
  }

  getCardSize() {
    const n = this.config?.events?.length || 0;
    return Math.ceil(n * 1.2) + 2;
  }
}


// ═════════════════════════════════════════════════════════════════
//  CARD EDITOR (HA edit mode — for YAML events)
// ═════════════════════════════════════════════════════════════════
class CountdownCardEditor extends FormMixin(LitElement) {

  static get properties() {
    return {
      _config: { state: true },
      _showForm: { state: true }, _editIdx: { state: true },
      _formName: { state: true }, _formIcon: { state: true },
      _formColor: { state: true }, _formType: { state: true },
      _formRecurring: { state: true },
      _calY: { state: true }, _calM: { state: true }, _calD: { state: true }, _calView: { state: true },
      _emojiOpen: { state: true },
      _formHour: { state: true }, _formMinute: { state: true },
    };
  }

  constructor() {
    super();
    this._showForm = false;
    this._editIdx = -1;
    this._resetForm();
  }

  setConfig(config) { this._config = { ...config, events: [...(config.events || [])] }; }
  set hass(h) { this._hass = h; }

  _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  _openNew() { this._resetForm(); this._editIdx = -1; this._showForm = true; }

  _openEdit(i) {
    const e = this._config.events[i];
    if (!e) return;
    this._loadEventIntoForm(e);
    this._editIdx = i;
    this._showForm = true;
  }

  _save() {
    const evt = this._buildEventFromForm();
    if (!evt) return;
    const evts = [...(this._config.events || [])];
    if (this._editIdx >= 0) evts[this._editIdx] = evt;
    else evts.push(evt);
    this._config = { ...this._config, events: evts };
    this._fire();
    this._showForm = false;
  }

  _del(i) {
    const evts = [...(this._config.events || [])];
    evts.splice(i, 1);
    this._config = { ...this._config, events: evts };
    this._fire();
    this._showForm = false;
  }

  _move(i, dir) {
    const evts = [...(this._config.events || [])];
    const j = i + dir;
    if (j < 0 || j >= evts.length) return;
    [evts[i], evts[j]] = [evts[j], evts[i]];
    this._config = { ...this._config, events: evts };
    this._fire();
  }

  _setTitle(v) { this._config = { ...this._config, title: v || 'Countdowns' }; this._fire(); }

  _togPast() {
    this._config = { ...this._config, show_past: !(this._config.show_past !== false) };
    this._fire();
  }

  render() {
    if (!this._config) return html``;
    const evts = this._config.events || [];

    return html`
      <div class="editor">
        <div class="fld">
          <label>Card Title</label>
          <input type="text" .value=${this._config.title || 'Countdowns'}
                 @input=${(e) => this._setTitle(e.target.value)}>
        </div>

        <div class="fld row">
          <label>Show past events</label>
          <label class="sw">
            <input type="checkbox" .checked=${this._config.show_past !== false}
                   @change=${this._togPast}>
            <span class="sl"></span>
          </label>
        </div>

        <div class="fld row">
          <label>Show section labels</label>
          <label class="sw">
            <input type="checkbox" .checked=${this._config.show_labels !== false}
                   @change=${() => { this._config = { ...this._config, show_labels: !(this._config.show_labels !== false) }; this._fire(); }}>
            <span class="sl"></span>
          </label>
        </div>

        <div class="fld row">
          <label>Show add button</label>
          <label class="sw">
            <input type="checkbox" .checked=${this._config.show_add !== false}
                   @change=${() => { this._config = { ...this._config, show_add: !(this._config.show_add !== false) }; this._fire(); }}>
            <span class="sl"></span>
          </label>
        </div>

        <div class="fld">
          <label>Row style</label>
          <div class="tg tg-wrap">
            ${['solid','soft','minimal'].map(v => html`
              <button class="tb ${(this._config.row_style || 'solid') === v ? 'on' : ''}"
                      @click=${() => { this._config = { ...this._config, row_style: v }; this._fire(); }}>${v[0].toUpperCase() + v.slice(1)}</button>
            `)}
          </div>
        </div>

        <div class="fld">
          <label>Date format</label>
          <input type="text" .value=${this._config.date_format || ''}
                 placeholder="auto (e.g. DD/MM/YYYY, D MMM YYYY)"
                 @input=${(e) => { this._config = { ...this._config, date_format: e.target.value || undefined }; this._fire(); }}>
        </div>

        <div class="sec">Events (${evts.length})</div>
        <div class="evl">
          ${evts.map((ev, i) => html`
            <div class="er">
              <div class="ei-dot" style="background:${ev.color || PRESET_COLORS[0]}"></div>
              <div class="einf">
                <span class="en">${ev.name}</span>
                <span class="edt">${ev.date}${ev.recurring ? ` · ${typeof ev.recurring === 'string' ? ev.recurring[0].toUpperCase() + ev.recurring.slice(1) : 'Yearly'}` : ''}${ev.type && ev.type !== 'event' ? ` · ${ev.type}` : ''}</span>
              </div>
              <div class="ea">
                <button class="ib" @click=${() => this._move(i, -1)} ?disabled=${i === 0}>▲</button>
                <button class="ib" @click=${() => this._move(i, 1)} ?disabled=${i === evts.length - 1}>▼</button>
                <button class="ib" @click=${() => this._openEdit(i)}>✏️</button>
                <button class="ib x" @click=${() => this._del(i)}>🗑️</button>
              </div>
            </div>
          `)}
        </div>

        <button class="ab" @click=${this._openNew}>+ Add Event</button>

        ${this._showForm ? html`
          <div class="fp">
            ${this._renderFormBody(
              this._editIdx >= 0,
              () => this._save(),
              () => this._del(this._editIdx),
              () => { this._showForm = false; },
            )}
          </div>
        ` : nothing}
      </div>
    `;
  }

  static get styles() {
    return [FORM_STYLES, css`
      :host {
        display: block;
        --a: var(--primary-color, #1976D2);
        --bg: var(--card-background-color, #fff);
        --t1: var(--primary-text-color, #333);
        --t2: var(--secondary-text-color, #888);
        --sf: var(--secondary-background-color, #f5f5f5);
        --brd: var(--divider-color, #ddd);
      }
      .editor { padding: 0; }
      .fld { margin-bottom: 12px; }
      .fld label { display: block; font-size: .82em; font-weight: 600; color: var(--t2); margin-bottom: 4px; }
      .fld input[type="text"] {
        width: 100%; padding: 8px 12px; border: 1px solid var(--brd);
        border-radius: 8px; font-size: .95em; background: var(--sf);
        color: var(--t1); font-family: inherit; box-sizing: border-box;
      }
      .fld.row { display: flex; align-items: center; justify-content: space-between; }
      .sw { position: relative; width: 44px; height: 24px; display: inline-block; }
      .sw input { opacity: 0; width: 0; height: 0; }
      .sl { position: absolute; inset: 0; background: #ccc; border-radius: 24px; cursor: pointer; transition: .3s; }
      .sl::before { content: ''; position: absolute; width: 18px; height: 18px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .3s; }
      .sw input:checked + .sl { background: var(--a); }
      .sw input:checked + .sl::before { transform: translateX(20px); }
      .sec { font-size: .82em; font-weight: 600; color: var(--t2); margin: 16px 0 8px; text-transform: uppercase; letter-spacing: .5px; }
      .evl { display: flex; flex-direction: column; gap: 4px; }
      .er { display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: var(--sf); border-radius: 10px; }
      .ei-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
      .einf { flex: 1; min-width: 0; display: flex; flex-direction: column; }
      .en { font-weight: 600; font-size: .9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .edt { font-size: .75em; color: var(--t2); }
      .ea { display: flex; gap: 4px; }
      .ib.x:hover { background: #FFEBEE; }
      .ab {
        display: block; width: 100%; margin-top: 12px; padding: 10px;
        background: var(--a); color: #fff; border: none; border-radius: 10px;
        font-size: .92em; font-weight: 600; cursor: pointer; font-family: inherit;
      }
      .ab:hover { opacity: .88; }
      .fp { margin-top: 16px; padding: 16px; background: var(--sf); border-radius: 14px; max-height: 70vh; overflow-y: auto; }
    `];
  }
}


// ═════════════════════════════════════════════════════════════════
//  Register
// ═════════════════════════════════════════════════════════════════
customElements.define('countdown-card', CountdownCard);
customElements.define('countdown-card-editor', CountdownCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'countdown-card',
  name: 'Countdown Card',
  description: 'Track important events and dates with beautiful countdown timers',
  preview: true,
});
