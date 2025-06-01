import app from './app.js';
import Config from './config/config.js';
import logger from './utils/logger.js';

const PORT: string = Config.getConfig().PORT || '5000';

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));