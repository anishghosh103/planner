export interface IMeeting {
  meetingId: string;
  userId: string;
  purpose: string;
  date: {
    day: number,
    month: number,
    year: number
  };
  startTime: {
    hour: number,
    minute: number
  };
  endTime: {
    hour: number,
    minute: number
  };
  place: string;
  createdBy: {
    adminId: string;
    adminName: string
  };
  updatedBy: {
    adminId: string,
    adminName: string
  };
  createdAt: Date;
  updatedAt: Date;

  ui?: {
    top?: number,
    height?: number
  };
}
