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

const packageJSON = require('../package');
const occTokenGenerator = require("./occ-token-generator");

exports.main = (argv) => {

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

    console.log(program)

};




