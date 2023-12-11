
export class OwnerDataError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'OwnerError';
    }
}