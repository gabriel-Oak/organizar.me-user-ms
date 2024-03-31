/** @type {import('ts-jest').JestConfigWithTsJest} */
const { config } = require('dotenv')

config({ path: '.env.test' })

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
}
