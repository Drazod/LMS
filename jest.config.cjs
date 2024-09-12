module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "\\.(css|less)$": "jest-css-modules-transform",
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "@mui/x-charts/LineChart": "<rootDir>/node_modules/@mui/x-charts/LineChart",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
