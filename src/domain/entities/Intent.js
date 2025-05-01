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

  constructor(type, confidence, entities = {}) {
    this.type = type;
    this.confidence = confidence;
    this.entities = entities;
  }

  static create(type, entities = {}) {
    return new Intent(type, 1.0, entities);
  }
} 