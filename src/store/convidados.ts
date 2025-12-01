import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DadosConvidados, Convidado, Padrinho, ConfirmacaoConvidado, LadoConvidado } from '@/types';

const LIMITE_CONVIDADOS_POR_LADO = 100;
const LIMITE_PADRINHOS_POR_LADO = 4; // 4 casais = 8 pessoas por lado

interface ConvidadosStore {
  dados: DadosConvidados;
  adicionarConvidado: (convidado: Omit<Convidado, 'id'>, lado: LadoConvidado) => { sucesso: boolean; mensagem?: string };
  atualizarConvidado: (id: string, convidado: Partial<Convidado>) => void;
  deletarConvidado: (id: string) => void;
  adicionarPadrinho: (padrinho: Omit<Padrinho, 'id'>) => { sucesso: boolean; mensagem?: string };
  atualizarPadrinho: (id: string, padrinho: Partial<Padrinho>) => void;
  deletarPadrinho: (id: string) => void;
  atualizarConfirmacao: (id: string, confirmacao: ConfirmacaoConvidado) => void;
  atualizarConfirmacaoPadrinho: (id: string, confirmacao: ConfirmacaoConvidado) => void;
  calcularTotais: () => void;
  getTotalConvidados: () => number;
  getConvidadosPorLado: (lado: LadoConvidado) => Convidado[];
  getPadrinhoPorLado: (lado: LadoConvidado) => Padrinho[];
}

export const useConvidadosStore = create<ConvidadosStore>()(
  persist(
    (set, get) => ({
      dados: {
        convidados: [],
        padrinhos: [],
        totalConfirmados: 0,
        totalTalvez: 0,
        totalRecusados: 0,
        convidadosNoivo: 0,
        convidadosNoiva: 0,
        padrinhosNoivoQuantidade: 0,
        padrinhosNoivaQuantidade: 0,
      },

      adicionarConvidado: (convidado: Omit<Convidado, 'id'>, lado: LadoConvidado) => {
        const state = get();
        const convidadosPorLado = state.dados.convidados.filter((c) => c.lado === lado).length;
        const padrinhosEmEsseLado = state.dados.padrinhos
          .filter((p) => p.lado === lado)
          .reduce((total, p) => total + (p.ehCasal ? 2 : 1), 0);
        
        const totalEmEsseLado = convidadosPorLado + padrinhosEmEsseLado;

        if (totalEmEsseLado >= LIMITE_CONVIDADOS_POR_LADO) {
          return {
            sucesso: false,
            mensagem: `Limite de ${LIMITE_CONVIDADOS_POR_LADO} convidados atingido para a lista do ${lado === 'noivo' ? 'noivo' : 'noiva'}`,
          };
        }

        const id = crypto.randomUUID();
        set((state) => ({
          dados: {
            ...state.dados,
            convidados: [...state.dados.convidados, { ...convidado, id, lado }],
          },
        }));
        get().calcularTotais();
        return { sucesso: true };
      },

      atualizarConvidado: (id: string, convidado: Partial<Convidado>) => {
        set((state) => ({
          dados: {
            ...state.dados,
            convidados: state.dados.convidados.map((c) => (c.id === id ? { ...c, ...convidado } : c)),
          },
        }));
        get().calcularTotais();
      },

      deletarConvidado: (id: string) => {
        set((state) => ({
          dados: {
            ...state.dados,
            convidados: state.dados.convidados.filter((c) => c.id !== id),
          },
        }));
        get().calcularTotais();
      },

      adicionarPadrinho: (padrinho: Omit<Padrinho, 'id'>) => {
        const state = get();
        const padrinhosEmEsseLado = state.dados.padrinhos.filter((p) => p.lado === padrinho.lado).length;

        if (padrinhosEmEsseLado >= LIMITE_PADRINHOS_POR_LADO) {
          return {
            sucesso: false,
            mensagem: `Limite de ${LIMITE_PADRINHOS_POR_LADO} casais de padrinhos atingido para o ${padrinho.lado === 'noivo' ? 'noivo' : 'noiva'}`,
          };
        }

        const id = crypto.randomUUID();
        set((state) => ({
          dados: {
            ...state.dados,
            padrinhos: [...state.dados.padrinhos, { ...padrinho, id }],
          },
        }));
        get().calcularTotais();
        return { sucesso: true };
      },

      atualizarPadrinho: (id: string, padrinho: Partial<Padrinho>) => {
        set((state) => ({
          dados: {
            ...state.dados,
            padrinhos: state.dados.padrinhos.map((p) => (p.id === id ? { ...p, ...padrinho } : p)),
          },
        }));
        get().calcularTotais();
      },

      deletarPadrinho: (id: string) => {
        set((state) => ({
          dados: {
            ...state.dados,
            padrinhos: state.dados.padrinhos.filter((p) => p.id !== id),
          },
        }));
        get().calcularTotais();
      },

      atualizarConfirmacao: (id: string, confirmacao: ConfirmacaoConvidado) => {
        set((state) => ({
          dados: {
            ...state.dados,
            convidados: state.dados.convidados.map((c) =>
              c.id === id ? { ...c, confirmacao } : c
            ),
          },
        }));
        get().calcularTotais();
      },

      atualizarConfirmacaoPadrinho: (id: string, confirmacao: ConfirmacaoConvidado) => {
        set((state) => ({
          dados: {
            ...state.dados,
            padrinhos: state.dados.padrinhos.map((p) =>
              p.id === id ? { ...p, confirmacao } : p
            ),
          },
        }));
        get().calcularTotais();
      },

      calcularTotais: () => {
        const state = get();
        const confirmados = state.dados.convidados.filter((c) => c.confirmacao === 'sim').length;
        const talvez = state.dados.convidados.filter((c) => c.confirmacao === 'talvez').length;
        const recusados = state.dados.convidados.filter((c) => c.confirmacao === 'nao').length;
        const convidadosNoivo = state.dados.convidados.filter((c) => c.lado === 'noivo').length;
        const convidadosNoiva = state.dados.convidados.filter((c) => c.lado === 'noiva').length;
        const padrinhosNoivoQuantidade = state.dados.padrinhos.filter((p) => p.lado === 'noivo').length;
        const padrinhosNoivaQuantidade = state.dados.padrinhos.filter((p) => p.lado === 'noiva').length;

        set((state) => ({
          dados: {
            ...state.dados,
            totalConfirmados: confirmados,
            totalTalvez: talvez,
            totalRecusados: recusados,
            convidadosNoivo,
            convidadosNoiva,
            padrinhosNoivoQuantidade,
            padrinhosNoivaQuantidade,
          },
        }));
      },

      getTotalConvidados: () => {
        const state = get();
        return state.dados.convidados.length;
      },

      getConvidadosPorLado: (lado: LadoConvidado) => {
        const state = get();
        return state.dados.convidados.filter((c) => c.lado === lado);
      },

      getPadrinhoPorLado: (lado: LadoConvidado) => {
        const state = get();
        return state.dados.padrinhos.filter((p) => p.lado === lado);
      },
    }),
    {
      name: 'convidados-store-v3',
    }
  )
);
