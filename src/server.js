import { create } from 'venom-bot';
// import { stages, getStage } from './stages.js';

var userStates = {};
var boasvindas = '👋 Olá, como vai? \n\nEu sou GPT390, o *assistente virtual* do SENAI - Cruzeiro. \n* Como posso te ajudar?* 🙋‍♂️\n \n'
var menu = '*Escolha uma opção de 1 a 5* \n-----------------------------------\n1️⃣ - `Informações Gerais` \n2️⃣ - `Localização` \n3️⃣ - `Cursos Oferecidos`  \n4️⃣ - `Documentos de Matrícula` \n5️⃣ - `Recado do Diretor` \n';

create({
  session: 'store',
  multidevice: true,
  headless: false,
})
  .then((client) => start(client))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// function responder(cliente, from, texto) {
//   cliente.sendText(from, texto).then(() => {
//     console.log(`Messagem ${texto} enviada.`);
//   }).catch(error => console.error('Error when sending message', error));
// }


function start(client) {
  client.onMessage((message) => {
    if (!message.isGroupMsg) {
      const userId = message.from;
      const userState = userStates[userId] || {};

      if (userState.submenu === 'courses') {
        console.log(userState.submenu);
        handleSubmenuCourses(client, message, userState);
      } else {
        console.log(userState.submenu);
        handleMainMenu(client, message, userState);
      }

      userStates[userId] = userState; // Save the updated state
    }
  });
}

function handleMainMenu(client, message, userState) {
  switch (message.body) {
    case '1':  //Informações Gerais
      var info = "🌟 *Informações Gerais da Escola* 🌟 \n\n 📅 *Horário de Funcionamento:* \n Segunda a Sexta: 08h00 às 20h00 \n Sábados: 08h00 às 12h00 \n\n 📍 *Endereço:* \n Rua São Tomás, 01 - Jardim São José - Cruzeiro/SP \n\n 📞 *Telefone:* \n (12) 3141-1400 \n\n 🟢 *WhatsApp:* \n (12) 99653-2560 \n\n 🌐 *Redes Sociais e Site:* \n 🔗 Instagram: @senaicruzeiro \n 🔗 Facebook: fb.com/escolasenaicruzeiro \n 🔗 Site Oficial: https://sp.senai.br/unidade/cruzeiro/ \n\n Estamos à disposição para mais informações! 😊";
      client.sendText(message.from, info)
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, menu);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '2':
      client.sendLocation(message.from, '-22.58786', '-44.97554', 'SENAI - Cruzeiro')
        .then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      client.sendText(message.from, menu)
        .then((result) => { 
          console.log('Result: ', result); 
        }).catch((erro) => { 
          console.error('Error when sending: ', erro); 
      });
      break;

    case '3':
      var info = "Escolha sua área e transforme seu futuro! 🌟 \n \n 1️⃣ Automação e Mecatrônica – Explore a inovação e a inteligência das máquinas! 🤖⚙️ \n 2️⃣ Eletricidade – Energize seu futuro e domine os circuitos do conhecimento! ⚡🔌\n 3️⃣ Informática – Desvende o mundo digital e programe seu sucesso! 💻🚀 \n 4️⃣ Metalmecânica – Dê forma às suas ideias com precisão e tecnologia! 🏗️🔩 \n 5️⃣ Metalurgia – Transforme metais e construa um futuro sólido! 🔥🔧 \n 6️⃣ Saúde e Segurança do Trabalho – Proteja vidas e construa ambientes mais seguros! 🏥🦺 \n 🔙 Digite 0 para voltar ao menu principal. \n \n💡 Escolha sua área preferida e venha aprender com a gente! Responda com o número da sua opção e receba mais informações. 📩✨ ";
      client.sendText(message.from, info).then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      userState.submenu = 'courses'; // Set submenu state
      break;

    case '4':
      var info = "📢 Atenção, futuros alunos! 📝✨ \n \n Para realizar a sua matrícula conosco, é super simples! Você só precisa trazer: \n\n 📄 RG e CPF ou CNH \n 🏠 Comprovante de residência \n 🎓 Comprovante de escolaridade \n\n ⚠️ Importante! Alguns cursos possuem pré-requisitos específicos, podendo exigir outros documentos adicionais. 🧐📚 \n \n 📬 Ficou com dúvidas? Estamos à disposição para ajudar! 💬😊";
      client.sendText(message.from, info).then((result) => {
        console.log('Result: ', result); //return object success
        return client.sendText(message.from, menu);
      }).then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    case '5':
      client
        .sendImage(
          message.from,
          './lucas.jpg',
          'image-name',
          'O dia que fui na casa do Steve!'
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, menu);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    default:
      var inicio = boasvindas + menu;
      client.sendText(message.from, inicio).then((result) => {
        console.log('Message sent.');
      }).catch(error => console.error('Error when sending message', error));
      break;
  }
}

function handleSubmenuCourses(client, message, userState) {
  switch (message.body) {
    case '1':
      client.sendText(message.from, 'Você escolheu Automação e Mecatrônica! 🤖⚙️').then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    case '2':
      client.sendText(message.from, 'Você escolheu Eletricidade! ⚡🔌').then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    case '3':
      client.sendText(message.from, 'Você escolheu Informática! 💻🚀').then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    case '4':
      client.sendText(message.from, 'Você escolheu Metalmecânica! 🏗️🔩').then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    case '5':
      client.sendText(message.from, 'Você escolheu Metalurgia! 🔥🔧').then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    case '6':
      client.sendText(message.from, 'Você escolheu Saúde e Segurança do Trabalho! 🏥🦺').then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    case '0':
      userState.submenu = undefined; // Reset submenu state
      client.sendText(message.from, menu).then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;

    default:
      client.sendText(message.from, 'Opção inválida. Por favor, escolha um número de 1 a 6.').then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;
  }
}