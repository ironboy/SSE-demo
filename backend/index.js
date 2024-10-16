import express from "express";
import Chat from "./Chat.js";
import Mailer from './Mailer.js';

const port = 5131;
const app = express();
app.use(express.json());

// Create a sse driven chat
const chat = new Chat(app);

// Route that let us send the chat content in a mail to someone
app.get('/api/email-chat-content/:to', (req, res) => {
  // Get to whom we shall send the mail from the request parameter
  const { to } = req.params;
  // Set the subject, text (plain text) and html parts of the mail
  const subject = 'The chat at ' + new Date().toLocaleString('sv-SE');
  const text = 'This is the whole chat:\n\n' +
    chat.chatMessages.map(({ timestamp, userName, text }) =>
      `${new Date(timestamp).toLocaleString('sv-SE')} ${userName}:\n${text}`).join('\n\n');
  const html = '<h3>This is the whole chat:</h3>' +
    chat.chatMessages.map(({ timestamp, userName, text }) =>
      `<p>${new Date(timestamp).toLocaleString('sv-SE')} ${userName}:<br>${text}</p>`).join('');
  // Send the mail
  Mailer.send(to, subject, text, html);
  // Answer the request
  res.send({ status: 'ok' });
});

// Start the server
app.listen(port, () => console.log('Backend running on port ' + port));