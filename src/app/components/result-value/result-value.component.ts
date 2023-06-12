import { Component, EventEmitter, Input, Output } from '@angular/core';
interface MENU {
  name: string;
  type: string;
  active: boolean;
}
@Component({
  selector: 'app-result-value',
  templateUrl: './result-value.component.html',
  styleUrls: ['./result-value.component.scss'],
})
export class ResultValueComponent {
  @Input() data: any;
  type = 'race-result';
  raceMenu: MENU[] = [
    { name: 'Race Result', type: 'race-result', active: true },
    { name: 'Fastest Laps', type: 'fastest-laps', active: false },
    { name: 'Pit Stop Summary', type: 'pit-stop', active: false },
    { name: 'Starting gird', type: 'starting-grid', active: false },
    { name: 'Qualifying', type: 'qualifying', active: false },
  ];

  handleRace(race: MENU) {
    this.raceMenu.forEach((e: MENU) => {
      e.active = e === race;
    });
    this.type = race.type;
  }
}
