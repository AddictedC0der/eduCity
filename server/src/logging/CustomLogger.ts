import { Logger, QueryRunner, SimpleConsoleLogger } from "typeorm";


export class CustomLogger implements Logger {
    log(level: 'warn' | 'info' | 'log', message: any, queryRunner?: QueryRunner): any {
        let color = level === 'warn' ? '\x1b[31m' : level === 'info' ? '\x1b[37m' : '\x1b[32m';
        console.log(color, `${level.toUpperCase()}: ${message}`);
    }

    logMigration(message: string, queryRunner?: QueryRunner) {
        console.log('\x1b[35m', `Migration: ${queryRunner.query}`);
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('\x1b[36m', `Query: ${query}`);
        console.log('=================')
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        console.log('\x1b[34m', 'Schema build');
    }

    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('\x1b[31m', 'Querry failed to execute');
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log('\x1b[33m', 'Slow querry executed');
    }
}