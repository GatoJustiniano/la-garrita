var JSFun = {
	extend: function(c, a) {
		function b() {}
		b.prototype = a.prototype;
		c.prototype = new b();
		c.prototype.constructor = c;
		c.baseConstructor = a;
		c.base = a.prototype
	},
	isNumber: function(a) {
		return typeof a === "number" && isFinite(a)
	},
	isString: function(a) {
		return typeof a === "string"
	},
	isArray: function(a) {
		return Object.prototype.toString.call(a) === "[object Array]"
	},
	isBoolean: function(a) {
		return typeof a === "boolean"
	}
};
var Point = function(a, b) {
	this.setPoint(a, b)
};
Point.prototype.setPoint = function(a, b) {
	if (a instanceof Point) {
		this.setX(a._x);
		this.setY(a._y)
	} else {
		this.setX(a);
		this.setY(b)
	}
	return this
};
Point.prototype.setX = function(a) {
	if (JSFun.isNumber(a)) {
		this._x = a
	}
	return this
};
Point.prototype.setY = function(a) {
	if (JSFun.isNumber(a)) {
		this._y = a
	}
	return this
};
Point.prototype.getX = function() {
	return this._x
};
Point.prototype.getY = function() {
	return this._y
};
Point.prototype.equals = function(a) {
	if (a instanceof Point && this._x == a.x && this.y == a._y) {
		return true
	} else {
		return false
	}
};
Point.prototype.pixelX = function() {
	return parseInt(this._x) + 0.5
};
Point.prototype.pixelY = function() {
	return parseInt(this._y) + 0.5
};
var Element = function() {};
Element.prototype.select = function(a, b) {
	return false
};
Element.prototype.deselect = function() {};
Element.prototype.drag = function(a, b) {};
Element.prototype.drop = function(a, b) {};
Element.prototype.draw = function(a) {};
Element.prototype.drawShape = function(a) {};
Element.prototype.isOver = function(a, b) {
	return false
};
Element.prototype.setDiagram = function(a) {};
Element.prototype.getParent = function() {
	return null
};
Element.prototype.getCentralPoint = function() {
	return new Point()
};
Element.prototype.getLinkCentered = function(a, b) {
	return new Point()
};
Element.prototype.setElementXML = function(a) {};
Element.prototype.getElementXML = function(a) {
	return ""
};
var JSGraphic = {
	toPixel: function(a) {
		return parseInt(a) + 0.5
	},
	dashedLine: function(b, c, k, a, h, n) {
		var d = Math.sqrt((a - c) * (a - c) + (h - k) * (h - k)) / n;
		d = d / 2 - 1;
		var e = Math.abs(Math.atan2(h - k, a - c));
		var m = Math.cos(e) * n;
		var l = Math.sin(e) * n;
		var j = c;
		var g = k;
		if (h < k) {
			l = -l
		}
		b.beginPath();
		for (var f = 0; f < d; f++) {
			b.moveTo(j, g);
			j += m;
			g += l;
			b.lineTo(j, g);
			j += m;
			g += l
		}
		b.moveTo(j, g);
		j += m;
		g += l;
		if ((m > 0 && j > a) || (m < 0 && j < a)) {
			j = a
		}
		if ((l > 0 && g > h) || (l < 0 && g < h)) {
			g = h
		}
		b.lineTo(j, g);
		b.stroke()
	},
	lineIntersection: function(e, r, c, o, a, l, s, k) {
		var d = o - r;
		var q = e - c;
		var g = -q * r - d * e;
		var b = k - l;
		var n = a - s;
		var f = -n * l - b * a;
		var p, m;
		if (e == c) {
			p = e;
			m = -(f + b * p) / n
		} else {
			if (r == o) {
				m = r;
				p = -(f + n * m) / b
			} else {
				if (a == s) {
					p = a;
					m = -(g + d * p) / q
				} else {
					if (l == k) {
						m = l;
						p = -(g + q * m) / d
					} else {
						var j = -q / n;
						p = -(j * f + g) / (d + j * b);
						m = -(g + d * p) / q
					}
				}
			}
		}
		return new Point(p, m)
	},
	ellipse: function(d, a, j, f, c) {
		var g = 0.5522847498307933;
		var e = g * f;
		var b = g * c;
		d.beginPath();
		d.moveTo(a - f, j);
		d.bezierCurveTo(a - f, j - b, a - e, j - c, a, j - c);
		d.bezierCurveTo(a + e, j - c, a + f, j - b, a + f, j);
		d.bezierCurveTo(a + f, j + b, a + e, j + c, a, j + c);
		d.bezierCurveTo(a - e, j + c, a - f, j + b, a - f, j)
	},
	rhombus: function(c, b, e, d, a) {
		c.beginPath();
		c.moveTo(b, e + a / 2);
		c.lineTo(b + d / 2, e);
		c.lineTo(b + d, e + a / 2);
		c.lineTo(b + d / 2, e + a);
		c.closePath()
	},
	triangle: function(c, b, f, d, a, e) {
		c.beginPath();
		switch (e) {
			case 0:
				c.moveTo(b, f + a / 2);
				c.lineTo(b + d / 2, f);
				c.lineTo(b + d, f + a / 2);
				break;
			case 1:
				c.moveTo(b + d / 2, f);
				c.lineTo(b + d, f + a / 2);
				c.lineTo(b + d / 2, f + a);
				break;
			case 2:
				c.moveTo(b, f + a / 2);
				c.lineTo(b + d, f + a / 2);
				c.lineTo(b + d / 2, f + a);
				break;
			default:
				c.moveTo(b, f + a / 2);
				c.lineTo(b + d / 2, f);
				c.lineTo(b + d / 2, f + a);
				break
		}
		c.closePath()
	},
	ellipseIntersection: function(g, f, j, h, c, n) {
		var e = (n - f) / (c - g);
		var l = 0;
		var k = 0;
		var d;
		if (j > 0 && h > 0) {
			l = Math.sqrt(1 / (1 / (j * j) + (e * e) / (h * h)))
		}
		d = (1 - (l * l) / (j * j)) * (h * h);
		if (j > 0 && d >= 0) {
			k = Math.sqrt(d)
		}
		if (c < g) {
			l = -l
		}
		if (n < f) {
			k = -k
		}
		return new Point(g + l, f + k)
	}
};
var ComponentStyle = {
	component_color: "#000000"
};
var Component = function(a) {
	a = a || {};
	this._x = 0;
	this._y = 0;
	this._width = 0;
	this._height = 0;
	this._minWidth = 0;
	this._minHeight = 0;
	this._superWidth = 0;
	this._parent = null;
	this._setId(a.id || "");
	this._setMargin(a.margin || 0);
	this._setPosition(a.position || Component.Float);
	this._setCentered(a.centered || false);
	this._orientation = a.orientation || 0;
	this._visible = a.visible || true
};
Component.Static = 0;
Component.Float = 1;
Component.TopRight = 2;
Component.Bottom = 3;
Component.BottomLeft = 4;
Component.BottomRight = 5;
Component.TopLeft = 8;
Component.Xmovement = 10;
Component.Top = 11;
Component.Left = 12;
Component.Right = 13;
Component.prototype._setId = function(a) {
	if (JSFun.isString(a)) {
		this._id = a
	} else {
		this._id = ""
	}
};
Component.prototype.getId = function() {
	return this._id
};
Component.prototype.getUniqueId = function() {
	if (this.getParent() instanceof SuperComponent) {
		return this.getParent().getUniqueId() + this.getParent()._childs.indexOf(this)
	}
	return this.getParent().getId() + this._id
};
Component.prototype.setCoordinates = function(a, b) {
	this._x = a;
	this._y = b
};
Component.prototype.updatePosition = function(b, a) {
	this._x += b;
	this._y += a
};
Component.prototype.setWidth = function(a) {
	if (a > this._minWidth) {
		this._width = a + 2 * this._margin
	} else {
		this._width = this._minWidth
	}
};
Component.prototype.setHeight = function(a) {
	if (a > this._minHeight) {
		this._height = a + 2 * this._margin
	} else {
		this._height = this._minHeight
	}
};
Component.prototype.setVisibility = function(a) {
	this._visible = a
};
Component.prototype.setMinWidth = function(a) {
	if (a > 0) {
		this._minWidth = a
	}
	if (a > this._width) {
		this._width = a
	}
};
Component.prototype.setMinHeight = function(a) {
	if (a > 0) {
		this._minHeight = a
	}
	if (a > this._height) {
		this._height = a
	}
};
Component.prototype.setSuperWidth = function(a) {
	if (a >= 0) {
		this._superWidth = a
	}
};
Component.prototype._setMargin = function(a) {
	if (JSFun.isNumber(a)) {
		this._margin = a
	} else {
		this._margin = 0
	}
};
Component.prototype.setParent = function(a) {
	if (a instanceof Element || a instanceof SuperComponent || a instanceof Diagram) {
		this._parent = a
	}
};
Component.prototype._setPosition = function(a) {
	if (a == Component.Float || a == Component.Static || a == Component.TopRight || a == Component.Bottom || a == Component.BottomLeft || a == Component.BottomRight || a == Component.TopLeft || a == Component.sideLeft || a == Component.Xmovement || a == Component.Top || a == Component.Left || a == Component.Right) {
		this._position = a
	} else {
		this._position = Component.Float
	}
};
Component.prototype._setCentered = function(a) {
	if (a == true) {
		this._centered = true
	} else {
		this._centered = false
	}
};
Component.prototype._getX = function() {
	return this._x
};
Component.prototype._getY = function() {
	return this._y
};
Component.prototype.getPixelX = function() {
	return JSGraphic.toPixel(this._x)
};
Component.prototype.getPixelY = function() {
	return JSGraphic.toPixel(this._y)
};
Component.prototype._getMX = function() {
	return this._x + this._margin
};
Component.prototype._getMY = function() {
	return this._y + this._margin
};
Component.prototype.getWidth = function() {
	return this._width
};
Component.prototype.getHeight = function() {
	return this._height
};
Component.prototype._getMargin = function() {
	return this._margin
};
Component.prototype.getSuperWidth = function() {
	if (this._parent instanceof SuperComponent) {
		return this._parent.getSuperWidth()
	} else {
		return this._superWidth
	}
};
Component.prototype.getParent = function() {
	return this._parent
};
Component.prototype.getPosition = function() {
	return this._position
};
Component.prototype.isCentered = function() {
	return this._centered
};
Component.prototype.getComponentXML = function(b) {
	var a = b.createElement("item");
	if (this._id) {
		a.setAttribute("id", this._id)
	}
	a.setAttribute("value", this.getValue());
	return a
};
Component.prototype.notifyDraw = function() {
	if (this._parent) {
		this._parent.notifyDraw()
	}
};
Component.prototype.notifyChange = function() {
	if (this._parent) {
		var a = (this._orientation) ? this._parent._height : this._parent._width;
		if (this._parent instanceof SuperNode) {
			this._parent.notifyChange(true)
		} else {
			this._parent.notifyChange()
		}
		if (this._parent && this._parent._parent instanceof SuperNode) {
			this._parent._parent.notifyChange(true)
		}
		this._parent.notifyDraw()
	}
};
Component.prototype.notifyDelete = function() {
	if (this._parent instanceof SuperComponent || this._parent instanceof Diagram || this._parent.getParent() instanceof SuperNode) {
		this._parent.notifyDelete(this)
	}
};
Component.prototype.notifyToUp = function() {
	if (this._parent instanceof SuperComponent) {
		this._parent.notifyToUp(this)
	}
};
Component.prototype.notifyToDown = function() {
	if (this._parent instanceof SuperComponent) {
		this._parent.notifyToDown(this)
	}
};
Component.prototype.isOver = function(b, d, a) {
	var c = a || 0;
	if (this._visible && b + c >= this._x && b <= this._x + this._width + c && d + c >= this._y && d <= this._y + this._height + c) {
		return true
	} else {
		return false
	}
};
Component.prototype.draw = function(a) {};
Component.prototype.select = function(b, c, a) {
	return false
};
Component.prototype.drawShape = function(a) {};
Component.prototype.deselect = function() {};
Component.prototype.setValue = function(a) {};
Component.prototype.getValue = function() {
	return
};
Component.prototype.setFontColor = function(a) {};
Component.prototype.getFontColor = function() {
	return
};
Component.prototype.setFontFamily = function(a) {};
Component.prototype.getFontFamily = function() {
	return
};
Component.prototype.setFontSize = function(a) {};
Component.prototype.getFontSize = function() {
	return
};
Component.prototype.setFontStyle = function(a) {};
Component.prototype.getFontStyle = function() {
	return
};
Component.prototype.getFontWeight = function() {
	return
};
Component.prototype.setFontWeight = function(a) {};
Component.prototype.getUnderlineText = function() {
	return this._underline
};
Component.prototype.setUnderlineText = function(a) {
	this._underline = a
};
Component.prototype.setComponentXML = function(a) {
	if (a.getAttribute("id")) {
		this._id = a.getAttribute("id")
	}
	if (a.getAttribute("fontColor")) {
		this.setFontColor(a.getAttribute("fontColor"))
	}
	if (a.getAttribute("fontSize")) {
		this.setFontSize(a.getAttribute("fontSize"))
	}
	if (a.getAttribute("fontFamily")) {
		this.setFontFamily(a.getAttribute("fontFamily"))
	}
	if (a.getAttribute("fontStyle")) {
		this.setFontStyle(a.getAttribute("fontStyle"))
	}
	if (a.getAttribute("fontWeight")) {
		this.setFontWeight(a.getAttribute("fontWeight"))
	}
	this.setValue(a.getAttribute("value"))
};
var SuperComponent = function(a) {
	a = a || {};
	SuperComponent.baseConstructor.call(this, a);
	this._childs = [];
	this._activeChild = null;
	this._visibleSubComponents = true;
	this.setFontColor(a.text_color || "#000000");
	this.setFontSize(a.font_size || "12");
	this._font_width = this.getFontSize() / 1.5;
	this.line_height = parseInt(this.getFontSize()) + 1;
	this.setFontFamily(a.text_family || "monospace");
	this.setFontStyle(a.font_style || "normal");
	this.setFontWeight(a.font_weight || "normal")
};
JSFun.extend(SuperComponent, Component);
SuperComponent.prototype.changeVisibility = function() {
	this._visibleSubComponents = !this._visibleSubComponents
};
SuperComponent.prototype.setVisibility = function(a) {
	this._visible = a;
	for (var b = 0; b < this._childs.length; b++) {
		this._childs[b]._visible = a
	}
};
SuperComponent.prototype.visibilitySubComponents = function() {
	return this._visibleSubComponents
};
SuperComponent.prototype.isOver = function(a, c, b) {
	for (i in this._childs) {
		if (this._childs[i].isOver(a, c, b)) {
			return true
		}
	}
	return SuperComponent.base.select.call(this, a, c, b)
};
SuperComponent.prototype.getComponentXML = function(c) {
	var a = c.createElement("superitem");
	a.setAttribute("id", this._id);
	a.setAttribute("visibleSubComponents", this._visibleSubComponents);
	if (this.getFontColor() != "#000000") {
		a.setAttribute("fontColor", this.getFontColor())
	}
	if (this.getFontSize() != "12") {
		a.setAttribute("fontSize", this.getFontSize())
	}
	if (this.getFontStyle() != "normal") {
		a.setAttribute("fontStyle", this.getFontStyle())
	}
	if (this.getFontFamily() != "monospace") {
		a.setAttribute("fontFamily", this.getFontFamily())
	}
	if (this.getFontWeight() != "normal") {
		a.setAttribute("fontWeight", this.getFontWeight())
	}
	var b;
	for (b in this._childs) {
		a.appendChild(this._childs[b].getComponentXML(c))
	}
	return a
};
SuperComponent.prototype.setComponentXML = function(c) {
	var a;
	var b = c.childNodes;
	if (c.getAttribute("visibleSubComponents") == "true") {
		this._visibleSubComponents = true
	} else {
		this._visibleSubComponents = false
	}
	if (c.getAttribute("fontColor")) {
		this.setFontColor(c.getAttribute("fontColor"))
	}
	if (c.getAttribute("fontSize")) {
		this.setFontSize(c.getAttribute("fontSize"))
	}
	if (c.getAttribute("fontStyle")) {
		this.setFontStyle(c.getAttribute("fontStyle"))
	}
	if (c.getAttribute("fontFamily")) {
		this.setFontFamily(c.getAttribute("fontFamily"))
	}
	if (c.getAttribute("fontWeigth")) {
		this.setFontWeight(c.getAttribute("fontWeight"))
	}
	for (a = 0; a < b.length; a++) {
		this.addField(b[a].getAttribute("value"))
	}
};
SuperComponent.prototype.updatePosition = function(c, a) {
	SuperComponent.base.updatePosition.call(this, c, a);
	var b;
	for (b in this._childs) {
		this._childs[b].updatePosition(c, a)
	}
};
SuperComponent.prototype.addSubComponent = function(a) {
	if (a instanceof Component) {
		a.setParent(this);
		a.setFontFamily(this.getFontFamily());
		a.setFontColor(this.getFontColor());
		a.setFontSize(this.getFontSize());
		a.setFontStyle(this.getFontStyle());
		a.setFontWeight(this.getFontWeight());
		this._childs.push(a)
	}
};
SuperComponent.prototype.delSubComponent = function(b) {
	var a;
	for (a in this._childs) {
		if (this._childs[a] == b) {
			this._childs.splice(a, 1);
			break
		}
	}
};
SuperComponent.prototype.updateComponents = function() {
	if (this._visibleSubComponents) {
		var d = 0;
		var b = 0;
		var c;
		for (c in this._childs) {
			if (this._orientation) {
				if (this._childs[c].getHeight() > b) {
					b = this._childs[c].getHeight()
				}
				d += this._childs[c].getWidth()
			} else {
				if (this._childs[c].getWidth() > d) {
					d = this._childs[c].getWidth()
				}
				b += this._childs[c].getHeight()
			}
		}
		if (this._orientation) {
			this.setWidth(d);
			this.setHeight(b + this._getMargin())
		} else {
			this.setWidth(d + this._getMargin());
			this.setHeight(b)
		}
		var a = this._getMX();
		var e = this._getMY();
		for (c = 0; c < this._childs.length; c++) {
			if (this._orientation) {
				this._childs[c].setCoordinates(a, e);
				a += this._childs[c].getWidth()
			} else {
				this._childs[c].setCoordinates(a, e);
				e += this._childs[c].getHeight()
			}
		}
	} else {
		this.setWidth(1);
		this.setHeight(1)
	}
};
SuperComponent.prototype.select = function(a, c) {
	if (this._visibleSubComponents) {
		var b;
		for (b in this._childs) {
			if (this._childs[b].select(a, c)) {
				this._activeChild = this._childs[b];
				return true
			}
		}
	}
};
SuperComponent.prototype.deselect = function() {
	if (this._activeChild) {
		this._activeChild.deselect();
		this._activeChild = null
	}
};
SuperComponent.prototype.drawShape = function(b) {
	if (!this._visible) {
		return
	}
	b.save();
	b.strokeStyle = "#aaaaaa";
	b.strokeRect(this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight());
	b.restore();
	if (this._visibleSubComponents) {
		var a;
		for (a in this._childs) {
			this._childs[a].drawShape(b)
		}
	}
};
SuperComponent.prototype.notifyToUp = function(c) {
	var b;
	var a = c;
	for (b = 0; b < this._childs.length; b++) {
		if (this._childs[b] == c) {
			if (b > 0) {
				this._childs[b] = this._childs[b - 1];
				this._childs[b - 1] = c
			}
			return
		}
	}
};
SuperComponent.prototype.notifyToDown = function(c) {
	var b;
	var a = c;
	for (b = 0; b < this._childs.length - 1; b++) {
		if (this._childs[b] == c) {
			this._childs[b] = this._childs[b + 1];
			this._childs[b + 1] = c;
			return
		}
	}
};
SuperComponent.prototype.notifyChange = function() {
	this.updateComponents();
	if (this._parent) {
		if (this._parent instanceof SuperNode) {
			this._parent.notifyChange(true)
		} else {
			this._parent.notifyChange()
		}
		if (this._parent && this._parent._parent instanceof SuperNode) {
			this._parent._parent.notifyChange(true)
		}
	}
};
SuperComponent.prototype.notifyDelete = function(a) {
	this.delSubComponent(a);
	this.updateComponents()
};
SuperComponent.prototype.draw = function(b) {
	if (!this._visible) {
		return
	}
	if (this._visibleSubComponents) {
		var a;
		for (a in this._childs) {
			this._childs[a].draw(b)
		}
	}
};
SuperComponent.prototype.setFontSize = function(a) {
	this._font_size = a;
	var b;
	for (b in this._childs) {
		this._childs[b].setFontSize(a)
	}
};
SuperComponent.prototype.getFontSize = function() {
	return this._font_size
};
SuperComponent.prototype.setFontColor = function(a) {
	this._font_color = a;
	var b;
	for (b in this._childs) {
		this._childs[b].setFontColor(a)
	}
};
SuperComponent.prototype.getFontColor = function() {
	return this._font_color
};
SuperComponent.prototype.setFontFamily = function(b) {
	this._font_family = b;
	var a;
	for (a in this._childs) {
		this._childs[a].setFontFamily(b)
	}
};
SuperComponent.prototype.getFontFamily = function() {
	return this._font_family
};
SuperComponent.prototype.setFontStyle = function(b) {
	this._font_style = b;
	var a;
	for (a in this._childs) {
		this._childs[a].setFontStyle(b)
	}
};
SuperComponent.prototype.getFontStyle = function() {
	return this._font_style
};
SuperComponent.prototype.setFontWeight = function(a) {
	this._font_weight = a;
	var b;
	for (b in this._childs) {
		this._childs[b].setFontWeight(a)
	}
};
SuperComponent.prototype.getFontWeight = function() {
	return this._font_weight
};
var Text = function(a) {
	a = a || {};
	Text.baseConstructor.call(this, a);
	this.setFontColor(a.text_color || "#000000");
	this.setFontSize(a.font_size || "12");
	this._font_width = this.getFontSize() / 1.5;
	this._line_height = parseInt(this.getFontSize()) + 1;
	this.setFontFamily(a.text_family || "monospace");
	this.setFontStyle(a.font_style || "normal");
	this.setFontWeight(a.font_weight || "normal");
	this.setText(a.text || "")
};
JSFun.extend(Text, Component);
Text.prototype.setValue = function(a) {
	this.setText(a)
};
Text.prototype.getValue = function() {
	return this._text
};
Text.prototype.setText = function(a) {
	if (JSFun.isString(a)) {
		this._text = a;
		if (a == "") {
			if (this._orientation) {
				this.setHeight(50)
			} else {
				this.setWidth(50)
			}
		} else {
			if (this._orientation) {
				this.setHeight(this._text.length * this._font_width)
			} else {
				this.setWidth(this._text.length * this._font_width)
			}
		}
		if (this._orientation) {
			this.setWidth(this._line_height)
		} else {
			this.setHeight(this._line_height)
		}
	}
};
Text.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.font = this.getFontStyle() + " " + this.getFontWeight() + " " + this.getFontSize() + "px " + this.getFontFamily();
	a.textBaseline = "middle";
	a.fillStyle = this.getFontColor();
	if (this._orientation) {
		a.translate(this._getMX() + this._line_height / 2, this._getMY());
		a.rotate((-90 * Math.PI) / 180);
		a.fillText(this._text, this._margin * 2 - this.getHeight(), 0)
	} else {
		if (this._text) {
			a.fillText(this._text, this._getMX(), this._getMY() + this._line_height / 2)
		}
	}
	a.restore()
};
Text.prototype.setFontSize = function(a) {
	this._font_size = a;
	this.resize()
};
Text.prototype.getFontSize = function() {
	return this._font_size
};
Text.prototype.setFontColor = function(a) {
	this._font_color = a
};
Text.prototype.getFontColor = function() {
	return this._font_color
};
Text.prototype.setFontFamily = function(a) {
	this._font_family = a
};
Text.prototype.getFontFamily = function() {
	return this._font_family
};
Text.prototype.resize = function() {
	this._line_height = parseInt(this.getFontSize(), 10) + 1;
	this._font_width = this.getFontSize() / 1.5;
	var a = this.getValue() || "";
	if (a == "") {
		if (this._orientation) {
			this.setHeight(50)
		} else {
			this.setWidth(50)
		}
	} else {
		if (this._orientation) {
			this.setHeight(a.length * this._font_width)
		} else {
			this.setWidth(a.length * this._font_width)
		}
	}
	if (this._orientation) {
		this.setWidth(this._line_height)
	} else {
		this.setHeight(this._line_height)
	}
};
Text.prototype.setFontStyle = function(a) {
	this._font_style = a
};
Text.prototype.getFontStyle = function() {
	return this._font_style
};
Text.prototype.setFontWeight = function(a) {
	this._font_weight = a
};
Text.prototype.getFontWeight = function() {
	return this._font_weight
};
Text.prototype.getComponentXML = function(b) {
	var a = b.createElement("item");
	if (this._id) {
		a.setAttribute("id", this._id)
	}
	if (this.getFontColor() != "#000000") {
		a.setAttribute("fontColor", this.getFontColor())
	}
	if (this.getFontSize() != "12") {
		a.setAttribute("fontSize", this.getFontSize())
	}
	if (this.getFontStyle() != "normal") {
		a.setAttribute("fontStyle", this.getFontStyle())
	}
	if (this.getFontFamily() != "monospace") {
		a.setAttribute("fontFamily", this.getFontFamily())
	}
	if (this.getFontWeight() != "normal") {
		a.setAttribute("fontWeight", this.getFontWeight())
	}
	a.setAttribute("value", this.getValue());
	return a
};
var TextBox = function(a) {
	a = a || {};
	TextBox.baseConstructor.call(this, a);
	this.selected = a.selected || false;
	this.deletable = false;
	if (a.width) {
		this._width = a.width
	}
};
JSFun.extend(TextBox, Text);
TextBox.prototype.setDeletable = function() {
	this.deletable = true
};
TextBox.prototype.select = function(b, d, a) {
	var c = a || 0;
	if (!this.selected && this.isOver(b, d, c)) {
		this.showDialog(b, d);
		return true
	} else {
		return false
	}
};
TextBox.prototype.deselect = function() {
	if (this.active) {
		this.closeDialog();
		this.active = false
	}
};
TextBox.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var d = this;
	this.active = true;
	var f = document.createElement("div");
	var c = document.createElement("form");
	var a = document.createElement("input");
	var b = document.createElement("input");
	f.className = "ud_popup";
	a.setAttribute("type", "text");
	a.setAttribute("value", this.decode(this.getValue()));
	b.setAttribute("type", "submit");
	b.setAttribute("value", "OK");
	this.changeText = function(g) {
		if (d.active) {
			d.setText(d.encode(a.value));
			document.body.removeChild(f);
			d.active = false;
			d.notifyChange()
		}
	};
	this.closeDialog = function(g) {
		if (d.active) {
			document.body.removeChild(f);
			d.active = false;
			d.notifyChange()
		}
	};
	c.onsubmit = function() {
		return false
	};
	b.addEventListener("click", this.changeText, false);
	c.appendChild(a);
	c.appendChild(b);
	if (this.deletable) {
		var e = document.createElement("input");
		e.setAttribute("type", "submit");
		e.setAttribute("value", "delete");
		this.deleteDialog = function(g) {
			if (d.active) {
				document.body.removeChild(f);
				d.active = false;
				d.notifyDelete();
				d.notifyChange()
			}
		};
		e.addEventListener("click", this.deleteDialog, false);
		c.appendChild(e)
	}
	f.appendChild(c);
	document.body.appendChild(f);
	a.focus();
	f.style.top = (window.innerHeight - c.offsetHeight) / 2 + "px";
	f.style.left = (window.innerWidth - c.offsetWidth) / 2 + "px"
};
TextBox.prototype.drawShape = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.strokeStyle = "#aaaaaa";
	a.strokeRect(this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight());
	a.restore()
};
TextBox.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	if (this.active) {
		a.fillStyle = "#ffc485";
		a.fillRect(this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight())
	}
	a.restore();
	TextBox.base.draw.call(this, a)
};
TextBox.prototype.encode = function(a) {
	return a
};
TextBox.prototype.decode = function(a) {
	return a
};
var CollapsibleFields = function(a) {
	a = a || {};
	CollapsibleFields.baseConstructor.call(this, a);
	this.setMinHeight(10);
	if (a.visibleSubComponents == false) {
		this.changeVisibility()
	}
};
JSFun.extend(CollapsibleFields, SuperComponent);
CollapsibleFields.prototype.addField = function(b) {
	var a = this.newItem();
	a.setDeletable();
	if (b) {
		a.setValue(b)
	}
	this.addSubComponent(a);
	this.notifyChange()
};
CollapsibleFields.prototype.newItem = function() {
	return new TextBox()
};
CollapsibleFields.prototype.isOver = function(b, d, a) {
	var c = a || 0;
	if (Math.abs(b - (this._getX() + 5)) <= 6 + c && Math.abs(d - (this._getY() + 5)) <= 6 + c) {
		return true
	} else {
		if (this.visibilitySubComponents() && Math.abs(b - (this._getX() + this.getSuperWidth() - 5)) <= 6 + c && Math.abs(d - (this._getY() + 5)) <= 6 + c) {
			return true
		}
	}
	return CollapsibleFields.base.isOver.call(this, b, d, c)
};
CollapsibleFields.prototype.select = function(b, d, a) {
	var c = a || 0;
	if (Math.abs(b - (this._getX() + 5)) <= 6 + c && Math.abs(d - (this._getY() + 5)) <= 6 + c) {
		this.changeVisibility();
		this.notifyChange();
		return true
	} else {
		if (this.visibilitySubComponents() && Math.abs(b - (this._getX() + this.getSuperWidth() - 5)) <= 6 + c && Math.abs(d - (this._getY() + 5)) <= 6 + c) {
			this.addField();
			return true
		}
	}
	return CollapsibleFields.base.select.call(this, b, d)
};
CollapsibleFields.prototype.drawShape = function(b) {
	if (!this._visible) {
		return
	}
	CollapsibleFields.base.drawShape.call(this, b);
	var a = this.getPixelX();
	var c = this.getPixelY();
	b.save();
	b.fillStyle = "#ff0000";
	b.beginPath();
	if (this.visibilitySubComponents()) {
		b.moveTo(a, c + 5);
		b.lineTo(a + 10, c + 5);
		b.lineTo(a + 5, c);
		b.closePath();
		b.fill();
		b.fillStyle = "#94dc91";
		b.beginPath();
		b.arc(this.getPixelX() + this.getSuperWidth() - 5, this.getPixelY() + 5, 4, 0, Math.PI * 2, true);
		b.closePath();
		b.fill();
		b.restore()
	} else {
		b.moveTo(a + 5, c);
		b.lineTo(a + 5, c + 10);
		b.lineTo(a + 10, c + 5);
		b.closePath();
		b.fill();
		b.restore()
	}
};
CollapsibleFields.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	if (this.visibilitySubComponents()) {
		a.save();
		a.beginPath();
		a.moveTo(this.getPixelX(), this.getPixelY());
		a.lineTo(this.getPixelX() + this.getSuperWidth(), this.getPixelY());
		a.stroke();
		a.restore()
	}
	CollapsibleFields.base.draw.call(this, a)
};
var ArtifactItem = function(a) {
	a = a || {};
	ArtifactItem.baseConstructor.call(this, a);
	this.setMinWidth(40)
};
JSFun.extend(ArtifactItem, TextBox);
ArtifactItem.prototype.select = function(a, b) {
	if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 20)) <= 5 && Math.abs(b - (this.getPixelY() + 8.66)) <= 5) {
		this.notifyToUp();
		this.notifyChange();
		return true
	} else {
		if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 30)) <= 5 && Math.abs(b - (this.getPixelY() + 7.33)) <= 5) {
			this.notifyToDown();
			this.notifyChange();
			return true
		}
	}
	return ArtifactItem.base.select.call(this, a, b)
};
ArtifactItem.prototype.drawShape = function(b) {
	if (!this._visible) {
		return
	}
	var a = this.getPixelX() + this.getSuperWidth() - 35;
	var c = this.getPixelY() + 3;
	b.save();
	b.fillStyle = "#0000aa";
	b.beginPath();
	b.moveTo(a, c);
	b.lineTo(a + 10, c);
	b.lineTo(a + 5, c + 7);
	b.closePath();
	b.fill();
	a = a + 10;
	b.beginPath();
	b.moveTo(a + 5, c);
	b.lineTo(a, c + 7);
	b.lineTo(a + 10, c + 7);
	b.closePath();
	b.fill();
	b.restore()
};
var ArtifactFields = function(a) {
	a = a || {};
	ArtifactFields.baseConstructor.call(this, a);
	this._default = a.text || "new_artifact"
};
JSFun.extend(ArtifactFields, CollapsibleFields);
ArtifactFields.prototype.newItem = function() {
	return new ArtifactItem({
		text: this._default
	})
};
ArtifactFields.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	CollapsibleFields.base.draw.call(this, a)
};
var ArtifactSymbol = function(a) {
	a = a || {};
	ArtifactSymbol.baseConstructor.call(this, a);
	this.setWidth(15);
	this.setHeight(15)
};
JSFun.extend(ArtifactSymbol, Component);
ArtifactSymbol.prototype.draw = function(b) {
	if (!this._visible) {
		return
	}
	var a = this.getPixelX() + this._getMargin();
	var c = this.getPixelY() + this._getMargin();
	b.save();
	b.strokeStyle = ComponentStyle.component_color;
	b.beginPath();
	b.moveTo(a + 5, c);
	b.lineTo(a + 10, c);
	b.lineTo(a + 15, c + 5);
	b.lineTo(a + 15, c + 10);
	b.lineTo(a + 5, c + 10);
	b.lineTo(a + 5, c);
	b.stroke();
	b.beginPath();
	b.moveTo(a + 10, c);
	b.lineTo(a + 10, c + 5);
	b.lineTo(a + 15, c + 5);
	b.stroke();
	b.restore()
};
var AttributeItem = function(b) {
	b = b || {};
	AttributeItem.baseConstructor.call(this, b);
	var a = "^(?:\xAB([^\xAB\xBB:={}\\x5B\\x5D]+)\xBB)?([-|#|+|~])?([/])?([^\xAB\xBB:={}\\x5B\\x5D]+)?(?::([^\xAB\xBB:={}\\x5B\\x5D]+))?(?:=([^\xAB\xBB:={}\\x5B\\x5D]+)?)?(?:\\x5B([^\xAB\xBB:={}\\x5B\\x5D]+)\\x5D)?(?:{([^\xAB\xBB:={}\\x5B\\x5D]+)})?$";
	this._parse = new RegExp(a);
	this.setMinWidth(40)
};
JSFun.extend(AttributeItem, TextBox);
AttributeItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += "\xAB" + a[0] + "\xBB"
	}
	if (a[1]) {
		b += a[1]
	}
	if (a[2]) {
		b += a[2]
	}
	if (a[3]) {
		b += a[3]
	}
	if (a[4]) {
		b += ":" + a[4]
	}
	if (a[5]) {
		b += "=" + a[5]
	}
	if (a[6]) {
		b += "[" + a[6] + "]"
	}
	if (a[7]) {
		b += "{" + a[7] + "}"
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_attribute"
	}
};
AttributeItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
AttributeItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var g = this;
	this.active = true;
	var a = document.createElement("div");
	var b = document.createElement("form");
	var f = [];
	var d;
	for (d = 0; d < 8; d++) {
		f.push(document.createElement("input"))
	}
	var c;
	f[1] = document.createElement("select");
	c = document.createElement("option");
	c.value = "";
	c.appendChild(document.createTextNode("(none)"));
	f[1].appendChild(c);
	c = document.createElement("option");
	c.value = "+";
	c.appendChild(document.createTextNode("+ (public)"));
	f[1].appendChild(c);
	c = document.createElement("option");
	c.value = "-";
	c.appendChild(document.createTextNode("- (private)"));
	f[1].appendChild(c);
	c = document.createElement("option");
	c.value = "#";
	c.appendChild(document.createTextNode("# (protected)"));
	f[1].appendChild(c);
	c = document.createElement("option");
	c.value = "~";
	c.appendChild(document.createTextNode("~ (package)"));
	f[1].appendChild(c);
	f[2] = document.createElement("select");
	c = document.createElement("option");
	c.value = "";
	c.appendChild(document.createTextNode("no"));
	f[2].appendChild(c);
	c = document.createElement("option");
	c.value = "/";
	c.appendChild(document.createTextNode("yes"));
	f[2].appendChild(c);
	var j = document.createElement("input");
	a.className = "ud_popup";
	var l = this.decode(this.getValue());
	for (d = 0; d < f.length; d++) {
		f[d].type = "text";
		f[d].value = l[d] || ""
	}
	if (l[1]) {
		var h = f[1].childNodes;
		for (d in h) {
			if (h[d].value == l[1]) {
				h[d].setAttribute("selected", "selected")
			}
		}
	}
	if (l[2]) {
		var h = f[2].childNodes;
		for (d in h) {
			if (h[d].value == l[2]) {
				h[d].setAttribute("selected", "selected")
			}
		}
	}
	j.setAttribute("type", "submit");
	j.setAttribute("value", "OK");
	this.changeText = function(q) {
		if (g.active) {
			var o = [];
			var p;
			for (p = 0; p < f.length; p++) {
				o.push(f[p].value)
			}
			g.setText(g.encode(o));
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	this.closeDialog = function(o) {
		if (g.active) {
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	j.addEventListener("click", this.changeText, false);
	var e = ["stereotype", "visibility", "derived", "name", "type", "default", "multiplicity", "restrictions"];
	var k;
	var n;
	for (d = 0; d < f.length; d++) {
		n = document.createElement("div");
		k = document.createElement("label");
		k.appendChild(document.createTextNode(e[d]));
		n.appendChild(k);
		n.appendChild(f[d]);
		b.appendChild(n)
	}
	b.appendChild(j);
	if (this.deletable) {
		var m = document.createElement("input");
		m.setAttribute("type", "submit");
		m.setAttribute("value", "delete");
		this.deleteDialog = function(o) {
			if (g.active) {
				document.body.removeChild(a);
				g.active = false;
				g.notifyDelete();
				g.notifyChange()
			}
		};
		m.addEventListener("click", this.deleteDialog, false);
		b.appendChild(m)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
AttributeItem.prototype.select = function(a, b) {
	if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 20)) <= 5 && Math.abs(b - (this.getPixelY() + 8.66)) <= 5) {
		this.notifyToUp();
		this.notifyChange();
		return true
	} else {
		if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 30)) <= 5 && Math.abs(b - (this.getPixelY() + 7.33)) <= 5) {
			this.notifyToDown();
			this.notifyChange();
			return true
		}
	}
	return AttributeItem.base.select.call(this, a, b)
};
AttributeItem.prototype.drawShape = function(b) {
	if (!this._visible) {
		return
	}
	var a = this.getPixelX() + this.getSuperWidth() - 35;
	var c = this.getPixelY() + 3;
	b.save();
	b.fillStyle = "#0000aa";
	b.beginPath();
	b.moveTo(a, c);
	b.lineTo(a + 10, c);
	b.lineTo(a + 5, c + 7);
	b.closePath();
	b.fill();
	a = a + 10;
	b.beginPath();
	b.moveTo(a + 5, c);
	b.lineTo(a, c + 7);
	b.lineTo(a + 10, c + 7);
	b.closePath();
	b.fill();
	b.restore()
};
var AttributeFields = function(a) {
	a = a || {};
	AttributeFields.baseConstructor.call(this, a);
	this._default = a.text || "new_attribute"
};
JSFun.extend(AttributeFields, CollapsibleFields);
AttributeFields.prototype.newItem = function() {
	return new AttributeItem({
		text: this._default
	})
};
var CircleSymbol = function(a) {
	a = a || {};
	CircleSymbol.baseConstructor.call(this, a);
	this.setWidth(15);
	this.setHeight(15)
};
JSFun.extend(CircleSymbol, Component);
CircleSymbol.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.strokeStyle = ComponentStyle.component_color;
	a.beginPath();
	a.arc(this.getPixelX() + this._getMargin() + 7, this.getPixelY() + this._getMargin() + 7, 7, 0, Math.PI * 2, true);
	a.stroke();
	a.restore()
};
var ComponentSymbol = function(a) {
	a = a || {};
	ComponentSymbol.baseConstructor.call(this, a);
	this.setWidth(15);
	this.setHeight(15)
};
JSFun.extend(ComponentSymbol, Component);
ComponentSymbol.prototype.draw = function(b) {
	if (!this._visible) {
		return
	}
	var a = this.getPixelX() + this._getMargin();
	var c = this.getPixelY() + this._getMargin();
	b.save();
	b.strokeStyle = ComponentStyle.component_color;
	b.strokeRect(a + 1, c + 2, 8, 4);
	b.strokeRect(a + 1, c + 9, 8, 4);
	b.beginPath();
	b.moveTo(a + 5, c + 2);
	b.lineTo(a + 5, c);
	b.lineTo(a + 15, c);
	b.lineTo(a + 15, c + 15);
	b.lineTo(a + 5, c + 15);
	b.lineTo(a + 5, c + 13);
	b.stroke();
	b.beginPath();
	b.moveTo(a + 5, c + 6);
	b.lineTo(a + 5, c + 9);
	b.stroke();
	b.restore()
};
var ConnectorItem = function(a) {
	a = a || {};
	ConnectorItem.baseConstructor.call(this, a)
};
JSFun.extend(ConnectorItem, TextBox);
ConnectorItem.prototype.setText = function(a) {
	if (JSFun.isString(a)) {
		this._text = a;
		if (a == "") {
			if (this._orientation) {
				this.setHeight(14)
			} else {
				this.setWidth(14)
			}
		} else {
			if (this._orientation) {
				this.setHeight(this._text.length * this._font_width)
			} else {
				this.setWidth(this._text.length * this._font_width)
			}
		}
		if (this._orientation) {
			this.setWidth(this._line_height)
		} else {
			this.setHeight(this._line_height)
		}
	}
};
ConnectorItem.prototype.resize = function() {
	this._line_height = parseInt(this.getFontSize(), 10) + 1;
	this._font_width = this.getFontSize() / 1.5;
	var a = this.getValue();
	if (!a) {
		a = ""
	}
	if (a == "") {
		if (this._orientation) {
			this.setHeight(14)
		} else {
			this.setWidth(14)
		}
	} else {
		if (this._orientation) {
			this.setHeight(a.length * this._font_width)
		} else {
			this.setWidth(a.length * this._font_width)
		}
	}
	if (this._orientation) {
		this.setWidth(this._line_height)
	} else {
		this.setHeight(this._line_height)
	}
};
ConnectorItem.prototype.getValue = function() {
	return this._text
};
var figureStyle = {
	border: "#294253"
};
var NodeFigure = function(a) {
	a = a || {};
	this._changeFigureColor = (a.changeFigureColor == false) ? false : true;
	this._changeFigureLineWidth = (a.changeFigureLineWidth == false) ? false : true;
	if (a.color) {
		this._color = a.color
	} else {
		this._color = "#ffffff"
	}
	if (a.lineColor) {
		this._lineColor = a.lineColor
	} else {
		this._lineColor = "#294253"
	}
	if (a.lineWidth) {
		this._lineWidth = a.Width
	} else {
		this._lineWidth = 1
	}
};
NodeFigure.prototype.draw = function(c, b, e, d, a) {};
NodeFigure.prototype.getColor = function() {
	return this._color
};
NodeFigure.prototype.setColor = function(a) {
	if (this._changeFigureColor && a) {
		this._color = a
	}
};
NodeFigure.prototype.setLineColor = function(a) {
	if (this._changeFigureColor && a) {
		this._lineColor = a
	}
};
NodeFigure.prototype.getLineColor = function() {
	return this._lineColor
};
NodeFigure.prototype.setLineWidth = function(a) {
	if (this._changeFigureLineWidth && JSFun.isNumber(a)) {
		this._lineWidth = a
	}
};
NodeFigure.prototype.getLineWidth = function() {
	return this._lineWidth
};
var StickmanFigure = function() {};
JSFun.extend(StickmanFigure, NodeFigure);
StickmanFigure.prototype.draw = function(c, b, e, d, a) {
	b = JSGraphic.toPixel(b);
	e = JSGraphic.toPixel(e);
	c.save();
	c.strokeStyle = "#000000";
	c.beginPath();
	c.arc(b + d / 2, e + d / 4, d / 4, 0, Math.PI * 2, true);
	c.moveTo(b + d / 2, e + d / 2);
	c.lineTo(b + d / 2, e + d / 2 + a / 3);
	c.lineTo(b, e + a);
	c.moveTo(b + d / 2, e + d / 2 + a / 3);
	c.lineTo(b + d, e + a);
	c.moveTo(b, e + a / 2);
	c.lineTo(b + d, e + a / 2);
	c.stroke();
	c.restore()
};
var EllipseFigure = function(a) {
	a = a || {};
	EllipseFigure.baseConstructor.call(this, a)
};
JSFun.extend(EllipseFigure, NodeFigure);
EllipseFigure.prototype.draw = function(e, c, g, f, b) {
	var a = f / 2;
	var d = b / 2;
	e.save();
	e.shadowOffsetX = 2;
	e.shadowOffsetY = 2;
	e.shadowBlur = 2;
	e.shadowColor = "rgba(0, 0, 0, 0.5)";
	e.strokeStyle = this.getLineColor();
	e.lineWidth = this.getLineWidth();
	JSGraphic.ellipse(e, c + a, g + d, a, d);
	e.stroke();
	e.restore();
	e.save();
	e.fillStyle = this.getColor();
	JSGraphic.ellipse(e, c + a, g + d, a, d);
	e.fill();
	e.restore()
};
var HalfFilledEllipseFigure = function(a) {
	a = a || {};
	HalfFilledEllipseFigure.baseConstructor.call(this, a)
};
JSFun.extend(HalfFilledEllipseFigure, EllipseFigure);
HalfFilledEllipseFigure.prototype.draw = function(e, c, g, f, b) {
	var a = f / 2;
	var d = b / 2;
	e.save();
	e.shadowOffsetX = 2;
	e.shadowOffsetY = 2;
	e.shadowBlur = 2;
	e.shadowColor = "rgba(0, 0, 0, 0.5)";
	e.save();
	e.fillStyle = this.getColor();
	JSGraphic.ellipse(e, c + a, g + d, a, d);
	e.fill();
	e.restore();
	e.strokeStyle = this.getLineColor();
	e.lineWidth = this.getLineWidth();
	JSGraphic.ellipse(e, c + a, g + d, a, d);
	e.stroke();
	e.restore();
	e.save();
	e.fillStyle = "#000000";
	JSGraphic.ellipse(e, c + a, g + d, a * 0.5, d * 0.5);
	e.fill();
	e.restore()
};
var CrossEllipseFigure = function(a) {
	a = a || {};
	CrossEllipseFigure.baseConstructor.call(this, a)
};
JSFun.extend(CrossEllipseFigure, EllipseFigure);
CrossEllipseFigure.prototype.draw = function(f, c, h, g, b) {
	var a = g / 2;
	var e = b / 2;
	var d = (Math.sqrt((g) * (g) + (b) * (b)) - (a * 2)) / 2;
	f.save();
	f.shadowOffsetX = 2;
	f.shadowOffsetY = 2;
	f.shadowBlur = 2;
	f.shadowColor = "rgba(0, 0, 0, 0.5)";
	f.fillStyle = this.getColor();
	JSGraphic.ellipse(f, c + a, h + e, a, e);
	f.fill();
	f.strokeStyle = this.getLineColor();
	f.lineWidth = this.getLineWidth();
	JSGraphic.ellipse(f, c + a, h + e, a, e);
	f.moveTo(c + d, h + d);
	f.lineTo(c + g - d, h + b - d);
	f.moveTo(c + g - d, h + d);
	f.lineTo(c + d, h + b - d);
	f.stroke();
	f.restore()
};
var CrossFigure = function(a) {
	a = a || {};
	CrossFigure.baseConstructor.call(this, a)
};
JSFun.extend(CrossFigure, NodeFigure);
CrossFigure.prototype.draw = function(c, b, e, d, a) {
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d, e + a);
	c.moveTo(b + d, e);
	c.lineTo(b, e + a);
	c.closePath();
	c.stroke();
	c.restore()
};
var RhombusFigure = function(a) {
	a = a || {};
	RhombusFigure.baseConstructor.call(this, a)
};
JSFun.extend(RhombusFigure, NodeFigure);
RhombusFigure.prototype.draw = function(c, b, e, d, a) {
	c.save();
	c.fillStyle = "#ffffff";
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	JSGraphic.rhombus(c, b, e, d, a);
	c.fill();
	c.stroke();
	c.restore()
};
var RectangleFigure = function(a) {
	a = a || {};
	RectangleFigure.baseConstructor.call(this, a)
};
JSFun.extend(RectangleFigure, NodeFigure);
RectangleFigure.prototype.draw = function(c, b, g, d, a) {
	var e = JSGraphic.toPixel(b);
	var f = JSGraphic.toPixel(g);
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.fillRect(b, g, d, a);
	c.restore();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.strokeRect(e, f, d, a)
};
var ExpansionNodeFigure = function(a) {
	a = a || {};
	ExpansionNodeFigure.baseConstructor.call(this, a)
};
JSFun.extend(ExpansionNodeFigure, NodeFigure);
ExpansionNodeFigure.prototype.draw = function(c, b, g, d, a) {
	var e = JSGraphic.toPixel(b);
	var f = JSGraphic.toPixel(g);
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.fillRect(b, g, d, a);
	c.beginPath();
	if (d < a) {
		c.moveTo(e, JSGraphic.toPixel(g + a / 4));
		c.lineTo(e + d, f + JSGraphic.toPixel(a / 4));
		c.moveTo(e, JSGraphic.toPixel(f + 2 * (a / 4)));
		c.lineTo(e + d, JSGraphic.toPixel(f + 2 * (a / 4)));
		c.moveTo(e, JSGraphic.toPixel(f + 3 * (a / 4)));
		c.lineTo(e + d, JSGraphic.toPixel(f + 3 * (a / 4)))
	} else {
		c.moveTo(JSGraphic.toPixel(b + d / 4), f);
		c.lineTo(e + JSGraphic.toPixel(d / 4), f + a);
		c.moveTo(JSGraphic.toPixel(e + 2 * (d / 4)), f);
		c.lineTo(JSGraphic.toPixel(e + 2 * (d / 4)), f + a);
		c.moveTo(JSGraphic.toPixel(e + 3 * (d / 4)), f);
		c.lineTo(JSGraphic.toPixel(e + 3 * (d / 4)), f + a)
	}
	c.closePath();
	c.stroke();
	c.restore();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.strokeRect(e, f, d, a)
};
var RoundedRectangleFigure = function(a) {
	a = a || {};
	RoundedRectangleFigure.baseConstructor.call(this, a)
};
JSFun.extend(RoundedRectangleFigure, NodeFigure);
RoundedRectangleFigure.prototype.draw = function(d, c, f, e, b) {
	var c = JSGraphic.toPixel(c);
	var f = JSGraphic.toPixel(f);
	var a = 4;
	d.save();
	d.shadowOffsetX = 2;
	d.shadowOffsetY = 2;
	d.shadowBlur = 2;
	d.shadowColor = "rgba(0, 0, 0, 0.5)";
	d.fillStyle = this.getColor();
	d.beginPath();
	d.moveTo(c + a, f);
	d.lineTo(c + e - a, f);
	d.quadraticCurveTo(c + e, f, c + e, f + a);
	d.lineTo(c + e, f + b - a);
	d.quadraticCurveTo(c + e, f + b, c + e - a, f + b);
	d.lineTo(c + a, f + b);
	d.quadraticCurveTo(c, f + b, c, f + b - a);
	d.lineTo(c, f + a);
	d.quadraticCurveTo(c, f, c + a, f);
	d.closePath();
	d.fill();
	d.restore();
	d.save();
	d.strokeStyle = this.getLineColor();
	d.lineWidth = this.getLineWidth();
	d.beginPath();
	d.moveTo(c + a, f);
	d.lineTo(c + e - a, f);
	d.quadraticCurveTo(c + e, f, c + e, f + a);
	d.lineTo(c + e, f + b - a);
	d.quadraticCurveTo(c + e, f + b, c + e - a, f + b);
	d.lineTo(c + a, f + b);
	d.quadraticCurveTo(c, f + b, c, f + b - a);
	d.lineTo(c, f + a);
	d.quadraticCurveTo(c, f, c + a, f);
	d.stroke();
	d.restore()
};
var RegionFigure = function(a) {
	a = a || {};
	RegionFigure.baseConstructor.call(this, a)
};
JSFun.extend(RegionFigure, NodeFigure);
RegionFigure.prototype.draw = function(b, h, f, a, j, d, g, c) {
	d = d || 15;
	g = g || 75;
	c = c || 15;
	var e = 4;
	var h = JSGraphic.toPixel(h);
	var f = JSGraphic.toPixel(f);
	b.save();
	b.shadowOffsetX = 2;
	b.shadowOffsetY = 2;
	b.shadowBlur = 2;
	b.shadowColor = "rgba(0, 0, 0, 0.5)";
	b.fillStyle = this.getColor();
	b.beginPath();
	b.fillRect(h + 15, f, g, d);
	f += d;
	j -= d;
	b.moveTo(h + e, f);
	b.lineTo(h + a - e, f);
	b.quadraticCurveTo(h + a, f, h + a, f + e);
	b.lineTo(h + a, f + j - e);
	b.quadraticCurveTo(h + a, f + j, h + a - e, f + j);
	b.lineTo(h + e, f + j);
	b.quadraticCurveTo(h, f + j, h, f + j - e);
	b.lineTo(h, f + e);
	b.quadraticCurveTo(h, f, h + e, f);
	b.closePath();
	b.fill();
	b.restore();
	f -= d;
	j += d;
	b.save();
	b.strokeStyle = this.getLineColor();
	b.lineWidth = this.getLineWidth();
	b.beginPath();
	b.strokeRect(h + 15, f, g, d);
	f += d;
	j -= d;
	b.moveTo(h + e, f);
	b.lineTo(h + a - e, f);
	b.quadraticCurveTo(h + a, f, h + a, f + e);
	b.lineTo(h + a, f + j - e);
	b.quadraticCurveTo(h + a, f + j, h + a - e, f + j);
	b.lineTo(h + e, f + j);
	b.quadraticCurveTo(h, f + j, h, f + j - e);
	b.lineTo(h, f + e);
	b.quadraticCurveTo(h, f, h + e, f);
	b.stroke();
	b.restore()
};
var PackageFigure = function(a) {
	a = a || {};
	PackageFigure.baseConstructor.call(this, a)
};
JSFun.extend(PackageFigure, NodeFigure);
PackageFigure.prototype.draw = function(c, b, e, d, a) {
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.fillRect(b, e, 60, 15);
	c.fillRect(b, e + 15, d, a - 15);
	c.restore();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.strokeRect(b + 0.5, e + 0.5, 60, 15);
	c.strokeRect(b + 0.5, e + 15.5, d, a - 15)
};
var NoteFigure = function(a) {
	a = a || {};
	NoteFigure.baseConstructor.call(this, a)
};
JSFun.extend(NoteFigure, NodeFigure);
NoteFigure.prototype.draw = function(c, b, e, d, a) {
	b = JSGraphic.toPixel(b);
	e = JSGraphic.toPixel(e);
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d - 15, e);
	c.lineTo(b + d, e + 15);
	c.lineTo(b + d, e + a);
	c.lineTo(b, e + a);
	c.closePath();
	c.fill();
	c.restore();
	c.save();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.stroke();
	c.beginPath();
	c.moveTo(b + d - 15, e);
	c.lineTo(b + d - 15, e + 15);
	c.lineTo(b + d, e + 15);
	c.stroke();
	c.restore()
};
var FromImageFigure = function(a) {
	a = a || {};
	NoteFigure.baseConstructor.call(this, a);
	if (a.route) {
		this.route = a.route;
		this.load = true;
		this.image = new Image();
		this.image.setAttribute("src", this.route)
	}
	this._associatedStereotypes = []
};
JSFun.extend(FromImageFigure, NodeFigure);
FromImageFigure.prototype.addAssociatedStereotype = function(a) {
	this._associatedStereotypes.push(a)
};
FromImageFigure.prototype.delAssociatedStereotype = function(a) {
	for (var b = 0; b < this._associatedStereotypes.length; b++) {
		if (this._associatedStereotypes[b] == a) {
			this._associatedStereotypes.splice(b, 1);
			break
		}
	}
};
FromImageFigure.prototype.foundInAssociatedStereotypes = function(a) {
	for (var b = 0; b < this._associatedStereotypes.length; b++) {
		if (this._associatedStereotypes[b] == a) {
			return true
		}
	}
	return false
};
FromImageFigure.prototype.draw = function(c, b, f, d, a) {
	if (this.load) {
		try {
			c.drawImage(this.image, b, f, d, a)
		} catch (e) {}
	}
};
var LifelineFigure = function(a) {
	a = a || {};
	LifelineFigure.baseConstructor.call(this, a)
};
JSFun.extend(LifelineFigure, NodeFigure);
LifelineFigure.prototype.draw = function(d, c, g, e, b, a) {
	a = a || 25;
	var f = JSGraphic.toPixel(c + e / 2);
	d.save();
	d.shadowOffsetX = 2;
	d.shadowOffsetY = 2;
	d.shadowBlur = 2;
	d.shadowColor = "rgba(0, 0, 0, 0.5)";
	d.fillStyle = this.getColor();
	d.fillRect(c, g, e, a);
	d.restore();
	d.save();
	d.strokeStyle = this.getLineColor();
	d.lineWidth = this.getLineWidth();
	d.strokeRect(c + 0.5, g + 0.5, e, a);
	d.restore();
	JSGraphic.dashedLine(d, f, g + a, f, g + b, 10)
};
var AcceptEventActionFigure = function(a) {
	a = a || {};
	AcceptEventActionFigure.baseConstructor.call(this, a)
};
JSFun.extend(AcceptEventActionFigure, NodeFigure);
AcceptEventActionFigure.prototype.draw = function(c, b, e, d, a) {
	var b = JSGraphic.toPixel(b);
	var e = JSGraphic.toPixel(e);
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d, e);
	c.lineTo(b + d, e + a);
	c.lineTo(b, e + a);
	c.lineTo(b + 25, e + a / 2);
	c.closePath();
	c.fill();
	c.restore();
	c.save();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d, e);
	c.lineTo(b + d, e + a);
	c.lineTo(b, e + a);
	c.lineTo(b + 25, e + a / 2);
	c.lineTo(b, e);
	c.stroke();
	c.restore()
};
var TimeEventFigure = function(a) {
	a = a || {};
	TimeEventFigure.baseConstructor.call(this, a)
};
JSFun.extend(TimeEventFigure, NodeFigure);
TimeEventFigure.prototype.draw = function(c, b, e, d, a) {
	var b = JSGraphic.toPixel(b);
	var e = JSGraphic.toPixel(e);
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.strokeStyle = figureStyle.border;
	c.fillStyle = this.getColor();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d, e);
	c.lineTo(b + d / 2, e + a / 2);
	c.closePath();
	c.fill();
	c.beginPath();
	c.moveTo(b, e + a);
	c.lineTo(b + d, e + a);
	c.lineTo(b + d / 2, e + a / 2);
	c.closePath();
	c.fill();
	c.restore();
	c.save();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d, e);
	c.lineTo(b + d / 2, e + a / 2);
	c.lineTo(b, e);
	c.stroke();
	c.beginPath();
	c.moveTo(b, e + a);
	c.lineTo(b + d, e + a);
	c.lineTo(b + d / 2, e + a / 2);
	c.lineTo(b, e + a);
	c.stroke();
	c.restore()
};
var SendSignalActionFigure = function(a) {
	a = a || {};
	SendSignalActionFigure.baseConstructor.call(this, a)
};
JSFun.extend(SendSignalActionFigure, NodeFigure);
SendSignalActionFigure.prototype.draw = function(c, b, e, d, a) {
	var b = JSGraphic.toPixel(b);
	var e = JSGraphic.toPixel(e);
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d - 25, e);
	c.lineTo(b + d, e + a / 2);
	c.lineTo(b + d - 25, e + a);
	c.lineTo(b, e + a);
	c.closePath();
	c.fill();
	c.restore();
	c.save();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.beginPath();
	c.moveTo(b, e);
	c.lineTo(b + d - 25, e);
	c.lineTo(b + d, e + a / 2);
	c.lineTo(b + d - 25, e + a);
	c.lineTo(b, e + a);
	c.lineTo(b, e);
	c.stroke();
	c.restore()
};
var SwimlaneFigure = function(a) {
	a = a || {};
	SwimlaneFigure.baseConstructor.call(this, a)
};
JSFun.extend(SwimlaneFigure, NodeFigure);
SwimlaneFigure.prototype.draw = function(c, b, e, d, a) {
	var b = JSGraphic.toPixel(b);
	var e = JSGraphic.toPixel(e);
	c.save();
	c.lineWidth = 2.5;
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.beginPath();
	c.moveTo(b + d, e);
	c.lineTo(b, e);
	c.lineTo(b, e + a);
	c.lineTo(b + d, e + a);
	c.stroke();
	c.restore()
};
var VerticalSwimlaneFigure = function(a) {
	a = a || {};
	VerticalSwimlaneFigure.baseConstructor.call(this, a)
};
JSFun.extend(VerticalSwimlaneFigure, NodeFigure);
VerticalSwimlaneFigure.prototype.draw = function(c, b, e, d, a) {
	var b = JSGraphic.toPixel(b);
	var e = JSGraphic.toPixel(e);
	c.save();
	c.lineWidth = 2.5;
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.beginPath();
	c.moveTo(b, e + a);
	c.lineTo(b, e);
	c.lineTo(b + d, e);
	c.lineTo(b + d, e + a);
	c.stroke();
	c.restore()
};
var TriangleFigure = function(a) {
	a = a || {};
	if (a.direction && JSFun.isNumber(a.direction)) {
		this.setDirection(a.direction)
	}
	TriangleFigure.baseConstructor.call(this, a)
};
JSFun.extend(TriangleFigure, NodeFigure);
TriangleFigure.prototype.draw = function(c, b, e, d, a) {
	c.save();
	c.fillStyle = "#ffffff";
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	JSGraphic.triangle(c, b, e, d, a, this.getDirection());
	c.fill();
	c.stroke();
	c.restore()
};
TriangleFigure.prototype.setDirection = function(a) {
	if (JSFun.isNumber(a)) {
		this._direction = a
	}
};
TriangleFigure.prototype.getDirection = function() {
	if (JSFun.isNumber(this._direction)) {
		return this._direction
	}
	return 0
};
var CubeFigure = function(a) {
	a = a || {};
	CubeFigure.baseConstructor.call(this, a)
};
JSFun.extend(CubeFigure, NodeFigure);
CubeFigure.prototype.draw = function(c, b, g, d, a) {
	var e = JSGraphic.toPixel(b);
	var f = JSGraphic.toPixel(g);
	c.save();
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 2;
	c.shadowColor = "rgba(0, 0, 0, 0.5)";
	c.fillStyle = this.getColor();
	c.fillRect(b, g, d, a);
	c.restore();
	c.save();
	c.fillStyle = this.getColor();
	c.beginPath();
	c.moveTo(e + 10, f - 10);
	c.lineTo(e + 10 + d, f - 10);
	c.lineTo(e + 10 + d, f + a - 10);
	c.lineTo(e + d, f + a);
	c.lineTo(e + d, f);
	c.lineTo(e, f);
	c.closePath();
	c.fill();
	c.restore();
	c.save();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.strokeRect(e, f, d, a);
	c.restore();
	c.save();
	c.strokeStyle = this.getLineColor();
	c.lineWidth = this.getLineWidth();
	c.beginPath();
	c.moveTo(e + 10, f - 10);
	c.lineTo(e + 10 + d, f - 10);
	c.lineTo(e + 10 + d, f + a - 10);
	c.lineTo(e + d, f + a);
	c.lineTo(e + d, f);
	c.lineTo(e, f);
	c.lineTo(e + 10, f - 10);
	c.moveTo(e + d, f);
	c.lineTo(e + 10 + d, f - 10);
	c.stroke();
	c.restore()
};
var NodeStyle = {
	shape_color: "rgb( 0, 0, 0 )",
	control: ""
};
var Node = function(a) {
	a = a || {};
	this._id = 0;
	this._type = "untyped";
	this._x = a.x || 0;
	this._y = a.y || 0;
	this._prex = this._x;
	this._prey = this._y;
	this._relx = 0;
	this._rely = 0;
	this._width = 10;
	this._height = 10;
	this._minHeight = 5;
	this._minWidth = 5;
	this._selected = false;
	this._selectedBefore = false;
	this._resizing = false;
	this._moved = false;
	this._moveable = false;
	this._proportional = false;
	this._container = false;
	this._alone = false;
	this._figures = [];
	this._components = [];
	this._activeComponent = null;
	this._diagram = null;
	this._parent = null;
	this._nodeChilds = [];
	this._relationChilds = [];
	this._relations = [];
	this._menu = [];
	this._tagValues = [];
	this._selectedFigure = 0;
	this._beforeNameComponent = null;
	this._visible = true;
	this._beforeHeight = 0;
	this._beforeWidth = 0
};
JSFun.extend(Node, Element);
Node.prototype.setAlone = function() {
	this._alone = true
};
Node.prototype.isAlone = function() {
	return this._alone
};
Node.prototype.setId = function(a) {
	this._id = this.getType() + "_" + a
};
Node.prototype.getId = function() {
	return this._diagram.getId() + ":" + this._id
};
Node.prototype.setType = function(a) {
	if (this._type == "untyped" && JSFun.isString(a)) {
		this._type = a
	}
};
Node.prototype.getType = function() {
	return this._type
};
Node.prototype.getElementXML = function(b) {
	var c = b.createElement(this.getType());
	var d = [];
	var a;
	if (this._selectedFigure) {
		this.setSelectedFigure(0)
	}
	c.setAttribute("id", this.getId());
	c.setAttribute("x", this.getX());
	c.setAttribute("y", this.getY());
	c.setAttribute("width", this.getWidth());
	c.setAttribute("height", this.getHeight());
	c.setAttribute("backgroundColor", this.getBackgroundColor());
	if (this.getLineColor()) {
		c.setAttribute("lineColor", this.getLineColor())
	}
	if (this.getLineWidth()) {
		c.setAttribute("lineWidth", this.getLineWidth())
	}
	if (this.getFontColor()) {
		c.setAttribute("fontColor", this.getFontColor())
	}
	if (this.getFontFamily()) {
		c.setAttribute("fontFamily", this.getFontFamily())
	}
	if (this.getFontSize()) {
		c.setAttribute("fontSize", this.getFontSize())
	}
	if (this.getFontStyle()) {
		c.setAttribute("fontStyle", this.getFontStyle())
	}
	if (this.getFontWeight()) {
		c.setAttribute("fontWeight", this.getFontWeight())
	}
	for (a = 0; a < this._tagValues.length; a++) {
		d.push(this._tagValues[a][0] + ":" + this._tagValues[a][1])
	}
	c.setAttribute("tagValues", d);
	for (a in this._components) {
		if (this._components[a].getId()) {
			c.appendChild(this._components[a].getComponentXML(b))
		}
	}
	for (a in this._nodeChilds) {
		c.appendChild(this._nodeChilds[a].getElementXML(b))
	}
	for (a in this._relationChilds) {
		c.appendChild(this._relationChilds[a].getElementXML(b))
	}
	return c
};
Node.prototype.setElementXML = function(e) {
	this.setPosition(parseInt(e.getAttribute("x")), parseInt(e.getAttribute("y")));
	this.resetMovement();
	this.setWidth(parseInt(e.getAttribute("width")));
	this.setHeight(parseInt(e.getAttribute("height")));
	this.setBackgroundColor(e.getAttribute("backgroundColor"));
	if (e.getAttribute("lineColor")) {
		this.setLineColor(e.getAttribute("lineColor"))
	}
	if (e.getAttribute("lineWidth")) {
		this.setLineWidth(parseInt(e.getAttribute("lineWidth")))
	}
	if (e.getAttribute("fontColor")) {
		this.setFontColor(e.getAttribute("fontColor"))
	}
	if (e.getAttribute("fontFamily")) {
		this.setFontFamily(e.getAttribute("fontFamily"))
	}
	if (e.getAttribute("fontSize")) {
		this.setFontSize(e.getAttribute("fontSize"))
	}
	if (e.getAttribute("fontStyle")) {
		this.setFontStyle(e.getAttribute("fontStyle"))
	}
	if (e.getAttribute("fontWeight")) {
		this.setFontWeight(e.getAttribute("fontWeight"))
	}
	var d = e.getAttribute("tagValues");
	var g = [];
	var f;
	while (d != "") {
		f = d.indexOf(",");
		if (f == -1) {
			g.push(d);
			d = ""
		} else {
			g.push(d.substring(0, f));
			d = d.substring(f + 1)
		}
	}
	this.setTagValues(g);
	var b;
	var c = e.childNodes;
	for (b = 0; b < c.length; b++) {
		var a;
		for (a in this._components) {
			if (this._components[a].getId() == c[b].getAttribute("id")) {
				this._components[a].setComponentXML(c[b]);
				this.updateComponents()
			}
		}
	}
	this.notifyDraw()
};
Node.prototype.setValue = function(c, b) {
	var a;
	for (a in this._components) {
		if (!(this._components[a] instanceof SuperComponent) && this._components[a].getId() == c) {
			this._components[a].setValue(b);
			this.updateComponents();
			return true
		}
	}
	return false
};
Node.prototype.addValue = function(c, b) {
	var a;
	for (a in this._components) {
		if (this._components[a] instanceof SuperComponent && this._components[a].getId() == c) {
			this._components[a].addField(b);
			this.updateComponents();
			return true
		}
	}
	return false
};
Node.prototype.addChild = function(a) {
	if (a instanceof Node) {
		this._nodeChilds.push(a);
		a.setParent(this)
	} else {
		if (a instanceof Relation) {
			this._relationChilds.push(a);
			a.setParent(this)
		}
	}
};
Node.prototype.delChild = function(b) {
	var a;
	if (b instanceof Node) {
		for (a in this._nodeChilds) {
			if (this._nodeChilds[a] == b) {
				this._nodeChilds.splice(a, 1);
				b.setParent();
				break
			}
		}
	} else {
		if (b instanceof Relation) {
			for (a in this._relationChilds) {
				if (this._relationChilds[a] == b) {
					this._relationChilds.splice(a, 1);
					b.setParent();
					break
				}
			}
		}
	}
};
Node.prototype.addRelation = function(a) {
	if (a instanceof Relation) {
		this._relations.push(a)
	}
};
Node.prototype.delRelation = function(a) {
	var b;
	for (b in this._relations) {
		if (this._relations[b] == a) {
			this._relations.splice(b, 1);
			break
		}
	}
};
Node.prototype.setDiagram = function(a) {
	if (a instanceof Diagram) {
		this._diagram = a
	}
};
Node.prototype.notifyDraw = function() {
	if (this._diagram) {
		this._diagram.draw()
	}
};
Node.prototype.notifyChange = function() {
	this._resizing = true;
	if (this._container) {
		this.updateContainer();
		if (this._parent) {
			var a = this._parent.getParent();
			while (a) {
				if (a instanceof SuperNode) {
					a.notifyChange(true);
					a = null
				} else {
					a = a._parent
				}
			}
		}
	} else {
		this.updateComponents();
		if (this._parent) {
			this._parent.updateContainer();
			var a = this._parent.getParent();
			while (a) {
				if (a instanceof SuperNode) {
					a.notifyChange(true);
					a = null
				} else {
					a = a._parent
				}
			}
		}
	}
	this._resizing = false
};
Node.prototype.getX = function() {
	return this._x
};
Node.prototype.getY = function() {
	return this._y
};
Node.prototype.width = function(a) {
	if (JSFun.isNumber(a)) {
		this.setWidth(a);
		this.notifyChange();
		return true
	}
	return false
};
Node.prototype.height = function(a) {
	if (JSFun.isNumber(a)) {
		this.setHeight(a);
		this.notifyChange();
		return true
	}
	return false
};
Node.prototype.position = function(a, b) {
	if (JSFun.isNumber(a) && JSFun.isNumber(b)) {
		this.setPosition(a, b);
		this.updatePosition();
		this.resetMovement();
		return true
	}
	return false
};
Node.prototype.setPosition = function(a, b) {
	if (JSFun.isNumber(a) && JSFun.isNumber(b)) {
		this._x = a;
		this._y = b
	}
};
Node.prototype.getMovement = function() {
	return new Point(this._x - this._prex, this._y - this._prey)
};
Node.prototype.resetMovement = function() {
	this._prex = this._x;
	this._prey = this._y
};
Node.prototype.deselect = function() {
	this.deselectComponent();
	this._selectedBefore = false;
	this._selected = false
};
Node.prototype.deselectComponent = function() {
	if (this._activeComponent) {
		this._activeComponent.deselect();
		this._activeComponent = null
	}
};
Node.prototype.select = function(c, d) {
	if (!this._visible) {
		return false
	}
	this.deselectComponent();
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouse == true || this._diagram._touch == true) {
		if (this._selected) {
			var b = (this._diagram._touch) ? 7 : 0;
			if (this._moveable && Math.abs(c - (this._x + this._width + 2.5)) <= 2.5 + b && Math.abs(d - (this._y + this._height + 2.5)) <= 2.5 + b) {
				this._resizing = true;
				this._component = false;
				return true
			}
		}
		if (this._selected) {
			var b = (this._diagram._touch) ? 4 : 2;
			if (this.isOverComponent(c, d, b)) {
				this._relx = c - this._x;
				this._rely = d - this._y;
				this._selectedBefore = true;
				this._component = true;
				return true
			}
		}
		if (this.isOver(c, d)) {
			this._relx = c - this._x;
			this._rely = d - this._y;
			this._selectedBefore = this._selected;
			this._component = false;
			this._selected = true;
			return true
		} else {
			return false
		}
	} else {
		if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
			if (this.isOver(c, d)) {
				this.disableDefaultContextualMenu();
				var a = document.documentElement.scrollTop || document.body.scrollTop;
				c = c + this._diagram._div.offsetLeft;
				d = (a) ? (d - a + this._diagram._div.offsetTop) : (d + this._diagram._div.offsetTop);
				this.showContextualMenu(c, d);
				return true
			} else {
				return false
			}
		}
	}
};
Node.prototype.showContextualMenu = function(a, d) {
	if (this._diagram._activeMenu || !this._menu.length) {
		return
	}
	this._diagram._activeMenu = true;
	var c = document.createElement("div");
	c.className = "ud_contextualMenu";
	c.style.cursor = "pointer";
	for (var b = 0; b < this._menu.length; b++) {
		this.addItem(this._menu[b], c)
	}
	document.body.appendChild(c);
	this._diagram._divMenu = c;
	c.style.top = d + "px";
	c.style.left = a + "px"
};
Node.prototype.removeContextualMenu = function() {
	if (this._diagram._activeMenu) {
		this.showDefaultContextualMenu();
		document.body.removeChild(this._diagram._divMenu);
		this._diagram._activeMenu = false;
		this.notifyDraw()
	}
};
Node.prototype.showDefaultContextualMenu = function() {
	document.oncontextmenu = function() {
		return true
	}
};
Node.prototype.disableDefaultContextualMenu = function() {
	document.oncontextmenu = function() {
		return false
	}
};
Node.prototype.addItem = function(c, a) {
	var d = document.createElement("div");
	d.className = "ud_contextualMenuItem";
	var b = document.createElement("span");
	b.appendChild(document.createTextNode(c[1]));
	d.appendChild(b);
	a.appendChild(d);
	d.addEventListener("mouseup", c[0], false)
};
Node.prototype.showStyleDialog = function(e) {
	var P = e.that || this;
	var s = P._Backgroundcolor;
	var G = P._lineColor;
	var t = P._textColor;
	var ae = P._Backgroundcolor.split("#")[1];
	var g = new Array(parseInt(ae.slice(0, 2), 16), parseInt(ae.slice(2, 4), 16), parseInt(ae.slice(4, 6), 16));
	var aa = document.createElement("div");
	aa.className = "ud_popupStyle";
	var c = document.createElement("div");
	c.setAttribute("id", "divBlock1");
	var b = document.createElement("div");
	b.setAttribute("id", "divBlock2");
	var m = document.createElement("div");
	m.setAttribute("id", "colorHtml");
	m.style.color = "#ffffff";
	var D = document.createElement("div");
	D.setAttribute("id", "red");
	var d = document.createElement("canvas");
	d.setAttribute("id", "R");
	d.width = 150;
	d.height = 20;
	D.appendChild(d);
	var ab = d.getContext("2d");
	var K = document.createElement("div");
	K.setAttribute("id", "green");
	var j = document.createElement("canvas");
	j.setAttribute("id", "G");
	j.width = 150;
	j.height = 20;
	K.appendChild(j);
	var a = j.getContext("2d");
	var O = document.createElement("div");
	O.setAttribute("id", "blue");
	var o = document.createElement("canvas");
	o.setAttribute("id", "B");
	o.width = 150;
	o.height = 20;
	O.appendChild(o);
	var f = o.getContext("2d");
	var X = document.createElement("div");
	X.setAttribute("id", "divSelectColor");
	var u = document.createElement("canvas");
	u.setAttribute("id", "selectColor");
	u.width = 90;
	u.height = 90;
	X.appendChild(u);
	var z = u.getContext("2d");
	var N = document.createElement("form");
	var Z = document.createElement("div");
	Z.setAttribute("id", "divRadio");
	var U = document.createElement("label");
	U.innerHTML = "Background color";
	var w = document.createElement("input");
	w.setAttribute("id", "radio_background");
	w.setAttribute("type", "radio");
	w.setAttribute("name", "radio");
	w.setAttribute("value", "background");
	w.setAttribute("checked", "true");
	U.appendChild(w);
	var L = document.createElement("label");
	L.innerHTML = "Line color";
	var F = document.createElement("input");
	F.setAttribute("id", "radio_line");
	F.setAttribute("type", "radio");
	F.setAttribute("name", "radio");
	F.setAttribute("value", "line");
	L.appendChild(F);
	var ag = document.createElement("label");
	ag.innerHTML = "Text color";
	var ac = document.createElement("input");
	ac.setAttribute("id", "radio_text");
	ac.setAttribute("type", "radio");
	ac.setAttribute("name", "radio");
	ac.setAttribute("value", "text");
	ag.appendChild(ac);
	Z.appendChild(L);
	Z.appendChild(ag);
	Z.appendChild(U);
	var I = [w, F, ac];
	var r = document.createElement("div");
	r.setAttribute("id", "divFont");
	var Q = document.createElement("input");
	Q.setAttribute("type", "number");
	Q.setAttribute("name", "size");
	Q.setAttribute("value", parseInt(P._fontSize) || "12");
	Q.setAttribute("style", "width: 40px");
	var H = document.createElement("label");
	H.innerHTML = " Font size ";
	H.setAttribute("for", "size");
	var p = document.createElement("input");
	p.setAttribute("type", "text");
	p.setAttribute("name", "family");
	p.setAttribute("value", P._fontFamily || "monospace");
	p.setAttribute("style", "width: 70px");
	var W = document.createElement("label");
	W.innerHTML = "Font family ";
	W.setAttribute("for", "family");
	var af = document.createElement("input");
	af.setAttribute("type", "number");
	af.setAttribute("name", "width");
	af.setAttribute("value", P._lineWidth || "2");
	af.setAttribute("style", "width: 40px");
	var q = document.createElement("label");
	q.innerHTML = " Line width ";
	q.setAttribute("for", "width");
	r.appendChild(W);
	r.appendChild(p);
	r.appendChild(H);
	r.appendChild(Q);
	r.appendChild(q);
	r.appendChild(af);
	var y = document.createElement("select");
	y.name = "weight";
	var V = P._fontWeight || "normal";
	y.add(new Option("Normal", "normal"));
	y.add(new Option("Bold", "bold"));
	y.add(new Option("Bolder", "bolder"));
	for (i = 0; i < y.length; i++) {
		if (y.options[i].value == V) {
			y.options[i].selected = true
		}
	}
	y.style = "width: 85px";
	var v = document.createElement("label");
	v.innerHTML = " Text weight ";
	v.setAttribute("for", "weight");
	var x = document.createElement("select");
	x.name = "style";
	V = P._fontStyle || "normal";
	x.add(new Option("Normal", "normal"));
	x.add(new Option("Italic", "italic"));
	x.add(new Option("Oblique", "oblique"));
	for (i = 0; i < x.length; i++) {
		if (x.options[i].value == V) {
			x.options[i].selected = true
		}
	}
	x.style = "width: 85px";
	var h = document.createElement("label");
	h.innerHTML = "Text style ";
	h.setAttribute("for", "style");
	var l = document.createElement("input");
	l.setAttribute("type", "submit");
	l.setAttribute("value", "OK");
	var S = document.createElement("input");
	S.setAttribute("type", "submit");
	S.setAttribute("value", "Cancel");
	var T = document.createElement("input");
	T.setAttribute("title", "Click here to use the advanced color picker");
	T.setAttribute("type", "color");
	T.setAttribute("id", "color");
	var ad = document.createElement("input");
	ad.setAttribute("type", "submit");
	ad.setAttribute("title", "Click here to use the selected color in the color picker");
	ad.setAttribute("value", "Adjust color");
	var A = function(ah) {
		P.setFontFamily(p.value);
		P.setFontSize(parseInt(Q.value, 10));
		P.setLineWidth(parseFloat(af.value, 10));
		P.setFontStyle(x.options[x.selectedIndex].value);
		P.setFontWeight(y.options[y.selectedIndex].value);
		P.notifyDraw();
		document.body.removeChild(aa)
	};
	var k = function(ah) {
		P.setBackgroundColor(s);
		P.setLineColor(G);
		P.setFontColor(t);
		document.body.removeChild(aa)
	};
	var M = function(ah) {
		var aj = n();
		if (!aj) {
			aj = "#000000"
		}
		R(aj);
		aj = aj.split("#")[1];
		var ai = new Array(parseInt(aj.slice(0, 2), 16), parseInt(aj.slice(2, 4), 16), parseInt(aj.slice(4, 6), 16));
		ab.clearRect(0, 0, parseInt(d.width), d.height);
		B(d, ab, ai[0], "#ff0000");
		a.clearRect(0, 0, parseInt(j.width), d.height);
		B(j, a, ai[1], "#00ff00");
		f.clearRect(0, 0, parseInt(o.width), d.height);
		B(o, f, ai[2], "#0000ff")
	};
	var Y = function(ai) {
		coll = document.getElementById("color").value;
		R(coll);
		coll2 = coll;
		coll = coll.substring(1, 7);
		coll_R = parseInt(coll.slice(0, 2), 16);
		coll_G = parseInt(coll.slice(2, 4), 16);
		coll_B = parseInt(coll.slice(4, 6), 16);
		g[0] = coll_R;
		g[1] = coll_G;
		g[2] = coll_B;
		ab.clearRect(0, 0, parseInt(d.width), d.height);
		B(d, ab, coll_R, "#ff0000");
		a.clearRect(0, 0, parseInt(j.width), d.height);
		B(j, a, coll_G, "#00ff00");
		f.clearRect(0, 0, parseInt(o.width), d.height);
		B(o, f, coll_B, "#0000ff");
		while (m.hasChildNodes()) {
			m.removeChild(m.lastChild)
		}
		var ah = document.createElement("font");
		ah.style.color = "#" + coll;
		var ak = document.createTextNode("#");
		var aj = document.createTextNode(coll.toUpperCase());
		ah.appendChild(ak);
		ah.appendChild(aj);
		m.appendChild(ah);
		C(coll2)
	};
	w.addEventListener("click", M, false);
	F.addEventListener("click", M, false);
	ac.addEventListener("click", M, false);
	l.addEventListener("click", A, false);
	S.addEventListener("click", k, false);
	ad.addEventListener("click", Y, false);
	N.onsubmit = function() {
		return false
	};
	l.focus();
	N.appendChild(T);
	N.appendChild(ad);
	N.appendChild(document.createElement("hr"));
	N.appendChild(Z);
	N.appendChild(document.createElement("hr"));
	N.appendChild(r);
	N.appendChild(h);
	N.appendChild(x);
	N.appendChild(v);
	N.appendChild(y);
	N.appendChild(document.createElement("br"));
	N.appendChild(l);
	N.appendChild(S);
	c.appendChild(m);
	c.appendChild(D);
	c.appendChild(K);
	c.appendChild(O);
	c.appendChild(N);
	aa.appendChild(c);
	b.appendChild(X);
	b.appendChild(document.createElement("div"));
	aa.appendChild(b);
	var B = function(aj, ai, ak, ah) {
		if (ak == 0) {
			ak = 0.1
		} else {
			if (ak == 120) {
				ak = 119.9
			}
		}
		ai.save();
		ai.font = "12px monospace";
		ai.textBaseline = "middle";
		ai.fillStyle = "#ffffff";
		ai.fillText(aj.getAttribute("id"), 0, aj.height / 2);
		ai.restore();
		ai.save();
		ai.beginPath();
		ai.fillStyle = ah;
		ai.fillRect(20, 0, parseInt(aj.width) - 50, d.height);
		ai.closePath();
		ai.restore();
		ai.fillStyle = "#000000";
		ai.beginPath();
		ai.arc(20 + (ak * 100) / 255, parseInt(aj.height) / 2, 4, 0, Math.PI * 2, true);
		ai.closePath();
		ai.fill();
		ai.save();
		ai.font = "12px monospace";
		ai.textBaseline = "middle";
		ai.fillStyle = "#ffffff";
		ai.fillText(parseInt(ak), 125, aj.height / 2);
		ai.restore()
	};
	var R = function(ah) {
		z.save();
		z.beginPath();
		z.fillStyle = ah;
		z.fillRect(20, 20, 80, 80);
		z.closePath();
		z.restore()
	};
	var J = function(ak) {
		var aj = function(aq) {
			var ao = "0123456789ABCDEF";
			var an = parseInt(aq) % 16;
			var ap = (parseInt(aq) - an) / 16;
			hex = "" + ao.charAt(ap) + ao.charAt(an);
			return hex
		};
		var ai = aj(ak[0]) + aj(ak[1]) + aj(ak[2]);
		while (m.hasChildNodes()) {
			m.removeChild(m.lastChild)
		}
		var ah = document.createElement("font");
		ah.style.color = "#" + ai;
		var am = document.createTextNode("#");
		var al = document.createTextNode(ai);
		ah.appendChild(am);
		ah.appendChild(al);
		m.appendChild(ah);
		C("#" + ai)
	};
	var E = function(aj) {
		var ai = aj.pageX - aa.offsetLeft - this.offsetLeft;
		var ah = aj.pageY - this.offsetTop;
		if (this.getAttribute("id") == "red") {
			g[0] = ((ai - 20) * 255) / 100;
			if (g[0] > 255) {
				g[0] = 255
			}
			if (g[0] < 0) {
				g[0] = 0
			}
			ab.clearRect(0, 0, parseInt(d.width), d.height);
			B(d, ab, g[0], "#ff0000")
		}
		if (this.getAttribute("id") == "green") {
			g[1] = ((ai - 20) * 255) / 100;
			if (g[1] > 255) {
				g[1] = 255
			}
			if (g[1] < 0) {
				g[1] = 0
			}
			a.clearRect(0, 0, parseInt(j.width), j.height);
			B(j, a, g[1], "#00ff00")
		}
		if (this.getAttribute("id") == "blue") {
			g[2] = ((ai - 20) * 255) / 100;
			if (g[2] > 255) {
				g[2] = 255
			}
			if (g[2] < 0) {
				g[2] = 0
			}
			f.clearRect(0, 0, parseInt(o.width), o.height);
			B(o, f, g[2], "#0000ff")
		}
		J(g);
		R(n())
	};
	var n = function() {
		for (var ah = 0; ah < I.length; ah++) {
			if (I[ah].checked) {
				break
			}
		}
		switch (I[ah].value) {
			case "background":
				return P.getBackgroundColor();
				break;
			case "line":
				return P.getLineColor();
				break;
			case "text":
				return P.getFontColor();
				break
		}
		return P.getBackgroundColor()
	};
	var C = function(ah) {
		for (var ai = 0; ai < I.length; ai++) {
			if (I[ai].checked) {
				break
			}
		}
		switch (I[ai].value) {
			case "background":
				P.setBackgroundColor(ah);
				break;
			case "line":
				P.setLineColor(ah);
				break;
			case "text":
				P.setFontColor(ah);
				break
		}
	};
	B(d, ab, g[0], "#ff0000");
	B(j, a, g[1], "#00ff00");
	B(o, f, g[2], "#0000ff");
	R(P._Backgroundcolor);
	J(g);
	D.addEventListener("mousedown", E, false);
	K.addEventListener("mousedown", E, false);
	O.addEventListener("mousedown", E, false);
	document.body.appendChild(aa);
	aa.style.top = (window.innerHeight - parseInt(aa.offsetHeight)) / 2 + "px";
	aa.style.left = (window.innerWidth - parseInt(aa.offsetWidth)) / 2 + "px"
};
Node.prototype.setTagValues = function(e) {
	if (!JSFun.isArray(e)) {
		return false
	}
	var b = "";
	var c = "";
	var d;
	for (var a = 0; a < e.length; a++) {
		d = e[a].indexOf(":");
		if (d == -1) {
			b = e[a].substring(0)
		} else {
			b = e[a].substring(0, d);
			c = e[a].substring(d + 1)
		}
		if (!this.foundInTagValues(this._tagValues, b)) {
			this._tagValues.push([b, c])
		}
	}
	return true
};
Node.prototype.foundInTagValues = function(c, b) {
	for (var a = 0; a < c.length; a++) {
		if (c[a][0] == b) {
			return true
		}
	}
	return false
};
Node.prototype.setMenu = function(a) {
	if (a instanceof Array) {
		this._menu = a
	}
};
Node.prototype.getMenu = function() {
	return this._menu
};
Node.prototype.drag = function(b, g) {
	if (this._resizing) {
		var d = b - this._x;
		var c = g - this._y;
		d = Math.round(d);
		d = d - d % 5;
		c = Math.round(c);
		c = c - c % 5;
		var e = d;
		var a = c;
		if (this._proportional) {
			var f = this._width / this._height;
			if (e > a) {
				a = e / f
			} else {
				e = a * f
			}
		}
		this.setWidth(e);
		this.setHeight(a)
	} else {
		if (this._selected) {
			var d = b - this._relx;
			var c = g - this._rely;
			d = Math.round(d);
			d = d - d % 5;
			c = Math.round(c);
			c = c;
			this.setPosition(d, c);
			this._moved = true
		}
	}
};
Node.prototype.drop = function(b, e) {
	if (this._moved) {
		if (!this._alone) {
			this._diagram.checkForParent(this)
		}
		this.updatePosition();
		if (this._parent) {
			this._parent.updateContainer();
			var a = this._parent.getParent();
			while (a) {
				if (a instanceof SuperNode) {
					a.notifyChange(true);
					a = null
				} else {
					a = a._parent
				}
			}
		}
	} else {
		if (this._resizing) {
			this.updatePosition();
			if (this instanceof SuperNode) {
				var d = true;
				var c = true;
				this.notifyChange(d, c)
			} else {
				this.notifyChange()
			}
			if (this._parent) {
				this._parent.updateContainer();
				var a = this._parent.getParent();
				while (a) {
					if (a instanceof SuperNode) {
						a.notifyChange(true, true);
						a = null
					} else {
						a = a._parent
					}
				}
			}
		} else {
			if (this._selectedBefore) {
				this.selectComponent(b, e)
			}
		}
	}
	this._moved = false;
	this._resizing = false
};
Node.prototype.setContainer = function() {
	this._container = true
};
Node.prototype.isContainer = function() {
	if (this._container) {
		return true
	} else {
		return false
	}
};
Node.prototype.isChildOf = function(a) {
	if (this._parent == null) {
		return false
	} else {
		if (this._parent == a) {
			return true
		} else {
			return this._parent.isChildOf(a)
		}
	}
};
Node.prototype.setParent = function(a) {
	if (a instanceof Node && a._container) {
		this._parent = a
	} else {
		this._parent = null
	}
};
Node.prototype.getParent = function() {
	return this._parent
};
Node.prototype.updateContainer = function(d) {
	if (!(d == false || d == true)) {
		d = true
	}
	if (this._container) {
		var h;
		var e = this._x;
		var c = this._y;
		var b = this._x;
		var a = this._y;
		var f;
		var l, k, j, g;
		for (h in this._nodeChilds) {
			f = this._nodeChilds[h];
			if (f._visible) {
				j = f._x;
				g = f._y;
				l = f._x + f._width;
				k = f._y + f._height;
				if (l > b) {
					b = l
				}
				if (k > a) {
					a = k
				}
				if (j < e) {
					e = j
				}
				if (g < c) {
					c = g
				}
			}
		}
		if (e < this._x || c < this._y) {
			this.setWidth(this._x - e + this._width);
			this.setHeight(this._y - c + this._height);
			this._x = e;
			this._y = c;
			this.setMinWidth(b - e);
			this.setMinHeight(a - c)
		} else {
			this.setMinWidth(b - this._x);
			this.setMinHeight(a - this._y)
		}
		this._prex = this._x;
		this._prey = this._y;
		this.updateComponents();
		if (this._parent && d) {
			this._parent.updateContainer()
		}
	}
};
Node.prototype.updatePosition = function(d, b, g) {
	var c, a;
	g = g || false;
	if (d == undefined || b == undefined) {
		var e = this.getMovement();
		var d = e.getX();
		var b = e.getY();
		for (c in this._relations) {
			this._relations[c].updatePosition()
		}
	} else {
		this._x += d;
		this._y += b
	}
	this.resetMovement();
	for (c in this._components) {
		this._components[c].updatePosition(d, b)
	}
	for (c in this._relations) {
		var f = this._relations[c].getParent();
		if ((f != this._parent && !(f instanceof SuperNode && f == this._parent._parent)) || (g)) {
			this._relations[c].notifyChange()
		}
	}
	if (this._container) {
		for (c in this._nodeChilds) {
			this._nodeChilds[c].updatePosition(d, b)
		}
		for (c in this._relationChilds) {
			this._relationChilds[c].updatePosition(d, b)
		}
	}
};
Node.prototype.getParticularWidth = function(a) {
	if (a >= this._y && a <= this._y + this._height) {
		return [this._x, this._width]
	}
	return [0, 0]
};
Node.prototype.getParticularHeight = function(a) {
	if (a >= this._x && a <= this._x + this._width) {
		return [this._y, this._height]
	}
	return [0, 0]
};
Node.prototype.isOverComponent = function(b, e, a) {
	var c;
	var d = a || 0;
	for (c = 0; c < this._components.length; c += 1) {
		if (this._components[c].isOver(b, e, d)) {
			return true
		}
	}
	return false
};
Node.prototype.selectComponent = function(a, c) {
	var b;
	for (b = 0; b < this._components.length; b += 1) {
		if (this._components[b].select(a, c)) {
			this._activeComponent = this._components[b];
			return
		}
	}
};
Node.prototype.addFigure = function(a) {
	if (a instanceof NodeFigure) {
		if (!(a instanceof FromImageFigure)) {
			this.setBackgroundColor(a._color)
		}
		this.setLineWidth(a._lineWidth);
		this.setLineColor(a._lineColor);
		this._figures.push(a)
	}
};
Node.prototype.delFigure = function(b) {
	if (b instanceof NodeFigure) {
		for (var a = 1; a < this._figures.length; a++) {
			if (this._figures[a] == b) {
				if (this._selectedFigure == a) {
					this.setSelectedFigure(0)
				}
				this._figures.splice(a, 1);
				break
			}
		}
	}
};
Node.prototype.setBackgroundColor = function(a) {
	this._Backgroundcolor = a;
	for (var b = 0; b < this._figures.length; b++) {
		this._figures[b].setColor(a)
	}
};
Node.prototype.getBackgroundColor = function() {
	return this._Backgroundcolor
};
Node.prototype.setSelectedFigure = function(f) {
	if (JSFun.isNumber(f) && f > -1 && f < this._figures.length) {
		if (this._selectedFigure == f) {
			return false
		}
		this._selectedFigure = f;
		if (this._figures[f] instanceof FromImageFigure) {
			for (var d = 0; d < this._components.length; d++) {
				if (this._components[d]._id == "name") {
					if (!this._beforeNameComponent) {
						this._beforeNameComponent = this._components[d];
						var h = this._beforeNameComponent._text;
						var g = this._beforeNameComponent._font_color;
						var b = this._beforeNameComponent._font_family;
						var a = this._beforeNameComponent._font_size;
						var c = this._beforeNameComponent._font_weight;
						var e = this._beforeNameComponent.selected;
						if (this._beforeNameComponent instanceof TextArea) {
							this._components[d] = new TextArea({
								id: "name",
								text: h.join("\n"),
								text_color: g,
								text_family: b,
								font_size: a,
								font_weight: c,
								selected: e,
								position: Component.Bottom,
								margin: 3
							})
						}
						if (this._beforeNameComponent instanceof TextBox) {
							this._components[d] = new TextBox({
								id: "name",
								text: h,
								text_color: g,
								text_family: b,
								font_size: a,
								font_weight: c,
								selected: e,
								position: Component.Bottom,
								margin: 3
							})
						}
						this._components[d].setParent(this)
					}
				} else {
					this._components[d].setVisibility(false)
				}
			}
			this._beforeHeight = this._height;
			this._beforeWidth = this._width;
			for (d = 0; d < this._nodeChilds.length; d++) {
				this._nodeChilds[d].setVisibility(false)
			}
		} else {
			for (var d = 0; d < this._components.length; d++) {
				if (this._components[d]._id == "name") {
					if (this._beforeNameComponent) {
						if (this._beforeNameComponent instanceof TextArea) {
							this._beforeNameComponent.setText(this._components[d]._text.join("\n"))
						} else {
							if (this._beforeNameComponent instanceof TextBox) {
								this._beforeNameComponent.setText(this._components[d]._text)
							}
						}
						this._components[d] = this._beforeNameComponent;
						this._beforeNameComponent = null
					}
				} else {
					if (!(this._components[d] instanceof SpecificationItem) || this._components[d] instanceof SpecificationItem && this._components[d].getValue() != "") {
						this._components[d].setVisibility(true)
					}
				}
			}
			for (d = 0; d < this._nodeChilds.length; d++) {
				this._nodeChilds[d].setVisibility(true)
			}
			this.setHeight(this._beforeHeight);
			this.setWidth(this._beforeWidth);
			this.notifyChange(true);
			this._diagram._sortNodesByArea()
		}
		this.updateComponents()
	}
	return true
};
Node.prototype.setVisibility = function(a) {
	this._visible = a;
	var c = true;
	if (this._selectedFigure && a) {
		c = false
	}
	for (var b = 0; b < this._components.length; b++) {
		if (c || (!c && this._components[b]._id == "name")) {
			this._components[b].setVisibility(a)
		}
	}
	if (this._container && c) {
		for (b = 0; b < this._nodeChilds.length; b++) {
			this._nodeChilds[b].setVisibility(a)
		}
	}
};
Node.prototype.drawFigures = function(b) {
	var a;
	for (a = 0; a < this._figures.length; a += 1) {
		if (a == this._selectedFigure) {
			this._figures[a].draw(b, this._x, this._y, this._width, this._height)
		}
	}
};
Node.prototype.addComponent = function(a) {
	if (a instanceof Component) {
		a.setParent(this);
		this._components.push(a);
		this.updateComponents()
	}
};
Node.prototype.calculateSize = function() {
	if (this._components.length > 0) {
		var a;
		var d = 0;
		var c = 0;
		var f;
		var e = false;
		var b;
		for (b in this._components) {
			a = this._components[b];
			if (a._visible && !(a instanceof RegionLine) && (a.getPosition() == Component.Float || (a.getPosition() == Component.BottomLeft && a._visible) || a.getPosition() == Component.BottomRight || a.getPosition() == Component.Xmovement)) {
				if (a._orientation) {
					d += a.getWidth();
					if (!(a instanceof RegionLine) && a.getHeight() > c) {
						c = a.getHeight()
					}
				} else {
					c += a.getHeight();
					f = (a.getPosition() == Component.Xmovement) ? (a.getWidth() + 2 * a._parent._Xmovement) : a.getWidth();
					if (!(a instanceof RegionLine) && f > d) {
						d = f
					}
				}
			} else {
				if (!a._visible) {
					e = true
				}
			}
		}
		if (c == 0 && e == true) {
			c = 20
		}
		if (d == 0 && e == true) {
			d = 20
		}
		if (this._container && !this._selectedFigure) {
			if (c > this._minHeight) {
				this.setMinHeight(c)
			}
			if (d > this._minWidth) {
				this.setMinWidth(d)
			}
		} else {
			if (c > 0) {
				this.setMinHeight(c)
			}
			if (d > 0) {
				this.setMinWidth(d)
			}
		}
	}
};
Node.prototype.insertComponents = function(j, h, a, l) {
	var c;
	var d;
	var b = -1;
	var f = -1;
	var g = -1;
	var m = -1;
	var e = [];
	for (c = 0; c < this._components.length; c++) {
		d = this._components[c];
		if (d instanceof Separator) {
			if (d._orientation) {
				var k = this.getParticularHeight(j);
				d.setCoordinates(j, k[0]);
				d.setHeight(k[1] - 2 * d._margin)
			} else {
				var k = this.getParticularWidth(h);
				d.setCoordinates(k[0], h);
				d.setWidth(k[1])
			}
		} else {
			if (d.isCentered()) {
				if (d._orientation) {
					d.setCoordinates(j, h + l / 2 - d.getHeight() / 2)
				} else {
					d.setCoordinates(j + a / 2 - d.getWidth() / 2, h)
				}
			} else {
				if (d.getPosition() == Component.TopRight) {
					d.setCoordinates(j + a - d.getWidth(), this._y)
				} else {
					if (d.getPosition() == Component.TopLeft) {
						d.setCoordinates(j, this._y)
					} else {
						if (d.getPosition() == Component.Top && d._visible) {
							e.push(d)
						} else {
							if (d.getPosition() == Component.Bottom && d._visible) {
								if (f == -1) {
									f = this._y + this._height
								}
								d.setCoordinates(this._x + this._width / 2 - d.getWidth() / 2, f);
								f += d.getHeight()
							} else {
								if (d.getPosition() == Component.Left && d._visible) {
									if (g == -1) {
										g = this._y + this._height / 2 - d.getHeight() / 2
									}
									d.setCoordinates(this._x - d.getWidth(), g);
									g += d.getHeight()
								} else {
									if (d.getPosition() == Component.Right && d._visible) {
										if (m == -1) {
											m = this._y + this._height / 2 - d.getHeight() / 2
										}
										d.setCoordinates(this._x + this._width, m);
										m += d.getHeight()
									} else {
										if (d.getPosition() == Component.BottomLeft) {
											d.setCoordinates(this._x, this._y + this._height - d.getHeight())
										} else {
											if (d.getPosition() == Component.BottomRight) {
												d.setCoordinates(this._x + this._width - d.getWidth(), this._y + this._height - d.getHeight())
											} else {
												if (d.getPosition() == Component.Xmovement) {
													d.setCoordinates(j + this._Xmovement, h)
												} else {
													d.setCoordinates(j, h);
													d.setSuperWidth(this._width)
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		if (d.getPosition() == Component.Float || d.getPosition() == Component.Xmovement) {
			if (d._orientation) {
				j += d.getWidth()
			} else {
				h += d.getHeight()
			}
		}
		if (d instanceof SuperComponent) {
			d.updateComponents()
		}
	}
	for (c = e.length - 1; c > -1; c--) {
		if (b == -1) {
			b = this._y - e[c].getHeight()
		}
		e[c].setCoordinates(this._x + this._width / 2 - e[c].getWidth() / 2, b);
		if (c != 0) {
			b -= e[c - 1].getHeight()
		}
		if (e[c] instanceof SuperComponent) {
			e[c].updateComponents()
		}
	}
};
Node.prototype.updateComponents = function(b) {
	b = (b == undefined) ? true : b;
	if (this._components.length > 0) {
		this.calculateSize();
		this.insertComponents(this._x, this._y, this._width, this._height)
	}
	if (b) {
		var a;
		for (a in this._relations) {
			this._relations[a].notifyChange()
		}
	}
};
Node.prototype.drawComponents = function(b) {
	var a;
	for (a = 0; a < this._components.length; a += 1) {
		this._components[a].draw(b)
	}
};
Node.prototype.drawComponentsShape = function(b) {
	var a;
	for (a = 0; a < this._components.length; a += 1) {
		this._components[a].drawShape(b)
	}
};
Node.prototype.setMoveable = function() {
	this._moveable = true
};
Node.prototype.setProportional = function() {
	this._proportional = true
};
Node.prototype.setWidth = function(a) {
	if (a < this._minWidth) {
		a = this._minWidth
	}
	this._width = a
};
Node.prototype.setHeight = function(a) {
	if (a < this._minHeight) {
		a = this._minHeight
	}
	this._height = a
};
Node.prototype.setMinWidth = function(a) {
	if (a < 0) {
		this._minWidth = 0
	} else {
		this._minWidth = a
	}
	if (this._width < this._minWidth) {
		this._width = this._minWidth
	}
};
Node.prototype.setMinHeight = function(a) {
	if (a < 0) {
		this._minHeight = 0
	} else {
		this._minHeight = a
	}
	if (this._height < this._minHeight) {
		this._height = this._minHeight
	}
};
Node.prototype.getWidth = function() {
	return this._width
};
Node.prototype.getHeight = function() {
	return this._height
};
Node.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.fillStyle = NodeStyle.shape_color;
	if (this._moveable && this._selected) {
		a.fillRect(parseInt(this._x + this._width), parseInt(this._y + this._height), 5, 5)
	}
	a.restore();
	this.drawFigures(a);
	this.drawComponents(a);
	if (this._selected) {
		this.drawComponentsShape(a)
	}
};
Node.prototype.isOver = function(a, b) {
	if (a instanceof Point) {
		b = a.getY();
		a = a.getX()
	}
	if (a >= this._x && a <= this._x + this._width && b >= this._y && b <= this._y + this._height) {
		return true
	}
	return false
};
Node.prototype.isOverBeforePosition = function(a, b) {
	if (a instanceof Point) {
		b = a.getY();
		a = a.getX()
	}
	if (a >= this._prex && a <= this._prex + this._width && b >= this._prey && b <= this._prey + this._height && a >= this._x && a <= this._x + this._width) {
		return true
	}
	return false
};
Node.prototype.getArea = function() {
	return this._width * this._height
};
Node.prototype.notifyDelete = function(b) {
	if (this._parent instanceof SuperNode) {
		var a;
		for (a in this._components) {
			if (this._components[a] == b) {
				this._components.splice(a, 1);
				break
			}
		}
		this.updateComponents()
	}
};
Node.prototype.drawShape = function(a) {
	a.save();
	a.lineWidth = 2.5;
	a.strokeStyle = NodeStyle.shape_color;
	a.strokeRect(JSGraphic.toPixel(this._x), JSGraphic.toPixel(this._y), this._width, this._height);
	a.restore()
};
Node.prototype.getCentralPoint = function() {
	return new Point(this._x + this._width / 2, this._y + this._height / 2)
};
Node.prototype.getLinkCentered = function(f, e) {
	if (f instanceof Point) {
		e = f.getY();
		f = f.getX()
	}
	var h = 0;
	var g = 0;
	var a = this._width / 2;
	var j = this._height / 2;
	var d = this._x + a;
	var c = this._y + j;
	if (f - d != 0) {
		var b = (e - c) / (f - d);
		h = Math.abs(j / b);
		g = Math.abs(a * b)
	} else {
		h = 0;
		g = j
	}
	if (h > a) {
		h = a
	}
	if (g > j) {
		g = j
	}
	if (f < d) {
		h = -h
	}
	if (e < c) {
		g = -g
	}
	return new Point(d + h, c + g)
};
Node.prototype.getLink = function(f, e, d, c) {
	if (!d || !c) {
		return this.getLinkCentered(f, e)
	}
	var h = 0;
	var g = 0;
	var a = d - this._x;
	var j = c - this._y;
	if (f > d) {
		a = this._width - a
	}
	if (e > c) {
		j = this._height - j
	}
	if (f - d != 0) {
		var b = (e - c) / (f - d);
		h = Math.abs(j / b);
		g = Math.abs(a * b)
	} else {
		h = 0;
		g = j
	}
	if (h > a) {
		h = a
	}
	if (g > j) {
		g = j
	}
	if (f < d) {
		h = -h
	}
	if (e < c) {
		g = -g
	}
	return new Point(d + h, c + g)
};
Node.prototype.notifyDeleted = function(a) {
	var b;
	for (b in this._relations) {
		if (this._relations[b] == a) {
			this._relations.splice(b, 1)
		}
	}
};
Node.prototype.remove = function() {
	var a;
	while (this._relations[0]) {
		(this._relations.pop()).remove()
	}
	if (this._parent) {
		var b = this._parent;
		this._parent.delChild(this);
		b.updateContainer()
	}
	if (this._container) {
		while (this._nodeChilds[0]) {
			(this._nodeChilds.pop()).remove()
		}
	}
	this._diagram.notifyDeleted(this)
};
Node.prototype.toString = function() {
	return "Node"
};
Node.prototype.getLineWidth = function() {
	return this._lineWidth
};
Node.prototype.setLineWidth = function(b) {
	this._lineWidth = b;
	for (var a = 0; a < this._figures.length; a++) {
		this._figures[a].setLineWidth(b)
	}
};
Node.prototype.getLineColor = function() {
	return this._lineColor
};
Node.prototype.setLineColor = function(a) {
	this._lineColor = a;
	for (var b = 0; b < this._figures.length; b++) {
		this._figures[b].setLineColor(a)
	}
};
Node.prototype.getFontFamily = function() {
	return this._fontFamily
};
Node.prototype.setFontFamily = function(b) {
	var a;
	this._fontFamily = b;
	for (a in this._components) {
		this._components[a].setFontFamily(b)
	}
};
Node.prototype.getFontColor = function() {
	return this._fontColor
};
Node.prototype.setFontColor = function(a) {
	var b;
	this._fontColor = a;
	for (b in this._components) {
		this._components[b].setFontColor(a)
	}
};
Node.prototype.getFontSize = function() {
	return this._fontSize
};
Node.prototype.setFontSize = function(d) {
	var c;
	this._fontSize = d;
	for (c in this._components) {
		this._components[c].setFontSize(d)
	}
	var b = true;
	var a = true;
	this.notifyChange(b, a)
};
Node.prototype.getFontStyle = function() {
	return this._fontStyle
};
Node.prototype.setFontStyle = function(b) {
	var a;
	this._fontStyle = b;
	for (a in this._components) {
		this._components[a].setFontStyle(b)
	}
};
Node.prototype.getFontWeight = function() {
	return this._fontWeight
};
Node.prototype.setFontWeight = function(b) {
	var a;
	this._fontWeight = b;
	for (a in this._components) {
		this._components[a].setFontWeight(b)
	}
};
Node.prototype.showColorDialog = function(z) {
	var p = z.that || this;
	var k = p._Backgroundcolor;
	var s = p._Backgroundcolor.split("#")[1];
	var v = new Array(parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16));
	var t = document.createElement("div");
	t.className = "ud_popupColor";
	var D = document.createElement("div");
	D.setAttribute("id", "divBlock1");
	var C = document.createElement("div");
	C.setAttribute("id", "divBlock2");
	var f = document.createElement("div");
	f.setAttribute("id", "colorHtml");
	f.style.color = "#ffffff";
	var a = document.createElement("div");
	a.setAttribute("id", "red");
	var r = document.createElement("canvas");
	r.setAttribute("id", "R");
	r.width = 150;
	r.height = 20;
	a.appendChild(r);
	var b = r.getContext("2d");
	var l = document.createElement("div");
	l.setAttribute("id", "green");
	var u = document.createElement("canvas");
	u.setAttribute("id", "G");
	u.width = 150;
	u.height = 20;
	l.appendChild(u);
	var m = u.getContext("2d");
	var q = document.createElement("div");
	q.setAttribute("id", "blue");
	var w = document.createElement("canvas");
	w.setAttribute("id", "B");
	w.width = 150;
	w.height = 20;
	q.appendChild(w);
	var o = w.getContext("2d");
	var n = document.createElement("div");
	n.setAttribute("id", "divSelectColor");
	var A = document.createElement("canvas");
	A.setAttribute("id", "selectColor");
	A.width = 90;
	A.height = 90;
	n.appendChild(A);
	var d = A.getContext("2d");
	var e = document.createElement("form");
	var E = document.createElement("input");
	E.setAttribute("type", "submit");
	E.setAttribute("value", "OK");
	var B = document.createElement("input");
	B.setAttribute("type", "submit");
	B.setAttribute("value", "Cancel");
	var y = function(F) {
		p.notifyDraw();
		document.body.removeChild(t)
	};
	var j = function(F) {
		p.setBackgroundColor(k);
		document.body.removeChild(t)
	};
	E.addEventListener("click", y, false);
	B.addEventListener("click", j, false);
	e.onsubmit = function() {
		return false
	};
	E.focus();
	e.appendChild(E);
	e.appendChild(B);
	D.appendChild(f);
	D.appendChild(a);
	D.appendChild(l);
	D.appendChild(q);
	D.appendChild(e);
	t.appendChild(D);
	C.appendChild(n);
	C.appendChild(document.createElement("div"));
	t.appendChild(C);
	var x = function(H, G, I, F) {
		if (I == 0) {
			I = 0.1
		} else {
			if (I == 120) {
				I = 119.9
			}
		}
		G.save();
		G.font = "12px monospace";
		G.textBaseline = "middle";
		G.fillStyle = "#ffffff";
		G.fillText(H.getAttribute("id"), 0, H.height / 2);
		G.restore();
		G.save();
		G.beginPath();
		G.fillStyle = F;
		G.fillRect(20, 0, parseInt(H.width) - 50, r.height);
		G.closePath();
		G.restore();
		G.fillStyle = "#000000";
		G.beginPath();
		G.arc(20 + (I * 100) / 255, parseInt(H.height) / 2, 4, 0, Math.PI * 2, true);
		G.closePath();
		G.fill();
		G.save();
		G.font = "12px monospace";
		G.textBaseline = "middle";
		G.fillStyle = "#ffffff";
		G.fillText(parseInt(I), 125, H.height / 2);
		G.restore()
	};
	var h = function(F) {
		d.save();
		d.beginPath();
		d.fillStyle = F;
		d.fillRect(20, 20, 80, 80);
		d.closePath();
		d.restore()
	};
	var g = function(I) {
		var H = function(O) {
			var M = "0123456789ABCDEF";
			var L = parseInt(O) % 16;
			var N = (parseInt(O) - L) / 16;
			hex = "" + M.charAt(N) + M.charAt(L);
			return hex
		};
		var G = H(I[0]) + H(I[1]) + H(I[2]);
		while (f.hasChildNodes()) {
			f.removeChild(f.lastChild)
		}
		var F = document.createElement("font");
		F.style.color = "#" + G;
		var K = document.createTextNode("#");
		var J = document.createTextNode(G);
		F.appendChild(K);
		F.appendChild(J);
		f.appendChild(F);
		setCheckedColor("#" + G)
	};
	var c = function(H) {
		var G = H.pageX - t.offsetLeft - this.offsetLeft;
		var F = H.pageY - this.offsetTop;
		if (this.getAttribute("id") == "red") {
			v[0] = ((G - 20) * 255) / 100;
			if (v[0] > 255) {
				v[0] = 255
			}
			if (v[0] < 0) {
				v[0] = 0
			}
			b.clearRect(0, 0, parseInt(r.width), r.height);
			x(r, b, v[0], "#ff0000")
		}
		if (this.getAttribute("id") == "green") {
			v[1] = ((G - 20) * 255) / 100;
			if (v[1] > 255) {
				v[1] = 255
			}
			if (v[1] < 0) {
				v[1] = 0
			}
			m.clearRect(0, 0, parseInt(u.width), u.height);
			x(u, m, v[1], "#00ff00")
		}
		if (this.getAttribute("id") == "blue") {
			v[2] = ((G - 20) * 255) / 100;
			if (v[2] > 255) {
				v[2] = 255
			}
			if (v[2] < 0) {
				v[2] = 0
			}
			o.clearRect(0, 0, parseInt(w.width), w.height);
			x(w, o, v[2], "#0000ff")
		}
		g(v);
		h(p._Backgroundcolor)
	};
	x(r, b, v[0], "#ff0000");
	x(u, m, v[1], "#00ff00");
	x(w, o, v[2], "#0000ff");
	h(p._Backgroundcolor);
	g(v);
	a.addEventListener("mousedown", c, false);
	l.addEventListener("mousedown", c, false);
	q.addEventListener("mousedown", c, false);
	document.body.appendChild(t);
	t.style.top = (window.innerHeight - parseInt(t.offsetHeight)) / 2 + "px";
	t.style.left = (window.innerWidth - parseInt(t.offsetWidth)) / 2 + "px"
};
Node.prototype.getNodeChilds = function() {
	return this._nodeChilds
};
Node.prototype.getComponents = function() {
	return this._components
};
Node.prototype.isVisible = function() {
	return this._visible
};
Node.prototype.getRelations = function() {
	return this._relations
};
var Cube = function(a) {
	a = a || {};
	Cube.baseConstructor.call(this, a)
};
JSFun.extend(Cube, Node);
Cube.prototype.setElementXML = function(a) {
	Cube.base.setElementXML.call(this, a)
};
Cube.prototype.getLinkCentered = function(f, e) {
	if (f instanceof Point) {
		e = f.getY();
		f = f.getX()
	}
	var h = 0;
	var g = 0;
	var a = (this._width + 10) / 2;
	var j = (this._height + 10) / 2;
	var d = this._x + a;
	var c = this._y - 10 + j;
	if (f - d != 0) {
		var b = (e - c) / (f - d);
		h = Math.abs(j / b);
		g = Math.abs(a * b)
	} else {
		h = 0;
		g = j
	}
	if (h > a) {
		h = a
	}
	if (g > j) {
		g = j
	}
	if (f < d) {
		h = -h
	}
	if (e < c) {
		g = -g
	}
	return new Point(d + h, c + g)
};
Cube.prototype.getLink = function(f, e, d, c) {
	if (!d || !c) {
		return this.getLinkCentered(f, e)
	}
	var h = 0;
	var g = 0;
	var a = d - this._x;
	var j = c - this._y - 10;
	if (f > d) {
		a = (this._width + 10) - a
	}
	if (e > c) {
		j = (this._height + 10) - j
	}
	if (f - d != 0) {
		var b = (e - c) / (f - d);
		h = Math.abs(j / b);
		g = Math.abs(a * b)
	} else {
		h = 0;
		g = j
	}
	if (h > a) {
		h = a
	}
	if (g > j) {
		g = j
	}
	if (f < d) {
		h = -h
	}
	if (e < c) {
		g = -g
	}
	return new Point(d + h, c + g)
};
var DataStoreItem = function(a) {
	a = a || {};
	DataStoreItem.baseConstructor.call(this, a);
	this._parse = /^([a-zA-Z]*)(?:\[([^\[\]]*)\])?$/
};
JSFun.extend(DataStoreItem, TextBox);
DataStoreItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += a[0]
	}
	if (a[1]) {
		b += "[" + a[1] + "]"
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_operation"
	}
};
DataStoreItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
DataStoreItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var f = this;
	this.active = true;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var e = [];
	var c;
	for (c = 0; c < 2; c++) {
		e.push(document.createElement("input"))
	}
	var g = document.createElement("input");
	g.setAttribute("type", "submit");
	g.setAttribute("value", "OK");
	var j = this.decode(this.getValue());
	for (c = 0; c < e.length; c++) {
		e[c].setAttribute("type", "text");
		e[c].setAttribute("value", j[c] || "")
	}
	this.changeText = function(o) {
		if (f.active) {
			var m = [];
			var n;
			for (n = 0; n < e.length; n++) {
				m.push(e[n].value)
			}
			f.setText(f.encode(m));
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	g.addEventListener("click", this.changeText, false);
	var d = ["name", "state"];
	var h;
	var l;
	for (c = 0; c < e.length; c++) {
		l = document.createElement("div");
		h = document.createElement("label");
		h.appendChild(document.createTextNode(d[c]));
		l.appendChild(h);
		l.appendChild(e[c]);
		b.appendChild(l)
	}
	b.appendChild(g);
	if (this.deletable) {
		var k = document.createElement("input");
		k.setAttribute("type", "submit");
		k.setAttribute("value", "delete");
		this.deleteDialog = function(m) {
			if (f.active) {
				document.body.removeChild(a);
				f.active = false;
				f.notifyDelete();
				f.notifyChange()
			}
		};
		k.addEventListener("click", this.deleteDialog, false);
		b.appendChild(k)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	g.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
var DeploymentItem = function(a) {
	a = a || {};
	this._pos = " ";
	DeploymentItem.baseConstructor.call(this, a);
	this.setMinWidth(40)
};
JSFun.extend(DeploymentItem, TextBox);
DeploymentItem.prototype.select = function(a, b) {
	if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 20)) <= 5 && Math.abs(b - (this.getPixelY() + 8.66)) <= 5) {
		this.notifyToUp();
		this.notifyChange();
		return true
	} else {
		if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 30)) <= 5 && Math.abs(b - (this.getPixelY() + 7.33)) <= 5) {
			this.notifyToDown();
			this.notifyChange();
			return true
		}
	}
	return DeploymentItem.base.select.call(this, a, b)
};
DeploymentItem.prototype.drawShape = function(b) {
	if (!this._visible) {
		return
	}
	var a = this.getPixelX() + this.getSuperWidth() - 35;
	var c = this.getPixelY() + 3;
	b.save();
	b.fillStyle = "#0000aa";
	b.beginPath();
	b.moveTo(a, c);
	b.lineTo(a + 10, c);
	b.lineTo(a + 5, c + 7);
	b.closePath();
	b.fill();
	a = a + 10;
	b.beginPath();
	b.moveTo(a + 5, c);
	b.lineTo(a, c + 7);
	b.lineTo(a + 10, c + 7);
	b.closePath();
	b.fill();
	b.restore()
};
DeploymentItem.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.font = this.getFontStyle() + " " + this.getFontWeight() + " " + this.getFontSize() + "px " + this.getFontFamily();
	a.textBaseline = "middle";
	a.fillStyle = this.getFontColor();
	if (this._text) {
		switch (this._pos) {
			case "alone":
				var b = "{" + this._text + "}";
				break;
			case "first":
				var b = "{" + this._text + ",";
				break;
			case "last":
				var b = this._text + "}";
				break;
			default:
				var b = this._text + ","
		}
	}
	if (this._orientation) {
		a.translate(this._getMX() + this._line_height / 2, this._getMY() + 4);
		a.rotate((-90 * Math.PI) / 180);
		if (b) {
			a.fillText(b, this._margin * 2 - this.getHeight(), 0)
		}
	} else {
		if (b) {
			a.fillText(b, this._getMX() + 4, this._getMY() + this._line_height / 2)
		}
	}
	a.restore()
};
var DeploymentFields = function(a) {
	a = a || {};
	DeploymentFields.baseConstructor.call(this, a);
	this._default = a.text || "new_deploymentproperty"
};
JSFun.extend(DeploymentFields, CollapsibleFields);
DeploymentFields.prototype.newItem = function() {
	return new DeploymentItem({
		text: this._default
	})
};
DeploymentFields.prototype._updatePos = function() {
	if (this._childs.length == 1) {
		this._childs[0]._pos = "alone";
		return
	}
	for (i = 0; i < this._childs.length; i++) {
		if (i == 0) {
			this._childs[i]._pos = "first"
		} else {
			if (i == this._childs.length - 1) {
				this._childs[i]._pos = "last"
			} else {
				this._childs[i]._pos = " "
			}
		}
	}
};
DeploymentFields.prototype.addSubComponent = function(a) {
	DeploymentFields.base.addSubComponent.call(this, a);
	if (a instanceof Component) {
		this._updatePos()
	}
};
DeploymentFields.prototype.delSubComponent = function(a) {
	DeploymentFields.base.delSubComponent.call(this, a);
	this._updatePos()
};
DeploymentFields.prototype.notifyToUp = function(a) {
	DeploymentFields.base.notifyToUp.call(this, a);
	this._updatePos()
};
DeploymentFields.prototype.notifyToDown = function(a) {
	DeploymentFields.base.notifyToDown.call(this, a);
	this._updatePos()
};
DeploymentFields.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	CollapsibleFields.base.draw.call(this, a)
};
var RelationLine = function() {};
RelationLine.prototype.draw = function(b, c, a) {};
var SolidLine = function() {};
JSFun.extend(SolidLine, RelationLine);
SolidLine.prototype.draw = function(c, e, a, d) {
	var b;
	c.save();
	c.strokeStyle = a;
	c.lineWidth = d;
	c.beginPath();
	if (e[0]) {
		c.moveTo(e[0].pixelX(), e[0].pixelY())
	}
	for (b = 1; b < e.length; b++) {
		c.lineTo(e[b].pixelX(), e[b].pixelY())
	}
	c.stroke();
	c.restore()
};
var DashedLine = function() {};
JSFun.extend(DashedLine, RelationLine);
DashedLine.prototype.draw = function(c, e, a, d) {
	var b;
	c.save();
	c.strokeStyle = a;
	c.lineWidth = d;
	for (b = 0; b < e.length - 1; b++) {
		JSGraphic.dashedLine(c, e[b].pixelX(), e[b].pixelY(), e[b + 1].pixelX(), e[b + 1].pixelY(), 10)
	}
	c.restore()
};
var RelationEnd = function() {};
RelationEnd.prototype.draw = function(c, a, e, d, b) {};
var CloseTip = function(a) {
	a = a || {};
	this._color = a.color || "#ffffff"
};
JSFun.extend(CloseTip, RelationEnd);
CloseTip.prototype.draw = function(c, a, e, d, b) {
	c.save();
	c.strokeStyle = b;
	c.fillStyle = this._color;
	c.translate(a, e);
	c.rotate(d);
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(-8.5, 5.5);
	c.lineTo(-8.5, -5.5);
	c.closePath();
	c.fill();
	c.stroke();
	c.restore()
};
var OpenTip = function() {};
JSFun.extend(OpenTip, RelationEnd);
OpenTip.prototype.draw = function(c, a, e, d, b) {
	c.save();
	c.strokeStyle = b;
	c.fillStyle = "#ffffff";
	c.translate(a, e);
	c.rotate(d);
	c.beginPath();
	c.moveTo(-8.5, 5.5);
	c.lineTo(0, 0);
	c.lineTo(-8.5, -5.5);
	c.stroke();
	c.restore()
};
var AggregationEnd = function() {};
JSFun.extend(AggregationEnd, RelationEnd);
AggregationEnd.prototype.draw = function(c, a, e, d, b) {
	c.save();
	c.strokeStyle = b;
	c.fillStyle = "#ffffff";
	c.translate(a, e);
	c.rotate(d);
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(-7, -5);
	c.lineTo(-14, 0);
	c.lineTo(-7, 5);
	c.closePath();
	c.fill();
	c.stroke();
	c.restore()
};
var CompositionEnd = function() {};
JSFun.extend(CompositionEnd, RelationEnd);
CompositionEnd.prototype.draw = function(c, a, e, d, b) {
	c.save();
	c.fillStyle = "#000000";
	c.translate(a, e);
	c.rotate(d);
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(-7, -5);
	c.lineTo(-14, 0);
	c.lineTo(-7, 5);
	c.closePath();
	c.fill();
	c.restore()
};
var InterfaceUsageEnd = function() {};
JSFun.extend(InterfaceUsageEnd, RelationEnd);
InterfaceUsageEnd.prototype.draw = function(c, a, e, d, b) {
	c.save();
	c.strokeStyle = b;
	c.translate(a + (1 * Math.cos(d)), e + (1 * Math.sin(d)));
	c.rotate(d);
	c.beginPath();
	c.arc(8, 0, 12, Math.PI / 2, Math.PI * 1.5, false);
	c.stroke();
	c.restore()
};
var OpenTipAggregationEnd = function() {};
JSFun.extend(OpenTipAggregationEnd, RelationEnd);
OpenTipAggregationEnd.prototype.draw = function(c, a, e, d, b) {
	c.save();
	c.strokeStyle = b;
	c.fillStyle = "#ffffff";
	c.translate(a, e);
	c.rotate(d);
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(-7, -5);
	c.lineTo(-14, 0);
	c.lineTo(-7, 5);
	c.lineTo(0, 0);
	c.fill();
	c.moveTo(-22.5, 5.5);
	c.lineTo(-14, 0);
	c.lineTo(-22.5, -5.5);
	c.stroke();
	c.restore()
};
var OpenTipCompositionEnd = function() {};
JSFun.extend(OpenTipCompositionEnd, RelationEnd);
OpenTipCompositionEnd.prototype.draw = function(c, a, e, d, b) {
	c.save();
	c.strokeStyle = b;
	c.fillStyle = "#000000";
	c.translate(a, e);
	c.rotate(d);
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(-7, -5);
	c.lineTo(-14, 0);
	c.lineTo(-7, 5);
	c.lineTo(0, 0);
	c.fill();
	c.moveTo(-22.5, 5.5);
	c.lineTo(-14, 0);
	c.lineTo(-22.5, -5.5);
	c.stroke();
	c.restore()
};
var RelationStyle = {
	shape_color: "#000000"
};
var Relation = function(a) {
	a = a || {};
	this._id = 0;
	this._type = "untyped";
	this._line_color = "#000000";
	this._line_width = 1.25;
	this._points = [new Point(), new Point()];
	this._selected = -1;
	this._selectedBefore = false;
	this._moved = false;
	this._activeComponent = null;
	this._selectedLine = false;
	this._selectedPoint = false;
	this._components = [];
	this._relations = [];
	this._diagram = null;
	this.setElements(a.a, a.b)
};
JSFun.extend(Relation, Element);
Relation.prototype.setElements = function(b, a) {
	if (b instanceof Element && a instanceof Element) {
		if (b instanceof Relation && a instanceof Relation) {
			return false
		}
		if (this._elemA) {
			this._elemA.delRelation(this)
		}
		if (this._elemB) {
			this._elemB.delRelation(this)
		}
		this._elemA = b;
		this._elemB = a;
		this._elemA.addRelation(this);
		this._elemB.addRelation(this);
		this.updateParent();
		this._calculateLineEnds();
		return true
	} else {
		return false
	}
};
Relation.prototype.setElementA = function(a) {
	if (a instanceof Element) {
		if (a instanceof Relation && this._elemB instanceof Relation) {
			return false
		}
		if (this._elemA) {
			this._elemA.delRelation(this)
		}
		this._elemA = a;
		this._elemA.addRelation(this);
		this.updateParent();
		return true
	} else {
		return false
	}
};
Relation.prototype.setElementB = function(a) {
	if (a instanceof Element) {
		if (a instanceof Relation && this._elemA instanceof Relation) {
			return false
		}
		if (this._elemB) {
			this._elemB.delRelation(this)
		}
		this._elemB = a;
		this._elemB.addRelation(this);
		this.updateParent();
		return true
	} else {
		return false
	}
};
Relation.prototype.setValue = function(c, b) {
	var a;
	for (a in this._components) {
		if (this._components[a].getId() == c) {
			this._components[a].setValue(b);
			this._updateComponents();
			return
		}
	}
};
Relation.prototype.addValue = function(c, b) {
	var a;
	for (a in this._components) {
		if (this._components[a] instanceof SuperComponent && this._components[a].getId() == c) {
			this._components[a].addField(b);
			this._updateComponents();
			return
		}
	}
};
Relation.prototype.getElementXML = function(c) {
	var d = c.createElement(this.getType());
	d.setAttribute("id", this.getId());
	d.setAttribute("side_A", this._elemA.getId());
	d.setAttribute("side_B", this._elemB.getId());
	var b;
	for (b = 0; b < this._points.length; b++) {
		var a = c.createElement("point");
		a.setAttribute("x", this._points[b].getX());
		a.setAttribute("y", this._points[b].getY());
		d.appendChild(a)
	}
	for (b in this._components) {
		if (this._components[b].getId()) {
			d.appendChild(this._components[b].getComponentXML(c))
		}
	}
	if (this.getLineColor() != "#000000") {
		d.setAttribute("color", this.getLineColor())
	}
	if (this.getLineWidth() != 1.25) {
		d.setAttribute("width", this.getLineWidth())
	}
	if (this._lineStyleChanged) {
		d.setAttribute("style", this.getLineStyle())
	}
	if (this.getDirection() != "none") {
		d.setAttribute("direction", this.getDirection())
	}
	return d
};
Relation.prototype.setElementXML = function(h, a) {
	var l = h.getAttribute("side_A");
	var k = h.getAttribute("side_B");
	this.setElements(a[l], a[k]);
	var g;
	var m = h.childNodes;
	var d = 0;
	for (g = 0; g < m.length; g++) {
		if (m[g].nodeName == "point") {
			this._points[d] = new Point(parseInt(m[g].getAttribute("x")), parseInt(m[g].getAttribute("y")));
			d++
		}
	}
	for (g = 0; g < m.length; g++) {
		if (m[g].nodeName == "item") {
			this.setValue(m[g].getAttribute("id"), m[g].getAttribute("value"))
		} else {
			if (m[g].nodeName == "superitem") {
				var f;
				for (f in this._components) {
					if (this._components[f].getId() == m[g].getAttribute("id")) {
						this._components[f].setComponentXML(m[g])
					}
				}
			}
		}
	}
	var e = h.getAttribute("color");
	if (e) {
		this.setLineColor(e)
	}
	var c = h.getAttribute("width");
	if (c) {
		this.setLineWidth(c)
	}
	var b = h.getAttribute("style");
	if (b) {
		this.setLineStyle(b)
	}
	var n = h.getAttribute("direction");
	if (n) {
		this.setDirection(n)
	}
	this._updateComponents()
};
Relation.prototype.setId = function(a) {
	this._id = this.getType() + "_" + a
};
Relation.prototype.getId = function() {
	return this._diagram.getId() + ":" + this._id
};
Relation.prototype.setType = function(a) {
	if (this._type == "untyped" && JSFun.isString(a)) {
		this._type = a
	}
};
Relation.prototype.getType = function() {
	return this._type
};
Relation.prototype.addRelation = function(a) {
	if (a instanceof Relation) {
		this._relations.push(a)
	}
};
Relation.prototype.delRelation = function(a) {
	var b;
	for (b in this._relations) {
		if (this._relations[b] == a) {
			this._relations.splice(b, 1);
			break
		}
	}
};
Relation.prototype.setDiagram = function(a) {
	if (a instanceof Diagram) {
		this._diagram = a
	}
};
Relation.prototype._addComponent = function(a) {
	a.setParent(this);
	this._components.push(a);
	this._updateComponents()
};
Relation.prototype._delComponent = function(b) {
	var a;
	for (a in this._components) {
		if (this._components[a] == b) {
			this._components.splice(a, 1);
			break
		}
	}
};
Relation.prototype.setComponentName = function(a) {
	if (!this._name) {
		this._name = new TextBox({
			id: "name",
			text: a
		});
		this._addComponent(this._name)
	} else {
		this._name.setText(a)
	}
};
Relation.prototype.setStereotype = function(a) {
	this._stereotype = new Text({
		id: "stereotype",
		text: a
	});
	this._addComponent(this._stereotype)
};
Relation.prototype.addComponentStereotype = function(a) {
	if (!this._stereotype) {
		this._stereotype = new StereotypeFields({
			id: "stereotype",
			width: 100,
			text: a
		});
		this._addComponent(this._stereotype)
	}
};
Relation.prototype.setComponentRoleA = function(a) {
	if (!this._roleA) {
		this._roleA = new RoleItem({
			id: "roleA",
			text: a,
			margin: 4
		});
		this._addComponent(this._roleA)
	} else {
		this._roleA.setText(a)
	}
};
Relation.prototype.setComponentRoleB = function(a) {
	if (!this._roleB) {
		this._roleB = new RoleItem({
			id: "roleB",
			text: a,
			margin: 4
		});
		this._addComponent(this._roleB)
	} else {
		this._roleB.setText(a)
	}
};
Relation.prototype.setComponentMultiplicityA = function(a) {
	if (!this._multiA) {
		this._multiA = new TextBox({
			id: "multiplicityA",
			text: a,
			margin: 4
		});
		this._addComponent(this._multiA)
	} else {
		this._multiA.setText(a)
	}
};
Relation.prototype.setComponentMultiplicityB = function(a) {
	if (!this._multiB) {
		this._multiB = new TextBox({
			id: "multiplicityB",
			text: a,
			margin: 4
		});
		this._addComponent(this._multiB)
	} else {
		this._multiB.setText(a)
	}
};
Relation.prototype._updateComponents = function() {
	if (!(this._elemA && this._elemB)) {
		return
	}
	var o = this._points.length;
	var e = parseInt(o / 2) - 1;
	if (this._roleA) {
		var a = this._points[0].getX();
		var s = this._points[0].getY();
		var q = this._points[1].getX();
		var p = this._points[1].getY();
		if (this._elemA instanceof Relation) {
			this._roleA.setCoordinates(a, s - this._roleA.getHeight())
		} else {
			var g = Math.atan2(p - s, q - a);
			var b = Math.tan(g);
			var c = this._roleA.getWidth();
			var r = this._roleA.getHeight();
			var n;
			var k;
			if (a == this._elemA.getX()) {
				n = -c;
				if (p < s) {
					k = -r - b * c
				} else {
					k = -r
				}
			} else {
				if (a == this._elemA.getX() + this._elemA.getWidth()) {
					n = 0;
					if (p < s) {
						k = -r + b * c
					} else {
						k = -r
					}
				} else {
					if (s == this._elemA.getY()) {
						k = -r;
						if (q < a) {
							n = -c - r / b
						} else {
							n = -c
						}
					} else {
						if (s == this._elemA.getY() + this._elemA.getHeight()) {
							k = 0;
							if (q < a) {
								n = -c + r / b
							} else {
								n = -c
							}
						}
					}
				}
			}
			this._roleA.setCoordinates(a + n, s + k)
		}
	}
	if (this._roleB) {
		var a = this._points[o - 1].getX();
		var s = this._points[o - 1].getY();
		var q = this._points[o - 2].getX();
		var p = this._points[o - 2].getY();
		if (this._elemB instanceof Relation) {
			this._roleB.setCoordinates(a, s - this._roleB.getHeight())
		} else {
			var g = Math.atan2(p - s, q - a);
			var b = Math.tan(g);
			var c = this._roleB.getWidth();
			var r = this._roleB.getHeight();
			var n;
			var k;
			if (a == this._elemB.getX()) {
				n = -c;
				if (p < s) {
					k = -r - b * this._roleB.getWidth()
				} else {
					k = -r
				}
			} else {
				if (a == this._elemB.getX() + this._elemB.getWidth()) {
					n = 0;
					if (p < s) {
						k = -r + b * this._roleB.getWidth()
					} else {
						k = -r
					}
				} else {
					if (s == this._elemB.getY()) {
						k = -r;
						if (q < a) {
							n = -c - this._roleB.getHeight() / b
						} else {
							n = -c
						}
					} else {
						if (s == this._elemB.getY() + this._elemB.getHeight()) {
							k = 0;
							if (q < a) {
								n = -c + this._roleB.getHeight() / b
							} else {
								n = -c
							}
						}
					}
				}
			}
			this._roleB.setCoordinates(a + n, s + k)
		}
	}
	if (this._multiA) {
		var a = this._points[0].getX();
		var s = this._points[0].getY();
		var q = this._points[1].getX();
		var p = this._points[1].getY();
		if (this._elemA instanceof Relation) {
			this._multiA.setCoordinates(a, s)
		} else {
			var g = Math.atan2(p - s, q - a);
			var b = Math.tan(g);
			var c = this._multiA.getWidth();
			var r = this._multiA.getHeight();
			var n = 0;
			var k = 0;
			var h = this._elemA.getX() + this._elemA.getWidth() / 2;
			var f = this._elemA.getY() + this._elemA.getHeight() / 2;
			var l = a - h;
			var j = s - f;
			var d = (this._elemA.getHeight() / this._elemA.getWidth());
			if (l < 0) {
				if (j < 0) {
					if (j > d * l) {
						n = -c;
						k = 0
					} else {
						n = 0;
						k = -r
					}
				} else {
					if (j > (-d) * l) {
						n = 0;
						k = 0
					} else {
						n = -c;
						k = -b * c
					}
				}
			} else {
				if (j < 0) {
					if (j < (-d) * l) {
						n = -r / b;
						k = -r
					} else {
						n = 0;
						k = 0
					}
				} else {
					if (j < d * l) {
						n = 0;
						k = b * c
					} else {
						n = r / b;
						k = 0
					}
				}
			}
			this._multiA.setCoordinates(a + n, s + k)
		}
	}
	if (this._multiB) {
		var a = this._points[o - 1].getX();
		var s = this._points[o - 1].getY();
		var q = this._points[o - 2].getX();
		var p = this._points[o - 2].getY();
		if (this._elemB instanceof Relation) {
			this._multiB.setCoordinates(a, s)
		} else {
			var g = Math.atan2(p - s, q - a);
			var b = Math.tan(g);
			var c = this._multiB.getWidth();
			var r = this._multiB.getHeight();
			var n = 0;
			var k = 0;
			var h = this._elemB.getX() + this._elemB.getWidth() / 2;
			var f = this._elemB.getY() + this._elemB.getHeight() / 2;
			var l = a - h;
			var j = s - f;
			var d = (this._elemB.getHeight() / this._elemB.getWidth());
			if (l < 0) {
				if (j < 0) {
					if (j > d * l) {
						n = -c;
						k = 0
					} else {
						n = 0;
						k = -r
					}
				} else {
					if (j > (-d) * l) {
						n = 0;
						k = 0
					} else {
						n = -c;
						k = -b * c
					}
				}
			} else {
				if (j < 0) {
					if (j < (-d) * l) {
						n = -r / b;
						k = -r
					} else {
						n = 0;
						k = 0
					}
				} else {
					if (j < d * l) {
						n = 0;
						k = b * c
					} else {
						n = r / b;
						k = 0
					}
				}
			}
			this._multiB.setCoordinates(a + n, s + k)
		}
	}
	var a = this._points[e].getX();
	var s = this._points[e].getY();
	var q = this._points[e + 1].getX();
	var p = this._points[e + 1].getY();
	if (o % 2 != 0) {
		var h = q;
		var f = p
	} else {
		var h = (a + q) / 2;
		var f = (s + p) / 2
	}
	if (this._stereotype) {
		if (a > q && s < p || q > a && p < s) {
			if (this._name) {
				this._stereotype.setCoordinates(h - this._stereotype.getWidth(), f - this._stereotype.getHeight() - this._name.getHeight())
			} else {
				this._stereotype.setCoordinates(h - this._stereotype.getWidth(), f - this._stereotype.getHeight())
			}
		} else {
			if (this._name) {
				this._stereotype.setCoordinates(h, f - this._stereotype.getHeight() - this._name.getHeight())
			} else {
				this._stereotype.setCoordinates(h, f - this._stereotype.getHeight())
			}
		}
		if (this._stereotype instanceof SuperComponent) {
			this._stereotype.updateComponents()
		}
	}
	if (this._name) {
		if (a > q && s < p || q > a && p < s) {
			this._name.setCoordinates(h - this._name.getWidth(), f - this._name.getHeight())
		} else {
			this._name.setCoordinates(h, f - this._name.getHeight())
		}
	}
};
Relation.prototype._drawComponents = function(b) {
	var a;
	for (a = 0; a < this._components.length; a++) {
		this._components[a].draw(b)
	}
};
Relation.prototype._drawComponentsShape = function(b) {
	var a;
	for (a = 0; a < this._components.length; a++) {
		this._components[a].drawShape(b)
	}
};
Relation.prototype.isLinked = function(a) {
	if (a instanceof Element && (this._elemA == a || this._elemB == a)) {
		return true
	} else {
		return false
	}
};
Relation.prototype._selectLine = function(u, r, k, j, n) {
	if (!(u instanceof Point && r instanceof Point)) {
		return false
	}
	var n = n || 5;
	var s = u.getX();
	var b = u.getY();
	var q = r.getX();
	var a = r.getY();
	var e, c, f, d;
	if (s > q) {
		e = s;
		f = q
	} else {
		e = q;
		f = s
	}
	if (b > a) {
		c = b;
		d = a
	} else {
		c = a;
		d = b
	}
	if (s == q) {
		if (j <= c && j >= d && k >= f - n && k <= f + n) {
			return true
		}
	} else {
		var p, t, h, g;
		p = (a - b) / (q - s);
		t = Math.atan((a - b) / (q - s));
		h = Math.abs(Math.sin(t) * n);
		g = Math.abs(Math.cos(t) * n);
		if (k >= f - h && k <= e + h && j >= d - g && j <= c + g) {
			var l, o;
			l = (k - s) * p + b;
			o = Math.abs(j - l);
			o = Math.cos(t) * o;
			if (o <= n) {
				return true
			}
		}
	}
	return false
};
Relation.prototype._isOverComponent = function(b, e, a) {
	var c;
	var d = a || 0;
	for (c = 0; c < this._components.length; c++) {
		if (this._components[c].isOver(b, e, d)) {
			return true
		}
	}
	return false
};
Relation.prototype._deselectComponent = function() {
	if (this._activeComponent) {
		this._activeComponent.deselect();
		this._activeComponent = null
	}
};
Relation.prototype._selectComponent = function(a, c) {
	var b;
	for (b = 0; b < this._components.length; b++) {
		if (this._components[b].select(a, c)) {
			this._activeComponent = this._components[b];
			return
		}
	}
};
Relation.prototype.isOver = function(b, e, a) {
	var c;
	var d = a || 0;
	for (var c = 0; c < this._points.length - 1; c++) {
		if (this._selectLine(this._points[c], this._points[c + 1], b, e, d)) {
			return true
		}
	}
	return false
};
Relation.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 6 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		var b = (this._diagram._touch) ? 10 : 0;
		if (this.isOver(c, e, b)) {
			this._diagram._pressMouseRight = false;
			document.oncontextmenu = function() {
				return false
			};
			var a = document.documentElement.scrollTop || document.body.scrollTop;
			c = c + this._diagram._div.offsetLeft;
			e = (a) ? (e - a + this._diagram._div.offsetTop) : (e + this._diagram._div.offsetTop);
			this.showContextualMenu(c, e);
			return true
		} else {
			return false
		}
	}
	for (d = 0; d < this._points.length; d++) {
		if (Math.abs(c - this._points[d].getX()) <= 4 && Math.abs(e - this._points[d].getY()) <= 4) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = d;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	if (this._selected > -1) {
		if (this._isOverComponent(c, e, b)) {
			this._selectedBefore = true;
			this._component = true;
			return true
		}
	}
	for (var d = 0; d < this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = d;
			this._selectedLine = true;
			this._component = false;
			this._points.splice(this._selected + 1, 0, new Point(c, e));
			return true
		}
	}
	return false
};
Relation.prototype.drag = function(a, b) {
	if (this._selectedLine) {
		if (this._elemA == this._elemB) {
			this._selected = 2;
			this._points[this._selected].setPoint(a, b)
		} else {
			this._points[this._selected + 1].setPoint(a, b)
		}
		this._moved = true
	} else {
		if (this._selectedPoint) {
			if (this._elemA == this._elemB) {
				if (this._selected == 1) {
					this._points[this._selected].setY(b)
				} else {
					if (this._selected == 3) {
						this._points[this._selected].setX(a)
					} else {
						this._points[this._selected].setPoint(a, b)
					}
				}
			} else {
				this._points[this._selected].setPoint(a, b)
			}
			this._moved = true
		}
	}
};
Relation.prototype._checkForNewNodes = function(a, c) {
	if (this._selectedPoint && (this._selected == 0 || this._selected == this._points.length - 1)) {
		var b = this._diagram.reassignRelationTo(this, a, c);
		if (b != this) {
			if (this._selected == 0) {
				this.setElementA(b)
			} else {
				this.setElementB(b)
			}
		}
	}
};
Relation.prototype.drop = function(a, b) {
	if (this._moved) {
		this._checkForNewNodes(a, b)
	} else {
		if (this._selectedBefore) {
			this._selectComponent(a, b)
		}
	}
	this._selectedLine = false;
	this._selectedPoint = false;
	this._moved = false;
	this._delUselessPoints();
	this.notifyChange()
};
Relation.prototype.notifyChange = function() {
	this._delUselessPoints();
	this.updateParent();
	this._calculateLineEnds();
	this._updateComponents();
	for (var a in this._relations) {
		this._relations[a].notifyChange()
	}
};
Relation.prototype.notifyDraw = function() {
	if (this._diagram) {
		this._diagram.draw()
	}
};
Relation.prototype.deselect = function() {
	this._deselectComponent();
	this._selectedBefore = false;
	this._selected = -1
};
Relation.prototype._calculateLineEnds = function() {
	var a, m;
	var f = this._points.length;
	if (this._elemA == this._elemB) {
		var b = this._elemA.getCentralPoint();
		var d = b.getX();
		var c = b.getY();
		var k = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
		var g = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
		var e;
		var j;
		if (this._selected == 2 || this._selected == 0 || this._selected == f - 1 || (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing) {
			if ((k - d) > 0) {
				if ((g - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					m = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = g - a.getY();
					e = (e < 20) ? 20 : e;
					j = k - m.getX();
					j = (j < 20) ? 20 : j;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(m.getX() + j, a.getY() + e);
					this._points[3] = new Point(m.getX() + j, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					m = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = a.getY() - g;
					e = (e < 20) ? 20 : e;
					j = k - m.getX();
					j = (j < 20) ? 20 : j;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(m.getX() + j, a.getY() - e);
					this._points[3] = new Point(m.getX() + j, c)
				}
			} else {
				if ((g - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					m = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = g - a.getY();
					e = (e < 20) ? 20 : e;
					j = m.getX() - k;
					j = (j < 20) ? 20 : j;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(m.getX() - j, a.getY() + e);
					this._points[3] = new Point(m.getX() - j, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					m = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = a.getY() - g;
					e = (e < 20) ? 20 : e;
					j = m.getX() - k;
					j = (j < 20) ? 20 : j;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(m.getX() - j, a.getY() - e);
					this._points[3] = new Point(m.getX() - j, c)
				}
			}
		} else {
			if (this._selected == 3) {
				k = this._points[3]._x;
				g = this._points[3]._y;
				a = this._elemA.getLinkCentered(d, this._points[0]._y);
				if ((k - d) > 0) {
					m = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					j = k - m.getX();
					j = (j < 20) ? 20 : j;
					this._points[2].setX(m.getX() + j);
					this._points[3] = new Point(m.getX() + j, c)
				} else {
					m = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					j = m.getX() - k;
					j = (j < 20) ? 20 : j;
					this._points[2].setX(m.getX() - j);
					this._points[3] = new Point(m.getX() - j, c)
				}
			} else {
				if (this._selected == 1) {
					k = this._points[1]._x;
					g = this._points[1]._y;
					m = this._elemA.getLinkCentered(this._points[4]._x, c);
					if ((g - c) > 0) {
						a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
						e = g - a.getY();
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() + e);
						this._points[2].setY(a.getY() + e)
					} else {
						a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
						e = a.getY() - g;
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() - e);
						this._points[2].setY(a.getY() - e)
					}
				} else {
					if (this._selected == -1) {
						var l = 0;
						var h = 0;
						if (this._elemA._moved) {
							var l = (this._elemA._x - this._elemA._prex) / 2;
							var h = (this._elemA._y - this._elemA._prey) / 2;
							this._points[0].setPoint(this._points[0]._x + l, this._points[0]._y + h);
							this._points[4].setPoint(this._points[4]._x + l, this._points[4]._y + h);
							a = this._points[0];
							m = this._points[4];
							this._points[1].setPoint(this._points[1]._x + l, this._points[1]._y + h);
							this._points[2].setPoint(this._points[2]._x + l, this._points[2]._y + h);
							this._points[3].setPoint(this._points[3]._x + l, this._points[3]._y + h)
						}
					}
				}
			}
		}
		this._points[0] = a;
		this._points[4] = m;
		while (this._points[5]) {
			this._points.pop()
		}
	} else {
		if (f > 2) {
			a = this._elemA.getLinkCentered(this._points[1]);
			m = this._elemB.getLinkCentered(this._points[f - 2]);
			this._points[0] = a;
			this._points[f - 1] = m
		} else {
			a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
			m = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
			this._points[0] = a;
			this._points[1] = m
		}
	}
};
Relation.prototype.draw = function(b) {
	var h = this._points.length;
	if (this._line) {
		this._line.draw(b, this._points, this.getLineColor(), this.getLineWidth())
	}
	if (this._end) {
		var d = this._points[h - 2].getX();
		var c = this._points[h - 2].getY();
		var g = this._points[h - 1].getX();
		var e = this._points[h - 1].getY();
		var f = Math.atan2(e - c, g - d);
		this._end.draw(b, g, e, f, this.getLineColor())
	}
	if (this._start) {
		var g = this._points[0].getX();
		var e = this._points[0].getY();
		var d = this._points[1].getX();
		var c = this._points[1].getY();
		var f = Math.atan2(e - c, g - d);
		this._start.draw(b, g, e, f, this.getLineColor())
	}
	if (this._selected >= 0) {
		var a;
		for (a = 0; a < this._points.length; a++) {
			b.fillRect(parseInt(this._points[a].getX()) - 3, parseInt(this._points[a].pixelY()) - 3, 6, 6)
		}
	}
	if (this._selected > -1) {
		this._drawComponentsShape(b)
	}
	this._drawComponents(b)
};
Relation.prototype.drawShape = function(b) {
	if (!(this._selectedPoint && this._selected == 0 || this._selected == this._points.length - 1)) {
		this._calculateLineEnds()
	}
	b.save();
	b.lineWidth = 2;
	b.strokeStyle = RelationStyle.shape_color;
	b.beginPath();
	b.moveTo(this._points[0].pixelX(), this._points[0].pixelY());
	var a;
	for (var a = 1; a < this._points.length; a++) {
		b.lineTo(this._points[a].pixelX(), this._points[a].pixelY())
	}
	b.stroke();
	b.restore()
};
Relation.prototype.setParent = function(a) {
	if (a instanceof Node) {
		this._parent = a
	} else {
		this._parent = null
	}
};
Relation.prototype.updateParent = function() {
	if (this._parent) {
		this._parent.delChild(this);
		this._parent = null
	}
	if (this._elemA && this._elemB) {
		if (this._elemA.getParent() != null && this._elemA.getParent() == this._elemB.getParent()) {
			(this._elemA.getParent()).addChild(this)
		} else {
			if (this._elemA._parent && this._elemB._parent && this._elemA._parent._parent instanceof SuperNode && this._elemB._parent._parent instanceof SuperNode && this._elemA._parent._parent == this._elemB._parent._parent) {
				(this._elemA.getParent().getParent()).addChild(this)
			}
		}
	}
};
Relation.prototype.updatePosition = function(c, a) {
	var b;
	if (c == undefined && a == undefined) {
		this.notifyChange()
	} else {
		for (b = 0; b < this._points.length; b++) {
			this._points[b].setPoint(this._points[b].getX() + c, this._points[b].getY() + a)
		}
		for (b in this._components) {
			this._components[b].updatePosition(c, a)
		}
		for (b in this._relations) {
			if (this._relations[b]._parent != this._parent) {
				this._relations[b].notifyChange()
			}
		}
	}
};
Relation.prototype.setLine = function(a) {
	if (a instanceof RelationLine) {
		this._line = a
	}
};
Relation.prototype.setEnd = function(a) {
	if (a instanceof RelationEnd) {
		this._end = a
	}
};
Relation.prototype.setStart = function(a) {
	if (a instanceof RelationEnd) {
		this._start = a
	}
};
Relation.prototype.getParent = function() {
	return this._parent
};
Relation.prototype._delUselessPoints = function() {
	var a = this._points.length - 1;
	if (this._elemA != this._elemB) {
		if (this._elemA instanceof Node) {
			if (this._points[1] != this._points[a] && this._elemA.isOver(this._points[1])) {
				this._points.shift();
				a -= 1
			}
		}
		if (this._elemB instanceof Node) {
			if (this._points[a - 1] != this._points[0] && this._elemB.isOver(this._points[a - 1])) {
				this._points.pop()
			}
		}
		var b;
		for (b = 1; b < this._points.length - 1; b++) {
			if (this._selectLine(this._points[b - 1], this._points[b + 1], this._points[b].getX(), this._points[b].getY(), 10)) {
				this._points.splice(b, 1)
			}
		}
	}
};
Relation.prototype.getCentralPoint = function() {
	var a = parseInt(this._points.length / 2) - 1;
	var c = this._points[a].getX();
	var b = this._points[a].getY();
	var e = this._points[a + 1].getX();
	var d = this._points[a + 1].getY();
	return new Point((c + e) / 2, (b + d) / 2)
};
Relation.prototype.getLinkCentered = function(a, b) {
	return this.getCentralPoint()
};
Relation.prototype.notifyDeleted = function(a) {};
Relation.prototype.remove = function() {
	var a;
	while (this._relations[0]) {
		(this._relations.pop()).remove()
	}
	this._elemA.notifyDeleted(this);
	this._elemB.notifyDeleted(this);
	if (this._parent) {
		this._parent.delChild(this)
	}
	if (this._diagram) {
		this._diagram.notifyDeleted(this)
	}
};
Relation.prototype.toString = function() {
	return "Relation"
};
Relation.prototype.setLineStyle = function(a) {
	if (a.toLowerCase() == "solid") {
		if (this.getLineStyle() != "solid" && !this._lineStyleChanged) {
			this._lineStyleChanged = true
		} else {
			if (this.getLineStyle() != "solid" && this._lineStyleChanged) {
				this._lineStyleChanged = false
			}
		}
		this.setLine(new SolidLine());
		return true
	} else {
		if (a.toLowerCase() == "dashed") {
			this._lineStyle = "dashed";
			if (this.getLineStyle() != "dashed" && !this._lineStyleChanged) {
				this._lineStyleChanged = true
			} else {
				if (this.getLineStyle() != "dashed" && this._lineStyleChanged) {
					this._lineStyleChanged = false
				}
			}
			this.setLine(new DashedLine());
			return true
		}
	}
	return false
};
Relation.prototype.getLineStyle = function() {
	if (this._line instanceof SolidLine) {
		return "solid"
	} else {
		if (this._line instanceof DashedLine) {
			return "dashed"
		}
	}
	return ""
};
Relation.prototype.setLineColor = function(a) {
	this._line_color = a
};
Relation.prototype.getLineColor = function() {
	return this._line_color
};
Relation.prototype.setLineWidth = function(a) {
	this._line_width = a
};
Relation.prototype.getLineWidth = function() {
	return this._line_width
};
Relation.prototype.showContextualMenu = function(a, d) {
	if (this._diagram._activeMenu || !this._menu.length) {
		return
	}
	this._diagram._activeMenu = true;
	var c = document.createElement("div");
	c.className = "ud_contextualMenu";
	c.style.cursor = "pointer";
	for (var b = 0; b < this._menu.length; b++) {
		this.addItem(this._menu[b], c)
	}
	document.body.appendChild(c);
	this._diagram._divMenu = c;
	c.style.top = d + "px";
	c.style.left = a + "px"
};
Relation.prototype.removeContextualMenu = function() {
	if (this._diagram._activeMenu) {
		document.body.removeChild(this._diagram._divMenu);
		this._diagram._activeMenu = false;
		this.notifyDraw()
	}
};
Relation.prototype.addItem = function(c, a) {
	var d = document.createElement("div");
	d.className = "ud_contextualMenuItem";
	var b = document.createElement("span");
	b.appendChild(document.createTextNode(c[1]));
	d.appendChild(b);
	a.appendChild(d);
	d.addEventListener("mouseup", c[0], false)
};
Relation.prototype.showStyleDialog = function(e) {
	var F = e.that || this;
	var H = e.x || 0;
	var G = e.y || 0;
	var w = F.getLineColor();
	var N = F.getLineColor().split("#")[1];
	var g = new Array(parseInt(N.slice(0, 2), 16), parseInt(N.slice(2, 4), 16), parseInt(N.slice(4, 6), 16));
	var L = document.createElement("div");
	L.className = "ud_popupLineStyle";
	var c = document.createElement("div");
	c.setAttribute("id", "divBlock1");
	var b = document.createElement("div");
	b.setAttribute("id", "divBlock2");
	var m = document.createElement("div");
	m.setAttribute("id", "colorHtml");
	m.style.color = "#ffffff";
	var u = document.createElement("div");
	u.setAttribute("id", "red");
	var d = document.createElement("canvas");
	d.setAttribute("id", "R");
	d.width = 150;
	d.height = 20;
	u.appendChild(d);
	var M = d.getContext("2d");
	var A = document.createElement("div");
	A.setAttribute("id", "green");
	var j = document.createElement("canvas");
	j.setAttribute("id", "G");
	j.width = 150;
	j.height = 20;
	A.appendChild(j);
	var a = j.getContext("2d");
	var E = document.createElement("div");
	E.setAttribute("id", "blue");
	var n = document.createElement("canvas");
	n.setAttribute("id", "B");
	n.width = 150;
	n.height = 20;
	E.appendChild(n);
	var f = n.getContext("2d");
	var K = document.createElement("div");
	K.setAttribute("id", "divSelectColor");
	var p = document.createElement("canvas");
	p.setAttribute("id", "selectColor");
	p.width = 90;
	p.height = 90;
	K.appendChild(p);
	var r = p.getContext("2d");
	var D = document.createElement("form");
	var B = document.createElement("div");
	B.setAttribute("id", "divLine");
	var O = document.createElement("input");
	O.setAttribute("type", "number");
	O.setAttribute("name", "width");
	O.setAttribute("value", F.getLineWidth() || "1");
	O.setAttribute("style", "width: 58px");
	var o = document.createElement("label");
	o.innerHTML = "line width";
	o.setAttribute("for", "width");
	B.appendChild(O);
	B.appendChild(o);
	var q = document.createElement("select");
	q.name = "style";
	value = F.getLineStyle() || "solid";
	q.add(new Option("Solid", "solid"));
	q.add(new Option("Dashed", "dashed"));
	for (i = 0; i < q.length; i++) {
		if (q.options[i].value == value) {
			q.options[i].selected = true
		}
	}
	q.style = "width: 85px";
	var h = document.createElement("label");
	h.innerHTML = "line style";
	h.setAttribute("for", "style");
	var l = document.createElement("input");
	l.setAttribute("type", "submit");
	l.setAttribute("value", "OK");
	l.setAttribute("style", "bottom: 15px");
	var J = document.createElement("input");
	J.setAttribute("type", "submit");
	J.setAttribute("value", "Cancel");
	J.setAttribute("style", "bottom: 15px");
	var s = function(x) {
		F.setLineWidth(parseFloat(O.value, 10));
		F.setLineStyle(q.options[q.selectedIndex].value);
		F.notifyDraw();
		document.body.removeChild(L)
	};
	var k = function(x) {
		F.setLineColor(w);
		document.body.removeChild(L)
	};
	var C = function(x) {
		var P = F.getLineColor();
		if (!P) {
			P = "#000000"
		}
		I(P);
		P = P.split("#")[1];
		var y = new Array(parseInt(P.slice(0, 2), 16), parseInt(P.slice(2, 4), 16), parseInt(P.slice(4, 6), 16));
		t(d, M, y[0], "#ff0000");
		t(j, a, y[1], "#00ff00");
		t(n, f, y[2], "#0000ff")
	};
	l.addEventListener("click", s, false);
	J.addEventListener("click", k, false);
	D.onsubmit = function() {
		return false
	};
	l.focus();
	D.appendChild(B);
	D.appendChild(q);
	D.appendChild(h);
	D.appendChild(document.createElement("br"));
	D.appendChild(l);
	D.appendChild(J);
	c.appendChild(m);
	c.appendChild(u);
	c.appendChild(A);
	c.appendChild(E);
	c.appendChild(D);
	L.appendChild(c);
	b.appendChild(K);
	b.appendChild(document.createElement("div"));
	L.appendChild(b);
	var t = function(P, y, Q, x) {
		if (Q == 0) {
			Q = 0.1
		} else {
			if (Q == 120) {
				Q = 119.9
			}
		}
		y.save();
		y.font = "12px monospace";
		y.textBaseline = "middle";
		y.fillStyle = "#ffffff";
		y.fillText(P.getAttribute("id"), 0, P.height / 2);
		y.restore();
		y.save();
		y.beginPath();
		y.fillStyle = x;
		y.fillRect(20, 0, parseInt(P.width) - 50, d.height);
		y.closePath();
		y.restore();
		y.fillStyle = "#000000";
		y.beginPath();
		y.arc(20 + (Q * 100) / 255, parseInt(P.height) / 2, 4, 0, Math.PI * 2, true);
		y.closePath();
		y.fill();
		y.save();
		y.font = "12px monospace";
		y.textBaseline = "middle";
		y.fillStyle = "#ffffff";
		y.fillText(parseInt(Q), 125, P.height / 2);
		y.restore()
	};
	var I = function(x) {
		r.save();
		r.beginPath();
		r.fillStyle = x;
		r.fillRect(20, 20, 80, 80);
		r.closePath();
		r.restore()
	};
	var z = function(Q) {
		var P = function(W) {
			var U = "0123456789ABCDEF";
			var T = parseInt(W) % 16;
			var V = (parseInt(W) - T) / 16;
			hex = "" + U.charAt(V) + U.charAt(T);
			return hex
		};
		var y = P(Q[0]) + P(Q[1]) + P(Q[2]);
		while (m.hasChildNodes()) {
			m.removeChild(m.lastChild)
		}
		var x = document.createElement("font");
		x.style.color = "#" + y;
		var S = document.createTextNode("#");
		var R = document.createTextNode(y);
		x.appendChild(S);
		x.appendChild(R);
		m.appendChild(x);
		F.setLineColor("#" + y)
	};
	var v = function(P) {
		var y = P.pageX - L.offsetLeft - this.offsetLeft;
		var x = P.pageY - this.offsetTop;
		if (this.getAttribute("id") == "red") {
			g[0] = ((y - 20) * 255) / 100;
			if (g[0] > 255) {
				g[0] = 255
			}
			if (g[0] < 0) {
				g[0] = 0
			}
			M.clearRect(0, 0, parseInt(d.width), d.height);
			t(d, M, g[0], "#ff0000")
		}
		if (this.getAttribute("id") == "green") {
			g[1] = ((y - 20) * 255) / 100;
			if (g[1] > 255) {
				g[1] = 255
			}
			if (g[1] < 0) {
				g[1] = 0
			}
			a.clearRect(0, 0, parseInt(j.width), j.height);
			t(j, a, g[1], "#00ff00")
		}
		if (this.getAttribute("id") == "blue") {
			g[2] = ((y - 20) * 255) / 100;
			if (g[2] > 255) {
				g[2] = 255
			}
			if (g[2] < 0) {
				g[2] = 0
			}
			f.clearRect(0, 0, parseInt(n.width), n.height);
			t(n, f, g[2], "#0000ff")
		}
		z(g);
		I(F.getLineColor())
	};
	t(d, M, g[0], "#ff0000");
	t(j, a, g[1], "#00ff00");
	t(n, f, g[2], "#0000ff");
	I(F.getLineColor());
	z(g);
	u.addEventListener("mousedown", v, false);
	A.addEventListener("mousedown", v, false);
	E.addEventListener("mousedown", v, false);
	document.body.appendChild(L);
	L.style.top = (window.innerHeight - parseInt(L.offsetHeight)) / 2 + "px";
	L.style.left = (window.innerWidth - parseInt(L.offsetWidth)) / 2 + "px"
};
Relation.prototype.setMenu = function(a) {
	if (a instanceof Array) {
		this._menu = a
	}
};
Relation.prototype.getMenu = function() {
	return this._menu
};
Relation.prototype.showDirectionDialog = function(c) {
	c = c || {};
	var e = c.that || this;
	var l = document.createElement("div");
	l.className = "ud_popupDirection";
	var a = document.createElement("div");
	a.setAttribute("id", "divNavegability");
	var b = document.createElement("form");
	var g = document.createElement("select");
	g.setAttribute("name", "direction");
	value = e.getDirection();
	g.add(new Option("none", "none"));
	g.add(new Option("a<-b", "a"));
	g.add(new Option("a->b", "b"));
	g.add(new Option("a<->b", "ab"));
	for (i = 0; i < g.length; i++) {
		if (g.options[i].value == value) {
			g.options[i].selected = true
		}
	}
	g.setAttribute("style", "width: 85px");
	var j = document.createElement("h5");
	j.innerHTML = "Navegability:";
	var h = document.createElement("input");
	h.setAttribute("type", "submit");
	h.setAttribute("value", "OK");
	var k = document.createElement("input");
	k.setAttribute("type", "submit");
	k.setAttribute("value", "Cancel");
	var d = function(m) {
		e.setDirection(g.options[g.selectedIndex].value);
		e.notifyDraw();
		document.body.removeChild(l)
	};
	var f = function(m) {
		document.body.removeChild(l)
	};
	h.addEventListener("click", d, false);
	k.addEventListener("click", f, false);
	b.onsubmit = function() {
		return false
	};
	h.focus();
	b.appendChild(g);
	b.appendChild(document.createElement("br"));
	b.appendChild(h);
	b.appendChild(k);
	a.appendChild(b);
	l.appendChild(j);
	l.appendChild(a);
	document.body.appendChild(l);
	l.style.top = (window.innerHeight - parseInt(l.offsetHeight)) / 2 + "px";
	l.style.left = (window.innerWidth - parseInt(l.offsetWidth)) / 2 + "px"
};
Relation.prototype.setDirection = function(a) {
	a = a.toLowerCase();
	switch (a) {
		case "a":
			this.setDirectionToA(true);
			this.setDirectionToB(false);
			break;
		case "b":
			this.setDirectionToA(false);
			this.setDirectionToB(true);
			break;
		case "ab":
			this.setDirectionToA(true);
			this.setDirectionToB(true);
			break;
		case "none":
			this.setDirectionToA(false);
			this.setDirectionToB(false);
			break
	}
};
Relation.prototype.setDirectionToA = function(a) {
	this._directionA = a;
	if (a == true) {
		this.setStart(new OpenTip())
	} else {
		if (this._start instanceof OpenTip) {
			this._start = null
		}
	}
};
Relation.prototype.setDirectionToB = function(a) {
	this._directionB = a;
	if (a == true) {
		this.setEnd(new OpenTip())
	} else {
		if (this._end instanceof OpenTip) {
			this._end = null
		}
	}
};
Relation.prototype.getDirectionToA = function() {
	if (this._directionA != undefined) {
		return this._directionA
	} else {
		if (!(this._start instanceof OpenTip) && !(this._end instanceof OpenTip)) {
			return true
		} else {
			if (this._start instanceof OpenTip) {
				return true
			}
		}
	}
	return false
};
Relation.prototype.getDirectionToB = function() {
	if (this._directionB != undefined) {
		return this._directionB
	} else {
		if (this.getElementA() == this.getElementB()) {
			return false
		} else {
			if (!(this._start instanceof OpenTip) && !(this._end instanceof OpenTip)) {
				return true
			} else {
				if (this._end instanceof OpenTip) {
					return true
				}
			}
		}
	}
	return false
};
Relation.prototype.getDirection = function() {
	if (this._directionA == true && this._directionB == true) {
		return "ab"
	} else {
		if (this._directionA == true) {
			return "a"
		} else {
			if (this._directionB == true) {
				return "b"
			}
		}
	}
	return "none"
};
Relation.prototype.getElementA = function() {
	return this._elemA
};
Relation.prototype.getElementB = function() {
	return this._elemB
};
Relation.prototype.getEnd = function() {
	return this._end
};
Relation.prototype.getStart = function() {
	return this._start
};
Relation.prototype.getRelations = function() {
	return this._relations
};
var TextFields = function(a) {
	a = a || {};
	TextFields.baseConstructor.call(this, a);
	this.setMinHeight(10);
	this.setMinWidth(25)
};
JSFun.extend(TextFields, SuperComponent);
TextFields.prototype.isOver = function(b, d, a) {
	var c = a || 0;
	if (this._visible && this.visibilitySubComponents() && Math.abs(b - (this._getX() + this.getWidth() - 5)) <= 6 + c && Math.abs(d - (this._getY() + 5)) <= 6 + c) {
		return true
	} else {
		return TextFields.base.isOver.call(this, b, d)
	}
};
TextFields.prototype.select = function(b, f, a) {
	var e = a || 0;
	var d = (this._orientation) ? (this._getX() + 5) : (this._getX() + this.getWidth() - 5);
	var c = (this._orientation) ? (this._getY() + this.getHeight() - 5) : (this._getY() + 5);
	if (this.visibilitySubComponents() && Math.abs(b - d) <= 6 + e && Math.abs(f - c - e) <= 6 + e) {
		this.addField();
		return true
	} else {
		return TextFields.base.select.call(this, b, f, e)
	}
};
TextFields.prototype.newItem = function() {
	return new TextBox()
};
TextFields.prototype.addField = function(b) {
	var a = this.newItem();
	a.setDeletable();
	a.setValue(b);
	this.addSubComponent(a);
	this.notifyChange()
};
TextFields.prototype.drawShape = function(a) {
	if (!this._visible) {
		return
	}
	TextFields.base.drawShape.call(this, a);
	if (this.visibilitySubComponents()) {
		a.save();
		a.fillStyle = "#94dc91";
		a.beginPath();
		if (this._orientation) {
			a.arc(this.getPixelX() + 5, this.getPixelY() + this.getHeight() - 5, 4, 0, Math.PI * 2, true)
		} else {
			a.arc(this.getPixelX() + this.getWidth() - 5, this.getPixelY() + 5, 4, 0, Math.PI * 2, true)
		}
		a.closePath();
		a.fill();
		a.restore()
	}
};
var StereotypeItem = function(a) {
	a = a || {};
	StereotypeItem.baseConstructor.call(this, a);
	this._parse = /^\xAB(.*)\xBB$/;
	if (this._orientation) {
		this.setMinHeight(40)
	} else {
		this.setMinWidth(40)
	}
};
JSFun.extend(StereotypeItem, TextBox);
StereotypeItem.prototype.encode = function(b) {
	var a = "";
	if (b) {
		a += "\xAB" + b + "\xBB"
	}
	if (this._parse.exec(a)) {
		return a
	} else {
		return "wrong_stereotype"
	}
};
StereotypeItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a[0]
	} else {
		return ""
	}
};
var StereotypeFields = function(a) {
	a = a || {};
	StereotypeFields.baseConstructor.call(this, a);
	this.setMinHeight(1);
	this.setMinWidth(1);
	this.setHeight(1);
	this.setWidth(1)
};
JSFun.extend(StereotypeFields, TextFields);
StereotypeFields.prototype.newItem = function() {
	return new StereotypeItem({
		text: "\xABstereotype\xBB",
		orientation: this._orientation || 0
	})
};
var Region = function(a) {
	a = a || {};
	Region.baseConstructor.call(this, a);
	this.setType("Region");
	this._parent = a.parent || null;
	this.setContainer();
	if (a.addComponent != false) {
		this.addComponents()
	}
};
JSFun.extend(Region, Node);
Region.prototype.addComponents = function(g) {
	var g = (JSFun.isBoolean(g)) ? g : true;
	var e = this._parent._nodeChilds;
	var c = e.length;
	var d;
	if (c == 0) {
		if (this._parent._orientation) {
			this.setWidth(this._parent._width)
		} else {
			this.setHeight(this._parent._height)
		}
	}
	if (this._parent._orientation) {
		if (c > 0 && g) {
			e[c - 1].setWidth(e[c - 1].getWidth() / 2);
			this._x = e[c - 1].getX() + e[c - 1].getWidth();
			this.setWidth(this._parent.getX() + this._parent.getWidth() - this._x)
		}
		if (!(this._parent instanceof Alternative) && !(this._parent instanceof HierarchicalSwimlane) && this._parent._includeComponentByRegion) {
			this.addComponent(new StereotypeFields({
				id: "stereotypes",
				centered: true
			}));
			this.addComponent(new TextBox({
				id: "name_node",
				text: "region",
				margin: 3,
				centered: true
			}))
		}
		if (c > 0) {
			var f = 1;
			var b = this._parent.getHeight() - this._parent._components[0]._height - this._parent._components[1]._height;
			var a = this._parent._heightSmallRectangle || 15;
			e[c - 1].addComponent(new RegionLine({
				id: "region",
				margin: 0,
				width: f,
				height: b,
				position: Component.TopRight,
				orientation: 1
			}))
		}
	} else {
		if (c > 0 && g) {
			e[c - 1].setHeight(e[c - 1].getHeight() / 2);
			this._y = e[c - 1].getY() + e[c - 1].getHeight();
			this.setHeight(this._parent.getY() + this._parent.getHeight() - this._y)
		}
		if (this._parent instanceof Alternative) {
			this.addComponent(new StereotypeFields({
				id: "stereotypes"
			}));
			this.addComponent(new GuardItem({
				id: "description",
				text: "[]",
				margin: 1
			}))
		}
		if (!(this._parent instanceof Alternative) && !(this._parent instanceof HierarchicalSwimlane) && this._parent._includeComponentByRegion) {
			this.addComponent(new StereotypeFields({
				id: "stereotypes",
				centered: true
			}));
			this.addComponent(new TextBox({
				id: "name_node",
				text: "region",
				margin: 3,
				centered: true
			}))
		}
		if (c > 0) {
			var b = 1;
			var f = this._parent.getWidth();
			e[c - 1].addComponent(new RegionLine({
				id: "region",
				margin: 0,
				width: f,
				height: b,
				position: Component.BottomLeft,
				orientation: 0
			}))
		}
	}
};
Region.prototype.updateContainer = function(e) {
	if (!(e == false || e == true)) {
		e = true
	}
	if (this._container) {
		var l;
		var f = this._x;
		var d = this._y;
		var c = this._x;
		var b = this._y;
		var g;
		var o, n, m, k;
		for (l in this._nodeChilds) {
			g = this._nodeChilds[l];
			if (g._visible) {
				m = g._x;
				k = g._y;
				o = g._x + g._width;
				n = g._y + g._height;
				if (o > c) {
					c = o
				}
				if (n > b) {
					b = n
				}
				if (m < f) {
					f = m
				}
				if (k < d) {
					d = k
				}
			}
		}
		for (l = this._components.length; l--;) {
			if (this._components[l] instanceof RegionLine) {
				break
			}
		}
		if (l != -1) {
			if (this.getParent()._orientation) {
				c += this._components[l]._width + 2
			} else {
				b += this._components[l]._height + 2
			}
		}
		var h = -1;
		var p = -1;
		if (this.getParent()._orientation) {
			if ((f < this._x) || (c > (this._x + this._width))) {
				var j;
				for (l = 0; l < this.getParent()._nodeChilds.length; l++) {
					var q = this.getParent()._nodeChilds[l];
					if ((q.getX() + q.getWidth()) > f) {
						if (h == -1) {
							h = l
						}
					}
					if ((q.getX()) < c) {
						p = l
					}
				}
				if ((h != -1) && (f < this._x)) {
					j = this._x - f + this.getParent().getWidth();
					this.getParent()._x = this.getParent()._x - (this._x - f);
					this.getParent().setWidth(j)
				}
				if (c > (this._x + this._width)) {
					j = c - this._x - this._width + this.getParent().getWidth();
					this.getParent().setWidth(j)
				}
			}
		} else {
			if ((d < this._y) || (b > (this._y + this._height))) {
				for (l = 0; l < this.getParent()._nodeChilds.length; l++) {
					var q = this.getParent()._nodeChilds[l];
					if ((q.getY() + q.getHeight()) > d) {
						if (h == -1) {
							h = l
						}
					}
					if ((q.getY()) < b) {
						p = l
					}
				}
				var a;
				if ((h != -1) && (d < this._y)) {
					a = this._y - d + this.getParent().getHeight();
					this.getParent()._y = this.getParent()._y - (this._y - d);
					this.getParent().setHeight(a)
				}
				if (b > (this._y + this._height)) {
					a = b - this._y - this._height + this.getParent().getHeight();
					this.getParent().setHeight(a)
				}
			}
		}
		if (f < this._x || d < this._y) {
			this.setWidth(this._x - f + this._width);
			this.setHeight(this._y - d + this._height);
			this._x = f;
			this._y = d;
			this.setMinWidth(c - f);
			this.setMinHeight(b - d)
		} else {
			this.setMinWidth(c - this._x);
			this.setMinHeight(b - this._y)
		}
		this._prex = this._x;
		this._prey = this._y;
		this.updateComponents();
		if (this._parent && e) {
			this._parent.updateContainer()
		}
	}
};
Region.prototype.isOverRegionLine = function(a, c) {
	var b;
	for (b = 0; b < this._components.length; b += 1) {
		if (this._components[b] instanceof RegionLine && this._components[b].isOver(a, c)) {
			return true
		}
	}
	return false
};
var Diagram = function(a) {
	this._alone = false;
	this._width = 0;
	this._height = 0;
	this._background = "#ffffff";
	this._div = null;
	this._mainContext = null;
	this._motionContext = null;
	this._nodes = [];
	this._relations = [];
	this._pressMouse = false;
	this._pressMouseRight = false;
	this._pressKey = false;
	this._validElements = [];
	this._items = [];
	this._id;
	this._type = "untyped";
	this._activeMenu = false;
	this._visible = true;
	this._name = new Tab({
		text: "Diagram name",
		margin: 6
	});
	this._name.setCoordinates(0, 0);
	this._name.setParent(this);
	if (a) {
		if (a.backgroundNodes) {
			this._backgroundNodes = a.backgroundNodes
		}
		if (a.background) {
			this._background = a.background
		}
		if (a.id) {
			this._alone = true;
			this._generateStructure(a.id, a.width, a.height)
		}
	}
	this._element = null;
	this._lastElement = null;
	this._defineDragAndDrop();
	this._updateCanvas = false
};
Diagram.prototype._generateStructure = function(b, d, a) {
	if (!d || d < 0) {
		d = 300
	}
	if (!a || a < 0) {
		a = 100
	}
	this._width = d;
	this._height = a;
	this._minWidth = d;
	var e = document.getElementById(b);
	if (e == null || e.nodeName != "DIV") {
		throw {
			name: "NotCorrectId",
			message: "The id specified does not exist or not a div element"
		}
	}
	e.setAttribute("class", "ud_diagram_div");
	e.style.width = d + "px";
	e.style.height = a + "px";
	this._div = e;
	var c = document.createElement("canvas");
	c.setAttribute("class", "ud_diagram_canvas");
	c.width = d;
	c.height = a;
	this._mainContext = c.getContext("2d");
	e.appendChild(c);
	c = document.createElement("canvas");
	c.setAttribute("class", "ud_diagram_canvas");
	c.width = this._width;
	c.height = this._height;
	c.onmousedown = function() {
		return false
	};
	this._motionContext = c.getContext("2d");
	e.appendChild(c);
	return true
};
Diagram.prototype.initialize = function(f, e, b, d, c, a) {
	if (JSFun.isNumber(f) && e.nodeName == "DIV" && b instanceof CanvasRenderingContext2D && d instanceof CanvasRenderingContext2D && c > 0 && a > 0) {
		this._id = f;
		this._div = e;
		this._mainContext = b;
		this._motionContext = d;
		this._width = c;
		this._height = a;
		this._minWidth = c;
		return true
	} else {
		return false
	}
};
Diagram.prototype.getId = function() {
	return this._id
};
Diagram.prototype.setId = function(a) {
	this._id = a
};
Diagram.prototype.getName = function() {
	return this._name.getValue()
};
Diagram.prototype.setName = function(a) {
	if (JSFun.isString(a)) {
		this._name.setValue(a)
	}
};
Diagram.prototype.setType = function(a) {
	if (this._type == "untyped" && JSFun.isString(a)) {
		this._type = a
	}
};
Diagram.prototype.getType = function() {
	return this._type
};
Diagram.prototype.notifyDraw = function() {
	this.draw()
};
Diagram.prototype.notifyChange = function() {
	this.draw()
};
Diagram.prototype._addElementOnly = function(a) {
	if (a instanceof Node) {
		a.setDiagram(this);
		this._nodes.push(a)
	} else {
		if (a instanceof Relation) {
			a.setDiagram(this);
			this._relations.push(a)
		}
	}
};
Diagram.prototype.addElement = function(b) {
	if (!b || !(b instanceof Element)) {
		return false
	}
	var a;
	for (a in this._validElements) {
		if (b.getType() == this._validElements[a]) {
			if (b instanceof Node) {
				this._addNode(b);
				return true
			} else {
				if (b instanceof Relation) {
					this._addRelation(b);
					return true
				}
			}
		}
	}
	return false
};
Diagram.prototype._addNode = function(c) {
	if (c instanceof Node) {
		c.setDiagram(this);
		if (c instanceof SuperNode) {
			for (var b = 0; b < c._nodeChilds.length; b++) {
				c._nodeChilds[b].setDiagram(this)
			}
		}
		this._nodes.push(c);
		if (this._backgroundNodes) {
			c.setBackgroundColor(this._backgroundNodes)
		}
		if (!c.isAlone()) {
			this.checkForParent(c)
		}
		c.updatePosition();
		if (c.getParent()) {
			c._parent.updateContainer();
			var a = c._parent.getParent();
			while (a) {
				if (a instanceof SuperNode) {
					a.notifyChange(true);
					a = null
				} else {
					a = a._parent
				}
			}
		}
		this._sortNodesByArea()
	}
};
Diagram.prototype.setBackgroundNodes = function(a) {
	if (a) {
		this._backgroundNodes = a
	}
};
Diagram.prototype.delElement = function(b) {
	var a;
	for (a in this._nodes) {
		if (this._nodes[a] == b) {
			b.remove();
			return true
		}
	}
	for (a in this._relations) {
		if (this._relations[a] == b) {
			b.remove();
			return true
		}
	}
	return false
};
Diagram.prototype.notifyDeleted = function(b) {
	var a;
	if (b instanceof Relation) {
		for (a in this._relations) {
			if (this._relations[a] == b) {
				this._relations.splice(a, 1);
				return
			}
		}
	} else {
		if (b instanceof Node) {
			for (a in this._nodes) {
				if (this._nodes[a] == b) {
					this._nodes.splice(a, 1);
					return
				}
			}
		}
	}
};
Diagram.prototype._addRelation = function(a) {
	if (a instanceof Relation) {
		a.setDiagram(this);
		this._relations.push(a)
	}
};
Diagram.prototype.addRelationFromPoints = function(b, e, g, d, f) {
	var c = this.getElementByPoint(e, g);
	var a = this.getElementByPoint(d, f);
	if (c && a) {
		if (b.setElements(c, a)) {
			b.notifyChange();
			return this.addElement(b)
		}
	}
	return false
};
Diagram.prototype._clearMain = function() {
	this._mainContext.clearRect(0, 0, this._width, this._height);
	this._mainContext.save();
	this._mainContext.fillStyle = this._background;
	this._mainContext.fillRect(0, 0, this._width, this._height);
	this._mainContext.restore()
};
Diagram.prototype._clearMotion = function() {
	this._motionContext.clearRect(0, 0, this._width, this._height)
};
Diagram.prototype.draw = function() {
	this._clearMain();
	this.updateHeightCanvas();
	this.updateWidthCanvas();
	this._name.draw(this._mainContext);
	for (i = this._nodes.length - 1; i >= 0; i -= 1) {
		this._nodes[i].draw(this._mainContext)
	}
	for (i in this._relations) {
		this._relations[i].draw(this._mainContext)
	}
};
Diagram.prototype.updateHeightCanvas = function() {
	if (!this._updateCanvas) {
		return
	}
	var a;
	var b = 0;
	for (a = this._nodes.length - 1; a >= 0; a -= 1) {
		if ((this._nodes[a]._y + this._nodes[a]._height + 10) > b) {
			b = this._nodes[a]._y + this._nodes[a]._height + 10
		}
	}
	if (b > this._height) {
		this._div.style.height = b + "px";
		this._div.childNodes[0].height = b;
		this._div.childNodes[1].height = b;
		this._mainContext.canvas.height = b;
		this._motionContext.canvas.height = b;
		this._clearMotion();
		this._height = b
	} else {
		b = (b > 580) ? b : 580;
		this._div.style.height = b + "px";
		this._div.childNodes[0].height = b;
		this._div.childNodes[1].height = b;
		this._mainContext.canvas.height = b;
		this._motionContext.canvas.height = b;
		this._clearMotion();
		this._height = b
	}
};
Diagram.prototype.setUpdateHeightCanvas = function(a) {
	this._updateCanvas = a
};
Diagram.prototype._drawMotion = function(a) {
	this._clearMotion();
	a.drawShape(this._motionContext)
};
Diagram.prototype._sortNodesByArea = function() {
	this._nodes.sort(function(e, c) {
		var f = e.getArea();
		var d = c.getArea();
		if (f < d) {
			return -1
		} else {
			if (f == d) {
				return 0
			} else {
				return 1
			}
		}
	})
};
Diagram.prototype.getElementByPoint = function(a, d) {
	var c, b;
	for (c in this._relations) {
		if (this._relations[c].isOver(a, d)) {
			return this._relations[c]
		}
	}
	for (c = 0; c < this._nodes.length; c++) {
		if (this._nodes[c].isOver(a, d)) {
			return this._nodes[c]
		}
	}
	return null
};
Diagram.prototype.reassignRelationTo = function(b, a, d) {
	var c;
	for (c in this._relations) {
		if (this._relations[c] != b && this._relations[c].isOver(a, d)) {
			return this._relations[c]
		}
	}
	for (c = 0; c < this._nodes.length; c++) {
		if (this._nodes[c].isOver(a, d)) {
			return this._nodes[c]
		}
	}
	return null
};
Diagram.prototype.checkForParent = function(d) {
	if (d instanceof Node) {
		var e;
		var h;
		var a;
		var k = false;
		var f = false;
		var g = d.getParent();
		for (e = 0; e < this._nodes.length && !k; e++) {
			h = this._nodes[e];
			if (h instanceof SuperNode) {
				for (var c = 0; c < h._nodeChilds.length && !k; c++) {
					a = h._nodeChilds[c];
					if (a.isContainer() && a != d && a.isOver(d.getCentralPoint()) && (!d.isContainer() || (d.isContainer() && !a.isChildOf(d)))) {
						k = true;
						h = a;
						break
					}
				}
			} else {
				if (h.isContainer() && h != d && h.getArea() > d.getArea() && h.isOver(d.getCentralPoint()) && (!d.isContainer() || (d.isContainer() && !h.isChildOf(d)))) {
					k = true;
					break
				}
			}
		}
		if (k) {
			if (h == g) {} else {
				if (g) {
					g.delChild(d);
					g.updateContainer();
					h.addChild(d)
				} else {
					h.addChild(d)
				}
			}
		} else {
			if (g) {
				g.delChild(d);
				g.updateContainer();
				var b = g.getParent();
				if (b instanceof SuperNode) {
					b.notifyChange(true)
				}
			}
		}
	}
};
Diagram.prototype._defineDragAndDrop = function() {
	var a = this;
	this._element = null;
	this._lastElement = null;
	this._selectElement = function(e) {
		if (e._touch == true) {
			return
		}
		if (e.button != 0) {
			if (e.button == 2) {
				a._pressMouseRight = true
			} else {
				a._pressKey = true;
				return
			}
		} else {
			a._pressMouse = true
		}
		var d = e.pageX - a._div.offsetLeft;
		var c = e.pageY - a._div.offsetTop;
		var f = false;
		var b;
		if (a._lastElement instanceof Relation) {
			if (a._lastElement.select(d, c)) {
				a._element = a._lastElement;
				f = true
			}
		}
		for (b = 0; b < a._relations.length && !f; b++) {
			if (a._relations[b].select(d, c)) {
				a._element = a._relations[b];
				f = true
			}
		}
		for (b = 0; b < a._nodes.length && !f; b++) {
			if (a._nodes[b].select(d, c)) {
				a._element = a._nodes[b];
				f = true
			}
		}
		if (a._alone) {
			a._name.deselect();
			if (!f && a._name.select(d, c)) {
				f = true
			}
		}
		if (a._lastElement && a._lastElement != a._element) {
			a._lastElement.deselect();
			a._lastElement = null
		}
	};
	this._selectByTouch = function(c) {
		if (c.touches.length != 1) {
			return
		}
		var e = c.touches[0];
		a._touch = true;
		a._hold = false;
		a._startX = e.pageX - a._div.offsetLeft;
		a._startY = e.pageY - a._div.offsetTop;
		var d = false;
		var b;
		if (a._lastElement instanceof Relation) {
			if (a._lastElement.select(a._startX, a._startY)) {
				a._element = a._lastElement;
				d = true
			}
		}
		for (b = 0; b < a._relations.length && !d; b++) {
			if (a._relations[b].select(a._startX, a._startY)) {
				a._element = a._relations[b];
				d = true
			}
		}
		for (b = 0; b < a._nodes.length && !d; b++) {
			if (a._nodes[b].select(a._startX, a._startY)) {
				a._element = a._nodes[b];
				d = true
			}
		}
		if (a._alone) {
			a._name.deselect();
			if (!d && a._name.select(a._startX, a._startY)) {
				d = true
			}
		}
		if (d == true && a._element._selectedBefore == true) {
			if ((a._element instanceof Node || a._element instanceof Relation) && !a._element._component && !(a._element instanceof Node && a._element.resize)) {
				a._tapTime = setTimeout(function() {
					a._tapHold(e)
				}, 600);
				a._stopEvent(c);
				a._cancelEvent(c)
			}
		}
		if (a._lastElement && a._lastElement != a._element) {
			a._lastElement.deselect();
			a._lastElement = null
		}
	};
	this._dragElement = function(d) {
		if (!(d.button == 0 && a._pressMouse)) {
			return
		}
		if (a._element) {
			var c = d.pageX - a._div.offsetLeft;
			var b = d.pageY - a._div.offsetTop;
			if (c < 0) {
				c = 0
			}
			if (b < 0) {
				b = 0
			}
			if (c >= a._width) {
				c = a._width
			}
			if (b >= a._height) {
				b = a._height
			}
			a._div.style.cursor = "pointer";
			a._element.drag(c, b);
			a._drawMotion(a._element)
		}
	};
	this._dropElement = function(d) {
		if (!(d.button == 0 && a._pressMouse)) {
			return
		}
		if (a._element) {
			a._div.style.cursor = "default";
			a._clearMotion();
			var c = d.pageX - a._div.offsetLeft;
			var b = d.pageY - a._div.offsetTop;
			a._element.drop(c, b);
			a._lastElement = a._element;
			a._element = null;
			a._sortNodesByArea();
			a.draw()
		} else {
			a.draw()
		}
		a._pressMouse = false
	};
	this._dropByTouch = function(b) {
		if (!(a._move)) {
			clearTimeout(a._tapTime);
			return
		}
		if (a._element) {
			a._div.style.cursor = "default";
			a._clearMotion();
			var c = b.changedTouches[0];
			a._startX = c.pageX - a._div.offsetLeft;
			a._startY = c.pageY - a._div.offsetTop;
			a._element.drop(a._startX, a._startY);
			a._lastElement = a._element;
			a._element = null;
			a._sortNodesByArea();
			a.draw()
		} else {
			a.draw()
		}
		a._touch = false;
		a._move = false
	};
	this._moveByTouch = function(d) {
		if (d.touches.length != 1) {
			return
		}
		clearTimeout(a._tapTime);
		if (a._touch == true && a._element && a._element != null) {
			d.preventDefault();
			a._div.style.cursor = "default";
			a._clearMotion();
			var e = d.changedTouches[0];
			var c = e.pageX - a._div.offsetLeft;
			var b = e.pageY - a._div.offsetTop;
			if (c < 0) {
				c = 0
			}
			if (b < 0) {
				b = 0
			}
			if (c >= a._width) {
				c = a._width
			}
			if (b >= a._height) {
				b = a._height
			}
			a._div.style.cursor = "pointer";
			a._element.drag(c, b);
			a._drawMotion(a._element);
			a._move = true
		}
	};
	this._suprElement = function(b) {
		if (b.keyCode != 46) {
			return
		}
		if (a._lastElement) {
			a.delElement(a._lastElement);
			a._lastElement = null;
			a.draw()
		}
	};
	this._tapHold = function(d) {
		var c = d.pageX - a._div.offsetLeft;
		var b = d.pageY - a._div.offsetTop;
		a._touch = false;
		a._hold = true;
		if (a._element != null) {
			a._element.showContextualMenu(c, b)
		}
		clearTimeout(a._tapTime)
	};
	this.stopEvents = function() {
		this._name.deselect();
		if (a._lastElement) {
			a._lastElement.deselect();
			a._lastElement = null
		}
	};
	this._stopEvent = function(b) {
		if (!b) {
			b = window.event
		}
		if (b.stopPropagation) {
			b.stopPropagation()
		} else {
			b.cancelBubble = true
		}
	};
	this._cancelEvent = function(b) {
		if (!b) {
			b = window.event
		}
		if (b.preventDefault) {
			b.preventDefault()
		} else {
			b.returnValue = false
		}
	}
};
Diagram.prototype.setVisibility = function(a) {
	this._visible = a;
	if (!a) {
		this.interaction(false)
	}
};
Diagram.prototype.isVisible = function() {
	return this._visible
};
Diagram.prototype.interaction = function(a) {
	if (a) {
		this._div.addEventListener("mousedown", this._selectElement, false);
		window.addEventListener("mousemove", this._dragElement, false);
		window.addEventListener("mouseup", this._dropElement, false);
		this._div.addEventListener("touchstart", this._selectByTouch, false);
		window.addEventListener("touchmove", this._moveByTouch, false);
		window.addEventListener("touchend", this._dropByTouch, false)
	} else {
		this.stopEvents();
		this._div.removeEventListener("mousedown", this._selectElement, false);
		window.removeEventListener("mousemove", this._dragElement, false);
		window.removeEventListener("mouseup", this._dropElement, false);
		this._div.removeEventListener("touchstart", this._selectByTouch, false);
		window.removeEventListener("touchmove", this._moveByTouch, false);
		window.removeEventListener("touchend", this._dropByTouch, false)
	}
};
Diagram.prototype._enumerateElements = function() {
	var b;
	var a = 0;
	var c = 0;
	for (b = 0; b < this._nodes.length; b++) {
		if (b > c) {
			c = b
		}
		this._nodes[b].setId(c);
		if (this._nodes[b] instanceof SuperNode) {
			for (a = c + 1; a < this._nodes[b]._nodeChilds.length + c + 1; a++) {
				this._nodes[b]._nodeChilds[a - c - 1].setId(a)
			}
			c = a
		} else {
			if (b != c) {
				c = c + 1
			}
		}
	}
	for (b = 0; b < this._relations.length; b++) {
		this._relations[b].setId(b)
	}
};
Diagram.prototype.getXML = function(c) {
	this._enumerateElements();
	this._sortNodesByArea();
	if (this._alone) {
		var c = (new DOMParser()).parseFromString("<" + this.getType() + "/>", "text/xml");
		var a = c.getElementsByTagName(this.getType())[0]
	} else {
		var a = c.createElement(this.getType())
	}
	a.setAttribute("name", this._name.getValue());
	if (this._backgroundNodes) {
		a.setAttribute("backgroundNodes", this._backgroundNodes)
	}
	var e;
	var b;
	for (b = this._nodes.length - 1; b >= 0; b--) {
		if (this._nodes[b].getParent() == null && this._nodes[b]._action == undefined) {
			a.appendChild(this._nodes[b].getElementXML(c))
		}
	}
	var d;
	for (b = 0; b < this._relations.length; b++) {
		if (!this._relations[b].getParent()) {
			a.appendChild(this._relations[b].getElementXML(c))
		}
	}
	return a
};
Diagram.prototype.getXMLString = function() {
	return (new XMLSerializer()).serializeToString(this.getXML())
};
Diagram.prototype.setXML = function(b) {
	var e = [];
	if (this._alone) {
		var a = b.getElementsByTagName(this.getType())[0];
		if (!a) {
			return false
		}
	} else {
		var a = b
	}
	this._name.setValue(a.getAttribute("name"));
	if (a.getAttribute("backgroundNodes")) {
		this._backgroundNodes = a.getAttribute("backgroundNodes")
	}
	var d = a.childNodes;
	var c;
	for (c = 0; c < d.length; c++) {
		this._instantiateElements(d[c], e)
	}
	for (c = 0; c < d.length; c++) {
		this._addElementXML(d[c], e)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
Diagram.prototype.setXMLString = function(b) {
	if (!b || !JSFun.isString(b)) {
		return false
	}
	b = b.replace(/\n/gi, "");
	var a = (new DOMParser()).parseFromString(b, "text/xml");
	if (a == null) {
		return null
	}
	return this.setXML(a)
};
Diagram.prototype._addElementXML = function(f, e, d) {
	var d = d || null;
	var g = e[f.getAttribute("id")];
	if (g) {
		if (d instanceof SuperNode && g instanceof Region) {
			g.addComponents(false)
		}
		g.setElementXML(f, e);
		if (d instanceof SuperNode && g instanceof Node) {
			g.setDiagram(this);
			if (g instanceof Region) {
				var b = g._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (g._parent._orientation) {
						b[a - 1].setWidth(g._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(g._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(g)
		}
		if (d && g instanceof Node) {
			d.addChild(g);
			if (g instanceof Swimlane) {
				g._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < f.childNodes.length; c++) {
			this._addElementXML(f.childNodes[c], e, g)
		}
	}
};
Diagram.prototype._instantiateElements = function(d, c, b) {
	b = b || null;
	var e = this._instantiateObjectFromString(d.nodeName, b);
	if (e) {
		c[d.getAttribute("id")] = e;
		var a;
		for (a = 0; a < d.childNodes.length; a++) {
			if (e instanceof SuperNode && d.childNodes[a].nodeName == "Region") {
				this._instantiateElements(d.childNodes[a], c, e)
			} else {
				this._instantiateElements(d.childNodes[a], c)
			}
		}
	}
};
Diagram.prototype.setValidElements = function(b) {
	this._validElements = [];
	var a;
	for (a in b) {
		if (JSFun.isString(b[a])) {
			this._validElements.push(b[a])
		}
	}
};
Diagram.prototype.getValidElements = function() {
	if (this._validElements) {
		return this._validElements
	}
};
Diagram.prototype._instantiateObjectFromString = function(elemName, parent) {
	if (JSFun.isString(elemName)) {
		parent = parent || null;
		var i;
		for (i in this._validElements) {
			if (elemName == this._validElements[i]) {
				if (elemName == "UMLAlternative" || elemName == "UMLHorizontalRegion" || elemName == "UMLVerticalRegion" || elemName == "UMLCompositeState") {
					var setElementXml = true;
					return eval("new " + this._validElements[i] + "({ setElementXml: " + setElementXml + "})")
				} else {
					if (parent) {
						return (new window[this._validElements[i]]({
							addComponent: false,
							parent: parent
						}))
					} else {
						return eval("new " + this._validElements[i] + "()")
					}
				}
			}
		}
	} else {
		return null
	}
};
Diagram.prototype.updateWidthCanvas = function() {
	if (!this._updateWidthCanvas) {
		return
	}
	var a;
	var b = 0;
	for (a = this._nodes.length - 1; a >= 0; a -= 1) {
		if ((this._nodes[a]._x + this._nodes[a]._width + 10) > b) {
			b = this._nodes[a]._x + this._nodes[a]._width + 10
		}
	}
	if (b > this._width) {
		this._div.style.width = b + "px";
		this._div.childNodes[0].width = b;
		this._div.childNodes[1].width = b;
		this._mainContext.canvas.width = b;
		this._motionContext.canvas.width = b;
		this._clearMotion();
		this._width = b
	} else {
		b = (b > this._minWidth) ? b : this._minWidth;
		this._div.style.width = b + "px";
		this._div.childNodes[0].width = b;
		this._div.childNodes[1].width = b;
		this._mainContext.canvas.width = b;
		this._motionContext.canvas.width = b;
		this._clearMotion();
		this._width = b
	}
};
Diagram.prototype.setUpdateWidthCanvas = function(a) {
	this._updateWidthCanvas = a
};
Diagram.prototype.getRelations = function() {
	return this._relations
};
var Dialog = function(a) {
	a = a || {};
	this._text = a.text || "";
	this._cancelable = a.cancelable || false;
	this._active = false
};
Dialog.prototype.show = function(d, g) {
	var g = g || null;
	if (this._active) {
		return
	}
	this._active = true;
	if (!(typeof this._text === "string")) {
		return false
	}
	that = this;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var e = document.createElement("input");
	e.setAttribute("type", "submit");
	e.setAttribute("value", "OK");
	var c;
	var k;
	k = document.createElement("div");
	k.appendChild(document.createTextNode(this._text));
	if (g) {
		var h = document.createElement("div");
		var b = document.createElement("form");
		var f;
		f = document.createElement("input");
		f.setAttribute("type", "text");
		f.setAttribute("value", g);
		h.appendChild(f);
		b.appendChild(h)
	}
	this.acceptText = function(l) {
		document.body.removeChild(a);
		(g) ? d(f.value): d();
		that._active = false
	};
	e.addEventListener("click", this.acceptText, false);
	b.onsubmit = function() {
		return false
	};
	b.appendChild(e);
	if (this._cancelable) {
		var j = document.createElement("input");
		j.setAttribute("type", "submit");
		j.setAttribute("value", "cancel");
		this.deleteDialog = function(l) {
			document.body.removeChild(a);
			that._active = false
		};
		j.addEventListener("click", this.deleteDialog, false);
		b.appendChild(j)
	}
	a.appendChild(k);
	a.appendChild(b);
	document.body.appendChild(a);
	e.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px";
	return true
};
var ElipseSymbol = function(a) {
	a = a || {};
	ElipseSymbol.baseConstructor.call(this, a);
	this.setWidth(15);
	this.setHeight(15)
};
JSFun.extend(ElipseSymbol, Component);
ElipseSymbol.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.strokeStyle = ComponentStyle.component_color;
	a.beginPath();
	a.translate(this.getPixelX() + this._getMargin() - 11.5, this.getPixelY() + this._getMargin());
	a.scale(11.5, 7);
	a.arc(1, 1, 1, 0, Math.PI * 2, true);
	a.restore();
	a.stroke();
	a.restore()
};
var Elliptical = function(a) {
	a = a || {};
	Elliptical.baseConstructor.call(this, a)
};
JSFun.extend(Elliptical, Node);
Elliptical.prototype.isOver = function(a, f) {
	if (a instanceof Point) {
		f = a.getY();
		a = a.getX()
	}
	var d = this.getWidth() / 2;
	var e = this.getHeight() / 2;
	var c = Math.abs(a - this.getX() - d);
	var b = Math.abs(f - this.getY() - e);
	if (c <= d) {
		if (Math.abs(Math.sqrt((1 - (c * c) / (d * d)) * e * e)) >= b) {
			return true
		}
	}
};
Elliptical.prototype.getParticularWidth = function(j) {
	if (j >= this.getY() && j <= this.getY() + this.getHeight()) {
		var f = this.getWidth() / 2;
		var e = this.getHeight() / 2;
		var h = this.getY() + e - j;
		var d = this.getX() + f;
		var g = f * Math.sqrt(1 - (h * h) / (e * e));
		var c = 1 - (j * j) / (e * e);
		return [d - g, 2 * g]
	}
	return [0, 0]
};
Elliptical.prototype.getLinkCentered = function(d, h) {
	if (d instanceof Point) {
		h = d.getY();
		d = d.getX()
	}
	var e = this.getWidth() / 2;
	var c = this.getHeight() / 2;
	var g = this.getX() + e;
	var f = this.getY() + c;
	return JSGraphic.ellipseIntersection(g, f, e, c, d, h)
};
Elliptical.prototype.calculateSize = function() {
	var a;
	var d = 0;
	var c = 0;
	var b;
	var e = false;
	for (b = 0; b < this._components.length; b++) {
		a = this._components[b];
		if (a._visible) {
			if (a.getPosition() == Component.Float) {
				c += a.getHeight();
				if (a.getWidth() > d) {
					d = a.getWidth()
				}
			}
		} else {
			if (!a._visible) {
				e = true
			}
		}
	}
	if (c == 0 && e == true) {
		c = 20
	}
	if (d == 0 && e == true) {
		d = 20
	}
	if (c > 0) {
		this.setMinHeight(c * 1.447716)
	}
	if (d > 0) {
		this.setMinWidth(d * 1.447716)
	}
};
Elliptical.prototype.updateComponents = function() {
	if (this._components.length > 0) {
		this.calculateSize();
		var h = this.getX();
		var g = this.getY();
		var e = this.getWidth() / 2;
		var d = this.getHeight() / 2;
		var c = h + e;
		var k = g + d;
		var j = JSGraphic.ellipseIntersection(c, k, e, d, h, g);
		this.insertComponents(j.getX(), j.getY(), this.getWidth() - 2 * (j.getX() - this.getX()), this.getHeight() - 2 * (j.getY() - this.getHeight()));
		var f;
		for (f in this._relations) {
			this._relations[f].notifyChange()
		}
	}
};
var TextArea = function(a) {
	a = a || {};
	TextArea.baseConstructor.call(this, a);
	this.setText(a.text || "");
	this._active = false;
	this.setFontColor(a.text_color || "#000000");
	this.setFontSize(a.font_size || "12");
	this._font_width = this.getFontSize() / 1.5;
	this.line_height = parseInt(this.getFontSize()) + 1;
	this.setFontFamily(a.text_family || "monospace");
	this.setFontStyle(a.font_style || "normal");
	this.setFontWeight(a.font_weight || "normal")
};
JSFun.extend(TextArea, Component);
TextArea.prototype.showDialog = function() {
	var c = this;
	this._active = true;
	var f = document.createElement("div");
	var b = document.createElement("form");
	var e = document.createElement("textarea");
	var a = document.createElement("input");
	var d = document.createElement("input");
	f.className = "ud_popup";
	e.setAttribute("rows", 5);
	e.setAttribute("cols", 30);
	e.value = this._text.join("\n");
	a.setAttribute("type", "submit");
	a.setAttribute("value", "OK");
	d.setAttribute("type", "submit");
	d.setAttribute("value", "Cancel");
	this.changeText = function(g) {
		if (c._active) {
			c.setText(e.value);
			document.body.removeChild(f);
			c._active = false;
			c.notifyChange()
		}
	};
	this.closeDialog = function(g) {
		if (c._active) {
			document.body.removeChild(f);
			c._active = false;
			c.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	a.addEventListener("click", this.changeText, false);
	d.addEventListener("click", this.closeDialog, false);
	b.appendChild(e);
	b.appendChild(a);
	b.appendChild(d);
	f.appendChild(b);
	document.body.appendChild(f);
	e.focus();
	f.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	f.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
TextArea.prototype.setText = function(d) {
	if (JSFun.isString(d)) {
		var b, c = 0;
		var a = d.split("\n");
		for (b = 0; b < a.length; b++) {
			if (a[b].length > c) {
				c = a[b].length
			}
		}
		this._text = a;
		if (d == "") {
			this.setWidth(40)
		} else {
			this.setWidth(c * this._font_width)
		}
		this.setHeight(this._text.length * this._line_height)
	}
};
TextArea.prototype.setValue = function(a) {
	a = a.replace(/;/gi, "\n");
	this.setText(a)
};
TextArea.prototype.getValue = function() {
	return this._text.join(";")
};
TextArea.prototype.select = function(b, d, a) {
	var c = a || 0;
	if (!this._active && this.isOver(b, d, c)) {
		this.showDialog(b, d);
		return true
	} else {
		return false
	}
};
TextArea.prototype.draw = function(d) {
	if (!this._visible) {
		return
	}
	d.save();
	if (this._active) {
		d.fillStyle = "#ffc485";
		d.fillRect(this._getX(), this._getY(), this.getWidth(), this.getHeight())
	}
	d.font = this.getFontStyle() + " " + this.getFontWeight() + " " + this.getFontSize() + "px " + this.getFontFamily();
	d.textBaseline = "middle";
	d.fillStyle = this.getFontColor();
	if (this.getUnderlineText() && this.getUnderlineText() == true) {
		this.underline(d)
	}
	var a = this._getMX();
	var f = this._getMY() + this._line_height / 2;
	var b = this.getWidth() - 2 * this._getMargin();
	var e = 0;
	var c;
	for (c = 0; c < this._text.length; c++) {
		e = a + b / 2 - (this._text[c].length * this._font_width) / 2;
		d.fillText(this._text[c], e, f);
		f += this._line_height
	}
	d.restore()
};
TextArea.prototype.drawShape = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.strokeStyle = "#aaaaaa";
	a.strokeRect(this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight());
	a.restore()
};
TextArea.prototype.deselect = function() {
	if (this._active) {
		this.closeDialog();
		this._active = false
	}
};
TextArea.prototype.setFontSize = function(a) {
	this._font_size = a;
	this.resize()
};
TextArea.prototype.getFontSize = function() {
	return this._font_size
};
TextArea.prototype.setFontColor = function(a) {
	this._font_color = a
};
TextArea.prototype.getFontColor = function() {
	return this._font_color
};
TextArea.prototype.setFontFamily = function(a) {
	this._font_family = a
};
TextArea.prototype.getFontFamily = function() {
	return this._font_family
};
TextArea.prototype.resize = function() {
	this._line_height = parseInt(this.getFontSize(), 10) + 1;
	this._font_width = this.getFontSize() / 1.5;
	var b, c = 0;
	var a = this.getValue().split("\n") || "";
	for (b = 0; b < a.length; b++) {
		if (a[b].length > c) {
			c = a[b].length
		}
	}
	if (a == "") {
		this.setWidth(40)
	} else {
		this.setWidth(c * this._font_width)
	}
	this.setHeight(a.length * this._line_height)
};
TextArea.prototype.setFontStyle = function(a) {
	this._font_style = a
};
TextArea.prototype.getFontStyle = function() {
	return this._font_style
};
TextArea.prototype.setFontWeight = function(a) {
	this._font_weight = a
};
TextArea.prototype.getFontWeight = function() {
	return this._font_weight
};
TextArea.prototype.getComponentXML = function(b) {
	var a = b.createElement("item");
	if (this._id) {
		a.setAttribute("id", this._id)
	}
	if (this.getFontColor() != "#000000") {
		a.setAttribute("fontColor", this.getFontColor())
	}
	if (this.getFontSize() != "12") {
		a.setAttribute("fontSize", this.getFontSize())
	}
	if (this.getFontStyle() != "normal") {
		a.setAttribute("fontStyle", this.getFontStyle())
	}
	if (this.getFontFamily() != "monospace") {
		a.setAttribute("fontFamily", this.getFontFamily())
	}
	if (this.getFontWeight() != "normal") {
		a.setAttribute("fontWeight", this.getFontWeight())
	}
	a.setAttribute("value", this.getValue());
	return a
};
TextArea.prototype.underline = function(a) {
	if (!this._text) {
		return
	}
	var b = a.measureText(this._text).width;
	a.strokeStyle = this.getFontColor();
	a.lineWidth = 1;
	a.beginPath();
	a.moveTo(this._getMX(), this._getMY() + (this.getFontSize() - 1));
	a.lineTo(this._getMX() + b, this._getMY() + (this.getFontSize() - 1));
	a.stroke()
};
var GuardItem = function(a) {
	a = a || {};
	GuardItem.baseConstructor.call(this, a);
	this._parse = /^(?:\[([^\[\]\;]*)\])?$/;
	this.setMinWidth(15)
};
JSFun.extend(GuardItem, TextArea);
GuardItem.prototype.encode = function(b) {
	var a = "[]";
	if (b) {
		a = "[" + b + "]"
	}
	if (this._parse.exec(a)) {
		return a
	} else {
		return "wrong_operation"
	}
};
GuardItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
GuardItem.prototype.showDialog = function() {
	var c = this;
	if (this.active) {
		return
	}
	this._active = true;
	var f = document.createElement("div");
	f.className = "ud_popup";
	var b = document.createElement("form");
	var e = document.createElement("textarea");
	e.setAttribute("rows", 5);
	e.setAttribute("cols", 30);
	var a = document.createElement("input");
	a.setAttribute("type", "submit");
	a.setAttribute("value", "OK");
	var d = document.createElement("input");
	d.setAttribute("type", "submit");
	d.setAttribute("value", "No");
	e.value = this.decode(this._text.join("\n"));
	this.changeText = function(g) {
		if (c._active) {
			c.setText(c.encode(e.value));
			document.body.removeChild(f);
			c._active = false;
			c.notifyChange()
		}
	};
	this.closeDialog = function(g) {
		if (c._active) {
			document.body.removeChild(f);
			c._active = false;
			c.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	a.addEventListener("click", this.changeText, false);
	d.addEventListener("click", this.closeDialog, false);
	b.appendChild(e);
	b.appendChild(a);
	b.appendChild(d);
	f.appendChild(b);
	document.body.appendChild(f);
	e.focus();
	f.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	f.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
GuardItem.prototype.draw = function(d) {
	if (!this._visible) {
		return
	}
	d.save();
	if (this._active) {
		d.fillStyle = "#ffc485";
		d.fillRect(this._getX(), this._getY(), this.getWidth(), this.getHeight())
	}
	d.font = this.getFontStyle() + " " + this.getFontWeight() + " " + this.getFontSize() + "px " + this.getFontFamily();
	d.textBaseline = "middle";
	d.fillStyle = this.getFontColor();
	var a = this._getMX();
	var e = this._getMY() + this._line_height / 2;
	var b = this.getWidth() - 2 * this._getMargin();
	var c;
	for (c = 0; c < this._text.length; c++) {
		d.fillText(this._text[c], a, e);
		e += this._line_height
	}
	d.restore()
};
var InstanceItem = function(b) {
	b = b || {};
	InstanceItem.baseConstructor.call(this, b);
	var a = "^([^:=]+)?(?:: ([^=:]+))?(?:= ([^=:]+))?$";
	this._parse = new RegExp(a)
};
JSFun.extend(InstanceItem, TextBox);
InstanceItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += a[0]
	}
	if (a[1]) {
		b += ": " + a[1]
	}
	if (a[2]) {
		b += "= " + a[2]
	}
	if (this._parse.exec(b)) {
		this._underlineText = "";
		if (a[0]) {
			this._underlineText += a[0]
		}
		if (a[1]) {
			this._underlineText += ": " + a[1]
		}
		return b
	} else {
		return "wrong_instance"
	}
};
InstanceItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
InstanceItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var f = this;
	this.active = true;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var e = [];
	var c;
	for (c = 0; c < 3; c++) {
		e.push(document.createElement("input"))
	}
	var g = document.createElement("input");
	g.setAttribute("type", "submit");
	g.setAttribute("value", "OK");
	var j = this.decode(this.getValue());
	for (c = 0; c < e.length; c++) {
		e[c].setAttribute("type", "text");
		e[c].setAttribute("value", j[c] || "")
	}
	this.changeText = function(o) {
		if (f.active) {
			var m = [];
			var n;
			for (n = 0; n < e.length; n++) {
				m.push(e[n].value)
			}
			f.setText(f.encode(m));
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	this.closeDialog = function(m) {
		if (f.active) {
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	g.addEventListener("click", this.changeText, false);
	var d = ["name", "classifier", "value"];
	var h;
	var l;
	for (c = 0; c < e.length; c++) {
		l = document.createElement("div");
		h = document.createElement("label");
		h.appendChild(document.createTextNode(d[c]));
		l.appendChild(h);
		l.appendChild(e[c]);
		b.appendChild(l)
	}
	b.appendChild(g);
	if (this.deletable) {
		var k = document.createElement("input");
		k.setAttribute("type", "submit");
		k.setAttribute("value", "delete");
		this.deleteDialog = function(m) {
			if (f.active) {
				document.body.removeChild(a);
				f.active = false;
				f.notifyDelete();
				f.notifyChange()
			}
		};
		k.addEventListener("click", this.deleteDialog, false);
		b.appendChild(k)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	g.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
InstanceItem.prototype.underline = function(a) {
	var c = this._underlineText;
	a.font = this.getFontSize() + "px " + this.getFontFamily();
	var b = a.measureText(c).width;
	a.strokeStyle = this.getFontColor();
	a.lineWidth = 1;
	a.moveTo(this._getMX(), this._getMY() + (this.getFontSize() - 1));
	a.lineTo(this._getMX() + b, this._getMY() + (this.getFontSize() - 1));
	a.stroke()
};
InstanceItem.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	if (this._underlineText) {
		this.underline(a)
	}
	InstanceItem.base.draw.call(this, a)
};
InstanceItem.prototype.setValue = function(a) {
	InstanceItem.base.setValue.call(this, a);
	this.encode(a)
};
var Tab = function(a) {
	a = a || {};
	Tab.baseConstructor.call(this, a)
};
JSFun.extend(Tab, TextBox);
Tab.prototype.draw = function(b) {
	if (!this._visible) {
		return
	}
	Tab.base.draw.call(this, b);
	var a = this.getPixelX();
	var c = this.getPixelY();
	b.beginPath();
	b.moveTo(a, c + this.getHeight());
	b.lineTo(a + this.getWidth() - 4, c + this.getHeight());
	b.lineTo(a + this.getWidth(), c);
	b.stroke()
};
var LoopItem = function(a) {
	a = a || {};
	LoopItem.baseConstructor.call(this, a);
	this._parse = /^LOOP(?:[\(]?([0-9 ]*)[\,]?)(?:([0-9 ]*)[\)]?)?$/
};
JSFun.extend(LoopItem, Tab);
LoopItem.prototype.encode = function(a) {
	var b = "LOOP";
	if (a[0]) {
		b += "(" + a[0]
	}
	if (a[1]) {
		if (!a[0]) {
			b += "(" + 0
		}
		b += "," + a[1] + ")"
	} else {
		if (a[0]) {
			b += ")"
		}
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_operation"
	}
};
LoopItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
LoopItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var f = this;
	this.active = true;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var e = [];
	var c;
	for (c = 0; c < 2; c++) {
		e.push(document.createElement("input"))
	}
	var g = document.createElement("input");
	g.setAttribute("type", "submit");
	g.setAttribute("value", "OK");
	var j = this.decode(this.getValue());
	for (c = 0; c < e.length; c++) {
		e[c].setAttribute("type", "text");
		e[c].setAttribute("value", j[c] || "")
	}
	this.changeText = function(o) {
		if (f.active) {
			var m = [];
			var n;
			for (n = 0; n < e.length; n++) {
				m.push(e[n].value)
			}
			f.setText(f.encode(m));
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	g.addEventListener("click", this.changeText, false);
	var d = ["initial value", "end value"];
	var h;
	var l;
	for (c = 0; c < e.length; c++) {
		l = document.createElement("div");
		h = document.createElement("label");
		h.appendChild(document.createTextNode(d[c]));
		l.appendChild(h);
		l.appendChild(e[c]);
		b.appendChild(l)
	}
	b.appendChild(g);
	if (this.deletable) {
		var k = document.createElement("input");
		k.setAttribute("type", "submit");
		k.setAttribute("value", "delete");
		this.deleteDialog = function(m) {
			if (f.active) {
				document.body.removeChild(a);
				f.active = false;
				f.notifyDelete();
				f.notifyChange()
			}
		};
		k.addEventListener("click", this.deleteDialog, false);
		b.appendChild(k)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	g.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
var ObjectItem = function(a) {
	a = a || {};
	ObjectItem.baseConstructor.call(this, a);
	this._parse = /^([a-zA-Z]*)(?:\:([^\:\{\}]*))?(?:\{([a-zA-Z]*)\})?$/
};
JSFun.extend(ObjectItem, TextBox);
ObjectItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += a[0]
	}
	if (a[1]) {
		b += ":" + a[1]
	}
	if (a[2]) {
		b += "{" + a[2] + "}"
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_operation"
	}
};
ObjectItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
ObjectItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var f = this;
	this.active = true;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var e = [];
	var c;
	for (c = 0; c < 3; c++) {
		e.push(document.createElement("input"))
	}
	var g = document.createElement("input");
	g.setAttribute("type", "submit");
	g.setAttribute("value", "ok");
	var j = this.decode(this.getValue());
	for (c = 0; c < e.length; c++) {
		e[c].setAttribute("type", "text");
		e[c].setAttribute("value", j[c] || "")
	}
	this.changeText = function(o) {
		if (f.active) {
			var m = [];
			var n;
			for (n = 0; n < e.length; n++) {
				m.push(e[n].value)
			}
			f.setText(f.encode(m));
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	this.closeDialog = function(m) {
		if (f.active) {
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	g.addEventListener("click", this.changeText, false);
	var d = ["name", "class", "state"];
	var h;
	var l;
	for (c = 0; c < e.length; c++) {
		l = document.createElement("div");
		h = document.createElement("label");
		h.appendChild(document.createTextNode(d[c]));
		l.appendChild(h);
		l.appendChild(e[c]);
		b.appendChild(l)
	}
	b.appendChild(g);
	if (this.deletable) {
		var k = document.createElement("input");
		k.setAttribute("type", "submit");
		k.setAttribute("value", "delete");
		this.deleteDialog = function(m) {
			if (f.active) {
				document.body.removeChild(a);
				f.active = false;
				f.notifyDelete();
				f.notifyChange()
			}
		};
		k.addEventListener("click", this.deleteDialog, false);
		b.appendChild(k)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	g.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
var OperationItem = function(a) {
	a = a || {};
	OperationItem.baseConstructor.call(this, a);
	this._parse = /^([-|#|+|~])?([^:()]+)(?:\(([^()]+)?\))(?::([^:()]+))?$/;
	this.setMinWidth(100)
};
JSFun.extend(OperationItem, TextBox);
OperationItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += a[0]
	}
	if (a[1]) {
		b += a[1]
	}
	if (a[2]) {
		b += "(" + a[2] + ")"
	} else {
		b += "()"
	}
	if (a[3]) {
		b += ":" + a[3]
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_operation"
	}
};
OperationItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
OperationItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var g = this;
	this.active = true;
	var a = document.createElement("div");
	var b = document.createElement("form");
	var f = [];
	var d;
	for (d = 0; d < 4; d++) {
		f.push(document.createElement("input"))
	}
	f[0] = document.createElement("select");
	var c = document.createElement("option");
	c.value = "";
	c.appendChild(document.createTextNode("(none)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "+";
	c.appendChild(document.createTextNode("+ (public)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "-";
	c.appendChild(document.createTextNode("- (private)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "#";
	c.appendChild(document.createTextNode("# (protected)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "~";
	c.appendChild(document.createTextNode("~ (package)"));
	f[0].appendChild(c);
	var j = document.createElement("input");
	a.className = "ud_popup";
	var l = this.decode(this.getValue());
	for (d = 0; d < f.length; d++) {
		f[d].type = "text";
		f[d].value = l[d] || ""
	}
	if (l[0]) {
		var h = f[0].childNodes;
		for (d in h) {
			if (h[d].value == l[0]) {
				h[d].selected = "selected"
			}
		}
	}
	j.setAttribute("type", "submit");
	j.setAttribute("value", "OK");
	this.changeText = function(q) {
		if (g.active) {
			var o = [];
			var p;
			for (p = 0; p < f.length; p++) {
				o.push(f[p].value)
			}
			g.setText(g.encode(o));
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	this.closeDialog = function(o) {
		if (g.active) {
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	j.addEventListener("click", this.changeText, false);
	var e = ["visibility", "name", "parameters", "return"];
	var k;
	var n;
	for (d = 0; d < f.length; d++) {
		n = document.createElement("div");
		k = document.createElement("label");
		k.appendChild(document.createTextNode(e[d]));
		n.appendChild(k);
		n.appendChild(f[d]);
		b.appendChild(n)
	}
	b.appendChild(j);
	if (this.deletable) {
		var m = document.createElement("input");
		m.setAttribute("type", "submit");
		m.setAttribute("value", "delete");
		this.deleteDialog = function(o) {
			if (g.active) {
				document.body.removeChild(a);
				g.active = false;
				g.notifyDelete();
				g.notifyChange()
			}
		};
		m.addEventListener("click", this.deleteDialog, false);
		b.appendChild(m)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
OperationItem.prototype.select = function(a, b) {
	if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 20)) <= 5 && Math.abs(b - (this.getPixelY() + 8.66)) <= 5) {
		this.notifyToUp();
		this.notifyChange();
		return true
	} else {
		if (Math.abs(a - (this.getPixelX() + this.getSuperWidth() - 30)) <= 5 && Math.abs(b - (this.getPixelY() + 7.33)) <= 5) {
			this.notifyToDown();
			this.notifyChange();
			return true
		}
	}
	return OperationItem.base.select.call(this, a, b)
};
OperationItem.prototype.drawShape = function(b) {
	if (!this._visible) {
		return
	}
	var a = this.getPixelX() + this.getSuperWidth() - 35;
	var c = this.getPixelY() + 3;
	b.save();
	b.fillStyle = "#0000aa";
	b.beginPath();
	b.moveTo(a, c);
	b.lineTo(a + 10, c);
	b.lineTo(a + 5, c + 7);
	b.closePath();
	b.fill();
	a = a + 10;
	b.beginPath();
	b.moveTo(a + 5, c);
	b.lineTo(a, c + 7);
	b.lineTo(a + 10, c + 7);
	b.closePath();
	b.fill();
	b.restore()
};
var OperationFields = function(a) {
	a = a || {};
	OperationFields.baseConstructor.call(this, a)
};
JSFun.extend(OperationFields, CollapsibleFields);
OperationFields.prototype.newItem = function() {
	return new OperationItem({
		text: "new_operation()"
	})
};
var Rectangular = function(a) {
	a = a || {};
	Rectangular.baseConstructor.call(this, a)
};
JSFun.extend(Rectangular, Node);
Rectangular.prototype.setElementXML = function(a) {
	Rectangular.base.setElementXML.call(this, a)
};
var Separator = function(a) {
	a = a || {};
	Separator.baseConstructor.call(this, a);
	this._setPosition(Component.Static);
	if (this._orientation) {
		this.setWidth(a.width || 1)
	} else {
		this.setHeight(a.height || 1)
	}
};
JSFun.extend(Separator, Component);
Separator.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	a.lineWidth = (this._orientation) ? (this._width - 2 * this._margin) : (this._height - 2 * this._margin);
	a.strokeStyle = ComponentStyle.component_color;
	a.beginPath();
	if (this._orientation) {
		a.moveTo(this.getPixelX(), this.getPixelY());
		a.lineTo(this.getPixelX(), this.getPixelY() + this.getHeight())
	} else {
		a.moveTo(this.getPixelX(), this.getPixelY());
		a.lineTo(this.getPixelX() + this.getWidth(), this.getPixelY())
	}
	a.stroke();
	a.restore()
};
var RegionLine = function(a) {
	a = a || {};
	RegionLine.baseConstructor.call(this, a);
	this._setPosition(a.position || Component.BottomLeft);
	if (a.orientation) {
		this.setHeight(a.height || 100);
		this.setWidth(a.width || 1)
	} else {
		this.setHeight(a.height || 1);
		this.setWidth(a.width || 100)
	}
};
JSFun.extend(RegionLine, Component);
RegionLine.prototype.select = function(b, g) {
	var e = this._getX();
	var d = this._getY();
	var a = -1;
	var c = -1;
	if (!this.selected && this.isOver(b, g)) {
		var f = this;
		this._selectComponent = function(k) {
			f.getParent()._diagram.interaction(false);
			var h = f.getParent().getParent();
			if (h._orientation) {
				for (var j = 0; j < h._nodeChilds.length; j++) {
					if (h._nodeChilds[j].getX() < f.getParent().getX()) {
						c = j
					}
					if (h._nodeChilds[j].getX() > f._getX()) {
						if (a == -1) {
							a = j
						}
					}
				}
			} else {
				for (var j = 0; j < h._nodeChilds.length; j++) {
					if (h._nodeChilds[j].getY() < f.getParent().getY()) {
						c = j
					}
					if (h._nodeChilds[j].getY() > f._getY()) {
						if (a == -1) {
							a = j
						}
					}
				}
			}
		};
		this._dragComponent = function(h) {
			if (!(h.button == 0 && f.getParent()._diagram._pressMouse)) {
				return
			}
			var p = h.pageX - f.getParent()._diagram._div.offsetLeft;
			var o = h.pageY - f.getParent()._diagram._div.offsetTop;
			if (p < 0) {
				p = 0
			}
			if (o < 0) {
				o = 0
			}
			if (p >= f.getParent()._diagram._width) {
				p = f.getParent()._diagram._width
			}
			if (o >= f.getParent()._diagram._height) {
				o = f.getParent()._diagram._height
			}
			f.getParent()._diagram._div.style.cursor = "pointer";
			var n = p - f.getParent()._relx;
			var m = o - f.getParent()._rely;
			var j = f.getParent().getParent();
			if (j._orientation) {
				var l = f.getParent()._diagram._width;
				var r = f.getParent()._x + f.getParent()._minWidth;
				if ((p > r) && (p < l)) {
					f._x = p
				}
			} else {
				var q = f.getParent()._diagram._height;
				var k = f.getParent()._y + f.getParent()._minHeight;
				if ((o > k) && (o < q)) {
					f._y = o
				}
			}
			f.getParent()._diagram._drawMotion(f)
		};
		this._dropComponent = function(h) {
			if (!(h.button == 0 && f.getParent()._diagram._pressMouse)) {
				return
			}
			var m = f._getX() - e;
			var j = f._getY() - d;
			if (f.getParent().getParent()._orientation) {
				var o = f.getParent().getParent()._nodeChilds[a];
				f._x = f._x - m;
				if (m > 0) {
					f.getParent().setWidth(f.getParent().getWidth() + m)
				} else {
					var k = f.getParent();
					var q = f.getParent().getWidth() + m;
					f.getParent().setWidth(f.getParent().getWidth() + m);
					if (a != -1) {
						o._x = o._x + m;
						o.setWidth(o.getWidth() - m)
					}
				}
			} else {
				var o = f.getParent().getParent()._nodeChilds[a];
				f._y = f._y - j;
				if (j > 0) {
					f.getParent().setHeight(f.getParent().getHeight() + j)
				} else {
					var k = f.getParent();
					var p = f.getParent().getHeight() + j;
					f.getParent().setHeight(f.getParent().getHeight() + j);
					if (a != -1) {
						o._y = o._y + j;
						o.setHeight(o.getHeight() - j)
					}
				}
			}
			f.getParent()._diagram._div.style.cursor = "default";
			f.getParent()._diagram._clearMotion();
			f.getParent()._resizing = false;
			f.getParent()._selected = true;
			f.getParent().getParent()._selected = true;
			var n = false;
			var l = true;
			var r = true;
			f.getParent().getParent().notifyChange(l, n, r);
			f.getParent()._diagram.draw();
			window.removeEventListener("mousedown", f._selectComponent, false);
			window.removeEventListener("mousemove", f._dragComponent, false);
			window.removeEventListener("mouseup", f._dropComponent, false);
			f.getParent()._diagram.interaction(true);
			f.getParent()._diagram._lastElement = f.getParent()._diagram._element;
			f.getParent()._diagram._element = null;
			a = -1;
			c = -1;
			f.getParent()._diagram._pressMouse = false
		};
		window.addEventListener("mousedown", this._selectComponent, false);
		window.addEventListener("mousemove", this._dragComponent, false);
		window.addEventListener("mouseup", this._dropComponent, false);
		return true
	} else {
		return false
	}
};
RegionLine.prototype.isOver = function(a, b) {
	if (this._visible && a >= this._x - 5 && a <= this._x + this._width + 5 && b >= this._y - 5 && b <= this._y + this._height + 5) {
		return true
	} else {
		return false
	}
};
RegionLine.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	if (this._parent.getParent()._orientation) {
		JSGraphic.dashedLine(a, this.getPixelX(), this.getPixelY(), this.getPixelX(), this.getPixelY() + this.getHeight(), 10)
	} else {
		JSGraphic.dashedLine(a, this.getPixelX(), this.getPixelY(), this.getPixelX() + this.getWidth(), this.getPixelY(), 10)
	}
};
RegionLine.prototype.drawShape = function(c) {
	if (!this._visible) {
		return
	}
	c.save();
	c.strokeStyle = "#aaaaaa";
	if (this._parent.getParent()._orientation) {
		c.strokeRect(this.getPixelX() - 2, this.getPixelY(), this.getWidth() + 4, this.getHeight())
	} else {
		c.strokeRect(this.getPixelX(), this.getPixelY() - 4, this.getWidth(), this.getHeight() + 6)
	}
	c.restore();
	c.save();
	c.fillStyle = "#ff0000";
	c.beginPath();
	if (this._parent.getParent()._orientation) {
		c.arc(this._parent.getX() + this._parent.getWidth() - 7, this._parent.getY() + 7, 4, 0, Math.PI * 2, true)
	} else {
		c.arc(this._parent.getX() + 7, this._parent.getY() + this._parent.getHeight() - 7, 4, 0, Math.PI * 2, true)
	}
	c.closePath();
	c.fill();
	c.restore();
	var a = this._parent.getParent()._nodeChilds;
	for (var b = 0; b < a.length; b++) {
		if (a[b] == this._parent) {
			break
		}
	}
	c.save();
	c.fillStyle = "#ff0000";
	c.beginPath();
	if (this._parent.getParent()._orientation) {
		c.arc(a[b + 1].getX() + a[b + 1].getWidth() - 7, a[b + 1].getY() + 7, 4, 0, Math.PI * 2, true)
	} else {
		c.arc(a[b + 1].getX() + 7, a[b + 1].getY() + a[b + 1].getHeight() - 7, 4, 0, Math.PI * 2, true)
	}
	c.closePath();
	c.fill();
	c.restore()
};
var SuperNode = function(a) {
	a = a || {};
	SuperNode.baseConstructor.call(this, a);
	this._orientation = a.orientation || 0;
	this._includeComponentByRegion = (a.includeComponentByRegion == false) ? false : true;
	this.setContainer()
};
JSFun.extend(SuperNode, Node);
SuperNode.prototype.addRegion = function(a) {
	if (a instanceof Node) {
		a.setContainer();
		this.addChild(a);
		this.notifyChange(true)
	}
};
SuperNode.prototype.deleteRegion = function(d) {
	var c;
	var b;
	if (this._orientation) {
		var e = d.getWidth()
	} else {
		var e = d.getHeight()
	}
	for (c = 0; c < this._nodeChilds.length; c++) {
		if (this._nodeChilds[c] == d) {
			break
		}
	}
	d.remove();
	var a = c;
	if (a == (this._nodeChilds.length)) {
		if (this._nodeChilds[a - 1]._components[2]) {
			this._nodeChilds[a - 1]._components[2].notifyDelete()
		}
	}
	if (this._orientation) {
		this._minWidth = this.getWidth() - e;
		this.setWidth(this.getWidth() - e)
	} else {
		this._minHeight = this.getHeight() - e;
		this.setHeight(this.getHeight() - e)
	}
	this.notifyChange(true);
	this.notifyDraw()
};
SuperNode.prototype.notifyChange = function(f, c, e) {
	f = f || false;
	c = c || false;
	e = e || false;
	this._resizing = true;
	this.updateRegions(c, e);
	if (this._container) {
		var d;
		if (f) {
			var b = this._nodeChilds;
			for (d = 0; d < b.length; d++) {
				if (b.length - 1 != d) {
					b[d].updateContainer(false)
				} else {
					b[d].updateContainer()
				}
			}
		} else {
			this.updateContainer()
		}
		if (this._parent) {
			var a = this._parent.getParent();
			while (a) {
				if (a instanceof SuperNode) {
					a.notifyChange(true);
					a = null
				} else {
					a = a._parent
				}
			}
		}
	} else {
		this.updateComponents();
		if (this._parent) {
			this._parent.updateContainer()
		}
	}
	this.updateRegions(c, e);
	for (var d = 0; d < this._nodeChilds.length; d++) {
		this._nodeChilds[d].setDiagram(this._diagram)
	}
	this._resizing = false
};
SuperNode.prototype.updateContainer = function(d) {
	if (!(d == false || d == true)) {
		d = true
	}
	if (this._container) {
		var h;
		var e = this._x;
		var c = this._y;
		var b = this._x;
		var a = this._y;
		var g;
		var m, l, j, f;
		var k = this._nodeChilds.length;
		for (h = 0; h < k; h++) {
			g = this._nodeChilds[h];
			if (g._visible) {
				if (this._orientation) {
					j = g._x;
					elemLeftY = g._y;
					if (h == (k - 1)) {
						m = g._x + g._minWidth
					} else {
						m = g._x + g._width
					}
					l = g._y + g._minHeight
				} else {
					j = g._x;
					elemLeftY = g._y;
					m = g._x + g._minWidth;
					if (h == (k - 1)) {
						l = g._y + g._minHeight
					} else {
						l = g._y + g._height
					}
					m = g._x + g._minWidth
				}
				if (m > b) {
					b = m
				}
				if (l > a) {
					a = l
				}
				if (j < e) {
					e = j
				}
				if (elemLeftY < c) {
					c = elemLeftY
				}
			}
		}
		if (e < this._x || c < this._y) {
			this.setWidth(this._x - e + this._width);
			this.setHeight(this._y - c + this._height);
			this._x = e;
			this._y = c;
			this.setMinWidth(b - e);
			this.setMinHeight(a - c)
		} else {
			this.setMinWidth(b - this._x);
			this.setMinHeight(a - this._y)
		}
		this._prex = this._x;
		this._prey = this._y;
		this.updateComponents();
		if (this._parent && d) {
			this._parent.updateContainer()
		}
	}
};
SuperNode.prototype.updateRegions = function(b, h) {
	b = b || false;
	h = h || false;
	var e = this._nodeChilds.length;
	if (this._orientation) {
		var a = 0;
		var g = this.getX();
		for (var c = 0; c < e; c++) {
			var m = this._nodeChilds[c];
			m.setMinHeight(this._minHeight - this._components[0].getHeight() - this._components[1].getHeight());
			m.setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight());
			if (m._components[2] instanceof RegionLine) {
				m._components[2].setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight())
			}
		}
		for (c = 0; c < e; c++) {
			this._nodeChilds[c]._x = g;
			this._nodeChilds[c]._y = this.getY() + this._components[0].getHeight() + this._components[1].getHeight();
			if (c == e - 1) {
				if (b || (g + this._nodeChilds[c]._width) < (this.getWidth() + this.getX())) {
					this._nodeChilds[c].setWidth(this.getWidth() + this.getX() - g)
				} else {
					this.setWidth(g + this._nodeChilds[c]._width - this.getX())
				}
			}
			g += this._nodeChilds[c].getWidth()
		}
		for (c = 0; c < e; c++) {
			var l = this._nodeChilds[c]._x - this._nodeChilds[c]._prex;
			if (l > 0 || (l < 0 && !h)) {
				for (var d = 0; d < this._nodeChilds[c]._nodeChilds.length; d++) {
					this._nodeChilds[c]._nodeChilds[d].updatePosition(l, 0, true)
				}
			}
			this._nodeChilds[c].resetMovement()
		}
	} else {
		var k = 0;
		var f = this.getY() + this._components[0].getHeight() + this._components[1].getHeight();
		for (var c = 0; c < e; c++) {
			var m = this._nodeChilds[c];
			m.setMinWidth(this._minWidth);
			m.setWidth(this.getWidth());
			if (m._components[2] instanceof RegionLine) {
				m._components[2].setWidth(this.getWidth())
			}
		}
		for (c = 0; c < e; c++) {
			this._nodeChilds[c]._x = this.getX();
			this._nodeChilds[c]._y = f;
			if (c == e - 1) {
				if (b || (f + this._nodeChilds[c]._height) < (this.getHeight() + this.getY())) {
					this._nodeChilds[c].setHeight(this.getHeight() + this.getY() - f)
				} else {
					this.setHeight(f + this._nodeChilds[c]._height - this.getY())
				}
			}
			f += this._nodeChilds[c].getHeight()
		}
		for (c = 0; c < e; c++) {
			var l = this._nodeChilds[c]._y - this._nodeChilds[c]._prey;
			if (l > 0 || (l < 0 && !h)) {
				for (var d = 0; d < this._nodeChilds[c]._nodeChilds.length; d++) {
					this._nodeChilds[c]._nodeChilds[d].updatePosition(0, l, true)
				}
			}
			this._nodeChilds[c].resetMovement()
		}
	}
	this.updateComponents();
	for (c = 0; c < this._nodeChilds.length; c++) {
		this._nodeChilds[c].updateComponents()
	}
};
SuperNode.prototype.select = function(j, g) {
	if (!this._visible) {
		return
	}
	var b;
	var e = -1;
	var f = this;
	this.deselectComponent();
	for (b = 0; b < this._nodeChilds.length; b++) {
		if (this._nodeChilds[b]._selected) {
			e = b
		}
		this._nodeChilds[b].deselect()
	}
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouse == true) {
		if (this._selected) {
			if (this._moveable && Math.abs(j - (this._x + this._width + 2.5)) <= 5 && Math.abs(g - (this._y + this._height + 2.5)) <= 5) {
				this._resizing = true;
				return true
			}
		}
		if (this._selected) {
			var a = this._nodeChilds;
			for (b = 0; b < a.length - 1; b++) {
				if (b == e) {
					if (this._orientation) {
						var l = a[b].getX() + a[b].getWidth() - 7;
						var d = a[b].getY() + 7;
						var k = a[b + 1].getX() + a[b + 1].getWidth() - 7;
						var c = a[b + 1].getY() + 7
					} else {
						var l = a[b].getX() + 7;
						var d = a[b].getY() + a[b].getHeight() - 7;
						var k = a[b + 1].getX() + 7;
						var c = a[b + 1].getY() + a[b + 1].getHeight() - 7
					}
					var n = new Dialog({
						text: "Do you want to delete the region?",
						cancelable: true
					});
					if (Math.abs(j - (l)) <= 8 && Math.abs(g - (d)) <= 8) {
						this._diagram._pressMouse = false;
						n.show(function() {
							f.deleteRegion(a[b])
						});
						return true
					}
					if (Math.abs(j - (k)) <= 8 && Math.abs(g - (c)) <= 8) {
						this._diagram._pressMouse = false;
						n.show(function() {
							f.deleteRegion(a[b + 1])
						});
						return true
					}
				}
			}
			for (b = 0; b < this._nodeChilds.length; b++) {
				var m = this._nodeChilds[b];
				if (m.isOverComponent(j, g)) {
					if (m.isOverRegionLine(j, g)) {
						m.selectComponent(j, g)
					} else {
						this._relx = j - this._x;
						this._rely = g - this._y;
						this._selectedBefore = true
					}
					return true
				}
			}
			if (this.isOverComponent(j, g)) {
				this._relx = j - this._x;
				this._rely = g - this._y;
				this._selectedBefore = true;
				return true
			}
		}
		if (this.isOver(j, g)) {
			this._relx = j - this._x;
			this._rely = g - this._y;
			this._selectedBefore = this._selected;
			this._selected = true;
			return true
		} else {
			return false
		}
	} else {
		if (this._diagram._pressMouseRight == true) {
			if (this.isOver(j, g)) {
				document.oncontextmenu = function() {
					return false
				};
				var h = document.documentElement.scrollTop || document.body.scrollTop;
				j = j + this._diagram._div.offsetLeft;
				g = (h) ? (g - h + this._diagram._div.offsetTop) : (g + this._diagram._div.offsetTop);
				this.showContextualMenu(j, g);
				return true
			} else {
				return false
			}
		}
	}
};
SuperNode.prototype.drop = function(b, e) {
	if (this._moved) {
		if (!this._alone) {
			this._diagram.checkForParent(this)
		}
		this.updatePosition();
		if (this._parent) {
			this._parent.updateContainer();
			var a = this._parent.getParent();
			while (a) {
				if (a instanceof SuperNode) {
					a.notifyChange(true);
					a = null
				} else {
					a = a._parent
				}
			}
		}
	} else {
		if (this._resizing) {
			if (this instanceof SuperNode) {
				var d = true;
				var c = true;
				this.notifyChange(d, c)
			} else {
				this.notifyChange()
			}
			if (this._parent) {
				this._parent.updateContainer();
				var a = this._parent.getParent();
				while (a) {
					if (a instanceof SuperNode) {
						a.notifyChange(true, true);
						a = null
					} else {
						a = a._parent
					}
				}
			}
		} else {
			if (this._selectedBefore) {
				this.selectComponent(b, e)
			}
		}
	}
	this._moved = false;
	this._resizing = false
};
SuperNode.prototype.selectComponent = function(b, d) {
	var c;
	for (c = 0; c < this._components.length; c += 1) {
		if (this._components[c].select(b, d)) {
			this._activeComponent = this._components[c];
			return
		}
	}
	for (c = 0; c < this._nodeChilds.length; c++) {
		var a = this._nodeChilds[c];
		if (a.isOverComponent(b, d)) {
			a.selectComponent(b, d);
			a._selectedBefore = true;
			return true
		}
	}
};
SuperNode.prototype.draw = function(b) {
	if (!this._visible) {
		return
	}
	b.save();
	b.fillStyle = NodeStyle.shape_color;
	if (this._moveable && this._selected) {
		b.fillRect(parseInt(this._x + this._width), parseInt(this._y + this._height), 5, 5)
	}
	b.restore();
	this.drawFigures(b);
	this.drawComponents(b);
	if (this._selected) {
		this.drawComponentsShape(b)
	}
	for (var a = 0; a < this._nodeChilds.length; a++) {
		this._nodeChilds[a].draw(b)
	}
	if (this._selected) {
		for (var a = 0; a < this._nodeChilds.length; a++) {
			if (this._nodeChilds[a]._components[0]) {
				this._nodeChilds[a]._components[0].drawShape(b)
			}
			if (this._nodeChilds[a]._components[1]) {
				this._nodeChilds[a]._components[1].drawShape(b)
			}
		}
	}
};
SuperNode.prototype.getElementXML = function(b) {
	var c = b.createElement(this.getType());
	if (this._selectedFigure) {
		this.setSelectedFigure(0)
	}
	c.setAttribute("id", this.getId());
	c.setAttribute("x", this.getX());
	c.setAttribute("y", this.getY());
	c.setAttribute("width", this.getWidth());
	c.setAttribute("height", this.getHeight());
	c.setAttribute("backgroundColor", this.getBackgroundColor());
	c.setAttribute("orientation", this._orientation);
	c.setAttribute("includeComponentByRegion", this._includeComponentByRegion);
	var a;
	for (a in this._components) {
		if (this._components[a].getId()) {
			c.appendChild(this._components[a].getComponentXML(b))
		}
	}
	for (a in this._nodeChilds) {
		c.appendChild(this._nodeChilds[a].getElementXML(b))
	}
	for (a in this._relationChilds) {
		c.appendChild(this._relationChilds[a].getElementXML(b))
	}
	return c
};
SuperNode.prototype.setElementXML = function(d) {
	this.setPosition(parseInt(d.getAttribute("x")), parseInt(d.getAttribute("y")));
	this.resetMovement();
	this.setWidth(parseInt(d.getAttribute("width")));
	this.setHeight(parseInt(d.getAttribute("height")));
	this.setBackgroundColor(d.getAttribute("backgroundColor"));
	this._orientation = parseInt(d.getAttribute("orientation"));
	this._includeComponentByRegion = d.getAttribute("includeComponentByRegion");
	this._includeComponentByRegion = (this._includeComponentByRegion == "true") ? true : false;
	var b;
	var c = d.childNodes;
	for (b = 0; b < c.length; b++) {
		if (c[b].nodeName == "item") {
			this.setValue(c[b].getAttribute("id"), c[b].getAttribute("value"))
		} else {
			if (c[b].nodeName == "superitem") {
				var a;
				for (a in this._components) {
					if (this._components[a].getId() == c[b].getAttribute("id")) {
						this._components[a].setComponentXML(c[b])
					}
				}
			}
		}
	}
};
var RegionItem = function(a) {
	a = a || {};
	RegionItem.baseConstructor.call(this, a)
};
JSFun.extend(RegionItem, TextBox);
RegionItem.prototype.select = function(a, b) {
	if (!this.selected && this.isOver(a, b)) {
		this.createRegion();
		return true
	} else {
		return false
	}
};
RegionItem.prototype.createRegion = function() {
	var a = this.getParent()._components.length;
	if (this.getParent()._orientation) {
		this.getParent().addRegion(new Region({
			parent: this.getParent()
		}))
	} else {
		this.getParent().addRegion(new Region({
			parent: this.getParent()
		}))
	}
};
var Rhombus = function(a) {
	a = a || {};
	Rhombus.baseConstructor.call(this, a)
};
JSFun.extend(Rhombus, Node);
Rhombus.prototype.getLinkCentered = function(h, g) {
	if (h instanceof Point) {
		g = h.getY();
		h = h.getX()
	}
	var f = this.getCentralPoint();
	var c = f.getX();
	var b = f.getY();
	var a, j, e, d;
	a = this.getX();
	j = f.getY();
	e = f.getX();
	d = this.getY();
	if (h < c) {
		if (g < b) {} else {
			d = this.getY() + this.getHeight()
		}
	} else {
		if (g < b) {
			a = this.getX() + this.getWidth()
		} else {
			a = this.getX() + this.getWidth();
			d = this.getY() + this.getHeight()
		}
	}
	return JSGraphic.lineIntersection(a, j, e, d, h, g, f.getX(), f.getY())
};
Rhombus.prototype.calculateSize = function() {
	var a;
	var d = 0;
	var c = 0;
	var b;
	for (b = 0; b < this._components.length; b += 1) {
		a = this._components[b];
		if (a.getPosition() == Component.Float) {
			c += a.getHeight();
			if (a.getWidth() > d) {
				d = a.getWidth()
			}
		}
	}
	if (c > 0) {
		this.setMinHeight(c * 2)
	}
	if (d > 0) {
		this.setMinWidth(d * 2)
	}
};
Rhombus.prototype.updateComponents = function() {
	if (this._components.length > 0) {
		this.calculateSize();
		var c = this.getX();
		var l = this.getY();
		var k = this.getWidth() / 2;
		var j = this.getHeight() / 2;
		var f = c + k;
		var e = l + j;
		var h = this.getCentralPoint();
		var d = JSGraphic.lineIntersection(c, l + j, c + k, l, this.getX(), this.getY(), h.getX(), h.getY());
		this.insertComponents(d.getX(), d.getY(), this.getWidth() - 2 * (d.getX() - this.getX()), this.getHeight() - 2 * (d.getY() - this.getHeight()));
		var g;
		for (g in this._relations) {
			this._relations[g].notifyChange()
		}
	}
};
var RoleItem = function(a) {
	a = a || {};
	RoleItem.baseConstructor.call(this, a);
	this._parse = /^([#|+|\-|~])?([\/])?(.*)?$/
};
JSFun.extend(RoleItem, TextBox);
RoleItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += a[0]
	}
	if (a[1]) {
		b += a[1]
	}
	if (a[2]) {
		b += a[2]
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_role"
	}
};
RoleItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
RoleItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var g = this;
	this.active = true;
	var a = document.createElement("div");
	var b = document.createElement("form");
	var f = [];
	var d;
	for (d = 0; d < 3; d++) {
		f.push(document.createElement("input"))
	}
	f[0] = document.createElement("select");
	var c = document.createElement("option");
	c.value = "";
	c.appendChild(document.createTextNode("(none)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "+";
	c.appendChild(document.createTextNode("+ (public)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "-";
	c.appendChild(document.createTextNode("- (private)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "#";
	c.appendChild(document.createTextNode("# (protected)"));
	f[0].appendChild(c);
	c = document.createElement("option");
	c.value = "~";
	c.appendChild(document.createTextNode("~ (package)"));
	f[0].appendChild(c);
	f[1] = document.createElement("select");
	c = document.createElement("option");
	c.value = "";
	c.appendChild(document.createTextNode("no"));
	f[1].appendChild(c);
	c = document.createElement("option");
	c.value = "/";
	c.appendChild(document.createTextNode("yes"));
	f[1].appendChild(c);
	var j = document.createElement("input");
	a.className = "ud_popup";
	var l = this.decode(this.getValue());
	for (d = 0; d < f.length; d++) {
		f[d].type = "text";
		f[d].value = l[d] || ""
	}
	if (l[0]) {
		var h = f[0].childNodes;
		for (d in h) {
			if (h[d].value == l[0]) {
				h[d].selected = "selected"
			}
		}
	}
	if (l[1]) {
		var h = f[1].childNodes;
		for (d in h) {
			if (h[d].value == l[1]) {
				h[d].selected = "selected"
			}
		}
	}
	j.setAttribute("type", "submit");
	j.setAttribute("value", "OK");
	this.changeText = function(q) {
		if (g.active) {
			var o = [];
			var p;
			for (p = 0; p < f.length; p++) {
				o.push(f[p].value)
			}
			g.setText(g.encode(o));
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	this.closeDialog = function(o) {
		if (g.active) {
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	j.addEventListener("click", this.changeText, false);
	var e = ["visibility", "derived", "role"];
	var k;
	var n;
	for (d = 0; d < f.length; d++) {
		n = document.createElement("div");
		k = document.createElement("label");
		k.appendChild(document.createTextNode(e[d]));
		n.appendChild(k);
		n.appendChild(f[d]);
		b.appendChild(n)
	}
	b.appendChild(j);
	if (this.deletable) {
		var m = document.createElement("input");
		m.setAttribute("type", "submit");
		m.setAttribute("value", "delete");
		this.deleteDialog = function(o) {
			if (g.active) {
				document.body.removeChild(a);
				g.active = false;
				g.notifyDelete();
				g.notifyChange()
			}
		};
		m.addEventListener("click", this.deleteDialog, false);
		b.appendChild(m)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
var Space = function(a) {
	a = a || {};
	Space.baseConstructor.call(this, a);
	if (a.height) {
		this.setHeight(a.height || 0)
	}
};
JSFun.extend(Space, Component);
var SpecificationItem = function(b) {
	b = b || {};
	SpecificationItem.baseConstructor.call(this, b);
	var a = "^(entry/)?([a-zA-Z]*)?(;do/)?([a-zA-Z]*)?(;exit/)?([a-zA-Z]*)?$";
	this._parse = new RegExp(a);
	this._behaviors = new Array();
	this._visible = b.visible || false;
	this.setMinWidth(100);
	this.setDeletable()
};
JSFun.extend(SpecificationItem, TextBox);
SpecificationItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		this._behaviors[0] = a[0];
		b += "entry/"
	}
	if (a[1]) {
		b += a[1]
	}
	if (a[2]) {
		this._behaviors[1] = a[2];
		b += ";do/"
	}
	if (a[3]) {
		b += a[3]
	}
	if (a[4]) {
		this._behaviors[2] = a[4];
		b += ";exit/"
	}
	if (a[5]) {
		b += a[5]
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_attribute"
	}
};
SpecificationItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
SpecificationItem.prototype.getComponentXML = function(b) {
	var a = b.createElement("item");
	if (this._id) {
		a.setAttribute("id", this._id)
	}
	if (this.getFontColor() != "#000000") {
		a.setAttribute("fontColor", this.getFontColor())
	}
	if (this.getFontSize() != "12") {
		a.setAttribute("fontSize", this.getFontSize())
	}
	if (this.getFontStyle() != "normal") {
		a.setAttribute("fontStyle", this.getFontStyle())
	}
	if (this.getFontFamily() != "monospace") {
		a.setAttribute("fontFamily", this.getFontFamily())
	}
	if (this.getFontWeight() != "normal") {
		a.setAttribute("fontWeight", this.getFontWeight())
	}
	a.setAttribute("value", this.getValue());
	a.setAttribute("behaviors", this._behaviors);
	a.setAttribute("visible", this._visible);
	return a
};
SpecificationItem.prototype.setValue = function(b, a, c) {
	if (a) {
		this._behaviors[0] = a[0];
		this._behaviors[1] = a[2];
		this._behaviors[2] = a[4]
	}
	this._visible = (c == "true") ? true : false;
	this.setText(b)
};
SpecificationItem.prototype.setText = function(d) {
	if (JSFun.isString(d)) {
		var b, c = 0;
		var a = d.split(";");
		for (b = 0; b < a.length; b++) {
			if (a[b].length > c) {
				c = a[b].length
			}
		}
		this._text = a;
		if (d == "") {
			this.setWidth(40)
		} else {
			this.setWidth(c * this._font_width)
		}
		this.setHeight(this._text.length * this._line_height)
	}
};
SpecificationItem.prototype.getValue = function() {
	if (!this._text) {
		return ""
	}
	return this._text.join(";")
};
SpecificationItem.prototype.isOver = function(a, b) {
	if (a >= this._x && a <= this._x + this._width && b >= this._y && b <= this._y + this._height && this._visible) {
		return true
	} else {
		return false
	}
};
SpecificationItem.prototype.showDialog = function() {
	if (this.active || !this._visible) {
		return
	}
	var k = this;
	this.active = true;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var h = [];
	var e;
	for (e = 0; e < 6; e++) {
		h.push(document.createElement("input"))
	}
	var m = document.createElement("input");
	m.setAttribute("type", "submit");
	m.setAttribute("value", "OK");
	var c;
	for (e = 0; e < 6; e += 2) {
		h[e] = document.createElement("select");
		c = document.createElement("option");
		c.value = "0";
		c.appendChild(document.createTextNode("<UNSPECIFIED>"));
		h[e].appendChild(c);
		c = document.createElement("option");
		c.value = "1";
		c.appendChild(document.createTextNode("Activity"));
		h[e].appendChild(c);
		c = document.createElement("option");
		c.value = "2";
		c.appendChild(document.createTextNode("FunctionBehavior"));
		h[e].appendChild(c);
		c = document.createElement("option");
		c.value = "3";
		c.appendChild(document.createTextNode("Interaction"));
		h[e].appendChild(c);
		c = document.createElement("option");
		c.value = "4";
		c.appendChild(document.createTextNode("OpaqueBehavior"));
		h[e].appendChild(c);
		c = document.createElement("option");
		c.value = "5";
		c.appendChild(document.createTextNode("ProtocolStateMachine"));
		h[e].appendChild(c);
		c = document.createElement("option");
		c.value = "6";
		c.appendChild(document.createTextNode("StateMachine"));
		h[e].appendChild(c)
	}
	var o = k.decode(k.getValue());
	for (e = 0; e < h.length; e++) {
		h[e].type = "text";
		h[e].value = o[e] || ""
	}
	if (o[0]) {
		var l = h[0].childNodes;
		for (e = 0; e < l.length; e++) {
			if (l[e].value == k._behaviors[0]) {
				l[e].selected = "selected"
			}
		}
	}
	if (o[2]) {
		var l = h[2].childNodes;
		for (e = 0; e < l.length; e++) {
			if (l[e].value == k._behaviors[1]) {
				l[e].selected = "selected"
			}
		}
	}
	if (o[4]) {
		var l = h[4].childNodes;
		for (e = 0; e < l.length; e++) {
			if (l[e].value == k._behaviors[2]) {
				l[e].selected = "selected"
			}
		}
	}
	k.changeText = function(r) {
		if (k.active) {
			var j = [];
			for (e = 0; e < h.length; e++) {
				j.push(h[e].value)
			}
			k.setText(k.encode(j));
			document.body.removeChild(a);
			k.active = false;
			k.notifyChange();
			k._parent.updateComponents();
			k._parent.notifyDraw()
		}
	};
	k.closeDialog = function(j) {
		if (k.active) {
			document.body.removeChild(a);
			k.active = false;
			k.notifyChange();
			k.notifyDraw()
		}
	};
	b.onsubmit = function() {
		return false
	};
	m.addEventListener("click", k.changeText, false);
	var g = ["Behavior", "name", "Behavior", "name", "Behavior", "name", "restrictions"];
	var n;
	var q;
	var f = ["Entry", "Do Activity", "Exit"];
	var d = -1;
	for (e = 0; e < h.length; e++) {
		if (e % 2 == 0) {
			q = document.createElement("div");
			q.appendChild(document.createTextNode(f[++d]));
			q.style.background = "#ccccff";
			q.style.textAlign = "center";
			q.style.fontWeight = "bold";
			q.style.marginLeft = "-10px";
			q.style.marginRight = "-10px";
			q.style.font = "14px";
			q.style.paddingTop = "3px";
			q.style.paddingBottom = "3px";
			b.appendChild(q)
		}
		q = document.createElement("div");
		n = document.createElement("label");
		n.appendChild(document.createTextNode(g[e]));
		q.appendChild(n);
		q.style.clear = "both";
		q.appendChild(h[e]);
		b.appendChild(q)
	}
	b.appendChild(m);
	if (k.deletable) {
		var p = document.createElement("input");
		p.setAttribute("type", "submit");
		p.setAttribute("value", "delete");
		k.deleteDialog = function(j) {
			if (k.active) {
				document.body.removeChild(a);
				k.active = false;
				k._visible = false;
				k.setText("");
				k.notifyChange();
				k.notifyDraw()
			}
		};
		p.addEventListener("click", k.deleteDialog, false);
		b.appendChild(p);
		b.appendChild(p)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	m.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
SpecificationItem.prototype.drawShape = function(a) {
	if (this._visible) {
		a.save();
		a.strokeStyle = "#aaaaaa";
		a.strokeRect(this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight());
		a.restore()
	}
};
SpecificationItem.prototype.draw = function(d) {
	if (!this._visible) {
		return
	}
	d.save();
	d.font = this.getFontStyle() + " " + this.getFontWeight() + " " + this.getFontSize() + "px " + this.getFontFamily();
	d.textBaseline = "middle";
	d.fillStyle = this.getFontColor();
	var a = this._getMX();
	var f = this._getMY() + this._line_height / 2;
	var b = this.getWidth() - 2 * this._getMargin();
	var e = 0;
	var c;
	for (c = 0; c < this._text.length; c++) {
		e = a + b / 2 - (this._text[c].length * this._font_width) / 2;
		d.fillText(this._text[c], e, f);
		f += this._line_height
	}
	d.restore()
};
SpecificationItem.prototype.resize = function() {
	this._line_height = parseInt(this.getFontSize(), 10) + 1;
	this._font_width = this.getFontSize() / 1.5;
	var b, c = 0;
	var a = this.getValue().split(";") || "";
	for (b = 0; b < a.length; b++) {
		if (a[b].length > c) {
			c = a[b].length
		}
	}
	if (a == "") {
		this.setWidth(40)
	} else {
		this.setWidth(c * this._font_width)
	}
	this.setHeight(a.length * this._line_height)
};
var TransitionItem = function(a) {
	a = a || {};
	TransitionItem.baseConstructor.call(this, a);
	this._parse = /^([a-zA-Z]*)(?:\[([^\[\]]*)\])?(?:\/([a-zA-Z]*))?$/
};
JSFun.extend(TransitionItem, TextBox);
TransitionItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += a[0]
	}
	if (a[1]) {
		b += "[" + a[1] + "]"
	}
	if (a[2]) {
		b += "/" + a[2]
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_operation"
	}
};
TransitionItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
TransitionItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var f = this;
	this.active = true;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var e = [];
	var c;
	for (c = 0; c < 3; c++) {
		e.push(document.createElement("input"))
	}
	var g = document.createElement("input");
	g.setAttribute("type", "submit");
	g.setAttribute("value", "OK");
	var j = this.decode(this.getValue());
	for (c = 0; c < e.length; c++) {
		e[c].setAttribute("type", "text");
		e[c].setAttribute("value", j[c] || "")
	}
	this.changeText = function(o) {
		if (f.active) {
			var m = [];
			var n;
			for (n = 0; n < e.length; n++) {
				m.push(e[n].value)
			}
			f.setText(f.encode(m));
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	this.closeDialog = function(m) {
		if (f.active) {
			document.body.removeChild(a);
			f.active = false;
			f.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	g.addEventListener("click", this.changeText, false);
	var d = ["trigger", "guard", "behavior"];
	var h;
	var l;
	for (c = 0; c < e.length; c++) {
		l = document.createElement("div");
		h = document.createElement("label");
		h.appendChild(document.createTextNode(d[c]));
		l.appendChild(h);
		l.appendChild(e[c]);
		b.appendChild(l)
	}
	b.appendChild(g);
	if (this.deletable) {
		var k = document.createElement("input");
		k.setAttribute("type", "submit");
		k.setAttribute("value", "delete");
		this.deleteDialog = function(m) {
			if (f.active) {
				document.body.removeChild(a);
				f.active = false;
				f.notifyDelete();
				f.notifyChange()
			}
		};
		k.addEventListener("click", this.deleteDialog, false);
		b.appendChild(k)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	g.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};