import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnTrailer1626960522831 implements MigrationInterface {
  name = 'addColumnTrailer1626960522831';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie" ADD "trailer_url" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "trailer_url"`);
  }
}
