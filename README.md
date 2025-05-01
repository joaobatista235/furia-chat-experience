# FURIA CS Chat Experience

Um chat interativo para fãs da FURIA CS:GO, oferecendo informações em tempo real sobre partidas, estatísticas de jogadores e dados do time.

## 🎯 Sobre o Projeto

O FURIA CS Chat Experience é uma aplicação web que simula um chat bot inteligente para fãs da FURIA CS:GO. O sistema permite que os usuários obtenham informações sobre o time através de uma interface conversacional intuitiva, incluindo dados em tempo real sobre partidas ao vivo.

## ✨ Funcionalidades

### Chat Interativo
- Interface de chat moderna e responsiva
- Respostas em tempo real
- Suporte a múltiplos tipos de consultas
- Indicador de digitação
- Histórico de mensagens

### Comandos Disponíveis
- `time atual` - Mostra o roster atual do time
- `última partida` - Exibe o resultado da última partida
- `próxima partida` - Mostra informações sobre o próximo jogo
- `estatísticas [jogador]` - Exibe estatísticas de um jogador específico
- `ranking` - Mostra a posição atual do time no ranking
- `live` ou `ao vivo` - Exibe informações da partida em andamento

### Live Match
- Timer em tempo real
- Placar atualizado
- Logos dos times
- Feed de eventos (kills, rounds, bombas)
- Design responsivo e moderno

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js
- Stitches (CSS-in-JS)
- Vite
- React Hooks

### Arquitetura
- Clean Architecture
- Domain-Driven Design (DDD)
- SOLID Principles

### Estrutura do Projeto
```
src/
├── assets/           # Imagens e recursos estáticos
├── domain/          # Entidades e regras de negócio
├── application/     # Casos de uso e serviços
├── infrastructure/  # Implementações técnicas
└── presentation/    # Componentes e estilos
```

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/furia-chat-experience.git
```

2. Instale as dependências:
```bash
cd furia-chat-experience
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse `http://localhost:5173` no seu navegador

## 📱 Responsividade

O projeto foi desenvolvido com foco em responsividade, funcionando perfeitamente em:
- Desktop
- Tablet
- Smartphone

## 🎨 Design

- Tema escuro moderno
- Cores oficiais da FURIA
- Animações suaves
- Feedback visual para interações
- Indicadores de status em tempo real

## 🔄 Fluxo de Dados

1. Usuário envia mensagem
2. Sistema processa a intenção
3. Serviço apropriado é acionado
4. Resposta é formatada e exibida
5. Interface é atualizada em tempo real

## 🎮 Simulação de Dados

O projeto utiliza um sistema de mock data para simular:
- Partidas ao vivo
- Estatísticas de jogadores
- Resultados de partidas
- Rankings
- Eventos em tempo real

## 🔜 Próximos Passos

- Integração com API real de CS:GO
- Sistema de autenticação
- Notificações push
- Mais estatísticas e análises
- Suporte a múltiplos idiomas

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- FURIA Esports
- Comunidade CS:GO
- Todos os contribuidores
