import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as expressJwt from 'express-jwt';
import { NestFactory } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { AppModule } from './app.module';

const expressApp: express.Application = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, expressApp);
  app.setGlobalPrefix('api');
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    expressJwt({ secret: process.env.JWT_SECRET || 'secret' }).unless({
      path: ['/api/user/login'],
    }),
    (error, req, res, next) => {
      if (error.name === 'UnauthorizedError') {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
    },
  );
  await app.listen(3001);
}
bootstrap();
