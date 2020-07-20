import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('comment')
@Controller('comment')
export class CommentController { }
