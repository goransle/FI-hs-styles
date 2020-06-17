export default function (buttonID) {
    const cssLink = document.querySelector('link');
    const themes = ['dark', 'light'];

    const params = new URLSearchParams(window.location.search)

    window.addEventListener('load', e=>{
        const defaultTheme = themes.filter(t => cssLink.href.includes(t))[0]
        if(params.has('theme')){
            cssLink.setAttribute('href', cssLink.href.replace(defaultTheme, params.get('theme')));
        }
    })

    document.querySelector(buttonID).addEventListener('click', (e)=>{
        const nextTheme = themes.filter(t => !cssLink.href.includes(t))[0]
        params.set('theme', nextTheme);
        window.location.search = '?' + params.toString();
    })
}