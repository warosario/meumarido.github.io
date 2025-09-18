const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// gere suas chaves VAPID uma vez com: npx web-push generate-vapid-keys
const publicVapidKey = "BFPmV--eH6xVPgAnKyCgEFr_k7uXtgn25KkY4sVfS4HLNh6_SLDDHpP8pIbFMEAWCu9rMPvMZ9PWieicH9oRPUg";
const privateVapidKey = "RayBBqi114I9cpYix8wmOWpzdBWj-0Ke4hY7RA_Oq08";

webpush.setVapidDetails(
  "mailto:william.rosario@gmail.com",
  publicVapidKey,
  privateVapidKey
);

let subscriptions = [];

// endpoint para salvar inscrições
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

// endpoint para enviar push
app.post("/send", async (req, res) => {
  const { title, body } = req.body;

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, JSON.stringify({ title, body }));
    } catch (err) {
      console.error("Erro ao enviar push:", err);
    }
  }
  res.json({ message: "Notificação enviada" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
