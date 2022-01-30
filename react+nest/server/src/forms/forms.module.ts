import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Form} from "./forms.model";

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports:[
      SequelizeModule.forFeature([Form])
  ]
})
export class FormsModule {}
