"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _health_data = require("../handlers/health_data.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function _callee(req, res) {
  var health_data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _health_data.getHealth_data)());

        case 2:
          health_data = _context.sent;
          res.send(health_data);

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
          return regeneratorRuntime.awrap((0, _health_data.getHealth_dataById)(id));

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
  var _req$body, user_id, energy_char, weight, height, steps, heart_rate, notes;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, user_id = _req$body.user_id, energy_char = _req$body.energy_char, weight = _req$body.weight, height = _req$body.height, steps = _req$body.steps, heart_rate = _req$body.heart_rate;
          _context3.next = 3;
          return regeneratorRuntime.awrap(addUser(user_id, energy_char, weight, height, steps, heart_rate));

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