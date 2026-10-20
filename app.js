(function(){
  "use strict";

  /* ================= CONFIG ================= */
  var COLORS = ['heart','brain','lung','kidney'];
  var HAND_SIZE = 3;
  /* Textos: ver i18n.js (T = traduce al idioma actual) */
  function colorLabel(c){ return T('color.'+c); }
  function treatmentTitle(kind){ return T('tr.'+kind+'.title'); }
  function treatmentDesc(kind){ return T('tr.'+kind+'.desc'); }
  function botNames(){ return T('bots').split('|'); }

  /* ================= ICONS ================= */
  function svgWrap(inner){ return '<svg viewBox="0 0 24 24" fill="none">'+inner+'</svg>'; }
  var ORGAN_PATHS = {
    /* cuerpo en currentColor + luces (.hl) y sombras (.sh) definidas en styles.css */
    heart: '<path d="M9.4 6.2V3.6c0-.9.6-1.5 1.5-1.5M14.4 6V3.4c0-.8.5-1.3 1.3-1.3h1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>'+
      '<path d="M12 21.4s-8.3-5.1-10.3-10C.5 8 2.4 4.6 6.1 4.6c2.2 0 3.8 1.1 4.5 2.5.3.5.8.5 1.1 0 .7-1.4 2.3-2.5 4.5-2.5 3.7 0 5.6 3.4 4.4 6.8-2 4.9-10.6 10-10.6 10z" fill="currentColor"/>'+
      '<path class="sh" d="M12 21.4s6.2-3.8 9-8.2c-2.2 1.8-5.2 2-6.9 4.2-1 1.3-1.6 2.7-2.1 4z"/>'+
      '<ellipse class="hl" cx="6.6" cy="9.2" rx="1.6" ry="2.6" transform="rotate(28 6.6 9.2)"/>',
    brain: '<path d="M8.6 3.6C6.6 3.4 5 4.9 4.9 6.8 3.4 7.5 2.5 9 2.8 10.6 1.8 11.4 1.4 12.8 1.9 14c.4 1 1.2 1.6 2.2 1.8.2 1.8 1.8 3.2 3.6 3.1.5 1.2 1.7 2 3 2h2.6c1.3 0 2.5-.8 3-2 1.8.1 3.4-1.3 3.6-3.1 1-.2 1.8-.8 2.2-1.8.5-1.2.1-2.6-.9-3.4.3-1.6-.6-3.1-2.1-3.8-.1-1.9-1.7-3.4-3.7-3.2C14.9 3.1 13.7 2.5 12.4 2.5c-1.4 0-2.6.5-3.8 1.1z" transform="translate(-.2 .4)" fill="currentColor"/>'+
      '<path class="shl" d="M12 5.4v14.2M7.2 10c1.5 0 2.5.9 2.6 2.2M16.8 10c-1.5 0-2.5.9-2.6 2.2M6.6 15c1.6 0 2.8-.7 3.3-1.9M17.4 15c-1.6 0-2.8-.7-3.3-1.9M8.4 6.6c.2 1 .9 1.7 1.9 1.9M15.6 6.6c-.2 1-.9 1.7-1.9 1.9"/>'+
      '<ellipse class="hl" cx="6.4" cy="8.4" rx="1.3" ry="1.9" transform="rotate(20 6.4 8.4)"/>',
    lung: '<rect x="10.9" y="2.2" width="2.2" height="9.2" rx="1.1" fill="currentColor"/>'+
      '<path d="M10.2 9.8C7.4 8.8 4.2 11.6 3.3 15.8c-.6 2.8.3 5 2.6 5.3 2 .2 3.6-.8 4.6-2.7.5-.9.6-2 .6-3.2v-3.9c0-.8-.6-1.4-1.4-1.6z" fill="currentColor"/>'+
      '<path d="M13.8 9.8c2.8-1 6 1.8 6.9 6 .6 2.8-.3 5-2.6 5.3-2 .2-3.6-.8-4.6-2.7-.5-.9-.6-2-.6-3.2v-3.9c0-.8.6-1.4 1.4-1.6z" fill="currentColor"/>'+
      '<path class="sh" d="M10.7 14.4c0 1.2-.1 2.3-.6 3.2-.7 1.3-1.7 2.2-2.9 2.6.9.4 2 .5 3 .1 1.2-.5 2-1.4 2.5-2.4z"/>'+
      '<path class="shl" d="M12 11.4v2.2M12 13.2l-3 2.4M12 13.2l3 2.4M9.2 15.6l-1.6 2.2M14.8 15.6l1.6 2.2"/>'+
      '<ellipse class="hl" cx="6.2" cy="14.4" rx="1.1" ry="2.5" transform="rotate(14 6.2 14.4)"/>',
    kidney: '<path d="M9.2 11.4L5 9.2M9.2 14.2l-3.8 2.4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>'+
      '<path d="M14.4 2.8c4.2 0 6.8 3.1 6.8 7.8 0 5.6-3.9 10.6-8.4 10.6-2.9 0-4.6-2-3.9-4.6.4-1.8 2-2.7 2-4.4 0-1.6-1.6-2.6-2-4.2C8.3 5.1 10.6 2.8 14.4 2.8z" fill="currentColor"/>'+
      '<path class="sh" d="M21.2 10.6c0 5.6-3.9 10.6-8.4 10.6-1.3 0-2.4-.4-3.1-1.1.9.8 2 1.2 3.4 1.2 4.5 0 8.2-4.5 8.2-9.8 0-.3 0-.6-.1-.9z"/>'+
      '<path class="shl" d="M13.4 7.4c2 .7 3.2 2.4 3.3 4.6M12.6 16.6c2.1-.3 3.7-1.5 4.4-3.4"/>'+
      '<ellipse class="hl" cx="11.6" cy="6.1" rx="1.2" ry="2.1" transform="rotate(30 11.6 6.1)"/>'
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
    contagio: svgWrap('<path d="M12 12L5.6 6.2M12 12l6.6-5.8M12 12v8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/><circle cx="12" cy="12" r="3.4" fill="currentColor"/><circle cx="5" cy="5.6" r="2.2" fill="currentColor"/><circle cx="19" cy="5.6" r="2.2" fill="currentColor"/><circle cx="12" cy="20.4" r="2.2" fill="currentColor"/>'),
    transplante: svgWrap('<path d="M4 8h13" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M13.2 4.4l4 3.6-4 3.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M20 16H7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M10.8 19.6l-4-3.6 4-3.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
    ladron: svgWrap('<rect x="4" y="13.2" width="7" height="6.8" rx="1.4" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M14.2 4v9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M11 10l3.2 3 3.2-3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
    guante: svgWrap('<circle cx="12" cy="12" r="8.4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6.2 17.8L17.8 6.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/>'),
    error: svgWrap('<path d="M8 3c0 4.4 8 5.6 8 9s-8 4.6-8 9M16 3c0 4.4-8 5.6-8 9s8 4.6 8 9" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" fill="none"/><path d="M9.2 6.4h5.6M9.2 17.6h5.6M8.6 12h6.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>')
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
  var MY_NAME = T('you');
  var winShown = false;

  function newPlayer(id, name, isBot){
    var board={}; COLORS.forEach(function(c){ board[c]=null; });
    return {id:id, name:name, isBot:!!isBot, hand:[], board:board};
  }
  function me(){ return state.players.find(function(p){ return p.id===MY_ID; }); }
  function currentPlayer(){ return state.players[state.turn]; }
  /* mientras haya víctimas de un Guante de Látex descartando su mano (solo online), nadie juega */
  function glovePending(){ return !!state && !!state.gloveFor && state.gloveFor.length>0; }
  function isHumanTurn(){ return !!state && !state.over && !glovePending() && currentPlayer().id===MY_ID; }
  function opponentsOf(p){ return state.players.filter(function(o){ return o.id!==p.id; }); }

  function drawOne(player){
    if(state.deck.length===0){
      if(state.discard.length===0) return false;
      state.deck = shuffle(state.discard.splice(0));
      addLog('deckRecycled');
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
  /* El registro se guarda como datos ({k:clave, p:parámetros}) y cada jugador lo ve en SU idioma.
     Los parámetros: a = quien actúa, o = otro jugador, c = color del órgano (código), n = número. */
  function addLog(key, params){
    state.log.unshift({k:key, p:params||{}});
    if(state.log.length>40) state.log.length=40;
  }
  function logText(entry){
    if(typeof entry==='string') return entry;   /* mensajes de versiones anteriores */
    var p = {}; for(var k in (entry.p||{})) p[k] = entry.p[k];
    if(p.c) p.c = colorLabel(p.c);
    var key = 'log.'+entry.k;
    /* si el que actúa (o el afectado) eres tú, se usa la frase en segunda persona */
    if(p.ai && p.ai===MY_ID && hasT(key+'.you')) key += '.you';
    else if(p.oi && p.oi===MY_ID && hasT(key+'.toyou')) key += '.toyou';
    return T(key, p);
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
    var v=0; COLORS.forEach(function(c){ var s=p.board[c]; if(s){ v += s.status==='immune'?2:(s.status==='infected'?0:(s.status==='vaccinated'?1.5:1)); } });
    return v;
  }
  function getTreatmentOptions(actor, card){
    var opps = opponentsOf(actor);
    if(card.kind==='guante') return [{label:T('opt.guante'), choice:{}}];
    if(card.kind==='contagio') return contagionHasEffect(actor) ? [{label:T('opt.contagio'), choice:{}}] : [];
    if(card.kind==='error') return opps.map(function(o){ return {label:T('opt.error',{n:o.name}), choice:{playerId:o.id}}; });
    if(card.kind==='ladron'){
      var out=[];
      opps.forEach(function(o){ COLORS.forEach(function(c){
        if(o.board[c] && o.board[c].status!=='infected' && o.board[c].status!=='immune' && !actor.board[c]) out.push({label:T('opt.ladron',{c:colorLabel(c), s:statusLabel(o.board[c].status), n:o.name}), choice:{playerId:o.id, color:c}});
      }); });
      return out;
    }
    if(card.kind==='transplante'){
      var out2=[];
      opps.forEach(function(o){ COLORS.forEach(function(c){
        if(o.board[c] && actor.board[c] && o.board[c].status!=='immune' && actor.board[c].status!=='immune') out2.push({label:T('opt.transplante',{c:colorLabel(c), n:o.name}), choice:{playerId:o.id, color:c}});
      }); });
      return out2;
    }
    return [];
  }
  function statusLabel(s){ return T('status.'+s); }

  /* ================= ACTIONS (mutate module `state`) ================= */
  function playCard(actor, card, target){
    removeFromHand(actor, card);
    if(card.type==='organ'){
      actor.board[target.slot] = {id: card.id, color: card.color==='wild'?target.slot:card.color, wild: card.color==='wild', status:'healthy'};
      addLog('organ', {a:actor.name, ai:actor.id, c:target.slot});
    } else if(card.type==='medicine'){
      var s1 = actor.board[target.slot];
      /* sano + medicina = vacunado; vacunado + segunda medicina = inmune */
      if(s1.status==='healthy'){ s1.status='vaccinated'; addLog('vaccinate', {a:actor.name, ai:actor.id, c:target.slot}); }
      else if(s1.status==='vaccinated'){ s1.status='immune'; addLog('immunize', {a:actor.name, ai:actor.id, c:target.slot}); }
      else if(s1.status==='infected'){ s1.status='healthy'; addLog('heal', {a:actor.name, ai:actor.id, c:target.slot}); }
    } else if(card.type==='virus'){
      var owner = state.players.find(function(p){ return p.id===target.playerId; });
      var s2 = owner.board[target.slot];
      if(s2.status==='healthy'){ s2.status='infected'; addLog('infect', {a:actor.name, ai:actor.id, c:target.slot, o:owner.name, oi:owner.id}); }
      else if(s2.status==='vaccinated'){ s2.status='healthy'; addLog('unvaccinate', {a:actor.name, ai:actor.id, c:target.slot, o:owner.name, oi:owner.id}); }
      else if(s2.status==='infected'){
        owner.board[target.slot]=null;
        /* el órgano destruido vuelve al descarte para que el mazo no se agote */
        if(s2.id!=null) state.discard.push({id:s2.id, type:'organ', color:s2.wild?'wild':s2.color});
        addLog('destroy', {a:actor.name, ai:actor.id, c:target.slot, o:owner.name, oi:owner.id}); }
    }
    /* un órgano jugado se queda en el tablero; solo vuelve al descarte si lo destruyen (más arriba) */
    if(card.type!=='organ') state.discard.push(card);
  }
  function playTreatment(actor, card, choice){
    removeFromHand(actor, card);
    state.discard.push(card);
    if(card.kind==='guante'){
      if(GAME_MODE==='online'){
        /* las manos ajenas son privadas: cada víctima (o el anfitrión, si es una CPU) descarta la suya al ver la marca */
        state.gloveFor = (state.gloveFor||[]).concat(opponentsOf(actor).map(function(p){ return p.id; }).filter(function(id){ return (state.gloveFor||[]).indexOf(id)<0; }));
      } else {
        opponentsOf(actor).forEach(function(p){ state.discard.push.apply(state.discard, p.hand); p.hand=[]; });
      }
      addLog('glove', {a:actor.name, ai:actor.id});
    } else if(card.kind==='contagio'){
      COLORS.forEach(function(c){
        var mine = actor.board[c];
        if(mine && mine.status==='infected'){
          var target = opponentsOf(actor).find(function(p){ var t=p.board[c]; return t && t.status==='healthy'; });
          if(target){ target.board[c].status='infected'; mine.status='healthy'; addLog('contagion', {a:actor.name, ai:actor.id, c:c, o:target.name, oi:target.id}); }
        }
      });
    } else if(card.kind==='error'){
      var opp = state.players.find(function(p){ return p.id===choice.playerId; });
      var tmp = actor.board; actor.board = opp.board; opp.board = tmp;
      addLog('error', {a:actor.name, ai:actor.id, o:opp.name, oi:opp.id});
    } else if(card.kind==='ladron'){
      var opp2 = state.players.find(function(p){ return p.id===choice.playerId; });
      actor.board[choice.color] = opp2.board[choice.color];
      opp2.board[choice.color] = null;
      addLog('steal', {a:actor.name, ai:actor.id, c:choice.color, o:opp2.name, oi:opp2.id});
    } else if(card.kind==='transplante'){
      var opp3 = state.players.find(function(p){ return p.id===choice.playerId; });
      var t = actor.board[choice.color]; actor.board[choice.color]=opp3.board[choice.color]; opp3.board[choice.color]=t;
      addLog('transplant', {a:actor.name, ai:actor.id, c:choice.color, o:opp3.name, oi:opp3.id});
    }
  }
  function discardAndRedraw(player, cardIds){
    cardIds.forEach(function(id){
      var idx = player.hand.findIndex(function(c){ return c.id===id; });
      if(idx>-1){ state.discard.push(player.hand[idx]); player.hand.splice(idx,1); }
    });
    for(var i=0;i<cardIds.length;i++) drawOne(player);
    addLog('discard', {a:player.name, ai:player.id, n:cardIds.length});
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
    var players = [newPlayer('human',T('you'),false)];
    for(var i=0;i<numBots;i++) players.push(newPlayer('bot'+i, botNames()[i], true));
    state = { players: players, deck: buildDeck(), discard: [], turn: 0, turnCount:0, log: [], over: false, winnerId:null };
    players.forEach(function(p){ drawToHand(p); });
    addLog('start');
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
          targets = getValidTargets(bot, card).filter(function(t){ var st=bot.board[t.slot].status; return st==='healthy' || st==='vaccinated'; });
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
            var rank = {infected:0, healthy:1, vaccinated:1.5, immune:2};
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
    if(state.over){ setStatus(T('status.over')); return; }
    if(glovePending()){ setStatus(T('status.glove')); return; }
    if(isHumanTurn()) setStatus(T('status.mine'));
    else setStatus(escapeHtml(T('status.other',{n:currentPlayer().name})));
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
    return cleaned || T('player');
  }

  /* ================= RENDER ================= */
  function typeLabel(type){ return T('type.'+type); }
  var SHIELD_OUTLINE = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.4l6.6 2.5v5.2c0 4-2.7 7.3-6.6 8.5-3.9-1.2-6.6-4.5-6.6-8.5V5.9z" fill="#fff" fill-opacity=".85" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
  var SHIELD_ICON = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7.5 2.8v5.6c0 4.6-3.1 8.4-7.5 9.6-4.4-1.2-7.5-5-7.5-9.6V5.8z" fill="currentColor"/><path d="M8.6 12.2l2.5 2.5 4.4-4.9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function cardColorVar(color){ return color==='wild' ? null : '--c-'+color; }
  function cardTitle(card){
    if(card.type==='treatment') return treatmentTitle(card.kind);
    if(card.type==='organ') return card.color==='wild' ? T('card.organWild') : colorLabel(card.color);
    /* virus y medicina: "Virus corazón" / "Heart virus" (c = en minúsculas, C = tal cual) */
    if(card.color==='wild') return T(card.type==='virus' ? 'card.virusWild' : 'card.medicineWild');
    var lbl = colorLabel(card.color);
    return T(card.type==='virus' ? 'card.virus' : 'card.medicine', {c:lbl.toLowerCase(), C:lbl});
  }
  function cardSub(card){
    if(card.type==='treatment') return treatmentDesc(card.kind);
    return T('card.sub.'+card.type);
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
    var fan = opts.rot!==undefined ? ';--rot:'+opts.rot+'deg;--dy:'+opts.dy+'px' : '';
    if(v) styleAttr = ' style="--card-color:var('+v+')'+fan+'"';
    else if(fan) styleAttr = ' style="'+fan.slice(1)+'"';
    return '<button class="'+cls.join(' ')+'" data-card-id="'+card.id+'"'+styleAttr+' aria-label="'+cardTitle(card)+'. '+cardSub(card)+'">'+
      '<div class="card-head"><div class="card-top">'+cardIconHTML(card)+'</div><span class="card-kind">'+typeLabel(card.type)+'</span></div>'+
      '<div class="card-title">'+cardTitle(card)+'</div>'+
      '<div class="card-sub">'+cardSub(card)+'</div>'+
      '</button>';
  }
  /* avatares de los doctores rivales (uno por asiento) */
  var AVATARS = [
    {bg:'#0E8574', skin:'#F1C9A5', cap:'#2BB6A0', extra:''},
    {bg:'#4A63D6', skin:'#C88F62', cap:'#6E5CD6', extra:'<circle cx="13.6" cy="15" r="2.1" fill="none" stroke="#16262A" stroke-width=".8"/><circle cx="18.4" cy="15" r="2.1" fill="none" stroke="#16262A" stroke-width=".8"/><path d="M15.7 15h.6" stroke="#16262A" stroke-width=".8"/>'},
    {bg:'#C99423', skin:'#8A5A3B', cap:'#E25B4A', extra:'<path d="M9.5 23c0 3 1.6 4.6 3.5 4.6" stroke="#16262A" stroke-width="1" fill="none" stroke-linecap="round"/><circle cx="13.2" cy="27.8" r="1.2" fill="#16262A"/>'},
    {bg:'#D6483F', skin:'#F6D5B8', cap:'#3E9B52', extra:'<circle cx="16" cy="5.4" r="1.5" fill="#3E9B52"/>'}
  ];
  function avatarHTML(i){
    var a = AVATARS[((i%4)+4)%4];
    return '<svg class="avatar" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="'+a.bg+'"/>'+
      '<path d="M4.5 32c.8-6.2 5.8-8.6 11.5-8.6s10.700 2.400 11.500 8.600z" fill="#fff"/>'+
      '<circle cx="16" cy="14" r="6.6" fill="'+a.skin+'"/>'+
      '<path d="M9.4 12.600c0-4 3-6.800 6.600-6.800s6.600 2.800 6.600 6.800z" fill="'+a.cap+'"/>'+
      '<circle cx="13.600" cy="15" r=".95" fill="#16262A"/><circle cx="18.400" cy="15" r=".95" fill="#16262A"/>'+
      '<rect x="11" y="16.800" width="10" height="4.400" rx="2.100" fill="#E4F4EF" stroke="#9BC7BC" stroke-width=".5"/>'+
      a.extra+'</svg>';
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
    if(s && s.status==='vaccinated') badge = '<div class="badge immune-badge vaccine-badge">'+SHIELD_OUTLINE+'</div>';
    var label = colorLabel(color) + (s ? ' · '+statusLabel(s.status) : '');
    return '<button class="'+cls.join(' ')+'" data-owner="'+owner.id+'" data-slot="'+color+'"'+styleAttr+' aria-label="'+escapeHtml(owner.name)+': '+label+'">'+
      '<div class="slot-icon">'+icon+'</div>'+badge+
      '<div class="slot-label">'+colorLabel(color)+'</div>'+
      (s ? '<div class="slot-state">'+statusLabel(s.status)+'</div>' : '')+
      '</button>';
  }

  /* ---- Animaciones de las jugadas ----
     No dependen de quién juega ni de si es online: se comparan los tableros antes y después de cada render
     (órgano nuevo, infectado, curado, inmunizado, destruido) y se anima lo que cambió. */
  /* ---- Sonido y vibración ----
     Los sonidos se sintetizan con Web Audio (sin archivos). La vibración usa navigator.vibrate (Android).
     Un único interruptor, recordado en localStorage, activa o silencia ambos. */
  var Sfx = (function(){
    var on = true, ctx = null, master = null, lastAt = {};
    try{ on = localStorage.getItem('anticuerpos_sfx')!=='0'; }catch(e){}
    function ensure(){
      if(!on) return null;
      try{
        if(!ctx){
          var AC = window.AudioContext || window.webkitAudioContext; if(!AC) return null;
          ctx = new AC(); master = ctx.createGain(); master.gain.value = .5; master.connect(ctx.destination);
        }
        if(ctx.state==='suspended') ctx.resume();
      }catch(e){ return null; }
      return ctx;
    }
    function tone(f, dur, type, vol, when, to){
      var c = ensure(); if(!c) return;
      var t = c.currentTime + (when||0), o = c.createOscillator(), g = c.createGain();
      o.type = type||'sine'; o.frequency.setValueAtTime(f, t);
      if(to) o.frequency.exponentialRampToValueAtTime(to, t+dur);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol||.25, t+.012); g.gain.exponentialRampToValueAtTime(.0001, t+dur);
      o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+.03);
    }
    function noise(dur, vol, lp){
      var c = ensure(); if(!c) return;
      var len = Math.floor(c.sampleRate*dur), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for(var i=0;i<len;i++) d[i] = (Math.random()*2-1)*(1-i/len);
      var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = buf; f.type = 'lowpass'; f.frequency.value = lp||800; g.gain.value = vol||.2;
      s.connect(f); f.connect(g); g.connect(master); s.start();
    }
    function vib(p){ if(on && navigator.vibrate){ try{ navigator.vibrate(p); }catch(e){} } }
    function notes(list, step, type, vol){ list.forEach(function(f,i){ tone(f, i===list.length-1 ? .35 : .16, type||'sine', vol||.22, i*step); }); }
    var sounds = {
      tap:        function(){ tone(880,.05,'triangle',.1); vib(8); },
      place:      function(){ tone(392,.09,'sine',.28); tone(587,.15,'sine',.26,.07); vib(20); },
      infect:     function(){ tone(190,.4,'sawtooth',.14,0,80); noise(.25,.1,500); vib([50,40,70]); },
      destroy:    function(){ noise(.42,.28,700); tone(140,.45,'sawtooth',.18,0,45); vib([120,50,160]); },
      cure:       function(){ notes([523,659,784],.08,'sine',.2); vib(30); },
      vaccinate:  function(){ tone(660,.1,'triangle',.24); tone(990,.2,'triangle',.2,.09); vib([15,30,15]); },
      immune:     function(){ notes([523,659,784,1046],.07,'triangle',.2); vib([20,30,20,30,40]); },
      discard:    function(){ tone(420,.13,'sine',.16,0,260); vib(10); },
      turn:       function(){ tone(660,.08,'sine',.18); tone(880,.15,'sine',.2,.09); vib(25); },
      win:        function(){ notes([523,659,784,1046],.12,'triangle',.24); vib([60,60,60,60,160]); },
      lose:       function(){ tone(392,.2,'triangle',.2); tone(330,.2,'triangle',.2,.2); tone(262,.5,'triangle',.2,.4,200); vib(200); }
    };
    var api = {
      play: function(name){
        if(!on || !sounds[name]) return;
        var now = Date.now(); if(now-(lastAt[name]||0) < 90) return;   /* evita repeticiones por re-renders */
        lastAt[name] = now; sounds[name]();
      },
      isOn: function(){ return on; },
      set: function(v){
        on = !!v;
        try{ localStorage.setItem('anticuerpos_sfx', on ? '1' : '0'); }catch(e){}
        if(on) api.play('tap');
        refreshSoundUI();
      },
      unlock: ensure
    };
    return api;
  })();
  function refreshSoundUI(){
    var b = document.getElementById('btnSound');
    if(b){ b.classList.toggle('off', !Sfx.isOn()); b.setAttribute('aria-pressed', Sfx.isOn() ? 'true' : 'false'); }
    var h = document.getElementById('helpSound');
    if(h) h.textContent = T(Sfx.isOn() ? 'sound.on' : 'sound.off');
  }
  /* el navegador solo deja sonar tras un gesto del usuario */
  document.addEventListener('pointerdown', function(){ Sfx.unlock(); }, {once:true, passive:true});

  var prevSlots = null, prevCounts = null, lastTurnSound = null;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function slotSnapshot(){
    var m = {};
    state.players.forEach(function(p){ COLORS.forEach(function(c){ m[p.id+':'+c] = p.board[c] ? p.board[c].status : ''; }); });
    return m;
  }
  function slotEl(key){
    var i = key.lastIndexOf(':');
    return document.querySelector('[data-owner="'+key.slice(0,i)+'"][data-slot="'+key.slice(i+1)+'"]');
  }
  function flyCard(from, toEl, tint){
    if(!from || !toEl || !toEl.animate) return;
    var to = toEl.getBoundingClientRect(), g = document.createElement('div');
    g.className = 'fly-card'; g.style.background = tint;
    document.body.appendChild(g);
    var fx = from.left + from.width/2 - 18, fy = from.top + from.height/2 - 24;
    var tx = to.left + to.width/2 - 18, ty = to.top + to.height/2 - 24;
    var a = g.animate([
      {transform:'translate('+fx+'px,'+fy+'px) scale(1) rotate(-6deg)', opacity:.95},
      {transform:'translate('+tx+'px,'+ty+'px) scale(.55) rotate(8deg)', opacity:.25}
    ], {duration:480, easing:'cubic-bezier(.2,.7,.2,1)'});
    a.onfinish = a.oncancel = function(){ g.remove(); };
  }
  function handRects(){
    var m = {};
    document.querySelectorAll('#hand .card').forEach(function(c){ m[c.getAttribute('data-card-id')] = c.getBoundingClientRect(); });
    return m;
  }
  function animatePlays(before){
    var cur = slotSnapshot(), counts = {deck:state.deck.length, discard:state.discard.length};
    var prev = prevSlots, pc = prevCounts;
    prevSlots = cur; prevCounts = counts;
    if(!prev || state.log.length<=1) return;   /* partida nueva: nada que animar */
    var changes = [];
    Object.keys(cur).forEach(function(k){
      if(prev[k]===undefined || prev[k]===cur[k]) return;
      var type = !cur[k] || prev[k]==='vaccinated'&&cur[k]==='healthy' ? 'destroy' : !prev[k] ? 'place' : cur[k]==='infected' ? 'infect' : (cur[k]==='immune' || cur[k]==='vaccinated') ? 'shield' : 'cure';
      changes.push({key:k, type:type, to:cur[k]});
    });
    /* sonido de la jugada: el efecto más fuerte de los que cambiaron */
    if(changes.length){
      var pri = ['destroy','infect','shield','cure','place'], top = null;
      pri.some(function(t){ top = changes.find(function(ch){ return ch.type===t; }); return !!top; });
      if(top) Sfx.play(top.type==='shield' ? (top.to==='immune' ? 'immune' : 'vaccinate') : top.type);
    } else if(pc && counts.discard>pc.discard){
      Sfx.play('discard');
    }
    if(reduceMotion) return;
    if(changes.length && changes.length<=6){
      /* de dónde sale la carta: de mi mano si la jugué yo, o del rival que actuó */
      var latest = state.log[0], actor = latest && latest.p && latest.p.ai, from = null;
      var handIds = me() ? me().hand.map(function(c){ return String(c.id); }) : [];
      var gone = Object.keys(before||{}).filter(function(id){ return handIds.indexOf(id)<0; });
      if(actor===MY_ID && gone.length) from = before[gone[0]];
      else if(actor && actor!==MY_ID){
        var idx = opponentsOf(me()).map(function(p){ return p.id; }).indexOf(actor);
        var oc = document.querySelectorAll('.oppcard')[idx];
        if(oc) from = oc.getBoundingClientRect();
      }
      if(!from){ var dp = document.getElementById('drawPile'); if(dp) from = dp.getBoundingClientRect(); }
      var tints = {place:'var(--accent)', infect:'var(--treatment)', shield:'var(--accent-strong)', cure:'var(--ok)', destroy:'var(--c-heart)'};
      changes.forEach(function(ch, n){
        var el = slotEl(ch.key); if(!el) return;
        if(ch.type!=='destroy' && n<3) flyCard(from, el, tints[ch.type]);
        setTimeout(function(){ var e2 = slotEl(ch.key); if(e2){ e2.classList.add('anim-'+ch.type); setTimeout(function(){ e2.classList.remove('anim-'+ch.type); }, 900); } }, ch.type==='destroy' ? 0 : 380);
      });
    }
    if(pc){
      if(counts.discard>pc.discard) bump('discardPile');
      if(counts.deck<pc.deck) bump('drawPile');
    }
  }
  function bump(id){
    var el = document.getElementById(id); if(!el) return;
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  }

  function render(){
    if(!state) return;
    var before = handRects();
    /* aviso sonoro cuando pasa a ser tu turno */
    if(state.turnCount!==lastTurnSound){
      lastTurnSound = state.turnCount;
      if(isHumanTurn() && state.log.length>1 && !state.over && !glovePending()) Sfx.play('turn');
    }
    renderTopbar();
    renderOpponents();
    renderPiles();
    renderMyBoard();
    renderHand();
    renderActionBar();
    updateStatusLine();
    animatePlays(before);
  }
  function renderTopbar(){
    var t = document.getElementById('turnIndicator');
    var p = currentPlayer();
    t.innerHTML = state.over ? T('turn.over') : (p.id===MY_ID ? T('turn.you') : T('turn.of',{n:escapeHtml(p.name)}));
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
      var handCount = p.hand ? p.hand.length : ((state.handCounts && state.handCounts[p.id]) || 0);
      var backs = ''; for(var b=0;b<handCount;b++) backs += '<span class="cardback"></span>';
      return '<div class="oppcard'+active+'">'+
        '<div class="opphead"><div class="oppwho">'+avatarHTML(state.players.indexOf(p))+'<div class="oppname">'+escapeHtml(p.name)+'</div></div><div class="opphand mono">'+backs+' '+handCount+'</div></div>'+
        '<div class="oppslots">'+slots+'</div>'+
      '</div>';
    }).join('');
    el.scrollLeft = scrollLeft;
  }
  function renderPiles(){
    document.getElementById('drawPile').innerHTML = DECK_ICON+'<div class="pile-count mono">'+state.deck.length+'</div>';
    document.getElementById('discardPile').innerHTML = '<div class="pile-count mono" style="font-size:.9rem;">🗑</div><div class="pile-count mono">'+state.discard.length+'</div>';
    var logEl = document.getElementById('log');
    logEl.innerHTML = state.log.slice(0,8).map(function(m,i){ return '<div class="log-line'+(i===0?' latest':'')+'">'+escapeHtml(logText(m))+'</div>'; }).join('');
    /* avisa de lo que han hecho los demás, para no perderse jugadas rápidas de los bots */
    var latest = state.log[0];
    var latestKey = latest ? (typeof latest==='string' ? latest : JSON.stringify(latest)) : null;
    if(latest && latestKey!==lastLogShown){
      var mine = typeof latest==='string' ? (me() && latest.indexOf(me().name)===0) : !!(latest.p && latest.p.ai===MY_ID);
      if(lastLogShown!==null && !mine && !state.over) toast(logText(latest), 2600);
      lastLogShown = latestKey;
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
    var n = me().hand.length, step = n<=3 ? 3 : (n<=5 ? 2.2 : 1.4);   /* la mano se abre en abanico */
    el.innerHTML = me().hand.map(function(card, i){
      var selected = selection.cardId===card.id;
      var marked = discardMarks.indexOf(card.id)>-1;
      var enter = !seenCardIds[card.id];
      seenCardIds[card.id] = true;
      var off = i-(n-1)/2;
      return cardHTML(card, {selected:selected, marked:marked, enter:enter, rot:(off*step).toFixed(1), dy:(off*off*1.6).toFixed(1)});
    }).join('');
  }
  function renderActionBar(){
    var canAct = isHumanTurn();
    document.getElementById('btnDiscard').hidden = !canAct;
    document.getElementById('btnDiscard').textContent = discardMode ? T('btn.discardConfirm',{n:discardMarks.length}) : T('btn.discard');
    document.getElementById('btnCancel').hidden = !(canAct && (discardMode || selection.cardId));
    document.getElementById('btnPass').hidden = !(canAct && me().hand.length===0);
    var skip = skipTarget();
    var btnSkip = document.getElementById('btnSkip');
    btnSkip.hidden = !skip;
    if(skip) btnSkip.textContent = T(skip.glove ? 'btn.skipGlove' : 'btn.skipTurn', {n:skip.name});
  }

  /* ---- Jugador que no responde (solo el anfitrión, solo online) ----
     Si el turno (o un Guante de Látex pendiente) lleva SKIP_DELAY_MS sin cambiar y depende de otra
     persona, el anfitrión puede saltarlo. No hay detección de "desconectado": es una decisión suya. */
  var SKIP_DELAY_MS = 20000, turnKey = null, turnSince = 0, skipTimer = null;
  function skipTarget(){
    if(GAME_MODE!=='online' || !isOnlineHost || !state || state.over) return null;
    var key = state.turnCount+'|'+(state.gloveFor||[]).join(',');
    if(key!==turnKey){
      turnKey = key; turnSince = Date.now();
      clearTimeout(skipTimer);
      skipTimer = setTimeout(function(){ if(state) renderActionBar(); }, SKIP_DELAY_MS+200);
    }
    var glove = glovePending(), target = null;
    if(glove){
      target = state.players.find(function(p){ return !p.isBot && p.id!==MY_ID && state.gloveFor.indexOf(p.id)>-1; });
    } else {
      var cp = currentPlayer();
      if(cp && !cp.isBot && cp.id!==MY_ID) target = cp;
    }
    if(!target || Date.now()-turnSince<SKIP_DELAY_MS) return null;
    return {id:target.id, name:target.name, glove:glove};
  }
  function skipAbsent(){
    var t = skipTarget(); if(!t || !onlineRoomRef) return;
    if(!window.confirm(T(t.glove ? 'confirm.skipGlove' : 'confirm.skipTurn', {n:t.name}))) return;
    var ref = onlineRoomRef;
    fbDb.runTransaction(function(tx){
      return tx.get(ref).then(function(snap){
        var gs = snap.exists && snap.data().gameState;
        if(!gs || gs.over) return;
        var upd = {}, n = gs.players.length;
        if((gs.gloveFor||[]).length){
          if(gs.gloveFor.indexOf(t.id)<0) return;
          var remaining = gs.gloveFor.filter(function(x){ return x!==t.id; });
          upd['gameState.gloveFor'] = remaining;
          if(!remaining.length){ upd['gameState.turn'] = (gs.turn+1)%n; upd['gameState.turnCount'] = (gs.turnCount||0)+1; }
        } else {
          if(gs.players[gs.turn].id!==t.id) return;
          upd['gameState.turn'] = (gs.turn+1)%n;
          upd['gameState.turnCount'] = (gs.turnCount||0)+1;
        }
        upd['gameState.log'] = [{k:(t.glove?'skipGlove':'skipTurn'), p:{a:t.name, ai:t.id}}].concat(gs.log||[]).slice(0,40);
        tx.update(ref, upd);
      });
    }).catch(function(err){ toast(T('err.skip',{m:err.message})); });
  }
  document.getElementById('btnSkip').addEventListener('click', skipAbsent);

  /* ================= TARGET SHEET ================= */
  function closeSheet(){ var s=document.getElementById('sheetEl'); if(s) s.remove(); }
  function openSheet(card){
    closeSheet();
    var opts = getTreatmentOptions(me(), card);
    var sheet = document.createElement('div');
    sheet.className='sheet'; sheet.id='sheetEl';
    var body = '<h3>'+treatmentTitle(card.kind)+'</h3>';
    if(!opts.length){
      body += '<div class="empty">'+T('sheet.empty')+'</div>';
    } else {
      body += opts.map(function(o,i){ return '<button class="opt" data-opt="'+i+'">'+escapeHtml(o.label)+'</button>'; }).join('');
    }
    body += '<button class="cancel" id="sheetCancel">'+T('btn.cancel')+'</button>';
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
  /* Cierra el turno online. Tras un Guante de Látex el turno NO avanza: lo avanza la última víctima
     al descartar su mano (respondGlove). Así nadie sobrescribe la sala con una copia vieja mientras
     las víctimas escriben, que era lo que hacía perder o duplicar cartas.
     Cada jugador roba al empezar SU turno. */
  function endOnlineTurn(){
    var w = checkAnyWin();
    if(w){ state.turnCount=(state.turnCount||0)+1; state.over=true; state.winnerId=w.id; return; }
    if((state.gloveFor||[]).length>0) return;
    state.turnCount = (state.turnCount||0)+1;
    state.turn = (state.turn+1) % state.players.length;
  }
  function commitOnlineAction(){
    endOnlineTurn();
    render();
    pushOnlineState([me()]);
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
    Sfx.play('tap');
    selection.cardId = cardId;
    if(card.type==='treatment'){
      selection.targets = null;
      render();
      openSheet(card);
    } else {
      closeSheet();
      var targets = getValidTargets(me(), card);
      if(targets.length===0){ toast(T('toast.noTarget')); clearSelection(); render(); return; }
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
    addLog('pass', {a:me().name, ai:MY_ID});
    if(GAME_MODE==='online') commitPassOnline(); else advanceTurn();
  });
  function commitPassOnline(){
    state.turnCount=(state.turnCount||0)+1;
    state.turn=(state.turn+1)%state.players.length;
    render();
    pushOnlineState([]);
  }
  document.getElementById('btnDiscard').addEventListener('click', function(){
    if(!isHumanTurn()) return;
    if(!discardMode){
      discardMode = true; discardMarks=[]; clearSelection(); render();
      setStatus(T('status.discardMode'));
      return;
    }
    if(discardMarks.length===0){ toast(T('toast.pickOne')); return; }
    var ids = discardMarks.slice();
    discardMode=false; discardMarks=[];
    discardAndRedraw(me(), ids);
    finishAction();
  });
  document.getElementById('btnHelp').addEventListener('click', showHelp);

  function showHelp(){
    var root = document.getElementById('overlayRoot');
    root.innerHTML = '<div class="overlay" id="helpOverlay"><div class="modal">'+
      '<h3>'+T('help.title')+'</h3>'+
      '<ul>'+
      '<li>'+T('help.organ')+'</li>'+
      '<li>'+T('help.virus')+'</li>'+
      '<li>'+T('help.medicine')+'</li>'+
      '<li>'+T('help.action')+'</li>'+
      '<li>'+T('help.win')+'</li>'+
      '</ul>'+
      '<button id="helpClose">'+T('help.close')+'</button>'+
      '<button id="helpSound" class="modal-sound"></button>'+
      '<button id="helpLeave" class="modal-secondary">'+T('help.leave')+'</button>'+
      '</div></div>';
    refreshSoundUI();
    document.getElementById('helpSound').addEventListener('click', function(){ Sfx.set(!Sfx.isOn()); });
    document.getElementById('helpClose').addEventListener('click', function(){ root.innerHTML=''; });
    document.getElementById('helpLeave').addEventListener('click', function(){
      if(!window.confirm(T('help.leaveConfirm'))) return;
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
    Sfx.play(iWon ? 'win' : 'lose');
    var msg = iWon ? T('win.meMsg') : escapeHtml(T('win.otherMsg',{n:winner.name}));
    /* el cuerpo completo del ganador, órgano a órgano; el escudo marca los inmunes */
    var body = COLORS.map(function(c, i){
      var s = winner.board[c];
      return '<div class="win-organ'+(s && s.status==='immune' ? ' immune' : '')+'" style="--slot-color:var(--c-'+c+');--i:'+i+'">'+organIcon(c)+
        (s && s.status==='immune' ? '<span class="win-shield">'+SHIELD_ICON+'</span>' : '')+'</div>';
    }).join('');
    var rain = '';
    if(iWon && !reduceMotion){
      for(var n=0;n<40;n++){
        rain += '<i class="cf" style="left:'+(Math.random()*100).toFixed(1)+'%;--d:'+(Math.random()*1.6).toFixed(2)+'s;--t:'+(2.6+Math.random()*2).toFixed(2)+'s;--r:'+Math.round(Math.random()*720-360)+'deg;--x:'+Math.round(Math.random()*120-60)+'px;background:var(--c-'+COLORS[n%4]+')"></i>';
      }
    }
    root.innerHTML = '<div class="overlay"><div class="confetti-rain" aria-hidden="true">'+rain+'</div><div class="modal win-modal'+(iWon?' won':'')+'">'+
      '<div class="win-body" aria-hidden="true">'+body+'</div>'+
      '<h2>'+(iWon ? T('win.me') : escapeHtml(T('win.other',{n:winner.name}))) +'</h2>'+
      '<p>'+msg+'</p>'+
      '<button id="playAgain">'+T('win.again')+'</button>'+
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
  var FAN_ROT = [-13,-4.5,4.5,13], FAN_DY = [9,0,0,9];
  document.getElementById('setupGlyphs').innerHTML = COLORS.map(function(c,i){
    return '<div class="fcard" style="--gc:var(--c-'+c+');--rot:'+FAN_ROT[i]+'deg;--dy:'+FAN_DY[i]+'px;--i:'+i+'">'+organIcon(c)+'</div>';
  }).join('') + '<div class="fvirus">'+virusIcon()+'</div>';
  document.getElementById('brandIcon').innerHTML = virusIcon();

  /* idioma: textos estáticos del HTML y botón ES/EN */
  applyStaticI18n();
  refreshSoundUI();
  document.getElementById('btnSound').addEventListener('click', function(){ Sfx.set(!Sfx.isOn()); });
  document.getElementById('btnLang').addEventListener('click', function(){
    setLang(getLang()==='es' ? 'en' : 'es');
    MY_NAME = T('you');
  });

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
    if(!db){ onlineHint(T('online.notConfigured'), true); return; }
    MY_NAME = sanitizeName(document.getElementById('nameInput').value);
    localStorage.setItem('anticuerpos_name', MY_NAME);
    var code = generateRoomCode();
    onlineHint(T('online.creating'));
    ensureAuth().then(function(uid){
      MY_ID = uid;
      onlineRoomRef = db.collection('rooms').doc(code);
      return onlineRoomRef.set({
        status:'lobby', hostId:MY_ID,
        hostPing: firebase.firestore.FieldValue.serverTimestamp(),
        expireAt: expiresIn(ROOM_TTL_MS),
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
    }).catch(function(err){ onlineHint(T('online.createFail',{m:err.message}), true); });
  }

  function joinOnlineRoom(){
    var db = ensureFirebase();
    if(!db){ onlineHint(T('online.notConfigured'), true); return; }
    var code = (document.getElementById('codeInput').value||'').trim().toUpperCase();
    if(code.length!==4){ onlineHint(T('online.codeLen'), true); return; }
    MY_NAME = sanitizeName(document.getElementById('nameInput').value);
    localStorage.setItem('anticuerpos_name', MY_NAME);
    var ref = db.collection('rooms').doc(code);
    onlineHint(T('online.joining'));
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
      var msg = m==='NOT_FOUND' ? T('online.notFound')
        : m==='STARTED' ? T('online.started')
        : m==='FULL' ? T('online.full')
        : T('online.joinFail',{m:m});
      onlineHint(msg, true);
    });
  }

  function enterLobby(){
    winShown = false; lastLogShown = null; seenCardIds = {};
    showScreen('lobby');
    if(onlineUnsub) onlineUnsub();
    startHandListeners();
    startHostWatch();
    onlineUnsub = onlineRoomRef.onSnapshot(function(snap){
      if(!snap.exists){
        document.getElementById('overlayRoot').innerHTML='';
        toast(T('online.closed')); leaveOnlineRoomSilently(); goToSetup(); return;
      }
      var data = snap.data();
      trackHost(data);
      if(data.status==='lobby'){
        renderLobby(data);
      } else if(data.status==='playing' || data.status==='over'){
        GAME_MODE = 'online';
        isOnlineHost = data.hostId===MY_ID;
        state = data.gameState;
        if(isOnlineHost) startBotHandListeners();
        else if(botListening){   /* perdí el cargo de anfitrión: ya no puedo leer las manos de las CPUs */
          botHandUnsubs.forEach(function(u){ u(); });
          botHandUnsubs = []; botHands = {}; botHandReady = {}; botListening = false;
        }
        attachHands();
        showScreen('game');
        render();
        if(data.status==='over' && !winShown){
          winShown = true;
          var w = state.players.find(function(p){ return p.id===state.winnerId; });
          if(w) showWin(w);
        }
        onlineTurnHooks();
      }
    }, function(err){ toast(T('online.lost',{m:err.message})); });
  }

  function renderLobby(data){
    document.getElementById('roomCodeDisplay').textContent = onlineRoomCode;
    isOnlineHost = data.hostId===MY_ID;
    var seats = data.seats||[];
    if(!seats.some(function(s){ return s.clientId===MY_ID; })){
      toast(T('online.kicked'));
      leaveOnlineRoomSilently(); goToSetup();
      return;
    }
    document.getElementById('seatsList').innerHTML = seats.map(function(s){
      var isHost = s.clientId===data.hostId;
      var canRemove = isOnlineHost && !isHost;
      return '<div class="seat-row">'+
        '<span class="seat-name">'+escapeHtml(s.name)+(isHost?' <b class="host-badge">'+T('badge.host')+'</b>':'')+(s.isBot?' <b class="bot-badge">'+T('badge.bot')+'</b>':'')+'</span>'+
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
      var names = botNames();
      seats = seats.concat([{clientId:'bot_'+Date.now()+'_'+botNum, name:(names[(botNum-1)%names.length]||('CPU '+botNum)), isBot:true}]);
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
        return {id:s.clientId, name:s.name, isBot:!!s.isBot, board:board};
      });
      var deck = buildDeck();
      var hands = {}, handCounts = {};
      players.forEach(function(p){
        hands[p.id] = [];
        while(hands[p.id].length<HAND_SIZE){ if(deck.length===0) break; hands[p.id].push(deck.pop()); }
        handCounts[p.id] = hands[p.id].length;
      });
      var gs = { players:players, deck:deck, discard:[], turn:0, turnCount:0, log:[{k:'start', p:{}}], over:false, winnerId:null, handCounts:handCounts, gloveFor:[] };
      /* las manos van a documentos privados (hands/{uid}); en la sala solo queda cuántas cartas tiene cada uno */
      var batch = fbDb.batch();
      batch.update(onlineRoomRef, {status:'playing', gameState: gs});
      players.forEach(function(p){ batch.set(handsCol().doc(p.id), {cards: hands[p.id], expireAt: expiresIn(HAND_TTL_MS)}); });
      return batch.commit();
    }).catch(function(err){ toast(T('online.startFail',{m:err.message})); });
  });

  function leaveOnlineRoomSilently(removeFromSeats){
    if(onlineUnsub){ onlineUnsub(); onlineUnsub=null; }
    stopHandListeners();
    stopHostWatch();
    if(removeFromSeats && onlineRoomRef){
      var ref = onlineRoomRef;
      ref.get().then(function(snap){
        if(!snap.exists) return;
        var data = snap.data();
        if(data.hostId===MY_ID){
          /* si se va el anfitrión cede el cargo a otro jugador humano; si no hay nadie más (o la
             partida ya terminó) la sala se cierra */
          var next = (data.seats||[]).find(function(s){ return !s.isBot && s.clientId!==MY_ID; });
          if(next && (data.status==='lobby' || data.status==='playing')){
            var upd = {hostId: next.clientId};
            if(data.status==='lobby'){
              upd.seats = (data.seats||[]).filter(function(s){ return s.clientId!==MY_ID; });
              upd.uids = (data.uids||[]).filter(function(u){ return u!==MY_ID; });
            }
            return ref.update(upd);
          }
          var batch = fbDb.batch();
          (data.seats||[]).forEach(function(s){ batch.delete(ref.collection('hands').doc(s.clientId)); });
          batch.delete(ref);
          return batch.commit();
        }
        if(data.status!=='lobby') return;
        var seats=(data.seats||[]).filter(function(s){ return s.clientId!==MY_ID; });
        var uids=(data.uids||[]).filter(function(u){ return u!==MY_ID; });
        return ref.update({seats:seats, uids:uids});
      }).catch(function(){});
    }
    localStorage.removeItem('anticuerpos_room');
    onlineRoomRef=null; onlineRoomCode=null; hostBotScheduledTurn=-1;
  }

  /* ---- Traspaso de anfitrión ----
     El anfitrión escribe un latido (hostPing, hora del servidor) cada HEARTBEAT_MS. Los demás miran si
     cambia, con su propio reloj. Si no cambia en HOST_TIMEOUT_MS, el primer humano de la lista (los
     siguientes esperan 10 s más cada uno) se hace anfitrión con una transacción; las reglas de Firestore
     solo lo permiten si en el servidor han pasado más de 40 s desde el último latido. */
  var HEARTBEAT_MS = 15000, HOST_TIMEOUT_MS = 45000;
  /* Limpieza de salas abandonadas: cada documento lleva una fecha expireAt que Firestore usa como TTL
     (política "Time-to-live" en la consola, para rooms y hands). El latido del anfitrión renueva la de
     la sala y cada jugada renueva la de las manos; si nadie los renueva, Firestore los borra solo. */
  var ROOM_TTL_MS = 6*3600*1000, HAND_TTL_MS = 12*3600*1000;
  function expiresIn(ms){ return firebase.firestore.Timestamp.fromMillis(Date.now()+ms); }
  var hostTimer = null, lastBeatAt = 0, lastRoom = null, lastHostId = null, lastPingKey = null, hostChangeAt = 0, takingOver = false;

  function trackHost(data){
    var ping = data.hostPing && data.hostPing.toMillis ? data.hostPing.toMillis() : 'pendiente';
    var key = data.hostId+'|'+ping;
    if(key!==lastPingKey){ lastPingKey = key; hostChangeAt = Date.now(); }
    if(lastHostId!==null && data.hostId!==lastHostId){
      if(data.hostId===MY_ID) toast(T('online.nowHost'), 3000);
      else {
        var h = (data.seats||[]).find(function(s){ return s.clientId===data.hostId; });
        toast(T('online.hostIs',{n: h ? h.name : T('online.anotherPlayer')}), 3000);
      }
    }
    lastHostId = data.hostId;
    lastRoom = data;
    isOnlineHost = data.hostId===MY_ID;
  }
  function startHostWatch(){
    stopHostWatch();
    hostChangeAt = Date.now();
    hostTimer = setInterval(function(){
      if(!onlineRoomRef || !lastRoom) return;
      if(isOnlineHost){
        if(lastRoom.status!=='over' && Date.now()-lastBeatAt>=HEARTBEAT_MS){
          lastBeatAt = Date.now();
          onlineRoomRef.update({hostPing: firebase.firestore.FieldValue.serverTimestamp(), expireAt: expiresIn(ROOM_TTL_MS)}).catch(function(){});
        }
        return;
      }
      checkHostAlive();
    }, 5000);
  }
  function stopHostWatch(){
    if(hostTimer){ clearInterval(hostTimer); hostTimer = null; }
    lastRoom = null; lastHostId = null; lastPingKey = null; takingOver = false;
  }
  function checkHostAlive(){
    if(takingOver || lastRoom.status==='over') return;
    var humans = (lastRoom.seats||[]).filter(function(s){ return !s.isBot && s.clientId!==lastRoom.hostId; });
    var rank = humans.findIndex(function(s){ return s.clientId===MY_ID; });
    if(rank<0 || Date.now()-hostChangeAt < HOST_TIMEOUT_MS + rank*10000) return;
    takeOverHost();
  }
  function takeOverHost(){
    takingOver = true;
    var ref = onlineRoomRef, seen = lastRoom;
    function millis(d){ return d.hostPing && d.hostPing.toMillis ? d.hostPing.toMillis() : 0; }
    fbDb.runTransaction(function(tx){
      return tx.get(ref).then(function(snap){
        if(!snap.exists) return;
        var d = snap.data();
        if(d.hostId!==seen.hostId || d.status==='over' || millis(d)!==millis(seen)) return;   /* dio señales de vida */
        tx.update(ref, {hostId: MY_ID, hostPing: firebase.firestore.FieldValue.serverTimestamp()});
      });
    }).then(function(){ takingOver = false; }, function(err){ takingOver = false; console.warn('traspaso', err); });
  }

  /* ---- Manos privadas ----
     En la sala (rooms/{code}) solo hay tableros, mazo, descarte y cuántas cartas tiene cada jugador.
     La mano de cada jugador vive en rooms/{code}/hands/{uid}, que solo puede leer su dueño
     (y el anfitrión, para las CPUs). */
  var myHandCards = [], myHandReady = false, handUnsub = null;
  var botHands = {}, botHandReady = {}, botHandUnsubs = [], botListening = false;
  var drawGuard = -1, gloveBusy = {};

  function handsCol(){ return onlineRoomRef.collection('hands'); }

  function startHandListeners(){
    stopHandListeners();
    handUnsub = handsCol().doc(MY_ID).onSnapshot(function(s){
      myHandCards = s.exists ? (s.data().cards||[]) : [];
      myHandReady = true;
      afterHandChange();
    }, function(err){ console.warn('mano', err); });
  }
  function startBotHandListeners(){
    if(botListening || !state) return;
    botListening = true;
    state.players.forEach(function(p){
      if(!p.isBot) return;
      botHandUnsubs.push(handsCol().doc(p.id).onSnapshot(function(s){
        botHands[p.id] = s.exists ? (s.data().cards||[]) : [];
        botHandReady[p.id] = true;
        afterHandChange();
      }, function(err){ console.warn('mano CPU', err); }));
    });
  }
  function stopHandListeners(){
    if(handUnsub){ handUnsub(); handUnsub = null; }
    botHandUnsubs.forEach(function(u){ u(); });
    botHandUnsubs = []; botHands = {}; botHandReady = {}; botListening = false;
    myHandCards = []; myHandReady = false; drawGuard = -1; gloveBusy = {};
  }
  /* pone en `state` las manos que este cliente tiene permiso de ver: la suya y, si es el anfitrión, las de las CPUs */
  function attachHands(){
    if(!state) return;
    state.players.forEach(function(p){
      if(p.id===MY_ID) p.hand = myHandCards.slice();
      else if(p.isBot && isOnlineHost && botHandReady[p.id]) p.hand = botHands[p.id].slice();
      else delete p.hand;
    });
  }
  function afterHandChange(){
    if(!state || GAME_MODE!=='online') return;
    attachHands();
    render();
    onlineTurnHooks();
  }
  function publicState(){
    var gs = JSON.parse(JSON.stringify(state));
    gs.handCounts = gs.handCounts || {};
    gs.gloveFor = gs.gloveFor || [];
    gs.players.forEach(function(p){
      if(p.hand) gs.handCounts[p.id] = p.hand.length;
      delete p.hand;
    });
    return gs;
  }
  /* escribe el estado público de la sala y, en el mismo lote, la mano de quien ha actuado */
  function pushOnlineState(handOwners, onFail){
    if(!onlineRoomRef) return;
    var batch = fbDb.batch();
    batch.update(onlineRoomRef, { gameState: publicState(), status: state.over?'over':'playing' });
    (handOwners||[]).forEach(function(p){
      batch.set(handsCol().doc(p.id), { cards: JSON.parse(JSON.stringify(p.hand||[])), expireAt: expiresIn(HAND_TTL_MS) });
    });
    batch.commit().catch(function(err){ toast(T('online.syncFail',{m:err.message})); if(onFail) onFail(); });
  }

  /* Guante de Látex: quien lo sufre descarta su mano (el anfitrión lo hace por las CPUs) */
  function respondGlove(id, cards){
    if(gloveBusy[id]) return;
    gloveBusy[id] = true;
    var ref = onlineRoomRef, handRef = handsCol().doc(id);
    fbDb.runTransaction(function(tx){
      return tx.get(ref).then(function(snap){
        var gs = snap.exists && snap.data().gameState;
        if(!gs || (gs.gloveFor||[]).indexOf(id)<0) return;
        var upd = {};
        var remaining = gs.gloveFor.filter(function(x){ return x!==id; });
        upd['gameState.discard'] = (gs.discard||[]).concat(cards);
        upd['gameState.gloveFor'] = remaining;
        upd['gameState.handCounts.'+id] = 0;
        if(remaining.length===0 && !gs.over){   /* la última víctima pasa el turno que el Guante dejó pendiente */
          upd['gameState.turn'] = (gs.turn+1) % gs.players.length;
          upd['gameState.turnCount'] = (gs.turnCount||0)+1;
        }
        tx.update(ref, upd);
        tx.set(handRef, {cards: [], expireAt: expiresIn(HAND_TTL_MS)});
      });
    }).then(function(){ gloveBusy[id] = false; }, function(err){ gloveBusy[id] = false; console.warn('guante', err); });
  }
  function respondGloveIfNeeded(){
    var pending = state.gloveFor || [];
    if(!pending.length) return;
    if(pending.indexOf(MY_ID)>-1 && myHandReady) respondGlove(MY_ID, myHandCards.slice());
    if(isOnlineHost) pending.forEach(function(id){
      if(id!==MY_ID && botHandReady[id]) respondGlove(id, (botHands[id]||[]).slice());
    });
  }
  /* cada jugador roba al empezar SU turno */
  function maybeDrawMyHand(){
    if(!isHumanTurn() || !myHandReady) return;
    var p = me();
    if(!p.hand || p.hand.length>=HAND_SIZE || drawGuard===state.turnCount) return;
    drawGuard = state.turnCount;
    var before = p.hand.length;
    drawToHand(p);
    if(p.hand.length===before) return;
    render();
    pushOnlineState([p], function(){ drawGuard = -1; });
  }
  function onlineTurnHooks(){
    if(!state || state.over) return;
    respondGloveIfNeeded();
    if(glovePending()) return;   /* primero se descartan las manos, luego se roba y se juega */
    maybeDrawMyHand();
    if(isOnlineHost) maybeRunHostBotTurn();
  }

  function maybeRunHostBotTurn(){
    var cp = currentPlayer();
    if(!cp || !cp.isBot || !botHandReady[cp.id]) return;
    if(glovePending()) return;
    if(hostBotScheduledTurn===state.turnCount) return;
    hostBotScheduledTurn = state.turnCount;
    var expectedTurnCount = state.turnCount;
    setTimeout(function(){
      if(!state || state.over || state.turnCount!==expectedTurnCount) return;
      attachHands();
      var bot = currentPlayer();
      if(!bot.isBot || !bot.hand) return;
      drawToHand(bot);
      var action = decideBotAction(bot);
      if(action.type==='play'){
        if(action.card.type==='treatment') playTreatment(bot, action.card, action.target||{});
        else playCard(bot, action.card, action.target);
      } else {
        discardAndRedraw(bot, action.cardIds);
      }
      endOnlineTurn();
      render();
      pushOnlineState([bot]);
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
