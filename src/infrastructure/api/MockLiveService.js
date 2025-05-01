import furiaLogo from '../../assets/furia-logo.png';
import naviLogo from '../../assets/navi-logo.png';

export class MockLiveService {
  constructor() {
    this.subscribers = new Set();
    this.currentMatch = {
      event: 'ESL Pro League Season 19',
      status: 'EM ANDAMENTO',
      timer: '23:15',
      team1: {
        name: 'FURIA',
        logo: furiaLogo,
        score: 12
      },
      team2: {
        name: 'NAVI',
        logo: naviLogo,
        score: 11
      }
    };

    this.events = [
      { type: 'round', time: '23:15', description: 'FURIA vence o round!' },
      { type: 'kill', time: '23:15', description: 'KSCERATO elimina s1mple com AK-47' },
      { type: 'bomb', time: '23:15', description: 'Bomba plantada no bomb-site A' }
    ];

    this.startSimulation();
  }

  startSimulation() {
    let [minutes, seconds] = this.currentMatch.timer.split(':').map(Number);
    let totalSeconds = minutes * 60 + seconds;
    
    const timerInterval = setInterval(() => {
      totalSeconds++;
      minutes = Math.floor(totalSeconds / 60);
      seconds = totalSeconds % 60;
      
      const newTimer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      this.currentMatch.timer = newTimer;
      
      this.notifySubscribers({ 
        type: 'match_update', 
        match: { ...this.currentMatch },
        events: [...this.events]
      });
    }, 1000);

    const eventInterval = setInterval(() => {
      const eventTypes = ['kill', 'round', 'bomb'];
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      const newEvent = this.generateRandomEvent(randomType);
      this.events = [newEvent, ...this.events.slice(0, 4)];
      
      if (randomType === 'round') {
        const winningTeam = Math.random() > 0.5 ? 'team1' : 'team2';
        this.currentMatch[winningTeam].score++;
      }

      this.notifySubscribers({ 
        type: 'event', 
        event: newEvent,
        match: { ...this.currentMatch },
        events: [...this.events]
      });
    }, 10000 + Math.random() * 5000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(eventInterval);
    };
  }

  generateRandomEvent(type) {
    const currentTime = this.currentMatch.timer;
    const players = {
      furia: ['KSCERATO', 'FalleN', 'yuurih', 'YEKINDAR', 'molodoy'],
      navi: ['s1mple', 'b1t', 'Perfecto', 'Aleksib', 'jL']
    };
    const weapons = ['AK-47', 'M4A4', 'AWP', 'Desert Eagle'];

    switch (type) {
      case 'kill': {
        const killer = players.furia[Math.floor(Math.random() * players.furia.length)];
        const victim = players.navi[Math.floor(Math.random() * players.navi.length)];
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        return {
          type: 'kill',
          time: currentTime,
          description: `${killer} elimina ${victim} com ${weapon}`
        };
      }
      case 'round':
        return {
          type: 'round',
          time: currentTime,
          description: 'FURIA vence o round!'
        };
      case 'bomb':
        return {
          type: 'bomb',
          time: currentTime,
          description: `Bomba ${Math.random() > 0.5 ? 'plantada' : 'desarmada'} no bomb-site ${Math.random() > 0.5 ? 'A' : 'B'}`
        };
      default:
        return null;
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback({ 
      type: 'match_update', 
      match: { ...this.currentMatch },
      events: [...this.events]
    });
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers(data) {
    this.subscribers.forEach(callback => callback(data));
  }
} 