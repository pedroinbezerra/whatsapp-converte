#!/bin/bash

# Atualiza o projeto com a branch main, remove os containers antigos e rebuilda o projeto

echo "Atualizando projeto: Whatsapp converte"

git pull && docker compose down --remove-orphans && docker compose up -d --build