import { Message } from '../../domain/entities/Message';
import { Intent } from '../../domain/entities/Intent';
import { IntentProcessor } from './IntentProcessor';
import { HLTVService } from '../../infrastructure/api/HLTVService';
import { MockLiveService } from '../../infrastructure/api/MockLiveService';

export class ChatService {
  constructor() {
    this.intentProcessor = new IntentProcessor();
    this.hltvService = new HLTVService();
    this.liveService = new MockLiveService();

    this.playerIds = {
      'kscerato': 13968,
      'fallen': 3741,
      'yuurih': 13976,
      'yekindar': 16910,
      'molodoy': 16911,
      'sidde': 16912
    };
  }

  async processMessage(message) {
    const intent = this.intentProcessor.processMessage(message.content);

    switch (intent.type) {
      case Intent.TYPES.GET_ROSTER:
        return this.handleGetRoster();

      case Intent.TYPES.GET_LAST_MATCH:
        return this.handleGetLastMatch();

      case Intent.TYPES.GET_NEXT_MATCH:
        return this.handleGetNextMatch();

      case Intent.TYPES.GET_PLAYER_STATS:
        return this.handleGetPlayerStats(intent.entities.player);

      case Intent.TYPES.GET_TEAM_RANKING:
        return this.handleGetTeamRanking();

      case Intent.TYPES.GET_LIVE_MATCH:
        return this.handleGetLiveMatch();

      default:
        return this.handleUnknownIntent();
    }
  }

  handleGetRoster() {
    return Message.create(
      `🏆 ROSTER FURIA CS2 🏆\n\n` +
      `📋 Line-up Atual:\n\n` +
      `• Kaike "KSCERATO" Cerato\n` +
      `• Gabriel "FalleN" Toledo\n` +
      `• Danil "molodoy" Golubenko\n` +
      `• Yuri "yuurih" Santos\n` +
      `• Mareks "YEKINDAR" Gaļinskis\n` +
      `• Sidnei "sidde" Macedo\n\n` +
      `💪 Força FURIA!`,
      'bot'
    );
  }

  async handleGetLastMatch() {
    try {
      const matches = await this.hltvService.getTeamMatches();
      const lastMatch = matches[0];

      if (!lastMatch) {
        return Message.create(
          '❌ Desculpe, não consegui encontrar informações sobre a última partida.',
          'bot'
        );
      }

      return Message.create(
        `🎮 ÚLTIMA PARTIDA 🎮\n\n` +
        `🏟️ FURIA vs ${lastMatch.opponent}\n` +
        `📊 Resultado: ${lastMatch.result}\n` +
        `📅 Data: ${lastMatch.date}\n` +
        `🏆 Evento: ${lastMatch.event}\n\n` +
        `💪 Força FURIA!`,
        'bot'
      );
    } catch (error) {
      console.log(error)
      return Message.create(
        '❌ Desculpe, ocorreu um erro ao buscar informações sobre a última partida.',
        'bot'
      );
    }
  }

  async handleGetNextMatch() {
    try {
      const matches = await this.hltvService.getUpcomingMatches();
      const nextMatch = matches[0];

      if (!nextMatch) {
        return Message.create(
          '❌ Não encontrei nenhuma partida agendada no momento.',
          'bot'
        );
      }

      return Message.create(
        `🎮 PRÓXIMA PARTIDA 🎮\n\n` +
        `🏟️ FURIA vs ${nextMatch.opponent}\n` +
        `🏆 Evento: ${nextMatch.event}\n` +
        `⏰ Horário: ${nextMatch.time}\n` +
        `📅 Data: ${nextMatch.date}\n\n` +
        `💪 Força FURIA!`,
        'bot'
      );
    } catch (error) {
      console.log(error)
      return Message.create(
        '❌ Desculpe, ocorreu um erro ao buscar informações sobre a próxima partida.',
        'bot'
      );
    }
  }

  async handleGetPlayerStats(playerName) {
    if (!playerName) {
      return Message.create(
        '❓ De qual jogador você gostaria de ver as estatísticas? Mencione o nome do jogador na sua pergunta.',
        'bot'
      );
    }

    const playerId = this.playerIds[playerName.toLowerCase()];
    if (!playerId) {
      return Message.create(
        '❌ Desculpe, não encontrei estatísticas para esse jogador.',
        'bot'
      );
    }

    try {
      const stats = await this.hltvService.getPlayerStats(playerId);

      if (!stats) {
        return Message.create(
          '❌ Desculpe, não consegui encontrar as estatísticas desse jogador no momento.',
          'bot'
        );
      }

      return Message.create(
        `📊 ESTATÍSTICAS DE ${playerName.toUpperCase()} 📊\n\n` +
        `🎯 Rating 2.0: ${stats.rating || 'N/A'}\n` +
        `⚔️ K/D Ratio: ${stats.kd || 'N/A'}\n` +
        `🎯 Headshot %: ${stats.hs || 'N/A'}\n` +
        `🗺️ Maps Jogados: ${stats.maps || 'N/A'}\n` +
        `🎮 Rounds: ${stats.rounds || 'N/A'}\n` +
        `💥 Kills/Round: ${stats.kills_per_round || 'N/A'}\n\n` +
        `💪 Força FURIA!`,
        'bot'
      );
    } catch (error) {
      console.log(error)
      return Message.create(
        '❌ Desculpe, ocorreu um erro ao buscar as estatísticas do jogador.',
        'bot'
      );
    }
  }

  async handleGetTeamRanking() {
    try {
      const ranking = await this.hltvService.getTeamRanking();

      if (!ranking) {
        return Message.create(
          '❌ Desculpe, não consegui encontrar informações sobre o ranking atual.',
          'bot'
        );
      }

      return Message.create(
        `🏆 RANKING FURIA 🏆\n\n` +
        `🌎 Posição Mundial: #${ranking.position}\n` +
        `📊 Pontos: ${ranking.points}\n` +
        `📈 Movimento: ${ranking.movement}\n` +
        `🌍 Região: ${ranking.region}\n\n` +
        `💪 Força FURIA!`,
        'bot'
      );
    } catch (error) {
      console.log(error)
      return Message.create(
        '❌ Desculpe, ocorreu um erro ao buscar informações sobre o ranking.',
        'bot'
      );
    }
  }

  handleGetLiveMatch() {
    return Message.create(
      `🎮 PARTIDA AO VIVO 🎮\n\n` +
      `🏟️ FURIA vs NAVI\n` +
      `🏆 Evento: ESL Pro League Season 19\n` +
      `⏰ Status: EM ANDAMENTO\n\n` +
      `💪 Força FURIA!`,
      'bot',
      true // Indica que é uma mensagem de live
    );
  }

  handleUnknownIntent() {
    return Message.create(
      `🤖 Olá! Eu sou o bot da FURIA e posso te ajudar com:\n\n` +
      `📋 Informações sobre o roster atual\n` +
      `🎮 Resultado da última partida\n` +
      `⏰ Próxima partida agendada\n` +
      `📊 Estatísticas dos jogadores\n` +
      `🏆 Ranking atual do time\n` +
      `🔴 Partidas ao vivo\n\n` +
      `Como posso te ajudar? 💪`,
      'bot'
    );
  }
} 