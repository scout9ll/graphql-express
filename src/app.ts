import express, { Application } from "express";
import bodyParser from "body-parser";
import graphqlHttp from "express-graphql";

const app: Application = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema: null,
    rootValue: {}
  })
);
app.get("/", (req, res, next) => {
  res.send("hello,world");
});

app.listen(3000);
