document.querySelector("#spreadSheetSwitcherButton").addEventListener('click', e => {
    e.preventDefault();
    window.location.search = `?spreadsheetID=${document.querySelector('#spreadSheetID').value}&spreadsheetKey=${document.querySelector('#spreadSheetKey').value}&`
});

window.addEventListener('load', ()=>{
    const params = new URLSearchParams(window.location.search)
    document.querySelector('#spreadSheetID').value = params.get('spreadsheetID');
    document.querySelector('#spreadSheetKey').value = params.get('spreadsheetKey');
})