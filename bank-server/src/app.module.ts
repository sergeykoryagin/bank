import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [AppService, AppGateway],
})
export class AppModule {}
