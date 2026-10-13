import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      xPoweredBy: false
    })
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  return app;
}

// Vercel: the serverless runtime needs an exported handler instead of app.listen().
// The Nest app is created once per warm instance and reused across requests.
let server: Promise<any>;

export default async function handler(req: any, res: any) {
  if (!server) {
    server = createApp().then(async (app) => {
      await app.init();
      return app.getHttpAdapter().getInstance();
    });
  }
  const instance = await server;
  return instance(req, res);
}

// Local development: start a normal HTTP server.
if (!process.env.VERCEL) {
  createApp().then((app) => app.listen(process.env.PORT || 4000));
}
