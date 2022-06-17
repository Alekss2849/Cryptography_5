import {config} from './config';
import express from 'express';

import {sequelize} from "./database/config/config";
import cors from 'cors';

const app: express.Express = express();

app.use(cors({origin: true}));

app.use(express.json({limit: '7mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static("static"));

try {
  sequelize.authenticate();
  console.log(`backend at ${new Date} [app.ts]:  Connection has been established successfully.`);
} catch (error) {
  console.log(`backend at ${new Date} [app.ts]: Unable to connect to the database:`, error);
}

app.listen(config.port, function () {
  console.log(`backend at ${new Date} [app.ts]: server listening on port: ${config.port} and ${process.env.NODE_ENV}`
  );
});

export default app;
