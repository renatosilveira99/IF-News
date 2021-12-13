import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNews1639429850083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'news',
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
                        name: 'subtitle',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
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
                        name: 'fk_news_author_users',
                        columnNames: ['authorId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('news');
    }

}
