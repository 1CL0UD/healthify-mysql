"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _foods = require("../handlers/foods.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function _callee(req, res) {
  var foods;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _foods.getFoods)());

        case 2:
          foods = _context.sent;
          res.send(foods);

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
          return regeneratorRuntime.awrap((0, _foods.getFoodById)(id));

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
  var _req$body, user_id, food_name, energy, protein, carbohydrate, notes;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, user_id = _req$body.user_id, food_name = _req$body.food_name, energy = _req$body.energy, protein = _req$body.protein, carbohydrate = _req$body.carbohydrate;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _foods.addFood)(user_id, food_name, energy, protein, carbohydrate));

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