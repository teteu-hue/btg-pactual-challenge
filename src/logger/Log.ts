import logger from "./logger";

export class Log {

    static info(message: string, meta: Object) {
        logger.info(message, meta)
    }

    static error(message: string, meta: Object) {
        logger.error(message, meta);
    }

    static notice(message: string, meta: Object) {
        logger.notice(message, meta);
    }

    static warning(message: string, meta: Object) {
        logger.warning(message, meta);
    }

    static debug(message: string, meta: Object) {
        logger.debug(message, meta);
    }
    
}
