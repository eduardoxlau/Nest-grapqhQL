import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnIsAdminUser1625758254630 implements MigrationInterface {
  name = 'addColumnIsAdminUser1625758254630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
  }
}
