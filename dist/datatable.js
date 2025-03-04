!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(self,(()=>(()=>{"use strict";var e={961:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t,i){this.el=e,this.options=t,this.events=i,this.el=e,this.options=t,this.events={}}createCollection(e,t){var i;e.push({id:(null===(i=null==t?void 0:t.el)||void 0===i?void 0:i.id)||e.length+1,element:t})}fireEvent(e,t=null){if(this.events.hasOwnProperty(e))return this.events[e](t)}on(e,t){this.events[e]=t}}},814:function(e,t,i){
/*
 * HSDataTable
 * @version: 3.0.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=i(292),s=n(i(961));class l extends s.default{constructor(e,t,i){var n,a,s,l,o,r,h,c,g,d,u,p,f,v,b,S,m,w,P,L,y,E;super(e,t,i),this.el="string"==typeof e?document.querySelector(e):e;const C=[];Array.from(this.el.querySelectorAll("thead th, thead td")).forEach(((e,t)=>{e.classList.contains("--exclude-from-ordering")&&C.push({targets:t,orderable:!1})}));const T=this.el.getAttribute("data-hs-datatable"),x=T?JSON.parse(T):{};this.concatOptions=Object.assign(Object.assign({searching:!0,lengthChange:!1,order:[],columnDefs:[...C]},x),t),this.table=this.el.querySelector("table"),this.searches=null!==(n=Array.from(this.el.querySelectorAll("[data-hs-datatable-search]")))&&void 0!==n?n:null,this.pageEntitiesList=null!==(a=Array.from(this.el.querySelectorAll("[data-hs-datatable-page-entities]")))&&void 0!==a?a:null,this.pagingList=null!==(s=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging]")))&&void 0!==s?s:null,this.pagingPagesList=null!==(l=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-pages]")))&&void 0!==l?l:null,this.pagingPrevList=null!==(o=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-prev]")))&&void 0!==o?o:null,this.pagingNextList=null!==(r=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-next]")))&&void 0!==r?r:null,this.infoList=null!==(h=Array.from(this.el.querySelectorAll("[data-hs-datatable-info]")))&&void 0!==h?h:null,(null===(c=this.concatOptions)||void 0===c?void 0:c.rowSelectingOptions)&&(this.rowSelectingAll=null!==(f=(null===(d=null===(g=this.concatOptions)||void 0===g?void 0:g.rowSelectingOptions)||void 0===d?void 0:d.selectAllSelector)?document.querySelector(null===(p=null===(u=this.concatOptions)||void 0===u?void 0:u.rowSelectingOptions)||void 0===p?void 0:p.selectAllSelector):document.querySelector("[data-hs-datatable-row-selecting-all]"))&&void 0!==f?f:null),(null===(v=this.concatOptions)||void 0===v?void 0:v.rowSelectingOptions)&&(this.rowSelectingIndividual=null!==(w=null!==(m=null===(S=null===(b=this.concatOptions)||void 0===b?void 0:b.rowSelectingOptions)||void 0===S?void 0:S.individualSelector)&&void 0!==m?m:"[data-hs-datatable-row-selecting-individual]")&&void 0!==w?w:null),this.pageEntitiesList.length&&(this.concatOptions.pageLength=parseInt(this.pageEntitiesList[0].value)),this.maxPagesToShow=3,this.isRowSelecting=!!(null===(P=this.concatOptions)||void 0===P?void 0:P.rowSelectingOptions),this.pageBtnClasses=null!==(E=null===(y=null===(L=this.concatOptions)||void 0===L?void 0:L.pagingOptions)||void 0===y?void 0:y.pageBtnClasses)&&void 0!==E?E:null,this.onSearchInputListener=[],this.onPageEntitiesChangeListener=[],this.onSinglePagingClickListener=[],this.onPagingPrevClickListener=[],this.onPagingNextClickListener=[],this.init()}init(){this.createCollection(window.$hsDataTableCollection,this),this.initTable(),this.searches.length&&this.initSearch(),this.pageEntitiesList.length&&this.initPageEntities(),this.pagingList.length&&this.initPaging(),this.pagingPagesList.length&&this.buildPagingPages(),this.pagingPrevList.length&&this.initPagingPrev(),this.pagingNextList.length&&this.initPagingNext(),this.infoList.length&&this.initInfo(),this.isRowSelecting&&this.initRowSelecting()}initTable(){this.dataTable=new DataTable(this.table,this.concatOptions),this.isRowSelecting&&this.triggerChangeEventToRow(),this.dataTable.on("draw",(()=>{this.isRowSelecting&&this.updateSelectAllCheckbox(),this.isRowSelecting&&this.triggerChangeEventToRow(),this.updateInfo(),this.pagingPagesList.forEach((e=>this.updatePaging(e)))}))}searchInput(e){this.onSearchInput(e.target.value)}pageEntitiesChange(e){this.onEntitiesChange(parseInt(e.target.value),e.target)}pagingPrevClick(){this.onPrevClick()}pagingNextClick(){this.onNextClick()}rowSelectingAllChange(){this.onSelectAllChange()}singlePagingClick(e){this.onPageClick(e)}initSearch(){this.searches.forEach((e=>{this.onSearchInputListener.push({el:e,fn:(0,a.debounce)((e=>this.searchInput(e)))}),e.addEventListener("input",this.onSearchInputListener.find((t=>t.el===e)).fn)}))}onSearchInput(e){this.dataTable.search(e).draw()}initPageEntities(){this.pageEntitiesList.forEach((e=>{this.onPageEntitiesChangeListener.push({el:e,fn:e=>this.pageEntitiesChange(e)}),e.addEventListener("change",this.onPageEntitiesChangeListener.find((t=>t.el===e)).fn)}))}onEntitiesChange(e,t){const i=this.pageEntitiesList.filter((e=>e!==t));i.length&&i.forEach((t=>{if(window.HSSelect){const i=window.HSSelect.getInstance(t,!0);i&&i.element.setValue(`${e}`)}else t.value=`${e}`})),this.dataTable.page.len(e).draw()}initInfo(){this.infoList.forEach((e=>{this.initInfoFrom(e),this.initInfoTo(e),this.initInfoLength(e)}))}initInfoFrom(e){var t;const i=null!==(t=e.querySelector("[data-hs-datatable-info-from]"))&&void 0!==t?t:null,{start:n}=this.dataTable.page.info();i&&(i.innerText=`${n+1}`)}initInfoTo(e){var t;const i=null!==(t=e.querySelector("[data-hs-datatable-info-to]"))&&void 0!==t?t:null,{end:n}=this.dataTable.page.info();i&&(i.innerText=`${n}`)}initInfoLength(e){var t;const i=null!==(t=e.querySelector("[data-hs-datatable-info-length]"))&&void 0!==t?t:null,{recordsTotal:n}=this.dataTable.page.info();i&&(i.innerText=`${n}`)}updateInfo(){this.initInfo()}initPaging(){this.pagingList.forEach((e=>this.hidePagingIfSinglePage(e)))}hidePagingIfSinglePage(e){const{pages:t}=this.dataTable.page.info();t<2?(e.classList.add("hidden"),e.style.display="none"):(e.classList.remove("hidden"),e.style.display="")}initPagingPrev(){this.pagingPrevList.forEach((e=>{this.onPagingPrevClickListener.push({el:e,fn:()=>this.pagingPrevClick()}),e.addEventListener("click",this.onPagingPrevClickListener.find((t=>t.el===e)).fn)}))}onPrevClick(){this.dataTable.page("previous").draw("page")}disablePagingArrow(e,t){t?(e.classList.add("disabled"),e.setAttribute("disabled","disabled")):(e.classList.remove("disabled"),e.removeAttribute("disabled"))}initPagingNext(){this.pagingNextList.forEach((e=>{this.onPagingNextClickListener.push({el:e,fn:()=>this.pagingNextClick()}),e.addEventListener("click",this.onPagingNextClickListener.find((t=>t.el===e)).fn)}))}onNextClick(){this.dataTable.page("next").draw("page")}buildPagingPages(){this.pagingPagesList.forEach((e=>this.updatePaging(e)))}updatePaging(e){const{page:t,pages:i,length:n}=this.dataTable.page.info(),s=this.dataTable.rows({search:"applied"}).count(),l=Math.ceil(s/n),o=t+1;let r=Math.max(1,o-Math.floor(this.maxPagesToShow/2)),h=Math.min(l,r+(this.maxPagesToShow-1));h-r+1<this.maxPagesToShow&&(r=Math.max(1,h-this.maxPagesToShow+1)),e.innerHTML="",r>1&&(this.buildPagingPage(1,e),r>2&&e.appendChild((0,a.htmlToElement)('<span class="ellipsis">...</span>')));for(let t=r;t<=h;t++)this.buildPagingPage(t,e);h<l&&(h<l-1&&e.appendChild((0,a.htmlToElement)('<span class="ellipsis">...</span>')),this.buildPagingPage(l,e)),this.pagingPrevList.forEach((e=>this.disablePagingArrow(e,0===t))),this.pagingNextList.forEach((e=>this.disablePagingArrow(e,t===i-1))),this.pagingList.forEach((e=>this.hidePagingIfSinglePage(e)))}buildPagingPage(e,t){const{page:i}=this.dataTable.page.info(),n=(0,a.htmlToElement)('<button type="button"></button>');n.innerText=`${e}`,n.setAttribute("data-page",`${e}`),this.pageBtnClasses&&(0,a.classToClassList)(this.pageBtnClasses,n),i===e-1&&n.classList.add("active"),this.onSinglePagingClickListener.push({el:n,fn:()=>this.singlePagingClick(e)}),n.addEventListener("click",this.onSinglePagingClickListener.find((e=>e.el===n)).fn),t.append(n)}onPageClick(e){this.dataTable.page(e-1).draw("page")}initRowSelecting(){this.onRowSelectingAllChangeListener=()=>this.rowSelectingAllChange(),this.rowSelectingAll.addEventListener("change",this.onRowSelectingAllChangeListener)}triggerChangeEventToRow(){this.table.querySelectorAll(`tbody ${this.rowSelectingIndividual}`).forEach((e=>{e.addEventListener("change",(()=>{this.updateSelectAllCheckbox()}))}))}onSelectAllChange(){let e=this.rowSelectingAll.checked;Array.from(this.dataTable.rows({page:"current",search:"applied"}).nodes()).forEach((t=>{const i=t.querySelector(this.rowSelectingIndividual);i&&(i.checked=e)})),this.updateSelectAllCheckbox()}updateSelectAllCheckbox(){if(!this.dataTable.rows({search:"applied"}).count())return this.rowSelectingAll.checked=!1,!1;let e=!0;Array.from(this.dataTable.rows({page:"current",search:"applied"}).nodes()).forEach((t=>{const i=t.querySelector(this.rowSelectingIndividual);if(i&&!i.checked)return e=!1,!1})),this.rowSelectingAll.checked=e}destroy(){this.searches&&this.onSearchInputListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.pageEntitiesList&&this.onPageEntitiesChangeListener.forEach((({el:e,fn:t})=>e.removeEventListener("change",t))),this.pagingPagesList.length&&(this.onSinglePagingClickListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.pagingPagesList.forEach((e=>e.innerHTML=""))),this.pagingPrevList.length&&this.onPagingPrevClickListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.pagingNextList.length&&this.onPagingNextClickListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.rowSelectingAll&&this.rowSelectingAll.removeEventListener("change",this.onRowSelectingAllChangeListener),this.dataTable.destroy(),this.rowSelectingAll=null,this.rowSelectingIndividual=null,window.$hsDataTableCollection=window.$hsDataTableCollection.filter((({element:e})=>e.el!==this.el))}static getInstance(e,t){const i=window.$hsDataTableCollection.find((t=>t.element.el===("string"==typeof e?document.querySelector(e):e)));return i?t?i:i.element.el:null}static autoInit(){window.$hsDataTableCollection||(window.$hsDataTableCollection=[]),window.$hsDataTableCollection&&(window.$hsDataTableCollection=window.$hsDataTableCollection.filter((({element:e})=>document.contains(e.el)))),document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").forEach((e=>{window.$hsDataTableCollection.find((t=>{var i;return(null===(i=null==t?void 0:t.element)||void 0===i?void 0:i.el)===e}))||new l(e)}))}}window.addEventListener("load",(()=>{document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").length&&("undefined"==typeof jQuery&&console.error("HSDataTable: jQuery is not available, please add it to the page."),"undefined"==typeof DataTable&&console.error("HSDataTable: DataTable is not available, please add it to the page.")),"undefined"!=typeof DataTable&&"undefined"!=typeof jQuery&&l.autoInit()})),"undefined"!=typeof window&&(window.HSDataTable=l),t.default=l},292:function(e,t){
/*
 * @version: 3.0.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
Object.defineProperty(t,"__esModule",{value:!0}),t.menuSearchHistory=t.classToClassList=t.htmlToElement=t.afterTransition=t.dispatch=t.debounce=t.isScrollable=t.isParentOrElementHidden=t.isJson=t.isIpadOS=t.isIOS=t.isDirectChild=t.isFormElement=t.isFocused=t.isEnoughSpace=t.getHighestZIndex=t.getZIndex=t.getClassPropertyAlt=t.getClassProperty=t.stringToBoolean=void 0;t.stringToBoolean=e=>"true"===e;t.getClassProperty=(e,t,i="")=>(window.getComputedStyle(e).getPropertyValue(t)||i).replace(" ","");t.getClassPropertyAlt=(e,t,i="")=>{let n="";return e.classList.forEach((e=>{e.includes(t)&&(n=e)})),n.match(/:(.*)]/)?n.match(/:(.*)]/)[1]:i};const i=e=>window.getComputedStyle(e).getPropertyValue("z-index");t.getZIndex=i;t.getHighestZIndex=e=>{let t=Number.NEGATIVE_INFINITY;return e.forEach((e=>{let n=i(e);"auto"!==n&&(n=parseInt(n,10),n>t&&(t=n))})),t};t.isDirectChild=(e,t)=>{const i=e.children;for(let e=0;e<i.length;e++)if(i[e]===t)return!0;return!1};t.isEnoughSpace=(e,t,i="auto",n=10,a=null)=>{const s=t.getBoundingClientRect(),l=a?a.getBoundingClientRect():null,o=window.innerHeight,r=l?s.top-l.top:s.top,h=(a?l.bottom:o)-s.bottom,c=e.clientHeight+n;return"bottom"===i?h>=c:"top"===i?r>=c:r>=c||h>=c};t.isFocused=e=>document.activeElement===e;t.isFormElement=e=>e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement;t.isIOS=()=>!!/iPad|iPhone|iPod/.test(navigator.platform)||navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform);t.isIpadOS=()=>navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform);t.isJson=e=>{if("string"!=typeof e)return!1;const t=e.trim()[0],i=e.trim().slice(-1);if("{"===t&&"}"===i||"["===t&&"]"===i)try{return JSON.parse(e),!0}catch(e){return!1}return!1};const n=e=>{if(!e)return!1;return"none"===window.getComputedStyle(e).display||n(e.parentElement)};t.isParentOrElementHidden=n;t.isScrollable=e=>{const t=window.getComputedStyle(e),i=t.overflowY,n=t.overflowX,a=("scroll"===i||"auto"===i)&&e.scrollHeight>e.clientHeight,s=("scroll"===n||"auto"===n)&&e.scrollWidth>e.clientWidth;return a||s};t.debounce=(e,t=200)=>{let i;return(...n)=>{clearTimeout(i),i=setTimeout((()=>{e.apply(this,n)}),t)}};t.dispatch=(e,t,i=null)=>{const n=new CustomEvent(e,{detail:{payload:i},bubbles:!0,cancelable:!0,composed:!1});t.dispatchEvent(n)};t.afterTransition=(e,t)=>{const i=()=>{t(),e.removeEventListener("transitionend",i,!0)},n=window.getComputedStyle(e),a=n.getPropertyValue("transition-duration");"none"!==n.getPropertyValue("transition-property")&&parseFloat(a)>0?e.addEventListener("transitionend",i,!0):t()};t.htmlToElement=e=>{const t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild};t.classToClassList=(e,t,i=" ",n="add")=>{e.split(i).forEach((e=>"add"===n?t.classList.add(e):t.classList.remove(e)))};const a={historyIndex:-1,addHistory(e){this.historyIndex=e},existsInHistory(e){return e>this.historyIndex},clearHistory(){this.historyIndex=-1}};t.menuSearchHistory=a}},t={};var i=function i(n){var a=t[n];if(void 0!==a)return a.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,i),s.exports}(814);return i})()));