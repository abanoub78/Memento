let eventGuid = localStorage.getItem('eventGuid') ? parseInt(localStorage.getItem('eventGuid')) : 0;

export const INITIAL_EVENTS = []

export function createEventId() {
  eventGuid++;
  localStorage.setItem('eventGuid', eventGuid);
  return String(eventGuid);
}
