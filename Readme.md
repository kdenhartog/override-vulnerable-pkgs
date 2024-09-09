This is a simple tool to take advantage of the pnpm audit feature where you can automatically add the vulnerable transitive dependencies to your package.json file without needing to switch to pnpm to do so. The primary reason for using this tool is to go through and bump all vulnerable transitive dependencies in a package you maintain to reduce the possibility of supply chain attacks while the changes get propagated through your transitive dependency tree. If the vulnerable package is a direct dependency you import, this will error out because it will recognize the installed version you have is in conflict with the version that is being overridden. However, for all other transitive dependencies they should be bumped for you in the same way `pnpm audit --fix` does.

## Usage
Since this isn't being published to npm, you'll need to install it via source and link locally first. To do so run the following commands:
1. git clone the repo
2. `cd override-vulnerable-deps`
3. `npm install`
4. `npm link`
5. run `npx override-vulnerable-deps` from your project root that you want to update your transitive vulnerable dependencies.

Check over the package.json file and make sure all of the vulnerable dependencies are updated in the way you want. A good sanity check here is to run `npm audit --fix` and see if it's resolved all of the issues. If not, then you'll need to manually update them.
