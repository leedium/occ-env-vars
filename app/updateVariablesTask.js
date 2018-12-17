/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-env-vars
 * @file updateVariablesTask.js
 * @company LEEDIUM
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateUpdated 12/12/2018
 * @description
 */

const constants = require('./constants');
const restObj = require('./restObj');


const setRequestMethod = (server, authObj, itemsForUpdate, installedItems) =>
    itemsForUpdate.reduce((a, itemTobeUdated) => {
        const update = installedItems.find(installedItem => (installedItem.name === itemTobeUdated.name));
        a.push(
            restObj.apiCall(
                server,
                authObj,
                update ? constants.HTTP_METHOD_PUT : constants.HTTP_METHOD_POST,
                `${constants.OCC_API_ENDPOINT_EXTENSION_ENVIRONMENT_VARIABLES}${update ? ('/' + update.id) : ''}`,
                itemTobeUdated,
                "json",
                {},
                true
            )
        );
        return a;
    }, []);

const UpadateVariablesTask = (server, authObj, itemsToBeUpdated) => new Promise(async (resolve, reject) => {
    try {
        // 1. get the full list from the server;
        const {items} = await restObj.apiCall(
            server,
            authObj,
            'GET',
            `${constants.OCC_API_ENDPOINT_EXTENSION_ENVIRONMENT_VARIABLES}?fields=items.name,items.id`,
            null,
            "json",
            {},
            true
        );
        // 2. Run a method to assign the correct request method based on if the variable exists
        const updateResult = await Promise.all(
            setRequestMethod(server, authObj, itemsToBeUpdated, items)
        );

        console.log(`${server} - "${updateResult.map(item => item.name)}" - updated successfully`)

        resolve(updateResult)

    } catch (err) {
        reject(err);
    }
});

module.exports = UpadateVariablesTask;