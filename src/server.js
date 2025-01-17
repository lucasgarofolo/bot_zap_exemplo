import { create } from 'venom-bot';
import { stages, getStage } from './stages.js';

var pessoas = [];

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

function responder(cliente, from, texto) {
  cliente.sendText(from, texto).then(() => {
    console.log(`Messagem ${texto} enviada.`);
  }).catch(error => console.error('Error when sending message', error));
}


function start(client) {
  client.onMessage((message) => {
    if (!message.isGroupMsg) {

      switch (message.body) {
        case '1':  //Informações Gerais
          var info = "🌟 *Informações Gerais da Escola* 🌟 \n\n 📅 *Horário de Funcionamento:* \n Segunda a Sexta: 08h00 às 20h00 \n Sábados: 08h00 às 12h00 \n\n 📍 *Endereço:* \n Rua São Tomás, 01 - Jardim São José - Cruzeiro/SP \n\n 📞 *Telefone:* \n (12) 3141-1400 \n\n 🟢 *WhatsApp:* \n (12) 99653-2560 \n\n 🌐 *Redes Sociais e Site:* \n 🔗 Instagram: @senaicruzeiro \n 🔗 Facebook: fb.com/escolasenaicruzeiro \n 🔗 Site Oficial: https://sp.senai.br/unidade/cruzeiro/ \n\n Estamos à disposição para mais informações! 😊";
          client.sendText(message.from, info).then((result) => {
            console.log('Result: ', result); //return object success
          }).catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
          client.sendLocation(message.from, '-22.58786', '-44.97554', 'SENAI - Cruzeiro').then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
          break; 
        

        case '2':
          client
            .sendFile(
              message.from,
              './pdftest.pdf',
              'file_name',
              'Vou te mandar um pdf, dá uma olhada!'
            )
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
          break;

        case '3':
          // Send Messages with Buttons Reply
          var info = "📢 Atenção, futuros alunos! 📝✨ \n \n Para realizar a sua matrícula conosco, é super simples! Você só precisa trazer: \n\n 📄 RG e CPF ou CNH \n 🏠 Comprovante de residência \n 🎓 Comprovante de escolaridade \n\n ⚠️ Importante! Alguns cursos possuem pré-requisitos específicos, podendo exigir outros documentos adicionais. 🧐📚 \n \n 📬 Ficou com dúvidas? Estamos à disposição para ajudar! 💬😊";
          client.sendText(message.from, info).then((result) => {
            console.log('Result: ', result); //return object success
          }).catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
          break;

        case '4':
          client
            .sendLinkPreview(
              message.from,
              'https://www.policeweb.com.br',
              'Software policial para GTAV-Fivem'
            )
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
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
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
          break;

        default:
          var menu = '👋 Olá, como vai? \n\nEu sou GPT390, o *assistente virtual* do SENAI - Cruzeiro. \n* Como posso te ajudar?* 🙋‍♂️\n *Escolha uma opção de 1 a 5* \n-----------------------------------\n1️⃣ - ``Informações Gerais`` \n2️⃣ - ``Cursos Oferecidos``\n3️⃣ - ``Processo de Inscrição``\n4️⃣ - ``Contato``\n5️⃣ - ``Recado do Diretor``\n';
          client.sendText(message.from, menu).then(() => {
            console.log('Message sent.');
          }).catch(error => console.error('Error when sending message', error));
          break;
      }

    }
  });
  //0️⃣
};
