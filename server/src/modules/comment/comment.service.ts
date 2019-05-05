import { Injectable } from '@nestjs/common';
import { CommentDto } from './comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { PaginationDto } from '@app/common/pagination.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentEntity: Repository<CommentEntity>,
  ) {}

  async addComment(dto: CommentDto) {
    if (dto.parentId) {
      await this.commentEntity.findOneOrFail(dto.parentId);
    }
    return this.commentEntity.save(this.commentEntity.create(dto));
  }

  getComments(aid: number, pagination: PaginationDto) {
    return this.commentEntity
      .createQueryBuilder('comment')
      .leftJoinAndMapMany('comment.children', CommentEntity, 'children', 'children.parent_id=comment.id')
      .where('comment.aid=:aid', { aid })
      .andWhere('comment.parent_id is null')
      .skip((pagination.page - 1) * pagination.size)
      .take(pagination.size)
      .orderBy('comment.ctime', 'DESC')
      .getManyAndCount()
      .then(([list, count]) => {
        return {
          list,
          pagination: {
            page: pagination.page * 1,
            size: pagination.size * 1,
            count: count * 1,
          },
        };
      });
  }
}
