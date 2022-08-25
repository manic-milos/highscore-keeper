import winston from 'winston';

const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
  transports: [consoleTransport],
};
const logger = winston.createLogger(myWinstonOptions) as winston.Logger;

export { logger };
export default logger;
