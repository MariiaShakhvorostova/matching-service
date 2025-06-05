# Matching Service

API service for matching bookings and insurance claims in medical institutions.

## Description

The service is designed for automatic data matching between the booking system and the insurance system. It helps medical institutions find and analyze discrepancies in data between the two systems.

### Key Features:

- Matching bookings with insurance claims
- Identifying discrepancies in:
  - Visit time
  - Medical service type
  - Insurance company
- Finding the best match when multiple options are available

## Technologies

- Node.js
- NestJS
- TypeScript
- Class Validator
- Class Transformer

## Installation

```bash
# Install dependencies
npm install
```

## Running the app

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## API

### POST /match

Endpoint for matching bookings and insurance claims.

#### Request:

```json
{
  "bookings": [
    {
      "id": "booking_1",
      "patient": "patient_1",
      "test": "test_1",
      "insurance": "AON",
      "reservationDate": "2025-05-16T11:00:00.000Z"
    }
  ],
  "claims": [
    {
      "id": "claim_1",
      "medicalServiceCode": "medical_service_1",
      "bookingDate": "2025-05-15T10:33:00.000Z",
      "insurance": "AON",
      "patient": "patient_1"
    }
  ]
}
```

#### Response:

```json
[
  {
    "claim": "claim_1",
    "booking": "booking_1",
    "mismatch": ["time"]
  }
]
```

## Testing

```bash
# Run test script
./test/data/test.sh
```

## Matching Algorithm

1. Required criteria:

   - Patient ID
   - Visit date (excluding time)

2. Additional criteria:
   - Test and medical service code match
   - Exact visit time
   - Insurance company

When multiple matches are possible, the option with the highest number of matching criteria is selected.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
