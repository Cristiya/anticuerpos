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
      'setup.tag': 'Construye un cuerpo sano con 4 órganos de colores distintos antes que tus rivales. Infecta con patógenos, defiéndete con anticuerpos.',
      'rules.title': 'Cómo se juega',
      'rules.1': 'Coloca <b>órganos</b> de 4 colores distintos frente a ti.',
      'rules.2': 'Lanza <b>patógenos</b> a un órgano rival del mismo color para infectarlo; un segundo patógeno lo destruye.',
      'rules.3': 'Usa <b>anticuerpos</b> en tu propio órgano: curan uno infectado, protegen uno sano y un <b>segundo anticuerpo</b> lo deja inmune.',
      'rules.4': 'Las cartas de <b>acción</b> alteran el tablero: brotes, trueques, barreras…',
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
      'btn.share': 'Compartir enlace',
      'share.text': 'Juega conmigo a Anticuerpos. Sala {c}',
      'share.copied': 'Enlace copiado. Pégalo en WhatsApp o donde quieras.',
      'share.copyPrompt': 'Copia este enlace y envíalo:',
      'invite.hint': 'Te han invitado a la sala {c}. Escribe tu nombre y pulsa Entrar.',
      'invite.hintName': 'Te han invitado a la sala {c}. Pulsa Entrar para unirte.',
      'lobby.waiting': 'Esperando a que el anfitrión empiece la partida…',
      'btn.leaveLobby': 'Salir de la sala',
      'badge.host': 'Anfitrión', 'badge.bot': 'CPU',

      /* partida */
      'turn.of': 'Turno de <b>{n}</b>', 'turn.you': '<b>Tu turno</b>', 'turn.over': 'Partida terminada',
      'help.aria': 'Reglas y opciones',
      'myBody': 'Tu cuerpo', 'loading': 'Cargando…',
      'btn.discard': 'Descartar y robar', 'btn.discardConfirm': 'Confirmar descarte ({n})',
      'btn.pass': 'Pasar turno', 'btn.cancel': 'Cancelar',
      'btn.skipGlove': 'Sacar a {n} de la Cuarentena', 'btn.skipTurn': 'Saltar el turno de {n}',
      'confirm.skipGlove': '¿Sacar a {n} de la Cuarentena? Conservará su mano.',
      'confirm.skipTurn': '¿Saltar el turno de {n}?',
      'err.skip': 'No se pudo saltar el turno: {m}',

      'color.heart': 'Corazón', 'color.brain': 'Cerebro', 'color.lung': 'Pulmón', 'color.kidney': 'Riñón',
      'type.organ': 'Órgano', 'type.virus': 'Patógeno', 'type.medicine': 'Anticuerpo', 'type.treatment': 'Acción',
      'status.immune': 'inmune', 'status.vaccinated': 'protegido', 'status.infected': 'infectado', 'status.healthy': 'sano',

      'card.organWild': 'Órgano comodín', 'card.virus': 'Patógeno {c}', 'card.virusWild': 'Patógeno comodín',
      'card.medicine': 'Anticuerpo {c}', 'card.medicineWild': 'Anticuerpo comodín',
      'card.sub.organ': 'Colócalo en tu cuerpo', 'card.sub.virus': 'Infecta un órgano rival',
      'card.sub.medicine': 'Cura, protege o inmuniza tu órgano',

      'tr.contagio.title': 'Brote', 'tr.contagio.desc': 'Pasa tus patógenos a órganos rivales sanos del mismo color.',
      'tr.transplante.title': 'Trueque', 'tr.transplante.desc': 'Cambia uno de tus órganos por el de un rival (mismo color, no inmunes).',
      'tr.ladron.title': 'Saqueo', 'tr.ladron.desc': 'Roba un órgano sano de un rival que tú no tengas.',
      'tr.guante.title': 'Cuarentena', 'tr.guante.desc': 'Todos los rivales descartan su mano entera.',
      'tr.error.title': 'Mutación', 'tr.error.desc': 'Intercambia tu cuerpo entero con el de un rival.',
      'tr.barrera.title': 'Barrera', 'tr.barrera.desc': 'Protege uno de tus órganos: nadie podrá infectarlo, robarlo ni cambiarlo hasta tu próximo turno.',
      'tr.inmuno.title': 'Inmunosupresor', 'tr.inmuno.desc': 'Debilita la defensa de un órgano rival: inmune pasa a protegido y protegido a sano.',
      'tr.regen.title': 'Regeneración', 'tr.regen.desc': 'Recupera del descarte un órgano que te falte y colócalo sano en tu cuerpo.',
      'opt.barrera': 'Barrera sobre tu {c} ({s})', 'opt.inmuno': 'Debilitar {c} ({s}) de {n}', 'opt.regen': 'Regenerar {c} desde el descarte',
      'opt.guante': 'Todos los rivales descartan su mano',
      'opt.contagio': 'Contagiar tus patógenos a rivales sanos',
      'opt.error': 'Intercambiar tu cuerpo entero con {n}',
      'opt.ladron': 'Robar {c} ({s}) de {n}',
      'opt.transplante': 'Cambiar tu {c} por el de {n}',
      'sheet.empty': 'No puedes usar esta carta ahora mismo.',

      'status.over': 'Partida terminada.',
      'status.glove': 'Cuarentena: los rivales descartan su mano…',
      'status.mine': 'Tu turno: toca una carta para jugarla, o descarta.',
      'status.other': '{n} está jugando…',
      'status.discardMode': 'Elige de 1 a 3 cartas para descartar, luego confirma.',
      'toast.noTarget': 'No hay objetivo válido para esta carta ahora mismo.',
      'toast.pickOne': 'Selecciona al menos una carta.',

      'help.title': 'Reglas rápidas',
      'help.organ': '<b>Órgano:</b> colócalo en un hueco vacío de tu color (o cualquiera si es comodín).',
      'help.virus': '<b>Patógeno:</b> infecta un órgano rival sano de ese color; un segundo patógeno lo destruye. Si está protegido, solo rompe la protección. No afecta órganos inmunes.',
      'help.medicine': '<b>Anticuerpo:</b> cura tu órgano infectado. Sobre uno sano lo <b>protege</b>; un <b>segundo anticuerpo</b> lo deja <b>inmune</b>. No afecta órganos ya inmunes.',
      'help.action': '<b>Acciones:</b> Brote, Trueque, Saqueo, Cuarentena, Mutación, Barrera, Inmunosupresor y Regeneración alteran el tablero — lee cada carta.',
      'help.doctors': '<b>Doctores:</b> cada asiento tiene un poder propio.',
      'power.0.name': 'Médico de guardia', 'power.0.desc': 'Al curar un órgano infectado, robas 1 carta.',
      'power.1.name': 'Inmunólogo', 'power.1.desc': 'Al dejar inmune un órgano, robas 1 carta.',
      'power.2.name': 'Virólogo', 'power.2.desc': 'Al destruir un órgano rival, robas 1 carta.',
      'power.3.name': 'Cirujano', 'power.3.desc': 'Al usar Trueque, Saqueo o Regeneración, robas 1 carta.',
      'power.mine': 'Eres {p}: {d}',
      'help.win': 'Ganas con <b>4 órganos de colores distintos</b>, todos sanos o inmunes (ninguno infectado).',
      'help.close': 'Entendido', 'help.leave': 'Abandonar partida', 'help.leaveConfirm': '¿Abandonar la partida?',

      'win.me': '¡Ganaste!', 'win.other': '{n} gana',
      'win.meMsg': '¡Has completado un cuerpo sano antes que nadie!', 'win.otherMsg': '{n} ha completado su cuerpo primero.',
      'win.again': 'Jugar otra vez',
      'sound.aria': 'Sonido y vibración', 'sound.on': 'Sonido y vibración: sí', 'sound.off': 'Sonido y vibración: no',

      /* registro de la partida */
      'log.deckRecycled': 'El mazo se recicla desde el descarte.',
      'log.organ': '{a} coloca un órgano en {c}.',
      'log.vaccinate': '{a} protege su {c}.',
      'log.barrier': '{a} protege su {c} con una barrera.',
      'log.weaken': '{a} debilita el {c} de {o}.',
      'log.regen': '{a} regenera su {c}.',
      'log.power': 'Poder de {pw}: {a} roba 1 carta.',
      'log.unvaccinate': '{a} rompe la protección del {c} de {o}.',
      'log.immunize': '{a} inmuniza su {c}.',
      'log.heal': '{a} cura su {c}.',
      'log.infect': '{a} infecta el {c} de {o}.',
      'log.destroy': '{a} destruye el {c} de {o}!',
      'log.glove': '{a} usa Cuarentena: ¡todos descartan su mano!',
      'log.contagion': 'Brote: {a} pasa el patógeno de {c} a {o}.',
      'log.error': '{a} usa Mutación con {o}: ¡cuerpos intercambiados!',
      'log.steal': '{a} roba el {c} de {o}.',
      'log.transplant': '{a} hace un trueque de {c} con {o}.',
      'log.discard': '{a} descarta {n} carta(s) y roba de nuevo.',
      'log.start': 'La partida comienza. ¡Suerte, doctor!',
      'log.pass': '{a} pasa el turno (mano vacía).',
      'log.skipTurn': '{a} pierde el turno (sin respuesta).',
      'log.skipGlove': '{a} sale de la Cuarentena (sin respuesta).',
      /* variantes cuando el que actúa (.you) o el afectado (.toyou) eres tú */
      'log.organ.you': 'Colocas un órgano en {c}.',
      'log.vaccinate.you': 'Proteges tu {c}.',
      'log.barrier.you': 'Proteges tu {c} con una barrera.',
      'log.weaken.you': 'Debilitas el {c} de {o}.', 'log.weaken.toyou': '{a} debilita tu {c}.',
      'log.regen.you': 'Regeneras tu {c}.',
      'log.power.you': 'Poder de {pw}: robas 1 carta.',
      'log.unvaccinate.you': 'Rompes la protección del {c} de {o}.', 'log.unvaccinate.toyou': '{a} rompe la protección de tu {c}.',
      'log.immunize.you': 'Inmunizas tu {c}.',
      'log.heal.you': 'Curas tu {c}.',
      'log.infect.you': 'Infectas el {c} de {o}.', 'log.infect.toyou': '{a} infecta tu {c}.',
      'log.destroy.you': '¡Destruyes el {c} de {o}!', 'log.destroy.toyou': '¡{a} destruye tu {c}!',
      'log.glove.you': 'Usas Cuarentena: ¡todos descartan su mano!',
      'log.contagion.you': 'Brote: pasas el patógeno de {c} a {o}.', 'log.contagion.toyou': 'Brote: {a} te pasa el patógeno de {c}.',
      'log.error.you': 'Usas Mutación con {o}: ¡cuerpos intercambiados!', 'log.error.toyou': '{a} usa Mutación contigo: ¡cuerpos intercambiados!',
      'log.steal.you': 'Robas el {c} de {o}.', 'log.steal.toyou': '{a} te roba el {c}.',
      'log.transplant.you': 'Haces un trueque de {c} con {o}.', 'log.transplant.toyou': '{a} hace un trueque de {c} contigo.',
      'log.discard.you': 'Descartas {n} carta(s) y robas de nuevo.',
      'log.pass.you': 'Pasas el turno (mano vacía).',
      'log.skipTurn.you': 'Pierdes el turno (sin respuesta).',
      'log.skipGlove.you': 'Sales de la Cuarentena (sin respuesta).',

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

      'setup.tag': 'Build a healthy body with 4 organs of different colors before your rivals. Infect them with pathogens, defend yourself with antibodies.',
      'rules.title': 'How to play',
      'rules.1': 'Place <b>organs</b> of 4 different colors in front of you.',
      'rules.2': 'Throw a <b>pathogen</b> at a rival organ of the same color to infect it; a second pathogen destroys it.',
      'rules.3': 'Use <b>antibodies</b> on your own organ: they heal an infected one, protect a healthy one, and a <b>second antibody</b> makes it immune.',
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
      'btn.share': 'Share link',
      'share.text': 'Play Anticuerpos with me. Room {c}',
      'share.copied': 'Link copied. Paste it in WhatsApp or anywhere you like.',
      'share.copyPrompt': 'Copy this link and send it:',
      'invite.hint': 'You’re invited to room {c}. Enter your name and tap Enter.',
      'invite.hintName': 'You’re invited to room {c}. Tap Enter to join.',
      'lobby.waiting': 'Waiting for the host to start the game…',
      'btn.leaveLobby': 'Leave room',
      'badge.host': 'Host', 'badge.bot': 'CPU',

      'turn.of': '<b>{n}</b>’s turn', 'turn.you': '<b>Your turn</b>', 'turn.over': 'Game over',
      'help.aria': 'Rules and options',
      'myBody': 'Your body', 'loading': 'Loading…',
      'btn.discard': 'Discard & draw', 'btn.discardConfirm': 'Confirm discard ({n})',
      'btn.pass': 'Pass turn', 'btn.cancel': 'Cancel',
      'btn.skipGlove': 'Take {n} out of Quarantine', 'btn.skipTurn': 'Skip {n}’s turn',
      'confirm.skipGlove': 'Take {n} out of Quarantine? They keep their hand.',
      'confirm.skipTurn': 'Skip {n}’s turn?',
      'err.skip': 'Couldn’t skip the turn: {m}',

      'color.heart': 'Heart', 'color.brain': 'Brain', 'color.lung': 'Lung', 'color.kidney': 'Kidney',
      'type.organ': 'Organ', 'type.virus': 'Pathogen', 'type.medicine': 'Antibody', 'type.treatment': 'Action',
      'status.immune': 'immune', 'status.vaccinated': 'protected', 'status.infected': 'infected', 'status.healthy': 'healthy',

      'card.organWild': 'Wild organ', 'card.virus': '{C} pathogen', 'card.virusWild': 'Wild pathogen',
      'card.medicine': '{C} antibody', 'card.medicineWild': 'Wild antibody',
      'card.sub.organ': 'Place it on your body', 'card.sub.virus': 'Infect a rival organ',
      'card.sub.medicine': 'Heal, protect or immunize your organ',

      'tr.contagio.title': 'Outbreak', 'tr.contagio.desc': 'Pass your pathogens to healthy rival organs of the same color.',
      'tr.transplante.title': 'Barter', 'tr.transplante.desc': 'Swap one of your organs with a rival’s (same color, not immune).',
      'tr.ladron.title': 'Raid', 'tr.ladron.desc': 'Steal a healthy organ from a rival that you don’t have.',
      'tr.guante.title': 'Quarantine', 'tr.guante.desc': 'All rivals discard their entire hand.',
      'tr.error.title': 'Mutation', 'tr.error.desc': 'Swap your entire body with a rival’s.',
      'tr.barrera.title': 'Barrier', 'tr.barrera.desc': 'Shield one of your organs: no one can infect, steal or swap it until your next turn.',
      'tr.inmuno.title': 'Immune Breaker', 'tr.inmuno.desc': 'Weaken a rival organ’s defense: immune becomes protected, protected becomes healthy.',
      'tr.regen.title': 'Regeneration', 'tr.regen.desc': 'Take an organ you’re missing from the discard pile and place it healthy on your body.',
      'opt.barrera': 'Barrier on your {c} ({s})', 'opt.inmuno': 'Weaken {n}’s {c} ({s})', 'opt.regen': 'Regenerate {c} from the discard pile',
      'opt.guante': 'All rivals discard their hand',
      'opt.contagio': 'Spread your pathogens to healthy rivals',
      'opt.error': 'Swap your whole body with {n}',
      'opt.ladron': 'Steal {c} ({s}) from {n}',
      'opt.transplante': 'Swap your {c} with {n}’s',
      'sheet.empty': 'You can’t use this card right now.',

      'status.over': 'Game over.',
      'status.glove': 'Quarantine: rivals are discarding their hands…',
      'status.mine': 'Your turn: tap a card to play it, or discard.',
      'status.other': '{n} is playing…',
      'status.discardMode': 'Pick 1 to 3 cards to discard, then confirm.',
      'toast.noTarget': 'No valid target for this card right now.',
      'toast.pickOne': 'Select at least one card.',

      'help.title': 'Quick rules',
      'help.organ': '<b>Organ:</b> place it in an empty slot of its color (any slot if it’s wild).',
      'help.virus': '<b>Pathogen:</b> infects a healthy rival organ of that color; a second pathogen destroys it. If it’s protected, it only breaks the protection. It doesn’t affect immune organs.',
      'help.medicine': '<b>Antibody:</b> heals your infected organ. On a healthy one it <b>protects</b> it; a <b>second antibody</b> makes it <b>immune</b>. It doesn’t affect organs that are already immune.',
      'help.action': '<b>Actions:</b> Outbreak, Barter, Raid, Quarantine, Mutation, Barrier, Immune Breaker and Regeneration change the board — read each card.',
      'help.doctors': '<b>Doctors:</b> each seat has its own power.',
      'power.0.name': 'On-call Doctor', 'power.0.desc': 'When you heal an infected organ, you draw 1 card.',
      'power.1.name': 'Immunologist', 'power.1.desc': 'When you make an organ immune, you draw 1 card.',
      'power.2.name': 'Virologist', 'power.2.desc': 'When you destroy a rival organ, you draw 1 card.',
      'power.3.name': 'Surgeon', 'power.3.desc': 'When you play Barter, Raid or Regeneration, you draw 1 card.',
      'power.mine': 'You are {p}: {d}',
      'help.win': 'You win with <b>4 organs of different colors</b>, all healthy or immune (none infected).',
      'help.close': 'Got it', 'help.leave': 'Leave game', 'help.leaveConfirm': 'Leave the game?',

      'win.me': 'You won!', 'win.other': '{n} wins',
      'win.meMsg': 'You completed a healthy body before anyone else!', 'win.otherMsg': '{n} completed their body first.',
      'win.again': 'Play again',
      'sound.aria': 'Sound and vibration', 'sound.on': 'Sound and vibration: on', 'sound.off': 'Sound and vibration: off',

      'log.deckRecycled': 'The deck is reshuffled from the discard pile.',
      'log.organ': '{a} places an organ on {c}.',
      'log.vaccinate': '{a} protects their {c}.',
      'log.barrier': '{a} shields their {c} with a barrier.',
      'log.weaken': '{a} weakens {o}’s {c}.',
      'log.regen': '{a} regenerates their {c}.',
      'log.power': 'Power of {pw}: {a} draws 1 card.',
      'log.unvaccinate': '{a} breaks the protection on {o}’s {c}.',
      'log.immunize': '{a} immunizes their {c}.',
      'log.heal': '{a} heals their {c}.',
      'log.infect': '{a} infects {o}’s {c}.',
      'log.destroy': '{a} destroys {o}’s {c}!',
      'log.glove': '{a} plays Quarantine: everyone discards their hand!',
      'log.contagion': 'Outbreak: {a} passes the {c} pathogen to {o}.',
      'log.error': '{a} plays Mutation with {o}: bodies swapped!',
      'log.steal': '{a} steals {o}’s {c}.',
      'log.transplant': '{a} barters {c} with {o}.',
      'log.discard': '{a} discards {n} card(s) and draws again.',
      'log.start': 'The game begins. Good luck, doctor!',
      'log.pass': '{a} passes the turn (empty hand).',
      'log.skipTurn': '{a} loses their turn (no response).',
      'log.skipGlove': '{a} is taken out of Quarantine (no response).',
      'log.organ.you': 'You place an organ on {c}.',
      'log.vaccinate.you': 'You protect your {c}.',
      'log.barrier.you': 'You shield your {c} with a barrier.',
      'log.weaken.you': 'You weaken {o}’s {c}.', 'log.weaken.toyou': '{a} weakens your {c}.',
      'log.regen.you': 'You regenerate your {c}.',
      'log.power.you': 'Power of {pw}: you draw 1 card.',
      'log.unvaccinate.you': 'You break the protection on {o}’s {c}.', 'log.unvaccinate.toyou': '{a} breaks the protection on your {c}.',
      'log.immunize.you': 'You immunize your {c}.',
      'log.heal.you': 'You heal your {c}.',
      'log.infect.you': 'You infect {o}’s {c}.', 'log.infect.toyou': '{a} infects your {c}.',
      'log.destroy.you': 'You destroy {o}’s {c}!', 'log.destroy.toyou': '{a} destroys your {c}!',
      'log.glove.you': 'You play Quarantine: everyone discards their hand!',
      'log.contagion.you': 'Outbreak: you pass the {c} pathogen to {o}.', 'log.contagion.toyou': 'Outbreak: {a} passes the {c} pathogen to you.',
      'log.error.you': 'You play Mutation with {o}: bodies swapped!', 'log.error.toyou': '{a} plays Mutation with you: bodies swapped!',
      'log.steal.you': 'You steal {o}’s {c}.', 'log.steal.toyou': '{a} steals your {c}.',
      'log.transplant.you': 'You barter {c} with {o}.', 'log.transplant.toyou': '{a} barters {c} with you.',
      'log.discard.you': 'You discard {n} card(s) and draw again.',
      'log.pass.you': 'You pass the turn (empty hand).',
      'log.skipTurn.you': 'You lose your turn (no response).',
      'log.skipGlove.you': 'You are taken out of Quarantine (no response).',

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
