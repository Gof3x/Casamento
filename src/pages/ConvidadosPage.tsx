import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Card, Button, Input, Select, Modal } from '@/components';
import { useConvidadosStore } from '@/store/convidados';
import { Convidado, ConfirmacaoConvidado, RestricaoAlimentar, LadoConvidado } from '@/types';

const RESTRICOES: { value: RestricaoAlimentar; label: string }[] = [
  { value: 'nenhuma', label: 'Nenhuma' },
  { value: 'vegetariano', label: '🥗 Vegetariano' },
  { value: 'vegano', label: '🌱 Vegano' },
  { value: 'gluten-free', label: '🌾 Sem Glúten' },
  { value: 'lactose-free', label: '🥛 Sem Lactose' },
];

const LIMITE_CONVIDADOS_POR_LADO = 100;

export const ConvidadosPage: React.FC = () => {
  const { dados, adicionarConvidado, atualizarConvidado, deletarConvidado, getConvidadosPorLado } =
    useConvidadosStore();

  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Convidado | null>(null);
  const [filtro, setFiltro] = useState<ConfirmacaoConvidado | 'todos'>('todos');
  const [ladoAtual, setLadoAtual] = useState<LadoConvidado>('noivo');
  const [notificacao, setNotificacao] = useState<{ tipo: 'erro' | 'sucesso'; mensagem: string } | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    confirmacao: 'talvez' as ConfirmacaoConvidado,
    acompanhantes: 0,
    restricoesAlimentares: [] as RestricaoAlimentar[],
    observacoes: '',
  });

  const handleAbrirModal = (convidado?: Convidado) => {
    if (convidado) {
      setEditando(convidado);
      setLadoAtual(convidado.lado);
      setFormData({
        nome: convidado.nome,
        email: convidado.email || '',
        telefone: convidado.telefone || '',
        confirmacao: convidado.confirmacao,
        acompanhantes: convidado.acompanhantes,
        restricoesAlimentares: convidado.restricoesAlimentares,
        observacoes: convidado.observacoes || '',
      });
    } else {
      setEditando(null);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        confirmacao: 'talvez',
        acompanhantes: 0,
        restricoesAlimentares: [],
        observacoes: '',
      });
    }
    setModalAberto(true);
    setNotificacao(null);
  };

  const handleSalvar = () => {
    if (!formData.nome.trim()) {
      setNotificacao({ tipo: 'erro', mensagem: 'Nome do convidado é obrigatório' });
      return;
    }

    if (editando) {
      atualizarConvidado(editando.id, formData);
      setNotificacao({ tipo: 'sucesso', mensagem: 'Convidado atualizado com sucesso!' });
      setTimeout(() => setModalAberto(false), 500);
    } else {
      const convidadoComLado = { ...formData, lado: ladoAtual };
      const resultado = adicionarConvidado(convidadoComLado, ladoAtual);
      
      if (!resultado.sucesso) {
        setNotificacao({ tipo: 'erro', mensagem: resultado.mensagem || 'Erro ao adicionar convidado' });
        return;
      }

      setNotificacao({ tipo: 'sucesso', mensagem: 'Convidado adicionado com sucesso!' });
      setTimeout(() => setModalAberto(false), 500);
    }
  };

  const convidadosPorLado = getConvidadosPorLado(ladoAtual);
  
  const convidadosFiltrados = convidadosPorLado.filter((c) => {
    if (filtro === 'todos') return true;
    return c.confirmacao === filtro;
  });

  const totalAcompanhantes = convidadosPorLado.reduce((sum, c) => sum + c.acompanhantes, 0);
  const totalPessoas = convidadosPorLado.length + totalAcompanhantes;

  const confirmacaoBadge = (confirmacao: ConfirmacaoConvidado) => {
    const badges = {
      sim: 'bg-green-100 text-green-800',
      nao: 'bg-red-100 text-red-800',
      talvez: 'bg-yellow-100 text-yellow-800',
    };
    return badges[confirmacao];
  };

  const percentualPreenchimento = Math.round((convidadosPorLado.length / LIMITE_CONVIDADOS_POR_LADO) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-2">Lista de Convidados</h1>
        <p className="text-gray-600">Gerencie confirmações e restrições alimentares</p>
      </div>

      {/* Seletor de Lado */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setLadoAtual('noivo')}
          className={`flex-1 max-w-xs flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
            ladoAtual === 'noivo'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <span>💍</span>
          <span>Noivo ({dados.convidadosNoivo})</span>
        </button>
        <button
          onClick={() => setLadoAtual('noiva')}
          className={`flex-1 max-w-xs flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
            ladoAtual === 'noiva'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <span>💐</span>
          <span>Noiva ({dados.convidadosNoiva})</span>
        </button>
      </div>

      {/* Barra de Progresso */}
      <Card>
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2">
            <p className="font-medium text-gray-700 text-sm sm:text-base">Limite de Convidados</p>
            <p className="text-xs sm:text-sm font-bold text-rose-600 flex-shrink-0">
              {convidadosPorLado.length} / {LIMITE_CONVIDADOS_POR_LADO}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                percentualPreenchimento >= 100
                  ? 'bg-red-500'
                  : percentualPreenchimento >= 80
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentualPreenchimento, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-600">{percentualPreenchimento}% preenchido</p>
        </div>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total</p>
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800">{convidadosPorLado.length}</p>
        </Card>

        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Confirmados</p>
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-green-600">
            {convidadosPorLado.filter((c) => c.confirmacao === 'sim').length}
          </p>
        </Card>

        <Card>
          <p className="text-gray-600 text-sm mb-2">Talvez</p>
          <p className="font-playfair text-3xl font-bold text-yellow-600">
            {convidadosPorLado.filter((c) => c.confirmacao === 'talvez').length}
          </p>
        </Card>

        <Card>
          <p className="text-gray-600 text-sm mb-2">Recusados</p>
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-red-600">
            {convidadosPorLado.filter((c) => c.confirmacao === 'nao').length}
          </p>
        </Card>

        <Card className="lg:col-span-4">
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total de Pessoas</p>
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-rose-600">{totalPessoas}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">({convidadosPorLado.length} convidados + {totalAcompanhantes} acompanhantes)</p>
        </Card>
      </div>

      {/* Filters and Add */}
      <Card>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto flex-1">
            {(['todos', 'sim', 'nao', 'talvez'] as const).map((opcao) => (
              <button
                key={opcao}
                onClick={() => setFiltro(opcao === 'todos' ? 'todos' : opcao)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                  filtro === opcao
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opcao === 'todos'
                  ? 'Todos'
                  : opcao === 'sim'
                    ? '✅ Confirmados'
                    : opcao === 'nao'
                      ? '❌ Recusados'
                      : '❓ Talvez'}
              </button>
            ))}
          </div>
          <Button
            onClick={() => handleAbrirModal()}
            disabled={convidadosPorLado.length >= LIMITE_CONVIDADOS_POR_LADO}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar</span>
          </Button>
        </div>
      </Card>

      {/* Guests List */}
      <div className="space-y-2 sm:space-y-3 px-4 sm:px-0">
        {convidadosFiltrados.length === 0 ? (
          <Card className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-sm sm:text-base">Nenhum convidado nesta categoria</p>
          </Card>
        ) : (
          convidadosFiltrados.map((convidado) => (
            <Card key={convidado.id}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="font-medium text-sm sm:text-lg text-gray-800 break-words">{convidado.nome}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${confirmacaoBadge(convidado.confirmacao)}`}>
                      {convidado.confirmacao === 'sim'
                        ? '✅ Confirmado'
                        : convidado.confirmacao === 'nao'
                          ? '❌ Recusado'
                          : '❓ Talvez'}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    {convidado.email && <p className="break-all">📧 {convidado.email}</p>}
                    {convidado.telefone && <p>📱 {convidado.telefone}</p>}
                    {convidado.acompanhantes > 0 && <p>👥 +{convidado.acompanhantes} acompanhante(s)</p>}
                    {convidado.restricoesAlimentares.length > 0 && (
                      <p>🍽️ Restrições: {convidado.restricoesAlimentares.join(', ')}</p>
                    )}
                    {convidado.observacoes && <p className="break-words">📝 {convidado.observacoes}</p>}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => handleAbrirModal(convidado)}
                    className="flex-1 sm:flex-none p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit2 size={18} className="text-blue-600 mx-auto sm:mx-0" />
                  </button>
                  <button
                    onClick={() => deletarConvidado(convidado.id)}
                    className="flex-1 sm:flex-none p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Deletar"
                  >
                    <Trash2 size={18} className="text-red-600 mx-auto sm:mx-0" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalAberto}
        title={editando ? 'Editar Convidado' : 'Novo Convidado'}
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
          {notificacao && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                notificacao.tipo === 'erro'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {notificacao.tipo === 'erro' ? '❌' : '✅'} {notificacao.mensagem}
            </div>
          )}

          {!editando && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lado do Casal</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setLadoAtual('noivo')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    ladoAtual === 'noivo'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  💍 Noivo
                </button>
                <button
                  onClick={() => setLadoAtual('noiva')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    ladoAtual === 'noiva'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  💐 Noiva
                </button>
              </div>
            </div>
          )}

          <Input
            label="Nome do Convidado"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Ana Silva"
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ana@email.com"
          />
          <Input
            label="Telefone"
            type="tel"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            placeholder="(11) 99999-9999"
          />
          <Select
            label="Confirmação"
            options={[
              { value: 'sim', label: '✅ Confirmado' },
              { value: 'nao', label: '❌ Recusado' },
              { value: 'talvez', label: '❓ Talvez' },
            ]}
            value={formData.confirmacao}
            onChange={(e) => setFormData({ ...formData, confirmacao: e.target.value as ConfirmacaoConvidado })}
          />
          <Input
            label="Acompanhantes"
            type="number"
            min="0"
            value={formData.acompanhantes}
            onChange={(e) => setFormData({ ...formData, acompanhantes: parseInt(e.target.value) || 0 })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Restrições Alimentares</label>
            <div className="space-y-2">
              {RESTRICOES.map((restricao) => (
                <label key={restricao.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.restricoesAlimentares.includes(restricao.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          restricoesAlimentares: [...formData.restricoesAlimentares, restricao.value],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          restricoesAlimentares: formData.restricoesAlimentares.filter((r) => r !== restricao.value),
                        });
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{restricao.label}</span>
                </label>
              ))}
            </div>
          </div>
          <Input
            label="Observações"
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            placeholder="Notas adicionais..."
          />
        </div>
      </Modal>
    </div>
  );
};
