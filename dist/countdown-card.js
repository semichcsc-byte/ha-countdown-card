/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!n(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,m?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,k=w.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,D="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+M,S=`<${E}>`,C=document,F=()=>C.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,z="[ \t\n\f\r]",Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,H=/>/g,O=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,I=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),L=new WeakMap,W=C.createTreeWalker(C,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=Y;for(let e=0;e<i;e++){const i=t[e];let n,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===Y?"!--"===c[1]?a=N:void 0!==c[1]?a=H:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=O):void 0!==c[3]&&(a=O):a===O?">"===c[0]?(a=r??Y,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,n=c[1],a=void 0===c[3]?O:'"'===c[3]?U:R):a===U||a===R?a=O:a===N||a===H?a=Y:(a=O,r=void 0);const h=a===O&&t[e+1].startsWith("/>")?" ":"";o+=a===Y?i+S:l>=0?(s.push(n),i.slice(0,l)+D+i.slice(l)+M+h):i+M+(-2===l?e:h)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[c,l]=q(t,e);if(this.el=K.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(D)){const e=l[o++],i=s.getAttribute(t).split(M),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(M)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(M),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],F()),W.nextNode(),n.push({type:2,index:++r});s.append(t[e],F())}}}else if(8===s.nodeType)if(s.data===E)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(M,t+1));)n.push({type:7,index:r}),t+=M.length-1}r++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=P(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??C).importNode(e,!0);W.currentNode=s;let r=W.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new X(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(r=W.nextNode(),o++)}return W.currentNode=C,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),P(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new K(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new X(this.O(F()),this.O(F()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=G(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=G(this,s[i+a],e,a),n===B&&(n=this._$AH[a]),o||=!P(n)||n!==this._$AH[a],n===V?t=V:t!==V&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===B)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(K,X),(w.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new X(e.insertBefore(F(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const nt=ot.litElementPolyfillSupport;nt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ct=864e5,lt=["#C62828","#EF6C00","#F9A825","#2E7D32","#1565C0","#6A1B9A","#00838F","#4E342E"],dt=["calendar","cake","party-popper","airplane","home","car","gift","heart","ring","baby-carriage","school","briefcase","palm-tree","snowflake","star","trophy","music","paw"],ht=t=>class extends t{_resetForm(){const t=new Date;this._formName="",this._formIcon="calendar",this._formColor=lt[0],this._formType="event",this._formRecurring="never",this._calY=t.getFullYear(),this._calM=t.getMonth(),this._calD=t.getDate(),this._calView="days",this._formHour="",this._formMinute="",this._emojiOpen=!1}_loadEventIntoForm(t){const e=t.date.split(" "),[i,s,r]=e[0].split("-").map(Number);if(this._formName=t.name,this._formIcon=t.icon||"calendar",this._formColor=t.color||lt[0],this._formType=t.type||"event",this._formRecurring=!0===t.recurring?"yearly":t.recurring||"never",this._calY=i,this._calM=s-1,this._calD=r,e[1]){const[t,i]=e[1].split(":");this._formHour=t||"",this._formMinute=i||""}else this._formHour="",this._formMinute="";this._calView="days",this._emojiOpen=!1}_buildEventFromForm(){if(!this._formName.trim())return null;const t=String(this._calM+1).padStart(2,"0"),e=String(this._calD).padStart(2,"0"),i=""!==this._formHour&&""!==this._formMinute?`${this._calY}-${t}-${e} ${String(this._formHour).padStart(2,"0")}:${String(this._formMinute).padStart(2,"0")}`:`${this._calY}-${t}-${e}`;return{name:this._formName.trim(),date:i,icon:this._formIcon,color:this._formColor,type:this._formType,recurring:"never"!==this._formRecurring&&this._formRecurring}}_dim(t,e){return new Date(t,e+1,0).getDate()}_fdw(t,e){return new Date(t,e,1).getDay()}_prevM(){0===this._calM?(this._calM=11,this._calY--):this._calM--;const t=this._dim(this._calY,this._calM);this._calD>t&&(this._calD=t)}_nextM(){11===this._calM?(this._calM=0,this._calY++):this._calM++;const t=this._dim(this._calY,this._calM);this._calD>t&&(this._calD=t)}_renderDayPicker(t){const e=this._calY,i=this._calM,s=this._dim(e,i),r=this._fdw(e,i),o=new Date(e,i).toLocaleDateString(navigator.language,{month:"long"}),a=Array.from({length:r},()=>null),n=Array.from({length:s},(t,e)=>e+1),c=[...a,...n];return j`
      <div class="calh">
        <div class="calh-btns">
          <button class="calm-btn" @click=${()=>{this._calView="months"}}>${o}</button>
          <button class="calm-btn" @click=${()=>{this._calView="years"}}>${e}</button>
        </div>
      </div>
      <div class="calw">${["S","M","T","W","T","F","S"].map(t=>j`<span>${t}</span>`)}</div>
      <div class="calg">
        ${c.map(s=>null===s?j`<span class="calc"></span>`:j`<button class="calc ${s===this._calD?"sel":""} ${(s=>t.getFullYear()===e&&t.getMonth()===i&&t.getDate()===s)(s)?"tod":""}"
              @click=${()=>{this._calD=s}}>${s}</button>`)}
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
    `}_renderYearPicker(){const t=12*Math.floor(this._calY/12)-1,e=Array.from({length:16},(e,i)=>t+i),i=(new Date).getFullYear();return j`
      <div class="calh">
        <span class="calm">${t+1} \u2013 ${t+14}</span>
        <div class="caln">
          <button class="calb" @click=${()=>{this._calY-=12}}>&#8249;</button>
          <button class="calb" @click=${()=>{this._calY+=12}}>&#8250;</button>
        </div>
      </div>
      <div class="year-grid">
        ${e.map(t=>j`
          <button class="year-cell ${t===this._calY?"sel":""} ${t===i?"tod":""}"
                  @click=${()=>{this._calY=t,this._calView="months"}}>${t}</button>
        `)}
      </div>
    `}_renderFormBody(t,e,i,s){const r=new Date;return j`
      <div class="fh">
        <button class="ib" @click=${s}>✕</button>
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
        ${dt.map(t=>j`
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

      <div class="fl">Time <span style="font-weight:400;opacity:.6">(optional)</span></div>
      <div class="time-row">
        <input type="number" class="time-inp" min="0" max="23" placeholder="HH"
               .value=${this._formHour}
               @input=${t=>{this._formHour=t.target.value}}>
        <span class="time-sep">:</span>
        <input type="number" class="time-inp" min="0" max="59" placeholder="MM"
               .value=${this._formMinute}
               @input=${t=>{this._formMinute=t.target.value}}>
        ${""!==this._formHour?j`
          <button class="time-clear" @click=${()=>{this._formHour="",this._formMinute=""}}>✕</button>
        `:""}
      </div>

      <div class="fl">Pick a color</div>
      <div class="colr">
        ${lt.map(t=>j`
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

      <button class="savbtn" @click=${e} ?disabled=${!this._formName.trim()}>Save</button>

      ${t?j`
        <button class="delbtn" @click=${i}>Delete this countdown</button>
      `:V}
    `}},pt=o`
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
`;class ut extends(ht(at)){static get properties(){return{config:{},_tick:{state:!0},_formats:{state:!0},_showForm:{state:!0},_editIdx:{state:!0},_formName:{state:!0},_formIcon:{state:!0},_formColor:{state:!0},_formType:{state:!0},_formRecurring:{state:!0},_calY:{state:!0},_calM:{state:!0},_calD:{state:!0},_calView:{state:!0},_emojiOpen:{state:!0},_formHour:{state:!0},_formMinute:{state:!0}}}constructor(){super(),this._formats=this._loadFormats(),this._showForm=!1,this._editIdx=-1,this._resetForm()}static getConfigElement(){return document.createElement("countdown-card-editor")}static getStubConfig(){return{title:"Countdowns",show_past:!0,events:[{name:"Gym",date:"2026-04-07",icon:"trophy",color:"#2E7D32",recurring:"daily"},{name:"Team Meeting",date:"2026-04-09",icon:"briefcase",color:"#EF6C00",recurring:"weekly"},{name:"Pay Rent",date:"2026-05-01",icon:"home",color:"#6A1B9A",recurring:"monthly"},{name:"Summer Vacation",date:"2026-08-01",icon:"airplane",color:"#1565C0"},{name:"Sarah's Birthday",date:"1990-03-15",icon:"cake",color:"#7B1FA2",recurring:"yearly"},{name:"Got our Dog",date:"2022-06-10",icon:"paw",color:"#4E342E"},{name:"Bought the House",date:"2019-11-20",icon:"home",color:"#00838F"}]}}setConfig(t){this.config={...t,events:t.events||[]}}set hass(t){this._hass=t}connectedCallback(){super.connectedCallback(),this._tick=Date.now(),this._timer=setInterval(()=>{this._tick=Date.now()},15e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._timer)}_allEvents(){return(this.config.events||[]).map((t,e)=>({...t,_idx:e}))}_processEvents(){const t=new Date;t.setHours(0,0,0,0);const e=t.getTime(),i=!1!==this.config.show_past,s=new Date,r=this._allEvents().map(i=>{const r=i.date.split(" "),[o,a,n]=r[0].split("-").map(Number);let c=0,l=0;if(r[1]){const[t,e]=r[1].split(":").map(Number);c=t||0,l=e||0}const d=!!r[1],h=new Date(o,a-1,n,c,l);let p=new Date(h);const u=!0===i.recurring?"yearly":i.recurring||!1,f=d?s.getTime():e;if("yearly"===u)p=new Date(t.getFullYear(),h.getMonth(),h.getDate(),c,l),p.getTime()<f&&(p=new Date(t.getFullYear()+1,h.getMonth(),h.getDate(),c,l));else if("monthly"===u)p=new Date(t.getFullYear(),t.getMonth(),h.getDate(),c,l),p.getTime()<f&&(p=new Date(t.getFullYear(),t.getMonth()+1,h.getDate(),c,l));else if("weekly"===u){const e=h.getDay();p=new Date(t);let i=e-t.getDay();i<0&&(i+=7),0===i?(p.setDate(t.getDate()),p.setHours(c,l,0,0),p.getTime()<f&&(i=7,p.setDate(t.getDate()+i))):p.setDate(t.getDate()+i),p.setHours(c,l,0,0)}else"daily"===u&&(p=new Date(t.getFullYear(),t.getMonth(),t.getDate(),c,l),p.getTime()<f&&(p=new Date(t.getFullYear(),t.getMonth(),t.getDate()+1,c,l)));let g=t.getFullYear()-h.getFullYear();const m=t.getMonth()-h.getMonth();(m<0||0===m&&t.getDate()<h.getDate())&&g--;const _=p.getTime()-(d?s.getTime():e),v=d?_/ct:Math.round(_/ct),b=d?_>=0&&_<ct:0===Math.round(_/ct);return{...i,icon:i.icon||"calendar",originalDate:h,targetDate:p,diff:v,absDiff:Math.abs(v),isToday:!d&&b,isPast:d?_<0:v<0,hasTime:d,diffMs:_,yearsElapsed:g}}),o=i?r:r.filter(t=>!t.isPast);return o.sort((t,e)=>t.isToday!==e.isToday?t.isToday?-1:1:t.isPast||e.isPast?t.isPast&&e.isPast?e.diff-t.diff:t.isPast?1:-1:t.diff-e.diff),o}_fmt(t){const e=this.config.date_format;if(!e)return t.toLocaleDateString(navigator.language,{weekday:"short",day:"numeric",month:"short",year:"numeric"});const i=t.getDate(),s=t.getMonth()+1,r=t.getFullYear(),o=t=>String(t).padStart(2,"0");return e.replace("YYYY",r).replace("YY",String(r).slice(-2)).replace("MMMM",["January","February","March","April","May","June","July","August","September","October","November","December"][s-1]).replace("MMM",["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][s-1]).replace("MM",o(s)).replace("DD",o(i)).replace("D",i).replace("M",s).replace("ddd",["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][t.getDay()])}_color(t){if(t.color)return t.color;let e=0;for(let i=0;i<t.name.length;i++)e=t.name.charCodeAt(i)+((e<<5)-e);return`hsl(${(e%360+360)%360}, 55%, 45%)`}_t(t,e){return this.config.strings&&this.config.strings[t]||e}_FORMATS=["days","weeks","months","years","ym","detail"];_evtKey(t){return`${t.name}|${t.date}`}_loadFormats(){try{return JSON.parse(localStorage.getItem("countdown-card-formats")||"{}")}catch{return{}}}_saveFormats(){try{localStorage.setItem("countdown-card-formats",JSON.stringify(this._formats))}catch{}}_getFormat(t){return this._formats[this._evtKey(t)]||"days"}_cycleFormat(t,e){e.stopPropagation();const i=this._evtKey(t),s=this._formats[i]||"days",r=this._FORMATS.indexOf(s);this._formats={...this._formats,[i]:this._FORMATS[(r+1)%this._FORMATS.length]},this._saveFormats()}_detailedBreakdown(t){const e=t.isPast?t.targetDate:new Date,i=t.isPast?new Date:t.targetDate;let s=i.getFullYear()-e.getFullYear(),r=i.getMonth()-e.getMonth(),o=i.getDate()-e.getDate();if(o<0){r--;o+=new Date(i.getFullYear(),i.getMonth(),0).getDate()}r<0&&(s--,r+=12);const a=[];return s>0&&a.push(`${s}y`),r>0&&a.push(`${r}m`),(o>0||0===a.length)&&a.push(`${o}d`),a.join(" ")}_ymBreakdown(t){const e=t.isPast?t.targetDate:new Date,i=t.isPast?new Date:t.targetDate;let s=i.getFullYear()-e.getFullYear(),r=i.getMonth()-e.getMonth();i.getDate()<e.getDate()&&r--,r<0&&(s--,r+=12);const o=[];return s>0&&o.push(`${s}y`),(r>0||0===o.length)&&o.push(`${r}m`),o.join(" ")}_calcWeeks(t){return Math.round(t/7*10)/10}_calcMonths(t,e){let i=12*(e.getFullYear()-t.getFullYear())+(e.getMonth()-t.getMonth());return e.getDate()<t.getDate()&&i--,Math.max(0,i)}_calcYears(t,e){let i=e.getFullYear()-t.getFullYear();const s=e.getMonth()-t.getMonth();return(s<0||0===s&&e.getDate()<t.getDate())&&i--,Math.max(0,i)}_val(t){if(t.isToday)return"";if(t.hasTime&&t.absDiff<1&&!t.isPast){const e=t.diffMs,i=Math.floor(e/36e5),s=Math.floor(e%36e5/6e4);return i>0?`${i}h ${s}m`:`${s}m`}const e=this._getFormat(t),i=Math.round(t.absDiff),s=t.isPast?t.targetDate:new Date,r=t.isPast?new Date:t.targetDate;switch(e){case"weeks":{const t=this._calcWeeks(i);return t%1==0?t:t.toFixed(1)}case"months":return this._calcMonths(s,r);case"years":{const t=this._calcYears(s,r);return t>0?t:this._calcMonths(s,r)}case"ym":return this._ymBreakdown(t);case"detail":return this._detailedBreakdown(t);default:return i}}_lbl(t){if(t.isToday)return this._t("today","Today!");if(t.hasTime&&t.absDiff<1&&!t.isPast)return this._t("left","left");const e=this._getFormat(t),i=t.isPast?this._t("ago","ago"):this._t("left","left");switch(e){case"weeks":return`${this._t("weeks","weeks")} ${i}`;case"months":return 1===this._calcMonths(t.isPast?t.targetDate:new Date,t.isPast?new Date:t.targetDate)?`${this._t("month","month")} ${i}`:`${this._t("months","months")} ${i}`;case"years":{const e=this._calcYears(t.isPast?t.targetDate:new Date,t.isPast?new Date:t.targetDate);if(e>0)return 1===e?`${this._t("year","year")} ${i}`:`${this._t("years","years")} ${i}`;return 1===this._calcMonths(t.isPast?t.targetDate:new Date,t.isPast?new Date:t.targetDate)?`${this._t("month","month")} ${i}`:`${this._t("months","months")} ${i}`}case"ym":case"detail":return i;default:return 1===Math.round(t.absDiff)?`${this._t("day","day")} ${i}`:`${this._t("days","days")} ${i}`}}async _persistToHA(){if(this._hass)try{const t=window.location.pathname.match(/^\/([^/]+)/);let e=t?t[1]:null;"lovelace"===e&&(e=null);const i=await this._hass.callWS({type:"lovelace/config",url_path:e}),s=t=>{if(!t||"object"!=typeof t)return!1;if(Array.isArray(t)){for(let e=0;e<t.length;e++){if("custom:countdown-card"===t[e]?.type)return t[e]={...t[e],events:[...this.config.events]},!0;if(s(t[e]))return!0}return!1}for(const e of Object.keys(t))if(s(t[e]))return!0;return!1};if(!s(i))return;await this._hass.callWS({type:"lovelace/config/save",url_path:e,config:i})}catch(t){console.warn("countdown-card: failed to persist",t)}}_openNew(){this._resetForm(),this._editIdx=-1,this._showForm=!0}_openEdit(t){this._loadEventIntoForm(t),this._editIdx=t._idx,this._showForm=!0}_handleSave(){const t=this._buildEventFromForm();if(!t)return;const e=[...this.config.events||[]];this._editIdx>=0?e[this._editIdx]=t:e.push(t),this.config={...this.config,events:e},this._showForm=!1,setTimeout(()=>this._persistToHA(),100)}_handleDelete(){if(this._editIdx<0)return;const t=[...this.config.events||[]];t.splice(this._editIdx,1),this.config={...this.config,events:t},this._showForm=!1,setTimeout(()=>this._persistToHA(),100)}_closeForm(){this._showForm=!1}render(){if(!this.config)return j``;const t=this._processEvents(),e=t.filter(t=>!t.isPast),i=t.filter(t=>t.isPast),s=!1!==this.config.show_past;return j`
      <ha-card>
        ${!1!==this.config.title?j`<div class="hdr">${this.config.title||"Countdowns"}</div>`:""}
        <div class="list">
          ${0===t.length?j`<div class="empty">No events yet — tap + to add one!</div>`:j`
                ${e.length>0?j`
                  ${!1!==this.config.show_labels?j`<div class="divider">${this._t("upcoming","Upcoming")}</div>`:""}
                  ${e.map(t=>this._row(t))}
                `:""}
                ${s&&i.length>0?j`
                  ${!1!==this.config.show_labels?j`<div class="divider">${this._t("past","Past")}</div>`:""}
                  ${i.map(t=>this._row(t))}
                `:""}
              `}
        </div>
        ${!1!==this.config.show_add&&!1!==this.config.editable?j`
        <div class="add-wrap">
          <button class="add-btn" @click=${this._openNew}>
            <span class="add-plus">＋</span> New Countdown
          </button>
        </div>
        `:""}

        ${this._showForm?j`
          <div class="overlay" @click=${this._closeForm}></div>
          <div class="dialog">
            ${this._renderFormBody(this._editIdx>=0,()=>this._handleSave(),()=>this._handleDelete(),()=>this._closeForm())}
          </div>
        `:V}
      </ha-card>
    `}_row(t){const e=this._color(t),i=this.config.row_style||"solid",s=t.icon&&!t.icon.includes(":")&&t.icon.length>2,r="minimal"===i?"":"soft"===i?`background:${e}33`:`background:${e}`,o="solid"===i;return j`
      <div class="row ${t.isPast?"past":""} ${!1!==this.config.editable?"editable":""} ${t.isToday?"today":""} rs-${i}"
           style="${r}"
           @click=${()=>{!1!==this.config.editable&&this._openEdit(t)}}>
        ${"minimal"===i?j`<div class="accent" style="background:${e}"></div>`:""}
        <div class="ico" style="color:${o?"rgba(255,255,255,.9)":e}">
          ${s?j`<ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>`:j`<ha-icon icon="mdi:calendar"></ha-icon>`}
        </div>
        <div class="det">
          <div class="nm">${t.name}</div>
          <div class="dt">${this._fmt(t.originalDate)}</div>
          ${t.recurring&&t.yearsElapsed>0?j`
            <div class="dt since">${t.yearsElapsed} ${1===t.yearsElapsed?this._t("year","year"):this._t("years","years")} ${this._t("ago","ago")}</div>
          `:""}
        </div>
        <div class="cd ${t.isToday?"cd-today":""}"
             @click=${e=>{t.isToday||this._cycleFormat(t,e)}}
             title="${t.isToday?"":"Tap to change format"}">
          ${t.isToday?j`
            <div class="today-ico" style="color:${o?"rgba(255,255,255,.9)":e}">
              ${s?j`<ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>`:j`<ha-icon icon="mdi:calendar"></ha-icon>`}
            </div>
            <div class="cl" style="${o?"":"color:var(--t2)"}">${this._t("today_label","today")}</div>
          `:j`
            <div class="cv ${"detail"===this._getFormat(t)?"detail":""}" style="${o?"":`color:${e}`}">${this._val(t)}</div>
            <div class="cl">${this._lbl(t)}</div>
          `}
        </div>
      </div>
    `}static get styles(){return[pt,o`
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
    `]}getCardSize(){const t=this.config?.events?.length||0;return Math.ceil(1.2*t)+2}}class ft extends(ht(at)){static get properties(){return{_config:{state:!0},_showForm:{state:!0},_editIdx:{state:!0},_formName:{state:!0},_formIcon:{state:!0},_formColor:{state:!0},_formType:{state:!0},_formRecurring:{state:!0},_calY:{state:!0},_calM:{state:!0},_calD:{state:!0},_calView:{state:!0},_emojiOpen:{state:!0},_formHour:{state:!0},_formMinute:{state:!0}}}constructor(){super(),this._showForm=!1,this._editIdx=-1,this._resetForm()}setConfig(t){this._config={...t,events:[...t.events||[]]}}set hass(t){this._hass=t}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_openNew(){this._resetForm(),this._editIdx=-1,this._showForm=!0}_openEdit(t){const e=this._config.events[t];e&&(this._loadEventIntoForm(e),this._editIdx=t,this._showForm=!0)}_save(){const t=this._buildEventFromForm();if(!t)return;const e=[...this._config.events||[]];this._editIdx>=0?e[this._editIdx]=t:e.push(t),this._config={...this._config,events:e},this._fire(),this._showForm=!1}_del(t){const e=[...this._config.events||[]];e.splice(t,1),this._config={...this._config,events:e},this._fire(),this._showForm=!1}_move(t,e){const i=[...this._config.events||[]],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._config={...this._config,events:i},this._fire())}_setTitle(t){this._config={...this._config,title:t||"Countdowns"},this._fire()}_togPast(){this._config={...this._config,show_past:!(!1!==this._config.show_past)},this._fire()}render(){if(!this._config)return j``;const t=this._config.events||[];return j`
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

        <div class="fld row">
          <label>Show section labels</label>
          <label class="sw">
            <input type="checkbox" .checked=${!1!==this._config.show_labels}
                   @change=${()=>{this._config={...this._config,show_labels:!(!1!==this._config.show_labels)},this._fire()}}>
            <span class="sl"></span>
          </label>
        </div>

        <div class="fld row">
          <label>Show add button</label>
          <label class="sw">
            <input type="checkbox" .checked=${!1!==this._config.show_add}
                   @change=${()=>{this._config={...this._config,show_add:!(!1!==this._config.show_add)},this._fire()}}>
            <span class="sl"></span>
          </label>
        </div>

        <div class="fld">
          <label>Row style</label>
          <div class="tg tg-wrap">
            ${["solid","soft","minimal"].map(t=>j`
              <button class="tb ${(this._config.row_style||"solid")===t?"on":""}"
                      @click=${()=>{this._config={...this._config,row_style:t},this._fire()}}>${t[0].toUpperCase()+t.slice(1)}</button>
            `)}
          </div>
        </div>

        <div class="fld">
          <label>Date format</label>
          <input type="text" .value=${this._config.date_format||""}
                 placeholder="auto (e.g. DD/MM/YYYY, D MMM YYYY)"
                 @input=${t=>{this._config={...this._config,date_format:t.target.value||void 0},this._fire()}}>
        </div>

        <div class="sec">Events (${t.length})</div>
        <div class="evl">
          ${t.map((e,i)=>j`
            <div class="er">
              <div class="ei-dot" style="background:${e.color||lt[0]}"></div>
              <div class="einf">
                <span class="en">${e.name}</span>
                <span class="edt">${e.date}${e.recurring?` · ${"string"==typeof e.recurring?e.recurring[0].toUpperCase()+e.recurring.slice(1):"Yearly"}`:""}${e.type&&"event"!==e.type?` · ${e.type}`:""}</span>
              </div>
              <div class="ea">
                <button class="ib" @click=${()=>this._move(i,-1)} ?disabled=${0===i}>▲</button>
                <button class="ib" @click=${()=>this._move(i,1)} ?disabled=${i===t.length-1}>▼</button>
                <button class="ib" @click=${()=>this._openEdit(i)}>✏️</button>
                <button class="ib x" @click=${()=>this._del(i)}>🗑️</button>
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
    `}static get styles(){return[pt,o`
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
    `]}}customElements.define("countdown-card",ut),customElements.define("countdown-card-editor",ft),window.customCards=window.customCards||[],window.customCards.push({type:"countdown-card",name:"Countdown Card",description:"Track important events and dates with beautiful countdown timers",preview:!0});
