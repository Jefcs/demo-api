
# banco-api-tests

## Purpose

This project performs automated tests on the REST API of [banco-api](https://github.com/juliodelimas/banco-api), validating its functionalities and contributing to the quality of its operations.

## Tech Stack

- **Language:** JavaScript (Node.js)
- **Test framework:** [Mocha](https://mochajs.org/)
- **HTTP request library:** [Supertest](https://github.com/ladjs/supertest)
- **Assertion library:** [Chai](https://www.chaijs.com/)
- **Test reports:** [Mochawesome](https://github.com/adamgruber/mochawesome)
- **Environment variable management:** [dotenv](https://github.com/motdotla/dotenv)

## Directory Structure

```
banco-api-tests/
├── test/               # Tests organized by functionality
│   ├── login.test.js
│   └── transferencias.test.js
├── mochawesome-report/ # Automatically generated directory with the HTML test report
├── .env                # File for configuring the BASE_URL variable
├── .gitignore
├── package.json
└── README.md
```

## `.env` File Format

Before running the tests, create a file named `.env` at the root of the project with the following content:

```
BASE_URL=http://localhost:3000
```

Replace `http://localhost:3000` with the URL where the `banco-api` is running.

## Execution Commands

Install the dependencies:

```bash
npm install
```

Run all tests:

```bash
npm test
```

Automatically generate the HTML report:

- After running `npm test`, the report will be generated inside the `mochawesome-report/` folder.

Suggestion: to run the tests and automatically open the HTML report, add a script in `package.json`:

```json
"scripts": {
  "test:report": "npm test && open mochawesome-report/mochawesome.html"
}
```

(On Windows, replace `open` with `start`.)

## Dependencies and Documentation

- [Mocha](https://mochajs.org/) – Test runner framework
- [Supertest](https://github.com/ladjs/supertest) – Library for HTTP requests
- [Chai](https://www.chaijs.com/) – Assertion library
- [Mochawesome](https://github.com/adamgruber/mochawesome) – HTML report generation
- [dotenv](https://github.com/motdotla/dotenv) – Environment variable management
