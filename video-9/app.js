// Impor validator
import validator from "validator";
// Impor chalk
import chalk from 'chalk';

// Penggunaan validator
console.log(validator.isEmail("anifyuli007@outlook.co.id"));
console.log(validator.isMobilePhone("08212345678", ["id-ID"]));
console.log(validator.isNumeric("082satu2345678"));

// Penggunaan chalk untuk teks sebaris
console.log(chalk.whiteBright.bgYellow("Hello world!"));
console.log(chalk.italic.blueBright.bgYellow("Konnichiwa minna-san!"));

// Penggunaan chalk untuk string literal
const lorem = `Ut velit ${chalk.red("eu veniam culpa")} eiusmod ${chalk.bgWhite("id in in reprehenderit")} ex. Minim aliquip exercitation dolor do eiusmod. Irure esse ex ex sunt. Enim amet magna commodo mollit. ${chalk.dim("Anim id deserunt")} sit qui minim minim culpa esse ${chalk.bold.cyan.bgYellow("occaecat aute")} tempor veniam ${chalk.bold.underline("incididunt")}.`;
console.log(lorem);