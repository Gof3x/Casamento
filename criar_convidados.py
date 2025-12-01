#!/usr/bin/env python3
import os

content = '''import React, { useState } from 'react';
import { useConvidadosStore } from '../store/convidados';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { ConfirmacaoConvidado, GrauParentesco, LadoConvidado, Convidado, Padrinho } from '../types';

const GRAUS_PARENTESCO: { value: GrauParentesco; label: string }[] = [
  { value: 'pais', label: 'Pais' },
  { value: 'avos', label: 'Avós' },
  { value: 'irmaos', label: 'Irmãos' },
  { value: 'tios', label: 'Tios' },
  { value: 'primos', label: 'Primos' },
  { value: 'sogra', label: 'Sogra' },
  { value: 'cunhado', label: 'Cunhado' },
  { value: 'outro', label: 'Outro' },
];

const CONFIRMACOES: { value: ConfirmacaoConvidado; label: string }[] = [
  { value: 'sim', label: '✅ Confirmado' },
  { value: 'talvez', label: '❓ Talvez' },
  { value: 'nao', label: '❌ Recusado' },
];

export const ConvidadosPage: React.FC = () => {
  const store = useConvidadosStore();
  const [aba, setAba] = useState<'convidados' | 'padrinhos'>('convidados');
  const [modalAberta, setModalAberta] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<ConfirmacaoConvidado | 'todos'>('todos');

  const [formConvidado, setFormConvidado] = useState<Omit<Convidado, 'id'>>({
    nome: '',
    telefone: '',
    confirmacao: 'talvez',
    ehFamilia: false,
    grauParentesco: undefined,
    lado: 'noiva',
  });

  const [formPadrinho, setFormPadrinho] = useState<Omit<Padrinho, 'id'>>({
    nome: '',
    telefone: '',
    confirmacao: 'talvez',
    ehCasal: false,
    nomeParceiro: undefined,
    telefoneParceiro: undefined,
    lado: 'noiva',
  });

  const convidadosFiltrados = store.dados.convidados.filter(
    c => c.lado === formConvidado.lado && (filtro === 'todos' || c.confirmacao === filtro)
  );

  const padrinhoPorLado = store.getPadrinhoPorLado(formPadrinho.lado);

  const confirmacaoBadge = (confirmacao: ConfirmacaoConvidado): string => {
    const cores: Record<ConfirmacaoConvidado, string> = {
      sim: 'bg-green-100 text-green-800',
      talvez: 'bg-yellow-100 text-yellow-800',
      nao: 'bg-red-100 text-red-800',
    };
    return cores[confirmacao];
  };

  const handleAbrirModal = () => {
    setEditandoId(null);
    if (aba === 'convidados') {
      setFormConvidado({
        nome: '',
        telefone: '',
        confirmacao: 'talvez',
        ehFamilia: false,
        grauParentesco: undefined,
        lado: 'noiva',
      });
    } else {
      setFormPadrinho({
        nome: '',
        telefone: '',
        confirmacao: 'talvez',
        ehCasal: false,
        nomeParceiro: undefined,
        telefoneParceiro: undefined,
        lado: 'noiva',
      });
    }
    setModalAberta(true);
  };

  const handleSalvarConvidado = () => {
    if (!formConvidado.nome) {
      alert('Nome é obrigatório');
      return;
    }

    if (editandoId) {
      store.atualizarConvidado(editandoId, formConvidado);
    } else {
      store.adicionarConvidado(formConvidado, formConvidado.lado);
    }

    setModalAberta(false);
    setEditandoId(null);
  };

  const handleSalvarPadrinho = () => {
    if (!formPadrinho.nome) {
      alert('Nome é obrigatório');
      return;
    }

    if (formPadrinho.ehCasal && (!formPadrinho.nomeParceiro || !formPadrinho.telefoneParceiro)) {
      alert('Preencha os dados do parceiro');
      return;
    }

    if (editandoId) {
      store.atualizarPadrinho(editandoId, formPadrinho);
    } else {
      store.adicionarPadrinho(formPadrinho);
    }

    setModalAberta(false);
    setEditandoId(null);
  };

  const handleEditarConvidado = (convidado: Convidado) => {
    setFormConvidado(convidado);
    setEditandoId(convidado.id);
    setModalAberta(true);
  };

  const handleEditarPadrinho = (padrinho: Padrinho) => {
    setFormPadrinho(padrinho);
    setEditandoId(padrinho.id);
    setModalAberta(true);
  };

  const handleDeletarConvidado = (id: string) => {
    if (confirm('Deseja realmente deletar este convidado?')) {
      store.deletarConvidado(id);
    }
  };

  const handleDeletarPadrinho = (id: string) => {
    if (confirm('Deseja realmente deletar este padrinho?')) {
      store.deletarPadrinho(id);
    }
  };

  const totalNoiva = store.dados.convidados.filter(c => c.lado === 'noiva').length +
    store.dados.padrinhos
      .filter(p => p.lado === 'noiva')
      .reduce((acc, p) => acc + (p.ehCasal ? 2 : 1), 0);

  const totalNoivo = store.dados.convidados.filter(c => c.lado === 'noivo').length +
    store.dados.padrinhos
      .filter(p => p.lado === 'noivo')
      .reduce((acc, p) => acc + (p.ehCasal ? 2 : 1), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Lado da Noiva</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600">{totalNoiva}</span>
            <span className="text-gray-600">/100</span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-rose-600 h-full transition-all"
              style={{ width: `${Math.min((totalNoiva / 100) * 100, 100)}%` }}
            />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Lado do Noivo</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-600">{totalNoivo}</span>
            <span className="text-gray-600">/100</span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all"
              style={{ width: `${Math.min((totalNoivo / 100) * 100, 100)}%` }}
            />
          </div>
        </Card>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setAba('convidados')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            aba === 'convidados'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Convidados
        </button>
        <button
          onClick={() => setAba('padrinhos')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            aba === 'padrinhos'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Padrinhos
        </button>
      </div>

      {aba === 'convidados' && (
        <div className="space-y-4">
          <Button onClick={handleAbrirModal} className="w-full">
            <Plus size={18} />
            <span>Adicionar Convidado</span>
          </Button>

          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'todos', label: 'Todos' },
              { value: 'sim', label: '✅ Confirmados' },
              { value: 'talvez', label: '❓ Talvez' },
              { value: 'nao', label: '❌ Recusados' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setFiltro(opt.value as any)}
                className={`px-3 py-1 rounded text-sm ${
                  filtro === opt.value
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {convidadosFiltrados.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-gray-500">Nenhum convidado nesta categoria</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {convidadosFiltrados.map(convidado => (
                <Card key={convidado.id}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{convidado.nome}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">📞 {convidado.telefone}</p>
                      {convidado.ehFamilia && convidado.grauParentesco && (
                        <p className="text-xs sm:text-sm text-rose-600">
                          👨‍👩‍👧‍👦 {GRAUS_PARENTESCO.find(g => g.value === convidado.grauParentesco)?.label}
                        </p>
                      )}
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${confirmacaoBadge(convidado.confirmacao)}`}>
                        {CONFIRMACOES.find(c => c.value === convidado.confirmacao)?.label}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditarConvidado(convidado)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeletarConvidado(convidado.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {aba === 'padrinhos' && (
        <div className="space-y-4">
          <Button onClick={handleAbrirModal} className="w-full">
            <Plus size={18} />
            <span>Adicionar Padrinho</span>
          </Button>

          {padrinhoPorLado.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-gray-500">Nenhum padrinho adicionado</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {padrinhoPorLado.map(padrinho => (
                <Card key={padrinho.id}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800">
                        {padrinho.nome}
                        {padrinho.ehCasal && padrinho.nomeParceiro && (
                          <> e {padrinho.nomeParceiro}</>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefone}</p>
                      {padrinho.ehCasal && padrinho.telefoneParceiro && (
                        <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefoneParceiro}</p>
                      )}
                      <p className="text-xs text-rose-600 mt-1">
                        💑 {padrinho.ehCasal ? 'Casal' : 'Individual'}
                      </p>
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${confirmacaoBadge(padrinho.confirmacao)}`}>
                        {CONFIRMACOES.find(c => c.value === padrinho.confirmacao)?.label}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditarPadrinho(padrinho)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeletarPadrinho(padrinho.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {aba === 'convidados' && (
        <Modal
          title={editandoId ? 'Editar Convidado' : 'Adicionar Convidado'}
          isOpen={modalAberta}
          onClose={() => setModalAberta(false)}
          actions={
            <button onClick={handleSalvarConvidado} className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700">
              Salvar
            </button>
          }
        >
          <div className="space-y-4">
            <Input
              label="Nome *"
              value={formConvidado.nome}
              onChange={e => setFormConvidado({ ...formConvidado, nome: e.target.value })}
              placeholder="Digite o nome"
            />

            <Input
              label="Telefone"
              value={formConvidado.telefone}
              onChange={e => setFormConvidado({ ...formConvidado, telefone: e.target.value })}
              placeholder="(11) 99999-9999"
            />

            <Select
              label="Confirmação *"
              value={formConvidado.confirmacao}
              onChange={e => setFormConvidado({ ...formConvidado, confirmacao: e.target.value as ConfirmacaoConvidado })}
              options={CONFIRMACOES}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ehFamilia"
                checked={formConvidado.ehFamilia}
                onChange={e => setFormConvidado({ ...formConvidado, ehFamilia: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="ehFamilia" className="text-sm text-gray-700">
                É da família?
              </label>
            </div>

            {formConvidado.ehFamilia && (
              <Select
                label="Grau de Parentesco *"
                value={formConvidado.grauParentesco || ''}
                onChange={e => setFormConvidado({ ...formConvidado, grauParentesco: e.target.value as GrauParentesco })}
                options={GRAUS_PARENTESCO}
              />
            )}

            <Select
              label="Lado *"
              value={formConvidado.lado}
              onChange={e => setFormConvidado({ ...formConvidado, lado: e.target.value as LadoConvidado })}
              options={[
                { value: 'noiva', label: '💕 Lado da Noiva' },
                { value: 'noivo', label: '💙 Lado do Noivo' },
              ]}
            />
          </div>
        </Modal>
      )}

      {aba === 'padrinhos' && (
        <Modal
          title={editandoId ? 'Editar Padrinho' : 'Adicionar Padrinho'}
          isOpen={modalAberta}
          onClose={() => setModalAberta(false)}
          actions={
            <button onClick={handleSalvarPadrinho} className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700">
              Salvar
            </button>
          }
        >
          <div className="space-y-4">
            <Input
              label="Nome *"
              value={formPadrinho.nome}
              onChange={e => setFormPadrinho({ ...formPadrinho, nome: e.target.value })}
              placeholder="Digite o nome"
            />

            <Input
              label="Telefone"
              value={formPadrinho.telefone}
              onChange={e => setFormPadrinho({ ...formPadrinho, telefone: e.target.value })}
              placeholder="(11) 99999-9999"
            />

            <Select
              label="Confirmação *"
              value={formPadrinho.confirmacao}
              onChange={e => setFormPadrinho({ ...formPadrinho, confirmacao: e.target.value as ConfirmacaoConvidado })}
              options={CONFIRMACOES}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ehCasal"
                checked={formPadrinho.ehCasal}
                onChange={e => setFormPadrinho({ ...formPadrinho, ehCasal: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="ehCasal" className="text-sm text-gray-700">
                É um casal?
              </label>
            </div>

            {formPadrinho.ehCasal && (
              <>
                <Input
                  label="Nome do Parceiro *"
                  value={formPadrinho.nomeParceiro || ''}
                  onChange={e => setFormPadrinho({ ...formPadrinho, nomeParceiro: e.target.value })}
                  placeholder="Digite o nome"
                />

                <Input
                  label="Telefone do Parceiro"
                  value={formPadrinho.telefoneParceiro || ''}
                  onChange={e => setFormPadrinho({ ...formPadrinho, telefoneParceiro: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </>
            )}

            <Select
              label="Lado *"
              value={formPadrinho.lado}
              onChange={e => setFormPadrinho({ ...formPadrinho, lado: e.target.value as LadoConvidado })}
              options={[
                { value: 'noiva', label: '💕 Lado da Noiva' },
                { value: 'noivo', label: '💙 Lado do Noivo' },
              ]}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
'''

# Caminho do arquivo
filepath = 'src/pages/ConvidadosPage.tsx'

# Criar o arquivo
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Arquivo {filepath} criado com sucesso!")
print(f"📊 Tamanho: {len(content)} caracteres")
print(f"📄 Linhas: {len(content.splitlines())} linhas")
