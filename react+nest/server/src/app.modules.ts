import {Module} from "@nestjs/common";

import {SequelizeModule} from "@nestjs/sequelize";
import {FormsModule} from "./forms/forms.module";
import {ConfigModule} from "@nestjs/config";
import {Form} from "./forms/forms.model";

@Module({
    controllers: [],
    providers:[],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) ,
            username: process.env.DB_USER ,
            password: process.env.DB_PASSWORD ,
            database: process.env.DB_NAME ,
            models: [Form],
            autoLoadModels: true
        }),
        FormsModule
    ]
})
export class AppModules {

}