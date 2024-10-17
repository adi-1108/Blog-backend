const corsOptions = {
  origin: "https://blog-omega-blond.vercel.app",
  methods: "GET,PUT,POST,DELTE,PATCH,HEAD",
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOptions;
