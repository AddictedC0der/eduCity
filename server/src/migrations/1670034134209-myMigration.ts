import { MigrationInterface, QueryRunner } from "typeorm"

export class myMigration1670034134209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const response = await queryRunner.query('ALTER TABLE maindb.task ADD COLUMN ParentWork INT, ADD CONSTRAINT fk_cat FOREIGN KEY (ParentWork) REFERENCES maindb.work(id);')
        console.log(response)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
