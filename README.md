# Exactly Challenge

This is a demo dapp that uses Compound's CDAI contracts in Rinkeby to allow the user to invest DAI.

## Getting Started

Install node modules

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the dapp.

## Running integration tests

```bash
yarn test
```

## Running e2e tests

Copy the dotenv file

```bash
cp .env.example .env
```

Run a Hardhat node:

```bash
npx hardhat node
```

Run tests:

```bash
yarn test:e2e
```

## Use the app with hardhat

Alternatively, after copying the `.env` file you can use the dapp using the Hardhat node as the "backend". To do this, just run:

```bash
yarn dev
```