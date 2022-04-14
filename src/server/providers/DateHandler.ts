export class DateHandler {
  private static formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return [day, month, year].join('/');
  }

  public static getToday(): string {
    const todayDate = new Date(Date.now());

    return DateHandler.formatDate(todayDate);
  }
}
