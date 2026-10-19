import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import * as api from 'sailsconf-2026';

const conference = JSON.parse(
  readFileSync(new URL('../data/sailsconf-2026.json', import.meta.url), 'utf8'),
);

test('the package exports the five requested functions', () => {
  assert.deepEqual(Object.keys(api).sort(), [
    'getDateTime',
    'getLocation',
    'getSpeakers',
    'getTalks',
    'getTracks',
  ]);
  for (const exported of Object.values(api)) {
    assert.equal(typeof exported, 'function');
  }
});

test('getTracks returns every available track without duplicates', () => {
  assert.deepEqual(api.getTracks(), [
    'Web Development',
    'Open Source',
    'AI',
    'FinTech Engineering',
  ]);
});

test('getSpeakers returns all speakers and their published details', () => {
  assert.equal(api.getSpeakers().length, 19);
  assert.deepEqual(api.getSpeakers(), conference.speakers);
});

test('getTalks returns all talks with their correct speaker', () => {
  assert.equal(api.getTalks().length, 19);
  assert.deepEqual(api.getTalks(), conference.speakers.map(speaker => ({
    ...speaker.talk,
    speaker: { id: speaker.id, name: speaker.name },
  })));
  assert.equal(api.getTalks().filter(talk => talk.isKeynote).length, 1);
  for (const talk of api.getTalks()) {
    assert.equal(talk.startsAt, null);
  }
});

test('getDateTime returns the date range, start time, timezone, and unknown end time', () => {
  assert.deepEqual(api.getDateTime(), conference.dateTime);
  assert.equal(api.getDateTime().startsAt, '2026-10-22T09:30:00+01:00');
  assert.equal(api.getDateTime().endsAt, null);
});

test('getLocation returns the online location without inventing a venue or stream', () => {
  assert.deepEqual(api.getLocation(), conference.location);
  assert.equal(api.getLocation().type, 'online');
  assert.equal(api.getLocation().streamUrl, null);
});

test('mutating returned data never changes subsequent results', () => {
  const tracks = api.getTracks();
  tracks.push('Changed');
  assert.equal(api.getTracks().includes('Changed'), false);

  const speakers = api.getSpeakers();
  speakers[0].name = 'Changed';
  speakers[0].talk.title = 'Changed';
  speakers.pop();
  assert.deepEqual(api.getSpeakers(), conference.speakers);

  const talks = api.getTalks();
  talks[0].title = 'Changed';
  talks[0].speaker.name = 'Changed';
  talks.pop();
  assert.equal(api.getTalks().length, conference.speakers.length);
  assert.equal(api.getTalks()[0].title, conference.speakers[0].talk.title);
  assert.equal(api.getTalks()[0].speaker.name, conference.speakers[0].name);

  const dateTime = api.getDateTime();
  dateTime.startDate = 'Changed';
  assert.deepEqual(api.getDateTime(), conference.dateTime);

  const location = api.getLocation();
  location.name = 'Changed';
  assert.deepEqual(api.getLocation(), conference.location);
});