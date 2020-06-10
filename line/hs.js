
import Highcharts from 'https://code.highcharts.com/8.1.0/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/8.1.0/es-modules/masters/modules/data.src.js'
import setImages from '../js/setImages.js';
import defaultOptions from '../js/defaultOptions.js';

//@ts-check
const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetkey") || '1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw';
const spreadSheetKey = params.get("spreadsheetKey") || 1;


const chart = Highcharts.chart("container", {
  ...defaultOptions,
  loading:{
    showDuration: 1500,
    hideDuration: 1500
  },
  title: {
    text: ""
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
    googleSpreadsheetWorksheet: spreadSheetKey,
    switchRowsAndColumns: true,
    parsed: (data) =>{
      if(data[0][0]) chart.setTitle({text: data[0][0]});
    },
    complete:(e) =>{
      chart.hideLoading()
      setImages();
    }
  }
});

chart.showLoading("Loading...");