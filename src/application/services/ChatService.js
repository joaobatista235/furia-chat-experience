import { Message } from '../../domain/entities/Message';
import { IntentProcessor } from './IntentProcessor';
import { AIService } from '../../infrastructure/api/AIService';

export class ChatService {
  constructor() {
    this.intentProcessor = new IntentProcessor();
    this.aiService = new AIService();
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
          return this.handleGetLastMatch();
        case 'GET_NEXT_MATCH':
          return this.handleGetNextMatch();
        case 'GET_PLAYER_STATS':
          return this.handleGetPlayerStats(intent.data.player);
        case 'GET_TEAM_RANKING':
          return this.handleGetTeamRanking();
        case 'GET_LIVE_MATCH':
          return this.handleGetLiveMatch();
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

  handleGetLastMatch() {
    return Message.create(
      'Última partida: FURIA 16 x 14 NAVI\nMapa: Inferno\nEvento: ESL Pro League Season 19',
      'bot'
    );
  }

  handleGetNextMatch() {
    return Message.create(
      'Próxima partida: FURIA vs FaZe Clan\nData: 15/04/2024\nHorário: 19:00\nEvento: ESL Pro League Season 19',
      'bot'
    );
  }

  handleGetPlayerStats(player) {
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

  handleGetTeamRanking() {
    return Message.create(
      'FURIA está atualmente em 5º lugar no ranking mundial de CS2.',
      'bot'
    );
  }

  handleGetLiveMatch() {
    const message = Message.create(
      'Partida ao vivo: FURIA vs NAVI\nPlacar: 12 x 11\nMapa: Inferno\nEvento: ESL Pro League Season 19',
      'bot'
    );
    message.isLive = true;
    return message;
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
} 