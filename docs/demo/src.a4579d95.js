parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"K4Wa":[function(require,module,exports) {
"use strict";function e(e){return void 0===e&&(e=""),document.createComment(e)}function t(e){return void 0===e&&(e=""),document.createTextNode(e)}function r(e){return!!e&&!!e.nodeType}function o(e,t){var r=[].concat(t),o=r[0],i=r[1];o.parentNode&&(i&&o.nextSibling!==i&&n(o.nextSibling,i),o.parentNode.replaceChild(e,o))}function n(e,t,r){if(void 0===t&&(t=null),void 0===r&&(r=e.parentNode),r)for(;e!==t;){var o=e.nextSibling;r.removeChild(e),e=o}}function i(e,t,r){void 0===r&&(r=t.parentNode);var o=e.range,n=o[0],i=o[1],s=t.nextSibling,p=n;do{var a=p.nextSibling;r.insertBefore(p,s),p=a}while(p!==i);r.insertBefore(i,s)}function s(e){for(var t=0;e=e.previousSibling;)t++;return t}function p(e){for(var t=[];e.parentNode;)t.unshift(s(e)),e=e.parentNode;return t}function a(e,t){for(var r=0,o=t.length;r<o;r++)e=e.childNodes[t[r]];return e}function x(e,t){return d(e)&&d(t)&&e.strings===t.strings}function d(e){return e&&e[exports.TemplateSymbol]}function u(e){var t=exports.MARKER_RE.exec(e);return exports.MARKER_RE.lastIndex=0,t?Number(t[1]||t[2]):-1}Object.defineProperty(exports,"__esModule",{value:!0}),exports.comment=e,exports.text=t,exports.isNode=r,exports.replaceRange=o,exports.removeNodes=n,exports.moveTemplate=i,exports.getNodeIndex=s,exports.getNodePath=p,exports.getNodeByPath=a,exports.TemplateSymbol=Symbol(),exports.isTemplateEqual=x,exports.isTemplate=d,exports.MARKER_PREFIX="__"+Math.random().toString().slice(2)+"_",exports.MARKER_RE=new RegExp("\x3c!--"+exports.MARKER_PREFIX+"(\\d+)--\x3e|"+exports.MARKER_PREFIX+"(\\d+)"),exports.TEXT_ELEMENT=/^(?:style|textarea)$/i,exports.markerNumber=u;
},{}],"ltjX":[function(require,module,exports) {
"use strict";var o;Object.defineProperty(exports,"__esModule",{value:!0}),function(o){o[o.Low=0]="Low",o[o.Normal=1]="Normal",o[o.High=2]="High"}(o=exports.JobPriority||(exports.JobPriority={}));
},{}],"IJbV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./types"),n=[],r=[],t=!1,o=0,i=!0;function a(e,n){for(var r=0;n-performance.now()>0&&r<e.length;){var t=e[r++];t.task.apply(t,t.args),t.args=void 0,t.pending=!1}e.splice(0,r)}function s(){t=!0,requestAnimationFrame(function(){o++;var e=performance.now()+10*Math.ceil(.02*o);a(n,e),a(r,e),n.length>0&&(r.push.apply(r,n),n.length=0),r.length>0?s():(t=!1,o=0)})}function p(e){i=e}function u(o,i){o.pending=!0,i===e.JobPriority.Normal?n.push(o):i===e.JobPriority.Low&&r.push(o),t||s()}function l(n,r){void 0===r&&(r=e.JobPriority.Normal);var t={task:n,args:[],pending:!1,firstRun:!0};return function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];t.firstRun||!i?(t.firstRun=!1,n.apply(void 0,e)):(t.args=e,t.pending||u(t,r))}}exports.setEnabled=p,exports.enqueueJob=u,exports.scheduled=l;
},{"./types":"ltjX"}],"bRxU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./utils"),t=require("./scheduler"),a=function(){return function(e,a,r){var n=this;this.element=e,this.name=a,this.namespaceURI=r,this.update=t.scheduled(function(e){if(n.value!==e){var t=n,a=t.name,r=t.element,i=t.namespaceURI;"ownerSVGElement"in r?r.setAttributeNS(i,a,e):a in r?r[a]=e:void 0!==e?r.setAttribute(a,e):r.hasAttribute(a)&&r.removeAttribute(a),n.value=e}})}}();exports.AttributeExpression=a;var r=function(){function a(a){var r=this;this.update=t.scheduled(function(t){if(t!==r.value){var a=r,n=a.element,i=a.placeholder;"object"!=typeof t&&n.nodeType===Node.TEXT_NODE?n.textContent=t:e.isTemplateEqual(t,n)?n.update(t.values):Array.isArray(t)?(r.value instanceof Map||n.nodeType===Node.COMMENT_NODE||r.replaceWith(i),t=r.updateArray(t)):r.replaceWith(null==t?i:t),r.value=t}}),this.element=this.placeholder=a}return a.prototype.updateArray=function(t){var a=this.value instanceof Map?this.value:new Map,r=this.element,n=t.reduce(function(t,n,i){var s=String(n.key||i),u=a.get(s);if(u)e.isTemplateEqual(u,n)?u.update(n.values):(e.replaceRange(n.create(),u.range),a.set(s,u=n));else{var l=n.create();r.parentNode.insertBefore(l,r.nextSibling),a.set(s,u=n)}return r.nextSibling!==u.range[0]&&e.moveTemplate(u,r),r=u.range[1],t.push(s),t},[]);return a.forEach(function(e,t,a){-1===n.indexOf(t)&&(e.delete(),a.delete(t))}),a},a.prototype.replaceWith=function(t){var a=this.element,r=this.value;r instanceof Map&&(r.forEach(function(e){return e.delete()}),r.clear()),a!==t&&(this.element=t=e.isTemplate(t)?t:e.isNode(t)?t:e.text(t),e.replaceRange(e.isTemplate(t)?t.create():t,e.isTemplate(a)?a.range:a))},a}();exports.NodeExpression=r;
},{"./utils":"K4Wa","./scheduler":"IJbV"}],"dJPV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./expressions"),t=require("./utils");function r(){return NodeFilter.FILTER_ACCEPT}function n(r,n){for(var o=r.attributes,a=o.length;a--;){var i=o.item(a),s=i.name,u=i.value,d=i.namespaceURI,p=t.markerNumber(u);~p&&(r.removeAttribute(s),n[p]={type:e.AttributeExpression,name:s,namespaceURI:d,nodePath:t.getNodePath(r)})}}function o(r,n){var o=t.markerNumber(r.data);~o&&(n[o]={type:e.NodeExpression,nodePath:t.getNodePath(r)},r.nodeValue="")}function a(r,n){for(var o;null!==(o=t.MARKER_RE.exec(r.data));){var a=t.text();(r=r.splitText(o.index)).deleteData(0,o[0].length),r.parentNode.insertBefore(a,r),n[Number(o[1]||o[2])]={type:e.NodeExpression,nodePath:t.getNodePath(a)}}}function i(e){for(var i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,r,!1),s=[];i.nextNode();){var u=i.currentNode;u.nodeType===Node.ELEMENT_NODE?(n(u,s),t.TEXT_ELEMENT.test(u.tagName)&&[].forEach.call(u.childNodes,function(e){return a(e,s)})):o(u,s)}return s}function s(e,r){return r.map(function(r){return new r.type(t.getNodeByPath(e,r.nodePath),r.name,r.namespaceURI)})}r.acceptNode=r,exports.linkAttributes=n,exports.linkComment=o,exports.linkTexts=a,exports.linkExpressions=i,exports.resolve=s;
},{"./expressions":"bRxU","./utils":"K4Wa"}],"gHUc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./linker"),t=require("./utils"),n=new WeakMap;function r(t,n){var r=document.createElement("template");r.innerHTML=n?"<"+n+">"+t+"</"+n+">":t;var a=r.content;if(n){var s=document.createRange();s.selectNodeContents(a.firstChild),a=s.extractContents()}return{content:a,expressions:e.linkExpressions(a)}}function a(e){var n,r=new RegExp("^[^]*<([0-9a-z-]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");!function(e){e[e.TagName=1]="TagName",e[e.ClosedTag=2]="ClosedTag",e[e.EndTag=3]="EndTag"}(n||(n={}));for(var a=!1,s=e[0],o=0,i=e.length;o<i-1;o++){var c=""+t.MARKER_PREFIX+o,u=e[o].match(r);u[n.TagName]?a=!u[n.ClosedTag]:u[n.EndTag]&&(a=!1),s+=(a?c:"\x3c!--"+c+"--\x3e")+e[o+1]}return s}function s(t,s){var o=n.get(t);o||n.set(t,o=r(a(t),s));var i=document.importNode(o.content,!0);return{fragment:i,expressions:e.resolve(i,o.expressions)}}exports.parseTemplate=s;
},{"./linker":"dJPV","./utils":"K4Wa"}],"EMxn":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./parser"),s=require("./utils"),i=function(){function i(t,s,i){this[e]=!0,this.values=s,this.strings=t,this.context=i}return i.prototype.withKey=function(e){return this.key=e,this},i.prototype.update=function(e){for(var t=0;t<e.length;t++)void 0!==this.expressions[t]&&this.expressions[t].update(e[t])},i.prototype.delete=function(){s.removeNodes(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0},i.prototype.create=function(){var e=t.parseTemplate(this.strings,this.context),i=e.fragment,r=e.expressions;return this.expressions=r,this.range=[i.insertBefore(s.text(),i.firstChild),i.appendChild(s.text())],this.update(this.values),i},i}();exports.Template=i,e=s.TemplateSymbol;
},{"./parser":"gHUc","./utils":"K4Wa"}],"hLsR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./template");exports.Template=e.Template;var t=require("./scheduler");exports.scheduled=t.scheduled;var r=require("./template"),s=require("./utils");function n(e,t){n.instances.has(t)?n.instances.get(t).update(e.values):(n.instances.set(t,e),s.removeNodes(t.firstChild,null,t),t.appendChild(e.create()))}function a(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t)}function l(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t,"svg")}exports.render=n,n.instances=new WeakMap,exports.html=a,exports.svg=l;
},{"./template":"EMxn","./scheduler":"IJbV","./utils":"K4Wa"}],"QYMI":[function(require,module,exports) {
"use strict";function t(t){const e=`on${t.charAt(0).toUpperCase()}${t.slice(1)}Changed`;return function(...t){this[e]&&this[e](...t)}}function e(e,r){return{type:r.call?r:r.type,onChange:!0===r.onChange?t(e):r.onChange}}function r(t,e,r){Object.defineProperty(t,e,{get(){return this.__props[e]},set(t){const n=this[e];this.__props[e]=t,this.rendered&&n!==t&&(r.onChange&&r.onChange.call(this,t,n),this.update())}})}function n(t){if(!t.__attrs){const n=t.properties||{},s=Object.create(null),o=Object.create(null),c=t.prototype;for(const t in n){const i=e(t,n[t]);s[t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()]=t,o[t]=i,r(c,t,i)}t.__attrs=s,t.__props=o}return Object.keys(t.__attrs)}function s(t){return class extends t{constructor(){super(...arguments),this.__props=Object.create(null)}static get observedAttributes(){return n(this)}attributeChangedCallback(t,e,r){const{__attrs:n,__props:s}=this.constructor;if(s&&n&&t in s){const e=n[t];this[e]=s[e].type(r)}}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.withProps=s;
},{}],"Wkjt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./types"),n=[],r=[],t=!1,o=0,i=!0;function a(e,n){for(var r=0;n-performance.now()>0&&r<e.length;){var t=e[r++];t.task.apply(t,t.args),t.args=void 0,t.pending=!1}e.splice(0,r)}function s(){t=!0,requestAnimationFrame(function(){o++;var e=performance.now()+10*Math.ceil(.02*o);a(n,e),a(r,e),n.length>0&&(r.push.apply(r,n),n.length=0),r.length>0?s():(t=!1,o=0)})}function p(e){i=e}function u(o,i){o.pending=!0,i===e.JobPriority.Normal?n.push(o):i===e.JobPriority.Low&&r.push(o),t||s()}function l(n,r){void 0===r&&(r=e.JobPriority.Normal);var t={task:n,args:[],pending:!1,firstRun:!0};return function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];t.firstRun||!i?(t.firstRun=!1,n.apply(void 0,e)):(t.args=e,t.pending||u(t,r))}}exports.setEnabled=p,exports.enqueueJob=u,exports.scheduled=l;
},{"./types":"ltjX"}],"c6EW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./utils"),t=require("./scheduler"),a=function(){return function(e,a,r){var n=this;this.element=e,this.name=a,this.namespaceURI=r,this.update=t.scheduled(function(e){if(n.value!==e){var t=n,a=t.name,r=t.element,i=t.namespaceURI;"ownerSVGElement"in r?r.setAttributeNS(i,a,e):a in r?r[a]=e:void 0!==e?r.setAttribute(a,e):r.hasAttribute(a)&&r.removeAttribute(a),n.value=e}})}}();exports.AttributeExpression=a;var r=function(){function a(a){var r=this;this.update=t.scheduled(function(t){if(t!==r.value){var a=r,n=a.element,i=a.placeholder;"object"!=typeof t&&n.nodeType===Node.TEXT_NODE?n.textContent=t:e.isTemplateEqual(t,n)?n.update(t.values):Array.isArray(t)?(r.value instanceof Map||n.nodeType===Node.COMMENT_NODE||r.replaceWith(i),t=r.updateArray(t)):r.replaceWith(null==t?i:t),r.value=t}}),this.element=this.placeholder=a}return a.prototype.updateArray=function(t){var a=this.value instanceof Map?this.value:new Map,r=this.element,n=t.reduce(function(t,n,i){var s=String(n.key||i),u=a.get(s);if(u)e.isTemplateEqual(u,n)?u.update(n.values):(e.replaceRange(n.create(),u.range),a.set(s,u=n));else{var l=n.create();r.parentNode.insertBefore(l,r.nextSibling),a.set(s,u=n)}return r.nextSibling!==u.range[0]&&e.moveTemplate(u,r),r=u.range[1],t.push(s),t},[]);return a.forEach(function(e,t,a){-1===n.indexOf(t)&&(e.delete(),a.delete(t))}),a},a.prototype.replaceWith=function(t){var a=this.element,r=this.value;r instanceof Map&&(r.forEach(function(e){return e.delete()}),r.clear()),a!==t&&(this.element=t=e.isTemplate(t)?t:e.isNode(t)?t:e.text(t),e.replaceRange(e.isTemplate(t)?t.create():t,e.isTemplate(a)?a.range:a))},a}();exports.NodeExpression=r;
},{"./utils":"K4Wa","./scheduler":"Wkjt"}],"aDZC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./expressions"),t=require("./utils");function r(){return NodeFilter.FILTER_ACCEPT}function n(r,n){for(var o=r.attributes,a=o.length;a--;){var i=o.item(a),s=i.name,u=i.value,d=i.namespaceURI,p=t.markerNumber(u);~p&&(r.removeAttribute(s),n[p]={type:e.AttributeExpression,name:s,namespaceURI:d,nodePath:t.getNodePath(r)})}}function o(r,n){var o=t.markerNumber(r.data);~o&&(n[o]={type:e.NodeExpression,nodePath:t.getNodePath(r)},r.nodeValue="")}function a(r,n){for(var o;null!==(o=t.MARKER_RE.exec(r.data));){var a=t.text();(r=r.splitText(o.index)).deleteData(0,o[0].length),r.parentNode.insertBefore(a,r),n[Number(o[1]||o[2])]={type:e.NodeExpression,nodePath:t.getNodePath(a)}}}function i(e){for(var i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,r,!1),s=[];i.nextNode();){var u=i.currentNode;u.nodeType===Node.ELEMENT_NODE?(n(u,s),t.TEXT_ELEMENT.test(u.tagName)&&[].forEach.call(u.childNodes,function(e){return a(e,s)})):o(u,s)}return s}function s(e,r){return r.map(function(r){return new r.type(t.getNodeByPath(e,r.nodePath),r.name,r.namespaceURI)})}r.acceptNode=r,exports.linkAttributes=n,exports.linkComment=o,exports.linkTexts=a,exports.linkExpressions=i,exports.resolve=s;
},{"./expressions":"c6EW","./utils":"K4Wa"}],"J7P1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./linker"),t=require("./utils"),n=new WeakMap;function r(t,n){var r=document.createElement("template");r.innerHTML=n?"<"+n+">"+t+"</"+n+">":t;var a=r.content;if(n){var s=document.createRange();s.selectNodeContents(a.firstChild),a=s.extractContents()}return{content:a,expressions:e.linkExpressions(a)}}function a(e){var n,r=new RegExp("^[^]*<([0-9a-z-]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");!function(e){e[e.TagName=1]="TagName",e[e.ClosedTag=2]="ClosedTag",e[e.EndTag=3]="EndTag"}(n||(n={}));for(var a=!1,s=e[0],o=0,i=e.length;o<i-1;o++){var c=""+t.MARKER_PREFIX+o,u=e[o].match(r);u[n.TagName]?a=!u[n.ClosedTag]:u[n.EndTag]&&(a=!1),s+=(a?c:"\x3c!--"+c+"--\x3e")+e[o+1]}return s}function s(t,s){var o=n.get(t);o||n.set(t,o=r(a(t),s));var i=document.importNode(o.content,!0);return{fragment:i,expressions:e.resolve(i,o.expressions)}}exports.parseTemplate=s;
},{"./linker":"aDZC","./utils":"K4Wa"}],"vKx2":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./parser"),s=require("./utils"),i=function(){function i(t,s,i){this[e]=!0,this.values=s,this.strings=t,this.context=i}return i.prototype.withKey=function(e){return this.key=e,this},i.prototype.update=function(e){for(var t=0;t<e.length;t++)void 0!==this.expressions[t]&&this.expressions[t].update(e[t])},i.prototype.delete=function(){s.removeNodes(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0},i.prototype.create=function(){var e=t.parseTemplate(this.strings,this.context),i=e.fragment,r=e.expressions;return this.expressions=r,this.range=[i.insertBefore(s.text(),i.firstChild),i.appendChild(s.text())],this.update(this.values),i},i}();exports.Template=i,e=s.TemplateSymbol;
},{"./parser":"J7P1","./utils":"K4Wa"}],"KtSa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./template");exports.Template=e.Template;var t=require("./scheduler");exports.scheduled=t.scheduled;var r=require("./template"),s=require("./utils");function n(e,t){n.instances.has(t)?n.instances.get(t).update(e.values):(n.instances.set(t,e),s.removeNodes(t.firstChild,null,t),t.appendChild(e.create()))}function a(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t)}function l(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t,"svg")}exports.render=n,n.instances=new WeakMap,exports.html=a,exports.svg=l;
},{"./template":"vKx2","./scheduler":"Wkjt","./utils":"K4Wa"}],"CloO":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function t(t){for(var n=1;n<arguments.length;n++){var s=null!=arguments[n]?arguments[n]:{};n%2?e(Object(s),!0).forEach(function(e){r(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):e(Object(s)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0});const n=require("@tiny-lit/core");function s(e){return class extends e{constructor(){super(...arguments),this.state={},this.rendered=!1,this.renderCallbacks=[],this.renderRoot=this}attachShadow(e){return this.renderRoot=super.attachShadow.call(this,e)}connectedCallback(){this.update()}setState(e,r){const n=this.state;this.state=t(t({},n),"function"==typeof e?e(n,this):e),r&&this.renderCallbacks.push(r),this.update()}render(){return null}update(){this.rendered=!0;const e=this.render();for(e&&n.render(e,this.renderRoot);this.renderCallbacks.length;)this.renderCallbacks.shift()()}}}exports.withElement=s;
},{"@tiny-lit/core":"KtSa"}],"uFXB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./withProps"),t=require("./withElement");exports.Element=e.withProps(t.withElement(HTMLElement));
},{"./withProps":"QYMI","./withElement":"CloO"}],"Hi6w":[function(require,module,exports) {
"use strict";function e(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./Element");exports.Element=r.Element;var t=require("./withProps");exports.withProps=t.withProps;var i=require("./withElement");exports.withElement=i.withElement,e(require("@tiny-lit/core"));
},{"./Element":"uFXB","./withProps":"QYMI","./withElement":"CloO","@tiny-lit/core":"KtSa"}],"yuEz":[function(require,module,exports) {
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
},{"@tiny-lit/core":"hLsR"}],"bLEl":[function(require,module,exports) {
"use strict";var t=require("@tiny-lit/core"),e=require("@tiny-lit/element"),o=a(require("./style.js"));let s,l,i=t=>t;function a(t){return t&&t.__esModule?t:{default:t}}function d(t){return e=>{e.stopPropagation(),e.preventDefault(),t(e)}}function n(t){const e=localStorage.getItem("todoMvc");return e?JSON.parse(e):t}function r(t){window.requestAnimationFrame(()=>localStorage.setItem("todoMvc",JSON.stringify(t)))}function c(t){let e=t.length;for(;e>0;){let o=Math.floor(Math.random()*e),s=t[--e];t[e]=t[o],t[o]=s}return t}class h extends e.Element{constructor(){super(),this.state=n({todos:[],filter:null}),this.attachShadow({mode:"open"})}static get is(){return"todo-mvc"}setState(t){super.setState(t),r(this.state)}setFilter(t){this.setState({filter:t})}handleAddTodo(t){this.setState({todos:[...this.state.todos,{text:t.target.elements[0].value,completed:!1,id:Math.random().toString().substr(2)}]}),t.target.reset()}handleDeleteTodo(t){this.setState({todos:[...this.state.todos.filter(e=>e!==t)]})}switchCompleted(t){return d(()=>{const e=this.state.todos;e[t].completed=!e[t].completed,this.setState({todos:[...e]})})}handleClearCompleted(){this.setState({todos:[...this.state.todos.filter(t=>!t.completed)]})}connectedCallback(){const t=this.rendered;t||console.time("render"),this.update(),t||console.timeEnd("render")}render(){const{filter:e,todos:a}=this.state;return(0,t.html)(s||(s=i`
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
                        <strong>${0}
                        </strong> item left
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
                    <button class="clear-completed" onClick=${0}>Clear completed</button>
                    <button class="clear-completed shuffle" onClick=${0}>Shuffle</button>
                </footer>
            </section>
            <footer class="info">
                <p>Double-click to edit a todo</p>
                <!-- Change this out with your name and url ↓ -->
                <p>Created by <a href="http://todomvc.com">you</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        `),o.default,d(t=>this.handleAddTodo(t)),a.map((t,e)=>(t.index=e,t)).filter(t=>null===e||t.completed===e).map(e=>(0,t.html)(l||(l=i`
                            <li class=${0}>
                                <div
                                    class="view"
                                >
                                    <input
                                        class="toggle"
                                        type="checkbox"
                                        checked=${0}
                                        onClick=${0}
                                    />
                                    <label onClick=${0}>${0}</label>
                                    <button class="destroy" onClick=${0}></button>
                                </div>
                                <input class="edit" value=${0} />
                            </li>
                        `),e.completed?"completed":"",e.completed,this.switchCompleted(e.index),this.switchCompleted(e.index),e.text,d(()=>this.handleDeleteTodo(e)),e.text).withKey(e.id)),a.filter(t=>!t.completed).length,null===e&&"selected",d(()=>this.setFilter(null)),!1===e&&"selected",d(()=>this.setFilter(!1)),e&&"selected",d(()=>this.setFilter(!0)),d(()=>this.handleClearCompleted()),d(()=>this.setState({todos:c(this.state.todos)})))}}customElements.define(h.is,h);
},{"@tiny-lit/core":"hLsR","@tiny-lit/element":"Hi6w","./style.js":"yuEz"}],"afLh":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/core"),t=require("@tiny-lit/element");let s,r=e=>e;class i extends t.Element{static get is(){return"karpinsky-dot"}static get properties(){return{x:Number,y:Number,size:Number,text:String,hover:Boolean}}constructor(){super(),this.x=0,this.y=0,this.size=0,this.text="",this.hover=!1,this.addEventListener("mouseover",()=>this.hover=!0),this.addEventListener("mouseleave",()=>this.hover=!1),this.attachShadow({mode:"closed"})}render(){const{hover:t,text:i,x:n,y:o,size:h}=this,a=1.3*h;return(0,e.html)(s||(s=r`
            <style>
                span {
                    position: absolute;
                    font: normal 15px sans-serif;
                    text-align: center;
                    cursor: pointer;
                    color: black;
                    width: ${0}px;
                    height: ${0}px;
                    left: ${0}px;
                    top: ${0}px;
                    border-radius: ${0}px;
                    line-height: ${0}px;
                    background: ${0};
                }
            </style>
            <span>
                ${0}
            </span>
        `),a,a,n,o,a/2,a,t?"#ff0":"#61dafb",t?"**"+i+"**":i)}}customElements.define(i.is,i);
},{"@tiny-lit/core":"hLsR","@tiny-lit/element":"Hi6w"}],"O2BA":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/core"),r=require("@tiny-lit/element");let t,s,n,i=e=>e;const a=25;class l extends r.Element{static get is(){return"karpinsky-triangle"}static get properties(){return{x:Number,y:Number,s:Number,seconds:Number}}constructor(){super(),this.x=0,this.y=0,this.s=0,this.seconds=0}renderTemplate(){let{s:r,seconds:n,x:l,y:o}=this;if(r<=a)return(0,e.html)(t||(t=i`
                <karpinsky-dot x=${0} y=${0} size=${0} text=${0} />
            `),l-a/2,o-a/2,a,n);r/=2;{let e=performance.now()+.8;for(;performance.now()<e;);}return(0,e.html)(s||(s=i`
            <karpinsky-triangle x=${0} y=${0} s=${0} seconds=${0}></karpinsky-triangle>
            <karpinsky-triangle x=${0} y=${0} s=${0} seconds=${0}></karpinsky-triangle>
            <karpinsky-triangle x=${0} y=${0} s=${0} seconds=${0}></karpinsky-triangle>
        `),l,o-r/2,r,n,l-r,o+r/2,r,n,l+r,o+r/2,r,n)}render(){return(0,e.html)(n||(n=i`${0}`),this.renderTemplate())}}customElements.define(l.is,l);
},{"@tiny-lit/core":"hLsR","@tiny-lit/element":"Hi6w"}],"yvVT":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/core"),t=require("@tiny-lit/element");require("./Dot"),require("./Triangle");let s,n=e=>e;function r(e){let t=!0;return requestAnimationFrame(function s(){return e(),t&&requestAnimationFrame(s)}),()=>t=!1}class i extends t.Element{static get is(){return"karpinsky-demo"}constructor(){super()}static get properties(){return{elapsed:Number}}connectedCallback(){const e=this.rendered;e||console.time("render"),this.start=Date.now(),this.timerInterval=setInterval(this.tick.bind(this),1e3),this.renderInterval=r(()=>{this.elapsed=Date.now()-this.start}),this.setState({seconds:0}),e||console.timeEnd("render")}disconnectedCallback(){this.renderInterval(),clearInterval(this.timerInterval)}tick(){this.setState({seconds:this.state.seconds%10+1})}getStyle(){const e=this.elapsed/1e3%10;return`\n            position: absolute;\n            transform-origin: 0 0;\n            width: 10px;\n            height: 10px;\n            left: 50%;\n            top: 50%;\n            transform: scaleX(${(1+(e>5?10-e:e)/10)/2.1}) scaleY(0.7) translateZ(0.1px) translateX(50%)\n        `}render(){const{seconds:t}=this.state;return(0,e.html)(s||(s=n`
            <style>
                :host {
                    color: black;
                }
            </style>
            <div style=${0}>
                <karpinsky-triangle x=${0} y=${0} s=${0} seconds=${0} />
            </div>
        `),this.getStyle(),0,0,1e3,t)}}customElements.define(i.is,i);
},{"@tiny-lit/core":"hLsR","@tiny-lit/element":"Hi6w","./Dot":"afLh","./Triangle":"O2BA"}],"KtSM":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.Request="store::request",e.Dispatch="store::dispatch",e.Update="store::update"}(e=exports.StoreEvents||(exports.StoreEvents={}));
},{}],"Vm33":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=require("./types");function e(t){return(e,n)=>("string"==typeof e&&(e={type:e,data:n}),t(e))}function n(e){const n=new CustomEvent(t.StoreEvents.Request,{detail:{}});return e.dispatchEvent(n),n.detail.store}function r(e,n){return new CustomEvent(t.StoreEvents.Update,{detail:{state:e,mutation:n}})}function s(e,n){return new CustomEvent(t.StoreEvents.Dispatch,{detail:{type:e,data:n}})}exports.normalizeEvent=e,exports.requestStore=n,exports.createUpdateEvent=r,exports.createDispatchEvent=s;
},{"./types":"KtSM"}],"Sb7l":[function(require,module,exports) {
"use strict";function t(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,s)}return r}function e(e){for(var s=1;s<arguments.length;s++){var i=null!=arguments[s]?arguments[s]:{};s%2?t(Object(i),!0).forEach(function(t){r(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}function r(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var s;Object.defineProperty(exports,"__esModule",{value:!0});const i=require("./events"),n=Symbol(),o=(t,e)=>{for(const r in t)e.set(r,t[r])};class c{constructor(t={}){this[s]={},this.mutations=new Map,this.actions=new Map,this.listeners=new Set,this.dispatch=i.normalizeEvent(t=>{const e=this.actions;e.has(t.type)&&e.get(t.type)(this,t.data)}),this.commit=i.normalizeEvent(t=>{const e=this.mutations;e.has(t.type)&&(this[n]=e.get(t.type)(this.state,t.data)),this.listeners.forEach(e=>e(t))}),o(t.mutations,this.mutations),o(t.actions,this.actions),this[n]=e({},t.initialState),t.plugins&&t.plugins.forEach(t=>t(this))}get state(){return this[n]}subscribe(t){const{listeners:e}=this,r=e=>t(this.state,e);return e.add(r),t(this.state),()=>e.delete(r)}}exports.Store=c,s=n,exports.createStore=(t=>new c(t));
},{"./events":"Vm33"}],"sUqh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./types"),t=require("./events");function n(n){return class extends n{connectedCallback(){let n;if(super.connectedCallback&&super.connectedCallback(),n=t.requestStore(this)){const t=e=>this.onStateChange(e.detail.state,e.detail.mutation);n.addEventListener(e.StoreEvents.Update,t,!0),this.unsubscribe=n.removeEventListener.bind(this,e.StoreEvents.Update,t,!0),this.onStateChange(n.getStore().state)}}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.unsubscribe()}onStoreConnect(){}onStateChange(e,t){}dispatch(e,n){this.dispatchEvent(t.createDispatchEvent(e,n))}}}exports.withStore=n;
},{"./types":"KtSM","./events":"Vm33"}],"OOLT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=require("./types"),e=require("./events"),s=require("./store");class r extends HTMLElement{constructor(){super(),this.store=void 0,this.listeners=new WeakMap,this.onStateChange=((t,s)=>this.dispatchEvent(e.createUpdateEvent(t,s))),this.onStoreRequest=(t=>{t.stopPropagation(),t.detail.store=this}),this.onStoreDispatch=(t=>{this.getStore().dispatch(t.detail)}),this.addEventListener(t.StoreEvents.Request,this.onStoreRequest,!0),this.addEventListener(t.StoreEvents.Dispatch,this.onStoreDispatch,!0),this.store=s.createStore(this.config),this.store.subscribe(this.onStateChange)}get config(){return{}}getStore(){return this.store}}exports.StoreProvider=r;
},{"./types":"KtSM","./events":"Vm33","./store":"Sb7l"}],"YMTD":[function(require,module,exports) {
"use strict";function e(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0}),e(require("./store")),e(require("./withStore")),e(require("./StoreProvider")),e(require("./types"));
},{"./store":"Sb7l","./withStore":"sUqh","./StoreProvider":"OOLT","./types":"KtSM"}],"HKSt":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/store"),t=require("@tiny-lit/core"),r=require("@tiny-lit/element");let i,o,a,s,n,l,c,m=e=>e;function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach(function(t){u(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const h=e=>{if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e},g=[{name:"Men+s+Tech+Shell+Full-Zip",title:"Men's Tech Shell Full-Zip",category:"mens_outerwear",price:50.2},{name:"Anvil+L+S+Crew+Neck+-+Grey",title:"Anvil L/S Crew Neck - Grey",category:"mens_outerwear",price:22.15},{name:"Green+Flex+Fleece+Zip+Hoodie",title:"Green Flex Fleece Zip Hoodie",category:"mens_outerwear",price:45.65},{name:"Android+Nylon+Packable+Jacket",title:"Android Nylon Packable Jacket",category:"mens_outerwear",price:33.6},{name:"YouTube+Ultimate+Hooded+Sweatshirt",title:"YouTube Ultimate Hooded Sweatshirt",category:"mens_outerwear",price:32.35},{name:"Grey+Heather+Fleece+Zip+Hoodie",title:"Grey Heather Fleece Zip Hoodie",category:"mens_outerwear",price:38.85},{name:"Vastrm+Hoodie",title:"Vastrm Hoodie",category:"mens_outerwear",price:200},{name:"Recycled+Plastic+Bottle+Hoodie+-+Green",title:"Recycled Plastic Bottle Hoodie - Green",category:"mens_outerwear",price:60.95},{name:"Rowan+Pullover+Hood",title:"Rowan Pullover Hood",category:"mens_outerwear",price:60.85},{name:"Men+s+Voyage+Fleece+Jacket",title:"Men's Voyage Fleece Jacket",category:"mens_outerwear",price:48},{name:"Eco-Jersey+Chrome+Zip+Up+Hoodie",title:"Eco-Jersey Chrome Zip Up Hoodie",category:"mens_outerwear",price:37.75},{name:"Android+Colorblock+Hooded+Pullover",title:"Android Colorblock Hooded Pullover",category:"mens_outerwear",price:50.2},{name:"Tri-blend+Full-Zip+Hoodie",title:"Tri-blend Full-Zip Hoodie",category:"mens_outerwear",price:52.2},{name:"Fleece+Full-Zip+Hoodie",title:"Fleece Full-Zip Hoodie",category:"mens_outerwear",price:45.65},{name:"Jacquard-Knit+Full-Zip+Fleece",title:"Jacquard-Knit Full-Zip Fleece",category:"mens_outerwear",price:74.9},{name:"YouTube+Unisex+Flex+Fleece+Zip+Hoodie",title:"YouTube Unisex Flex Fleece Zip Hoodie",category:"mens_outerwear",price:45.25}],b=(0,e.withStore)(r.Element);class y extends e.StoreProvider{static get is(){return"my-store"}get config(){return{initialState:p(p({},JSON.parse(this.getAttribute("initial-state"))),{},{cart:[],count:0}),plugins:[e=>e.subscribe(console.log)],actions:{addToCart({commit:e},t){e("addItem",t),e("updateCount")},removeFromCart({commit:e},t){e("removeItemByIndex",t),e("updateCount")},removeAllFromCart({commit:e,state:t}){t.cart.forEach(t=>e("removeItem",t)),e("updateCount")}},mutations:{addItem:(e,t)=>p(p({},e),{},{cart:[...e.cart,t]}),removeItemByIndex:(e,t)=>p(p({},e),{},{cart:e.cart.filter((e,r)=>r!==t)}),removeItem:(e,t)=>p(p({},e),{},{cart:e.cart.filter(e=>e!==t)}),updateCount:e=>p(p({},e),{},{count:e.cart.length})}}}}customElements.define(y.is,y);class x extends b{constructor(){super(),this.toggleCart=(()=>{this.setState({open:!this.state.open})}),this.count=0,this.items=[],this.state={open:!1}}static get properties(){return{count:Number,items:Object}}onStateChange(e){this.count=e.count,this.items=e.cart}static get is(){return"shop-basket"}handleRemove(e){this.dispatch("removeFromCart",e)}handleRemoveAll(){this.dispatch("removeAllFromCart")}render(){return(0,t.html)(i||(i=m`
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
        `),this.toggleCart,this.count,!this.state.open,this.count,(0,t.html)(o||(o=m`<span>items</span>`)),this.items.map((e,r)=>(0,t.html)(a||(a=m`
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
                            `),e.title,()=>this.handleRemove(r))),this.items.length?(0,t.html)(s||(s=m`<button class="basket__clear" onClick=${0}>remove all</button>`),()=>this.handleRemoveAll()):null)}}customElements.define(x.is,x);class w extends b{constructor(...e){super(...e),this.item={},this.handleClick=(()=>{this.dispatch("addToCart",this.item)})}static get is(){return"shop-item"}static get properties(){return{item:h}}render(){return(0,t.html)(n||(n=m`
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
        `),this.item.title,this.item.price,this.handleClick)}}customElements.define(w.is,w);class v extends r.Element{static get is(){return"store-demo"}render(){return(0,t.html)(l||(l=m`
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
        `),g.map(e=>(0,t.html)(c||(c=m`<shop-item item=${0}></shop-item>`),e)))}}customElements.define(v.is,v);
},{"@tiny-lit/store":"YMTD","@tiny-lit/core":"hLsR","@tiny-lit/element":"Hi6w"}],"UHk1":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/core"),t=require("@tiny-lit/element");let s,i,a=e=>e;const r=t=>(0,e.html)(s||(s=a` <div>${0}</div> `),t);class n extends t.Element{static get is(){return"test-svg"}static get properties(){return{radius:Number}}constructor(){super(),this.maxRadius=50,this.onChange=(({target:e})=>{this.maxRadius=Number(e.value),this.update()}),this.attachShadow({mode:"open"})}connectedCallback(){super.connectedCallback(),this.interval=setInterval(()=>{this.radius=Math.abs(Math.sin(Date.now()/1e3)*this.maxRadius)},20)}disconnectedCallback(){clearInterval(this.interval)}get radius(){console.log("get")}set radius(e){console.log("set",e)}render(){return(0,e.html)(i||(i=a`
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
},{"@tiny-lit/core":"hLsR","@tiny-lit/element":"Hi6w"}],"opqs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=(()=>({path:()=>location.hash?location.hash.substring(1):"/",go(e){location.hash=`#${e}`},listen:e=>(addEventListener("hashchange",e),removeEventListener.bind(window,"hashchange",e))}));
},{}],"y6W5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=(()=>({path:()=>location.pathname,go(e){history.pushState(null,document.title,e),dispatchEvent(new Event("pushstate"))},listen:e=>(addEventListener("popstate",e),addEventListener("pushstate",e),removeEventListener.bind(window,"popstate",e))}));
},{}],"GXWr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./hash");exports.createHashHistory=e.default;var r=require("./path");exports.createPathHistory=r.default;
},{"./hash":"opqs","./path":"y6W5"}],"W65r":[function(require,module,exports) {
"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}function t(t){for(var o=1;o<arguments.length;o++){var s=null!=arguments[o]?arguments[o]:{};o%2?e(Object(s),!0).forEach(function(e){r(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):e(Object(s)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0});const o=require("./history"),s=/\/:([\w]+)(?:{([\w,]+)})?(\?)?/g;function n(e){let t,r=[],o=e;if("*"===e)return{regex:/.*/,params:[]};for(;t=s.exec(e);){const e=t[2]?`${t[2].split(",").join("|")}`:"[^/]+";r.push(t[1]),o=o.replace(t[0],`(?:\\/(${e}))${t[3]?"?":""}`)}return{regex:new RegExp(`^${o}\\/?$`),params:r}}class i{constructor({interceptLocals:e,useHash:t}){this.routes=[],this.handleLocalClick=(e=>{const t=e.target;"A"===t.nodeName&&0===t.href.indexOf(location.origin)&&(e.preventDefault(),this.goTo(t.getAttribute("href")))}),this.resolve=(()=>{const e=this.history.path(),t=this.current;this.routes.some(r=>{let o=e.match(r.regex);const{onEnter:s,onUpdate:n}=r.callbacks;return o&&(o=o.filter(e=>void 0!==e).reduce((e,t,o)=>(o&&(e[r.params[o-1]]=t),e),{}),t!==r?(this.current=r,t&&t.callbacks.onLeave(o),s(o)):n(o)),o})}),this.history=t?o.createHashHistory():o.createPathHistory(),this.history.listen(this.resolve),e&&document.addEventListener("click",this.handleLocalClick)}on(e,r={}){const o=t({path:e,callbacks:r},n(e));return this.routes.push(o),()=>this.routes=this.routes.filter(e=>e!==o)}goTo(e){this.history.go(e)}}exports.Router=i;
},{"./history":"GXWr"}],"GRyi":[function(require,module,exports) {
"use strict";var e,t;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.onRouteUpdate="onRouteUpdate",e.onRouteEnter="onRouteEnter",e.onRouteLeave="onRouteLeave"}(e=exports.RouteComponentCallbacks||(exports.RouteComponentCallbacks={})),function(e){e.Request="router::request",e.Change="router::change"}(t=exports.RouterEvents||(exports.RouterEvents={}));
},{}],"XrdH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./types");function t(t){const r=new CustomEvent(e.RouterEvents.Request,{detail:{}});return t.dispatchEvent(r),r.detail.router}exports.requestRouter=t;
},{"./types":"GRyi"}],"zDCe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./events"),t=new Set,n=e=>new Promise(n=>{if(!e||t.has(e))return n();{const o=document.createElement("script");o.onload=n,o.src=e,document.head.appendChild(o),t.add(e)}}),o=(e,t)=>n(e.getAttribute("module")).then(()=>customElements.whenDefined(t.localName));class s extends HTMLElement{connectedCallback(){const t=this.getAttribute("path"),n=this.getAttribute("component");if(t&&n&&(this.router=e.requestRouter(this))){const e=document.createElement(n);this.dispose=this.router.on(t,{onEnter:t=>{o(this,e).then(()=>this.appendChild(e)).then(()=>e.onRouteEnter&&e.onRouteEnter(t))},onUpdate:t=>{o(this,e).then(()=>e.onRouteUpdate&&e.onRouteUpdate(t))},onLeave:()=>{o(this,e).then(()=>e.onRouteLeave&&e.onRouteLeave()).then(()=>this.removeChild(e))}})}}disconnectedCallback(){this.dispose&&this.dispose()}}exports.RouteElement=s;
},{"./events":"XrdH"}],"tGJd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./router"),t=require("./types");class r extends HTMLElement{constructor(){super(...arguments),this.onRouterRequest=(e=>{e.detail.router=this.router})}connectedCallback(){document.body.addEventListener(t.RouterEvents.Request,this.onRouterRequest,!0),this.router||(this.router=new e.Router({interceptLocals:this.hasAttribute("intercept-locals"),useHash:this.hasAttribute("use-hash")})),Promise.resolve().then(this.router.resolve)}disconnectedCallback(){document.body.removeEventListener(t.RouterEvents.Request,this.onRouterRequest,!0)}}exports.RouterProvider=r;
},{"./router":"W65r","./types":"GRyi"}],"hvgM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./router");exports.Router=e.Router;var r=require("./RouteElement");exports.RouteElement=r.RouteElement;var t=require("./RouterProvider");exports.RouterProvider=t.RouterProvider;
},{"./router":"W65r","./RouteElement":"zDCe","./RouterProvider":"tGJd"}],"H99C":[function(require,module,exports) {
"use strict";require("./todo"),require("./karpinsky"),require("./store"),require("./svg");var e=require("@tiny-lit/router");customElements.define("demo-router",e.RouterProvider),customElements.define("demo-route",e.RouteElement);
},{"./todo":"bLEl","./karpinsky":"yvVT","./store":"HKSt","./svg":"UHk1","@tiny-lit/router":"hvgM"}]},{},["H99C"], null)
//# sourceMappingURL=https://alenaksu.github.io/tiny-lit/demo/src.a4579d95.js.map