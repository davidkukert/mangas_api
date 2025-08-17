# Imagem oficial do Bun (já vem com bun instalado)
FROM oven/bun

RUN apt-get update -y && apt-get install -y openssl

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando arquivos de configuração
COPY bun.lock package-lock.json package.json ./

# Instalando dependências
RUN bun install --frozen-lockfile --production

# Copiando o restante dos arquivos
COPY . .

RUN rm .env

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

# Gera o cliente Prisma (necessário para runtime)
RUN bunx prisma generate

# Compilando o projeto
RUN bun run build

EXPOSE 3333

# Comando de inicialização
CMD ["bun", "run", "start"]