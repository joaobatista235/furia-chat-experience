import { Message } from '../../domain/entities/Message';
import { IntentProcessor } from './IntentProcessor';
import { AIService } from '../../infrastructure/api/AIService';
import { HLTVService } from '../../infrastructure/api/HLTVService';

export class ChatService {
  constructor() {
    this.intentProcessor = new IntentProcessor();
    this.aiService = new AIService();
    this.hltvService = new HLTVService();
  }

  async processMessage(message) {
    try {
      const intent = this.intentProcessor.process(message.content);

      if (intent.type === 'UNKNOWN') {
        const aiResponse = await this.aiService.getResponse(message.content);
        return Message.create(aiResponse, 'bot');
      }

      switch (intent.type) {
        case 'GET_ROSTER':
          return this.handleGetRoster();
        case 'GET_LAST_MATCH':
          return await this.handleGetLastMatch();
        case 'GET_NEXT_MATCH':
          return await this.handleGetNextMatch();
        case 'GET_PLAYER_STATS':
          return await this.handleGetPlayerStats(intent.data.player);
        case 'GET_TEAM_RANKING':
          return await this.handleGetTeamRanking();
        case 'GET_LIVE_MATCH':
          return await this.handleGetLiveMatch();
        default:
          return this.handleUnknownIntent();
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return Message.create(
        'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        'bot'
      );
    }
  }

  handleGetRoster() {
    const roster = [
      'KSCERATO',
      'FalleN',
      'yuurih',
      'YEKINDAR',
      'molodoy'
    ];

    return Message.create(
      `Time atual da FURIA:\n${roster.map(player => `• ${player}`).join('\n')}`,
      'bot'
    );
  }

  async handleGetLastMatch() {
    try {
      const matches = await this.hltvService.getTeamMatches();
      if (matches && matches.length > 0) {
        const sortedMatches = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastMatch = sortedMatches[0];
        
        return Message.create(
          `Última partida: FURIA ${lastMatch.result} ${lastMatch.opponent}\nData: ${this.formatDate(lastMatch.date)}\nEvento: ${lastMatch.event}`,
          'bot'
        );
      }
      return this.handleGetLastMatchFallback();
    } catch (error) {
      console.error('Erro ao obter última partida:', error);
      return this.handleGetLastMatchFallback();
    }
  }

  async handleGetNextMatch() {
    try {
      const nextMatch = await this.hltvService.getNextMatch();
      if (nextMatch) {
        return Message.create(
          `Próxima partida: FURIA vs ${nextMatch.opponent}\nData: ${this.formatDate(nextMatch.date)}\nHorário: ${nextMatch.time}\nEvento: ${nextMatch.event}`,
          'bot'
        );
      }
      return this.handleGetNextMatchFallback();
    } catch (error) {
      console.error('Erro ao obter próxima partida:', error);
      return this.handleGetNextMatchFallback();
    }
  }

  async handleGetPlayerStats(player) {
    const playerIds = {
      'KSCERATO': '13968',
      'FalleN': '3741',
      'yuurih': '13976',
      'YEKINDAR': '16910',
      'molodoy': '16911',
      'sidde': '16912'
    };

    try {
      const playerId = playerIds[player];
      if (playerId) {
        const stats = await this.hltvService.getPlayerStats(playerId);
        if (stats) {
          return Message.create(
            `Estatísticas de ${player}:\nRating: ${stats.rating}\nK/D: ${stats.kd}\nHeadshots: ${stats.hs}\nKills por round: ${stats.kills_per_round}\nMapas jogados: ${stats.maps}`,
            'bot'
          );
        }
      }
      return this.handleGetPlayerStatsFallback(player);
    } catch (error) {
      console.error('Erro ao obter estatísticas do jogador:', error);
      return this.handleGetPlayerStatsFallback(player);
    }
  }

  async handleGetTeamRanking() {
    try {
      const ranking = await this.hltvService.getTeamRanking();
      if (ranking) {
        return Message.create(
          `FURIA está atualmente em ${ranking.position}º lugar no ranking mundial de CS2.\nPontos: ${ranking.points}\nMovimentação: ${ranking.movement}\nRegião: ${ranking.region}`,
          'bot'
        );
      }
      return this.handleGetTeamRankingFallback();
    } catch (error) {
      console.error('Erro ao obter ranking da equipe:', error);
      return this.handleGetTeamRankingFallback();
    }
  }

  async handleGetLiveMatch() {
    try {
      const prompt = `Gere informações sobre uma partida ao vivo hipotética da FURIA de CS2. Inclua:
      - Nome do adversário (um time real de CS2)
      - Placar atual (exemplo: "12 x 11")
      - Mapa atual (um mapa real de CS2)
      - Nome do evento (um evento real de CS2)
      
      Formate como: "FURIA vs OPONENTE\nPlacar: X x Y\nMapa: NOME_MAPA\nEvento: NOME_EVENTO"`;
      
      const liveMatchInfo = await this.aiService.getResponse(prompt);
      
      const message = Message.create(
        liveMatchInfo || 'Partida ao vivo: FURIA vs NAVI\nPlacar: 12 x 11\nMapa: Inferno\nEvento: ESL Pro League Season 19',
        'bot'
      );
      message.isLive = true;
      return message;
    } catch (error) {
      console.error('Erro ao obter informações da partida ao vivo:', error);
      const message = Message.create(
        'Partida ao vivo: FURIA vs NAVI\nPlacar: 12 x 11\nMapa: Inferno\nEvento: ESL Pro League Season 19',
        'bot'
      );
      message.isLive = true;
      return message;
    }
  }

  handleUnknownIntent() {
    return Message.create(
      'Desculpe, não entendi sua pergunta. Você pode tentar perguntar sobre:\n' +
      '• Time atual\n' +
      '• Última partida\n' +
      '• Próxima partida\n' +
      '• Estatísticas de um jogador\n' +
      '• Ranking do time\n' +
      '• Partida ao vivo',
      'bot'
    );
  }

  // Métodos de fallback
  handleGetLastMatchFallback() {
    return Message.create(
      'Última partida: FURIA 16 x 14 NAVI\nMapa: Inferno\nEvento: ESL Pro League Season 19',
      'bot'
    );
  }

  handleGetNextMatchFallback() {
    return Message.create(
      'Próxima partida: FURIA vs FaZe Clan\nData: 15/04/2024\nHorário: 19:00\nEvento: ESL Pro League Season 19',
      'bot'
    );
  }

  handleGetPlayerStatsFallback(player) {
    const stats = {
      'KSCERATO': 'K/D: 1.25, Rating: 1.15, Headshots: 65%',
      'FalleN': 'K/D: 1.10, Rating: 1.05, Headshots: 60%',
      'yuurih': 'K/D: 1.20, Rating: 1.12, Headshots: 62%',
      'YEKINDAR': 'K/D: 1.15, Rating: 1.08, Headshots: 58%',
      'molodoy': 'K/D: 1.18, Rating: 1.10, Headshots: 61%'
    };

    const playerStats = stats[player] || 'Jogador não encontrado';
    return Message.create(
      `Estatísticas de ${player}:\n${playerStats}`,
      'bot'
    );
  }

  handleGetTeamRankingFallback() {
    return Message.create(
      'FURIA está atualmente em 5º lugar no ranking mundial de CS2.',
      'bot'
    );
  }

  formatDate(isoDateString) {
    try {
      const date = new Date(isoDateString);
      return date.toLocaleDateString('pt-BR');
    } catch (e) {
      console.log(e)
      return isoDateString;
    }
  }
} 