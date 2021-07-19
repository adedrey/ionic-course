
export interface Booking {
  id?: string,
  userId: string,
  firstName: string,
  lastName: string,
  guestNumber: number,
  bookedFrom: Date,
  bookedTo: Date
}
