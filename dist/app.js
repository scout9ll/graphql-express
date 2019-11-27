"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = require("body-parser");
var graphqlHttp = require("express-graphql");
var app = express_1.default();
app.use(bodyParser.json());
app.use("/graphql", graphqlHttp({
    schema: null,
    rootValue: {}
}));
app.get("/", function (req, res, next) {
    res.send("hello,world");
});
app.listen(3000);
