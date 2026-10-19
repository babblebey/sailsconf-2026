# sailsconf-2026

Conference details for demos, backed by a bundled snapshot of
[Sailsconf 2026](https://sailsconf.com/2026) retrieved on October 19, 2026.
No dependencies or network requests at runtime. Requires Node.js 22 or newer.

## Install

```sh
npm install sailsconf-2026
```

## Usage

```js
import { getTracks, getSpeakers, getTalks, getDateTime, getLocation } from 'sailsconf-2026';

console.log(getTracks());
// ['Web Development', 'Open Source', 'AI', 'FinTech Engineering']

console.log(getSpeakers()); // All 19 speakers, including their talk details
console.log(getTalks()); // All 19 talks, each with a speaker { id, name }
console.log(getDateTime()); // Conference date range, start time, and timezone
console.log(getLocation()); // Online location details
```

## API

All functions are synchronous, take no arguments, and return fresh copies.

| Function | Returns |
| --- | --- |
| `getTracks()` | Unique track names as a string array, in first-seen order. |
| `getSpeakers()` | Speaker objects with `id`, `name`, `role`, `organization`, and `talk`. |
| `getTalks()` | Talk objects with `title`, `track`, `isKeynote`, `startsAt`, and `speaker: { id, name }`. |
| `getDateTime()` | An object with `startDate`, `endDate`, `startsAt`, `endsAt`, and `timeZone`. |
| `getLocation()` | An object with `type`, `name`, `venue`, and `streamUrl`. |

```js
getDateTime();
// {
//   startDate: '2026-10-22',
//   endDate: '2026-10-24',
//   startsAt: '2026-10-22T09:30:00+01:00',
//   endsAt: null,
//   timeZone: 'Africa/Lagos'
// }

getLocation();
// { type: 'online', name: 'Online', venue: null, streamUrl: null }
```

This is a static snapshot, not a live schedule. Individual session times,
the conference end time, and a stream URL were not published when the data
was collected; unknown values are `null`. Dates use ISO 8601; the published
start time is 9:30 AM in `Africa/Lagos` (UTC+01:00).

## Development

```sh
npm test
npm pack --dry-run
```

Publishing runs the test suite automatically via `prepublishOnly`.