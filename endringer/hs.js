import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/stock.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js'
import defaultOptions from '../js/defaultOptions.js';
import setImages from '../js/setImages.js';

const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetID") || '1da82Nx3vYm14msH7oYtdYkrXoSSmsU84xlf8EMIofNg';
const spreadSheetKey = params.get("spreadsheetKey") || 1

const chart = Highcharts.stockChart("container", {
  ...defaultOptions,
  plotOptions: {
    series: {
      compare: 'percent',
      showInNavigator: true
    }
  },
  tooltip: {
    pointFormat: '<span>{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
    valueDecimals: 2,
    split: true
  },
  navigator: { enabled: false },
  rangeSelector: {
    enabled: false
  },
  yAxis: {
    opposite: false
  },
  scrollbar: {
    enabled: false
  },
  data: {
    googleSpreadsheetKey: spreadsheet,
    googleSpreadsheetWorksheet: spreadSheetKey, // fane nr 1
    switchRowsAndColumns: true,
    complete: ()=>{
      chart.hideLoading();
      setImages();
    },
    parsed: (data) =>{
      if(data[0][0]) chart.setTitle({text: data[0][0]});
    }
  }
});