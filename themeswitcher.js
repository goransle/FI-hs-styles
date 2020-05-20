export default function (buttonID) {
    const cssLink = document.querySelector('link');
    const themes = ['dark', 'light'];

    document.querySelector(buttonID).addEventListener('click', (e)=>{
        const currentTheme = themes.filter(t => cssLink.href.includes(t))[0]
        const nextTheme = themes.filter(t => !cssLink.href.includes(t))[0]

        cssLink.setAttribute('href', cssLink.href.replace(currentTheme, nextTheme));
    })
}