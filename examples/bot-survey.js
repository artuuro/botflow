const BotFlow = require('../bin');
const Configuration = require('./json/bot-survey.json');

const instance = new BotFlow(
  {
    From: 'SenderID',
    To: 'ReceiverID'
  }, 
  Configuration
);

(async () => {
  // Initial message from client:
  console.log(`---\nServer:`, await instance.query('Start'));


  // Replies to the questions
  console.log(`---\nServer:`, await instance.query('10'));
  console.log(`---\nServer:`, await instance.query('5'));
  console.log(`---\nServer:`, await instance.query('Complete!'));

  // Final state:
  console.log(`---\nSummary:`, instance.data);
})();