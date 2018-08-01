FROM node:8

RUN apt-get update
RUN apt-get install -y git

RUN git clone https://github.com/ncellerino/todos.git

# Create app directory
WORKDIR /todos

# Install app dependencies
# where available (npm@5+)

RUN npm install --only=production

#RUN npm install pm2 -g

RUN npm install -g nodemon

#grant access to app directory
RUN chmod -R 775 /todos
RUN chown -R node:root /todos

# Bundle app source
#COPY . .

# app will bind to 8080 port 
EXPOSE 8080

#run the server
CMD [ "npm", "start"]

# At the end, set the user to use when running this image
USER node
