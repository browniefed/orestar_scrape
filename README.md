orsetarparse
============
How to run

```
npm install

node scraper DATESTART DATEEND DELAY_IN_SECONDS(Defaults to 10 seconds)


EXAMPLE:
//Will start at August 12 and ouput weekly files for the last month and delay requests every 5 seconds
node scraper 08/12/2014 07/12/2014 5
```

This will dump STARTWEEKDATE_ENDWEEKDATE.xls files into the scraper folder.
