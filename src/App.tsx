import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HomePage } from '@/pages/HomePage';
import { OrcamentoCasamentoPage } from '@/pages/OrcamentoCasamentoPage';
import { ListaCasaPage } from '@/pages/ListaCasaPage';
import { IdeiasPage } from '@/pages/IdeiasPage';
import { ConvidadosPage } from '@/pages/ConvidadosPage';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orcamento-casamento" element={<OrcamentoCasamentoPage />} />
            <Route path="/lista-casa" element={<ListaCasaPage />} />
            <Route path="/ideias-casamento" element={<IdeiasPage />} />
            <Route path="/convidados" element={<ConvidadosPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
