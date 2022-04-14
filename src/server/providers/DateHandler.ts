import { format } from 'date-fns';

export class DateHandler {
  private static formatDate(date: Date): string {
    return format(date, 'dd/M/yyyy');
  }

  public static getToday(): string {
    const todayDate = new Date(Date.now());

    return DateHandler.formatDate(todayDate);
  }
}
