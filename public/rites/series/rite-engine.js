(function(){
var RE = window.RiteEngine = {};
RE.ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
RE.roman = function(n){return RE.ROMAN[n]||String(n+1);};
RE.getPhaseIndex = function(count){
  var S=29.530588853*864e5,ref=Date.UTC(2000,0,6,18,14,0);
  var d=(Date.now()-ref)%S;if(d<0)d+=S;
  return Math.floor(d/S*count)%count;
};
RE.clockSVG = function(idx,count,bright){
  var f=bright?'#D4AF6A':'#B8924A',s=bright?'#D4AF6A':'#8A6D3B',d='rgba(138,109,59,0.45)';
  var step=360/count;
  function pt(r,i){var a=(i*step-90)*Math.PI/180;return[50+r*Math.cos(a),50+r*Math.sin(a)];}
  var t='';
  for(var i=0;i<count;i++){
    var o=pt(48,i),n=pt(39,i),c=i===idx;
    t+='<line x1="'+n[0]+'" y1="'+n[1]+'" x2="'+o[0]+'" y2="'+o[1]+'" stroke="'+(c?f:d)+'" stroke-width="'+(c?4:2)+'" stroke-linecap="round"/>';
  }
  var h=pt(32,idx);
  return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="#121110" stroke="'+s+'" stroke-width="2"/>'+t+'<line x1="50" y1="50" x2="'+h[0]+'" y2="'+h[1]+'" stroke="'+f+'" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="'+f+'"/></svg>';
};
RE.clockUrl = function(idx,count,bright){
  return 'data:image/svg+xml,'+encodeURIComponent(RE.clockSVG(idx,count,bright));
};
RE.PHASE8 = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'];
RE.ILLUM8 = ['0%','\u223c25%','50%','\u223c75%','100%','\u223c75%','50%','\u223c25%'];
RE.phaseName = function(i,count){
  if(count===8) return RE.PHASE8[i];
  var si=Math.round(i*8/count)%8;return RE.PHASE8[si];
};
RE.illum = function(i,count){
  if(count===8) return RE.ILLUM8[i]+' illuminated';
  var fr=i/count,p=fr<=0.5?Math.round(fr*200):Math.round((1-fr)*200);
  return(p===0?'0%':p===100?'100%':'\u223c'+p+'%')+' illuminated';
};
RE.entryDetail = function(st,idx,count){
  return st.illum+' \u00b7 Position '+RE.roman(idx)+' of '+RE.roman(count-1)+' \u00b7 \u201c'+st.verb.replace(/&amp;/g,'&')+'\u201d';
};
RE.buildCycleHTML = function(stations,count,todayIdx){
  var h='<div class="rite-dashed" style="position:absolute;top:6px;bottom:6px;left:39px;width:1px;background:repeating-linear-gradient(180deg,rgba(184,146,74,0.22) 0,rgba(184,146,74,0.22) 2px,transparent 2px,transparent 13px);mask-image:linear-gradient(180deg,transparent,#000 4%,#000 96%,transparent);-webkit-mask-image:linear-gradient(180deg,transparent,#000 4%,#000 96%,transparent);"></div>';
  for(var i=0;i<stations.length;i++){
    var st=stations[i],isT=i===todayIdx,isB=!!st.bruise,isL=i===stations.length-1;
    var cSrc=RE.clockUrl(i,count,isT);
    var eC=isT?'#D4AF6A':'#71675A';
    var vC=isB?'#B97C97':'#B8924A';
    var dC=isB?'#C9AEB8':'#A99C82';
    var pB=isB?'#5C3140':'rgba(184,146,74,0.22)';
    var pC=isB?'#B97C97':'#D4AF6A';
    var cF=isT?'filter:drop-shadow(0 0 9px rgba(212,175,106,0.55));animation:pulse 4.5s ease-in-out infinite;':'';
    var rom=RE.roman(i);
    h+='<div class="rite-grid" style="position:relative;display:grid;grid-template-columns:80px 1fr;gap:0 22px;'+(isL?'':'padding-bottom:64px;')+'">';
    h+='<div class="rite-marker" style="grid-column:1;display:flex;justify-content:center;padding-top:4px;"><img src="'+cSrc+'" alt="" style="width:44px;height:44px;display:block;'+cF+'"/></div>';
    h+='<div style="grid-column:2;">';
    h+='<p style="font-family:Barlow Condensed,sans-serif;font-weight:600;font-size:11.5px;letter-spacing:0.18em;text-transform:uppercase;color:'+eC+';margin:6px 0 10px;">Position '+rom+' \u00b7 '+st.name+' \u00b7 '+st.illum+(isT?' \u00b7 Begin Here':'')+'</p>';
    h+='<span style="display:inline-block;font-family:Barlow Condensed,sans-serif;font-weight:600;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:'+vC+';border:1px solid '+vC+';padding:3px 9px;border-radius:1px;margin-bottom:14px;">'+st.verb+'</span>';
    h+='<h2 style="font-family:Cormorant Garamond,serif;font-weight:500;font-size:29px;margin:0 0 14px;color:#EDE6D6;">'+st.title+'</h2>';
    h+='<p style="font-size:17px;color:'+dC+';margin:0 0 20px;">'+st.directive+'</p>';
    h+='<div style="border-left:2px solid '+pB+';padding-left:16px;margin:0 0 22px;">';
    for(var j=0;j<st.prompts.length;j++) h+='<p style="font-style:italic;font-size:16px;color:'+pC+';margin:0 0 8px;">'+st.prompts[j]+'</p>';
    h+='</div>';
    h+='<p style="font-family:Karla,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#71675A;margin:0 0 6px;">Your Accounting</p>';
    h+='<textarea id="ta-'+st.id+'" style="width:100%;min-height:88px;resize:vertical;background:#121110;border:1px solid rgba(184,146,74,0.22);border-radius:2px;color:#EDE6D6;font-family:Karla,sans-serif;font-size:14.5px;line-height:1.55;padding:12px 14px;box-sizing:border-box;" placeholder="'+st.placeholder.replace(/"/g,'&quot;')+'"></textarea>';
    h+='</div></div>';
  }
  return h;
};
var _timers={};
RE.setupTextareas = function(prefix,stations){
  for(var i=0;i<stations.length;i++){(function(st){
    var key=prefix+st.id,ta=document.getElementById('ta-'+st.id);
    if(!ta)return;
    if(window.storage){window.storage.get(key,false).then(function(r){if(r&&r.value)ta.value=r.value;}).catch(function(){});}
    else{try{var v=localStorage.getItem(key);if(v)ta.value=v;}catch(e){}}
    ta.addEventListener('input',function(){
      clearTimeout(_timers[st.id]);
      _timers[st.id]=setTimeout(function(){
        if(window.storage){window.storage.set(key,ta.value,false).catch(function(){});}
        else{try{localStorage.setItem(key,ta.value);}catch(e){}}
      },600);
    });
  })(stations[i]);}
};
RE.clearAll = function(prefix,stations){
  if(!confirm('Clear all written entries for this cycle? This cannot be undone.'))return;
  for(var i=0;i<stations.length;i++){
    var ta=document.getElementById('ta-'+stations[i].id);
    if(ta)ta.value='';
    var key=prefix+stations[i].id;
    if(window.storage){window.storage.delete(key,false).catch(function(){});}
    else{try{localStorage.removeItem(key);}catch(e){}}
  }
};
})();
