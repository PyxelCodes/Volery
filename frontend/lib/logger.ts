

export default function logger(module, ...args) {
    console.log(
        `%c[${module}]`,
        'color: #3e82e5;',
        ...args
    );
}