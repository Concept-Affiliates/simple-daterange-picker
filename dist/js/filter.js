(()=>{var t,e={622:(t,e,r)=>{"use strict";const n=Vue;var o={class:"relative"},a=(0,n.createElementVNode)("input",{type:"text",class:"hidden"},null,-1),i=["id","dusk","value","placeholder"],u={key:0,class:"absolute top-0 right-0 mt-1 mr-1"},l=[(0,n.createElementVNode)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[(0,n.createElementVNode)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18 18 6M6 6l12 12"})],-1)];var c=r(221),s=r.n(c);const f={emits:["change"],props:{resourceName:{type:String,required:!0},filterKey:{type:String,required:!0},lens:String},data:function(){return{id:null,value:null,startDate:null,endDate:null,currentStartDate:null,currentEndDate:null,debouncedHandleChange:null}},created:function(){var t=this;this.parseDates(),this.debouncedHandleChange=s()((function(){return t.handleChange()}),500),this.setCurrentFilterValue()},mounted:function(){var t=this;this.id="dateRangeCalendar_"+this.generateId(),Nova.$on("filter-reset",this.setCurrentFilterValue),setTimeout((function(){t.initDateRange()}),1)},beforeUnmount:function(){Nova.$off("filter-reset",this.setCurrentFilterValue)},watch:{value:function(){this.debouncedHandleChange()}},methods:{setCurrentFilterValue:function(){this.filter.currentValue?this.value=this.filter.currentValue:this.value=null},handleChange:function(){this.$store.commit("".concat(this.resourceName,"/updateFilterState"),{filterClass:this.filterKey,value:this.currentStartDate&&this.currentEndDate?this.currentStartDate.format("YYYY-MM-DD")+" to "+this.currentEndDate.format("YYYY-MM-DD"):null}),this.$emit("change"),this.currentStartDate=null,this.currentEndDate=null},handleInput:function(t){return t.preventDefault()},initDateRange:function(){var t=this,e="#"+this.id,r=t.filter.minDate,n=t.filter.maxDate;$(e).daterangepicker({startDate:t.startDate,endDate:t.endDate,minDate:r?moment(r).tz("America/New_York"):null,maxDate:n?moment(n).tz("America/New_York"):null,ranges:t.parseRanges()},(function(e,r,n){e&&r&&(t.currentStartDate=e,t.currentEndDate=r)})).on("apply.daterangepicker",(function(e,r){t.currentStartDate&&t.currentEndDate&&(t.value=t.currentStartDate.format("MM/DD/YYYY")+" to "+t.currentEndDate.format("MM/DD/YYYY"))}))},clearFilter:function(){this.value=null},generateId:function(){return Math.random().toString(36).substring(2)+(new Date).getTime().toString(36)},parseDates:function(){var t=this.filter.currentValue,e=moment().tz("America/New_York"),r=moment().tz("America/New_York");if(t){var n=t.split(" to ");if(2==n.length)try{e=moment(n[0],"YYYY-MM-DD").tz("America/New_York"),r=moment(n[1],"YYYY-MM-DD").tz("America/New_York")}catch(t){}}this.startDate=e.format("MM/DD/YYYY"),this.endDate=r.format("MM/DD/YYYY"),this.currentStartDate=e,this.currentEndDate=r},parseRanges:function(){for(var t=this.filter.options,e={},r=0;r<t.length;r++)e[t[r].label]=[moment(t[r][0]).tz("America/New_York"),moment(t[r][1]).tz("America/New_York")];return e}},computed:{filter:function(){return this.$store.getters["".concat(this.resourceName,"/getFilter")](this.filterKey)}}};const d=(0,r(262).A)(f,[["render",function(t,e,r,c,s,f){var d=(0,n.resolveComponent)("FilterContainer");return(0,n.openBlock)(),(0,n.createBlock)(d,null,{filter:(0,n.withCtx)((function(){return[(0,n.createElementVNode)("div",o,[a,(0,n.createElementVNode)("input",{id:t.id,class:(0,n.normalizeClass)(["block w-full form-control form-control-sm form-input form-input-bordered text-sm px-1",{"text-white":null==t.value}]),type:"text",dusk:"".concat(f.filter.name,"-daterange-filter"),name:"daterangefilter",autocomplete:"off",value:t.value,placeholder:t.placeholder,onKeydown:e[0]||(e[0]=function(t){return f.handleInput(t)}),onPaste:e[1]||(e[1]=(0,n.withModifiers)((function(){}),["prevent"]))},null,42,i),t.value?((0,n.openBlock)(),(0,n.createElementBlock)("div",u,[(0,n.createElementVNode)("button",{class:"bg-transparent",onClick:e[2]||(e[2]=function(){return f.clearFilter&&f.clearFilter.apply(f,arguments)})},l)])):(0,n.createCommentVNode)("",!0)])]})),default:(0,n.withCtx)((function(){return[(0,n.createElementVNode)("span",null,(0,n.toDisplayString)(f.filter.name),1)]})),_:1})}]]);Nova.booting((function(t,e){t.component("daterangepicker",d)}))},873:(t,e,r)=>{var n=r(325).Symbol;t.exports=n},552:(t,e,r)=>{var n=r(873),o=r(659),a=r(350),i=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":i&&i in Object(t)?o(t):a(t)}},128:(t,e,r)=>{var n=r(800),o=/^\s+/;t.exports=function(t){return t?t.slice(0,n(t)+1).replace(o,""):t}},840:(t,e,r)=>{var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;t.exports=n},659:(t,e,r)=>{var n=r(873),o=Object.prototype,a=o.hasOwnProperty,i=o.toString,u=n?n.toStringTag:void 0;t.exports=function(t){var e=a.call(t,u),r=t[u];try{t[u]=void 0;var n=!0}catch(t){}var o=i.call(t);return n&&(e?t[u]=r:delete t[u]),o}},350:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},325:(t,e,r)=>{var n=r(840),o="object"==typeof self&&self&&self.Object===Object&&self,a=n||o||Function("return this")();t.exports=a},800:t=>{var e=/\s/;t.exports=function(t){for(var r=t.length;r--&&e.test(t.charAt(r)););return r}},221:(t,e,r)=>{var n=r(805),o=r(124),a=r(374),i=Math.max,u=Math.min;t.exports=function(t,e,r){var l,c,s,f,d,p,v=0,m=!1,h=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function D(e){var r=l,n=c;return l=c=void 0,v=e,f=t.apply(n,r)}function b(t){var r=t-p;return void 0===p||r>=e||r<0||h&&t-v>=s}function Y(){var t=o();if(b(t))return y(t);d=setTimeout(Y,function(t){var r=e-(t-p);return h?u(r,s-(t-v)):r}(t))}function y(t){return d=void 0,g&&l?D(t):(l=c=void 0,f)}function w(){var t=o(),r=b(t);if(l=arguments,c=this,p=t,r){if(void 0===d)return function(t){return v=t,d=setTimeout(Y,e),m?D(t):f}(p);if(h)return clearTimeout(d),d=setTimeout(Y,e),D(p)}return void 0===d&&(d=setTimeout(Y,e)),f}return e=a(e)||0,n(r)&&(m=!!r.leading,s=(h="maxWait"in r)?i(a(r.maxWait)||0,e):s,g="trailing"in r?!!r.trailing:g),w.cancel=function(){void 0!==d&&clearTimeout(d),v=0,l=p=c=d=void 0},w.flush=function(){return void 0===d?f:y(o())},w}},805:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},346:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},394:(t,e,r)=>{var n=r(552),o=r(346);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==n(t)}},124:(t,e,r)=>{var n=r(325);t.exports=function(){return n.Date.now()}},374:(t,e,r)=>{var n=r(128),o=r(805),a=r(394),i=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,l=/^0o[0-7]+$/i,c=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(a(t))return NaN;if(o(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=o(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=n(t);var r=u.test(t);return r||l.test(t)?c(t.slice(2),r?2:8):i.test(t)?NaN:+t}},655:()=>{},262:(t,e)=>{"use strict";e.A=(t,e)=>{const r=t.__vccOpts||t;for(const[t,n]of e)r[t]=n;return r}}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.m=e,t=[],n.O=(e,r,o,a)=>{if(!r){var i=1/0;for(s=0;s<t.length;s++){for(var[r,o,a]=t[s],u=!0,l=0;l<r.length;l++)(!1&a||i>=a)&&Object.keys(n.O).every((t=>n.O[t](r[l])))?r.splice(l--,1):(u=!1,a<i&&(i=a));if(u){t.splice(s--,1);var c=o();void 0!==c&&(e=c)}}return e}a=a||0;for(var s=t.length;s>0&&t[s-1][2]>a;s--)t[s]=t[s-1];t[s]=[r,o,a]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={120:0,189:0};n.O.j=e=>0===t[e];var e=(e,r)=>{var o,a,[i,u,l]=r,c=0;if(i.some((e=>0!==t[e]))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(l)var s=l(n)}for(e&&e(r);c<i.length;c++)a=i[c],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(s)},r=self.webpackChunkrpj_daterangepicker=self.webpackChunkrpj_daterangepicker||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})(),n.O(void 0,[189],(()=>n(622)));var o=n.O(void 0,[189],(()=>n(655)));o=n.O(o)})();