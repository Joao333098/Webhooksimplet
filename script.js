document.addEventListener('DOMContentLoaded', () => {
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
  const generatedCode = document.getElementById('generatedCode');

  mentionSingleRoleCheckbox.addEventListener('change', () => {
    mentionSingleRoleContainer.style.display = mentionSingleRoleCheckbox.checked ? 'block' : 'none';
  });

  embedCheckbox.addEventListener('change', () => {
    embedContentContainer.style.display = embedCheckbox.checked ? 'block' : 'none';
  });

  sendWebhookButton.addEventListener('click', async () => {
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
      content: mentionRole ? '@everyone\n' + content : content,
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
    generatedCode.innerText = formattedPayload;

    try {
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o webhook');
      }

      alert('Webhook enviado com sucesso!');
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  });

  // Mensagem de boas-vindas
  setTimeout(() => {
    alert('Bem-vindo!');
  }, 2000);
});
