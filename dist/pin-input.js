!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(self,(()=>(()=>{"use strict";var e={961:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t,n){this.el=e,this.options=t,this.events=n,this.el=e,this.options=t,this.events={}}createCollection(e,t){var n;e.push({id:(null===(n=null==t?void 0:t.el)||void 0===n?void 0:n.id)||e.length+1,element:t})}fireEvent(e,t=null){if(this.events.hasOwnProperty(e))return this.events[e](t)}on(e,t){this.events[e]=t}}},60:function(e,t,n){
/*
 * HSPinInput
 * @version: 3.0.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(292),o=i(n(961));class l extends o.default{elementInput(e,t){this.onInput(e,t)}elementPaste(e){this.onPaste(e)}elementKeydown(e,t){this.onKeydown(e,t)}elementFocusin(e){this.onFocusIn(e)}elementFocusout(e){this.onFocusOut(e)}constructor(e,t){super(e,t);const n=e.getAttribute("data-hs-pin-input"),i=n?JSON.parse(n):{},s=Object.assign(Object.assign({},i),t);this.items=this.el.querySelectorAll("[data-hs-pin-input-item]"),this.currentItem=null,this.currentValue=new Array(this.items.length).fill(""),this.placeholders=[],this.availableCharsRE=new RegExp((null==s?void 0:s.availableCharsRE)||"^[a-zA-Z0-9]+$"),this.onElementInputListener=[],this.onElementPasteListener=[],this.onElementKeydownListener=[],this.onElementFocusinListener=[],this.onElementFocusoutListener=[],this.init()}init(){this.createCollection(window.$hsPinInputCollection,this),this.items.length&&this.build()}build(){this.buildInputItems()}buildInputItems(){this.items.forEach(((e,t)=>{this.placeholders.push(e.getAttribute("placeholder")||""),e.hasAttribute("autofocus")&&this.onFocusIn(t),this.onElementInputListener.push({el:e,fn:e=>this.elementInput(e,t)}),this.onElementPasteListener.push({el:e,fn:e=>this.elementPaste(e)}),this.onElementKeydownListener.push({el:e,fn:e=>this.elementKeydown(e,t)}),this.onElementFocusinListener.push({el:e,fn:()=>this.elementFocusin(t)}),this.onElementFocusoutListener.push({el:e,fn:()=>this.elementFocusout(t)}),e.addEventListener("input",this.onElementInputListener.find((t=>t.el===e)).fn),e.addEventListener("paste",this.onElementPasteListener.find((t=>t.el===e)).fn),e.addEventListener("keydown",this.onElementKeydownListener.find((t=>t.el===e)).fn),e.addEventListener("focusin",this.onElementFocusinListener.find((t=>t.el===e)).fn),e.addEventListener("focusout",this.onElementFocusoutListener.find((t=>t.el===e)).fn)}))}checkIfNumber(e){return e.match(this.availableCharsRE)}autoFillAll(e){Array.from(e).forEach(((e,t)=>{if(!(null==this?void 0:this.items[t]))return!1;this.items[t].value=e,this.items[t].dispatchEvent(new Event("input",{bubbles:!0}))}))}setCurrentValue(){this.currentValue=Array.from(this.items).map((e=>e.value))}toggleCompleted(){this.currentValue.includes("")?this.el.classList.remove("active"):this.el.classList.add("active")}onInput(e,t){const n=e.target.value;if(this.currentItem=e.target,this.currentItem.value="",this.currentItem.value=n[n.length-1],!this.checkIfNumber(this.currentItem.value))return this.currentItem.value=this.currentValue[t]||"",!1;if(this.setCurrentValue(),this.currentItem.value){if(t<this.items.length-1&&this.items[t+1].focus(),!this.currentValue.includes("")){const e={currentValue:this.currentValue};this.fireEvent("completed",e),(0,s.dispatch)("completed.hs.pinInput",this.el,e)}this.toggleCompleted()}else t>0&&this.items[t-1].focus()}onKeydown(e,t){"Backspace"===e.key&&t>0&&(""===this.items[t].value?(this.items[t-1].value="",this.items[t-1].focus()):this.items[t].value=""),this.setCurrentValue(),this.toggleCompleted()}onFocusIn(e){this.items[e].setAttribute("placeholder","")}onFocusOut(e){this.items[e].setAttribute("placeholder",this.placeholders[e])}onPaste(e){e.preventDefault(),this.items.forEach((t=>{document.activeElement===t&&this.autoFillAll(e.clipboardData.getData("text"))}))}destroy(){this.el.classList.remove("active"),this.items.length&&this.items.forEach((e=>{e.removeEventListener("input",this.onElementInputListener.find((t=>t.el===e)).fn),e.removeEventListener("paste",this.onElementPasteListener.find((t=>t.el===e)).fn),e.removeEventListener("keydown",this.onElementKeydownListener.find((t=>t.el===e)).fn),e.removeEventListener("focusin",this.onElementFocusinListener.find((t=>t.el===e)).fn),e.removeEventListener("focusout",this.onElementFocusoutListener.find((t=>t.el===e)).fn)})),this.items=null,this.currentItem=null,this.currentValue=null,window.$hsPinInputCollection=window.$hsPinInputCollection.filter((({element:e})=>e.el!==this.el))}static getInstance(e,t){const n=window.$hsPinInputCollection.find((t=>t.element.el===("string"==typeof e?document.querySelector(e):e)));return n?t?n:n.element:null}static autoInit(){window.$hsPinInputCollection||(window.$hsPinInputCollection=[]),window.$hsPinInputCollection&&(window.$hsPinInputCollection=window.$hsPinInputCollection.filter((({element:e})=>document.contains(e.el)))),document.querySelectorAll("[data-hs-pin-input]:not(.--prevent-on-load-init)").forEach((e=>{window.$hsPinInputCollection.find((t=>{var n;return(null===(n=null==t?void 0:t.element)||void 0===n?void 0:n.el)===e}))||new l(e)}))}}window.addEventListener("load",(()=>{l.autoInit()})),"undefined"!=typeof window&&(window.HSPinInput=l),t.default=l},292:function(e,t){
/*
 * @version: 3.0.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
Object.defineProperty(t,"__esModule",{value:!0}),t.menuSearchHistory=t.classToClassList=t.htmlToElement=t.afterTransition=t.dispatch=t.debounce=t.isScrollable=t.isParentOrElementHidden=t.isJson=t.isIpadOS=t.isIOS=t.isDirectChild=t.isFormElement=t.isFocused=t.isEnoughSpace=t.getHighestZIndex=t.getZIndex=t.getClassPropertyAlt=t.getClassProperty=t.stringToBoolean=void 0;t.stringToBoolean=e=>"true"===e;t.getClassProperty=(e,t,n="")=>(window.getComputedStyle(e).getPropertyValue(t)||n).replace(" ","");t.getClassPropertyAlt=(e,t,n="")=>{let i="";return e.classList.forEach((e=>{e.includes(t)&&(i=e)})),i.match(/:(.*)]/)?i.match(/:(.*)]/)[1]:n};const n=e=>window.getComputedStyle(e).getPropertyValue("z-index");t.getZIndex=n;t.getHighestZIndex=e=>{let t=Number.NEGATIVE_INFINITY;return e.forEach((e=>{let i=n(e);"auto"!==i&&(i=parseInt(i,10),i>t&&(t=i))})),t};t.isDirectChild=(e,t)=>{const n=e.children;for(let e=0;e<n.length;e++)if(n[e]===t)return!0;return!1};t.isEnoughSpace=(e,t,n="auto",i=10,s=null)=>{const o=t.getBoundingClientRect(),l=s?s.getBoundingClientRect():null,r=window.innerHeight,u=l?o.top-l.top:o.top,a=(s?l.bottom:r)-o.bottom,c=e.clientHeight+i;return"bottom"===n?a>=c:"top"===n?u>=c:u>=c||a>=c};t.isFocused=e=>document.activeElement===e;t.isFormElement=e=>e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement;t.isIOS=()=>!!/iPad|iPhone|iPod/.test(navigator.platform)||navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform);t.isIpadOS=()=>navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform);t.isJson=e=>{if("string"!=typeof e)return!1;const t=e.trim()[0],n=e.trim().slice(-1);if("{"===t&&"}"===n||"["===t&&"]"===n)try{return JSON.parse(e),!0}catch(e){return!1}return!1};const i=e=>{if(!e)return!1;return"none"===window.getComputedStyle(e).display||i(e.parentElement)};t.isParentOrElementHidden=i;t.isScrollable=e=>{const t=window.getComputedStyle(e),n=t.overflowY,i=t.overflowX,s=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,o=("scroll"===i||"auto"===i)&&e.scrollWidth>e.clientWidth;return s||o};t.debounce=(e,t=200)=>{let n;return(...i)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,i)}),t)}};t.dispatch=(e,t,n=null)=>{const i=new CustomEvent(e,{detail:{payload:n},bubbles:!0,cancelable:!0,composed:!1});t.dispatchEvent(i)};t.afterTransition=(e,t)=>{const n=()=>{t(),e.removeEventListener("transitionend",n,!0)},i=window.getComputedStyle(e),s=i.getPropertyValue("transition-duration");"none"!==i.getPropertyValue("transition-property")&&parseFloat(s)>0?e.addEventListener("transitionend",n,!0):t()};t.htmlToElement=e=>{const t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild};t.classToClassList=(e,t,n=" ",i="add")=>{e.split(n).forEach((e=>"add"===i?t.classList.add(e):t.classList.remove(e)))};const s={historyIndex:-1,addHistory(e){this.historyIndex=e},existsInHistory(e){return e>this.historyIndex},clearHistory(){this.historyIndex=-1}};t.menuSearchHistory=s}},t={};var n=function n(i){var s=t[i];if(void 0!==s)return s.exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports}(60);return n})()));