import{r as u,u as A,o as O,j as F,a as J,b as l,c,d as P,e,w as i,t as x,f as R,v as U,F as y,k as C,g as B,l as X,n as q,i as $}from"./index-mNU3Ar7u.js";import{_ as H}from"./Vector-QDL8Xk59.js";const Y="/20240214-VueTodolist/assets/empty1-YJJXL_Sp.png",G={class:"container p-4 flex justify-between items-center"},K=e("h1",{class:"font-bold text-2xl text-center flex items-center"},[e("img",{src:H,alt:"Vector_img",class:"inline-block mx-2"}),B(" ONLINE TODO LIST ")],-1),Q={key:0,class:"flex items-center"},W={key:1,class:"flex items-center"},Z={class:"mb-0 mx-2 hidden md:block"},ee={key:0,class:"container grid grid-cols-12 p-4 mx-auto"},te=e("button",{type:"submit",class:"absolute bottom-[1px] right-1 p-2"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",fill:"currentColor",class:"bi bi-plus-square",viewBox:"0 0 16 16"},[e("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"}),e("path",{d:"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"})])],-1),oe={key:0,class:"col-span-12 md:col-span-4 col-start-1 md:col-start-5 flex flex-col items-center mt-3"},se=e("h2",{class:"pt-6 mt-1"},"目前尚無待辦事項",-1),ne=e("img",{src:Y,alt:"empty_img"},null,-1),le=[se,ne],ce={key:1,class:"todoList col-span-12 md:col-span-4 col-start-1 md:col-start-5"},ae={class:"col-span-12 md:col-span-4 col-start-1 md:col-start-5 mt-4 bg-white border-0 rounded-t-lg"},ie={class:"nav justify-center"},re=["onClick"],de={class:"col-span-12 md:col-span-4 col-start-1 md:col-start-5 p-6 bg-white border-0"},ue={class:"flex items-center justify-between"},me={class:"form-check flex items-center"},pe=["onClick","checked"],he={for:""},ve=["onClick"],fe={class:"col-span-12 md:col-span-4 col-start-1 md:col-start-5 bg-white flex justify-between items-center p-4 border-0 rounded-b-lg"},be={__name:"TodolistView",setup(_e){const a=$("$swal"),m=$("axios"),p=u(!0),k=A(),h=u(""),v=u(""),L=u(["全部","待完成","已完成"]),g=u("全部"),f="https://todoo.5xcamp.us/",r=u([]),d=u(""),_=()=>{p.value=!1,m.get(`${f}todos`).then(o=>{r.value=o.data.todos})},V=async()=>{const o={todo:{content:d.value}};try{const t=await m.post(`${f}todos`,o);a.fire({icon:"success",title:"新增完畢",text:`以新增${t.data.content}`,showConfirmButton:!1,timer:500}),setTimeout(()=>{_()},500),d.value=""}catch{console.log("error")}},j=()=>{if(d.value===""){a.fire({icon:"error",title:"發生錯誤",text:"你要新增的項目不可為空 !"});return}r.value.some(t=>t.content===d.value.trim())?(a.fire({icon:"error",title:"發生錯誤",text:"此待辦您已輸入過，請重新輸入 !"}),d.value=""):V()},D=async o=>{try{p.value=!0;const t=await m.patch(`${f}todos/${o}/toggle`);_()}catch{console.log("error")}},M=o=>{a.fire({icon:"warning",title:"刪除清單選項",text:`是否刪除${o.content} 這個清單!`,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"DELETE!"}).then(t=>{t.isConfirmed&&m.delete(`${f}todos/${o.id}`).then(s=>{a.fire({icon:"success",title:`${s.data.message}成功!`}),_()})})},N=()=>{const o=r.value.filter(s=>s.completed_at!==null).map(s=>s.id);if(o.length===0)return;const t=o.map(s=>m.delete(`${f}todos/${s}`));Promise.all(t).then(()=>{_(),a.fire({icon:"success",title:"刪除完畢",showConfirmButton:!1,timer:1500})})},S=()=>{h.value!==""?(m.defaults.headers.common.Authorization=h.value,_()):(a.fire({icon:"error",title:"登入錯誤",text:"登入時間過時或還未登入",showConfirmButton:!1,timer:1500}),setTimeout(()=>{k.push("/")},1500))},w=()=>{k.push("/")},E=()=>{k.push("/signUp")},z=o=>{g.value=o};O(()=>{h.value=document.cookie.replace(/(?:(?:^|.*;\s*)todoToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),v.value=document.cookie.replace(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,"$1"),setTimeout(()=>{p.value=!1},1500),S()});const T=F(()=>g.value==="全部"?r.value:g.value==="待完成"?r.value.filter(s=>s.completed_at===null):r.value.filter(t=>t.completed_at!==""&&t.completed_at!==null)),I=()=>{a.fire({icon:"success",title:"使用者登出",text:`感謝${v.value}的使用~`,showConfirmButton:!1,timer:1500}),setTimeout(()=>{h.value="",v.value="",document.cookie="todoToken=;  max-age=0",document.cookie="username=; max-age=0",w()},1500)};return(o,t)=>{const s=J("VueLoading");return l(),c(y,null,[P(s,{active:p.value},null,8,["active"]),e("header",G,[K,(h.value&&v.value)===""?(l(),c("div",Q,[e("a",{href:"#",class:"me-3 text-gray-600 font-bold text-lg",onClick:i(w,["prevent"])},"登入"),e("a",{href:"#",class:"text-red-600 font-bold text-lg",onClick:i(E,["prevent"])},"註冊")])):(l(),c("div",W,[e("h2",Z,x(v.value)+"的代辦",1),e("a",{href:"#",class:"text-red-600 font-bold text-lg",onClick:i(I,["prevent"])},"登出")]))]),p.value?X("",!0):(l(),c("main",ee,[e("form",{class:"search-bar relative col-span-12 md:col-span-4 col-start-1 md:col-start-5",onSubmit:i(j,["prevent"])},[R(e("input",{type:"text",id:"todoInput",class:"form-control p-3",placeholder:"新增待辦事項","onUpdate:modelValue":t[0]||(t[0]=n=>d.value=n)},null,512),[[U,d.value]]),te],32),r.value.length===0?(l(),c("div",oe,le)):(l(),c("div",ce,[e("div",ae,[e("ul",ie,[(l(!0),c(y,null,C(L.value,(n,b)=>(l(),c("li",{class:q(["options",{active:g.value===n}]),key:"category"+b,onClick:i(ge=>z(n),["prevent"])},x(n),11,re))),128))])]),e("div",de,[(l(!0),c(y,null,C(T.value,n=>(l(),c("ul",{class:"px-0 list-none",key:n.id},[e("li",ue,[e("div",me,[e("input",{type:"checkbox",class:"ms-2 me-3",onClick:i(b=>D(n.id),["prevent"]),checked:n.completed_at!==null},null,8,pe),e("label",he,x(n.content),1)]),e("button",{type:"button",onClick:i(b=>M(n),["prevent"])},"X",8,ve)])]))),128))]),e("div",fe,[e("div",null,[e("span",null,x(T.value.length),1),B("個待完成項目 ")]),e("a",{href:"#",onClick:i(N,["prevent"])},"清除已完成項目")])]))]))],64)}}};export{be as default};