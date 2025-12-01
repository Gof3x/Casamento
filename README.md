# Nosso Casamento & Lar 💍

Um aplicativo web completo para organizar o casamento e a montagem da casa nova!

## Funcionalidades

- **Home Dashboard**: Resumo geral com contagem regressiva e progresso
- **Orçamento do Casamento**: Gerenciador de despesas por categorias
- **Nossa Casa**: Planejamento de móveis e utensílios para a nova casa
- **Ideias & Inspirações**: Paleta de cores, estilo e checklist do casamento
- **Lista de Convidados**: Gerenciamento com confirmações e restrições alimentares

## Instalação e Uso

```bash
# Clonar ou navegar para a pasta do projeto
cd Casamento

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Tecnologias

- **React 18** + TypeScript
- **Vite** para build rápido
- **Tailwind CSS** para estilização
- **Zustand** para gerenciamento de estado
- **React Router v6** para navegação
- **Lucide React** para ícones
- **localStorage** para persistência de dados

## Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis (Button, Card, Input, etc)
├── pages/            # Páginas principais da aplicação
├── store/            # Stores Zustand (casamento, casa, ideias, convidados)
├── types/            # Tipos TypeScript
├── utils/            # Funções auxiliares
├── App.tsx           # Componente principal
├── main.tsx          # Entrada da aplicação
└── index.css         # Estilos globais com Tailwind
```

## Cores Utilizadas

- Rosa Claro: #FFF1F3
- Rosa Médio: #F4A7B9
- Rosa Forte: #D90368
- Dourado: #FFD700
- Cinza Escuro: #2E2E2E

## Dados de Exemplo

O aplicativo vem pré-configurado com dados de exemplo para demonstração. Você pode editar e adicionar novos itens diretamente na aplicação.

## Persistência

Todos os dados são salvos automaticamente no localStorage do navegador, garantindo que suas informações sejam preservadas entre as sessões.

Aproveite planejando seu casamento e sua nova casa! ♥
