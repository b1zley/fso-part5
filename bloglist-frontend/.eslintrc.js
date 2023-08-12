module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "node": true,
        "cypress/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "warn",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-unused-vars": ["warn", { "args": "none", }],
        "no-console": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": "off",

    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
