import Segment from "./Segment";

export default class Ride {
  private segments: Segment[];
  fare = 0;
  MIN_FARE = 10;
  NORMAL_FARE = 2.1;
  SUNDAY_FARE = 2.9;
  OVERNIGHT_FARE = 3.9;
  OVERNIGHT_SUNDAY_FARE = 5;

  constructor() {
    this.segments = [];
  }

  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  calculateFare() {
    for (const segment of this.segments) {
      if (segment.isOvernight() && !segment.isSunday()) {
        this.fare += segment.distance * this.OVERNIGHT_FARE;
      }
      if (segment.isOvernight() && segment.isSunday()) {
        this.fare += segment.distance * this.OVERNIGHT_SUNDAY_FARE;
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        this.fare += segment.distance * this.SUNDAY_FARE;
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        this.fare += segment.distance * this.NORMAL_FARE;
      }
    }
    return this.fare < this.MIN_FARE ? this.MIN_FARE : this.fare
  }
}