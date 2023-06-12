import { Component, OnInit } from '@angular/core';
import { Filter, Season } from 'src/app/common/models';
import { Driver } from 'src/app/common/models/driver';
import { Races } from 'src/app/common/models/races';
import { Teams } from 'src/app/common/models/team';
import { SearchService } from 'src/app/services/search.service';
interface TypeList {
  type: string;
  name: string;
  active: Boolean;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  seasonList: Season[] = [];
  raceList: Races[] = [];
  teamList: Teams[] = [];
  driverList: Driver[] = [];
  raceResult: any = [];
  driverResult: any = [];
  teamResult: any = [];
  type = 'races';
  year = 2023;
  value = '';
  typeList: TypeList[] = [
    {
      type: 'races',
      name: 'Races',
      active: true,
    },
    {
      type: 'drivers',
      name: 'Drivers',
      active: false,
    },
    {
      type: 'teams',
      name: 'Teams',
      active: false,
    },
  ];
  constructor(private searchServices: SearchService) {}
  ngOnInit(): void {
    this.initValue(this.year, this.type, this.value);
    this.initSeason();
  }

  initSeason() {
    this.searchServices.getSeason().subscribe((season) => {
      this.seasonList = season;
      this.seasonList.filter((s: Season) => (s.active = false));
      this.seasonList[0].active = true;
    });
  }

  initValue(year: number, type: string, value: string) {
    this.searchServices
      .getValue({ season: year, type, value })
      .subscribe((res) => {
        switch (type) {
          case 'drivers':
            this.driverList = res.data;
            const driver = {
              _id: 0,
              driverRef: '',
              number: 0,
              code: '',
              forename: '',
              surname: 'All',
              dob: '',
              nationality: '',
              url: '',
            };
            this.driverList.unshift(driver);
            this.driverResult = res.result;
            this.driverResult.sort(
              (a: any, b: any) => b.totalPoint - a.totalPoint
            );
            break;
          case 'teams':
            this.teamList = res.data;
            const team = {
              _id: 0,
              name: 'All',
              nationality: '',
              url: '',
            };
            this.teamList.unshift(team);
            this.teamResult = res.result;
            this.teamResult.sort(
              (a: any, b: any) => b.totalPoint - a.totalPoint
            );
            break;
          default:
            const race = {
              alt: 0,
              circuitRef: '',
              country: 'All',
              lat: 0,
              lng: 0,
              location: '',
              name: '',
              url: '',
            };
            this.raceList = res.data;
            this.raceList.unshift(race);
            this.raceResult = res.result;

            break;
        }
      });
  }

  clickSeason(type: Season) {
    this.seasonList.forEach((season) => {
      season.active = season === type;
    });
    this.year = type.year;
    this.initValue(this.year, this.type, this.value);
  }
  clickType(type: TypeList) {
    this.typeList.forEach((t) => {
      t.active = t === type;
    });
    this.type = type.type;
    this.initValue(this.year, this.type, this.value);
  }
}
