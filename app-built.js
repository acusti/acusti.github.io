"use strict";(()=>{var z,o=(z=globalThis.window)!==null&&z!==void 0?z:globalThis,W=!1,_=!1,q=!0,L=o?.scrollY,T=o?.scrollX,P=L,k=T,S=null,A=null,u={x:[],y:[]};function te(){let e=!1;u.x.length&&(T=o.scrollX),u.y.length&&(L=o.scrollY);let i={scrollX:T,scrollY:L},l=new Set;L!==P&&(u.y.forEach(n=>{n(i),l.add(n)}),P=L,e=!0),T!==k&&(u.x.forEach(n=>{l.has(n)||n(i)}),k=T,e=!0),e&&S!=null&&(clearTimeout(S),S=null),_=!1,M()}function Q(){if(!(W||_)){if(k=T=o?.scrollX,P=L=o?.scrollY,q){W=!0,o.addEventListener("scroll",I),document.body.addEventListener("touchmove",I);return}M()}}function j(){W&&(o.removeEventListener("scroll",I),document.body.removeEventListener("touchmove",I),W=!1)}function I(){q=!1,M(),j()}function M(){_||(S==null&&(S=setTimeout(ie,1500)),A=o.requestAnimationFrame(te),_=!0)}function U(){_&&(A!=null&&(o.cancelAnimationFrame(A),A=null),_=!1)}function ie(){q=!0,U(),Q()}function p(e,i={}){Q();let{x:l,y:n,horizontal:g=l,vertical:d=n}=i;return!g&&!d&&(d=!0),g&&(u.x=u.x.concat(e)),d&&(u.y=u.y.concat(e)),()=>{if(g){let H=u.x.indexOf(e);H>-1&&u.x.splice(H,1)}if(d){let H=u.y.indexOf(e);H>-1&&u.y.splice(H,1)}!u.x.length&&!u.y.length&&(U(),j())}}var O,b=(O=globalThis.window)!==null&&O!==void 0?O:globalThis,x=null,c=null,Y=0,h=!1,w=!1,y=null,X="fixed",v=null,m=null,t=null,r={},C={};function J(){t&&(h=!0,w=!1,v&&t.classList.add(v),m&&t.classList.remove(m),t.style.position=X,t.style.top="0px",r.top=0)}function le(){if(!t||!h||r.height==null||c==null||x==null)return;Y=0,h=!1,v&&t.classList.remove(v),m&&t.classList.remove(m);let e=null;w?w=!1:c>x+r.height+5?e=x+5:e=c,e!=null&&(t.style.top=e+"px",r.top=e),t.style.position="absolute"}function ne(){return!h&&r.top>c?(J(),!0):!1}function oe({scrollY:e}){if(c=e,t==null||C.clientHeight==null||C.scrollHeight==null||r.height==null||r.top==null||x==null||c<0)return;let i=c-x;x=c,!ne()&&(i<0?!h&&i>r.height||w&&c<=r.top+2?J():!h&&!w&&(Y>6&&(h=!0,r.height=t.offsetHeight,c>r.top+r.height+25&&(r.top=c-r.height-25,t.style.top=r.top+"px",m&&t.classList.add(m)),w=!0),Y++):h&&le())}function K(){y=null,c=x=b.scrollY,C.clientHeight=document.documentElement.clientHeight,C.scrollHeight=document.documentElement.scrollHeight,r.height=t?.offsetHeight}function G(){y!=null&&b.clearTimeout(y),y=b.setTimeout(K,150)}function V(e,i={}){t=e,X=i.useSticky?"sticky":"fixed",i.classNameAffixed&&(v=i.classNameAffixed),i.classNameAffixing&&(m=i.classNameAffixing);let l=t.style.position,n=t.style.top;t.style.position="absolute",t.style.top="0px",r.top=0,K(),b.addEventListener("resize",G);let g=p(oe,{vertical:!0});return()=>{g(),b.removeEventListener("resize",G),t&&(t.style.position=l,t.style.top=n,v&&t.classList.remove(v),m&&t.classList.remove(m),t=null),X="fixed",v=m=null,r=C={},w=h=!1,c=x=null,Y=0,y!=null&&(b.clearTimeout(y),y=null)}}function B(e){var i=window.location.hostname.replace("www.",""),l="mai",n="and",g,d;for(l+="lto:"+n,l+="rew@"+i,n+="rew",n+="&#64;"+i,l+="?subject="+encodeURI(document.title),g=function(){this.href=l},d=0;d<e.length;++d)e[d].addEventListener("click",g),e[d].innerHTML=n}function re(){var e=this.parentElement.previousElementSibling,i="is-toggled",l="data-text"+(e.classList.contains(i)?"":"-toggled"),n;e!==null&&(e.classList.toggle(i),n=this.getAttribute(l),n&&n.length&&(this.innerHTML=n))}function F(){var e=document.querySelectorAll(".image-comparison-toggle"),i,l;for(l=0;l<e.length;l++)i=previousElementSibling(e[l].parentElement),i!==null&&(i.classList.add("image-comparison-wrap"),e[l].setAttribute("data-text",e[l].innerHTML),e[l].addEventListener("click",re))}var a=null,s=null,Z=.3,f={image:{},image_wrap:{}},N,D,$;function E(e){if(N=e,s===null){if(a===null||!a.naturalWidth)return window.setTimeout(E,150),!1;s=a.parentElement,document.body.classList.add("is-loaded"),a.src.substring(a.src.length-4)===".svg"&&s.classList.add("is-svg"),ee(),D=N}Math.abs(N-D)*Z<1.5||(D=N,!(a.clientHeight-20<s.clientHeight)&&(a.style.bottom=Math.floor(D*Z*-1)+"px"))}function ee(){if(a===null||s===null){p.remove(E);return}if(f.image.height=a.clientHeight,f.image_wrap.height=s.clientHeight,f.image.height-15<f.image_wrap.height){s.classList.remove("is-cropped"),s.classList.remove("is-full-bleed"),s.style.height="",p.remove(E);return}p.remove(E),p(E),f.image.naturalWidth=a.naturalWidth,f.image_wrap.width=s.clientWidth,s.style.height=f.image_wrap.height+"px",s.classList.add("is-cropped"),a.clientWidth<s.clientWidth?s.style.width=a.clientWidth+"px":(s.style.width="",f.image.naturalWidth>2100&&f.image.naturalWidth/2<s.clientWidth?(a.style.maxWidth=f.image.naturalWidth/2+"px",s.style.width=f.image.naturalWidth/2+"px"):(a.style.maxWidth="",s.style.width=""))}function se(){$&&window.clearTimeout($),window.setTimeout(ee,150)}function R(e){e&&(a=e,E(window.pageYOffset),window.addEventListener("resize",se))}addEventListener("DOMContentLoaded",function(){B(document.querySelectorAll(".get-in-touch-link")),F(),R(document.querySelector(".post__splash > img")),V(document.querySelector(".header-menubar"))});})();
