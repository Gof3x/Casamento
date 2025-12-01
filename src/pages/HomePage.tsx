import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Home, Heart, Users } from 'lucide-react';
import { Card, Input, ProgressBar } from '@/components';
import { useCasamentoStore } from '@/store/casamento';
import { useCasaStore } from '@/store/casa';
import { useConvidadosStore } from '@/store/convidados';

export const HomePage: React.FC = () => {
  const { dados: casamento, setDataCasamento, getTotalGasto } = useCasamentoStore();
  const { getItensPendentes, getTotalEstimado, getTotalGasto: getTotalCasaGasto } = useCasaStore();
  const { getTotalConvidados, dados: convidadosData } = useConvidadosStore();

  const diasRestantes = useMemo(() => {
    const dataC = new Date(casamento.dataCasamento);
    const hoje = new Date();
    const diferenca = dataC.getTime() - hoje.getTime();
    return Math.ceil(diferenca / (1000 * 3600 * 24));
  }, [casamento.dataCasamento]);

  const itensPendentes = getItensPendentes().length;
  const totalEstimadoCasa = getTotalEstimado();
  const totalGastoCasa = getTotalCasaGasto();

  const menuCards = [
    {
      title: 'Orçamento Casamento',
      description: `R$ ${getTotalGasto().toLocaleString('pt-BR', { minimumFractionDigits: 2 })} gastos`,
      icon: DollarSign,
      path: '/orcamento-casamento',
      color: 'from-rose-400 to-rose-600',
    },
    {
      title: 'Nossa Casa',
      description: `${itensPendentes} itens faltando comprar`,
      icon: Home,
      path: '/lista-casa',
      color: 'from-amber-400 to-amber-600',
    },
    {
      title: 'Ideias & Inspirações',
      description: 'Paleta, estilo e timeline',
      icon: Heart,
      path: '/ideias-casamento',
      color: 'from-pink-400 to-pink-600',
    },
    {
      title: 'Convidados',
      description: `${getTotalConvidados()} convidados`,
      icon: Users,
      path: '/convidados',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Nosso Casamento & Lar
        </h1>
        <p className="text-gray-600 text-lg">
          {casamento.nomeNoivo} ♥ {casamento.nomeNoiva}
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
        {/* Countdown */}
        <Card className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-600 text-xs sm:text-sm mb-2">Para o grande dia</p>
            <p className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-rose-600">{diasRestantes} dias</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              {new Date(casamento.dataCasamento).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <Calendar size={64} className="text-rose-200" />
        </Card>

        {/* Orçamento Casamento */}
        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Orçamento do Casamento</p>
          <p className="font-playfair text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            R$ {getTotalGasto().toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R${' '}
            {casamento.orcamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <ProgressBar value={getTotalGasto()} max={casamento.orcamentoTotal} showPercentage={true} />
        </Card>

        {/* Casa */}
        <Card>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">Equipando a Casa</p>
          <p className="font-playfair text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            R$ {totalGastoCasa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R${' '}
            {totalEstimadoCasa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <ProgressBar value={totalGastoCasa} max={totalEstimadoCasa} showPercentage={true} />
        </Card>

        {/* Convidados */}
        <Card>
          <p className="text-gray-600 text-sm mb-2">Lista de Convidados</p>
          <p className="font-playfair text-2xl font-bold text-gray-800 mb-4">{getTotalConvidados()} convidados</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-green-600 font-bold">{convidadosData.totalConfirmados}</p>
              <p className="text-gray-600">Confirmados</p>
            </div>
            <div>
              <p className="text-yellow-600 font-bold">{convidadosData.totalTalvez}</p>
              <p className="text-gray-600">Talvez</p>
            </div>
            <div>
              <p className="text-red-600 font-bold">{convidadosData.totalRecusados}</p>
              <p className="text-gray-600">Recusados</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Data do Casamento */}
      <Card>
        <p className="text-gray-700 font-medium mb-3">Configurar Data do Casamento</p>
        <div className="flex gap-3">
          <Input
            type="date"
            value={casamento.dataCasamento}
            onChange={(e) => setDataCasamento(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      {/* Menu Cards */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Comece por aqui</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.path} to={card.path}>
                <Card hover className={`bg-gradient-to-br ${card.color} text-white h-full`}>
                  <Icon size={32} className="mb-3" />
                  <h3 className="font-playfair text-lg font-bold mb-1">{card.title}</h3>
                  <p className="text-sm opacity-90">{card.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
