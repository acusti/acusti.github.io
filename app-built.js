"use strict";(()=>{var z,o=(z=globalThis.window)!==null&&z!==void 0?z:globalThis,W=!1,T=!1,q=!0,y=o?.scrollY,L=o?.scrollX,P=y,k=L,H=null,A=null,a={x:[],y:[]};function ie(){let e=!1;a.x.length&&(L=o.scrollX),a.y.length&&(y=o.scrollY);let i={scrollX:L,scrollY:y},l=new Set;y!==P&&(a.y.forEach(n=>{n(i),l.add(n)}),P=y,e=!0),L!==k&&(a.x.forEach(n=>{l.has(n)||n(i)}),k=L,e=!0),e&&H!=null&&(clearTimeout(H),H=null),T=!1,M()}function j(){if(!(W||T)){if(k=L=o?.scrollX,P=y=o?.scrollY,q){W=!0,o.addEventListener("scroll",Y),document.body.addEventListener("touchmove",Y);return}M()}}function U(){W&&(o.removeEventListener("scroll",Y),document.body.removeEventListener("touchmove",Y),W=!1)}function Y(){q=!1,M(),U()}function M(){T||(H==null&&(H=setTimeout(le,1500)),A=o.requestAnimationFrame(ie),T=!0)}function G(){T&&(A!=null&&(o.cancelAnimationFrame(A),A=null),T=!1)}function le(){q=!0,G(),j()}function _(e,i={}){j();let{x:l,y:n,horizontal:h=l,vertical:f=n}=i;return!h&&!f&&(f=!0),h&&(a.x=a.x.concat(e)),f&&(a.y=a.y.concat(e)),()=>{if(h){let S=a.x.indexOf(e);S>-1&&a.x.splice(S,1)}if(f){let S=a.y.indexOf(e);S>-1&&a.y.splice(S,1)}!a.x.length&&!a.y.length&&(G(),U())}}var O,E=(O=globalThis.window)!==null&&O!==void 0?O:globalThis,p=null,c=null,I=0,m=!1,x=!1,v=null,X="fixed",g=null,d=null,t=null,r={},b={};function K(){t&&(m=!0,x=!1,g&&t.classList.add(g),d&&t.classList.remove(d),t.style.position=X,t.style.top="0px",r.top=0)}function ne(){if(!t||!m||r.height==null||c==null||p==null)return;I=0,m=!1,g&&t.classList.remove(g),d&&t.classList.remove(d);let e=null;x?x=!1:c>p+r.height+5?e=p+5:e=c,e!=null&&(t.style.top=e+"px",r.top=e),t.style.position="absolute"}function oe(){return!m&&r.top>c?(K(),!0):!1}function re({scrollY:e}){if(c=e,t==null||b.clientHeight==null||b.scrollHeight==null||r.height==null||r.top==null||p==null||c<0)return;let i=c-p;p=c,!oe()&&(i<0?!m&&i>r.height||x&&c<=r.top+2?K():!m&&!x&&(I>6&&(m=!0,r.height=t.offsetHeight,c>r.top+r.height+25&&(r.top=c-r.height-25,t.style.top=r.top+"px",d&&t.classList.add(d)),x=!0),I++):m&&ne())}function V(){v=null,c=p=E.scrollY,b.clientHeight=document.documentElement.clientHeight,b.scrollHeight=document.documentElement.scrollHeight,r.height=t?.offsetHeight}function J(){v!=null&&E.clearTimeout(v),v=E.setTimeout(V,150)}function Z(e,i={}){t=e,X=i.useSticky?"sticky":"fixed",i.classNameAffixed&&(g=i.classNameAffixed),i.classNameAffixing&&(d=i.classNameAffixing);let l=t.style.position,n=t.style.top;t.style.position="absolute",t.style.top="0px",r.top=0,V(),E.addEventListener("resize",J);let h=_(re,{vertical:!0});return()=>{h(),E.removeEventListener("resize",J),t&&(t.style.position=l,t.style.top=n,g&&t.classList.remove(g),d&&t.classList.remove(d),t=null),X="fixed",g=d=null,r=b={},x=m=!1,c=p=null,I=0,v!=null&&(E.clearTimeout(v),v=null)}}function F(e){var i=window.location.hostname.replace("www.",""),l="mai",n="and",h,f;for(l+="lto:"+n,l+="rew@"+i,n+="rew",n+="&#64;"+i,l+="?subject="+encodeURI(document.title),h=function(){this.href=l},f=0;f<e.length;++f)e[f].addEventListener("click",h),e[f].innerHTML=n}function se(){var e=this.parentElement.previousElementSibling,i="is-toggled",l="data-text"+(e.classList.contains(i)?"":"-toggled"),n;e!==null&&(e.classList.toggle(i),n=this.getAttribute(l),n&&n.length&&(this.innerHTML=n))}function B(){var e=document.querySelectorAll(".image-comparison-toggle"),i,l;for(l=0;l<e.length;l++)i=previousElementSibling(e[l].parentElement),i!==null&&(i.classList.add("image-comparison-wrap"),e[l].setAttribute("data-text",e[l].innerHTML),e[l].addEventListener("click",se))}var s=null,u=null,$=.3,w={image:{},image_wrap:{}},C,N,D,ee;function R(e){if(N=e.scrollY,u===null){if(s===null||!s.naturalWidth){window.setTimeout(R.bind(null,e),150);return}u=s.parentElement,s.src.substring(s.src.length-4)===".svg"&&u.classList.add("is-svg"),te(),D=N}Math.abs(N-D)*$<1.5||(D=N,!(s.clientHeight-20<u.clientHeight)&&(s.style.transform="translateY("+Math.floor(D*$*-1)+"px)"))}function te(){if(s&&!u&&(u=s.parentElement),s===null||u===null){C&&C();return}w.image.height=s.clientHeight,C&&C(),C=_(R),w.image.naturalWidth=s.naturalWidth,w.image_wrap.width=u.clientWidth,s.clientWidth<u.clientWidth?u.style.width=s.clientWidth+"px":(u.style.width="",w.image.naturalWidth>2100&&w.image.naturalWidth/2<u.clientWidth?(s.style.maxWidth=w.image.naturalWidth/2+"px",u.style.width=w.image.naturalWidth/2+"px"):(s.style.maxWidth="",u.style.width=""))}function ae(){ee&&window.clearTimeout(ee),window.setTimeout(te,150)}function Q(e){e&&(s=e,R(window.pageYOffset),window.addEventListener("resize",ae))}addEventListener("DOMContentLoaded",function(){F(document.querySelectorAll(".get-in-touch-link")),B(),Q(document.querySelector(".post__splash > img")),Z(document.querySelector(".header-menubar"))});})();
