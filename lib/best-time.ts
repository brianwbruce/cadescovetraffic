export type Weekday =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export type TrafficLevel = 'light' | 'moderate' | 'heavy' | 'walkers/bikes only';

export type TimeWindow = {
  start: string;
  end: string;
  traffic: TrafficLevel;
  reason: string;
};

export type WeatherSummary = {
  conditionLabel: string;
  rainExpected: boolean;
};

export function seasonForDate(date: Date): Season {
  const m = date.getMonth(); // 0 = Jan
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  if (m >= 8 && m <= 10) return 'fall';
  return 'winter';
}

export function weekdayForDate(date: Date): Weekday {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    date.getDay()
  ] as Weekday;
}

// PRD: vehicle-free Wednesdays run May through September.
// Saturday-morning vehicle-free is referenced in the PRD but the actual NPS
// schedule has shifted in recent years — we render this conservatively in UI
// and link to NPS for the live schedule.
export function isVehicleFreeWednesday(date: Date): boolean {
  if (date.getDay() !== 3) return false; // Wednesday
  const month = date.getMonth(); // 0=Jan
  return month >= 4 && month <= 8; // May (4) through September (8)
}

export function getBestTimes(
  day: Weekday,
  season: Season,
  weather?: WeatherSummary,
  date?: Date,
): TimeWindow[] {
  const sunriseWindow: TimeWindow = {
    start: '7:00am',
    end: '9:30am',
    traffic: 'light',
    reason: 'Wildlife is active and the loop is mostly empty before 9:30am.',
  };

  if (date && isVehicleFreeWednesday(date)) {
    return [
      {
        start: 'sunrise',
        end: '10:00am',
        traffic: 'walkers/bikes only',
        reason:
          'Vehicle-free Wednesday morning. Walk or bike the loop, then drive after the gate opens around 10am.',
      },
      {
        start: '10:30am',
        end: '12:30pm',
        traffic: 'moderate',
        reason: 'Cars enter once vehicle-free hours end; expect a quick burst of traffic.',
      },
    ];
  }

  if (day === 'Saturday' || day === 'Sunday') {
    if (season === 'summer' || season === 'fall') {
      return [
        sunriseWindow,
        {
          start: '5:00pm',
          end: 'sunset',
          traffic: 'moderate',
          reason: 'Day-trippers are leaving and wildlife returns to the meadows.',
        },
      ];
    }
    return [
      sunriseWindow,
      {
        start: '4:30pm',
        end: 'sunset',
        traffic: 'light',
        reason: 'Off-season weekends thin out by late afternoon.',
      },
    ];
  }

  if (weather?.rainExpected) {
    return [
      {
        start: '8:00am',
        end: '11:00am',
        traffic: 'light',
        reason: 'Rain keeps casual visitors away — the loop is quieter than usual.',
      },
    ];
  }

  return [
    sunriseWindow,
    {
      start: '4:30pm',
      end: 'sunset',
      traffic: 'light',
      reason: 'Mid-week afternoons reset to light traffic after lunchtime peak.',
    },
  ];
}

export function trafficExpectation(
  day: Weekday,
  season: Season,
): 'light' | 'moderate' | 'heavy' {
  const weekend = day === 'Saturday' || day === 'Sunday';
  if (season === 'summer' || season === 'fall') {
    return weekend ? 'heavy' : 'moderate';
  }
  if (season === 'spring') {
    return weekend ? 'moderate' : 'light';
  }
  return 'light';
}

export function seasonLabel(season: Season): string {
  switch (season) {
    case 'spring':
      return 'Spring — bears emerging, smaller crowds';
    case 'summer':
      return 'Peak summer season — expect crowds';
    case 'fall':
      return 'Peak fall foliage season — expect heavy weekend traffic';
    case 'winter':
      return 'Off-season — quietest months, fewest amenities';
  }
}
