import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/entitys/category.entity";
import { TagEntity } from "src/entitys/tag.entity";
import { ContentEntity } from "src/entitys/content.entity";
import { ContentRelationEntity } from "src/entitys/content-relation.entity";
import { CommentEntity } from "src/entitys/comment.entity";
import { CategoryService } from "./service/category.service";
import { TagService } from "./service/tag.service";
import { ContentService } from "./service/content.service";
import { CommentService } from "./service/comment.service";
import { CategoryController } from "./controller/category.controller";
import { TagController } from "./controller/tag.controller";
import { ContentController } from "./controller/content.controller";
import { CommentController } from "./controller/comment.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, TagEntity, ContentEntity, ContentRelationEntity, CommentEntity])],
  controllers: [CategoryController, TagController, ContentController, CommentController],
  providers: [CategoryService, TagService, ContentService, CommentService]
})
export class BlogModule { }