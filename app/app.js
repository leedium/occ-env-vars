/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-env-vars
 * @file index.js
 * @company LEEDIUM
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateUpdated 12/12/2018
 * @description
 */


const program = require("commander");
const fs = require("fs-extra");

const packageJSON = require('../package');
const occTokenGenerator = require("./occ-token-generator");

let testToken;
let stageToken;
let prodToken;


/**
 * Tasks to update variables in the Test Environment
 * @returns {Promise<any>}
 */
const upadateTest =  () => new Promise(async (resolve, reject) => {
    testToken = await occTokenGenerator.generateToken(program.testserver, program.testkey);
});

/**
 * Tasks to update variables in the Staging Environment
 * @returns {Promise<any>}
 */
const upadateStage = () =>  new Promise(async(resolve, reject) => {
    stageToken = await occTokenGenerator.generateToken(program.stageserver, program.stagekey);
});

/**
 * Tasks to update variables in the Production Environment
 * @returns {Promise<any>}
 */
const upadateProd = () =>  new Promise(async(resolve, reject) => {
    prodToken = await occTokenGenerator.generateToken(program.prodserver, program.prodkey);
});


exports.main = async (argv) => {
    program
        .version(packageJSON.version)
        .description(`Tool to help you add and update extension environment variables across instances`)
        .usage(`-a [testserver] -b [testkey] -c [stageserver] -d [stagekey] -e [productionserver] -f [productionkey] -g [path to config file]`)
        .option("-a, --testserver <testserver>", "Test server instance")
        .option("-b, --testkey <testkey>", "Test api key")
        // .option("-c, --stageserver <stageserver>", "Staging server instance")
        // .option("-d, --stagekey <stagekey>", "Staging api key")
        // .option("-e, --prodserver <prodserver>", "Production server instance")
        // .option("-f, --prodkey <stagingkey>", "Production api key")
        .option("-g, --config <config>", "Path to config file")
        .parse(argv);
    console.log(stageToken);
    
    if(typeof program.testserver !== "undefined" && program.testkey !== "undefined"){
        
    }
};






