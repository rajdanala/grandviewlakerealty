
Staging - http://grandviewlakerealty.rajdanala.com/
[![Build Status](https://api.shippable.com/projects/5615b0911895ca44741ada01/badge?branchName=master)](https://app.shippable.com/projects/5615b0911895ca44741ada01/builds/latest)

Future Prod http://grandviewlakerealty.com website


## Export mongodb
```shell
$ mongoexport --host 127.0.0.1 --port 3001 --db meteor --collection grandviewpages --out grandviewpages.json

$ mongoexport --host 127.0.0.1 --port 3001 --db meteor --collection grandviewlistings --out grandviewlistings.json

$ mongoexport --host 127.0.0.1 --port 3001 --db meteor --collection users --out users.json
```
## Import mongodb
```shell
$ mongoimport -h localhost:27017 --db grandviewlakerealty --collection grandviewpages --type json --file ~/grandviewpages.json

$ mongoimport -h localhost:27017 --db grandviewlakerealty --collection grandviewlistings --type json --file ~/grandviewlistings.json

$ mongoimport -h localhost:27017 --db grandviewlakerealty --collection users --type json --file ~/users.json

```

## sql equivalent of mongo
```shell

-- SQL
-- select _id,menuorder from grandviewpages orderby menuorder;

-- mongo
db.grandviewpages.find( {},{menu:1,menuorder:1} ).sort({menuorder:1});

```shell