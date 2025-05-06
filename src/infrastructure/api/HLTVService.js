import { AIService } from './AIService';

export class HLTVService {
  constructor() {
    this.teamId = 8297; // ID da FURIA no HLTV
    this.aiService = new AIService();
    this.currentDate = new Date();
  }

  async getTeamMatches() {
    const prompt = `Gere 3 resultados de partidas recentes da FURIA de CS2, com as seguintes informações:
    - Resultado (no formato placar, ex: "16-14")
    - Oponente (nome de times reais de CS2)
    - Data (considera partidas anteriores a ${this.formatDate(this.currentDate)})
    - Evento (nome de eventos reais de CS2)
    
    Formate como um array JSON válido. Exemplo:
    [
      {
        "result": "16-14",
        "opponent": "MIBR",
        "date": "2024-05-01",
        "event": "ESL Pro League Season 19"
      }
    ]`;

    try {
      const response = await this.aiService.getResponse(prompt);
      const matches = this.parseJsonFromResponse(response) || this.getFallbackMatches();
      return matches;
    } catch (error) {
      console.error('Erro ao obter partidas:', error);
      return this.getFallbackMatches();
    }
  }

  async getTeamRanking() {
    const prompt = `Gere informação de ranking atual da FURIA no cenário de CS2, com:
    - Posição atual (número entre 1 e 20)
    - Pontos (número entre 1000 e 3000)
    - Movimento ("+1", "-2", etc.)
    - Região ("Americas")
    
    Formate como um objeto JSON válido. Exemplo:
    {
      "position": 8,
      "points": 2450,
      "movement": "+1",
      "region": "Americas"
    }`;

    try {
      const response = await this.aiService.getResponse(prompt);
      const ranking = this.parseJsonFromResponse(response) || this.getFallbackRanking();
      return ranking;
    } catch (error) {
      console.error('Erro ao obter ranking:', error);
      return this.getFallbackRanking();
    }
  }

  async getPlayerStats(playerId) {
    const playerNames = {
      '13968': 'KSCERATO',
      '3741': 'FalleN',
      '13976': 'yuurih',
      '16910': 'YEKINDAR',
      '16911': 'molodoy',
      '16912': 'sidde'
    };

    const playerName = playerNames[playerId] || 'Jogador';
    const prompt = `Gere estatísticas realistas para ${playerName}, um jogador profissional de CS2 da FURIA, incluindo:
    - Rating (número entre 0.9 e 1.3)
    - KD (número entre 0.9 e 1.4)
    - Headshot percentage (entre 40% e 65%)
    - Número de mapas jogados (entre 40 e 60)
    - Número de rounds jogados (entre 900 e 1200)
    - Kills por round (número entre 0.6 e 0.9)
    
    Formate como um objeto JSON válido. Exemplo:
    {
      "rating": "1.24",
      "kd": "1.31",
      "hs": "58.2%",
      "maps": "43",
      "rounds": "1023",
      "kills_per_round": "0.82"
    }`;

    try {
      const response = await this.aiService.getResponse(prompt);
      const stats = this.parseJsonFromResponse(response) || this.getFallbackPlayerStats(playerId);
      return stats;
    } catch (error) {
      console.error('Erro ao obter estatísticas do jogador:', error);
      return this.getFallbackPlayerStats(playerId);
    }
  }

  async getUpcomingMatches() {
    const prompt = `Gere 3 partidas futuras da FURIA de CS2, com as seguintes informações:
    - Oponente (nome de times reais de CS2)
    - Evento (nome de eventos reais de CS2)
    - Horário (formato "HH:MM BRT")
    - Data (considere partidas futuras a partir de ${this.formatDate(this.currentDate)})
    
    Formate como um array JSON válido. Exemplo:
    [
      {
        "opponent": "Cloud9",
        "event": "ESL Pro League Season 19",
        "time": "15:00 BRT",
        "date": "2024-06-10"
      }
    ]`;

    try {
      const response = await this.aiService.getResponse(prompt);
      const matches = this.parseJsonFromResponse(response) || this.getFallbackUpcomingMatches();
      return matches;
    } catch (error) {
      console.error('Erro ao obter partidas futuras:', error);
      return this.getFallbackUpcomingMatches();
    }
  }

  async getRealUpcomingMatches() {
    const matches = await this.getUpcomingMatches();
    const today = new Date().toISOString().split('T')[0];
    return matches.filter(match => match.date >= today);
  }

  async getNextMatch() {
    const upcomingMatches = await this.getRealUpcomingMatches();
    if (upcomingMatches.length > 0) {
      // Ordena por data e retorna a primeira
      return upcomingMatches.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    }
    return null;
  }

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  parseJsonFromResponse(response) {
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (error) {
      console.error('Erro ao analisar JSON da resposta:', error);
      return null;
    }
  }

  getFallbackMatches() {
    return [
      {
        result: '16-14',
        opponent: 'MIBR',
        date: '2024-05-01',
        event: 'ESL Pro League Season 19'
      },
      {
        result: '13-16',
        opponent: 'Imperial',
        date: '2024-04-28',
        event: 'IEM Rio 2024'
      },
      {
        result: '2-1',
        opponent: 'paiN',
        date: '2024-04-25',
        event: 'ESL Pro League Season 19'
      }
    ];
  }

  getFallbackRanking() {
    return {
      position: 8,
      points: 2450,
      movement: '+1',
      region: 'Americas'
    };
  }

  getFallbackPlayerStats(playerId) {
    const stats = {
      '13968': { // KSCERATO
        rating: '1.24',
        kd: '1.31',
        hs: '58.2%',
        maps: '43',
        rounds: '1023',
        kills_per_round: '0.82'
      },
      '3741': { // FalleN
        rating: '1.15',
        kd: '1.12',
        hs: '45.7%',
        maps: '43',
        rounds: '1023',
        kills_per_round: '0.71'
      },
      '13976': { // yuurih
        rating: '1.18',
        kd: '1.21',
        hs: '51.3%',
        maps: '43',
        rounds: '1023',
        kills_per_round: '0.76'
      },
      '16910': { // YEKINDAR
        rating: '1.12',
        kd: '1.15',
        hs: '49.8%',
        maps: '43',
        rounds: '1023',
        kills_per_round: '0.73'
      },
      '16911': { // molodoy
        rating: '1.10',
        kd: '1.08',
        hs: '48.5%',
        maps: '43',
        rounds: '1023',
        kills_per_round: '0.70'
      },
      '16912': { // sidde
        rating: '1.09',
        kd: '1.07',
        hs: '47.2%',
        maps: '43',
        rounds: '1023',
        kills_per_round: '0.69'
      }
    };

    return stats[playerId] || {
      rating: '1.10',
      kd: '1.05',
      hs: '50.0%',
      maps: '40',
      rounds: '950',
      kills_per_round: '0.70'
    };
  }

  getFallbackUpcomingMatches() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return [
      {
        opponent: 'Cloud9',
        event: 'ESL Pro League Season 19',
        time: '15:00 BRT',
        date: this.formatDate(tomorrow)
      },
      {
        opponent: 'NAVI',
        event: 'IEM Dallas 2024',
        time: '12:30 BRT',
        date: this.formatDate(nextWeek)
      }
    ];
  }
} 