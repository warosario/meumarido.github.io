const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// gere suas chaves VAPID uma vez com: npx web-push generate-vapid-keys
const publicVapidKey = "BDvDSdmiu9NoXTP7xRmaDdpUHMfO5oFmMpXnGf8u_Uf8KBqrT-tkP94UD5_cggz2hbfE0H1VNddM3vlrVtQ0VoU";
const privateVapidKey = "vGlTQngEMj_CH-XCRMlY0QCXgaJdyz6Ph3KDINQLPfk";

webpush.setVapidDetails(
  "mailto:seuemail@dominio.com",
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
