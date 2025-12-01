import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DadosConvidados, Convidado, ConfirmacaoConvidado, LadoConvidado } from '@/types';

const LIMITE_CONVIDADOS_POR_LADO = 100;

interface ConvidadosStore {
  dados: DadosConvidados;
  adicionarConvidado: (convidado: Omit<Convidado, 'id' | 'lado'> & { lado: LadoConvidado }, lado: LadoConvidado) => { sucesso: boolean; mensagem?: string };
  atualizarConvidado: (id: string, convidado: Partial<Convidado>) => void;
  deletarConvidado: (id: string) => void;
  atualizarConfirmacao: (id: string, confirmacao: ConfirmacaoConvidado) => void;
  calcularTotais: () => void;
  getTotalAcompanhantes: () => number;
  getTotalConvidados: () => number;
  getConvidadosPorLado: (lado: LadoConvidado) => Convidado[];
}

export const useConvidadosStore = create<ConvidadosStore>()(
  persist(
    (set, get) => ({
      dados: {
        convidados: [
          {
            id: '1',
            nome: 'Ana Silva',
            email: 'ana@email.com',
            telefone: '11999999999',
            confirmacao: 'sim',
            acompanhantes: 1,
            restricoesAlimentares: ['vegetariano'],
            lado: 'noivo',
          },
          {
            id: '2',
            nome: 'Carlos Santos',
            email: 'carlos@email.com',
            confirmacao: 'talvez',
            acompanhantes: 0,
            restricoesAlimentares: [],
            lado: 'noiva',
          },
          {
            id: '3',
            nome: 'Maria Oliveira',
            telefone: '11988888888',
            confirmacao: 'nao',
            acompanhantes: 0,
            restricoesAlimentares: [],
            lado: 'noivo',
          },
        ],
        totalConfirmados: 2,
        totalTalvez: 1,
        totalRecusados: 0,
        convidadosNoivo: 2,
        convidadosNoiva: 1,
      },

      adicionarConvidado: (convidado: Omit<Convidado, 'id' | 'lado'> & { lado: LadoConvidado }, lado: LadoConvidado) => {
        const state = get();
        const convidadosPorLado = state.dados.convidados.filter((c) => c.lado === lado).length;

        if (convidadosPorLado >= LIMITE_CONVIDADOS_POR_LADO) {
          return {
            sucesso: false,
            mensagem: `Limite de ${LIMITE_CONVIDADOS_POR_LADO} convidados atingido para a lista do ${lado === 'noivo' ? 'noivo' : 'noiva'}`,
          };
        }

        const id = crypto.randomUUID();
        set((state) => ({
          dados: {
            ...state.dados,
            convidados: [...state.dados.convidados, { ...convidado, id }],
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

      calcularTotais: () => {
        const state = get();
        const confirmados = state.dados.convidados.filter((c) => c.confirmacao === 'sim').length;
        const talvez = state.dados.convidados.filter((c) => c.confirmacao === 'talvez').length;
        const recusados = state.dados.convidados.filter((c) => c.confirmacao === 'nao').length;
        const convidadosNoivo = state.dados.convidados.filter((c) => c.lado === 'noivo').length;
        const convidadosNoiva = state.dados.convidados.filter((c) => c.lado === 'noiva').length;

        set((state) => ({
          dados: {
            ...state.dados,
            totalConfirmados: confirmados,
            totalTalvez: talvez,
            totalRecusados: recusados,
            convidadosNoivo,
            convidadosNoiva,
          },
        }));
      },

      getTotalAcompanhantes: () => {
        const state = get();
        return state.dados.convidados.reduce((total, c) => total + c.acompanhantes, 0);
      },

      getTotalConvidados: () => {
        const state = get();
        return state.dados.convidados.length;
      },

      getConvidadosPorLado: (lado: LadoConvidado) => {
        const state = get();
        return state.dados.convidados.filter((c) => c.lado === lado);
      },
    }),
    {
      name: 'convidados-store-v2',
    }
  )
);
