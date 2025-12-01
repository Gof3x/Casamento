// Tipos para Orçamento do Casamento
export type CasamentoStatus = 'orçado' | 'pendente' | 'pago';
export type CasamentoCategoria = 'buffet' | 'decoracao' | 'local' | 'foto-video' | 'vestido-terno' | 'convites' | 'lua-mel' | 'flores' | 'bolo' | 'banda-dj' | 'transporte' | 'hospedagem' | 'outros';
export type CasamentoEstilo = 'classico' | 'boho' | 'minimalista' | 'rustico' | 'moderno' | 'vintage';

export interface ItemCasamento {
  id: string;
  nome: string;
  descricao?: string;
  valorEstimado: number;
  valorReal: number;
  status: CasamentoStatus;
  fornecedor?: string;
  data?: string;
}

export interface CategoriaCasamento {
  id: string;
  nome: CasamentoCategoria;
  label: string;
  orcamentoTotal: number;
  itens: ItemCasamento[];
}

export interface DadosCasamento {
  dataCasamento: string;
  orcamentoTotal: number;
  categorias: CategoriaCasamento[];
  paleta: string[];
  estilo: CasamentoEstilo;
  nomeNoivo: string;
  nomeNoiva: string;
}

// Tipos para Casa
export type Comodo = 'quarto' | 'cozinha' | 'sala' | 'banheiro' | 'area-servico' | 'varanda' | 'escritorio' | 'outro';
export type Prioridade = 'alta' | 'media' | 'baixa';

export interface ItemCasa {
  id: string;
  nome: string;
  descricao?: string;
  comodo: Comodo;
  valorEstimado: number;
  valorReal: number;
  comprado: boolean;
  prioridade: Prioridade;
  linkLoja?: string;
  data?: string;
}

export interface DadosCasa {
  itens: ItemCasa[];
  valorTotalEstimado: number;
  valorTotalGasto: number;
}

// Tipos para Ideias/Inspiração
export interface Inspiracao {
  id: string;
  titulo: string;
  descricao: string;
  link?: string;
  imagem?: string;
  categoria?: string;
}

export interface ChecklistItem {
  id: string;
  titulo: string;
  concluido: boolean;
  dataVencimento?: string;
}

export interface TimelineEvento {
  id: string;
  titulo: string;
  horario: string;
  local?: string;
  descricao?: string;
}

export interface DadosIdeias {
  paletaCores: string[];
  estilo: CasamentoEstilo;
  inspiracoes: Inspiracao[];
  checklist: ChecklistItem[];
  timeline: TimelineEvento[];
}

// Tipos para Convidados
export type ConfirmacaoConvidado = 'sim' | 'nao' | 'talvez';
export type RestricaoAlimentar = 'vegetariano' | 'vegano' | 'gluten-free' | 'lactose-free' | 'nenhuma';
export type LadoConvidado = 'noivo' | 'noiva';

export interface Convidado {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  confirmacao: ConfirmacaoConvidado;
  acompanhantes: number;
  restricoesAlimentares: RestricaoAlimentar[];
  observacoes?: string;
  lado: LadoConvidado;
}

export interface DadosConvidados {
  convidados: Convidado[];
  totalConfirmados: number;
  totalTalvez: number;
  totalRecusados: number;
  convidadosNoivo: number;
  convidadosNoiva: number;
}
