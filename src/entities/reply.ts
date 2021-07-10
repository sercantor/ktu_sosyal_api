import {
  BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post';

@Entity('replies')

export class Reply extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({
      type: 'text',
    })
    content: string;

    @CreateDateColumn({
      type: 'timestamp',
    })
  created: string;

    @ManyToOne(() => Post, (Posts) => Posts.replies, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    posts: Post;
}
