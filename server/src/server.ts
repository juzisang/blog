import app from './app';
import config from './config';

app.listen(config.app.port, () => {
  console.log(`start http://localhost:${config.app.port}`);
});
