const isDarkTheme = document.querySelector('link').getAttribute('href').includes('dark');
if(!isDarkTheme){
    document.querySelector('#FI-branding img').setAttribute('src', '../NCE_Finance_Innovation_logo_NCE_positive_rgb.svg');
    document.querySelector('#hc-branding img').setAttribute('src', '../highcharts-logo-bl.svg');
}