
export const match = (options, def = () => false) => action => options.hasOwnProperty(action.type) ? (options[action.type])(action) : def(action);



export const matchExtension =  match({
    '.js': () => 'javascript',
    '.jsx': () => 'jsx',
    '.html': () => 'htmlmixed',
    '.css': () => 'css',
    '.scss': () => 'scss',
    '.php': () => 'php',
    '.json': () => 'json',
    '.map': () => 'json'
}, () => 'text');