document.querySelector("#spreadSheetSwitcherButton").addEventListener('click', e => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search)
    params.set('spreadsheetID',document.querySelector('#spreadSheetID').value );
    params.set('spreadsheetKey',document.querySelector('#spreadSheetKey').value );
    window.location.search = '?' + params.toString()
});

window.addEventListener('load', ()=>{
    const params = new URLSearchParams(window.location.search)
    document.querySelector('#spreadSheetID').value = params.get('spreadsheetID');
    document.querySelector('#spreadSheetKey').value = params.get('spreadsheetKey');
})