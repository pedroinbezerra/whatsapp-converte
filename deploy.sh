#!/bin/bash

# Atualiza o projeto com a branch main, remove os containers antigos e rebuilda o projeto

echo "Atualizando projeto: Whatsapp converte"

git pull origin main && pnpm i && pnpm build && rm -rf node-modules && docker compose down --remove-orphans && docker compose up -d --build
