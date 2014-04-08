var aya = exports;

function Grid(opts) {
  var self = this;
  var w = (opts && (opts.width || null));
  var h = (opts && (opts.height || null));
  var hasWidth = (opts && (w));
  var hasHeight = (opts && (h));
  var hasNotCoord = (!hasWidth && (!hasHeight));

  if (hasNotCoord) {
    throw new Error('You need to pass "width" and "height" as argument.');
  } else if (!hasWidth) {
    throw new Error('You need to pass "width" as argument.');
  } else if (!hasHeight) {
    throw new Error('You need to pass "height" as argument.');
  }

  self.width = w;
  self.height = h;

  return self;
}
aya.Grid = Grid;

function Position(opts) {
  var self = this;
  var x = (opts && (opts.x || null));
  var y = (opts && (opts.y || null));
  var grid = (opts && (opts.grid || null));
  var hasX = (opts && (x));
  var hasY = (opts && (y));
  var hasGrid = (opts && (grid && (grid instanceof Grid)));
  var hasNotPos = (!hasX && (!hasY && (!hasGrid)));
  var isGteWidth = (hasGrid && (x >= 0));
  var isLteWidth = (hasGrid && (x <= grid.width));
  var isGteHeight = (hasGrid && (y >= 0));
  var isLteHeight = (hasGrid && (y <= grid.height));

  if (hasNotPos) {
    throw new Error('You need to pass "x" and "y" positions and "grid" instance as argument.'); 
  } else if (!hasX) {
    throw new Error('You need to pass "x" position as argument.');
  } else if (!hasY) {
    throw new Error('You need to pass "y" position as argument.'); 
  } else if (!hasGrid) {
    throw new Error('You need to pass the "grid" instance as argument.'); 
  } else if (!isGteWidth) {
    throw new Error(
      'The x position should be grant than or equal the grid min width: ' + grid.width
    );
  } else if (!isLteWidth) {
    throw new Error(
      'The x position should be less than or equal the grid max width: ' + grid.width
    );
  } else if (!isGteHeight) {
    throw new Error(
      'The y position should be grant than or equal the grid min height: ' + grid.height
    );
  } else if (!isLteHeight) {
    throw new Error(
      'The y position should be less than or equal the grid max height: ' + grid.height
    );
  }

  self.x = x;
  self.y = y;
  self.grid = grid;

  return self;
}
aya.Position = Position;
