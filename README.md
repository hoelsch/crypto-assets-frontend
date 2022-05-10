# App for Managing Crypto Assets

<p align="center">
  <img src=./screenshot.png />
</p>

![docker build](https://github.com/hoelsch/crypto-assets-frontend/actions/workflows/docker-image.yml/badge.svg)

With this app you can keep track of all of your crypto assets.

This repository contains the frontend which is based on [React](https://reactjs.org/). The corresponding backend can be found [here](https://github.com/hoelsch/crypto-assets-backend).

## Development

1. Clone this repo:
```
git clone https://github.com/hoelsch/crypto-assets-frontend.git
```
2. Change directory:
```
cd crypto-assets-frontend
```
3. Install dependencies:
```
npm install
```
4. Start backend:
Go to the [backend repo](https://github.com/hoelsch/crypto-assets-backend) and follow the instructions how to start the backend for development

6. Start frontend app:
```
npm start
```

## Deployment

1. Build the Docker image where `BACKEND_URL` is the URL of the [crypto-assets-backend](https://github.com/hoelsch/crypto-assets-backend) (please check the documentation how the backend can be deployed):
```
docker build --build-arg BACKEND_URL=https://my.backend.server:8080 -t crypto-assets-frontend .
```
2. Push the image to a Docker registry 
