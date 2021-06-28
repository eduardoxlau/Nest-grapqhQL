import { MigrationInterface, QueryRunner } from 'typeorm';

export class addVideoAndRelationWithMovie1624639893394
  implements MigrationInterface
{
  name = 'addVideoAndRelationWithMovie1624639893394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "video" ("id" SERIAL NOT NULL, "size" character varying NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "movieId" integer, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_5321e158adb1a2e78dce10e5053" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_5321e158adb1a2e78dce10e5053"`,
    );
    await queryRunner.query(`DROP TABLE "video"`);
  }
}
