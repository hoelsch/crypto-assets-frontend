# App for Managing Crypto Assets

<p align="center">
  <img src=./screenshot.png />
</p>

![docker build](https://github.com/hoelsch/crypto-assets-frontend/actions/workflows/docker-image.yml/badge.svg)

App to keep track of all of your crypto assets.

This repository contains the frontend which is based on [React](https://reactjs.org/). The corresponding backend can be found [here](https://github.com/hoelsch/crypto-assets-backend).

## Development

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
## Deployment

1. Build the Docker image where `BACKEND_URL` is the URL of the [crypto-assets-backend](https://github.com/hoelsch/crypto-assets-backend) (please check the documentation how the backend can be deployed):
```sh
docker build --build-arg BACKEND_URL=https://my.backend.server:8080 -t crypto-assets-frontend .
```
- A container of this image will run a server that provides the optimized production build of the React app. By default, this server is running on port `3000` in the container. You can map this port to any available port of the Docker host.

2. Push the image built in the previous step to a Docker registry of your choice
3. Run the Docker image as container in a Kubernetes cluster. Please refer to the official Kubernetes [documentation](https://kubernetes.io/docs/home/) how to setup a cluster and run containers.
