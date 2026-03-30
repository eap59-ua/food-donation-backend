#!/bin/bash

# 🚀 Script para iniciar el Frontend de RedDonación

echo "=================================="
echo "🎨 Frontend - RedDonación v1.0"
echo "=================================="
echo ""

# Verificar si estamos en la carpeta correcta
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo "❌ Error: Asegúrate de estar en la carpeta 'frontend'"
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error en la instalación de dependencias"
    exit 1
fi

echo ""
echo "✅ Dependencias instaladas"
echo ""
echo "=================================="
echo "🔥 Iniciando servidor de desarrollo..."
echo "=================================="
echo ""
echo "📱 El frontend estará disponible en: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

npm run dev
