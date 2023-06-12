import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  valueName = '';
  data = {
    type: '',
    arrResult: [],
  };
  dataValue = {
    type: '',
    arrResult: [],
    pitStop: [],
    qualifying: [],
  };
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
  constructor(
    private searchServices: SearchService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initSeason();
  }

  initSeason() {
    this.searchServices.getSeason().subscribe((season) => {
      this.seasonList = season;
      this.seasonList.filter((s: Season) => (s.active = false));
      this.seasonList[0].active = true;
      this.initParams();
      this.initValue(this.year, this.type);
    });
  }

  initParams() {
    this.route.queryParams.subscribe((params: any) => {
      let year = 2023;
      let type = 'races';
      let value = '';
      if (params.season) {
        year = params.season;
        this.year = year;
        this.seasonList.forEach((season) => {
          season.active = false;
          if (season.year == year) {
            season.active = true;
          }
        });
      }
      if (params.type) {
        type = params.type;
        this.type = type;
        this.typeList.forEach((types) => {
          types.active = false;
          if (types.type == type) {
            types.active = true;
          }
        });
      }
    });
  }

  initValue(year: number, type: string) {
    this.searchServices.getValue({ season: year, type }).subscribe((res) => {
      switch (type) {
        case 'drivers':
          this.driverList = res.data;
          this.driverList.forEach((e) => {
            e.active = false;
          });
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
            active: true,
          };
          this.driverList.unshift(driver);
          this.driverResult = res.result;
          this.driverResult.sort(
            (a: any, b: any) => b.totalPoint - a.totalPoint
          );
          this.data = {
            type: type,
            arrResult: this.driverResult,
          };
          break;
        case 'teams':
          this.teamList = res.data;
          this.teamList.forEach((e) => {
            e.active = false;
          });
          const team = {
            _id: 0,
            constructorRef: '',
            name: 'All',
            nationality: '',
            url: '',
            active: true,
          };
          this.teamList.unshift(team);
          this.teamResult = res.result;
          this.teamResult.sort((a: any, b: any) => b.totalPoint - a.totalPoint);
          this.data = {
            type: type,
            arrResult: this.teamResult,
          };
          break;
        default:
          this.raceList = res.data;
          this.raceList.forEach((e) => {
            e.active = false;
          });
          const race = {
            alt: 0,
            circuitRef: '',
            country: 'All',
            lat: 0,
            lng: 0,
            location: '',
            name: '',
            url: '',
            active: true,
          };
          this.raceList.unshift(race);
          this.data = {
            type: type,
            arrResult: res.result,
          };
          break;
      }
    });
  }

  handleSeason(type: Season) {
    console.log(this.seasonList);

    this.seasonList.forEach((season) => {
      season.active = season.year === type.year;
    });
    this.year = type.year;
    this.value = '';
    let dataFind = {
      season: this.year,
      type: this.type,
      value: this.value,
    };
    this.changeParams(dataFind);
    this.initValue(this.year, this.type);
  }
  handleType(type: TypeList) {
    this.typeList.forEach((t) => {
      t.active = t === type;
    });
    this.type = type.type;
    this.value = '';
    let dataFind = {
      season: this.year,
      type: this.type,
      value: this.value,
    };
    this.changeParams(dataFind);
    this.initValue(this.year, this.type);
  }
  handleValue(value: Teams | Races | Season | any, type: string) {
    switch (type) {
      case 'teams':
        this.teamList.forEach((team: Teams) => {
          team.active = team === value;
        });
        this.value = value.constructorRef;
        this.valueName = value.name;
        break;
      case 'drivers':
        this.driverList.forEach((driver: Driver) => {
          driver.active = driver === value;
        });
        this.value = value.driverRef;
        this.valueName = value.forename + ' ' + value.surname;
        break;
      default:
        this.raceList.forEach((race: Races) => {
          race.active = race === value;
        });
        this.value = value.circuitRef;
        this.valueName = value.name;
        break;
    }
    let dataFind = {
      season: this.year,
      type: this.type,
      value: this.value,
    };
    this.changeParams(dataFind);
    this.filterData(this.year, type, this.value);
  }
  itemTeamList: any = [];
  itemDriverList: any = [];
  filterData(year: number, type: string, value: string) {
    this.searchServices
      .filterData({ season: year, type, value })
      .subscribe((res) => {
        this.dataValue = {
          type: type,
          arrResult: res.data,
          pitStop: res.pitStop ? res.pitStop : [],
          qualifying: res.qualifying ? res.qualifying : [],
        };
      });
  }

  changeParams(params: any) {
    // this.router.navigate([], { queryParams: params });
    let hash = '?';
    for (let i in params) {
      if (i != 'offset' && i != 'limit') {
        if (params[i]) hash += i + '=' + params[i] + '&';
      }
    }
    // window.location.hash = '#!' + hash;
    if (window.history.pushState) {
      // IE10, Firefox, Chrome, etc.
      window.history.pushState(null, '', hash);
    }
  }
}
