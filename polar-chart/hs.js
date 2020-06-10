import Highcharts from 'https://code.highcharts.com/8.1.0/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/8.1.0/es-modules/masters/highcharts-more.src.js';
import 'https://code.highcharts.com/8.1.0/es-modules/masters/modules/data.src.js';
import 'https://code.highcharts.com/8.1.0/es-modules/masters/modules/exporting.src.js';
import defaultOptions from '../js/defaultOptions.js';


// Netto nedlastingar per måned
Highcharts.chart("container", {
    chart: {
        type: 'column',
        inverted: true,
        polar: true,
        styledMode: true,
        events: defaultOptions.chart.events
    },
    title: {
        text: 'Antall nedlastingar per månad'
    },
    subtitle: {
    		text: 'Juni 2020'
    },
    tooltip: {
        outside: true
    },
    pane: {
        size: '85%',
        innerSize: '20%',
        endAngle: 270
    },
    xAxis: {	
        tickInterval: 1,
        labels: {
            align: 'right',
            useHTML: true,
            allowOverlap: true,
            step: 1,
            y: 3,
            style: {
                fontSize: '13px'
            }
        },
        lineWidth: 0,
    },
    yAxis: {
        crosshair: {
            enabled: true,
            color: '#333'
        },
        lineWidth: 0,
        tickInterval: 200,
        reversedStacks: false,
        endOnTick: true,
        showLastLabel: true
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            borderWidth: 0,
            pointPadding: 0,
            groupPadding: 0.15
        },
    },
  data: {
    googleSpreadsheetKey: "1da82Nx3vYm14msH7oYtdYkrXoSSmsU84xlf8EMIofNg",
    googleSpreadsheetWorksheet: 7, // fane nr 7
 
  }
});
