export abstract class AuthGateway {
  abstract login(email: string, password: string): Promise<boolean>;
  abstract register(email: string, password: string): Promise<boolean>;
  abstract loginWithGoogle(googleIdToken: string): Promise<boolean>;
}
