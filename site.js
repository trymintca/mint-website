(function(){
  const btn=document.querySelector('[data-menu-button]');
  const nav=document.querySelector('[data-nav]');
  if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});}
  const params=new URLSearchParams(location.search);
  if(params.get('sent')==='1'){const success=document.querySelector('.success');if(success)success.style.display='block';}
})();
