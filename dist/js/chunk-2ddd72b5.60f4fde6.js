(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ddd72b5"],{"0101":function(t,e,r){},3135:function(t,e,r){"use strict";r.d(e,"a",(function(){return b}));var a=r("2b0e"),n=r("b42e"),s=r("c637"),o=r("a723"),c=r("7b1e"),i=r("cf75");function u(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var l=Object(i["d"])({flush:Object(i["c"])(o["g"],!1),horizontal:Object(i["c"])(o["i"],!1),tag:Object(i["c"])(o["r"],"div")},s["Q"]),b=a["default"].extend({name:s["Q"],functional:!0,props:l,render:function(t,e){var r=e.props,a=e.data,s=e.children,o=""===r.horizontal||r.horizontal;o=!r.flush&&o;var i={staticClass:"list-group",class:u({"list-group-flush":r.flush,"list-group-horizontal":!0===o},"list-group-horizontal-".concat(o),Object(c["n"])(o))};return t(r.tag,Object(n["a"])(a,i),s)}})},7802:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("section",{attrs:{id:"kb-category-search"}},[a("b-card",{staticClass:"knowledge-base-bg text-center",style:{backgroundImage:"url("+r("707c")+")"},attrs:{"no-body":""}},[a("b-card-body",{staticClass:"card-body"},[a("h2",{staticClass:"text-primary"},[t._v(" Dedicated Source Used on Website ")]),a("b-card-text",{staticClass:"mb-2"},[a("span",[t._v("Popular searches: ")]),a("span",{staticClass:"font-weight-bolder"},[t._v("Sales automation, Email marketing")])]),a("b-form",{staticClass:"kb-search-input"},[a("b-input-group",{staticClass:"input-group-merge"},[a("b-input-group-prepend",{attrs:{"is-text":""}},[a("feather-icon",{attrs:{icon:"SearchIcon"}})],1),a("b-form-input",{attrs:{id:"searchbar",placeholder:"Ask a question...."},model:{value:t.knowledgeBaseSearchQuery,callback:function(e){t.knowledgeBaseSearchQuery=e},expression:"knowledgeBaseSearchQuery"}})],1)],1)],1)],1)],1),a("div",{attrs:{id:"knowledge-base-category"}},[a("b-row",{staticClass:"match-height"},[t._l(t.filteredKB,(function(e,r){return a("b-col",{key:r,attrs:{md:"4",sm:"6"}},[a("b-card",[a("h6",{staticClass:"kb-title"},[a("feather-icon",{staticClass:"mr-50",class:e.iconColor,attrs:{icon:e.icon,size:"20"}}),t._v(t._s(e.title)+" ("+t._s(e.questions.length)+") ")],1),a("b-list-group",{staticClass:"list-group-circle mt-2"},t._l(e.questions,(function(e){return a("b-list-group-item",{key:e.question,staticClass:"text-body",attrs:{to:{name:"pages-knowledge-base-question",params:{category:t.$route.params.category,slug:e.slug}}}},[t._v(" "+t._s(e.question)+" ")])})),1)],1)],1)})),a("b-col",{directives:[{name:"show",rawName:"v-show",value:!t.filteredKB.length,expression:"!filteredKB.length"}],staticClass:"text-center",attrs:{cols:"12"}},[a("h4",{staticClass:"mt-4"},[t._v(" Search result not found!! ")])])],2)],1)])},n=[],s=(r("4de4"),r("caad"),r("2532"),r("a15b7")),o=r("b28b"),c=r("205f"),i=r("3135"),u=r("d247"),l=r("6197"),b=r("d6e4"),d=r("11de"),p=r("5e12"),f=r("3656"),g=r("4797"),h={components:{BRow:s["a"],BCol:o["a"],BCard:c["a"],BListGroup:i["a"],BListGroupItem:u["a"],BCardBody:l["a"],BCardText:b["a"],BForm:d["a"],BInputGroup:p["a"],BInputGroupPrepend:f["a"],BFormInput:g["a"]},data:function(){return{knowledgeBaseSearchQuery:"",kb:[]}},computed:{filteredKB:function(){var t=this.knowledgeBaseSearchQuery.toLowerCase();return this.kb.filter((function(e){return e.title.toLowerCase().includes(t)||e.questions.filter((function(e){return e.question.toLowerCase().includes(t)})).length}))}},created:function(){var t=this;this.$http.get("/kb/data/category").then((function(e){t.kb=e.data}))}},m=h,O=(r("ca9e"),r("2877")),v=Object(O["a"])(m,a,n,!1,null,null,null);e["default"]=v.exports},ca9e:function(t,e,r){"use strict";r("0101")},d247:function(t,e,r){"use strict";r.d(e,"a",(function(){return v}));var a=r("2b0e"),n=r("b42e"),s=r("c637"),o=r("a723"),c=r("2326"),i=r("906c"),u=r("d82f"),l=r("cf75"),b=r("4a38"),d=r("aa59");function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){g(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function g(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var h=["a","router-link","button","b-link"],m=Object(u["j"])(d["b"],["event","routerTag"]);delete m.href.default,delete m.to.default;var O=Object(l["d"])(Object(u["m"])(f(f({},m),{},{action:Object(l["c"])(o["g"],!1),button:Object(l["c"])(o["g"],!1),tag:Object(l["c"])(o["r"],"div"),variant:Object(l["c"])(o["r"])})),s["R"]),v=a["default"].extend({name:s["R"],functional:!0,props:O,render:function(t,e){var r,a=e.props,s=e.data,o=e.children,u=a.button,p=a.variant,f=a.active,O=a.disabled,v=Object(b["d"])(a),y=u?"button":v?d["a"]:a.tag,j=!!(a.action||v||u||Object(c["a"])(h,a.tag)),w={},k={};return Object(i["t"])(y,"button")?(s.attrs&&s.attrs.type||(w.type="button"),a.disabled&&(w.disabled=!0)):k=Object(l["e"])(m,a),t(y,Object(n["a"])(s,{attrs:w,props:k,staticClass:"list-group-item",class:(r={},g(r,"list-group-item-".concat(p),p),g(r,"list-group-item-action",j),g(r,"active",f),g(r,"disabled",O),r)}),o)}})}}]);
//# sourceMappingURL=chunk-2ddd72b5.60f4fde6.js.map