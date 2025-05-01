import { Intent } from '../../domain/entities/Intent';

export class IntentProcessor {
  constructor() {
    this.patterns = {
      [Intent.TYPES.GET_ROSTER]: [
        /roster/i,
        /players/i,
        /team/i,
        /time atual/i,
        /quem (joga|está) no time/i,
        /jogadores/i,
        /line-up/i,
        /lineup/i
      ],
      [Intent.TYPES.GET_LAST_MATCH]: [
        /last match/i,
        /última partida/i,
        /último jogo/i,
        /como foi o (último|ultimo) jogo/i,
        /resultado/i,
        /último resultado/i
      ],
      [Intent.TYPES.GET_NEXT_MATCH]: [
        /next match/i,
        /próxima partida/i,
        /próximo jogo/i,
        /quando (é|sera|será) o próximo jogo/i,
        /agenda/i,
        /calendário/i,
        /próximo/i
      ],
      [Intent.TYPES.GET_PLAYER_STATS]: [
        /stats/i,
        /estatísticas/i,
        /como está jogando/i,
        /desempenho/i,
        /performance/i,
        /estatistica/i
      ],
      [Intent.TYPES.GET_TEAM_RANKING]: [
        /ranking/i,
        /posição/i,
        /classificação/i,
        /em que lugar está/i,
        /posicao/i,
        /classificacao/i
      ],
      [Intent.TYPES.GET_LIVE_MATCH]: [
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

  processMessage(message) {
    const entities = this.extractEntities(message);
    const content = message.toLowerCase();

    for (const [intentType, patterns] of Object.entries(this.patterns)) {
      for (const pattern of patterns) {
        if (pattern.test(content)) {
          return Intent.create(intentType, entities);
        }
      }
    }

    return Intent.create(Intent.TYPES.UNKNOWN);
  }
} 