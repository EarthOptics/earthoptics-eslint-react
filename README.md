# earthoptics-eslint

This repo provides an ESLint configurations for TypeScript projects.

- [Setup](#setup)
  - [Assumptions](#assumptions)
  - [Install dependencies](#install-dependencies)
    - [Install via `npm`](#install-via-npm)
    - [Or install via `yarn`](#or-install-via-yarn)
  - [Copy config files](#copy-config-files)
  - [Include the eslint file in your tsconfig.json](#include-the-eslint-file-in-your-tsconfigjson)
  - [Adjust configuration as needed](#adjust-configuration-as-needed)
  - [Recommended IDE extensions](#recommended-ide-extensions)
    - [VS Code](#vs-code)
      - [Base extensions](#base-extensions)
      - [Optional extensions](#optional-extensions)
  - [Create `npm scripts`](#create-npm-scripts)
    - [Vim](#vim)
- [Don't let the linter bully you](#dont-let-the-linter-bully-you)
  - [Disabling/ignoring rules piecemeal](#disablingignoring-rules-piecemeal)
    - [Disable a rule for a single line and single rule](#disable-a-rule-for-a-single-line-and-single-rule)
    - [Disable a rule for multiple lines and single rule](#disable-a-rule-for-multiple-lines-and-single-rule)
    - [Disable a rule for the entire file](#disable-a-rule-for-the-entire-file)
  - [Overriding rules](#overriding-rules)
    - [Override a rule for the entire project](#override-a-rule-for-the-entire-project)
    - [Override a rule for only certain files or folders](#override-a-rule-for-only-certain-files-or-folders)
- [Resources](#resources)
  - [Recommended tools](#recommended-tools)
  - [Guides and tutorials](#guides-and-tutorials)

## Setup

Install dependencies and the config itself.

### Assumptions

-   NodeJS is installed.
-   You have a `package.json` file in your project.
-   You are using Jest for testing.
-   You are using TypeScript. Note that the instructions below allow for any version `>=5`, but the
    delicate nature of these linting stacks means any plugin or dependency is subject to change.
-   You have a `tsconfig.json` file in your project.

### Install dependencies

Choose one of the two installation methods. The installation includes:

-   **Base dependencies:** ESLint and Prettier for linting and formatting, and TypeScript 5
-   **Testing dependencies:** Jest and its TypeScript friends
-   **This ESLint config:** This module itself

#### Install via `npm`

If your project already has a `package-lock.json` file, use `npm`

```sh
npm i -D 'eslint@^8.45.0' 'prettier@^2.8.8' 'typescript@^5'
npm i -D https://github.com/EarthOptics/earthoptics-eslint-react
```

#### Or install via `yarn`

If your project already has a `yarn.lock` file, use `yarn`:

```sh
yarn add -D 'eslint@^8.45.0' 'prettier@^2.8.8' 'typescript@^5'
yarn add -D https://github.com/EarthOptics/earthoptics-eslint-react
```

### Copy config files

Copy these files into the same directory where your `package.json` lives.

-   _.prettierrc_
-   _.\_eslintrc.base.cjs_ -> _.eslintrc.cjs_
-   _.editorconfig_
-   _.markdownlint.json_ (optional)

### Include the eslint file in your tsconfig.json

In the `include` block of your `tsconfig.json` file, add the following:

```json
{
    "include": [
        // ...any other files or folders you want to include...
        ".eslintrc.cjs" // seems to prevent "not found in project" errors
    ]
}
```

### Adjust configuration as needed

See in-code comments within _.eslintrc.cjs_ for details. The [eslint
docs](https://eslint.org/docs/latest/) are also excellent. Also feel free to edit _.prettierrc_ and
_.editorconfig_ and _.markdownlint.json_ as needed.

### Recommended IDE extensions

#### VS Code

##### Base extensions

If you want to enable "format on save" in your IDE, and to enforce EditorConfig settings, you'll
need to install the following extensions.

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

##### Optional extensions

-   [Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap) for wrapping long lines
    of text in comments and markdown files.
-   [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
    Markdown linting and style checking
-   [Markdown
    All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one): all
    you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more)

### Create `npm scripts`

Consider adding these commands to the `scripts` block of your `package.json` file. They will perform
the following actions:

-   `npm run lint`: run ESLint on all TypeScript files in this directory and subdirectories
-   `npm run lint:fix`: same as `npm run lint` plus fix any issues that can be automatically fixed
-   `npm run format`: only run Prettier on all files in the current directory and subdirectories
-   `npm run beautify`: run ESLint check + auto-fix, then run Prettier

```json
{
    "scripts": {
        "beautify": "npm run lint:fix && npm run format",
        "lint": "eslint --ext .ts,.tsx .",
        "lint:fix": "eslint --fix --ext .ts,.tsx .",
        "format": "prettier --write ."
    }
}
```

#### Vim

Google "Vim stuff" 😛

## Don't let the linter bully you

It is _your_ code, after all, so if ESLint is really pushing your buttons, you have options.

### Disabling/ignoring rules piecemeal

For temporary or one-off situations, you can disable a rule for a single line, multiple lines, or an
entire file.

#### Disable a rule for a single line and single rule

If you are using VS Code on a Mac, click on the lightbulb icon that appears when you hover over a
linting error and choose "Disable some-rule-name for this line", or press `CMD + .` to bring up the
same menu.

The above IDE suggestion will accomplish the same thing, but here is the syntax for disabling a rule
by for one line. It's just an inline comment with `eslint-disable-next-line` followed by the rule
name.

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const someLambda = new ServiceLambda(this, 'SomeService', someLambdaProps)
```

#### Disable a rule for multiple lines and single rule

**⚠️ Careful with this one.** It's easy to forget to re-enable the rule, and it's easy to forget to
add the closing comment.

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
const someLambda = new ServiceLambda(this, 'SomeService', someLambdaProps)
const someOtherLambda = new ServiceLambda(this, 'SomeOtherService', someOtherLambdaProps)
/* eslint-enable @typescript-eslint/no-unused-vars */
```

#### Disable a rule for the entire file

The steps are the same as disabling multiple lines, except you put it at the top of the file and
don't add the closing comment. Danger zone!

### Overriding rules

#### Override a rule for the entire project

If there is a rule that is particularly grinding your gears, open your _.eslintrc.cjs_ file and
adjust the rule in the `rules` block as needed. This README will not cover these steps in detail,
but you can refer to the `rules` section of _index.js_ in this repo for examples and to the [eslint
docs](https://eslint.org/docs/latest/) themselves.

If you do choose to override `rules`, consider staying consistent with your "severity level" format.
For example, this repo uses only numeric codes (`0 | 1 | 2`) for `off | warn | on`, respectively.

#### Override a rule for only certain files or folders

If you want to override a rule for only certain files or folders, you can use the `overrides` block
of _.eslintrc.cjs_. Again, this README will not cover these steps in detail, but you can refer to
the `overrides` section of _index.js_ in this repo for examples and to the ESLint docs for more
guidance.

## Resources

### Recommended tools

-   [Husky](https://typicode.github.io/husky/) for pre-commit hooks
-   [lint-staged](https://github.com/okonet/lint-staged) for only linting staged files (instead of the
    entire project)

### Guides and tutorials

-   [Create a reusable ESLint config](https://codinglicks.com/blog/create-a-reusable-eslint-config/)
    was very handy in setting this repo up. It clarified some of the confusion found in the [offical
    eslint guidance](https://eslint.org/docs/latest/extend/shareable-configs) on creating shared
    configs.
