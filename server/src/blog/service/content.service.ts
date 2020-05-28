import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentEntity } from "@app/blog/entity/content.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContentService {

  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentEntity: Repository<ContentEntity>
  ) { }

  getList() { }

}
