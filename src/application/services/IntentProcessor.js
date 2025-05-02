import { Intent } from '../../domain/entities/Intent';

export class IntentProcessor {
  constructor() {
    this.patterns = {
      GET_ROSTER: [
        /time atual/i,
        /roster/i,
        /elenco/i,
        /jogadores/i,
        /lineup/i,
        /line-up/i,
        /line up/i
      ],
      GET_LAST_MATCH: [
        /última partida/i,
        /último jogo/i,
        /resultado/i,
        /placar/i,
        /score/i
      ],
      GET_NEXT_MATCH: [
        /próxima partida/i,
        /próximo jogo/i,
        /quando joga/i,
        /agenda/i,
        /calendário/i
      ],
      GET_PLAYER_STATS: [
        /estatísticas (?:do|da) (.+)/i,
        /stats (?:do|da) (.+)/i,
        /k\/d (?:do|da) (.+)/i,
        /rating (?:do|da) (.+)/i
      ],
      GET_TEAM_RANKING: [
        /ranking/i,
        /posição/i,
        /lugar/i,
        /classificação/i
      ],
      GET_LIVE_MATCH: [
        /live/i,
        /ao vivo/i,
        /partida ao vivo/i,
        /jogo ao vivo/i,
        /está acontecendo/i,
        /acontecendo/i,
        /agora/i
      ]
    };

    this.playerNames = [
      'kscerato',
      'fallen',
      'yuurih',
      'yekindar',
      'molodoy',
      'sidde'
    ];
  }

  extractEntities(message) {
    const entities = {};
    
    const playerMentioned = this.playerNames.find(player => 
      message.toLowerCase().includes(player.toLowerCase())
    );
    
    if (playerMentioned) {
      entities.player = playerMentioned;
    }

    if (message.match(/hoje|today/i)) {
      entities.date = new Date();
    } else if (message.match(/ontem|yesterday/i)) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      entities.date = yesterday;
    }

    return entities;
  }

  process(message) {
    // Verifica cada tipo de intent
    for (const [type, patterns] of Object.entries(this.patterns)) {
      for (const pattern of patterns) {
        const match = message.match(pattern);
        if (match) {
          // Se for uma intent que precisa de dados adicionais (como nome do jogador)
          if (type === 'GET_PLAYER_STATS' && match[1]) {
            return {
              type,
              data: {
                player: match[1].trim()
              }
            };
          }
          return { type };
        }
      }
    }

    // Se não encontrou nenhum padrão, retorna UNKNOWN
    return { type: 'UNKNOWN' };
  }
} 