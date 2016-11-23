import express from 'express'
import socketIO from 'socket.io'
import http from 'http'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = express();
const server = app.listen(5001, () => console.log('Server listening on port 5001'));
const io = new socketIO(server);

import webpackConfig from '../webpack.config.js'
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	hot: true,
	path: webpackConfig.output.publicPath,
	stats: {
		colors: true
	}
}));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: path.join(__dirname, '../client') });
});

let currentLikes = {};

// socket IO code:
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('initialize-likes', currentLikes);

  socket.on('like', (identifier) => {
    if (identifier in currentLikes) {
      currentLikes[identifier] = currentLikes[identifier] + 1;
    } else {
      currentLikes[identifier] = 1;
    }
    io.emit('add-like', (identifier));
  });

  socket.on('unlike', (identifier) => {
    if (identifier in currentLikes) {
      if (currentLikes[identifier] > 0) {
        currentLikes[identifier] = currentLikes[identifier] - 1;
      }
    }
    io.emit('add-unlike', (identifier));
  });
 
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});