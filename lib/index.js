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

function isGteWidthHandler(x) {
  var out = false;

  if (x >= 0) {
    out = true;
  }

  return out;
}

function isLteWidthHandler(x, width) {
  var out = false;

  if (x <= width) {
    out = true;
  }

  return out;
}

function isGteHeightHandler(y) {
  var out = false;

  if (y >= 0) {
    out = true;
  }

  return out;
}

function isLteHeightHandler(y, height) {
  var out = false;

  if (y <= height) {
    out = true;
  }

  return out;
}

function hasGridHandler(grid) {
  var out = false;

  out = (grid && (grid instanceof Grid));

  return out;
}

function illegalMovementInAxisXHandler(x, grid) {
  var hasGrid = hasGridHandler(grid);
  var isGteWidth = (hasGrid && (isGteWidthHandler(x)));
  var isLteWidth = (hasGrid && (isLteWidthHandler(x, grid.width)));

  if (!isGteWidth) {
    throw new Error(
      'The x position should be grant than or equal the grid min width: ' + grid.width
    );
  } else if (!isLteWidth) {
    throw new Error(
      'The x position should be less than or equal the grid max width: ' + grid.width
    );
  }
}

function illegalMovementInAxisYHandler(y, grid) {
  var hasGrid = hasGridHandler(grid);
  var isGteHeight = (hasGrid && (isGteHeightHandler(y)));
  var isLteHeight = (hasGrid && (isLteHeightHandler(y, grid.height)));

  if (!isGteHeight) {
    throw new Error(
      'The y position should be grant than or equal the grid min height: ' + grid.height
    );
  } else if (!isLteHeight) {
    throw new Error(
      'The y position should be less than or equal the grid max height: ' + grid.height
    );
  }
}

function Position(opts) {
  var self = this;
  var x = (opts && (opts.x || null));
  var y = (opts && (opts.y || null));
  var grid = (opts && (opts.grid || null));
  var hasX = (opts && (x));
  var hasY = (opts && (y));
  var hasGrid = hasGridHandler(grid);
  var hasNotPos = (!hasX && (!hasY && (!hasGrid)));

  if (hasNotPos) {
    throw new Error('You need to pass "x" and "y" positions and "grid" instance as argument.'); 
  } else if (!hasX) {
    throw new Error('You need to pass "x" position as argument.');
  } else if (!hasY) {
    throw new Error('You need to pass "y" position as argument.'); 
  } else if (!hasGrid) {
    throw new Error('You need to pass the "grid" instance as argument.'); 
  }

  illegalMovementInAxisXHandler(x, grid);
  illegalMovementInAxisYHandler(y, grid);

  self.x = x;
  self.y = y;
  self.grid = grid;

  return self;
}

function positionMoveXHandler(x) {
  var self = this;

  illegalMovementInAxisXHandler(x, self.grid);
  self.x = x;

  return self;
}
Position.prototype.moveX = positionMoveXHandler;

function positionMoveYHandler(y) {
  var self = this;

  illegalMovementInAxisYHandler(y, self.grid);
  self.y = y;

  return self;
}
Position.prototype.moveY = positionMoveYHandler;

function positionMoveHandler(opts) {
  var self = this;
  var x = (opts && (opts.x || null));
  var y = (opts && (opts.y || null));

  self
    .moveX(x)
    .moveY(y);

  return self;
}
Position.prototype.move = positionMoveHandler;

aya.Position = Position;

function Robot(opts) {
  var self = this;
  var direction = (opts && (opts.direction || null));
  var position = (opts && (opts.position || null));
  var directions = self.directions = ['N', 'W', 'S', 'E'];
  var hasPosition = (position && (position instanceof Position));
  var hasDirection = (direction);
  var isCorrectDirection = (directions.indexOf(direction) > -1);

  if (!hasPosition) {
    throw new Error('You need to pass an position instance as argument.');
  } else if (!hasDirection) {
    throw new Error('You need to pass an direction as argument.');
  } else if (!isCorrectDirection) {
    throw new Error('You need to pass an correct direction like: ' + directions.join(', ')); 
  }

  self.direction = direction;
  self.position = position;

  return self;
}

function robotRotateRightHandler() {
  var self = this;
  var idx = self.directions.indexOf(self.direction);  
  var next = idx + 1;

  if (next >= self.directions.length) next = 0;

  self.direction = self.directions[ next ];

  return self;
}
Robot.prototype.rotateRight = robotRotateRightHandler;

function robotRotateLeftHandler() {
  var self = this;
  var idx = self.directions.indexOf(self.direction);
  var previous = idx - 1;

  if (previous < 0) previous = (self.directions.length - 1); 

  self.direction = self.directions[ previous ];

  return self;
}
Robot.prototype.rotateLeft = robotRotateLeftHandler;

function robotMoveHandler() {
  var self = this;

  switch (self.direction) {
    case 'N':
      self.position.moveY(self.position.y + 1);
      break;
    case 'W':
      self.position.moveX(self.position.x + 1);
      break;
    case 'S':
      self.position.moveY(self.position.y - 1);
      break;
    case 'E':
      self.position.moveX(self.position.x - 1);
      break;
  }

  return self;
}
Robot.prototype.move = robotMoveHandler;

function robotTeletransportHandler(x, y) {
  var self = this;

  self.position.move({ x: x, y: y });

  return self;
}
Robot.prototype.teletransport = robotTeletransportHandler;

aya.Robot = Robot;
