# 🎊 GUIA RÁPIDO DE USO - NOSSO CASAMENTO & LAR

## 🚀 COMEÇAR AGORA!

### Passo 1: Abra o navegador
```
http://localhost:5173/
```

### Passo 2: Explore as 5 seções

```
┌─────────────────────────────────────────────┐
│                   🏠 HOME                    │
│  Contagem regressiva + Dashboard completo   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            💰 ORÇAMENTO CASAMENTO            │
│  • Buffet                    • Flores        │
│  • Decoração                 • Bolo          │
│  • Local                     • Banda/DJ      │
│  • Foto/Vídeo                • Transporte    │
│  • Vestido/Terno             • Hospedagem    │
│  • Convites                  • Lua de Mel    │
│  • Outros                                    │
│                                             │
│  Para cada: Orçado → Pendente → Pago       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            🏠 MONTANDO NOSSA CASA            │
│  • Quarto         • Sala      • Varanda     │
│  • Cozinha        • Banheiro  • Escritório  │
│  • Área de Serviço • Outro                  │
│                                             │
│  Para cada item:                            │
│  ☐ Já comprei?  📍 Prioridade  🔗 Loja     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│          ✨ NOSSO GRANDE DIA (IDEIAS)        │
│  • 🎨 Paleta de 5 cores customizáveis      │
│  • 🎯 Estilo (Clássico, Boho, etc)         │
│  • ✅ Checklist com progresso              │
│  • ⏰ Timeline do casamento                 │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            👥 CONVIDADOS                    │
│  • Confirmados: ✅                          │
│  • Talvez: ❓                               │
│  • Recusados: ❌                            │
│  • Restrições alimentares                   │
│  • Acompanhantes                            │
└─────────────────────────────────────────────┘
```

---

## 📝 Funcionalidades Principais

### ✅ Adicionar Item
```
[+ Adicionar] → Preenche form → [Salvar]
                    ↓
              Salvo automaticamente!
```

### ✏️ Editar Item
```
[Lápis] → Abre form → Modifica → [Salvar]
```

### 🗑️ Deletar Item
```
[Lixeira] → Item removido ✓
```

### 🔍 Filtrar
```
[Filtro 1] [Filtro 2] [Filtro 3]
         ↓
   Atualiza em tempo real
```

---

## 💾 Dados Salvos?

✅ **SIM! Automaticamente no localStorage**

- Feche o navegador
- Abra novamente
- Todos os dados estão lá!

---

## 🎨 Paleta de Cores

```
Rosa Claro      #FFF1F3  (fundo)
Rosa Médio      #F4A7B9  (destacado)
Rosa Forte      #D90368  (ações)
Dourado         #FFD700  (detalhes)
Cinza Escuro    #2E2E2E  (texto)
```

---

## 📱 Responsividade

| Device | Status |
|--------|--------|
| 📱 Mobile | ✅ Otimizado |
| 📱 Tablet | ✅ Otimizado |
| 🖥️ Desktop | ✅ Otimizado |

---

## 🎯 Casos de Uso

### Cenário 1: Você quer adicionar uma despesa
```
1. Vá em "Orçamento Casamento"
2. Escolha a categoria (ex: Buffet)
3. Clique em "+ Adicionar"
4. Preencha os dados
5. Clique em "Salvar" ✓
```

### Cenário 2: Você quer marcar item como comprado
```
1. Vá em "Nossa Casa"
2. Encontre o item
3. Clique no ☐ checkbox
4. ✅ Marcado como comprado!
```

### Cenário 3: Você quer confirmar um convidado
```
1. Vá em "Convidados"
2. Clique no ✏️ para editar
3. Mude confirmação para "✅ Confirmado"
4. Clique em "Salvar" ✓
```

### Cenário 4: Você quer ver o progresso
```
1. Vá em "Home"
2. Veja:
   - Dias até o casamento
   - % do orçamento utilizado
   - Itens da casa comprados
   - Convidados confirmados
```

---

## 🔧 Comandos Úteis

```bash
# Iniciar servidor
npm run dev

# Fazer build
npm run build

# Preview do build
npm run preview

# Instalar deps novamente
npm install

# Limpar cache
npm cache clean --force
```

---

## 🆘 Problemas Comuns

### "Dados sumiram!"
→ Verifique em DevTools > Application > LocalStorage

### "Não consigo adicionar item"
→ Preencha todos os campos obrigatórios

### "Filtro não funciona"
→ Recarre a página com F5

### "A página está lenta"
→ Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## 📊 Resumo de Páginas

| Página | Rota | Função |
|--------|------|--------|
| Home | / | Dashboard |
| Orçamento | /orcamento-casamento | CRUD despesas |
| Casa | /lista-casa | CRUD móveis |
| Ideias | /ideias-casamento | Paleta + Checklist |
| Convidados | /convidados | CRUD convidados |

---

## 🌟 Destaques

### ⚡ Rápido
- Carrega em < 1 segundo
- Sem lag em operações

### 💾 Seguro
- Dados no seu navegador
- Sem exposição na nuvem

### 📱 Responsivo
- Funciona em qualquer tela

### 🎨 Bonito
- Design romântico
- Cores suaves

### 🔒 Privado
- Dados apenas seus
- Zero rastreamento

---

## 💡 Dicas Profissionais

1. **Exporte seus dados regularmente**
   - F12 > Application > LocalStorage
   - Copie os dados para backup

2. **Use o color picker na paleta**
   - Clique no quadrado de cor
   - Ou insira código hex (#XXXXXX)

3. **Organize por prioridade**
   - Casa: Alta/Média/Baixa
   - Casamento: Orçado/Pendente/Pago

4. **Adicione links das lojas**
   - Clique em "🔗 Ver loja" depois

5. **Compartilhe com seu cônjuge**
   - URL: `http://localhost:5173/`
   - Dados são locais, não são sincronizados
   - Considere copiar dados entre dispositivos

---

## 🎊 Pronto para Começar!

```
✅ Servidor: http://localhost:5173/
✅ Todas as funcionalidades ativas
✅ Dados de exemplo carregados
✅ Design responsivo
✅ Persistência automática

👰 APROVEITE! 🤵
```

---

**Qualquer dúvida? Consulte:**
- README.md
- SETUP.md
- ENTREGA.md

**Desenvolvido com ❤️ para um casal especial! 💍**
