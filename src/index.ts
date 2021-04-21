import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { ObjectId } from "mongodb";
import { connect } from "mongoose";
import path from "path";
import { buildSchema } from "type-graphql";
import { ObjectIdScalar } from "./object-id.scalar";
import { TypegooseMiddleware } from "./typegoose-middleware";
import { UrlResolver } from "./resolvers/url";
import { openShortLink } from "./controllers/url.controller";
import * as dotenv from "dotenv";
dotenv.config();

const MONGO_DB_URL: string | any = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 4000;

const main = async () => {
  try {
    const app = express();

    //connect to the database
    const mongoose = await connect(MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.connection.on("open", () => console.log("DB CONNECTED"));

    // route to open short link
    app.get("/:random_characters", openShortLink);

    //connection with apolloserver
    const apolloServer = new ApolloServer({
      // build TypeGraphQL executable schema
      schema: await buildSchema({
        resolvers: [UrlResolver],
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        // use document converting middleware
        globalMiddlewares: [TypegooseMiddleware],
        // use ObjectId scalar mapping
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: false,
      }),
      introspection: true,
      playground: true,
    });

    apolloServer.applyMiddleware({ app, cors: false });

    //Start server
    app.listen(PORT, () => console.log("Server is now running"));
  } catch (err) {
    console.error(err);
  }
};

main().catch((err) => console.log(err));
