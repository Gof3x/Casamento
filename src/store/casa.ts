import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DadosCasa, ItemCasa, Comodo, Prioridade } from '@/types';

interface CasaStore {
  dados: DadosCasa;
  adicionarItem: (item: Omit<ItemCasa, 'id'>) => void;
  atualizarItem: (itemId: string, item: Partial<ItemCasa>) => void;
  deletarItem: (itemId: string) => void;
  marcarComoComprado: (itemId: string) => void;
  getTotalEstimado: () => number;
  getTotalGasto: () => number;
  getItensPorComodo: (comodo: Comodo) => ItemCasa[];
  getItensPorPrioridade: (prioridade: Prioridade) => ItemCasa[];
  getItensPendentes: () => ItemCasa[];
  getItensComprados: () => ItemCasa[];
}

export const useCasaStore = create<CasaStore>()(
  persist(
    (set, get) => ({
      dados: {
        itens: [
          {
            id: '1',
            nome: 'Geladeira',
            comodo: 'cozinha',
            valorEstimado: 2500,
            valorReal: 0,
            comprado: false,
            prioridade: 'alta',
          },
          {
            id: '2',
            nome: 'Fogão',
            comodo: 'cozinha',
            valorEstimado: 1500,
            valorReal: 0,
            comprado: false,
            prioridade: 'alta',
          },
          {
            id: '3',
            nome: 'Cama Queen',
            comodo: 'quarto',
            valorEstimado: 3000,
            valorReal: 3200,
            comprado: true,
            prioridade: 'alta',
          },
          {
            id: '4',
            nome: 'Sofá 3 lugares',
            comodo: 'sala',
            valorEstimado: 2000,
            valorReal: 0,
            comprado: false,
            prioridade: 'media',
          },
        ],
        valorTotalEstimado: 0,
        valorTotalGasto: 0,
      },

      adicionarItem: (item: Omit<ItemCasa, 'id'>) => {
        const id = crypto.randomUUID();
        set((state) => ({
          dados: {
            ...state.dados,
            itens: [...state.dados.itens, { ...item, id }],
          },
        }));
      },

      atualizarItem: (itemId: string, item: Partial<ItemCasa>) => {
        set((state) => ({
          dados: {
            ...state.dados,
            itens: state.dados.itens.map((i) => (i.id === itemId ? { ...i, ...item } : i)),
          },
        }));
      },

      deletarItem: (itemId: string) => {
        set((state) => ({
          dados: {
            ...state.dados,
            itens: state.dados.itens.filter((i) => i.id !== itemId),
          },
        }));
      },

      marcarComoComprado: (itemId: string) => {
        set((state) => ({
          dados: {
            ...state.dados,
            itens: state.dados.itens.map((i) =>
              i.id === itemId ? { ...i, comprado: !i.comprado } : i
            ),
          },
        }));
      },

      getTotalEstimado: () => {
        const state = get();
        return state.dados.itens.reduce((total, item) => total + item.valorEstimado, 0);
      },

      getTotalGasto: () => {
        const state = get();
        return state.dados.itens.reduce((total, item) => total + (item.comprado ? item.valorReal : 0), 0);
      },

      getItensPorComodo: (comodo: Comodo) => {
        const state = get();
        return state.dados.itens.filter((item) => item.comodo === comodo);
      },

      getItensPorPrioridade: (prioridade: Prioridade) => {
        const state = get();
        return state.dados.itens.filter((item) => item.prioridade === prioridade);
      },

      getItensPendentes: () => {
        const state = get();
        return state.dados.itens.filter((item) => !item.comprado);
      },

      getItensComprados: () => {
        const state = get();
        return state.dados.itens.filter((item) => item.comprado);
      },
    }),
    {
      name: 'casa-store',
    }
  )
);
