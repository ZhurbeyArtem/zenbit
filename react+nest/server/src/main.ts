import {NestFactory} from "@nestjs/core";
import {AppModules} from "./app.modules";
import {ValidatioinPipe} from "./pipes/validatioin.pipe";

async function start(){
    const PORT = process.env.PORT || 3000
    const  app = await NestFactory.create(AppModules)

    app.useGlobalPipes(new ValidatioinPipe())

    await app.listen(PORT, ()=> console.log(`server started on port = ${PORT}`))
}
start()