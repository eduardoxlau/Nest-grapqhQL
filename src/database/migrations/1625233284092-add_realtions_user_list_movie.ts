import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRealtionsUserListMovie1625233284092
  implements MigrationInterface
{
  name = 'addRealtionsUserListMovie1625233284092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "public" boolean NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "list_movies_movie" ("listId" integer NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_81b86d09d75f328dc95eedd1169" PRIMARY KEY ("listId", "movieId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aad160d9d06c86f1455b8d3c80" ON "list_movies_movie" ("listId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_595ee24787d67ad815931302ff" ON "list_movies_movie" ("movieId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_movies_movie" ADD CONSTRAINT "FK_aad160d9d06c86f1455b8d3c802" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_movies_movie" ADD CONSTRAINT "FK_595ee24787d67ad815931302ff0" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list_movies_movie" DROP CONSTRAINT "FK_595ee24787d67ad815931302ff0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_movies_movie" DROP CONSTRAINT "FK_aad160d9d06c86f1455b8d3c802"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_46ded14b26382088c9f032f8953"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_595ee24787d67ad815931302ff"`);
    await queryRunner.query(`DROP INDEX "IDX_aad160d9d06c86f1455b8d3c80"`);
    await queryRunner.query(`DROP TABLE "list_movies_movie"`);
    await queryRunner.query(`DROP TABLE "list"`);
  }
}
