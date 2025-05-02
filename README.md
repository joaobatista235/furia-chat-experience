# FURIA CS Chat Experience

Um chat interativo para fãs da FURIA CS2, oferecendo informações em tempo real sobre partidas, estatísticas de jogadores e dados do time.

## 🎯 Sobre o Projeto

O FURIA CS Chat Experience é uma aplicação web que simula um chat bot inteligente para fãs da FURIA CS2. O sistema permite que os usuários obtenham informações sobre o time através de uma interface conversacional intuitiva, incluindo dados em tempo real sobre partidas ao vivo.

## ✨ Funcionalidades

### Chat Interativo
- Interface de chat moderna e responsiva
- Respostas em tempo real
- Suporte a múltiplos tipos de consultas
- Indicador de digitação
- Histórico de mensagens
- Integração com IA para respostas personalizadas

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

### 🤖 Integração com IA
O sistema utiliza uma abordagem híbrida para respostas:

1. **Respostas Estruturadas**
   - Dados mockados para informações específicas
   - Estatísticas e resultados de partidas
   - Informações do roster
   - Status de partidas ao vivo

2. **Assistente IA**
   - Respostas para perguntas gerais sobre o time
   - Contexto histórico da FURIA
   - Curiosidades e fatos interessantes
   - Guia interativo para comandos disponíveis

3. **Sistema de Fallback**
   - Quando uma pergunta não se encaixa nos comandos estruturados
   - A IA é acionada para fornecer uma resposta contextual
   - Mantém o foco em assuntos relacionados à FURIA
   - Sugere comandos disponíveis quando apropriado

4. **Prompt Engineering**
   - Script específico para guiar o comportamento da IA
   - Foco exclusivo em assuntos relacionados à FURIA
   - Evita desvios para outros tópicos
   - Mantém o tom profissional e informativo

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js
- Stitches (CSS-in-JS)
- Vite
- React Hooks

### Backend & IA
- OpenAI API
- Sistema de prompts estruturados
- Gerenciamento de contexto
- Fallback inteligente

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

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Adicione sua chave da API OpenAI
```

4. Execute o projeto:
```bash
npm run dev
```

5. Acesse `http://localhost:5173` no seu navegador

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
3. Se for um comando estruturado:
   - Retorna dados mockados
4. Se for uma pergunta geral:
   - Consulta a API de IA
   - Processa a resposta
   - Mantém o contexto da conversa
5. Interface é atualizada em tempo real

## 🎮 Simulação de Dados

O projeto utiliza um sistema de mock data para simular:
- Partidas ao vivo
- Estatísticas de jogadores
- Resultados de partidas
- Rankings
- Eventos em tempo real

## 🔜 Próximos Passos

- Integração com API real de CS2
- Sistema de autenticação
- Notificações push
- Mais estatísticas e análises
- Suporte a múltiplos idiomas
- Melhorias no sistema de IA
- Análise de sentimento das respostas
- Personalização baseada no histórico do usuário

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
- Comunidade CS2
- OpenAI
- Todos os contribuidores
