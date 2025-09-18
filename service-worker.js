self.addEventListener("install", (event) => {
  console.log("Service Worker instalado.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado.");
});

// Receber push do servidor
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || "🔔 Notificação", {
      body: data.body || "Mensagem recebida",
      icon: "icon.png"
    })
  );
});