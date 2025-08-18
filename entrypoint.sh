#!/bin/sh
set -e

echo "⏳ Aguardando banco de dados em $DATABASE_URL..."

# tenta conexão até o banco responder
until bunx prisma db push --skip-generate; do
  >&2 echo "Banco ainda não está pronto, tentando novamente..."
  sleep 3
done

echo "🚀 Rodando migrations..."
bunx prisma migrate deploy
bunx prisma db seed

echo "✅ Iniciando aplicação..."
exec bun run start
