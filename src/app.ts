import express, { Application } from "express";
import bodyParser from "body-parser";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import Event from './models/event'
const app: Application = express();

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
        return Event.find().then(
          events => {
            return events.map(event => {
              return event
            }
            )
          }
        ).catch(err => console.log(err)
        );
      },
      createEvent: args => {
        const event = new Event(
          {
            title: args.eventInput.description,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date
          }
        )
        return event.save().then(
          result => {
            console.log(result);
            return result
          }
        ).catch(
          err => {
            throw err;
          }
        )
      }
    },
    graphiql: true
  })
);

mongoose.connect(
  `mongodb+srv://test:87955626@music-6epxh.mongodb.net/ge_test?retryWrites=true&w=majority`
).then(() => {
  app.listen(3000);
}).catch(err => {
  console.log(err);

})

app.get("/", (req, res, next) => {
  res.send("hello,world");
});

