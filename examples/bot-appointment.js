import BotFlow from '@root/index';
import Configuration from './json/bot-appointment.json';

const instance = new BotFlow(
  {
    From: 'SenderID',
    To: 'ReceiverID'
  },
  Configuration
);

const send = async function(message, data = {}) {
  console.log(`Client:`, message);
  const response = await instance.query(message, data);
  console.log(`Server:`, response.reply);
  return response;
};

(async () => {
  // Start the chat:
  await send('Appointment', {
    appointment_time: new Date().toLocaleString()
  });

  // Send reply to the previous question from server:
  await send ('2');

})();