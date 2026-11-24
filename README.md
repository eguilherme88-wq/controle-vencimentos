# Controle de Vencimentos

Aplicativo para controlar documentos, registros e prazos. Funciona offline depois de instalado.

**Abrir / instalar:** https://eguilherme88-wq.github.io/controle-vencimentos/

## Como instalar

| Dispositivo | Como fazer |
|---|---|
| **Windows / Linux** (Chrome, Edge, Brave) | Abra o link e clique em **Instalar app** (botão no canto da tela) ou no ícone de instalar na barra de endereço. O app vai para o Menu Iniciar / menu de aplicativos. |
| **Android** (celular ou tablet, Chrome) | Abra o link e toque em **Instalar app**, ou use o menu ⋮ → **Instalar aplicativo**. |
| **iPhone / iPad** (Safari) | Abra o link, toque em **Compartilhar** → **Adicionar à Tela de Início**. |

## Isolamento em relação aos outros apps

Todos os apps em `eguilherme88-wq.github.io` têm o mesmo endereço base, então este foi ajustado para não interferir neles:

- `id` e `scope` do manifesto: `/controle-vencimentos/`. Cada app é instalado separadamente, com ícone e nome próprios.
- O service worker só atua dentro de `/controle-vencimentos/` e só apaga caches que começam com `ctrlvenc-`.
- Os dados ficam no banco IndexedDB `controle-vencimentos`. As chaves de armazenamento local usam o prefixo `ctrlvenc`.

## Publicar uma atualização

Edite `index.html` e, em `sw.js`, aumente `VERSION` (por exemplo, `v2`) para que os aparelhos com o app instalado baixem a nova versão.
