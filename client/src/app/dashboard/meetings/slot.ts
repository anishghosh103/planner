import { IMeeting } from '../../models/meeting.model';

export class Gap {

  constructor(
    public top: number = 0,
    public bottom: number = 0
  ) {}

}

export class Slot {

  private gaps: Gap[] = [new Gap(0, Infinity)];
  public meetings: IMeeting[] = [];

  constructor() {}

  /**
   * Add Meeting to Slot
   * @param meeting IMeeting object
   * @returns {boolean} whether meeting is added to slot or not
   */
  add(meeting: IMeeting): boolean {
    const gap = this.gaps.find(G => {
      return G.top <= meeting.ui.top && G.bottom >= (meeting.ui.top + meeting.ui.height);
    });

    if (gap) {
      this.gaps = this.gaps.filter(G => G !== gap);
      if (gap.top !== meeting.ui.top) {
        const gapBottom = meeting.ui.top;
        this.gaps.push(new Gap(gap.top, gapBottom));
      }
      if (gap.bottom !== (meeting.ui.top + meeting.ui.height)) {
        const gapTop = meeting.ui.top + meeting.ui.height;
        this.gaps.push(new Gap(gapTop, gap.bottom));
      }
      this.meetings.push(meeting);
      return true;
    }

    return false;
  }

}

export class SlotArray {

  public slots: Slot[] = [new Slot()];

  constructor() {}

  add(meeting: IMeeting) {
    let added = false;
    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];
      added = slot.add(meeting);
      if (added) {
        break;
      }
    }
    if (!added) {
      const newSlot = new Slot();
      newSlot.add(meeting);
      this.slots.push(newSlot);
    }
  }

}
