import express, { Application } from "express";
import bodyParser from "body-parser";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";
const app: Application = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(
      `
      type RootQuery{
        events:[String!]!
      }
      type RootMutation {
        createEvent(name:String):String
      }

      schema{
        query:RootQuery
        mutation:RootMutation
      }
      `
    ),

    rootValue: {
      events: () => {
        return ["baby driver"];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);
app.get("/", (req, res, next) => {
  res.send("hello,world");
});

app.listen(3000);
