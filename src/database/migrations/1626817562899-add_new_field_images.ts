import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNewFieldImages1626817562899 implements MigrationInterface {
  name = 'addNewFieldImages1626817562899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movie" ADD "stars" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "movie" ADD "card_url" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "card_url"`);
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "stars"`);
  }
}
