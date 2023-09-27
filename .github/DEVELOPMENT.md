# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

```shell
git clone https://github.com/<your-name-here>/rock-paper-scissors
cd rock-paper-scissors
pnpm install
pnpm prepare
```

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## 🧞 vite Commands

All vite commands are run from the root of the project, from a terminal:

| Command                 | Action                                           |
| :---------------------- | :----------------------------------------------- |
| `pnpm  dev`          | Starts local dev server at `localhost:3000`      |
| `pnpm  build`        | Build your production site to `./dist/`          |
| `pnpm  preview`      | Preview your build locally, before deploying     |


## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

```shell
pnpm prettier
```

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm lint` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files