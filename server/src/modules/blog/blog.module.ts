import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "@app/modules/blog/entity/category.entity";
import { TagEntity } from "@app/modules/blog/entity/tag.entity";
import { ContentEntity } from "@app/modules/blog/entity/content.entity";
import { CommentEntity } from "@app/modules/blog/entity/comment.entity";
import { CategoryService } from "./service/category.service";
import { TagService } from "./service/tag.service";
import { ContentService } from "./service/content.service";
import { CommentService } from "./service/comment.service";
import { CategoryController } from "./controller/category.controller";
import { TagController } from "./controller/tag.controller";
import { ContentController } from "./controller/content.controller";
import { CommentController } from "./controller/comment.controller";
import { UserModule } from "@app/modules/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, TagEntity, ContentEntity, CommentEntity]), UserModule],
  controllers: [CategoryController, TagController, ContentController, CommentController],
  providers: [CategoryService, TagService, ContentService, CommentService]
})
export class BlogModule { }