(function(){
  var pages=Array.from(document.querySelectorAll('.page'));
  var total=pages.length;
  var current=0;
  var progress=document.getElementById('progress');
  var navLabel=document.getElementById('nav-label');
  var navPrev=document.getElementById('nav-prev');
  var navNext=document.getElementById('nav-next');
  var tocOverlay=document.getElementById('toc-overlay');
  var tocSidebar=document.getElementById('toc-sidebar');
  var tocPoems=document.querySelectorAll('.toc-poem');

  function showPage(i,save){
    if(i<0||i>=total)return;
    pages[current].classList.remove('active');
    pages[current].scrollTop=0;
    current=i;
    pages[current].classList.add('active');
    var isDark=pages[current].classList.contains('dark');
    document.body.classList.toggle('light',!isDark);
    progress.style.width=(current/(total-1)*100)+'%';
    navLabel.innerHTML=pages[current].dataset.label||'';
    navPrev.disabled=current===0;
    navNext.disabled=current===total-1;
    if(save!==false){
      history.replaceState(null,'','#'+pages[current].dataset.id);
      try{localStorage.setItem('tf_pos',pages[current].dataset.id)}catch(e){}
    }
    updateTocActive();
  }

  function updateTocActive(){
    var title=pages[current].querySelector('.poem-title');
    var name=title?title.textContent.trim():'';
    tocPoems.forEach(function(b){b.classList.toggle('active',b.textContent.trim()===name)});
  }

  window.next=function(){showPage(current+1)};
  window.prev=function(){showPage(current-1)};

  window.goTo=function(id){
    for(var i=0;i<total;i++){if(pages[i].dataset.id===id){showPage(i);closeToc();return}}
  };

  window.toggleToc=function(){
    var open=tocSidebar.classList.contains('open');
    tocSidebar.classList.toggle('open',!open);
    tocOverlay.classList.toggle('open',!open);
  };
  function closeToc(){tocSidebar.classList.remove('open');tocOverlay.classList.remove('open')}

  // Keyboard
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();next()}
    else if(e.key==='ArrowLeft'){e.preventDefault();prev()}
    else if(e.key==='Escape'){closeToc()}
  });

  // Touch swipe
  var sx=0,sy=0;
  document.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
  document.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-sx;
    var dy=e.changedTouches[0].clientY-sy;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>50){
      if(dx<0)next();else prev();
    }
  },{passive:true});

  // Cover tap to begin
  pages[0].addEventListener('click',function(e){if(current===0)next()});

  // Init from hash or localStorage
  function init(){
    var target=location.hash.slice(1);
    if(!target){try{target=localStorage.getItem('tf_pos')}catch(e){}}
    if(target){
      for(var i=0;i<total;i++){if(pages[i].dataset.id===target){showPage(i,false);return}}
    }
    showPage(0,false);
  }

  // Hash change
  window.addEventListener('hashchange',function(){
    var id=location.hash.slice(1);
    if(id)window.goTo(id);
  });

  init();
})();
