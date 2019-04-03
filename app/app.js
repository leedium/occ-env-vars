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
const upath = require("upath");

const packageJSON = require('../package');
const updateVariablesTask = require('./updateVariablesTask');

exports.main = async (argv) => {

    // Array to store the promise tasks. this will be Async
    const taskArray = [];
    let counter = 0;

    program
        .version(packageJSON.version)
        .description(`Tool to help you add and update extension environment variables across instances`)
        .usage(`-a [testserver] -b [testusername] -c [testpassword] -d [stageserver] -e [stageusername] -f [stagepassword] -g [prodserver] -i [produsername] -j [prodpassword] -k [configpath]`)
        .option("-a, --testserver <testserver>", "Test server instance")
        .option("-b, --testusername <testusername>", "Test Username")
        .option("-c, --testpassword <testpassword>", "Test Password")
        .option("-d, --stageserver <stageserver>", "Staging server instance")
        .option("-e, --stageusername <stageusername>", "Staging Username")
        .option("-f, --stagepassword <stagepassword>", "Staging Password")
        .option("-g, --prodserver <prodserver>", "Production server instance")
        .option("-i, --prodpassword <prodpassword>", "Production  Password")
        .option("-j, --produsername <produsername>", "Production Username")
        .option("-k, --configpath <configpath>", "Path to config file")
        .parse(argv);

    try {
        if (typeof program.configpath === 'undefined' || program.configpath === null) {
            throw new Error('You are missing the path to the config file. Please add the --configpath option and the reference to your configuration file');
        }

        console.log('\n');
        console.log('Server Extension Variables updating...');

        const {test, stage, prod} = fs.readJsonSync(upath.resolve(program.configpath));

        // Test
        if (typeof program.testserver !== "undefined" && program.testusername !== "undefined" &&  typeof program.testpassword !== "undefined" ) {
            taskArray.push(updateVariablesTask(program.testserver,{
                username: program.testusername,
                password: program.testpassword
            }, test));
            counter += 1;
        }

        // Stage
        if (typeof program.stageserver !== "undefined" && program.stageusername !== "undefined" &&  typeof program.stagepassword !== "undefined" ) {
            taskArray.push(updateVariablesTask(program.stageserver,{
                username: program.stageusername,
                password: program.stagepassword
            }, stage));
            counter += 1;
        }

        // Prod
        if (typeof program.prodserver !== "undefined" && typeof program.produsername !== "undefined" && typeof program.prodpassword !== "undefined" ) {
            taskArray.push(updateVariablesTask(program.prodserver,{
                username: program.produsername,
                password: program.prodpassword
            }, prod));
            counter += 1;

        }
        const finalResult = await Promise.all(taskArray);
        console.log(`${counter}/${taskArray.length} Environments updated successfully. \n`);

    } catch(err){
        console.log(err);
    }
};






