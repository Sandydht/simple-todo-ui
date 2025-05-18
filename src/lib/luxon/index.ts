import { DateTime } from 'luxon'

export const fromISOToDateHuge = (date: string) => { // Friday, October 14, 1983
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE);
}

export const fromISOToLocale = (date: string) => { // 2025-12-13
  return DateTime.fromISO(date).toFormat('yyyy-MM-dd');
}
