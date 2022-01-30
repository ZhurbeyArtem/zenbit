import {Injectable} from '@nestjs/common';
import {Form} from "./forms.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateFormDto} from "./dto/create-form.dto";

@Injectable()
export class FormsService {

    constructor(@InjectModel(Form) private formRepository: typeof Form) {
    }

    async createForm(dto: CreateFormDto) {
        const form = await this.formRepository.create(dto)
        return form
    }

    async getAllForms() {
        const forms = await this.formRepository.findAll()
        return forms;
    }
}
