import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnMoveidInVideo1624652383208 implements MigrationInterface {
  name = 'addColumnMoveidInVideo1624652383208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_5321e158adb1a2e78dce10e5053"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "movieId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_5321e158adb1a2e78dce10e5053" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_5321e158adb1a2e78dce10e5053"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "movieId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_5321e158adb1a2e78dce10e5053" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
