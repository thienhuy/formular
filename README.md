# Fomular1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page

Create Interface driver, team, race, season

Create interceptor, service giúp ta có thể thao tác với backend và tạo ra các HTTP request.

Create componnent Search , Result, Result Value,

Component search sẽ render Season, Race or Driver or Team,
 - User sẽ chọn đc năm, race , driver hay team sẽ show đc tên đường đua hoặc tên các team và các tay đua.
 - Gửi request api lấy đc mảng Season, khi User chọn races, team hay driver sẽ gửi 1 request để lấy đc mảng tương ứng.
 - Ngoài ra khi user chọn năm và race, teams, driver, sẽ trả về kêt quả đua của từng race, driver hay teams trong năm đó.
 - User có thể chọn tên theo race, teams, drivers sẽ show đc kết quả từng drivers, team hoặc races
