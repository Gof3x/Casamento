#!/bin/bash
# Script de instalação para Nosso Casamento & Lar

echo "🎉 Instalando Nosso Casamento & Lar..."
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependências instaladas com sucesso!"
    echo ""
    echo "🚀 Para iniciar o servidor de desenvolvimento:"
    echo "   npm run dev"
    echo ""
    echo "📦 Para fazer build de produção:"
    echo "   npm run build"
    echo ""
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi
