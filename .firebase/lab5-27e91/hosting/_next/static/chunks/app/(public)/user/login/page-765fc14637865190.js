(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[513],{5010:(e,t,r)=>{Promise.resolve().then(r.bind(r,5037))},5037:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(5155),s=r(2115),l=r(6046),n=r(4565);function o(){let[e,t]=(0,s.useState)(""),[r,o]=(0,s.useState)(""),[i,u]=(0,s.useState)(""),[d,c]=(0,s.useState)(!1),m=(0,l.useRouter)(),x=async t=>{if(t.preventDefault(),!e||!r){u("Please enter both email and password.");return}c(!0);let a=(0,n.xI)();try{await (0,n.oM)(a,n.iM),await (0,n.x9)(a,e,r),m.push("/user/profile")}catch(e){u("Invalid email or password")}finally{c(!1)}};return(0,a.jsx)("div",{className:"flex items-center justify-center w-screen h-screen bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700",children:(0,a.jsxs)("div",{className:"w-full max-w-md bg-white p-12 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105",children:[(0,a.jsx)("h1",{className:"text-4xl lg:text-5xl font-semibold text-center text-gray-900 mb-8",children:"Welcome Back"}),(0,a.jsxs)("form",{onSubmit:x,children:[(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-xl font-medium text-gray-700",children:"Email Address"}),(0,a.jsx)("input",{id:"email",type:"email",className:"w-full p-4 mt-2 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg",placeholder:"Enter your email",value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-xl font-medium text-gray-700",children:"Password"}),(0,a.jsx)("input",{id:"password",type:"password",className:"w-full p-4 mt-2 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg",placeholder:"Enter your password",value:r,onChange:e=>o(e.target.value),required:!0})]}),i&&(0,a.jsx)("p",{className:"text-red-600 text-center mb-4",children:i}),(0,a.jsx)("button",{type:"submit",disabled:d,className:"w-full py-4 mt-6 bg-teal-600 text-white text-xl font-semibold rounded-lg shadow-md ".concat(d?"opacity-50 cursor-not-allowed":"hover:bg-teal-700"," focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"),children:d?"Logging in...":"Log In"})]}),(0,a.jsx)("div",{className:"mt-6 text-center",children:(0,a.jsxs)("p",{className:"text-lg text-gray-600",children:["Don't have an account?"," ",(0,a.jsx)("a",{href:"/user/register",className:"text-teal-600 hover:text-teal-700 font-medium",children:"Sign up"})]})})]})})}},6046:(e,t,r)=>{"use strict";var a=r(6658);r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}})}},e=>{var t=t=>e(e.s=t);e.O(0,[697,512,441,517,358],()=>t(5010)),_N_E=e.O()}]);