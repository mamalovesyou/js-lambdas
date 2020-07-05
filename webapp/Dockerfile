# pull official base image
FROM node:14.5-stretch

# Make the workdir with the right permissions
RUN mkdir /opt/app

# set working directory
WORKDIR /opt/app

# add `/opt/app/node_modules/.bin` to $PATH
ENV PATH /opt/app/node_modules/.bin:$PATH

# install app dependencies
COPY yarn.lock .
COPY package.json .

# Install dependencies
RUN yarn install --silent
# add app
COPY . ./
EXPOSE 3000

# Start app
CMD ["yarn", "start"]