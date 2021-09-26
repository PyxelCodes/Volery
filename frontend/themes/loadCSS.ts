

export const loadCSS = (url) => {
    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = url;
    let head = document.getElementsByTagName('head')[0];
    head.parentNode.insertBefore(cssLink, head)
}