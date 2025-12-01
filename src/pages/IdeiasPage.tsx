import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check } from 'lucide-react';
import { Card, Button, Input, Select, ColorPicker, ProgressBar } from '@/components';
import { useIdeiasStore } from '@/store/ideias';
import { CasamentoEstilo } from '@/types';

const ESTILOS: { value: CasamentoEstilo; label: string }[] = [
  { value: 'classico', label: '✨ Clássico' },
  { value: 'boho', label: '🌸 Boho' },
  { value: 'minimalista', label: '⚫ Minimalista' },
  { value: 'rustico', label: '🌾 Rústico' },
  { value: 'moderno', label: '🏗️ Moderno' },
  { value: 'vintage', label: '📼 Vintage' },
];

export const IdeiasPage: React.FC = () => {
  const { dados, setPaletaCores, setEstilo, adicionarChecklistItem, atualizarChecklistItem, deletarChecklistItem, getChecklistProgress } =
    useIdeiasStore();

  const [abaPaleta, setAbaPaleta] = useState(true);
  const [paleta, setPaleta] = useState(dados.paletaCores);
  const [novoCheckItem, setNovoCheckItem] = useState('');
  const [editandoCheck, setEditandoCheck] = useState<string | null>(null);
  const [editandoCheckTexto, setEditandoCheckTexto] = useState('');

  const handleSalvarPaleta = () => {
    setPaletaCores(paleta);
  };

  const handleAdicionarCheck = () => {
    if (novoCheckItem.trim()) {
      adicionarChecklistItem({ titulo: novoCheckItem, concluido: false });
      setNovoCheckItem('');
    }
  };

  const handleEditarCheck = (id: string, titulo: string) => {
    setEditandoCheck(id);
    setEditandoCheckTexto(titulo);
  };

  const handleSalvarCheck = (id: string) => {
    if (editandoCheckTexto.trim()) {
      atualizarChecklistItem(id, { titulo: editandoCheckTexto });
    }
    setEditandoCheck(null);
  };

  const checklistProgress = getChecklistProgress();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-2">Nosso Grande Dia</h1>
        <p className="text-gray-600">Organize ideias, inspirações e detalhes do casamento</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => setAbaPaleta(true)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
            abaPaleta ? 'bg-rose-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🎨 Paleta & Estilo
        </button>
        <button
          onClick={() => setAbaPaleta(false)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
            !abaPaleta ? 'bg-rose-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ✅ Checklist
        </button>
      </div>

      {/* Paleta e Estilo */}
      {abaPaleta && (
        <div className="space-y-6">
          {/* Estilo */}
          <Card>
            <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Estilo do Casamento</h2>
            <Select
              label="Escolha o estilo"
              options={ESTILOS}
              value={dados.estilo}
              onChange={(e) => setEstilo(e.target.value as CasamentoEstilo)}
            />
          </Card>

          {/* Paleta de Cores */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800">Paleta de Cores</h2>
              <Button onClick={handleSalvarPaleta} size="sm" className="w-full sm:w-auto">
                Salvar Paleta
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {paleta.map((cor, idx) => (
                <ColorPicker
                  key={idx}
                  value={cor}
                  onChange={(novaCor) => {
                    const novapaleta = [...paleta];
                    novapaleta[idx] = novaCor;
                    setPaleta(novapaleta);
                  }}
                  label={`Cor ${idx + 1}`}
                />
              ))}
            </div>

            {/* Preview da Paleta */}
            <div className="mt-6 p-3 sm:p-4 rounded-lg border-2 border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Preview da Paleta</p>
              <div className="flex gap-2 h-12 sm:h-16">
                {paleta.map((cor, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-lg border border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: cor }}
                    title={cor}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Checklist */}
      {!abaPaleta && (
        <Card>
          <div className="mb-6">
            <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Checklist do Casamento</h2>
            <ProgressBar value={checklistProgress} max={100} label="Progresso" showPercentage={true} />
          </div>

          {/* Add Item */}
          <div className="flex gap-2 mb-6">
            <Input
              value={novoCheckItem}
              onChange={(e) => setNovoCheckItem(e.target.value)}
              placeholder="Adicionar novo item..."
              onKeyPress={(e) => e.key === 'Enter' && handleAdicionarCheck()}
            />
            <Button onClick={handleAdicionarCheck}>
              <Plus size={18} />
            </Button>
          </div>

          {/* Items */}
          <div className="space-y-2">
            {dados.checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <button
                  onClick={() => atualizarChecklistItem(item.id, { concluido: !item.concluido })}
                  className="flex-shrink-0 text-gray-400 hover:text-rose-600"
                >
                  {item.concluido ? (
                    <Check size={20} className="text-green-600" fill="currentColor" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                  )}
                </button>

                {editandoCheck === item.id ? (
                  <div className="flex-1 flex gap-2">
                    <Input
                      value={editandoCheckTexto}
                      onChange={(e) => setEditandoCheckTexto(e.target.value)}
                      autoFocus
                    />
                    <button
                      onClick={() => handleSalvarCheck(item.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Check size={18} className="text-green-600" />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className={`flex-1 ${item.concluido ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {item.titulo}
                    </p>
                    <button
                      onClick={() => handleEditarCheck(item.id, item.titulo)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Edit2 size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => deletarChecklistItem(item.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
