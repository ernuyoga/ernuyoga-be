import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1789705085638 implements MigrationInterface {
    name = 'CreateUsersTable1789705085638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`access_code_hash\` varchar(64) NOT NULL, \`display_name\` varchar(100) NULL, UNIQUE INDEX \`IDX_e61f7ede36e8b1a2d9e987cbe9\` (\`access_code_hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e61f7ede36e8b1a2d9e987cbe9\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
