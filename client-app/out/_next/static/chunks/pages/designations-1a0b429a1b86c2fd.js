(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[403],{6426:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/designations",function(){return r(1398)}])},7841:function(e,n,r){"use strict";var t=r(5591);n.Z=function(e){var n,r=(0,t.ZP)(["/api/designations/",e]),i=r.data;return{designations:i,isLoading:!r.error&&!i,mutate:r.mutate}}},3850:function(e,n,r){"use strict";r.d(n,{Z:function(){return o}});var t=r(5893);r(7294);var i=r(9837),a=r(9742),s=r(1359);function o(e){var n=e.title,r=e.children;return(0,t.jsxs)(i.Z,{sx:{width:"100%",pt:3},elevation:0,children:[(0,t.jsx)(a.Z,{title:n,sx:{color:"secondary.light"}}),(0,t.jsx)(s.Z,{sx:{width:"100%"},children:r})]})}r(2350),r(2697),r(3495),r(6186),r(7986),r(1281)},1397:function(e,n,r){"use strict";r.d(n,{Z:function(){return d}});var t=r(5893);r(7294);var i=r(4288),a=r(9008),s=r.n(a),o=r(9072);function d(e){var n=e.pageTitle,r=e.children,a=e.sideComponent;return(0,t.jsxs)(i.Z,{maxWidth:"xxl",children:[(0,t.jsxs)(s(),{children:[(0,t.jsx)("title",{children:n}),(0,t.jsx)("meta",{name:"description",content:"Office home"})]}),(0,t.jsxs)(o.ZP,{container:!0,children:[(0,t.jsx)(o.ZP,{item:!0,xs:12,md:12,lg:9,children:r}),(0,t.jsx)(o.ZP,{item:!0,xs:12,md:12,lg:3,children:void 0===a?null:a})]})]})}},8962:function(e,n,r){"use strict";r.d(n,{Z:function(){return d}});var t=r(5893);r(7294);var i=r(4288),a=r(9008),s=r.n(a),o=r(9072);function d(e){var n=e.pageTitle,r=e.component1,a=e.component2;return(0,t.jsxs)(i.Z,{maxWidth:"xxl",children:[(0,t.jsxs)(s(),{children:[(0,t.jsx)("title",{children:n}),(0,t.jsx)("meta",{name:"description",content:"Office home"})]}),(0,t.jsxs)(o.ZP,{container:!0,children:[(0,t.jsx)(o.ZP,{item:!0,xs:12,md:8,lg:9,children:r}),(0,t.jsx)(o.ZP,{item:!0,xs:12,md:4,lg:3,children:void 0===a?null:a})]})]})}},3495:function(e,n,r){"use strict";r.d(n,{Z:function(){return h}});var t=r(6042),i=r(5893);r(7294);var a=r(5343),s=r(7836),o=r(7536),d=r(2359),u=r(3436),l=r(1092),c=r(7424);function h(e){var n,r=e.id,h=e.label,x=e.control,v=e.minDate,f=e.maxDate,m=e.errors,g=e.isRequired,Z=e.defaultValue,j=e.disabled,p=void 0!==j&&j;return(0,i.jsxs)(a.Z,{variant:"standard",children:[(0,i.jsx)(o.Qr,{control:x,name:r,rules:{required:g},defaultValue:void 0===Z?"":Z,render:function(e){var n=e.field,r=n.onChange,a=n.value;return(0,i.jsx)(d._,{dateAdapter:l.Z,children:(0,i.jsx)(u.$,{disabled:p,label:h,inputFormat:"dd/MM/yyyy",value:a,onChange:r,minDate:v,maxDate:f,renderInput:function(e){return(0,i.jsx)(s.Z,(0,t.Z)({required:g,sx:{marginTop:"1px !important",marginBottom:"0px !important"},variant:"standard"},e))}})})}}),(null===(n=m[r])||void 0===n?void 0:n.type)==="required"&&(0,i.jsx)(c.Z,{text:"".concat(h," is Required")})]})}},7986:function(e,n,r){"use strict";r.d(n,{Z:function(){return u}});var t=r(5893);r(7294);var i=r(5343),a=r(8316),s=r(6480),o=r(7424),d=r(7536);function u(e){var n,r,u=e.id,l=e.label,c=e.isRequired,h=e.maxLength,x=e.control,v=e.errors,f=e.defaultValue;return(0,t.jsxs)(i.Z,{variant:"standard",children:[(0,t.jsx)(a.Z,{htmlFor:u,required:c,children:l}),(0,t.jsx)(d.Qr,{name:u,control:x,rules:{required:c,maxLength:h},defaultValue:void 0===f?"":f,render:function(e){var n=e.field,r=n.onBlur,i=n.onChange,a=n.value;return(0,t.jsx)(s.Z,{id:u,value:a,onBlur:r,onChange:i})}}),(null===(n=v[u])||void 0===n?void 0:n.type)==="required"&&(0,t.jsx)(o.Z,{text:"".concat(l," is Required")}),(null===(r=v[u])||void 0===r?void 0:r.type)==="maxLength"&&(0,t.jsx)(o.Z,{text:"Cannot be more than ".concat(h," chars")})]})}},2350:function(e,n,r){"use strict";r.d(n,{Z:function(){return l}});var t=r(5893);r(7294);var i=r(5343),a=r(8316),s=r(6480),o=r(2631),d=r(7424),u=r(7536);function l(e){var n,r,l=e.id,c=e.label,h=e.isRequired,x=e.maxLength,v=e.control,f=e.errors,m=e.defaultValue,g=e.disable,Z=void 0!==g&&g,j=e.placeholder,p=void 0===j?"":j,y=e.helperText,b=void 0===y?"":y;return(0,t.jsxs)(i.Z,{variant:"standard",children:[(0,t.jsx)(a.Z,{htmlFor:l,required:h,children:c}),(0,t.jsx)(u.Qr,{name:l,control:v,rules:{required:h,maxLength:x},defaultValue:void 0===m?"":m,render:function(e){var n=e.field,r=n.onBlur,i=n.onChange,a=n.value;return(0,t.jsx)(s.Z,{id:l,value:a,onBlur:r,onChange:i,disabled:Z,placeholder:p})}}),b&&(0,t.jsx)(o.Z,{id:"filled-weight-helper-text",children:b}),f&&(null===(n=f[l])||void 0===n?void 0:n.type)==="required"&&(0,t.jsx)(d.Z,{text:"".concat(c," is Required")}),f&&(null===(r=f[l])||void 0===r?void 0:r.type)==="maxLength"&&(0,t.jsx)(d.Z,{text:"Cannot be more than ".concat(x," chars")})]})}},6186:function(e,n,r){"use strict";r.d(n,{Z:function(){return l}});var t=r(5893);r(7294);var i=r(5343),a=r(8316),s=r(6480),o=r(9041),d=r(7424),u=r(7536);function l(e){var n,r,l,c=e.id,h=e.label,x=e.isRequired,v=e.maxLength,f=e.control,m=e.errors,g=e.defaultValue,Z=e.adornVal,j=void 0===Z?"":Z;return(0,t.jsxs)(i.Z,{variant:"standard",children:[(0,t.jsx)(a.Z,{htmlFor:c,required:x,children:h}),(0,t.jsx)(u.Qr,{name:c,control:f,rules:{required:x,maxLength:v,validate:{isDigits:function(e){return!e||/^\d+$/.test(e)}}},defaultValue:void 0===g?"":g,render:function(e){var n=e.field,r=n.onBlur,i=n.onChange,a=n.value;return(0,t.jsx)(s.Z,{id:c,value:a,onBlur:r,onChange:i,startAdornment:(0,t.jsx)(o.Z,{position:"start",children:j})})}}),(null===(n=m[c])||void 0===n?void 0:n.type)==="required"&&(0,t.jsx)(d.Z,{text:"".concat(h," is Required")}),(null===(r=m[c])||void 0===r?void 0:r.type)==="maxLength"&&(0,t.jsx)(d.Z,{text:"Cannot be more than ".concat(v," chars")}),(null===(l=m[c])||void 0===l?void 0:l.type)==="isDigits"&&(0,t.jsx)(d.Z,{text:"Only digits allowed"})]})}},2697:function(e,n,r){"use strict";r.d(n,{Z:function(){return l}});var t=r(5893);r(7294);var i=r(5343),a=r(8316),s=r(6541),o=r(7424),d=r(7536),u=r(1538);function l(e){var n,r=e.id,l=e.label,c=e.isRequired,h=e.values,x=e.control,v=e.errors,f=e.valKey,m=void 0===f?"key":f,g=e.valLabel,Z=void 0===g?"label":g,j=e.isReadOnly,p=void 0!==j&&j,y=e.defaultValue,b=e.additionalOnChange,q=void 0===b?null:b,w=e.emptyLabel,C=void 0===w?null:w;return(0,t.jsxs)(i.Z,{variant:"standard",sx:{m:1,minWidth:120},children:[(0,t.jsx)(a.Z,{shrink:!0,id:r,required:c,children:l}),(0,t.jsx)(d.Qr,{name:r,control:x,rules:{required:c},defaultValue:void 0===y?"":y,render:function(e){var n=e.field,i=n.onChange,a=(n.onBlur,n.value);return(0,t.jsxs)(s.Z,{id:r,value:a,displayEmpty:!0,onChange:function(e){q?(i(e),q(e.target.value)):i(e)},disabled:p,children:[(0,t.jsx)(u.Z,{value:"",children:(0,t.jsx)("em",{children:C||"Select"})}),h&&h.map(function(e){return(0,t.jsx)(u.Z,{value:e[m],children:e[Z]},e[m])})]})}}),(null===(n=v[r])||void 0===n?void 0:n.type)==="required"&&(0,t.jsx)(o.Z,{text:"".concat(l," is Required")})]})}},7424:function(e,n,r){"use strict";r.d(n,{Z:function(){return s}});var t=r(5893);r(7294);var i=r(9630),a=r(1953);function s(e){var n=e.text;return(0,t.jsx)(i.Z,{component:"span",children:(0,t.jsx)(a.Z,{sx:{color:"error.main",fontSize:"12px",paddingTop:"1px"},children:n})})}},1398:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return B}});var t=r(5893),i=r(7294);r(8962);var a=r(7568),s=r(603),o=r(655),d=r(9072),u=r(1953),l=r(4225),c=r(3850),h=r(2350),x=r(918),v=r(7536),f=r(9737),m=r(9630),g=r(1284),Z=r(9594),j=r(1702),p=r(5214),y=r(562),b=r(4731),q=r(1733);function w(e){var n=e.dns,r=e.deleteDns;return(0,t.jsxs)(u.Z,{sx:{width:"100%"},children:[(0,t.jsx)(m.Z,{variant:"subtitle1",color:"secondary",sx:{pb:1,borderBottom:"1px solid",borderColor:"grey.200"},children:"Available Designations"}),(0,t.jsx)(p.Z,{dense:!1,children:n&&n.length>0?n.map(function(e){return(0,t.jsxs)(g.ZP,{secondaryAction:(0,t.jsx)(y.Z,{edge:"end","aria-label":"delete",onClick:function(){return r(e._id)},children:(0,t.jsx)(q.Z,{sx:{color:"warning.main"}})}),children:[(0,t.jsx)(Z.Z,{children:(0,t.jsx)(b.Z,{children:e.name.split("")[0]})}),(0,t.jsx)(j.Z,{primary:"".concat(e.name)})]},e._id)}):(0,t.jsx)(m.Z,{variant:"body2",color:"error",children:"No Designations Added"})})]})}var C=r(4461),_=r(7841);function D(){return(D=(0,a.Z)(function(e,n){var r,t,i,a,s;return(0,o.__generator)(this,function(o){switch(o.label){case 0:return r=n.arg,t={Authorization:e,"Content-type":"application/json"},[4,fetch("/api/designations/add",{method:"POST",body:JSON.stringify(r),headers:t})];case 1:if(!(i=o.sent()).ok)return[3,2];return[2,i];case 2:if(401!==i.status)return[3,3];throw(a=Error("Not authorized")).status=401,a;case 3:return(s=Error("")).status=i.status,[4,i.json()];case 4:throw s.message=o.sent().message,s;case 5:return[2]}})})).apply(this,arguments)}var L=function(e,n){return D.apply(this,arguments)},P=r(4334);function E(){return(E=(0,a.Z)(function(e,n){var r,t,i,a,s;return(0,o.__generator)(this,function(o){switch(o.label){case 0:return r=n.arg,t={Authorization:e,"Content-type":"application/json"},[4,fetch("".concat("/api/designations","/").concat(r.id),{method:"DELETE",headers:t})];case 1:if(!(i=o.sent()).ok)return[3,2];return[2,i];case 2:if(401!==i.status)return[3,3];throw(a=Error("Not authorized")).status=401,a;case 3:return(s=Error("")).status=i.status,[4,i.json()];case 4:throw s.message=o.sent().message,s;case 5:return[2]}})})).apply(this,arguments)}var R=function(e,n){return E.apply(this,arguments)};function V(e){var n,r=e.title,m="Bearer ".concat(localStorage.getItem("galaxy-token")),g=(0,s.Z)(i.useState([]),2),Z=g[0],j=g[1],p=(0,_.Z)(m),y=p.designations,b=p.isLoading,q=p.mutate,D=(0,v.cI)({mode:"onSubmit"}),E=D.control,V=D.handleSubmit,S=D.reset,k=D.formState.errors,B=(0,P.Z)(m,L).trigger,N=(0,P.Z)(m,R).trigger;i.useEffect(function(){j(y)},[y]);var T,A=(n=(0,a.Z)(function(e){return(0,o.__generator)(this,function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),[4,N({id:e})];case 1:return n.sent(),[4,q()];case 2:return n.sent(),S(),[3,4];case 3:return n.sent(),console.error("error deleting designations"),[3,4];case 4:return[2]}})}),function(e){return n.apply(this,arguments)}),O=(T=(0,a.Z)(function(e){return(0,o.__generator)(this,function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),[4,B(e)];case 1:return n.sent(),[4,q()];case 2:return n.sent(),S(),[3,4];case 3:return n.sent(),console.error("error adding designations"),[3,4];case 4:return[2]}})}),function(e){return T.apply(this,arguments)});return(0,t.jsx)(c.Z,{title:r,children:(0,t.jsx)(d.ZP,{container:!0,columnSpacing:6,children:(0,t.jsxs)(d.ZP,{item:!0,xs:12,md:8,lg:8,children:[(0,t.jsx)(u.Z,{component:"form",onSubmit:V(O),noValidate:!0,autoComplete:"off",sx:{mb:"0","& .MuiFormControl-root":{margin:"10px 0",width:"100%"}},children:(0,t.jsx)(d.ZP,{container:!0,spacing:4,children:(0,t.jsxs)(d.ZP,{item:!0,xs:12,md:12,sx:{textAlign:"right"},children:[(0,t.jsx)(h.Z,{id:"newDesignation",label:"New Designation",isRequired:!0,maxLength:100,control:E,errors:k}),(0,t.jsx)(l.Z,{type:"submit",variant:"contained",color:"primary",startIcon:(0,t.jsx)(f.Z,{}),sx:{width:["100%","100%",100]},children:"Add"})]})})}),(0,t.jsx)(x.Z,{elevation:2,sx:{p:2,mt:5},children:b?(0,t.jsx)(C.Z,{}):(0,t.jsx)(w,{dns:Z,deleteDns:A})})]})})})}var S=r(1397),k="".concat("Flash"," : Designations");function B(){return(0,t.jsx)(S.Z,{pageTitle:k,children:(0,t.jsx)(V,{title:"Designations"})})}B.authRequired=!0}},function(e){e.O(0,[289,456,796,998,774,888,179],function(){return e(e.s=6426)}),_N_E=e.O()}]);