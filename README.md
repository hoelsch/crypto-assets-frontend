# App for Managing Crypto Assets

<p align="center">
  <img src=./screenshot.png />
</p>

![docker build](https://github.com/hoelsch/crypto-assets-frontend/actions/workflows/docker-image.yml/badge.svg)

App to keep track of all of your crypto assets.

This repository contains the frontend which is based on [React](https://reactjs.org/). The corresponding backend can be found [here](https://github.com/hoelsch/crypto-assets-backend).

## Getting Started: Running the App Locally

1. Clone this repo:
```sh
git clone https://github.com/hoelsch/crypto-assets-frontend.git
```
2. Change directory:
```sh
cd crypto-assets-frontend
```
3. Install dependencies:
```sh
npm install
```
4. Start backend:
Follow the [instructions](https://github.com/hoelsch/crypto-assets-backend#how-to-start-backend-locally) how to start the backend locally

6. Start frontend app:
```sh
npm start
```
Note: It was verified that the commands from above work with node version `16.5.0`. If you experience issues executing the commands with a different node version, you can alternatively build the Docker image with:
```sh
docker build --build-arg BACKEND_URL=http://localhost:8080 -t crypto-assets-frontend .
```
You can run the Docker image as container with:
```sh
docker run -p 3000:3000 crypto-assets-frontend
```
Then, the app can be accessed via your browser at `localhost:3000`
