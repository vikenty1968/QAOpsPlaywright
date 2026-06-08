// @ts-nocheck
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { permission } from 'node:process';

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
const config=({
  testDir: './tests',
  retries: 2,//to retry the failed test once
 
 timeout: 40 * 1000, //global timeout for each test
 expect:{
  timeout: 40 * 1000,//assertion timeout
 },
 projects: [
  {
    name:'safari',
  use: {
    browserName: 'webkit',
    headless: false,
   viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on' ,  
  //  ...devices['iPhone 14']                 //'retain-on-failure',//to capture trace only on failure
    },

  },
    {
    name:'chrome',
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],//to allow geolocation permission asking on screen from chrome browser
    screenshot: 'only-on-failure',
    trace: 'on' ,                   //'retain-on-failure',//to capture trace only on failure
    },

  },

 ],
    reporter: 'html',

  
});
module.exports=config;

