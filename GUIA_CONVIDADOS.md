# 📋 GUIA - LISTA DE CONVIDADOS COM LADOS SEPARADOS

## ✨ O Que Mudou

A página de convidados agora permite que você tenha **duas listas separadas**:
- 💍 **Lista do Noivo** (limite: 200 convidados)
- 💐 **Lista da Noiva** (limite: 200 convidados)

---

## 🎯 Funcionalidades Principais

### 1️⃣ Seletor de Lado
No topo da página, você verá dois botões para alternar entre as listas:

```
💍 Noivo (25)    |    💐 Noiva (18)
```

Clique para ver/adicionar convidados de cada lado.

---

### 2️⃣ Limite de 200 Convidados por Lado

Cada lista suporta no máximo **200 convidados**.

**Quando o limite é atingido:**
- ❌ O botão "Adicionar" fica desabilitado
- 📢 Uma mensagem de notificação aparece

**Mensagem de Limite:**
```
"Limite de 200 convidados atingido para a lista do [noivo/noiva]"
```

---

### 3️⃣ Barra de Progresso

Abaixo do seletor de lado, você verá uma **barra de progresso** que mostra:
- 📊 Quantos convidados foram adicionados
- 📈 Percentual preenchido
- 🎨 Mudança de cor:
  - 🟢 Verde: < 80%
  - 🟡 Amarelo: 80-99%
  - 🔴 Vermelho: 100% (limite atingido)

---

### 4️⃣ Adição de Convidado

**Processo:**

1. **Selecione o lado** (Noivo ou Noiva)
2. **Clique em "Adicionar"**
3. **Preencha os dados:**
   - Nome (obrigatório)
   - Email
   - Telefone
   - Confirmação (Sim/Não/Talvez)
   - Acompanhantes
   - Restrições alimentares
   - Observações
4. **Clique em "Salvar"**

**Aviso de Sucesso:**
```
✅ Convidado adicionado com sucesso!
```

**Modal de Confirmação:**
O modal mostrará automaticamente qual lado está selecionado com botões coloridos:
- 💍 **Noivo** (azul)
- 💐 **Noiva** (rosa)

---

### 5️⃣ Edição de Convidado

- Clique no ✏️ (ícone de editar)
- Modifique os dados
- Clique em "Salvar"

**Nota:** Ao editar, o lado do convidado é mantido automaticamente.

---

### 6️⃣ Remoção de Convidado

- Clique no 🗑️ (ícone de lixeira)
- O convidado será removido instantaneamente
- A contagem será atualizada

---

## 📊 Resumo de Dados

Para cada lado, você verá:

```
┌─────────────────────────────────┐
│ Total: 25                       │
│ Confirmados: 18                 │
│ Talvez: 5                       │
│ Recusados: 2                    │
│ Total de Pessoas: 30            │
│ (25 convidados + 5 acompanhantes)
└─────────────────────────────────┘
```

---

## 🔄 Filtros

Você pode filtrar os convidados por status:

- **Todos** - Mostra todos
- **✅ Confirmados** - Apenas confirmados
- **❓ Talvez** - Apenas talvez
- **❌ Recusados** - Apenas recusados

Os filtros funcionam **independentemente para cada lado**.

---

## 💾 Persistência de Dados

Todos os dados são salvos automaticamente no **localStorage** do navegador.

**Chave de armazenamento:** `convidados-store-v2`

Isso significa que seus dados serão mantidos mesmo que você:
- Recarregue a página
- Feche e reabra o navegador
- Limpe o cache (parcialmente)

---

## ⚙️ Estrutura de Dados

### Convidado
```typescript
{
  id: string;              // ID único
  nome: string;            // Nome obrigatório
  email?: string;          // Email opcional
  telefone?: string;       // Telefone opcional
  confirmacao: 'sim' | 'nao' | 'talvez';
  acompanhantes: number;   // Número de acompanhantes (padrão: 0)
  restricoesAlimentares: string[]; // Vegetariano, vegano, etc
  observacoes?: string;    // Notas adicionais
  lado: 'noivo' | 'noiva'; // 💍 ou 💐
}
```

### Dados Totais
```typescript
{
  convidados: Convidado[];
  totalConfirmados: number;
  totalTalvez: number;
  totalRecusados: number;
  convidadosNoivo: number;    // ← NOVO
  convidadosNoiva: number;    // ← NOVO
}
```

---

## 🚀 Exemplos de Uso

### Exemplo 1: Adicionar 100 convidados do Noivo
1. Clique em "💍 Noivo"
2. Clique em "Adicionar" 100 vezes
3. A barra ficar 50% verde

### Exemplo 2: Atingir o Limite
1. Clique em "💐 Noiva"
2. Adicione 200 convidados
3. Ao tentar adicionar o 201º:
   - ❌ Botão fica desabilitado
   - 📢 Mensagem: "Limite atingido"

### Exemplo 3: Ver Confirmados da Noiva
1. Clique em "💐 Noiva"
2. Clique em "✅ Confirmados"
3. Veja apenas confirmados desse lado

---

## 🆘 Troubleshooting

### Problema: Nomes antigos ainda aparecem
**Solução:** Limpe o localStorage:
```javascript
localStorage.clear();
location.reload();
```

### Problema: Botão "Adicionar" desabilitado
**Solução:** Você atingiu o limite de 200 convidados para esse lado. Delete alguns para adicionar outros.

### Problema: Dados não salvam
**Solução:** Verifique se localStorage não está desabilitado no navegador.

---

## 📈 Estatísticas

A página calcula automaticamente para **cada lado**:

- ✅ **Confirmados**: Convidados que confirmaram presença
- ❓ **Talvez**: Convidados que ainda não decidiram
- ❌ **Recusados**: Convidados que recusaram
- 👥 **Total**: Convidados + acompanhantes

---

## 🎨 Interface Visual

```
┌─────────────────────────────────────────────┐
│      💍 Noivo (25)  |  💐 Noiva (18)        │
└─────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────┐
│  Limite de Convidados                       │
│  [████████░░░░░░░░░░░░░░░░░░░░░░░░] 50%    │
└─────────────────────────────────────────────┘
           ↓
┌────┬────┬────┬────┐
│Tot│Conf│Tal │Rec │
│ 25│ 18 │ 5  │ 2  │
└────┴────┴────┴────┘
           ↓
[Todos] [✅ Confirmados] [❓ Talvez] [❌ Recusados] [+ Adicionar]
           ↓
[Convidado 1] [✏️] [🗑️]
[Convidado 2] [✏️] [🗑️]
...
```

---

## ✅ Checklist de Recursos

- [x] Duas listas separadas (Noivo/Noiva)
- [x] Limite de 200 convidados por lado
- [x] Notificação ao atingir limite
- [x] Barra de progresso dinâmica
- [x] CRUD completo (Create, Read, Update, Delete)
- [x] Filtros por confirmação
- [x] Persistência em localStorage
- [x] Interface amigável com emojis
- [x] Validação de dados
- [x] Cálculo automático de totais

---

**Versão:** 2.0  
**Último atualizado:** Dezembro 2025  
**Status:** ✅ Pronto para uso
