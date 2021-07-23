import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCascadeRuleAndAddRelationToMoviesSeen1627067421382
  implements MigrationInterface
{
  name = 'addCascadeRuleAndAddRelationToMoviesSeen1627067421382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movies_seen_by_user" ("userId" integer NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_bce44cffe7557059dc665d0f2e7" PRIMARY KEY ("userId", "movieId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_79640bc023992252728a27d9f0" ON "movies_seen_by_user" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5faed845124fb6ead9f18011ba" ON "movies_seen_by_user" ("movieId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_seen_by_user" ADD CONSTRAINT "FK_79640bc023992252728a27d9f00" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_seen_by_user" ADD CONSTRAINT "FK_5faed845124fb6ead9f18011ba6" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies_seen_by_user" DROP CONSTRAINT "FK_5faed845124fb6ead9f18011ba6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_seen_by_user" DROP CONSTRAINT "FK_79640bc023992252728a27d9f00"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_5faed845124fb6ead9f18011ba"`);
    await queryRunner.query(`DROP INDEX "IDX_79640bc023992252728a27d9f0"`);
    await queryRunner.query(`DROP TABLE "movies_seen_by_user"`);
  }
}
