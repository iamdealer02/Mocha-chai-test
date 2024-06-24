import dotenv, { DotenvParseOutput, DotenvConfigOutput } from 'dotenv';

const result: DotenvConfigOutput = dotenv.config({ path: `.env.${process.env.NODE_ENV}` || '.env.dev' });

if (result.error) {
    throw result.error;
}

const envs: DotenvParseOutput = result.parsed as DotenvParseOutput;

export default envs;
