/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(i,t,s)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",_=u.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??b)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,_?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,D="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,C=`<${S}>`,M=document,P=()=>M.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,z="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,I=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,Y=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),B=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),L=new WeakMap,W=M.createTreeWalker(M,129);function q(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(n.lastIndex=d,c=n.exec(s),null!==c);)d=n.lastIndex,n===N?"!--"===c[1]?n=O:void 0!==c[1]?n=U:void 0!==c[2]?(Y.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=I):void 0!==c[3]&&(n=I):n===I?">"===c[0]?(n=r??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?I:'"'===c[3]?H:R):n===H||n===R?n=I:n===O||n===U?n=N:(n=I,r=void 0);const h=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===N?s+C:l>=0?(i.push(a),s.slice(0,l)+D+s.slice(l)+E+h):s+E+(-2===l?e:h)}return[q(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=J.createElement(c,s),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(D)){const e=l[o++],s=i.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:Q}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(Y.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),W.nextNode(),a.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===B)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=F(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);W.currentNode=i;let r=W.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new G(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=W.nextNode(),o++)}return W.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),F(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(q(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new G(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!F(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,i[s+n],e,n),a===B&&(a=this._$AH[n]),o||=!F(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends Q{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===B)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(J,G),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new G(e.insertBefore(P(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ct=["#C62828","#EF6C00","#F9A825","#2E7D32","#1565C0","#6A1B9A","#00838F","#4E342E"],lt=["calendar","cake","party-popper","airplane","home","car","gift","heart","ring","baby-carriage","school","briefcase","palm-tree","snowflake","star","trophy","music","paw"],dt=t=>class extends t{_resetForm(){const t=new Date;this._formName="",this._formIcon="calendar",this._formColor=ct[0],this._formType="event",this._formRecurring="never",this._calY=t.getFullYear(),this._calM=t.getMonth(),this._calD=t.getDate(),this._calView="days",this._emojiOpen=!1}_loadEventIntoForm(t){const[e,s,i]=t.date.split("-").map(Number);this._formName=t.name,this._formIcon=t.icon||"calendar",this._formColor=t.color||ct[0],this._formType=t.type||"event",this._formRecurring=!0===t.recurring?"yearly":t.recurring||"never",this._calY=e,this._calM=s-1,this._calD=i,this._calView="days",this._emojiOpen=!1}_buildEventFromForm(){if(!this._formName.trim())return null;const t=String(this._calM+1).padStart(2,"0"),e=String(this._calD).padStart(2,"0");return{name:this._formName.trim(),date:`${this._calY}-${t}-${e}`,icon:this._formIcon,color:this._formColor,type:this._formType,recurring:"never"!==this._formRecurring&&this._formRecurring}}_dim(t,e){return new Date(t,e+1,0).getDate()}_fdw(t,e){return new Date(t,e,1).getDay()}_prevM(){0===this._calM?(this._calM=11,this._calY--):this._calM--;const t=this._dim(this._calY,this._calM);this._calD>t&&(this._calD=t)}_nextM(){11===this._calM?(this._calM=0,this._calY++):this._calM++;const t=this._dim(this._calY,this._calM);this._calD>t&&(this._calD=t)}_renderDayPicker(t){const e=this._calY,s=this._calM,i=this._dim(e,s),r=this._fdw(e,s),o=new Date(e,s).toLocaleDateString(navigator.language,{month:"long"}),n=Array.from({length:r},()=>null),a=Array.from({length:i},(t,e)=>e+1),c=[...n,...a];return j`
      <div class="calh">
        <div class="calh-btns">
          <button class="calm-btn" @click=${()=>{this._calView="months"}}>${o}</button>
          <button class="calm-btn" @click=${()=>{this._calView="years"}}>${e}</button>
        </div>
      </div>
      <div class="calw">${["S","M","T","W","T","F","S"].map(t=>j`<span>${t}</span>`)}</div>
      <div class="calg">
        ${c.map(i=>null===i?j`<span class="calc"></span>`:j`<button class="calc ${i===this._calD?"sel":""} ${(i=>t.getFullYear()===e&&t.getMonth()===s&&t.getDate()===i)(i)?"tod":""}"
              @click=${()=>{this._calD=i}}>${i}</button>`)}
      </div>
    `}_renderMonthPicker(){const t=Array.from({length:12},(t,e)=>new Date(2e3,e).toLocaleDateString(navigator.language,{month:"short"}));return j`
      <div class="calh">
        <button class="calm-btn" @click=${()=>{this._calView="years"}}>${this._calY}</button>
      </div>
      <div class="month-grid">
        ${t.map((t,e)=>j`
          <button class="month-cell ${e===this._calM?"sel":""}"
                  @click=${()=>{this._calM=e,this._calView="days";const t=this._dim(this._calY,this._calM);this._calD>t&&(this._calD=t)}}>${t}</button>
        `)}
      </div>
    `}_renderYearPicker(){const t=12*Math.floor(this._calY/12)-1,e=Array.from({length:16},(e,s)=>t+s),s=(new Date).getFullYear();return j`
      <div class="calh">
        <span class="calm">${t+1} – ${t+14}</span>
        <div class="caln">
          <button class="calb" @click=${()=>{this._calY-=12}}>&#8249;</button>
          <button class="calb" @click=${()=>{this._calY+=12}}>&#8250;</button>
        </div>
      </div>
      <div class="year-grid">
        ${e.map(t=>j`
          <button class="year-cell ${t===this._calY?"sel":""} ${t===s?"tod":""}"
                  @click=${()=>{this._calY=t,this._calView="months"}}>${t}</button>
        `)}
      </div>
    `}_renderFormBody(t,e,s,i){const r=new Date;return j`
      <div class="fh">
        <button class="ib" @click=${i}>✕</button>
        <span class="ftit">${t?"Edit Countdown":"New Countdown"}</span>
        <button class="savlnk" @click=${e} ?disabled=${!this._formName.trim()}>Save</button>
      </div>

      <div class="fl">Title</div>
      <div class="tr">
        <input type="text" class="ni" placeholder="Name your countdown"
               .value=${this._formName}
               @input=${t=>{this._formName=t.target.value}}>
      </div>

      <div class="fl">Icon</div>
      <div class="icon-grid">
        ${lt.map(t=>j`
          <button class="icon-opt ${t===this._formIcon?"sel":""}"
                  @click=${()=>{this._formIcon=t}}>
            <ha-icon .icon=${`mdi:${t}`}></ha-icon>
          </button>
        `)}
      </div>

      <div class="fl">Pick a date</div>
      <div class="cal">
        ${"years"===this._calView?this._renderYearPicker():"months"===this._calView?this._renderMonthPicker():this._renderDayPicker(r)}
      </div>

      <div class="fl">Pick a color</div>
      <div class="colr">
        ${ct.map(t=>j`
          <button class="cdot ${t===this._formColor?"sel":""}"
                  style="background:${t}"
                  @click=${()=>{this._formColor=t}}></button>
        `)}
      </div>

      <div class="fl">Repeat</div>
      <div class="tg tg-wrap">
        ${["never","daily","weekly","monthly","yearly"].map(t=>j`
          <button class="tb ${this._formRecurring===t?"on":""}"
                  @click=${()=>{this._formRecurring=t}}>${t[0].toUpperCase()+t.slice(1)}</button>
        `)}
      </div>

      ${t?j`
        <button class="delbtn" @click=${s}>Delete this countdown</button>
      `:V}
    `}},ht=o`
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
  .calh-btns { display: flex; gap: 4px; }
  .calm { font-weight: 600; font-size: .95em; text-transform: capitalize; }
  .calm-btn {
    background: none; border: none; cursor: pointer; padding: 4px 8px;
    font-weight: 600; font-size: .95em; text-transform: capitalize;
    color: var(--a, var(--primary-color, #1976D2)); font-family: inherit;
    border-radius: 6px;
  }
  .calm-btn:hover { background: rgba(0,0,0,.06); }
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

  /* Delete */
  .delbtn {
    display: block; width: 100%; margin-top: 20px; padding: 12px;
    border: none; background: #FFEBEE; color: #C62828;
    border-radius: 12px; font-size: .9em; font-weight: 600;
    cursor: pointer; font-family: inherit;
  }
  .delbtn:hover { background: #FFCDD2; }
`;class pt extends(dt(nt)){static get properties(){return{config:{},_tick:{state:!0},_formats:{state:!0},_showForm:{state:!0},_editIdx:{state:!0},_formName:{state:!0},_formIcon:{state:!0},_formColor:{state:!0},_formType:{state:!0},_formRecurring:{state:!0},_calY:{state:!0},_calM:{state:!0},_calD:{state:!0},_calView:{state:!0},_emojiOpen:{state:!0}}}constructor(){super(),this._formats={},this._showForm=!1,this._editIdx=-1,this._resetForm()}static getConfigElement(){return document.createElement("countdown-card-editor")}static getStubConfig(){return{title:"Countdowns",show_past:!0,events:[{name:"Summer Vacation",date:"2026-08-01",icon:"airplane",color:"#1565C0"},{name:"Sarah's Birthday",date:"1990-03-15",icon:"cake",color:"#7B1FA2",recurring:"yearly"},{name:"New Year",date:"2027-01-01",icon:"party-popper",color:"#2E7D32",recurring:"yearly"}]}}setConfig(t){this.config={...t,events:t.events||[]}}set hass(t){this._hass=t}connectedCallback(){super.connectedCallback(),this._tick=Date.now(),this._timer=setInterval(()=>{this._tick=Date.now()},6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._timer)}_allEvents(){return(this.config.events||[]).map((t,e)=>({...t,_idx:e}))}_processEvents(){const t=new Date;t.setHours(0,0,0,0);const e=t.getTime(),s=!1!==this.config.show_past,i=this._allEvents().map(s=>{const[i,r,o]=s.date.split("-").map(Number),n=new Date(i,r-1,o);let a=new Date(n);const c=!0===s.recurring?"yearly":s.recurring||!1;if("yearly"===c)a=new Date(t.getFullYear(),n.getMonth(),n.getDate()),a.getTime()<e&&(a=new Date(t.getFullYear()+1,n.getMonth(),n.getDate()));else if("monthly"===c)a=new Date(t.getFullYear(),t.getMonth(),n.getDate()),a.getTime()<e&&(a=new Date(t.getFullYear(),t.getMonth()+1,n.getDate()));else if("weekly"===c){const s=n.getDay();a=new Date(t);let i=s-t.getDay();i<0&&(i+=7),0===i&&e>n.getTime()&&(i=0),a.setDate(t.getDate()+i),a.setHours(0,0,0,0)}else"daily"===c&&(a=new Date(t),a.setHours(0,0,0,0));let l=t.getFullYear()-n.getFullYear();const d=t.getMonth()-n.getMonth();(d<0||0===d&&t.getDate()<n.getDate())&&l--;const h=Math.round((a.getTime()-e)/864e5);return{...s,icon:s.icon||"calendar",originalDate:n,targetDate:a,diff:h,absDiff:Math.abs(h),isToday:0===h,isPast:h<0,yearsElapsed:l}}),r=s?i:i.filter(t=>!t.isPast);return r.sort((t,e)=>t.isToday!==e.isToday?t.isToday?-1:1:t.isPast||e.isPast?t.isPast&&e.isPast?e.diff-t.diff:t.isPast?1:-1:t.diff-e.diff),r}_fmt(t){return t.toLocaleDateString(navigator.language,{weekday:"short",day:"numeric",month:"short",year:"numeric"})}_color(t){if(t.color)return t.color;let e=0;for(let s=0;s<t.name.length;s++)e=t.name.charCodeAt(s)+((e<<5)-e);return`hsl(${(e%360+360)%360}, 55%, 45%)`}_FORMATS=["days","weeks","months","years","detail"];_evtKey(t){return`${t.name}|${t.date}`}_getFormat(t){return this._formats[this._evtKey(t)]||"days"}_cycleFormat(t,e){e.stopPropagation();const s=this._evtKey(t),i=this._formats[s]||"days",r=this._FORMATS.indexOf(i);this._formats={...this._formats,[s]:this._FORMATS[(r+1)%this._FORMATS.length]}}_detailedBreakdown(t){const e=t.isPast?t.targetDate:new Date,s=t.isPast?new Date:t.targetDate;let i=s.getFullYear()-e.getFullYear(),r=s.getMonth()-e.getMonth(),o=s.getDate()-e.getDate();if(o<0){r--;o+=new Date(s.getFullYear(),s.getMonth(),0).getDate()}r<0&&(i--,r+=12);const n=[];return i>0&&n.push(`${i}y`),r>0&&n.push(`${r}m`),(o>0||0===n.length)&&n.push(`${o}d`),n.join(" ")}_calcWeeks(t){return Math.round(t/7*10)/10}_calcMonths(t,e){let s=12*(e.getFullYear()-t.getFullYear())+(e.getMonth()-t.getMonth());return e.getDate()<t.getDate()&&s--,Math.max(0,s)}_calcYears(t,e){let s=e.getFullYear()-t.getFullYear();const i=e.getMonth()-t.getMonth();return(i<0||0===i&&e.getDate()<t.getDate())&&s--,Math.max(0,s)}_val(t){if(t.isToday)return"🎉";const e=this._getFormat(t),s=t.absDiff,i=t.isPast?t.targetDate:new Date,r=t.isPast?new Date:t.targetDate;switch(e){case"weeks":{const t=this._calcWeeks(s);return t%1==0?t:t.toFixed(1)}case"months":return this._calcMonths(i,r);case"years":{const t=this._calcYears(i,r);return t>0?t:this._calcMonths(i,r)}case"detail":return this._detailedBreakdown(t);default:return s}}_lbl(t){if(t.isToday)return"Today!";const e=this._getFormat(t),s=t.isPast?"ago":"left";switch(e){case"weeks":return`weeks ${s}`;case"months":return 1===this._calcMonths(t.isPast?t.targetDate:new Date,t.isPast?new Date:t.targetDate)?`month ${s}`:`months ${s}`;case"years":{const e=this._calcYears(t.isPast?t.targetDate:new Date,t.isPast?new Date:t.targetDate);if(e>0)return 1===e?`year ${s}`:`years ${s}`;return 1===this._calcMonths(t.isPast?t.targetDate:new Date,t.isPast?new Date:t.targetDate)?`month ${s}`:`months ${s}`}case"detail":return s;default:return 1===t.absDiff?`day ${s}`:`days ${s}`}}async _persistToHA(){if(this._hass)try{const t=window.location.pathname.match(/^\/([^/]+)/);let e=t?t[1]:null;"lovelace"===e&&(e=null);const s=await this._hass.callWS({type:"lovelace/config",url_path:e}),i=t=>{if(!t||"object"!=typeof t)return!1;if(Array.isArray(t)){for(let e=0;e<t.length;e++){if("custom:countdown-card"===t[e]?.type)return t[e]={...t[e],events:[...this.config.events]},!0;if(i(t[e]))return!0}return!1}for(const e of Object.keys(t))if(i(t[e]))return!0;return!1};if(!i(s))return;await this._hass.callWS({type:"lovelace/config/save",url_path:e,config:s})}catch(t){console.warn("countdown-card: failed to persist",t)}}_openNew(){this._resetForm(),this._editIdx=-1,this._showForm=!0}_openEdit(t){this._loadEventIntoForm(t),this._editIdx=t._idx,this._showForm=!0}_handleSave(){const t=this._buildEventFromForm();if(!t)return;const e=[...this.config.events||[]];this._editIdx>=0?e[this._editIdx]=t:e.push(t),this.config={...this.config,events:e},this._persistToHA(),this._showForm=!1}_handleDelete(){if(this._editIdx<0)return;const t=[...this.config.events||[]];t.splice(this._editIdx,1),this.config={...this.config,events:t},this._persistToHA(),this._showForm=!1}_closeForm(){this._showForm=!1}render(){if(!this.config)return j``;const t=this._processEvents(),e=t.filter(t=>!t.isPast),s=t.filter(t=>t.isPast),i=!1!==this.config.show_past;return j`
      <ha-card>
        ${!1!==this.config.title?j`<div class="hdr">${this.config.title||"Countdowns"}</div>`:""}
        <div class="list">
          ${0===t.length?j`<div class="empty">No events yet — tap + to add one!</div>`:j`
                ${e.length>0?j`
                  <div class="divider">Upcoming</div>
                  ${e.map(t=>this._row(t))}
                `:""}
                ${i&&s.length>0?j`
                  <div class="divider">Past</div>
                  ${s.map(t=>this._row(t))}
                `:""}
              `}
        </div>
        <div class="add-wrap">
          <button class="add-btn" @click=${this._openNew}>
            <span class="add-plus">＋</span> New Countdown
          </button>
        </div>

        ${this._showForm?j`
          <div class="overlay" @click=${this._closeForm}></div>
          <div class="dialog">
            ${this._renderFormBody(this._editIdx>=0,()=>this._handleSave(),()=>this._handleDelete(),()=>this._closeForm())}
          </div>
        `:V}
      </ha-card>
    `}_row(t){const e=this._color(t),s=t.icon&&!t.icon.includes(":")&&t.icon.length>2;return j`
      <div class="row ${t.isPast?"past":""} editable ${t.isToday?"today":""}"
           style="background: ${e}CC"
           @click=${()=>this._openEdit(t)}>
        <div class="accent" style="background:${e}"></div>
        <div class="ico" style="color:${e}">
          ${s?j`<ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>`:j`<ha-icon icon="mdi:calendar"></ha-icon>`}
        </div>
        <div class="det">
          <div class="nm">${t.name}</div>
          <div class="dt">${this._fmt(t.isPast?t.originalDate:t.targetDate)}</div>
        </div>
        <div class="cd"
             @click=${e=>this._cycleFormat(t,e)}
             title="Tap to change format">
          <div class="cv ${"detail"===this._getFormat(t)?"detail":""}" style="color:${e}">${this._val(t)}</div>
          <div class="cl">${this._lbl(t)}</div>
        </div>
      </div>
    `}static get styles(){return[ht,o`
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
        display: flex; align-items: center; padding: 12px 14px 12px 0;
        border-radius: 12px; gap: 12px; cursor: default; position: relative;
        background: var(--sf); overflow: hidden;
        transition: box-shadow .15s;
      }
      .row:hover { box-shadow: 0 2px 8px rgba(0,0,0,.08); }
      .row.editable { cursor: pointer; }
      .row.today { background: var(--sf); }

      /* Accent bar */
      .accent {
        position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
        border-radius: 4px 0 0 4px;
      }

      .ico {
        margin-left: 14px; display: flex; align-items: center; justify-content: center;
        --mdc-icon-size: 24px;
      }
      .det { flex: 1; min-width: 0; }
      .nm {
        font-weight: 500; font-size: .95em; color: #fff;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        text-shadow: 0 1px 2px rgba(0,0,0,.15);
      }
      .dt { font-size: .78em; color: rgba(255,255,255,.8); margin-top: 2px; }
      .cd { text-align: right; flex-shrink: 0; min-width: 64px; cursor: pointer; -webkit-tap-highlight-color: transparent; user-select: none; padding-right: 2px; }
      .cd:active { opacity: .7; }
      .cv { font-size: 1.8em; font-weight: 700; line-height: 1; color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,.15); }
      .cv.detail { font-size: 1.1em; letter-spacing: .5px; }
      .cl { font-size: .7em; color: rgba(255,255,255,.8); text-transform: lowercase; margin-top: 2px; }
      .row.past { opacity: 1; }
      .ico { color: rgba(255,255,255,.9) !important; }
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
    `]}getCardSize(){const t=this.config?.events?.length||0;return Math.ceil(1.2*t)+2}}class ut extends(dt(nt)){static get properties(){return{_config:{state:!0},_showForm:{state:!0},_editIdx:{state:!0},_formName:{state:!0},_formIcon:{state:!0},_formColor:{state:!0},_formType:{state:!0},_formRecurring:{state:!0},_calY:{state:!0},_calM:{state:!0},_calD:{state:!0},_calView:{state:!0},_emojiOpen:{state:!0}}}constructor(){super(),this._showForm=!1,this._editIdx=-1,this._resetForm()}setConfig(t){this._config={...t}}set hass(t){this._hass=t}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_openNew(){this._resetForm(),this._editIdx=-1,this._showForm=!0}_openEdit(t){const e=this._config.events[t];e&&(this._loadEventIntoForm(e),this._editIdx=t,this._showForm=!0)}_save(){const t=this._buildEventFromForm();if(!t)return;const e=[...this._config.events||[]];this._editIdx>=0?e[this._editIdx]=t:e.push(t),this._config={...this._config,events:e},this._fire(),this._showForm=!1}_del(t){const e=[...this._config.events||[]];e.splice(t,1),this._config={...this._config,events:e},this._fire(),this._showForm=!1}_move(t,e){const s=[...this._config.events||[]],i=t+e;i<0||i>=s.length||([s[t],s[i]]=[s[i],s[t]],this._config={...this._config,events:s},this._fire())}_setTitle(t){this._config={...this._config,title:t||"Countdowns"},this._fire()}_togPast(){this._config={...this._config,show_past:!(!1!==this._config.show_past)},this._fire()}render(){if(!this._config)return j``;const t=this._config.events||[];return j`
      <div class="editor">
        <div class="fld">
          <label>Card Title</label>
          <input type="text" .value=${this._config.title||"Countdowns"}
                 @input=${t=>this._setTitle(t.target.value)}>
        </div>

        <div class="fld row">
          <label>Show past events</label>
          <label class="sw">
            <input type="checkbox" .checked=${!1!==this._config.show_past}
                   @change=${this._togPast}>
            <span class="sl"></span>
          </label>
        </div>

        <div class="sec">Events (${t.length})</div>
        <div class="evl">
          ${t.map((e,s)=>j`
            <div class="er">
              <div class="ei-dot" style="background:${e.color||ct[0]}"></div>
              <div class="einf">
                <span class="en">${e.name}</span>
                <span class="edt">${e.date}${e.recurring?" · Yearly":""}${e.type&&"event"!==e.type?` · ${e.type}`:""}</span>
              </div>
              <div class="ea">
                <button class="ib" @click=${()=>this._move(s,-1)} ?disabled=${0===s}>▲</button>
                <button class="ib" @click=${()=>this._move(s,1)} ?disabled=${s===t.length-1}>▼</button>
                <button class="ib" @click=${()=>this._openEdit(s)}>✏️</button>
                <button class="ib x" @click=${()=>this._del(s)}>🗑️</button>
              </div>
            </div>
          `)}
        </div>

        <button class="ab" @click=${this._openNew}>+ Add Event</button>

        ${this._showForm?j`
          <div class="fp">
            ${this._renderFormBody(this._editIdx>=0,()=>this._save(),()=>this._del(this._editIdx),()=>{this._showForm=!1})}
          </div>
        `:V}
      </div>
    `}static get styles(){return[ht,o`
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
      .fp { margin-top: 16px; padding: 16px; background: var(--sf); border-radius: 14px; }
    `]}}customElements.define("countdown-card",pt),customElements.define("countdown-card-editor",ut),window.customCards=window.customCards||[],window.customCards.push({type:"countdown-card",name:"Countdown Card",description:"Track important events and dates with beautiful countdown timers",preview:!0});
