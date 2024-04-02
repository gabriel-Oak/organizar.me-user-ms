import 'reflect-metadata';
import { config } from 'dotenv';

config({
  path: '.env'
});

jest.setTimeout(30000);
