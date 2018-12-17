# occ-env-vars
Tool to add/update [server extension environment variables](https://docs.oracle.com/en/cloud/saas/commerce-cloud/cxocc/api-admin-extension-server-environment-variables.html "Extension Server Environment Variables REST Endpoints") across [Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud") instances.

### Info
This application will take stored name/value pairs defined in (a json you define) and will add/update
the values in each environment. TEST, STAGING, PRODUCTION 

There is no action for deletion, to protect pre established references.


### Installation 
1. Download or clone repo.

2. Install as a global application
```
npm i -g
```

#### Configuration file (env.json)
OCCS accepts name/value pairs so add the pairings to the environment arrays of your choice, will add/update in that associated environment.
Add this configuration file your working folder.

```
{
  "test":[
    {
      "name":"env_var1",
      "value":"env_test_val"
    },
    {
      "name":"env_var2",
      "value":"env_test_val"
    }
    
  ],
  "stage":[
    {
      "name":"env_var1",
      "value":"env_stage_val"
    }
  ],
  "prod":[
    {
      "name":"env_var1",
      "value":"env_prod_val"
    }
  ]
}
```

### Instructions  
```
Usage: oev -a [testserver] -b [testusername] -c [testpassword] -d [stageserver] -e [stageusername] -f [stagepassword] -g [prodserver] -i [produsername] -j [prodpassword] -k [configpath]

Tool to help you add and update extension environment variables across instances

Options:
  -V, --version                        output the version number
  -a, --testserver <testserver>        Test server instance
  -b, --testusername <testusername>    Test Username
  -c, --testpassword <testpassword>    Test Password
  -d, --stageserver <stageserver>      Staging server instance
  -e, --stageusername <stageusername>  Staging Username
  -f, --stagepassword <stagepassword>  Staging Password
  -g, --prodserver <prodserver>        Production server instance
  -i, --prodpassword <prodpassword>    Production  Password
  -j, --prousername<produsername>      Production Username
  -k, --configpath <configpath>        Path to config file
  -h, --help                           output usage information

```

\* This tool uses username/password credentials instead of the OCC Application key due to the following error:
``` 
 { errorCode: '50001000',
        message: 'Attempt to set property named createdBy (Server Extensions Repository:Environment Variable:200019)  with value = Profile[e9c4c6c4-f55d-47fd-bfdc-efa29f1f9eda] (class=class atg.cloud.userprofiling.ProfileProxy).  This property failed due to a property type specific test.  Enable loggingDebug for details.',
        status: '500' } } }
```

In order to bypass this, provide the application the uid/pwd combinations for the environments you want updated
      



### Realated

OCC  Migration Tool (diffs) - [occ-instance-migrator](https://github.com/leedium/occ-instance-migrator "OCC instance migrator")  
OCC SSE Starter - [occ-sse-starter](https://github.com/leedium/occ-sse-starter "Serverside extension starter for Oracle Commerce Cloud")  
Standalone React components in your current UI - [occ-react-component](https://github.com/leedium/occ-react-component "OCC react component")  



### Disclaimer of Warranty.
THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.



