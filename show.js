import fs from 'fs';
import inquirer from 'inquirer';
import { Command } from 'commander';
const program = new Command();
function AskingTypeFun(TheVarName, TheGenralTypeinJsonFile) {
  inquirer.prompt([
    {
      type: 'input',
      name: TheVarName,
      message: `Select the ${TheVarName} you want to search through : `
    }
  ]).then((ans) => {
    if (fs.existsSync("./TheSimpleDB/TheMainJsonFile.json")) {
      let TheValueOfJsonFile = JSON.parse(fs.readFileSync('./TheSimpleDB/TheMainJsonFile.json', 'utf-8'))
      for (let item of TheValueOfJsonFile) {
        if (ans[TheVarName] == item[TheGenralTypeinJsonFile]) {
          console.table(item)
          continue
        }
      }
    } else {
      console.log("ERR:The file is empty, please create any process to register it")
      console.log("Try To write node AddTS.js ")
    }
  })
}
program.command('show')
  .description('Show the data table')
  .action(() => {
    let TheJSonFilePath = './TheSimpleDB/TheMainJsonFile.json';
    if (fs.existsSync(TheJSonFilePath)) {
      let TheReadOfJsonFile = fs.readFileSync(TheJSonFilePath, 'utf-8');
      let TheReadOfJsonFileAsJson = JSON.parse(TheReadOfJsonFile);
      console.table(TheReadOfJsonFileAsJson);
    } else {
      console.log("No data file found.");
    }
  });
program.command('showitem')
  .description('View a specific item')
  .action(() => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'ChooseSearch',
        message: "Choose what you want to search through : ",
        choices: [
          "type",
          "color",
          "size",
          "date"
        ]
      }
    ]).then((ans) => {
      switch (ans.ChooseSearch) {
        case "type":
          AskingTypeFun("type", "TheTypeOfClo");
          break;
        case "color":
          AskingTypeFun("color", "TheColor");
          break;
        case "size":
          AskingTypeFun("size", "TheSizeOfClo");
          break;
        case "date":
          AskingTypeFun("size", "Time");
          break;
      }
    })
  })
program.parse(process.argv);
