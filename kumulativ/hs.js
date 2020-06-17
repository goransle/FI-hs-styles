import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/es-modules/modules/data.src.js'
import defaultOptions from '../js/defaultOptions.js';
import setImages from '../js/setImages.js';

const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetkey") || '1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw';
const spreadSheetKey = params.get("spreadsheetKey") || 2


const chart = Highcharts.chart("container", {
  ...defaultOptions,
  data: {
    googleSpreadsheetKey: spreadsheet,
    googleSpreadsheetWorksheet: spreadSheetKey, // fane nr 1
    switchRowsAndColumns: true,
    complete: (data) => {
      data.series.forEach(s => {
        // Add the previous years data
        s.data = s.data.map((d, i, arr) => {
          if (i > 0) d[1] += arr[i - 1][1];
          return d;
        })
      })
        chart.hideLoading();
        setImages();
    },
    parsed: (data) => {
      if (data[0][0]) chart.setTitle({ text: data[0][0] });
    }
  }
});

chart.showLoading('....');