(function(){
  "use strict";

  /* ================= CONFIG ================= */
  var COLORS = ['heart','brain','gut','bone'];
  var COLOR_LABEL = {heart:'Corazón', brain:'Cerebro', gut:'Estómago', bone:'Hueso'};
  var HAND_SIZE = 3;
  var TREATMENT_META = {
    contagio:  {title:'Contagio', desc:'Pasa tus virus a órganos rivales sanos del mismo color.'},
    transplante:{title:'Trasplante', desc:'Cambia uno de tus órganos por el de un rival (mismo color, no inmunes).'},
    ladron:    {title:'Ladrón de Órganos', desc:'Roba un órgano sano de un rival que tú no tengas.'},
    guante:    {title:'Guante de Látex', desc:'Todos los rivales descartan su mano entera.'},
    error:     {title:'Error Médico', desc:'Intercambia tu cuerpo entero con el de un rival.'}
  };
  var BOT_NAMES = ['Dr. Patógeno','Dra. Antígena','Dr. Bacilo','Dra. Espora'];

  /* ================= ICONS ================= */
  function svgWrap(inner){ return '<svg viewBox="0 0 24 24" fill="none">'+inner+'</svg>'; }
  var ORGAN_PATHS = {
    heart: '<path d="M12 20.2s-7.1-4.4-9.3-8.6C1.2 8.4 2.6 5 5.8 5c1.9 0 3.3 1.1 3.9 2.3.3.6 1.6.6 1.9 0C12.2 6.1 13.6 5 15.5 5c3.2 0 4.6 3.4 3.1 6.6-2.2 4.2-9.3 8.6-9.3 8.6z" fill="currentColor"/>',
    brain: '<path d="M9 4.3C7.1 4.1 5.4 5.5 5.3 7.3c0 .5.1.9.2 1.3C4.2 9.2 3.3 10.4 3.3 12c0 1.4.7 2.6 1.9 3.3-.1.3-.1.6-.1.9 0 2.1 1.8 3.7 3.9 3.6.6.9 1.6 1.5 2.8 1.5 1.8 0 3.3-1.4 3.3-3.2V7.6c0-1.7-1.4-3-3.1-3-.9 0-1.6.4-2.1.9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12 6.4v13.9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    gut: '<path d="M6.2 5.2C4.4 5.2 3 6.6 3 8.4c0 1.2.6 2.2 1.6 2.8-1 .5-1.6 1.5-1.6 2.7 0 1.8 1.4 3.2 3.1 3.2.6 1.8 2.3 3.1 4.3 3.1 3.3 0 5.6-2.7 5.6-6.6 0-4.2-1.7-8.4-5.7-8.4-1.4 0-2.7 0-4.1 0z" fill="currentColor"/>',
    bone: '<rect x="5" y="10.5" width="14" height="3.2" rx="1.6" fill="currentColor"/><circle cx="6.4" cy="8.6" r="2.3" fill="currentColor"/><circle cx="6.4" cy="15.4" r="2.3" fill="currentColor"/><circle cx="17.6" cy="8.6" r="2.3" fill="currentColor"/><circle cx="17.6" cy="15.4" r="2.3" fill="currentColor"/>'
  };
  function organIcon(color){ return svgWrap(ORGAN_PATHS[color]); }
  var VIRUS_INNER = '<circle cx="12" cy="12" r="5.6" fill="currentColor"/>' +
    ['19,12,22.3,12','16.9,16.9,19.3,19.3','12,19,12,22.3','7.1,16.9,4.7,19.3','5,12,1.7,12','7.1,7.1,4.7,4.7','12,5,12,1.7','16.9,7.1,19.3,4.7']
      .map(function(s){ var p=s.split(','); return '<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+p[2]+'" y2="'+p[3]+'" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="'+p[2]+'" cy="'+p[3]+'" r="1.3" fill="currentColor"/>'; }).join('');
  function virusIcon(){ return svgWrap(VIRUS_INNER); }
  function medicineIcon(){
    return svgWrap('<circle cx="12" cy="12" r="8.6" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="7.2" x2="12" y2="16.8" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><line x1="7.2" y1="12" x2="16.8" y2="12" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>');
  }
  var TREATMENT_ICONS = {
    contagio: svgWrap('<path d="M6 8.2A6.2 6.2 0 0 1 16.3 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" fill="none"/><path d="M15.7 3.4l2 2.6-2.8.9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M18 15.8a6.2 6.2 0 0 1-10.3 3.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" fill="none"/><path d="M8.3 20.6l-2-2.6 2.8-.9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
    transplante: svgWrap('<path d="M4 8h13" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M13.2 4.4l4 3.6-4 3.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M20 16H7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M10.8 19.6l-4-3.6 4-3.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
    ladron: svgWrap('<rect x="4" y="13.2" width="7" height="6.8" rx="1.4" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M14.2 4v9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M11 10l3.2 3 3.2-3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
    guante: svgWrap('<path d="M8 21v-9.4a2.6 2.6 0 0 1 5.2 0v2.6M8 13.6V6.4a1.9 1.9 0 0 1 3.8 0v5.4M11.8 11.4V5.2a1.9 1.9 0 0 1 3.8 0v7.6M15.6 12.2V8.6a1.9 1.9 0 0 1 3 0v7.6a5 5 0 0 1-5 5h-3.4a5 5 0 0 1-4-2l-2-2.8 1.2-1.1 2.6 1.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
    error: svgWrap('<path d="M12 3.4L21.5 20H2.5z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" fill="none"/><line x1="12" y1="9.4" x2="12" y2="14.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1.15" fill="currentColor"/>')
  };
  var DECK_ICON = svgWrap('<path d="M7 4h7l4 4v12H7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/><path d="M14 4v4h4" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/><path d="M9.5 13a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.8-1.1 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="19.1" r=".9" fill="currentColor"/>');

  /* ================= DECK ================= */
  function shuffle(arr){
    for(var i=arr.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=arr[i]; arr[i]=arr[j]; arr[j]=t; }
    return arr;
  }
  function buildDeck(){
    var deck=[]; var id=0;
    COLORS.forEach(function(c){
      for(var i=0;i<5;i++) deck.push({id:id++, type:'organ', color:c});
      for(var i=0;i<4;i++) deck.push({id:id++, type:'virus', color:c});
      for(var i=0;i<4;i++) deck.push({id:id++, type:'medicine', color:c});
    });
    deck.push({id:id++, type:'organ', color:'wild'});
    deck.push({id:id++, type:'virus', color:'wild'});
    deck.push({id:id++, type:'medicine', color:'wild'});
    [['contagio',2],['transplante',3],['ladron',3],['guante',2],['error',3]].forEach(function(pair){
      for(var i=0;i<pair[1];i++) deck.push({id:id++, type:'treatment', kind:pair[0]});
    });
    return shuffle(deck);
  }

  /* ================= GLOBAL STATE ================= */
  var state = null;
  var GAME_MODE = 'local';   // 'local' | 'online'
  var MY_ID = 'human';
  var MY_NAME = 'Tú';
  var winShown = false;

  function newPlayer(id, name, isBot){
    var board={}; COLORS.forEach(function(c){ board[c]=null; });
    return {id:id, name:name, isBot:!!isBot, hand:[], board:board};
  }
  function me(){ return state.players.find(function(p){ return p.id===MY_ID; }); }
  function currentPlayer(){ return state.players[state.turn]; }
  function isHumanTurn(){ return !!state && !state.over && currentPlayer().id===MY_ID; }
  function opponentsOf(p){ return state.players.filter(function(o){ return o.id!==p.id; }); }

  function drawOne(player){
    if(state.deck.length===0){
      if(state.discard.length===0) return false;
      state.deck = shuffle(state.discard.splice(0));
      addLog('El mazo se recicla desde el descarte.');
    }
    player.hand.push(state.deck.pop());
    return true;
  }
  function drawToHand(player){
    while(player.hand.length<HAND_SIZE){ if(!drawOne(player)) break; }
  }
  function removeFromHand(player, card){
    var idx = player.hand.findIndex(function(c){ return c.id===card.id; });
    if(idx>-1) player.hand.splice(idx,1);
  }
  function addLog(msg){
    state.log.unshift(msg);
    if(state.log.length>40) state.log.length=40;
  }

  /* ================= RULE HELPERS ================= */
  function getValidTargets(actor, card){
    if(card.type==='organ'){
      return COLORS.filter(function(c){ return !actor.board[c] && (card.color==='wild' || card.color===c); })
        .map(function(c){ return {playerId:actor.id, slot:c}; });
    }
    if(card.type==='medicine'){
      return COLORS.filter(function(c){
        var s=actor.board[c];
        if(!s || s.status==='immune') return false;
        return card.color==='wild' || s.color===card.color;
      }).map(function(c){ return {playerId:actor.id, slot:c}; });
    }
    if(card.type==='virus'){
      var out=[];
      opponentsOf(actor).forEach(function(p){
        COLORS.forEach(function(c){
          var s=p.board[c];
          if(!s || s.status==='immune') return;
          if(card.color==='wild' || s.color===card.color) out.push({playerId:p.id, slot:c});
        });
      });
      return out;
    }
    return [];
  }
  function contagionHasEffect(player){
    return COLORS.some(function(c){
      var s=player.board[c];
      if(!s || s.status!=='infected') return false;
      return opponentsOf(player).some(function(p){ var t=p.board[c]; return t && t.status==='healthy'; });
    });
  }
  function boardStrength(p){
    var v=0; COLORS.forEach(function(c){ var s=p.board[c]; if(s){ v += s.status==='immune'?2:(s.status==='infected'?0:1); } });
    return v;
  }
  function getTreatmentOptions(actor, card){
    var opps = opponentsOf(actor);
    if(card.kind==='guante') return [{label:'Todos los rivales descartan su mano', choice:{}}];
    if(card.kind==='contagio') return contagionHasEffect(actor) ? [{label:'Contagiar tus virus a rivales sanos', choice:{}}] : [];
    if(card.kind==='error') return opps.map(function(o){ return {label:'Intercambiar tu cuerpo entero con '+o.name, choice:{playerId:o.id}}; });
    if(card.kind==='ladron'){
      var out=[];
      opps.forEach(function(o){ COLORS.forEach(function(c){
        if(o.board[c] && o.board[c].status!=='infected' && o.board[c].status!=='immune' && !actor.board[c]) out.push({label:'Robar '+COLOR_LABEL[c]+' ('+statusLabel(o.board[c].status)+') de '+o.name, choice:{playerId:o.id, color:c}});
      }); });
      return out;
    }
    if(card.kind==='transplante'){
      var out2=[];
      opps.forEach(function(o){ COLORS.forEach(function(c){
        if(o.board[c] && actor.board[c] && o.board[c].status!=='immune' && actor.board[c].status!=='immune') out2.push({label:'Cambiar tu '+COLOR_LABEL[c]+' por el de '+o.name, choice:{playerId:o.id, color:c}});
      }); });
      return out2;
    }
    return [];
  }
  function statusLabel(s){ return s==='immune'?'inmune':(s==='infected'?'infectado':'sano'); }

  /* ================= ACTIONS (mutate module `state`) ================= */
  function playCard(actor, card, target){
    removeFromHand(actor, card);
    if(card.type==='organ'){
      actor.board[target.slot] = {id: card.id, color: card.color==='wild'?target.slot:card.color, wild: card.color==='wild', status:'healthy'};
      addLog(actor.name+' coloca un órgano en '+COLOR_LABEL[target.slot]+'.');
    } else if(card.type==='medicine'){
      var s1 = actor.board[target.slot];
      if(s1.status==='healthy'){ s1.status='immune'; addLog(actor.name+' inmuniza su '+COLOR_LABEL[target.slot]+'.'); }
      else if(s1.status==='infected'){ s1.status='healthy'; addLog(actor.name+' cura su '+COLOR_LABEL[target.slot]+'.'); }
    } else if(card.type==='virus'){
      var owner = state.players.find(function(p){ return p.id===target.playerId; });
      var s2 = owner.board[target.slot];
      if(s2.status==='healthy'){ s2.status='infected'; addLog(actor.name+' infecta el '+COLOR_LABEL[target.slot]+' de '+owner.name+'.'); }
      else if(s2.status==='infected'){
        owner.board[target.slot]=null;
        /* el órgano destruido vuelve al descarte para que el mazo no se agote */
        if(s2.id!=null) state.discard.push({id:s2.id, type:'organ', color:s2.wild?'wild':s2.color});
        addLog(actor.name+' destruye el '+COLOR_LABEL[target.slot]+' de '+owner.name+'!'); }
    }
    state.discard.push(card);
  }
  function playTreatment(actor, card, choice){
    removeFromHand(actor, card);
    state.discard.push(card);
    if(card.kind==='guante'){
      opponentsOf(actor).forEach(function(p){ state.discard.push.apply(state.discard, p.hand); p.hand=[]; });
      addLog(actor.name+' usa Guante de Látex: ¡todos descartan su mano!');
    } else if(card.kind==='contagio'){
      COLORS.forEach(function(c){
        var mine = actor.board[c];
        if(mine && mine.status==='infected'){
          var target = opponentsOf(actor).find(function(p){ var t=p.board[c]; return t && t.status==='healthy'; });
          if(target){ target.board[c].status='infected'; mine.status='healthy'; addLog('Contagio: '+actor.name+' pasa el virus de '+COLOR_LABEL[c]+' a '+target.name+'.'); }
        }
      });
    } else if(card.kind==='error'){
      var opp = state.players.find(function(p){ return p.id===choice.playerId; });
      var tmp = actor.board; actor.board = opp.board; opp.board = tmp;
      addLog(actor.name+' usa Error Médico con '+opp.name+': ¡cuerpos intercambiados!');
    } else if(card.kind==='ladron'){
      var opp2 = state.players.find(function(p){ return p.id===choice.playerId; });
      actor.board[choice.color] = opp2.board[choice.color];
      opp2.board[choice.color] = null;
      addLog(actor.name+' roba el '+COLOR_LABEL[choice.color]+' de '+opp2.name+'.');
    } else if(card.kind==='transplante'){
      var opp3 = state.players.find(function(p){ return p.id===choice.playerId; });
      var t = actor.board[choice.color]; actor.board[choice.color]=opp3.board[choice.color]; opp3.board[choice.color]=t;
      addLog(actor.name+' hace un trasplante de '+COLOR_LABEL[choice.color]+' con '+opp3.name+'.');
    }
  }
  function discardAndRedraw(player, cardIds){
    cardIds.forEach(function(id){
      var idx = player.hand.findIndex(function(c){ return c.id===id; });
      if(idx>-1){ state.discard.push(player.hand[idx]); player.hand.splice(idx,1); }
    });
    for(var i=0;i<cardIds.length;i++) drawOne(player);
    addLog(player.name+' descarta '+cardIds.length+' carta(s) y roba de nuevo.');
  }
  function checkWin(p){ return COLORS.every(function(c){ return p.board[c] && p.board[c].status!=='infected'; }); }
  function checkAnyWin(){
    for(var i=0;i<state.players.length;i++){ if(checkWin(state.players[i])) return state.players[i]; }
    return null;
  }

  /* ================= LOCAL MODE TURN FLOW ================= */
  function startGameLocal(numBots){
    GAME_MODE = 'local'; MY_ID = 'human'; winShown = false; lastLogShown = null; seenCardIds = {}; discardMode = false; discardMarks = [];
    botTimer = null;
    var players = [newPlayer('human','Tú',false)];
    for(var i=0;i<numBots;i++) players.push(newPlayer('bot'+i, BOT_NAMES[i], true));
    state = { players: players, deck: buildDeck(), discard: [], turn: 0, turnCount:0, log: [], over: false, winnerId:null };
    players.forEach(function(p){ drawToHand(p); });
    addLog('La partida comienza. ¡Suerte, doctor!');
    showScreen('game');
    beginTurn();
  }
  function beginTurn(){
    var p = currentPlayer();
    drawToHand(p);
    clearSelection();
    render();
    if(state.over) return;
    if(p.isBot){
      var mySession = state;
      botTimer = setTimeout(function(){ if(state===mySession && !state.over) runBotTurn(p); }, 850);
    }
  }
  var botTimer = null;
  function advanceTurn(){
    state.turn = (state.turn+1) % state.players.length;
    state.turnCount = (state.turnCount||0)+1;
    beginTurn();
  }
  function finishHumanAction(){
    render();
    var w = checkAnyWin();
    if(w){ return showWin(w); }
    advanceTurn();
  }
  function runBotTurn(bot){
    var action = decideBotAction(bot);
    if(action.type==='play'){
      if(action.card.type==='treatment') playTreatment(bot, action.card, action.target||{});
      else playCard(bot, action.card, action.target);
    } else if(action.type==='discard'){
      discardAndRedraw(bot, action.cardIds);
    }
    render();
    var w = checkAnyWin();
    if(w) return showWin(w);
    advanceTurn();
  }

  /* ================= BOT AI (shared local + online) ================= */
  function decideBotAction(bot){
    var i, card, targets;
    for(i=0;i<bot.hand.length;i++){
      card = bot.hand[i];
      if(card.type==='organ'){
        targets = getValidTargets(bot, card);
        if(targets.length) return {type:'play', card:card, target:targets[0]};
      }
    }
    for(i=0;i<bot.hand.length;i++){
      card = bot.hand[i];
      if(card.type==='medicine'){
        targets = getValidTargets(bot, card).filter(function(t){ return bot.board[t.slot].status==='infected'; });
        if(targets.length) return {type:'play', card:card, target:targets[0]};
      }
    }
    var hasInfected = COLORS.some(function(c){ return bot.board[c] && bot.board[c].status==='infected'; });
    if(!hasInfected){
      for(i=0;i<bot.hand.length;i++){
        card = bot.hand[i];
        if(card.type==='medicine'){
          targets = getValidTargets(bot, card).filter(function(t){ return bot.board[t.slot].status==='healthy'; });
          if(targets.length) return {type:'play', card:card, target:targets[0]};
        }
      }
    }
    var ranked = opponentsOf(bot).slice().sort(function(a,b){ return boardStrength(b)-boardStrength(a); });
    for(i=0;i<bot.hand.length;i++){
      card = bot.hand[i];
      if(card.type==='virus'){
        var vt = getValidTargets(bot, card);
        for(var r=0;r<ranked.length;r++){
          var pick = vt.find(function(t){ return t.playerId===ranked[r].id; });
          if(pick) return {type:'play', card:card, target:pick};
        }
      }
    }
    for(i=0;i<bot.hand.length;i++){
      card = bot.hand[i];
      if(card.type==='treatment'){
        if(card.kind==='guante') return {type:'play', card:card, target:{}};
        if(card.kind==='contagio' && contagionHasEffect(bot)) return {type:'play', card:card, target:{}};
        if(card.kind==='error'){
          var worse = ranked.find(function(o){ return boardStrength(o) > boardStrength(bot); });
          if(worse) return {type:'play', card:card, target:{playerId:worse.id}};
        }
        if(card.kind==='ladron'){
          var opts = getTreatmentOptions(bot, card);
          if(opts.length) return {type:'play', card:card, target:opts[0].choice};
        }
        if(card.kind==='transplante'){
          var opts2 = getTreatmentOptions(bot, card).filter(function(o){
            var opp = state.players.find(function(p){ return p.id===o.choice.playerId; });
            var mine = bot.board[o.choice.color].status, theirs = opp.board[o.choice.color].status;
            var rank = {infected:0, healthy:1, immune:2};
            return rank[theirs] > rank[mine];
          });
          if(opts2.length) return {type:'play', card:card, target:opts2[0].choice};
        }
      }
    }
    var ids = bot.hand.slice(0, Math.min(3, bot.hand.length)).map(function(c){ return c.id; });
    return {type:'discard', cardIds: ids};
  }

  /* ================= UI STATE HELPERS ================= */
  var selection = {cardId:null, targets:null};
  var discardMode = false;
  var discardMarks = [];
  function clearSelection(){ selection={cardId:null, targets:null}; closeSheet(); }
  function setStatus(msg){ var el=document.getElementById('statusLine'); if(el) el.innerHTML = msg; }
  function updateStatusLine(){
    if(!state) return;
    if(state.over){ setStatus('Partida terminada.'); return; }
    if(isHumanTurn()) setStatus('Tu turno: toca una carta para jugarla, o descarta.');
    else setStatus(currentPlayer().name+' está jugando…');
  }
  var lastLogShown = null;
  var seenCardIds = {};
  function toast(msg, ms){
    var t = document.getElementById('toastEl');
    if(!t){ t=document.createElement('div'); t.id='toastEl'; t.className='toast'; t.setAttribute('role','status'); document.getElementById('app').appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function(){ t.classList.remove('show'); }, ms||1800);
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function sanitizeName(raw){
    var cleaned = String(raw||'').replace(/[<>&"']/g,'').trim().slice(0,16);
    return cleaned || 'Jugador';
  }

  /* ================= RENDER ================= */
  var TYPE_LABEL = {organ:'Órgano', virus:'Virus', medicine:'Medicina', treatment:'Acción'};
  var SHIELD_ICON = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7.5 2.8v5.6c0 4.6-3.1 8.4-7.5 9.6-4.4-1.2-7.5-5-7.5-9.6V5.8z" fill="currentColor"/><path d="M8.6 12.2l2.5 2.5 4.4-4.9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function cardColorVar(color){ return color==='wild' ? null : '--c-'+color; }
  function cardTitle(card){
    if(card.type==='organ') return card.color==='wild' ? 'Órgano comodín' : COLOR_LABEL[card.color];
    if(card.type==='virus') return 'Virus '+(card.color==='wild'?'comodín':COLOR_LABEL[card.color].toLowerCase());
    if(card.type==='medicine') return 'Medicina '+(card.color==='wild'?'comodín':COLOR_LABEL[card.color].toLowerCase());
    if(card.type==='treatment') return TREATMENT_META[card.kind].title;
  }
  function cardSub(card){
    if(card.type==='organ') return 'Colócalo en tu cuerpo';
    if(card.type==='virus') return 'Infecta un órgano rival';
    if(card.type==='medicine') return 'Cura o inmuniza tu órgano';
    if(card.type==='treatment') return TREATMENT_META[card.kind].desc;
  }
  function cardIconHTML(card){
    if(card.type==='organ') return organIcon(card.color==='wild'?'heart':card.color);
    if(card.type==='virus') return virusIcon();
    if(card.type==='medicine') return medicineIcon();
    if(card.type==='treatment') return TREATMENT_ICONS[card.kind];
  }
  function cardHTML(card, opts){
    opts = opts||{};
    var cls = ['card', card.type];
    if(card.color==='wild') cls.push('wild');
    if(opts.selected) cls.push('selected');
    if(opts.marked) cls.push('marked');
    if(opts.enter) cls.push('enter');
    var styleAttr = '';
    var v = card.type==='treatment' ? '--treatment' : cardColorVar(card.color);
    if(v) styleAttr = ' style="--card-color:var('+v+')"';
    return '<button class="'+cls.join(' ')+'" data-card-id="'+card.id+'"'+styleAttr+' aria-label="'+cardTitle(card)+'. '+cardSub(card)+'">'+
      '<div class="card-head"><div class="card-top">'+cardIconHTML(card)+'</div><span class="card-kind">'+TYPE_LABEL[card.type]+'</span></div>'+
      '<div class="card-title">'+cardTitle(card)+'</div>'+
      '<div class="card-sub">'+cardSub(card)+'</div>'+
      '</button>';
  }
  function slotHTML(owner, color, opts){
    opts=opts||{};
    var s = owner.board[color];
    var cls = ['slot'];
    if(s) cls.push('filled', s.status);
    if(opts.targetable) cls.push('targetable');
    var styleAttr = ' style="--slot-color:var(--c-'+color+')"';
    var icon = organIcon(color);
    var badge = '';
    if(s && s.status==='infected') badge = '<div class="badge virus-badge">'+virusIcon()+'</div>';
    if(s && s.status==='immune') badge = '<div class="badge immune-badge">'+SHIELD_ICON+'</div>';
    var label = COLOR_LABEL[color] + (s ? ' · '+statusLabel(s.status) : '');
    return '<button class="'+cls.join(' ')+'" data-owner="'+owner.id+'" data-slot="'+color+'"'+styleAttr+' aria-label="'+escapeHtml(owner.name)+': '+label+'">'+
      '<div class="slot-icon">'+icon+'</div>'+badge+
      '<div class="slot-label">'+COLOR_LABEL[color]+'</div>'+
      (s ? '<div class="slot-state">'+statusLabel(s.status)+'</div>' : '')+
      '</button>';
  }

  function render(){
    if(!state) return;
    renderTopbar();
    renderOpponents();
    renderPiles();
    renderMyBoard();
    renderHand();
    renderActionBar();
    updateStatusLine();
  }
  function renderTopbar(){
    var t = document.getElementById('turnIndicator');
    var p = currentPlayer();
    t.innerHTML = state.over ? 'Partida terminada' : 'Turno de <b>'+escapeHtml(p.name)+'</b>';
  }
  function renderOpponents(){
    var el = document.getElementById('opponents');
    var scrollLeft = el.scrollLeft;   /* evita que la lista salte al inicio al re-renderizar */
    var targets = (selection.cardId && isHumanTurn()) ? selection.targets||[] : [];
    el.innerHTML = opponentsOf(me()).map(function(p){
      var active = state.turn === state.players.indexOf(p) ? ' active' : '';
      var slots = COLORS.map(function(c){
        var targetable = targets.some(function(t){ return t.playerId===p.id && t.slot===c; });
        return slotHTML(p, c, {targetable:targetable});
      }).join('');
      return '<div class="oppcard'+active+'">'+
        '<div class="opphead"><div class="oppname">'+escapeHtml(p.name)+'</div><div class="opphand mono">'+p.hand.map(function(){return '<span class="cardback"></span>';}).join('')+' '+p.hand.length+'</div></div>'+
        '<div class="oppslots">'+slots+'</div>'+
      '</div>';
    }).join('');
    el.scrollLeft = scrollLeft;
  }
  function renderPiles(){
    document.getElementById('drawPile').innerHTML = DECK_ICON+'<div class="pile-count mono">'+state.deck.length+'</div>';
    document.getElementById('discardPile').innerHTML = '<div class="pile-count mono" style="font-size:.9rem;">🗑</div><div class="pile-count mono">'+state.discard.length+'</div>';
    var logEl = document.getElementById('log');
    logEl.innerHTML = state.log.slice(0,8).map(function(m,i){ return '<div class="log-line'+(i===0?' latest':'')+'">'+escapeHtml(m)+'</div>'; }).join('');
    /* avisa de lo que han hecho los demás, para no perderse jugadas rápidas de los bots */
    var latest = state.log[0];
    if(latest && latest!==lastLogShown){
      var mine = me() && latest.indexOf(me().name)===0;
      if(lastLogShown!==null && !mine && !state.over) toast(latest, 2600);
      lastLogShown = latest;
    }
  }
  function renderMyBoard(){
    var targets = (selection.cardId && isHumanTurn()) ? selection.targets||[] : [];
    var el = document.getElementById('myBoard');
    el.innerHTML = COLORS.map(function(c){
      var targetable = targets.some(function(t){ return t.playerId===me().id && t.slot===c; });
      return slotHTML(me(), c, {targetable:targetable});
    }).join('');
  }
  function renderHand(){
    var el = document.getElementById('hand');
    el.innerHTML = me().hand.map(function(card){
      var selected = selection.cardId===card.id;
      var marked = discardMarks.indexOf(card.id)>-1;
      var enter = !seenCardIds[card.id];
      seenCardIds[card.id] = true;
      return cardHTML(card, {selected:selected, marked:marked, enter:enter});
    }).join('');
  }
  function renderActionBar(){
    var canAct = isHumanTurn();
    document.getElementById('btnDiscard').hidden = !canAct;
    document.getElementById('btnDiscard').textContent = discardMode ? 'Confirmar descarte ('+discardMarks.length+')' : 'Descartar y robar';
    document.getElementById('btnCancel').hidden = !(canAct && (discardMode || selection.cardId));
    document.getElementById('btnPass').hidden = !(canAct && me().hand.length===0);
  }

  /* ================= TARGET SHEET ================= */
  function closeSheet(){ var s=document.getElementById('sheetEl'); if(s) s.remove(); }
  function openSheet(card){
    closeSheet();
    var opts = getTreatmentOptions(me(), card);
    var sheet = document.createElement('div');
    sheet.className='sheet'; sheet.id='sheetEl';
    var body = '<h3>'+TREATMENT_META[card.kind].title+'</h3>';
    if(!opts.length){
      body += '<div class="empty">No puedes usar esta carta ahora mismo.</div>';
    } else {
      body += opts.map(function(o,i){ return '<button class="opt" data-opt="'+i+'">'+escapeHtml(o.label)+'</button>'; }).join('');
    }
    body += '<button class="cancel" id="sheetCancel">Cancelar</button>';
    sheet.innerHTML = body;
    document.getElementById('screenGame').appendChild(sheet);
    sheet.querySelectorAll('.opt').forEach(function(btn){
      btn.addEventListener('click', function(){
        var opt = opts[Number(btn.dataset.opt)];
        playTreatment(me(), card, opt.choice);
        clearSelection();
        finishAction();
      });
    });
    document.getElementById('sheetCancel').addEventListener('click', function(){ clearSelection(); render(); });
  }

  /* ================= MODE-AWARE ACTION COMMIT ================= */
  function finishAction(){
    if(GAME_MODE==='online') commitOnlineAction();
    else finishHumanAction();
  }
  function commitOnlineAction(){
    state.turnCount = (state.turnCount||0)+1;
    var w = checkAnyWin();
    if(w){ state.over=true; state.winnerId=w.id; }
    else { state.turn = (state.turn+1) % state.players.length; drawToHand(currentPlayer()); }
    render();
    pushOnlineState();
  }

  /* ================= EVENT WIRING (game screen) ================= */
  function handleCardTap(cardId){
    if(!isHumanTurn()) return;
    if(discardMode){
      var idx = discardMarks.indexOf(cardId);
      if(idx>-1) discardMarks.splice(idx,1);
      else if(discardMarks.length<3) discardMarks.push(cardId);
      render();
      return;
    }
    var card = me().hand.find(function(c){ return c.id===cardId; });
    if(!card) return;
    if(selection.cardId===cardId){ clearSelection(); render(); return; }
    selection.cardId = cardId;
    if(card.type==='treatment'){
      selection.targets = null;
      render();
      openSheet(card);
    } else {
      closeSheet();
      var targets = getValidTargets(me(), card);
      if(targets.length===0){ toast('No hay objetivo válido para esta carta ahora mismo.'); clearSelection(); render(); return; }
      selection.targets = targets;
      render();
    }
  }
  function handleSlotTap(ownerId, slotColor){
    if(!isHumanTurn() || !selection.cardId) return;
    var card = me().hand.find(function(c){ return c.id===selection.cardId; });
    if(!card) return;
    var valid = (selection.targets||[]).some(function(t){ return t.playerId===ownerId && t.slot===slotColor; });
    if(!valid) return;
    playCard(me(), card, {playerId:ownerId, slot:slotColor});
    clearSelection();
    finishAction();
  }

  document.getElementById('hand').addEventListener('click', function(e){
    var c = e.target.closest('.card'); if(!c) return;
    handleCardTap(Number(c.dataset.cardId));
  });
  document.getElementById('myBoard').addEventListener('click', function(e){
    var s = e.target.closest('.slot'); if(!s) return;
    handleSlotTap(s.dataset.owner, s.dataset.slot);
  });
  document.getElementById('opponents').addEventListener('click', function(e){
    var s = e.target.closest('.slot'); if(!s) return;
    handleSlotTap(s.dataset.owner, s.dataset.slot);
  });
  document.getElementById('btnCancel').addEventListener('click', function(){
    discardMode=false; discardMarks=[]; clearSelection(); render();
  });
  document.getElementById('btnPass').addEventListener('click', function(){
    if(!isHumanTurn()) return;
    addLog(me().name+' pasa el turno (mano vacía).');
    if(GAME_MODE==='online') commitPassOnline(); else advanceTurn();
  });
  function commitPassOnline(){
    state.turnCount=(state.turnCount||0)+1;
    state.turn=(state.turn+1)%state.players.length;
    drawToHand(currentPlayer());
    render();
    pushOnlineState();
  }
  document.getElementById('btnDiscard').addEventListener('click', function(){
    if(!isHumanTurn()) return;
    if(!discardMode){
      discardMode = true; discardMarks=[]; clearSelection(); render();
      setStatus('Elige de 1 a 3 cartas para descartar, luego confirma.');
      return;
    }
    if(discardMarks.length===0){ toast('Selecciona al menos una carta.'); return; }
    var ids = discardMarks.slice();
    discardMode=false; discardMarks=[];
    discardAndRedraw(me(), ids);
    finishAction();
  });
  document.getElementById('btnHelp').addEventListener('click', showHelp);

  function showHelp(){
    var root = document.getElementById('overlayRoot');
    root.innerHTML = '<div class="overlay" id="helpOverlay"><div class="modal">'+
      '<h3>Reglas rápidas</h3>'+
      '<ul>'+
      '<li><b>Órgano:</b> colócalo en un hueco vacío de tu color (o cualquiera si es comodín).</li>'+
      '<li><b>Virus:</b> infecta un órgano rival sano de ese color; un segundo virus lo destruye. No afecta órganos inmunes.</li>'+
      '<li><b>Medicina:</b> cura tu órgano infectado, o inmuniza uno sano. No afecta órganos ya inmunes.</li>'+
      '<li><b>Tratamientos:</b> Contagio, Trasplante, Ladrón de Órganos, Guante de Látex y Error Médico alteran el tablero — lee cada carta.</li>'+
      '<li>Ganas con <b>4 órganos de colores distintos</b>, todos sanos o inmunes (ninguno infectado).</li>'+
      '</ul>'+
      '<button id="helpClose">Entendido</button>'+
      '<button id="helpLeave" class="modal-secondary">Abandonar partida</button>'+
      '</div></div>';
    document.getElementById('helpClose').addEventListener('click', function(){ root.innerHTML=''; });
    document.getElementById('helpLeave').addEventListener('click', function(){
      if(!window.confirm('¿Abandonar la partida?')) return;
      root.innerHTML='';
      clearTimeout(botTimer);
      clearSelection(); discardMode=false; discardMarks=[];
      leaveOnlineRoomSilently(true);
      state = null;
      goToSetup();
    });
    document.getElementById('helpOverlay').addEventListener('click', function(e){ if(e.target.id==='helpOverlay') root.innerHTML=''; });
  }

  function showWin(winner){
    state.over = true;
    render();
    var tEl = document.getElementById('toastEl'); if(tEl) tEl.classList.remove('show');
    var root = document.getElementById('overlayRoot');
    var iWon = winner.id===MY_ID;
    var msg = iWon ? '¡Has completado un cuerpo sano antes que nadie!' : escapeHtml(winner.name)+' ha completado su cuerpo primero.';
    root.innerHTML = '<div class="overlay"><div class="modal win-modal">'+
      '<div class="confetti"><span></span><span></span><span></span><span></span></div>'+
      '<h2>'+(iWon ? '¡Ganaste!' : escapeHtml(winner.name)+' gana') +'</h2>'+
      '<p>'+msg+'</p>'+
      '<button id="playAgain">Jugar otra vez</button>'+
      '</div></div>';
    document.getElementById('playAgain').addEventListener('click', function(){
      root.innerHTML='';
      leaveOnlineRoomSilently(true);
      goToSetup();
    });
  }

  /* ================= SCREEN SWITCHING ================= */
  function showScreen(name){
    document.getElementById('screenSetup').hidden = name!=='setup';
    document.getElementById('screenLobby').hidden = name!=='lobby';
    document.getElementById('screenGame').hidden = name!=='game';
  }
  function goToSetup(){ showScreen('setup'); }

  /* ================= SETUP SCREEN WIRING ================= */
  document.getElementById('setupGlyphs').innerHTML = COLORS.map(function(c){
    return '<div class="g" style="--gc:var(--c-'+c+')">'+organIcon(c)+'</div>';
  }).join('');
  document.getElementById('brandIcon').innerHTML = virusIcon();

  document.getElementById('modeSelect').addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    Array.from(document.querySelectorAll('#modeSelect button')).forEach(function(x){ x.classList.toggle('active', x===b); });
    var mode = b.dataset.mode;
    document.getElementById('localOptions').hidden = mode!=='local';
    document.getElementById('onlineOptions').hidden = mode!=='online';
  });

  var chosenOpponents = 1;
  document.getElementById('oppSelect').addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    chosenOpponents = Number(b.dataset.n);
    Array.from(document.querySelectorAll('#oppSelect button')).forEach(function(x){ x.classList.toggle('active', x===b); });
  });
  document.getElementById('btnStartLocal').addEventListener('click', function(){
    startGameLocal(chosenOpponents);
  });

  var savedName = localStorage.getItem('anticuerpos_name');
  if(savedName) document.getElementById('nameInput').value = savedName;

  document.getElementById('btnShowJoin').addEventListener('click', function(){
    document.getElementById('joinRow').hidden = false;
  });
  document.getElementById('codeInput').addEventListener('input', function(e){
    e.target.value = e.target.value.toUpperCase();
  });
  document.getElementById('btnCreateRoom').addEventListener('click', createOnlineRoom);
  document.getElementById('btnJoinRoom').addEventListener('click', joinOnlineRoom);
  document.getElementById('btnLeaveLobby').addEventListener('click', function(){
    leaveOnlineRoomSilently(true);
    goToSetup();
  });

  function onlineHint(msg, isError){
    var el = document.getElementById('onlineHint');
    el.textContent = msg||'';
    el.classList.toggle('error', !!isError);
  }

  /* ================= FIREBASE / ONLINE ================= */
  var fbDb = null;
  var onlineRoomCode = null;
  var onlineRoomRef = null;
  var onlineUnsub = null;
  var isOnlineHost = false;
  var hostBotScheduledTurn = -1;

  function ensureFirebase(){
    if(fbDb) return fbDb;
    if(typeof firebase==='undefined') return null;
    var cfg = window.FIREBASE_CONFIG;
    if(!cfg || !cfg.apiKey || cfg.apiKey.indexOf('TU_')===0){ return null; }
    try{
      if(!firebase.apps || !firebase.apps.length) firebase.initializeApp(cfg);
      fbDb = firebase.firestore();
      return fbDb;
    }catch(e){ console.error(e); return null; }
  }
  /* La identidad del jugador es su usuario anónimo de Firebase Auth: las reglas de
     Firestore la usan para saber quién es el anfitrión, quién está sentado y de quién es el turno. */
  var authPromise = null;
  function ensureAuth(){
    if(authPromise) return authPromise;
    authPromise = new Promise(function(resolve, reject){
      if(typeof firebase==='undefined' || !firebase.auth){ reject(new Error('Firebase Auth no está cargado')); return; }
      var unsub = firebase.auth().onAuthStateChanged(function(user){
        if(user){ unsub(); resolve(user.uid); }
        else firebase.auth().signInAnonymously().catch(reject);
      }, reject);
    });
    authPromise.catch(function(){ authPromise = null; });
    return authPromise;
  }
  function generateRoomCode(){
    var alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var s='';
    for(var i=0;i<4;i++) s += alphabet[Math.floor(Math.random()*alphabet.length)];
    return s;
  }

  function createOnlineRoom(){
    var db = ensureFirebase();
    if(!db){ onlineHint('El online todavía no está configurado (falta firebase-config.js). Mira las instrucciones del proyecto.', true); return; }
    MY_NAME = sanitizeName(document.getElementById('nameInput').value);
    localStorage.setItem('anticuerpos_name', MY_NAME);
    var code = generateRoomCode();
    onlineHint('Creando sala…');
    ensureAuth().then(function(uid){
      MY_ID = uid;
      onlineRoomRef = db.collection('rooms').doc(code);
      return onlineRoomRef.set({
        status:'lobby', hostId:MY_ID,
        seats:[{clientId:MY_ID, name:MY_NAME, isBot:false}],
        uids:[MY_ID],
        createdAt: Date.now()
      });
    }).then(function(){
      onlineRoomCode = code;
      isOnlineHost = true;
      localStorage.setItem('anticuerpos_room', code);
      onlineHint('');
      enterLobby();
    }).catch(function(err){ onlineHint('No se pudo crear la sala: '+err.message, true); });
  }

  function joinOnlineRoom(){
    var db = ensureFirebase();
    if(!db){ onlineHint('El online todavía no está configurado (falta firebase-config.js). Mira las instrucciones del proyecto.', true); return; }
    var code = (document.getElementById('codeInput').value||'').trim().toUpperCase();
    if(code.length!==4){ onlineHint('Escribe el código de 4 letras/números.', true); return; }
    MY_NAME = sanitizeName(document.getElementById('nameInput').value);
    localStorage.setItem('anticuerpos_name', MY_NAME);
    var ref = db.collection('rooms').doc(code);
    onlineHint('Entrando a la sala…');
    ensureAuth().then(function(uid){
      MY_ID = uid;
      return db.runTransaction(function(tx){
        return tx.get(ref).then(function(snap){
          if(!snap.exists) throw new Error('NOT_FOUND');
          var data = snap.data();
          var seats = data.seats||[];
          var already = seats.some(function(s){ return s.clientId===MY_ID; });
          /* quien ya estaba sentado puede volver a entrar aunque la partida haya empezado */
          if(data.status!=='lobby' && !already) throw new Error('STARTED');
          if(!already){
            if(seats.length>=5) throw new Error('FULL');
            seats = seats.concat([{clientId:MY_ID, name:MY_NAME, isBot:false}]);
            tx.update(ref, {seats:seats, uids:(data.uids||[]).concat([MY_ID])});
          }
          isOnlineHost = data.hostId===MY_ID;
        });
      });
    }).then(function(){
      onlineRoomCode = code;
      onlineRoomRef = ref;
      localStorage.setItem('anticuerpos_room', code);
      onlineHint('');
      enterLobby();
    }).catch(function(err){
      var m = err && err.message;
      var msg = m==='NOT_FOUND' ? 'No existe ninguna sala con ese código.'
        : m==='STARTED' ? 'Esa partida ya ha empezado.'
        : m==='FULL' ? 'La sala ya está llena (máximo 5).'
        : 'No se pudo entrar a la sala: '+m;
      onlineHint(msg, true);
    });
  }

  function enterLobby(){
    winShown = false; lastLogShown = null; seenCardIds = {};
    showScreen('lobby');
    if(onlineUnsub) onlineUnsub();
    onlineUnsub = onlineRoomRef.onSnapshot(function(snap){
      if(!snap.exists){
        document.getElementById('overlayRoot').innerHTML='';
        toast('La sala ha sido cerrada.'); leaveOnlineRoomSilently(); goToSetup(); return;
      }
      var data = snap.data();
      if(data.status==='lobby'){
        renderLobby(data);
      } else if(data.status==='playing' || data.status==='over'){
        GAME_MODE = 'online';
        isOnlineHost = data.hostId===MY_ID;
        state = data.gameState;
        showScreen('game');
        render();
        if(data.status==='over' && !winShown){
          winShown = true;
          var w = state.players.find(function(p){ return p.id===state.winnerId; });
          if(w) showWin(w);
        }
        if(!state.over && isOnlineHost) maybeRunHostBotTurn();
      }
    }, function(err){ toast('Conexión perdida: '+err.message); });
  }

  function renderLobby(data){
    document.getElementById('roomCodeDisplay').textContent = onlineRoomCode;
    isOnlineHost = data.hostId===MY_ID;
    var seats = data.seats||[];
    if(!seats.some(function(s){ return s.clientId===MY_ID; })){
      toast('El anfitrión te ha sacado de la sala.');
      leaveOnlineRoomSilently(); goToSetup();
      return;
    }
    document.getElementById('seatsList').innerHTML = seats.map(function(s){
      var isHost = s.clientId===data.hostId;
      var canRemove = isOnlineHost && !isHost;
      return '<div class="seat-row">'+
        '<span class="seat-name">'+escapeHtml(s.name)+(isHost?' <b class="host-badge">Anfitrión</b>':'')+(s.isBot?' <b class="bot-badge">CPU</b>':'')+'</span>'+
        (canRemove? '<button class="seat-remove" data-id="'+s.clientId+'">✕</button>' : '')+
      '</div>';
    }).join('');
    document.getElementById('lobbyHostActions').hidden = !isOnlineHost;
    document.getElementById('lobbyWaitingMsg').hidden = isOnlineHost;
    document.getElementById('btnStartOnline').disabled = seats.length<2;
    document.getElementById('btnAddBot').disabled = seats.length>=5;
  }

  document.getElementById('seatsList').addEventListener('click', function(e){
    var btn = e.target.closest('.seat-remove'); if(!btn || !onlineRoomRef) return;
    var idToRemove = btn.dataset.id;
    onlineRoomRef.get().then(function(snap){
      if(!snap.exists) return;
      var data = snap.data();
      var seats = (data.seats||[]).filter(function(s){ return s.clientId!==idToRemove; });
      var uids = (data.uids||[]).filter(function(u){ return u!==idToRemove; });
      return onlineRoomRef.update({seats:seats, uids:uids});
    });
  });
  document.getElementById('btnAddBot').addEventListener('click', function(){
    if(!onlineRoomRef) return;
    onlineRoomRef.get().then(function(snap){
      if(!snap.exists) return;
      var data = snap.data();
      var seats = data.seats||[];
      if(seats.length>=5) return;
      var botNum = seats.filter(function(s){ return s.isBot; }).length+1;
      seats = seats.concat([{clientId:'bot_'+Date.now()+'_'+botNum, name:(BOT_NAMES[(botNum-1)%BOT_NAMES.length]||('CPU '+botNum)), isBot:true}]);
      return onlineRoomRef.update({seats:seats});
    });
  });
  document.getElementById('btnStartOnline').addEventListener('click', function(){
    if(!onlineRoomRef) return;
    onlineRoomRef.get().then(function(snap){
      if(!snap.exists) return;
      var data = snap.data();
      var seats = data.seats||[];
      if(seats.length<2) return;
      var players = seats.map(function(s){
        var board={}; COLORS.forEach(function(c){ board[c]=null; });
        return {id:s.clientId, name:s.name, isBot:!!s.isBot, hand:[], board:board};
      });
      var deck = buildDeck();
      players.forEach(function(p){
        while(p.hand.length<HAND_SIZE){ if(deck.length===0) break; p.hand.push(deck.pop()); }
      });
      var gs = { players:players, deck:deck, discard:[], turn:0, turnCount:0, log:['La partida comienza. ¡Suerte, doctor!'], over:false, winnerId:null };
      return onlineRoomRef.update({status:'playing', gameState: gs});
    });
  });

  function leaveOnlineRoomSilently(removeFromSeats){
    if(onlineUnsub){ onlineUnsub(); onlineUnsub=null; }
    if(removeFromSeats && onlineRoomRef){
      var ref = onlineRoomRef;
      ref.get().then(function(snap){
        if(!snap.exists) return;
        var data = snap.data();
        /* si se va el anfitrión la sala se cierra, empezada o no: sin él nadie podría seguir */
        if(data.hostId===MY_ID) return ref.delete();
        if(data.status!=='lobby') return;
        var seats=(data.seats||[]).filter(function(s){ return s.clientId!==MY_ID; });
        var uids=(data.uids||[]).filter(function(u){ return u!==MY_ID; });
        return ref.update({seats:seats, uids:uids});
      }).catch(function(){});
    }
    localStorage.removeItem('anticuerpos_room');
    onlineRoomRef=null; onlineRoomCode=null; hostBotScheduledTurn=-1;
  }

  function pushOnlineState(){
    if(!onlineRoomRef) return;
    var snapshot = JSON.parse(JSON.stringify(state));
    onlineRoomRef.update({ gameState: snapshot, status: state.over?'over':'playing' })
      .catch(function(err){ toast('No se pudo sincronizar: '+err.message); });
  }

  function maybeRunHostBotTurn(){
    var cp = currentPlayer();
    if(!cp || !cp.isBot) return;
    if(hostBotScheduledTurn===state.turnCount) return;
    hostBotScheduledTurn = state.turnCount;
    var expectedTurnCount = state.turnCount;
    setTimeout(function(){
      if(!state || state.over || state.turnCount!==expectedTurnCount) return;
      var bot = currentPlayer();
      if(!bot.isBot) return;
      var action = decideBotAction(bot);
      if(action.type==='play'){
        if(action.card.type==='treatment') playTreatment(bot, action.card, action.target||{});
        else playCard(bot, action.card, action.target);
      } else {
        discardAndRedraw(bot, action.cardIds);
      }
      state.turnCount = (state.turnCount||0)+1;
      var w = checkAnyWin();
      if(w){ state.over=true; state.winnerId=w.id; }
      else { state.turn=(state.turn+1)%state.players.length; drawToHand(currentPlayer()); }
      render();
      pushOnlineState();
    }, 900);
  }

  /* ================= AUTO-REJOIN ================= */
  function tryAutoRejoin(){
    var db = ensureFirebase();
    if(!db) return;
    var savedRoom = localStorage.getItem('anticuerpos_room');
    if(!savedRoom) return;
    ensureAuth().then(function(uid){
      MY_ID = uid;
      onlineRoomCode = savedRoom;
      onlineRoomRef = db.collection('rooms').doc(savedRoom);
      return onlineRoomRef.get();
    }).then(function(snap){
      if(!snap.exists){ localStorage.removeItem('anticuerpos_room'); onlineRoomRef=null; return; }
      var data = snap.data();
      var roster = data.seats || (data.gameState && data.gameState.players) || [];
      var stillIn = roster.some(function(s){ return (s.clientId||s.id)===MY_ID; });
      if(!stillIn){ localStorage.removeItem('anticuerpos_room'); onlineRoomRef=null; return; }
      var savedName = localStorage.getItem('anticuerpos_name');
      if(savedName) MY_NAME = savedName;
      enterLobby();
    }).catch(function(){});
  }
  tryAutoRejoin();

})();
