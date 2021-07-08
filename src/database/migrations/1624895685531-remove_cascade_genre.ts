import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeCascadeGenre1624895685531 implements MigrationInterface {
  name = 'removeCascadeGenre1624895685531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie_genres_genre" ("movieId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_aee18568f9fe4ecca74f35891af" PRIMARY KEY ("movieId", "genreId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_1996ce31a9e067304ab168d6715"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_1996ce31a9e067304ab168d671"`);
    await queryRunner.query(`DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"`);
    await queryRunner.query(`DROP TABLE "movie_genres_genre"`);
  }
}
