export class HLTVService {
  constructor() {
    this.teamId = 8297; // ID da FURIA no HLTV
    
    this.mockData = {
      matches: [
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
      ],
      upcomingMatches: [
        {
          opponent: 'Cloud9',
          event: 'ESL Pro League Season 19',
          time: '15:00 BRT',
          date: '2024-05-10'
        },
        {
          opponent: 'NAVI',
          event: 'IEM Dallas 2024',
          time: '12:30 BRT',
          date: '2024-05-15'
        }
      ],
      playerStats: {
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
      },
      ranking: {
        position: 8,
        points: 2450,
        movement: '+1',
        region: 'Americas'
      }
    };
  }

  async getTeamMatches() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockData.matches;
  }

  async getTeamRanking() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockData.ranking;
  }

  async getPlayerStats(playerId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockData.playerStats[playerId];
  }

  async getUpcomingMatches() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockData.upcomingMatches;
  }
} 