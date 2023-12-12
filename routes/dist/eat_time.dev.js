"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _eat_time = require("../handlers/eat_time.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function _callee(req, res) {
  var eat_time;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _eat_time.getEat_time)());

        case 2:
          eat_time = _context.sent;
          res.send(eat_time);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/:id', function _callee2(req, res) {
  var id, notes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _eat_time.getEat_timeById)(id));

        case 3:
          notes = _context2.sent;
          res.status(201).send(notes);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/', function _callee3(req, res) {
  var _req$body, diary_id, food_id, eat_time, food_name, notes;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, diary_id = _req$body.diary_id, food_id = _req$body.food_id, eat_time = _req$body.eat_time, food_name = _req$body.food_name;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _eat_time.addEat_time)(diary_id, food_id, eat_time, food_name));

        case 3:
          notes = _context3.sent;
          res.send(notes);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;