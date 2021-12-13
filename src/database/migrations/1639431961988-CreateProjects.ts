import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProjects1639431961988 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'projects',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'extraLink',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'campus',
                        type: 'varchar',
                    },
                    {
                        name: 'authorId',
                        type: 'uuid',
                    },
                    {
                        name: 'coverImage',
                        type: 'varchar',
                    },
                    {
                        name: 'images',
                        type: 'varchar',
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
                        name: 'fk_projects_author_users',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['authorId'],
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projects');
    }
}
