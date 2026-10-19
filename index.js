import conference from './data/sailsconf-2026.json' with { type: 'json' };

export function getTracks() {
  return [...new Set(conference.speakers.map(speaker => speaker.talk.track))];
}

export function getSpeakers() {
  return structuredClone(conference.speakers);
}

export function getTalks() {
  return conference.speakers.map(speaker => ({
    ...structuredClone(speaker.talk),
    speaker: {
      id: speaker.id,
      name: speaker.name,
    },
  }));
}

export function getDateTime() {
  return structuredClone(conference.dateTime);
}

export function getLocation() {
  return structuredClone(conference.location);
}