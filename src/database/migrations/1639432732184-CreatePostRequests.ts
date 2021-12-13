import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostRequests1639432732184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'post_requests',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'authorId',
                        type: 'uuid',
                    },
                    {
                        name: 'approverId',
                        type: 'uuid',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'newsId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'projectId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_post_requests_authorId_users',
                        columnNames: ['authorId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                    },
                    {
                        name: 'fk_post_requests_approverId_users',
                        columnNames: ['approverId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                    },
                    {
                        name: 'fk_post_requests_newsId_news',
                        columnNames: ['newsId'],
                        referencedTableName: 'news',
                        referencedColumnNames: ['id'],
                    },
                    {
                        name: 'fk_post_requests_projectId_projects',
                        columnNames: ['projectId'],
                        referencedTableName: 'projects',
                        referencedColumnNames: ['id'],
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('post_requests');
    }

}
