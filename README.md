# TS-Omni Monorepo

### _Initial Setup_

This will install the dependencies in the root node_modules as well as each node_module specific to each subrepo (i.e. package repo).

```sh
npm run install:all
```

The **postinstall script** in root will run npx lerna link to ensure linking occurs. _Patch-Package does not work_ well in monorepos as all dependencies are hoisted to root --and therefore will throw an error as the patch will not find the patch-package node_module

## Scaffold a Repo fast

In order to save time, you can generate a skeleton repo with the basic folder & file structure needed. This will insert your new-service in the packages directory.

Generate scaffold of new NestJS monorepo by running **note that new services or repos should follow cabob case!**

```sh
npm run scaffold <some-service>
```

then run:

```sh
npm run format
```

**Note on additional benefit**

> By generating your repo quickly,
> your new repo also installs the repo-wide versions of nestjs and deps
> so we do not have multiple versions between packages.

The folder structre uses the aggregate exports in the src/index.ts file.
The commands above will generates the following folder & file Structure quickly

```
packages
└───some-service
    └───src
    │   | └──index.ts
    │   │
    │   lib
    │    └──index.ts
    │
    │
    └───__tests__
    |         └───_index.test.ts
    │ README.md
    │ .nvmrc
    │ jest.config.json
    │ package.json
    │ tsconfig.json
    │ eslintrc.json
```

## Conventional Commits

We utilize commitizen to mandate conventional commit meesages.

To run build, test and format (lint & prettier) before commit, run:

```
npm run stage
```

Also commit using this command, it stages all files, folders, etc, and commitizen will guild you through the process

```
npm run commit
```

### GitHub Actions on Push to Any Branch [ *could change* ]

Whenever a push is made to github an action runs install, buid, test and format as a mechanism to ensure integration success.

## Repo ReadMe

When building out a new repo we should document things to be done, still. During the building process.

## Versioning & Publishing

##### Beta Builds should be done manually

more details needed

##### Release should be done via continious integration pipelines after pull request merge

more details needed

## Confluence Links [helpful documentation]

Confluence Docs requires vpn, [Confluence](https://confluence.techstyle.net)
===> TODO ===> **add documentation**
