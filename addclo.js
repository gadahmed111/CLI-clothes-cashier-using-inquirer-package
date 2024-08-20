import inquirer from 'inquirer';
import fs from 'fs';
import { Command } from 'commander';
const program = new Command();

inquirer.prompt([
    {
        type: 'input',
        name: "TheTypeOfClo",
        message: "Enter the type of clothes: "
    },
    {
        type: 'list',
        name: "TheSizeOfClo",
        message: "Enter the size of clothes: ",
        choices: [
            "xsmall",
            "small",
            "medium",
            "large",
            "xlarge",
            "2xlarge",
            "moreLarge"
        ]
    },
    {
        type: 'input',
        name: "TheColor",
        message: "Enter the color of clothes: "
    },
    {
        type: 'number',
        name: "ThePriceOfClo",
        message: "Enter the price of clothes: "
    }
]).then((ans) => {
    // Get the current time and date
    const TheData = new Date();
    const TheFullYear = TheData.getFullYear().toString().slice(2, 4);
    const TheFullTimeOfSaleing = `${TheData.getDate()}-${TheData.getMonth() + 1}-${TheFullYear} | ${TheData.getHours()}:${TheData.getMinutes()}`;
    ans["Time"] = TheFullTimeOfSaleing;
    let TheJSonFilePath = './TheSimpleDB/TheMainJsonFile.json';
    if (fs.existsSync(TheJSonFilePath)) {
        let TheReadOfJsonFile = fs.readFileSync(TheJSonFilePath, 'utf-8');
        let TheReadOfJsonFileAsJson = JSON.parse(TheReadOfJsonFile);
        TheReadOfJsonFileAsJson.push(ans);
        fs.writeFileSync(TheJSonFilePath, JSON.stringify(TheReadOfJsonFileAsJson), 'utf-8');
    } else {
        fs.writeFileSync(TheJSonFilePath, JSON.stringify([ans]), 'utf-8');
    }
});

