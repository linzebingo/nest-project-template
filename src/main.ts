import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

// 端口号读取环境变量，用于兼容容器启动时会指定端口号
const port = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  // see https://github.com/helmetjs/helmet#how-it-works
  app.use(helmet());

  // 压缩可以大大减小响应主体的大小，从而提高 Web 应用程序的速度。使用压缩中间件启用 gzip 压缩。
  // see https://github.com/expressjs/compression
  app.use(compression());

  // 支持跨域访问
  app.enableCors();

  // 所有接口增加前缀 /api
  app.setGlobalPrefix('/api');

  // public 文件夹下的文件作为静态资源
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(port);
}

bootstrap();
