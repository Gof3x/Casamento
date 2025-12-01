// Exemplos de dados que você pode adicionar ao aplicativo
// Copie e adapte conforme necessário

// ============================================
// EXEMPLO: Adicionando itens de Casamento
// ============================================

const exemplosCasamento = [
  {
    categoria: 'buffet',
    item: {
      nome: 'Cardápio Executivo',
      descricao: 'Entrada + Prato Principal + Sobremesa',
      valorEstimado: 4500,
      valorReal: 4800,
      status: 'pago',
      fornecedor: 'Buffet Gourmet Brasil',
    }
  },
  {
    categoria: 'foto-video',
    item: {
      nome: 'Pacote Premium',
      descricao: 'Foto + Vídeo Highlights + Drone',
      valorEstimado: 3500,
      valorReal: 3500,
      status: 'pago',
      fornecedor: 'Studio Aurora Fotografia',
    }
  },
  {
    categoria: 'decoracao',
    item: {
      nome: 'Flores Frescas',
      descricao: 'Buquês, arranjos e decoração',
      valorEstimado: 1200,
      valorReal: 0,
      status: 'orçado',
      fornecedor: 'Floricultura Rosa',
    }
  }
];

// ============================================
// EXEMPLO: Adicionando itens para a Casa
// ============================================

const exemplosCasa = [
  {
    nome: 'Micro-ondas',
    comodo: 'cozinha',
    descricao: 'Micro-ondas 25L Espelhado',
    valorEstimado: 600,
    valorReal: 650,
    prioridade: 'alta',
    comprado: true,
    linkLoja: 'https://www.exemplo-loja.com/micro-ondas',
  },
  {
    nome: 'Jogo de Panelas',
    comodo: 'cozinha',
    descricao: '5 peças em aço inox',
    valorEstimado: 350,
    valorReal: 0,
    prioridade: 'alta',
    comprado: false,
    linkLoja: 'https://www.exemplo-loja.com/panelas',
  },
  {
    nome: 'Estante de Livros',
    comodo: 'sala',
    descricao: 'Estante branca em MDF',
    valorEstimado: 450,
    valorReal: 0,
    prioridade: 'media',
    comprado: false,
  },
  {
    nome: 'Guarda-Roupa Casal',
    comodo: 'quarto',
    descricao: 'Guarda-roupa 6 portas espelho',
    valorEstimado: 2000,
    valorReal: 2100,
    prioridade: 'alta',
    comprado: true,
  }
];

// ============================================
// EXEMPLO: Convidados
// ============================================

const exemplosConvidados = [
  {
    nome: 'Tia Maria',
    email: 'tia.maria@email.com',
    telefone: '(11) 98765-4321',
    confirmacao: 'sim',
    acompanhantes: 2,
    restricoesAlimentares: ['vegetariano'],
    observacoes: 'Minha filha é coelinha por isso quer assentar junto',
  },
  {
    nome: 'Primo João',
    email: 'joao@email.com',
    telefone: '(11) 99876-5432',
    confirmacao: 'talvez',
    acompanhantes: 1,
    restricoesAlimentares: ['gluten-free'],
    observacoes: 'Só pode confirmar depois do carnaval',
  },
  {
    nome: 'Amiga Fernanda',
    email: 'fernanda@email.com',
    confirmacao: 'nao',
    acompanhantes: 0,
    restricoesAlimentares: [],
    observacoes: 'Tem viagem marcada nessa data',
  }
];

// ============================================
// DICAS DE USO
// ============================================

/*
1. CATEGORIAS DE CASAMENTO PRÉ-CONFIGURADAS:
   - buffet
   - decoracao
   - local
   - foto-video
   - vestido-terno
   - convites
   - lua-mel
   - flores
   - bolo
   - banda-dj
   - transporte
   - hospedagem
   - outros

2. TIPOS DE CÔMODOS:
   - quarto
   - cozinha
   - sala
   - banheiro
   - area-servico
   - varanda
   - escritorio
   - outro

3. PRIORIDADES:
   - alta (compre logo!)
   - media (em breve)
   - baixa (pode esperar)

4. STATUS DO CASAMENTO:
   - orçado (ainda está apenas cotado)
   - pendente (já pagou parcial ou está agendado)
   - pago (100% pago)

5. CONFIRMAÇÃO CONVIDADO:
   - sim (confirmado)
   - nao (não vem)
   - talvez (ainda não decidiu)

6. RESTRIÇÕES ALIMENTARES:
   - nenhuma
   - vegetariano
   - vegano
   - gluten-free
   - lactose-free
   - (você pode adicionar mais customizando o código)
*/

// ============================================
// COMO EXPORTAR SEUS DADOS
// ============================================

/*
1. Abra o DevTools do navegador (F12)
2. Vá em: Application > Local Storage > seu-dominio
3. Procure pelas chaves:
   - casamento-store
   - casa-store
   - ideias-store
   - convidados-store
4. Copie os valores para backup

OU use este script no console:

// Exportar todos os dados
const dados = {
  casamento: JSON.parse(localStorage.getItem('casamento-store')),
  casa: JSON.parse(localStorage.getItem('casa-store')),
  ideias: JSON.parse(localStorage.getItem('ideias-store')),
  convidados: JSON.parse(localStorage.getItem('convidados-store'))
};
console.log(JSON.stringify(dados, null, 2));
*/

export default exemplosCasamento;
