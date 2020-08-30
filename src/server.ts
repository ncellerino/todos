import app from './app';
import { PORT } from './config/Environment';
import { logger } from './config/logger/Logger';

app.listen(PORT, () => {
  logger.info(`Example app listening on port ${PORT}!`);
});

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  logger.error('');
  process.exit(1);
});
