(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[709],{8106:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/emp/[id]/generate/experience-letter",function(){return t(7228)}])},7228:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return Z}});var i=t(5893);t(7294);var r=t(1163),l=t(1397),a=t(9072),d=t(2350),s=t(9268),o={},c=function(e){var n=e.docNo,t=e.control,r=e.errors;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(a.ZP,{item:!0,xs:12,md:7,children:(0,i.jsx)(d.Z,{id:"docNo",label:"Document Number",isRequired:!0,maxLength:50,control:t,errors:r,placeholder:n,defaultValue:n,helperText:"e.g. ".concat(n)})})})},u=function(e){var n=e.profile;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"empId",label:"Employee Id",value:n.empId})}),(0,i.jsx)(a.ZP,{item:!0,xs:12,md:6}),(0,i.jsx)(a.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"fullName",label:"Full Name",value:n.fullName})}),(0,i.jsx)(a.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"designation",label:"Designation",value:n.designation})}),(0,i.jsx)(a.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"doj",label:"Date Of Joining",value:n.doj})}),(0,i.jsx)(a.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(s.Z,{id:"lwd",label:"Last Working Date",value:n.lwd})})]})};o.EditItems=c,o.ReadOnlyItems=u;var m=t(5311),x=t(4003),j=t(4461),h="Experience Letter",f="".concat("Flash"," : Generate ").concat(h);function Z(){var e=(0,r.useRouter)().query.id,n="Bearer ".concat(localStorage.getItem("galaxy-token")),t=(0,x.Z)("coeDocNo",n),a=t.docNo,d=t.isLoading;return(t.isError,d)?(0,i.jsx)(j.Z,{}):(0,i.jsx)(l.Z,{pageTitle:f,children:(0,i.jsx)(m.Z,{id:e,title:h,authToken:n,editableFields:(0,i.jsx)(o.EditItems,{docNo:a}),readOnlyFields:(0,i.jsx)(o.ReadOnlyItems,{}),formType:"EL"})})}Z.authRequired=!0}},function(e){e.O(0,[289,456,796,884,602,774,888,179],function(){return e(e.s=8106)}),_N_E=e.O()}]);