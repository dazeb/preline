var e={615:(e,t,i)=>{i.d(t,{A:()=>n});class n{constructor(e,t,i){this.el=e,this.options=t,this.events=i,this.el=e,this.options=t,this.events={}}createCollection(e,t){var i;e.push({id:(null===(i=null==t?void 0:t.el)||void 0===i?void 0:i.id)||e.length+1,element:t})}fireEvent(e,t=null){if(this.events.hasOwnProperty(e))return this.events[e](t)}on(e,t){this.events[e]=t}}},926:(e,t,i)=>{i.d(t,{en:()=>l,fc:()=>a,sg:()=>n});const n=(e,t=200)=>{let i;return(...n)=>{clearTimeout(i),i=setTimeout((()=>{e.apply(void 0,n)}),t)}},a=e=>{const t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild},l=(e,t,i=" ",n="add")=>{e.split(i).forEach((e=>"add"===n?t.classList.add(e):t.classList.remove(e)))}}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,i),l.exports}i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};i.d(n,{A:()=>o});var a=i(926),l=i(615);
/*
 * HSDataTable
 * @version: 3.0.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class s extends l.A{constructor(e,t,i){var n,a,l,s,o,r,h,g,c,d,p,u,v,f,b,S,w,L,P,C,E,T;super(e,t,i),this.el="string"==typeof e?document.querySelector(e):e;const m=[];Array.from(this.el.querySelectorAll("thead th, thead td")).forEach(((e,t)=>{e.classList.contains("--exclude-from-ordering")&&m.push({targets:t,orderable:!1})}));const y=this.el.getAttribute("data-hs-datatable"),A=y?JSON.parse(y):{};this.concatOptions=Object.assign(Object.assign({searching:!0,lengthChange:!1,order:[],columnDefs:[...m]},A),t),this.table=this.el.querySelector("table"),this.searches=null!==(n=Array.from(this.el.querySelectorAll("[data-hs-datatable-search]")))&&void 0!==n?n:null,this.pageEntitiesList=null!==(a=Array.from(this.el.querySelectorAll("[data-hs-datatable-page-entities]")))&&void 0!==a?a:null,this.pagingList=null!==(l=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging]")))&&void 0!==l?l:null,this.pagingPagesList=null!==(s=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-pages]")))&&void 0!==s?s:null,this.pagingPrevList=null!==(o=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-prev]")))&&void 0!==o?o:null,this.pagingNextList=null!==(r=Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-next]")))&&void 0!==r?r:null,this.infoList=null!==(h=Array.from(this.el.querySelectorAll("[data-hs-datatable-info]")))&&void 0!==h?h:null,(null===(g=this.concatOptions)||void 0===g?void 0:g.rowSelectingOptions)&&(this.rowSelectingAll=null!==(v=(null===(d=null===(c=this.concatOptions)||void 0===c?void 0:c.rowSelectingOptions)||void 0===d?void 0:d.selectAllSelector)?document.querySelector(null===(u=null===(p=this.concatOptions)||void 0===p?void 0:p.rowSelectingOptions)||void 0===u?void 0:u.selectAllSelector):document.querySelector("[data-hs-datatable-row-selecting-all]"))&&void 0!==v?v:null),(null===(f=this.concatOptions)||void 0===f?void 0:f.rowSelectingOptions)&&(this.rowSelectingIndividual=null!==(L=null!==(w=null===(S=null===(b=this.concatOptions)||void 0===b?void 0:b.rowSelectingOptions)||void 0===S?void 0:S.individualSelector)&&void 0!==w?w:"[data-hs-datatable-row-selecting-individual]")&&void 0!==L?L:null),this.pageEntitiesList.length&&(this.concatOptions.pageLength=parseInt(this.pageEntitiesList[0].value)),this.maxPagesToShow=3,this.isRowSelecting=!!(null===(P=this.concatOptions)||void 0===P?void 0:P.rowSelectingOptions),this.pageBtnClasses=null!==(T=null===(E=null===(C=this.concatOptions)||void 0===C?void 0:C.pagingOptions)||void 0===E?void 0:E.pageBtnClasses)&&void 0!==T?T:null,this.onSearchInputListener=[],this.onPageEntitiesChangeListener=[],this.onSinglePagingClickListener=[],this.onPagingPrevClickListener=[],this.onPagingNextClickListener=[],this.init()}init(){this.createCollection(window.$hsDataTableCollection,this),this.initTable(),this.searches.length&&this.initSearch(),this.pageEntitiesList.length&&this.initPageEntities(),this.pagingList.length&&this.initPaging(),this.pagingPagesList.length&&this.buildPagingPages(),this.pagingPrevList.length&&this.initPagingPrev(),this.pagingNextList.length&&this.initPagingNext(),this.infoList.length&&this.initInfo(),this.isRowSelecting&&this.initRowSelecting()}initTable(){this.dataTable=new DataTable(this.table,this.concatOptions),this.isRowSelecting&&this.triggerChangeEventToRow(),this.dataTable.on("draw",(()=>{this.isRowSelecting&&this.updateSelectAllCheckbox(),this.isRowSelecting&&this.triggerChangeEventToRow(),this.updateInfo(),this.pagingPagesList.forEach((e=>this.updatePaging(e)))}))}searchInput(e){this.onSearchInput(e.target.value)}pageEntitiesChange(e){this.onEntitiesChange(parseInt(e.target.value),e.target)}pagingPrevClick(){this.onPrevClick()}pagingNextClick(){this.onNextClick()}rowSelectingAllChange(){this.onSelectAllChange()}singlePagingClick(e){this.onPageClick(e)}initSearch(){this.searches.forEach((e=>{this.onSearchInputListener.push({el:e,fn:(0,a.sg)((e=>this.searchInput(e)))}),e.addEventListener("input",this.onSearchInputListener.find((t=>t.el===e)).fn)}))}onSearchInput(e){this.dataTable.search(e).draw()}initPageEntities(){this.pageEntitiesList.forEach((e=>{this.onPageEntitiesChangeListener.push({el:e,fn:e=>this.pageEntitiesChange(e)}),e.addEventListener("change",this.onPageEntitiesChangeListener.find((t=>t.el===e)).fn)}))}onEntitiesChange(e,t){const i=this.pageEntitiesList.filter((e=>e!==t));i.length&&i.forEach((t=>{if(window.HSSelect){const i=window.HSSelect.getInstance(t,!0);i&&i.element.setValue(`${e}`)}else t.value=`${e}`})),this.dataTable.page.len(e).draw()}initInfo(){this.infoList.forEach((e=>{this.initInfoFrom(e),this.initInfoTo(e),this.initInfoLength(e)}))}initInfoFrom(e){var t;const i=null!==(t=e.querySelector("[data-hs-datatable-info-from]"))&&void 0!==t?t:null,{start:n}=this.dataTable.page.info();i&&(i.innerText=`${n+1}`)}initInfoTo(e){var t;const i=null!==(t=e.querySelector("[data-hs-datatable-info-to]"))&&void 0!==t?t:null,{end:n}=this.dataTable.page.info();i&&(i.innerText=`${n}`)}initInfoLength(e){var t;const i=null!==(t=e.querySelector("[data-hs-datatable-info-length]"))&&void 0!==t?t:null,{recordsTotal:n}=this.dataTable.page.info();i&&(i.innerText=`${n}`)}updateInfo(){this.initInfo()}initPaging(){this.pagingList.forEach((e=>this.hidePagingIfSinglePage(e)))}hidePagingIfSinglePage(e){const{pages:t}=this.dataTable.page.info();t<2?(e.classList.add("hidden"),e.style.display="none"):(e.classList.remove("hidden"),e.style.display="")}initPagingPrev(){this.pagingPrevList.forEach((e=>{this.onPagingPrevClickListener.push({el:e,fn:()=>this.pagingPrevClick()}),e.addEventListener("click",this.onPagingPrevClickListener.find((t=>t.el===e)).fn)}))}onPrevClick(){this.dataTable.page("previous").draw("page")}disablePagingArrow(e,t){t?(e.classList.add("disabled"),e.setAttribute("disabled","disabled")):(e.classList.remove("disabled"),e.removeAttribute("disabled"))}initPagingNext(){this.pagingNextList.forEach((e=>{this.onPagingNextClickListener.push({el:e,fn:()=>this.pagingNextClick()}),e.addEventListener("click",this.onPagingNextClickListener.find((t=>t.el===e)).fn)}))}onNextClick(){this.dataTable.page("next").draw("page")}buildPagingPages(){this.pagingPagesList.forEach((e=>this.updatePaging(e)))}updatePaging(e){const{page:t,pages:i,length:n}=this.dataTable.page.info(),l=this.dataTable.rows({search:"applied"}).count(),s=Math.ceil(l/n),o=t+1;let r=Math.max(1,o-Math.floor(this.maxPagesToShow/2)),h=Math.min(s,r+(this.maxPagesToShow-1));h-r+1<this.maxPagesToShow&&(r=Math.max(1,h-this.maxPagesToShow+1)),e.innerHTML="",r>1&&(this.buildPagingPage(1,e),r>2&&e.appendChild((0,a.fc)('<span class="ellipsis">...</span>')));for(let t=r;t<=h;t++)this.buildPagingPage(t,e);h<s&&(h<s-1&&e.appendChild((0,a.fc)('<span class="ellipsis">...</span>')),this.buildPagingPage(s,e)),this.pagingPrevList.forEach((e=>this.disablePagingArrow(e,0===t))),this.pagingNextList.forEach((e=>this.disablePagingArrow(e,t===i-1))),this.pagingList.forEach((e=>this.hidePagingIfSinglePage(e)))}buildPagingPage(e,t){const{page:i}=this.dataTable.page.info(),n=(0,a.fc)('<button type="button"></button>');n.innerText=`${e}`,n.setAttribute("data-page",`${e}`),this.pageBtnClasses&&(0,a.en)(this.pageBtnClasses,n),i===e-1&&n.classList.add("active"),this.onSinglePagingClickListener.push({el:n,fn:()=>this.singlePagingClick(e)}),n.addEventListener("click",this.onSinglePagingClickListener.find((e=>e.el===n)).fn),t.append(n)}onPageClick(e){this.dataTable.page(e-1).draw("page")}initRowSelecting(){this.onRowSelectingAllChangeListener=()=>this.rowSelectingAllChange(),this.rowSelectingAll.addEventListener("change",this.onRowSelectingAllChangeListener)}triggerChangeEventToRow(){this.table.querySelectorAll(`tbody ${this.rowSelectingIndividual}`).forEach((e=>{e.addEventListener("change",(()=>{this.updateSelectAllCheckbox()}))}))}onSelectAllChange(){let e=this.rowSelectingAll.checked;Array.from(this.dataTable.rows({page:"current",search:"applied"}).nodes()).forEach((t=>{const i=t.querySelector(this.rowSelectingIndividual);i&&(i.checked=e)})),this.updateSelectAllCheckbox()}updateSelectAllCheckbox(){if(!this.dataTable.rows({search:"applied"}).count())return this.rowSelectingAll.checked=!1,!1;let e=!0;Array.from(this.dataTable.rows({page:"current",search:"applied"}).nodes()).forEach((t=>{const i=t.querySelector(this.rowSelectingIndividual);if(i&&!i.checked)return e=!1,!1})),this.rowSelectingAll.checked=e}destroy(){this.searches&&this.onSearchInputListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.pageEntitiesList&&this.onPageEntitiesChangeListener.forEach((({el:e,fn:t})=>e.removeEventListener("change",t))),this.pagingPagesList.length&&(this.onSinglePagingClickListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.pagingPagesList.forEach((e=>e.innerHTML=""))),this.pagingPrevList.length&&this.onPagingPrevClickListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.pagingNextList.length&&this.onPagingNextClickListener.forEach((({el:e,fn:t})=>e.removeEventListener("click",t))),this.rowSelectingAll&&this.rowSelectingAll.removeEventListener("change",this.onRowSelectingAllChangeListener),this.dataTable.destroy(),this.rowSelectingAll=null,this.rowSelectingIndividual=null,window.$hsDataTableCollection=window.$hsDataTableCollection.filter((({element:e})=>e.el!==this.el))}static getInstance(e,t){const i=window.$hsDataTableCollection.find((t=>t.element.el===("string"==typeof e?document.querySelector(e):e)));return i?t?i:i.element.el:null}static autoInit(){window.$hsDataTableCollection||(window.$hsDataTableCollection=[]),window.$hsDataTableCollection&&(window.$hsDataTableCollection=window.$hsDataTableCollection.filter((({element:e})=>document.contains(e.el)))),document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").forEach((e=>{window.$hsDataTableCollection.find((t=>{var i;return(null===(i=null==t?void 0:t.element)||void 0===i?void 0:i.el)===e}))||new s(e)}))}}window.addEventListener("load",(()=>{document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").length&&("undefined"==typeof jQuery&&console.error("HSDataTable: jQuery is not available, please add it to the page."),"undefined"==typeof DataTable&&console.error("HSDataTable: DataTable is not available, please add it to the page.")),"undefined"!=typeof DataTable&&"undefined"!=typeof jQuery&&s.autoInit()})),"undefined"!=typeof window&&(window.HSDataTable=s);const o=s;var r=n.A;export{r as default};