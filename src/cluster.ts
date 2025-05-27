import cluster from 'cluster';
import os from 'os';
import logger from './utils/logger.js';

if (cluster.isPrimary) {
    logger.info(`Primary worker ${process.pid} is running`);

    const numCPUs: number = os.cpus().length;

    for (let i = 0; i < 1; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Worker with id ${worker.process.pid} exited with code ${code} and signal ${signal}`);
        cluster.fork();
    });
} else {
    logger.info(`Worker ${process.pid} is running`);
    
    import('./app.js');
}