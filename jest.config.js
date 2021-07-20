const fs = require("fs")
const path = require("path")
const arrify = require("arrify")
const has = require("lodash.has")
const readPkgUp = require("read-pkg-up")

const { packageJson: pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})
const appDirectory = path.dirname(pkgPath)

const fromRoot = (...p) => path.join(appDirectory, ...p)
const hasFile = (...p) => fs.existsSync(fromRoot(...p))

const hasPkgProp = (props) => arrify(props).some((prop) => has(pkg, prop))

const hasPkgSubProp = (pkgProp) => (props) =>
  hasPkgProp(arrify(props).map((p) => `${pkgProp}.${p}`))

const hasPeerDep = hasPkgSubProp("peerDependencies")
const hasDep = hasPkgSubProp("dependencies")
const hasDevDep = hasPkgSubProp("devDependencies")
const hasAnyDep = (args) =>
  [hasDep, hasDevDep, hasPeerDep].some((fn) => fn(args))

const ifAnyDep = (deps, t, f) => (hasAnyDep(arrify(deps)) ? t : f)

const here = (p) => path.join(__dirname, p)

const useBuiltInBabelConfig = !hasFile(".babelrc") && !hasPkgProp("babel")

const ignores = [
  "/node_modules/",
  "/__fixtures__/",
  "/fixtures/",
  "/__tests__/helpers/",
  "/__tests__/utils/",
  "__mocks__",
]

const jestConfig = {
  roots: [fromRoot("src")],
  testEnvironment: ifAnyDep(
    ["webpack", "rollup", "react", "preact"],
    "jsdom",
    "node"
  ),
  testURL: "http://localhost",
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  moduleDirectories: [
    "node_modules",
    fromRoot("src"),
    "shared",
    fromRoot("tests"),
  ],
  collectCoverageFrom: ["src/**/*.+(js|jsx|ts|tsx)"],
  testMatch: ["**/__tests__/**/*.+(js|jsx|ts|tsx)"],
  testPathIgnorePatterns: [...ignores],
  coveragePathIgnorePatterns: [...ignores, "src/(umd|cjs|esm)-entry.js$"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  watchPlugins: [
    require.resolve("jest-watch-typeahead/filename"),
    require.resolve("jest-watch-typeahead/testname"),
  ],
  snapshotSerializers: [
    require.resolve("jest-serializer-path"),
    require.resolve("jest-snapshot-serializer-raw/always"),
  ],
}

const setupFiles = [
  "tests/setup-env.js",
  "tests/setup-env.ts",
  "tests/setup-env.tsx",
]
for (const setupFile of setupFiles) {
  if (hasFile(setupFile)) {
    jestConfig.setupFilesAfterEnv = [fromRoot(setupFile)]
  }
}

if (useBuiltInBabelConfig) {
  jestConfig.transform = { "^.+\\.(js|jsx|ts|tsx)$": here("./babel-transform") }
}

module.exports = jestConfig
