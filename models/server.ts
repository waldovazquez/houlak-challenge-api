import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import requestIp from 'request-ip';

import db from '../db/config';

import albumRoutes from '../routes/album';
import authRoutes from '../routes/auth';

export default class Server {
  private app: Application;
  private port: string;
  private paths = {
    albums: '/api/albums',
    auth: '/api/'
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(requestIp.mw());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.albums, albumRoutes);
    this.app.use(this.paths.auth, authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening in port: ${this.port}`);
    });
  }
}