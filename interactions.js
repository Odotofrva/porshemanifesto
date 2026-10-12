(() => {
 const audio=document.getElementById('engine-audio');
 const toggle=document.getElementById('sound-toggle');
 const share=document.getElementById('share-page');
 const status=document.getElementById('action-status');
 let soundOn=true;let playedOnce=false;
 function announce(message){status.textContent=message;}
 function playRev(){if(!soundOn||!audio)return;try{audio.currentTime=0;const promise=audio.play();if(promise&&promise.catch)promise.catch(()=>{});}catch(e){}}
 // The engine plays after an intentional user click, never automatically on load.
 document.addEventListener('click',e=>{
   if(e.target.closest('#sound-toggle, #share-page, a, input, textarea, select'))return;
   if(!playedOnce){playedOnce=true;playRev();}
 });
 toggle.addEventListener('click',()=>{soundOn=!soundOn;toggle.textContent='ENGINE SOUND: '+(soundOn?'ON':'OFF');toggle.setAttribute('aria-pressed',String(soundOn));if(!soundOn){audio.pause();audio.currentTime=0;}else{playRev();}announce('Engine sound '+(soundOn?'enabled':'disabled'));});
 share.addEventListener('click',async()=>{
  const data={title:'The Panamera Manifesto | MENOCLONE Motorsports',text:'Explore OdotNYC’s Porsche Panamera vision, creative journey, and MENOCLONE Motorsports concept.',url:location.href.split('#')[0]};
  if(navigator.share){try{await navigator.share(data);announce('Share dialog opened.');return;}catch(e){if(e.name==='AbortError')return;}}
  try{await navigator.clipboard.writeText(data.url);announce('Page link copied to clipboard.');share.textContent='✓ LINK COPIED';setTimeout(()=>share.textContent='↗ SHARE WITH INVESTORS',2500);}catch(e){window.prompt('Copy this link to share:',data.url);announce('Copy the page URL to share.');}
 });
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})},{threshold:.08});
  document.querySelectorAll('main .section, main .hero').forEach(el=>{el.classList.add('reveal-on-scroll');observer.observe(el);});
 }
})();