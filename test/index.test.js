var should = require('should');
var aya = require('../');

describe('Aya grid', function () {
  var grid = null;

  it('should be throw an error if not receive width', function () {
    var actual = (function () { new aya.Grid({ height: 10 }); });
    
    actual.should.throwError('You need to pass "width" as argument.');
  });

  it('should be throw an error if not receive height', function () {
    var actual = (function () { new aya.Grid({ width: 10 }); });
    
    actual.should.throwError('You need to pass "height" as argument.');
  });

  it('should be throw an error if not receive grid size', function () {
    var actual = (function () { new aya.Grid(); });
    
    actual.should.throwError('You need to pass "width" and "height" as argument.');
  });

  it('should be return an instance of Grid', function () {
    grid = new aya.Grid({ width: 10, height: 10 });

    grid.should.be.an.instanceof(aya.Grid);
  });

  it('should be have width', function () {
    grid.width.should.eql(10);
  });

  it('should be have height', function () {
    grid.height.should.eql(10);
  });
});

describe('Aya position', function () {
  var grid = new aya.Grid({ width: 10, height: 10 });
  var position = null;

  it('should be throw an error if not receive x', function () {
    var actual = (function () { new aya.Position({ y: 10 }) });

    actual.should.throwError('You need to pass "x" position as argument.');
  });

  it('should be throw an error if not receive y', function () {
    var actual = (function () { new aya.Position({ x: 10 }) });

    actual.should.throwError('You need to pass "y" position as argument.');
  });

  it('should be throw an error if not receive the positions', function () {
    var actual = (function () { new aya.Position() });

    actual
      .should
      .throwError('You need to pass "x" and "y" positions and "grid" instance as argument.');
  });

  it('should be throw an error if not receive the grid', function () {
    var actual = (function () { new aya.Position({ x: 1, y: 1 }) });

    actual.should.throwError('You need to pass the "grid" instance as argument.');
  });

  it('should be throw an error if not grant than or equal width min size', function () {
    var actual = (function () { new aya.Position({ x: -1, y: 1, grid: grid }); });

    actual
      .should
      .throwError('The x position should be grant than or equal the grid min width: ' + grid.width);
  });

  it('should be throw an error if not less than or equal width max size', function () {
    var actual = (function () { new aya.Position({ x: 11, y: 1, grid: grid }); });

    actual
      .should
      .throwError('The x position should be less than or equal the grid max width: ' + grid.width);
  });

  it('should be throw an error if not grant than or equal height min size', function () {
    var actual = (function () { new aya.Position({ x: 1, y: -1, grid: grid }); });

    actual
      .should
      .throwError('The y position should be grant than or equal the grid min height: ' + grid.height);
  });

  it('should be throw an error if not less than or equal height max size', function () {
    var actual = (function () { new aya.Position({ x: 1, y: 11, grid: grid }); });

    actual
      .should
      .throwError('The y position should be less than or equal the grid max height: ' + grid.height);
  });

  it('should be an instance of position', function () {
    position = new aya.Position({ x: 1, y: 1, grid: grid }); 

    position.should.be.an.instanceof(aya.Position);
  });

  it('should be x position', function () {
    position.x.should.eql(1);
  });

  it('should be y position', function () {
    position.y.should.eql(1);
  });

  it('should be grid instance', function () {
    position.grid.should.be.an.instanceof(aya.Grid);
  });
});

describe('Aya position movement', function () {
  var grid = new aya.Grid({ width: 10, height: 10 });
  var position = new aya.Position({ x: 1, y: 1, grid: grid });

  it('should be throw an error if not greater than or equal grid min width size', function () {
    var actual = (function () { position.moveX(-1); });

    actual
      .should
      .throwError('The x position should be grant than or equal the grid min width: ' + grid.width);
  });

  it('should be throw an error if not less than or equal grid max width size', function () {
    var actual = (function () { position.moveX(11); });

    actual
      .should
      .throwError('The x position should be less than or equal the grid max width: ' + grid.width);
  });

  it('should be move in x', function () {
    position
      .moveX(2)
      .x.should.be.eql(2);
  });

  it('should be throw an error if not greater than or equal grid min height size', function () {
    var actual = (function () { position.moveY(-1); });

    actual
      .should
      .throwError('The y position should be grant than or equal the grid min height: ' + grid.height);
  });

  it('should be throw an error if not less than or equal grid max height size', function () {
    var actual = (function () { position.moveY(11); });

    actual
      .should
      .throwError('The y position should be less than or equal the grid max height: ' + grid.height);
  });

  it('should be move in y', function () {
    position
      .moveY(2)
      .y.should.be.eql(2);
  });

  it('should be move in both axis', function () {
    var actual = position.move({ x: 1, y: 1 });

    actual.x.should.be.eql(1);
    actual.y.should.be.eql(1);
  });
});
