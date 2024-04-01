/** @type {import('ts-jest').JestConfigWithTsJest} */
require('reflect-metadata')
const { config } = require('dotenv')

config({ path: '.env.test' })

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
}
