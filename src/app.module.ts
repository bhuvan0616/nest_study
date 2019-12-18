import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb+srv://bhuvan:bhuvan123456@bhuvan-hukj2.mongodb.net/test',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {
}
