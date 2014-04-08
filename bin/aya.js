#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var util = require('util');
var aya = require('../');
var args = process.argv.slice(2);
var fileLocation = path.join(process.cwd(), args[0]); 
var fileContent = fs.readFileSync(fileLocation, 'utf-8');
var content = fileContent.split('\n');
var header = content.slice(0, 2);
var sep = (new Array(50)).join('-');
var rawSize = header[0].split(' ');
var grid = new aya.Grid({ width: rawSize[0], height: rawSize[1] });
var rawPosition = header[1].split(' ');
var position = new aya.Position({ x: parseInt(rawPosition[0], 10), y: parseInt(rawPosition[1], 10), grid: grid }); 
var robot = new aya.Robot({ direction: rawPosition[2], position: position });

function contentMapHandler(current) {
  var isTeletransport = (current && (current.indexOf('T') === 0));
  var rawPos = null;
  var isBatch = (!isTeletransport && (current));

  if (isTeletransport) {
    rawPos = current.split(' '); 
    robot.command(rawPos[0], { x: parseInt(rawPos[1], 10), y: parseInt(rawPos[2], 10) }); 
  } else {
    robot.batch(current);
  }
}
content.slice(2).map(contentMapHandler);

console.log('%s %s %s', robot.position.x, robot.position.y, robot.direction);
process.exit(0);
