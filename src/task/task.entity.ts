import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskPriority } from './task.enum';
import { TaskStatus } from './task.enum';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    dueDate: Date;

    @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
    priority: TaskPriority;

    @Column()
    assignee: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
