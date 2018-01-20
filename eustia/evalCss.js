/* Eval css.
 */

_('toStr each filter');

var styleList = [],
    scale = 1;

function exports(css)
{
    css = toStr(css);

    for (var i = 0, len = styleList.length; i < len; i++)
    {
        if (styleList[i].css === css) return;
    }

    let container = exports.container || document.head,
        el = document.createElement('style');

    el.type = 'text/css';
    container.appendChild(el);
    
    let style = {css, el, container};
    resetStyle(style);
    styleList.push(style);

    return style;
}

exports.setScale = function (s) 
{
    scale = s;
    each(styleList, style => resetStyle(style));
};

exports.clear = function () 
{
    each(styleList, ({container, el}) => container.removeChild(el));
    styleList = [];
};

exports.remove = function (style) 
{
    styleList = filter(styleList, s => s !== style);

    style.container.removeChild(style.el);
};

function resetStyle({css, el}) 
{
    el.innerText = css.replace(/(\d+)px/g, ($0, $1) => (+$1 * scale) + 'px');
}
