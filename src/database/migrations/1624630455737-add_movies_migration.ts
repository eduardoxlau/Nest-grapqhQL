import {MigrationInterface, QueryRunner} from "typeorm";

export class addMoviesMigration1624630455737 implements MigrationInterface {
    name = 'addMoviesMigration1624630455737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "tagline" character varying NOT NULL, "overview" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "poster_url" character varying NOT NULL, "backdrop_url" character varying NOT NULL, "imdb_id" character varying NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password_hash" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password_hash" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
