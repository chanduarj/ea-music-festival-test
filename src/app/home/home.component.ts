import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/app.service";
import {
  DisplayRecord,
  Festival,
  Band
} from "../modal/app-modal";
import { clientUrl, mockUrl} from '../app.config';
import * as _ from 'lodash'; 

@Component({
  selector: "app-app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public errorMessage: string;
  musicFestivalData: Array<DisplayRecord> = new Array<DisplayRecord>();
  constructor(private bandsDataService: DataService) {
  }

  ngOnInit() {
    this.getMusicBandData();
  }

  getMusicBandData() { // fetch Music Bands data
    this.bandsDataService.getData(clientUrl)
    .subscribe((res: any[]) => {
      this.formDisplayData(res);
    }, error => {
      this.bandsDataService.getData(mockUrl) // Using Mock json data if API is down or throttled
      .subscribe((res: any[]) => {
        this.formDisplayData(res);
      }) 
      this.handleError(error)
    });
  }

  formDisplayData(musicBandsData: any) { // form required data to display in requested format
    musicBandsData.forEach(festivals => {
      festivals.bands.forEach(bands => {
        let recordObject = new DisplayRecord();
        let bandObject = new Band();
        let festivalObject = new Festival();
        let addRecord = true;
        if(!bands.recordLabel) // Return if record label is null or undefined
          return;
        recordObject.name = bands.recordLabel;
        bandObject.name = bands.name;
        festivalObject.name = festivals.name;
        
        if (festivals.name) { // Don't push if null or undefined
          festivalObject.name = festivals.name;
          bandObject.festivals.push(festivalObject);
        }
        
        this.musicFestivalData.forEach(item => {
          if (
            item.name &&
            bands.recordLabel &&
            item.name === bands.recordLabel
          ) {
            addRecord = false;
            item.band.push(bandObject);
          }
        });

        if (addRecord) { 
          recordObject.band.push(bandObject);
          this.musicFestivalData.push(recordObject);
        }
      });
    });

    this.musicFestivalData = _.orderBy(this.musicFestivalData, ['name']);
  }

  handleError(error: any) { // handle errors
    this.errorMessage = error.message;
  }
}
