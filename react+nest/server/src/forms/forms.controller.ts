import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {FormsService} from "./forms.service";
import {CreateFormDto} from "./dto/create-form.dto";

@Controller('forms')
export class FormsController {
    constructor(private formService: FormsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() formDto: CreateFormDto){
        return this.formService.createForm(formDto)
    }

    @Get()
    getAll(){
        return this.formService.getAllForms()
    }

}
