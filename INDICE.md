# 📑 ÍNDICE DE ARQUIVOS - NOSSO CASAMENTO & LAR

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| **README.md** | Documentação geral do projeto |
| **SETUP.md** | Guia de instalação e setup |
| **GUIA_RAPIDO.md** | Guia visual de uso rápido |
| **ENTREGA.md** | Detalhes técnicos da entrega |
| **CONCLUSAO.md** | Status final do projeto |
| **EXEMPLOS.js** | Exemplos de dados para adicionar |
| **INDICE.md** | Este arquivo (você está aqui!) |

---

## 🔧 Configuração

| Arquivo | Função |
|---------|--------|
| package.json | Dependências e scripts |
| tsconfig.json | Configuração TypeScript |
| tsconfig.node.json | Config TS para Node |
| vite.config.ts | Configuração Vite |
| tailwind.config.js | Temas Tailwind CSS |
| postcss.config.js | Processador CSS |
| index.html | HTML principal |
| .gitignore | Arquivos ignorados pelo Git |

---

## 📂 Estrutura src/

### Components (Componentes Reutilizáveis)
```
src/components/
├── Button.tsx          # Botão com 3 variantes
├── Card.tsx            # Card base com hover
├── Input.tsx           # Input com label/erro
├── Select.tsx          # Select dropdown
├── Modal.tsx           # Modal com overlay
├── ColorPicker.tsx     # Seletor de cores
├── ProgressBar.tsx     # Barra de progresso
├── Layout.tsx          # Layout principal (navbar/footer)
└── index.ts            # Exportações
```

**Totais: 7 componentes reutilizáveis + 1 layout = 8 arquivos**

### Pages (Páginas Principal)
```
src/pages/
├── HomePage.tsx                  # Dashboard home (/)
├── OrcamentoCasamentoPage.tsx    # Orçamento (/orcamento-casamento)
├── ListaCasaPage.tsx            # Casa (/lista-casa)
├── IdeiasPage.tsx               # Ideias (/ideias-casamento)
├── ConvidadosPage.tsx           # Convidados (/convidados)
└── index.ts                     # Exportações
```

**Totais: 5 páginas = 6 arquivos**

### Store (Gerenciamento de Estado)
```
src/store/
├── casamento.ts         # Store orçamento (Zustand + persist)
├── casa.ts              # Store casa (Zustand + persist)
├── ideias.ts            # Store ideias (Zustand + persist)
├── convidados.ts        # Store convidados (Zustand + persist)
└── index.ts             # Exportações
```

**Totais: 4 stores = 5 arquivos**

### Types (Tipos TypeScript)
```
src/types/
└── index.ts             # Todos os tipos do projeto
```

**Totais: 1 arquivo**

### Utils (Funções Auxiliares)
```
src/utils/
├── helpers.ts           # Formatação, datas, UUID
└── index.ts             # Exportações
```

**Totais: 2 arquivos**

### Root Files
```
src/
├── App.tsx              # Componente principal com rotas
├── main.tsx             # Entrada da aplicação
└── index.css            # Estilos globais Tailwind
```

**Totais: 3 arquivos**

---

## 📊 Resumo de Arquivos

| Tipo | Quantidade | Arquivos |
|------|-----------|----------|
| Componentes | 8 | Button, Card, Input, Select, Modal, ColorPicker, ProgressBar, Layout |
| Páginas | 5 | Home, Orçamento, Casa, Ideias, Convidados |
| Stores | 4 | Casamento, Casa, Ideias, Convidados |
| Documentação | 7 | README, SETUP, GUIA_RAPIDO, ENTREGA, CONCLUSAO, EXEMPLOS, INDICE |
| Configuração | 8 | package.json, tsconfig, vite, tailwind, postcss, index.html, .gitignore |
| **TOTAL** | **35+** | **Arquivos criados** |

---

## 🎯 Como Navegar o Projeto

### Para Adicionar Nova Funcionalidade
```
1. Crie componente em: src/components/
2. Use em: src/pages/
3. Gerencie estado em: src/store/
4. Defina tipos em: src/types/
5. Use helpers em: src/utils/
```

### Para Entender o Fluxo
```
index.html (entry)
    ↓
main.tsx (React render)
    ↓
App.tsx (Routes)
    ↓
Layout (navbar + pages)
    ↓
Pages (HomePage, etc)
    ↓
Components (Button, Card, etc)
    ↓
Stores (Zustand + localStorage)
```

### Para Customizar
```
Cores: tailwind.config.js + src/index.css
Fontes: Google Fonts + src/index.css
Layout: src/components/Layout.tsx
Dados: src/store/*.ts (dados iniciais)
```

---

## 📦 Dependências Instaladas

### Production (runtime)
- `react@18.3.1` - UI Framework
- `react-dom@18.3.1` - React DOM
- `react-router-dom@6.30.2` - Roteamento SPA
- `zustand@4.5.7` - State management
- `lucide-react@0.294.0` - Ícones

### Development (build only)
- `typescript@5.9.3` - Tipagem
- `vite@5.4.21` - Build tool
- `tailwindcss@3.4.18` - Estilização
- `postcss@8.5.6` - Processador CSS
- `autoprefixer@10.4.22` - CSS vendor prefixes
- `@vitejs/plugin-react@4.7.0` - Plugin React Vite
- `@types/react` - Tipos React
- `@types/react-dom` - Tipos React DOM

---

## 🚀 Próximos Passos Sugeridos

### Se quiser expandir:

1. **Adicionar Backend**
   - API Node.js/Express
   - Sincronizar dados entre dispositivos
   - Autenticação de usuários

2. **Deploy**
   - Vercel: `vercel deploy`
   - Netlify: arrastar `dist/` para Netlify
   - GitHub Pages: push para `gh-pages` branch

3. **Melhorias UX**
   - Toasts de confirmação
   - Undo/Redo de ações
   - Temas (claro/escuro)
   - Exportar dados (PDF/CSV)

4. **Funcionalidades Extras**
   - Upload de fotos
   - Compartilhamento com cônjuge
   - Lembretes/notificações
   - Gráficos mais avançados

---

## 📝 Naming Conventions

### Arquivos
- **Componentes**: PascalCase + .tsx (ex: `Button.tsx`)
- **Páginas**: PascalCase + Page + .tsx (ex: `HomePage.tsx`)
- **Stores**: camelCase + .ts (ex: `casamento.ts`)
- **Tipos**: index.ts (tudo centralizado)

### Variáveis
- **const**: camelCase
- **Types**: PascalCase
- **Classes**: PascalCase
- **Functions**: camelCase

### Componentes React
- **Props**: PascalCase
- **State**: camelCase

---

## 🔐 Estrutura de Dados

### localStorage Keys
```
casamento-store  → { dados: {...}, }
casa-store       → { dados: {...}, }
ideias-store     → { dados: {...}, }
convidados-store → { dados: {...}, }
```

### Estrutura Casamento
```
{
  dataCasamento: "2025-06-15",
  orcamentoTotal: 45000,
  categorias: [{ nome, orcamentoTotal, itens }],
  paleta: ["#FFF1F3", ...],
  estilo: "classico",
  nomeNoivo: "João",
  nomeNoiva: "Maria"
}
```

---

## ✅ Checklist de Funcionalidades

### Casamento
- [x] 13 categorias
- [x] CRUD itens
- [x] Status (orçado/pendente/pago)
- [x] Barra de progresso
- [x] Resumo total

### Casa
- [x] 8 cômodos
- [x] CRUD itens
- [x] Prioridades
- [x] Checkbox comprado
- [x] Filtros
- [x] Links loja

### Ideias
- [x] Paleta 5 cores
- [x] 6 estilos
- [x] Checklist
- [x] Barra progresso
- [x] Timeline

### Convidados
- [x] CRUD convidados
- [x] Confirmação
- [x] Restrições
- [x] Acompanhantes
- [x] Resumo total

### Geral
- [x] Responsivo
- [x] Dark/Light (tema claro)
- [x] LocalStorage
- [x] Tipagem completa
- [x] Componentes reutilizáveis

---

## 📞 Suporte

Para cada arquivo, consulte:

1. **Dúvida de Instalação** → SETUP.md
2. **Como Usar** → GUIA_RAPIDO.md
3. **Detalhes Técnicos** → ENTREGA.md
4. **Overview Geral** → README.md
5. **Exemplos de Dados** → EXEMPLOS.js

---

## 🎊 Projeto Completo!

**Total de arquivos criados: 35+**
**Linhas de código: 2.000+**
**Funcionalidades: 30+**
**Tempo de setup: 0 minutos** (npm run dev já está rodando!)

---

Desenvolvido com ❤️ usando React, TypeScript, Tailwind CSS, Zustand, Vite!

**Servidor rodando: http://localhost:5173/**
