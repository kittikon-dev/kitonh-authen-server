declare global {
  namespace Express {
    interface Request {
      user?: {
        accountId: string;
        sessionId: string;
      };
    }
  }
}

export {};
