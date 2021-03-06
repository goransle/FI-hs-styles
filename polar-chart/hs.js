import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/highcharts-more.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/exporting.src.js';
import defaultOptions from '../js/defaultOptions.js';
import setImages from '../js/setImages.js';

const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetkey") || '1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw';
const spreadSheetKey = params.get("spreadsheetKey") || 5;

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
    credits: {
        enabled: false,
        text: "NCE Finance Innovation"
    },
    subtitle: {
        text: ''
    },
    tooltip: {
        outside: true,
    },
    legend: {
        enabled: false
    },
    pane: {
        size: '85%',
        innerSize: '20%',
        endAngle: 270
    },
    exporting:{
        ...defaultOptions.exporting
    },
    xAxis: {
        tickInterval: 1,
        labels: {
            align: 'right',
            useHTML: true,
            allowOverlap: true,
            step: 1,
            x: -20,
            y: 3,
            style: {
                fontSize: '13px',
                color: '#FFFFFF'
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
            y: 7,
            distance: 30,
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
        ...defaultOptions.data,
        googleSpreadsheetKey: spreadsheet,
        googleSpreadsheetWorksheet: spreadSheetKey,
        parsed: (data) => {
            if (data[0][0]) chart.setTitle({ text: data[0][0] });
        },
        complete:(e) => {
            setImages();
        }
    }
});