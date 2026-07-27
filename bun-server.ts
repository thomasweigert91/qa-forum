import index from "./src/index.html";

Bun.serve({
  port: 3000,

  routes: {
    "/": index,
    "/index.html": index,
  },

  development: true,
});

console.log("Server läuft auf http://localhost:3000");
