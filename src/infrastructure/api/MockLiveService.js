import furiaLogo from '../../assets/furia-logo.png';
import naviLogo from '../../assets/navi-logo.png';
import { AIService } from './AIService';

export class MockLiveService {
  constructor() {
    this.subscribers = new Set();
    this.aiService = new AIService();
    
    // Estado inicial
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

    // Inicializar com a data atual
    this.gameDate = new Date();
    
    // Inicializar o jogo com dados dinâmicos
    this.initializeGame().then(() => {
      this.startSimulation();
    });
  }

  async initializeGame() {
    try {
      // Obter o oponente atual
      const prompt = `Escolha um oponente real de CS2 para enfrentar a FURIA em uma partida ao vivo agora, respondendo apenas com o nome do time. Exemplos: NAVI, FaZe, G2, Vitality, etc.`;
      const opponent = await this.aiService.getResponse(prompt);
      
      // Obter o nome de um evento atual
      const eventPrompt = `Diga o nome de um evento atual ou relevante de CS2 onde a FURIA poderia estar jogando hoje. Responda apenas com o nome do evento.`;
      const event = await this.aiService.getResponse(eventPrompt);
      
      // Configurar o objeto da partida com os novos dados
      this.currentMatch = {
        event: event || 'ESL Pro League Season 19',
        status: 'EM ANDAMENTO',
        timer: this.getRandomTimer(),
        team1: {
          name: 'FURIA',
          logo: furiaLogo,
          score: Math.floor(Math.random() * 12) + 4
        },
        team2: {
          name: opponent || 'NAVI',
          logo: naviLogo,
          score: Math.floor(Math.random() * 12) + 3
        }
      };
      
      // Gerar eventos iniciais
      await this.generateInitialEvents();
    } catch (error) {
      console.error('Erro ao inicializar o jogo:', error);
      // Usar os valores padrão já definidos
    }
  }
  
  async generateInitialEvents() {
    try {
      const prompt = `Gere 3 eventos de uma partida de CS2 ao vivo entre FURIA e ${this.currentMatch.team2.name}. 
      Cada evento deve ter:
      - type: "kill", "round" ou "bomb"
      - description: Uma descrição curta do evento
      
      Formato:
      1. [tipo] [descrição]
      2. [tipo] [descrição]
      3. [tipo] [descrição]
      
      Exemplos de eventos:
      - kill: KSCERATO elimina s1mple com AWP
      - round: FURIA vence o round por eliminação
      - bomb: Bomba plantada no bomb-site B`;
      
      const response = await this.aiService.getResponse(prompt);
      const lines = response.split('\n');
      
      const newEvents = [];
      for (const line of lines) {
        const match = line.match(/\d+\.\s+\[(\w+)\]\s+(.*)|(\w+):\s+(.*)/);
        if (match) {
          const type = match[1] || match[3];
          const description = match[2] || match[4];
          if (type && description) {
            newEvents.push({
              type: type.toLowerCase(),
              time: this.currentMatch.timer,
              description: description.trim()
            });
          }
        }
      }
      
      if (newEvents.length > 0) {
        this.events = newEvents;
      }
    } catch (error) {
      console.error('Erro ao gerar eventos iniciais:', error);
      // Manter os eventos padrão
    }
  }

  getRandomTimer() {
    const minutes = Math.floor(Math.random() * 30);
    const seconds = Math.floor(Math.random() * 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
      this.generateRandomEvent().then(newEvent => {
        if (newEvent) {
          this.events = [newEvent, ...this.events.slice(0, 4)];
          
          if (newEvent.type === 'round') {
            const winningTeam = newEvent.description.includes('FURIA') ? 'team1' : 'team2';
            this.currentMatch[winningTeam].score++;
          }

          this.notifySubscribers({ 
            type: 'event', 
            event: newEvent,
            match: { ...this.currentMatch },
            events: [...this.events]
          });
        }
      });
    }, 10000 + Math.random() * 5000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(eventInterval);
    };
  }

  async generateRandomEvent() {
    const currentTime = this.currentMatch.timer;
    
    try {
      // A cada 5 chamadas, usar a IA para gerar um evento mais criativo
      if (Math.random() < 0.2) {
        const prompt = `Gere um evento aleatório e realista para uma partida de CS2 entre FURIA e ${this.currentMatch.team2.name}.
        Escolha um tipo: "kill", "round" ou "bomb" e crie uma descrição curta e realista.
        Use nomes reais de jogadores da FURIA (KSCERATO, FalleN, yuurih, YEKINDAR, molodoy).
        Responda apenas com o tipo e a descrição, separados por vírgula. Exemplo: "kill, KSCERATO elimina s1mple com AWP"`;
        
        const response = await this.aiService.getResponse(prompt);
        const parts = response.split(',');
        if (parts.length >= 2) {
          const type = parts[0].trim().toLowerCase();
          const description = parts.slice(1).join(',').trim();
          
          if (['kill', 'round', 'bomb'].includes(type) && description) {
            return {
              type,
              time: currentTime,
              description
            };
          }
        }
      }
      
      // Usar um gerador local para eventos mais simples
      return this.generateBasicEvent(currentTime);
    } catch (error) {
      console.error('Erro ao gerar evento:', error);
      return this.generateBasicEvent(currentTime);
    }
  }

  generateBasicEvent(currentTime) {
    const types = ['kill', 'round', 'bomb'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const players = {
      furia: ['KSCERATO', 'FalleN', 'yuurih', 'YEKINDAR', 'molodoy'],
      opponent: ['player1', 'player2', 'player3', 'player4', 'player5']
    };
    const weapons = ['AK-47', 'M4A4', 'AWP', 'Desert Eagle'];

    switch (type) {
      case 'kill': {
        const killer = players.furia[Math.floor(Math.random() * players.furia.length)];
        const victim = players.opponent[Math.floor(Math.random() * players.opponent.length)];
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
          description: Math.random() > 0.5 ? 'FURIA vence o round!' : `${this.currentMatch.team2.name} vence o round!`
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