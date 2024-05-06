export function calculateFare(segments: {distance: number, date: Date}[]) {
    let fare = 0;
    const MIN_FARE = 10;
    const NORMAL_FARE = 2.1;
    const SUNDAY_FARE = 2.9;
    const OVERNIGHT_FARE = 3.9;
    const OVERNIGHT_SUNDAY_FARE = 5;
    const OVERNIGHT_START = 22;
    const OVERNIGHT_END = 6;
  
    function isValidDistance(distance: number) {
      return (distance != null && distance != undefined && typeof distance === "number" && distance > 0);
    }
    function isValidDate(date: Date) {
      return (date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date");
    }
    function isOvernight(date: Date) {
      return date.getHours() >= OVERNIGHT_START || date.getHours() <= OVERNIGHT_END;
    }
    function isSunday(date: Date) {
      return date.getDay() === 0;
    }
    
    for (const segment of segments) {
      if (!isValidDate(segment.date)) throw new Error('Invalid Date');
      if (!isValidDistance(segment.distance)) throw new Error('Invalid Distance');
      if (isValidDistance(segment.distance) && isValidDate(segment.date)) {
        if (isOvernight(segment.date) && !isSunday(segment.date)) {
          fare += segment.distance * OVERNIGHT_FARE;
        }
        if (isOvernight(segment.date) && isSunday(segment.date)) {
          fare += segment.distance * OVERNIGHT_SUNDAY_FARE;
        }
        if(!isOvernight(segment.date) && isSunday(segment.date)){
          fare += segment.distance * SUNDAY_FARE;
        }
        if(!isOvernight(segment.date) && !isSunday(segment.date)){
          fare += segment.distance * NORMAL_FARE;
        }
      }
    }
    return fare < MIN_FARE ? MIN_FARE : fare
  }
  