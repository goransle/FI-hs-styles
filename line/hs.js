import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js'


const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetkey") || '1da82Nx3vYm14msH7oYtdYkrXoSSmsU84xlf8EMIofNg';
const spreadSheetKey = params.get("spreadsheetKey") || 1

const chart = Highcharts.chart("container", {
  chart: {
    styledMode: true,
    type: "line"
  },
  title: {
    text: "Antall medlemmer"
  },
  credits: {
    enabled: false,
    text: "NCE Finance Innovation"
  },
  yAxis: {
    title: null,
    offset: 0
  },
  xAxis: {
    offset: -3
  },
  plotOptions: {
    chart: {
      animation: true
    },
    series: {
      marker: {
        symbol: 'circle'
      }
    }
  },
  defs: {
    glow: {
      tagName: 'filter',
      id: 'glow',
      opacity: 0.25,
      children: [{
        tagName: 'feGaussianBlur',
        result: 'coloredBlur',
        stdDeviation: 3.5
      }, {
        tagName: 'feMerge',
        children: [{
          tagName: 'feMergeNode',
          in: 'coloredBlur'
        }, {
          tagName: 'feMergeNode',
          in: 'coloredBlur'
        }, {
          tagName: 'feMergeNode',
          in: 'coloredBlur'
        }, {
          tagName: 'feMergeNode',
          in: 'SourceGraphic'
        }]
      }]
    }
  },
  data: {
    googleSpreadsheetKey: spreadsheet,
    googleSpreadsheetWorksheet: 1, // fane nr 1
    switchRowsAndColumns: true,
    parsed: (data) =>{
      if(data[0][0]) chart.setTitle({text: data[0][0]});
    }
  }
});