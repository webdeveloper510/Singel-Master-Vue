(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64152abc"],{"9c7d":function(e,t,a){"use strict";a.d(t,"a",(function(){return I}));var s=a("2b0e"),r=a("c637"),l=a("a723"),n=a("906c"),i=a("7b1e"),o=a("a8c8"),c=a("3a58"),u=a("d82f"),d=a("cf75"),b=a("dde7"),m=a("06d9"),h=a("ad47"),g=a("d520"),v=a("40fc"),f=a("1f1e"),p=a("90ef"),k=a("602d"),y=a("bc9a"),j=a("992e"),O=a("3c21");function S(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function C(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function w(e,t,a){return t&&C(e.prototype,t),a&&C(e,a),e}var x="__bv__visibility_observer",_=function(){function e(t,a,s){S(this,e),this.el=t,this.callback=a.callback,this.margin=a.margin||0,this.once=a.once||!1,this.observer=null,this.visible=void 0,this.doneOnce=!1,this.createObserver(s)}return w(e,[{key:"createObserver",value:function(e){var t=this;if(this.observer&&this.stop(),!this.doneOnce&&Object(i["f"])(this.callback)){try{this.observer=new IntersectionObserver(this.handler.bind(this),{root:null,rootMargin:this.margin,threshold:0})}catch(a){return this.doneOnce=!0,this.observer=void 0,void this.callback(null)}e.context.$nextTick((function(){Object(n["B"])((function(){t.observer&&t.observer.observe(t.el)}))}))}}},{key:"handler",value:function(e){var t=e?e[0]:{},a=Boolean(t.isIntersecting||t.intersectionRatio>0);a!==this.visible&&(this.visible=a,this.callback(a),this.once&&this.visible&&(this.doneOnce=!0,this.stop()))}},{key:"stop",value:function(){this.observer&&this.observer.disconnect(),this.observer=null}}]),e}(),B=function(e){var t=e[x];t&&t.stop&&t.stop(),delete e[x]},V=function(e,t,a){var s=t.value,r=t.modifiers,l={margin:"0px",once:!1,callback:s};Object(u["h"])(r).forEach((function(e){j["d"].test(e)?l.margin="".concat(e,"px"):"once"===e.toLowerCase()&&(l.once=!0)})),B(e),e[x]=new _(e,l,a),e[x]._prevModifiers=Object(u["b"])(r)},T=function(e,t,a){var s=t.value,r=t.oldValue,l=t.modifiers;l=Object(u["b"])(l),!e||s===r&&e[x]&&Object(O["a"])(l,e[x]._prevModifiers)||V(e,{value:s,modifiers:l},a)},H=function(e){B(e)},L={bind:V,componentUpdated:T,unbind:H};function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function G(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(Object(a),!0).forEach((function(t){R(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function R(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var K=Object(d["d"])(Object(u["m"])(G(G(G(G(G(G({},p["b"]),b["b"]),h["b"]),g["b"]),v["b"]),{},{maxRows:Object(d["c"])(l["m"]),noAutoShrink:Object(d["c"])(l["g"],!1),noResize:Object(d["c"])(l["g"],!1),rows:Object(d["c"])(l["m"],2),wrap:Object(d["c"])(l["r"],"soft")})),r["F"]),I=s["default"].extend({name:r["F"],directives:{"b-visible":L},mixins:[y["a"],p["a"],k["a"],b["a"],h["a"],g["a"],v["a"],m["a"],f["a"]],props:K,data:function(){return{heightInPx:null}},computed:{computedStyle:function(){var e={resize:!this.computedRows||this.noResize?"none":null};return this.computedRows||(e.height=this.heightInPx,e.overflowY="scroll"),e},computedMinRows:function(){return Object(o["c"])(Object(c["c"])(this.rows,2),2)},computedMaxRows:function(){return Object(o["c"])(this.computedMinRows,Object(c["c"])(this.maxRows,0))},computedRows:function(){return this.computedMinRows===this.computedMaxRows?this.computedMinRows:null},computedAttrs:function(){var e=this.disabled,t=this.required;return{id:this.safeId(),name:this.name||null,form:this.form||null,disabled:e,placeholder:this.placeholder||null,required:t,autocomplete:this.autocomplete||null,readonly:this.readonly||this.plaintext,rows:this.computedRows,wrap:this.wrap||null,"aria-required":this.required?"true":null,"aria-invalid":this.computedAriaInvalid}},computedListeners:function(){return G(G({},this.bvListeners),{},{input:this.onInput,change:this.onChange,blur:this.onBlur})}},watch:{localValue:function(){this.setHeight()}},mounted:function(){this.setHeight()},methods:{visibleCallback:function(e){e&&this.$nextTick(this.setHeight)},setHeight:function(){var e=this;this.$nextTick((function(){Object(n["B"])((function(){e.heightInPx=e.computeHeight()}))}))},computeHeight:function(){if(this.$isServer||!Object(i["g"])(this.computedRows))return null;var e=this.$el;if(!Object(n["u"])(e))return null;var t=Object(n["k"])(e),a=Object(c["b"])(t.lineHeight,1),s=Object(c["b"])(t.borderTopWidth,0)+Object(c["b"])(t.borderBottomWidth,0),r=Object(c["b"])(t.paddingTop,0)+Object(c["b"])(t.paddingBottom,0),l=s+r,u=a*this.computedMinRows+l,d=Object(n["m"])(e,"height")||t.height;Object(n["F"])(e,"height","auto");var b=e.scrollHeight;Object(n["F"])(e,"height",d);var m=Object(o["c"])((b-r)/a,2),h=Object(o["d"])(Object(o["c"])(m,this.computedMinRows),this.computedMaxRows),g=Object(o["c"])(Object(o["a"])(h*a+l),u);return this.noAutoShrink&&Object(c["b"])(d,0)>g?d:"".concat(g,"px")}},render:function(e){return e("textarea",{class:this.computedClass,style:this.computedStyle,directives:[{name:"b-visible",value:this.visibleCallback,modifiers:{640:!0}}],attrs:this.computedAttrs,domProps:{value:this.localValue},on:this.computedListeners,ref:"input"})}})},a9b7:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"min-height":"70vh"}},[a("b-row",{staticClass:"content-header"},[a("b-col",{staticClass:"content-header-left mb-2",attrs:{cols:"12",md:"12"}},[a("b-row",{staticClass:"breadcrumbs-top"},[a("b-col",{attrs:{cols:"2"}},[a("div",{staticClass:"d-flex justify-content-start"},[a("v-select",{staticClass:"half-width",attrs:{dir:e.$store.state.appConfig.isRTL?"rtl":"ltr",options:e.ageList,"input-id":"address-type",clearable:!1},model:{value:e.filter.start_age,callback:function(t){e.$set(e.filter,"start_age",t)},expression:"filter.start_age"}}),a("b-form-group",{staticClass:"mx-1",attrs:{label:"~","label-for":"nested-street","label-cols-sm":"3","label-align-sm":"right"}}),a("v-select",{staticClass:"half-width",attrs:{dir:e.$store.state.appConfig.isRTL?"rtl":"ltr",options:e.ageList,"input-id":"address-type",clearable:!1},model:{value:e.filter.end_age,callback:function(t){e.$set(e.filter,"end_age",t)},expression:"filter.end_age"}})],1)]),a("b-col",{attrs:{cols:"3"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:"Län","label-for":"county","label-cols-sm":"3","label-align-sm":"right"}},[a("v-select",{attrs:{dir:e.$store.state.appConfig.isRTL?"rtl":"ltr",options:e.countyList1,"input-id":"county",clearable:!0,label:"label"},model:{value:e.county,callback:function(t){e.county=t},expression:"county"}})],1)],1),a("b-col",{attrs:{cols:"3"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:"city","label-for":"city","label-cols-sm":"3","label-align-sm":"right"}},[a("v-select",{attrs:{dir:e.$store.state.appConfig.isRTL?"rtl":"ltr",options:e.getCities(e.county),"input-id":"type",clearable:!0},model:{value:e.filter.city,callback:function(t){e.$set(e.filter,"city",t)},expression:"filter.city"}})],1)],1),a("b-col",{attrs:{cols:"3"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:"Användarnamn","label-for":"username","label-cols-sm":"4","label-align-sm":"right"}},[a("b-form-input",{attrs:{id:"username",placeholder:"username"},model:{value:e.filter.search,callback:function(t){e.$set(e.filter,"search",t)},expression:"filter.search"}})],1)],1),a("b-col",{staticClass:"text-center",attrs:{cols:"1"}},[a("b-button",{attrs:{variant:"primary"},on:{click:e.search}},[e._v(" Search ")])],1)],1)],1)],1),a("b-row",{staticClass:"match-height"},e._l(e.customers,(function(t,s){return a("b-col",{key:s,attrs:{md:"3",lg:"2"}},[a("b-card",{staticClass:"model-card-image modal-card",staticStyle:{position:"relative"},attrs:{"img-src":t.avatar,"img-alt":"Card image cap","img-top":""}},[a("div",{staticClass:"member-badge float-right"}),a("b-link",[a("b-card-title",[e._v(" "+e._s(t.username)+", "+e._s(t.age)+" ")])],1),a("b-card-text",[e._v(" "+e._s(t.county)+" "+e._s(t.city)+" ")]),a("b-button",{directives:[{name:"ripple",rawName:"v-ripple.400",value:"rgba(113, 102, 240, 0.15)",expression:"'rgba(113, 102, 240, 0.15)'",modifiers:{400:!0}}],staticClass:"mt-1",attrs:{variant:"gradient-primary",size:"sm"},on:{click:function(a){return e.$emit("select-girl",t.id)}}},[e._v(" Select ")])],1)],1)})),1)],1)},r=[],l=(a("d81d"),a("cb29"),a("99af"),a("a15b"),a("4de4"),a("205f")),n=a("d6e4"),i=a("1947"),o=a("a15b7"),c=a("b28b"),u=a("aa59"),d=a("4968"),b=a("8226"),m=a("4797"),h=a("e009"),g=a("4a7a"),v=a.n(g),f=a("ed09"),p=a("7100"),k={components:{BCard:l["a"],BCardText:n["a"],BButton:i["a"],BRow:o["a"],BCol:c["a"],BLink:u["a"],BCardTitle:d["a"],BFormGroup:b["a"],BFormInput:m["a"],vSelect:v.a},directives:{Ripple:h["a"]},data:function(){return{customers:null}},setup:function(){var e=18;function t(e,t){return Array(t-e+1).fill().map((function(t,a){return e+a}))}var a=t(18,99),s=99,r=[{label:"Blekinges",value:"Blekinges"},{label:"Dalarnas",value:"Dalarnas"},{label:"Gotlands",value:"Gotlands"},{label:"Gävleborgs",value:"Gävleborgs"},{label:"Hallands",value:"Hallands"},{label:"Jämtlands",value:"Jämtlands"},{label:"Jönköpings",value:"Jönköpings"},{label:"Kalmar",value:"Kalmar"},{label:"Kronobergs",value:"Kronobergs"},{label:"Norrbottens",value:"Norrbottens"},{label:"Skåne",value:"Skåne"},{label:"Stockholms",value:"Stockholms"},{label:"Södermanlands",value:"Södermanlands"},{label:"Uppsala",value:"Uppsala"},{label:"Värmlands",value:"Värmlands"},{label:"Västerbottens",value:"Västerbottens"},{label:"Västernorrlands",value:"Västernorrlands"},{label:"Västmanlands",value:"Västmanlands"},{label:"Västra Götalands",value:"Västra_Götalands"},{label:"Örebro",value:"Örebro"},{label:"Östergötlands",value:"Östergötlands"}],l=Object(f["ref"])({label:"",value:""}),n={Blekinges:["Karlshamn","Karlskrona","Olofström","Ronneby","Sölvesborg"],Dalarnas:["Avesta","Borlänge","Falun","Gagnef","Hedemora","Leksand","Ludvika","Malung-Sälen","Mora","Orsa","Rättvik","Smedjebacken","Säter","Vansbro","Älvdalen"],Gotlands:["Gotland"],"Gävleborgs":["Bollnäs","Gävle","Hofors","Hudiksvall","Ljusdal","Nordanstig","Ockelbo","Ovanåker","Sandviken","Söderhamn"],Hallands:["Falkenberg","Halmstad","Hylte","Kungsbacka","Laholm","Varberg"],"Jämtlands":["Berg","Bräcke","Härjedalen","Krokom","Ragunda","Strömsund","Åre","Östersund"],"Jönköpings":["Aneby","Eksjö","Gislaved","Gnosjö","Habo","Jönköping","Mullsjö","Nässjö","Sävsjö","Tranås","Vaggeryd","Vetlanda","Värnamo"],Kalmar:["Borgholm","Emmaboda","Hultsfred","Högsby","Kalmar","Mönsterås","Mörbylånga","Nybro","Oskarshamn","Torsås","Vimmerby","Västervik"],Kronobergs:["Alvesta","Lessebo","Ljungby","Markaryd","Tingsryd","Uppvidinge","Växjö","Älmhult"],Norrbottens:["Arjeplog","Arvidsjaur","Boden","Gällivare","Haparanda","Jokkmokk","Kalix","Kiruna","Luleå","Pajala","Piteå","Älvsbyn","Överkalix","Övertorneå"],"Skåne":["Bjuv","Bromölla","Burlöv","Båstad","Eslöv","Helsingborg","Hässleholm","Höganäs","Hörby","Höör","Klippan","Kristianstad","Kävlinge","Landskrona","Lomma","Lund","Malmö","Osby","Perstorp","Simrishamn","Sjöbo","Skurup","Staffanstorp","Svalöv","Svedala","Tomelilla","Trelleborg","Vellinge","Ystad","Åstorp","Ängelholm","Örkelljunga","Östra Göinge"],Stockholms:["Botkyrka","Danderyd","Ekerö","Haninge","Huddinge","Järfälla","Lidingö","Nacka","Norrtälje","Nykvarn","Nynäshamn","Salem","Sigtuna","Sollentuna","Solna","Stockholm","Sundbyberg","Södertälje","Tyresö","Täby","Upplands Väsby","Upplands-Bro","Vallentuna","Vaxholm","Värmdö","Österåker"],"Södermanlands":["Eskilstuna","Flen","Gnesta","Katrineholm","Nyköping","Oxelösund","Strängnäs","Trosa","Vingåker"],Uppsala:["Enköping","Heby","Håbo","Knivsta","Tierp","Uppsala","Älvkarleby","Östhammar"],"Värmlands":["Arvika","Eda","Filipstad","Forshaga","Grums","Hagfors","Hammarö","Karlstad","Kil","Kristinehamn","Munkfors","Storfors","Sunne","Säffle","Torsby","Årjäng"],"Västerbottens":["Bjurholm","Dorotea","Lycksele","Malå","Nordmaling","Norsjö","Robertsfors","Skellefteå","Sorsele","Storuman","Umeå","Vilhelmina","Vindeln","Vännäs","Åsele"],"Västernorrlands":["Härnösand","Kramfors","Sollefteå","Sundsvall","Timrå","Ånge","Örnsköldsvik"],"Västmanlands":["Arboga","Fagersta","Hallstahammar","Kungsör","Köping","Norberg","Sala","Skinnskatteberg","Surahammar","Västerås"],"Västra_Götalands":["Ale","Alingsås","Bengtsfors","Bollebygd","Borås","Dals-Ed","Essunga","Falköping","Färgelanda","Grästorp","Gullspång","Göteborg","Götene","Herrljunga","Hjo","Härryda","Karlsborg","Kungälv","Lerum","Lidköping","Lilla Edet","Lysekil","Mariestad","Mark","Mellerud","Munkedal","Mölndal","Orust","Partille","Skara","Skövde","Sotenäs","Stenungsund","Strömstad","Svenljunga","Tanum","Tibro","Tidaholm","Tjörn","Tranemo","Trollhättan","Töreboda","Uddevalla","Ulricehamn","Vara","Vårgårda","Vänersborg","Åmål","Öckerö"],"Örebro":["Askersund","Degerfors","Hallsberg","Hällefors","Karlskoga","Kumla","Laxå","Lekeberg","Lindesberg","Ljusnarsberg","Nora","Örebro"],"Östergötlands":["Boxholm","Finspång","Kinda","Linköping","Mjölby","Motala","Norrköping","Söderköping","Vadstena","Valdemarsvik","Ydre","Åtvidaberg","Ödeshög"]},i="",o="Karlskrona",c=Object(f["ref"])({start_age:"18",end_age:"99",county:"",city:"",search:""});return{start_age:e,end_age:s,ageList:a,county:l,cityList:n,city:o,username:i,filter:c,countyList1:r}},mounted:function(){var e=this,t=this.$route.query,a="";t&&(a=this.serialize(t)),p["a"].getModels(a).then((function(t){e.customers=t.data})).catch((function(e){console.log(e)}))},methods:{serialize:function(e){var t=["?"];for(var a in e)e.hasOwnProperty(a)&&t.push("".concat(encodeURIComponent(a),"=").concat(encodeURIComponent(e[a])));return t.join("&")},search:function(){var e=this;this.county?this.filter.county=this.county.label:this.filter.county="";var t="",a=this.filter;a&&(t=this.serialize(a)),p["a"].getCustomers(t).then((function(t){e.customers=t.data})).catch((function(e){console.log(e)}))},getCities:function(e){return e?this.cityList[e.value]:[]}}},y=k,j=a("2877"),O=Object(j["a"])(y,s,r,!1,null,null,null);t["default"]=O.exports},d5f7:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pb-5"},[a("div",[a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-prevent-closing",modifiers:{"modal-prevent-closing":!0}}],staticClass:"btn",attrs:{variant:"gradient-primary"}},[e._v("Select Customer ")]),e.selectedCustomerId?a("b-card-code",{staticClass:"mt-2",attrs:{title:"To Customer","no-body":""}},[a("b-table",{staticClass:"mb-0",attrs:{fields:e.fields,items:e.selectedCustomer,responsive:""},scopedSlots:e._u([{key:"cell(avatar)",fn:function(e){return[a("span",{staticClass:"text-nowrap"},[a("b-avatar",{staticClass:"mr-1",attrs:{src:e.value}})],1)]}}],null,!1,4202152641)})],1):e._e(),a("b-modal",{ref:"my-modal",attrs:{id:"modal-prevent-closing",title:"Select Customer","ok-title":"Close","ok-only":"",size:"xl"},model:{value:e.modalShow,callback:function(t){e.modalShow=t},expression:"modalShow"}},[a("customers",{on:{"select-customer":e.selectCustomer}})],1)],1),e.selectedCustomerId?a("div",{staticClass:"mt-2"},[a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.select-girl",modifiers:{"select-girl":!0}}],staticClass:"btn",attrs:{variant:"gradient-primary"}},[e._v("Select Model ")]),e.selectedGirlId?a("b-card-code",{staticClass:"mt-2",attrs:{title:"From Model","no-body":""}},[a("b-table",{staticClass:"mb-0",attrs:{fields:e.fields,items:e.selectedGirl,responsive:""},scopedSlots:e._u([{key:"cell(avatar)",fn:function(e){return[a("span",{staticClass:"text-nowrap"},[a("b-avatar",{staticClass:"mr-1",attrs:{src:e.value}})],1)]}}],null,!1,4202152641)})],1):e._e(),a("b-modal",{ref:"girls-modal",attrs:{id:"select-girl",title:"Select Modal","ok-title":"Close",size:"xl"},model:{value:e.modalGirlShow,callback:function(t){e.modalGirlShow=t},expression:"modalGirlShow"}},[a("models",{on:{"select-girl":e.selectGirl}})],1)],1):e._e(),e.selectedGirlId?a("div",{staticClass:"mt-4"},[a("h4",[e._v("Input your first message")]),a("b-form-textarea",{staticClass:"mt-2",attrs:{id:"about-me",placeholder:"",rows:"3"},model:{value:e.messageText,callback:function(t){e.messageText=t},expression:"messageText"}}),e.messageText?a("b-button",{staticClass:"btn mt-2 mb-4",attrs:{variant:"gradient-primary"},on:{click:e.triggerMessage}},[e._v("Send Message ")]):e._e()],1):e._e()])},r=[],l=a("541c"),n=a("1947"),i=a("29a1"),o=a("e8a3"),c=a("6aac"),u=a("9c7d"),d=a("e6c7"),b=a("e009"),m=a("d3ef"),h=a("a9b7"),g=a("7100"),v=a("ed09"),f={name:"Trigger",components:{BButton:n["a"],BCardCode:l["a"],BTable:i["a"],BAvatar:o["a"],BModal:c["a"],Customers:m["default"],Models:h["default"],BFormTextarea:u["a"]},directives:{"b-modal":d["a"],Ripple:b["a"]},data:function(){return{fields:[{key:"avatar",label:"Photo"},{key:"gender",label:"Gender"},{key:"username",label:"username"},{key:"county",label:"County"},{key:"city",label:"City"},{key:"age",label:"Age"},{key:"about_me",label:"Description"}],items:[]}},setup:function(){var e=Object(v["ref"])(""),t=Object(v["ref"])([]),a=Object(v["ref"])(""),s=Object(v["ref"])([]),r=Object(v["ref"])(!1),l=Object(v["ref"])(!1),n=Object(v["ref"])(""),i=function(a){e.value=a,g["a"].getCustomerDetail(a).then((function(e){t.value=[],t.value.push(e.data),r.value=!1})).catch((function(e){console.log(e)}))},o=function(e){a.value=e,g["a"].getModelDetail(e).then((function(e){s.value=[],s.value.push(e.data),l.value=!1})).catch((function(e){console.log(e)}))};return{selectCustomer:i,selectedCustomerId:e,selectedCustomer:t,modalShow:r,modalGirlShow:l,selectGirl:o,selectedGirl:s,selectedGirlId:a,messageText:n}},methods:{triggerMessage:function(){var e=this;g["a"].createChat({girl:this.selectedGirlId,customer:this.selectedCustomerId,message:this.messageText}).then((function(t){console.log(t.data),e.$router.push({name:"moderator-chat",params:{chat_id:t.data.id}})})).catch((function(e){console.log(e)}))}}},p=f,k=a("2877"),y=Object(k["a"])(p,s,r,!1,null,"32d08f26",null);t["default"]=y.exports}}]);
//# sourceMappingURL=chunk-64152abc.11a1f7d6.js.map