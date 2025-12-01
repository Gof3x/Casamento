import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DadosIdeias, Inspiracao, ChecklistItem, TimelineEvento, CasamentoEstilo } from '@/types';

interface IdeiasStore {
  dados: DadosIdeias;
  setPaletaCores: (cores: string[]) => void;
  setEstilo: (estilo: CasamentoEstilo) => void;
  adicionarInspiracao: (inspiracao: Omit<Inspiracao, 'id'>) => void;
  deletarInspiracao: (id: string) => void;
  adicionarChecklistItem: (item: Omit<ChecklistItem, 'id'>) => void;
  atualizarChecklistItem: (id: string, item: Partial<ChecklistItem>) => void;
  deletarChecklistItem: (id: string) => void;
  adicionarTimelineEvento: (evento: Omit<TimelineEvento, 'id'>) => void;
  atualizarTimelineEvento: (id: string, evento: Partial<TimelineEvento>) => void;
  deletarTimelineEvento: (id: string) => void;
  getChecklistProgress: () => number;
}

export const useIdeiasStore = create<IdeiasStore>()(
  persist(
    (set, get) => ({
      dados: {
        paletaCores: ['#FFF1F3', '#F4A7B9', '#D90368', '#FFD700', '#2E2E2E'],
        estilo: 'classico',
        inspiracoes: [
          {
            id: '1',
            titulo: 'Decoração em tons pastel',
            descricao: 'Ideias de decoração com cores suaves e elegantes',
            categoria: 'decoracao',
          },
        ],
        checklist: [
          { id: '1', titulo: 'Contratar buffet', concluido: false },
          { id: '2', titulo: 'Escolher local do casamento', concluido: true },
          { id: '3', titulo: 'Enviar convites', concluido: false },
          { id: '4', titulo: 'Contratar fotógrafo', concluido: false },
          { id: '5', titulo: 'Fazer lista de presentes', concluido: false },
        ],
        timeline: [
          { id: '1', titulo: 'Chegada dos convidados', horario: '16:00', local: 'Entrada' },
          { id: '2', titulo: 'Cerimônia', horario: '17:00', local: 'Salão Principal' },
          { id: '3', titulo: 'Coquetel', horario: '18:30', local: 'Terraço' },
          { id: '4', titulo: 'Jantar', horario: '19:30', local: 'Salão de Festas' },
          { id: '5', titulo: 'Primeira dança', horario: '21:00', local: 'Pista de Dança' },
        ],
      },

      setPaletaCores: (cores: string[]) => {
        set((state) => ({
          dados: { ...state.dados, paletaCores: cores },
        }));
      },

      setEstilo: (estilo: CasamentoEstilo) => {
        set((state) => ({
          dados: { ...state.dados, estilo },
        }));
      },

      adicionarInspiracao: (inspiracao: Omit<Inspiracao, 'id'>) => {
        const id = crypto.randomUUID();
        set((state) => ({
          dados: {
            ...state.dados,
            inspiracoes: [...state.dados.inspiracoes, { ...inspiracao, id }],
          },
        }));
      },

      deletarInspiracao: (id: string) => {
        set((state) => ({
          dados: {
            ...state.dados,
            inspiracoes: state.dados.inspiracoes.filter((i) => i.id !== id),
          },
        }));
      },

      adicionarChecklistItem: (item: Omit<ChecklistItem, 'id'>) => {
        const id = crypto.randomUUID();
        set((state) => ({
          dados: {
            ...state.dados,
            checklist: [...state.dados.checklist, { ...item, id }],
          },
        }));
      },

      atualizarChecklistItem: (id: string, item: Partial<ChecklistItem>) => {
        set((state) => ({
          dados: {
            ...state.dados,
            checklist: state.dados.checklist.map((i) => (i.id === id ? { ...i, ...item } : i)),
          },
        }));
      },

      deletarChecklistItem: (id: string) => {
        set((state) => ({
          dados: {
            ...state.dados,
            checklist: state.dados.checklist.filter((i) => i.id !== id),
          },
        }));
      },

      adicionarTimelineEvento: (evento: Omit<TimelineEvento, 'id'>) => {
        const id = crypto.randomUUID();
        set((state) => ({
          dados: {
            ...state.dados,
            timeline: [...state.dados.timeline, { ...evento, id }],
          },
        }));
      },

      atualizarTimelineEvento: (id: string, evento: Partial<TimelineEvento>) => {
        set((state) => ({
          dados: {
            ...state.dados,
            timeline: state.dados.timeline.map((e) => (e.id === id ? { ...e, ...evento } : e)),
          },
        }));
      },

      deletarTimelineEvento: (id: string) => {
        set((state) => ({
          dados: {
            ...state.dados,
            timeline: state.dados.timeline.filter((e) => e.id !== id),
          },
        }));
      },

      getChecklistProgress: () => {
        const state = get();
        const total = state.dados.checklist.length;
        const concluidos = state.dados.checklist.filter((i) => i.concluido).length;
        return total > 0 ? (concluidos / total) * 100 : 0;
      },
    }),
    {
      name: 'ideias-store',
    }
  )
);
