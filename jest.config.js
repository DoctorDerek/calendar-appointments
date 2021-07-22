// Modified from kcd-scripts:
// https://github.com/kentcdodds/kcd-scripts/blob/main/src/config/jest.config.js
const fs = require("fs")
const path = require("path")
const readPkgUp = require("read-pkg-up")

const { path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})
const appDirectory = path.dirname(pkgPath)

const fromRoot = (...p) => path.join(appDirectory, ...p)
const hasFile = (...p) => fs.existsSync(fromRoot(...p))

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
  moduleNameMapper: {
    // equivalent to "paths" in tsconfig.json
    "@/src/(.*)": fromRoot("src") + "/$1",
  },
  testEnvironment: "jsdom",
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

module.exports = jestConfig
