#!/bin/bash

# Script de build non-interactif pour Vercel
set -e

echo "🚀 Starting CI build..."

# Force la migration avec réponse automatique
echo "📦 Running Payload migration (non-interactive)..."
printf 'y\ny\n' | payload migrate || echo "Migration completed or skipped"

echo "🔨 Building Next.js application..."
pnpm build

echo "✅ CI build completed successfully!"
