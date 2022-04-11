export interface ITaskValues {
  id: string
  dailyId: string
  name: string
  type: string
}

export class Task {
  private id: string;

  private dailyId: string;

  private name: string;

  private type: string;

  constructor(
    dailyId: string,
    name: string,
    type: string,
    id?: string,
  ) {
    this.id = id;
    this.dailyId = dailyId;
    this.name = name;
    this.type = type;
  }

  public get(): ITaskValues {
    return {
      id: this.id,
      dailyId: this.dailyId,
      name: this.name,
      type: this.type,
    };
  }
}
