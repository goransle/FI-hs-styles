import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/stock.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/exporting.src.js'
import defaultOptions from '../js/defaultOptions.js';
import setImages from '../js/setImages.js';

const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetID") || '1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw';
const spreadSheetKey = params.get("spreadsheetKey") || 2

const chart = Highcharts.stockChart("container", {
  ...defaultOptions,
  plotOptions: {
    series: {
      compare: 'percent',
      showInNavigator: true
    }
  },
  chart:{
    ...defaultOptions.chart,
    events:{
      load: (e) => {
        if (params.get("cycle")) {
          let currentVisibleSeries = 0;
          setInterval(() => {
            if (e.target.series) {
              e.target.series[0].points[currentVisibleSeries].onMouseOver();
              if (currentVisibleSeries === e.target.series[0].points.length - 1) currentVisibleSeries = 0;
              else currentVisibleSeries++;
            }
          }, params.get("cycleSpeed") || 5000);
        }
      }
    }
  },
  legend:{
    enabled: true
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
    ...defaultOptions.data,
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