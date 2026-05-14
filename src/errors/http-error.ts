import type { IErrorDefinition } from "../interfaces/http-error.interface.js";

export class HttpError extends Error {
  public statusCode: number;
  public code: string;

  constructor(error: IErrorDefinition, message?: string) {
    super(message ?? error.message);
    this.name = "HttpError";
    this.statusCode = error.statusCode;
    this.code = error.code;
  }
}
