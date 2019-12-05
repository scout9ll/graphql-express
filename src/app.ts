import express, { Application } from "express";
import bodyParser from "body-parser";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";
const app: Application = express();

const events = [];
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(
      `
      type Event{
        _id:ID!
        title:String!
        description:String!
        price:Float!
        date:String!  
      }
      input EventInput{
        title:String!
        description:String!
        price:Float!
        date:String!
      }
      type RootQuery{
        events:[Event!]!
      }
      type RootMutation {
        createEvent(eventInput:EventInput):Event
      }

      schema{
        query:RootQuery
        mutation:RootMutation
      }
      `
    ),

    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.description,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);
app.get("/", (req, res, next) => {
  res.send("hello,world");
});

app.listen(3000);
