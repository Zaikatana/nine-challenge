import { createServer } from "http";
import express from "express";
import articlesRoutes from "./routes/articles.route";
import tagsRoutes from "./routes/tags.route"
import { Errors } from "./errors";

const router: express.Express = express();

// Parse request
router.use(express.urlencoded({ extended: true }));
// Parse json data
router.use(express.json());

router.use((req, res, next) => {
  // Set CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // Set CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // Set CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET POST");
    return res.status(200).json({});
  }
  next();
});

// Set Routes
router.use("/articles", articlesRoutes);
router.use("/tags", tagsRoutes);

// Set behaviour for invalid URLs
router.use((req, res, next) => {
  const error = new Error(Errors.INVALID_PATH);
  return res.status(404).json({
    error: error.message,
  });
});

// Initialise Server
const server = createServer(router);
const PORT: any = process.env.PORT ?? 6060;
server.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);

export default server;
