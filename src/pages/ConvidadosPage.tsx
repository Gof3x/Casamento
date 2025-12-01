import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';

import { useConvidadosStore } from '../store/convidados';

import { Card } from '../components/Card';import { useConvidadosStore } from '../store/convidados';

import { Input } from '../components/Input';

import { Select } from '../components/Select';import { Card } from '../components/Card';import { Plus, Trash2, Edit2 } from 'lucide-react';import { Plus, Trash2, Edit2 } from 'lucide-react';

import { Button } from '../components/Button';

import { Modal } from '../components/Modal';import { Input } from '../components/Input';

import { Plus, Edit2, Trash2 } from 'lucide-react';

import { ConfirmacaoConvidado, GrauParentesco, LadoConvidado, Convidado, Padrinho } from '../types';import { Select } from '../components/Select';import { Card, Button, Input, Select, Modal } from '@/components';import { Card, Button, Input, Select, Modal } from '@/components';



const GRAUS_PARENTESCO: { value: GrauParentesco; label: string }[] = [import { Button } from '../components/Button';

  { value: 'pais', label: 'Pais' },

  { value: 'avos', label: 'Avós' },import { Modal } from '../components/Modal';import { useConvidadosStore } from '@/store/convidados';import { useConvidadosStore } from '@/store/convidados';

  { value: 'irmaos', label: 'Irmãos' },

  { value: 'tios', label: 'Tios' },import { Plus, Edit2, Trash2 } from 'lucide-react';

  { value: 'primos', label: 'Primos' },

  { value: 'sogra', label: 'Sogra' },import { ConfirmacaoConvidado, GrauParentesco, LadoConvidado, Convidado, Padrinho } from '../types';import { Convidado, Padrinho, ConfirmacaoConvidado, LadoConvidado, GrauParentesco } from '@/types';import { Convidado, Padrinho, ConfirmacaoConvidado, LadoConvidado, GrauParentesco } from '@/types';

  { value: 'cunhado', label: 'Cunhado' },

  { value: 'outro', label: 'Outro' },

];

const GRAUS_PARENTESCO: { value: GrauParentesco; label: string }[] = [

const CONFIRMACOES: { value: ConfirmacaoConvidado; label: string }[] = [

  { value: 'sim', label: '✅ Confirmado' },  { value: 'pais', label: 'Pais' },

  { value: 'talvez', label: '❓ Talvez' },

  { value: 'nao', label: '❌ Recusado' },  { value: 'avos', label: 'Avós' },const GRAUS_PARENTESCO: { value: GrauParentesco; label: string }[] = [const GRAUS_PARENTESCO: { value: GrauParentesco; label: string }[] = [

];

  { value: 'irmaos', label: 'Irmãos' },

export const ConvidadosPage: React.FC = () => {

  const store = useConvidadosStore();  { value: 'tios', label: 'Tios' },  { value: 'pais', label: 'Pais' },  { value: 'pais', label: 'Pais' },

  const [aba, setAba] = useState<'convidados' | 'padrinhos'>('convidados');

  const [modalAberta, setModalAberta] = useState(false);  { value: 'primos', label: 'Primos' },

  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [filtro, setFiltro] = useState<ConfirmacaoConvidado | 'todos'>('todos');  { value: 'sogra', label: 'Sogra' },  { value: 'avos', label: 'Avós' },  { value: 'avos', label: 'Avós' },



  const [formConvidado, setFormConvidado] = useState<Omit<Convidado, 'id'>>({  { value: 'cunhado', label: 'Cunhado' },

    nome: '',

    telefone: '',  { value: 'outro', label: 'Outro' },  { value: 'irmaos', label: 'Irmãos' },  { value: 'irmaos', label: 'Irmãos' },

    confirmacao: 'talvez',

    ehFamilia: false,];

    grauParentesco: undefined,

    lado: 'noiva',  { value: 'tios', label: 'Tios' },  { value: 'tios', label: 'Tios' },

  });

const CONFIRMACOES: { value: ConfirmacaoConvidado; label: string }[] = [

  const [formPadrinho, setFormPadrinho] = useState<Omit<Padrinho, 'id'>>({

    nome: '',  { value: 'sim', label: '✅ Confirmado' },  { value: 'primos', label: 'Primos' },  { value: 'primos', label: 'Primos' },

    telefone: '',

    confirmacao: 'talvez',  { value: 'talvez', label: '❓ Talvez' },

    ehCasal: false,

    nomeParceiro: undefined,  { value: 'nao', label: '❌ Recusado' },  { value: 'sogra', label: 'Sogra/Sogro' },  { value: 'sogra', label: 'Sogra/Sogro' },

    telefoneParceiro: undefined,

    lado: 'noiva',];

  });

  { value: 'cunhado', label: 'Cunhado/Cunhada' },  { value: 'cunhado', label: 'Cunhado/Cunhada' },

  const convidadosFiltrados = formConvidado.lado === 'noiva' 

    ? store.dados.convidados.filter(c => c.lado === 'noiva' && (filtro === 'todos' || c.confirmacao === filtro))export const ConvidadosPage: React.FC = () => {

    : store.dados.convidados.filter(c => c.lado === 'noivo' && (filtro === 'todos' || c.confirmacao === filtro));

  const store = useConvidadosStore();  { value: 'outro', label: 'Outro' },  { value: 'outro', label: 'Outro' },

  const padrinhoPorLado = formPadrinho.lado === 'noiva'

    ? store.getPadrinhoPorLado('noiva')  const [aba, setAba] = useState<'convidados' | 'padrinhos'>('convidados');

    : store.getPadrinhoPorLado('noivo');

  const [modalAberta, setModalAberta] = useState(false);];];

  const confirmacaoBadge = (confirmacao: ConfirmacaoConvidado) => {

    switch (confirmacao) {  const [editandoId, setEditandoId] = useState<string | null>(null);

      case 'sim':

        return 'bg-green-100 text-green-800';  const [filtro, setFiltro] = useState<ConfirmacaoConvidado | 'todos'>('todos');

      case 'talvez':

        return 'bg-yellow-100 text-yellow-800';

      case 'nao':

        return 'bg-red-100 text-red-800';  // Form Convidadosconst LIMITE_CONVIDADOS_POR_LADO = 100;const LIMITE_CONVIDADOS_POR_LADO = 100;

    }

  };  const [formConvidado, setFormConvidado] = useState<Omit<Convidado, 'id'>>({



  const handleAbrirModal = () => {    nome: '',

    setEditandoId(null);

    if (aba === 'convidados') {    telefone: '',

      setFormConvidado({

        nome: '',    confirmacao: 'talvez',export const ConvidadosPage: React.FC = () => {export const ConvidadosPage: React.FC = () => {

        telefone: '',

        confirmacao: 'talvez',    ehFamilia: false,

        ehFamilia: false,

        grauParentesco: undefined,    grauParentesco: undefined,  const {  const {

        lado: 'noiva',

      });    lado: 'noiva',

    } else {

      setFormPadrinho({  });    adicionarConvidado,    dados,

        nome: '',

        telefone: '',

        confirmacao: 'talvez',

        ehCasal: false,  // Form Padrinhos    atualizarConvidado,    adicionarConvidado,

        nomeParceiro: undefined,

        telefoneParceiro: undefined,  const [formPadrinho, setFormPadrinho] = useState<Omit<Padrinho, 'id'>>({

        lado: 'noiva',

      });    nome: '',    deletarConvidado,    atualizarConvidado,

    }

    setModalAberta(true);    telefone: '',

  };

    confirmacao: 'talvez',    getConvidadosPorLado,    deletarConvidado,

  const handleSalvarConvidado = () => {

    if (!formConvidado.nome || !formConvidado.telefone) {    ehCasal: false,

      alert('Preencha todos os campos obrigatórios');

      return;    nomeParceiro: undefined,    adicionarPadrinho,    getConvidadosPorLado,

    }

    telefoneParceiro: undefined,

    if (editandoId) {

      store.atualizarConvidado(editandoId, formConvidado);    lado: 'noiva',    atualizarPadrinho,    adicionarPadrinho,

    } else {

      store.adicionarConvidado(formConvidado, formConvidado.lado);  });

    }

    deletarPadrinho,    atualizarPadrinho,

    setModalAberta(false);

    setEditandoId(null);  const convidadosFiltrados = formConvidado.lado === 'noiva' 

  };

    ? store.dados.convidados.filter(c => c.lado === 'noiva' && (filtro === 'todos' || c.confirmacao === filtro))    getPadrinhoPorLado,    deletarPadrinho,

  const handleSalvarPadrinho = () => {

    if (!formPadrinho.nome || !formPadrinho.telefone) {    : store.dados.convidados.filter(c => c.lado === 'noivo' && (filtro === 'todos' || c.confirmacao === filtro));

      alert('Preencha todos os campos obrigatórios');

      return;  } = useConvidadosStore();    getPadrinhoPorLado,

    }

  const padrinhoPorLado = formPadrinho.lado === 'noiva'

    if (formPadrinho.ehCasal && (!formPadrinho.nomeParceiro || !formPadrinho.telefoneParceiro)) {

      alert('Preencha os dados do parceiro');    ? store.getPadrinhoPorLado('noiva')  } = useConvidadosStore();

      return;

    }    : store.getPadrinhoPorLado('noivo');



    if (editandoId) {  const [aba, setAba] = useState<'convidados' | 'padrinhos'>('convidados');

      store.atualizarPadrinho(editandoId, formPadrinho);

    } else {  const confirmacaoBadge = (confirmacao: ConfirmacaoConvidado) => {

      store.adicionarPadrinho(formPadrinho);

    }    switch (confirmacao) {  const [modalAberto, setModalAberto] = useState(false);  const [aba, setAba] = useState<'convidados' | 'padrinhos'>('convidados');



    setModalAberta(false);      case 'sim':

    setEditandoId(null);

  };        return 'bg-green-100 text-green-800';  const [editando, setEditando] = useState<Convidado | Padrinho | null>(null);  const [modalAberto, setModalAberto] = useState(false);



  const handleEditarConvidado = (convidado: Convidado) => {      case 'talvez':

    setFormConvidado(convidado);

    setEditandoId(convidado.id);        return 'bg-yellow-100 text-yellow-800';  const [filtro, setFiltro] = useState<ConfirmacaoConvidado | 'todos'>('todos');  const [editando, setEditando] = useState<Convidado | Padrinho | null>(null);

    setModalAberta(true);

  };      case 'nao':



  const handleEditarPadrinho = (padrinho: Padrinho) => {        return 'bg-red-100 text-red-800';  const [ladoAtual, setLadoAtual] = useState<LadoConvidado>('noivo');  const [filtro, setFiltro] = useState<ConfirmacaoConvidado | 'todos'>('todos');

    setFormPadrinho(padrinho);

    setEditandoId(padrinho.id);    }

    setModalAberta(true);

  };  };  const [notificacao, setNotificacao] = useState<{ tipo: 'erro' | 'sucesso'; mensagem: string } | null>(null);  const [ladoAtual, setLadoAtual] = useState<LadoConvidado>('noivo');



  const handleDeletarConvidado = (id: string) => {

    if (confirm('Deseja realmente deletar este convidado?')) {

      store.deletarConvidado(id);  const handleAbrirModal = () => {  const [notificacao, setNotificacao] = useState<{ tipo: 'erro' | 'sucesso'; mensagem: string } | null>(null);

    }

  };    setEditandoId(null);



  const handleDeletarPadrinho = (id: string) => {    if (aba === 'convidados') {  // Form de Convidado

    if (confirm('Deseja realmente deletar este padrinho?')) {

      store.deletarPadrinho(id);      setFormConvidado({

    }

  };        nome: '',  const [formConvidado, setFormConvidado] = useState({  // Form de Convidado



  const totalNoiva = store.dados.convidados.filter(c => c.lado === 'noiva').length +        telefone: '',

    store.dados.padrinhos

      .filter(p => p.lado === 'noiva')        confirmacao: 'talvez',    nome: '',  const [formConvidado, setFormConvidado] = useState({

      .reduce((acc, p) => acc + (p.ehCasal ? 2 : 1), 0);

        ehFamilia: false,

  const totalNoivo = store.dados.convidados.filter(c => c.lado === 'noivo').length +

    store.dados.padrinhos        grauParentesco: undefined,    telefone: '',    nome: '',

      .filter(p => p.lado === 'noivo')

      .reduce((acc, p) => acc + (p.ehCasal ? 2 : 1), 0);        lado: 'noiva',



  return (      });    confirmacao: 'talvez' as ConfirmacaoConvidado,    telefone: '',

    <div className="space-y-6">

      <div className="grid grid-cols-2 gap-4">    } else {

        <Card>

          <h3 className="font-semibold text-gray-800 mb-2">Lado da Noiva</h3>      setFormPadrinho({    ehFamilia: false,    confirmacao: 'talvez' as ConfirmacaoConvidado,

          <div className="flex items-baseline gap-2">

            <span className="text-2xl font-bold text-rose-600">{totalNoiva}</span>        nome: '',

            <span className="text-gray-600">/100</span>

          </div>        telefone: '',    grauParentesco: 'outro' as GrauParentesco,    ehFamilia: false,

          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">

            <div         confirmacao: 'talvez',

              className="bg-rose-600 h-full transition-all"

              style={{ width: `${Math.min((totalNoiva / 100) * 100, 100)}%` }}        ehCasal: false,  });    grauParentesco: 'outro' as GrauParentesco,

            />

          </div>        nomeParceiro: undefined,

        </Card>

        telefoneParceiro: undefined,  });

        <Card>

          <h3 className="font-semibold text-gray-800 mb-2">Lado do Noivo</h3>        lado: 'noiva',

          <div className="flex items-baseline gap-2">

            <span className="text-2xl font-bold text-blue-600">{totalNoivo}</span>      });  // Form de Padrinho

            <span className="text-gray-600">/100</span>

          </div>    }

          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">

            <div     setModalAberta(true);  const [formPadrinho, setFormPadrinho] = useState({  // Form de Padrinho

              className="bg-blue-600 h-full transition-all"

              style={{ width: `${Math.min((totalNoivo / 100) * 100, 100)}%` }}  };

            />

          </div>    nome: '',  const [formPadrinho, setFormPadrinho] = useState({

        </Card>

      </div>  const handleSalvarConvidado = () => {



      <div className="flex gap-2 border-b border-gray-200">    if (!formConvidado.nome || !formConvidado.telefone) {    telefone: '',    nome: '',

        <button

          onClick={() => setAba('convidados')}      alert('Preencha todos os campos obrigatórios');

          className={`px-4 py-2 font-medium border-b-2 transition-colors ${

            aba === 'convidados'      return;    confirmacao: 'talvez' as ConfirmacaoConvidado,    telefone: '',

              ? 'border-rose-600 text-rose-600'

              : 'border-transparent text-gray-600 hover:text-gray-800'    }

          }`}

        >    ehCasal: false,    confirmacao: 'talvez' as ConfirmacaoConvidado,

          Convidados

        </button>    if (editandoId) {

        <button

          onClick={() => setAba('padrinhos')}      store.atualizarConvidado(editandoId, formConvidado);    nomeParceiro: '',    ehCasal: false,

          className={`px-4 py-2 font-medium border-b-2 transition-colors ${

            aba === 'padrinhos'    } else {

              ? 'border-rose-600 text-rose-600'

              : 'border-transparent text-gray-600 hover:text-gray-800'      store.adicionarConvidado(formConvidado, formConvidado.lado);    telefoneParceiro: '',    nomeParceiro: '',

          }`}

        >    }

          Padrinhos

        </button>  });    telefoneParceiro: '',

      </div>

    setModalAberta(false);

      {aba === 'convidados' && (

        <div className="space-y-4">    setEditandoId(null);  });

          <Button onClick={handleAbrirModal} className="w-full">

            <Plus size={18} />  };

            <span>Adicionar Convidado</span>

          </Button>  const handleAbrirModal = (item?: Convidado | Padrinho) => {



          <div className="flex gap-2 flex-wrap">  const handleSalvarPadrinho = () => {

            {[

              { value: 'todos', label: 'Todos' },    if (!formPadrinho.nome || !formPadrinho.telefone) {    if (item) {  const handleAbrirModal = (item?: Convidado | Padrinho) => {

              { value: 'sim', label: '✅ Confirmados' },

              { value: 'talvez', label: '❓ Talvez' },      alert('Preencha todos os campos obrigatórios');

              { value: 'nao', label: '❌ Recusados' },

            ].map(opt => (      return;      setEditando(item);    if (item) {

              <button

                key={opt.value}    }

                onClick={() => setFiltro(opt.value as any)}

                className={`px-3 py-1 rounded text-sm ${      if ('ehFamilia' in item) {      setEditando(item);

                  filtro === opt.value

                    ? 'bg-rose-600 text-white'    if (formPadrinho.ehCasal && (!formPadrinho.nomeParceiro || !formPadrinho.telefoneParceiro)) {

                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'

                }`}      alert('Preencha os dados do parceiro');        setFormConvidado({      if ('ehFamilia' in item) {

              >

                {opt.label}      return;

              </button>

            ))}    }          nome: item.nome,        setFormConvidado({

          </div>



          {convidadosFiltrados.length === 0 ? (

            <Card className="text-center py-8">    if (editandoId) {          telefone: item.telefone,          nome: item.nome,

              <p className="text-gray-500">Nenhum convidado nesta categoria</p>

            </Card>      store.atualizarPadrinho(editandoId, formPadrinho);

          ) : (

            <div className="space-y-3">    } else {          confirmacao: item.confirmacao,          telefone: item.telefone,

              {convidadosFiltrados.map(convidado => (

                <Card key={convidado.id}>      store.adicionarPadrinho(formPadrinho);

                  <div className="flex justify-between items-start gap-3">

                    <div className="flex-1 min-w-0">    }          ehFamilia: item.ehFamilia,          confirmacao: item.confirmacao,

                      <h3 className="font-semibold text-gray-800 truncate">{convidado.nome}</h3>

                      <p className="text-xs sm:text-sm text-gray-600">📞 {convidado.telefone}</p>

                      {convidado.ehFamilia && convidado.grauParentesco && (

                        <p className="text-xs sm:text-sm text-rose-600">    setModalAberta(false);          grauParentesco: item.grauParentesco || 'outro',          ehFamilia: item.ehFamilia,

                          👨‍👩‍👧‍👦 {GRAUS_PARENTESCO.find(g => g.value === convidado.grauParentesco)?.label}

                        </p>    setEditandoId(null);

                      )}

                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${confirmacaoBadge(convidado.confirmacao)}`}>  };        });          grauParentesco: item.grauParentesco || 'outro',

                        {CONFIRMACOES.find(c => c.value === convidado.confirmacao)?.label}

                      </span>

                    </div>

                    <div className="flex gap-1">  const handleEditarConvidado = (convidado: Convidado) => {      } else {        });

                      <button

                        onClick={() => handleEditarConvidado(convidado)}    setFormConvidado(convidado);

                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"

                      >    setEditandoId(convidado.id);        setFormPadrinho({      } else {

                        <Edit2 size={16} />

                      </button>    setModalAberta(true);

                      <button

                        onClick={() => handleDeletarConvidado(convidado.id)}  };          nome: item.nome,        setFormPadrinho({

                        className="p-2 text-red-500 hover:bg-red-50 rounded"

                      >

                        <Trash2 size={16} />

                      </button>  const handleEditarPadrinho = (padrinho: Padrinho) => {          telefone: item.telefone,          nome: item.nome,

                    </div>

                  </div>    setFormPadrinho(padrinho);

                </Card>

              ))}    setEditandoId(padrinho.id);          confirmacao: item.confirmacao,          telefone: item.telefone,

            </div>

          )}    setModalAberta(true);

        </div>

      )}  };          ehCasal: item.ehCasal,          confirmacao: item.confirmacao,



      {aba === 'padrinhos' && (

        <div className="space-y-4">

          <Button onClick={handleAbrirModal} className="w-full">  const handleDeletarConvidado = (id: string) => {          nomeParceiro: item.nomeParceiro || '',          ehCasal: item.ehCasal,

            <Plus size={18} />

            <span>Adicionar Padrinho</span>    if (confirm('Deseja realmente deletar este convidado?')) {

          </Button>

      store.deletarConvidado(id);          telefoneParceiro: item.telefoneParceiro || '',          nomeParceiro: item.nomeParceiro || '',

          {padrinhoPorLado.length === 0 ? (

            <Card className="text-center py-8">    }

              <p className="text-gray-500">Nenhum padrinho adicionado</p>

            </Card>  };        });          telefoneParceiro: item.telefoneParceiro || '',

          ) : (

            <div className="space-y-3">

              {padrinhoPorLado.map(padrinho => (

                <Card key={padrinho.id}>  const handleDeletarPadrinho = (id: string) => {      }        });

                  <div className="flex justify-between items-start gap-3">

                    <div className="flex-1 min-w-0">    if (confirm('Deseja realmente deletar este padrinho?')) {

                      <h3 className="font-semibold text-gray-800">

                        {padrinho.nome}      store.deletarPadrinho(id);    } else {      }

                        {padrinho.ehCasal && padrinho.nomeParceiro && (

                          <> e {padrinho.nomeParceiro}</>    }

                        )}

                      </h3>  };      setEditando(null);    } else {

                      <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefone}</p>

                      {padrinho.ehCasal && padrinho.telefoneParceiro && (

                        <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefoneParceiro}</p>

                      )}  const totalNoiva = store.dados.convidados.filter(c => c.lado === 'noiva').length +      if (aba === 'convidados') {      setEditando(null);

                      <p className="text-xs text-rose-600 mt-1">

                        💑 {padrinho.ehCasal ? 'Casal' : 'Individual'}    store.dados.padrinhos

                      </p>

                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${confirmacaoBadge(padrinho.confirmacao)}`}>      .filter(p => p.lado === 'noiva')        setFormConvidado({      if (aba === 'convidados') {

                        {CONFIRMACOES.find(c => c.value === padrinho.confirmacao)?.label}

                      </span>      .reduce((acc, p) => acc + (p.ehCasal ? 2 : 1), 0);

                    </div>

                    <div className="flex gap-1">          nome: '',        setFormConvidado({

                      <button

                        onClick={() => handleEditarPadrinho(padrinho)}  const totalNoivo = store.dados.convidados.filter(c => c.lado === 'noivo').length +

                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"

                      >    store.dados.padrinhos          telefone: '',          nome: '',

                        <Edit2 size={16} />

                      </button>      .filter(p => p.lado === 'noivo')

                      <button

                        onClick={() => handleDeletarPadrinho(padrinho.id)}      .reduce((acc, p) => acc + (p.ehCasal ? 2 : 1), 0);          confirmacao: 'talvez',          telefone: '',

                        className="p-2 text-red-500 hover:bg-red-50 rounded"

                      >

                        <Trash2 size={16} />

                      </button>  return (          ehFamilia: false,          confirmacao: 'talvez',

                    </div>

                  </div>    <div className="space-y-6">

                </Card>

              ))}      {/* Progresso */}          grauParentesco: 'outro',          ehFamilia: false,

            </div>

          )}      <div className="grid grid-cols-2 gap-4">

        </div>

      )}        <Card>        });          grauParentesco: 'outro',



      {aba === 'convidados' && (          <h3 className="font-semibold text-gray-800 mb-2">Lado da Noiva</h3>

        <Modal

          titulo={editandoId ? 'Editar Convidado' : 'Adicionar Convidado'}          <div className="flex items-baseline gap-2">      } else {        });

          aberta={modalAberta}

          onFechar={() => setModalAberta(false)}            <span className="text-2xl font-bold text-rose-600">{totalNoiva}</span>

          onSalvar={handleSalvarConvidado}

        >            <span className="text-gray-600">/100</span>        setFormPadrinho({      } else {

          <div className="space-y-4">

            <Input          </div>

              label="Nome *"

              value={formConvidado.nome}          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">          nome: '',        setFormPadrinho({

              onChange={e => setFormConvidado({ ...formConvidado, nome: e.target.value })}

              placeholder="Digite o nome"            <div 

            />

              className="bg-rose-600 h-full transition-all"          telefone: '',          nome: '',

            <Input

              label="Telefone *"              style={{ width: `${Math.min((totalNoiva / 100) * 100, 100)}%` }}

              value={formConvidado.telefone}

              onChange={e => setFormConvidado({ ...formConvidado, telefone: e.target.value })}            />          confirmacao: 'talvez',          telefone: '',

              placeholder="(11) 99999-9999"

            />          </div>



            <Select        </Card>          ehCasal: false,          confirmacao: 'talvez',

              label="Confirmação *"

              value={formConvidado.confirmacao}

              onChange={e => setFormConvidado({ ...formConvidado, confirmacao: e.target.value as ConfirmacaoConvidado })}

              options={CONFIRMACOES}        <Card>          nomeParceiro: '',          ehCasal: false,

            />

          <h3 className="font-semibold text-gray-800 mb-2">Lado do Noivo</h3>

            <div className="flex items-center gap-2">

              <input          <div className="flex items-baseline gap-2">          telefoneParceiro: '',          nomeParceiro: '',

                type="checkbox"

                id="ehFamilia"            <span className="text-2xl font-bold text-blue-600">{totalNoivo}</span>

                checked={formConvidado.ehFamilia}

                onChange={e => setFormConvidado({ ...formConvidado, ehFamilia: e.target.checked })}            <span className="text-gray-600">/100</span>        });          telefoneParceiro: '',

                className="w-4 h-4 rounded border-gray-300"

              />          </div>

              <label htmlFor="ehFamilia" className="text-sm text-gray-700">

                É da família?          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">      }        });

              </label>

            </div>            <div 



            {formConvidado.ehFamilia && (              className="bg-blue-600 h-full transition-all"    }      }

              <Select

                label="Grau de Parentesco *"              style={{ width: `${Math.min((totalNoivo / 100) * 100, 100)}%` }}

                value={formConvidado.grauParentesco || ''}

                onChange={e => setFormConvidado({ ...formConvidado, grauParentesco: e.target.value as GrauParentesco })}            />    setModalAberto(true);    }

                options={GRAUS_PARENTESCO}

              />          </div>

            )}

        </Card>    setNotificacao(null);    setModalAberto(true);

            <Select

              label="Lado *"      </div>

              value={formConvidado.lado}

              onChange={e => setFormConvidado({ ...formConvidado, lado: e.target.value as LadoConvidado })}  };    setNotificacao(null);

              options={[

                { value: 'noiva', label: '💕 Lado da Noiva' },      {/* Abas */}

                { value: 'noivo', label: '💙 Lado do Noivo' },

              ]}      <div className="flex gap-2 border-b border-gray-200">  };

            />

          </div>        <button

        </Modal>

      )}          onClick={() => setAba('convidados')}  const handleSalvarConvidado = () => {



      {aba === 'padrinhos' && (          className={`px-4 py-2 font-medium border-b-2 transition-colors ${

        <Modal

          titulo={editandoId ? 'Editar Padrinho' : 'Adicionar Padrinho'}            aba === 'convidados'    if (!formConvidado.nome.trim() || !formConvidado.telefone.trim()) {  const handleSalvarConvidado = () => {

          aberta={modalAberta}

          onFechar={() => setModalAberta(false)}              ? 'border-rose-600 text-rose-600'

          onSalvar={handleSalvarPadrinho}

        >              : 'border-transparent text-gray-600 hover:text-gray-800'      setNotificacao({ tipo: 'erro', mensagem: 'Nome e telefone são obrigatórios' });    if (!formConvidado.nome.trim() || !formConvidado.telefone.trim()) {

          <div className="space-y-4">

            <Input          }`}

              label="Nome *"

              value={formPadrinho.nome}        >      return;      setNotificacao({ tipo: 'erro', mensagem: 'Nome e telefone são obrigatórios' });

              onChange={e => setFormPadrinho({ ...formPadrinho, nome: e.target.value })}

              placeholder="Digite o nome"          Convidados

            />

        </button>    }      return;

            <Input

              label="Telefone *"        <button

              value={formPadrinho.telefone}

              onChange={e => setFormPadrinho({ ...formPadrinho, telefone: e.target.value })}          onClick={() => setAba('padrinhos')}    }

              placeholder="(11) 99999-9999"

            />          className={`px-4 py-2 font-medium border-b-2 transition-colors ${



            <Select            aba === 'padrinhos'    if (formConvidado.ehFamilia && !formConvidado.grauParentesco) {

              label="Confirmação *"

              value={formPadrinho.confirmacao}              ? 'border-rose-600 text-rose-600'

              onChange={e => setFormPadrinho({ ...formPadrinho, confirmacao: e.target.value as ConfirmacaoConvidado })}

              options={CONFIRMACOES}              : 'border-transparent text-gray-600 hover:text-gray-800'      setNotificacao({ tipo: 'erro', mensagem: 'Grau de parentesco é obrigatório para familiares' });    if (formConvidado.ehFamilia && !formConvidado.grauParentesco) {

            />

          }`}

            <div className="flex items-center gap-2">

              <input        >      return;      setNotificacao({ tipo: 'erro', mensagem: 'Grau de parentesco é obrigatório para familiares' });

                type="checkbox"

                id="ehCasal"          Padrinhos

                checked={formPadrinho.ehCasal}

                onChange={e => setFormPadrinho({ ...formPadrinho, ehCasal: e.target.checked })}        </button>    }      return;

                className="w-4 h-4 rounded border-gray-300"

              />      </div>

              <label htmlFor="ehCasal" className="text-sm text-gray-700">

                É um casal?    }

              </label>

            </div>      {/* Convidados */}



            {formPadrinho.ehCasal && (      {aba === 'convidados' && (    const convidadoData = {

              <>

                <Input        <div className="space-y-4">

                  label="Nome do Parceiro *"

                  value={formPadrinho.nomeParceiro || ''}          <Button onClick={handleAbrirModal} className="w-full">      nome: formConvidado.nome,    const convidadoData = {

                  onChange={e => setFormPadrinho({ ...formPadrinho, nomeParceiro: e.target.value })}

                  placeholder="Digite o nome"            <Plus size={18} />

                />

            <span>Adicionar Convidado</span>      telefone: formConvidado.telefone,      nome: formConvidado.nome,

                <Input

                  label="Telefone do Parceiro *"          </Button>

                  value={formPadrinho.telefoneParceiro || ''}

                  onChange={e => setFormPadrinho({ ...formPadrinho, telefoneParceiro: e.target.value })}      confirmacao: formConvidado.confirmacao,      telefone: formConvidado.telefone,

                  placeholder="(11) 99999-9999"

                />          {/* Filtro */}

              </>

            )}          <div className="flex gap-2 flex-wrap">      ehFamilia: formConvidado.ehFamilia,      confirmacao: formConvidado.confirmacao,



            <Select            {[

              label="Lado *"

              value={formPadrinho.lado}              { value: 'todos', label: 'Todos' },      grauParentesco: formConvidado.ehFamilia ? formConvidado.grauParentesco : undefined,      ehFamilia: formConvidado.ehFamilia,

              onChange={e => setFormPadrinho({ ...formPadrinho, lado: e.target.value as LadoConvidado })}

              options={[              { value: 'sim', label: '✅ Confirmados' },

                { value: 'noiva', label: '💕 Lado da Noiva' },

                { value: 'noivo', label: '💙 Lado do Noivo' },              { value: 'talvez', label: '❓ Talvez' },      lado: ladoAtual,      grauParentesco: formConvidado.ehFamilia ? formConvidado.grauParentesco : undefined,

              ]}

            />              { value: 'nao', label: '❌ Recusados' },

          </div>

        </Modal>            ].map(opt => (    };      lado: ladoAtual,

      )}

    </div>              <button

  );

};                key={opt.value}    };


                onClick={() => setFiltro(opt.value as any)}

                className={`px-3 py-1 rounded text-sm ${    if (editando && 'ehFamilia' in editando) {

                  filtro === opt.value

                    ? 'bg-rose-600 text-white'      atualizarConvidado(editando.id, convidadoData);    if (editando && 'ehFamilia' in editando) {

                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'

                }`}      setNotificacao({ tipo: 'sucesso', mensagem: 'Convidado atualizado!' });      atualizarConvidado(editando.id, convidadoData);

              >

                {opt.label}    } else {      setNotificacao({ tipo: 'sucesso', mensagem: 'Convidado atualizado!' });

              </button>

            ))}      const resultado = adicionarConvidado(convidadoData as Omit<Convidado, 'id'>, ladoAtual);    } else {

          </div>

      if (!resultado.sucesso) {      const resultado = adicionarConvidado(convidadoData as Omit<Convidado, 'id'>, ladoAtual);

          {/* Lista */}

          {convidadosFiltrados.length === 0 ? (        setNotificacao({ tipo: 'erro', mensagem: resultado.mensagem || 'Erro ao adicionar' });      if (!resultado.sucesso) {

            <Card className="text-center py-8">

              <p className="text-gray-500">Nenhum convidado nesta categoria</p>        return;        setNotificacao({ tipo: 'erro', mensagem: resultado.mensagem || 'Erro ao adicionar' });

            </Card>

          ) : (      }        return;

            <div className="space-y-3">

              {convidadosFiltrados.map(convidado => (      setNotificacao({ tipo: 'sucesso', mensagem: 'Convidado adicionado!' });      }

                <Card key={convidado.id}>

                  <div className="flex justify-between items-start gap-3">    }      setNotificacao({ tipo: 'sucesso', mensagem: 'Convidado adicionado!' });

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-gray-800 truncate">{convidado.nome}</h3>    setTimeout(() => setModalAberto(false), 500);    }

                      <p className="text-xs sm:text-sm text-gray-600">📞 {convidado.telefone}</p>

                      {convidado.ehFamilia && convidado.grauParentesco && (  };    setTimeout(() => setModalAberto(false), 500);

                        <p className="text-xs sm:text-sm text-rose-600">

                          👨‍👩‍👧‍👦 {GRAUS_PARENTESCO.find(g => g.value === convidado.grauParentesco)?.label}  };

                        </p>

                      )}  const handleSalvarPadrinho = () => {

                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${confirmacaoBadge(convidado.confirmacao)}`}>

                        {CONFIRMACOES.find(c => c.value === convidado.confirmacao)?.label}    if (!formPadrinho.nome.trim() || !formPadrinho.telefone.trim()) {  const handleSalvarPadrinho = () => {

                      </span>

                    </div>      setNotificacao({ tipo: 'erro', mensagem: 'Nome e telefone são obrigatórios' });    if (!formPadrinho.nome.trim() || !formPadrinho.telefone.trim()) {

                    <div className="flex gap-1">

                      <button      return;      setNotificacao({ tipo: 'erro', mensagem: 'Nome e telefone são obrigatórios' });

                        onClick={() => handleEditarConvidado(convidado)}

                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"    }      return;

                      >

                        <Edit2 size={16} />    }

                      </button>

                      <button    if (formPadrinho.ehCasal && (!formPadrinho.nomeParceiro.trim() || !formPadrinho.telefoneParceiro.trim())) {

                        onClick={() => handleDeletarConvidado(convidado.id)}

                        className="p-2 text-red-500 hover:bg-red-50 rounded"      setNotificacao({ tipo: 'erro', mensagem: 'Dados do parceiro são obrigatórios para casais' });    if (formPadrinho.ehCasal && (!formPadrinho.nomeParceiro.trim() || !formPadrinho.telefoneParceiro.trim())) {

                      >

                        <Trash2 size={16} />      return;      setNotificacao({ tipo: 'erro', mensagem: 'Dados do parceiro são obrigatórios para casais' });

                      </button>

                    </div>    }      return;

                  </div>

                </Card>    }

              ))}

            </div>    const padrinhoData = {

          )}

        </div>      nome: formPadrinho.nome,    const padrinhoData = {

      )}

      telefone: formPadrinho.telefone,      nome: formPadrinho.nome,

      {/* Padrinhos */}

      {aba === 'padrinhos' && (      confirmacao: formPadrinho.confirmacao,      telefone: formPadrinho.telefone,

        <div className="space-y-4">

          <Button onClick={handleAbrirModal} className="w-full">      ehCasal: formPadrinho.ehCasal,      confirmacao: formPadrinho.confirmacao,

            <Plus size={18} />

            <span>Adicionar Padrinho</span>      nomeParceiro: formPadrinho.ehCasal ? formPadrinho.nomeParceiro : undefined,      ehCasal: formPadrinho.ehCasal,

          </Button>

      telefoneParceiro: formPadrinho.ehCasal ? formPadrinho.telefoneParceiro : undefined,      nomeParceiro: formPadrinho.ehCasal ? formPadrinho.nomeParceiro : undefined,

          {padrinhoPorLado.length === 0 ? (

            <Card className="text-center py-8">      lado: ladoAtual,      telefoneParceiro: formPadrinho.ehCasal ? formPadrinho.telefoneParceiro : undefined,

              <p className="text-gray-500">Nenhum padrinho adicionado</p>

            </Card>    };      lado: ladoAtual,

          ) : (

            <div className="space-y-3">    };

              {padrinhoPorLado.map(padrinho => (

                <Card key={padrinho.id}>    if (editando && !('ehFamilia' in editando)) {

                  <div className="flex justify-between items-start gap-3">

                    <div className="flex-1 min-w-0">      atualizarPadrinho(editando.id, padrinhoData);    if (editando && !('ehFamilia' in editando)) {

                      <h3 className="font-semibold text-gray-800">

                        {padrinho.nome}      setNotificacao({ tipo: 'sucesso', mensagem: 'Padrinho atualizado!' });      atualizarPadrinho(editando.id, padrinhoData);

                        {padrinho.ehCasal && padrinho.nomeParceiro && (

                          <> e {padrinho.nomeParceiro}</>    } else {      setNotificacao({ tipo: 'sucesso', mensagem: 'Padrinho atualizado!' });

                        )}

                      </h3>      const resultado = adicionarPadrinho(padrinhoData as Omit<Padrinho, 'id'>);    } else {

                      <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefone}</p>

                      {padrinho.ehCasal && padrinho.telefoneParceiro && (      if (!resultado.sucesso) {      const resultado = adicionarPadrinho(padrinhoData as Omit<Padrinho, 'id'>);

                        <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefoneParceiro}</p>

                      )}        setNotificacao({ tipo: 'erro', mensagem: resultado.mensagem || 'Erro ao adicionar' });      if (!resultado.sucesso) {

                      <p className="text-xs text-rose-600 mt-1">

                        💑 {padrinho.ehCasal ? 'Casal' : 'Individual'}        return;        setNotificacao({ tipo: 'erro', mensagem: resultado.mensagem || 'Erro ao adicionar' });

                      </p>

                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${confirmacaoBadge(padrinho.confirmacao)}`}>      }        return;

                        {CONFIRMACOES.find(c => c.value === padrinho.confirmacao)?.label}

                      </span>      setNotificacao({ tipo: 'sucesso', mensagem: 'Padrinho adicionado!' });      }

                    </div>

                    <div className="flex gap-1">    }      setNotificacao({ tipo: 'sucesso', mensagem: 'Padrinho adicionado!' });

                      <button

                        onClick={() => handleEditarPadrinho(padrinho)}    setTimeout(() => setModalAberto(false), 500);    }

                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"

                      >  };    setTimeout(() => setModalAberto(false), 500);

                        <Edit2 size={16} />

                      </button>  };

                      <button

                        onClick={() => handleDeletarPadrinho(padrinho.id)}  const convidadosPorLado = getConvidadosPorLado(ladoAtual);

                        className="p-2 text-red-500 hover:bg-red-50 rounded"

                      >  const padrinhoPorLado = getPadrinhoPorLado(ladoAtual);  const convidadosPorLado = getConvidadosPorLado(ladoAtual);

                        <Trash2 size={16} />

                      </button>    const padrinhoPorLado = getPadrinhoPorLado(ladoAtual);

                    </div>

                  </div>  const convidadosFiltrados = convidadosPorLado.filter((c) => {  

                </Card>

              ))}    if (filtro === 'todos') return true;  const convidadosFiltrados = convidadosPorLado.filter((c) => {

            </div>

          )}    return c.confirmacao === filtro;    if (filtro === 'todos') return true;

        </div>

      )}  });    return c.confirmacao === filtro;



      {/* Modal Convidados */}  });

      {aba === 'convidados' && (

        <Modal  const padrinhosEmEsseLado = padrinhoPorLado.reduce((total, p) => total + (p.ehCasal ? 2 : 1), 0);

          titulo={editandoId ? 'Editar Convidado' : 'Adicionar Convidado'}

          aberta={modalAberta}  const totalOcupado = convidadosPorLado.length + padrinhosEmEsseLado;  const padrinhosEmEsseLado = padrinhoPorLado.reduce((total, p) => total + (p.ehCasal ? 2 : 1), 0);

          onFechar={() => setModalAberta(false)}

          onSalvar={handleSalvarConvidado}  const percentualPreenchimento = Math.round((totalOcupado / LIMITE_CONVIDADOS_POR_LADO) * 100);  const totalOcupado = convidadosPorLado.length + padrinhosEmEsseLado;

        >

          <div className="space-y-4">  const percentualPreenchimento = Math.round((totalOcupado / LIMITE_CONVIDADOS_POR_LADO) * 100);

            <Input

              label="Nome *"  const confirmacaoBadge = (confirmacao: ConfirmacaoConvidado) => {

              value={formConvidado.nome}

              onChange={e => setFormConvidado({ ...formConvidado, nome: e.target.value })}    const badges = {  const confirmacaoBadge = (confirmacao: ConfirmacaoConvidado) => {

              placeholder="Digite o nome"

            />      sim: 'bg-green-100 text-green-800',    const badges = {



            <Input      nao: 'bg-red-100 text-red-800',      sim: 'bg-green-100 text-green-800',

              label="Telefone *"

              value={formConvidado.telefone}      talvez: 'bg-yellow-100 text-yellow-800',      nao: 'bg-red-100 text-red-800',

              onChange={e => setFormConvidado({ ...formConvidado, telefone: e.target.value })}

              placeholder="(11) 99999-9999"    };      talvez: 'bg-yellow-100 text-yellow-800',

            />

    return badges[confirmacao];    };

            <Select

              label="Confirmação *"  };    return badges[confirmacao];

              value={formConvidado.confirmacao}

              onChange={e => setFormConvidado({ ...formConvidado, confirmacao: e.target.value as ConfirmacaoConvidado })}  };

              options={CONFIRMACOES}

            />  return (



            <div className="flex items-center gap-2">    <div className="space-y-6">  return (

              <input

                type="checkbox"      <div className="text-center mb-8">    <div className="space-y-6">

                id="ehFamilia"

                checked={formConvidado.ehFamilia}        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Lista de Convidados</h1>      <div className="text-center mb-8">

                onChange={e => setFormConvidado({ ...formConvidado, ehFamilia: e.target.checked })}

                className="w-4 h-4 rounded border-gray-300"        <p className="text-gray-600 text-sm sm:text-base">Gerencie seus convidados e padrinhos</p>        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Lista de Convidados</h1>

              />

              <label htmlFor="ehFamilia" className="text-sm text-gray-700">      </div>        <p className="text-gray-600 text-sm sm:text-base">Gerencie seus convidados e padrinhos</p>

                É da família?

              </label>      </div>

            </div>

      {/* Seletor de Lado */}

            {formConvidado.ehFamilia && (

              <Select      <div className="flex gap-3 justify-center">      {/* Seletor de Lado */}

                label="Grau de Parentesco *"

                value={formConvidado.grauParentesco || ''}        <button      <div className="flex gap-3 justify-center">

                onChange={e => setFormConvidado({ ...formConvidado, grauParentesco: e.target.value as GrauParentesco })}

                options={GRAUS_PARENTESCO}          onClick={() => setLadoAtual('noivo')}        <button

              />

            )}          className={`flex-1 max-w-xs flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${          onClick={() => setLadoAtual('noivo')}



            <Select            ladoAtual === 'noivo'          className={`flex-1 max-w-xs flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${

              label="Lado *"

              value={formConvidado.lado}              ? 'bg-rose-500 text-white shadow-md'            ladoAtual === 'noivo'

              onChange={e => setFormConvidado({ ...formConvidado, lado: e.target.value as LadoConvidado })}

              options={[              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'              ? 'bg-rose-500 text-white shadow-md'

                { value: 'noiva', label: '💕 Lado da Noiva' },

                { value: 'noivo', label: '💙 Lado do Noivo' },          }`}              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'

              ]}

            />        >          }`}

          </div>

        </Modal>          <span>💍</span>        >

      )}

          <span>Noivo</span>          <span>💍</span>

      {/* Modal Padrinhos */}

      {aba === 'padrinhos' && (        </button>          <span>Noivo</span>

        <Modal

          titulo={editandoId ? 'Editar Padrinho' : 'Adicionar Padrinho'}        <button        </button>

          aberta={modalAberta}

          onFechar={() => setModalAberta(false)}          onClick={() => setLadoAtual('noiva')}        <button

          onSalvar={handleSalvarPadrinho}

        >          className={`flex-1 max-w-xs flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${          onClick={() => setLadoAtual('noiva')}

          <div className="space-y-4">

            <Input            ladoAtual === 'noiva'          className={`flex-1 max-w-xs flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${

              label="Nome *"

              value={formPadrinho.nome}              ? 'bg-rose-500 text-white shadow-md'            ladoAtual === 'noiva'

              onChange={e => setFormPadrinho({ ...formPadrinho, nome: e.target.value })}

              placeholder="Digite o nome"              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'              ? 'bg-rose-500 text-white shadow-md'

            />

          }`}              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'

            <Input

              label="Telefone *"        >          }`}

              value={formPadrinho.telefone}

              onChange={e => setFormPadrinho({ ...formPadrinho, telefone: e.target.value })}          <span>💐</span>        >

              placeholder="(11) 99999-9999"

            />          <span>Noiva</span>          <span>💐</span>



            <Select        </button>          <span>Noiva</span>

              label="Confirmação *"

              value={formPadrinho.confirmacao}      </div>        </button>

              onChange={e => setFormPadrinho({ ...formPadrinho, confirmacao: e.target.value as ConfirmacaoConvidado })}

              options={CONFIRMACOES}      </div>

            />

      {/* Abas */}

            <div className="flex items-center gap-2">

              <input      <div className="flex gap-2 justify-center">      {/* Abas */}

                type="checkbox"

                id="ehCasal"        <button      <div className="flex gap-2 justify-center">

                checked={formPadrinho.ehCasal}

                onChange={e => setFormPadrinho({ ...formPadrinho, ehCasal: e.target.checked })}          onClick={() => setAba('convidados')}        <button

                className="w-4 h-4 rounded border-gray-300"

              />          className={`px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${          onClick={() => setAba('convidados')}

              <label htmlFor="ehCasal" className="text-sm text-gray-700">

                É um casal?            aba === 'convidados'          className={`px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${

              </label>

            </div>              ? 'bg-rose-500 text-white shadow-md'            aba === 'convidados'



            {formPadrinho.ehCasal && (              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'              ? 'bg-rose-500 text-white shadow-md'

              <>

                <Input          }`}              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

                  label="Nome do Parceiro *"

                  value={formPadrinho.nomeParceiro || ''}        >          }`}

                  onChange={e => setFormPadrinho({ ...formPadrinho, nomeParceiro: e.target.value })}

                  placeholder="Digite o nome"          👥 Convidados ({convidadosPorLado.length})        >

                />

        </button>          👥 Convidados ({convidadosPorLado.length})

                <Input

                  label="Telefone do Parceiro *"        <button        </button>

                  value={formPadrinho.telefoneParceiro || ''}

                  onChange={e => setFormPadrinho({ ...formPadrinho, telefoneParceiro: e.target.value })}          onClick={() => setAba('padrinhos')}        <button

                  placeholder="(11) 99999-9999"

                />          className={`px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${          onClick={() => setAba('padrinhos')}

              </>

            )}            aba === 'padrinhos'          className={`px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${



            <Select              ? 'bg-rose-500 text-white shadow-md'            aba === 'padrinhos'

              label="Lado *"

              value={formPadrinho.lado}              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'              ? 'bg-rose-500 text-white shadow-md'

              onChange={e => setFormPadrinho({ ...formPadrinho, lado: e.target.value as LadoConvidado })}

              options={[          }`}              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

                { value: 'noiva', label: '💕 Lado da Noiva' },

                { value: 'noivo', label: '💙 Lado do Noivo' },        >          }`}

              ]}

            />          💑 Padrinhos ({padrinhoPorLado.length})        >

          </div>

        </Modal>        </button>          💑 Padrinhos ({padrinhoPorLado.length})

      )}

    </div>      </div>        </button>

  );

};      </div>


      {/* Progress Bar */}

      <Card>      {/* Progress Bar */}

        <div className="space-y-2">      <Card>

          <div className="flex justify-between items-center gap-2">        <div className="space-y-2">

            <p className="font-medium text-gray-700 text-sm sm:text-base">Ocupação do lado</p>          <div className="flex justify-between items-center gap-2">

            <p className="text-xs sm:text-sm font-bold text-rose-600 flex-shrink-0">            <p className="font-medium text-gray-700 text-sm sm:text-base">Ocupação do lado</p>

              {totalOcupado} / {LIMITE_CONVIDADOS_POR_LADO}            <p className="text-xs sm:text-sm font-bold text-rose-600 flex-shrink-0">

            </p>              {totalOcupado} / {LIMITE_CONVIDADOS_POR_LADO}

          </div>            </p>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">          </div>

            <div          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

              className={`h-full transition-all duration-300 ${            <div

                percentualPreenchimento >= 100              className={`h-full transition-all duration-300 ${

                  ? 'bg-red-500'                percentualPreenchimento >= 100

                  : percentualPreenchimento >= 80                  ? 'bg-red-500'

                    ? 'bg-yellow-500'                  : percentualPreenchimento >= 80

                    : 'bg-green-500'                    ? 'bg-yellow-500'

              }`}                    : 'bg-green-500'

              style={{ width: `${Math.min(percentualPreenchimento, 100)}%` }}              }`}

            />              style={{ width: `${Math.min(percentualPreenchimento, 100)}%` }}

          </div>            />

          <p className="text-xs text-gray-600">{percentualPreenchimento}% preenchido</p>          </div>

        </div>          <p className="text-xs text-gray-600">{percentualPreenchimento}% preenchido</p>

      </Card>        </div>

      </Card>

      {/* Summary */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">      {/* Summary */}

        <Card>      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">

          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total</p>        <Card>

          <p className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800">{convidadosPorLado.length}</p>          <p className="text-gray-600 text-xs sm:text-sm mb-2">Total</p>

        </Card>          <p className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800">{convidadosPorLado.length}</p>

        <Card>        </Card>

          <p className="text-gray-600 text-xs sm:text-sm mb-2">Confirmados</p>        <Card>

          <p className="font-playfair text-2xl sm:text-3xl font-bold text-green-600">          <p className="text-gray-600 text-xs sm:text-sm mb-2">Confirmados</p>

            {convidadosPorLado.filter((c) => c.confirmacao === 'sim').length}          <p className="font-playfair text-2xl sm:text-3xl font-bold text-green-600">

          </p>            {convidadosPorLado.filter((c) => c.confirmacao === 'sim').length}

        </Card>          </p>

        <Card>        </Card>

          <p className="text-gray-600 text-xs sm:text-sm mb-2">Talvez</p>        <Card>

          <p className="font-playfair text-2xl sm:text-3xl font-bold text-yellow-600">          <p className="text-gray-600 text-xs sm:text-sm mb-2">Talvez</p>

            {convidadosPorLado.filter((c) => c.confirmacao === 'talvez').length}          <p className="font-playfair text-2xl sm:text-3xl font-bold text-yellow-600">

          </p>            {convidadosPorLado.filter((c) => c.confirmacao === 'talvez').length}

        </Card>          </p>

        <Card>        </Card>

          <p className="text-gray-600 text-xs sm:text-sm mb-2">Recusados</p>        <Card>

          <p className="font-playfair text-2xl sm:text-3xl font-bold text-red-600">          <p className="text-gray-600 text-xs sm:text-sm mb-2">Recusados</p>

            {convidadosPorLado.filter((c) => c.confirmacao === 'nao').length}          <p className="font-playfair text-2xl sm:text-3xl font-bold text-red-600">

          </p>            {convidadosPorLado.filter((c) => c.confirmacao === 'nao').length}

        </Card>          </p>

      </div>        </Card>

      </div>

      {/* Notificação */}

      {notificacao && (      {/* Notificação */}

        <div      {notificacao && (

          className={`p-4 rounded-lg text-sm ${        <div

            notificacao.tipo === 'sucesso'          className={`p-4 rounded-lg text-sm ${

              ? 'bg-green-100 text-green-800'            notificacao.tipo === 'sucesso'

              : 'bg-red-100 text-red-800'              ? 'bg-green-100 text-green-800'

          }`}              : 'bg-red-100 text-red-800'

        >          }`}

          {notificacao.mensagem}        >

        </div>          {notificacao.mensagem}

      )}        </div>

      )}

      {/* Modal */}

      <Modal      {/* Modal */}

        isOpen={modalAberto}      <Modal

        onClose={() => setModalAberto(false)}        isOpen={modalAberto}

        title={`${editando ? 'Editar' : 'Adicionar'} ${aba === 'convidados' ? 'Convidado' : 'Padrinho'}`}        onClose={() => setModalAberto(false)}

      >        title={`${editando ? 'Editar' : 'Adicionar'} ${aba === 'convidados' ? 'Convidado' : 'Padrinho'}`}

        <div className="space-y-4">      >

          {aba === 'convidados' && (        <div className="space-y-4">

            <>          {aba === 'convidados' && (

              <Input            <>

                label="Nome *"              <Input

                value={formConvidado.nome}                label="Nome *"

                onChange={(e) => setFormConvidado({ ...formConvidado, nome: e.target.value })}                value={formConvidado.nome}

                placeholder="Digite o nome do convidado"                onChange={(e) => setFormConvidado({ ...formConvidado, nome: e.target.value })}

              />                placeholder="Digite o nome do convidado"

              <Input              />

                label="Telefone *"              <Input

                value={formConvidado.telefone}                label="Telefone *"

                onChange={(e) => setFormConvidado({ ...formConvidado, telefone: e.target.value })}                value={formConvidado.telefone}

                placeholder="11999999999"                onChange={(e) => setFormConvidado({ ...formConvidado, telefone: e.target.value })}

                type="tel"                placeholder="11999999999"

              />                type="tel"

              <Select              />

                label="Confirmação"              <Select

                value={formConvidado.confirmacao}                label="Confirmação"

                onChange={(e) => setFormConvidado({ ...formConvidado, confirmacao: e.target.value as ConfirmacaoConvidado })}                value={formConvidado.confirmacao}

                options={[                onChange={(e) => setFormConvidado({ ...formConvidado, confirmacao: e.target.value as ConfirmacaoConvidado })}

                  { value: 'sim', label: '✅ Confirmado' },                options={[

                  { value: 'talvez', label: '❓ Talvez' },                  { value: 'sim', label: '✅ Confirmado' },

                  { value: 'nao', label: '❌ Recusado' },                  { value: 'talvez', label: '❓ Talvez' },

                ]}                  { value: 'nao', label: '❌ Recusado' },

              />                ]}

              <div className="flex items-center gap-2">              />

                <input              <div className="flex items-center gap-2">

                  type="checkbox"                <input

                  id="ehFamilia"                  type="checkbox"

                  checked={formConvidado.ehFamilia}                  id="ehFamilia"

                  onChange={(e) => setFormConvidado({ ...formConvidado, ehFamilia: e.target.checked })}                  checked={formConvidado.ehFamilia}

                  className="rounded"                  onChange={(e) => setFormConvidado({ ...formConvidado, ehFamilia: e.target.checked })}

                />                  className="rounded"

                <label htmlFor="ehFamilia" className="text-sm text-gray-700">É da família?</label>                />

              </div>                <label htmlFor="ehFamilia" className="text-sm text-gray-700">É da família?</label>

              {formConvidado.ehFamilia && (              </div>

                <Select              {formConvidado.ehFamilia && (

                  label="Grau de Parentesco *"                <Select

                  value={formConvidado.grauParentesco}                  label="Grau de Parentesco *"

                  onChange={(e) => setFormConvidado({ ...formConvidado, grauParentesco: e.target.value as GrauParentesco })}                  value={formConvidado.grauParentesco}

                  options={GRAUS_PARENTESCO}                  onChange={(e) => setFormConvidado({ ...formConvidado, grauParentesco: e.target.value as GrauParentesco })}

                />                  options={GRAUS_PARENTESCO}

              )}                />

              <div className="flex gap-2">              )}

                <Button onClick={handleSalvarConvidado} className="flex-1">              <div className="flex gap-2">

                  Salvar                <Button onClick={handleSalvarConvidado} className="flex-1">

                </Button>                  Salvar

                <Button onClick={() => setModalAberto(false)} variant="secondary" className="flex-1">                </Button>

                  Cancelar                <Button onClick={() => setModalAberto(false)} variant="secondary" className="flex-1">

                </Button>                  Cancelar

              </div>                </Button>

            </>              </div>

          )}            </>

          {aba === 'padrinhos' && (          )}

            <>          {aba === 'padrinhos' && (

              <Input            <>

                label="Nome do Padrinho *"              <Input

                value={formPadrinho.nome}                label="Nome do Padrinho *"

                onChange={(e) => setFormPadrinho({ ...formPadrinho, nome: e.target.value })}                value={formPadrinho.nome}

                placeholder="Digite o nome"                onChange={(e) => setFormPadrinho({ ...formPadrinho, nome: e.target.value })}

              />                placeholder="Digite o nome"

              <Input              />

                label="Telefone *"              <Input

                value={formPadrinho.telefone}                label="Telefone *"

                onChange={(e) => setFormPadrinho({ ...formPadrinho, telefone: e.target.value })}                value={formPadrinho.telefone}

                placeholder="11999999999"                onChange={(e) => setFormPadrinho({ ...formPadrinho, telefone: e.target.value })}

                type="tel"                placeholder="11999999999"

              />                type="tel"

              <Select              />

                label="Confirmação"              <Select

                value={formPadrinho.confirmacao}                label="Confirmação"

                onChange={(e) => setFormPadrinho({ ...formPadrinho, confirmacao: e.target.value as ConfirmacaoConvidado })}                value={formPadrinho.confirmacao}

                options={[                onChange={(e) => setFormPadrinho({ ...formPadrinho, confirmacao: e.target.value as ConfirmacaoConvidado })}

                  { value: 'sim', label: '✅ Confirmado' },                options={[

                  { value: 'talvez', label: '❓ Talvez' },                  { value: 'sim', label: '✅ Confirmado' },

                  { value: 'nao', label: '❌ Recusado' },                  { value: 'talvez', label: '❓ Talvez' },

                ]}                  { value: 'nao', label: '❌ Recusado' },

              />                ]}

              <div className="flex items-center gap-2">              />

                <input              <div className="flex items-center gap-2">

                  type="checkbox"                <input

                  id="ehCasal"                  type="checkbox"

                  checked={formPadrinho.ehCasal}                  id="ehCasal"

                  onChange={(e) => setFormPadrinho({ ...formPadrinho, ehCasal: e.target.checked })}                  checked={formPadrinho.ehCasal}

                  className="rounded"                  onChange={(e) => setFormPadrinho({ ...formPadrinho, ehCasal: e.target.checked })}

                />                  className="rounded"

                <label htmlFor="ehCasal" className="text-sm text-gray-700">É um casal?</label>                />

              </div>                <label htmlFor="ehCasal" className="text-sm text-gray-700">É um casal?</label>

              {formPadrinho.ehCasal && (              </div>

                <>              {formPadrinho.ehCasal && (

                  <Input                <>

                    label="Nome do Parceiro *"                  <Input

                    value={formPadrinho.nomeParceiro}                    label="Nome do Parceiro *"

                    onChange={(e) => setFormPadrinho({ ...formPadrinho, nomeParceiro: e.target.value })}                    value={formPadrinho.nomeParceiro}

                    placeholder="Digite o nome"                    onChange={(e) => setFormPadrinho({ ...formPadrinho, nomeParceiro: e.target.value })}

                  />                    placeholder="Digite o nome"

                  <Input                  />

                    label="Telefone do Parceiro *"                  <Input

                    value={formPadrinho.telefoneParceiro}                    label="Telefone do Parceiro *"

                    onChange={(e) => setFormPadrinho({ ...formPadrinho, telefoneParceiro: e.target.value })}                    value={formPadrinho.telefoneParceiro}

                    placeholder="11999999999"                    onChange={(e) => setFormPadrinho({ ...formPadrinho, telefoneParceiro: e.target.value })}

                    type="tel"                    placeholder="11999999999"

                  />                    type="tel"

                </>                  />

              )}                </>

              <div className="flex gap-2">              )}

                <Button onClick={handleSalvarPadrinho} className="flex-1">              <div className="flex gap-2">

                  Salvar                <Button onClick={handleSalvarPadrinho} className="flex-1">

                </Button>                  Salvar

                <Button onClick={() => setModalAberto(false)} variant="secondary" className="flex-1">                </Button>

                  Cancelar                <Button onClick={() => setModalAberto(false)} variant="secondary" className="flex-1">

                </Button>                  Cancelar

              </div>                </Button>

            </>              </div>

          )}            </>

        </div>          )}

      </Modal>        </div>

      </Modal>

      {/* Botão Adicionar e Lista */}

      {aba === 'convidados' && (      {/* Botão Adicionar e Lista */}

        <>      {aba === 'convidados' && (

          <Button        <>

            onClick={() => handleAbrirModal()}          <Button

            disabled={totalOcupado >= LIMITE_CONVIDADOS_POR_LADO}            onClick={() => handleAbrirModal()}

            className="w-full flex items-center justify-center gap-2"            disabled={totalOcupado >= LIMITE_CONVIDADOS_POR_LADO}

          >            className="w-full flex items-center justify-center gap-2"

            <Plus size={18} />          >

            <span>Adicionar Convidado</span>            <Plus size={18} />

          </Button>            <span>Adicionar Convidado</span>

          </Button>

          <div className="space-y-2">

            {convidadosFiltrados.length === 0 ? (          <div className="space-y-2">

              <Card className="text-center py-8">            {convidadosFiltrados.length === 0 ? (

                <p className="text-gray-500">Nenhum convidado nesta categoria</p>              <Card className="text-center py-8">

              </Card>                <p className="text-gray-500">Nenhum convidado nesta categoria</p>

            ) : (              </Card>

              convidadosFiltrados.map((convidado) => (            ) : (

                <Card key={convidado.id}>              convidadosFiltrados.map((convidado) => (

                  <div className="flex justify-between items-start gap-3">                <Card key={convidado.id}>

                    <div className="flex-1 min-w-0">                  <div className="flex justify-between items-start gap-3">

                      <div className="flex items-center gap-2 mb-1">                    <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-gray-800 truncate">{convidado.nome}</h3>                      <div className="flex items-center gap-2 mb-1">

                        <span className={`text-xs px-2 py-1 rounded-full ${confirmacaoBadge(convidado.confirmacao)}`}>                        <h3 className="font-semibold text-gray-800 truncate">{convidado.nome}</h3>

                          {convidado.confirmacao === 'sim' ? '✅' : convidado.confirmacao === 'nao' ? '❌' : '❓'}                        <span className={`text-xs px-2 py-1 rounded-full ${confirmacaoBadge(convidado.confirmacao)}`}>

                        </span>                          {convidado.confirmacao === 'sim' ? '✅' : convidado.confirmacao === 'nao' ? '❌' : '❓'}

                      </div>                        </span>

                      <p className="text-xs sm:text-sm text-gray-600">📞 {convidado.telefone}</p>                      </div>

                      {convidado.ehFamilia && convidado.grauParentesco && (                      <p className="text-xs sm:text-sm text-gray-600">📞 {convidado.telefone}</p>

                        <p className="text-xs sm:text-sm text-rose-600">👨‍👩‍👧‍👦 {GRAUS_PARENTESCO.find(g => g.value === convidado.grauParentesco)?.label}</p>                      {convidado.ehFamilia && convidado.grauParentesco && (

                      )}                        <p className="text-xs sm:text-sm text-rose-600">👨‍👩‍👧‍👦 {GRAUS_PARENTESCO.find(g => g.value === convidado.grauParentesco)?.label}</p>

                    </div>                      )}

                    <div className="flex gap-1">                    </div>

                      <button                    <div className="flex gap-1">

                        onClick={() => handleAbrirModal(convidado)}                      <button

                        className="p-2 hover:bg-gray-100 rounded"                        onClick={() => handleAbrirModal(convidado)}

                      >                        className="p-2 hover:bg-gray-100 rounded"

                        <Edit2 size={16} className="text-blue-500" />                      >

                      </button>                        <Edit2 size={16} className="text-blue-500" />

                      <button                      </button>

                        onClick={() => deletarConvidado(convidado.id)}                      <button

                        className="p-2 hover:bg-gray-100 rounded"                        onClick={() => deletarConvidado(convidado.id)}

                      >                        className="p-2 hover:bg-gray-100 rounded"

                        <Trash2 size={16} className="text-red-500" />                      >

                      </button>                        <Trash2 size={16} className="text-red-500" />

                    </div>                      </button>

                  </div>                    </div>

                </Card>                  </div>

              ))                </Card>

            )}              ))

          </div>            )}

        </>          </div>

      )}        </>

      )}

      {/* Lista de Padrinhos */}

      {aba === 'padrinhos' && (      {/* Lista de Padrinhos */}

        <>      {aba === 'padrinhos' && (

          <Button        <>

            onClick={() => handleAbrirModal()}          <Button

            disabled={padrinhoPorLado.length >= 4}            onClick={() => handleAbrirModal()}

            className="w-full flex items-center justify-center gap-2"            disabled={padrinhoPorLado.length >= 4}

          >            className="w-full flex items-center justify-center gap-2"

            <Plus size={18} />          >

            <span>Adicionar Padrinho</span>            <Plus size={18} />

          </Button>            <span>Adicionar Padrinho</span>

          </Button>

          <div className="space-y-2">

            {padrinhoPorLado.length === 0 ? (          <div className="space-y-2">

              <Card className="text-center py-8">            {padrinhoPorLado.length === 0 ? (

                <p className="text-gray-500">Nenhum padrinho adicionado</p>              <Card className="text-center py-8">

              </Card>                <p className="text-gray-500">Nenhum padrinho adicionado</p>

            ) : (              </Card>

              padrinhoPorLado.map((padrinho) => (            ) : (

                <Card key={padrinho.id}>              padrinhoPorLado.map((padrinho) => (

                  <div className="flex justify-between items-start gap-3">                <Card key={padrinho.id}>

                    <div className="flex-1 min-w-0">                  <div className="flex justify-between items-start gap-3">

                      <div className="flex items-center gap-2 mb-1">                    <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-gray-800 truncate">                      <div className="flex items-center gap-2 mb-1">

                          {padrinho.ehCasal ? `${padrinho.nome} & ${padrinho.nomeParceiro}` : padrinho.nome}                        <h3 className="font-semibold text-gray-800 truncate">

                        </h3>                          {padrinho.ehCasal ? `${padrinho.nome} & ${padrinho.nomeParceiro}` : padrinho.nome}

                        <span className={`text-xs px-2 py-1 rounded-full ${confirmacaoBadge(padrinho.confirmacao)}`}>                        </h3>

                          {padrinho.confirmacao === 'sim' ? '✅' : padrinho.confirmacao === 'nao' ? '❌' : '❓'}                        <span className={`text-xs px-2 py-1 rounded-full ${confirmacaoBadge(padrinho.confirmacao)}`}>

                        </span>                          {padrinho.confirmacao === 'sim' ? '✅' : padrinho.confirmacao === 'nao' ? '❌' : '❓'}

                      </div>                        </span>

                      <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefone}</p>                      </div>

                      {padrinho.ehCasal && (                      <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefone}</p>

                        <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefoneParceiro}</p>                      {padrinho.ehCasal && (

                      )}                        <p className="text-xs sm:text-sm text-gray-600">📞 {padrinho.telefoneParceiro}</p>

                      <p className="text-xs text-rose-600 mt-1">💑 {padrinho.ehCasal ? 'Casal' : 'Individual'}</p>                      )}

                    </div>                      <p className="text-xs text-rose-600 mt-1">💑 {padrinho.ehCasal ? 'Casal' : 'Individual'}</p>

                    <div className="flex gap-1">                    </div>

                      <button                    <div className="flex gap-1">

                        onClick={() => handleAbrirModal(padrinho)}                      <button

                        className="p-2 hover:bg-gray-100 rounded"                        onClick={() => handleAbrirModal(padrinho)}

                      >                        className="p-2 hover:bg-gray-100 rounded"

                        <Edit2 size={16} className="text-blue-500" />                      >

                      </button>                        <Edit2 size={16} className="text-blue-500" />

                      <button                      </button>

                        onClick={() => deletarPadrinho(padrinho.id)}                      <button

                        className="p-2 hover:bg-gray-100 rounded"                        onClick={() => deletarPadrinho(padrinho.id)}

                      >                        className="p-2 hover:bg-gray-100 rounded"

                        <Trash2 size={16} className="text-red-500" />                      >

                      </button>                        <Trash2 size={16} className="text-red-500" />

                    </div>                      </button>

                  </div>                    </div>

                </Card>                  </div>

              ))                </Card>

            )}              ))

          </div>            )}

        </>          </div>

      )}        </>

    </div>      )}

  );    </div>

};  );

};

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
          <div className="flex gap-2 flex-wrap flex-1">
            {(['todos', 'sim', 'nao', 'talvez'] as const).map((opcao) => (
              <button
                key={opcao}
                onClick={() => setFiltro(opcao === 'todos' ? 'todos' : opcao)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
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
