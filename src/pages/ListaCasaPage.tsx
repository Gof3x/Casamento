import React, { useState } from 'react';
import { Plus, Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';
import { Card, Button, Input, Select, Modal, ProgressBar } from '@/components';
import { useCasaStore } from '@/store/casa';
import { ItemCasa, Comodo, Prioridade } from '@/types';

type Filtro = 'todos' | 'comprados' | 'pendentes';

const COMODOS: { value: Comodo; label: string }[] = [
  { value: 'quarto', label: '🛏️ Quarto' },
  { value: 'cozinha', label: '🍳 Cozinha' },
  { value: 'sala', label: '🛋️ Sala' },
  { value: 'banheiro', label: '🚿 Banheiro' },
  { value: 'area-servico', label: '🧺 Área de Serviço' },
  { value: 'varanda', label: '🌴 Varanda' },
  { value: 'escritorio', label: '💼 Escritório' },
  { value: 'outro', label: '📦 Outro' },
];

const PRIORIDADES: { value: Prioridade; label: string; color: string }[] = [
  { value: 'alta', label: '🔴 Alta', color: 'bg-red-100 text-red-800' },
  { value: 'media', label: '🟡 Média', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'baixa', label: '🟢 Baixa', color: 'bg-green-100 text-green-800' },
];

export const ListaCasaPage: React.FC = () => {
  const { dados, adicionarItem, atualizarItem, deletarItem, marcarComoComprado, getTotalEstimado, getTotalGasto } =
    useCasaStore();

  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<ItemCasa | null>(null);
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [comodoFiltro, setComodoFiltro] = useState<Comodo | 'todos'>('todos');
  const [prioridadeFiltro, setPrioridadeFiltro] = useState<Prioridade | 'todos'>('todos');

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    comodo: 'quarto' as Comodo,
    valorEstimado: 0,
    valorReal: 0,
    prioridade: 'media' as Prioridade,
    linkLoja: '',
  });

  const handleAbrirModal = (item?: ItemCasa) => {
    if (item) {
      setEditando(item);
      setFormData({
        nome: item.nome,
        descricao: item.descricao || '',
        comodo: item.comodo,
        valorEstimado: item.valorEstimado,
        valorReal: item.valorReal,
        prioridade: item.prioridade,
        linkLoja: item.linkLoja || '',
      });
    } else {
      setEditando(null);
      setFormData({
        nome: '',
        descricao: '',
        comodo: 'quarto',
        valorEstimado: 0,
        valorReal: 0,
        prioridade: 'media',
        linkLoja: '',
      });
    }
    setModalAberto(true);
  };

  const handleSalvar = () => {
    if (!formData.nome.trim()) return;

    if (editando) {
      atualizarItem(editando.id, formData);
    } else {
      adicionarItem({ ...formData, comprado: false });
    }

    setModalAberto(false);
  };

  const itensOrdenados = dados.itens
    .filter((item) => {
      if (filtro === 'comprados') return item.comprado;
      if (filtro === 'pendentes') return !item.comprado;
      return true;
    })
    .filter((item) => (comodoFiltro === 'todos' ? true : item.comodo === comodoFiltro))
    .filter((item) => (prioridadeFiltro === 'todos' ? true : item.prioridade === prioridadeFiltro))
    .sort((a, b) => {
      const prioridadeOrder = { alta: 0, media: 1, baixa: 2 };
      return prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade];
    });

  const itensPendentes = dados.itens.filter((i) => !i.comprado).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Montando Nosso Lar</h1>
        <p className="text-sm sm:text-base text-gray-600">Organize a compra de móveis e utensílios para a casa</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-0">
        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total de Itens</p>
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800">{dados.itens.length}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">{itensPendentes} faltam comprar</p>
        </Card>

        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total Estimado</p>
          <p className="font-playfair text-xl sm:text-2xl font-bold text-amber-600">
            R$ {getTotalEstimado().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>

        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total Gasto</p>
          <p className="font-playfair text-xl sm:text-2xl font-bold text-rose-600">
            R$ {getTotalGasto().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <ProgressBar value={getTotalGasto()} max={getTotalEstimado()} showPercentage={false} />
        </Card>
      </div>

      {/* Filters and Add */}
      <Card className="px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
          <Select
            options={[
              { value: 'todos', label: 'Todos' },
              { value: 'comprados', label: '✅ Comprados' },
              { value: 'pendentes', label: '❌ Pendentes' },
            ]}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as Filtro)}
          />
          <Select
            options={[{ value: 'todos', label: 'Todos os cômodos' }, ...COMODOS]}
            value={comodoFiltro}
            onChange={(e) => setComodoFiltro(e.target.value as Comodo | 'todos')}
          />
          <Select
            options={[{ value: 'todos', label: 'Todas as prioridades' }, ...PRIORIDADES]}
            value={prioridadeFiltro}
            onChange={(e) => setPrioridadeFiltro(e.target.value as Prioridade | 'todos')}
          />
          <Button onClick={() => handleAbrirModal()} className="md:col-span-2 lg:col-span-1 flex items-center justify-center gap-2">
            <Plus size={18} />
            <span>Adicionar</span>
          </Button>
        </div>
      </Card>

      {/* Items by Comodo */}
      <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
        {COMODOS.map((comodo) => {
          const itensDoCom = itensOrdenados.filter((i) => i.comodo === comodo.value);
          if (itensDoCom.length === 0) return null;

          return (
            <Card key={comodo.value}>
              <h2 className="font-playfair text-lg sm:text-xl font-bold text-gray-800 mb-4">{comodo.label}</h2>
              <div className="space-y-2 sm:space-y-3">
                {itensDoCom.map((item) => {
                  const prioridadeInfo = PRIORIDADES.find((p) => p.value === item.prioridade);
                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg transition-all ${
                        item.comprado ? 'bg-gray-100 opacity-75' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <button
                        onClick={() => marcarComoComprado(item.id)}
                        className="flex-shrink-0 text-gray-400 hover:text-rose-600 transition-colors text-2xl"
                      >
                        {item.comprado ? (
                          <CheckCircle2 size={24} className="text-green-600" fill="currentColor" />
                        ) : (
                          <Circle size={24} />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <h3 className={`font-medium text-sm sm:text-base ${item.comprado ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {item.nome}
                          </h3>
                          {prioridadeInfo && (
                            <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${prioridadeInfo.color}`}>
                              {prioridadeInfo.label}
                            </span>
                          )}
                        </div>
                        {item.descricao && <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">{item.descricao}</p>}
                        {item.linkLoja && (
                          <a href={item.linkLoja} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-blue-600 hover:underline">
                            🔗 Ver loja
                          </a>
                        )}
                        <div className="text-xs sm:text-sm text-gray-600 mt-2 flex flex-col sm:flex-row sm:gap-2">
                          <span>Est: R$ {item.valorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          <span className="hidden sm:inline">|</span>
                          <span>Real: R$ {item.valorReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto ml-8 sm:ml-0">
                        <button
                          onClick={() => handleAbrirModal(item)}
                          className="flex-1 sm:flex-none p-2 hover:bg-white rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} className="text-blue-600 mx-auto sm:mx-0" />
                        </button>
                        <button
                          onClick={() => deletarItem(item.id)}
                          className="flex-1 sm:flex-none p-2 hover:bg-white rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <Trash2 size={18} className="text-red-600 mx-auto sm:mx-0" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}

        {itensOrdenados.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-gray-500">Nenhum item encontrado com os filtros aplicados</p>
          </Card>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalAberto}
        title={editando ? 'Editar Item' : 'Novo Item'}
        onClose={() => setModalAberto(false)}
        actions={
          <>
            <Button variant="secondary" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvar}>Salvar</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Nome do Item"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Geladeira"
          />
          <Select
            label="Cômodo"
            options={COMODOS}
            value={formData.comodo}
            onChange={(e) => setFormData({ ...formData, comodo: e.target.value as Comodo })}
          />
          <Input
            label="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            placeholder="Detalhes do item"
          />
          <Select
            label="Prioridade"
            options={PRIORIDADES}
            value={formData.prioridade}
            onChange={(e) => setFormData({ ...formData, prioridade: e.target.value as Prioridade })}
          />
          <Input
            label="Valor Estimado (R$)"
            type="number"
            value={formData.valorEstimado}
            onChange={(e) => setFormData({ ...formData, valorEstimado: parseFloat(e.target.value) || 0 })}
          />
          <Input
            label="Valor Real (R$)"
            type="number"
            value={formData.valorReal}
            onChange={(e) => setFormData({ ...formData, valorReal: parseFloat(e.target.value) || 0 })}
          />
          <Input
            label="Link da Loja (opcional)"
            type="url"
            value={formData.linkLoja}
            onChange={(e) => setFormData({ ...formData, linkLoja: e.target.value })}
            placeholder="https://exemplo.com"
          />
        </div>
      </Modal>
    </div>
  );
};
