(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[529],{6307:function(t,n,r){"use strict";var e=r(4836);n.Z=void 0;var i=e(r(4938)),o=r(5893),a=(0,i.default)((0,o.jsx)("path",{d:"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"}),"Send");n.Z=a},1812:function(t,n,r){"use strict";r.d(n,{Z:function(){return L}});var e=r(3366),i=r(7462),o=r(7294),a=r(6622),s=r(9669),d=r(4780),l=r(1719),u=r(8884),c=r(4225),g=r(754),h=r(4867),f=r(1588);function p(t){return(0,h.Z)("MuiLoadingButton",t)}let v=(0,f.Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]);var x=r(5893);let m=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],b=t=>{let{loading:n,loadingPosition:r,classes:e}=t,o={root:["root",n&&"loading"],startIcon:[n&&`startIconLoading${(0,a.Z)(r)}`],endIcon:[n&&`endIconLoading${(0,a.Z)(r)}`],loadingIndicator:["loadingIndicator",n&&`loadingIndicator${(0,a.Z)(r)}`]},s=(0,d.Z)(o,p,e);return(0,i.Z)({},e,s)},Z=t=>"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t,y=(0,l.ZP)(c.Z,{shouldForwardProp:t=>Z(t)||"classes"===t,name:"MuiLoadingButton",slot:"Root",overridesResolver:(t,n)=>[n.root,n.startIconLoadingStart&&{[`& .${v.startIconLoadingStart}`]:n.startIconLoadingStart},n.endIconLoadingEnd&&{[`& .${v.endIconLoadingEnd}`]:n.endIconLoadingEnd}]})(({ownerState:t,theme:n})=>(0,i.Z)({[`& .${v.startIconLoadingStart}, & .${v.endIconLoadingEnd}`]:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}},"center"===t.loadingPosition&&{transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short}),[`&.${v.loading}`]:{color:"transparent"}},"start"===t.loadingPosition&&t.fullWidth&&{[`& .${v.startIconLoadingStart}, & .${v.endIconLoadingEnd}`]:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===t.loadingPosition&&t.fullWidth&&{[`& .${v.startIconLoadingStart}, & .${v.endIconLoadingEnd}`]:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}})),I=(0,l.ZP)("div",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver(t,n){let{ownerState:r}=t;return[n.loadingIndicator,n[`loadingIndicator${(0,a.Z)(r.loadingPosition)}`]]}})(({theme:t,ownerState:n})=>(0,i.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{left:"small"===n.size?10:14},"start"===n.loadingPosition&&"text"===n.variant&&{left:6},"center"===n.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},"end"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{right:"small"===n.size?10:14},"end"===n.loadingPosition&&"text"===n.variant&&{right:6},"start"===n.loadingPosition&&n.fullWidth&&{position:"relative",left:-10},"end"===n.loadingPosition&&n.fullWidth&&{position:"relative",right:-10})),w=o.forwardRef(function(t,n){let r=(0,u.Z)({props:t,name:"MuiLoadingButton"}),{children:o,disabled:a=!1,id:d,loading:l=!1,loadingIndicator:c,loadingPosition:h="center",variant:f="text"}=r,p=(0,e.Z)(r,m),v=(0,s.Z)(d),Z=null!=c?c:(0,x.jsx)(g.Z,{"aria-labelledby":v,color:"inherit",size:16}),w=(0,i.Z)({},r,{disabled:a,loading:l,loadingIndicator:Z,loadingPosition:h,variant:f}),L=b(w),P=l?(0,x.jsx)(I,{className:L.loadingIndicator,ownerState:w,children:Z}):null;return(0,x.jsxs)(y,(0,i.Z)({disabled:a||l,id:v,ref:n},p,{variant:f,classes:L,ownerState:w,children:["end"===w.loadingPosition?o:P,"end"===w.loadingPosition?P:o]}))});var L=w},2792:function(t,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/view/[reqId]",function(){return r(9264)}])},2350:function(t,n,r){"use strict";r.d(n,{Z:function(){return u}});var e=r(5893);r(7294);var i=r(5343),o=r(8316),a=r(6480),s=r(2631),d=r(7424),l=r(7536);function u(t){var n,r,u=t.id,c=t.label,g=t.isRequired,h=t.maxLength,f=t.control,p=t.errors,v=t.defaultValue,x=t.disable,m=void 0!==x&&x,b=t.placeholder,Z=void 0===b?"":b,y=t.helperText,I=void 0===y?"":y;return(0,e.jsxs)(i.Z,{variant:"standard",children:[(0,e.jsx)(o.Z,{htmlFor:u,required:g,children:c}),(0,e.jsx)(l.Qr,{name:u,control:f,rules:{required:g,maxLength:h},defaultValue:void 0===v?"":v,render:function(t){var n=t.field,r=n.onBlur,i=n.onChange,o=n.value;return(0,e.jsx)(a.Z,{id:u,value:o,onBlur:r,onChange:i,disabled:m,placeholder:Z})}}),I&&(0,e.jsx)(s.Z,{id:"filled-weight-helper-text",children:I}),p&&(null===(n=p[u])||void 0===n?void 0:n.type)==="required"&&(0,e.jsx)(d.Z,{text:"".concat(c," is Required")}),p&&(null===(r=p[u])||void 0===r?void 0:r.type)==="maxLength"&&(0,e.jsx)(d.Z,{text:"Cannot be more than ".concat(h," chars")})]})}},7424:function(t,n,r){"use strict";r.d(n,{Z:function(){return a}});var e=r(5893);r(7294);var i=r(9630),o=r(1953);function a(t){var n=t.text;return(0,e.jsx)(i.Z,{component:"span",children:(0,e.jsx)(o.Z,{sx:{color:"error.main",fontSize:"12px",paddingTop:"1px"},children:n})})}},9264:function(t,n,r){"use strict";r.r(n),r.d(n,{default:function(){return I}});var e=r(7568),i=r(603),o=r(655),a=r(5893),s=r(7294),d=r(1163),l=r(1953),u=r(9837),c=r(9742),g=r(9630),h=r(1359),f=r(9072),p=r(2350),v=r(1812),x=r(7536),m=r(6307),b=r(4334);function Z(){return(Z=(0,e.Z)(function(t,n){var r,e,i,a,s;return(0,o.__generator)(this,function(o){switch(o.label){case 0:return r=n.arg,e={"Content-type":"application/json"},[4,fetch("/api/public/docs/#id/verify".replace("#id",t),{method:"POST",body:JSON.stringify(r),headers:e})];case 1:if(!(i=o.sent()).ok)return[3,3];return[4,i.blob()];case 2:return[2,o.sent()];case 3:if(401!==i.status)return[3,4];throw(a=Error("Not authorized")).status=401,a;case 4:return(s=Error("")).status=i.status,[4,i.json()];case 5:throw s.message=o.sent().message,s;case 6:return[2]}})})).apply(this,arguments)}var y=function(t,n){return Z.apply(this,arguments)};function I(){var t,n=(0,d.useRouter)().query.reqId,r=(0,i.Z)(s.useState(!1),2),Z=r[0],I=r[1],w=(0,x.cI)({mode:"onSubmit"}),L=w.control,P=w.handleSubmit,j=w.reset,S=w.formState.errors,E=(0,b.Z)(n,y).trigger,_=(t=(0,e.Z)(function(t){var n,r;return(0,o.__generator)(this,function(e){switch(e.label){case 0:I(!0),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,E(t)];case 2:return n=e.sent(),r=URL.createObjectURL(n),window.open(r),j(),[3,4];case 3:return e.sent(),console.error("error fetching document"),[3,4];case 4:return I(!1),[2]}})}),function(n){return t.apply(this,arguments)});return(0,a.jsx)(l.Z,{sx:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:(0,a.jsx)(l.Z,{component:"form",sx:{mb:"0","& .MuiFormControl-root":{margin:"10px 0",width:"100%"}},onSubmit:P(_),noValidate:!0,children:(0,a.jsxs)(u.Z,{sx:{maxWidth:{xs:345,sm:400,md:500},p:1},elevation:5,children:[(0,a.jsx)(c.Z,{title:(0,a.jsx)(g.Z,{variant:"body1",textAlign:"center",children:"Please provide below details to view the certificate"})}),(0,a.jsxs)(h.Z,{children:[(0,a.jsxs)(f.ZP,{container:!0,columnSpacing:4,children:[(0,a.jsx)(f.ZP,{item:!0,xs:12,children:(0,a.jsx)(p.Z,{id:"empId",label:"Employee Id",isRequired:!0,maxLength:50,control:L,errors:S,defaultValue:""})}),(0,a.jsx)(f.ZP,{item:!0,xs:12,children:(0,a.jsx)(p.Z,{id:"lastName",label:"Employee Last Name",isRequired:!0,maxLength:50,control:L,errors:S,defaultValue:""})})]}),(0,a.jsx)(l.Z,{sx:{textAlign:"right",my:2},children:(0,a.jsx)(v.Z,{loading:Z,size:"small",variant:"contained",endIcon:(0,a.jsx)(m.Z,{}),loadingPosition:"end",type:"submit",children:"Submit"})})]})]})})})}I.isPublic=!0},4334:function(t,n,r){"use strict";r.d(n,{Z:function(){return l}});var e=r(7294),i=r(5591),o=r(1753);function a(t,n,r,e,i,o,a){try{var s=t[o](a),d=s.value}catch(l){r(l);return}s.done?n(d):Promise.resolve(d).then(e,i)}var s=function(t,n){var r,e,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw TypeError("Generator is already executing.");for(;a;)try{if(r=1,e&&(i=2&o[0]?e.return:o[0]?e.throw||((i=e.return)&&i.call(e),0):e.next)&&!(i=i.call(e,o[1])).done)return i;switch(e=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,e=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=n.call(t,a)}catch(s){o=[6,s],e=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},d=function(){return function(t,n,r){void 0===r&&(r={});var d,l=(0,i.kY)().mutate,u=(0,e.useRef)(t),c=(0,e.useRef)(0),g=(0,o.Iy)({data:o.i_,error:o.i_,isMutating:!1}),h=g[0],f=g[1],p=g[2],v=h.current,x=(0,e.useCallback)((d=function(t,e){var i,a,d,g,h,f,v,x,m,b,Z,y,I;return s(this,function(s){switch(s.label){case 0:if(a=(i=(0,o.qC)(u.current))[0],d=i[1],!n)throw Error("Can’t trigger the mutation: missing fetcher.");if(!a)throw Error("Can’t trigger the mutation: missing key.");h={},g=(0,o.PM)((0,o.PM)((h.populateCache=!1,h.throwOnError=!0,h),r),e),f=(0,o.u3)(),c.current=f,p(((v={}).isMutating=!0,v)),s.label=1;case 1:return s.trys.push([1,3,,4]),b={},[4,l(a,n(d,((m={}).arg=t,m)),(0,o.PM)(g,(b.throwOnError=!0,b)))];case 2:return x=s.sent(),Z={},c.current<=f&&(p((Z.data=x,Z.isMutating=!1,Z.error=void 0,Z)),null==g.onSuccess||g.onSuccess(x,a,g)),[2,x];case 3:if(y=s.sent(),I={},c.current<=f&&(p((I.error=y,I.isMutating=!1,I)),null==g.onError||g.onError(y,a,g),g.throwOnError))throw y;return[3,4];case 4:return[2]}})},function(){var t=this,n=arguments;return new Promise(function(r,e){var i=d.apply(t,n);function o(t){a(i,r,e,o,s,"next",t)}function s(t){a(i,r,e,o,s,"throw",t)}o(void 0)})}),[]),m=(0,e.useCallback)(function(){c.current=(0,o.u3)(),p({data:o.i_,error:o.i_,isMutating:!1})},[]);return(0,o.LI)(function(){u.current=t}),{trigger:x,reset:m,get data(){return f.data=!0,v.data},get error(){return f.error=!0,v.error},get isMutating(){return f.isMutating=!0,v.isMutating}}}},l=(0,o.xD)(i.ZP,d)}},function(t){t.O(0,[289,456,774,888,179],function(){return t(t.s=2792)}),_N_E=t.O()}]);