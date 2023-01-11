export const milisseconds_to_seconds = (milisseconds: number) => milisseconds / 1000
export const seconds_to_milisseconds = (seconds: number) => seconds * 1000
export const seconds_to_minutes = (seconds: number) => seconds / 60
export const minutes_to_seconds = (minutes: number) => minutes * 60
export const minutes_to_hours = (minutes: number) => minutes / 60
export const hours_to_minutes = (hours: number) => hours * 60
export const hours_to_days = (hours: number) => hours / 24
export const days_to_hours = (days: number) => days * 24
export const milisseconds_to_minutes = (milisseconds: number) => seconds_to_minutes(milisseconds_to_seconds(milisseconds))
export const milisseconds_to_hours = (milisseconds: number) => minutes_to_hours(milisseconds_to_minutes(milisseconds))
export const milisseconds_to_days = (milisseconds: number) => hours_to_days(milisseconds_to_hours(milisseconds))
export const seconds_to_hours = (seconds: number) => minutes_to_hours(seconds_to_minutes(seconds))
export const seconds_to_days = (seconds: number) => hours_to_days(seconds_to_hours(seconds))
export const minutes_to_milisseconds = (minutes: number) => seconds_to_milisseconds(minutes_to_seconds(minutes))
export const minutes_to_days = (minutes: number) => hours_to_days(minutes_to_hours(minutes))
export const hours_to_milisseconds = (hours: number) => minutes_to_milisseconds(hours_to_minutes(hours))
export const hours_to_seconds = (hours: number) => minutes_to_seconds(hours_to_minutes(hours))
export const days_to_milisseconds = (days: number) => hours_to_milisseconds(days_to_hours(days))
export const days_to_seconds = (days: number) => hours_to_seconds(days_to_hours(days))
export const days_to_minutes = (days: number) => hours_to_minutes(days_to_hours(days)) 