"use strict";(()=>{var z,r=(z=globalThis.window)!==null&&z!==void 0?z:globalThis,b=!1,w=!1,P=!0,v=r?.scrollY,x=r?.scrollX,D=v,A=x,H=null,E=null,s={x:[],y:[]};function Z(){let e=!1;s.x.length&&(x=r.scrollX),s.y.length&&(v=r.scrollY);let n={scrollX:x,scrollY:v},t=new Set;v!==D&&(s.y.forEach(i=>{i(n),t.add(i)}),D=v,e=!0),x!==A&&(s.x.forEach(i=>{t.has(i)||i(n)}),A=x,e=!0),e&&H!=null&&(clearTimeout(H),H=null),w=!1,q()}function B(){if(!(b||w)){if(A=x=r?.scrollX,D=v=r?.scrollY,P){b=!0,r.addEventListener("scroll",S),document.body.addEventListener("touchmove",S);return}q()}}function F(){b&&(r.removeEventListener("scroll",S),document.body.removeEventListener("touchmove",S),b=!1)}function S(){P=!1,q(),F()}function q(){w||(H==null&&(H=setTimeout($,1500)),E=r.requestAnimationFrame(Z),w=!0)}function R(){w&&(E!=null&&(r.cancelAnimationFrame(E),E=null),w=!1)}function $(){P=!0,R(),B()}function ee(e,n={}){B();let{x:t,y:i,horizontal:h=t,vertical:c=i}=n;return!h&&!c&&(c=!0),h&&(s.x=s.x.concat(e)),c&&(s.y=s.y.concat(e)),()=>{te(e,n)}}function te(e,n={}){let{x:t,y:i,horizontal:h=t,vertical:c=i}=n;if(!h&&!c&&(c=!0),h){let T=s.x.indexOf(e);T>-1&&(s.x=s.x.toSpliced(T,1))}if(c){let T=s.y.indexOf(e);T>-1&&(s.y=s.y.toSpliced(T,1))}!s.x.length&&!s.y.length&&(R(),F())}var p=ee;var M,W=(M=globalThis.window)!==null&&M!==void 0?M:globalThis,_=0,d=0,N=0,g=!1,y=!1,C=null,l=null,o={},m={};function j(){l&&(g=!0,y=!1,l.style.position="fixed",l.style.top="0px",o.top=0)}function ie(){if(!g||!l||o.height==null)return;let e=null;N=0,g=!1,y?y=!1:d>_+o.height+5?e=_+5:e=d,e!=null&&(l.style.top=e+"px",o.top=e),l.style.position="absolute"}function le(){!g&&o.top!=null&&o.top>d&&j()}function ne({scrollY:e}){d=e,le(),!(l==null||m.clientHeight==null||m.scrollHeight==null||m.scrollTop==null||o.height==null||o.top==null)&&(d<0||m.scrollHeight-m.scrollTop<m.clientHeight||(d<_?!g&&d+o.height+10<_||y&&d<=o.top+2?j():!g&&!y&&(N>6&&(g=!0,o.height=l.offsetHeight,d>o.top+o.height+25&&(o.top=d-o.height-25,l.style.top=o.top+"px"),y=!0),N++):g&&ie(),_=d))}function U(){C=null,m.clientHeight=document.documentElement.clientHeight,m.scrollHeight=document.documentElement.scrollHeight,m.scrollTop=document.documentElement.scrollTop,o.height=l?.offsetHeight}function Q(){C!=null&&W.clearTimeout(C),C=W.setTimeout(U,150)}function G(e){l=e;let n=l.style.position,t=l.style.top;l.style.position="absolute",l.style.top="0px",o.top=0,U(),W.addEventListener("resize",Q);let i=p(ne,{vertical:!0});return()=>{i(),l&&(l.style.position=n,l.style.top=t,l=null),o={},W.removeEventListener("resize",Q)}}function O(e){var n=window.location.hostname.replace("www.",""),t="mai",i="and",h,c;for(t+="lto:"+i,t+="rew@"+n,i+="rew",i+="&#64;"+n,t+="?subject="+encodeURI(document.title),h=function(){this.href=t},c=0;c<e.length;++c)e[c].addEventListener("click",h),e[c].innerHTML=i}function oe(){var e=this.parentElement.previousElementSibling,n="is-toggled",t="data-text"+(e.classList.contains(n)?"":"-toggled"),i;e!==null&&(e.classList.toggle(n),i=this.getAttribute(t),i&&i.length&&(this.innerHTML=i))}function X(){var e=document.querySelectorAll(".image-comparison-toggle"),n,t;for(t=0;t<e.length;t++)n=previousElementSibling(e[t].parentElement),n!==null&&(n.classList.add("image-comparison-wrap"),e[t].setAttribute("data-text",e[t].innerHTML),e[t].addEventListener("click",oe))}var u=null,a=null,J=.3,f={image:{},image_wrap:{}},I,Y,K;function L(e){if(I=e,a===null){if(u===null||!u.naturalWidth)return window.setTimeout(L,150),!1;a=u.parentElement,document.body.classList.add("is-loaded"),u.src.substring(u.src.length-4)===".svg"&&a.classList.add("is-svg"),V(),Y=I}Math.abs(I-Y)*J<1.5||(Y=I,!(u.clientHeight-20<a.clientHeight)&&(u.style.bottom=Math.floor(Y*J*-1)+"px"))}function V(){if(u===null||a===null){p.remove(L);return}if(f.image.height=u.clientHeight,f.image_wrap.height=a.clientHeight,f.image.height-15<f.image_wrap.height){a.classList.remove("is-cropped"),a.classList.remove("is-full-bleed"),a.style.height="",p.remove(L);return}p.remove(L),p(L),f.image.naturalWidth=u.naturalWidth,f.image_wrap.width=a.clientWidth,a.style.height=f.image_wrap.height+"px",a.classList.add("is-cropped"),u.clientWidth<a.clientWidth?a.style.width=u.clientWidth+"px":(a.style.width="",f.image.naturalWidth>2100&&f.image.naturalWidth/2<a.clientWidth?(u.style.maxWidth=f.image.naturalWidth/2+"px",a.style.width=f.image.naturalWidth/2+"px"):(u.style.maxWidth="",a.style.width=""))}function re(){K&&window.clearTimeout(K),window.setTimeout(V,150)}function k(e){e&&(u=e,L(window.pageYOffset),window.addEventListener("resize",re))}addEventListener("DOMContentLoaded",function(){O(document.querySelectorAll(".get-in-touch-link")),X(),k(document.querySelector(".post__splash > img")),G(document.querySelector(".header-menubar"))});})();
