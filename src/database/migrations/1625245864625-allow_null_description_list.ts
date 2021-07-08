import { MigrationInterface, QueryRunner } from 'typeorm';

export class allowNullDescriptionList1625245864625
  implements MigrationInterface
{
  name = 'allowNullDescriptionList1625245864625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
