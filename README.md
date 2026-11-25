# Controle de Vencimentos

Aplicativo para controlar documentos, registros e prazos. Funciona offline depois de instalado.

**Abrir / instalar:** https://eguilherme88-wq.github.io/controle-vencimentos/

## Como instalar

| Dispositivo | Como fazer |
|---|---|
| **Windows / Linux** (Chrome, Edge, Brave) | Abra o link e clique em **Instalar app** (botão no canto da tela) ou no ícone de instalar na barra de endereço. O app vai para o Menu Iniciar / menu de aplicativos. |
| **Android** (celular ou tablet, Chrome) | Abra o link e toque em **Instalar app**, ou use o menu ⋮ → **Instalar aplicativo**. |
| **iPhone / iPad** (Safari) | Abra o link, toque em **Compartilhar** → **Adicionar à Tela de Início**. |

## Banco de dados na nuvem (Firebase)

Os dados ficam no Cloud Firestore do projeto Firebase `controle-vencimentos-19862` (região São Paulo, plano gratuito Spark) e aparecem iguais em todos os aparelhos.

- **Conta da nuvem:** cada aparelho é conectado uma vez com e-mail e senha (Firebase Authentication). O e-mail precisa ser confirmado pelo link enviado.
- **Quem tem acesso:** `eguilherme88@gmail.com` sempre tem acesso. Outros e-mails são liberados pelo administrador em **Configurações → Backup e nuvem**.
- **Usuários do sistema:** depois de conectar o aparelho, cada pessoa entra com o próprio usuário do sistema (perfis Administrador, Master e Usuário, como antes).
- **Dados antigos:** se o aparelho já tinha dados salvos e a nuvem estiver vazia, o sistema oferece enviá-los para a nuvem.
- **Anexos:** ficam no próprio Firestore, em partes (até 5 MB por arquivo), porque o Cloud Storage exige o plano pago.
- **Sem internet:** o app continua funcionando com a cópia local e envia as alterações quando a conexão voltar.
- **Regras de segurança:** estão em `firestore.rules` (cópia do que foi publicado no console).
- **Sem nuvem:** na tela de conexão existe a opção "Usar sem nuvem, só neste aparelho".

## Isolamento em relação aos outros apps

Todos os apps em `eguilherme88-wq.github.io` têm o mesmo endereço base, então este foi ajustado para não interferir neles:

- `id` e `scope` do manifesto: `/controle-vencimentos/`. Cada app é instalado separadamente, com ícone e nome próprios.
- O service worker só atua dentro de `/controle-vencimentos/` e só apaga caches que começam com `ctrlvenc-`.
- Os dados ficam no banco IndexedDB `controle-vencimentos`. As chaves de armazenamento local usam o prefixo `ctrlvenc`.

## Publicar uma atualização

Edite `index.html` e, em `sw.js`, aumente `VERSION` (por exemplo, `v2`) para que os aparelhos com o app instalado baixem a nova versão.
