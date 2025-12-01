import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Card, Button, Input, Select, Modal, ProgressBar } from '@/components';
import { useCasamentoStore } from '@/store/casamento';
import { CasamentoCategoria, ItemCasamento, CasamentoStatus } from '@/types';

export const OrcamentoCasamentoPage: React.FC = () => {
  const { dados, setOrcamentoTotal, adicionarItem, atualizarItem, deletarItem, getTotalGasto, getPercentualGasto } =
    useCasamentoStore();

  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<ItemCasamento | null>(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState<CasamentoCategoria>('buffet');
  const [editandoOrcamento, setEditandoOrcamento] = useState(false);
  const [orcamentoEditado, setOrcamentoEditado] = useState(dados.orcamentoTotal);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valorEstimado: 0,
    valorReal: 0,
    status: 'orçado' as CasamentoStatus,
    fornecedor: '',
  });

  const handleAbrirModal = (item?: ItemCasamento) => {
    if (item) {
      setEditando(item);
      setFormData({
        nome: item.nome,
        descricao: item.descricao || '',
        valorEstimado: item.valorEstimado,
        valorReal: item.valorReal,
        status: item.status,
        fornecedor: item.fornecedor || '',
      });
    } else {
      setEditando(null);
      setFormData({
        nome: '',
        descricao: '',
        valorEstimado: 0,
        valorReal: 0,
        status: 'orçado',
        fornecedor: '',
      });
    }
    setModalAberto(true);
  };

  const handleSalvar = () => {
    if (!formData.nome.trim()) return;

    if (editando) {
      atualizarItem(categoriaAtiva, editando.id, formData);
    } else {
      adicionarItem(categoriaAtiva, formData);
    }

    setModalAberto(false);
  };

  const handleSalvarOrcamento = () => {
    if (orcamentoEditado > 0) {
      setOrcamentoTotal(orcamentoEditado);
      setEditandoOrcamento(false);
    }
  };

  const categoriaAtual = dados.categorias.find((c) => c.nome === categoriaAtiva);
  const totalCategoriaEstimado = categoriaAtual?.orcamentoTotal || 0;
  const totalCategoriaGasto = categoriaAtual?.itens.reduce((sum, item) => sum + item.valorReal, 0) || 0;

  const statusBadge = (status: CasamentoStatus) => {
    const badges = {
      orçado: 'bg-blue-100 text-blue-800',
      pendente: 'bg-yellow-100 text-yellow-800',
      pago: 'bg-green-100 text-green-800',
    };
    return badges[status];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6 sm:mb-8 px-4">
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Orçamento do Casamento</h1>
        <p className="text-sm sm:text-base text-gray-600">Organize todas as despesas por categoria</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total Gasto</p>
          <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-rose-600">
            R$ {getTotalGasto().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">de R$ {dados.orcamentoTotal.toLocaleString('pt-BR')}</p>
        </Card>

        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Orçamento Total</p>
          {editandoOrcamento ? (
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
              <div className="flex-1">
                <input
                  type="number"
                  value={orcamentoEditado}
                  onChange={(e) => setOrcamentoEditado(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-rose-300 rounded-lg text-base sm:text-lg font-bold text-rose-600"
                />
              </div>
              <button
                onClick={handleSalvarOrcamento}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm sm:text-base font-medium"
              >
                ✓ Salvar
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                setEditandoOrcamento(true);
                setOrcamentoEditado(dados.orcamentoTotal);
              }}
              className="cursor-pointer hover:bg-rose-50 p-2 rounded transition"
            >
              <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-rose-600">
                R$ {dados.orcamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-400 mt-1">👆 Clique para editar</p>
            </div>
          )}
        </Card>

        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Percentual Utilizado</p>
          <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-rose-600">{getPercentualGasto().toFixed(1)}%</p>
          <ProgressBar value={getTotalGasto()} max={dados.orcamentoTotal} showPercentage={false} />
        </Card>

        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Disponível</p>
          <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-amber-600">
            R$ {(dados.orcamentoTotal - getTotalGasto()).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap pb-3 px-4 sm:px-0 mt-6">
        {dados.categorias.map((cat) => (
          <button
            key={cat.nome}
            onClick={() => setCategoriaAtiva(cat.nome)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
              categoriaAtiva === cat.nome
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Category Details */}
      {categoriaAtual && (
        <Card>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 px-4 sm:px-0">
            <div className="flex-1">
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800">{categoriaAtual.label}</h2>
              <p className="text-gray-600 text-sm mt-1">
                R$ {totalCategoriaGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R${' '}
                {totalCategoriaEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Button onClick={() => handleAbrirModal()} size="md" className="w-full sm:w-auto flex items-center justify-center gap-2">
              <Plus size={18} />
              <span>Adicionar</span>
            </Button>
          </div>

          <ProgressBar
            value={totalCategoriaGasto}
            max={totalCategoriaEstimado}
            label="Utilização do orçamento"
          />

          {/* Items List */}
          <div className="mt-6 space-y-3 px-4 sm:px-0">
            {categoriaAtual.itens.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Nenhum item adicionado nesta categoria</p>
            ) : (
              categoriaAtual.itens.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base break-words">{item.nome}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${statusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    {item.descricao && <p className="text-xs sm:text-sm text-gray-600 mt-2 break-words">{item.descricao}</p>}
                    {item.fornecedor && <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">📌 {item.fornecedor}</p>}
                    <div className="text-xs sm:text-sm text-gray-600 mt-2 flex flex-col sm:flex-row sm:gap-2">
                      <span>Estimado: R$ {item.valorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <span className="hidden sm:inline">|</span>
                      <span>Real: R$ {item.valorReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => handleAbrirModal(item)}
                      className="flex-1 sm:flex-none p-2 hover:bg-white rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={18} className="text-blue-600 mx-auto sm:mx-0" />
                    </button>
                    <button
                      onClick={() => deletarItem(categoriaAtiva, item.id)}
                      className="flex-1 sm:flex-none p-2 hover:bg-white rounded-lg transition-colors"
                      title="Deletar"
                    >
                      <Trash2 size={18} className="text-red-600 mx-auto sm:mx-0" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

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
            placeholder="Ex: Fotógrafo"
          />
          <Input
            label="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            placeholder="Detalhes adicionais"
          />
          <Input
            label="Fornecedor/Local"
            value={formData.fornecedor}
            onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
            placeholder="Ex: Studio XYZ"
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
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as CasamentoStatus })}
            options={[
              { value: 'orçado', label: '💭 Orçado' },
              { value: 'pendente', label: '⏳ Pendente' },
              { value: 'pago', label: '✅ Pago' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};
