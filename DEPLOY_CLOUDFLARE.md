# Deploy no Cloudflare Workers

## Pré-requisitos

- Node.js 20+ (recomendado 22+)
- Conta Cloudflare autenticada no Wrangler
- Dependências instaladas (`npm install` ou `corepack pnpm install`)

## 1) Login no Cloudflare

```bash
npx wrangler login
```

## 2) (Opcional) Gerar tipos do ambiente Cloudflare

```bash
npm run cf-typegen
```

Isso gera `cloudflare-env.d.ts` com os bindings definidos no `wrangler.jsonc`.

## 3) Validar build para Workers

```bash
npm run deploy:dry
```

Esse comando faz:

1. build do Next.js + OpenNext
2. validação do deploy com `wrangler deploy --dry-run` (sem publicar)

## 4) Publicar em produção

```bash
npm run deploy
```

## Secrets e variáveis

- Secrets sensíveis:

```bash
npx wrangler secret put NOME_DA_SECRET
```

- Variáveis de build/runtime no Workers Builds:
  - configure no painel da Cloudflare em **Build Variables and secrets**
  - inclua tanto variáveis `NEXT_PUBLIC_*` quanto privadas usadas no build

## Observações importantes (Windows + OpenNext)

- O OpenNext pode falhar no Windows com erro de `symlink` (`EPERM`) dependendo das permissões.
- Este projeto usa `.npmrc` com `node-linker=hoisted` para reduzir esse problema quando usar `pnpm`.
- Se ainda ocorrer erro no build local, rode pelo WSL ou faça deploy via CI Linux.
- Nome do Worker: `taina-aci` (em `wrangler.jsonc`).
