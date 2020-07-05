FROM node:14.5-stretch

# Create Directory for the Container
RUN mkdir /opt/server
WORKDIR /opt/server

# Only copy the package.json file to work directory
COPY yarn.lock .
COPY package.json .

# Install all Packages
RUN yarn install

# Copy all other source code to work directory
ADD . /opt/server

# TypeScript
RUN yarn build

# Start
# Default port but you can change it using PORT env variable
EXPOSE 8000 
CMD [ "yarn", "start" ]