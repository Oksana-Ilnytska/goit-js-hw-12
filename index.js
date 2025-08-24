import{a as h,S as y,i as s}from"./assets/vendor-BK_rxH-O.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g="https://pixabay.com/api/",L="51926469-17331259ac3d6722fcf98d7c3";async function b(o,r=1){try{return(await h.get(g,{params:{key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data.hits}catch{throw new Error("Error")}}let w=new y(".gallery a",{captionsData:"alt",captionDelay:250});function v(o){const r=o.map(({webformatURL:a,largeImageURL:i,tags:e,likes:t,views:n,comments:m,downloads:p})=>`
    <li class="gallery-item">
      <a href="${i}">
        <img src="${a}" alt="${e}" loading="lazy">
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${n}</p>
        <p><b>Comments:</b> ${m}</p>
        <p><b>Downloads:</b> ${p}</p>
      </div>
    </li>
  `).join("");gallery.insertAdjacentHTML("beforeend",r),w.refresh()}function E(){gallery.innerHTML=""}const d=document.querySelector("#loader");function B(){d.classList.remove("hidden")}function q(){d.classList.add("hidden")}function S(){loadMoreBtn.classList.remove("hidden")}function u(){loadMoreBtn.classList.add("hidden")}const $=document.querySelector(".form"),M=document.querySelector(".load-more");let l="",c=1;$.addEventListener("submit",async o=>{if(o.preventDefault(),E(),u(),l=o.target.elements["search-text"].value.trim(),!l){s.warning({message:"Please enter a search query"});return}c=1,await f()});M.addEventListener("click",async()=>{c+=1,await f(!0)});async function f(o=!1){try{B();const r=await b(l,c);if(r.totalHits===0){s.info({message:"No images found for this query"});return}if(v(r.hits),c*9>=r.totalHits?(u(),o&&s.info({title:"End",message:"No more images available"})):S(),o){const a=document.querySelector(".gallery").firstElementChild;if(a){const{height:i}=a.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}}}catch{s.error({title:"Error",message:"Failed to fetch images"})}finally{q()}}
//# sourceMappingURL=index.js.map
