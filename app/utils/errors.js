export class NotFoundError extends Error {
  constructor(message, details, cause) {
    super(message);
    this.name = 'NotFoundError';
    this.details = details;
    this.cause = cause;
  }
}
