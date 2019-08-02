parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"K4Wa":[function(require,module,exports) {
"use strict";function e(e){return void 0===e&&(e=""),document.createComment(e)}function t(e){return void 0===e&&(e=""),document.createTextNode(e)}function r(e){return!!e&&!!e.nodeType}function n(e,t){var r=[].concat(t),n=r[0],i=r[1];n.parentNode&&(i&&n.nextSibling!==i&&o(n.nextSibling,i),n.parentNode.replaceChild(e,n))}function o(e,t,r){if(void 0===t&&(t=null),void 0===r&&(r=e.parentNode),r)for(;e!==t;){var n=e.nextSibling;r.removeChild(e),e=n}}function i(e,t,r){void 0===r&&(r=t.parentNode);var n=e.range,o=n[0],i=n[1],s=t.nextSibling,p=o;do{var a=p.nextSibling;r.insertBefore(p,s),p=a}while(p!==i);r.insertBefore(i,s)}function s(e){for(var t=0;e=e.previousSibling;)t++;return t}function p(e){for(var t=[];e.parentNode;)t.unshift(s(e)),e=e.parentNode;return t}function a(e,t){for(var r=0,n=t.length;r<n;r++)e=e.childNodes[t[r]];return e}function x(e,t){return u(e)&&u(t)&&e.strings===t.strings}function u(e){return e&&e[exports.TemplateSymbol]}function l(e){return e.match(new RegExp(exports.MARKER_RE,"g"))||[]}function c(e){var t=e.match(exports.MARKER_RE);return Number(t?t[1]:-1)}exports.__esModule=!0,exports.comment=e,exports.text=t,exports.isNode=r,exports.replaceRange=n,exports.removeNodes=o,exports.moveTemplate=i,exports.getNodeIndex=s,exports.getNodePath=p,exports.getNodeByPath=a,exports.TemplateSymbol=Symbol(),exports.isTemplateEqual=x,exports.isTemplate=u,exports.MARKER_RE=/__(\d+)__/,exports.TEXT_ELEMENT=/^(?:style|textarea)$/i,exports.getMarkers=l,exports.markerNumber=c;var d={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function m(e){return d[e.split(":")[0]]}exports.getSVGNamespace=m;
},{}],"ltjX":[function(require,module,exports) {
"use strict";var o;exports.__esModule=!0,function(o){o[o.Low=0]="Low",o[o.Normal=1]="Normal",o[o.High=2]="High"}(o=exports.JobPriority||(exports.JobPriority={}));
},{}],"IJbV":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var n=require("./types"),r=[],e=[],o=!1,t=0,i=!0;function s(n,r){for(var e=0;r-performance.now()>0&&e<n.length;){var o=n[e++];o.task.apply(o,o.args),o.args=void 0,o.pending=!1}n.splice(0,e)}function a(){o=!0,requestAnimationFrame(function(){t++;var n=performance.now()+10*Math.ceil(.02*t);s(r,n),s(e,n),r.length>0&&(e.push.apply(e,r),r.length=0),e.length>0?a():(o=!1,t=0)})}function p(n){i=n}function u(t,i){t.pending=!0,i===n.JobPriority.Normal?r.push(t):i===n.JobPriority.Low&&e.push(t),o||a()}function l(r,e){void 0===e&&(e=n.JobPriority.Normal);var o={task:r,args:[],pending:!1,firstRun:!0};return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];o.firstRun||!i?(o.firstRun=!1,r.apply(void 0,n)):o.pending||(o.args=n,u(o,e))}}exports.setEnabled=p,exports.enqueueJob=u,exports.scheduled=l;
},{"./types":"ltjX"}],"bRxU":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./utils"),t=require("./scheduler"),a=function(){return function(a,r){var n=this;this.update=t.scheduled(function(t){if(n.value!==t){var a=n,r=a.name,i=a.element;"ownerSVGElement"in i?i.setAttributeNS(e.getSVGNamespace(r),r,t):r in i?i[r]=t:void 0!==t?i.setAttribute(r,t):i.hasAttribute(r)&&i.removeAttribute(r),n.value=t}}),this.name=r,this.element=a}}();exports.AttributeExpression=a;var r=function(){function a(a){var r=this;this.update=t.scheduled(function(t){if(t!==r.value){var a=r,n=a.element,i=a.placeholder;"object"!=typeof t&&n.nodeType===Node.TEXT_NODE?n.textContent=t:e.isTemplateEqual(t,n)?n.update(t.values):Array.isArray(t)?(r.value instanceof Map||n.nodeType===Node.COMMENT_NODE||r.replaceWith(i),t=r.updateArray(t)):r.replaceWith(null==t?i:t),r.value=t}}),this.element=this.placeholder=a}return a.prototype.updateArray=function(t){var a=this.value instanceof Map?this.value:new Map,r=this.element,n=t.reduce(function(t,n,i){var u=String(n.key||i),l=a.get(u);if(l)e.isTemplateEqual(l,n)?l.update(n.values):(e.replaceRange(n.create(),l.range),a.set(u,l=n));else{var s=n.create();r.parentNode.insertBefore(s,r.nextSibling),a.set(u,l=n)}return r.nextSibling!==l.range[0]&&e.moveTemplate(l,r),r=l.range[1],t.push(u),t},[]);return a.forEach(function(e,t,a){-1===n.indexOf(t)&&(e.delete(),a.delete(t))}),a},a.prototype.replaceWith=function(t){var a=this.element,r=this.value;r instanceof Map&&(r.forEach(function(e){return e.delete()}),r.clear()),a!==t&&(this.element=t=e.isTemplate(t)?t:e.isNode(t)?t:e.text(t),e.replaceRange(e.isTemplate(t)?t.create():t,e.isTemplate(a)?a.range:a))},a}();exports.NodeExpression=r;
},{"./utils":"K4Wa","./scheduler":"IJbV"}],"6dJP":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./expressions"),t=require("./utils");function r(){return NodeFilter.FILTER_ACCEPT}function n(r,n){for(var o=r.attributes,a=o.length;a--;){var i=o.item(a),s=i.name,u=i.value,d=t.markerNumber(u);-1!==d&&(r.removeAttribute(s),n[d]={type:e.AttributeExpression,name:s,nodePath:t.getNodePath(r)})}}function o(r,n){var o=t.markerNumber(r.data);-1!==o&&(n[o]={type:e.NodeExpression,nodePath:t.getNodePath(r)},r.nodeValue="")}function a(r,n){t.getMarkers(r.data).forEach(function(o){var a=t.text();(r=r.splitText(r.data.indexOf(o))).deleteData(0,o.length),r.parentNode.insertBefore(a,r),n[t.markerNumber(o)]={type:e.NodeExpression,nodePath:t.getNodePath(a)}})}function i(e){for(var i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,r,!1),s=[];i.nextNode();){var u=i.currentNode;u.nodeType===Node.ELEMENT_NODE?(n(u,s),t.TEXT_ELEMENT.test(u.tagName)&&[].forEach.call(u.childNodes,function(e){return a(e,s)})):o(u,s)}return s}function s(e,r){return r.map(function(r){return new r.type(t.getNodeByPath(e,r.nodePath),r.name)})}r.acceptNode=r,exports.linkAttributes=n,exports.linkComment=o,exports.linkTexts=a,exports.linkExpressions=i,exports.resolve=s;
},{"./expressions":"bRxU","./utils":"K4Wa"}],"gHUc":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./linker"),t=require("./utils"),n=new WeakMap;function r(n,r){var s=document.createElement("template");s.innerHTML=r?"<"+r+">"+n+"</"+r+">":n;var a=s.content;if(r){var o=document.createRange();o.selectNodeContents(a.firstChild),a=o.extractContents()}return a.insertBefore(t.comment(),a.firstChild),a.appendChild(t.comment()),{content:a,expressions:e.linkExpressions(a)}}function s(e){var n,r=new RegExp("^[^]*<([0-9a-zA-Z]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");!function(e){e[e.TagName=1]="TagName",e[e.ClosedTag=2]="ClosedTag",e[e.EndTag=3]="EndTag"}(n||(n={}));for(var s,a=!1,o=e[0],i=0,c=e.length;i<c-1;i++){var d="__"+i+"__",l=e[i].match(r);l[n.TagName]&&(s=l[n.TagName],a=!l[n.ClosedTag]),(l[n.ClosedTag]||l[n.EndTag])&&(a=t.TEXT_ELEMENT.test(s)),o+=(a?d:"\x3c!--"+d+"--\x3e")+e[i+1]}return o}function a(t,a){var o=n.get(t);o||n.set(t,o=r(s(t),a));var i=document.importNode(o.content,!0);return{fragment:i,expressions:e.resolve(i,o.expressions)}}exports.parseTemplate=a;
},{"./linker":"6dJP","./utils":"K4Wa"}],"EMxn":[function(require,module,exports) {
"use strict";var t;exports.__esModule=!0;var e=require("./parser"),s=require("./utils"),i=function(){function i(e,s,i){this[t]=!0,this.values=s,this.strings=e,this.context=i}return i.prototype.withKey=function(t){return this.key=t,this},i.prototype.update=function(t){for(var e=0;e<t.length;e++)void 0!==this.expressions[e]&&this.expressions[e].update(t[e])},i.prototype.delete=function(){s.removeNodes.apply(void 0,this.range),this.range=void 0,this.expressions=void 0},i.prototype.create=function(){var t=e.parseTemplate(this.strings,this.context),s=t.fragment,i=t.expressions;return this.expressions=i,this.range=[s.firstChild,s.lastChild],this.update(this.values),s},i}();t=s.TemplateSymbol,exports.Template=i;
},{"./parser":"gHUc","./utils":"K4Wa"}],"hLs+":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./template");exports.Template=e.Template;var t=require("./scheduler");exports.scheduled=t.scheduled;var r=require("./template"),s=require("./utils");function n(e,t){n.instances.has(t)?n.instances.get(t).update(e.values):(n.instances.set(t,e),s.removeNodes(t.firstChild,null,t),t.appendChild(e.create()))}function a(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t)}function l(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t,"svg")}exports.render=n,n.instances=new WeakMap,exports.html=a,exports.svg=l;
},{"./template":"EMxn","./scheduler":"IJbV","./utils":"K4Wa"}],"QYMI":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function o(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();function r(t){if(!t.__attrsMap){var r=t.properties,e=Object.create(null);if(r){var o=function(r){e[r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()]=r,Object.defineProperty(t.prototype,r,{get:function(){return this.__props[r]},set:function(t){var e=this.__props[r];this.__props[r]=t,this.rendered&&e!==t&&this.update()}})};for(var n in r)o(n)}t.__attrsMap=e,t.__observedProps=Object.keys(e)}return t.__observedProps}function e(e){return function(e){function o(){var t=null!==e&&e.apply(this,arguments)||this;return t.__props=Object.create(null),t}return t(o,e),Object.defineProperty(o,"observedAttributes",{get:function(){return r(this)},enumerable:!0,configurable:!0}),o.prototype.attributeChangedCallback=function(t,r,e){var o=this.constructor,n=o.__attrsMap,s=o.properties;this[n[t]]=s[t](e)},o}(e)}exports.__esModule=!0,exports.withProps=e;
},{}],"7Wkj":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var n=require("./types"),r=[],e=[],o=!1,t=0,i=!0;function s(n,r){for(var e=0;r-performance.now()>0&&e<n.length;){var o=n[e++];o.task.apply(o,o.args),o.args=void 0,o.pending=!1}n.splice(0,e)}function a(){o=!0,requestAnimationFrame(function(){t++;var n=performance.now()+10*Math.ceil(.02*t);s(r,n),s(e,n),r.length>0&&(e.push.apply(e,r),r.length=0),e.length>0?a():(o=!1,t=0)})}function p(n){i=n}function u(t,i){t.pending=!0,i===n.JobPriority.Normal?r.push(t):i===n.JobPriority.Low&&e.push(t),o||a()}function l(r,e){void 0===e&&(e=n.JobPriority.Normal);var o={task:r,args:[],pending:!1,firstRun:!0};return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];o.firstRun||!i?(o.firstRun=!1,r.apply(void 0,n)):o.pending||(o.args=n,u(o,e))}}exports.setEnabled=p,exports.enqueueJob=u,exports.scheduled=l;
},{"./types":"ltjX"}],"1c6E":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./utils"),t=require("./scheduler"),a=function(){return function(a,r){var n=this;this.update=t.scheduled(function(t){if(n.value!==t){var a=n,r=a.name,i=a.element;"ownerSVGElement"in i?i.setAttributeNS(e.getSVGNamespace(r),r,t):r in i?i[r]=t:void 0!==t?i.setAttribute(r,t):i.hasAttribute(r)&&i.removeAttribute(r),n.value=t}}),this.name=r,this.element=a}}();exports.AttributeExpression=a;var r=function(){function a(a){var r=this;this.update=t.scheduled(function(t){if(t!==r.value){var a=r,n=a.element,i=a.placeholder;"object"!=typeof t&&n.nodeType===Node.TEXT_NODE?n.textContent=t:e.isTemplateEqual(t,n)?n.update(t.values):Array.isArray(t)?(r.value instanceof Map||n.nodeType===Node.COMMENT_NODE||r.replaceWith(i),t=r.updateArray(t)):r.replaceWith(null==t?i:t),r.value=t}}),this.element=this.placeholder=a}return a.prototype.updateArray=function(t){var a=this.value instanceof Map?this.value:new Map,r=this.element,n=t.reduce(function(t,n,i){var u=String(n.key||i),l=a.get(u);if(l)e.isTemplateEqual(l,n)?l.update(n.values):(e.replaceRange(n.create(),l.range),a.set(u,l=n));else{var s=n.create();r.parentNode.insertBefore(s,r.nextSibling),a.set(u,l=n)}return r.nextSibling!==l.range[0]&&e.moveTemplate(l,r),r=l.range[1],t.push(u),t},[]);return a.forEach(function(e,t,a){-1===n.indexOf(t)&&(e.delete(),a.delete(t))}),a},a.prototype.replaceWith=function(t){var a=this.element,r=this.value;r instanceof Map&&(r.forEach(function(e){return e.delete()}),r.clear()),a!==t&&(this.element=t=e.isTemplate(t)?t:e.isNode(t)?t:e.text(t),e.replaceRange(e.isTemplate(t)?t.create():t,e.isTemplate(a)?a.range:a))},a}();exports.NodeExpression=r;
},{"./utils":"K4Wa","./scheduler":"7Wkj"}],"aDZC":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./expressions"),t=require("./utils");function r(){return NodeFilter.FILTER_ACCEPT}function n(r,n){for(var o=r.attributes,a=o.length;a--;){var i=o.item(a),s=i.name,u=i.value,d=t.markerNumber(u);-1!==d&&(r.removeAttribute(s),n[d]={type:e.AttributeExpression,name:s,nodePath:t.getNodePath(r)})}}function o(r,n){var o=t.markerNumber(r.data);-1!==o&&(n[o]={type:e.NodeExpression,nodePath:t.getNodePath(r)},r.nodeValue="")}function a(r,n){t.getMarkers(r.data).forEach(function(o){var a=t.text();(r=r.splitText(r.data.indexOf(o))).deleteData(0,o.length),r.parentNode.insertBefore(a,r),n[t.markerNumber(o)]={type:e.NodeExpression,nodePath:t.getNodePath(a)}})}function i(e){for(var i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,r,!1),s=[];i.nextNode();){var u=i.currentNode;u.nodeType===Node.ELEMENT_NODE?(n(u,s),t.TEXT_ELEMENT.test(u.tagName)&&[].forEach.call(u.childNodes,function(e){return a(e,s)})):o(u,s)}return s}function s(e,r){return r.map(function(r){return new r.type(t.getNodeByPath(e,r.nodePath),r.name)})}r.acceptNode=r,exports.linkAttributes=n,exports.linkComment=o,exports.linkTexts=a,exports.linkExpressions=i,exports.resolve=s;
},{"./expressions":"1c6E","./utils":"K4Wa"}],"85J7":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./linker"),t=require("./utils"),n=new WeakMap;function r(n,r){var s=document.createElement("template");s.innerHTML=r?"<"+r+">"+n+"</"+r+">":n;var a=s.content;if(r){var o=document.createRange();o.selectNodeContents(a.firstChild),a=o.extractContents()}return a.insertBefore(t.comment(),a.firstChild),a.appendChild(t.comment()),{content:a,expressions:e.linkExpressions(a)}}function s(e){var n,r=new RegExp("^[^]*<([0-9a-zA-Z]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");!function(e){e[e.TagName=1]="TagName",e[e.ClosedTag=2]="ClosedTag",e[e.EndTag=3]="EndTag"}(n||(n={}));for(var s,a=!1,o=e[0],i=0,c=e.length;i<c-1;i++){var d="__"+i+"__",l=e[i].match(r);l[n.TagName]&&(s=l[n.TagName],a=!l[n.ClosedTag]),(l[n.ClosedTag]||l[n.EndTag])&&(a=t.TEXT_ELEMENT.test(s)),o+=(a?d:"\x3c!--"+d+"--\x3e")+e[i+1]}return o}function a(t,a){var o=n.get(t);o||n.set(t,o=r(s(t),a));var i=document.importNode(o.content,!0);return{fragment:i,expressions:e.resolve(i,o.expressions)}}exports.parseTemplate=a;
},{"./linker":"aDZC","./utils":"K4Wa"}],"vKx2":[function(require,module,exports) {
"use strict";var t;exports.__esModule=!0;var e=require("./parser"),s=require("./utils"),i=function(){function i(e,s,i){this[t]=!0,this.values=s,this.strings=e,this.context=i}return i.prototype.withKey=function(t){return this.key=t,this},i.prototype.update=function(t){for(var e=0;e<t.length;e++)void 0!==this.expressions[e]&&this.expressions[e].update(t[e])},i.prototype.delete=function(){s.removeNodes.apply(void 0,this.range),this.range=void 0,this.expressions=void 0},i.prototype.create=function(){var t=e.parseTemplate(this.strings,this.context),s=t.fragment,i=t.expressions;return this.expressions=i,this.range=[s.firstChild,s.lastChild],this.update(this.values),s},i}();t=s.TemplateSymbol,exports.Template=i;
},{"./parser":"85J7","./utils":"K4Wa"}],"KtSa":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./template");exports.Template=e.Template;var t=require("./scheduler");exports.scheduled=t.scheduled;var r=require("./template"),s=require("./utils");function n(e,t){n.instances.has(t)?n.instances.get(t).update(e.values):(n.instances.set(t,e),s.removeNodes(t.firstChild,null,t),t.appendChild(e.create()))}function a(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t)}function l(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];return new r.Template(e,t,"svg")}exports.render=n,n.instances=new WeakMap,exports.html=a,exports.svg=l;
},{"./template":"vKx2","./scheduler":"7Wkj","./utils":"K4Wa"}],"/Clo":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var o in r=arguments[e])Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);return t}).apply(this,arguments)};exports.__esModule=!0;var e=require("@tiny-lit/core");function n(n){return function(n){function o(){var t=null!==n&&n.apply(this,arguments)||this;return t.state={},t.rendered=!1,t.renderCallbacks=[],t.renderRoot=t,t}return t(o,n),o.prototype.attachShadow=function(t){return this.renderRoot=n.prototype.attachShadow.call(this,t)},o.prototype.connectedCallback=function(){this.update()},o.prototype.setState=function(t,e){var n=this.state;this.state=r({},n,"function"==typeof t?t(n,this):t),e&&this.renderCallbacks.push(e),this.update()},o.prototype.render=function(){return null},o.prototype.update=function(){this.rendered=!0;var t=this.render();for(t&&e.render(t,this.renderRoot);this.renderCallbacks.length;)this.renderCallbacks.shift()()},o}(n)}exports.withElement=n;
},{"@tiny-lit/core":"KtSa"}],"5uFX":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./withProps"),t=require("./withElement");exports.Element=e.withProps(t.withElement(HTMLElement));
},{"./withProps":"QYMI","./withElement":"/Clo"}],"8Hi6":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./Element");exports.Element=e.Element;var t=require("./withProps");exports.withProps=t.withProps;var r=require("./withElement");exports.withElement=r.withElement;
},{"./Element":"5uFX","./withProps":"QYMI","./withElement":"/Clo"}],"yuEz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=require("@tiny-lit/core"),t=o.html`
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
`;exports.default=t;
},{"@tiny-lit/core":"hLs+"}],"bLEl":[function(require,module,exports) {
"use strict";var t=require("@tiny-lit/core"),e=require("@tiny-lit/element"),o=s(require("./style.js"));function s(t){return t&&t.__esModule?t:{default:t}}function l(t){return e=>{e.stopPropagation(),e.preventDefault(),t(e)}}function i(t){const e=localStorage.getItem("todoMvc");return e?JSON.parse(e):t}function a(t){window.requestAnimationFrame(()=>localStorage.setItem("todoMvc",JSON.stringify(t)))}function d(t){let e=t.length;for(;e>0;){let o=Math.floor(Math.random()*e),s=t[--e];t[e]=t[o],t[o]=s}return t}class n extends e.Element{constructor(){super(),this.state=i({todos:[],filter:null}),this.attachShadow({mode:"open"})}static get is(){return"todo-mvc"}setState(t){super.setState(t),a(this.state)}setFilter(t){this.setState({filter:t})}handleAddTodo(t){this.setState({todos:[...this.state.todos,{text:t.target.elements[0].value,completed:!1,id:Math.random().toString().substr(2)}]}),t.target.reset()}handleDeleteTodo(t){this.setState({todos:[...this.state.todos.filter(e=>e!==t)]})}switchCompleted(t){return l(()=>{const e=this.state.todos;e[t].completed=!e[t].completed,this.setState({todos:[...e]})})}handleClearCompleted(){this.setState({todos:[...this.state.todos.filter(t=>!t.completed)]})}connectedCallback(){const t=this.rendered;t||console.time("render"),this.update(),t||console.timeEnd("render")}render(){const{filter:e,todos:s}=this.state;return t.html`
            ${o.default}
            <section class="todoapp body">
                <header class="header">
                    <h1>todos</h1>
                    <form onSubmit=${l(t=>this.handleAddTodo(t))}>
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
                        ${s.map((t,e)=>(t.index=e,t)).filter(t=>null===e||t.completed===e).map(e=>t.html`
                            <li class=${e.completed?"completed":""}>
                                <div
                                    class="view"
                                >
                                    <input
                                        class="toggle"
                                        type="checkbox"
                                        checked=${e.completed}
                                        onClick=${this.switchCompleted(e.index)}
                                    />
                                    <label onClick=${this.switchCompleted(e.index)}>${e.text}</label>
                                    <button class="destroy" onClick=${l(()=>this.handleDeleteTodo(e))}></button>
                                </div>
                                <input class="edit" value=${e.text} />
                            </li>
                        `.withKey(e.id))}
                    </ul>
                </section>
                <!-- This footer should hidden by default and shown when there are todos -->
                <footer class="footer">
                    <!-- This should be \`0 items left\` by default -->
                    <span class="todo-count">
                        <strong>${s.filter(t=>!t.completed).length}
                        </strong> item left
                    </span>

                    <ul class="filters">
                        <li>
                            <a
                                class=${null===e&&"selected"}
                                href="#/"
                                onClick=${l(()=>this.setFilter(null))}
                            >
                                All
                            </a>
                        </li>
                        <li>
                            <a
                                class=${!1===e&&"selected"}
                                href="#/active"
                                onClick=${l(()=>this.setFilter(!1))}
                            >
                                Active
                            </a>
                        </li>
                        <li>
                            <a
                                class=${e&&"selected"}
                                href="#/completed"
                                onClick=${l(()=>this.setFilter(!0))}
                            >
                                Completed
                            </a>
                        </li>
                    </ul>
                    <!-- Hidden if no completed items are left ↓ -->
                    <button class="clear-completed" onClick=${l(()=>this.handleClearCompleted())}>Clear completed</button>
                    <button class="clear-completed shuffle" onClick=${l(()=>this.setState({todos:d(this.state.todos)}))}>Shuffle</button>
                </footer>
            </section>
            <footer class="info">
                <p>Double-click to edit a todo</p>
                <!-- Change this out with your name and url ↓ -->
                <p>Created by <a href="http://todomvc.com">you</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        `}}customElements.define(n.is,n);
},{"@tiny-lit/core":"hLs+","@tiny-lit/element":"8Hi6","./style.js":"yuEz"}],"af/L":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/core"),t=require("@tiny-lit/element");class s extends t.Element{static get is(){return"karpinsky-dot"}static get properties(){return{x:Number,y:Number,size:Number,text:String,hover:Boolean}}constructor(){super(),this.x=0,this.y=0,this.size=0,this.text="",this.hover=!1,this.addEventListener("mouseover",()=>this.hover=!0),this.addEventListener("mouseleave",()=>this.hover=!1),this.attachShadow({mode:"closed"})}render(){const{hover:t,text:s,x:r,y:i,size:n}=this,o=1.3*n;return e.html`
            <style>
                span {
                    position: absolute;
                    font: normal 15px sans-serif;
                    text-align: center;
                    cursor: pointer;
                    color: black;
                    width: ${o}px;
                    height: ${o}px;
                    left: ${r}px;
                    top: ${i}px;
                    border-radius: ${o/2}px;
                    line-height: ${o}px;
                    background: ${t?"#ff0":"#61dafb"};
                }
            </style>
            <span>
                ${t?"**"+s+"**":s}
            </span>
        `}}customElements.define(s.is,s);
},{"@tiny-lit/core":"hLs+","@tiny-lit/element":"8Hi6"}],"O2BA":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/core"),r=require("@tiny-lit/element");const t=25;class s extends r.Element{static get is(){return"karpinsky-triangle"}static get properties(){return{x:Number,y:Number,s:Number,seconds:Number}}constructor(){super(),this.x=0,this.y=0,this.s=0,this.seconds=0}renderTemplate(){let{s:r,seconds:s,x:n,y:i}=this;if(r<=t)return e.html`
                <karpinsky-dot x=${n-t/2} y=${i-t/2} size=${t} text=${s} />
            `;r/=2;{let e=performance.now()+.8;for(;performance.now()<e;);}return e.html`
            <karpinsky-triangle x=${n} y=${i-r/2} s=${r} seconds=${s}></karpinsky-triangle>
            <karpinsky-triangle x=${n-r} y=${i+r/2} s=${r} seconds=${s}></karpinsky-triangle>
            <karpinsky-triangle x=${n+r} y=${i+r/2} s=${r} seconds=${s}></karpinsky-triangle>
        `}render(){return e.html`${this.renderTemplate()}`}}customElements.define(s.is,s);
},{"@tiny-lit/core":"hLs+","@tiny-lit/element":"8Hi6"}],"yvVT":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/core"),t=require("@tiny-lit/element");function s(e){let t=!0;return requestAnimationFrame(function s(){return e(),t&&requestAnimationFrame(s)}),()=>t=!1}require("./Dot"),require("./Triangle");class n extends t.Element{static get is(){return"karpinsky-demo"}constructor(){super()}static get properties(){return{elapsed:Number}}connectedCallback(){const e=this.rendered;e||console.time("render"),this.start=Date.now(),this.timerInterval=setInterval(this.tick.bind(this),1e3),this.renderInterval=s(()=>{this.elapsed=Date.now()-this.start}),this.setState({seconds:0}),e||console.timeEnd("render")}disconnectedCallback(){this.renderInterval(),clearInterval(this.timerInterval)}tick(){this.setState({seconds:this.state.seconds%10+1})}getStyle(){const e=this.elapsed/1e3%10;return`\n            position: absolute;\n            transform-origin: 0 0;\n            width: 10px;\n            height: 10px;\n            left: 50%;\n            top: 50%;\n            transform: scaleX(${(1+(e>5?10-e:e)/10)/2.1}) scaleY(0.7) translateZ(0.1px) translateX(50%)\n        `}render(){const{seconds:t}=this.state;return e.html`
            <style>
                :host {
                    color: black;
                }
            </style>
            <div style=${this.getStyle()}>
                <karpinsky-triangle x=${0} y=${0} s=${1e3} seconds=${t} />
            </div>
        `}}customElements.define(n.is,n);
},{"@tiny-lit/core":"hLs+","@tiny-lit/element":"8Hi6","./Dot":"af/L","./Triangle":"O2BA"}],"KtSM":[function(require,module,exports) {
"use strict";var e;exports.__esModule=!0,function(e){e.Request="store::request",e.Dispatch="store::dispatch",e.Update="store::update"}(e=exports.StoreEvents||(exports.StoreEvents={}));
},{}],"Vm33":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("./types");function e(t){return function(e,n){return"string"==typeof e&&(e={type:e,data:n}),t(e)}}function n(e){var n=new CustomEvent(t.StoreEvents.Request,{detail:{}});return e.dispatchEvent(n),n.detail.store}function r(e,n){return new CustomEvent(t.StoreEvents.Update,{detail:{state:e,mutation:n}})}function s(e,n){return new CustomEvent(t.StoreEvents.Dispatch,{detail:{type:e,data:n}})}exports.normalizeEvent=e,exports.requestStore=n,exports.createUpdateEvent=r,exports.createDispatchEvent=s;
},{"./types":"KtSM"}],"Sb7l":[function(require,module,exports) {
"use strict";var t,e=this&&this.__assign||function(){return(e=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};exports.__esModule=!0;var n=require("./events"),i=Symbol(),r=function(t,e){for(var n in t)e.set(n,t[n])},s=function(){function s(s){void 0===s&&(s={});var o=this;this[t]={},this.mutations=new Map,this.actions=new Map,this.listeners=new Set,this.dispatch=n.normalizeEvent(function(t){var e=o.actions;e.has(t.type)&&e.get(t.type)(o,t.data)}),this.commit=n.normalizeEvent(function(t){var e=o.mutations;e.has(t.type)&&(o[i]=e.get(t.type)(o.state,t.data)),o.listeners.forEach(function(e){return e(t)})}),r(s.mutations,this.mutations),r(s.actions,this.actions),this[i]=e({},s.initialState),s.plugins&&s.plugins.forEach(function(t){return t(o)})}return Object.defineProperty(s.prototype,"state",{get:function(){return this[i]},enumerable:!0,configurable:!0}),s.prototype.subscribe=function(t){var e=this,n=this.listeners,i=function(n){return t(e.state,n)};return n.add(i),t(this.state),function(){return n.delete(i)}},s}();t=i,exports.Store=s,exports.createStore=function(t){return new s(t)};
},{"./events":"Vm33"}],"sUqh":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();exports.__esModule=!0;var e=require("./types"),n=require("./events");function o(o){return function(o){function r(){return null!==o&&o.apply(this,arguments)||this}return t(r,o),r.prototype.connectedCallback=function(){var t,r=this;if(o.prototype.connectedCallback&&o.prototype.connectedCallback.call(this),t=n.requestStore(this)){var i=function(t){return r.onStateChange(t.detail.state,t.detail.mutation)};t.addEventListener(e.StoreEvents.Update,i,!0),this.unsubscribe=t.removeEventListener.bind(this,e.StoreEvents.Update,i,!0),this.onStateChange(t.getStore().state)}},r.prototype.disconnectedCallback=function(){o.prototype.disconnectedCallback&&o.prototype.disconnectedCallback.call(this),this.unsubscribe()},r.prototype.onStoreConnect=function(){},r.prototype.onStateChange=function(t,e){},r.prototype.dispatch=function(t,e){this.dispatchEvent(n.createDispatchEvent(t,e))},r}(o)}exports.withStore=o;
},{"./types":"KtSM","./events":"Vm33"}],"OOLT":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();exports.__esModule=!0;var e=require("./types"),r=require("./events"),o=require("./store"),n=function(n){function i(){var t=n.call(this)||this;return t.store=void 0,t.listeners=new WeakMap,t.onStateChange=function(e,o){return t.dispatchEvent(r.createUpdateEvent(e,o))},t.onStoreRequest=function(e){e.stopPropagation(),e.detail.store=t},t.onStoreDispatch=function(e){t.getStore().dispatch(e.detail)},t.addEventListener(e.StoreEvents.Request,t.onStoreRequest,!0),t.addEventListener(e.StoreEvents.Dispatch,t.onStoreDispatch,!0),t.store=o.createStore(t.config),t.store.subscribe(t.onStateChange),t}return t(i,n),Object.defineProperty(i.prototype,"config",{get:function(){return{}},enumerable:!0,configurable:!0}),i.prototype.getStore=function(){return this.store},i}(HTMLElement);exports.StoreProvider=n;
},{"./types":"KtSM","./events":"Vm33","./store":"Sb7l"}],"YMTD":[function(require,module,exports) {
"use strict";function r(r){for(var e in r)exports.hasOwnProperty(e)||(exports[e]=r[e])}exports.__esModule=!0,r(require("./store")),r(require("./withStore")),r(require("./StoreProvider")),r(require("./types"));
},{"./store":"Sb7l","./withStore":"sUqh","./StoreProvider":"OOLT","./types":"KtSM"}],"47HK":[function(require,module,exports) {
"use strict";var e=require("@tiny-lit/store"),t=require("@tiny-lit/core"),r=require("@tiny-lit/element");function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(r,!0).forEach(function(t){a(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=e=>{if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e},n=[{name:"Men+s+Tech+Shell+Full-Zip",title:"Men's Tech Shell Full-Zip",category:"mens_outerwear",price:50.2},{name:"Anvil+L+S+Crew+Neck+-+Grey",title:"Anvil L/S Crew Neck - Grey",category:"mens_outerwear",price:22.15},{name:"Green+Flex+Fleece+Zip+Hoodie",title:"Green Flex Fleece Zip Hoodie",category:"mens_outerwear",price:45.65},{name:"Android+Nylon+Packable+Jacket",title:"Android Nylon Packable Jacket",category:"mens_outerwear",price:33.6},{name:"YouTube+Ultimate+Hooded+Sweatshirt",title:"YouTube Ultimate Hooded Sweatshirt",category:"mens_outerwear",price:32.35},{name:"Grey+Heather+Fleece+Zip+Hoodie",title:"Grey Heather Fleece Zip Hoodie",category:"mens_outerwear",price:38.85},{name:"Vastrm+Hoodie",title:"Vastrm Hoodie",category:"mens_outerwear",price:200},{name:"Recycled+Plastic+Bottle+Hoodie+-+Green",title:"Recycled Plastic Bottle Hoodie - Green",category:"mens_outerwear",price:60.95},{name:"Rowan+Pullover+Hood",title:"Rowan Pullover Hood",category:"mens_outerwear",price:60.85},{name:"Men+s+Voyage+Fleece+Jacket",title:"Men's Voyage Fleece Jacket",category:"mens_outerwear",price:48},{name:"Eco-Jersey+Chrome+Zip+Up+Hoodie",title:"Eco-Jersey Chrome Zip Up Hoodie",category:"mens_outerwear",price:37.75},{name:"Android+Colorblock+Hooded+Pullover",title:"Android Colorblock Hooded Pullover",category:"mens_outerwear",price:50.2},{name:"Tri-blend+Full-Zip+Hoodie",title:"Tri-blend Full-Zip Hoodie",category:"mens_outerwear",price:52.2},{name:"Fleece+Full-Zip+Hoodie",title:"Fleece Full-Zip Hoodie",category:"mens_outerwear",price:45.65},{name:"Jacquard-Knit+Full-Zip+Fleece",title:"Jacquard-Knit Full-Zip Fleece",category:"mens_outerwear",price:74.9},{name:"YouTube+Unisex+Flex+Fleece+Zip+Hoodie",title:"YouTube Unisex Flex Fleece Zip Hoodie",category:"mens_outerwear",price:45.25}],l=(0,e.withStore)(r.Element);class c extends e.StoreProvider{static get is(){return"my-store"}get config(){return{initialState:o({},JSON.parse(this.getAttribute("initial-state")),{cart:[],count:0}),plugins:[e=>e.subscribe(console.log)],actions:{addToCart({commit:e},t){e("addItem",t),e("updateCount")},removeFromCart({commit:e},t){e("removeItemByIndex",t),e("updateCount")},removeAllFromCart({commit:e,state:t}){t.cart.forEach(t=>e("removeItem",t)),e("updateCount")}},mutations:{addItem:(e,t)=>o({},e,{cart:[...e.cart,t]}),removeItemByIndex:(e,t)=>o({},e,{cart:e.cart.filter((e,r)=>r!==t)}),removeItem:(e,t)=>o({},e,{cart:e.cart.filter(e=>e!==t)}),updateCount:e=>o({},e,{count:e.cart.length})}}}}customElements.define(c.is,c);class m extends l{constructor(){super(),this.toggleCart=(()=>{this.setState({open:!this.state.open})}),this.count=0,this.items=[],this.state={open:!1}}static get properties(){return{count:Number,items:Object}}onStateChange(e){this.count=e.count,this.items=e.cart}static get is(){return"shop-basket"}handleRemove(e){this.dispatch("removeFromCart",e)}handleRemoveAll(){this.dispatch("removeAllFromCart")}render(){return t.html`
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
                <button class="basket__toggle" onClick=${this.toggleCart}>
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
                    <span class="basket__badge">${this.count}</span>
                </button>
                <div class="basket__dropdown" hidden=${!this.state.open}>
                    <span>Total: ${this.count}${t.html`<span>items</span>`}</span>


                    <table class="basket__list">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.items.map((e,r)=>t.html`
                                <tr>
                                    <td>${e.title}</td>
                                    <td>1</td>
                                    <td>
                                        <button
                                            class="basket__listItemButton"
                                            onCLick=${()=>this.handleRemove(r)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            `)}
                        </tbody>
                    </table>

                    ${this.items.length?t.html`<button class="basket__clear" onClick=${()=>this.handleRemoveAll()}>remove all</button>`:null}
                </div>
            </div>
        `}}customElements.define(m.is,m);class d extends l{constructor(...e){super(...e),this.item={},this.handleClick=(()=>{this.dispatch("addToCart",this.item)})}static get is(){return"shop-item"}static get properties(){return{item:s}}render(){return t.html`
            <div class="detail" has-content="">
                <img
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw"
                    width="300"
                    height="300"
                    class="image"
                />
                <h1>${this.item.title}</h1>
                <div class="price">${this.item.price}$</div>
                <button
                    onClick=${this.handleClick}
                    class="button"
                    aria-label="Add this item to cart"
                >
                    Add to Cart
                </button>
            </div>
        `}}customElements.define(d.is,d);class p extends r.Element{static get is(){return"store-demo"}render(){return t.html`
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
                ${n.map(e=>t.html`<shop-item item=${e}></shop-item>`)}
            </my-store>
        `}}customElements.define(p.is,p);
},{"@tiny-lit/store":"YMTD","@tiny-lit/core":"hLs+","@tiny-lit/element":"8Hi6"}],"U+hk":[function(require,module,exports) {
"use strict";var t=require("@tiny-lit/core"),e=require("@tiny-lit/element");const s=e=>t.html`
    <div>${e}</div>
`;class i extends e.Element{static get is(){return"test-svg"}constructor(){super(),this.maxRadius=50,this.state={radius:0},this.onChange=(({target:t})=>{this.maxRadius=Number(t.value),this.update()}),this.attachShadow({mode:"open"})}connectedCallback(){super.connectedCallback(),this.interval=setInterval(()=>this.setState({radius:Math.abs(Math.sin(Date.now()/1e3)*this.maxRadius)}),20)}disconnectedCallback(){clearInterval(this.interval)}render(){return t.html`
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
                    onChange=${this.onChange}
                    value=${this.radius}
                />
            </div>
            <svg height=${2*this.maxRadius} width=${2*this.maxRadius}>
                <circle
                    cx=${this.maxRadius}
                    cy=${this.maxRadius}
                    r="${this.state.radius}"
                    stroke="black"
                    stroke-width="3"
                    fill="red"
                />
                Sorry, your browser does not support inline SVG.
            </svg>
        `}}customElements.define(i.is,i);
},{"@tiny-lit/core":"hLs+","@tiny-lit/element":"8Hi6"}],"opqs":[function(require,module,exports) {
"use strict";exports.__esModule=!0,exports.default=function(){return{path:function(){return location.hash?location.hash.substring(1):"/"},go:function(n){location.hash="#"+n},listen:function(n){return addEventListener("hashchange",n),removeEventListener.bind(window,"hashchange",n)}}};
},{}],"y6W5":[function(require,module,exports) {
"use strict";exports.__esModule=!0,exports.default=function(){return{path:function(){return location.pathname},go:function(t){history.pushState(null,document.title,t),dispatchEvent(new Event("pushstate"))},listen:function(t){return addEventListener("popstate",t),addEventListener("pushstate",t),removeEventListener.bind(window,"popstate",t)}}};
},{}],"36GX":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./hash");exports.createHashHistory=e.default;var r=require("./path");exports.createPathHistory=r.default;
},{"./hash":"opqs","./path":"y6W5"}],"0W65":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var o in r=arguments[e])Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);return t}).apply(this,arguments)};exports.__esModule=!0;var r=require("./history"),e=/\/:([\w]+)(?:{([\w,]+)})?(\?)?/g;function n(t){var r,n=[],o=t;if("*"===t)return{regex:/.*/,params:[]};for(;r=e.exec(t);){var i=r[2]?""+r[2].split(",").join("|"):"[^/]+";n.push(r[1]),o=o.replace(r[0],"(?:\\/("+i+"))"+(r[3]?"?":""))}return{regex:new RegExp("^"+o+"\\/?$"),params:n}}var o=function(){function e(t){var e=t.interceptLocals,n=t.useHash,o=this;this.routes=[],this.handleLocalClick=function(t){var r=t.target;"A"===r.nodeName&&0===r.href.indexOf(location.origin)&&(t.preventDefault(),o.goTo(r.getAttribute("href")))},this.resolve=function(){var t=o.history.path(),r=o.current;o.routes.some(function(e){var n=t.match(e.regex),i=e.callbacks,s=i.onEnter,a=i.onUpdate;return n&&(n=n.filter(function(t){return void 0!==t}).reduce(function(t,r,n){return n&&(t[e.params[n-1]]=r),t},{}),r!==e?(o.current=e,r&&r.callbacks.onLeave(n),s(n)):a(n)),n})},this.history=n?r.createHashHistory():r.createPathHistory(),this.history.listen(this.resolve),e&&document.addEventListener("click",this.handleLocalClick)}return e.prototype.on=function(r,e){var o=this;void 0===e&&(e={});var i=t({path:r,callbacks:e},n(r));return this.routes.push(i),function(){return o.routes=o.routes.filter(function(t){return t!==i})}},e.prototype.goTo=function(t){this.history.go(t)},e}();exports.Router=o;
},{"./history":"36GX"}],"GRyi":[function(require,module,exports) {
"use strict";var e,t;exports.__esModule=!0,function(e){e.onRouteUpdate="onRouteUpdate",e.onRouteEnter="onRouteEnter",e.onRouteLeave="onRouteLeave"}(e=exports.RouteComponentCallbacks||(exports.RouteComponentCallbacks={})),function(e){e.Request="router::request",e.Change="router::change"}(t=exports.RouterEvents||(exports.RouterEvents={}));
},{}],"XrdH":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./types");function t(t){var r=new CustomEvent(e.RouterEvents.Request,{detail:{}});return t.dispatchEvent(r),r.detail.router}exports.requestRouter=t;
},{"./types":"GRyi"}],"zDCe":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();exports.__esModule=!0;var e=require("./events"),n=new Set,o=function(t){return new Promise(function(e){if(!t||n.has(t))return e();var o=document.createElement("script");o.onload=e,o.src=t,document.head.appendChild(o),n.add(t)})},r=function(t,e){return o(t.getAttribute("module")).then(function(){return customElements.whenDefined(e.localName)})},u=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.connectedCallback=function(){var t=this,n=this.getAttribute("path"),o=this.getAttribute("component");if(n&&o&&(this.router=e.requestRouter(this))){var u=document.createElement(o);this.dispose=this.router.on(n,{onEnter:function(e){r(t,u).then(function(){return t.appendChild(u)}).then(function(){return u.onRouteEnter&&u.onRouteEnter(e)})},onUpdate:function(e){r(t,u).then(function(){return u.onRouteUpdate&&u.onRouteUpdate(e)})},onLeave:function(){r(t,u).then(function(){return u.onRouteLeave&&u.onRouteLeave()}).then(function(){return t.removeChild(u)})}})}},o.prototype.disconnectedCallback=function(){this.dispose&&this.dispose()},o}(HTMLElement);exports.RouteElement=u;
},{"./events":"XrdH"}],"tGJd":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();exports.__esModule=!0;var e=require("./router"),r=require("./types"),o=function(o){function n(){var t=null!==o&&o.apply(this,arguments)||this;return t.onRouterRequest=function(e){e.detail.router=t.router},t}return t(n,o),n.prototype.connectedCallback=function(){document.body.addEventListener(r.RouterEvents.Request,this.onRouterRequest,!0),this.router||(this.router=new e.Router({interceptLocals:this.hasAttribute("intercept-locals"),useHash:this.hasAttribute("use-hash")})),Promise.resolve().then(this.router.resolve)},n.prototype.disconnectedCallback=function(){document.body.removeEventListener(r.RouterEvents.Request,this.onRouterRequest,!0)},n}(HTMLElement);exports.RouterProvider=o;
},{"./router":"0W65","./types":"GRyi"}],"hvgM":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./router");exports.Router=e.Router;var r=require("./RouteElement");exports.RouteElement=r.RouteElement;var t=require("./RouterProvider");exports.RouterProvider=t.RouterProvider;
},{"./router":"0W65","./RouteElement":"zDCe","./RouterProvider":"tGJd"}],"H99C":[function(require,module,exports) {
"use strict";require("./todo"),require("./karpinsky"),require("./store"),require("./svg");var e=require("@tiny-lit/router");customElements.define("demo-router",e.RouterProvider),customElements.define("demo-route",e.RouteElement);
},{"./todo":"bLEl","./karpinsky":"yvVT","./store":"47HK","./svg":"U+hk","@tiny-lit/router":"hvgM"}]},{},["H99C"], null)
//# sourceMappingURL=https://alenaksu.github.io/tiny-lit/demo/src.45406db7.js.map