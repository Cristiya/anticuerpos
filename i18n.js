/* Idiomas de la interfaz: español (por defecto en móviles en español) e inglés (resto).
   Se elige solo según el idioma del dispositivo; el botón ES/EN de la pantalla de inicio lo cambia a mano.
   Las plantillas usan {nombre}; las claves "html.*" y las que lo indican pueden llevar etiquetas <b>. */
(function(){
  "use strict";

  var DICT = {
    es: {
      'you': 'Tú', 'player': 'Jugador',
      'meta.desc': 'Arma un cuerpo sano con 4 órganos antes que tus rivales. Juega en tu móvil, contra bots o con amigos online.',

      /* pantalla de inicio */
      'setup.tag': 'Construye un cuerpo sano con 4 órganos de colores distintos antes que tus rivales. Infecta con virus, cúrate con medicina.',
      'rules.title': 'Cómo se juega',
      'rules.1': 'Coloca <b>órganos</b> de 4 colores distintos frente a ti.',
      'rules.2': 'Lanza <b>virus</b> a un órgano rival del mismo color para infectarlo; un segundo virus lo destruye.',
      'rules.3': 'Usa <b>medicina</b> en tu propio órgano para curarlo o inmunizarlo.',
      'rules.4': 'Las cartas de <b>acción</b> alteran el tablero: robos, contagios, trueques.',
      'rules.5': 'Gana quien complete su cuerpo con 4 órganos sanos o inmunes.',
      'mode.label': 'Modo de juego',
      'mode.local': 'Este dispositivo', 'mode.local.sub': 'Hasta 4 bots',
      'mode.online': 'Online', 'mode.online.sub': 'Con amigos',
      'opp.label': 'Rivales (bots)',
      'opp.1': 'Duelo', 'opp.2': 'Trío', 'opp.3': 'Caos', 'opp.4': 'Máximo',
      'btn.start': 'Empezar partida',
      'name.label': 'Tu nombre', 'name.ph': 'Ej. Marta',
      'btn.create': 'Crear sala', 'btn.join': 'Unirse a una sala',
      'code.ph': 'CÓDIGO', 'btn.enter': 'Entrar a la sala',
      'lang.switch': 'Cambiar idioma',

      /* sala */
      'lobby.code': 'Código de sala',
      'lobby.share': 'Comparte este código con tus amigos para que se unan desde su móvil.',
      'btn.addBot': 'Añadir CPU',
      'lobby.waiting': 'Esperando a que el anfitrión empiece la partida…',
      'btn.leaveLobby': 'Salir de la sala',
      'badge.host': 'Anfitrión', 'badge.bot': 'CPU',

      /* partida */
      'turn.of': 'Turno de <b>{n}</b>', 'turn.you': '<b>Tu turno</b>', 'turn.over': 'Partida terminada',
      'help.aria': 'Reglas y opciones',
      'myBody': 'Tu cuerpo', 'loading': 'Cargando…',
      'btn.discard': 'Descartar y robar', 'btn.discardConfirm': 'Confirmar descarte ({n})',
      'btn.pass': 'Pasar turno', 'btn.cancel': 'Cancelar',
      'btn.skipGlove': 'Sacar a {n} del Guante', 'btn.skipTurn': 'Saltar el turno de {n}',
      'confirm.skipGlove': '¿Sacar a {n} del Guante de Látex? Conservará su mano.',
      'confirm.skipTurn': '¿Saltar el turno de {n}?',
      'err.skip': 'No se pudo saltar el turno: {m}',

      'color.heart': 'Corazón', 'color.brain': 'Cerebro', 'color.gut': 'Estómago', 'color.bone': 'Hueso',
      'type.organ': 'Órgano', 'type.virus': 'Virus', 'type.medicine': 'Medicina', 'type.treatment': 'Acción',
      'status.immune': 'inmune', 'status.infected': 'infectado', 'status.healthy': 'sano',

      'card.organWild': 'Órgano comodín', 'card.virus': 'Virus {c}', 'card.virusWild': 'Virus comodín',
      'card.medicine': 'Medicina {c}', 'card.medicineWild': 'Medicina comodín',
      'card.sub.organ': 'Colócalo en tu cuerpo', 'card.sub.virus': 'Infecta un órgano rival',
      'card.sub.medicine': 'Cura o inmuniza tu órgano',

      'tr.contagio.title': 'Contagio', 'tr.contagio.desc': 'Pasa tus virus a órganos rivales sanos del mismo color.',
      'tr.transplante.title': 'Trasplante', 'tr.transplante.desc': 'Cambia uno de tus órganos por el de un rival (mismo color, no inmunes).',
      'tr.ladron.title': 'Ladrón de Órganos', 'tr.ladron.desc': 'Roba un órgano sano de un rival que tú no tengas.',
      'tr.guante.title': 'Guante de Látex', 'tr.guante.desc': 'Todos los rivales descartan su mano entera.',
      'tr.error.title': 'Error Médico', 'tr.error.desc': 'Intercambia tu cuerpo entero con el de un rival.',
      'opt.guante': 'Todos los rivales descartan su mano',
      'opt.contagio': 'Contagiar tus virus a rivales sanos',
      'opt.error': 'Intercambiar tu cuerpo entero con {n}',
      'opt.ladron': 'Robar {c} ({s}) de {n}',
      'opt.transplante': 'Cambiar tu {c} por el de {n}',
      'sheet.empty': 'No puedes usar esta carta ahora mismo.',

      'status.over': 'Partida terminada.',
      'status.glove': 'Guante de Látex: los rivales descartan su mano…',
      'status.mine': 'Tu turno: toca una carta para jugarla, o descarta.',
      'status.other': '{n} está jugando…',
      'status.discardMode': 'Elige de 1 a 3 cartas para descartar, luego confirma.',
      'toast.noTarget': 'No hay objetivo válido para esta carta ahora mismo.',
      'toast.pickOne': 'Selecciona al menos una carta.',

      'help.title': 'Reglas rápidas',
      'help.organ': '<b>Órgano:</b> colócalo en un hueco vacío de tu color (o cualquiera si es comodín).',
      'help.virus': '<b>Virus:</b> infecta un órgano rival sano de ese color; un segundo virus lo destruye. No afecta órganos inmunes.',
      'help.medicine': '<b>Medicina:</b> cura tu órgano infectado, o inmuniza uno sano. No afecta órganos ya inmunes.',
      'help.action': '<b>Acciones:</b> Contagio, Trasplante, Ladrón de Órganos, Guante de Látex y Error Médico alteran el tablero — lee cada carta.',
      'help.win': 'Ganas con <b>4 órganos de colores distintos</b>, todos sanos o inmunes (ninguno infectado).',
      'help.close': 'Entendido', 'help.leave': 'Abandonar partida', 'help.leaveConfirm': '¿Abandonar la partida?',

      'win.me': '¡Ganaste!', 'win.other': '{n} gana',
      'win.meMsg': '¡Has completado un cuerpo sano antes que nadie!', 'win.otherMsg': '{n} ha completado su cuerpo primero.',
      'win.again': 'Jugar otra vez',

      /* registro de la partida */
      'log.deckRecycled': 'El mazo se recicla desde el descarte.',
      'log.organ': '{a} coloca un órgano en {c}.',
      'log.immunize': '{a} inmuniza su {c}.',
      'log.heal': '{a} cura su {c}.',
      'log.infect': '{a} infecta el {c} de {o}.',
      'log.destroy': '{a} destruye el {c} de {o}!',
      'log.glove': '{a} usa Guante de Látex: ¡todos descartan su mano!',
      'log.contagion': 'Contagio: {a} pasa el virus de {c} a {o}.',
      'log.error': '{a} usa Error Médico con {o}: ¡cuerpos intercambiados!',
      'log.steal': '{a} roba el {c} de {o}.',
      'log.transplant': '{a} hace un trasplante de {c} con {o}.',
      'log.discard': '{a} descarta {n} carta(s) y roba de nuevo.',
      'log.start': 'La partida comienza. ¡Suerte, doctor!',
      'log.pass': '{a} pasa el turno (mano vacía).',
      'log.skipTurn': '{a} pierde el turno (sin respuesta).',
      'log.skipGlove': '{a} sale del Guante (sin respuesta).',
      /* variantes cuando el que actúa (.you) o el afectado (.toyou) eres tú */
      'log.organ.you': 'Colocas un órgano en {c}.',
      'log.immunize.you': 'Inmunizas tu {c}.',
      'log.heal.you': 'Curas tu {c}.',
      'log.infect.you': 'Infectas el {c} de {o}.', 'log.infect.toyou': '{a} infecta tu {c}.',
      'log.destroy.you': '¡Destruyes el {c} de {o}!', 'log.destroy.toyou': '¡{a} destruye tu {c}!',
      'log.glove.you': 'Usas Guante de Látex: ¡todos descartan su mano!',
      'log.contagion.you': 'Contagio: pasas el virus de {c} a {o}.', 'log.contagion.toyou': 'Contagio: {a} te pasa el virus de {c}.',
      'log.error.you': 'Usas Error Médico con {o}: ¡cuerpos intercambiados!', 'log.error.toyou': '{a} usa Error Médico contigo: ¡cuerpos intercambiados!',
      'log.steal.you': 'Robas el {c} de {o}.', 'log.steal.toyou': '{a} te roba el {c}.',
      'log.transplant.you': 'Haces un trasplante de {c} con {o}.', 'log.transplant.toyou': '{a} hace un trasplante de {c} contigo.',
      'log.discard.you': 'Descartas {n} carta(s) y robas de nuevo.',
      'log.pass.you': 'Pasas el turno (mano vacía).',
      'log.skipTurn.you': 'Pierdes el turno (sin respuesta).',
      'log.skipGlove.you': 'Sales del Guante (sin respuesta).',

      /* online */
      'bots': 'Dr. Patógeno|Dra. Antígena|Dr. Bacilo|Dra. Espora',
      'online.notConfigured': 'El online todavía no está configurado (falta firebase-config.js). Mira las instrucciones del proyecto.',
      'online.creating': 'Creando sala…', 'online.createFail': 'No se pudo crear la sala: {m}',
      'online.codeLen': 'Escribe el código de 4 letras/números.', 'online.joining': 'Entrando a la sala…',
      'online.notFound': 'No existe ninguna sala con ese código.', 'online.started': 'Esa partida ya ha empezado.',
      'online.full': 'La sala ya está llena (máximo 5).', 'online.joinFail': 'No se pudo entrar a la sala: {m}',
      'online.closed': 'La sala ha sido cerrada.', 'online.lost': 'Conexión perdida: {m}',
      'online.kicked': 'El anfitrión te ha sacado de la sala.', 'online.startFail': 'No se pudo empezar la partida: {m}',
      'online.syncFail': 'No se pudo sincronizar: {m}',
      'online.nowHost': 'Ahora eres el anfitrión de la sala.', 'online.hostIs': '{n} es ahora el anfitrión.',
      'online.anotherPlayer': 'Otro jugador'
    },

    en: {
      'you': 'You', 'player': 'Player',
      'meta.desc': 'Build a healthy body with 4 organs before your rivals. Play on your phone, against bots or online with friends.',

      'setup.tag': 'Build a healthy body with 4 organs of different colors before your rivals. Infect them with viruses, heal yourself with medicine.',
      'rules.title': 'How to play',
      'rules.1': 'Place <b>organs</b> of 4 different colors in front of you.',
      'rules.2': 'Throw a <b>virus</b> at a rival organ of the same color to infect it; a second virus destroys it.',
      'rules.3': 'Use <b>medicine</b> on your own organ to heal or immunize it.',
      'rules.4': '<b>Action</b> cards shake up the board: thefts, contagion, swaps.',
      'rules.5': 'The first to complete a body with 4 healthy or immune organs wins.',
      'mode.label': 'Game mode',
      'mode.local': 'This device', 'mode.local.sub': 'Up to 4 bots',
      'mode.online': 'Online', 'mode.online.sub': 'With friends',
      'opp.label': 'Opponents (bots)',
      'opp.1': 'Duel', 'opp.2': 'Trio', 'opp.3': 'Chaos', 'opp.4': 'Max',
      'btn.start': 'Start game',
      'name.label': 'Your name', 'name.ph': 'e.g. Sam',
      'btn.create': 'Create room', 'btn.join': 'Join a room',
      'code.ph': 'CODE', 'btn.enter': 'Enter room',
      'lang.switch': 'Change language',

      'lobby.code': 'Room code',
      'lobby.share': 'Share this code with your friends so they can join from their phones.',
      'btn.addBot': 'Add CPU',
      'lobby.waiting': 'Waiting for the host to start the game…',
      'btn.leaveLobby': 'Leave room',
      'badge.host': 'Host', 'badge.bot': 'CPU',

      'turn.of': '<b>{n}</b>’s turn', 'turn.you': '<b>Your turn</b>', 'turn.over': 'Game over',
      'help.aria': 'Rules and options',
      'myBody': 'Your body', 'loading': 'Loading…',
      'btn.discard': 'Discard & draw', 'btn.discardConfirm': 'Confirm discard ({n})',
      'btn.pass': 'Pass turn', 'btn.cancel': 'Cancel',
      'btn.skipGlove': 'Take {n} out of the Glove', 'btn.skipTurn': 'Skip {n}’s turn',
      'confirm.skipGlove': 'Take {n} out of the Latex Glove? They keep their hand.',
      'confirm.skipTurn': 'Skip {n}’s turn?',
      'err.skip': 'Couldn’t skip the turn: {m}',

      'color.heart': 'Heart', 'color.brain': 'Brain', 'color.gut': 'Stomach', 'color.bone': 'Bone',
      'type.organ': 'Organ', 'type.virus': 'Virus', 'type.medicine': 'Medicine', 'type.treatment': 'Action',
      'status.immune': 'immune', 'status.infected': 'infected', 'status.healthy': 'healthy',

      'card.organWild': 'Wild organ', 'card.virus': '{C} virus', 'card.virusWild': 'Wild virus',
      'card.medicine': '{C} medicine', 'card.medicineWild': 'Wild medicine',
      'card.sub.organ': 'Place it on your body', 'card.sub.virus': 'Infect a rival organ',
      'card.sub.medicine': 'Heal or immunize your organ',

      'tr.contagio.title': 'Contagion', 'tr.contagio.desc': 'Pass your viruses to healthy rival organs of the same color.',
      'tr.transplante.title': 'Transplant', 'tr.transplante.desc': 'Swap one of your organs with a rival’s (same color, not immune).',
      'tr.ladron.title': 'Organ Thief', 'tr.ladron.desc': 'Steal a healthy organ from a rival that you don’t have.',
      'tr.guante.title': 'Latex Glove', 'tr.guante.desc': 'All rivals discard their entire hand.',
      'tr.error.title': 'Medical Error', 'tr.error.desc': 'Swap your entire body with a rival’s.',
      'opt.guante': 'All rivals discard their hand',
      'opt.contagio': 'Spread your viruses to healthy rivals',
      'opt.error': 'Swap your whole body with {n}',
      'opt.ladron': 'Steal {c} ({s}) from {n}',
      'opt.transplante': 'Swap your {c} with {n}’s',
      'sheet.empty': 'You can’t use this card right now.',

      'status.over': 'Game over.',
      'status.glove': 'Latex Glove: rivals are discarding their hands…',
      'status.mine': 'Your turn: tap a card to play it, or discard.',
      'status.other': '{n} is playing…',
      'status.discardMode': 'Pick 1 to 3 cards to discard, then confirm.',
      'toast.noTarget': 'No valid target for this card right now.',
      'toast.pickOne': 'Select at least one card.',

      'help.title': 'Quick rules',
      'help.organ': '<b>Organ:</b> place it in an empty slot of its color (any slot if it’s wild).',
      'help.virus': '<b>Virus:</b> infects a healthy rival organ of that color; a second virus destroys it. It doesn’t affect immune organs.',
      'help.medicine': '<b>Medicine:</b> heals your infected organ, or immunizes a healthy one. It doesn’t affect organs that are already immune.',
      'help.action': '<b>Actions:</b> Contagion, Transplant, Organ Thief, Latex Glove and Medical Error change the board — read each card.',
      'help.win': 'You win with <b>4 organs of different colors</b>, all healthy or immune (none infected).',
      'help.close': 'Got it', 'help.leave': 'Leave game', 'help.leaveConfirm': 'Leave the game?',

      'win.me': 'You won!', 'win.other': '{n} wins',
      'win.meMsg': 'You completed a healthy body before anyone else!', 'win.otherMsg': '{n} completed their body first.',
      'win.again': 'Play again',

      'log.deckRecycled': 'The deck is reshuffled from the discard pile.',
      'log.organ': '{a} places an organ on {c}.',
      'log.immunize': '{a} immunizes their {c}.',
      'log.heal': '{a} heals their {c}.',
      'log.infect': '{a} infects {o}’s {c}.',
      'log.destroy': '{a} destroys {o}’s {c}!',
      'log.glove': '{a} plays Latex Glove: everyone discards their hand!',
      'log.contagion': 'Contagion: {a} passes the {c} virus to {o}.',
      'log.error': '{a} plays Medical Error with {o}: bodies swapped!',
      'log.steal': '{a} steals {o}’s {c}.',
      'log.transplant': '{a} swaps {c} with {o}.',
      'log.discard': '{a} discards {n} card(s) and draws again.',
      'log.start': 'The game begins. Good luck, doctor!',
      'log.pass': '{a} passes the turn (empty hand).',
      'log.skipTurn': '{a} loses their turn (no response).',
      'log.skipGlove': '{a} is taken out of the Glove (no response).',
      'log.organ.you': 'You place an organ on {c}.',
      'log.immunize.you': 'You immunize your {c}.',
      'log.heal.you': 'You heal your {c}.',
      'log.infect.you': 'You infect {o}’s {c}.', 'log.infect.toyou': '{a} infects your {c}.',
      'log.destroy.you': 'You destroy {o}’s {c}!', 'log.destroy.toyou': '{a} destroys your {c}!',
      'log.glove.you': 'You play Latex Glove: everyone discards their hand!',
      'log.contagion.you': 'Contagion: you pass the {c} virus to {o}.', 'log.contagion.toyou': 'Contagion: {a} passes the {c} virus to you.',
      'log.error.you': 'You play Medical Error with {o}: bodies swapped!', 'log.error.toyou': '{a} plays Medical Error with you: bodies swapped!',
      'log.steal.you': 'You steal {o}’s {c}.', 'log.steal.toyou': '{a} steals your {c}.',
      'log.transplant.you': 'You swap {c} with {o}.', 'log.transplant.toyou': '{a} swaps {c} with you.',
      'log.discard.you': 'You discard {n} card(s) and draw again.',
      'log.pass.you': 'You pass the turn (empty hand).',
      'log.skipTurn.you': 'You lose your turn (no response).',
      'log.skipGlove.you': 'You are taken out of the Glove (no response).',

      'bots': 'Dr. Pathogen|Dr. Antigen|Dr. Bacillus|Dr. Spore',
      'online.notConfigured': 'Online play isn’t configured yet (firebase-config.js is missing). See the project instructions.',
      'online.creating': 'Creating room…', 'online.createFail': 'Couldn’t create the room: {m}',
      'online.codeLen': 'Enter the 4-character code.', 'online.joining': 'Joining room…',
      'online.notFound': 'There is no room with that code.', 'online.started': 'That game has already started.',
      'online.full': 'The room is full (max 5).', 'online.joinFail': 'Couldn’t join the room: {m}',
      'online.closed': 'The room has been closed.', 'online.lost': 'Connection lost: {m}',
      'online.kicked': 'The host removed you from the room.', 'online.startFail': 'Couldn’t start the game: {m}',
      'online.syncFail': 'Couldn’t sync: {m}',
      'online.nowHost': 'You are now the room host.', 'online.hostIs': '{n} is now the host.',
      'online.anotherPlayer': 'Another player'
    }
  };

  function detectLang(){
    try{
      var saved = localStorage.getItem('anticuerpos_lang');
      if(saved && DICT[saved]) return saved;
    }catch(e){}
    var n = String((navigator.languages && navigator.languages[0]) || navigator.language || 'es').toLowerCase();
    return n.indexOf('es')===0 ? 'es' : 'en';
  }
  var lang = detectLang();

  /* T('clave', {n:'Ana'}) -> texto en el idioma actual, con {n} sustituido */
  function T(key, params){
    var s = (DICT[lang] && DICT[lang][key]);
    if(s===undefined) s = DICT.es[key];
    if(s===undefined) return key;
    return s.replace(/\{(\w+)\}/g, function(_, k){ return params && params[k]!=null ? params[k] : ''; });
  }

  /* rellena el HTML estático: data-i18n (texto), data-i18n-html (con <b>), data-i18n-ph, data-i18n-aria */
  function applyStatic(){
    document.documentElement.lang = lang;
    var q = function(sel, fn){ Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
    q('[data-i18n]', function(el){ el.textContent = T(el.getAttribute('data-i18n')); });
    q('[data-i18n-html]', function(el){ el.innerHTML = T(el.getAttribute('data-i18n-html')); });
    q('[data-i18n-ph]', function(el){ el.setAttribute('placeholder', T(el.getAttribute('data-i18n-ph'))); });
    q('[data-i18n-aria]', function(el){ el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria'))); });
    var md = document.querySelector('meta[name="description"]'); if(md) md.setAttribute('content', T('meta.desc'));
    var tg = document.getElementById('btnLang'); if(tg) tg.textContent = lang==='es' ? 'EN' : 'ES';
  }
  function setLang(l){
    if(!DICT[l]) return;
    lang = l;
    try{ localStorage.setItem('anticuerpos_lang', l); }catch(e){}
    applyStatic();
  }

  window.T = T;
  window.hasT = function(key){ return !!(DICT[lang] && DICT[lang][key]!==undefined); };
  window.getLang = function(){ return lang; };
  window.setLang = setLang;
  window.applyStaticI18n = applyStatic;
})();
