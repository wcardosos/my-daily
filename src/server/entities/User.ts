export interface IProviderValues {
  email: string
  provider: string
  name: string
  password?: string
  pictureUrl?: string
}

export class User {
  private email: string;

  private provider: string;

  private name: string;

  private password: string;

  private pictureUrl: string;

  constructor(
    email: string,
    provider: string,
    name: string,
    password?: string,
    pictureUrl?: string,
  ) {
    this.email = email;
    this.provider = provider;
    this.name = name;
    this.password = password;
    this.pictureUrl = pictureUrl;
  }

  public get(): IProviderValues {
    return {
      email: this.email,
      provider: this.provider,
      name: this.name,
      password: this.password,
      pictureUrl: this.pictureUrl,
    };
  }
}
