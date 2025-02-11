import { create } from 'venom-bot';

var userStates = {};
var boasvindas = '👋 Olá, como vai? \n\nEu sou GPT390, o *assistente virtual* do SENAI - Cruzeiro. \n *Como posso te ajudar?* 🙋‍♂️\n \n'
var menu = '*Escolha uma opção de 1 a 4* \n-----------------------------------\n1️⃣ - `Informações Gerais` \n2️⃣ - `Localização` \n3️⃣ - `Cursos Oferecidos`  \n4️⃣ - `Documentos de Matrícula` \n ' // 5️⃣ - `Recado do Diretor` \n';
var cursos = `📢 *Cursos com Matrículas Abertas!* 📢 \nConfira as áreas disponíveis e escolha a que mais combina com você: \n \n0️⃣ **Voltar ao Menu Principal** 🔙\n1️⃣ *Comandos Elétricos* ⚡\n2️⃣ *Ajustador Mecânico* 🔧\n3️⃣ *CLP - Controladores Lógicos Programáveis* 🖥️\n4️⃣ *Eletricista Instalador* 💡\n5️⃣ *Ferramenteiraria* 🔩\n6️⃣ *Informática Básica* 🖥️\n7️⃣ *Inspetor de Qualidade*  📊\n8️⃣ *NR11 - Operador de Ponte Rolante* 🏗️\n9️⃣ *NR11 - Operador de Empilhadeira* 🚜\n🔟 *Operador de Centro de Usinagem CNC* ⚙️\n1️⃣1️⃣ *Operador de Torno CNC* 🔄\n1️⃣2️⃣ *Máquinas de Usinagem Convencional* 🏭\n1️⃣3️⃣ *Prensa Industrial* 🏗️\n1️⃣4️⃣ *Soldador ao Arco Elétrico e Oxigás* 🔥 \n 0 para voltar ao Menu Principal \n\n ✅ *Vagas limitadas!*  \n 📅 *Matrículas abertas por tempo limitado!* `;

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
        handleSubmenuCourses(client, message, userState, userId);
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
      var info = "🌟 *Informações Gerais da Escola* 🌟 \n\n 📅 *Horário de Funcionamento:* \n Segunda a Sexta: 08h00 às 20h00 \n Sábados: 08h00 às 12h00 \n\n 📍 *Endereço:* \n Rua São Tomás, 01 - Jardim São José - Cruzeiro/SP \n\n 📞 *Telefone:* \n (12) 3141-1400 \n\n 🟢 *WhatsApp (atendimento humano, pode demorar um pouco mais):* \n (12) 99653-2560 \n\n 🌐 *Redes Sociais e Site:* \n 🔗 Instagram: @senaicruzeiro \n 🔗 Facebook: fb.com/escolasenaicruzeiro \n 🔗 Site Oficial: https://sp.senai.br/unidade/cruzeiro/ \n\n Estamos à disposição para mais informações! 😊";
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
      client.sendText(message.from, cursos).then((result) => {
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

    // case '5':
    //   client
    //     .sendImage(
    //       message.from,
    //       './lucas.jpg',
    //       'image-name',
    //       'O dia que fui na casa do Steve!'
    //     )
    //     .then((result) => {
    //       console.log('Result: ', result); //return object success
    //       return client.sendText(message.from, menu);
    //     }).then((result) => {
    //       console.log('Result: ', result); //return object success
    //     }).catch((erro) => {
    //       console.error('Error when sending: ', erro); //return object error
    //     });
    //   break;

    default:
      var inicio = boasvindas + menu;
      client.sendText(message.from, inicio).then((result) => {
        console.log('Message sent.');
      }).catch(error => console.error('Error when sending message', error));
      break;
  }
}

function handleSubmenuCourses(client, message, userState, userId) {
  var info = 'Veja todas as informações sobre o curso através desse link';
  switch (message.body) {
    case '1':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=Comandos&pag=1',
          'Comandos elétricos',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '2':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=Ajustador%20&pag=1',
          'Ajustador Mecânico',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '3':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=Controladores&pag=1',
          'Controladores Lógicos Programáveis',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '4':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=Eletricista&pag=1',
          'Eletricista Instalador',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '5':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=Ferramenteiro%20de%20corte&pag=1',
          'Ferramentaria',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '6':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=INFORM%C3%81TICA&pag=1',
          'Informática Básica',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '7':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=iNSPETOR%20DE%20QUALIDADE&pag=1',
          'Inspetor de Qualidade',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '8':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=PONTE&pag=1',
          'NR11 - Operaçao de Ponte Rolante',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '9':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=EMPILHADEIRA&pag=1',
          'NR11 - Operaçao de Empilhadeira',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '10':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=CENTRO%20DE%20USINAGEM&pag=1',
          'Operador de Centro de Usinagem CNC',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '11':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=TORNO%20CNC&pag=1',
          'Operador de Torno CNC',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '12':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=OPERADOR%20DE%20M%C3%81QUINAS%20DE%20USINAGEM%20CONVENCIONAIS&pag=1',
          'Operador de Máquinas de Usinagem Convencional',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '13':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=PRENSA&pag=1',
          'Operador de Prensa Industrial',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
          console.log('Result: ', result); //return object success
        }).catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      break;

    case '14':
      client
        .sendLinkPreview(
          userId,
          'https://sp.senai.br/cursos/0/0?unidade=390&pesquisa=SOLDADOR&pag=1',
          'Soldador ao Arco Elétrico e Oxigás',
          info
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          return client.sendText(message.from, cursos);
        }).then((result) => {
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
      client.sendText(message.from, 'Opção inválida. Por favor, escolha um número de 1 a 15.').then((result) => {
        console.log('Result: ', result); //return object success
        return client.sendText(message.from, menu);
      }).then((result) => {
        console.log('Result: ', result); //return object success
      }).catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      break;
  }
}