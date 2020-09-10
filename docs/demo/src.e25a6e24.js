parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZDb7":[function(require,module,exports) {
"use strict";function t(t){const e=`on${t.charAt(0).toUpperCase()}${t.slice(1)}Changed`;return function(...t){this[e]&&this[e](...t)}}function e(e,r){return{type:r.call?r:r.type,onChange:!0===r.onChange?t(e):r.onChange}}function r(t,e,r){Object.defineProperty(t,e,{get(){return this.__props[e]},set(t){const n=this[e];this.__props[e]=t,this.rendered&&n!==t&&(r.onChange&&r.onChange.call(this,t,n),this.update())}})}function n(t){if(!t.__attrs){const n=t.properties||{},s=Object.create(null),o=Object.create(null),c=t.prototype;for(const t in n){const i=e(t,n[t]);s[t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()]=t,o[t]=i,r(c,t,i)}t.__attrs=s,t.__props=o}return Object.keys(t.__attrs)}function s(t){return class extends t{constructor(){super(...arguments),this.__props=Object.create(null)}static get observedAttributes(){return n(this)}attributeChangedCallback(t,e,r){const{__attrs:n,__props:s}=this.constructor;if(s&&n&&t in s){const e=n[t];this[e]=s[e].type(r)}}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.withProps=s;
},{}],"z8q1":[function(require,module,exports) {
"use strict";function e(e=""){return document.createComment(e)}function t(e=""){return document.createTextNode(e)}function n(e,t){return!(!e||!e.nodeType||t&&e.nodeType!==t)}function o(e){return e!==Object(e)}function r(e,t){const[n,o]=[].concat(t);n.parentNode&&(o&&n.nextSibling!==o&&s(n.nextSibling,o),n.parentNode.replaceChild(e,n))}function s(e,t=null,n=e.parentNode){if(n)for(;e!==t;){const t=e.nextSibling;n.removeChild(e),e=t}}function i(e,t,n=t.parentNode){const[o,r]=e.range,s=t.nextSibling;let i=o;do{const e=i.nextSibling;n.insertBefore(i,s),i=e}while(i!==r);n.insertBefore(r,s)}function p(e){let t=0;for(;e=e.previousSibling;)t++;return t}function x(e){const t=[];for(;e.parentNode;)t.unshift(p(e)),e=e.parentNode;return t}function c(e,t){for(let n=0,o=t.length;n<o;n++)e=e.childNodes[t[n]];return e}function u(e,t){return l(e)&&l(t)&&e.strings===t.strings}function l(e){return e&&e[exports.TemplateSymbol]}function a(e){const t=exports.MARKER_RE.exec(e);return exports.MARKER_RE.lastIndex=0,t?Number(t[1]||t[2]):-1}Object.defineProperty(exports,"__esModule",{value:!0}),exports.comment=e,exports.text=t,exports.isNode=n,exports.isPrimitive=o,exports.replaceRange=r,exports.removeNodes=s,exports.moveTemplate=i,exports.getNodeIndex=p,exports.getNodePath=x,exports.getNodeByPath=c,exports.TemplateSymbol=Symbol(),exports.isSameTemplate=u,exports.isTemplate=l,exports.MARKER_PREFIX=`__${Math.random().toString().slice(2)}_`,exports.MARKER_RE=new RegExp(`\x3c!--${exports.MARKER_PREFIX}(\\d+)--\x3e|${exports.MARKER_PREFIX}(\\d+)`),exports.TEXT_ELEMENT=/^(?:style|textarea)$/i,exports.markerNumber=a;
},{}],"FrVb":[function(require,module,exports) {
"use strict";var o;Object.defineProperty(exports,"__esModule",{value:!0}),function(o){o[o.Low=0]="Low",o[o.Normal=1]="Normal",o[o.High=2]="High",o[o.Callback=3]="Callback"}(o=exports.JobPriority||(exports.JobPriority={}));
},{}],"YZcP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./types"),t=[],o=[],s=[],r=10,n=100,u=window.requestAnimationFrame;let i=!1,c=0,l=!0;function a(e,t){let o=0;const s=e.length;for(;Date.now()<t&&o<s;){const t=e[o++];t.task(...t.args),t.args=void 0,t.scheduled=!1}e.splice(0,o)}function d(){c++;const e=Date.now()+r*Math.ceil(c*(1/n));a(t,e),a(o,e),t.length>0&&(o.push(...t),t.length=0),o.length>0?u(d):(a(s,Number.MAX_SAFE_INTEGER),i=!1,c=0)}function h(e){l=e}function p(r,n){r.scheduled=!0,n===e.JobPriority.Normal?t.push(r):n===e.JobPriority.Low?o.push(r):n===e.JobPriority.Callback&&s.push(r),i||(i=!0,u(d))}function f(t,o=e.JobPriority.Normal){const s={task:t,args:[],scheduled:!1,firstRun:!0};return(...e)=>{s.firstRun||!l?(s.firstRun=!1,t(...e)):(s.args=e,s.scheduled||p(s,o))}}exports.setEnabled=h,exports.enqueueJob=p,exports.scheduled=f;
},{"./types":"FrVb"}],"zHGL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./utils"),t=require("./scheduler");class s{constructor(e,s,a){this.element=e,this.name=s,this.namespaceURI=a,this.requestUpdate=t.scheduled(e=>{const{name:t,element:s,namespaceURI:a}=this;"ownerSVGElement"in s?s.setAttributeNS(a,t,e):t in s?s[t]=e:void 0!==e?s.setAttribute(t,e):s.hasAttribute(t)&&s.removeAttribute(t),this.value=e})}update(e){e!==this.value&&this.requestUpdate(e)}}exports.AttributeExpression=s;class a{constructor(s){this.requestUpdate=t.scheduled(t=>{e.isPrimitive(t)?this.updateText(t):Array.isArray(t)?t=this.updateArray(t):e.isSameTemplate(t,this.element)?this.updateTemplate(t.values):this.replaceWith(t),this.value=t}),this.element=this.placeholder=s}updateArray(t){this.replaceWith(this.placeholder);const s=this.value instanceof Map?this.value:new Map;let a=this.element;const i=new Set;for(let r=0,l=t.length;r<l;r++){const l=t[r],n=String(l.key||r);let h=s.get(n);if(h)e.isSameTemplate(h,l)?h.update(l.values):(e.replaceRange(l.create(),h.range),s.set(n,h=l));else{const e=l.create();a.parentNode.insertBefore(e,a.nextSibling),s.set(n,h=l)}a.nextSibling!==h.range[0]&&e.moveTemplate(h,a),a=h.range[1],i.add(n)}return s.forEach((e,t,s)=>{i.has(t)||(e.delete(),s.delete(t))}),s}replaceWith(t){const{element:s,value:a,placeholder:i}=this;null==t&&(t=i),s!==t&&(a instanceof Map&&(a.forEach(e=>e.delete()),a.clear()),this.element=t,e.replaceRange(e.isTemplate(t)?t.create():t,e.isTemplate(s)?s.range:s))}updateText(t){e.isNode(this.element,Node.TEXT_NODE)||this.replaceWith(e.text()),this.element.textContent=t}updateTemplate(e){this.element.update(e)}update(e){e!==this.value&&this.requestUpdate(e)}}exports.NodeExpression=a;
},{"./utils":"z8q1","./scheduler":"YZcP"}],"twNy":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./expressions"),t=require("./utils");function o(){return NodeFilter.FILTER_ACCEPT}function n(o,n){const r=o.attributes;let s=r.length;for(;s--;){const{name:a,value:i,namespaceURI:d}=r.item(s),u=t.markerNumber(i);~u&&(o.removeAttribute(a),n[u]={type:e.AttributeExpression,name:a,namespaceURI:d,nodePath:t.getNodePath(o)})}}function r(o,n){const r=t.markerNumber(o.data);~r&&(n[r]={type:e.NodeExpression,nodePath:t.getNodePath(o)},o.nodeValue="")}function s(o,n){let r;for(;null!==(r=t.MARKER_RE.exec(o.data));){const s=t.text();(o=o.splitText(r.index)).deleteData(0,r[0].length),o.parentNode.insertBefore(s,o),n[Number(r[1]||r[2])]={type:e.NodeExpression,nodePath:t.getNodePath(s)}}}function a(e){const a=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,o,!1),i=[];for(;a.nextNode();){const e=a.currentNode;if(t.isNode(e,Node.ELEMENT_NODE)){if(n(e,i),t.TEXT_ELEMENT.test(e.tagName))for(const t of e.childNodes)s(t,i)}else r(e,i)}return i}function i(e,o){return o.map(o=>new o.type(t.getNodeByPath(e,o.nodePath),o.name,o.namespaceURI))}o.acceptNode=o,exports.linkAttributes=n,exports.linkComment=r,exports.linkTexts=s,exports.linkExpressions=a,exports.resolve=i;
},{"./expressions":"zHGL","./utils":"z8q1"}],"AbQO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./linker"),t=require("./utils"),n=new WeakMap;function s(t,n){const s=document.createElement("template");s.innerHTML=n?`<${n}>${t}</${n}>`:t;let o=s.content;if(n){const e=document.createRange();e.selectNodeContents(o.firstChild),o=e.extractContents()}return{content:o,expressions:e.linkExpressions(o)}}function o(e){const n=new RegExp("^[^]*<([0-9a-z-]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");let s;!function(e){e[e.TagName=1]="TagName",e[e.ClosedTag=2]="ClosedTag",e[e.EndTag=3]="EndTag"}(s||(s={}));let o=!1,r=e[0];for(let a=0,c=e.length;a<c-1;a++){const c=`${t.MARKER_PREFIX}${a}`,i=e[a].match(n);i[s.TagName]?o=!i[s.ClosedTag]:i[s.EndTag]&&(o=!1),r+=(o?c:`\x3c!--${c}--\x3e`)+e[a+1]}return r}function r(t,r){let a=n.get(t);a||n.set(t,a=s(o(t),r));const c=document.importNode(a.content,!0);return{fragment:c,expressions:e.resolve(c,a.expressions)}}exports.parseTemplate=r;
},{"./linker":"twNy","./utils":"z8q1"}],"kM2w":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0});const t=require("./parser"),s=require("./utils");class i{constructor(t,s,i){this[e]=!0,this.values=s,this.strings=t,this.context=i}withKey(e){return this.key=e,this}update(e){for(let t=0;t<e.length;t++)this.expressions[t]&&this.expressions[t].update(e[t])}delete(){s.removeNodes(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0}create(){const{fragment:e,expressions:i}=t.parseTemplate(this.strings,this.context);return this.expressions=i,this.range=[e.insertBefore(s.text(),e.firstChild),e.appendChild(s.text())],this.update(this.values),e}}exports.Template=i,e=s.TemplateSymbol;
},{"./parser":"AbQO","./utils":"z8q1"}],"SFwE":[function(require,module,exports) {
"use strict";function e(e){for(var t in e)exports.hasOwnProperty(t)||(exports[t]=e[t])}Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./template");exports.Template=t.Template;var r=require("./scheduler");exports.scheduled=r.scheduled,e(require("./types"));const s=require("./template"),n=require("./utils");function a(e,t){return a.instances.has(t)||(a.instances.set(t,e),n.removeNodes(t.firstChild,null,t),t.appendChild(e.create())),a.instances.get(t).update(e.values)}function u(e,...t){return new s.Template(e,t)}function p(e,...t){return new s.Template(e,t,"svg")}exports.render=a,a.instances=new WeakMap,exports.html=u,exports.svg=p;
},{"./template":"kM2w","./scheduler":"YZcP","./types":"FrVb","./utils":"z8q1"}],"HRIx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@tiny-lit/core");function e(e){return class extends e{constructor(){super(...arguments),this.state={},this.rendered=!1,this.renderCallbacks=[],this.renderRoot=this,this._onUpdated=t.scheduled(()=>{for(;this.renderCallbacks.length;)this.renderCallbacks.shift()();this.rendered?this.updated():this.firstUpdated(),this.rendered=!0},t.JobPriority.Callback)}attachShadow(t){return this.renderRoot=super.attachShadow.call(this,t)}connectedCallback(){this.update()}setState(t,e){const r=this.state;this.state={...r,..."function"==typeof t?t(r,this):t},e&&this.renderCallbacks.push(e),this.update()}render(){return null}firstUpdated(){}beforeUpdate(){}updated(){}update(){this.beforeUpdate();const e=this.render();e&&t.render(e,this.renderRoot),this._onUpdated()}}}exports.withElement=e;
},{"@tiny-lit/core":"SFwE"}],"Dwt5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./withProps"),t=require("./withElement");exports.Element=e.withProps(t.withElement(HTMLElement));
},{"./withProps":"ZDb7","./withElement":"HRIx"}],"aqGS":[function(require,module,exports) {
"use strict";function e(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Element");exports.Element=r.Element;var t=require("./withProps");exports.withProps=t.withProps;var i=require("./withElement");exports.withElement=i.withElement,e(require("@tiny-lit/core"));
},{"./Element":"Dwt5","./withProps":"ZDb7","./withElement":"HRIx","@tiny-lit/core":"SFwE"}],"eLKU":[function(require,module,exports) {
"use strict";function e(e=""){return document.createComment(e)}function t(e=""){return document.createTextNode(e)}function n(e,t){return!(!e||!e.nodeType||t&&e.nodeType!==t)}function o(e){return e!==Object(e)}function r(e,t){const[n,o]=[].concat(t);n.parentNode&&(o&&n.nextSibling!==o&&s(n.nextSibling,o),n.parentNode.replaceChild(e,n))}function s(e,t=null,n=e.parentNode){if(n)for(;e!==t;){const t=e.nextSibling;n.removeChild(e),e=t}}function i(e,t,n=t.parentNode){const[o,r]=e.range,s=t.nextSibling;let i=o;do{const e=i.nextSibling;n.insertBefore(i,s),i=e}while(i!==r);n.insertBefore(r,s)}function p(e){let t=0;for(;e=e.previousSibling;)t++;return t}function c(e){const t=[];for(;e.parentNode;)t.unshift(p(e)),e=e.parentNode;return t}function x(e,t){for(let n=0,o=t.length;n<o;n++)e=e.childNodes[t[n]];return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.comment=e,exports.text=t,exports.isNode=n,exports.isPrimitive=o,exports.replaceRange=r,exports.removeNodes=s,exports.moveTemplate=i,exports.getNodeIndex=p,exports.getNodePath=c,exports.getNodeByPath=x,exports.isSameTemplate=l,exports.isTemplate=d,exports.markerNumber=E,exports.TEXT_ELEMENT=exports.MARKER_RE=exports.MARKER_PREFIX=exports.TemplateSymbol=void 0;const u=Symbol();function l(e,t){return d(e)&&d(t)&&e.strings===t.strings}function d(e){return e&&e[u]}exports.TemplateSymbol=u;const a=`__${Math.random().toString().slice(2)}_`;exports.MARKER_PREFIX=a;const m=new RegExp(`\x3c!--${a}(\\d+)--\x3e|${a}(\\d+)`);exports.MARKER_RE=m;const f=/^(?:style|textarea)$/i;function E(e){const t=m.exec(e);return m.lastIndex=0,t?Number(t[1]||t[2]):-1}exports.TEXT_ELEMENT=f;
},{}],"jezz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setEnabled=d,exports.enqueueJob=a,exports.scheduled=h;const e=[],t=[],s=10,n=100,o=window.requestAnimationFrame;let u=!1,c=0,r=!0;function i(e,t){let s=0;const n=e.length;for(;Date.now()<t&&s<n;){const t=e[s++];t.task(...t.args),t.args=void 0,t.scheduled=!1}e.splice(0,s)}function l(){c++;const r=Date.now()+s*Math.ceil(c*(1/n));i(e,r),i(t,r),e.length>0&&(t.push(...e),e.length=0),t.length>0?o(l):(u=!1,c=0)}function d(e){r=e}function a(s,n){s.scheduled=!0,1===n?e.push(s):0===n&&t.push(s),u||(u=!0,o(l))}function h(e,t=1){const s={task:e,args:[],scheduled:!1,firstRun:!0};return(...n)=>{s.firstRun||!r?(s.firstRun=!1,e(...n)):(s.args=n,s.scheduled||a(s,t))}}
},{}],"QcYm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.NodeExpression=exports.AttributeExpression=void 0;var e=require("./utils"),t=require("./scheduler");class s{constructor(e,s,a){this.element=e,this.name=s,this.namespaceURI=a,this.requestUpdate=(0,t.scheduled)(e=>{const{name:t,element:s,namespaceURI:a}=this;"ownerSVGElement"in s?s.setAttributeNS(a,t,e):t in s?s[t]=e:void 0!==e?s.setAttribute(t,e):s.hasAttribute(t)&&s.removeAttribute(t),this.value=e})}update(e){e!==this.value&&this.requestUpdate(e)}}exports.AttributeExpression=s;class a{constructor(s){this.requestUpdate=(0,t.scheduled)(t=>{(0,e.isPrimitive)(t)?this.updateText(t):Array.isArray(t)?t=this.updateArray(t):(0,e.isSameTemplate)(t,this.element)?this.updateTemplate(t.values):this.replaceWith(t),this.value=t}),this.element=this.placeholder=s}updateArray(t){this.replaceWith(this.placeholder);const s=this.value instanceof Map?this.value:new Map;let a=this.element;const i=new Set;for(let r=0,l=t.length;r<l;r++){const l=t[r],n=String(l.key||r);let p=s.get(n);if(p)(0,e.isSameTemplate)(p,l)?p.update(l.values):((0,e.replaceRange)(l.create(),p.range),s.set(n,p=l));else{const e=l.create();a.parentNode.insertBefore(e,a.nextSibling),s.set(n,p=l)}a.nextSibling!==p.range[0]&&(0,e.moveTemplate)(p,a),a=p.range[1],i.add(n)}return s.forEach((e,t,s)=>{i.has(t)||(e.delete(),s.delete(t))}),s}replaceWith(t){const{element:s,value:a,placeholder:i}=this;null==t&&(t=i),s!==t&&(a instanceof Map&&(a.forEach(e=>e.delete()),a.clear()),this.element=t,(0,e.replaceRange)((0,e.isTemplate)(t)?t.create():t,(0,e.isTemplate)(s)?s.range:s))}updateText(t){(0,e.isNode)(this.element,Node.TEXT_NODE)||this.replaceWith((0,e.text)()),this.element.textContent=t}updateTemplate(e){this.element.update(e)}update(e){e!==this.value&&this.requestUpdate(e)}}exports.NodeExpression=a;
},{"./utils":"eLKU","./scheduler":"jezz"}],"Se2o":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.linkAttributes=n,exports.linkComment=r,exports.linkTexts=s,exports.linkExpressions=a,exports.resolve=i;var e=require("./expressions"),t=require("./utils");function o(){return NodeFilter.FILTER_ACCEPT}function n(o,n){const r=o.attributes;let s=r.length;for(;s--;){const{name:a,value:i,namespaceURI:d}=r.item(s),u=(0,t.markerNumber)(i);~u&&(o.removeAttribute(a),n[u]={type:e.AttributeExpression,name:a,namespaceURI:d,nodePath:(0,t.getNodePath)(o)})}}function r(o,n){const r=(0,t.markerNumber)(o.data);~r&&(n[r]={type:e.NodeExpression,nodePath:(0,t.getNodePath)(o)},o.nodeValue="")}function s(o,n){let r;for(;null!==(r=t.MARKER_RE.exec(o.data));){const s=(0,t.text)();(o=o.splitText(r.index)).deleteData(0,r[0].length),o.parentNode.insertBefore(s,o),n[Number(r[1]||r[2])]={type:e.NodeExpression,nodePath:(0,t.getNodePath)(s)}}}function a(e){const a=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,o,!1),i=[];for(;a.nextNode();){const e=a.currentNode;if((0,t.isNode)(e,Node.ELEMENT_NODE)){if(n(e,i),t.TEXT_ELEMENT.test(e.tagName))for(const t of e.childNodes)s(t,i)}else r(e,i)}return i}function i(e,o){return o.map(o=>new o.type((0,t.getNodeByPath)(e,o.nodePath),o.name,o.namespaceURI))}o.acceptNode=o;
},{"./expressions":"QcYm","./utils":"eLKU"}],"GU8Y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseTemplate=o;var e=require("./linker"),t=require("./utils");const n=new WeakMap;function s(t,n){const s=document.createElement("template");s.innerHTML=n?`<${n}>${t}</${n}>`:t;let r=s.content;if(n){const e=document.createRange();e.selectNodeContents(r.firstChild),r=e.extractContents()}return{content:r,expressions:(0,e.linkExpressions)(r)}}function r(e){const n=new RegExp("^[^]*<([0-9a-z-]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");let s=!1,r=e[0];for(let o=0,c=e.length;o<c-1;o++){const c=`${t.MARKER_PREFIX}${o}`,i=e[o].match(n);i[1]?s=!i[2]:i[3]&&(s=!1),r+=(s?c:`\x3c!--${c}--\x3e`)+e[o+1]}return r}function o(t,o){let c=n.get(t);c||n.set(t,c=s(r(t),o));const i=document.importNode(c.content,!0);return{fragment:i,expressions:(0,e.resolve)(i,c.expressions)}}
},{"./linker":"Se2o","./utils":"eLKU"}],"qAKK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Template=void 0;var e,t=require("./parser"),s=require("./utils");class i{constructor(t,s,i){this[e]=!0,this.values=s,this.strings=t,this.context=i}withKey(e){return this.key=e,this}update(e){for(let t=0;t<e.length;t++)this.expressions[t]&&this.expressions[t].update(e[t])}delete(){(0,s.removeNodes)(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0}create(){const{fragment:e,expressions:i}=(0,t.parseTemplate)(this.strings,this.context);return this.expressions=i,this.range=[e.insertBefore((0,s.text)(),e.firstChild),e.appendChild((0,s.text)())],this.update(this.values),e}}exports.Template=i,e=s.TemplateSymbol;
},{"./parser":"GU8Y","./utils":"eLKU"}],"ci4n":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.render=n,exports.html=s,exports.svg=u,Object.defineProperty(exports,"Template",{enumerable:!0,get:function(){return e.Template}}),Object.defineProperty(exports,"scheduled",{enumerable:!0,get:function(){return t.scheduled}});var e=require("./template"),t=require("./scheduler"),r=require("./utils");function n(e,t){n.instances.has(t)?n.instances.get(t).update(e.values):(n.instances.set(t,e),(0,r.removeNodes)(t.firstChild,null,t),t.appendChild(e.create()))}function s(t,...r){return new e.Template(t,r)}function u(t,...r){return new e.Template(t,r,"svg")}n.instances=new WeakMap;
},{"./template":"qAKK","./scheduler":"jezz","./utils":"eLKU"}],"gwaE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=require("@tiny-lit/core");let t,e=o=>o;var i=(0,o.html)(t||(t=e`
<style>
    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .todoapp {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
    }

    :focus {
        outline: 0;
    }

    .hidden {
        display: none;
    }

    .todoapp {
        background: #fff;
        margin: 130px auto;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                    0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    .todoapp input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgb(var(--primary));
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }

    .new-todo,
    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .new-todo {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }

    .main {
        position: relative;
        z-index: 2;
        border-top: 1px solid #e6e6e6;
    }

    .toggle-all {
        text-align: center;
        border: none; /* Mobile Safari */
        opacity: 0;
        position: absolute;
    }

    .toggle-all + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: -52px;
        left: -13px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .toggle-all + label:before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    .toggle-all:checked + label:before {
        color: #737373;
    }

    .todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .todo-list li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    .todo-list li:last-child {
        border-bottom: none;
    }

    .todo-list li.editing {
        border-bottom: none;
        padding: 0;
    }

    .todo-list li.editing .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }

    .todo-list li.editing .view {
        display: none;
    }

    .todo-list li .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    .todo-list li .toggle {
        opacity: 0;
    }

    .todo-list li .toggle + label {
        /*
            Firefox requires '#' to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
            IE and Edge requires *everything* to be escaped to render, so we do that instead of just the '#' - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
        */
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
    }

    .todo-list li .toggle:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
    }

    .todo-list li label {
        word-break: break-all;
        padding: 15px 15px 15px 60px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    .todo-list li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    .todo-list li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    .todo-list li .destroy:hover {
        color: #af5b5e;
    }

    .todo-list li .destroy:after {
        content: '×';
    }

    .todo-list li:hover .destroy {
        display: block;
    }

    .todo-list li .edit {
        display: none;
    }

    .todo-list li.editing:last-child {
        margin-bottom: -1px;
    }

    .footer {
        color: #777;
        padding: 10px 15px;
        height: 20px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
    }

    .footer:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                    0 8px 0 -3px #f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }

    .todo-count {
        float: left;
        text-align: left;
    }

    .todo-count strong {
        font-weight: 300;
    }

    .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }

    .filters li {
        display: inline;
    }

    .filters li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .filters li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    .filters li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }

    .clear-completed,
    html .clear-completed:active {
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
    }

    .clear-completed:hover {
        text-decoration: underline;
    }

    .shuffle {
        margin-right: 5px;
    }

    .info {
        margin: 65px auto 0;
        color: #bfbfbf;
        font-size: 10px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
        text-align: center;
    }

    .info p {
        line-height: 1;
    }

    .info a {
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }

    .info a:hover {
        text-decoration: underline;
    }

    /*
        Hack to remove background from Mobile Safari.
        Can't use it globally since it destroys checkboxes in Firefox
    */
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .toggle-all,
        .todo-list li .toggle {
            background: none;
        }

        .todo-list li .toggle {
            height: 40px;
        }
    }

    @media (max-width: 430px) {
        .footer {
            height: 50px;
        }

        .filters {
            bottom: 10px;
        }
    }
</style>
`));exports.default=i;
},{"@tiny-lit/core":"ci4n"}],"jE2t":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getBucket=a;const e=window.requestIdleCallback||window.requestAnimationFrame,t=(e,t=0)=>!!t&&e.timestamp+t<Date.now(),r=(e,t)=>e.version===t,s=(t,r,{version:s,storage:n})=>{const o={timestamp:Date.now(),data:r,version:s};return e(()=>n.setItem(t,JSON.stringify(o))),o},n=(e,s,n)=>{const{storage:a,version:i,expire:l}=s,u=n||JSON.parse(a.getItem(e));return u&&!t(u,l)&&r(u,i)?u:(o(e,s),null)},o=(t,{storage:r})=>{e(()=>r.removeItem(t))};function a(e,t){t=Object.assign({storage:localStorage},t);let r=null;return[()=>(r=n(e,t,r))?r.data:t.defaultValue,n=>{r=s(e,n,t)},()=>{o(e,t),r=null}]}
},{}],"x8N4":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/element"),t=i(require("./style.js")),o=require("secchiojs");let s,l,a=e=>e;function i(e){return e&&e.__esModule?e:{default:e}}function d(e){return t=>{t.stopPropagation(),t.preventDefault(),e(t)}}const[n,c]=(0,o.getBucket)("todoMvc",{version:1,defaultValue:{todos:[],filter:null}});function r(e){let t=e.length;for(;t>0;){let o=Math.floor(Math.random()*t),s=e[--t];e[t]=e[o],e[o]=s}return e}class h extends e.Element{constructor(){super(),this.state=n(),this.attachShadow({mode:"open"})}static get is(){return"todo-mvc"}setState(e){super.setState(e),c(this.state)}setFilter(e){this.setState({filter:e})}handleAddTodo(e){this.setState({todos:[...this.state.todos,{text:e.target.elements[0].value,completed:!1,id:Math.random().toString().substr(2)}]}),e.target.reset()}handleDeleteTodo(e){this.setState({todos:[...this.state.todos.filter(t=>t!==e)]})}switchCompleted(e){return d(()=>{const t=this.state.todos;t[e].completed=!t[e].completed,this.setState({todos:[...t]})})}handleClearCompleted(){this.setState({todos:[...this.state.todos.filter(e=>!e.completed)]})}connectedCallback(){console.time("render"),this.update()}firstUpdated(){console.timeEnd("render")}render(){const{filter:o,todos:i}=this.state;return(0,e.html)(s||(s=a`
            ${0}
            <section class="todoapp body">
                <header class="header">
                    <h1>todos</h1>
                    <form onSubmit=${0}>
                        <input
                            class="new-todo"
                            placeholder="What needs to be done?"
                            autofocus
                        />
                    </form>
                </header>
                <!-- This section should be hidden by default and shown when there are todos -->
                <section class="main">
                    <input id="toggle-all" class="toggle-all" type="checkbox" />
                    <label for="toggle-all">Mark all as complete</label>
                    <ul class="todo-list">
                        <!-- These are here just to show the structure of the list items -->
                        <!-- List items should get the class \`editing\` when editing and \`completed\` when marked as completed -->
                        ${0}
                    </ul>
                </section>
                <!-- This footer should hidden by default and shown when there are todos -->
                <footer class="footer">
                    <!-- This should be \`0 items left\` by default -->
                    <span class="todo-count">
                        <strong
                            >${0}
                        </strong>
                        item left
                    </span>

                    <ul class="filters">
                        <li>
                            <a
                                class=${0}
                                href="#/"
                                onClick=${0}
                            >
                                All
                            </a>
                        </li>
                        <li>
                            <a
                                class=${0}
                                href="#/active"
                                onClick=${0}
                            >
                                Active
                            </a>
                        </li>
                        <li>
                            <a
                                class=${0}
                                href="#/completed"
                                onClick=${0}
                            >
                                Completed
                            </a>
                        </li>
                    </ul>
                    <!-- Hidden if no completed items are left ↓ -->
                    <button
                        class="clear-completed"
                        onClick=${0}
                    >
                        Clear completed
                    </button>
                    <button
                        class="clear-completed shuffle"
                        onClick=${0}
                    >
                        Shuffle
                    </button>
                </footer>
            </section>
            <footer class="info">
                <p>Double-click to edit a todo</p>
                <!-- Change this out with your name and url ↓ -->
                <p>Created by <a href="http://todomvc.com">you</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        `),t.default,d(e=>this.handleAddTodo(e)),i.map((e,t)=>(e.index=t,e)).filter(e=>null===o||e.completed===o).map(t=>(0,e.html)(l||(l=a`
                                    <li
                                        class=${0}
                                    >
                                        <div class="view">
                                            <input
                                                class="toggle"
                                                type="checkbox"
                                                checked=${0}
                                                onClick=${0}
                                            />
                                            <label
                                                onClick=${0}
                                                >${0}</label
                                            >
                                            <button
                                                class="destroy"
                                                onClick=${0}
                                            ></button>
                                        </div>
                                        <input
                                            class="edit"
                                            value=${0}
                                        />
                                    </li>
                                `),t.completed?"completed":"",t.completed,this.switchCompleted(t.index),this.switchCompleted(t.index),t.text,d(()=>this.handleDeleteTodo(t)),t.text).withKey(t.id)),i.filter(e=>!e.completed).length,null===o&&"selected",d(()=>this.setFilter(null)),!1===o&&"selected",d(()=>this.setFilter(!1)),o&&"selected",d(()=>this.setFilter(!0)),d(()=>this.handleClearCompleted()),d(()=>this.setState({todos:r(this.state.todos)})))}}customElements.define(h.is,h);
},{"@tiny-lit/element":"aqGS","./style.js":"gwaE","secchiojs":"jE2t"}],"PdXR":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/element");let t,s=e=>e;class n extends e.Element{static get is(){return"sierpinski-dot"}static get properties(){return{x:Number,y:Number,size:Number,text:String,hover:Boolean}}constructor(){super(),this.x=0,this.y=0,this.size=0,this.text="",this.hover=!1,this.addEventListener("mouseover",()=>this.hover=!0),this.addEventListener("mouseleave",()=>this.hover=!1),this.attachShadow({mode:"closed"})}get style(){const{x:e,y:t,size:s}=this,n=1.3*s;return`\n            span {\n                position: absolute;\n                font: normal 15px sans-serif;\n                text-align: center;\n                cursor: pointer;\n                color: black;\n                width: ${n}px;\n                height: ${n}px;\n                transform: translate(${e}px, ${t}px);\n                border-radius: ${n/2}px;\n                line-height: ${n}px;\n            }\n        `}render(){const{hover:n,text:r}=this;return(0,e.html)(t||(t=s`
            <style>
                ${0}
            </style>

            <span style=${0}>
                ${0}
            </span>
        `),this.style,`background: ${n?"#ff0":"#61dafb"}`,n?"**"+r+"**":r)}}customElements.define(n.is,n);
},{"@tiny-lit/element":"aqGS"}],"KQrV":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/element");let s,t,i,r=e=>e;const n=25;class l extends e.Element{static get is(){return"sierpinski-triangle"}static get properties(){return{x:Number,y:Number,s:Number,seconds:Number}}constructor(){super(),this.x=0,this.y=0,this.s=0,this.seconds=0,this.attachShadow({mode:"open"})}renderTemplate(){let{s:i,seconds:l,x:o,y:a}=this;if(i<=n)return(0,e.html)(s||(s=r`
                <sierpinski-dot
                    x=${0}
                    y=${0}
                    size=${0}
                    text=${0}
                />
            `),o-n/2,a-n/2,n,l);i/=2;{let e=performance.now()+.8;for(;performance.now()<e;);}return(0,e.html)(t||(t=r`
            <sierpinski-triangle
                x=${0}
                y=${0}
                s=${0}
                seconds=${0}
            ></sierpinski-triangle>
            <sierpinski-triangle
                x=${0}
                y=${0}
                s=${0}
                seconds=${0}
            ></sierpinski-triangle>
            <sierpinski-triangle
                x=${0}
                y=${0}
                s=${0}
                seconds=${0}
            ></sierpinski-triangle>
        `),o,a-i/2,i,l,o-i,a+i/2,i,l,o+i,a+i/2,i,l)}render(){return(0,e.html)(i||(i=r`${0}`),this.renderTemplate())}}customElements.define(l.is,l);
},{"@tiny-lit/element":"aqGS"}],"oPrN":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/element");require("./Dot"),require("./Triangle");let t,s=e=>e;function r(e){let t=!0;return requestAnimationFrame(function s(){e(),t&&requestAnimationFrame(s)}),()=>t=!1}class n extends e.Element{static get is(){return"scheduler-demo"}constructor(){super(),this.attachShadow({mode:"open"})}static get properties(){return{elapsed:Number}}connectedCallback(){this.rendered;console.time("render"),this.start=Date.now(),this.timerInterval=setInterval(this.tick.bind(this),1e3),this.renderInterval=r(()=>{this.elapsed=Date.now()-this.start}),this.setState({seconds:0})}disconnectedCallback(){this.renderInterval(),clearInterval(this.timerInterval)}tick(){this.setState({seconds:this.state.seconds%10+1})}getTransform(){const e=this.elapsed/1e3%10;return`\n            transform: scale(${(1+(e>5?10-e:e)/10)/2.1}, 0.7) translateX(50%) translateZ(0);\n        `}firstUpdated(){console.timeEnd("render")}render(){const{seconds:r}=this.state;return(0,e.html)(t||(t=s`
            <style>
                :host {
                    color: black;
                }

                .container {
                    position: absolute;
                    transform-origin: 0 0;
                    width: 10px;
                    height: 10px;
                    left: 50%;
                    top: 50%;
                    will-change: transform;
                }
            </style>
            <div class="container" style=${0}>
                <sierpinski-triangle
                    x=${0}
                    y=${0}
                    s=${0}
                    seconds=${0}
                />
            </div>
        `),this.getTransform(),0,0,1e3,r)}}customElements.define(n.is,n);
},{"@tiny-lit/element":"aqGS","./Dot":"PdXR","./Triangle":"KQrV"}],"PhxC":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.Request="store::request",e.Dispatch="store::dispatch",e.Update="store::update"}(e=exports.StoreEvents||(exports.StoreEvents={}));
},{}],"jbhk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=require("./types");function e(t){return(e,n)=>("string"==typeof e&&(e={type:e,data:n}),t(e))}function n(e){const n=new CustomEvent(t.StoreEvents.Request,{detail:{}});return e.dispatchEvent(n),n.detail.store}function r(e,n){return new CustomEvent(t.StoreEvents.Update,{detail:{state:e,mutation:n}})}function s(e,n){return new CustomEvent(t.StoreEvents.Dispatch,{detail:{type:e,data:n}})}exports.normalizeEvent=e,exports.requestStore=n,exports.createUpdateEvent=r,exports.createDispatchEvent=s;
},{"./types":"PhxC"}],"Anub":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0});const s=require("./events"),e=Symbol(),i=(t,s)=>{for(const e in t)s.set(e,t[e])};class n{constructor(n={}){this[t]={},this.mutations=new Map,this.actions=new Map,this.listeners=new Set,this.dispatch=s.normalizeEvent(t=>{const s=this.actions;s.has(t.type)&&s.get(t.type)(this,t.data)}),this.commit=s.normalizeEvent(t=>{const s=this.mutations;s.has(t.type)&&(this[e]=s.get(t.type)(this.state,t.data)),this.listeners.forEach(s=>s(t))}),i(n.mutations,this.mutations),i(n.actions,this.actions),this[e]={...n.initialState},n.plugins&&n.plugins.forEach(t=>t(this))}get state(){return this[e]}subscribe(t){const{listeners:s}=this,e=s=>t(this.state,s);return s.add(e),t(this.state),()=>s.delete(e)}}exports.Store=n,t=e,exports.createStore=(t=>new n(t));
},{"./events":"jbhk"}],"MFPr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./types"),t=require("./events");function n(n){return class extends n{connectedCallback(){let n;if(super.connectedCallback&&super.connectedCallback(),n=t.requestStore(this)){const t=e=>this.onStateChange(e.detail.state,e.detail.mutation);n.addEventListener(e.StoreEvents.Update,t,!0),this.unsubscribe=n.removeEventListener.bind(this,e.StoreEvents.Update,t,!0),this.onStateChange(n.getStore().state)}}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.unsubscribe()}onStoreConnect(){}onStateChange(e,t){}dispatch(e,n){this.dispatchEvent(t.createDispatchEvent(e,n))}}}exports.withStore=n;
},{"./types":"PhxC","./events":"jbhk"}],"ASdD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=require("./types"),e=require("./events"),s=require("./store");class r extends HTMLElement{constructor(){super(),this.store=void 0,this.listeners=new WeakMap,this.onStateChange=((t,s)=>this.dispatchEvent(e.createUpdateEvent(t,s))),this.onStoreRequest=(t=>{t.stopPropagation(),t.detail.store=this}),this.onStoreDispatch=(t=>{this.getStore().dispatch(t.detail)}),this.addEventListener(t.StoreEvents.Request,this.onStoreRequest,!0),this.addEventListener(t.StoreEvents.Dispatch,this.onStoreDispatch,!0),this.store=s.createStore(this.config),this.store.subscribe(this.onStateChange)}get config(){return{}}getStore(){return this.store}}exports.StoreProvider=r;
},{"./types":"PhxC","./events":"jbhk","./store":"Anub"}],"z7Qe":[function(require,module,exports) {
"use strict";function e(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0}),e(require("./store")),e(require("./withStore")),e(require("./StoreProvider")),e(require("./types"));
},{"./store":"Anub","./withStore":"MFPr","./StoreProvider":"ASdD","./types":"PhxC"}],"Hxbb":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/store"),t=require("@tiny-lit/element");let i,o,r,a,s,l,n,c=e=>e;const m=e=>{if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e},d=[{name:"Men+s+Tech+Shell+Full-Zip",title:"Men's Tech Shell Full-Zip",category:"mens_outerwear",price:50.2},{name:"Anvil+L+S+Crew+Neck+-+Grey",title:"Anvil L/S Crew Neck - Grey",category:"mens_outerwear",price:22.15},{name:"Green+Flex+Fleece+Zip+Hoodie",title:"Green Flex Fleece Zip Hoodie",category:"mens_outerwear",price:45.65},{name:"Android+Nylon+Packable+Jacket",title:"Android Nylon Packable Jacket",category:"mens_outerwear",price:33.6},{name:"YouTube+Ultimate+Hooded+Sweatshirt",title:"YouTube Ultimate Hooded Sweatshirt",category:"mens_outerwear",price:32.35},{name:"Grey+Heather+Fleece+Zip+Hoodie",title:"Grey Heather Fleece Zip Hoodie",category:"mens_outerwear",price:38.85},{name:"Vastrm+Hoodie",title:"Vastrm Hoodie",category:"mens_outerwear",price:200},{name:"Recycled+Plastic+Bottle+Hoodie+-+Green",title:"Recycled Plastic Bottle Hoodie - Green",category:"mens_outerwear",price:60.95},{name:"Rowan+Pullover+Hood",title:"Rowan Pullover Hood",category:"mens_outerwear",price:60.85},{name:"Men+s+Voyage+Fleece+Jacket",title:"Men's Voyage Fleece Jacket",category:"mens_outerwear",price:48},{name:"Eco-Jersey+Chrome+Zip+Up+Hoodie",title:"Eco-Jersey Chrome Zip Up Hoodie",category:"mens_outerwear",price:37.75},{name:"Android+Colorblock+Hooded+Pullover",title:"Android Colorblock Hooded Pullover",category:"mens_outerwear",price:50.2},{name:"Tri-blend+Full-Zip+Hoodie",title:"Tri-blend Full-Zip Hoodie",category:"mens_outerwear",price:52.2},{name:"Fleece+Full-Zip+Hoodie",title:"Fleece Full-Zip Hoodie",category:"mens_outerwear",price:45.65},{name:"Jacquard-Knit+Full-Zip+Fleece",title:"Jacquard-Knit Full-Zip Fleece",category:"mens_outerwear",price:74.9},{name:"YouTube+Unisex+Flex+Fleece+Zip+Hoodie",title:"YouTube Unisex Flex Fleece Zip Hoodie",category:"mens_outerwear",price:45.25}],p=(0,e.withStore)(t.Element);class h extends e.StoreProvider{static get is(){return"my-store"}get config(){return{initialState:{...JSON.parse(this.getAttribute("initial-state")),cart:[],count:0},plugins:[e=>e.subscribe(console.log)],actions:{addToCart({commit:e},t){e("addItem",t),e("updateCount")},removeFromCart({commit:e},t){e("removeItemByIndex",t),e("updateCount")},removeAllFromCart({commit:e,state:t}){t.cart.forEach(t=>e("removeItem",t)),e("updateCount")}},mutations:{addItem:(e,t)=>({...e,cart:[...e.cart,t]}),removeItemByIndex:(e,t)=>({...e,cart:e.cart.filter((e,i)=>i!==t)}),removeItem:(e,t)=>({...e,cart:e.cart.filter(e=>e!==t)}),updateCount:e=>({...e,count:e.cart.length})}}}}customElements.define(h.is,h);class u extends p{constructor(){super(),this.toggleCart=(()=>{this.setState({open:!this.state.open})}),this.count=0,this.items=[],this.state={open:!1}}static get properties(){return{count:Number,items:Object}}onStateChange(e){this.count=e.count,this.items=e.cart}static get is(){return"shop-basket"}handleRemove(e){this.dispatch("removeFromCart",e)}handleRemoveAll(){this.dispatch("removeAllFromCart")}render(){return(0,t.html)(i||(i=c`
            <style>
                .basket {
                    position: fixed;
                    bottom: 0;
                    right: 10px;
                    color: white;
                    z-index: 100;
                }

                .basket__list {
                    z-index: 100;
                    overflow-y: scroll;
                    max-height: 150px;
                    margin: 0;
                }

                .basket__listItem  {
                    margin-bottom: 5px;
                }

                .basket__listItemButton {
                    padding: 3px 5px;
                }

                .basket__dropdown {
                    position: absolute;
                    bottom: calc(100% + 10px);
                    background-color: rgb(var(--background));
                    width: 300px;
                    right: 0;
                    padding: 10px;
                    border: 1px solid rgb(var(--primary));
                }

                .basket__toggle {
                    position: relative;
                }

                .basket__badge {
                    background: rgb(var(--primary));
                    border-radius: 50%;
                    padding: 2px;
                    color: rgb(var(--background));
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 15px;
                    height: 15px;
                    font-size: 12px;
                    line-height: 15px;
                    margin: 5px 10px 0;
                }

                .basket__clear {
                    float:right;
                    margin-top: 20px;
                }
            </style>
            <div class="basket">
                <button class="basket__toggle" onClick=${0}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        width="24"
                    >
                        <path
                            fill="currentColor"
                            d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                        ></path>
                    </svg>
                    <span class="basket__badge">${0}</span>
                </button>
                <div class="basket__dropdown" hidden=${0}>
                    <span>Total: ${0}${0}</span>


                    <table class="basket__list">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${0}
                        </tbody>
                    </table>

                    ${0}
                </div>
            </div>
        `),this.toggleCart,this.count,!this.state.open,this.count,(0,t.html)(o||(o=c`<span>items</span>`)),this.items.map((e,i)=>(0,t.html)(r||(r=c`
                                <tr>
                                    <td>${0}</td>
                                    <td>1</td>
                                    <td>
                                        <button
                                            class="basket__listItemButton"
                                            onCLick=${0}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            `),e.title,()=>this.handleRemove(i))),this.items.length?(0,t.html)(a||(a=c`<button class="basket__clear" onClick=${0}>remove all</button>`),()=>this.handleRemoveAll()):null)}}customElements.define(u.is,u);class g extends p{constructor(...e){super(...e),this.item={},this.handleClick=(()=>{this.dispatch("addToCart",this.item)})}static get is(){return"shop-item"}static get properties(){return{item:m}}render(){return(0,t.html)(s||(s=c`
            <div class="detail" has-content="">
                <img
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw"
                    width="300"
                    height="300"
                    class="image"
                />
                <h1>${0}</h1>
                <div class="price">${0}$</div>
                <button
                    onClick=${0}
                    class="button"
                    aria-label="Add this item to cart"
                >
                    Add to Cart
                </button>
            </div>
        `),this.item.title,this.item.price,this.handleClick)}}customElements.define(g.is,g);class b extends t.Element{static get is(){return"store-demo"}render(){return(0,t.html)(l||(l=c`
            <style>
                h1 {
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 28px;
                    margin: 0;
                }
                .detail {
                    text-align:center;
                    margin: 0 28px 48px;
                }
                .price {
                    margin: 0px 0 10px;
                    font-size: 13px;
                }
                .image {
                    max-width: 100%;
                    background: rgb(117, 117, 117);
                }
                my-store {
                    display: flex;
                    flex-wrap: wrap;
                    position: relative;
                }
                shop-item {
                    flex: 1 1;
                    flex-basis: 33%;
                    max-width: 33%;
                }
                @media (max-width: 767px) {
                    shop-item {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
                }
            </style>
            <my-store>
                <shop-basket></shop-basket>
                ${0}
            </my-store>
        `),d.map(e=>(0,t.html)(n||(n=c`<shop-item item=${0}></shop-item>`),e)))}}customElements.define(b.is,b);
},{"@tiny-lit/store":"z7Qe","@tiny-lit/element":"aqGS"}],"FuWg":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/element");let t,s,i=e=>e;const a=s=>(0,e.html)(t||(t=i` <div>${0}</div> `),s);class n extends e.Element{static get is(){return"test-svg"}static get properties(){return{radius:Number}}constructor(){super(),this.maxRadius=50,this.onChange=(({target:e})=>{this.maxRadius=Number(e.value),this.update()}),this.attachShadow({mode:"open"})}connectedCallback(){super.connectedCallback(),this.interval=setInterval(()=>{this.radius=Math.abs(Math.sin(Date.now()/1e3)*this.maxRadius)},10)}disconnectedCallback(){clearInterval(this.interval)}get radius(){console.log("get")}set radius(e){console.log("set",e)}render(){return(0,e.html)(s||(s=i`
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    height: 50vh;
                }
            </style>
            <div>
                <p>Max size</p>
                <input
                    type="range"
                    min="10"
                    max="100"
                    onChange=${0}
                />
            </div>
            <svg height=${0} width=${0}>
                <circle
                    cx=${0}
                    cy=${0}
                    r="${0}"
                    stroke="black"
                    stroke-width="3"
                    fill="red"
                />
                Sorry, your browser does not support inline SVG.
            </svg>
        `),this.onChange,2*this.maxRadius,2*this.maxRadius,this.maxRadius,this.maxRadius,this.radius)}}customElements.define(n.is,n);
},{"@tiny-lit/element":"aqGS"}],"w93M":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=(()=>({path:()=>location.hash?location.hash.substring(1):"/",go(e){location.hash=`#${e}`},listen:e=>(addEventListener("hashchange",e),removeEventListener.bind(window,"hashchange",e))}));
},{}],"Hb6S":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=(()=>({path:()=>location.pathname,go(e){history.pushState(null,document.title,e),dispatchEvent(new Event("pushstate"))},listen:e=>(addEventListener("popstate",e),addEventListener("pushstate",e),removeEventListener.bind(window,"popstate",e))}));
},{}],"VgnX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./hash");exports.createHashHistory=e.default;var r=require("./path");exports.createPathHistory=r.default;
},{"./hash":"w93M","./path":"Hb6S"}],"sLyR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=require("./history"),e=/\/:([\w]+)(?:{([\w,]+)})?(\?)?/g;function s(t){let s,r=[],o=t;if("*"===t)return{regex:/.*/,params:[]};for(;s=e.exec(t);){const t=s[2]?`${s[2].split(",").join("|")}`:"[^/]+";r.push(s[1]),o=o.replace(s[0],`(?:\\/(${t}))${s[3]?"?":""}`)}return{regex:new RegExp(`^${o}\\/?$`),params:r}}class r{constructor({interceptLocals:e,useHash:s}){this.routes=[],this.handleLocalClick=(t=>{const e=t.target;"A"===e.nodeName&&0===e.href.indexOf(location.origin)&&(t.preventDefault(),this.goTo(e.getAttribute("href")))}),this.resolve=(()=>{const t=this.history.path(),e=this.current;this.routes.some(s=>{let r=t.match(s.regex);const{onEnter:o,onUpdate:i}=s.callbacks;return r&&(r=r.filter(t=>void 0!==t).reduce((t,e,r)=>(r&&(t[s.params[r-1]]=e),t),{}),e!==s?(this.current=s,e&&e.callbacks.onLeave(r),o(r)):i(r)),r})}),this.history=s?t.createHashHistory():t.createPathHistory(),this.history.listen(this.resolve),e&&document.addEventListener("click",this.handleLocalClick)}on(t,e={}){const r={path:t,callbacks:e,...s(t)};return this.routes.push(r),()=>this.routes=this.routes.filter(t=>t!==r)}goTo(t){this.history.go(t)}}exports.Router=r;
},{"./history":"VgnX"}],"UHXL":[function(require,module,exports) {
"use strict";var e,t;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.onRouteUpdate="onRouteUpdate",e.onRouteEnter="onRouteEnter",e.onRouteLeave="onRouteLeave"}(e=exports.RouteComponentCallbacks||(exports.RouteComponentCallbacks={})),function(e){e.Request="router::request",e.Change="router::change"}(t=exports.RouterEvents||(exports.RouterEvents={}));
},{}],"cP8Q":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./types");function t(t){const r=new CustomEvent(e.RouterEvents.Request,{detail:{}});return t.dispatchEvent(r),r.detail.router}exports.requestRouter=t;
},{"./types":"UHXL"}],"alIf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./events"),t=new Set,n=e=>new Promise(n=>{if(!e||t.has(e))return n();{const o=document.createElement("script");o.onload=n,o.src=e,document.head.appendChild(o),t.add(e)}}),o=(e,t)=>n(e.getAttribute("module")).then(()=>customElements.whenDefined(t.localName));class s extends HTMLElement{connectedCallback(){const t=this.getAttribute("path"),n=this.getAttribute("component");if(t&&n&&(this.router=e.requestRouter(this))){const e=document.createElement(n);this.dispose=this.router.on(t,{onEnter:t=>{o(this,e).then(()=>this.appendChild(e)).then(()=>e.onRouteEnter&&e.onRouteEnter(t))},onUpdate:t=>{o(this,e).then(()=>e.onRouteUpdate&&e.onRouteUpdate(t))},onLeave:()=>{o(this,e).then(()=>e.onRouteLeave&&e.onRouteLeave()).then(()=>this.removeChild(e))}})}}disconnectedCallback(){this.dispose&&this.dispose()}}exports.RouteElement=s;
},{"./events":"cP8Q"}],"ItPG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./router"),t=require("./types");class r extends HTMLElement{constructor(){super(...arguments),this.onRouterRequest=(e=>{e.detail.router=this.router})}connectedCallback(){document.body.addEventListener(t.RouterEvents.Request,this.onRouterRequest,!0),this.router||(this.router=new e.Router({interceptLocals:this.hasAttribute("intercept-locals"),useHash:this.hasAttribute("use-hash")})),Promise.resolve().then(this.router.resolve)}disconnectedCallback(){document.body.removeEventListener(t.RouterEvents.Request,this.onRouterRequest,!0)}}exports.RouterProvider=r;
},{"./router":"sLyR","./types":"UHXL"}],"gYEz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./router");exports.Router=e.Router;var r=require("./RouteElement");exports.RouteElement=r.RouteElement;var t=require("./RouterProvider");exports.RouterProvider=t.RouterProvider;
},{"./router":"sLyR","./RouteElement":"alIf","./RouterProvider":"ItPG"}],"uBxZ":[function(require,module,exports) {
"use strict";require("./todo/index.js"),require("./scheduler/index.js"),require("./store/index.js"),require("./svg/index.js");var e=require("@tiny-lit/router");customElements.define("demo-router",e.RouterProvider),customElements.define("demo-route",e.RouteElement);
},{"./todo/index.js":"x8N4","./scheduler/index.js":"oPrN","./store/index.js":"Hxbb","./svg/index.js":"FuWg","@tiny-lit/router":"gYEz"}]},{},["uBxZ"], null)
//# sourceMappingURL=https://alenaksu.github.io/tiny-lit/demo/src.e25a6e24.js.map