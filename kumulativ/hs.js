import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js'
import defaultOptions from '../js/defaultOptions.js';

const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetkey") || '1da82Nx3vYm14msH7oYtdYkrXoSSmsU84xlf8EMIofNg';


const chart = Highcharts.chart("container", {
  ...defaultOptions,
  data: {
    googleSpreadsheetKey: spreadsheet,
    googleSpreadsheetWorksheet: 1, // fane nr 1
    switchRowsAndColumns: true,
    complete: (data) => {
      data.series.forEach(s => {
        // Add the previous years data
        s.data = s.data.map((d, i, arr) => {
          if (i > 0) d[1] += arr[i - 1][1];
          return d;
        })
      })
    },
    parsed: (data) => {
      if (data[0][0]) chart.setTitle({ text: data[0][0] });
    }
  }
});