// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
  @see https://playwright.dev/docs/test-configuration
 */
// @ts-ignore
const config = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
 timeout: 40 * 1000, //global timeout for each test
 expect:{
  timeout: 40 * 1000,//assertion timeout
 },
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'on' ,                   //'retain-on-failure',//to capture trace only on failure
    },
    reporter: 'html',

 
});
module.exports=config;

