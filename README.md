# PakaiWA

[![Node.JS Scan](https://github.com/pakaiwa/api/actions/workflows/njsscan.yaml/badge.svg)](https://github.com/pakaiwa/api/actions/workflows/njsscan.yaml) [![CI](https://github.com/pakaiwa/api/actions/workflows/Test.yaml/badge.svg)](https://github.com/pakaiwa/api/actions/workflows/Test.yaml)

![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

# Whatsapp api baileys multi device support

🚧 This project is under construction and not ready for use yet. 🚧

## About this project

This project is a simple restfull API to send messages to whatsapp using the [baileys]() library as a base for the API service with multi device support.

## Tech Stack

- COre
- Database

## Requirements

- [Node.Js](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/)
- [RabbitMQ](https://www.rabbitmq.com/)

## Install

Depedency

```bash
pnpm add @prisma/client baileys bcrypt dotenv express express-rate-limit qrcode uuid winston zod
```

Dev Depedency

```bash
pnpm add -D @babel/preset-env @microsoft/eslint-formatter-sarif @types/bcrypt @types/express @types/jest @types/supertest @types/uuid babel-jest eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier jest nodemon prettier prisma supertest
pnpm add -D @babel/preset-env @babel/preset-typescript @jest/globals @types/bcrypt @types/express @types/jest @types/supertest @types/uuid babel-jest jest prisma supertest typescript
```

```bash
pnpm install
pnpm prisma generate
pnpm build
```

<!-- Jest Coverage Comment:Begin -->
<!-- Jest Coverage Comment:End -->

## API Documentation

All routes are documented in [Postman](https://documenter.getpostman.com/view/12598731/2sA3JQ3etK)

## Contributing

Check the [contributing](CONTRIBUTING.md) file for more details.

## Structure

Check the [structure](STRUCTURE.md) file for more details.

## License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.

# Disclaimer

- This project is an independent initiative and is not affiliated, authorized, maintained, sponsored, or endorsed by WhatsApp (WA) or any of its affiliates or subsidiaries.

- The official WhatsApp website can be accessed at [whatsapp.com](https://whatsapp.com). The terms "WhatsApp," as well as any names, trademarks, badges, and associated images, are trademarks of their respective owners.

- This software is an unofficial implementation. Its use is at the user's own risk. We recommend not using it for spam or any activity that violates the terms of service of WhatsApp.

- The development team assumes no responsibility for any damages or issues resulting from the use of this software.
- Do not spam people with this.

Thank you for your understanding.

# Note

I can't guarantee or can be held responsible if you get blocked or banned by using this software. WhatsApp does not allow bots using unofficial methods on their platform, so this shouldn't be considered totally safe.
