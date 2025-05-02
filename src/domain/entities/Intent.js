export class Intent {
  static TYPES = {
    GET_ROSTER: 'GET_ROSTER',
    GET_LAST_MATCH: 'GET_LAST_MATCH',
    GET_NEXT_MATCH: 'GET_NEXT_MATCH',
    GET_PLAYER_STATS: 'GET_PLAYER_STATS',
    GET_TEAM_RANKING: 'GET_TEAM_RANKING',
    GET_LIVE_MATCH: 'GET_LIVE_MATCH',
    UNKNOWN: 'UNKNOWN'
  };

  constructor(type, data = {}) {
    this.type = type;
    this.data = data;
  }

  static create(type, data = {}) {
    return new Intent(type, data);
  }
} 