import { LitElement, html, css, nothing } from 'lit';

// ─────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────
const PRESET_COLORS = [
  '#C62828', '#EF6C00', '#F9A825', '#2E7D32', '#1565C0', '#6A1B9A',
  '#00838F', '#4E342E',
];

const PRESET_DURATIONS = [
  { label: '30s',  seconds: 30 },
  { label: '1m',   seconds: 60 },
  { label: '2m',   seconds: 120 },
  { label: '5m',   seconds: 300 },
  { label: '10m',  seconds: 600 },
  { label: '15m',  seconds: 900 },
  { label: '30m',  seconds: 1800 },
  { label: '45m',  seconds: 2700 },
  { label: '1h',   seconds: 3600 },
  { label: '2h',   seconds: 7200 },
];

// ═════════════════════════════════════════════════════════════════
//  TIMER CARD
// ═════════════════════════════════════════════════════════════════
class CountdownTimerCard extends LitElement {

  static get properties() {
    return {
      config: {},
      _timers: { state: true },
      _tick: { state: true },
      _showForm: { state: true },
      _editIdx: { state: true },
      _formName: { state: true },
      _formH: { state: true },
      _formM: { state: true },
      _formS: { state: true },
      _formColor: { state: true },
    };
  }

  constructor() {
    super();
    this._timers = this._loadTimers();
    this._showForm = false;
    this._editIdx = -1;
    this._resetForm();
  }

  static getConfigElement() {
    return document.createElement('countdown-timer-card-editor');
  }

  static getStubConfig() {
    return { title: 'Timers' };
  }

  setConfig(config) {
    this.config = { ...config };
  }

  set hass(h) { this._hass = h; }

  // ── Persistence (localStorage) ────────────────────────────────
  _storageKey() { return 'countdown-timer-card-timers'; }

  _loadTimers() {
    try { return JSON.parse(localStorage.getItem('countdown-timer-card-timers') || '[]'); }
    catch { return []; }
  }

  _saveTimers() {
    try { localStorage.setItem('countdown-timer-card-timers', JSON.stringify(this._timers)); }
    catch { /* ignore */ }
  }

  // ── Lifecycle ─────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    this._tick = Date.now();
    this._interval = setInterval(() => { this._tick = Date.now(); }, 250);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._interval);
  }

  // ── Form ──────────────────────────────────────────────────────
  _resetForm() {
    this._formName = '';
    this._formH = 0;
    this._formM = 5;
    this._formS = 0;
    this._formColor = PRESET_COLORS[4]; // blue default
  }

  _totalFormSeconds() {
    return (parseInt(this._formH) || 0) * 3600
         + (parseInt(this._formM) || 0) * 60
         + (parseInt(this._formS) || 0);
  }

  _applyPreset(sec) {
    this._formH = Math.floor(sec / 3600);
    this._formM = Math.floor((sec % 3600) / 60);
    this._formS = sec % 60;
  }

  _openNew() {
    this._resetForm();
    this._editIdx = -1;
    this._showForm = true;
  }

  _openEdit(idx) {
    const t = this._timers[idx];
    if (!t) return;
    this._formName = t.name;
    this._formH = Math.floor(t.duration / 3600);
    this._formM = Math.floor((t.duration % 3600) / 60);
    this._formS = t.duration % 60;
    this._formColor = t.color || PRESET_COLORS[4];
    this._editIdx = idx;
    this._showForm = true;
  }

  _handleSave() {
    const dur = this._totalFormSeconds();
    if (dur <= 0) return;
    const timer = {
      name: this._formName.trim() || this._formatDuration(dur),
      duration: dur,
      color: this._formColor,
      remaining: dur,
      status: 'stopped', // stopped | running | paused | finished
      startedAt: null,
      pausedRemaining: null,
    };
    const timers = [...this._timers];
    if (this._editIdx >= 0) {
      // preserve running state if only name/color changed, reset if duration changed
      const old = timers[this._editIdx];
      if (old.duration === dur) {
        timer.remaining = old.remaining;
        timer.status = old.status;
        timer.startedAt = old.startedAt;
        timer.pausedRemaining = old.pausedRemaining;
      }
      timers[this._editIdx] = timer;
    } else {
      timers.push(timer);
    }
    this._timers = timers;
    this._saveTimers();
    this._showForm = false;
  }

  _handleDelete() {
    if (this._editIdx < 0) return;
    const timers = [...this._timers];
    timers.splice(this._editIdx, 1);
    this._timers = timers;
    this._saveTimers();
    this._showForm = false;
  }

  _closeForm() { this._showForm = false; }

  // ── Timer actions ─────────────────────────────────────────────
  _start(idx) {
    const timers = [...this._timers];
    const t = { ...timers[idx] };
    const rem = t.status === 'paused' && t.pausedRemaining != null ? t.pausedRemaining : t.duration;
    t.startedAt = Date.now();
    t.remaining = rem;
    t.pausedRemaining = null;
    t.status = 'running';
    timers[idx] = t;
    this._timers = timers;
    this._saveTimers();
  }

  _pause(idx) {
    const timers = [...this._timers];
    const t = { ...timers[idx] };
    const elapsed = (Date.now() - t.startedAt) / 1000;
    t.pausedRemaining = Math.max(0, t.remaining - elapsed);
    t.status = 'paused';
    t.startedAt = null;
    timers[idx] = t;
    this._timers = timers;
    this._saveTimers();
  }

  _reset(idx) {
    const timers = [...this._timers];
    const t = { ...timers[idx] };
    t.status = 'stopped';
    t.remaining = t.duration;
    t.startedAt = null;
    t.pausedRemaining = null;
    timers[idx] = t;
    this._timers = timers;
    this._saveTimers();
  }

  _remove(idx) {
    const timers = [...this._timers];
    timers.splice(idx, 1);
    this._timers = timers;
    this._saveTimers();
  }

  // ── Helpers ───────────────────────────────────────────────────
  _getRemainingSeconds(t) {
    if (t.status === 'stopped') return t.duration;
    if (t.status === 'paused') return Math.max(0, t.pausedRemaining || 0);
    if (t.status === 'finished') return 0;
    // running
    const elapsed = (Date.now() - t.startedAt) / 1000;
    const rem = t.remaining - elapsed;
    if (rem <= 0) {
      // Mark finished (will be committed on next save)
      return 0;
    }
    return rem;
  }

  _formatDuration(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  _progressPct(t) {
    const rem = this._getRemainingSeconds(t);
    if (t.duration <= 0) return 0;
    return Math.max(0, Math.min(100, (rem / t.duration) * 100));
  }

  // Check if any running timers just finished, and update them
  _checkFinished() {
    let changed = false;
    const timers = this._timers.map(t => {
      if (t.status === 'running') {
        const elapsed = (Date.now() - t.startedAt) / 1000;
        if (t.remaining - elapsed <= 0) {
          changed = true;
          return { ...t, status: 'finished', remaining: 0, startedAt: null, pausedRemaining: null };
        }
      }
      return t;
    });
    if (changed) {
      this._timers = timers;
      this._saveTimers();
    }
  }

  // ── Render ────────────────────────────────────────────────────
  render() {
    if (!this.config) return html``;
    this._checkFinished();

    return html`
      <ha-card>
        ${this.config.title !== false
          ? html`<div class="hdr">${this.config.title || 'Timers'}</div>` : ''}

        <div class="list">
          ${this._timers.length === 0
            ? html`<div class="empty">No timers yet — tap + to add one!</div>`
            : this._timers.map((t, i) => this._renderTimer(t, i))}
        </div>

        <div class="add-wrap">
          <button class="add-btn" @click=${this._openNew}>
            <span class="add-plus">＋</span> New Timer
          </button>
        </div>

        ${this._showForm ? html`
          <div class="overlay" @click=${this._closeForm}></div>
          <div class="dialog">
            ${this._renderForm()}
          </div>
        ` : nothing}
      </ha-card>
    `;
  }

  _renderTimer(t, idx) {
    const rem = this._getRemainingSeconds(t);
    const pct = this._progressPct(t);
    const c = t.color || PRESET_COLORS[4];
    const isFinished = t.status === 'finished';
    const isRunning = t.status === 'running';
    const isPaused = t.status === 'paused';
    const isStopped = t.status === 'stopped';

    return html`
      <div class="timer-row ${isFinished ? 'finished' : ''}" style="--tc:${c}">
        <div class="timer-progress" style="width:${pct}%; background:${c}${isFinished ? '' : '33'}"></div>
        <div class="timer-content">
          <div class="timer-info" @click=${() => this._openEdit(idx)}>
            <div class="timer-name">${t.name}</div>
            <div class="timer-display ${isFinished ? 'blink' : ''}" style="color:${isFinished ? c : ''}">${
              isFinished ? 'Done!' : this._formatDuration(rem)
            }</div>
          </div>
          <div class="timer-actions">
            ${isFinished ? html`
              <button class="tbtn reset" @click=${() => this._reset(idx)} title="Reset">
                <ha-icon icon="mdi:restart"></ha-icon>
              </button>
              <button class="tbtn remove" @click=${() => this._remove(idx)} title="Remove">
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            ` : isRunning ? html`
              <button class="tbtn pause" @click=${() => this._pause(idx)} title="Pause">
                <ha-icon icon="mdi:pause"></ha-icon>
              </button>
              <button class="tbtn reset" @click=${() => this._reset(idx)} title="Reset">
                <ha-icon icon="mdi:restart"></ha-icon>
              </button>
            ` : isPaused ? html`
              <button class="tbtn play" @click=${() => this._start(idx)} title="Resume" style="color:${c}">
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button class="tbtn reset" @click=${() => this._reset(idx)} title="Reset">
                <ha-icon icon="mdi:restart"></ha-icon>
              </button>
            ` : html`
              <button class="tbtn play" @click=${() => this._start(idx)} title="Start" style="color:${c}">
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  _renderForm() {
    const isEdit = this._editIdx >= 0;
    const totalSec = this._totalFormSeconds();

    return html`
      <div class="fh">
        <button class="ib" @click=${this._closeForm}>✕</button>
        <span class="ftit">${isEdit ? 'Edit Timer' : 'New Timer'}</span>
        <button class="savlnk" @click=${() => this._handleSave()} ?disabled=${totalSec <= 0}>Save</button>
      </div>

      <div class="fl">Name <span style="font-weight:400;opacity:.6">(optional)</span></div>
      <div class="inp-row">
        <input type="text" class="ni" placeholder="e.g. Laundry, Pizza, Workout"
               .value=${this._formName}
               @input=${(e) => { this._formName = e.target.value; }}>
      </div>

      <div class="fl">Duration</div>
      <div class="dur-row">
        <div class="dur-field">
          <input type="number" class="dur-inp" min="0" max="99" placeholder="0"
                 .value=${String(this._formH)}
                 @input=${(e) => { this._formH = parseInt(e.target.value) || 0; }}>
          <span class="dur-label">h</span>
        </div>
        <span class="dur-sep">:</span>
        <div class="dur-field">
          <input type="number" class="dur-inp" min="0" max="59" placeholder="0"
                 .value=${String(this._formM)}
                 @input=${(e) => { this._formM = parseInt(e.target.value) || 0; }}>
          <span class="dur-label">m</span>
        </div>
        <span class="dur-sep">:</span>
        <div class="dur-field">
          <input type="number" class="dur-inp" min="0" max="59" placeholder="0"
                 .value=${String(this._formS)}
                 @input=${(e) => { this._formS = parseInt(e.target.value) || 0; }}>
          <span class="dur-label">s</span>
        </div>
      </div>

      <div class="fl">Quick presets</div>
      <div class="presets">
        ${PRESET_DURATIONS.map(p => html`
          <button class="preset-btn ${totalSec === p.seconds ? 'sel' : ''}"
                  @click=${() => this._applyPreset(p.seconds)}>${p.label}</button>
        `)}
      </div>

      <div class="fl">Color</div>
      <div class="colr">
        ${PRESET_COLORS.map(c => html`
          <button class="cdot ${c === this._formColor ? 'sel' : ''}"
                  style="background:${c}"
                  @click=${() => { this._formColor = c; }}></button>
        `)}
      </div>

      <button class="savbtn" @click=${() => this._handleSave()} ?disabled=${totalSec <= 0}>
        ${isEdit ? 'Save Timer' : 'Add Timer'}
      </button>

      ${isEdit ? html`
        <button class="delbtn" @click=${() => this._handleDelete()}>Delete this timer</button>
      ` : nothing}
    `;
  }

  static get styles() {
    return css`
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
      .empty { padding: 32px; text-align: center; color: var(--t2); font-style: italic; }

      /* Timer rows */
      .timer-row {
        position: relative; overflow: hidden;
        border-radius: 12px; background: var(--sf);
        transition: box-shadow .15s;
      }
      .timer-row:hover { box-shadow: 0 2px 8px rgba(0,0,0,.08); }
      .timer-row.finished { animation: pulse 1.5s ease-in-out 3; }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .7; }
      }
      .timer-progress {
        position: absolute; left: 0; top: 0; bottom: 0;
        border-radius: 12px;
        transition: width .25s linear;
        pointer-events: none;
      }
      .timer-content {
        position: relative; z-index: 1;
        display: flex; align-items: center; padding: 12px 14px; gap: 12px;
      }
      .timer-info { flex: 1; min-width: 0; cursor: pointer; }
      .timer-name {
        font-weight: 500; font-size: .95em; color: var(--t1);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .timer-display {
        font-size: 1.6em; font-weight: 700; font-variant-numeric: tabular-nums;
        line-height: 1.2; color: var(--t1);
      }
      .timer-display.blink { animation: blink-text 1s ease-in-out infinite; }
      @keyframes blink-text {
        0%, 100% { opacity: 1; }
        50% { opacity: .3; }
      }
      .timer-actions { display: flex; gap: 6px; flex-shrink: 0; }
      .tbtn {
        display: flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 50%;
        border: none; background: rgba(0,0,0,.06); cursor: pointer;
        color: var(--t2); transition: .15s;
        --mdc-icon-size: 20px;
      }
      .tbtn:hover { background: rgba(0,0,0,.12); }
      .tbtn.play { background: rgba(0,0,0,.08); }
      .tbtn.play:hover { background: rgba(0,0,0,.15); }
      .tbtn.remove:hover { background: #FFEBEE; color: #C62828; }

      /* Add button */
      .add-wrap { display: flex; justify-content: center; padding: 8px 16px 16px; }
      .add-btn {
        display: flex; align-items: center; gap: 6px; width: 100%;
        justify-content: center;
        background: transparent; color: var(--a);
        border: 1px dashed var(--a); border-radius: 12px;
        padding: 10px 24px; font-size: .9em; font-weight: 500;
        cursor: pointer; font-family: inherit; transition: background .15s;
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

      /* Form */
      .fh {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 0 12px; position: sticky; top: 0;
        background: var(--bg); z-index: 1;
      }
      .ftit { font-weight: 600; font-size: 1.05em; }
      .ib {
        background: none; border: none; cursor: pointer; font-size: 1em;
        padding: 4px 8px; border-radius: 6px; font-family: inherit;
        color: var(--t2);
      }
      .ib:hover { background: rgba(0,0,0,.06); }
      .savlnk {
        background: none; border: none; font-size: .95em; font-weight: 600;
        cursor: pointer; padding: 4px 8px; font-family: inherit;
        color: var(--a);
      }
      .savlnk:disabled { opacity: .3; cursor: default; }
      .fl {
        font-size: .8em; font-weight: 600;
        color: var(--t2); margin: 16px 0 8px; text-transform: capitalize;
      }
      .inp-row {
        display: flex; align-items: center; gap: 8px;
        background: var(--sf); border-radius: 12px; padding: 8px 12px;
      }
      .ni {
        flex: 1; border: none; background: transparent; font-size: 1em;
        color: var(--t1); outline: none; font-family: inherit;
      }
      .ni::placeholder { color: var(--t2); }

      /* Duration inputs */
      .dur-row {
        display: flex; align-items: center; gap: 6px;
        background: var(--sf); border-radius: 12px; padding: 10px 12px;
        justify-content: center;
      }
      .dur-field { display: flex; align-items: baseline; gap: 2px; }
      .dur-inp {
        width: 52px; border: none; background: transparent; font-size: 1.4em;
        font-weight: 600; text-align: center;
        color: var(--t1); outline: none; font-family: inherit;
        -moz-appearance: textfield;
      }
      .dur-inp::-webkit-outer-spin-button, .dur-inp::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      .dur-inp::placeholder { color: var(--t2); }
      .dur-label { font-size: .8em; font-weight: 600; color: var(--t2); }
      .dur-sep { font-size: 1.4em; font-weight: 600; color: var(--t2); }

      /* Presets */
      .presets { display: flex; flex-wrap: wrap; gap: 6px; }
      .preset-btn {
        padding: 6px 14px; border-radius: 20px;
        border: 1px solid var(--sf); background: var(--sf);
        font-size: .85em; font-weight: 500; cursor: pointer;
        color: var(--t1); font-family: inherit; transition: .15s;
      }
      .preset-btn:hover { border-color: var(--a); color: var(--a); }
      .preset-btn.sel {
        background: var(--a); color: #fff; border-color: var(--a);
      }

      /* Colors */
      .colr { display: flex; gap: 10px; flex-wrap: wrap; }
      .cdot {
        width: 36px; height: 36px; border-radius: 50%;
        border: 3px solid transparent; cursor: pointer; transition: transform .15s;
      }
      .cdot:hover { transform: scale(1.12); }
      .cdot.sel { border-color: var(--t1); transform: scale(1.12); }

      /* Save / Delete */
      .savbtn {
        display: block; width: 100%; margin-top: 20px; padding: 12px;
        border: none; background: var(--a); color: #fff;
        border-radius: 12px; font-size: .9em; font-weight: 600;
        cursor: pointer; font-family: inherit;
      }
      .savbtn:hover { opacity: .88; }
      .savbtn:disabled { opacity: .3; cursor: default; }
      .delbtn {
        display: block; width: 100%; margin-top: 12px; padding: 12px;
        border: none; background: #FFEBEE; color: #C62828;
        border-radius: 12px; font-size: .9em; font-weight: 600;
        cursor: pointer; font-family: inherit;
      }
      .delbtn:hover { background: #FFCDD2; }
    `;
  }

  getCardSize() {
    return Math.ceil((this._timers?.length || 0) * 1.2) + 2;
  }
}


// ═════════════════════════════════════════════════════════════════
//  TIMER CARD EDITOR
// ═════════════════════════════════════════════════════════════════
class CountdownTimerCardEditor extends LitElement {

  static get properties() {
    return { _config: { state: true } };
  }

  setConfig(config) { this._config = { ...config }; }
  set hass(h) { this._hass = h; }

  _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  render() {
    if (!this._config) return html``;
    return html`
      <div class="editor">
        <div class="fld">
          <label>Card Title</label>
          <input type="text" .value=${this._config.title || 'Timers'}
                 @input=${(e) => { this._config = { ...this._config, title: e.target.value || 'Timers' }; this._fire(); }}>
        </div>
        <p class="note">Timers are managed directly on the card. Add, start, pause, and remove timers from the card UI.</p>
      </div>
    `;
  }

  static get styles() {
    return css`
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
      .note { font-size: .85em; color: var(--t2); margin-top: 12px; font-style: italic; }
    `;
  }
}


// ═════════════════════════════════════════════════════════════════
//  Register
// ═════════════════════════════════════════════════════════════════
customElements.define('countdown-timer-card', CountdownTimerCard);
customElements.define('countdown-timer-card-editor', CountdownTimerCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'countdown-timer-card',
  name: 'Countdown Timer Card',
  description: 'Set quick countdown timers — 15 seconds, 5 minutes, or any custom duration',
  preview: true,
});
