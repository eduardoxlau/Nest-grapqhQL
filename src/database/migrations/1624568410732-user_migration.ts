import { MigrationInterface, QueryRunner } from 'typeorm';

export class userMigration1624568410732 implements MigrationInterface {
  name = 'userMigration1624568410732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "full_name" character varying NOT NULL, "photo_path" character varying NOT NULL, "password_salt" character varying NOT NULL, "password_hash" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
