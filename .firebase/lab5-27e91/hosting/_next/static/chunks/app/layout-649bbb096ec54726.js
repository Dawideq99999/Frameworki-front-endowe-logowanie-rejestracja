(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{3124:(e,a,r)=>{Promise.resolve().then(r.bind(r,1788)),Promise.resolve().then(r.t.bind(r,4839,23)),Promise.resolve().then(r.t.bind(r,8461,23)),Promise.resolve().then(r.t.bind(r,6776,23)),Promise.resolve().then(r.t.bind(r,9324,23))},1788:(e,a,r)=>{"use strict";r.d(a,{A:()=>c,AuthProvider:()=>i});var s=r(5155),t=r(2115),o=r(4565),n=r(7982);let l=(0,t.createContext)(),i=e=>{let{children:a}=e,[r,i]=(0,t.useState)(null),[c,u]=(0,t.useState)(!0);return((0,t.useEffect)(()=>{let e=(0,o.hg)(n.j2,e=>{i(e),u(!1)});return()=>e()},[]),c)?(0,s.jsx)("div",{className:"flex items-center justify-center min-h-screen bg-gray-100",children:(0,s.jsx)("p",{className:"text-lg font-semibold text-gray-700",children:"Loading..."})}):(0,s.jsxs)(l.Provider,{value:{user:r},children:[a," "]})},c=()=>(0,t.useContext)(l)},7982:(e,a,r)=>{"use strict";r.d(a,{Ad:()=>c,GE:()=>u,db:()=>i,j2:()=>l,o6:()=>d});var s=r(9904),t=r(4565),o=r(7058);let n=(0,s.Wp)({apiKey:"AIzaSyCuZpWnRf0EgfAOq0axuhvZsbbTnIuT2Gw",authDomain:"lab5-27e91.firebaseapp.com",projectId:"lab5-27e91",storageBucket:"lab5-27e91.appspot.com",messagingSenderId:"703615843516",appId:"1:703615843516:web:6a7f9a725c1f4bd0ace4b9"}),l=(0,t.xI)(n),i=(0,o.aU)(n),c=async(e,a)=>{try{let r=await (0,t.eJ)(l,e,a);return console.log("Rejestracja zakończona sukcesem:",r.user),r.user}catch(e){throw console.error("Błąd rejestracji:",e.message),Error(e.message)}},u=async()=>{let e=[];try{let a=l.currentUser;if(!a)return console.error("Nie zalogowano użytkownika."),e;let r=(0,o.P)((0,o.rJ)(i,"articles"),(0,o._M)("userId","==",a.uid));return(await (0,o.GG)(r)).forEach(a=>{e.push({id:a.id,...a.data()})}),e}catch(e){throw console.error("Błąd pobierania artykuł\xf3w:",e),Error(e.message)}},d=async e=>{try{let a=l.currentUser;if(!a)throw Error("Użytkownik nie jest zalogowany.");let r={...e,userId:a.uid},s=await (0,o.gS)((0,o.rJ)(i,"articles"),r);console.log("Artykuł dodany z ID:",s.id)}catch(e){throw console.error("Błąd dodawania artykułu:",e.message),Error(e.message)}}},9324:()=>{},6776:e=>{e.exports={style:{fontFamily:"'geistMono', 'geistMono Fallback'"},className:"__className_c3aa02",variable:"__variable_c3aa02"}},8461:e=>{e.exports={style:{fontFamily:"'geistSans', 'geistSans Fallback'"},className:"__className_1e4310",variable:"__variable_1e4310"}}},e=>{var a=a=>e(e.s=a);e.O(0,[484,697,992,512,778,839,441,517,358],()=>a(3124)),_N_E=e.O()}]);