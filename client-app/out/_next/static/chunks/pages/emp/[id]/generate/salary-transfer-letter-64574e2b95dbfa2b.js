(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[826],{1775:function(n,t,e){"use strict";var r=e(4836);t.Z=void 0;var i=r(e(4938)),o=e(5893),a=(0,i.default)((0,o.jsx)("path",{d:"m4.01 6.03 7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3 2 10l15 2-15 2 .01 7L23 12 2.01 3z"}),"SendOutlined");t.Z=a},1812:function(n,t,e){"use strict";e.d(t,{Z:function(){return I}});var r=e(3366),i=e(7462),o=e(7294),a=e(6622),d=e(9669),l=e(4780),s=e(1719),u=e(8884),c=e(4225),x=e(754),h=e(4867),v=e(1588);function f(n){return(0,h.Z)("MuiLoadingButton",n)}let g=(0,v.Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]);var m=e(5893);let Z=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],j=n=>{let{loading:t,loadingPosition:e,classes:r}=n,o={root:["root",t&&"loading"],startIcon:[t&&`startIconLoading${(0,a.Z)(e)}`],endIcon:[t&&`endIconLoading${(0,a.Z)(e)}`],loadingIndicator:["loadingIndicator",t&&`loadingIndicator${(0,a.Z)(e)}`]},d=(0,l.Z)(o,f,r);return(0,i.Z)({},r,d)},p=n=>"ownerState"!==n&&"theme"!==n&&"sx"!==n&&"as"!==n&&"classes"!==n,L=(0,s.ZP)(c.Z,{shouldForwardProp:n=>p(n)||"classes"===n,name:"MuiLoadingButton",slot:"Root",overridesResolver:(n,t)=>[t.root,t.startIconLoadingStart&&{[`& .${g.startIconLoadingStart}`]:t.startIconLoadingStart},t.endIconLoadingEnd&&{[`& .${g.endIconLoadingEnd}`]:t.endIconLoadingEnd}]})(({ownerState:n,theme:t})=>(0,i.Z)({[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0}},"center"===n.loadingPosition&&{transition:t.transitions.create(["background-color","box-shadow","border-color"],{duration:t.transitions.duration.short}),[`&.${g.loading}`]:{color:"transparent"}},"start"===n.loadingPosition&&n.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===n.loadingPosition&&n.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginLeft:-8}})),b=(0,s.ZP)("div",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver(n,t){let{ownerState:e}=n;return[t.loadingIndicator,t[`loadingIndicator${(0,a.Z)(e.loadingPosition)}`]]}})(({theme:n,ownerState:t})=>(0,i.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===t.loadingPosition&&("outlined"===t.variant||"contained"===t.variant)&&{left:"small"===t.size?10:14},"start"===t.loadingPosition&&"text"===t.variant&&{left:6},"center"===t.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(n.vars||n).palette.action.disabled},"end"===t.loadingPosition&&("outlined"===t.variant||"contained"===t.variant)&&{right:"small"===t.size?10:14},"end"===t.loadingPosition&&"text"===t.variant&&{right:6},"start"===t.loadingPosition&&t.fullWidth&&{position:"relative",left:-10},"end"===t.loadingPosition&&t.fullWidth&&{position:"relative",right:-10})),y=o.forwardRef(function(n,t){let e=(0,u.Z)({props:n,name:"MuiLoadingButton"}),{children:o,disabled:a=!1,id:l,loading:s=!1,loadingIndicator:c,loadingPosition:h="center",variant:v="text"}=e,f=(0,r.Z)(e,Z),g=(0,d.Z)(l),p=null!=c?c:(0,m.jsx)(x.Z,{"aria-labelledby":g,color:"inherit",size:16}),y=(0,i.Z)({},e,{disabled:a,loading:s,loadingIndicator:p,loadingPosition:h,variant:v}),I=j(y),P=s?(0,m.jsx)(b,{className:I.loadingIndicator,ownerState:y,children:p}):null;return(0,m.jsxs)(L,(0,i.Z)({disabled:a||s,id:g,ref:t},f,{variant:v,classes:I,ownerState:y,children:["end"===y.loadingPosition?o:P,"end"===y.loadingPosition?P:o]}))});var I=y},1232:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/emp/[id]/generate/salary-transfer-letter",function(){return e(5297)}])},6167:function(n,t,e){"use strict";e.d(t,{Z:function(){return u}});var r=e(6042),i=e(828),o=e(5893),a=e(7294),d=e(9243),l=e(2741),s=a.forwardRef(function(n,t){return(0,o.jsx)(l.Z,(0,r.Z)({elevation:6,ref:t,variant:"filled"},n))});function u(n){var t=n.severity,e=n.msg,r=n.isOpen,l=n.parentStateFunc,u=void 0===l?null:l,c=(0,i.Z)(a.useState(r),2),x=c[0],h=c[1];a.useEffect(function(){h(r)},[r]);var v=function(n,t){"clickaway"!==t&&(h(!1),u&&u(!1))};return(0,o.jsx)(d.Z,{open:x,onClose:v,anchorOrigin:{vertical:"top",horizontal:"center"},children:(0,o.jsx)(s,{onClose:v,severity:t,sx:{width:"100%"},children:e})})}},3850:function(n,t,e){"use strict";e.d(t,{Z:function(){return d}});var r=e(5893);e(7294);var i=e(9837),o=e(9742),a=e(1359);function d(n){var t=n.title,e=n.children;return(0,r.jsxs)(i.Z,{sx:{width:"100%",pt:3},elevation:0,children:[(0,r.jsx)(o.Z,{title:t,sx:{color:"secondary.light"}}),(0,r.jsx)(a.Z,{sx:{width:"100%"},children:e})]})}e(2350),e(2697),e(3495),e(6186),e(7986),e(6167)},1397:function(n,t,e){"use strict";e.d(t,{Z:function(){return l}});var r=e(5893);e(7294);var i=e(4288),o=e(9008),a=e.n(o),d=e(9072);function l(n){var t=n.pageTitle,e=n.children,o=n.sideComponent;return(0,r.jsxs)(i.Z,{maxWidth:"xxl",children:[(0,r.jsxs)(a(),{children:[(0,r.jsx)("title",{children:t}),(0,r.jsx)("meta",{name:"description",content:"Office home"})]}),(0,r.jsxs)(d.ZP,{container:!0,children:[(0,r.jsx)(d.ZP,{item:!0,xs:12,md:12,lg:9,children:e}),(0,r.jsx)(d.ZP,{item:!0,xs:12,md:12,lg:3,children:void 0===o?null:o})]})]})}},8962:function(n,t,e){"use strict";e.d(t,{Z:function(){return l}});var r=e(5893);e(7294);var i=e(4288),o=e(9008),a=e.n(o),d=e(9072);function l(n){var t=n.pageTitle,e=n.component1,o=n.component2;return(0,r.jsxs)(i.Z,{maxWidth:"xxl",children:[(0,r.jsxs)(a(),{children:[(0,r.jsx)("title",{children:t}),(0,r.jsx)("meta",{name:"description",content:"Office home"})]}),(0,r.jsxs)(d.ZP,{container:!0,children:[(0,r.jsx)(d.ZP,{item:!0,xs:12,md:8,lg:9,children:e}),(0,r.jsx)(d.ZP,{item:!0,xs:12,md:4,lg:3,children:void 0===o?null:o})]})]})}},3495:function(n,t,e){"use strict";e.d(t,{Z:function(){return x}});var r=e(6042),i=e(5893);e(7294);var o=e(5343),a=e(7836),d=e(7536),l=e(2359),s=e(3436),u=e(1092),c=e(7424);function x(n){var t,e=n.id,x=n.label,h=n.control,v=n.minDate,f=n.maxDate,g=n.errors,m=n.isRequired,Z=n.defaultValue;return(0,i.jsxs)(o.Z,{variant:"standard",children:[(0,i.jsx)(d.Qr,{control:h,name:e,rules:{required:m},defaultValue:void 0===Z?"":Z,render:function(n){var t=n.field,e=t.onChange,o=t.value;return(0,i.jsx)(l._,{dateAdapter:u.Z,children:(0,i.jsx)(s.$,{label:x,inputFormat:"dd/MM/yyyy",value:o,onChange:e,minDate:v,maxDate:f,renderInput:function(n){return(0,i.jsx)(a.Z,(0,r.Z)({sx:{marginTop:"7px !important",marginBottom:"0px !important"},variant:"standard"},n))}})})}}),(null===(t=g[e])||void 0===t?void 0:t.type)==="required"&&(0,i.jsx)(c.Z,{text:"".concat(x," is Required")})]})}},7986:function(n,t,e){"use strict";e.d(t,{Z:function(){return s}});var r=e(5893);e(7294);var i=e(5343),o=e(8316),a=e(6480),d=e(7424),l=e(7536);function s(n){var t,e,s=n.id,u=n.label,c=n.isRequired,x=n.maxLength,h=n.control,v=n.errors,f=n.defaultValue;return(0,r.jsxs)(i.Z,{variant:"standard",children:[(0,r.jsx)(o.Z,{htmlFor:s,required:c,children:u}),(0,r.jsx)(l.Qr,{name:s,control:h,rules:{required:c,maxLength:x},defaultValue:void 0===f?"":f,render:function(n){var t=n.field,e=t.onBlur,i=t.onChange,o=t.value;return(0,r.jsx)(a.Z,{id:s,value:o,onBlur:e,onChange:i})}}),(null===(t=v[s])||void 0===t?void 0:t.type)==="required"&&(0,r.jsx)(d.Z,{text:"".concat(u," is Required")}),(null===(e=v[s])||void 0===e?void 0:e.type)==="maxLength"&&(0,r.jsx)(d.Z,{text:"Cannot be more than ".concat(x," chars")})]})}},2350:function(n,t,e){"use strict";e.d(t,{Z:function(){return u}});var r=e(5893);e(7294);var i=e(5343),o=e(8316),a=e(6480),d=e(2631),l=e(7424),s=e(7536);function u(n){var t,e,u=n.id,c=n.label,x=n.isRequired,h=n.maxLength,v=n.control,f=n.errors,g=n.defaultValue,m=n.disable,Z=void 0!==m&&m,j=n.placeholder,p=void 0===j?"":j,L=n.helperText,b=void 0===L?"":L;return(0,r.jsxs)(i.Z,{variant:"standard",children:[(0,r.jsx)(o.Z,{htmlFor:u,required:x,children:c}),(0,r.jsx)(s.Qr,{name:u,control:v,rules:{required:x,maxLength:h},defaultValue:void 0===g?"":g,render:function(n){var t=n.field,e=t.onBlur,i=t.onChange,o=t.value;return(0,r.jsx)(a.Z,{id:u,value:o,onBlur:e,onChange:i,disabled:Z,placeholder:p})}}),b&&(0,r.jsx)(d.Z,{id:"filled-weight-helper-text",children:b}),f&&(null===(t=f[u])||void 0===t?void 0:t.type)==="required"&&(0,r.jsx)(l.Z,{text:"".concat(c," is Required")}),f&&(null===(e=f[u])||void 0===e?void 0:e.type)==="maxLength"&&(0,r.jsx)(l.Z,{text:"Cannot be more than ".concat(h," chars")})]})}},6186:function(n,t,e){"use strict";e.d(t,{Z:function(){return u}});var r=e(5893);e(7294);var i=e(5343),o=e(8316),a=e(6480),d=e(9041),l=e(7424),s=e(7536);function u(n){var t,e,u,c=n.id,x=n.label,h=n.isRequired,v=n.maxLength,f=n.control,g=n.errors,m=n.defaultValue,Z=n.adornVal,j=void 0===Z?"":Z;return(0,r.jsxs)(i.Z,{variant:"standard",children:[(0,r.jsx)(o.Z,{htmlFor:c,required:h,children:x}),(0,r.jsx)(s.Qr,{name:c,control:f,rules:{required:h,maxLength:v,validate:{isDigits:function(n){return!n||/^\d+$/.test(n)}}},defaultValue:void 0===m?"":m,render:function(n){var t=n.field,e=t.onBlur,i=t.onChange,o=t.value;return(0,r.jsx)(a.Z,{id:c,value:o,onBlur:e,onChange:i,startAdornment:(0,r.jsx)(d.Z,{position:"start",children:j})})}}),(null===(t=g[c])||void 0===t?void 0:t.type)==="required"&&(0,r.jsx)(l.Z,{text:"".concat(x," is Required")}),(null===(e=g[c])||void 0===e?void 0:e.type)==="maxLength"&&(0,r.jsx)(l.Z,{text:"Cannot be more than ".concat(v," chars")}),(null===(u=g[c])||void 0===u?void 0:u.type)==="isDigits"&&(0,r.jsx)(l.Z,{text:"Only digits allowed"})]})}},2697:function(n,t,e){"use strict";e.d(t,{Z:function(){return u}});var r=e(5893);e(7294);var i=e(5343),o=e(8316),a=e(6541),d=e(7424),l=e(7536),s=e(1538);function u(n){var t,e=n.id,u=n.label,c=n.isRequired,x=n.values,h=n.control,v=n.errors,f=n.valKey,g=void 0===f?"key":f,m=n.valLabel,Z=void 0===m?"label":m,j=n.isReadOnly,p=void 0!==j&&j,L=n.defaultValue,b=n.additionalOnChange,y=void 0===b?null:b;return(0,r.jsxs)(i.Z,{variant:"standard",sx:{m:1,minWidth:120},children:[(0,r.jsx)(o.Z,{id:e,required:c,children:u}),(0,r.jsx)(l.Qr,{name:e,control:h,rules:{required:c},defaultValue:void 0===L?"":L,render:function(n){var t=n.field,i=t.onChange,o=(t.onBlur,t.value);return(0,r.jsx)(a.Z,{id:e,value:o,onChange:function(n){y?(i(n),y(n.target.value)):i(n)},disabled:p,children:x.map(function(n){return(0,r.jsx)(s.Z,{value:n[g],children:n[Z]},n[g])})})}}),(null===(t=v[e])||void 0===t?void 0:t.type)==="required"&&(0,r.jsx)(d.Z,{text:"".concat(u," is Required")})]})}},7424:function(n,t,e){"use strict";e.d(t,{Z:function(){return a}});var r=e(5893);e(7294);var i=e(9630),o=e(1953);function a(n){var t=n.text;return(0,r.jsx)(i.Z,{component:"span",children:(0,r.jsx)(o.Z,{sx:{color:"error.main",fontSize:"12px",paddingTop:"1px"},children:t})})}},5297:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return m}});var r=e(828),i=e(5893),o=e(7294);e(8962);var a=e(3850),d=e(1953),l=e(9072),s=e(2350),u=e(7536),c=e(1812),x=e(1775),h=e(6186),v=e(1397),f="".concat("AiFi Office"," : Generate Salary Transfer Letter"),g=function(){var n=(0,r.Z)(o.useState(!1),2),t=n[0],e=n[1],v=(0,u.cI)({mode:"onTouched"}),f=v.control,g=v.handleSubmit,m=(v.reset,v.formState.errors),Z=function(n){e(!0),console.log(n),e(!1)};return(0,i.jsx)(a.Z,{title:"Salary Transfer Letter",children:(0,i.jsxs)(d.Z,{component:"form",sx:{mb:"0","& .MuiFormControl-root":{margin:"10px 0",width:"100%"}},onSubmit:g(Z),noValidate:!0,autoComplete:"off",children:[(0,i.jsxs)(l.ZP,{container:!0,columnSpacing:4,children:[(0,i.jsx)(l.ZP,{item:!0,xs:12,md:8,children:(0,i.jsx)(s.Z,{id:"docNo",label:"Document Number",isRequired:!0,maxLength:10,control:f,errors:m,placeholder:"HRD/STL/2022/xxx/AIFIxxx"})}),(0,i.jsx)(l.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"passportNo",label:"Passport Number",isRequired:!0,maxLength:10,control:f,errors:m,defaultValue:""})}),(0,i.jsx)(l.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(h.Z,{id:"salary",label:"Salary",isRequired:!0,adornVal:"Dhs.",maxLength:20,control:f,errors:m})}),(0,i.jsx)(l.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"accNo",label:"Account Number",isRequired:!0,maxLength:30,control:f,errors:m})}),(0,i.jsx)(l.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"iban",label:"IBAN Number",isRequired:!0,maxLength:30,control:f,errors:m})})]}),(0,i.jsx)(d.Z,{sx:{textAlign:"right",my:2},children:(0,i.jsx)(c.Z,{loading:t,size:"small",variant:"contained",endIcon:(0,i.jsx)(x.Z,{}),loadingPosition:"end",type:"submit",children:"Generate"})})]})})};function m(){return(0,i.jsx)(v.Z,{pageTitle:f,children:(0,i.jsx)(g,{})})}m.authRequired=!0}},function(n){n.O(0,[483,372,164,774,888,179],function(){return n(n.s=1232)}),_N_E=n.O()}]);