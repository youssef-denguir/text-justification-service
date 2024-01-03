export class DateUtils {
  isCurrentDay(date: Date) {
    const now = new Date();
    return (
      now.getDate() === date.getDate() &&
      now.getMonth() === date.getUTCMonth() &&
      now.getFullYear() === date.getFullYear()
    );
  }
}
