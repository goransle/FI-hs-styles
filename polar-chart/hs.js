import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/highcharts-more.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/exporting.src.js';
import defaultOptions from '../js/defaultOptions.js';
import setImages from '../js/setImages.js';

// Netto nedlastingar per måned
const chart = Highcharts.chart("container", {
    chart: {
        type: 'column',
        inverted: true,
        polar: true,
        styledMode: true,
        events: {
            ...defaultOptions.chart.events,
            redraw: (e) => {
                // Setter subtitle og serienavn til lesbar dato
                // TODO: bør kanskje tåle fleire serier
                const { series } = e.target;
                if (series.length && series[0].name.indexOf('/') > -1) {
                    const dateString = new Date(Date.UTC(series[0].name.split("/")[2], series[0].name.split("/")[1] - 1))
                        .toLocaleString('nb', { month: 'long', year: 'numeric' });
                    series[0].name = dateString.slice(0)[0].toUpperCase() + dateString.slice(1);
                    chart.setTitle(null, { text: series[0].name })
                }
            }
        }
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
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
        showLastLabel: true,
        labels:{
           style:{
               color: 'white'
           }
        }
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
        parsed: (data) => {
            if (data[0][0]) chart.setTitle({ text: data[0][0] });
        },
        complete:(e) =>{
            chart.hideLoading()
            setImages();
          }
    }
});
