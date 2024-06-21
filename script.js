<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Enviar Webhook</title>
</head>
<body>
  <label for="webhookURL">URL do Webhook:</label><br>
  <input type="text" id="webhookURL" placeholder="Insira a URL do seu webhook"><br><br>

  <label for="username">Nome de Usuário:</label><br>
  <input type="text" id="username" placeholder="Insira o nome de usuário"><br><br>

  <label for="avatarURL">URL do Avatar:</label><br>
  <input type="text" id="avatarURL" placeholder="Insira a URL do avatar"><br><br>

  <label for="content">Conteúdo da Mensagem:</label><br>
  <textarea id="content" placeholder="Insira o conteúdo da mensagem"></textarea><br><br>

  <label for="mentionRole">Marcar Todos:</label>
  <input type="checkbox" id="mentionRole"><br><br>

  <label for="mentionSingleRoleCheckbox">Marcar Cargo Específico:</label>
  <input type="checkbox" id="mentionSingleRoleCheckbox"><br><br>

  <div id="mentionSingleRoleContainer" style="display: none;">
    <label for="mentionSingleRole">ID do Cargo Específico:</label><br>
    <input type="text" id="mentionSingleRole"><br><br>
  </div>

  <label for="embedCheckbox">Enviar como Embed:</label>
  <input type="checkbox" id="embedCheckbox"><br><br>

  <div id="embedContentContainer" style="display: none;">
    <label for="embedTitle">Título do Embed:</label><br>
    <input type="text" id="embedTitle" placeholder="Insira o título do embed"><br><br>

    <label for="embedDescription">Descrição do Embed:</label><br>
    <textarea id="embedDescription" placeholder="Insira a descrição do embed"></textarea><br><br>

    <label for="embedColor">Cor do Embed:</label><br>
    <input type="color" id="embedColor"><br><br>

    <label for="footerText">Texto do Rodapé do Embed:</label><br>
    <input type="text" id="footerText" placeholder="Insira o texto do rodapé do embed"><br><br>

    <label for="footerIconURL">URL do Ícone do Rodapé do Embed:</label><br>
    <input type="text" id="footerIconURL" placeholder="Insira a URL do ícone do rodapé do embed"><br><br>
  </div>

  <button id="sendWebhook">Enviar Webhook</button><br><br>

  <pre id="generatedCode"></pre>

  <script>
    const sendWebhookButton = document.getElementById('sendWebhook');
    const webhookURLInput = document.getElementById('webhookURL');
    const usernameInput = document.getElementById('username');
    const avatarURLInput = document.getElementById('avatarURL');
    const contentInput = document.getElementById('content');
    const mentionRoleCheckbox = document.getElementById('mentionRole');
    const mentionSingleRoleCheckbox = document.getElementById('mentionSingleRoleCheckbox');
    const mentionSingleRoleContainer = document.getElementById('mentionSingleRoleContainer');
    const mentionSingleRoleInput = document.getElementById('mentionSingleRole');
    const embedCheckbox = document.getElementById('embedCheckbox');
    const embedContentContainer = document.getElementById('embedContentContainer');
    const embedTitleInput = document.getElementById('embedTitle');
    const embedDescriptionInput = document.getElementById('embedDescription');
    const embedColorInput = document.getElementById('embedColor');
    const footerTextInput = document.getElementById('footerText');
    const footerIconURLInput = document.getElementById('footerIconURL');

    mentionSingleRoleCheckbox.addEventListener('change', () => {
      mentionSingleRoleContainer.style.display = mentionSingleRoleCheckbox.checked ? 'block' : 'none';
    });

    embedCheckbox.addEventListener('change', () => {
      embedContentContainer.style.display = embedCheckbox.checked ? 'block' : 'none';
    });

    sendWebhookButton.addEventListener('click', () => {
      const webhookURL = webhookURLInput.value;
      const username = usernameInput.value;
      const avatarURL = avatarURLInput.value;
      const content = contentInput.value;
      const mentionRole = mentionRoleCheckbox.checked;
      const mentionSingleRole = mentionSingleRoleCheckbox.checked ? mentionSingleRoleInput.value : '';
      const embedEnabled = embedCheckbox.checked;
      const embedTitle = embedTitleInput.value;
      const embedDescription = embedDescriptionInput.value;
      const embedColor = embedColorInput.value;
      const footerText = footerTextInput.value;
      const footerIconURL = footerIconURLInput.value;

      const payload = {
        username: username,
        avatar_url: avatarURL,
        content: mentionRole ? '@everyone\n' : '' + content,
        embeds: []
      };

      if (mentionSingleRole) {
        payload.content += `<@&${mentionSingleRole}>\n`;
      }

      if (embedEnabled) {
        const embed = {
          title: embedTitle,
          description: embedDescription,
          color: parseInt(embedColor.replace('#', ''), 16),
          footer: {
            text: footerText,
            icon_url: footerIconURL
          }
        };
        payload.embeds.push(embed);
      }

      const formattedPayload = JSON.stringify(payload, null, 2);
      document.getElementById('generatedCode').innerText = formattedPayload;

      // Enviar o payload para o webhook
      fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    });

    // Script para exibir mensagem de boas-vindas após 2 segundos do carregamento da página
    window.onload = function() {
      setTimeout(function() {
        alert('Bem-vindo!');
      }, 2000); // 2 segundos de atraso
    };
  </script>
</body>
</html>