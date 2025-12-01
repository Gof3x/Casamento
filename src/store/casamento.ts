import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  DadosCasamento,
  CategoriaCasamento,
  ItemCasamento,
  CasamentoCategoria,
  CasamentoEstilo,
} from '@/types';

interface CasamentoStore {
  dados: DadosCasamento;
  setDataCasamento: (data: string) => void;
  setOrcamentoTotal: (valor: number) => void;
  setNomes: (nomeNoivo: string, nomeNoiva: string) => void;
  setPaleta: (cores: string[]) => void;
  setEstilo: (estilo: CasamentoEstilo) => void;
  adicionarItem: (categoria: CasamentoCategoria, item: Omit<ItemCasamento, 'id'>) => void;
  atualizarItem: (categoria: CasamentoCategoria, itemId: string, item: Partial<ItemCasamento>) => void;
  deletarItem: (categoria: CasamentoCategoria, itemId: string) => void;
  getTotalGasto: () => number;
  getPercentualGasto: () => number;
  getCategoriaPorId: (id: CasamentoCategoria) => CategoriaCasamento | undefined;
}

const CATEGORIAS_INICIAIS: CategoriaCasamento[] = [
  { id: 'buffet', nome: 'buffet', label: 'Buffet', orcamentoTotal: 5000, itens: [] },
  { id: 'decoracao', nome: 'decoracao', label: 'Decoração', orcamentoTotal: 3000, itens: [] },
  { id: 'local', nome: 'local', label: 'Local', orcamentoTotal: 6000, itens: [] },
  { id: 'foto-video', nome: 'foto-video', label: 'Foto/Vídeo', orcamentoTotal: 4000, itens: [] },
  { id: 'vestido-terno', nome: 'vestido-terno', label: 'Vestido/Terno', orcamentoTotal: 3500, itens: [] },
  { id: 'convites', nome: 'convites', label: 'Convites', orcamentoTotal: 500, itens: [] },
  { id: 'lua-mel', nome: 'lua-mel', label: 'Lua de Mel', orcamentoTotal: 8000, itens: [] },
  { id: 'flores', nome: 'flores', label: 'Flores', orcamentoTotal: 1500, itens: [] },
  { id: 'bolo', nome: 'bolo', label: 'Bolo', orcamentoTotal: 800, itens: [] },
  { id: 'banda-dj', nome: 'banda-dj', label: 'Banda/DJ', orcamentoTotal: 2500, itens: [] },
  { id: 'transporte', nome: 'transporte', label: 'Transporte', orcamentoTotal: 1500, itens: [] },
  { id: 'hospedagem', nome: 'hospedagem', label: 'Hospedagem', orcamentoTotal: 2000, itens: [] },
  { id: 'outros', nome: 'outros', label: 'Outros', orcamentoTotal: 1000, itens: [] },
];

export const useCasamentoStore = create<CasamentoStore>()(
  persist(
    (set, get) => ({
      dados: {
        dataCasamento: '2028-08-16',
        orcamentoTotal: 80000,
        categorias: CATEGORIAS_INICIAIS,
        paleta: ['#FFF1F3', '#F4A7B9', '#D90368', '#FFD700', '#2E2E2E'],
        estilo: 'classico',
        nomeNoivo: 'José Ítalo',
        nomeNoiva: 'Ana Luiza',
      },

      setDataCasamento: (data: string) => {
        set((state) => ({
          dados: { ...state.dados, dataCasamento: data },
        }));
      },

      setOrcamentoTotal: (valor: number) => {
        set((state) => ({
          dados: { ...state.dados, orcamentoTotal: valor },
        }));
      },

      setNomes: (nomeNoivo: string, nomeNoiva: string) => {
        set((state) => ({
          dados: { ...state.dados, nomeNoivo, nomeNoiva },
        }));
      },

      setPaleta: (cores: string[]) => {
        set((state) => ({
          dados: { ...state.dados, paleta: cores },
        }));
      },

      setEstilo: (estilo: CasamentoEstilo) => {
        set((state) => ({
          dados: { ...state.dados, estilo },
        }));
      },

      adicionarItem: (categoria: CasamentoCategoria, item: Omit<ItemCasamento, 'id'>) => {
        const id = crypto.randomUUID();
        set((state) => {
          const categorias = state.dados.categorias.map((cat) => {
            if (cat.nome === categoria) {
              return {
                ...cat,
                itens: [...cat.itens, { ...item, id }],
              };
            }
            return cat;
          });
          return { dados: { ...state.dados, categorias } };
        });
      },

      atualizarItem: (categoria: CasamentoCategoria, itemId: string, item: Partial<ItemCasamento>) => {
        set((state) => {
          const categorias = state.dados.categorias.map((cat) => {
            if (cat.nome === categoria) {
              return {
                ...cat,
                itens: cat.itens.map((i) => (i.id === itemId ? { ...i, ...item } : i)),
              };
            }
            return cat;
          });
          return { dados: { ...state.dados, categorias } };
        });
      },

      deletarItem: (categoria: CasamentoCategoria, itemId: string) => {
        set((state) => {
          const categorias = state.dados.categorias.map((cat) => {
            if (cat.nome === categoria) {
              return {
                ...cat,
                itens: cat.itens.filter((i) => i.id !== itemId),
              };
            }
            return cat;
          });
          return { dados: { ...state.dados, categorias } };
        });
      },

      getTotalGasto: () => {
        const state = get();
        return state.dados.categorias.reduce((total, cat) => {
          return total + cat.itens.reduce((catTotal, item) => catTotal + item.valorReal, 0);
        }, 0);
      },

      getPercentualGasto: () => {
        const state = get();
        const total = state.dados.orcamentoTotal;
        const gasto = state.getTotalGasto();
        return total > 0 ? (gasto / total) * 100 : 0;
      },

      getCategoriaPorId: (id: CasamentoCategoria) => {
        const state = get();
        return state.dados.categorias.find((cat) => cat.nome === id);
      },
    }),
    {
      name: 'casamento-store-v2',
    }
  )
);
