export class Record {
    name: string;
    recordLabel: string;
  }
  
  export class MusicFestival {
    name: string;
    bands: Array<Record>;
  }
  export class Festival {
    name: string;
  }
  export class Band {
    name: string;
    festivals: Array<Festival> = Array<Festival>();
  }
  export class DisplayRecord {
    name: string;
    band: Array<Band> = new Array<Band>();
  }