# 🎊 Nosso Casamento & Lar - Guia de Setup

Bem-vindo ao aplicativo completo para organizar seu casamento e montagem da casa!

## ⚡ Início Rápido

### Windows (PowerShell)
```powershell
cd d:\Casamento
npm install
npm run dev
```

### macOS / Linux
```bash
cd ./Casamento
npm install
npm run dev
```

## 📋 O que fazer depois

1. **Abra o navegador** e acesse: `http://localhost:5173`

2. **Comece a explorar**:
   - **Home**: Veja o dashboard com resumo geral
   - **Orçamento**: Adicione despesas do casamento por categoria
   - **Nossa Casa**: Planeje móveis e utensílios para cada cômodo
   - **Ideias**: Configure paleta de cores e faça checklist
   - **Convidados**: Gerencie lista de convidados

3. **Todos os dados são salvos automaticamente** no localStorage do seu navegador!

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev       # Inicia o servidor de desenvolvimento na porta 5173

# Build de Produção
npm run build     # Cria build otimizado em ./dist

# Preview da Build
npm run preview   # Visualiza a build de produção localmente
```

## 📱 Recursos

✅ **Dashboard Home** - Resumo com contagem regressiva para o casamento
✅ **Orçamento** - 13 categorias pré-configuradas com rastreamento de gastos
✅ **Casa** - 8 tipos de cômodos com filtros por prioridade
✅ **Ideias** - Paleta de cores, estilo do casamento e checklist
✅ **Convidados** - Gerenciamento completo com confirmações e restrições
✅ **Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
✅ **Persistência** - Dados salvos automaticamente no localStorage
✅ **UI Romântica** - Design elegante com tons de rosa e dourado

## 🎨 Customização

### Mudar Cores
Edite `src/index.css` e `tailwind.config.js` para customizar as cores

### Adicionar Categorias de Casamento
Edite `src/store/casamento.ts` - array `CATEGORIAS_INICIAIS`

### Adicionar Tipos de Cômodos
Edite `src/pages/ListaCasaPage.tsx` - array `COMODOS`

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arraste a pasta 'dist' para o Netlify
```

### GitHub Pages
```bash
npm run build
# Push a pasta 'dist' para gh-pages branch
```

## ❓ Troubleshooting

### npm install não funciona
```bash
# Tente com legacy peer deps
npm install --legacy-peer-deps

# Ou limpe o cache
npm cache clean --force
npm install
```

### Porta 5173 já está em uso
```bash
# Use uma porta diferente
npm run dev -- --port 3000
```

### TypeScript errors
```bash
# Limpe os cache do TypeScript
rm -rf node_modules
npm install
```

## 📚 Stack Tecnológico

- **React 18** - UI Framework
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **React Router v6** - Navegação SPA
- **Lucide React** - Ícones modernos
- **LocalStorage** - Persistência de dados

## 💡 Dicas

1. **Faça backup dos dados**: Use DevTools > Application > Local Storage para exportar os dados
2. **Compartilhe ideias**: Copie as URLs das páginas individuais
3. **Use em múltiplos dispositivos**: Sincronize manualmente via compartilhamento de dados
4. **Personalize tudo**: Todas as informações são editáveis!

## 🤝 Contribuições

Se encontrar bugs ou tiver sugestões de melhorias, sinta-se livre para criar issues ou pull requests!

## 📄 Licença

Este projeto é de uso livre para fins pessoais.

---

**Aproveite planejando seu casamento e sua nova casa! ♥️**
