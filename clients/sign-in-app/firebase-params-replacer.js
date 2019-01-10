const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const target = argv.target;
const restore = argv.restore;

// Pick desired target arg
if (!target){
  console.log(`Error: please specify target environment through adding '--target' parameter. Example: --target uat, --target prod.`);
  process.exit(-1);
  return;
}

let envVarPrefix = "";
let environmentDotTsPath = "";

switch(target){
  case 'uat':
    envVarPrefix = 'UAT_';
    environmentDotTsPath = `${__dirname}${path.sep}src${path.sep}environments${path.sep}environment.uat.ts`;
    environmentDotTsPath = path.resolve(environmentDotTsPath);
    break;
  default:
}

// Read required firebase env variables
const apiKeyParam = `${envVarPrefix}FIREBASE_CLIENT_API_KEY`;
const authDomainParam = `${envVarPrefix}FIREBASE_CLIENT_AUTH_DOMAIN`;
const databaseUrlParam = `${envVarPrefix}FIREBASE_CLIENT_DATABASE_URL`; 
const projectIdParam = `${envVarPrefix}FIREBASE_CLIENT_PROJECT_ID`; 
const storageBucketParam = `${envVarPrefix}FIREBASE_CLIENT_STORAGE_BUCKET`; 
const messagingSenderIdParam = `${envVarPrefix}FIREBASE_CLIENT_MESSAGING_SENDER_ID`; 

const apiKey = process.env[apiKeyParam];
const authDomain = process.env[authDomainParam];
const databaseUrl = process.env[databaseUrlParam];
const projectId = process.env[projectIdParam];
const storageBucket = process.env[storageBucketParam];
const messagingSenderId = process.env[messagingSenderIdParam];

// console.log(`[DEBUG] - ${apiKeyParam}: ${apiKey}`);
// console.log(`[DEBUG] - ${authDomainParam}: ${authDomain}`);
// console.log(`[DEBUG] - ${databaseUrlParam}: ${databaseUrl}`);
// console.log(`[DEBUG] - ${projectIdParam}: ${projectId}`);
// console.log(`[DEBUG] - ${storageBucketParam}: ${storageBucket}`);
// console.log(`[DEBUG] - ${messagingSenderIdParam}: ${messagingSenderId}`);

// console.log(`[DEBUG] - Environment file path: ${environmentDotTsPath}`);

if ((!apiKey) || (!authDomain) || (!databaseUrl) || 
    (!projectId) || (!storageBucket) || (!messagingSenderId)){
  console.log(`Error. One of required env variables are missing.`);
  process.exit(-2);
  return;
}

function doFillEnvVariables(){  
  let content = '';
  try {
    let fileBuffer = fs.readFileSync(environmentDotTsPath);
    content = fileBuffer.toString();
    content = content.replace(apiKeyParam, apiKey);
    content = content.replace(authDomainParam, authDomain);
    content = content.replace(databaseUrlParam, databaseUrl);
    content = content.replace(projectIdParam, projectId);
    content = content.replace(storageBucketParam, storageBucket);
    content = content.replace(messagingSenderIdParam, messagingSenderId);
    // console.log(`[DEBUG] Content: \n`, content);
    fs.writeFileSync(environmentDotTsPath, content);
    fileBuffer = fs.readFileSync(environmentDotTsPath);
    content = fileBuffer.toString();
    // console.log(`[DEBUG] Modified Content: \n`, content);
  } catch(err) {
    console.log(`[ERROR] When reading or modiying target file. Details: \n`, err);
  }
}

function doRestoreEnvironmentDotTsFile(){
  let content = '';
  try {
    let fileBuffer = fs.readFileSync(environmentDotTsPath);
    content = fileBuffer.toString();
    content = content.replace(apiKey, apiKeyParam);
    content = content.replace(authDomain, authDomainParam);
    content = content.replace(databaseUrl, databaseUrlParam);
    content = content.replace(projectId, projectIdParam);
    content = content.replace(storageBucket, storageBucketParam);
    content = content.replace(messagingSenderId, messagingSenderIdParam);
    // console.log(`[DEBUG] Content: \n`, content);
    fs.writeFileSync(environmentDotTsPath, content);
    fileBuffer = fs.readFileSync(environmentDotTsPath);
    content = fileBuffer.toString();
    // console.log(`[DEBUG] Modified Content: \n`, content);
  } catch(err) {
    // console.log(`[ERROR] When reading or modiying target file. Details: \n`, err);
  }  
}

if (!restore) {
  doFillEnvVariables();
} else {
  doRestoreEnvironmentDotTsFile();
}


