import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/es-modules/modules/data.src.js'
import defaultOptions from '../js/defaultOptions.js';
import setImages from '../js/setImages.js';

const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetkey") || '1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw';
const spreadSheetKey = params.get("spreadsheetKey") || 3

const chart = Highcharts.chart("container", {
  ...defaultOptions,
  tooltip:{
    ...defaultOptions.tooltip,
    formatter: function () {
      console.log(this)
      const originalData = this.series.chart.originalData[this.series.index].sort((a,b) => a[1] - b[1])
      console.log(originalData)
      const min = originalData[0][1], max = originalData[originalData.length - 1][1];
      const total = this.series.dataMax;
      const avg = total / this.series.processedYData.length;
      return `${this.series.name}<br>
      <span style="color:var(--color-p)">Største: ${max}<span><br>
      <span style="color:red">Laveste: ${min}<span><br>
      Gjennomsnittlig: ${avg}<br>
      Total økning: ${total}
      `;
    }
  },
  data: {
    googleSpreadsheetKey: spreadsheet,
    googleSpreadsheetWorksheet: spreadSheetKey, // fane nr 1
    switchRowsAndColumns: true,
    dateFormat: 'mm/dd/YYYY',
    complete: (data) => {
      data.series.forEach(s => {
        // Add the previous years data
        if(!chart.originalData) chart.originalData = [];
        chart.originalData.push(s.data)
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

chart.showLoading('');