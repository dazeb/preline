var t={615:(t,e,s)=>{s.d(e,{A:()=>i});class i{constructor(t,e,s){this.el=t,this.options=e,this.events=s,this.el=t,this.options=e,this.events={}}createCollection(t,e){var s;t.push({id:(null===(s=null==e?void 0:e.el)||void 0===s?void 0:s.id)||t.length+1,element:e})}fireEvent(t,e=null){if(this.events.hasOwnProperty(t))return this.events[t](e)}on(t,e){this.events[t]=e}}},926:(t,e,s)=>{s.d(e,{JD:()=>i});const i=(t,e,s=null)=>{const i=new CustomEvent(t,{detail:{payload:s},bubbles:!0,cancelable:!0,composed:!1});e.dispatchEvent(i)}}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var l=e[i]={exports:{}};return t[i](l,l.exports,s),l.exports}s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var i={};s.d(i,{A:()=>h});var n=s(926),l=s(615);
/*
 * HSStepper
 * @version: 3.0.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class o extends l.A{constructor(t,e){super(t,e);const s=t.getAttribute("data-hs-stepper"),i=s?JSON.parse(s):{},n=Object.assign(Object.assign({},i),e);this.currentIndex=(null==n?void 0:n.currentIndex)||1,this.mode=(null==n?void 0:n.mode)||"linear",this.isCompleted=void 0!==(null==n?void 0:n.isCompleted)&&(null==n?void 0:n.isCompleted),this.totalSteps=1,this.navItems=[],this.contentItems=[],this.onNavItemClickListener=[],this.init()}navItemClick(t){this.handleNavItemClick(t)}backClick(){if(this.handleBackButtonClick(),"linear"===this.mode){const t=this.navItems.find((({index:t})=>t===this.currentIndex)),e=this.contentItems.find((({index:t})=>t===this.currentIndex));if(!t||!e)return;t.isCompleted&&(t.isCompleted=!1,t.isSkip=!1,t.el.classList.remove("success","skipped")),e.isCompleted&&(e.isCompleted=!1,e.isSkip=!1,e.el.classList.remove("success","skipped")),"linear"===this.mode&&this.currentIndex!==this.totalSteps&&(this.nextBtn&&(this.nextBtn.style.display=""),this.completeStepBtn&&(this.completeStepBtn.style.display="")),this.showSkipButton(),this.showFinishButton(),this.showCompleteStepButton()}}nextClick(){var t;if(this.fireEvent("beforeNext",this.currentIndex),(0,n.JD)("beforeNext.hs.stepper",this.el,this.currentIndex),null===(t=this.getNavItem(this.currentIndex))||void 0===t?void 0:t.isProcessed)return this.disableAll(),!1;this.goToNext()}skipClick(){this.handleSkipButtonClick(),"linear"===this.mode&&this.currentIndex===this.totalSteps&&(this.nextBtn&&(this.nextBtn.style.display="none"),this.completeStepBtn&&(this.completeStepBtn.style.display="none"),this.finishBtn&&(this.finishBtn.style.display=""))}completeStepBtnClick(){this.handleCompleteStepButtonClick()}finishBtnClick(){this.handleFinishButtonClick()}resetBtnClick(){this.handleResetButtonClick()}init(){this.createCollection(window.$hsStepperCollection,this),this.buildNav(),this.buildContent(),this.buildButtons(),this.setTotalSteps()}getUncompletedSteps(t=!1){return this.navItems.filter((({isCompleted:e,isSkip:s})=>t?!e||s:!e&&!s))}setTotalSteps(){this.navItems.forEach((t=>{const{index:e}=t;e>this.totalSteps&&(this.totalSteps=e)}))}buildNav(){this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach((t=>this.addNavItem(t))),this.navItems.forEach((t=>this.buildNavItem(t)))}buildNavItem(t){const{index:e,isDisabled:s,el:i}=t;e===this.currentIndex&&this.setCurrentNavItem(),("linear"!==this.mode||s)&&(this.onNavItemClickListener.push({el:i,fn:()=>this.navItemClick(t)}),i.addEventListener("click",this.onNavItemClickListener.find((t=>t.el===i)).fn))}addNavItem(t){const{index:e,isFinal:s=!1,isCompleted:i=!1,isSkip:n=!1,isOptional:l=!1,isDisabled:o=!1,isProcessed:h=!1,hasError:r=!1}=JSON.parse(t.getAttribute("data-hs-stepper-nav-item"));i&&t.classList.add("success"),n&&t.classList.add("skipped"),o&&("BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.setAttribute("disabled","disabled"),t.classList.add("disabled")),r&&t.classList.add("error"),this.navItems.push({index:e,isFinal:s,isCompleted:i,isSkip:n,isOptional:l,isDisabled:o,isProcessed:h,hasError:r,el:t})}setCurrentNavItem(){this.navItems.forEach((t=>{const{index:e,el:s}=t;e===this.currentIndex?this.setCurrentNavItemActions(s):this.unsetCurrentNavItemActions(s)}))}setCurrentNavItemActions(t){t.classList.add("active"),this.fireEvent("active",this.currentIndex),(0,n.JD)("active.hs.stepper",this.el,this.currentIndex)}getNavItem(t=this.currentIndex){return this.navItems.find((({index:e})=>e===t))}setProcessedNavItemActions(t){t.isProcessed=!0,t.el.classList.add("processed")}setErrorNavItemActions(t){t.hasError=!0,t.el.classList.add("error")}unsetCurrentNavItemActions(t){t.classList.remove("active")}handleNavItemClick(t){const{index:e}=t;this.currentIndex=e,this.setCurrentNavItem(),this.setCurrentContentItem(),this.checkForTheFirstStep()}buildContent(){this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach((t=>this.addContentItem(t))),this.navItems.forEach((t=>this.buildContentItem(t)))}buildContentItem(t){const{index:e}=t;e===this.currentIndex&&this.setCurrentContentItem()}addContentItem(t){const{index:e,isFinal:s=!1,isCompleted:i=!1,isSkip:n=!1}=JSON.parse(t.getAttribute("data-hs-stepper-content-item"));i&&t.classList.add("success"),n&&t.classList.add("skipped"),this.contentItems.push({index:e,isFinal:s,isCompleted:i,isSkip:n,el:t})}setCurrentContentItem(){if(this.isCompleted){const t=this.contentItems.find((({isFinal:t})=>t)),e=this.contentItems.filter((({isFinal:t})=>!t));return t.el.style.display="",e.forEach((({el:t})=>t.style.display="none")),!1}this.contentItems.forEach((t=>{const{index:e,el:s}=t;e===this.currentIndex?this.setCurrentContentItemActions(s):this.unsetCurrentContentItemActions(s)}))}hideAllContentItems(){this.contentItems.forEach((({el:t})=>t.style.display="none"))}setCurrentContentItemActions(t){t.style.display=""}unsetCurrentContentItemActions(t){t.style.display="none"}disableAll(){const t=this.getNavItem(this.currentIndex);t.hasError=!1,t.isCompleted=!1,t.isDisabled=!1,t.el.classList.remove("error","success"),this.disableButtons()}disableNavItemActions(t){t.isDisabled=!0,t.el.classList.add("disabled")}enableNavItemActions(t){t.isDisabled=!1,t.el.classList.remove("disabled")}buildButtons(){this.backBtn=this.el.querySelector("[data-hs-stepper-back-btn]"),this.nextBtn=this.el.querySelector("[data-hs-stepper-next-btn]"),this.skipBtn=this.el.querySelector("[data-hs-stepper-skip-btn]"),this.completeStepBtn=this.el.querySelector("[data-hs-stepper-complete-step-btn]"),this.finishBtn=this.el.querySelector("[data-hs-stepper-finish-btn]"),this.resetBtn=this.el.querySelector("[data-hs-stepper-reset-btn]"),this.buildBackButton(),this.buildNextButton(),this.buildSkipButton(),this.buildCompleteStepButton(),this.buildFinishButton(),this.buildResetButton()}buildBackButton(){this.backBtn&&(this.checkForTheFirstStep(),this.onBackClickListener=()=>this.backClick(),this.backBtn.addEventListener("click",this.onBackClickListener))}handleBackButtonClick(){1!==this.currentIndex&&("linear"===this.mode&&this.removeOptionalClasses(),this.currentIndex--,"linear"===this.mode&&this.removeOptionalClasses(),this.setCurrentNavItem(),this.setCurrentContentItem(),this.checkForTheFirstStep(),this.completeStepBtn&&this.changeTextAndDisableCompleteButtonIfStepCompleted(),this.fireEvent("back",this.currentIndex),(0,n.JD)("back.hs.stepper",this.el,this.currentIndex))}checkForTheFirstStep(){1===this.currentIndex?this.setToDisabled(this.backBtn):this.setToNonDisabled(this.backBtn)}setToDisabled(t){"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.setAttribute("disabled","disabled"),t.classList.add("disabled")}setToNonDisabled(t){"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.removeAttribute("disabled"),t.classList.remove("disabled")}buildNextButton(){this.nextBtn&&(this.onNextClickListener=()=>this.nextClick(),this.nextBtn.addEventListener("click",this.onNextClickListener))}unsetProcessedNavItemActions(t){t.isProcessed=!1,t.el.classList.remove("processed")}handleNextButtonClick(t=!0){if(t)this.currentIndex===this.totalSteps?this.currentIndex=1:this.currentIndex++;else{const t=this.getUncompletedSteps();if(1===t.length){const{index:e}=t[0];this.currentIndex=e}else{if(this.currentIndex===this.totalSteps)return;this.currentIndex++}}"linear"===this.mode&&this.removeOptionalClasses(),this.setCurrentNavItem(),this.setCurrentContentItem(),this.checkForTheFirstStep(),this.completeStepBtn&&this.changeTextAndDisableCompleteButtonIfStepCompleted(),this.showSkipButton(),this.showFinishButton(),this.showCompleteStepButton(),this.fireEvent("next",this.currentIndex),(0,n.JD)("next.hs.stepper",this.el,this.currentIndex)}removeOptionalClasses(){const t=this.navItems.find((({index:t})=>t===this.currentIndex)),e=this.contentItems.find((({index:t})=>t===this.currentIndex));t.isSkip=!1,t.hasError=!1,t.isDisabled=!1,e.isSkip=!1,t.el.classList.remove("skipped","success","error"),e.el.classList.remove("skipped","success","error")}buildSkipButton(){this.skipBtn&&(this.showSkipButton(),this.onSkipClickListener=()=>this.skipClick(),this.skipBtn.addEventListener("click",this.onSkipClickListener))}setSkipItem(t){const e=this.navItems.find((({index:e})=>e===(t||this.currentIndex))),s=this.contentItems.find((({index:e})=>e===(t||this.currentIndex)));e&&s&&(this.setSkipItemActions(e),this.setSkipItemActions(s))}setSkipItemActions(t){t.isSkip=!0,t.el.classList.add("skipped")}showSkipButton(){if(!this.skipBtn)return;const{isOptional:t}=this.navItems.find((({index:t})=>t===this.currentIndex));this.skipBtn.style.display=t?"":"none"}handleSkipButtonClick(){this.setSkipItem(),this.handleNextButtonClick(),this.fireEvent("skip",this.currentIndex),(0,n.JD)("skip.hs.stepper",this.el,this.currentIndex)}buildCompleteStepButton(){this.completeStepBtn&&(this.completeStepBtnDefaultText=this.completeStepBtn.innerText,this.onCompleteStepBtnClickListener=()=>this.completeStepBtnClick(),this.completeStepBtn.addEventListener("click",this.onCompleteStepBtnClickListener))}changeTextAndDisableCompleteButtonIfStepCompleted(){const t=this.navItems.find((({index:t})=>t===this.currentIndex)),{completedText:e}=JSON.parse(this.completeStepBtn.getAttribute("data-hs-stepper-complete-step-btn"));t&&(t.isCompleted?(this.completeStepBtn.innerText=e||this.completeStepBtnDefaultText,this.completeStepBtn.setAttribute("disabled","disabled"),this.completeStepBtn.classList.add("disabled")):(this.completeStepBtn.innerText=this.completeStepBtnDefaultText,this.completeStepBtn.removeAttribute("disabled"),this.completeStepBtn.classList.remove("disabled")))}setCompleteItem(t){const e=this.navItems.find((({index:e})=>e===(t||this.currentIndex))),s=this.contentItems.find((({index:e})=>e===(t||this.currentIndex)));e&&s&&(this.setCompleteItemActions(e),this.setCompleteItemActions(s))}setCompleteItemActions(t){t.isCompleted=!0,t.el.classList.add("success")}showCompleteStepButton(){if(!this.completeStepBtn)return;1===this.getUncompletedSteps().length?this.completeStepBtn.style.display="none":this.completeStepBtn.style.display=""}handleCompleteStepButtonClick(){this.setCompleteItem(),this.fireEvent("complete",this.currentIndex),(0,n.JD)("complete.hs.stepper",this.el,this.currentIndex),this.handleNextButtonClick(!1),this.showFinishButton(),this.showCompleteStepButton(),this.checkForTheFirstStep(),this.completeStepBtn&&this.changeTextAndDisableCompleteButtonIfStepCompleted(),this.showSkipButton()}buildFinishButton(){this.finishBtn&&(this.isCompleted&&this.setCompleted(),this.onFinishBtnClickListener=()=>this.finishBtnClick(),this.finishBtn.addEventListener("click",this.onFinishBtnClickListener))}setCompleted(){this.el.classList.add("completed")}unsetCompleted(){this.el.classList.remove("completed")}showFinishButton(){if(!this.finishBtn)return;1===this.getUncompletedSteps().length?this.finishBtn.style.display="":this.finishBtn.style.display="none"}handleFinishButtonClick(){const t=this.getUncompletedSteps(),e=this.getUncompletedSteps(!0),{el:s}=this.contentItems.find((({isFinal:t})=>t));t.length&&t.forEach((({index:t})=>this.setCompleteItem(t))),this.currentIndex=this.totalSteps,this.setCurrentNavItem(),this.hideAllContentItems();const i=this.navItems.find((({index:t})=>t===this.currentIndex));(i?i.el:null).classList.remove("active"),s.style.display="block",this.backBtn&&(this.backBtn.style.display="none"),this.nextBtn&&(this.nextBtn.style.display="none"),this.skipBtn&&(this.skipBtn.style.display="none"),this.completeStepBtn&&(this.completeStepBtn.style.display="none"),this.finishBtn&&(this.finishBtn.style.display="none"),this.resetBtn&&(this.resetBtn.style.display=""),e.length<=1&&(this.isCompleted=!0,this.setCompleted()),this.fireEvent("finish",this.currentIndex),(0,n.JD)("finish.hs.stepper",this.el,this.currentIndex)}buildResetButton(){this.resetBtn&&(this.onResetBtnClickListener=()=>this.resetBtnClick(),this.resetBtn.addEventListener("click",this.onResetBtnClickListener))}handleResetButtonClick(){this.backBtn&&(this.backBtn.style.display=""),this.nextBtn&&(this.nextBtn.style.display=""),this.completeStepBtn&&(this.completeStepBtn.style.display="",this.completeStepBtn.innerText=this.completeStepBtnDefaultText,this.completeStepBtn.removeAttribute("disabled"),this.completeStepBtn.classList.remove("disabled")),this.resetBtn&&(this.resetBtn.style.display="none"),this.navItems.forEach((t=>{const{el:e}=t;t.isSkip=!1,t.isCompleted=!1,this.unsetCurrentNavItemActions(e),e.classList.remove("success","skipped")})),this.contentItems.forEach((t=>{const{el:e}=t;t.isSkip=!1,t.isCompleted=!1,this.unsetCurrentContentItemActions(e),e.classList.remove("success","skipped")})),this.currentIndex=1,this.unsetCompleted(),this.isCompleted=!1,this.showSkipButton(),this.setCurrentNavItem(),this.setCurrentContentItem(),this.showFinishButton(),this.showCompleteStepButton(),this.checkForTheFirstStep(),this.fireEvent("reset",this.currentIndex),(0,n.JD)("reset.hs.stepper",this.el,this.currentIndex)}setProcessedNavItem(t){const e=this.getNavItem(t);e&&this.setProcessedNavItemActions(e)}unsetProcessedNavItem(t){const e=this.getNavItem(t);e&&this.unsetProcessedNavItemActions(e)}goToNext(){"linear"===this.mode&&this.setCompleteItem(),this.handleNextButtonClick("linear"!==this.mode),"linear"===this.mode&&this.currentIndex===this.totalSteps&&(this.nextBtn&&(this.nextBtn.style.display="none"),this.completeStepBtn&&(this.completeStepBtn.style.display="none"))}disableButtons(){this.backBtn&&this.setToDisabled(this.backBtn),this.nextBtn&&this.setToDisabled(this.nextBtn)}enableButtons(){this.backBtn&&this.setToNonDisabled(this.backBtn),this.nextBtn&&this.setToNonDisabled(this.nextBtn)}setErrorNavItem(t){const e=this.getNavItem(t);e&&this.setErrorNavItemActions(e)}destroy(){this.el.classList.remove("completed"),this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach((t=>{t.classList.remove("active","success","skipped","disabled","error"),"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.removeAttribute("disabled")})),this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach((t=>{t.classList.remove("success","skipped")})),this.backBtn&&this.backBtn.classList.remove("disabled"),this.nextBtn&&this.nextBtn.classList.remove("disabled"),this.completeStepBtn&&this.completeStepBtn.classList.remove("disabled"),this.backBtn&&(this.backBtn.style.display=""),this.nextBtn&&(this.nextBtn.style.display=""),this.skipBtn&&(this.skipBtn.style.display=""),this.finishBtn&&(this.finishBtn.style.display="none"),this.resetBtn&&(this.resetBtn.style.display="none"),this.onNavItemClickListener.length&&this.onNavItemClickListener.forEach((({el:t,fn:e})=>{t.removeEventListener("click",e)})),this.backBtn&&this.backBtn.removeEventListener("click",this.onBackClickListener),this.nextBtn&&this.nextBtn.removeEventListener("click",this.onNextClickListener),this.skipBtn&&this.skipBtn.removeEventListener("click",this.onSkipClickListener),this.completeStepBtn&&this.completeStepBtn.removeEventListener("click",this.onCompleteStepBtnClickListener),this.finishBtn&&this.finishBtn.removeEventListener("click",this.onFinishBtnClickListener),this.resetBtn&&this.resetBtn.removeEventListener("click",this.onResetBtnClickListener),window.$hsStepperCollection=window.$hsStepperCollection.filter((({element:t})=>t.el!==this.el))}static getInstance(t,e){const s=window.$hsStepperCollection.find((e=>e.element.el===("string"==typeof t?document.querySelector(t):t)));return s?e?s:s.element:null}static autoInit(){window.$hsStepperCollection||(window.$hsStepperCollection=[]),window.$hsStepperCollection&&(window.$hsStepperCollection=window.$hsStepperCollection.filter((({element:t})=>document.contains(t.el)))),document.querySelectorAll("[data-hs-stepper]:not(.--prevent-on-load-init)").forEach((t=>{window.$hsStepperCollection.find((e=>{var s;return(null===(s=null==e?void 0:e.element)||void 0===s?void 0:s.el)===t}))||new o(t)}))}}window.addEventListener("load",(()=>{o.autoInit()})),"undefined"!=typeof window&&(window.HSStepper=o);const h=o;var r=i.A;export{r as default};