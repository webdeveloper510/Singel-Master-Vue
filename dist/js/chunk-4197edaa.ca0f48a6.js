(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4197edaa"],{"06d9":function(t,e,o){"use strict";o.d(e,"a",(function(){return i}));var n=o("2b0e"),i=n["default"].extend({computed:{selectionStart:{cache:!1,get:function(){return this.$refs.input.selectionStart},set:function(t){this.$refs.input.selectionStart=t}},selectionEnd:{cache:!1,get:function(){return this.$refs.input.selectionEnd},set:function(t){this.$refs.input.selectionEnd=t}},selectionDirection:{cache:!1,get:function(){return this.$refs.input.selectionDirection},set:function(t){this.$refs.input.selectionDirection=t}}},methods:{select:function(){var t;(t=this.$refs.input).select.apply(t,arguments)},setSelectionRange:function(){var t;(t=this.$refs.input).setSelectionRange.apply(t,arguments)},setRangeText:function(){var t;(t=this.$refs.input).setRangeText.apply(t,arguments)}}})},"1f1e":function(t,e,o){"use strict";o.d(e,"a",(function(){return i}));var n=o("2b0e"),i=n["default"].extend({computed:{validity:{cache:!1,get:function(){return this.$refs.input.validity}},validationMessage:{cache:!1,get:function(){return this.$refs.input.validationMessage}},willValidate:{cache:!1,get:function(){return this.$refs.input.willValidate}}},methods:{setCustomValidity:function(){var t;return(t=this.$refs.input).setCustomValidity.apply(t,arguments)},checkValidity:function(){var t;return(t=this.$refs.input).checkValidity.apply(t,arguments)},reportValidity:function(){var t;return(t=this.$refs.input).reportValidity.apply(t,arguments)}}})},"40fc":function(t,e,o){"use strict";o.d(e,"b",(function(){return C})),o.d(e,"a",(function(){return w}));var n=o("2b0e"),i=o("0056"),a=o("a723"),r=o("906c"),c=o("6b77"),s=o("a8c8"),l=o("58f2"),u=o("3a58"),d=o("d82f"),h=o("cf75"),f=o("fa73");function m(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function p(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?m(Object(o),!0).forEach((function(e){b(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):m(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function b(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var v=Object(l["a"])("value",{type:a["m"],defaultValue:"",event:i["S"]}),O=v.mixin,g=v.props,y=v.prop,j=v.event,C=Object(h["d"])(Object(d["m"])(p(p({},g),{},{ariaInvalid:Object(h["c"])(a["i"],!1),autocomplete:Object(h["c"])(a["r"]),debounce:Object(h["c"])(a["m"],0),formatter:Object(h["c"])(a["j"]),lazy:Object(h["c"])(a["g"],!1),lazyFormatter:Object(h["c"])(a["g"],!1),number:Object(h["c"])(a["g"],!1),placeholder:Object(h["c"])(a["r"]),plaintext:Object(h["c"])(a["g"],!1),readonly:Object(h["c"])(a["g"],!1),trim:Object(h["c"])(a["g"],!1)})),"formTextControls"),w=n["default"].extend({mixins:[O],props:C,data:function(){var t=this[y];return{localValue:Object(f["g"])(t),vModelValue:this.modifyValue(t)}},computed:{computedClass:function(){var t=this.plaintext,e=this.type,o="range"===e,n="color"===e;return[{"custom-range":o,"form-control-plaintext":t&&!o&&!n,"form-control":n||!t&&!o},this.sizeFormClass,this.stateClass]},computedDebounce:function(){return Object(s["c"])(Object(u["c"])(this.debounce,0),0)},hasFormatter:function(){return Object(h["b"])(this.formatter)}},watch:b({},y,(function(t){var e=Object(f["g"])(t),o=this.modifyValue(t);e===this.localValue&&o===this.vModelValue||(this.clearDebounce(),this.localValue=e,this.vModelValue=o)})),created:function(){this.$_inputDebounceTimer=null},mounted:function(){this.$on(i["V"],this.clearDebounce)},beforeDestroy:function(){this.clearDebounce()},methods:{clearDebounce:function(){clearTimeout(this.$_inputDebounceTimer),this.$_inputDebounceTimer=null},formatValue:function(t,e){var o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return t=Object(f["g"])(t),!this.hasFormatter||this.lazyFormatter&&!o||(t=this.formatter(t,e)),t},modifyValue:function(t){return t=Object(f["g"])(t),this.trim&&(t=t.trim()),this.number&&(t=Object(u["b"])(t,t)),t},updateValue:function(t){var e=this,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.lazy;if(!n||o){this.clearDebounce();var i=function(){if(t=e.modifyValue(t),t!==e.vModelValue)e.vModelValue=t,e.$emit(j,t);else if(e.hasFormatter){var o=e.$refs.input;o&&t!==o.value&&(o.value=t)}},a=this.computedDebounce;a>0&&!n&&!o?this.$_inputDebounceTimer=setTimeout(i,a):i()}},onInput:function(t){if(!t.target.composing){var e=t.target.value,o=this.formatValue(e,t);!1===o||t.defaultPrevented?Object(c["f"])(t,{propagation:!1}):(this.localValue=o,this.updateValue(o),this.$emit(i["x"],o))}},onChange:function(t){var e=t.target.value,o=this.formatValue(e,t);!1===o||t.defaultPrevented?Object(c["f"])(t,{propagation:!1}):(this.localValue=o,this.updateValue(o,!0),this.$emit(i["d"],o))},onBlur:function(t){var e=t.target.value,o=this.formatValue(e,t,!0);!1!==o&&(this.localValue=Object(f["g"])(this.modifyValue(o)),this.updateValue(o,!0)),this.$emit(i["b"],t)},focus:function(){this.disabled||Object(r["d"])(this.$el)},blur:function(){this.disabled||Object(r["c"])(this.$el)}}})},4797:function(t,e,o){"use strict";o.d(e,"a",(function(){return S}));var n=o("2b0e"),i=o("c637"),a=o("a723"),r=o("2326"),c=o("906c"),s=o("6b77"),l=o("d82f"),u=o("cf75"),d=o("dde7"),h=o("06d9"),f=o("ad47"),m=o("d520"),p=o("40fc"),b=o("1f1e"),v=o("90ef"),O=o("bc9a");function g(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function y(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?g(Object(o),!0).forEach((function(e){j(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):g(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function j(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var C=["text","password","email","number","url","tel","search","range","color","date","time","datetime","datetime-local","month","week"],w=Object(u["d"])(Object(l["m"])(y(y(y(y(y(y({},v["b"]),d["b"]),f["b"]),m["b"]),p["b"]),{},{list:Object(u["c"])(a["r"]),max:Object(u["c"])(a["m"]),min:Object(u["c"])(a["m"]),noWheel:Object(u["c"])(a["g"],!1),step:Object(u["c"])(a["m"]),type:Object(u["c"])(a["r"],"text",(function(t){return Object(r["a"])(C,t)}))})),i["z"]),S=n["default"].extend({name:i["z"],mixins:[O["a"],v["a"],d["a"],f["a"],m["a"],p["a"],h["a"],b["a"]],props:w,computed:{localType:function(){var t=this.type;return Object(r["a"])(C,t)?t:"text"},computedAttrs:function(){var t=this.localType,e=this.name,o=this.form,n=this.disabled,i=this.placeholder,a=this.required,r=this.min,c=this.max,s=this.step;return{id:this.safeId(),name:e,form:o,type:t,disabled:n,placeholder:i,required:a,autocomplete:this.autocomplete||null,readonly:this.readonly||this.plaintext,min:r,max:c,step:s,list:"password"!==t?this.list:null,"aria-required":a?"true":null,"aria-invalid":this.computedAriaInvalid}},computedListeners:function(){return y(y({},this.bvListeners),{},{input:this.onInput,change:this.onChange,blur:this.onBlur})}},watch:{noWheel:function(t){this.setWheelStopper(t)}},mounted:function(){this.setWheelStopper(this.noWheel)},deactivated:function(){this.setWheelStopper(!1)},activated:function(){this.setWheelStopper(this.noWheel)},beforeDestroy:function(){this.setWheelStopper(!1)},methods:{setWheelStopper:function(t){var e=this.$el;Object(s["c"])(t,e,"focus",this.onWheelFocus),Object(s["c"])(t,e,"blur",this.onWheelBlur),t||Object(s["a"])(document,"wheel",this.stopWheel)},onWheelFocus:function(){Object(s["b"])(document,"wheel",this.stopWheel)},onWheelBlur:function(){Object(s["a"])(document,"wheel",this.stopWheel)},stopWheel:function(t){Object(s["f"])(t,{propagation:!1}),Object(c["c"])(this.$el)}},render:function(t){return t("input",{class:this.computedClass,attrs:this.computedAttrs,domProps:{value:this.localValue},on:this.computedListeners,ref:"input"})}})},"9152e":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("b-card-code",{attrs:{title:"Customers","no-body":""}},[o("b-form-input",{staticClass:"ml-1 mb-1",staticStyle:{width:"300px"},attrs:{placeholder:"Search",type:"text"},model:{value:t.searchTerm,callback:function(e){t.searchTerm=e},expression:"searchTerm"}}),o("b-table",{staticClass:"mb-0",attrs:{fields:t.fields,items:t.customers,responsive:"","tbody-tr-class":t.rowClass,filter:t.searchTerm},scopedSlots:t._u([{key:"cell(customer)",fn:function(e){return[o("span",{staticClass:"text-nowrap"},[o("b-avatar",{staticClass:"mr-1",attrs:{src:e.item.avatar}}),o("span",{staticClass:"text-nowrap"},[t._v(t._s(e.item.username))])],1)]}},{key:"cell(registered_at)",fn:function(e){return[t._v(" "+t._s(t.dateOnly(e.item.registered_at))+" ")]}},{key:"cell(id)",fn:function(e){return[o("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"ml-0 mr-1 btn-icon",attrs:{variant:"warning",size:"sm",title:"open detail"},on:{click:function(o){return t.openDetailModal(e.item)}}},[o("feather-icon",{attrs:{icon:"MonitorIcon"}})],1),o("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"mr-1 btn-icon",attrs:{variant:"success",size:"sm",title:"Add Coin"},on:{click:function(o){return t.openCoinModal(e.item)}}},[o("feather-icon",{attrs:{icon:"LayersIcon"}})],1),o("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"ml-0 btn-icon",attrs:{variant:"gradient-primary",size:"sm",title:"Remove"},on:{click:function(o){return t.openDeleteModal(e.item)}}},[o("feather-icon",{attrs:{icon:"UserMinusIcon"}})],1)]}}])})],1),o("b-modal",{ref:"detail-modal",attrs:{id:"detail-modal",title:"Customer Details","ok-title":"cancel","ok-only":"",centered:"",size:"lg"},model:{value:t.detailModalShow,callback:function(e){t.detailModalShow=e},expression:"detailModalShow"}},[t.selectedCustomer?o("div",{staticClass:"row"},t._l(t.selectedCustomer,(function(e,n){return o("div",{key:n,staticClass:"col-6 mt-2"},[o("h5",{staticClass:"text-capitalize mb-75"},[t._v(" "+t._s(n)+" ")]),"avatar"===n?o("div",[o("b-avatar",{staticClass:"mr-1",attrs:{src:e}})],1):o("div","last_login"===n||"registered_at"===n?[o("p",{staticStyle:{color:"grey"}},[t._v(" "+t._s(t.dateFormat(e))+" ")])]:[o("p",{staticStyle:{color:"grey"}},[t._v(" "+t._s(e)+" ")])])])})),0):t._e()]),o("b-modal",{ref:"coin-modal",attrs:{id:"coin-modal",title:"Add Coin to Customer","ok-title":"cancel","ok-only":"",centered:""},model:{value:t.coinModalShow,callback:function(e){t.coinModalShow=e},expression:"coinModalShow"}},[t.selectedCustomer?o("div",[o("h3",{staticClass:"my-2"},[t._v(" Add Coin to Customer: @"+t._s(t.selectedCustomer.username)+" ")]),o("b-form-input",{attrs:{type:"number",placeholder:"input coins",state:!0},model:{value:t.coin,callback:function(e){t.coin=e},expression:"coin"}}),o("b-button",{staticClass:"btn btn-success my-2",on:{click:function(e){return t.addCoin()}}},[t._v("Add Coin")])],1):t._e()]),o("b-modal",{ref:"delete-modal",attrs:{id:"delete-modal",title:"Remove Customer","ok-title":"cancel","ok-only":"",centered:""},model:{value:t.deleteModalShow,callback:function(e){t.deleteModalShow=e},expression:"deleteModalShow"}},[t.selectedCustomer?o("p",[t._v(" Are you sure to remove Customer @"+t._s(t.selectedCustomer.username)+" ")]):t._e(),o("b-button",{on:{click:function(e){return t.deleteCustomer()}}},[t._v(" Remove ")])],1)],1)},i=[],a=(o("159b"),o("ac1f"),o("1276"),o("541c")),r=o("29a1"),c=o("1947"),s=o("e8a3"),l=o("6aac"),u=o("4797"),d=o("2616"),h=o("7100"),f=o("4360"),m=o("c1df"),p=o.n(m),b={components:{BTable:r["a"],BButton:c["a"],BCardCode:a["a"],BAvatar:s["a"],BModal:l["a"],BFormInput:u["a"]},directives:{"b-tooltip":d["a"]},data:function(){return{searchTerm:"",fields:[{key:"customer",label:"Client"},{key:"email",label:"Email"},{key:"age",label:"age"},{key:"coins",label:"coins"},{key:"registered_at",label:"Registered Date"},{key:"id",label:"Actions"}],items:[],assignedItems:[],lobbySocket:f["a"].state.appConfig.lobbySocket,detailModalShow:!1,deleteModalShow:!1,coinModalShow:!1,pushChatIdSelected:0,pushTimeOptions:[{text:"5min",value:5},{text:"15min",value:10},{text:"30min",value:30},{text:"45min",value:45},{text:"1h",value:60},{text:"1h 15min",value:75},{text:"1h 30min",value:90},{text:"1h 45min",value:105},{text:"2h",value:120},{text:"3h",value:180},{text:"4h",value:240},{text:"5h",value:300}],pushTime:"1h",userName:JSON.parse(localStorage.getItem("userData")).username,assignChatIdSelected:null,assignModerator:null,moderators:[],customers:[],selectedCustomer:null,coin:0}},mounted:function(){this.fetchModerators(),this.fetchNewCustomers()},methods:{fetchNewCustomers:function(){var t=this;h["a"].getCustomers("?new=0").then((function(e){t.customers=e.data,console.log("CUSTOMERS========>",t.customers)})).catch((function(t){console.log(t)}))},fetchModerators:function(){var t=this;h["a"].getModerators().then((function(e){t.moderators=[];var o=e.data;o.forEach((function(e){t.moderators.push(e.username)})),console.log(t.moderators)})).catch((function(t){console.log(t)}))},rowClass:function(t,e){if(t&&"row"===e)return"remind"===t.status?"table-reminder":void 0},openDeleteModal:function(t){this.selectedCustomer=t,this.deleteModalShow=!0},openDetailModal:function(t){this.detailModalShow=!0,this.selectedCustomer=t},openCoinModal:function(t){this.coinModalShow=!0,this.selectedCustomer=t},addCoin:function(){var t=this,e={customer:this.selectedCustomer.id,coin:this.coin};h["a"].addCoin(e).then((function(e){console.log(e),t.fetchNewCustomers(),t.coinModalShow=!1})).catch((function(t){console.log(t)}))},deleteCustomer:function(){var t=this,e={customer:this.selectedCustomer.id};h["a"].deleteCustomer(e).then((function(e){console.log(e),t.fetchNewCustomers(),t.deleteModalShow=!1})).catch((function(t){console.log(t)}))},assignChat:function(){var t=this;this.assignModalShow=!1;var e={customer:this.assignChatIdSelected,moderator:this.assignModerator};h["a"].createAffiliate(e).then((function(e){console.log(e.data),t.fetchNewCustomers()})).catch((function(t){console.log(t)}))},dateOnly:function(t){return t.split("T")[0]},dateFormat:function(t){return p()(t).local().format("HH:mm - DD/MM/YYYY")}}},v=b,O=o("2877"),g=Object(O["a"])(v,n,i,!1,null,null,null);e["default"]=g.exports},ad47:function(t,e,o){"use strict";o.d(e,"b",(function(){return r})),o.d(e,"a",(function(){return c}));var n=o("2b0e"),i=o("a723"),a=o("cf75"),r=Object(a["d"])({size:Object(a["c"])(i["r"])},"formControls"),c=n["default"].extend({props:r,computed:{sizeFormClass:function(){return[this.size?"form-control-".concat(this.size):null]}}})},d520:function(t,e,o){"use strict";o.d(e,"b",(function(){return c})),o.d(e,"a",(function(){return s}));var n=o("2b0e"),i=o("a723"),a=o("7b1e"),r=o("cf75"),c=Object(r["d"])({state:Object(r["c"])(i["g"],null)},"formState"),s=n["default"].extend({props:c,computed:{computedState:function(){return Object(a["b"])(this.state)?this.state:null},stateClass:function(){var t=this.computedState;return!0===t?"is-valid":!1===t?"is-invalid":null},computedAriaInvalid:function(){var t=this.ariaInvalid;return!0===t||"true"===t||""===t||!1===this.computedState?"true":t}}})},dde7:function(t,e,o){"use strict";o.d(e,"b",(function(){return s})),o.d(e,"a",(function(){return l}));var n=o("2b0e"),i=o("a723"),a=o("906c"),r=o("cf75"),c="input, textarea, select",s=Object(r["d"])({autofocus:Object(r["c"])(i["g"],!1),disabled:Object(r["c"])(i["g"],!1),form:Object(r["c"])(i["r"]),id:Object(r["c"])(i["r"]),name:Object(r["c"])(i["r"]),required:Object(r["c"])(i["g"],!1)},"formControls"),l=n["default"].extend({props:s,mounted:function(){this.handleAutofocus()},activated:function(){this.handleAutofocus()},methods:{handleAutofocus:function(){var t=this;this.$nextTick((function(){Object(a["B"])((function(){var e=t.$el;t.autofocus&&Object(a["u"])(e)&&(Object(a["v"])(e,c)||(e=Object(a["C"])(c,e)),Object(a["d"])(e))}))}))}}})}}]);
//# sourceMappingURL=chunk-4197edaa.ca0f48a6.js.map