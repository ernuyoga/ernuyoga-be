import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1790591536412 implements MigrationInterface {
    name = 'CreateUsersTable1790591536412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`auth_code\` varchar(64) NOT NULL, UNIQUE INDEX \`IDX_f29585be194ec07cc328404312\` (\`auth_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f29585be194ec07cc328404312\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
