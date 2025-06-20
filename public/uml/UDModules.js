var AcceptEventAction = function(a) {
	a = a || {};
	AcceptEventAction.baseConstructor.call(this, a)
};
JSFun.extend(AcceptEventAction, Rectangular);
AcceptEventAction.prototype.getLinkCentered = function(n, l) {
	if (this._selectedFigure) {
		return AcceptEventAction.base.getLinkCentered.call(this, n, l)
	}
	if (n instanceof Point) {
		l = n.getY();
		n = n.getX()
	}
	var h = this.getCentralPoint();
	var d = h.getX();
	var c = h.getY();
	var a, o, g, e;
	a = this.getX();
	o = this.getY();
	g = h.getX();
	e = this.getY();
	if (n < d) {
		if (l < c) {
			var b;
			b = (this.getY() - c) / (this.getX() - d);
			if (((l - c) == 0) || Math.abs((l - c) / (n - d)) < Math.abs(b)) {
				g = this.getX() + 25;
				e = this.getY() + this.getHeight() / 2
			} else {
				g = this.getX() + this.getWidth();
				e = this.getY()
			}
		} else {
			var b;
			b = (this.getY() + this.getHeight() - c) / (this.getX() - d);
			if (((l - c) == 0) || Math.abs((l - c) / (n - d)) < Math.abs(b)) {
				a = this.getX() + 25;
				o = this.getY() + this.getHeight() / 2;
				g = this.getX();
				e = this.getY() + this.getHeight()
			} else {
				o = this.getY() + this.getHeight();
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			}
		}
	} else {
		if (l < c) {
			var b;
			b = (this.getY() - c) / (this.getX() + this.getWidth() - d);
			if (((l - c) == 0) || ((l - c) / (n - d)) < b) {
				g = this.getX() + this.getWidth();
				e = this.getY()
			} else {
				a = this.getX() + this.getWidth();
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			}
		} else {
			var b;
			b = (this.getY() + this.getHeight() - c) / (this.getX() + this.getWidth() - d);
			if (((l - c) == 0) || ((l - c) / (n - d)) < b) {
				a = this.getX() + this.getWidth();
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			} else {
				o = this.getY() + this.getHeight();
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			}
		}
	}
	return JSGraphic.lineIntersection(a, o, g, e, n, l, h.getX(), h.getY())
};
AcceptEventAction.prototype.calculateSize = function() {
	if (this._selectedFigure) {
		AcceptEventAction.base.calculateSize.call(this);
		return
	}
	if (this._components.length > 0) {
		var a;
		var d = 0;
		var c = 0;
		var b;
		for (b in this._components) {
			a = this._components[b];
			if (a.getPosition() == Component.Float || a.getPosition() == Component.BottomLeft || a.getPosition() == Component.BottomRight) {
				c += a.getHeight();
				if (a.getWidth() > d) {
					d = a.getWidth()
				}
			}
		}
		if (this._container) {
			if (c > this._minHeight) {
				this.setMinHeight(c)
			}
			if (d > this._minWidth) {
				this.setMinWidth(d + 25)
			}
		} else {
			if (c > 0) {
				this.setMinHeight(c)
			}
			if (d > 0) {
				this.setMinWidth(d + 25)
			}
		}
	}
};
AcceptEventAction.prototype.updateComponents = function() {
	if (this._components.length > 0) {
		this.calculateSize();
		this.insertComponents(this._x + 25, this._y, this._width - 25, this._height);
		var a;
		for (a in this._relations) {
			this._relations[a].notifyChange()
		}
	}
};
AcceptEventAction.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
AcceptEventAction.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
AcceptEventAction.prototype.getStereotypes = function() {
	var c = this._components[0]._childs;
	var a = [];
	for (var b = 0; b < c.length; b++) {
		a.push(c[b]._text)
	}
	return a
};
AcceptEventAction.prototype.getName = function() {
	return this._components[1].getValue()
};
AcceptEventAction.prototype.getStereotype = function() {
	return this._components[0]
};
AcceptEventAction.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var ActivityDiagram = function(a) {
	ActivityDiagram.baseConstructor.call(this, a)
};
JSFun.extend(ActivityDiagram, Diagram);
ActivityDiagram.prototype._instantiateElements = function(d, c, b) {
	b = b || null;
	var e = this._instantiateObjectFromString(d.nodeName, b);
	if (e) {
		c[d.getAttribute("id")] = e;
		var a;
		for (a = 0; a < d.childNodes.length; a++) {
			if (e instanceof SuperNode && d.childNodes[a].nodeName == "Swimlane") {
				this._instantiateElements(d.childNodes[a], c, e)
			} else {
				this._instantiateElements(d.childNodes[a], c)
			}
		}
	}
};
ActivityDiagram.prototype._instantiateObjectFromString = function(elemName, parent) {
	if (JSFun.isString(elemName)) {
		parent = parent || null;
		var i;
		for (i in this._validElements) {
			if (elemName == this._validElements[i]) {
				if (elemName == "UMLHorizontalHierarchicalSwimlane" || elemName == "UMLVerticalHierarchicalSwimlane" || elemName == "UMLHorizontalSwimlane" || elemName == "UMLVerticalSwimlane" || elemName == "UMLFlow") {
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
ActivityDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
ActivityDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var ConnectorActivity = function(a) {
	a = a || {};
	ConnectorActivity.baseConstructor.call(this, a)
};
JSFun.extend(ConnectorActivity, Elliptical);
ConnectorActivity.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
ConnectorActivity.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
ConnectorActivity.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
ConnectorActivity.prototype.getName = function() {
	return this._components[1].getValue()
};
ConnectorActivity.prototype.getStereotype = function() {
	return this._components[0]
};
ConnectorActivity.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var DataStore = function(a) {
	a = a || {};
	DataStore.baseConstructor.call(this, a)
};
JSFun.extend(DataStore, Rectangular);
DataStore.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
DataStore.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
DataStore.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
DataStore.prototype.getName = function() {
	return this._components[2].getValue()
};
DataStore.prototype.getStereotype = function() {
	return this._components[0]
};
DataStore.prototype.getNameAsComponent = function() {
	return this._components[2]
};
var Decision_MergeNode = function(a) {
	a = a || {};
	Decision_MergeNode.baseConstructor.call(this, a)
};
JSFun.extend(Decision_MergeNode, Rhombus);
Decision_MergeNode.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Decision_MergeNode.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Decision_MergeNode.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Decision_MergeNode.prototype.getName = function() {
	return this._components[1].getValue()
};
Decision_MergeNode.prototype.getStereotype = function() {
	return this._components[0]
};
Decision_MergeNode.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var ExceptionHandler = function(a) {
	a = a || {};
	this._y = a.y || 0;
	this._limitY = 0;
	this._objA = null;
	this._objB = null;
	ExceptionHandler.baseConstructor.call(this, a)
};
JSFun.extend(ExceptionHandler, Relation);
ExceptionHandler.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 6 : 0;
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
			return true
		}
	}
	if (this._selected > -1) {
		if (this._isOverComponent(c, e, b)) {
			this._selectedBefore = true;
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
			this._points.splice(this._selected + 1, 0, new Point(c, e));
			return true
		}
	}
	return false
};
ExceptionHandler.prototype.draw = function(b) {
	ExceptionHandler.base.draw.call(this, b);
	b.save();
	b.strokeStyle = this.getLineColor();
	b.lineWidth = this.getLineWidth();
	var l = this._points.length;
	var c = parseInt(l / 2) - 1;
	var a = this._points[c].getX();
	var p = this._points[c].getY();
	var o = this._points[c + 1].getX();
	var m = this._points[c + 1].getY();
	if (l % 2 != 0) {
		var h = o;
		var e = m
	} else {
		var h = (a + o) / 2;
		var e = (this._components.length) ? this._components[0]._y - 30 : ((p + m) / 2 - 30)
	}
	var n = this._elemA.getCentralPoint();
	var g = n._x;
	var d = n._y;
	if (o < g) {
		if (m < d) {
			if (Math.abs(o - g) > Math.abs(m - d)) {} else {
				var h = (this._components.length) ? this._components[0]._x + 30 : ((a + o) / 2 + 30);
				var e = (p + m) / 2
			}
		} else {
			if (Math.abs(o - g) > Math.abs(m - d)) {} else {
				var h = (this._components.length) ? this._components[0]._x + 30 : ((a + o) / 2 + 30);
				var e = (p + m) / 2
			}
		}
	} else {
		if (m < d) {
			if (Math.abs(o - g) < Math.abs(m - d)) {
				var h = (this._components.length) ? this._components[0]._x + 30 : ((a + o) / 2 + 30);
				var e = (p + m) / 2
			} else {}
		} else {
			if (Math.abs(o - g) > Math.abs(m - d)) {} else {
				var h = (this._components.length) ? this._components[0]._x + 30 : ((a + o) / 2 + 30);
				var e = (p + m) / 2
			}
		}
	}
	b.beginPath();
	b.moveTo(h - 15, e);
	b.lineTo(h + 15, e);
	b.lineTo(h - 15, e + 20);
	b.lineTo(h + 15, e + 20);
	b.stroke();
	b.restore()
};
ExceptionHandler.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
ExceptionHandler.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
ExceptionHandler.prototype.getName = function() {
	return this._components[1].getValue()
};
ExceptionHandler.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
ExceptionHandler.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Pin = function(a) {
	a = a || {};
	Pin.baseConstructor.call(this, a);
	this.setAlone();
	this.setWidth(7);
	this.setHeight(14)
};
JSFun.extend(Pin, Rectangular);
Pin.prototype.setAction = function(a) {
	if (a instanceof Node) {
		this._action = a
	}
};
Pin.prototype.drop = function(a, b) {
	this.correctPosition();
	Pin.base.drop.call(this, a, b)
};
Pin.prototype.correctPosition = function() {
	if (!this._action) {
		return
	}
	var c = this._action.getX();
	var m = this._action.getY();
	var d = this._action.getWidth();
	var e = this._action.getHeight();
	if (this.getHeight() > this.getWidth()) {
		var g = this._action.getLinkCentered(this.getX() + this._width, this.getY() + this._height / 2)
	} else {
		var g = this._action.getLinkCentered(this.getX() + this._width / 2, this.getY() + this._height)
	}
	var b = g.getX();
	var l = g.getY();
	if (this.getHeight() > this.getWidth()) {
		if ((this._action.getY() == l) || ((this._action.getY() + this._action.getHeight()) == l)) {
			var a = this.getHeight();
			this.setHeight(this.getWidth());
			this.setWidth(a)
		}
	} else {
		if (this.getWidth() > this.getHeight()) {
			if ((this._action.getX() == b) || ((this._action.getX() + this._action.getWidth()) == b)) {
				var a = this.getHeight();
				this.setHeight(this.getWidth());
				this.setWidth(a)
			}
		}
	}
	if (this._action.getX() == b) {
		this.setPosition(b - this._width, l - this._height / 2)
	} else {
		if (this._action.getY() == l) {
			this.setPosition(b - this._width / 2, l - this._height)
		} else {
			if ((this._action.getX() + this._action.getWidth()) == b) {
				this.setPosition(b, l - this._height / 2)
			} else {
				if ((this._action.getY() + this._action.getHeight()) == l) {
					this.setPosition(b - this._width / 2, l)
				}
			}
		}
	}
	this.updatePositionComponents(b, l)
};
Pin.prototype.updatePositionComponents = function(b, d) {
	var a = -1;
	if (b == this._action.getX()) {
		a = Component.Left
	} else {
		if (b == this._action.getX() + this._action.getWidth()) {
			a = Component.Right
		} else {
			if (d == this._action.getY()) {
				a = Component.Top
			} else {
				if (d == this._action.getY() + this._action.getHeight()) {
					a = Component.Bottom
				}
			}
		}
	}
	for (var c = 0; c < this._components.length; c++) {
		this._components[c]._setPosition(a)
	}
	this.updateComponents();
	this.resetMovement()
};
Pin.prototype.notifyChange = function() {
	this.updatePosition();
	this.correctPosition();
	if (this._container) {
		this.updateContainer()
	} else {
		this.updateComponents()
	}
};
Pin.prototype.remove = function() {
	Pin.base.remove.call(this);
	if (this._parent) {
		this._parent.notifyDeleted(this)
	} else {
		this._action.notifyDeleted(this)
	}
};
Pin.prototype.updatePosition = function(d, b, g) {
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
		if ((this._relations[c].getParent() !== this._parent) || g) {
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
Pin.prototype.calculateSize = function() {
	if (this._components.length > 0) {
		var a;
		var d = 0;
		var c = 0;
		var g;
		var e = false;
		var b;
		for (b in this._components) {
			a = this._components[b];
			if (a._visible && !(a instanceof RegionLine) && (a.getPosition() == Component.Float || (a.getPosition() == Component.BottomLeft && a._visible) || a.getPosition() == Component.BottomRight || a.getPosition() == Component.Xmovement)) {
				if (a._orientation) {
					d += a.getWidth();
					if (a.getHeight() > c) {
						c = a.getHeight()
					}
				} else {
					c += a.getHeight();
					g = (a.getPosition() == Component.Xmovement) ? (a.getWidth() + 2 * a._parent._Xmovement) : a.getWidth();
					if (g > d) {
						d = g
					}
				}
			} else {
				if (!a._visible) {
					e = true
				}
			}
		}
		if (c == 0 && e == true) {
			c = 7
		}
		if (d == 0 && e == true) {
			d = 7
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
Pin.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Pin.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Pin.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Pin.prototype.getName = function() {
	return this._components[1].getValue()
};
Pin.prototype.getStereotype = function() {
	return this._components[0]
};
Pin.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var ExpansionNode = function(a) {
	a = a || {};
	ExpansionNode.baseConstructor.call(this, a);
	this.setWidth(7);
	this.setHeight(18)
};
JSFun.extend(ExpansionNode, Pin);
ExpansionNode.prototype.correctPosition = function() {
	if (!this._action) {
		return
	}
	var c = this._action.getX();
	var m = this._action.getY();
	var d = this._action.getWidth();
	var e = this._action.getHeight();
	if (this.getHeight() > this.getWidth()) {
		var g = this._action.getLinkCentered(this.getX() + this._width, this.getY() + this._height / 2)
	} else {
		var g = this._action.getLinkCentered(this.getX() + this._width / 2, this.getY() + this._height)
	}
	var b = g.getX();
	var l = g.getY();
	if (this.getHeight() > this.getWidth()) {
		if ((this._action.getY() == l) || ((this._action.getY() + this._action.getHeight()) == l)) {
			var a = this.getHeight();
			this.setHeight(this.getWidth());
			this.setWidth(a)
		}
	} else {
		if (this.getWidth() > this.getHeight()) {
			if ((this._action.getX() == b) || ((this._action.getX() + this._action.getWidth()) == b)) {
				var a = this.getHeight();
				this.setHeight(this.getWidth());
				this.setWidth(a)
			}
		}
	}
	if (this._action.getX() == b) {
		this.setPosition(b - this._width, l - this._height / 2)
	} else {
		if (this._action.getY() == l) {
			this.setPosition(b - this._width / 2, l - this._height)
		} else {
			if ((this._action.getX() + this._action.getWidth()) == b) {
				this.setPosition(b, l - this._height / 2)
			} else {
				if ((this._action.getY() + this._action.getHeight()) == l) {
					this.setPosition(b - this._width / 2, l)
				}
			}
		}
	}
	this.updatePositionComponents(b, l)
};
ExpansionNode.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
ExpansionNode.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
ExpansionNode.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
ExpansionNode.prototype.getName = function() {
	return this._components[1].getValue()
};
ExpansionNode.prototype.getStereotype = function() {
	return this._components[0]
};
ExpansionNode.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Flow = function(a) {
	a = a || {};
	this._y = a.y || -1;
	this._x = a.x || -1;
	Flow.baseConstructor.call(this, a);
	if (a.setElementXml) {} else {
		this._addComponents()
	}
};
JSFun.extend(Flow, Relation);
Flow.prototype.setElementXML = function(h, e) {
	var c = h.getAttribute("side_A");
	var a = h.getAttribute("side_B");
	this.setElements(e[c], e[a]);
	this._y = parseInt(h.getAttribute("y"));
	this._x = parseInt(h.getAttribute("x"));
	var d;
	var g = h.childNodes;
	var l = 0;
	for (d = 0; d < g.length; d++) {
		if (g[d].nodeName == "point") {
			this._points[l] = new Point(parseInt(g[d].getAttribute("x")), parseInt(g[d].getAttribute("y")));
			l++
		}
	}
	this._addComponents();
	for (d = 0; d < g.length; d++) {
		if (g[d].nodeName == "item") {
			this.setValue(g[d].getAttribute("id"), g[d].getAttribute("value"))
		} else {
			if (g[d].nodeName == "superitem") {
				var b;
				for (b in this._components) {
					if (this._components[b].getId() == g[d].getAttribute("id")) {
						this._components[b].setComponentXML(g[d])
					}
				}
			}
		}
	}
	this._updateComponents()
};
Flow.prototype._addComponents = function() {
	this.addComponentStereotype();
	this.setComponentName("")
};
Flow.prototype.setComponentName = function(a) {
	if (!this._name) {
		if (this._elemA.getType() == "UMLDecision_MergeNode") {
			this._name = new GuardItem({
				id: "description",
				text: "[]"
			})
		} else {
			this._name = new TextArea({
				id: "name_node",
				text: ""
			})
		}
		this._addComponent(this._name)
	} else {
		this._name.setText(a)
	}
};
Flow.prototype.updateName = function() {
	if (!this._name) {
		return
	}
	if (this._elemA.getType() != "UMLDecision_MergeNode" && this._name instanceof GuardItem) {
		var a = this._name._text.join("\n");
		a = a.substring(1, a.length - 1);
		this._delComponent(this._name);
		this._name = new TextArea({
			id: "name_node",
			text: a
		});
		this._addComponent(this._name)
	} else {
		if (this._elemA.getType() == "UMLDecision_MergeNode" && !(this._name instanceof GuardItem)) {
			var a = "[" + this._name._text.join("\n") + "]";
			this._delComponent(this._name);
			this._name = new GuardItem({
				id: "description",
				text: a
			});
			this._addComponent(this._name)
		}
	}
};
Flow.prototype._calculateLineEnds = function() {
	if (this._elemA.getType() == "UMLFork_JoinNode" || this._elemB.getType() == "UMLFork_JoinNode") {
		var b = this._elemA.getCentralPoint();
		var a = this._elemB.getCentralPoint();
		var d = this._points.length;
		var c = false;
		if (!this._selectedPoint && this._elemA && this._elemB) {
			if (d > 2) {
				if (this._elemA.getType() == "UMLFork_JoinNode") {
					if (this._x != -1) {
						this._points[0].setPoint(this._elemA.getLink(this._points[1]._x, this._points[1]._y, this._elemA._x + this._x, b._y))
					} else {
						this._points[0].setPoint(this._elemA.getLink(this._points[1]._x, this._points[1]._y, b._x, this._elemA._y + this._y))
					}
					this._elemA.updateLimitSize()
				} else {
					this._points[0] = this._elemA.getLinkCentered(this._points[1])
				}
				if (this._elemB.getType() == "UMLFork_JoinNode") {
					if (this._x != -1) {
						this._points[d - 1].setPoint(this._elemB.getLink(this._points[d - 2]._x, this._points[d - 2]._y, this._elemB._x + this._x, a._y))
					} else {
						this._points[d - 1].setPoint(this._elemB.getLink(this._points[d - 2]._x, this._points[d - 2]._y, a._x, this._elemB._y + this._y))
					}
					this._elemB.updateLimitSize()
				} else {
					this._points[d - 1] = this._elemB.getLinkCentered(this._points[d - 2])
				}
			} else {
				if (this._elemA.getType() == "UMLFork_JoinNode") {
					if (this._x != -1) {
						this._points[0].setPoint(this._elemA.getLink(a._x, a._y, this._elemA._x + this._x, b._y))
					} else {
						this._points[0].setPoint(this._elemA.getLink(a._x, a._y, b._x, this._elemA._y + this._y))
					}
					this._elemA.updateLimitSize()
				} else {
					c = true
				}
				if (this._elemB.getType() == "UMLFork_JoinNode") {
					if (this._x != -1) {
						this._points[1].setPoint(this._elemB.getLink(b._x, b._y, this._elemB._x + this._x, a._y))
					} else {
						this._points[1].setPoint(this._elemB.getLink(b._x, b._y, a._x, this._elemB._y + this._y))
					}
					this._elemB.updateLimitSize()
				} else {
					this._points[1] = this._elemB.getLinkCentered(this._points[0].getX(), this._points[0].getY())
				}
				if (c) {
					this._points[0] = this._elemA.getLinkCentered(this._points[1].getX(), this._points[1].getY())
				}
			}
		}
	} else {
		Flow.base._calculateLineEnds.call(this)
	}
};
Flow.prototype.drag = function(a, b) {
	if (this._elemA.getType() == "UMLFork_JoinNode" || this._elemB.getType() == "UMLFork_JoinNode") {
		if (this._selectedLine) {
			this._points[this._selected + 1].setPoint(a, b);
			this._moved = true
		} else {
			if (this._selectedPoint) {
				this._points[this._selected].setPoint(a, b);
				this._moved = true
			}
		}
	} else {
		Flow.base.drag.call(this, a, b)
	}
};
Flow.prototype.drop = function(a, d) {
	if (this._moved) {
		this._checkForNewNodes(a, d);
		var b;
		var c = this._points.length;
		if (this._elemA.getType() == "UMLFork_JoinNode" && this._selected == 0) {
			b = this._elemA
		} else {
			if (this._elemB.getType() == "UMLFork_JoinNode" && this._selected == c - 1) {
				b = this._elemB
			}
		}
		if (b) {
			if (b._quadrant == 1) {
				this._x = a - b._x;
				this._x = (this._x >= 0) ? this._x : 1
			} else {
				this._y = d - b._y;
				this._y = (this._y >= 0) ? this._y : 1
			}
		}
	} else {
		if (this._selectedBefore) {
			this._selectComponent(a, d)
		}
	}
	this._selectedLine = false;
	this._selectedPoint = false;
	this._moved = false;
	this._delUselessPoints();
	this.notifyChange()
};
Flow.prototype.exchangePosition = function() {
	var a;
	a = this._x;
	this._x = this._y;
	this._y = a;
	delete a
};
Flow.prototype._checkForNewNodes = function(a, e) {
	if (this._selectedPoint && (this._selected == 0 || this._selected == this._points.length - 1)) {
		var b = this._diagram.reassignRelationTo(this, a, e);
		if (b != this) {
			if (this._selected == 0) {
				if (b && !(b.getType() == "UMLFork_JoinNode" && this._elemB.getType() == "UMLFork_JoinNode")) {
					var d = this._elemA;
					this.setElementA(b);
					if (d.getType() == "UMLFork_JoinNode") {
						d.updateLimitSize()
					}
					this.updateName()
				}
			} else {
				if (b && !(b.getType() == "UMLFork_JoinNode" && this._elemA.getType() == "UMLFork_JoinNode")) {
					var c = this._elemB;
					this.setElementB(b);
					if (c.getType() == "UMLFork_JoinNode") {
						c.updateLimitSize()
					}
				}
			}
		}
	}
};
Flow.prototype.getElementXML = function(a) {
	var b = Flow.base.getElementXML.call(this, a);
	b.setAttribute("y", this._y);
	b.setAttribute("x", this._x);
	return b
};
Flow.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Flow.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Flow.prototype.getName = function() {
	return this._components[1].getValue()
};
Flow.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Flow.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var FlowFinal = function(a) {
	a = a || {};
	FlowFinal.baseConstructor.call(this, a)
};
JSFun.extend(FlowFinal, Elliptical);
FlowFinal.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
FlowFinal.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
FlowFinal.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
FlowFinal.prototype.getName = function() {
	return this._components[1].getValue()
};
FlowFinal.prototype.getStereotype = function() {
	return this._components[0]
};
FlowFinal.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var HierarchicalSwimlane = function(a) {
	a = a || {};
	HierarchicalSwimlane.baseConstructor.call(this, a)
};
JSFun.extend(HierarchicalSwimlane, SuperNode);
HierarchicalSwimlane.prototype.deleteRegion = function(d) {
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
	this.updateRegions();
	this.notifyChange(true);
	this.notifyDraw()
};
HierarchicalSwimlane.prototype.notifyChange = function(d, b, c) {
	d = d || false;
	b = b || false;
	c = c || false;
	this.resetSizeComponentSwimlane();
	this.updateSizeComponentSwimlane();
	var a = this._nodeChilds;
	for (i = 0; i < a.length; i++) {
		if (a.length - 1 != i) {
			a[i].updateContainer(false)
		} else {
			a[i].updateContainer()
		}
	}
	HierarchicalSwimlane.base.notifyChange.call(this, d, b, c)
};
HierarchicalSwimlane.prototype.resetSizeComponentSwimlane = function() {
	var a = this._nodeChilds;
	for (var b = 0; b < a.length; b++) {
		a[b]._heightComp = (this._orientation) ? (a[b]._components[0]._height + a[b]._components[1]._height) : 0;
		a[b]._widthComp = (this._orientation) ? 0 : (a[b]._components[0]._width + a[b]._components[1]._width)
	}
};
HierarchicalSwimlane.prototype.updateSizeComponentSwimlane = function() {
	var b = this._nodeChilds;
	if (this._orientation) {
		var a = 0;
		for (var c = 0; c < b.length; c++) {
			if (b[c]._heightComp > a) {
				a = b[c]._heightComp
			}
		}
		for (var c = 0; c < b.length; c++) {
			b[c]._heightComp = a
		}
	} else {
		var a = 0;
		for (var c = 0; c < b.length; c++) {
			if (b[c]._widthComp > a) {
				a = b[c]._widthComp
			}
		}
		for (var c = 0; c < b.length; c++) {
			b[c]._widthComp = a
		}
	}
};
HierarchicalSwimlane.prototype.updateRegions = function(b, l) {
	b = b || false;
	l = l || false;
	var e = this._nodeChilds.length;
	if (this._orientation) {
		var a = 0;
		var h = this.getX();
		for (var c = 0; c < e; c++) {
			var o = this._nodeChilds[c];
			o.setMinHeight(this._minHeight - this._components[0].getHeight() - this._components[1].getHeight());
			o.setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight());
			if (o._components[2] instanceof RegionLine) {
				o._components[2].setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight())
			}
		}
		for (c = 0; c < e; c++) {
			this._nodeChilds[c]._x = h;
			this._nodeChilds[c]._y = this.getY() + this._components[0].getHeight() + this._components[1].getHeight();
			if (c == e - 1) {
				if (b || (h + this._nodeChilds[c]._width) < (this.getWidth() + this.getX())) {
					this._nodeChilds[c].setWidth(this.getWidth() + this.getX() - h)
				} else {
					this.setWidth(h + this._nodeChilds[c]._width - this.getX())
				}
			}
			h += this._nodeChilds[c].getWidth()
		}
		for (c = 0; c < e; c++) {
			var n = this._nodeChilds[c]._x - this._nodeChilds[c]._prex;
			if (n > 0 || (n < 0 && !l)) {
				for (var d = 0; d < this._nodeChilds[c]._nodeChilds.length; d++) {
					this._nodeChilds[c]._nodeChilds[d].updatePosition(n, 0, true)
				}
			}
			this._nodeChilds[c].resetMovement()
		}
	} else {
		var m = 0;
		var g = this.getY();
		for (var c = 0; c < e; c++) {
			var o = this._nodeChilds[c];
			o.setMinWidth(this._minWidth - this._components[0].getWidth() - this._components[1].getWidth());
			o.setWidth(this.getWidth() - this._components[0].getWidth() - this._components[1].getWidth());
			if (o._components[2] instanceof RegionLine) {
				o._components[2].setWidth(this.getWidth() - this._components[0].getWidth() - this._components[1].getWidth())
			}
		}
		for (c = 0; c < e; c++) {
			this._nodeChilds[c]._x = this.getX() + this._components[0].getWidth() + this._components[1].getWidth();
			this._nodeChilds[c]._y = g;
			if (c == e - 1) {
				if (b || (g + this._nodeChilds[c]._height) < (this.getHeight() + this.getY())) {
					this._nodeChilds[c].setHeight(this.getHeight() + this.getY() - g)
				} else {
					this.setHeight(g + this._nodeChilds[c]._height - this.getY())
				}
			}
			g += this._nodeChilds[c].getHeight()
		}
		var n;
		for (c = 0; c < e; c++) {
			n = this._nodeChilds[c]._y - this._nodeChilds[c]._prey;
			if (n > 0 || (n < 0 && !l)) {
				for (var d = 0; d < this._nodeChilds[c]._nodeChilds.length; d++) {
					this._nodeChilds[c]._nodeChilds[d].updatePosition(0, n, true)
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
HierarchicalSwimlane.prototype.select = function(l, h) {
	var b;
	var g = -1;
	this.deselectComponent();
	for (b = 0; b < this._nodeChilds.length; b++) {
		if (this._nodeChilds[b]._selected) {
			g = b
		}
		this._nodeChilds[b].deselect()
	}
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouse == true) {
		if (this._selected) {
			if (this._moveable && Math.abs(l - (this._x + this._width + 2.5)) <= 5 && Math.abs(h - (this._y + this._height + 2.5)) <= 5) {
				this._resizing = true;
				return true
			}
			var a = this._nodeChilds;
			for (b = 0; b < a.length - 1; b++) {
				if (b == g) {
					if (this._orientation) {
						var n = a[b].getX() + a[b].getWidth() - 7;
						var e = a[b].getY() + a[b]._heightComp + 7;
						var m = a[b + 1].getX() + a[b + 1].getWidth() - 7;
						var c = a[b + 1].getY() + a[b + 1]._heightComp + 7
					} else {
						var n = a[b].getX() + a[b]._widthComp + 7;
						var e = a[b].getY() + a[b].getHeight() - 7;
						var m = a[b + 1].getX() + a[b + 1]._widthComp + 7;
						var c = a[b + 1].getY() + a[b + 1].getHeight() - 7
					}
					var d = this;
					var p = new Dialog({
						text: "Do you want to delete the region?",
						cancelable: true
					});
					if (Math.abs(l - (n)) <= 8 && Math.abs(h - (e)) <= 8) {
						this._diagram._pressMouse = false;
						p.show(function() {
							d.deleteRegion(a[b])
						});
						return true
					}
					if (Math.abs(l - (m)) <= 8 && Math.abs(h - (c)) <= 8) {
						this._diagram._pressMouse = false;
						p.show(function() {
							d.deleteRegion(a[b + 1])
						});
						return true
					}
				}
			}
			for (b = 0; b < this._nodeChilds.length; b++) {
				var o = this._nodeChilds[b];
				if (o.isOverComponent(l, h)) {
					if (o.isOverRegionLine(l, h)) {
						o.selectComponent(l, h)
					} else {
						this._relx = l - this._x;
						this._rely = h - this._y;
						this._selectedBefore = true
					}
					return true
				}
			}
			if (this.isOverComponent(l, h)) {
				this._relx = l - this._x;
				this._rely = h - this._y;
				this._selectedBefore = true;
				return true
			}
		}
		if (this.isOver(l, h)) {
			this._relx = l - this._x;
			this._rely = h - this._y;
			this._selectedBefore = this._selected;
			this._selected = true;
			return true
		} else {
			return false
		}
	} else {
		if (this._diagram._pressMouseRight == true) {
			if (this.isOver(l, h)) {
				document.oncontextmenu = function() {
					return false
				};
				l = l + this._diagram._div.offsetLeft;
				h = h + this._diagram._div.offsetTop;
				this.showContextualMenu(l, h);
				return true
			} else {
				return false
			}
		}
	}
};
HierarchicalSwimlane.prototype.updateContainer = function(l) {
	if (!(l == false || l == true)) {
		l = true
	}
	if (this._container) {
		var p;
		var c = (this._orientation) ? (this._components[0]._height + this._components[1]._height) : 0;
		var g = (this._orientation) ? 0 : (this._components[0]._width + this._components[1]._width);
		var m = this._x + g;
		var h = this._y + c;
		var d = this._x + g;
		var b = this._y + c;
		var o;
		var s, a, q, n;
		var r = this._nodeChilds.length;
		var e = false;
		for (p = 0; p < r; p++) {
			o = this._nodeChilds[p];
			if (o._visible) {
				if (this._orientation) {
					q = o._x;
					elemLeftY = o._y;
					if (p == (r - 1)) {
						s = o._x + o._minWidth
					} else {
						s = o._x + o._width
					}
					elemRigthY = o._y + o._minHeight
				} else {
					q = o._x;
					elemLeftY = o._y;
					s = o._x + o._minWidth;
					if (p == (r - 1)) {
						elemRigthY = o._y + o._minHeight
					} else {
						elemRigthY = o._y + o._height
					}
					s = o._x + o._minWidth
				}
				if (s > d) {
					d = s
				}
				if (elemRigthY > b) {
					b = elemRigthY
				}
				if (q < m) {
					m = q
				}
				if (elemLeftY < h) {
					h = elemLeftY
				}
				e = true
			}
		}
		if (e) {
			if (m < (this._x + g) || h < (this._y + c)) {
				this.setWidth(this._x + g - m + this._width);
				this.setHeight(this._y + c - h + this._height);
				this._x = m - g;
				this._y = h - c;
				this.setMinWidth(d - this._x);
				this.setMinHeight(b - this._y)
			} else {
				this.setMinWidth(d - this._x);
				this.setMinHeight(b - this._y)
			}
		}
		this._prex = this._x;
		this._prey = this._y;
		this.updateComponents();
		if (this._parent && l) {
			this._parent.updateContainer()
		}
	}
};
HierarchicalSwimlane.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
HierarchicalSwimlane.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
HierarchicalSwimlane.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
HierarchicalSwimlane.prototype.getName = function() {
	return this._components[1].getValue()
};
HierarchicalSwimlane.prototype.getStereotype = function() {
	return this._components[0]
};
HierarchicalSwimlane.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLStereotypedElement = function(a) {
	a = a || {};
	this._stereotypes = a.stereotypes || [];
	this._parent = a.parent || null;
	this._shownStereotype;
	this._appliedStereotypes = []
};
UMLStereotypedElement.prototype.isDrawableStereotype = function() {
	var b = ["UMLActor", "UMLUseCase", "UMLUseCaseExtended", "UMLSystem", "UMLSubSystem", "UMLClass", "UMLComponent", "UMLInterfaceExtended", "UMLPackage", "UMLPackageContainer", "UMLComComponent", "UMLInterface", "UMLOption", "UMLAlternative", "UMLLoop", "UMLBreak", "UMLAcceptEventAction", "UMLTimeEvent", "UMLSendSignalAction", "UMLAction", "UMLObject", "UMLActivity", "UMLDataStore", "UMLConnectorActivity", "UMLHorizontalHierarchicalSwimlane", "UMLVerticalHierarchicalSwimlane", "UMLSimpleState", "UMLCompositeState", "UMLVerticalRegion", "UMLPin", "UMLParameterNode", "UMLExpansionNode", "UMLHorizontalRegion", "UMLPort", "UMLTerminate", "UMLEntryPoint", "UMLExitPoint", "UMLJunction", "UMLFlowFinal", "UMLDataType"];
	for (var a = 0; a < b.length; a++) {
		if (this._parent.getType() == b[a]) {
			return true
		}
	}
	return false
};
UMLStereotypedElement.prototype.setStereotypesProfile = function(b) {
	var a = this._parent;
	if (!a) {
		return
	}
	this._stereotypes = b
};
UMLStereotypedElement.prototype.applyStereotype = function(b) {
	if (!(b instanceof Stereotype)) {
		return false
	}
	var d = this._parent;
	if (!d) {
		return false
	}
	var c;
	var e = false;
	var a = "\xAB" + b.getName() + "\xBB";
	for (c = 0; c < d.getStereotype()._childs.length && !e; c++) {
		if (a == d.getStereotype()._childs[c]._text && b._validMetaclass(d.getType())) {
			e = true
		}
	}
	if (!e) {
		d.addStereotype(b.getName());
		this._appliedStereotypes.push(b);
		d.setTagValues(b.getTagValues());
		d.notifyDraw();
		return true
	}
	return false
};
UMLStereotypedElement.prototype.showStereotype = function(a) {
	if (!(a instanceof Stereotype)) {
		return false
	}
	var c = this._parent;
	var d = false;
	if (!c) {
		return false
	}
	for (var b = 0; b < this._appliedStereotypes.length; b++) {
		if (this._appliedStereotypes[b] == a) {
			d = true;
			break
		}
	}
	if (d) {
		if (!this.drawStereotype(a)) {
			return false
		}
		c.notifyDraw();
		return true
	}
	return false
};
UMLStereotypedElement.prototype.drawStereotype = function(a) {
	var c = this._parent;
	if (!c) {
		return false
	}
	if (!a || !this.isDrawableStereotype()) {
		c.setSelectedFigure(0);
		c.notifyDraw();
		return false
	}
	var d = false;
	for (var b = 0; b < c._figures.length && !d; b++) {
		if (c._figures[b].route && c._figures[b].route == a.getPath()) {
			if (!c._figures[b].foundInAssociatedStereotypes(a)) {
				c._figures[b].addAssociatedStereotype(a)
			}
			c.setSelectedFigure(b);
			d = true
		}
	}
	if (!d && a.getPath()) {
		c.addFigure(new FromImageFigure({
			route: a.getPath()
		}));
		c._figures[c._figures.length - 1].addAssociatedStereotype(a);
		c.setSelectedFigure(c._figures.length - 1)
	}
	return true
};
UMLStereotypedElement.prototype.removeStereotype = function(a) {
	if (!(a instanceof Stereotype)) {
		return false
	}
	var c = false;
	for (var b = 0; b < this._appliedStereotypes.length && !c; b++) {
		if (a == this._appliedStereotypes[b]) {
			c = true
		}
	}
	if (c) {
		this.removeTagValues(a);
		this.removeFigure(a);
		this.deleteStereotypeTag(a);
		this.removeAppliedStereotype(a)
	}
	return true
};
UMLStereotypedElement.prototype.removeTagValues = function(a) {
	if (!(a instanceof Stereotype)) {
		return false
	}
	var g = this._parent._tagValues;
	var e = a._components[3]._childs;
	var c, b;
	var d = false;
	c = 0;
	while (g[c]) {
		d = false;
		for (b = 0; b < e.length && !d; b++) {
			if (g[c][0] == e[b].getNameTagValue()) {
				d = true;
				g.splice(c, 1)
			}
		}
		if (!d) {
			c++
		}
	}
	return true
};
UMLStereotypedElement.prototype.removeFigure = function(a) {
	if (!(a instanceof Stereotype)) {
		return false
	}
	var b;
	for (b = 0; b < this._parent._figures.length; b++) {
		if (this._parent._figures[b] instanceof FromImageFigure && this._parent._figures[b].foundInAssociatedStereotypes(a)) {
			this._parent._figures[b].delAssociatedStereotype(a);
			this.drawStereotype(null);
			if (!this._parent._figures[b]._associatedStereotypes.length) {
				this._parent.delFigure(this._parent._figures[b])
			}
			return true
		}
	}
	return false
};
UMLStereotypedElement.prototype.deleteStereotypeTag = function(a) {
	if (!(a instanceof Stereotype)) {
		return false
	}
	var c = this._parent.getStereotype()._childs;
	var b;
	for (b in c) {
		if (c[b]._text == "\xAB" + a.getName() + "\xBB") {
			c.splice(b, 1);
			break
		}
	}
	this._parent.getStereotype().notifyChange()
};
UMLStereotypedElement.prototype.removeAppliedStereotype = function(a) {
	for (var b = 0; b < this._appliedStereotypes.length; b++) {
		if (a == this._appliedStereotypes[b]) {
			this._appliedStereotypes.splice(b, 1)
		}
		break
	}
};
UMLStereotypedElement.prototype.changeNameStereotype = function(b, a) {
	var e = false;
	for (var c = 0; c < this._appliedStereotypes.length && !e; c++) {
		if (b == this._appliedStereotypes[c]) {
			e = true
		}
	}
	if (e) {
		var d = this._parent.getStereotype()._childs;
		for (c in d) {
			if (d[c]._text == "\xAB" + b.getName() + "\xBB") {
				d[c].setText(a, true);
				break
			}
		}
		this._parent.getStereotype().notifyChange()
	}
};
UMLStereotypedElement.prototype.updateElementStereotypes = function() {
	var a = this._parent.getStereotype()._childs;
	var d = [];
	var e = false;
	for (var c = 0; c < this._appliedStereotypes.length; c++) {
		e = false;
		if (this._appliedStereotypes[c]._validMetaclass(this._parent.getType())) {
			for (var b = 0; b < a.length && !e; b++) {
				if ("\xAB" + this._appliedStereotypes[c].getName() + "\xBB" == a[b]._text) {
					for (k = 0; k < this._appliedStereotypes[c]._components[3]._childs.length; k++) {
						d.push([this._appliedStereotypes[c]._components[3]._childs[k].getNameTagValue(), this._appliedStereotypes[c]._components[3]._childs[k].getDefaultValue()])
					}
					e = true
				}
			}
		}
	}
	var g = this._parent._tagValues;
	c = 0;
	while (g[c]) {
		e = false;
		for (b = 0; b < d.length && !e; b++) {
			if (d[b][0] == g[c][0]) {
				e = true;
				c++
			}
		}
		if (!e) {
			g.splice(c, 1)
		}
	}
	var g = this._parent._tagValues;
	for (c in d) {
		e = false;
		for (b = 0; b < g.length && !e; b++) {
			if (d[c][0] == g[b][0]) {
				e = true
			}
		}
		if (!e) {
			g.push(d[c])
		}
	}
};
UMLStereotypedElement.prototype.showTagValuesDialog = function() {
	var l = this._parent;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var b = document.createElement("form");
	var h = [];
	var e;
	for (e = 0; e < l._tagValues.length; e++) {
		h.push(document.createElement("input"))
	}
	var m = document.createElement("input");
	m.setAttribute("type", "submit");
	m.setAttribute("value", "ok");
	for (e = 0; e < l._tagValues.length; e++) {
		h[e].setAttribute("type", "text");
		h[e].setAttribute("value", l._tagValues[e][1] || "")
	}
	var c = function(q) {
		var p;
		for (p = 0; p < l._tagValues.length; p++) {
			l._tagValues[p][1] = h[p].value
		}
		document.body.removeChild(a)
	};
	var d = function(p) {
		document.body.removeChild(a)
	};
	b.onsubmit = function() {
		return false
	};
	m.addEventListener("click", c, false);
	var n;
	var o;
	var g = [];
	for (e = 0; e < h.length; e++) {
		g.push(l._tagValues[e][0])
	}
	for (e = 0; e < h.length; e++) {
		o = document.createElement("div");
		n = document.createElement("label");
		n.appendChild(document.createTextNode(g[e]));
		o.appendChild(n);
		o.appendChild(h[e]);
		b.appendChild(o)
	}
	b.appendChild(m);
	a.appendChild(b);
	document.body.appendChild(a);
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
UMLStereotypedElement.prototype.showApplyStereotypesDialog = function() {
	var o = this._parent;
	var b = this._stereotypes;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var d = document.createElement("form");
	var n = [];
	var m, l, h;
	var t = [];
	var p = [];
	var r;
	for (m = 0; m < o._components.length; m++) {
		if (o._components[m] instanceof StereotypeFields) {
			p = o._components[m]._childs;
			for (l = 0; l < p.length; l++) {
				if (!n[p[l].getValue()]) {
					n[p[l].getValue()] = o
				}
			}
		}
	}
	if (o instanceof SuperNode) {
		for (m = 0; m < o._nodeChilds.length; m++) {
			for (l = 0; l < o._nodeChilds[m]._components.length; l++) {
				if (o._nodeChilds[m]._components[l] instanceof StereotypeFields) {
					p = o._nodeChilds[m]._components[l]._childs;
					for (h = 0; h < p.length; h++) {
						if (!n[p[h].getValue()]) {
							n[p[h].getValue()] = o._nodeChilds[m]
						}
					}
				}
			}
		}
	}
	for (m = 0; m < b.length; m++) {
		t = b[m]._metaclass;
		for (l = 0; l < t.length; l++) {
			if (t[l].getName() == o.getType()) {
				if (!n["\xAB" + b[m].getName() + "\xBB"]) {
					n["\xAB" + b[m].getName() + "\xBB"] = o
				}
			}
		}
	}
	if (o instanceof SuperNode) {
		for (h = 0; h < o._nodeChilds.length; h++) {
			r = o._nodeChilds[h];
			if (r._stereotypeProperties) {
				for (m = 0; m < r._stereotypeProperties._stereotypes.length; m++) {
					t = r._stereotypeProperties._stereotypes[m]._metaclass;
					for (l = 0; l < t.length; l++) {
						if (t[l].getName() == r.getType()) {
							if (!n["\xAB" + o._stereotypeProperties._stereotypes[m].getName() + "\xBB"]) {
								n["\xAB" + o._stereotypeProperties._stereotypes[m].getName() + "\xBB"] = o._nodeChilds[h]
							}
						}
					}
				}
			}
		}
	}
	var s = false;
	for (m in n) {
		s = true
	}
	if (!s) {
		return
	}
	var e;
	textField = document.createElement("select");
	e = document.createElement("option");
	e.setAttribute("value", "");
	e.appendChild(document.createTextNode("default"));
	textField.appendChild(e);
	for (m in n) {
		e = document.createElement("option");
		e.setAttribute("value", m);
		e.appendChild(document.createTextNode(m));
		textField.appendChild(e)
	}
	var q = document.createElement("input");
	q.setAttribute("type", "submit");
	q.setAttribute("value", "ok");
	var c = function(y) {
		var u = [];
		var z = false;
		var x;
		var w, v;
		for (w in n) {
			if (textField.value == w) {
				x = n[w];
				break
			}
		}
		for (w = 0; w < b.length && !z; w++) {
			if ("\xAB" + b[w].getName() + "\xBB" == textField.value) {
				if (x._stereotypeProperties) {
					x._stereotypeProperties.applyStereotype(b[w])
				}
				z = true
			}
		}
		document.body.removeChild(a)
	};
	var g = function(u) {
		document.body.removeChild(a)
	};
	d.onsubmit = function() {
		return false
	};
	q.addEventListener("click", c, false);
	d.appendChild(textField);
	d.appendChild(q);
	a.appendChild(d);
	document.body.appendChild(a);
	a.style.top = (window.innerHeight - d.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - d.offsetWidth) / 2 + "px"
};
UMLStereotypedElement.prototype.showStereotypesDialog = function() {
	var o = this._parent;
	var b = o._stereotypeProperties._appliedStereotypes;
	var a = document.createElement("div");
	a.className = "ud_popup";
	var d = document.createElement("form");
	var n = [];
	var m, l, h;
	var t = [];
	var p = [];
	var r;
	for (m = 0; m < b.length; m++) {
		if (!n["\xAB" + b[m].getName() + "\xBB"]) {
			n["\xAB" + b[m].getName() + "\xBB"] = o
		}
	}
	if (o instanceof SuperNode) {
		for (h = 0; h < o._nodeChilds.length; h++) {
			r = o._nodeChilds[h];
			if (r._stereotypeProperties) {
				for (m = 0; m < b.length; m++) {
					if (!n["\xAB" + b[m].getName() + "\xBB"]) {
						n["\xAB" + b[m].getName() + "\xBB"] = o._nodeChilds[h]
					}
				}
			}
		}
	}
	var s = false;
	for (m in n) {
		s = true
	}
	if (!s) {
		return
	}
	var e;
	textField = document.createElement("select");
	e = document.createElement("option");
	e.setAttribute("value", "");
	e.appendChild(document.createTextNode("default"));
	textField.appendChild(e);
	for (m in n) {
		e = document.createElement("option");
		e.setAttribute("value", m);
		e.appendChild(document.createTextNode(m));
		if (o._stereotypeProperties._shownStereotype && o._stereotypeProperties._shownStereotype == m) {
			e.setAttribute("selected", "selected")
		}
		textField.appendChild(e)
	}
	var q = document.createElement("input");
	q.setAttribute("type", "submit");
	q.setAttribute("value", "ok");
	var c = function(y) {
		var u = [];
		var z = false;
		var x;
		var w, v;
		for (w in n) {
			if (textField.value == w) {
				x = n[w];
				break
			}
		}
		for (w = 0; w < b.length && !z; w++) {
			if ("\xAB" + b[w].getName() + "\xBB" == textField.value) {
				x._stereotypeProperties.showStereotype(b[w]);
				o._stereotypeProperties._shownStereotype = textField.value;
				z = true
			}
		}
		if (!z) {
			o._stereotypeProperties._shownStereotype = "";
			o._stereotypeProperties.drawStereotype(null)
		}
		document.body.removeChild(a)
	};
	var g = function(u) {
		document.body.removeChild(a)
	};
	d.onsubmit = function() {
		return false
	};
	q.addEventListener("click", c, false);
	d.appendChild(textField);
	d.appendChild(q);
	a.appendChild(d);
	document.body.appendChild(a);
	a.style.top = (window.innerHeight - d.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - d.offsetWidth) / 2 + "px"
};
var setStereotypeProperties = function(a, b) {
	a._stereotypeProperties = new UMLStereotypedElement({
		stereotypes: b,
		parent: a
	})
};
var getStereotypeProperties = function(a) {
	return a._stereotypeProperties
};
var StereotypeTag = function(a) {
	a = a || {};
	StereotypeTag.baseConstructor.call(this, a)
};
JSFun.extend(StereotypeTag, StereotypeItem);
StereotypeTag.prototype.setText = function(d, b) {
	var b = b || false;
	var c;
	var a;
	if (JSFun.isString(d)) {
		if (this._text != d && !b) {
			if (this._parent && this._parent instanceof SuperComponent && this._parent._parent._stereotypeProperties) {
				a = this._parent._parent._stereotypeProperties;
				for (c = 0; c < a._appliedStereotypes.length; c++) {
					if ("\xAB" + a._appliedStereotypes[c].getName() + "\xBB" == this._text) {
						this._parent._parent._stereotypeProperties.removeStereotype(a._appliedStereotypes[c]);
						break
					}
				}
			} else {
				if (this._parent && this._parent._stereotypeProperties) {
					a = this._parent._stereotypeProperties;
					for (c = 0; c < a._appliedStereotypes.length; c++) {
						if ("\xAB" + a._appliedStereotypes[c].getName() + "\xBB" == this._text) {
							a.removeStereotype(a._appliedStereotypes[c]);
							break
						}
					}
				}
			}
		}
		StereotypeTag.base.setText.call(this, d)
	}
};
StereotypeTag.prototype.setValue = function(a) {
	this.setText(a)
};
StereotypeTag.prototype.getComponentXML = function(d) {
	var b = d.createElement("item");
	if (this._id) {
		b.setAttribute("id", this._id)
	}
	b.setAttribute("value", this.getValue());
	var a = this._parent._parent._stereotypeProperties;
	var e = a._stereotypes;
	var c;
	for (c = 0; c < e.length; c++) {
		if ("\xAB" + e[c].getName() + "\xBB" == this.getValue()) {
			b.setAttribute("stereotypeObject", true);
			break
		}
	}
	return b
};
var StereotypeTagList = function(a) {
	a = a || {};
	StereotypeTagList.baseConstructor.call(this, a)
};
JSFun.extend(StereotypeTagList, StereotypeFields);
StereotypeTagList.prototype.notifyDelete = function(c) {
	var b;
	var a = this._parent._stereotypeProperties;
	if (a) {
		for (b = 0; b < a._appliedStereotypes.length; b++) {
			if ("\xAB" + a._appliedStereotypes[b].getName() + "\xBB" == c._text) {
				a.removeStereotype(a._appliedStereotypes[b]);
				break
			}
		}
	}
	this.delSubComponent(c);
	this.updateComponents()
};
StereotypeTagList.prototype.delSubComponent = function(b) {
	var a;
	for (a in this._childs) {
		if (this._childs[a] == b) {
			this._childs.splice(a, 1);
			break
		}
	}
};
StereotypeTagList.prototype.newItem = function() {
	return new StereotypeTag({
		text: "\xABstereotype\xBB",
		orientation: this._orientation || 0
	})
};
StereotypeTagList.prototype.setComponentXML = function(d) {
	var a;
	var c = d.childNodes;
	if (d.getAttribute("visibleSubComponents") == "true") {
		this._visibleSubComponents = true
	} else {
		this._visibleSubComponents = false
	}
	var b;
	var a;
	for (a = 0; a < c.length; a++) {
		if (c[a].getAttribute("stereotypeObject") == "true") {
			b = c[a].getAttribute("value");
			this.applyStereotype(b)
		} else {
			this.addField(c[a].getAttribute("value"))
		}
	}
};
StereotypeTagList.prototype.applyStereotype = function(e) {
	var d = this._parent._stereotypeProperties._stereotypes;
	var c;
	var e;
	var b, a;
	for (a = 0; a < d.length; a++) {
		c = d[a]._metaclass;
		for (b = 0; b < c.length; b++) {
			if (c[b].getName() == this._parent.getType()) {
				if ("\xAB" + d[a].getName() + "\xBB" == e) {
					this._parent._stereotypeProperties.applyStereotype(d[a])
				}
			}
		}
	}
};
var Port = function(a) {
	a = a || {};
	Port.baseConstructor.call(this, a);
	this.setAlone();
	this.setWidth(14);
	this.setHeight(14);
	setStereotypeProperties(this, a.stereotypes || []);
	this.addFigure(new RectangleFigure({
		color: "#eeeeee"
	}));
	this.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	this.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}))
};
JSFun.extend(Port, Rectangular);
Port.prototype.drop = function(a, b) {
	this.correctPosition();
	Port.base.drop.call(this, a, b)
};
Port.prototype.correctPosition = function() {
	if (!this._parent) {
		return
	}
	var b = this._parent.getX();
	var l = this._parent.getY();
	var c = this._parent.getWidth();
	var d = this._parent.getHeight();
	var e = this._parent.getLinkCentered(this.getX() + 7, this.getY() + 7);
	var a = e.getX();
	var g = e.getY();
	this.setPosition(a - 7, g - 7);
	this.updatePositionComponents(a, g)
};
Port.prototype.updatePositionComponents = function(b, d) {
	var a = -1;
	if (b == this._parent.getX()) {
		a = Component.Left
	} else {
		if (b == this._parent.getX() + this._parent.getWidth()) {
			a = Component.Right
		} else {
			if (d == this._parent.getY()) {
				a = Component.Top
			} else {
				if (d == this._parent.getY() + this._parent.getHeight()) {
					a = Component.Bottom
				}
			}
		}
	}
	for (var c = 0; c < this._components.length; c++) {
		this._components[c]._setPosition(a)
	}
	this.updateComponents()
};
Port.prototype.notifyChange = function() {
	var a;
	for (a in this._relations) {
		this._relations[a].notifyChange()
	}
	this.correctPosition()
};
Port.prototype.remove = function() {
	Port.base.remove.call(this);
	this._parent.notifyDeleted(this)
};
Port.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Port.prototype.getName = function() {
	return this._components[1].getValue()
};
Port.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Port.prototype.getStereotype = function() {
	return this._components[0]
};
Port.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var NodeAction = function(a) {
	a = a || {};
	NodeAction.baseConstructor.call(this, a);
	this._ports = []
};
JSFun.extend(NodeAction, Node);
NodeAction.prototype.addPort = function(a) {
	if (a instanceof Pin) {
		this._ports.push(a);
		this._diagram._addNode(a);
		if (this._container) {
			a.setParent(this)
		} else {
			a.setAction(this)
		}
		a.correctPosition()
	}
};
NodeAction.prototype.setSelectedFigure = function(b) {
	var a = NodePorts.base.setSelectedFigure.call(this, b);
	if (a) {
		if (this._figures[b] instanceof FromImageFigure) {
			for (i in this._ports) {
				this._ports[i].setVisibility(false)
			}
		} else {
			for (i in this._ports) {
				this._ports[i].setVisibility(true)
			}
		}
	}
};
NodeAction.prototype.setVisibility = function(a) {
	NodePorts.base.setVisibility.call(this, a);
	var b = true;
	if (this._selectedFigure && a) {
		b = false
	}
	if (this._container && b) {
		for (i in this._ports) {
			this._ports[i].setVisibility(a)
		}
	}
};
NodeAction.prototype.updatePosition = function(c, a, h) {
	h = h || false;
	if (c == undefined && a == undefined) {
		var e = this.getMovement();
		var g = e.getX();
		var d = e.getY()
	} else {
		var g = c;
		var d = a
	}
	var b;
	for (b in this._ports) {
		this._ports[b].updatePosition(g, d, h)
	}
	NodeAction.base.updatePosition.call(this, c, a, h)
};
NodeAction.prototype.notifyChange = function() {
	NodeAction.base.notifyChange.call(this);
	var a;
	for (a in this._ports) {
		this._ports[a].correctPosition();
		this._ports[a].notifyChange()
	}
};
NodeAction.prototype.updateContainer = function(a) {
	NodeAction.base.updateContainer.call(this, a);
	for (i in this._ports) {
		this._ports[i].correctPosition();
		this._ports[i].notifyChange()
	}
};
NodeAction.prototype.remove = function() {
	NodeAction.base.remove.call(this);
	var a;
	for (a in this._ports) {
		this._ports[a].remove()
	}
};
NodeAction.prototype.getElementXML = function(b) {
	var c = NodeAction.base.getElementXML.call(this, b);
	var a;
	for (a in this._ports) {
		c.appendChild(this._ports[a].getElementXML(b))
	}
	return c
};
NodeAction.prototype.addChild = function(a) {
	if (a instanceof Pin) {
		this._ports.push(a);
		if (this._container) {
			a.setParent(this)
		} else {
			a.setAction(this)
		}
		a.correctPosition();
		return
	} else {
		NodeAction.base.addChild.call(this, a)
	}
};
NodeAction.prototype.notifyDeleted = function(b) {
	if (b instanceof Pin) {
		var a;
		for (a in this._ports) {
			if (this._ports[a] == b) {
				this._ports.splice(a, 1)
			}
		}
	} else {
		NodeAction.base.notifyDeleted.call(this, b)
	}
};
NodeAction.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
NodeAction.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
NodeAction.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
NodeAction.prototype.getName = function() {
	return this._components[1].getValue()
};
NodeAction.prototype.getStereotype = function() {
	return this._components[0]
};
NodeAction.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var NodeForkJoin = function(a) {
	a = a || {};
	NodeForkJoin.baseConstructor.call(this, a);
	this._quadrant = 1
};
JSFun.extend(NodeForkJoin, Rectangular);
NodeForkJoin.prototype.getElementXML = function(b) {
	var c = b.createElement(this.getType());
	c.setAttribute("id", this.getId());
	c.setAttribute("x", this.getX());
	c.setAttribute("y", this.getY());
	c.setAttribute("width", this.getWidth());
	c.setAttribute("height", this.getHeight());
	c.setAttribute("backgroundColor", this.getBackgroundColor());
	c.setAttribute("quadrant", this._quadrant);
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
NodeForkJoin.prototype.setElementXML = function(d) {
	this.setPosition(parseInt(d.getAttribute("x")), parseInt(d.getAttribute("y")));
	this.resetMovement();
	this._width = parseInt(d.getAttribute("width"));
	this._height = parseInt(d.getAttribute("height"));
	this.setBackgroundColor(d.getAttribute("backgroundColor"));
	if (parseInt(d.getAttribute("quadrant")) != this._quadrant) {
		this._minWidth = 5;
		this._minHeight = 50;
		this._quadrant = parseInt(d.getAttribute("quadrant"))
	}
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
NodeForkJoin.prototype.setQuadrant = function(c) {
	if (this._quadrant != c) {
		var g = this._height;
		var a = this._width;
		var d = this._minHeight;
		var b = this._minWidth;
		this.setMinHeight(b);
		this.setMinWidth(d);
		this.setHeight(a);
		this.setWidth(g);
		for (var e = this._relations.length; e--;) {
			this._relations[e].exchangePosition()
		}
		this._quadrant = c
	}
};
NodeForkJoin.prototype.drag = function(a, g) {
	if (this._resizing) {
		var e = this._x;
		var c = this._y;
		if (a > e && g > c) {
			if (Math.abs(a - e) > Math.abs(g - c)) {
				if (this._quadrant != 1) {
					this.setQuadrant(1)
				} else {
					var d = a - this._x;
					d = Math.round(d);
					d = d - d % 5;
					this.setWidth(d)
				}
			} else {
				if (this._quadrant != 2) {
					this.setQuadrant(2)
				} else {
					var b = g - this._y;
					b = Math.round(b);
					b = b - b % 5;
					this.setHeight(b)
				}
			}
		} else {
			if (this._quadrant == 1) {
				var d = a - this._x;
				d = Math.round(d);
				d = d - d % 5;
				this.setWidth(d)
			} else {
				var b = g - this._y;
				b = Math.round(b);
				b = b - b % 5;
				this.setHeight(b)
			}
		}
	} else {
		if (this._selected) {
			var d = a - this._relx;
			var b = g - this._rely;
			d = Math.round(d);
			d = d - d % 5;
			b = Math.round(b);
			b = b - b % 5;
			this.setPosition(d, b);
			this._moved = true
		}
	}
};
NodeForkJoin.prototype.updateLimitSize = function() {
	var c;
	var b = this._relations;
	var a = 40;
	if (this._quadrant == 1) {
		for (c = b.length; c--;) {
			if (b[c]._x > a) {
				a = b[c]._x
			}
		}
		this.setMinWidth(a + 10)
	} else {
		for (c = b.length; c--;) {
			if (b[c]._y > a) {
				a = b[c]._y
			}
		}
		this.setMinHeight(a + 10)
	}
};
NodeForkJoin.prototype.notifyDeleted = function(a) {
	var b;
	for (b in this._relations) {
		if (this._relations[b] == a) {
			this._relations.splice(b, 1)
		}
	}
	this.updateLimitSize()
};
var ObjectActivity = function(a) {
	a = a || {};
	ObjectActivity.baseConstructor.call(this, a)
};
JSFun.extend(ObjectActivity, Rectangular);
ObjectActivity.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
ObjectActivity.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
ObjectActivity.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
ObjectActivity.prototype.getName = function() {
	return this._components[1].getValue()
};
ObjectActivity.prototype.getStereotype = function() {
	return this._components[0]
};
ObjectActivity.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var ParameterNode = function(a) {
	a = a || {};
	ParameterNode.baseConstructor.call(this, a);
	this.setWidth(60);
	this.setHeight(30)
};
JSFun.extend(ParameterNode, Pin);
ParameterNode.prototype.correctPosition = function() {
	if (!this._parent) {
		return
	}
	var b = this._parent.getX();
	var l = this._parent.getY();
	var c = this._parent.getWidth();
	var d = this._parent.getHeight();
	var e = this._parent.getLinkCentered(this.getX() + this._width / 2, this.getY() + this._height / 2);
	var a = e.getX();
	var g = e.getY();
	this.setPosition(a - this._width / 2, g - this._height / 2)
};
var SendSignalAction = function(a) {
	a = a || {};
	SendSignalAction.baseConstructor.call(this, a)
};
JSFun.extend(SendSignalAction, Rectangular);
SendSignalAction.prototype.getLinkCentered = function(n, l) {
	if (this._selectedFigure) {
		return SendSignalAction.base.getLinkCentered.call(this, n, l)
	}
	if (n instanceof Point) {
		l = n.getY();
		n = n.getX()
	}
	var h = this.getCentralPoint();
	var d = h.getX();
	var c = h.getY();
	var a, o, g, e;
	var b;
	a = this.getX();
	o = this.getY();
	g = h.getX();
	e = this.getY();
	if (n < d) {
		if (l < c) {
			b = (this.getY() - c) / (this.getX() - d);
			if (((l - c) == 0) || Math.abs((l - c) / (n - d)) < Math.abs(b)) {
				g = this.getX();
				e = this.getY() + this.getHeight()
			} else {
				g = this.getX() + this.getWidth();
				e = this.getY()
			}
		} else {
			b = (this.getY() + this.getHeight() - c) / (this.getX() - d);
			if (((l - c) == 0) || Math.abs((l - c) / (n - d)) < Math.abs(b)) {
				g = this.getX();
				e = this.getY() + this.getHeight()
			} else {
				o = this.getY() + this.getHeight();
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			}
		}
	} else {
		if (l < c) {
			b = (this.getY() - c) / (this.getX() + this.getWidth() - 25 - d);
			if (((l - c) == 0) || ((l - c) / (n - d)) < b) {
				g = this.getX() + this.getWidth();
				e = this.getY()
			} else {
				a = this.getX() + this.getWidth() - 25;
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight() / 2
			}
		} else {
			b = (this.getY() + this.getHeight() - c) / (this.getX() + this.getWidth() - 25 - d);
			if (((l - c) == 0) || ((l - c) / (n - d)) < b) {
				a = this.getX() + this.getWidth();
				o = this.getY() + this.getHeight() / 2;
				g = this.getX() + this.getWidth() - 25;
				e = this.getY() + this.getHeight()
			} else {
				o = this.getY() + this.getHeight();
				g = this.getX() + this.getWidth() - 25;
				e = this.getY() + this.getHeight()
			}
		}
	}
	return JSGraphic.lineIntersection(a, o, g, e, n, l, h.getX(), h.getY())
};
SendSignalAction.prototype.calculateSize = function() {
	if (this._selectedFigure) {
		SendSignalAction.base.calculateSize.call(this);
		return
	}
	if (this._components.length > 0) {
		var a;
		var d = 0;
		var c = 0;
		var b;
		for (b in this._components) {
			a = this._components[b];
			if (a.getPosition() == Component.Float || a.getPosition() == Component.BottomLeft || a.getPosition() == Component.BottomRight) {
				c += a.getHeight();
				if (a.getWidth() > d) {
					d = a.getWidth()
				}
			}
		}
		if (this._container) {
			if (c > this._minHeight) {
				this.setMinHeight(c)
			}
			if (d > this._minWidth) {
				this.setMinWidth(d + 25)
			}
		} else {
			if (c > 0) {
				this.setMinHeight(c)
			}
			if (d > 0) {
				this.setMinWidth(d + 25)
			}
		}
	}
};
SendSignalAction.prototype.updateComponents = function() {
	if (this._components.length > 0) {
		this.calculateSize();
		this.insertComponents(this._x, this._y, this._width - 25, this._height);
		var a;
		for (a in this._relations) {
			this._relations[a].notifyChange()
		}
	}
};
SendSignalAction.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
SendSignalAction.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
SendSignalAction.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
SendSignalAction.prototype.getName = function() {
	return this._components[1].getValue()
};
SendSignalAction.prototype.getStereotype = function() {
	return this._components[0]
};
SendSignalAction.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var SwimlaneLine = function(a) {
	a = a || {};
	SwimlaneLine.baseConstructor.call(this, a)
};
JSFun.extend(SwimlaneLine, RegionLine);
SwimlaneLine.prototype.draw = function(a) {
	a.save();
	a.beginPath();
	if (this._orientation) {
		a.lineWidth = this._width;
		a.moveTo(this.getPixelX(), this.getPixelY());
		a.lineTo(this.getPixelX(), this.getPixelY() + this.getHeight())
	} else {
		a.lineWidth = this._height;
		a.moveTo(this.getPixelX(), this.getPixelY());
		a.lineTo(this.getPixelX() + this.getWidth(), this.getPixelY())
	}
	a.stroke();
	a.restore()
};
SwimlaneLine.prototype.drawShape = function(d) {
	var b;
	var e;
	d.save();
	d.strokeStyle = "#aaaaaa";
	if (this._parent.getParent()._orientation) {
		d.strokeRect(this.getPixelX() - 2, this.getPixelY(), this.getWidth() + 4, this.getHeight())
	} else {
		d.strokeRect(this.getPixelX(), this.getPixelY() - 4, this.getWidth(), this.getHeight() + 6)
	}
	d.restore();
	d.save();
	d.fillStyle = "#ff0000";
	d.beginPath();
	if (this._parent.getParent()._orientation) {
		d.arc(this._parent.getX() + this._parent.getWidth() - 10, this._parent.getY() + this._parent._heightComp + 7, 4, 0, Math.PI * 2, true)
	} else {
		d.arc(this._parent.getX() + this._parent._widthComp + 7, this._parent.getY() + this._parent.getHeight() - 10, 4, 0, Math.PI * 2, true)
	}
	d.closePath();
	d.fill();
	d.restore();
	var a = this._parent.getParent()._nodeChilds;
	for (var c = 0; c < a.length; c++) {
		if (a[c] == this._parent) {
			break
		}
	}
	d.save();
	d.fillStyle = "#ff0000";
	d.beginPath();
	if (this._parent.getParent()._orientation) {
		d.arc(a[c + 1].getX() + a[c + 1].getWidth() - 10, a[c + 1].getY() + a[c + 1]._heightComp + 7, 4, 0, Math.PI * 2, true)
	} else {
		d.arc(a[c + 1].getX() + a[c + 1]._widthComp + 7, a[c + 1].getY() + a[c + 1].getHeight() - 10, 4, 0, Math.PI * 2, true)
	}
	d.closePath();
	d.fill();
	d.restore()
};
var Swimlane = function(a) {
	a = a || {};
	Swimlane.baseConstructor.call(this, a);
	this._type = "Swimlane"
};
JSFun.extend(Swimlane, Region);
Swimlane.prototype.addComponents = function(g) {
	var g = (JSFun.isBoolean(g)) ? g : true;
	var d = this._parent._nodeChilds;
	var b = d.length;
	var c;
	if (b == 0) {
		if (this._parent._orientation) {
			this.setWidth(this._parent._width)
		} else {
			this.setHeight(this._parent._height)
		}
	}
	if (this._parent._orientation) {
		if (b > 0 && g) {
			d[b - 1].setWidth(d[b - 1].getWidth() / 2);
			this._x = d[b - 1].getX() + d[b - 1].getWidth();
			this.setWidth(this._parent.getX() + this._parent.getWidth() - this._x)
		}
		this.addComponent(new StereotypeFields({
			id: "stereotypes",
			centered: true
		}));
		this.addComponent(new TextBox({
			id: "name",
			centered: true,
			margin: 4
		}));
		if (b > 0) {
			var e = 2.5;
			if (this._parent instanceof HierarchicalSwimlane) {
				var a = this._parent.getHeight() - this._parent._components[0]._height - this._parent._components[1]._height
			} else {
				var a = this._parent.getHeight()
			}
			d[b - 1].addComponent(new SwimlaneLine({
				id: "region",
				margin: 0,
				width: e,
				height: a,
				position: Component.TopRight,
				orientation: 1
			}))
		}
	} else {
		if (b > 0 && g) {
			d[b - 1].setHeight(d[b - 1].getHeight() / 2);
			this._y = d[b - 1].getY() + d[b - 1].getHeight();
			this.setHeight(this._parent.getY() + this._parent.getHeight() - this._y)
		}
		this.addComponent(new StereotypeFields({
			id: "stereotypes",
			centered: true,
			orientation: 1
		}));
		this.addComponent(new TextBox({
			id: "name",
			centered: true,
			margin: 4,
			orientation: 1
		}));
		if (b > 0) {
			var a = 2.5;
			if (this._parent instanceof HierarchicalSwimlane) {
				var e = this._parent.getWidth() - this._parent._components[0]._width - this._parent._components[1]._width
			} else {
				var e = this._parent.getWidth()
			}
			d[b - 1].addComponent(new SwimlaneLine({
				id: "region",
				margin: 0,
				width: e,
				height: a,
				position: Component.BottomLeft,
				orientation: 0
			}))
		}
	}
};
Swimlane.prototype.notifyChange = function() {
	if (this._parent._orientation) {
		this._heightComp = this._components[0]._height + this._components[1]._height;
		this._widthComp = 0
	} else {
		this._heightComp = 0;
		this._widthComp = this._components[0]._width + this._components[1]._width
	}
	this._parent.updateSizeComponentSwimlane();
	Swimlane.base.notifyChange.call(this)
};
Swimlane.prototype.updateContainer = function(e) {
	if (!(e == false || e == true)) {
		e = true
	}
	if (this._container) {
		var o;
		this._widthComp = this._widthComp || 0;
		this._heightComp = this._heightComp || 0;
		var g = this._x + this._widthComp;
		var d = this._y + this._heightComp;
		var c = this._x + this._widthComp;
		var b = this._y + this._heightComp;
		var h;
		var r, q, p, n;
		for (o in this._nodeChilds) {
			h = this._nodeChilds[o];
			if (h._visible) {
				p = h._x;
				n = h._y;
				r = h._x + h._width;
				q = h._y + h._height;
				if (r > c) {
					c = r
				}
				if (q > b) {
					b = q
				}
				if (p < g) {
					g = p
				}
				if (n < d) {
					d = n
				}
			}
		}
		for (o = this._components.length; o--;) {
			if (this._components[o] instanceof RegionLine) {
				break
			}
		}
		if (o != -1) {
			if (this.getParent()._orientation) {
				c += this._components[o]._width + 2
			} else {
				b += this._components[o]._height + 2
			}
		}
		var l = -1;
		var s = -1;
		if (this.getParent()._orientation) {
			if ((g < this._x) || (c > (this._x + this._width))) {
				var m;
				for (o = 0; o < this.getParent()._nodeChilds.length; o++) {
					var t = this.getParent()._nodeChilds[o];
					if ((t.getX() + t.getWidth()) > g) {
						if (l == -1) {
							l = o
						}
					}
					if ((t.getX()) < c) {
						s = o
					}
				}
				if ((l != -1) && (g < this._x)) {
					m = this._x - g + this.getParent().getWidth();
					this.getParent()._x = this.getParent()._x - (this._x - g);
					this.getParent().setWidth(m)
				}
				if (c > (this._x + this._width)) {
					m = c - this._x - this._width + this.getParent().getWidth();
					this.getParent().setWidth(m)
				}
			}
		} else {
			if ((d < this._y) || (b > (this._y + this._height))) {
				for (o = 0; o < this.getParent()._nodeChilds.length; o++) {
					var t = this.getParent()._nodeChilds[o];
					if ((t.getY() + t.getHeight()) > d) {
						if (l == -1) {
							l = o
						}
					}
					if ((t.getY()) < b) {
						s = o
					}
				}
				var a;
				if ((l != -1) && (d < this._y)) {
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
		if (g < (this._x + this._widthComp) || d < (this._y + this._heightComp)) {
			this.setWidth(this._x + this._widthComp - g + this._width);
			this.setHeight(this._y + this._heightComp - d + this._height);
			this._x = g - this._widthComp;
			this._y = d - this._heightComp;
			this.setMinWidth(c - this._x);
			this.setMinHeight(b - this._y)
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
Swimlane.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	Swimlane.base.draw.call(this, a);
	a.save();
	a.lineWidth = 2.5;
	a.strokeStyle = ComponentStyle.component_color;
	a.beginPath();
	if (this._parent._orientation) {
		a.moveTo(this._x, this._y + this._heightComp);
		a.lineTo(this._x + this._width, this._y + this._heightComp)
	} else {
		a.moveTo(this._x + this._widthComp, this._y);
		a.lineTo(this._x + this._widthComp, this._y + this._height)
	}
	a.closePath();
	a.stroke();
	a.restore()
};
Swimlane.prototype.getElementXML = function(a) {
	var b = Swimlane.base.getElementXML.call(this, a);
	b.setAttribute("widthComp", this._widthComp);
	b.setAttribute("heightComp", this._heightComp);
	return b
};
Swimlane.prototype.setElementXML = function(a) {
	Swimlane.base.setElementXML.call(this, a);
	this._widthComp = parseInt(a.getAttribute("widthComp"));
	this._heightComp = parseInt(a.getAttribute("heightComp"))
};
Swimlane.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Swimlane.prototype.setName = function(a) {
	if (this._components[1]) {
		this._components[1].setValue(a)
	}
};
Swimlane.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Swimlane.prototype.getName = function() {
	return this._components[1].getValue()
};
Swimlane.prototype.getStereotype = function() {
	return this._components[0]
};
Swimlane.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var SwimlaneItem = function(a) {
	a = a || {};
	SwimlaneItem.baseConstructor.call(this, a)
};
JSFun.extend(SwimlaneItem, RegionItem);
SwimlaneItem.prototype.createRegion = function() {
	var b = this.getParent()._components.length;
	if (this.getParent()._orientation) {
		if (this._parent instanceof HierarchicalSwimlane) {
			var a = this.getParent()._components[0]._height + this.getParent()._components[1]._height
		} else {
			var a = 0
		}
		this.getParent().addRegion(new Swimlane({
			parent: this.getParent(),
			y: this.getParent().getY() + a,
			x: this.getParent().getX()
		}))
	} else {
		if (this._parent instanceof HierarchicalSwimlane) {
			var c = this.getParent()._components[0]._width + this.getParent()._components[1]._width
		} else {
			var c = 0
		}
		this.getParent().addRegion(new Swimlane({
			parent: this.getParent(),
			y: this.getParent()._components[b - 1]._getY(),
			x: this.getParent().getX() + c
		}))
	}
};
var TimeEvent = function(a) {
	a = a || {};
	TimeEvent.baseConstructor.call(this, a)
};
JSFun.extend(TimeEvent, Rectangular);
TimeEvent.prototype.getLinkCentered = function(n, l) {
	if (this._selectedFigure) {
		return TimeEvent.base.getLinkCentered.call(this, n, l)
	}
	if (n instanceof Point) {
		l = n.getY();
		n = n.getX()
	}
	var h = this.getCentralPoint();
	var d = h.getX();
	var c = h.getY();
	var a, o, g, e;
	var b;
	a = this.getX();
	o = this.getY();
	g = h.getX();
	e = this.getY();
	if (n < d) {
		if (l < c) {
			b = (this.getY() - c) / (this.getX() - d);
			if (((l - c) == 0) || Math.abs((l - c) / (n - d)) < Math.abs(b)) {
				g = this.getX() + this.getWidth() / 2 - 2;
				e = this.getY() + this.getHeight() / 2
			} else {
				g = this.getX() + this.getWidth();
				e = this.getY()
			}
		} else {
			b = (this.getY() + this.getHeight() - c) / (this.getX() - d);
			if (((l - c) == 0) || Math.abs((l - c) / (n - d)) < Math.abs(b)) {
				a = this.getX() + this.getWidth() / 2 - 2;
				o = this.getY() + this.getHeight() / 2;
				g = this.getX();
				e = this.getY() + this.getHeight()
			} else {
				o = this.getY() + this.getHeight();
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			}
		}
	} else {
		if (l < c) {
			b = (this.getY() - c) / (this.getX() + this.getWidth() - d);
			if (((l - c) == 0) || ((l - c) / (n - d)) < b) {
				g = this.getX() + this.getWidth();
				e = this.getY()
			} else {
				a = this.getX() + this.getWidth();
				g = this.getX() + this.getWidth() / 2 + 2;
				e = this.getY() + this.getHeight() / 2
			}
		} else {
			b = (this.getY() + this.getHeight() - c) / (this.getX() + this.getWidth() - d);
			if (((l - c) == 0) || ((l - c) / (n - d)) < b) {
				a = this.getX() + this.getWidth() / 2 + 2;
				o = this.getY() + this.getHeight() / 2;
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			} else {
				o = this.getY() + this.getHeight();
				g = this.getX() + this.getWidth();
				e = this.getY() + this.getHeight()
			}
		}
	}
	return JSGraphic.lineIntersection(a, o, g, e, n, l, h.getX(), h.getY())
};
TimeEvent.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
TimeEvent.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
TimeEvent.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
TimeEvent.prototype.getName = function() {
	return this._components[1].getValue()
};
TimeEvent.prototype.getStereotype = function() {
	return this._components[0]
};
TimeEvent.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UnhierarchicalSwimlane = function(a) {
	a = a || {};
	UnhierarchicalSwimlane.baseConstructor.call(this, a)
};
JSFun.extend(UnhierarchicalSwimlane, SuperNode);
UnhierarchicalSwimlane.prototype.deleteRegion = function(d) {
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
UnhierarchicalSwimlane.prototype.notifyChange = function(c, a, b) {
	c = c || false;
	a = a || false;
	b = b || false;
	this.resetSizeComponentSwimlane();
	this.updateSizeComponentSwimlane();
	UnhierarchicalSwimlane.base.notifyChange.call(this, c, a, b)
};
UnhierarchicalSwimlane.prototype.resetSizeComponentSwimlane = function() {
	var a = this._nodeChilds;
	for (var b = 0; b < a.length; b++) {
		a[b]._heightComp = (this._orientation) ? (a[b]._components[0]._height + a[b]._components[1]._height) : 0;
		a[b]._widthComp = (this._orientation) ? 0 : (a[b]._components[0]._width + a[b]._components[1]._width)
	}
};
UnhierarchicalSwimlane.prototype.updateSizeComponentSwimlane = function() {
	var b = this._nodeChilds;
	if (this._orientation) {
		var a = 0;
		for (var c = 0; c < b.length; c++) {
			if (b[c]._heightComp > a) {
				a = b[c]._heightComp
			}
		}
		for (var c = 0; c < b.length; c++) {
			b[c]._heightComp = a
		}
	} else {
		var a = 0;
		for (var c = 0; c < b.length; c++) {
			if (b[c]._widthComp > a) {
				a = b[c]._widthComp
			}
		}
		for (var c = 0; c < b.length; c++) {
			b[c]._widthComp = a
		}
	}
};
UnhierarchicalSwimlane.prototype.updateRegions = function(b, l) {
	b = b || false;
	l = l || false;
	var e = this._nodeChilds.length;
	if (this._orientation) {
		var a = 0;
		var h = this.getX();
		for (var c = 0; c < e; c++) {
			var o = this._nodeChilds[c];
			o.setMinHeight(this._minHeight);
			o.setHeight(this.getHeight());
			if (o._components[2] instanceof RegionLine) {
				o._components[2].setHeight(this.getHeight())
			}
		}
		for (c = 0; c < e; c++) {
			this._nodeChilds[c]._x = h;
			this._nodeChilds[c]._y = this.getY();
			if (c == e - 1) {
				if (b || (h + this._nodeChilds[c]._width) < (this.getWidth() + this.getX())) {
					this._nodeChilds[c].setWidth(this.getWidth() + this.getX() - h)
				} else {
					this.setWidth(h + this._nodeChilds[c]._width - this.getX())
				}
			}
			h += this._nodeChilds[c].getWidth()
		}
		for (c = 0; c < e; c++) {
			var n = this._nodeChilds[c]._x - this._nodeChilds[c]._prex;
			if (n > 0 || (n < 0 && !l)) {
				for (var d = 0; d < this._nodeChilds[c]._nodeChilds.length; d++) {
					this._nodeChilds[c]._nodeChilds[d].updatePosition(n, 0, true)
				}
			}
			this._nodeChilds[c].resetMovement()
		}
	} else {
		var m = 0;
		var g = this.getY();
		for (var c = 0; c < e; c++) {
			var o = this._nodeChilds[c];
			o.setMinWidth(this._minWidth);
			o.setWidth(this.getWidth());
			if (o._components[2] instanceof RegionLine) {
				o._components[2].setWidth(this.getWidth())
			}
		}
		for (c = 0; c < e; c++) {
			this._nodeChilds[c]._x = this.getX();
			this._nodeChilds[c]._y = g;
			if (c == e - 1) {
				if (b || (g + this._nodeChilds[c]._height) < (this.getHeight() + this.getY())) {
					this._nodeChilds[c].setHeight(this.getHeight() + this.getY() - g)
				} else {
					this.setHeight(g + this._nodeChilds[c]._height - this.getY())
				}
			}
			g += this._nodeChilds[c].getHeight()
		}
		for (c = 0; c < e; c++) {
			var n = this._nodeChilds[c]._y - this._nodeChilds[c]._prey;
			if (n > 0 || (n < 0 && !l)) {
				for (var d = 0; d < this._nodeChilds[c]._nodeChilds.length; d++) {
					this._nodeChilds[c]._nodeChilds[d].updatePosition(0, n, true)
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
UnhierarchicalSwimlane.prototype.select = function(m, l) {
	var c;
	var h = -1;
	this.deselectComponent();
	for (c = 0; c < this._nodeChilds.length; c++) {
		if (this._nodeChilds[c]._selected) {
			h = c
		}
		this._nodeChilds[c].deselect()
	}
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouse == true) {
		if (this._selected) {
			if (this._moveable && Math.abs(m - (this._x + this._width + 2.5)) <= 5 && Math.abs(l - (this._y + this._height + 2.5)) <= 5) {
				this._resizing = true;
				return true
			}
			var a = this._nodeChilds;
			for (c = 0; c < a.length - 1; c++) {
				if (c == h) {
					if (this._orientation) {
						var o = a[c].getX() + a[c].getWidth() - 7;
						var g = a[c].getY() + a[c]._heightComp + 7;
						var n = a[c + 1].getX() + a[c + 1].getWidth() - 7;
						var d = a[c + 1].getY() + a[c + 1]._heightComp + 7
					} else {
						var b = a[c]._components[0]._width + a[c]._components[1]._width;
						var o = a[c].getX() + a[c]._widthComp + 7;
						var g = a[c].getY() + a[c].getHeight() - 7;
						var n = a[c + 1].getX() + a[c + 1]._widthComp + 7;
						var d = a[c + 1].getY() + a[c + 1].getHeight() - 7
					}
					var e = this;
					var q = new Dialog({
						text: "Do you want to delete the region?",
						cancelable: true
					});
					if (Math.abs(m - (o)) <= 8 && Math.abs(l - (g)) <= 8) {
						this._diagram._pressMouse = false;
						q.show(function() {
							e.deleteRegion(a[c])
						});
						return true
					}
					if (Math.abs(m - (n)) <= 8 && Math.abs(l - (d)) <= 8) {
						this._diagram._pressMouse = false;
						q.show(function() {
							e.deleteRegion(a[c + 1])
						});
						return true
					}
				}
			}
			for (c = 0; c < this._nodeChilds.length; c++) {
				var p = this._nodeChilds[c];
				if (p.isOverComponent(m, l)) {
					if (p.isOverRegionLine(m, l)) {
						p.selectComponent(m, l)
					} else {
						this._relx = m - this._x;
						this._rely = l - this._y;
						this._selectedBefore = true
					}
					return true
				}
			}
			if (this.isOverComponent(m, l)) {
				this._relx = m - this._x;
				this._rely = l - this._y;
				this._selectedBefore = true;
				return true
			}
		}
		if (this.isOver(m, l)) {
			this._relx = m - this._x;
			this._rely = l - this._y;
			this._selectedBefore = this._selected;
			this._selected = true;
			return true
		} else {
			return false
		}
	} else {
		if (this._diagram._pressMouseRight == true) {
			if (this.isOver(m, l)) {
				document.oncontextmenu = function() {
					return false
				};
				m = m + this._diagram._div.offsetLeft;
				l = l + this._diagram._div.offsetTop;
				this.showContextualMenu(m, l);
				return true
			} else {
				return false
			}
		}
	}
};
UnhierarchicalSwimlane.prototype.updateContainer = function(e) {
	if (!(e == false || e == true)) {
		e = true
	}
	if (this._container) {
		var m;
		var g = this._x;
		var d = this._y;
		var c = this._x;
		var b = this._y;
		var l;
		var p, a, n, h;
		var o = this._nodeChilds.length;
		for (m = 0; m < o; m++) {
			l = this._nodeChilds[m];
			if (this._orientation) {
				n = l._x;
				elemLeftY = l._y;
				if (m == (o - 1)) {
					p = l._x + l._minWidth
				} else {
					p = l._x + l._width
				}
				elemRigthY = l._y + l._minHeight
			} else {
				n = l._x;
				elemLeftY = l._y;
				p = l._x + l._minWidth;
				if (m == (o - 1)) {
					elemRigthY = l._y + l._minHeight
				} else {
					elemRigthY = l._y + l._height
				}
				p = l._x + l._minWidth
			}
			if (p > c) {
				c = p
			}
			if (elemRigthY > b) {
				b = elemRigthY
			}
			if (n < g) {
				g = n
			}
			if (elemLeftY < d) {
				d = elemLeftY
			}
		}
		if (g < this._x || d < this._y) {
			this.setWidth(this._x - g + this._width);
			this.setHeight(this._y - d + this._height);
			this._x = g;
			this._y = d;
			this.setMinWidth(c - this._x);
			this.setMinHeight(b - this._y)
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
var UMLActivityDiagram = function(b) {
	var a = new ActivityDiagram(b);
	a.setType("UMLActivityDiagram");
	a.setName("Activity diagram");
	a.setValidElements(["UMLAcceptEventAction", "UMLTimeEvent", "UMLAction", "UMLObject", "UMLActivity", "UMLFlow", "UMLActivityFinal", "UMLInitialNode", "UMLFlowFinal", "UMLDecision_MergeNode", "UMLDataStore", "UMLFork_JoinNode", "UMLSendSignalAction", "UMLConnectorActivity", "UMLHorizontalSwimlane", "UMLVerticalSwimlane", "UMLVerticalSwimlane", "UMLHorizontalHierarchicalSwimlane", "UMLVerticalHierarchicalSwimlane", "UMLExceptionHandler", "Region", "Swimlane", "UMLPin", "UMLParameterNode", "UMLExpansionNode", "UMLNote", "UMLLine"]);
	return a
};
var UMLAcceptEventAction = function(b) {
	var b = b || {};
	var a = new AcceptEventAction(b);
	a.setType("UMLAcceptEventAction");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(100);
	a.setHeight(55);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new AcceptEventActionFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLTimeEvent = function(b) {
	var b = b || {};
	var a = new TimeEvent(b);
	a.setType("UMLTimeEvent");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(40);
	a.setHeight(50);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.addFigure(new TimeEventFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLAction = function(b) {
	var b = b || {};
	var a = new NodeAction(b);
	a.setType("UMLAction");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(50);
	a.setMoveable();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new RoundedRectangleFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLActivity = function(b) {
	var b = b || {};
	var a = new NodeAction(b);
	a.setType("UMLActivity");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(50);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new RoundedRectangleFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLDataStore = function(b) {
	var b = b || {};
	var a = new DataStore(b);
	a.setType("UMLDataStore");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(50);
	a.setMoveable();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new Text({
		centered: true,
		text: "\xABdatastore\xBB",
		margin: 1
	}));
	a.addComponent(new DataStoreItem({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLPin = function(b) {
	var b = b || {};
	var a = new Pin(b);
	a.setType("UMLPin");
	setStereotypeProperties(a, b.stereotypes || []);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLParameterNode = function(b) {
	var b = b || {};
	var a = new ParameterNode(b);
	a.setType("UMLParameterNode");
	a.setMoveable();
	setStereotypeProperties(a, b.stereotypes || []);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLExpansionNode = function(b) {
	var b = b || {};
	var a = new ExpansionNode(b);
	a.setType("UMLExpansionNode");
	setStereotypeProperties(a, b.stereotypes || []);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.addFigure(new ExpansionNodeFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLObject = function(b) {
	var b = b || {};
	var a = new ObjectActivity(b);
	a.setType("UMLObject");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(50);
	a.setMoveable();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new ObjectItem({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLFlow = function(b) {
	var a = new Flow(b);
	a.setType("UMLFlow");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLActivityFinal = function(b) {
	var a = new Elliptical(b);
	a.setType("UMLActivityFinal");
	a.setWidth(16);
	a.setHeight(16);
	a.addFigure(new HalfFilledEllipseFigure({
		color: "#ffffff",
		changeFigureColor: false
	}));
	return a
};
var UMLInitialNode = function(b) {
	var a = new Elliptical(b);
	a.setType("UMLInitialNode");
	a.setWidth(16);
	a.setHeight(16);
	a.addFigure(new EllipseFigure({
		color: "#000000",
		changeFigureColor: false
	}));
	return a
};
var UMLFlowFinal = function(b) {
	var b = b || {};
	var a = new FlowFinal(b);
	a.setType("UMLFlowFinal");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(16);
	a.setHeight(16);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.addFigure(new CrossEllipseFigure({
		color: "#ffffff",
		changeFigureColor: false
	}));
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLDecision_MergeNode = function(b) {
	var b = b || {};
	var a = new Decision_MergeNode(b);
	a.setType("UMLDecision_MergeNode");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMinWidth(35);
	a.setMinHeight(35);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.addFigure(new RhombusFigure({
		color: "#bdd8e5"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLFork_JoinNode = function(b) {
	var a = new NodeForkJoin(b);
	a.setType("UMLFork_JoinNode");
	a.setWidth(100);
	a.setMinWidth(50);
	a.setHeight(5);
	a.setMinHeight(5);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#000000",
		changeFigureColor: false
	}));
	return a
};
var UMLSendSignalAction = function(b) {
	var b = b || {};
	var a = new SendSignalAction(b);
	a.setType("UMLSendSignalAction");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(50);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextBox({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new SendSignalActionFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLConnectorActivity = function(b) {
	var b = b || {};
	var a = new ConnectorActivity(b);
	a.setType("UMLConnectorActivity");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(20);
	a.setHeight(20);
	a.setMoveable();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new ConnectorItem({
		id: "name",
		centered: true,
		margin: 3,
		width: 20
	}));
	a.addFigure(new EllipseFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLHorizontalSwimlane = function(b) {
	var a = new UnhierarchicalSwimlane(b);
	a.setType("UMLHorizontalSwimlane");
	a.setWidth(150);
	a.setHeight(60);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new SwimlaneItem({
		id: "addRegion",
		text: "...",
		margin: 1,
		position: Component.BottomRight
	}));
	a.addFigure(new SwimlaneFigure());
	if (b.setElementXml) {} else {
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}));
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}))
	}
	return a
};
var UMLVerticalSwimlane = function(b) {
	b = b || {};
	b.orientation = 1;
	var a = new UnhierarchicalSwimlane(b);
	a.setType("UMLVerticalSwimlane");
	a.setWidth(60);
	a.setHeight(150);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new SwimlaneItem({
		id: "addRegion",
		text: "...",
		margin: 1,
		position: Component.BottomRight
	}));
	a.addFigure(new VerticalSwimlaneFigure());
	if (b.setElementXml) {} else {
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}));
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}))
	}
	return a
};
var UMLHorizontalHierarchicalSwimlane = function(b) {
	var b = b || {};
	var a = new HierarchicalSwimlane(b);
	a.setType("UMLHorizontalHierarchicalSwimlane");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(60);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true,
		orientation: 1
	}));
	a.addComponent(new TextBox({
		id: "name",
		centered: true,
		margin: 3,
		orientation: 1
	}));
	a.addComponent(new Separator({
		id: "separator",
		centered: true,
		orientation: 1,
		width: 2.5
	}));
	a.addComponent(new SwimlaneItem({
		id: "addRegion",
		text: "...",
		margin: 1,
		position: Component.BottomRight
	}));
	a.addFigure(new SwimlaneFigure());
	if (b.setElementXml) {} else {
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}));
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}))
	}
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLVerticalHierarchicalSwimlane = function(b) {
	b = b || {};
	b.orientation = 1;
	var a = new HierarchicalSwimlane(b);
	a.setType("UMLVerticalHierarchicalSwimlane");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(60);
	a.setHeight(150);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextBox({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new Separator({
		id: "separator",
		centered: true,
		height: 2.5
	}));
	a.addComponent(new SwimlaneItem({
		id: "addRegion",
		text: "...",
		margin: 1,
		position: Component.BottomRight
	}));
	a.addFigure(new VerticalSwimlaneFigure());
	if (b.setElementXml) {} else {
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}));
		a.addRegion(new Swimlane({
			parent: a,
			y: a.getY(),
			x: a.getX()
		}))
	}
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLExceptionHandler = function(b) {
	var a = new ExceptionHandler(b);
	a.setType("UMLExceptionHandler");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new OpenTip());
	return a
};
var Aggregation = function(a) {
	a = a || {};
	Aggregation.baseConstructor.call(this, a)
};
JSFun.extend(Aggregation, Relation);
Aggregation.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Aggregation.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Aggregation.prototype.setRoleA = function(a) {
	this._components[2].setValue(a)
};
Aggregation.prototype.setRoleB = function(a) {
	this._components[3].setValue(a)
};
Aggregation.prototype.setMultiplicityA = function(a) {
	this._components[4].setValue(a)
};
Aggregation.prototype.setMultiplicityB = function(a) {
	this._components[5].setValue(a)
};
Aggregation.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Aggregation.prototype.getName = function() {
	return this._components[1].getValue()
};
Aggregation.prototype.getRoleA = function() {
	return this._components[2].getValue()
};
Aggregation.prototype.getRoleB = function() {
	return this._components[3].getValue()
};
Aggregation.prototype.getMultiplicityA = function() {
	return this._components[4].getValue()
};
Aggregation.prototype.getMultiplicityB = function() {
	return this._components[5].getValue()
};
Aggregation.prototype.getNameAsComponent = function() {
	return this._components[1]
};
Aggregation.prototype.setDirectionToA = function(a) {
	this._directionA = a;
	if (a == true) {
		this.setStart(new OpenTipAggregationEnd())
	} else {
		if (this._start instanceof OpenTipAggregationEnd) {
			this.setStart(new AggregationEnd())
		}
	}
};
var Association = function(a) {
	a = a || {};
	Association.baseConstructor.call(this, a)
};
JSFun.extend(Association, Relation);
Association.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Association.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Association.prototype.setRoleA = function(a) {
	this._components[2].setValue(a)
};
Association.prototype.setRoleB = function(a) {
	this._components[3].setValue(a)
};
Association.prototype.setMultiplicityA = function(a) {
	this._components[4].setValue(a)
};
Association.prototype.setMultiplicityB = function(a) {
	this._components[5].setValue(a)
};
Association.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Association.prototype.getName = function() {
	return this._components[1].getValue()
};
Association.prototype.getRoleA = function() {
	return this._components[2].getValue()
};
Association.prototype.getRoleB = function() {
	return this._components[3].getValue()
};
Association.prototype.getMultiplicityA = function() {
	return this._components[4].getValue()
};
Association.prototype.getMultiplicityB = function() {
	return this._components[5].getValue()
};
Association.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Class = function(a) {
	a = a || {};
	this._abstract = false;
	Class.baseConstructor.call(this, a)
};
JSFun.extend(Class, Rectangular);
Class.prototype.getElementXML = function(a) {
	var b = Class.base.getElementXML.call(this, a);
	b.setAttribute("abstract", this.isAbstract());
	return b
};
Class.prototype.setElementXML = function(a) {
	this.setAbstract(a.getAttribute("abstract"));
	Class.base.setElementXML.call(this, a)
};
Class.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Class.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Class.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[2].addField(a)
};
Class.prototype.addOperation = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
Class.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Class.prototype.getName = function() {
	return this._components[1].getValue()
};
Class.prototype.getAttributes = function() {
	return this._components[2]._childs
};
Class.prototype.getOperations = function() {
	return this._components[3]._childs
};
Class.prototype.getStereotype = function() {
	return this._components[0]
};
Class.prototype.getNameAsComponent = function() {
	return this._components[1]
};
Class.prototype.isAbstract = function() {
	return this._abstract
};
Class.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
var ClassDiagram = function(a) {
	ClassDiagram.baseConstructor.call(this, a)
};
JSFun.extend(ClassDiagram, Diagram);
ClassDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
ClassDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var ComponentElement = function(a) {
	a = a || {};
	this._abstract = false;
	ComponentElement.baseConstructor.call(this, a)
};
JSFun.extend(ComponentElement, Rectangular);
ComponentElement.prototype.getElementXML = function(a) {
	var b = ComponentElement.base.getElementXML.call(this, a);
	b.setAttribute("abstract", this.isAbstract());
	return b
};
ComponentElement.prototype.setElementXML = function(a) {
	this.setAbstract(a.getAttribute("abstract"));
	ComponentElement.base.setElementXML.call(this, a)
};
ComponentElement.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
ComponentElement.prototype.setName = function(a) {
	this._components[3].setValue(a)
};
ComponentElement.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[4].addField(a)
};
ComponentElement.prototype.addOperation = function(a) {
	var a = a || "";
	this._components[5].addField(a)
};
ComponentElement.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
ComponentElement.prototype.getName = function() {
	return this._components[3].getValue()
};
ComponentElement.prototype.getAttributes = function() {
	return this._components[4]._childs
};
ComponentElement.prototype.getOperations = function() {
	return this._components[5]._childs
};
ComponentElement.prototype.getStereotype = function() {
	return this._components[1]
};
ComponentElement.prototype.getNameAsComponent = function() {
	return this._components[3]
};
ComponentElement.prototype.isAbstract = function() {
	return this._abstract
};
ComponentElement.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
var Composition = function(a) {
	a = a || {};
	Composition.baseConstructor.call(this, a)
};
JSFun.extend(Composition, Relation);
Composition.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Composition.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Composition.prototype.setRoleA = function(a) {
	this._components[2].setValue(a)
};
Composition.prototype.setRoleB = function(a) {
	this._components[3].setValue(a)
};
Composition.prototype.setMultiplicityA = function(a) {
	this._components[4].setValue(a)
};
Composition.prototype.setMultiplicityB = function(a) {
	this._components[5].setValue(a)
};
Composition.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Composition.prototype.getName = function() {
	return this._components[1].getValue()
};
Composition.prototype.getRoleA = function() {
	return this._components[2].getValue()
};
Composition.prototype.getRoleB = function() {
	return this._components[3].getValue()
};
Composition.prototype.getMultiplicityA = function() {
	return this._components[4].getValue()
};
Composition.prototype.getMultiplicityB = function() {
	return this._components[5].getValue()
};
Composition.prototype.getNameAsComponent = function() {
	return this._components[1]
};
Composition.prototype.setDirectionToA = function(a) {
	this._directionA = a;
	if (a == true) {
		this.setStart(new OpenTipCompositionEnd())
	} else {
		if (this._start instanceof OpenTipCompositionEnd) {
			this.setStart(new CompositionEnd())
		}
	}
};
var DataType = function(a) {
	a = a || {};
	this._abstract = false;
	DataType.baseConstructor.call(this, a)
};
JSFun.extend(DataType, Rectangular);
DataType.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
DataType.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
DataType.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
DataType.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
DataType.prototype.getName = function() {
	return this._components[2].getValue()
};
DataType.prototype.getAttributes = function() {
	return this._components[3]._childs
};
DataType.prototype.getNameAsComponent = function() {
	return this._components[2]
};
DataType.prototype.addOperation = function(a) {
	var a = a || "";
	this._components[4].addField(a)
};
DataType.prototype.getOperations = function() {
	return this._components[4]._childs
};
DataType.prototype.getStereotype = function() {
	return this._components[1]
};
DataType.prototype.isAbstract = function() {
	return this._abstract
};
DataType.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
var Dependency = function(a) {
	a = a || {};
	Dependency.baseConstructor.call(this, a)
};
JSFun.extend(Dependency, Relation);
Dependency.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Dependency.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Dependency.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Dependency.prototype.getName = function() {
	return this._components[1].getValue()
};
Dependency.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Generalization = function(a) {
	a = a || {};
	Generalization.baseConstructor.call(this, a)
};
JSFun.extend(Generalization, Relation);
Generalization.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Generalization.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Generalization.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Generalization.prototype.getName = function() {
	return this._components[1].getValue()
};
Generalization.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var GeneralizationSet = function(a) {
	a = a || {};
	this._pivotP = 2;
	GeneralizationSet.baseConstructor.call(this)
};
JSFun.extend(GeneralizationSet, Relation);
GeneralizationSet.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
GeneralizationSet.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
GeneralizationSet.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
GeneralizationSet.prototype.getName = function() {
	return this._components[1].getValue()
};
GeneralizationSet.prototype.getNameAsComponent = function() {
	return this._components[1]
};
GeneralizationSet.prototype.getRelations = function() {
	return this._relations
};
GeneralizationSet.prototype.setElements = function(b, a) {
	if (!(b instanceof Array)) {
		if (GeneralizationSet.base.setElements.call(this, b, a)) {
			this.updateParent();
			if (!this._orientation) {
				this._orientation = this._calculateOrientation()
			}
			return true
		}
		return false
	}
	for (i in b) {
		if (!(b[i] instanceof Node)) {
			return false
		}
	}
	if (b.length > 1) {
		this.setElements(b.shift(), b.shift());
		while (b[0]) {
			this.addElement(b.shift())
		}
		this.updateParent();
		if (!this._orientation) {
			this._orientation = this._calculateOrientation()
		}
		this._calculateLineEnds();
		return true
	} else {
		return false
	}
};
GeneralizationSet.prototype.getRelation = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			return this._relations[i]
		}
	}
};
GeneralizationSet.prototype.addElement = function(b) {
	if (!(b instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == b || this._relations[i]._elemB == b) {
			return false
		}
	}
	relation = new SetLine({
		a: b,
		b: this
	});
	relation._calculateLineEnds();
	var a = new Point(relation.getCentralPoint());
	this._points.splice(this._pivotP, 0, a);
	relation._calculateLineEnds();
	relation._points[2] = this._points[this._pivotP];
	this._pivotP++;
	this.notifyChange();
	return true
};
GeneralizationSet.prototype.delElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			this._relations[i].remove();
			return true
		}
	}
	return false
};
GeneralizationSet.prototype.notifyDeleted = function(a) {
	for (i = 0; i < this._relations.length; i++) {
		if (this._relations[i] === a && this._relations[i].getType() == "SetLine") {
			this._relations.splice(i, 1);
			this._pivotP--;
			this._points.splice(2 + i, 1)
		}
	}
};
GeneralizationSet.prototype._calculateLineEnds = function() {
	var a, p;
	var g = this._points.length;
	if (!this._points[3]) {
		a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
		p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
		this._points[0] = a;
		this._points[1] = p;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = new Point(this.getCentralPoint());
		this._points[3] = this._points[1];
		this._points[1] = this._points[2];
		this._points[2] = this._points[3];
		this._pivotP = 2;
		this._points[3] = p
	}
	if (this._elemA == this._elemB) {
		var b = this._elemA.getCentralPoint();
		var d = b.getX();
		var c = b.getY();
		var n = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
		var h = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
		var e;
		var m;
		if (this._selected == 2 || this._selected == 0 || this._selected == g - 1 || (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing) {
			if ((n - d) > 0) {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() + m, a.getY() + e);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() + m, a.getY() - e);
					this._points[3] = new Point(p.getX() + m, c)
				}
			} else {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() - m, a.getY() + e);
					this._points[3] = new Point(p.getX() - m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() - m, a.getY() - e);
					this._points[3] = new Point(p.getX() - m, c)
				}
			}
		} else {
			if (this._selected == 3) {
				n = this._points[3]._x;
				h = this._points[3]._y;
				a = this._elemA.getLinkCentered(d, this._points[0]._y);
				if ((n - d) > 0) {
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() + m);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() - m);
					this._points[3] = new Point(p.getX() - m, c)
				}
			} else {
				if (this._selected == 1) {
					n = this._points[1]._x;
					h = this._points[1]._y;
					p = this._elemA.getLinkCentered(this._points[4]._x, c);
					if ((h - c) > 0) {
						a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
						e = h - a.getY();
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() + e);
						this._points[2].setY(a.getY() + e)
					} else {
						a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
						e = a.getY() - h;
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() - e);
						this._points[2].setY(a.getY() - e)
					}
				} else {
					if (this._selected == 2) {
						var o = 0;
						var l = 0;
						if (this._elemA._moved) {
							var o = (this._elemA._x - this._elemA._prex) / 2;
							var l = (this._elemA._y - this._elemA._prey) / 2;
							this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
							this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
							a = this._points[0];
							p = this._points[4];
							this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
							this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
							this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
						}
					} else {
						if (this._selected == -1) {
							var o = 0;
							var l = 0;
							if (this._elemA._moved) {
								var o = (this._elemA._x - this._elemA._prex) / 2;
								var l = (this._elemA._y - this._elemA._prey) / 2;
								this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
								this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
								a = this._points[0];
								p = this._points[4];
								this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
								this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
								this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
							}
						}
					}
				}
			}
		}
		this._points[0] = a;
		this._points[4] = p;
		while (this._points[5]) {
			this._points.pop()
		}
	} else {
		if (g == 4) {
			a = this._elemA.getLinkCentered(this._points[1]);
			p = this._elemB.getLinkCentered(this._points[this._pivotP]);
			this._points[0] = a;
			this._points[3] = p
		} else {
			if (g > 4) {
				a = this._elemA.getLinkCentered(this._points[1]);
				p = this._elemB.getLinkCentered(this._points[this._pivotP]);
				this._points[0] = a;
				this._points[this._points.length - 1] = p;
				for (i = 0; i < this._relations.length; i++) {
					this._relations[i]._calculateLineEnds()
				}
				if (this._orientation) {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setX(this._points[this._pivotP].getX())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setY(this._points[1].getY() + 5)
					}
				} else {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setY(this._points[this._pivotP].getY())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setX(this._points[1].getX() + 5)
					}
				}
			} else {
				a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
				p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
				this._points[0] = a;
				this._points[1] = p;
				this._points[1] = new Point(this.getCentralPoint());
				this._points[2] = new Point(this.getCentralPoint());
				this._points[3] = this._points[1];
				this._points[1] = this._points[2];
				this._points[2] = this._points[3];
				this._pivotP = 2;
				this._points[3] = p
			}
		}
	}
};
GeneralizationSet.prototype._delUselessPoints = function() {
	var a;
	for (a = this._points.length - 1; a > this._pivotP; a--) {
		if (this._selectLine(this._points[a + 1], this._points[a - 1], this._points[a].getX(), this._points[a].getY(), 10)) {
			this._points.splice(a, 1)
		}
	}
};
GeneralizationSet.prototype.draw = function(c) {
	var h = this._points.length;
	var n = [];
	for (e = this._pivotP; e < h; e++) {
		n.push(this._points[e])
	}
	if (this._line) {
		this._line.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	if (this._end) {
		var b = this._points[h - 2].getX();
		var o = this._points[h - 2].getY();
		var l = this._points[h - 1].getX();
		var g = this._points[h - 1].getY();
		var d = Math.atan2(g - o, l - b);
		this._end.draw(c, l, g, d, this.getLineColor())
	}
	if (this._selected >= 0) {
		var e;
		for (e = 0; e < this._points.length; e++) {
			c.fillRect(parseInt(this._points[e].getX()) - 3, parseInt(this._points[e].pixelY()) - 3, 6, 6)
		}
	}
	n = [];
	for (e = 1; e <= this._pivotP; e++) {
		n.push(this._points[e])
	}
	if (n.length > 1) {
		if (this.getLineStyle() == "solid") {
			var m = new SolidLine()
		} else {
			var m = new DashedLine()
		}
		m.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	n = [];
	n[0] = this._points[0];
	n[1] = this._points[1];
	n[2] = this._points[this._pivotP];
	if (this.getLineStyle() == "solid") {
		var m = new SolidLine()
	} else {
		var m = new DashedLine()
	}
	m.draw(c, n, this.getLineColor(), this.getLineWidth());
	if (this._selected > -1) {
		this._drawComponentsShape(c)
	}
	this._drawComponents(c)
};
GeneralizationSet.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		if (this.isOver(c, e)) {
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
			if (d >= this._pivotP) {
				this._selectedLine = true;
				this._component = false;
				this._points.splice(this._selected, 0, new Point(c, e))
			} else {
				if (d >= 1) {
					this._selectedPoint = true;
					this._component = false;
					this._selected = this._pivotP
				} else {
					this._selectedPoint = true;
					this._component = false;
					this._selected = 1
				}
			}
			return true
		}
	}
	return false
};
GeneralizationSet.prototype._calculateOrientation = function() {
	var a = (this._elemA.getCentralPoint().getY() - this._elemB.getCentralPoint().getY()) / (this._elemA.getCentralPoint().getX() - this._elemB.getCentralPoint().getX());
	return (a < 1 && a > -1)
};
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation
};
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation
};
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation = true
};
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation = false
};
GeneralizationSet.prototype.getOrientation = function() {
	if (this._orientation) {
		return "x"
	}
	return "y"
};
GeneralizationSet.prototype.setLineStyle = function(a) {
	if (!(GeneralizationSet.base.setLineStyle.call(this, a))) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			if (!(this._relations[i].setLineStyle(a))) {
				return false
			}
		}
	}
	return true
};
GeneralizationSet.prototype.setLineColor = function(a) {
	GeneralizationSet.base.setLineColor.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineColor(a)
		}
	}
};
GeneralizationSet.prototype.setLineWidth = function(a) {
	GeneralizationSet.base.setLineWidth.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineWidth(a)
		}
	}
};
var SetLine = function(a) {
	a = a || {};
	this._last = null;
	this._id = 0;
	this._type = "SetLine";
	this._line_color = "#000000";
	this._line_width = 1.25;
	this._points = [new Point(), new Point()];
	this._selected = -1;
	this._selectedBefore = false;
	this._moved = false;
	this._activeComponent = null;
	this._selectedLine = false;
	this._selectedPoint = false;
	this._relations = [];
	this._components = [];
	this._diagram = null;
	this.setElements(a.a, a.b);
	f = this;
	if (this._elemB) {
		this.setMenu([
			[function() {
				f._elemB.showStyleDialog({
					that: f._elemB
				});
				f._elemB.removeContextualMenu()
			}, "Style"]
		]);
		this.setLineStyle(this._elemB.getLineStyle());
		this.setLineColor(this._elemB.getLineColor());
		this.setLineWidth(this._elemB.getLineWidth())
	}
};
JSFun.extend(SetLine, Relation);
SetLine.prototype._delUselessPoints = function() {};
SetLine.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		this.setType("SetLine");
		if (this.isOver(c, e)) {
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
	for (var d = 0; d > this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedLine = true;
			this._component = false;
			return true
		}
	}
	for (d = 0; d < this._points.length; d++) {
		if (Math.abs(c - this._points[d].getX()) <= 4 && Math.abs(e - this._points[d].getY()) <= 4) {
			if (d == 2) {
				return false
			}
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = d;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	for (var d = 0; d < this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	return false
};
SetLine.prototype._calculateLineEnds = function() {
	if (!this._elemB) {
		return false
	}
	var a = this._points[1];
	if (this._elemB._orientation) {
		if (this._points.length < 3) {
			var a = new Point(this._elemB._points[1].getX(), this._elemA.getCentralPoint().getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getY() < this._elemA.getY()) {
					this._points[2].setY(this._elemA.getY() - 20)
				} else {
					this._points[2].setY(this._elemA.getY() + this._elemA.getHeight() + 20)
				}
			}
			if (this._points[0].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[2].getX() <= this._elemA.getX()) {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX() - 10)
			} else {
				if (this._points[2].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[0].getX() <= this._elemA.getX()) {
					this._points[0].setX(this._elemA.getX() + this._elemA.getWidth());
					this._points[1].setX(this._elemA.getX() + this._elemA.getWidth() + 10)
				}
			}
		}
	} else {
		if (this._points.length < 3) {
			var a = new Point(this._elemA.getCentralPoint().getX(), this._elemB._points[1].getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getX() < this._elemA.getX()) {
					this._points[2].setX(this._elemA.getX() - 20)
				} else {
					this._points[2].setX(this._elemA.getX() + this._elemA.getWidth() + 20)
				}
			}
			if (this._points[0].getY() <= this._elemA.getY() && this._points[2].getY() > this._elemA.getY() + this._elemA.getHeight()) {
				this._points[0].setY(this._elemA.getY() + this._elemA.getHeight());
				this._points[1].setY(this._elemA.getY() + this._elemA.getHeight() + 10)
			} else {
				if (this._points[0].getY() >= this._elemA.getY() + this._elemA.getHeight() && this._points[2].getY() <= this._elemA.getY()) {
					this._points[0].setY(this._elemA.getY());
					this._points[1].setY(this._elemA.getY() - 10)
				}
			}
		}
	}
	if (this._points.length < 3) {
		this._points[1] = a;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = a
	}
	this._points[0] = this._elemA.getLinkCentered(this._points[1])
};
SetLine.prototype.setElementXML = function(g, a) {
	var l = g.getAttribute("side_A");
	var h = g.getAttribute("side_B");
	var c = a[h];
	var d = a[l];
	if (!(c instanceof GeneralizationSet)) {
		return null
	}
	c.addElement(d);
	relation = c._relations[c._relations.length - 1];
	this.setId(g.getAttribute("id"));
	var e;
	var m = g.childNodes;
	var b = 0;
	for (e = 0; e < m.length; e++) {
		if (m[e].nodeName == "point") {
			this._points[b] = new Point(parseInt(m[e].getAttribute("x")), parseInt(m[e].getAttribute("y")));
			b++
		}
	}
	c.delElement(d);
	this.setLineStyle(c.getLineStyle());
	this.setLineColor(c.getLineColor());
	this.setLineWidth(c.getLineWidth());
	this._type = "SetLine";
	this._elemA = d;
	this._elemB = c;
	c._relations.splice(c._relations.length - 1, 1, this);
	this._points[2] = c._points[c._pivotP];
	c._pivotP++;
	c.notifyChange();
	d.addRelation(this)
};
var Instance = function(a) {
	a = a || {};
	Instance.baseConstructor.call(this, a)
};
JSFun.extend(Instance, Rectangular);
Instance.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Instance.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Instance.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[2].addField(a)
};
Instance.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Instance.prototype.getName = function() {
	return this._components[1].getValue()
};
Instance.prototype.getAttributes = function() {
	return this._components[2]._childs
};
Instance.prototype.getStereotype = function() {
	return this._components[0]
};
Instance.prototype.getNameAsComponent = function() {
	return this._components[1]
};
Instance.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var InterfaceExtended = function(a) {
	a = a || {};
	this._abstract = false;
	InterfaceExtended.baseConstructor.call(this, a)
};
JSFun.extend(InterfaceExtended, Rectangular);
InterfaceExtended.prototype.getElementXML = function(a) {
	var b = InterfaceExtended.base.getElementXML.call(this, a);
	b.setAttribute("abstract", this.isAbstract());
	return b
};
InterfaceExtended.prototype.setElementXML = function(a) {
	this.setAbstract(a.getAttribute("abstract"));
	InterfaceExtended.base.setElementXML.call(this, a)
};
InterfaceExtended.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
InterfaceExtended.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
InterfaceExtended.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
InterfaceExtended.prototype.addOperation = function(a) {
	var a = a || "";
	this._components[4].addField(a)
};
InterfaceExtended.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
InterfaceExtended.prototype.getName = function() {
	return this._components[2].getValue()
};
InterfaceExtended.prototype.getAttributes = function() {
	return this._components[3]._childs
};
InterfaceExtended.prototype.getOperations = function() {
	return this._components[4]._childs
};
InterfaceExtended.prototype.getStereotype = function() {
	return this._components[0]
};
InterfaceExtended.prototype.getNameAsComponent = function() {
	return this._components[2]
};
InterfaceExtended.prototype.isAbstract = function() {
	return this._abstract
};
InterfaceExtended.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
var NAssociation = function(a) {
	a = a || {};
	NAssociation.baseConstructor.call(this, a)
};
JSFun.extend(NAssociation, Rhombus);
NAssociation.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
NAssociation.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
NAssociation.prototype.setRole = function(a, b) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			this._relations[i].setComponentRoleA(b)
		}
	}
};
NAssociation.prototype.setMultiplicity = function(b, a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == b) {
			this._relations[i].setComponentMultiplicityA(a)
		}
	}
};
NAssociation.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
NAssociation.prototype.getName = function() {
	return this._components[1].getValue()
};
NAssociation.prototype.getRole = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a && this._relations[i]._roleA) {
			return this._relations[i]._roleA.getValue()
		}
	}
};
NAssociation.prototype.getMultiplicity = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a && this._relations[i]._multiA) {
			return this._relations[i]._multiA.getValue()
		}
	}
};
NAssociation.prototype.getNameAsComponent = function() {
	return this._components[1]
};
NAssociation.prototype.getRelations = function() {
	return this._relations
};
NAssociation.prototype.setElements = function(b, a) {
	if (!(b instanceof Array)) {
		if (b instanceof Node && a instanceof Node) {
			relation = new AssociationN({
				a: b,
				b: this
			});
			relation._calculateLineEnds();
			relation.updateParent();
			relation = new AssociationN({
				a: a,
				b: this
			});
			relation._calculateLineEnds();
			relation.updateParent();
			this.notifyChange();
			return true
		}
		return false
	}
	for (i in b) {
		if (!(b[i] instanceof Node)) {
			return false
		}
	}
	if (b[0] && b[1]) {
		this.setElements(b.shift(), b.shift());
		while (b[0]) {
			this.addElement(b.shift())
		}
		this.notifyChange();
		return true
	} else {
		return false
	}
};
NAssociation.prototype.getRelation = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			return this._relations[i]
		}
	}
};
NAssociation.prototype.addElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			return false
		}
	}
	relation = new AssociationN({
		a: a,
		b: this
	});
	relation._calculateLineEnds();
	relation.updateParent();
	this.notifyChange();
	return true
};
NAssociation.prototype.delElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			this._relations[i].remove();
			return true
		}
	}
	return false
};
var AssociationN = function(b) {
	var b = b || {};
	var a = new Relation(b);
	a.setType("AssociationN");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentMultiplicityA();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	return a
};
var Package = function(a) {
	a = a || {};
	Package.baseConstructor.call(this, a)
};
JSFun.extend(Package, Rectangular);
Package.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
Package.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
Package.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
Package.prototype.getName = function() {
	return this._components[2].getValue()
};
Package.prototype.getStereotype = function() {
	return this._components[1]
};
Package.prototype.getNameAsComponent = function() {
	return this._components[2]
};
var PackageContainer = function(a) {
	a = a || {};
	PackageContainer.baseConstructor.call(this, a)
};
JSFun.extend(PackageContainer, Rectangular);
PackageContainer.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
PackageContainer.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
PackageContainer.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
PackageContainer.prototype.getName = function() {
	return this._components[1].getValue()
};
PackageContainer.prototype.getStereotype = function() {
	return this._components[0]
};
PackageContainer.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Realization = function(a) {
	a = a || {};
	Realization.baseConstructor.call(this, a)
};
JSFun.extend(Realization, Relation);
Realization.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Realization.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Realization.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Realization.prototype.getName = function() {
	return this._components[1].getValue()
};
Realization.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Dependency = function(a) {
	a = a || {};
	Dependency.baseConstructor.call(this, a)
};
JSFun.extend(Dependency, Relation);
Dependency.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Dependency.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Dependency.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Dependency.prototype.getName = function() {
	return this._components[1].getValue()
};
Dependency.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLClassDiagram = function(b) {
	var a = new ClassDiagram(b);
	a.setType("UMLClassDiagram");
	a.setName("Class diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLClass", "UMLDataType", "UMLComponent", "UMLInstance", "UMLInterfaceExtended", "UMLPackage", "UMLPackageContainer", "UMLAggregation", "UMLAssociation", "UMLComposition", "UMLDependency", "UMLGeneralization", "UMLRealization", "UMLUsage", "UMLPackageMerge", "UMLPackagePublicImport", "UMLPackagePrivateImport", "UMLGeneralizationSet", "SetLine", "UMLNAssociation", "AssociationN"]);
	return a
};
var UMLPackage = function(b) {
	var b = b || {};
	var a = new Package(b);
	a.setType("UMLPackage");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(100);
	a.setHeight(50);
	a.addFigure(new PackageFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new Space({
		height: 16
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Package name",
		centered: true,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLPackageContainer = function(b) {
	var b = b || {};
	var a = new PackageContainer(b);
	a.setType("UMLPackageContainer");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(75);
	a.setMoveable();
	a.setContainer();
	a.addFigure(new RectangleFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes"
	}));
	a.addComponent(new Tab({
		id: "name",
		margin: 5,
		text: "Package name"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLClass = function(b) {
	var b = b || {};
	var a = new Class(b);
	a.setType("UMLClass");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "ClassName",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "operations",
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};

var UMLClassIntermedia = function(b) {
	var b = b || {};
	var a = new Class(b);
	a.setType("UMLClass");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "operations",
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};


var UMLComponent = function(b) {
	var b = b || {};
	var a = new ComponentElement(b);
	a.setType("UMLComponent");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(150);
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new ComponentSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new Text({
		text: "\xABcomponent\xBB",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Component Name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "operations",
		visibleSubComponents: false,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLInterfaceExtended = function(b) {
	var b = b || {};
	var a = new InterfaceExtended(b);
	a.setType("UMLInterfaceExtended");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(150);
	a.addFigure(new RectangleFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new CircleSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Interface Name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "methods",
		visibleSubComponents: false,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLAggregation = function(b) {
	var a = new Aggregation(b);
	a.setType("UMLAggregation");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentRoleB();
	a.setComponentMultiplicityA();
	a.setComponentMultiplicityB();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	a.setStart(new AggregationEnd());
	return a
};
var UMLAssociation = function(b) {
	var a = new Association(b);
	a.setType("UMLAssociation");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentRoleB();
	a.setComponentMultiplicityA();
	a.setComponentMultiplicityB();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	return a
};
var UMLComposition = function(b) {
	var a = new Composition(b);
	a.setType("UMLComposition");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentRoleB();
	a.setComponentMultiplicityA();
	a.setComponentMultiplicityB();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	a.setStart(new CompositionEnd());
	return a
};
var UMLDependency = function(b) {
	var a = new Dependency(b);
	a.setType("UMLDependency");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLGeneralization = function(b) {
	var a = new Generalization(b);
	a.setType("UMLGeneralization");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.addComponentStereotype();
	a.setComponentName();
	a.setLine(new SolidLine());
	a.setEnd(new CloseTip());
	return a
};
var UMLRealization = function(b) {
	var a = new Realization(b);
	a.setType("UMLRealization");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.addComponentStereotype();
	a.setComponentName();
	a.setLine(new DashedLine());
	a.setEnd(new CloseTip());
	return a
};


var UMLUsage = function(b) {
	var a = new Dependency(b);
	a.setType("UMLUsage");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABuse\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLPackageMerge = function(b) {
	var a = new Relation(b);
	a.setType("UMLPackageMerge");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABmerge\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLPackagePublicImport = function(b) {
	var a = new Relation(b);
	a.setType("UMLPackagePublicImport");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABimport\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLPackagePrivateImport = function(b) {
	var a = new Relation(b);
	a.setType("UMLPackagePrivateImport");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABaccess\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLDataType = function(b) {
	var b = b || {};
	var a = new DataType(b);
	a.setType("UMLDataType");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new Text({
		text: "\xABdatatype\xBB",
		centered: true
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "DataTypeName",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "operations",
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLNAssociation = function(b) {
	var b = b || {};
	var a = new NAssociation(b);
	a.setMoveable();
	setStereotypeProperties(a, b.stereotypes || []);
	a.setType("UMLNAssociation");
	a.addFigure(new RhombusFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: " ",
		centered: true,
		margin: 3
	}));
	return a
};
var UMLGeneralizationSet = function(b) {
	var b = b || {};
	var a = new GeneralizationSet(b);
	a.setType("UMLGeneralizationSet");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	return a
};
var UMLInstance = function(b) {
	var b = b || {};
	var a = new Instance(b);
	a.setType("UMLInstance");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(50);
	a.setMoveable();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new InstanceItem({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		margin: 3
	}));
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.getComponents()[0].setUnderlineText(true);
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLLink = function(c) {
	var b = new Link(c);
	b.setType("UMLLink");
	b.addComponentStereotype();
	var a = new InstanceItem({
		id: "name",
		centered: true,
		margin: 3
	});
	b._addComponent(a);
	b._name = a;
	b.setComponentMultiplicityA();
	b.setComponentMultiplicityB();
	b.setMenu([
		[function() {
			b.showStyleDialog({
				that: b
			});
			b.removeContextualMenu()
		}, "Style"],
		[function() {
			b.showDirectionDialog({
				that: b
			});
			b.removeContextualMenu()
		}, "Navegability"]
	]);
	b.setLine(new SolidLine());
	return b
};
var Artifact = function(a) {
	a = a || {};
	Artifact.baseConstructor.call(this, a)
};
JSFun.extend(Artifact, Rectangular);
Artifact.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
Artifact.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
Artifact.prototype.addProperty = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
Artifact.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
Artifact.prototype.getName = function() {
	return this._components[2].getValue()
};
Artifact.prototype.getStereotype = function() {
	return this._components[1]
};
Artifact.prototype.getNameAsComponent = function() {
	return this._components[2]
};
Artifact.prototype.getProperties = function() {
	return this._components[3]._childs
};
var Association = function(a) {
	a = a || {};
	Association.baseConstructor.call(this, a)
};
JSFun.extend(Association, Relation);
Association.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Association.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Association.prototype.setRoleA = function(a) {
	this._components[2].setValue(a)
};
Association.prototype.setRoleB = function(a) {
	this._components[3].setValue(a)
};
Association.prototype.setMultiplicityA = function(a) {
	this._components[4].setValue(a)
};
Association.prototype.setMultiplicityB = function(a) {
	this._components[5].setValue(a)
};
Association.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Association.prototype.getName = function() {
	return this._components[1].getValue()
};
Association.prototype.getRoleA = function() {
	return this._components[2].getValue()
};
Association.prototype.getRoleB = function() {
	return this._components[3].getValue()
};
Association.prototype.getMultiplicityA = function() {
	return this._components[4].getValue()
};
Association.prototype.getMultiplicityB = function() {
	return this._components[5].getValue()
};
Association.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Class = function(a) {
	a = a || {};
	this._abstract = false;
	Class.baseConstructor.call(this, a)
};
JSFun.extend(Class, Rectangular);
Class.prototype.getElementXML = function(a) {
	var b = Class.base.getElementXML.call(this, a);
	b.setAttribute("abstract", this.isAbstract());
	return b
};
Class.prototype.setElementXML = function(a) {
	this.setAbstract(a.getAttribute("abstract"));
	Class.base.setElementXML.call(this, a)
};
Class.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Class.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Class.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[2].addField(a)
};
Class.prototype.addOperation = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
Class.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Class.prototype.getName = function() {
	return this._components[1].getValue()
};
Class.prototype.getAttributes = function() {
	return this._components[2]._childs
};
Class.prototype.getOperations = function() {
	return this._components[3]._childs
};
Class.prototype.getStereotype = function() {
	return this._components[0]
};
Class.prototype.getNameAsComponent = function() {
	return this._components[1]
};
Class.prototype.isAbstract = function() {
	return this._abstract
};
Class.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
var ComponentDiagram = function(a) {
	ComponentDiagram.baseConstructor.call(this, a)
};
JSFun.extend(ComponentDiagram, Diagram);
ComponentDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
ComponentDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var ConnectorRelation = function(a) {
	a = a || {};
	ConnectorRelation.baseConstructor.call(this, a)
};
JSFun.extend(ConnectorRelation, Relation);
ConnectorRelation.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
ConnectorRelation.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
ConnectorRelation.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
ConnectorRelation.prototype.getName = function() {
	return this._components[1].getValue()
};
ConnectorRelation.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Dependency = function(a) {
	a = a || {};
	Dependency.baseConstructor.call(this, a)
};
JSFun.extend(Dependency, Relation);
Dependency.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Dependency.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Dependency.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Dependency.prototype.getName = function() {
	return this._components[1].getValue()
};
Dependency.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Generalization = function(a) {
	a = a || {};
	Generalization.baseConstructor.call(this, a)
};
JSFun.extend(Generalization, Relation);
Generalization.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Generalization.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Generalization.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Generalization.prototype.getName = function() {
	return this._components[1].getValue()
};
Generalization.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var GeneralizationSet = function(a) {
	a = a || {};
	this._pivotP = 2;
	GeneralizationSet.baseConstructor.call(this)
};
JSFun.extend(GeneralizationSet, Relation);
GeneralizationSet.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
GeneralizationSet.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
GeneralizationSet.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
GeneralizationSet.prototype.getName = function() {
	return this._components[1].getValue()
};
GeneralizationSet.prototype.getNameAsComponent = function() {
	return this._components[1]
};
GeneralizationSet.prototype.getRelations = function() {
	return this._relations
};
GeneralizationSet.prototype.setElements = function(b, a) {
	if (!(b instanceof Array)) {
		if (GeneralizationSet.base.setElements.call(this, b, a)) {
			this.updateParent();
			if (!this._orientation) {
				this._orientation = this._calculateOrientation()
			}
			return true
		}
		return false
	}
	for (i in b) {
		if (!(b[i] instanceof Node)) {
			return false
		}
	}
	if (b.length > 1) {
		this.setElements(b.shift(), b.shift());
		while (b[0]) {
			this.addElement(b.shift())
		}
		this.updateParent();
		if (!this._orientation) {
			this._orientation = this._calculateOrientation()
		}
		this._calculateLineEnds();
		return true
	} else {
		return false
	}
};
GeneralizationSet.prototype.getRelation = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			return this._relations[i]
		}
	}
};
GeneralizationSet.prototype.addElement = function(b) {
	if (!(b instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == b || this._relations[i]._elemB == b) {
			return false
		}
	}
	relation = new SetLine({
		a: b,
		b: this
	});
	relation._calculateLineEnds();
	var a = new Point(relation.getCentralPoint());
	this._points.splice(this._pivotP, 0, a);
	relation._calculateLineEnds();
	relation._points[2] = this._points[this._pivotP];
	this._pivotP++;
	this.notifyChange();
	return true
};
GeneralizationSet.prototype.delElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			this._relations[i].remove();
			return true
		}
	}
	return false
};
GeneralizationSet.prototype.notifyDeleted = function(a) {
	for (i = 0; i < this._relations.length; i++) {
		if (this._relations[i] === a && this._relations[i].getType() == "SetLine") {
			this._relations.splice(i, 1);
			this._pivotP--;
			this._points.splice(2 + i, 1)
		}
	}
};
GeneralizationSet.prototype._calculateLineEnds = function() {
	var a, p;
	var g = this._points.length;
	if (!this._points[3]) {
		a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
		p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
		this._points[0] = a;
		this._points[1] = p;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = new Point(this.getCentralPoint());
		this._points[3] = this._points[1];
		this._points[1] = this._points[2];
		this._points[2] = this._points[3];
		this._pivotP = 2;
		this._points[3] = p
	}
	if (this._elemA == this._elemB) {
		var b = this._elemA.getCentralPoint();
		var d = b.getX();
		var c = b.getY();
		var n = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
		var h = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
		var e;
		var m;
		if (this._selected == 2 || this._selected == 0 || this._selected == g - 1 || (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing) {
			if ((n - d) > 0) {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() + m, a.getY() + e);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() + m, a.getY() - e);
					this._points[3] = new Point(p.getX() + m, c)
				}
			} else {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() - m, a.getY() + e);
					this._points[3] = new Point(p.getX() - m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() - m, a.getY() - e);
					this._points[3] = new Point(p.getX() - m, c)
				}
			}
		} else {
			if (this._selected == 3) {
				n = this._points[3]._x;
				h = this._points[3]._y;
				a = this._elemA.getLinkCentered(d, this._points[0]._y);
				if ((n - d) > 0) {
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() + m);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() - m);
					this._points[3] = new Point(p.getX() - m, c)
				}
			} else {
				if (this._selected == 1) {
					n = this._points[1]._x;
					h = this._points[1]._y;
					p = this._elemA.getLinkCentered(this._points[4]._x, c);
					if ((h - c) > 0) {
						a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
						e = h - a.getY();
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() + e);
						this._points[2].setY(a.getY() + e)
					} else {
						a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
						e = a.getY() - h;
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() - e);
						this._points[2].setY(a.getY() - e)
					}
				} else {
					if (this._selected == 2) {
						var o = 0;
						var l = 0;
						if (this._elemA._moved) {
							var o = (this._elemA._x - this._elemA._prex) / 2;
							var l = (this._elemA._y - this._elemA._prey) / 2;
							this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
							this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
							a = this._points[0];
							p = this._points[4];
							this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
							this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
							this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
						}
					} else {
						if (this._selected == -1) {
							var o = 0;
							var l = 0;
							if (this._elemA._moved) {
								var o = (this._elemA._x - this._elemA._prex) / 2;
								var l = (this._elemA._y - this._elemA._prey) / 2;
								this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
								this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
								a = this._points[0];
								p = this._points[4];
								this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
								this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
								this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
							}
						}
					}
				}
			}
		}
		this._points[0] = a;
		this._points[4] = p;
		while (this._points[5]) {
			this._points.pop()
		}
	} else {
		if (g == 4) {
			a = this._elemA.getLinkCentered(this._points[1]);
			p = this._elemB.getLinkCentered(this._points[this._pivotP]);
			this._points[0] = a;
			this._points[3] = p
		} else {
			if (g > 4) {
				a = this._elemA.getLinkCentered(this._points[1]);
				p = this._elemB.getLinkCentered(this._points[this._pivotP]);
				this._points[0] = a;
				this._points[this._points.length - 1] = p;
				for (i = 0; i < this._relations.length; i++) {
					this._relations[i]._calculateLineEnds()
				}
				if (this._orientation) {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setX(this._points[this._pivotP].getX())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setY(this._points[1].getY() + 5)
					}
				} else {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setY(this._points[this._pivotP].getY())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setX(this._points[1].getX() + 5)
					}
				}
			} else {
				a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
				p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
				this._points[0] = a;
				this._points[1] = p;
				this._points[1] = new Point(this.getCentralPoint());
				this._points[2] = new Point(this.getCentralPoint());
				this._points[3] = this._points[1];
				this._points[1] = this._points[2];
				this._points[2] = this._points[3];
				this._pivotP = 2;
				this._points[3] = p
			}
		}
	}
};
GeneralizationSet.prototype._delUselessPoints = function() {
	var a;
	for (a = this._points.length - 1; a > this._pivotP; a--) {
		if (this._selectLine(this._points[a + 1], this._points[a - 1], this._points[a].getX(), this._points[a].getY(), 10)) {
			this._points.splice(a, 1)
		}
	}
};
GeneralizationSet.prototype.draw = function(c) {
	var h = this._points.length;
	var n = [];
	for (e = this._pivotP; e < h; e++) {
		n.push(this._points[e])
	}
	if (this._line) {
		this._line.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	if (this._end) {
		var b = this._points[h - 2].getX();
		var o = this._points[h - 2].getY();
		var l = this._points[h - 1].getX();
		var g = this._points[h - 1].getY();
		var d = Math.atan2(g - o, l - b);
		this._end.draw(c, l, g, d, this.getLineColor())
	}
	if (this._selected >= 0) {
		var e;
		for (e = 0; e < this._points.length; e++) {
			c.fillRect(parseInt(this._points[e].getX()) - 3, parseInt(this._points[e].pixelY()) - 3, 6, 6)
		}
	}
	n = [];
	for (e = 1; e <= this._pivotP; e++) {
		n.push(this._points[e])
	}
	if (n.length > 1) {
		if (this.getLineStyle() == "solid") {
			var m = new SolidLine()
		} else {
			var m = new DashedLine()
		}
		m.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	n = [];
	n[0] = this._points[0];
	n[1] = this._points[1];
	n[2] = this._points[this._pivotP];
	if (this.getLineStyle() == "solid") {
		var m = new SolidLine()
	} else {
		var m = new DashedLine()
	}
	m.draw(c, n, this.getLineColor(), this.getLineWidth());
	if (this._selected > -1) {
		this._drawComponentsShape(c)
	}
	this._drawComponents(c)
};
GeneralizationSet.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		if (this.isOver(c, e)) {
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
			if (d >= this._pivotP) {
				this._selectedLine = true;
				this._component = false;
				this._points.splice(this._selected, 0, new Point(c, e))
			} else {
				if (d >= 1) {
					this._selectedPoint = true;
					this._component = false;
					this._selected = this._pivotP
				} else {
					this._selectedPoint = true;
					this._component = false;
					this._selected = 1
				}
			}
			return true
		}
	}
	return false
};
GeneralizationSet.prototype._calculateOrientation = function() {
	var a = (this._elemA.getCentralPoint().getY() - this._elemB.getCentralPoint().getY()) / (this._elemA.getCentralPoint().getX() - this._elemB.getCentralPoint().getX());
	return (a < 1 && a > -1)
};
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation
};
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation
};
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation = true
};
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation = false
};
GeneralizationSet.prototype.getOrientation = function() {
	if (this._orientation) {
		return "x"
	}
	return "y"
};
GeneralizationSet.prototype.setLineStyle = function(a) {
	if (!(GeneralizationSet.base.setLineStyle.call(this, a))) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			if (!(this._relations[i].setLineStyle(a))) {
				return false
			}
		}
	}
	return true
};
GeneralizationSet.prototype.setLineColor = function(a) {
	GeneralizationSet.base.setLineColor.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineColor(a)
		}
	}
};
GeneralizationSet.prototype.setLineWidth = function(a) {
	GeneralizationSet.base.setLineWidth.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineWidth(a)
		}
	}
};
var SetLine = function(a) {
	a = a || {};
	this._last = null;
	this._id = 0;
	this._type = "SetLine";
	this._line_color = "#000000";
	this._line_width = 1.25;
	this._points = [new Point(), new Point()];
	this._selected = -1;
	this._selectedBefore = false;
	this._moved = false;
	this._activeComponent = null;
	this._selectedLine = false;
	this._selectedPoint = false;
	this._relations = [];
	this._components = [];
	this._diagram = null;
	this.setElements(a.a, a.b);
	f = this;
	if (this._elemB) {
		this.setMenu([
			[function() {
				f._elemB.showStyleDialog({
					that: f._elemB
				});
				f._elemB.removeContextualMenu()
			}, "Style"]
		]);
		this.setLineStyle(this._elemB.getLineStyle());
		this.setLineColor(this._elemB.getLineColor());
		this.setLineWidth(this._elemB.getLineWidth())
	}
};
JSFun.extend(SetLine, Relation);
SetLine.prototype._delUselessPoints = function() {};
SetLine.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		this.setType("SetLine");
		if (this.isOver(c, e)) {
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
	for (var d = 0; d > this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedLine = true;
			this._component = false;
			return true
		}
	}
	for (d = 0; d < this._points.length; d++) {
		if (Math.abs(c - this._points[d].getX()) <= 4 && Math.abs(e - this._points[d].getY()) <= 4) {
			if (d == 2) {
				return false
			}
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = d;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	for (var d = 0; d < this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	return false
};
SetLine.prototype._calculateLineEnds = function() {
	if (!this._elemB) {
		return false
	}
	var a = this._points[1];
	if (this._elemB._orientation) {
		if (this._points.length < 3) {
			var a = new Point(this._elemB._points[1].getX(), this._elemA.getCentralPoint().getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getY() < this._elemA.getY()) {
					this._points[2].setY(this._elemA.getY() - 20)
				} else {
					this._points[2].setY(this._elemA.getY() + this._elemA.getHeight() + 20)
				}
			}
			if (this._points[0].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[2].getX() <= this._elemA.getX()) {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX() - 10)
			} else {
				if (this._points[2].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[0].getX() <= this._elemA.getX()) {
					this._points[0].setX(this._elemA.getX() + this._elemA.getWidth());
					this._points[1].setX(this._elemA.getX() + this._elemA.getWidth() + 10)
				}
			}
		}
	} else {
		if (this._points.length < 3) {
			var a = new Point(this._elemA.getCentralPoint().getX(), this._elemB._points[1].getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getX() < this._elemA.getX()) {
					this._points[2].setX(this._elemA.getX() - 20)
				} else {
					this._points[2].setX(this._elemA.getX() + this._elemA.getWidth() + 20)
				}
			}
			if (this._points[0].getY() <= this._elemA.getY() && this._points[2].getY() > this._elemA.getY() + this._elemA.getHeight()) {
				this._points[0].setY(this._elemA.getY() + this._elemA.getHeight());
				this._points[1].setY(this._elemA.getY() + this._elemA.getHeight() + 10)
			} else {
				if (this._points[0].getY() >= this._elemA.getY() + this._elemA.getHeight() && this._points[2].getY() <= this._elemA.getY()) {
					this._points[0].setY(this._elemA.getY());
					this._points[1].setY(this._elemA.getY() - 10)
				}
			}
		}
	}
	if (this._points.length < 3) {
		this._points[1] = a;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = a
	}
	this._points[0] = this._elemA.getLinkCentered(this._points[1])
};
SetLine.prototype.setElementXML = function(g, a) {
	var l = g.getAttribute("side_A");
	var h = g.getAttribute("side_B");
	var c = a[h];
	var d = a[l];
	if (!(c instanceof GeneralizationSet)) {
		return null
	}
	c.addElement(d);
	relation = c._relations[c._relations.length - 1];
	this.setId(g.getAttribute("id"));
	var e;
	var m = g.childNodes;
	var b = 0;
	for (e = 0; e < m.length; e++) {
		if (m[e].nodeName == "point") {
			this._points[b] = new Point(parseInt(m[e].getAttribute("x")), parseInt(m[e].getAttribute("y")));
			b++
		}
	}
	c.delElement(d);
	this.setLineStyle(c.getLineStyle());
	this.setLineColor(c.getLineColor());
	this.setLineWidth(c.getLineWidth());
	this._type = "SetLine";
	this._elemA = d;
	this._elemB = c;
	c._relations.splice(c._relations.length - 1, 1, this);
	this._points[2] = c._points[c._pivotP];
	c._pivotP++;
	c.notifyChange();
	d.addRelation(this)
};
var InterfaceExtended = function(a) {
	a = a || {};
	this._abstract = false;
	InterfaceExtended.baseConstructor.call(this, a)
};
JSFun.extend(InterfaceExtended, Rectangular);
InterfaceExtended.prototype.getElementXML = function(a) {
	var b = InterfaceExtended.base.getElementXML.call(this, a);
	b.setAttribute("abstract", this.isAbstract());
	return b
};
InterfaceExtended.prototype.setElementXML = function(a) {
	this.setAbstract(a.getAttribute("abstract"));
	InterfaceExtended.base.setElementXML.call(this, a)
};
InterfaceExtended.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
InterfaceExtended.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
InterfaceExtended.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
InterfaceExtended.prototype.addOperation = function(a) {
	var a = a || "";
	this._components[4].addField(a)
};
InterfaceExtended.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
InterfaceExtended.prototype.getName = function() {
	return this._components[2].getValue()
};
InterfaceExtended.prototype.getAttributes = function() {
	return this._components[3]._childs
};
InterfaceExtended.prototype.getOperations = function() {
	return this._components[4]._childs
};
InterfaceExtended.prototype.getStereotype = function() {
	return this._components[0]
};
InterfaceExtended.prototype.getNameAsComponent = function() {
	return this._components[2]
};
InterfaceExtended.prototype.isAbstract = function() {
	return this._abstract
};
InterfaceExtended.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
var InterfaceRealization = function(a) {
	a = a || {};
	InterfaceRealization.baseConstructor.call(this, a)
};
JSFun.extend(InterfaceRealization, Relation);
InterfaceRealization.prototype.setName = function(a) {
	this._components[0].setValue(a)
};
InterfaceRealization.prototype.getName = function() {
	return this._components[0].getValue()
};
InterfaceRealization.prototype.getNameAsComponent = function() {
	return this._components[0]
};
var InterfaceUsage = function(a) {
	a = a || {};
	InterfaceUsage.baseConstructor.call(this, a)
};
JSFun.extend(InterfaceUsage, Relation);
InterfaceUsage.prototype.setName = function(a) {
	this._components[0].setValue(a)
};
InterfaceUsage.prototype.getName = function() {
	return this._components[0].getValue()
};
InterfaceUsage.prototype.getNameAsComponent = function() {
	return this._components[0]
};
InterfaceUsage.prototype.draw = function(b) {
	var l = this._points.length;
	if (this._line) {
		var d = this._points[l - 2].getX();
		var c = this._points[l - 2].getY();
		var h = this._points[l - 1].getX();
		var e = this._points[l - 1].getY();
		var g = Math.atan2(e - c, h - d);
		this._points[l - 1].setX(this._points[l - 1].getX() - (4 * Math.cos(g)));
		this._points[l - 1].setY(this._points[l - 1].getY() - (4 * Math.sin(g)));
		this._line.draw(b, this._points, this.getLineColor(), this.getLineWidth());
		this._points[l - 1].setX(this._points[l - 1].getX() + (4 * Math.cos(g)));
		this._points[l - 1].setY(this._points[l - 1].getY() + (4 * Math.sin(g)))
	}
	if (this._end) {
		var d = this._points[l - 2].getX();
		var c = this._points[l - 2].getY();
		var h = this._points[l - 1].getX();
		var e = this._points[l - 1].getY();
		var g = Math.atan2(e - c, h - d);
		this._end.draw(b, h, e, g, this.getLineColor())
	}
	if (this._start) {
		var h = this._points[0].getX();
		var e = this._points[0].getY();
		var d = this._points[1].getX();
		var c = this._points[1].getY();
		var g = Math.atan2(e - c, h - d);
		this._start.draw(b, h, e, g, this.getLineColor())
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
var InterfaceUse = function(a) {
	a = a || {};
	InterfaceUse.baseConstructor.call(this, a)
};
JSFun.extend(InterfaceUse, Relation);
InterfaceUse.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
InterfaceUse.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
InterfaceUse.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
InterfaceUse.prototype.getName = function() {
	return this._components[1].getValue()
};
InterfaceUse.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var NAssociation = function(a) {
	a = a || {};
	NAssociation.baseConstructor.call(this, a)
};
JSFun.extend(NAssociation, Rhombus);
NAssociation.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
NAssociation.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
NAssociation.prototype.setRole = function(a, b) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			this._relations[i].setComponentRoleA(b)
		}
	}
};
NAssociation.prototype.setMultiplicity = function(b, a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == b) {
			this._relations[i].setComponentMultiplicityA(a)
		}
	}
};
NAssociation.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
NAssociation.prototype.getName = function() {
	return this._components[1].getValue()
};
NAssociation.prototype.getRole = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a && this._relations[i]._roleA) {
			return this._relations[i]._roleA.getValue()
		}
	}
};
NAssociation.prototype.getMultiplicity = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a && this._relations[i]._multiA) {
			return this._relations[i]._multiA.getValue()
		}
	}
};
NAssociation.prototype.getNameAsComponent = function() {
	return this._components[1]
};
NAssociation.prototype.getRelations = function() {
	return this._relations
};
NAssociation.prototype.setElements = function(b, a) {
	if (!(b instanceof Array)) {
		if (b instanceof Node && a instanceof Node) {
			relation = new AssociationN({
				a: b,
				b: this
			});
			relation._calculateLineEnds();
			relation.updateParent();
			relation = new AssociationN({
				a: a,
				b: this
			});
			relation._calculateLineEnds();
			relation.updateParent();
			this.notifyChange();
			return true
		}
		return false
	}
	for (i in b) {
		if (!(b[i] instanceof Node)) {
			return false
		}
	}
	if (b[0] && b[1]) {
		this.setElements(b.shift(), b.shift());
		while (b[0]) {
			this.addElement(b.shift())
		}
		this.notifyChange();
		return true
	} else {
		return false
	}
};
NAssociation.prototype.getRelation = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			return this._relations[i]
		}
	}
};
NAssociation.prototype.addElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			return false
		}
	}
	relation = new AssociationN({
		a: a,
		b: this
	});
	relation._calculateLineEnds();
	relation.updateParent();
	this.notifyChange();
	return true
};
NAssociation.prototype.delElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			this._relations[i].remove();
			return true
		}
	}
	return false
};
var AssociationN = function(b) {
	var b = b || {};
	var a = new Relation(b);
	a.setType("AssociationN");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentMultiplicityA();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	return a
};
var NodeInterface = function(a) {
	a = a || {};
	this._abstract = false;
	NodeInterface.baseConstructor.call(this, a)
};
JSFun.extend(NodeInterface, Elliptical);
NodeInterface.prototype.draw = function(b) {
	var d = false;
	var c = false;
	if (this._relations.length <= 0) {
		d = true
	}
	var a;
	for (a in this._relations) {
		if (this._relations[a].getType() == "UMLInterfaceRealization" || this._relations[a].getType() == "UMLInterfaceUsage") {
			c = true;
			break
		}
	}
	NodeInterface.base.draw.call(this, b);
	if (this._selected) {
		this.drawComponentsShape(b)
	}
};
NodeInterface.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
NodeInterface.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
NodeInterface.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
NodeInterface.prototype.getName = function() {
	return this._components[1].getValue()
};
NodeInterface.prototype.getStereotype = function() {
	return this._components[0]
};
NodeInterface.prototype.getNameAsComponent = function() {
	return this._components[1]
};
NodeInterface.prototype.getElementXML = function(a) {
	var b = NodeInterface.base.getElementXML.call(this, a);
	b.setAttribute("abstract", this.isAbstract());
	return b
};
NodeInterface.prototype.setElementXML = function(a) {
	this.setAbstract(a.getAttribute("abstract"));
	NodeInterface.base.setElementXML.call(this, a)
};
NodeInterface.prototype.isAbstract = function() {
	return this._abstract
};
NodeInterface.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
var NodePorts = function(a) {
	a = a || {};
	this._abstract = false;
	NodePorts.baseConstructor.call(this, a);
	this._ports = []
};
JSFun.extend(NodePorts, Node);
NodePorts.prototype.addPort = function(a) {
	if (a instanceof Node && a.getType() == "UMLPort") {
		this._ports.push(a);
		this._diagram._addNode(a);
		a.setParent(this);
		a.correctPosition()
	}
};
NodePorts.prototype.setSelectedFigure = function(b) {
	var a = NodePorts.base.setSelectedFigure.call(this, b);
	if (a) {
		if (this._figures[b] instanceof FromImageFigure) {
			for (i in this._ports) {
				this._ports[i].setVisibility(false)
			}
		} else {
			for (i in this._ports) {
				this._ports[i].setVisibility(true)
			}
		}
	}
};
NodePorts.prototype.setVisibility = function(a) {
	NodePorts.base.setVisibility.call(this, a);
	var b = true;
	if (this._selectedFigure && a) {
		b = false
	}
	if (this._container && b) {
		for (i in this._ports) {
			this._ports[i].setVisibility(a)
		}
	}
};
NodePorts.prototype.updatePosition = function(c, a) {
	if (c == undefined && a == undefined) {
		var e = this.getMovement();
		var g = e.getX();
		var d = e.getY()
	} else {
		var g = c;
		var d = a
	}
	var b;
	for (b in this._ports) {
		this._ports[b].updatePosition(g, d)
	}
	NodePorts.base.updatePosition.call(this, c, a)
};
NodePorts.prototype.notifyChange = function() {
	NodePorts.base.notifyChange.call(this);
	var a;
	for (a in this._ports) {
		this._ports[a].correctPosition();
		this._ports[a].notifyChange()
	}
};
NodePorts.prototype.updateContainer = function() {
	NodePorts.base.updateContainer.call(this);
	for (i in this._ports) {
		this._ports[i].correctPosition();
		this._ports[i].notifyChange()
	}
};
NodePorts.prototype.remove = function() {
	NodePorts.base.remove.call(this);
	var a;
	for (a in this._ports) {
		this._ports[a].remove()
	}
};
NodePorts.prototype.getElementXML = function(b) {
	var c = NodePorts.base.getElementXML.call(this, b);
	c.setAttribute("abstract", this.isAbstract());
	var a;
	for (a in this._ports) {
		c.appendChild(this._ports[a].getElementXML(b))
	}
	return c
};
NodePorts.prototype.setElementXML = function(a) {
	this.setAbstract(a.getAttribute("abstract"));
	NodePorts.base.setElementXML.call(this, a)
};
NodePorts.prototype.addChild = function(a) {
	if (a instanceof Port) {
		this._ports.push(a);
		a.setParent(this);
		a.correctPosition();
		return
	} else {
		NodePorts.base.addChild.call(this, a)
	}
};
NodePorts.prototype.notifyDeleted = function(b) {
	if (b instanceof Port) {
		var a;
		for (a in this._ports) {
			if (this._ports[a] == b) {
				this._ports.splice(a, 1)
			}
		}
	} else {
		NodePorts.base.notifyDeleted.call(this, b)
	}
};
NodePorts.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[2].addField("\xAB" + a + "\xBB")
};
NodePorts.prototype.setName = function(a) {
	this._components[3].setValue(a)
};
NodePorts.prototype.addInterface = function(a) {
	var a = a || "";
	this._components[4].addField(a)
};
NodePorts.prototype.addRealization = function(a) {
	var a = a || "";
	this._components[5].addField(a)
};
NodePorts.prototype.addArtifact = function(a) {
	var a = a || "";
	this._components[6].addField(a)
};
NodePorts.prototype.getStereotypes = function() {
	return this._components[2]._childs
};
NodePorts.prototype.getName = function() {
	return this._components[3].getValue()
};
NodePorts.prototype.getInterfaces = function() {
	return this._components[4]._childs
};
NodePorts.prototype.getRealizations = function() {
	return this._components[5]._childs
};
NodePorts.prototype.getArtifacts = function() {
	return this._components[6]._childs
};
NodePorts.prototype.getStereotype = function() {
	return this._components[2]
};
NodePorts.prototype.getNameAsComponent = function() {
	return this._components[3]
};
NodePorts.prototype.isAbstract = function() {
	return this._abstract
};
NodePorts.prototype.setAbstract = function(a) {
	this._abstract = a;
	if (this._abstract == true) {
		this.getNameAsComponent().setFontStyle("italic")
	} else {
		if (this.getNameAsComponent().getFontStyle() == "italic") {
			this.getNameAsComponent().setFontStyle("normal")
		}
	}
};
NodePorts.prototype.getPorts = function() {
	return this._ports
};
var Package = function(a) {
	a = a || {};
	Package.baseConstructor.call(this, a)
};
JSFun.extend(Package, Rectangular);
Package.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
Package.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
Package.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
Package.prototype.getName = function() {
	return this._components[2].getValue()
};
Package.prototype.getStereotype = function() {
	return this._components[1]
};
Package.prototype.getNameAsComponent = function() {
	return this._components[2]
};
var PackageContainer = function(a) {
	a = a || {};
	PackageContainer.baseConstructor.call(this, a)
};
JSFun.extend(PackageContainer, Rectangular);
PackageContainer.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
PackageContainer.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
PackageContainer.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
PackageContainer.prototype.getName = function() {
	return this._components[1].getValue()
};
PackageContainer.prototype.getStereotype = function() {
	return this._components[0]
};
PackageContainer.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Realization = function(a) {
	a = a || {};
	Realization.baseConstructor.call(this, a)
};
JSFun.extend(Realization, Relation);
Realization.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Realization.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Realization.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Realization.prototype.getName = function() {
	return this._components[1].getValue()
};
Realization.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLComponentDiagram = function(b) {
	var a = new ComponentDiagram(b);
	a.setType("UMLComponentDiagram");
	a.setName("Component diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLArtifact", "UMLClass", "UMLComComponent", "UMLComposition", "UMLInterface", "UMLInterfaceExtended", "UMLInterfaceUsage", "UMLInterfaceRealization", "UMLPort", "UMLGeneralization", "UMLGeneralizationSet", "SetLine", "UMLDependency", "UMLRealization", "UMLInterfaceExtended", "UMLConnector", "UMLNAssociation", "UMLAssociation", "UMLInterfaceUse", "UMLPackage", "UMLPackageContainer"]);
	return a
};
var UMLPackage = function(b) {
	var b = b || {};
	var a = new Package(b);
	a.setType("UMLPackage");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(100);
	a.setHeight(50);
	a.addFigure(new PackageFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new Space({
		height: 16
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Package name",
		centered: true,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLPackageContainer = function(b) {
	var b = b || {};
	var a = new PackageContainer(b);
	a.setType("UMLPackageContainer");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(75);
	a.setMoveable();
	a.setContainer();
	a.addFigure(new RectangleFigure({
		color: "#bdd8e5"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes"
	}));
	a.addComponent(new Tab({
		id: "name",
		margin: 5,
		text: "Package name"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLComComponent = function(b) {
	var b = b || {};
	var a = new NodePorts(b);
	a.setType("UMLComComponent");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setContainer();
	a.setMoveable();
	a.setWidth(150);
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new ComponentSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.addComponent(new Text({
		text: "\xABcomponent\xBB",
		centered: true
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Component Name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "interfaces",
		text: "new_interface",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "realizations",
		text: "new_realization",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "artifacts",
		text: "new_artifact",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: 'attributes',
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: 'operations',
		visibleSubComponents: false,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLClass = function(b) {
	var b = b || {};
	var a = new Class(b);
	a.setType("UMLClass");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "ClassName",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "operations",
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLArtifact = function(b) {
	var b = b || {};
	var a = new Artifact(b);
	a.setType("UMLArtifact");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new Text({
		text: "\xABartifact\xBB",
		centered: true,
		margin: 3
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Artifact Name",
		centered: true,
		margin: 3
	}));
	a.getNameAsComponent().setUnderlineText(true);
	a.addComponent(new PropertyFields({
		id: "properties",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new ArtifactSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLInterface = function(b) {
	var b = b || {};
	var a = new NodeInterface(b);
	a.setType("UMLInterface");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(16);
	a.setHeight(16);
	a.addFigure(new EllipseFigure({
		color: "#67ac88"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLInterfaceExtended = function(b) {
	var b = b || {};
	var a = new InterfaceExtended(b);
	a.setType("UMLInterfaceExtended");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(150);
	a.addFigure(new RectangleFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new CircleSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Interface Name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "methods",
		visibleSubComponents: false,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.setAbstract(!a.isAbstract());
			a.removeContextualMenu()
		}, "Change abstract property"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLInterfaceUsage = function(b) {
	var a = new InterfaceUsage(b);
	a.setType("UMLInterfaceUsage");
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new InterfaceUsageEnd());
	return a
};
var UMLInterfaceRealization = function(b) {
	var a = new InterfaceRealization(b);
	a.setType("UMLInterfaceRealization");
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	return a
};
var UMLConnector = function(b) {
	var a = new ConnectorRelation(b);
	a.setType("UMLConnector");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	return a
};
var UMLPort = function(b) {
	var b = b || {};
	var a = new Port(b);
	a.setType("UMLPort");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLGeneralization = function(b) {
	var a = new Generalization(b);
	a.setType("UMLGeneralization");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new CloseTip());
	return a
};
var UMLGeneralizationSet = function(b) {
	var a = new GeneralizationSet(b);
	a.setType("UMLGeneralizationSet");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.addComponentStereotype();
	a.setComponentName();
	return a
};
var UMLDependency = function(b) {
	var a = new Dependency(b);
	a.setType("UMLDependency");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLAssociation = function(b) {
	var a = new Association(b);
	a.setType("UMLAssociation");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentRoleB();
	a.setComponentMultiplicityA();
	a.setComponentMultiplicityB();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	return a
};
var UMLNAssociation = function(b) {
	var b = b || {};
	var a = new NAssociation(b);
	a.setMoveable();
	setStereotypeProperties(a, b.stereotypes || []);
	a.setType("UMLNAssociation");
	a.addFigure(new RhombusFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: " ",
		centered: true,
		margin: 3
	}));
	return a
};
var UMLInterfaceUse = function(b) {
	var a = new InterfaceUse(b);
	a.setType("UMLInterfaceUse");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var Artifact = function(a) {
	a = a || {};
	Artifact.baseConstructor.call(this, a)
};
JSFun.extend(Artifact, Rectangular);
Artifact.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
Artifact.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
Artifact.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
Artifact.prototype.addOperation = function(a) {
	var a = a || "";
	this._components[4].addField(a)
};
Artifact.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
Artifact.prototype.getName = function() {
	return this._components[2].getValue()
};
Artifact.prototype.getStereotype = function() {
	return this._components[1]
};
Artifact.prototype.getNameAsComponent = function() {
	return this._components[2]
};
Artifact.prototype.getAttributes = function() {
	return this._components[3]._childs
};
Artifact.prototype.getOperations = function() {
	return this._components[4]._childs
};
var Association = function(a) {
	a = a || {};
	Association.baseConstructor.call(this, a)
};
JSFun.extend(Association, Relation);
Association.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Association.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Association.prototype.setRoleA = function(a) {
	this._components[2].setValue(a)
};
Association.prototype.setRoleB = function(a) {
	this._components[3].setValue(a)
};
Association.prototype.setMultiplicityA = function(a) {
	this._components[4].setValue(a)
};
Association.prototype.setMultiplicityB = function(a) {
	this._components[5].setValue(a)
};
Association.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Association.prototype.getName = function() {
	return this._components[1].getValue()
};
Association.prototype.getRoleA = function() {
	return this._components[2].getValue()
};
Association.prototype.getRoleB = function() {
	return this._components[3].getValue()
};
Association.prototype.getMultiplicityA = function() {
	return this._components[4].getValue()
};
Association.prototype.getMultiplicityB = function() {
	return this._components[5].getValue()
};
Association.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Dependency = function(a) {
	a = a || {};
	Dependency.baseConstructor.call(this, a)
};
JSFun.extend(Dependency, Relation);
Dependency.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Dependency.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Dependency.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Dependency.prototype.getName = function() {
	return this._components[1].getValue()
};
Dependency.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var DeploymentDiagram = function(a) {
	DeploymentDiagram.baseConstructor.call(this, a)
};
JSFun.extend(DeploymentDiagram, Diagram);
DeploymentDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
DeploymentDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var DeploymentSpecification = function(a) {
	a = a || {};
	DeploymentSpecification.baseConstructor.call(this, a)
};
JSFun.extend(DeploymentSpecification, Rectangular);
DeploymentSpecification.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
DeploymentSpecification.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
DeploymentSpecification.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
DeploymentSpecification.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
DeploymentSpecification.prototype.getName = function() {
	return this._components[2].getValue()
};
DeploymentSpecification.prototype.getStereotype = function() {
	return this._components[1]
};
DeploymentSpecification.prototype.getNameAsComponent = function() {
	return this._components[2]
};
DeploymentSpecification.prototype.getAttribute = function() {
	return this._components[3]._childs
};
var Generalization = function(a) {
	a = a || {};
	Generalization.baseConstructor.call(this, a)
};
JSFun.extend(Generalization, Relation);
Generalization.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Generalization.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Generalization.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Generalization.prototype.getName = function() {
	return this._components[1].getValue()
};
Generalization.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var GeneralizationSet = function(a) {
	a = a || {};
	this._pivotP = 2;
	GeneralizationSet.baseConstructor.call(this)
};
JSFun.extend(GeneralizationSet, Relation);
GeneralizationSet.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
GeneralizationSet.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
GeneralizationSet.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
GeneralizationSet.prototype.getName = function() {
	return this._components[1].getValue()
};
GeneralizationSet.prototype.getNameAsComponent = function() {
	return this._components[1]
};
GeneralizationSet.prototype.getRelations = function() {
	return this._relations
};
GeneralizationSet.prototype.setElements = function(b, a) {
	if (!(b instanceof Array)) {
		if (GeneralizationSet.base.setElements.call(this, b, a)) {
			this.updateParent();
			if (!this._orientation) {
				this._orientation = this._calculateOrientation()
			}
			return true
		}
		return false
	}
	for (i in b) {
		if (!(b[i] instanceof Node)) {
			return false
		}
	}
	if (b.length > 1) {
		this.setElements(b.shift(), b.shift());
		while (b[0]) {
			this.addElement(b.shift())
		}
		this.updateParent();
		if (!this._orientation) {
			this._orientation = this._calculateOrientation()
		}
		this._calculateLineEnds();
		return true
	} else {
		return false
	}
};
GeneralizationSet.prototype.getRelation = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			return this._relations[i]
		}
	}
};
GeneralizationSet.prototype.addElement = function(b) {
	if (!(b instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == b || this._relations[i]._elemB == b) {
			return false
		}
	}
	relation = new SetLine({
		a: b,
		b: this
	});
	relation._calculateLineEnds();
	var a = new Point(relation.getCentralPoint());
	this._points.splice(this._pivotP, 0, a);
	relation._calculateLineEnds();
	relation._points[2] = this._points[this._pivotP];
	this._pivotP++;
	this.notifyChange();
	return true
};
GeneralizationSet.prototype.delElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			this._relations[i].remove();
			return true
		}
	}
	return false
};
GeneralizationSet.prototype.notifyDeleted = function(a) {
	for (i = 0; i < this._relations.length; i++) {
		if (this._relations[i] === a && this._relations[i].getType() == "SetLine") {
			this._relations.splice(i, 1);
			this._pivotP--;
			this._points.splice(2 + i, 1)
		}
	}
};
GeneralizationSet.prototype._calculateLineEnds = function() {
	var a, p;
	var g = this._points.length;
	if (!this._points[3]) {
		a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
		p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
		this._points[0] = a;
		this._points[1] = p;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = new Point(this.getCentralPoint());
		this._points[3] = this._points[1];
		this._points[1] = this._points[2];
		this._points[2] = this._points[3];
		this._pivotP = 2;
		this._points[3] = p
	}
	if (this._elemA == this._elemB) {
		var b = this._elemA.getCentralPoint();
		var d = b.getX();
		var c = b.getY();
		var n = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
		var h = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
		var e;
		var m;
		if (this._selected == 2 || this._selected == 0 || this._selected == g - 1 || (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing) {
			if ((n - d) > 0) {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() + m, a.getY() + e);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() + m, a.getY() - e);
					this._points[3] = new Point(p.getX() + m, c)
				}
			} else {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() - m, a.getY() + e);
					this._points[3] = new Point(p.getX() - m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() - m, a.getY() - e);
					this._points[3] = new Point(p.getX() - m, c)
				}
			}
		} else {
			if (this._selected == 3) {
				n = this._points[3]._x;
				h = this._points[3]._y;
				a = this._elemA.getLinkCentered(d, this._points[0]._y);
				if ((n - d) > 0) {
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() + m);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() - m);
					this._points[3] = new Point(p.getX() - m, c)
				}
			} else {
				if (this._selected == 1) {
					n = this._points[1]._x;
					h = this._points[1]._y;
					p = this._elemA.getLinkCentered(this._points[4]._x, c);
					if ((h - c) > 0) {
						a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
						e = h - a.getY();
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() + e);
						this._points[2].setY(a.getY() + e)
					} else {
						a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
						e = a.getY() - h;
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() - e);
						this._points[2].setY(a.getY() - e)
					}
				} else {
					if (this._selected == 2) {
						var o = 0;
						var l = 0;
						if (this._elemA._moved) {
							var o = (this._elemA._x - this._elemA._prex) / 2;
							var l = (this._elemA._y - this._elemA._prey) / 2;
							this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
							this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
							a = this._points[0];
							p = this._points[4];
							this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
							this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
							this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
						}
					} else {
						if (this._selected == -1) {
							var o = 0;
							var l = 0;
							if (this._elemA._moved) {
								var o = (this._elemA._x - this._elemA._prex) / 2;
								var l = (this._elemA._y - this._elemA._prey) / 2;
								this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
								this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
								a = this._points[0];
								p = this._points[4];
								this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
								this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
								this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
							}
						}
					}
				}
			}
		}
		this._points[0] = a;
		this._points[4] = p;
		while (this._points[5]) {
			this._points.pop()
		}
	} else {
		if (g == 4) {
			a = this._elemA.getLinkCentered(this._points[1]);
			p = this._elemB.getLinkCentered(this._points[this._pivotP]);
			this._points[0] = a;
			this._points[3] = p
		} else {
			if (g > 4) {
				a = this._elemA.getLinkCentered(this._points[1]);
				p = this._elemB.getLinkCentered(this._points[this._pivotP]);
				this._points[0] = a;
				this._points[this._points.length - 1] = p;
				for (i = 0; i < this._relations.length; i++) {
					this._relations[i]._calculateLineEnds()
				}
				if (this._orientation) {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setX(this._points[this._pivotP].getX())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setY(this._points[1].getY() + 5)
					}
				} else {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setY(this._points[this._pivotP].getY())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setX(this._points[1].getX() + 5)
					}
				}
			} else {
				a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
				p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
				this._points[0] = a;
				this._points[1] = p;
				this._points[1] = new Point(this.getCentralPoint());
				this._points[2] = new Point(this.getCentralPoint());
				this._points[3] = this._points[1];
				this._points[1] = this._points[2];
				this._points[2] = this._points[3];
				this._pivotP = 2;
				this._points[3] = p
			}
		}
	}
};
GeneralizationSet.prototype._delUselessPoints = function() {
	var a;
	for (a = this._points.length - 1; a > this._pivotP; a--) {
		if (this._selectLine(this._points[a + 1], this._points[a - 1], this._points[a].getX(), this._points[a].getY(), 10)) {
			this._points.splice(a, 1)
		}
	}
};
GeneralizationSet.prototype.draw = function(c) {
	var h = this._points.length;
	var n = [];
	for (e = this._pivotP; e < h; e++) {
		n.push(this._points[e])
	}
	if (this._line) {
		this._line.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	if (this._end) {
		var b = this._points[h - 2].getX();
		var o = this._points[h - 2].getY();
		var l = this._points[h - 1].getX();
		var g = this._points[h - 1].getY();
		var d = Math.atan2(g - o, l - b);
		this._end.draw(c, l, g, d, this.getLineColor())
	}
	if (this._selected >= 0) {
		var e;
		for (e = 0; e < this._points.length; e++) {
			c.fillRect(parseInt(this._points[e].getX()) - 3, parseInt(this._points[e].pixelY()) - 3, 6, 6)
		}
	}
	n = [];
	for (e = 1; e <= this._pivotP; e++) {
		n.push(this._points[e])
	}
	if (n.length > 1) {
		if (this.getLineStyle() == "solid") {
			var m = new SolidLine()
		} else {
			var m = new DashedLine()
		}
		m.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	n = [];
	n[0] = this._points[0];
	n[1] = this._points[1];
	n[2] = this._points[this._pivotP];
	if (this.getLineStyle() == "solid") {
		var m = new SolidLine()
	} else {
		var m = new DashedLine()
	}
	m.draw(c, n, this.getLineColor(), this.getLineWidth());
	if (this._selected > -1) {
		this._drawComponentsShape(c)
	}
	this._drawComponents(c)
};
GeneralizationSet.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		if (this.isOver(c, e)) {
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
			if (d >= this._pivotP) {
				this._selectedLine = true;
				this._component = false;
				this._points.splice(this._selected, 0, new Point(c, e))
			} else {
				if (d >= 1) {
					this._selectedPoint = true;
					this._component = false;
					this._selected = this._pivotP
				} else {
					this._selectedPoint = true;
					this._component = false;
					this._selected = 1
				}
			}
			return true
		}
	}
	return false
};
GeneralizationSet.prototype._calculateOrientation = function() {
	var a = (this._elemA.getCentralPoint().getY() - this._elemB.getCentralPoint().getY()) / (this._elemA.getCentralPoint().getX() - this._elemB.getCentralPoint().getX());
	return (a < 1 && a > -1)
};
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation
};
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation
};
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation = true
};
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation = false
};
GeneralizationSet.prototype.getOrientation = function() {
	if (this._orientation) {
		return "x"
	}
	return "y"
};
GeneralizationSet.prototype.setLineStyle = function(a) {
	if (!(GeneralizationSet.base.setLineStyle.call(this, a))) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			if (!(this._relations[i].setLineStyle(a))) {
				return false
			}
		}
	}
	return true
};
GeneralizationSet.prototype.setLineColor = function(a) {
	GeneralizationSet.base.setLineColor.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineColor(a)
		}
	}
};
GeneralizationSet.prototype.setLineWidth = function(a) {
	GeneralizationSet.base.setLineWidth.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineWidth(a)
		}
	}
};
var SetLine = function(a) {
	a = a || {};
	this._last = null;
	this._id = 0;
	this._type = "SetLine";
	this._line_color = "#000000";
	this._line_width = 1.25;
	this._points = [new Point(), new Point()];
	this._selected = -1;
	this._selectedBefore = false;
	this._moved = false;
	this._activeComponent = null;
	this._selectedLine = false;
	this._selectedPoint = false;
	this._relations = [];
	this._components = [];
	this._diagram = null;
	this.setElements(a.a, a.b);
	f = this;
	if (this._elemB) {
		this.setMenu([
			[function() {
				f._elemB.showStyleDialog({
					that: f._elemB
				});
				f._elemB.removeContextualMenu()
			}, "Style"]
		]);
		this.setLineStyle(this._elemB.getLineStyle());
		this.setLineColor(this._elemB.getLineColor());
		this.setLineWidth(this._elemB.getLineWidth())
	}
};
JSFun.extend(SetLine, Relation);
SetLine.prototype._delUselessPoints = function() {};
SetLine.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		this.setType("SetLine");
		if (this.isOver(c, e)) {
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
	for (var d = 0; d > this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedLine = true;
			this._component = false;
			return true
		}
	}
	for (d = 0; d < this._points.length; d++) {
		if (Math.abs(c - this._points[d].getX()) <= 4 && Math.abs(e - this._points[d].getY()) <= 4) {
			if (d == 2) {
				return false
			}
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = d;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	for (var d = 0; d < this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	return false
};
SetLine.prototype._calculateLineEnds = function() {
	if (!this._elemB) {
		return false
	}
	var a = this._points[1];
	if (this._elemB._orientation) {
		if (this._points.length < 3) {
			var a = new Point(this._elemB._points[1].getX(), this._elemA.getCentralPoint().getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getY() < this._elemA.getY()) {
					this._points[2].setY(this._elemA.getY() - 20)
				} else {
					this._points[2].setY(this._elemA.getY() + this._elemA.getHeight() + 20)
				}
			}
			if (this._points[0].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[2].getX() <= this._elemA.getX()) {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX() - 10)
			} else {
				if (this._points[2].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[0].getX() <= this._elemA.getX()) {
					this._points[0].setX(this._elemA.getX() + this._elemA.getWidth());
					this._points[1].setX(this._elemA.getX() + this._elemA.getWidth() + 10)
				}
			}
		}
	} else {
		if (this._points.length < 3) {
			var a = new Point(this._elemA.getCentralPoint().getX(), this._elemB._points[1].getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getX() < this._elemA.getX()) {
					this._points[2].setX(this._elemA.getX() - 20)
				} else {
					this._points[2].setX(this._elemA.getX() + this._elemA.getWidth() + 20)
				}
			}
			if (this._points[0].getY() <= this._elemA.getY() && this._points[2].getY() > this._elemA.getY() + this._elemA.getHeight()) {
				this._points[0].setY(this._elemA.getY() + this._elemA.getHeight());
				this._points[1].setY(this._elemA.getY() + this._elemA.getHeight() + 10)
			} else {
				if (this._points[0].getY() >= this._elemA.getY() + this._elemA.getHeight() && this._points[2].getY() <= this._elemA.getY()) {
					this._points[0].setY(this._elemA.getY());
					this._points[1].setY(this._elemA.getY() - 10)
				}
			}
		}
	}
	if (this._points.length < 3) {
		this._points[1] = a;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = a
	}
	this._points[0] = this._elemA.getLinkCentered(this._points[1])
};
SetLine.prototype.setElementXML = function(g, a) {
	var l = g.getAttribute("side_A");
	var h = g.getAttribute("side_B");
	var c = a[h];
	var d = a[l];
	if (!(c instanceof GeneralizationSet)) {
		return null
	}
	c.addElement(d);
	relation = c._relations[c._relations.length - 1];
	this.setId(g.getAttribute("id"));
	var e;
	var m = g.childNodes;
	var b = 0;
	for (e = 0; e < m.length; e++) {
		if (m[e].nodeName == "point") {
			this._points[b] = new Point(parseInt(m[e].getAttribute("x")), parseInt(m[e].getAttribute("y")));
			b++
		}
	}
	c.delElement(d);
	this.setLineStyle(c.getLineStyle());
	this.setLineColor(c.getLineColor());
	this.setLineWidth(c.getLineWidth());
	this._type = "SetLine";
	this._elemA = d;
	this._elemB = c;
	c._relations.splice(c._relations.length - 1, 1, this);
	this._points[2] = c._points[c._pivotP];
	c._pivotP++;
	c.notifyChange();
	d.addRelation(this)
};
var InstanceArtifact = function(a) {
	a = a || {};
	InstanceArtifact.baseConstructor.call(this, a)
};
JSFun.extend(InstanceArtifact, Rectangular);
InstanceArtifact.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
InstanceArtifact.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
InstanceArtifact.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
InstanceArtifact.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
InstanceArtifact.prototype.getName = function() {
	return this._components[2].decode(this._components[2].getValue())[0]
};
InstanceArtifact.prototype.getAttributes = function() {
	return this._components[3]._childs
};
InstanceArtifact.prototype.getStereotype = function() {
	return this._components[1]
};
InstanceArtifact.prototype.getNameAsComponent = function() {
	return this._components[2]
};
var NAssociation = function(a) {
	a = a || {};
	NAssociation.baseConstructor.call(this, a)
};
JSFun.extend(NAssociation, Rhombus);
NAssociation.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
NAssociation.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
NAssociation.prototype.setRole = function(a, b) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			this._relations[i].setComponentRoleA(b)
		}
	}
};
NAssociation.prototype.setMultiplicity = function(b, a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == b) {
			this._relations[i].setComponentMultiplicityA(a)
		}
	}
};
NAssociation.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
NAssociation.prototype.getName = function() {
	return this._components[1].getValue()
};
NAssociation.prototype.getRole = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a && this._relations[i]._roleA) {
			return this._relations[i]._roleA.getValue()
		}
	}
};
NAssociation.prototype.getMultiplicity = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a && this._relations[i]._multiA) {
			return this._relations[i]._multiA.getValue()
		}
	}
};
NAssociation.prototype.getNameAsComponent = function() {
	return this._components[1]
};
NAssociation.prototype.getRelations = function() {
	return this._relations
};
NAssociation.prototype.setElements = function(b, a) {
	if (!(b instanceof Array)) {
		if (b instanceof Node && a instanceof Node) {
			relation = new AssociationN({
				a: b,
				b: this
			});
			relation._calculateLineEnds();
			relation.updateParent();
			relation = new AssociationN({
				a: a,
				b: this
			});
			relation._calculateLineEnds();
			relation.updateParent();
			this.notifyChange();
			return true
		}
		return false
	}
	for (i in b) {
		if (!(b[i] instanceof Node)) {
			return false
		}
	}
	if (b[0] && b[1]) {
		this.setElements(b.shift(), b.shift());
		while (b[0]) {
			this.addElement(b.shift())
		}
		this.notifyChange();
		return true
	} else {
		return false
	}
};
NAssociation.prototype.getRelation = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			return this._relations[i]
		}
	}
};
NAssociation.prototype.addElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			return false
		}
	}
	relation = new AssociationN({
		a: a,
		b: this
	});
	relation._calculateLineEnds();
	relation.updateParent();
	this.notifyChange();
	return true
};
NAssociation.prototype.delElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == a) {
			this._relations[i].remove();
			if (this._relations.length >= 2 && (a == this._elemA || a == this._elemB)) {
				this._elemA = this._relations[0]._elemA;
				this._elemB = this._relations[1]._elemA
			} else {
				if (this._relations.length < 2) {
					this.remove()
				}
			}
			return true
		}
	}
	return false
};
var AssociationN = function(b) {
	var b = b || {};
	var a = new Relation(b);
	a.setType("AssociationN");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentMultiplicityA();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	return a
};
var NodeElement = function(a) {
	a = a || {};
	NodeElement.baseConstructor.call(this, a)
};
JSFun.extend(NodeElement, Cube);
NodeElement.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
NodeElement.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
NodeElement.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
NodeElement.prototype.getName = function() {
	return this._components[1].getValue()
};
NodeElement.prototype.getStereotype = function() {
	return this._components[0]
};
NodeElement.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var NodeTextNotation = function(a) {
	a = a || {};
	NodeTextNotation.baseConstructor.call(this, a)
};
JSFun.extend(NodeTextNotation, Cube);
NodeTextNotation.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
NodeTextNotation.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
NodeTextNotation.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
NodeTextNotation.prototype.getName = function() {
	return this._components[1].getValue()
};
NodeTextNotation.prototype.getStereotype = function() {
	return this._components[0]
};
NodeTextNotation.prototype.getNameAsComponent = function() {
	return this._components[1]
};
NodeTextNotation.prototype.getArtifacts = function() {
	return this._components[2]._childs
};
NodeTextNotation.prototype.addArtifact = function(a) {
	var a = a || "";
	this._components[2].addField(a)
};
var UMLDeploymentDiagram = function(b) {
	var a = new DeploymentDiagram(b);
	a.setType("UMLDeploymentDiagram");
	a.setName("Deployment diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLAssociation", "UMLDependency", "UMLGeneralization", "UMLGeneralizationSet", "SetLine", "UMLNAssociation", "AssociationN", "UMLArtifact", "UMLInstance", "UMLNode", "UMLNodeTextNotation", "UMLDeploymentSpecification", "UMLManifestation", "UMLDeployment"]);
	return a
};
var UMLInstanceArtifact = function(b) {
	var b = b || {};
	var a = new InstanceArtifact(b);
	a.setType("UMLInstance");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new Text({
		text: "\xABartifact\xBB",
		centered: true,
		margin: 3
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Artifact Name",
		centered: true,
		margin: 3
	}));
	a.getNameAsComponent().setUnderlineText(true);
	a.addComponent(new AttributeFields({
		id: "attributes",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new ArtifactSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLArtifact = function(b) {
	var b = b || {};
	var a = new Artifact(b);
	a.setType("UMLArtifact");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new Text({
		text: "\xABartifact\xBB",
		centered: true,
		margin: 3
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Artifact Name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new OperationFields({
		id: "operations",
		visibleSubComponents: false,
		margin: 3
	}));
	a.addComponent(new ArtifactSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLNode = function(b) {
	var b = b || {};
	var a = new NodeElement(b);
	a.setType("UMLNode");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(75);
	a.setMoveable();
	a.setContainer();
	a.addFigure(new CubeFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Node name",
		centered: true,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLNodeTextNotation = function(b) {
	var b = b || {};
	var a = new NodeTextNotation(b);
	a.setType("UMLNodeTextNotation");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(75);
	a.setMoveable();
	a.addFigure(new CubeFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Node name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new ArtifactFields({
		id: "artifacts",
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLDeploymentSpecification = function(b) {
	var b = b || {};
	var a = new DeploymentSpecification(b);
	a.setType("UMLDeploymentSpecification");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new Text({
		text: "\xABdeployment spec\xBB",
		centered: true,
		margin: 3
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		visibleSubComponents: false,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLAssociation = function(b) {
	var a = new Association(b);
	a.setType("UMLAssociation");
	a.addComponentStereotype();
	a.setComponentName();
	a.setComponentRoleA();
	a.setComponentRoleB();
	a.setComponentMultiplicityA();
	a.setComponentMultiplicityB();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			a.showDirectionDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Navegability"]
	]);
	a.setLine(new SolidLine());
	return a
};
var UMLDependency = function(b) {
	var a = new Dependency(b);
	a.setType("UMLDependency");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLGeneralization = function(b) {
	var a = new Generalization(b);
	a.setType("UMLGeneralization");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.addComponentStereotype();
	a.setComponentName();
	a.setLine(new SolidLine());
	a.setEnd(new CloseTip());
	return a
};
var UMLNAssociation = function(b) {
	var b = b || {};
	var a = new NAssociation(b);
	a.setMoveable();
	setStereotypeProperties(a, b.stereotypes || []);
	a.setType("UMLNAssociation");
	a.addFigure(new RhombusFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: " ",
		centered: true,
		margin: 3
	}));
	return a
};
var UMLGeneralizationSet = function(b) {
	var b = b || {};
	var a = new GeneralizationSet(b);
	a.setType("UMLGeneralizationSet");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	return a
};
var UMLManifestation = function(b) {
	var a = new Relation(b);
	a.setType("UMLManifestation");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABmanifest\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLDeployment = function(b) {
	var a = new Relation(b);
	a.setType("UMLDeployment");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABdeploy\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var Line = function(a) {
	a = a || {};
	Line.baseConstructor.call(this, a)
};
JSFun.extend(Line, Relation);
Line.prototype.draw = function(b) {
	var c = this._points.length;
	if (this._line) {
		this._line.draw(b, this._points, this.getLineColor(), this.getLineWidth())
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
var Note = function(a) {
	a = a || {};
	Note.baseConstructor.call(this, a)
};
JSFun.extend(Note, Rectangular);
Note.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Note.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Note.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Note.prototype.getName = function() {
	return this._components[1].getValue()
};
Note.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLNote = function(b) {
	var a = new Note(b);
	a.setType("UMLNote");
	a.setMoveable();
	a.setWidth(100);
	a.setHeight(50);
	a.addFigure(new NoteFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeFields({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "description",
		text: "Note",
		centered: true,
		margin: 5
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	return a
};
var UMLLine = function(b) {
	var a = new Line(b);
	a.setType("UMLLine");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	return a
};
var Instance = function(a) {
	a = a || {};
	Instance.baseConstructor.call(this, a)
};
JSFun.extend(Instance, Rectangular);
Instance.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Instance.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Instance.prototype.addAttribute = function(a) {
	var a = a || "";
	this._components[2].addField(a)
};
Instance.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Instance.prototype.getName = function() {
	return this._components[1].decode(this._components[1].getValue())[0]
};
Instance.prototype.getAttributes = function() {
	return this._components[2]._childs
};
Instance.prototype.getStereotype = function() {
	return this._components[0]
};
Instance.prototype.getNameAsComponent = function() {
	return this._components[1]
};
Instance.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var InstanceDiagram = function(a) {
	InstanceDiagram.baseConstructor.call(this, a)
};
JSFun.extend(InstanceDiagram, Diagram);
InstanceDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
InstanceDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var Link = function(a) {
	a = a || {};
	Link.baseConstructor.call(this, a)
};
JSFun.extend(Link, Relation);
Link.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Link.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Link.prototype.setMultiplicityA = function(a) {
	this._components[2].setValue(a)
};
Link.prototype.setMultiplicityB = function(a) {
	this._components[3].setValue(a)
};
Link.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Link.prototype.getName = function() {
	return this._components[1].decode(this._components[1].getValue())[0]
};
Link.prototype.getMultiplicityA = function() {
	return this._components[2].getValue()
};
Link.prototype.getMultiplicityB = function() {
	return this._components[3].getValue()
};
Link.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLInstanceDiagram = function(b) {
	var a = new InstanceDiagram(b);
	a.setType("UMLInstanceDiagram");
	a.setName("Instance diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLInstance", "UMLLink"]);
	return a
};
var UMLLink = function(c) {
	var b = new Link(c);
	b.setType("UMLLink");
	b.addComponentStereotype();
	var a = new InstanceItem({
		id: "name",
		centered: true,
		margin: 3
	});
	b._addComponent(a);
	b._name = a;
	b.setComponentMultiplicityA();
	b.setComponentMultiplicityB();
	b.setMenu([
		[function() {
			b.showStyleDialog({
				that: b
			});
			b.removeContextualMenu()
		}, "Style"],
		[function() {
			b.showDirectionDialog({
				that: b
			});
			b.removeContextualMenu()
		}, "Navegability"]
	]);
	b.setLine(new SolidLine());
	return b
};
var UMLInstance = function(b) {
	var b = b || {};
	var a = new Instance(b);
	a.setType("UMLInstance");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(50);
	a.setMoveable();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new InstanceItem({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new AttributeFields({
		id: "attributes",
		margin: 3
	}));
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.getComponents()[0].setUnderlineText(true);
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var Model = function(a) {
	Model.baseConstructor.call(this, a)
};
JSFun.extend(Model, Diagram);
Model.prototype.addElement = function(a) {
	this._addElementOnly(a)
};
Model.prototype.addRelationFromPoints = function(b, e, h, d, g) {
	var c = this.getElementByPoint(e, h);
	var a = this.getElementByPoint(d, g);
	if (c && a) {
		if (b.setElements(c, a)) {
			b.notifyChange();
			return this._addElementOnly(b)
		}
	}
	return false
};
var UMLModel = function(b) {
	var a = new Model(b);
	a.setType("UMLModel");
	a.setName("Model");
	return a
};
var Dependency = function(a) {
	a = a || {};
	Dependency.baseConstructor.call(this, a)
};
JSFun.extend(Dependency, Relation);
Dependency.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Dependency.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Dependency.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Dependency.prototype.getName = function() {
	return this._components[1].getValue()
};
Dependency.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Package = function(a) {
	a = a || {};
	Package.baseConstructor.call(this, a)
};
JSFun.extend(Package, Rectangular);
Package.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
Package.prototype.setName = function(a) {
	this._components[2].setValue(a)
};
Package.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
Package.prototype.getName = function() {
	return this._components[2].getValue()
};
Package.prototype.getStereotype = function() {
	return this._components[1]
};
Package.prototype.getNameAsComponent = function() {
	return this._components[2]
};
var PackageContainer = function(a) {
	a = a || {};
	PackageContainer.baseConstructor.call(this, a)
};
JSFun.extend(PackageContainer, Rectangular);
PackageContainer.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
PackageContainer.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
PackageContainer.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
PackageContainer.prototype.getName = function() {
	return this._components[1].getValue()
};
PackageContainer.prototype.getStereotype = function() {
	return this._components[0]
};
PackageContainer.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var PackageDiagram = function(a) {
	PackageDiagram.baseConstructor.call(this, a)
};
JSFun.extend(PackageDiagram, Diagram);
PackageDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
PackageDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var UMLPackageDiagram = function(b) {
	var a = new PackageDiagram(b);
	a.setType("UMLPackageDiagram");
	a.setName("Package diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLPackage", "UMLPackageContainer", "UMLPackageMerge", "UMLPackagePublicImport", "UMLPackagePrivateImport", "UMLDependency", ]);
	return a
};
var UMLPackage = function(b) {
	var b = b || {};
	var a = new Package(b);
	a.setType("UMLPackage");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(100);
	a.setHeight(50);
	a.addFigure(new PackageFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new Space({
		height: 16
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		text: "Package name",
		centered: true,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLPackageContainer = function(b) {
	var b = b || {};
	var a = new PackageContainer(b);
	a.setType("UMLPackageContainer");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(75);
	a.setMoveable();
	a.setContainer();
	a.addFigure(new RectangleFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes"
	}));
	a.addComponent(new Tab({
		id: "name",
		margin: 5,
		text: "Package name"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLDependency = function(b) {
	var a = new Dependency(b);
	a.setType("UMLDependency");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLPackageMerge = function(b) {
	var a = new Relation(b);
	a.setType("UMLPackageMerge");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABmerge\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLPackagePublicImport = function(b) {
	var a = new Relation(b);
	a.setType("UMLPackagePublicImport");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABimport\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLPackagePrivateImport = function(b) {
	var a = new Relation(b);
	a.setType("UMLPackagePrivateImport");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setStereotype("\xABaccess\xBB");
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var Extension = function(a) {
	a = a || {};
	Extension.baseConstructor.call(this, a)
};
JSFun.extend(Extension, Relation);
Extension.prototype.setElements = function(b, a) {
	if (!((b instanceof Stereotype && a instanceof Metaclass) || (a instanceof Stereotype && b instanceof Metaclass))) {
		return
	}
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
		this._elemA = (b instanceof Stereotype) ? b : a;
		this._elemB = (a instanceof Metaclass) ? a : b;
		this._elemA.addRelation(this);
		this._elemB.addRelation(this);
		this.updateParent();
		this._calculateLineEnds();
		return true
	} else {
		return false
	}
};
Extension.prototype.setElementA = function(a) {
	if (a.getType() == "UMLStereotype") {
		Extension.base.setElementA.call(this, a)
	}
};
Extension.prototype.setElementB = function(a) {
	if (a.getType() == "UMLMetaclass") {
		Extension.base.setElementB.call(this, a)
	}
};
var Metaclass = function(a) {
	a = a || {};
	Metaclass.baseConstructor.call(this, a);
	this.setValidMetaclass(a.validMetaclass || []);
	this._stereotypes = [];
	this.setDiagrams(a.diagrams || [])
};
JSFun.extend(Metaclass, Rectangular);
Metaclass.prototype.setValidMetaclass = function(b) {
	if (!JSFun.isArray(b)) {
		return
	}
	this._validMetaclassLibrary = ["UMLActor", "UMLUseCase", "UMLUseCaseExtended", "UMLSystem", "UMLSubSystem", "UMLLine", "UMLClass", "UMLComponent", "UMLInterfaceExtended", "UMLPackage", "UMLPackageContainer", "UMLComComponent", "UMLInterface", "UMLLifeline", "UMLOption", "UMLAlternative", "UMLLoop", "UMLBreak", "UMLAcceptEventAction", "UMLTimeEvent", "UMLSendSignalAction", "UMLAction", "UMLObject", "UMLActivity", "UMLDataStore", "UMLConnectorActivity", "UMLHorizontalHierarchicalSwimlane", "UMLVerticalHierarchicalSwimlane", "UMLSimpleState", "UMLCompositeState", "UMLVerticalRegion", "UMLPin", "UMLParameterNode", "UMLExpansionNode", "UMLHorizontalRegion", "UMLPort", "UMLTerminate", "UMLEntryPoint", "UMLExitPoint", "UMLJunction", "UMLFlowFinal", "UMLDataType"];
	this._validMetaclassApp = [];
	for (var a = 0; a < b.length; a++) {
		if (JSFun.isArray(b[a]) && b[a].length == 2) {
			if (this.foundInArray(this._validMetaclassLibrary, b[a][1])) {
				this._validMetaclassApp.push(b[a])
			}
		}
	}
	this._validMetaclassApp = this._sortNamesMetaclass(this._validMetaclassApp)
};
Metaclass.prototype._sortNamesMetaclass = function(a) {
	a.sort(function(d, c) {
		if (d[0] < c[0]) {
			return -1
		} else {
			if (d[0] > c[0]) {
				return 1
			} else {
				return 0
			}
		}
	});
	return a
};
Metaclass.prototype.foundInArray = function(c, b) {
	for (var a = 0; a < c.length; a++) {
		if (b == c[a]) {
			return true
		}
	}
	return false
};
Metaclass.prototype.setDiagrams = function(a) {
	this._diagrams = a
};
Metaclass.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Metaclass.prototype.addRelation = function(a) {
	Metaclass.base.addRelation.call(this, a);
	this._stereotypes.push(a._elemA);
	a._elemA._metaclass.push(this)
};
Metaclass.prototype.delRelation = function(a) {
	Metaclass.base.delRelation.call(this, a);
	a._elemA.delMetaclass(this);
	this.delStereotype(a._elemA)
};
Metaclass.prototype.remove = function() {
	var a = this._relations;
	for (var b = 0; b < a.length; b++) {
		a[b]._elemA.delMetaclass(this)
	}
	Metaclass.base.remove.call(this)
};
Metaclass.prototype.notifyDeleted = function(a) {
	var b;
	for (b in this._relations) {
		if (this._relations[b] == a) {
			this.delStereotype(a._elemA);
			a._elemA.delMetaclass(this);
			this._relations.splice(b, 1)
		}
	}
};
Metaclass.prototype.delStereotype = function(a) {
	var b;
	for (b in this._stereotypes) {
		if (this._stereotypes[b] == a) {
			this._stereotypes.splice(b, 1);
			break
		}
	}
};
Metaclass.prototype.getName = function() {
	for (var a = 0; a < this._validMetaclassApp.length; a++) {
		if (this._validMetaclassApp[a][0] == this._components[1].getValue()) {
			return this._validMetaclassApp[a][1]
		}
	}
};
Metaclass.prototype.getNameAsComponent = function() {
	for (var a = 0; a < this._validMetaclassApp.length; a++) {
		if (this._validMetaclassApp[a][0] == this._components[1]) {
			return this._components[1]
		}
	}
};
var MetaclassItem = function(a) {
	a = a || {};
	MetaclassItem.baseConstructor.call(this, a)
};
JSFun.extend(MetaclassItem, TextBox);
MetaclassItem.prototype.setText = function(e) {
	if (JSFun.isString(e)) {
		if (this._text != e) {
			var g = (this._parent) ? this._parent._diagrams : [];
			var b = [];
			for (var d in g) {
				b = g[d]._nodes;
				for (var c = 0; c < b.length; c++) {
					if (b[c]._stereotypeProperties && this._parent) {
						for (var a = 0; a < this._parent._stereotypes.length; a++) {
							b[c]._stereotypeProperties.removeStereotype(this._parent._stereotypes[a])
						}
					}
				}
			}
		}
		StereotypeTag.base.setText.call(this, e)
	}
};
MetaclassItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var e = this;
	this.active = true;
	var l = document.createElement("div");
	var d = document.createElement("form");
	var a = document.createElement("input");
	var c = document.createElement("input");
	l.className = "ud_popup";
	var g;
	a = document.createElement("select");
	g = document.createElement("option");
	g.setAttribute("value", "Metaclass name");
	g.appendChild(document.createTextNode("none"));
	a.appendChild(g);
	for (var b = 0; b < this._parent._validMetaclassApp.length; b++) {
		g = document.createElement("option");
		g.setAttribute("value", this._parent._validMetaclassApp[b][0]);
		g.appendChild(document.createTextNode(this._parent._validMetaclassApp[b][0]));
		if (this._parent.getName() == this._parent._validMetaclassApp[b][1]) {
			g.setAttribute("selected", "selected")
		}
		a.appendChild(g)
	}
	c.setAttribute("type", "submit");
	c.setAttribute("value", "ok");
	this.changeText = function(m) {
		if (e.active) {
			e.setText(e.encode(a.value));
			document.body.removeChild(l);
			e.active = false;
			e.notifyChange()
		}
	};
	this.closeDialog = function(m) {
		if (e.active) {
			document.body.removeChild(l);
			e.active = false;
			e.notifyChange()
		}
	};
	d.onsubmit = function() {
		return false
	};
	c.addEventListener("click", this.changeText, false);
	d.appendChild(a);
	d.appendChild(c);
	if (this.deletable) {
		var h = document.createElement("input");
		h.setAttribute("type", "submit");
		h.setAttribute("value", "delete");
		this.deleteDialog = function(m) {
			if (e.active) {
				document.body.removeChild(l);
				e.active = false;
				e.notifyDelete();
				e.notifyChange()
			}
		};
		h.addEventListener("click", this.deleteDialog, false);
		d.appendChild(h)
	}
	l.appendChild(d);
	document.body.appendChild(l);
	a.focus();
	l.style.top = (window.innerHeight - d.offsetHeight) / 2 + "px";
	l.style.left = (window.innerWidth - d.offsetWidth) / 2 + "px"
};
var ProfileDiagram = function(a) {
	a = a || {};
	ProfileDiagram.baseConstructor.call(this, a);
	this._visible = true
};
JSFun.extend(ProfileDiagram, Diagram);
ProfileDiagram.prototype.draw = function() {
	if (this._visible) {
		ProfileDiagram.base.draw.call(this)
	}
};
ProfileDiagram.prototype.interaction = function(a) {
	var a = (!this._visible) ? false : a;
	ProfileDiagram.base.interaction.call(this, a)
};
ProfileDiagram.prototype.updateProfile = function(e) {
	var b;
	var c = [];
	for (b = 0; b < this._nodes.length; b++) {
		if (this._nodes[b].getType() == "UMLMetaclass") {
			c.push(this._nodes[b])
		}
	}
	var a;
	var d = false;
	for (b = 0; b < e.length; b++) {
		a = e[b]._nodes;
		for (j = 0; j < a.length; j++) {
			if (a[j]._stereotypeProperties) {
				a[j]._stereotypeProperties.updateElementStereotypes()
			}
		}
	}
};
ProfileDiagram.prototype.removeProfile = function(e) {
	if (!e) {
		return
	}
	var b;
	var c = [];
	for (b = 0; b < this._nodes.length; b++) {
		if (this._nodes[b].getType() == "UMLStereotype") {
			c.push(this._nodes[b])
		}
	}
	var a;
	var d = false;
	for (b = 0; b < e.length; b++) {
		a = e[b]._nodes;
		for (j = 0; j < a.length; j++) {
			if (a[j]._stereotypeProperties) {
				for (k = 0; k < c.length; k++) {
					a[j]._stereotypeProperties.removeStereotype(c[k])
				}
			}
		}
	}
};
ProfileDiagram.prototype.setXML = function(b, e, d) {
	e = e || [];
	d = d || [];
	ProfileDiagram.base.setXML.call(this, b);
	if (this._alone) {
		var a = b.getElementsByTagName(this.getType())[0];
		if (!a) {
			return false
		}
	} else {
		var a = b
	}
	if (a.getAttribute("visible") == "false") {
		this._visible = false
	}
	for (var c = 0; c < this._nodes.length; c++) {
		if (this._nodes[c].getType() == "UMLMetaclass") {
			this._nodes[c].setDiagrams(e);
			this._nodes[c].setValidMetaclass(d)
		} else {
			if (this._nodes[c].getType() == "UMLStereotype") {
				this._nodes[c].setDiagrams(e)
			}
		}
	}
};
ProfileDiagram.prototype.getXML = function(b) {
	var a = ProfileDiagram.base.getXML.call(this, b);
	a.setAttribute("visible", this._visible);
	return a
};
ProfileDiagram.prototype.getElements = function() {
	var c = [];
	var b = [];
	for (var a = 0; a < this._nodes.length; a++) {
		if (this._nodes[a].getType() == "UMLMetaclass") {
			c.push(this._nodes[a])
		} else {
			if (this._nodes[a].getType() == "UMLStereotype") {
				b.push(this._nodes[a])
			}
		}
	}
	return [c, b]
};
var SrcItem = function(a) {
	a = a || {};
	SrcItem.baseConstructor.call(this, a);
	this._parse = /^path(?:\:\/([a-zA-Z\:\_\.\/\\0-9 ]*))?$/;
	this.setMinWidth(50)
};
JSFun.extend(SrcItem, TextBox);
SrcItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += "path:/" + a[0]
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "no icon "
	}
};
SrcItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
SrcItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var c = this;
	this.active = true;
	var a = document.createElement("div");
	var b = document.createElement("form");
	var e = document.createElement("input");
	var d = document.createElement("input");
	d.setAttribute("type", "submit");
	d.setAttribute("value", "ok");
	a.className = "ud_popup";
	var h = this.decode(this.getValue());
	e.setAttribute("type", "text");
	e.setAttribute("value", h[0] || "");
	this.changeText = function(o) {
		if (c.active) {
			var n = [];
			n.push(e.value);
			c.setText(c.encode(n));
			document.body.removeChild(a);
			c.active = false;
			c.notifyChange();
			c.notifyDraw()
		}
	};
	this.closeDialog = function(n) {
		if (c.active) {
			document.body.removeChild(a);
			c.active = false;
			c.notifyChange();
			c.notifyDraw()
		}
	};
	b.onsubmit = function() {
		return false
	};
	d.addEventListener("click", this.changeText, false);
	var g;
	var m;
	m = document.createElement("div");
	g = document.createElement("label");
	g.appendChild(document.createTextNode("Icon path (absolute path)"));
	m.appendChild(g);
	m.appendChild(e);
	b.appendChild(m);
	b.appendChild(d);
	if (this.deletable) {
		var l = document.createElement("input");
		l.setAttribute("type", "submit");
		l.setAttribute("value", "delete");
		this.deleteDialog = function(n) {
			if (c.active) {
				document.body.removeChild(a);
				c.active = false;
				c.notifyDelete();
				c.notifyChange();
				c.notifyDraw()
			}
		};
		l.addEventListener("click", this.deleteDialog, false);
		b.appendChild(l)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	e.focus();
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
SrcItem.prototype.setText = function(e) {
	if (JSFun.isString(e)) {
		var g = (this._text != e) ? true : false;
		this._text = e;
		if (g) {
			var h = (this._parent) ? this._parent._diagrams : [];
			var b = [];
			for (var d in h) {
				b = h[d]._nodes;
				for (var c = 0; c < b.length; c++) {
					if (b[c]._stereotypeProperties && this._parent) {
						if (this._parent._validMetaclass(b[c].getType())) {
							b[c]._stereotypeProperties.removeFigure(this._parent);
							if (b[c]._stereotypeProperties._shownStereotype == "\xAB" + this._parent.getName() + "\xBB") {
								b[c]._stereotypeProperties.drawStereotype(this._parent)
							}
						}
					}
				}
			}
		}
		var a = (this._text.length > 20) ? 20 : this._text.length;
		if (e == "") {
			if (this._orientation) {
				this.setHeight(50)
			} else {
				this.setWidth(50)
			}
		} else {
			if (this._orientation) {
				this.setHeight(a * this.font_width)
			} else {
				this.setWidth(a * this.font_width)
			}
		}
		if (this._orientation) {
			this.setWidth(this._line_height)
		} else {
			this.setHeight(this._line_height)
		}
	}
};
SrcItem.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	a.save();
	if (this.active) {
		a.fillStyle = "#ffc485";
		a.fillRect(this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight())
	}
	a.restore();
	a.save();
	a.font = this.getFontStyle() + " " + this.getFontWeight() + " " + this.getFontSize() + "px " + this.getFontFamily();
	a.textBaseline = "middle";
	a.fillStyle = this.getFontColor();
	var b = this._text;
	if (!b) {
		b = ""
	}
	if (b.length > 20) {
		b = b.substring(0, 17);
		b += "..."
	}
	if (this._orientation) {
		a.translate(this._getMX() + this._line_height / 2, this._getMY());
		a.rotate((-90 * Math.PI) / 180);
		a.fillText(b, this._margin * 2 - this.getHeight(), 0)
	} else {
		a.fillText(b, this._getMX(), this._getMY() + this._line_height / 2)
	}
	a.restore()
};
var Stereotype = function(a) {
	a = a || {};
	Stereotype.baseConstructor.call(this, a);
	this._metaclass = [];
	this.setDiagrams(a.diagrams || [])
};
JSFun.extend(Stereotype, Rectangular);
Stereotype.prototype.setDiagrams = function(a) {
	this._diagrams = a
};
Stereotype.prototype.addRelation = function(a) {
	Stereotype.base.addRelation.call(this, a)
};
Stereotype.prototype.delRelation = function(a) {
	Stereotype.base.delRelation.call(this, a);
	a._elemB.delStereotype(this);
	this.delMetaclass(a._elemB)
};
Stereotype.prototype.remove = function() {
	var a = this._relations;
	for (var b = 0; b < a.length; b++) {
		a[b]._elemB.delStereotype(this)
	}
	Stereotype.base.remove.call(this)
};
Stereotype.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Stereotype.prototype.addTagValue = function(a) {
	var a = a || "";
	this._components[3].addField(a)
};
Stereotype.prototype.setPath = function(a) {
	this._components[4].setValue("path:/" + a)
};
Stereotype.prototype.getName = function() {
	return this._components[1].getValue()
};
Stereotype.prototype.getTagValues = function() {
	var b = this._components[3]._childs;
	var c = [];
	for (var a = 0; a < b.length; a++) {
		c.push(b[a].getValue())
	}
	return c
};
Stereotype.prototype.getPath = function() {
	return this._components[4].getValue().substring(5)
};
Stereotype.prototype._validMetaclass = function(b) {
	for (var a = this._metaclass.length; a--;) {
		if (this._metaclass[a].getName() == b) {
			return true
		}
	}
	return false
};
Stereotype.prototype.delMetaclass = function(c) {
	var b, a;
	for (b in this._diagrams) {
		for (var a = 0; a < this._diagrams[b]._nodes.length; a++) {
			if (this._diagrams[b]._nodes[a].getType() == c.getName() && this._diagrams[b]._nodes[a]._stereotypeProperties) {
				this._diagrams[b]._nodes[a]._stereotypeProperties.removeStereotype(this)
			}
		}
	}
	for (b in this._metaclass) {
		if (this._metaclass[b] == c) {
			this._metaclass.splice(b, 1);
			break
		}
	}
};
Stereotype.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var StereotypeNameItem = function(a) {
	a = a || {};
	StereotypeNameItem.baseConstructor.call(this, a)
};
JSFun.extend(StereotypeNameItem, TextBox);
StereotypeNameItem.prototype.setText = function(d) {
	if (JSFun.isString(d)) {
		if (this._text != d) {
			var e = (this._parent) ? this._parent._diagrams : [];
			var a = [];
			for (var c in e) {
				a = e[c]._nodes;
				for (var b = 0; b < a.length; b++) {
					if (a[b]._stereotypeProperties && this._parent) {
						if (this._parent._validMetaclass(a[b].getType())) {
							a[b]._stereotypeProperties.changeNameStereotype(this._parent, "\xAB" + d + "\xBB")
						}
					}
				}
			}
		}
		StereotypeNameItem.base.setText.call(this, d)
	}
};
var TagValueItem = function(b) {
	b = b || {};
	TagValueItem.baseConstructor.call(this, b);
	var a = "^([a-zA-Z_0-9]*)?(?::([a-zA-Z_0-9]*))?$";
	this._parse = new RegExp(a);
	this.setMinWidth(40)
};
JSFun.extend(TagValueItem, TextBox);
TagValueItem.prototype.encode = function(a) {
	var b = "";
	if (a[0]) {
		b += a[0]
	}
	if (a[1]) {
		b += ":" + a[1]
	}
	if (this._parse.exec(b)) {
		return b
	} else {
		return "wrong_attribute"
	}
};
TagValueItem.prototype.decode = function(b) {
	var a = this._parse.exec(b);
	if (a) {
		a.shift();
		return a
	} else {
		return []
	}
};
TagValueItem.prototype.getNameTagValue = function() {
	return this.decode(this._text)[0]
};
TagValueItem.prototype.getDefaultValue = function() {
	return this.decode(this._text)[1]
};
TagValueItem.prototype.showDialog = function() {
	if (this.active) {
		return
	}
	var g = this;
	this.active = true;
	var a = document.createElement("div");
	var b = document.createElement("form");
	var e = [];
	var c;
	a.className = "ud_popup";
	for (c = 0; c < 2; c++) {
		e.push(document.createElement("input"))
	}
	var h = document.createElement("input");
	h.setAttribute("type", "submit");
	h.setAttribute("value", "ok");
	var m = this.decode(this.getValue());
	for (c = 0; c < e.length; c++) {
		e[c].setAttribute("type", "text");
		e[c].setAttribute("value", m[c] || "")
	}
	this.changeText = function(r) {
		if (g.active) {
			var p = [];
			var q;
			for (q = 0; q < e.length; q++) {
				p.push(e[q].value)
			}
			g.setText(g.encode(p));
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	this.closeDialog = function(p) {
		if (g.active) {
			document.body.removeChild(a);
			g.active = false;
			g.notifyChange()
		}
	};
	b.onsubmit = function() {
		return false
	};
	h.addEventListener("click", this.changeText, false);
	var d = ["tag value", "default value"];
	var l;
	var o;
	for (c = 0; c < e.length; c++) {
		o = document.createElement("div");
		l = document.createElement("label");
		l.appendChild(document.createTextNode(d[c]));
		o.appendChild(l);
		o.appendChild(e[c]);
		b.appendChild(o)
	}
	b.appendChild(h);
	if (this.deletable) {
		var n = document.createElement("input");
		n.setAttribute("type", "submit");
		n.setAttribute("value", "delete");
		this.deleteDialog = function(p) {
			if (g.active) {
				document.body.removeChild(a);
				g.active = false;
				g.notifyDelete();
				g.notifyChange()
			}
		};
		n.addEventListener("click", this.deleteDialog, false);
		b.appendChild(n)
	}
	a.appendChild(b);
	document.body.appendChild(a);
	a.style.top = (window.innerHeight - b.offsetHeight) / 2 + "px";
	a.style.left = (window.innerWidth - b.offsetWidth) / 2 + "px"
};
TagValueItem.prototype.select = function(a, b) {
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
	return TagValueItem.base.select.call(this, a, b)
};
TagValueItem.prototype.drawShape = function(b) {
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
var TagValueFields = function(a) {
	a = a || {};
	TagValueFields.baseConstructor.call(this, a);
	this._default = a.text || "new_attribute"
};
JSFun.extend(TagValueFields, CollapsibleFields);
TagValueFields.prototype.newItem = function() {
	return new TagValueItem({
		text: this._default
	})
};
var UMLProfile = function(b) {
	var a = new ProfileDiagram(b);
	a.setType("UMLProfile");
	a.setName("Profile");
	a.setValidElements(["UMLNote", "UMLLine", "UMLMetaclass", "UMLExtension", "UMLStereotype"]);
	return a
};
var UMLMetaclass = function(b) {
	var a = new Metaclass(b);
	a.setType("UMLMetaclass");
	a.setMoveable();
	a.setWidth(80);
	a.setHeight(30);
	a.addFigure(new RectangleFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeItem({
		id: "stereotype",
		text: "\xABmetaclass\xBB",
		selected: true,
		centered: true
	}));
	a.addComponent(new MetaclassItem({
		id: "name",
		text: "MetaClass name",
		centered: true,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	return a
};
var UMLStereotype = function(b) {
	var a = new Stereotype(b);
	a.setType("UMLStereotype");
	a.setWidth(100);
	a.setHeight(40);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#c0e1c2"
	}));
	a.addComponent(new StereotypeItem({
		id: "stereotype",
		text: "\xABstereotype\xBB",
		selected: true,
		centered: true
	}));
	a.addComponent(new StereotypeNameItem({
		id: "name",
		text: "stereotype name",
		centered: true
	}));
	a.addComponent(new Separator({
		id: "separator",
		centered: true
	}));
	a.addComponent(new TagValueFields({
		id: "attributes",
		margin: 3
	}));
	a.addComponent(new SrcItem({
		id: "src",
		text: "path:/",
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	return a
};
var UMLExtension = function(b) {
	var a = new Extension(b);
	a.setType("UMLExtension");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new CloseTip({
		color: "#000000"
	}));
	return a
};
var Alternative = function(a) {
	a = a || {};
	Alternative.baseConstructor.call(this, a)
};
JSFun.extend(Alternative, SuperNode);
Alternative.prototype.drop = function(m, l) {
	var d, c;
	if (this._moved) {
		if (!this._alone) {
			this._diagram.checkForParent(this)
		}
		var n = this._diagram._relations;
		var b = [];
		var e = [];
		var h = [];
		for (d = 0; d < n.length; d++) {
			if (this.isOverBeforePosition(n[d].getCentralPoint()) && n[d] instanceof Message) {
				e.push(n[d].getCentralPoint());
				b.push(n[d])
			}
		}
		if (b.length) {
			b = b[0]._sortRelByDistanceToLimitY(b)
		}
		for (d = 0; d < b.length; d++) {
			if (!b[d]._moved) {
				b[d]._y = b[d]._y + (l - this._rely - this._prey);
				if (b[d]._y < b[d]._limitY) {
					b[d]._y = b[d]._limitY
				}
				b[d]._moved = true;
				b[d]._calculateLineEnds(2)
			}
		}
		for (c = 0; c < b.length; c++) {
			var g = b[c]._sortAscendant(b[c].descendantMessages());
			for (d = 0; d < g.length; d++) {
				g[d]._moved = false;
				if (g[d]._objA) {
					g[d]._objA.resetMovement()
				}
				if (g[d]._objB) {
					g[d]._objB.resetMovement()
				}
				g[d].notifyChange()
			}
		}
		for (d = 0; d < b.length; d++) {
			b[d].updateRelatedLifeline()
		}
		if (b.length) {
			b[0].updateDeleteMessages()
		}
	}
	Interaction.base.drop.call(this, m, l);
	var a = this._diagram._nodes;
	for (d = 0; d < a.length; d++) {
		if (a[d] instanceof Lifeline) {
			a[d].updateLength()
		}
	}
	this._moved = false;
	this._resizing = false
};
Alternative.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Alternative.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Alternative.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Alternative.prototype.getName = function() {
	return this._components[1].getValue()
};
Alternative.prototype.getStereotype = function() {
	return this._components[0]
};
Alternative.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var TimeInterval = function(a) {
	a = a || {};
	TimeInterval.baseConstructor.call(this, a);
	this.setType("TimeInterval");
	this.setMoveable();
	this.setWidth(10);
	this.setMinHeight(30);
	this.setHeight(a.height || 1);
	this.addFigure(new RectangleFigure({
		color: "#ffffff",
		changeFigureColor: false
	}))
};
JSFun.extend(TimeInterval, Rectangular);
TimeInterval.prototype.drag = function(b, c) {
	if (this._resizing) {
		var a = c - this.getY();
		this.setHeight(a)
	}
};
TimeInterval.prototype.drop = function(a, b) {
	if (this._moved) {
		if (!this._alone) {
			this._diagram.checkForParent(this)
		}
		this.updatePosition();
		if (this._parent) {
			this._parent.updateContainer()
		}
	} else {
		if (this._resizing) {
			this._message.notifyChange();
			this.notifyChange()
		} else {
			if (this._selectedBefore) {
				this.selectComponent(a, b)
			}
		}
	}
	this._message.updateDeleteMessages();
	this._moved = false;
	this._resizing = false
};
TimeInterval.prototype.setMessage = function(a) {
	if (a instanceof Message) {
		this._message = a
	} else {
		this._message = null
	}
};
TimeInterval.prototype.getLineX = function(a) {
	return this.getX() + this.getWidth() / 2 + (a * this.getWidth() / 2)
};
TimeInterval.prototype.updateLength = function() {
	var e;
	var a = 0;
	var b;
	var g;
	for (e in this._relations) {
		if (this._relations[e]._elemA == this._relations[e]._elemB) {
			g = this._relations[e].getY() + 100
		} else {
			if (this._relations[e]._elemB == this) {
				var c = (this._relations[e]._objB == 0) ? 30 : 0;
				var g = this._relations[e].getY() + c
			} else {
				var d = (this._relations[e]._objA == 0) ? 30 : 0;
				var g = this._relations[e].getY() + d
			}
		}
		if ((this._relations[e] instanceof Message) && g > a) {
			a = g;
			b = this._relations[e]
		}
	}
	if (b) {
		a = a - this._y;
		this.setMinHeight(a)
	} else {
		this.setMinHeight(30)
	}
};
TimeInterval.prototype.addRelation = function(a, b) {
	var b = (JSFun.isNumber(b)) ? b : 0;
	if (a._elemA == this && a._objA && (b == 1 || b == 0)) {
		a._objA.remove();
		a._objA = 0
	}
	if (a._elemB == this && a._objB && (b == 2 || b == 0)) {
		a._objB.remove();
		a._objB = 0
	}
	a.updateLimitY();
	if (a._y < a._limitY) {
		a._y = a._limitY
	}
	if (!b) {
		Lifeline.base.addRelation.call(this, a)
	}
};
TimeInterval.prototype.delRelation = function(a, c) {
	var c = (JSFun.isNumber(c)) ? c : 0;
	if (a._elemA == this && a._objA == 0 && (c == 1 || c == 0)) {
		a.setObjA(new TimeInterval());
		a._objA.setDiagram(a._diagram);
		a._diagram._addNode(a._objA)
	}
	if (a._elemB == this && a._objB == 0 && (c == 2 || c == 0)) {
		a.setObjB(new TimeInterval());
		a._objB.setDiagram(a._diagram);
		a._diagram._addNode(a._objB)
	}
	a._limitY = this._message._limitY;
	var b = this._diagram._nodes;
	for (var d = 0; d < b.length; d++) {
		if (b[d].getType() == "UMLLifeline") {
			b[d].updateLength()
		}
	}
	if (!c) {
		TimeInterval.base.delRelation.call(this, a)
	}
	this.updateLength()
};
var SequenceDiagram = function(a) {
	SequenceDiagram.baseConstructor.call(this, a)
};
JSFun.extend(SequenceDiagram, Diagram);
SequenceDiagram.prototype._addNode = function(a) {
	if (a instanceof Lifeline) {
		a.setDiagram(this);
		a.updateLength()
	}
	SequenceDiagram.base._addNode.call(this, a)
};
SequenceDiagram.prototype._addRelation = function(a) {
	if (a instanceof Message) {
		a.setDiagram(this);
		if (a._elemA instanceof TimeInterval && a._objA) {
			a._objA.remove();
			a._objA = 0
		}
		if (a._elemB instanceof TimeInterval && a._objB) {
			a._objB.remove();
			a._objB = 0
		}
		this._relations.push(a);
		a.updateDeleteMessages();
		a.notifyChange()
	} else {
		SequenceDiagram.base._addRelation.call(this, a)
	}
};
SequenceDiagram.prototype.checkForParent = function(a) {
	if ((a instanceof Node) && !(a instanceof Lifeline) && !(a instanceof TimeInterval)) {
		SequenceDiagram.base.checkForParent.call(this, a)
	}
};
SequenceDiagram.prototype.getXML = function(a) {
	return SequenceDiagram.base.getXML.call(this, a)
};
SequenceDiagram.prototype._sortNodesByArea = function() {
	this._nodes.sort(function(e, c) {
		var g = e.getArea();
		var d = c.getArea();
		if ((e.getType() == "UMLLifeline" && c.getType() != "TimeInterval") || (e.getType() != "TimeInterval" && c.getType() == "UMLLifeline")) {
			if (e.getType() == "UMLLifeline") {
				return -1
			} else {
				return 1
			}
		} else {
			if (g < d) {
				return -1
			} else {
				if (g == d) {
					return 0
				} else {
					return 1
				}
			}
		}
	})
};
SequenceDiagram.prototype._addElementOnly = function(a) {
	if (a instanceof Node) {
		a.setDiagram(this);
		this._nodes.push(a)
	} else {
		if (a instanceof Relation) {
			a._diagram = this;
			this._relations.push(a)
		}
	}
};
SequenceDiagram.prototype._instantiateObjectFromString = function(elemName, parent) {
	if (JSFun.isString(elemName)) {
		parent = parent || null;
		var i;
		for (i in this._validElements) {
			if (elemName == this._validElements[i]) {
				if (elemName == "UMLAlternative" || elemName == "UMLCreate" || elemName == "UMLDestroy" || elemName == "UMLSendMessage" || elemName == "UMLCallMessage" || elemName == "UMLDeleteMessage" || elemName == "UMLReplyMessage") {
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
SequenceDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
SequenceDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var Message = function(a) {
	a = a || {};
	this._y = a.y || 0;
	this._limitY = 0;
	this._objA = null;
	this._objB = null;
	Message.baseConstructor.call(this, a)
};
JSFun.extend(Message, Relation);
Message.prototype.getElementXML = function(a) {
	var b = Message.base.getElementXML.call(this, a);
	b.setAttribute("y", this._y);
	if (this._objA) {
		b.setAttribute("a", this._objA.getId())
	} else {
		b.setAttribute("a", this._objA)
	}
	if (this._objB) {
		b.setAttribute("b", this._objB.getId())
	} else {
		b.setAttribute("b", this._objB)
	}
	return b
};
Message.prototype.setElementXML = function(g, e) {
	Message.base.setElementXML.call(this, g, e);
	this._y = parseInt(g.getAttribute("y"));
	var d = g.getAttribute("a");
	var b = g.getAttribute("b");
	var c = parseInt(d);
	if (JSFun.isNumber(c)) {
		d = c
	} else {
		if (d == "null") {
			d = null
		}
	}
	var a = parseInt(b);
	if (JSFun.isNumber(a)) {
		b = a
	} else {
		if (b == "null") {
			b = null
		}
	}
	if (d) {
		this.setObjA(e[d])
	} else {
		this._objA = d
	}
	if (b) {
		this.setObjB(e[b])
	} else {
		this._objB = b
	}
};
Message.prototype.setElements = function(b, a) {
	this._points[0] = new Point();
	this._points[1] = new Point();
	if (b instanceof Element && a instanceof Element) {
		if (b instanceof Relation && a instanceof Relation) {
			return false
		}
		if (this._elemA && this._elemA != this._elemB) {
			this._elemA.delRelation(this)
		}
		if (this._elemB) {
			this._elemB.delRelation(this)
		}
		this._elemA = b;
		this._elemB = a;
		this._elemA.addRelation(this);
		if (b != a) {
			this._elemB.addRelation(this)
		} else {
			this._elemB.addRelation(this, 2)
		}
		this.updateParent();
		this._calculateLineEnds();
		return true
	} else {
		return false
	}
};
Message.prototype.setElementA = function(a) {
	if (a && (a.getType() == "UMLLifeline" || a.getType() == "TimeInterval")) {
		if (a instanceof Relation && this._elemB instanceof Relation) {
			return false
		}
		if (this._elemA) {
			if (this._elemA != this._elemB) {
				this._elemA.delRelation(this)
			} else {
				this._elemA.delRelation(this, 1)
			}
		}
		this._elemA = a;
		if (this._elemA != this._elemB) {
			this._elemA.addRelation(this)
		} else {
			this._elemA.addRelation(this, 1)
		}
		this.updateParent();
		return true
	} else {
		return false
	}
};
Message.prototype.setElementB = function(a) {
	if (a && (a.getType() == "UMLLifeline" || a.getType() == "TimeInterval")) {
		if (a instanceof Relation && this._elemA instanceof Relation) {
			return false
		}
		if (this._elemB) {
			if (this._elemA != this._elemB) {
				this._elemB.delRelation(this)
			} else {
				this._elemB.delRelation(this, 2)
			}
		}
		this._elemB = a;
		if (this._elemA != this._elemB) {
			this._elemB.addRelation(this)
		} else {
			this._elemB.addRelation(this, 2)
		}
		this.updateParent();
		return true
	} else {
		return false
	}
};
Message.prototype.setLimitY = function(a) {
	this._limitY = a
};
Message.prototype.getY = function() {
	return this._y
};
Message.prototype.select = function(a, c) {
	this._deselectComponent();
	for (b = 0; b < this._points.length; b++) {
		if (Math.abs(a - this._points[b].getX()) <= 4 && Math.abs(c - this._points[b].getY()) <= 4) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = b;
			this._selectedPoint = true;
			return true
		}
	}
	if (this._selected > -1) {
		if (this._isOverComponent(a, c)) {
			this._selectedBefore = true;
			return true
		}
	}
	for (var b = 0; b < this._points.length - 1; b++) {
		if (this._selectLine(this._points[b], this._points[b + 1], a, c)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = b;
			this._selectedLine = true;
			if (this._elemA == this._elemB) {
				this._movementLine = c - this._points[0]._y
			}
			return true
		}
	}
	return false
};
Message.prototype.drag = function(a, c) {
	if (this._selectedLine) {
		var b;
		if (this._elemA == this._elemB) {
			c -= this._movementLine
		}
		if (c > this._limitY) {
			this._y = c
		} else {
			this._y = this._limitY
		}
		this._moved = true
	} else {
		if (this._selectedPoint) {
			this._points[this._selected].setX(a);
			this._moved = true
		}
	}
};
Message.prototype.drop = function(a, b) {
	if (this._moved) {
		this._checkForNewNodes(a, b)
	} else {
		if (this._selectedBefore) {
			this._selectComponent(a, b)
		}
	}
	this._selectedLine = false;
	this._selectedPoint = false;
	this._delUselessPoints();
	this.notifyChange();
	this.updateDeleteMessages();
	this.updateRelatedLifeline();
	this._moved = false
};
Message.prototype.updateRelatedLifeline = function() {
	var b = this.descendantMessages();
	for (var a = 0; a < b.length; a++) {
		if (b[a] instanceof CreateMessage) {
			b[a]._elemB.updatePosition()
		}
	}
};
Message.prototype._checkForNewNodes = function(a, c) {
	if (this._selectedPoint && (this._selected == 0 || this._selected == this._points.length - 1)) {
		var b = this._diagram.reassignRelationTo(this, a, c);
		if (b != this && b != this._objA && b != this._objB) {
			if (this._selected == 0) {
				this.setElementA(b)
			} else {
				this.setElementB(b)
			}
		}
	}
};
Message.prototype.updateDeleteMessages = function() {
	var b = 0;
	var c = [];
	if (this._diagram) {
		var a = this._diagram._nodes
	} else {
		var a = []
	}
	for (b = a.length; b--;) {
		if ((a[b] instanceof Lifeline)) {
			c.push(a[b])
		}
	}
	c.sort(function(e, d) {
		var h = e.getDelete();
		var g = d.getDelete();
		if (h < g) {
			return -1
		} else {
			if (h == g) {
				return 0
			} else {
				return 1
			}
		}
	});
	for (b = 0; b < c.length; b++) {
		c[b].updateDelete()
	}
};
Message.prototype._calculateLineEnds = function(n) {
	var n = (n == false || n == 0 || n) ? n : 1;
	var d;
	if (!this._selectedPoint && this._elemA && this._elemB) {
		if ((this._y >= this._elemA.getY()) && (this._y <= (this._elemA.getY() + this._heightSmallRectangle))) {
			this._y = this._elemA.getY() + this._heightSmallRectangle
		}
		var h = this;
		var o = function(r) {
			if (r instanceof Lifeline) {
				return r.getLineX()
			} else {
				if (r instanceof TimeInterval) {
					if (r == h._elemA) {
						if (r._x > h._elemB._x) {
							return r.getLineX(-1)
						} else {
							return r.getLineX(1)
						}
					} else {
						if (r._x > h._elemA._x) {
							return r.getLineX(-1)
						} else {
							return r.getLineX(1)
						}
					}
				}
			}
		};
		if (n == 1) {
			this.updateLimitY();
			if (this._y < this._limitY) {
				this._y = this._limitY
			}
		}
		if (this._elemA == this._elemB) {
			var p = (this._objA) ? (this._objA.getHeight() + 20) : 50;
			this._points[0].setPoint(o(this._elemA), this._y);
			this._points[1] = new Point(o(this._elemB) + 50, this._y);
			this._points[2] = new Point(o(this._elemB) + 50, this._y + p);
			this._points[3] = new Point(o(this._elemB), this._y + p)
		} else {
			this._points[0].setPoint(o(this._elemA), this._y);
			this._points[1].setPoint(o(this._elemB), this._y);
			while (this._points[2]) {
				this._points.pop()
			}
		}
		if (n) {
			this.updateObjects();
			var a;
			var q = [];
			if (n == 1) {
				this._moved = true
			}
			if (this._objA || (this._elemA instanceof TimeInterval && this._objB)) {
				var e = [];
				var m = (this._objA) ? this._objA : this._elemA;
				if (this._objA) {
					e = m._relations
				} else {
					for (var c = 0; c < this._elemA._relations.length; c++) {
						if (this._elemA._relations[c]._elemA == this._elemA._relations[c]._elemB) {
							e.push(this._elemA._relations[c])
						}
					}
				}
				for (d = 0; d < e.length; d++) {
					if (!e[d]._moved) {
						if (this._objA) {
							a = (this._objA._y - this._objA._prey)
						} else {
							a = (this._objB) ? (this._objB._y - this._objB._prey) : 0
						}
						e[d]._y = e[d]._y + a;
						e[d]._moved = true;
						e[d]._calculateLineEnds((!n) ? n : 2);
						e[d]._updateComponents()
					}
				}
			}
			if (this._objB || (this._elemB instanceof TimeInterval && this._objA)) {
				var b = [];
				var l = (this._objB) ? this._objB : this._elemB;
				if (this._objB) {
					b = l._relations
				} else {
					for (var c = 0; c < this._elemB._relations.length; c++) {
						if (this._elemB._relations[c]._elemA == this._elemB._relations[c]._elemB) {
							b.push(this._elemB._relations[c])
						}
					}
				}
				for (d = 0; d < b.length; d++) {
					if (!b[d]._moved) {
						if (this._objB) {
							a = (this._objB) ? (this._objB._y - this._objB._prey) : (this._objA._y - this._objA._prey)
						} else {
							a = (this._objA) ? (this._objA._y - this._objA._prey) : 0
						}
						b[d]._y = b[d]._y + a;
						b[d]._moved = true;
						b[d]._calculateLineEnds((!n) ? n : 2);
						b[d]._updateComponents()
					}
				}
			}
			if (n != 2) {
				if (this._objA) {
					this._objA.resetMovement()
				}
				if (this._objB) {
					this._objB.resetMovement()
				}
				var g = this._sortAscendant(this.descendantMessages());
				for (d = 0; d < g.length; d++) {
					g[d]._moved = false;
					if (g[d]._objA) {
						g[d]._objA.resetMovement()
					}
					if (g[d]._objB) {
						g[d]._objB.resetMovement()
					}
					g[d].updateLimitY();
					if (g[d]._y < g[d]._limitY) {
						g[d]._y = g[d]._limitY;
						g[d]._calculateLineEnds()
					}
				}
			}
		}
	}
};
Message.prototype.descendantMessages = function(b) {
	var b = b || [];
	var a;
	if (!this.foundInArray(b)) {
		b.push(this)
	}
	if (this._objA) {
		for (a = 0; a < this._objA._relations.length; a++) {
			b = this._objA._relations[a].descendantMessages(b)
		}
	} else {
		if (this._elemA && this._objB) {
			for (a = 0; a < this._elemA._relations.length; a++) {
				if (this._elemA._relations[a]._elemA == this._elemA._relations[a]._elemB) {
					b = this._elemA._relations[a].descendantMessages(b)
				}
			}
		}
	}
	if (this._objB) {
		for (a = 0; a < this._objB._relations.length; a++) {
			b = this._objB._relations[a].descendantMessages(b)
		}
	} else {
		if (this._elemB && this._objA) {
			for (a = 0; a < this._elemB._relations.length; a++) {
				if (this._elemB._relations[a]._elemA == this._elemB._relations[a]._elemB) {
					b = this._elemB._relations[a].descendantMessages(b)
				}
			}
		}
	}
	return b
};
Message.prototype._sortRelByCreateMessages = function(a, b) {
	if (!(b == 1 || b == -1)) {
		return a
	}
	a.sort(function(d, c) {
		if (d instanceof CreateMessage && c instanceof CreateMessage) {
			if (d._y > c._y) {
				return -1
			} else {
				return 1
			}
		} else {
			if (d instanceof CreateMessage && !(c instanceof CreateMessage)) {
				return b
			} else {
				if (!(d instanceof CreateMessage) && c instanceof CreateMessage) {
					return -b
				} else {
					return 0
				}
			}
		}
	});
	return a
};
Message.prototype._sortRelByDistanceToLimitY = function(a) {
	a.sort(function(d, c) {
		var g = d._y - d._limitY;
		var e = c._y - c._limitY;
		if (g > e) {
			return -1
		} else {
			if (g < e) {
				return 1
			} else {
				return 0
			}
		}
	});
	return a
};
Message.prototype._sortAscendant = function(a) {
	a.sort(function(d, c) {
		if (d._y > c._y) {
			return 1
		} else {
			if (d._y < c._y) {
				return -1
			} else {
				return 0
			}
		}
	});
	return a
};
Message.prototype.updateLimitY = function() {
	var b = 0;
	var a = 0;
	if (this._elemA) {
		b = (this._elemA instanceof Lifeline) ? (this._elemA.getY() + this._elemA._heightSmallRectangle + 5) : (this._elemA.getY() + 5)
	}
	if (this._elemB) {
		a = (this._elemB instanceof Lifeline) ? (this._elemB.getY() + this._elemB._heightSmallRectangle + 5) : (this._elemB.getY() + 5)
	}
	if (b > a || this instanceof CreateMessage) {
		this.setLimitY(b)
	} else {
		this.setLimitY(a)
	}
};
Message.prototype.foundInArray = function(b) {
	for (var a = b.length; a--;) {
		if (b[a] == this) {
			return true
		}
	}
	return false
};
Message.prototype.notifyChange = function() {
	var b;
	var a = (this._elemA._diagram) ? this._elemA._diagram._nodes : [];
	Message.base.notifyChange.call(this);
	for (b = 0; b < a.length; b++) {
		if (((a[b].getType() == "UMLLifeline") && !(a[b]._delete)) || ((a[b].getType() == "UMLLifeline") && (a[b]._delete) && ((a[b] == this._elemA) || (a[b] == this._elemB))) || (a[b].getType() == "TimeInterval")) {
			a[b].updateLength()
		}
	}
};
Message.prototype.remove = function() {
	Message.base.remove.call(this);
	if (this instanceof DeleteMessage) {
		this._elemB.setDelete(0)
	}
	if (this._objA) {
		this._objA.remove()
	}
	if (this._objB) {
		this._objB.remove()
	}
	this.notifyChange()
};
Message.prototype.setObjA = function(a) {
	this._objA = a;
	this._objA.setMessage(this);
	this.updateObjects()
};
Message.prototype.setObjB = function(a) {
	this._objB = a;
	this._objB.setMessage(this);
	this.updateObjects()
};
Message.prototype.setDiagram = function(a) {
	Message.base.setDiagram.call(this, a);
	if (this._objA) {
		a._addNode(this._objA)
	}
	if (this._objB) {
		a._addNode(this._objB)
	}
};
Message.prototype.updateObjects = function() {
	if (this._objA) {
		this._objA.setPosition(this._points[0].getX() - this._objA.getWidth() / 2, this._points[0].getY())
	}
	if (this._objB) {
		if (this._elemA == this._elemB) {
			this._objB.setPosition(this._points[3].getX() - this._objB.getWidth() / 2, this._points[3].getY())
		} else {
			this._objB.setPosition(this._points[1].getX() - this._objB.getWidth() / 2, this._points[1].getY())
		}
	}
};
Message.prototype.resetMovementObjects = function() {
	if (this._objA) {
		this._objA.resetMovement()
	}
	if (this._objB) {
		this._objB.resetMovement()
	}
};
Message.prototype._updateComponents = function() {
	if (!(this._elemA && this._elemB)) {
		return
	}
	var c = this._points[0].getX();
	var b = this._points[0].getY();
	var e = this._points[1].getX();
	var d = this._points[1].getY();
	if (this._elemA == this._elemB && this._points.length == 4) {
		e = this._points[2].getX();
		d = this._points[2].getY()
	}
	var a = (c + e) / 2;
	var g = (b + d) / 2;
	if (this._name) {
		if (this._elemA == this._elemB) {
			this._name.setCoordinates(e, g - this._name.getHeight() / 2)
		} else {
			this._name.setCoordinates(a - this._name.getWidth() / 2, g - this._name.getHeight())
		}
	}
	if (this._stereotype) {
		if (this._name) {
			if (this._elemA == this._elemB) {
				this._stereotype.setCoordinates(e, g - this._stereotype.getHeight() - this._name.getHeight() / 2)
			} else {
				this._stereotype.setCoordinates(a - this._stereotype.getWidth() / 2, g - this._stereotype.getHeight() - this._name.getHeight())
			}
		} else {
			if (this._elemA == this._elemB) {
				this._stereotype.setCoordinates(e, g - (this._stereotype.getHeight()) / 2)
			} else {
				this._stereotype.setCoordinates(a - this._stereotype.getWidth() / 2, g - this._stereotype.getHeight())
			}
		}
		if (this._stereotype instanceof SuperComponent) {
			this._stereotype.updateComponents()
		}
	}
};
Message.prototype.drawShape = function(b) {
	if (!(this._selectedPoint && this._selected == 0 || this._selected == this._points.length - 1)) {
		this._calculateLineEnds(0)
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
Message.prototype.getObjA = function() {
	return this._objA
};
Message.prototype.getObjB = function() {
	return this._objB
};
var CallMessage = function(a) {
	a = a || {};
	CallMessage.baseConstructor.call(this, a)
};
JSFun.extend(CallMessage, Message);
CallMessage.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
CallMessage.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
CallMessage.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
CallMessage.prototype.getName = function() {
	return this._components[1].getValue()
};
CallMessage.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var CreateMessage = function(a) {
	a = a || {};
	CreateMessage.baseConstructor.call(this, a)
};
JSFun.extend(CreateMessage, Message);
CreateMessage.prototype.setElementXML = function(b, a) {
	CreateMessage.base.setElementXML.call(this, b, a);
	this._elemB.setCreate(this._y);
	this._elemA.updatePosition();
	this._elemB.updatePosition()
};
CreateMessage.prototype.setElements = function(d, b) {
	CreateMessage.base.setElements.call(this, d, b);
	var a;
	if (this._elemB) {
		this._elemB.updatePosition()
	}
	var c = this.descendantsCreateMessages();
	for (a = 0; a < c.length; a++) {
		c[a].updatePosition()
	}
};
CreateMessage.prototype.remove = function() {
	CreateMessage.base.remove.call(this);
	this._elemB.setPosition(this._elemB.getX(), 70);
	this._elemB.updatePosition();
	this._elemB.setCreate(0);
	if (this._elemA) {
		this._elemA.updateLength()
	}
	if (this._elemB) {
		this._elemB.updateLength()
	}
	var a = this._elemB._relations;
	for (var b = 0; b < a.length; b++) {
		if (a[b]._elemA._y > a[b]._elemB._y || a[b] instanceof CreateMessage) {
			a[b].setLimitY(a[b]._elemA.getY() + a[b]._elemA._heightSmallRectangle + 5)
		} else {
			a[b].setLimitY(a[b]._elemB.getY() + a[b]._elemB._heightSmallRectangle + 5)
		}
	}
};
CreateMessage.prototype.drop = function(a, d) {
	CreateMessage.base.drop.call(this, a, d);
	this._elemB.updatePosition();
	var c = this.descendantsCreateMessages();
	for (var b = 0; b < c.length; b++) {
		c[b].updatePosition()
	}
};
CreateMessage.prototype._calculateLineEnds = function(l) {
	var l = (l == 0 || l) ? l : 1;
	var e;
	var c;
	if (!(!this._selectedPoint && this._elemA && this._elemB) || this._elemA == this._elemB) {
		return
	}
	var n = this._sortRelByCreateMessages(this._elemB._relations, 1);
	var h = [];
	var d, b, a;
	if ((this._y >= this._elemA.getY()) && (this._y <= (this._elemA.getY() + this._heightSmallRectangle))) {
		this._y = this._elemA.getY() + this._heightSmallRectangle
	}
	if (l == 1) {
		this.updateLimitY();
		if (this._y < this._limitY) {
			this._y = this._limitY
		}
	}
	this._points[0].setPoint(this._elemA.getLineX((this._elemA._x > this._elemB._x) ? -1 : 1), this._y);
	if (this._elemB.getX() > this._elemA.getX()) {
		this._points[1].setPoint(this._elemB.getX(), this._y)
	} else {
		this._points[1].setPoint(this._elemB.getX() + this._elemB.getWidth(), this._y)
	}
	this._elemB._y = this._y - this._elemB._heightSmallRectangle / 2;
	if (l) {
		if (l == 1) {
			this._moved = true
		}
		for (d = 0; d < n.length; d++) {
			if (!n[d]._moved) {
				n[d]._y = n[d]._y + this._y - this._elemB.getCreate();
				n[d].setLimitY(this._y + this._elemB._heightSmallRectangle / 2 + 5);
				if (n[d]._limitY > n[d]._y) {
					n[d]._y = n[d]._limitY
				}
				n[d]._moved = true;
				n[d]._calculateLineEnds((!l) ? l : 2);
				n[d]._updateComponents();
				if (n[d] instanceof DeleteMessage) {
					n[d]._elemB.setDelete(n[d]._y)
				}
			}
		}
		this._elemB.setCreate(this._y);
		if (this._elemB.getCreate() != 0) {
			for (d = 0; d < n.length; d++) {
				if (n[d]._y < this._elemB.getCreate() && !(n[d]._elemA instanceof TimeInterval) && !(n[d]._elemB instanceof TimeInterval)) {
					var m = n[d]._y;
					n[d]._points[0].setY(m + this._elemB.getCreate() - this._elemA.getY());
					n[d]._points[1].setY(m + this._elemB.getCreate() - this._elemA.getY());
					n[d]._y = m + this._elemB.getCreate() - this._elemA.getY();
					n[d].setLimitY(this._y + this._elemB._heightSmallRectangle / 2 + 5);
					if (n[d]._limitY > n[d]._y) {
						n[d]._y = n[d]._limitY
					}
					n[d]._updateComponents();
					n[d].updateObjects();
					n[d].notifyChange()
				}
			}
		}
		if (l == 1) {
			var g = this._sortAscendant(this.descendantMessages());
			for (d = 0; d < g.length; d++) {
				g[d]._moved = false;
				if (g[d]._objA) {
					g[d]._objA.resetMovement()
				}
				if (g[d]._objB) {
					g[d]._objB.resetMovement()
				}
				g[d].updateLimitY();
				if (g[d]._y < g[d]._limitY) {
					g[d]._y = g[d]._limitY;
					g[d]._calculateLineEnds()
				}
			}
		}
		this.updateObjects()
	}
};
CreateMessage.prototype.descendantMessages = function(b) {
	var b = b || [];
	if (!this.foundInArray(b)) {
		b.push(this)
	}
	if (this._elemB) {
		for (var a = 0; a < this._elemB._relations.length; a++) {
			if (this._elemB._relations[a] != this) {
				b = this._elemB._relations[a].descendantMessages(b)
			}
		}
	}
	return b
};
CreateMessage.prototype.drag = function(a, c) {
	if (this._selectedLine) {
		var b;
		if (c > this._limitY) {
			this._y = c
		} else {
			this._y = this._limitY
		}
		this._moved = true
	} else {
		if (this._selectedPoint) {}
	}
};
CreateMessage.prototype.descendantsCreateMessages = function() {
	if (!this._elemB) {
		return []
	}
	var a = this._elemB._relations;
	var d;
	var c;
	var g = [];
	var l = [];
	var e = false;
	for (d = 0; d < a.length; d++) {
		if ((a[d] instanceof CreateMessage) && (a[d]._elemA == this._elemB) && (a[d]._elemA != a[d]._elemB)) {
			e = false;
			for (c = 0; c < g.length && !e; c++) {
				if (g[c] == a[d]._elemB) {
					e = true
				}
			}
			if (!e) {
				g.push(a[d]._elemB);
				l = a[d].descendantsCreateMessages();
				for (c = 0; c < l.length; c++) {
					g.push(l[c])
				}
			}
		} else {
			if (a[d]._elemA == this) {
				var h = (a[d]._objA) ? a[d]._objA._relations : []
			} else {
				var h = (a[d]._objB) ? a[d]._objB._relations : []
			}
			for (c = 0; c < h.length; c++) {
				if ((h[c] instanceof CreateMessage)) {
					g.push(h[c]._elemB);
					l = h[c].descendantsCreateMessages();
					for (var b = 0; b < l.length; b++) {
						g.push(l[b])
					}
				}
			}
		}
	}
	return g
};
var DeleteMessage = function(a) {
	a = a || {};
	DeleteMessage.baseConstructor.call(this, a)
};
JSFun.extend(DeleteMessage, Message);
DeleteMessage.prototype._checkForNewNodes = function(a, c) {
	if (this._selectedPoint && (this._selected == 0 || this._selected == this._points.length - 1)) {
		var b = this._diagram.reassignRelationTo(this, a, c);
		if (b) {
			if (this._selected == 0) {
				if (b != this._elemB && b != this._objA && ((b.getType() == "UMLLifeline" && !b.getDelete()) || b.getType() == "TimeInterval")) {
					this.setElementA(b)
				}
			} else {
				if (b != this._elemA && b.getType() == "UMLLifeline" && !b.getDelete()) {
					this.setElementB(b)
				}
			}
			this.notifyChange()
		}
	}
};
DeleteMessage.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
DeleteMessage.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
DeleteMessage.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
DeleteMessage.prototype.getName = function() {
	return this._components[1].getValue()
};
DeleteMessage.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Interaction = function(a) {
	a = a || {};
	Interaction.baseConstructor.call(this, a)
};
JSFun.extend(Interaction, Rectangular);
Interaction.prototype.drop = function(m, l) {
	var d, c;
	if (this._moved) {
		if (!this._alone) {
			this._diagram.checkForParent(this)
		}
		var n = this._diagram._relations;
		var b = [];
		var e = [];
		var h = [];
		for (d = 0; d < n.length; d++) {
			if (this.isOverBeforePosition(n[d].getCentralPoint()) && n[d] instanceof Message) {
				e.push(n[d].getCentralPoint());
				b.push(n[d])
			}
		}
		if (b.length) {
			b = b[0]._sortRelByDistanceToLimitY(b)
		}
		for (d = 0; d < b.length; d++) {
			if (!b[d]._moved) {
				b[d]._y = b[d]._y + (l - this._rely - this._prey);
				if (b[d]._y < b[d]._limitY) {
					b[d]._y = b[d]._limitY
				}
				b[d]._moved = true;
				b[d]._calculateLineEnds(2)
			}
		}
		for (c = 0; c < b.length; c++) {
			var g = b[c]._sortAscendant(b[c].descendantMessages());
			for (d = 0; d < g.length; d++) {
				g[d]._moved = false;
				if (g[d]._objA) {
					g[d]._objA.resetMovement()
				}
				if (g[d]._objB) {
					g[d]._objB.resetMovement()
				}
				g[d].notifyChange()
			}
		}
		for (d = 0; d < b.length; d++) {
			b[d].updateRelatedLifeline()
		}
		if (b.length) {
			b[0].updateDeleteMessages()
		}
	}
	Interaction.base.drop.call(this, m, l);
	var a = this._diagram._nodes;
	for (d = 0; d < a.length; d++) {
		if (a[d] instanceof Lifeline) {
			a[d].updateLength()
		}
	}
	this._moved = false;
	this._resizing = false
};
Interaction.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Interaction.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Interaction.prototype.setGuard = function(a) {
	if (this._components[2]) {
		this._components[2].setValue("[" + a + "]")
	}
};
Interaction.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Interaction.prototype.getName = function() {
	return this._components[1].getValue()
};
Interaction.prototype.getGuard = function() {
	var b = this._components[2].getValue();
	var a = (this._components[2]) ? b.substring(1, b.length - 1) : null;
	return a
};
Interaction.prototype.getStereotype = function() {
	return this._components[0]
};
Interaction.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Lifeline = function(a) {
	a = a || {};
	Lifeline.baseConstructor.call(this, a);
	this._delete = 0;
	this._create = 0;
	this._limitY = -1;
	this.setHeightSmallRectangle(a.heightSmallRectangle || 25)
};
JSFun.extend(Lifeline, Rectangular);
Lifeline.prototype.setHeightSmallRectangle = function(a) {
	this._heightSmallRectangle = a
};
Lifeline.prototype.isOver = function(a, b) {
	if (a instanceof Point) {
		b = a.getY();
		a = a.getX()
	}
	if ((a >= this._x && a <= this._x + this._width && b >= this._y && b <= this._y + this._heightSmallRectangle) || (a >= (this.getLineX() - 5) && a <= (this.getLineX() + 5) && b >= (this._y + this._heightSmallRectangle) && b <= (this._y + this._height))) {
		return true
	}
	return false
};
Lifeline.prototype.notifyChange = function() {
	var e;
	var g = [];
	var b, a;
	var d = this._heightSmallRectangle;
	this.setHeightSmallRectangle(this._components[0].getHeight() + this._components[1].getHeight());
	var c = this._heightSmallRectangle - d;
	for (b = 0; b < this._relations.length; b++) {
		if (!(this._relations[b] instanceof CreateMessage) || ((this._relations[b] instanceof CreateMessage) && (this._relations[b]._elemA == this))) {
			if (c) {
				if (!(this._relations[b] instanceof CreateMessage)) {
					if (this._relations[b]._elemA == this) {
						if ((this._relations[b]._elemB._y + this._relations[b]._elemB._heightSmallRectangle + 5) < (this._y + this._heightSmallRectangle + 5)) {
							this._relations[b].setLimitY(this._y + this._heightSmallRectangle + 5)
						} else {
							this._relations[b].setLimitY(this._relations[b]._elemB._y + this._relations[b]._elemB._heightSmallRectangle + 5)
						}
					} else {
						if ((this._relations[b]._elemA._y + this._relations[b]._elemA._heightSmallRectangle + 5) < (this._y + this._heightSmallRectangle + 5)) {
							this._relations[b].setLimitY(this._y + this._heightSmallRectangle + 5)
						} else {
							this._relations[b].setLimitY(this._relations[b]._elemA._y + this._relations[b]._elemA._heightSmallRectangle + 5)
						}
					}
				} else {
					this._relations[b].setLimitY(this._y + this._heightSmallRectangle + 5)
				}
			}
			if (this._relations[b]._y < (this._y + this._heightSmallRectangle + 5)) {
				this._relations[b]._y += c;
				this._relations[b].notifyChange();
				if (this._relations[b] instanceof CreateMessage) {
					this._relations[b]._elemB.updatePosition();
					e = this._relations[b].descendantsCreateMessages();
					for (a = 0; a < e.length; a++) {
						e[a].updatePosition()
					}
				} else {
					this._relations[b].updateRelatedLifeline()
				}
			}
		}
		if (c && this._relations[b] instanceof CreateMessage && (this._relations[b]._elemB == this)) {
			this._relations[b].notifyChange()
		}
		if (c) {
			this.resetMovement()
		}
	}
	if (c && this._relations.length) {
		this._relations[0].updateDeleteMessages()
	}
	if (this._container) {
		this.updateContainer()
	} else {
		this.updateComponents();
		if (this._parent) {
			this._parent.updateContainer()
		}
	}
	this.setWidth((this._minWidth > 60) ? this._minWidth : 60);
	this.updateComponents()
};
Lifeline.prototype.getLineX = function() {
	return this.getX() + this.getWidth() / 2
};
Lifeline.prototype.drag = function(a, c) {
	if (!this.resizing && this._selected) {
		var b = a - this._relx;
		this.setPosition(b, this.getY());
		this._moved = true
	} else {
		Lifeline.base.drag.call(this, a, c)
	}
};
Lifeline.prototype.updateDelete = function() {
	if (!this._delete) {
		return
	}
	var b, a;
	var o;
	var g;
	var l = 20;
	var h, d;
	var p = this._relations;
	var n = 0;
	var m;
	for (h = 0; h < p.length; h++) {
		if (p[h] instanceof Message) {
			if (!(p[h] instanceof DeleteMessage) || (p[h] instanceof DeleteMessage && p[h]._elemB != this)) {
				g = p[h].getY();
				if (p[h]._elemA == p[h]._elemB) {
					g += (p[h]._objA) ? (p[h]._objA.getHeight() + 20) : 50;
					o = (p[h]._objB) ? p[h]._objB.getHeight() : 0
				} else {
					b = (p[h]._objA) ? p[h]._objA.getHeight() : 0;
					a = (p[h]._objB) ? p[h]._objB.getHeight() : 0;
					if (b > a) {
						o = b
					} else {
						o = a
					}
				}
				if ((g + o + l) > n) {
					n = g + o + l
				}
				if (p[h]._objA) {
					var e = p[h]._objA._relations;
					for (d = 0; d < e.length; d++) {
						g = e[d].getY();
						b = (e[d]._objA) ? e[d]._objA.getHeight() : 0;
						a = (e[d]._objB) ? e[d]._objB.getHeight() : 0;
						if (b > a) {
							o = b
						} else {
							o = a
						}
						if ((g + o + l) > n) {
							n = g + o + l
						}
					}
				}
				if (p[h]._objB) {
					var c = p[h]._objB._relations;
					for (d = 0; d < c.length; d++) {
						g = c[d].getY();
						b = (c[d]._objA) ? c[d]._objA.getHeight() : 0;
						a = (c[d]._objB) ? c[d]._objB.getHeight() : 0;
						if (b > a) {
							o = b
						} else {
							o = a
						}
						if ((g + o + l) > n) {
							n = g + o + l
						}
					}
				}
			} else {
				m = p[h]
			}
		}
	}
	if (m._y < n) {
		this._delete = n
	} else {
		this._delete = m._y
	}
	m._y = this._delete;
	m.notifyChange()
};
Lifeline.prototype.updateLength = function() {
	var e;
	var h = 0;
	if (this._delete) {
		for (e in this._relations) {
			if ((this._relations[e] instanceof Message) && this._relations[e].getY() > h) {
				h = this._relations[e].getY()
			}
		}
	} else {
		var m = this._diagram._relations;
		var a = this._diagram._nodes;
		var c, b;
		var d;
		var l = 0;
		var g;
		for (e = 0; e < m.length; e++) {
			if (m[e] instanceof Message) {
				d = m[e].getY();
				if (m[e]._elemA == m[e]._elemB) {
					d += (m[e]._objA) ? (m[e]._objA.getHeight() + 20) : 50;
					l = (m[e]._objB) ? m[e]._objB.getHeight() : 0
				} else {
					c = (m[e]._objA) ? m[e]._objA.getHeight() : 0;
					b = (m[e]._objB) ? m[e]._objB.getHeight() : 0;
					if (c > b) {
						l = c
					} else {
						l = b
					}
				}
				if ((d + l) > h) {
					h = d + l;
					g = m[e]
				}
			}
		}
		for (e = 0; e < a.length; e++) {
			if ((a[e] instanceof Alternative) || (a[e] instanceof Interaction)) {
				if ((a[e].getY() + a[e]._height) > h) {
					h = a[e].getY() + a[e]._height;
					g = null
				}
			}
		}
	}
	h = h - this.getY();
	if (h <= 0) {
		h = 200
	}
	if (h < this._heightSmallRectangle + 60 && !this._delete) {
		h = this._heightSmallRectangle + 60
	}
	if (g && g instanceof CreateMessage) {
		if (g._elemB == this) {
			if (!g._elemA.getDelete()) {
				if ((g._elemA.getY() + g._elemA.getHeight()) < (this.getY() + h + 60)) {
					g._elemA.setHeight(this.getY() + h + 60 - g._elemA.getY())
				}
			}
		} else {
			g._elemB.updateLength();
			if ((g._elemB.getY() + g._elemB.getHeight()) > (this.getY() + h + 60)) {
				h = g._elemB.getY() + g._elemB.getHeight() - this.getY() - 60
			}
		}
	}
	if (this._delete) {
		this.setHeight(h)
	} else {
		this.setHeight(h + 60)
	}
};
Lifeline.prototype.setDelete = function(a) {
	this._delete = a
};
Lifeline.prototype.getDelete = function() {
	return this._delete
};
Lifeline.prototype.setCreate = function(a) {
	this._create = a
};
Lifeline.prototype.getCreate = function() {
	return this._create
};
Lifeline.prototype.addRelation = function(a, b) {
	var b = (JSFun.isNumber(b)) ? b : 0;
	if (a instanceof DeleteMessage && a._elemB == this) {
		this.setDelete(a._y)
	}
	if (a instanceof CreateMessage && a._elemB == this) {
		this.setCreate(a._y)
	}
	a.updateLimitY();
	if (a._y < a._limitY) {
		a._y = a._limitY
	}
	if (!b) {
		Lifeline.base.addRelation.call(this, a)
	}
};
Lifeline.prototype.updatePosition = function(d, b) {
	var c, a;
	if (d == undefined || b == undefined) {
		var e = this.getMovement();
		var d = e.getX();
		var b = e.getY();
		this.resetMovement();
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
		if (this._relations[c].getParent() != this._parent) {
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
Lifeline.prototype.delRelation = function(a, c) {
	var c = (JSFun.isNumber(c)) ? c : 0;
	if (a instanceof DeleteMessage && a._elemB == this) {
		this.setDelete(0)
	}
	if (a instanceof DeleteMessage) {
		this._limitY = -1
	}
	if (a.getType() == "UMLCreate" && a._elemB == this) {
		this.setCreate(0)
	}
	var b = this._diagram._nodes;
	for (var d = 0; d < b.length; d++) {
		if (b[d].getType() == "UMLLifeline") {
			b[d].updateLength()
		}
	}
	if (!c) {
		Lifeline.base.delRelation.call(this, a)
	}
};
Lifeline.prototype.draw = function(b) {
	Lifeline.base.draw.call(this, b);
	if (this._delete) {
		var a = this.getX() + this.getWidth() / 2;
		var c = this.getY() + this.getHeight();
		b.save();
		b.strokeStyle = "#000000";
		b.translate(a, c);
		b.beginPath();
		b.moveTo(-8.5, 8.5);
		b.lineTo(8.5, -8.5);
		b.moveTo(8.5, 8.5);
		b.lineTo(-8.5, -8.5);
		b.stroke();
		b.restore()
	}
};
Lifeline.prototype.drawShape = function(a) {
	a.save();
	a.lineWidth = 2.5;
	a.strokeStyle = NodeStyle.shape_color;
	a.strokeRect(JSGraphic.toPixel(this._x), JSGraphic.toPixel(this._y), this._width, this._heightSmallRectangle);
	a.beginPath();
	a.moveTo(this.getLineX(), JSGraphic.toPixel(this._y) + this._heightSmallRectangle);
	a.lineTo(this.getLineX(), JSGraphic.toPixel(this._y) + this._height);
	a.closePath();
	a.stroke();
	a.restore()
};
Lifeline.prototype.drawFigures = function(b) {
	var a;
	for (a = 0; a < this._figures.length; a += 1) {
		this._figures[a].draw(b, this._x, this._y, this._width, this._height, this._heightSmallRectangle)
	}
};
Lifeline.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Lifeline.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Lifeline.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Lifeline.prototype.getName = function() {
	return this._components[1].getValue()
};
Lifeline.prototype.getStereotype = function() {
	return this._components[0]
};
Lifeline.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var RegionAlternative = function(a) {
	a = a || {};
	RegionAlternative.baseConstructor.call(this, a)
};
JSFun.extend(RegionAlternative, Region);
RegionAlternative.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
RegionAlternative.prototype.setGuard = function(a) {
	if (this._components[1]) {
		this._components[1].setValue("[" + a + "]")
	}
};
RegionAlternative.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
RegionAlternative.prototype.getGuard = function() {
	var b = this._components[1].getValue();
	var a = (this._components[1]) ? b.substring(1, b.length - 1) : null;
	return a
};
RegionAlternative.prototype.getStereotype = function() {
	return this._components[0]
};
var RegionAlternativeItem = function(a) {
	a = a || {};
	RegionAlternativeItem.baseConstructor.call(this, a)
};
JSFun.extend(RegionAlternativeItem, RegionItem);
RegionAlternativeItem.prototype.createRegion = function() {
	var a = this.getParent()._components.length;
	if (this.getParent()._orientation) {
		this.getParent().addRegion(new RegionAlternative({
			parent: this.getParent()
		}))
	} else {
		this.getParent().addRegion(new RegionAlternative({
			parent: this.getParent()
		}))
	}
};
var ReplyMessage = function(a) {
	a = a || {};
	ReplyMessage.baseConstructor.call(this, a)
};
JSFun.extend(ReplyMessage, Message);
ReplyMessage.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
ReplyMessage.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
ReplyMessage.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
ReplyMessage.prototype.getName = function() {
	return this._components[1].getValue()
};
ReplyMessage.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var SendMessage = function(a) {
	a = a || {};
	SendMessage.baseConstructor.call(this, a)
};
JSFun.extend(SendMessage, Message);
SendMessage.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
SendMessage.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
SendMessage.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
SendMessage.prototype.getName = function() {
	return this._components[1].getValue()
};
SendMessage.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLSequenceDiagram = function(b) {
	var a = new SequenceDiagram(b);
	a.setType("UMLSequenceDiagram");
	a.setName("Sequence diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLCreate", "UMLDestroy", "UMLLifeline", "UMLCallMessage", "UMLSendMessage", "UMLDeleteMessage", "UMLReplyMessage", "UMLOption", "UMLAlternative", "UMLLoop", "UMLBreak", "Region", "TimeInterval"]);
	return a
};
var UMLLifeline = function(b) {
	var b = b || {};
	var a = new Lifeline(b);
	a.setType("UMLLifeline");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setHeight(250);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextBox({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addFigure(new LifelineFigure({
		color: "#c6dbdc"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLCreate = function(b) {
	var a = new CreateMessage(b);
	a.setType("UMLCreate");
	a.setStereotype("\xABcreate\xBB");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLDestroy = function(b) {
	var a = new DeleteMessage(b);
	a.setType("UMLDestroy");
	a.setStereotype("\xABdestroy\xBB");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLSendMessage = function(b) {
	var a = new SendMessage(b);
	a.setType("UMLSendMessage");
	a.addComponentStereotype();
	a.setComponentName();
	if (b.setElementXml) {} else {
		a.setObjA(new TimeInterval());
		a.setObjB(new TimeInterval())
	}
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLCallMessage = function(b) {
	var a = new CallMessage(b);
	a.setType("UMLCallMessage");
	a.addComponentStereotype();
	a.setComponentName();
	if (b.setElementXml) {} else {
		a.setObjA(new TimeInterval());
		a.setObjB(new TimeInterval())
	}
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new CloseTip({
		color: "#000000"
	}));
	return a
};
var UMLReplyMessage = function(b) {
	var a = new ReplyMessage(b);
	a.setType("UMLReplyMessage");
	a.addComponentStereotype();
	a.setComponentName();
	if (b.setElementXml) {} else {
		a.setObjB(new TimeInterval())
	}
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLDeleteMessage = function(b) {
	var a = new DeleteMessage(b);
	a.setType("UMLDeleteMessage");
	a.addComponentStereotype();
	a.setComponentName();
	if (b.setElementXml) {} else {
		a.setObjA(new TimeInterval())
	}
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLOption = function(b) {
	var b = b || {};
	var a = new Interaction(b);
	a.setType("UMLOption");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setContainer();
	a.setWidth(200);
	a.setHeight(100);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes"
	}));
	a.addComponent(new Tab({
		id: "name",
		text: "OPT",
		margin: 4,
		selected: true
	}));
	a.addComponent(new GuardItem({
		id: "guard",
		text: "[]",
		margin: 1
	}));
	a.addFigure(new RectangleFigure());
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLAlternative = function(b) {
	var b = b || {};
	b = b || {};
	var a = new Alternative(b);
	a.setType("UMLAlternative");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setWidth(200);
	a.setHeight(100);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes"
	}));
	a.addComponent(new Tab({
		id: "name",
		text: "ALT",
		margin: 4,
		selected: true
	}));
	a.addComponent(new RegionAlternativeItem({
		id: "addRegion",
		text: "...",
		margin: 1,
		position: Component.BottomRight
	}));
	a.addFigure(new RectangleFigure());
	if (b.setElementXml) {} else {
		a.addRegion(new RegionAlternative({
			parent: a,
			position: Component.BottomLeft
		}));
		a.addRegion(new RegionAlternative({
			parent: a,
			position: Component.BottomLeft
		}))
	}
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLLoop = function(b) {
	var b = b || {};
	var a = new Interaction(b);
	a.setType("UMLLoop");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setContainer();
	a.setWidth(200);
	a.setHeight(100);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes"
	}));
	a.addComponent(new LoopItem({
		id: "name",
		text: "LOOP",
		margin: 4
	}));
	a.addComponent(new GuardItem({
		id: "guard",
		text: "[]",
		margin: 1
	}));
	a.addFigure(new RectangleFigure());
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLBreak = function(b) {
	var b = b || {};
	var a = new Interaction(b);
	a.setType("UMLBreak");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMoveable();
	a.setContainer();
	a.setWidth(200);
	a.setHeight(100);
	a.addComponent(new StereotypeTagList({
		id: "stereotypes"
	}));
	a.addComponent(new Tab({
		id: "name",
		text: "BREAK",
		margin: 4,
		selected: true
	}));
	a.addFigure(new RectangleFigure());
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var CompositeState = function(a) {
	a = a || {};
	CompositeState.baseConstructor.call(this, a);
	this.setHeightSmallRectangle(a.heightSmallRectangle || 15);
	this.setWidthSmallRectangle(a.widthSmallRectangle || 75);
	this.setXmovement(a.Xmovement || 15)
};
JSFun.extend(CompositeState, SuperNode);
CompositeState.prototype.setHeightSmallRectangle = function(a) {
	this._heightSmallRectangle = a
};
CompositeState.prototype.setWidthSmallRectangle = function(a) {
	this._widthSmallRectangle = a
};
CompositeState.prototype.setXmovement = function(a) {
	this._Xmovement = a
};
CompositeState.prototype.updateContainer = function(e) {
	if (!(e == false || e == true)) {
		e = true
	}
	if (this._container) {
		var m;
		var g = this._x;
		var d = this._y + this._heightSmallRectangle;
		var c = this._x;
		var b = this._y + this._heightSmallRectangle;
		var l;
		var p, a, n, h;
		var o = this._nodeChilds.length;
		for (m = 0; m < o; m++) {
			l = this._nodeChilds[m];
			if (l._visible) {
				if (this._orientation) {
					n = l._x;
					elemLeftY = l._y;
					if (m == (o - 1)) {
						p = l._x + l._minWidth
					} else {
						p = l._x + l._width
					}
					elemRigthY = l._y + l._minHeight
				} else {
					n = l._x;
					elemLeftY = l._y;
					p = l._x + l._minWidth;
					if (m == (o - 1)) {
						elemRigthY = l._y + l._minHeight
					} else {
						elemRigthY = l._y + l._height
					}
					p = l._x + l._minWidth
				}
				if (p > c) {
					c = p
				}
				if (elemRigthY > b) {
					b = elemRigthY
				}
				if (n < g) {
					g = n
				}
				if (elemLeftY < d) {
					d = elemLeftY
				}
			}
		}
		if (g < this._x || d < (this._y + this._heightSmallRectangle)) {
			this.setWidth(this._x - g + this._width);
			this.setHeight(this._y + this._heightSmallRectangle - d + this._height);
			this._x = g;
			this._y = d - this._heightSmallRectangle;
			this.setMinWidth(c - g);
			this.setMinHeight(b - this._y)
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
CompositeState.prototype.notifyChange = function(c, a, b) {
	c = c || false;
	a = a || false;
	b = b || false;
	var e = this._heightSmallRectangle;
	this.setHeightSmallRectangle(this._components[0].getHeight() + this._components[1].getHeight());
	var d = this._heightSmallRectangle - e;
	if (d) {
		this._y = this._y - d;
		this.setHeight(this._height + d)
	}
	if (this._components[0].getWidth() > this._components[1].getWidth()) {
		this.setWidthSmallRectangle(this._components[0].getWidth())
	} else {
		this.setWidthSmallRectangle(this._components[1].getWidth())
	}
	CompositeState.base.notifyChange.call(this, c, a, b)
};
CompositeState.prototype.getElementXML = function(b) {
	var c = b.createElement(this.getType());
	c.setAttribute("id", this.getId());
	c.setAttribute("x", this.getX());
	c.setAttribute("y", this.getY() + this._components[0]._height - 1);
	c.setAttribute("width", this.getWidth());
	c.setAttribute("height", this.getHeight() - this._components[0]._height + 1);
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
CompositeState.prototype.setElementXML = function(d) {
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
			if (c[b].getAttribute("behaviors") != null && (c[b].getAttribute("visible") == "true" || c[b].getAttribute("visible") == "false")) {
				this.setValue(c[b].getAttribute("id"), c[b].getAttribute("value"), c[b].getAttribute("behaviors"), c[b].getAttribute("visible"))
			} else {
				this.setValue(c[b].getAttribute("id"), c[b].getAttribute("value"))
			}
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
	this.notifyChange()
};
CompositeState.prototype.getLinkCentered = function(o, n) {
	if (this._selectedFigure) {
		return CompositeState.base.getLinkCentered.call(this, o, n)
	}
	if (o instanceof Point) {
		n = o.getY();
		o = o.getX()
	}
	var l = this.getCentralPoint();
	var d = l.getX();
	var c = l.getY();
	var a, p, h, g;
	a = this.getX();
	p = this.getY();
	h = l.getX();
	g = this.getY();
	var b;
	if (o < d) {
		if (n < c) {
			b = (this.getY() + this._heightSmallRectangle - c) / (this.getX() - d);
			if (((n - c) == 0) || Math.abs((n - c) / (o - d)) < Math.abs(b)) {
				h = this.getX();
				g = this.getY() + this.getHeight()
			} else {
				b = (this.getY() + this._heightSmallRectangle - c) / (this.getX() + this._Xmovement - d);
				if (Math.abs((n - c) / (o - d)) < Math.abs(b)) {
					p = this.getY() + this._heightSmallRectangle;
					h = this.getX() + this.getWidth();
					g = this.getY() + this._heightSmallRectangle
				} else {
					b = (this.getY() - c) / (this.getX() + this._Xmovement - d);
					if (Math.abs((n - c) / (o - d)) < Math.abs(b)) {
						a = this.getX() + this._Xmovement;
						p = this.getY();
						h = this.getX() + this._Xmovement;
						g = this.getY() + this._heightSmallRectangle
					} else {
						var e = this.getX() + this._Xmovement + this._widthSmallRectangle;
						b = (this.getY() - c) / (e - d);
						if (Math.abs((n - c) / (o - d)) < Math.abs(b)) {
							a = this.getX();
							p = this.getY();
							h = this.getX() + this.getWidth();
							g = this.getY()
						} else {
							a = this.getX();
							p = this.getY() + this._heightSmallRectangle;
							h = this.getX() + this.getWidth();
							g = this.getY() + this._heightSmallRectangle
						}
					}
				}
			}
		} else {
			b = (this.getY() + this.getHeight() - c) / (this.getX() - d);
			if (((n - c) == 0) || Math.abs((n - c) / (o - d)) < Math.abs(b)) {
				h = this.getX();
				g = this.getY() + this.getHeight()
			} else {
				p = this.getY() + this.getHeight();
				h = this.getX() + this.getWidth();
				g = this.getY() + this.getHeight()
			}
		}
	} else {
		if (n < c) {
			var e = this.getX() + this._Xmovement + this._widthSmallRectangle;
			b = (this.getY() + this._heightSmallRectangle - c) / (this.getX() + this.getWidth() - d);
			if (((n - c) == 0) || ((n - c) / (o - d)) < b) {
				b = (this.getY() - c) / (this.getX() + this._Xmovement + this._widthSmallRectangle - d);
				if ((e > (this.getX() + this.getWidth() / 2)) && Math.abs((n - c) / (o - d)) > Math.abs(b)) {
					h = this.getX() + this.getWidth();
					g = this.getY()
				} else {
					b = (this.getY() + this._heightSmallRectangle - c) / (e - d);
					if ((e < (this.getX() + this.getWidth() / 2)) || Math.abs((n - c) / (o - d)) < Math.abs(b)) {
						a = this.getX();
						p = this.getY() + this._heightSmallRectangle;
						h = this.getX() + this.getWidth();
						g = this.getY() + this._heightSmallRectangle
					} else {
						a = this.getX() + this._Xmovement + this._widthSmallRectangle;
						p = this.getY();
						h = this.getX() + this._Xmovement + this._widthSmallRectangle;
						g = this.getY() + this._heightSmallRectangle
					}
				}
			} else {
				a = this.getX() + this.getWidth();
				h = this.getX() + this.getWidth();
				g = this.getY() + this.getHeight()
			}
		} else {
			b = (this.getY() + this.getHeight() - c) / (this.getX() + this.getWidth() - d);
			if (((n - c) == 0) || ((n - c) / (o - d)) < b) {
				a = this.getX() + this.getWidth();
				h = this.getX() + this.getWidth();
				g = this.getY() + this.getHeight()
			} else {
				p = this.getY() + this.getHeight();
				h = this.getX() + this.getWidth();
				g = this.getY() + this.getHeight()
			}
		}
	}
	return JSGraphic.lineIntersection(a, p, h, g, o, n, l.getX(), l.getY())
};
CompositeState.prototype.setVisibility = function(a) {
	this._visible = a;
	var c = true;
	if (this._selectedFigure && a) {
		c = false
	}
	for (var b = 0; b < this._components.length; b++) {
		if ((c || (!c && this._components[b]._id == "name")) && (!(this._components[b] instanceof SpecificationItem) || this._components[b] instanceof SpecificationItem && this._components[b].getValue() != "")) {
			this._components[b].setVisibility(a)
		}
	}
	if (this._container && c) {
		for (b = 0; b < this._nodeChilds.length; b++) {
			this._nodeChilds[b].setVisibility(a)
		}
	}
};
CompositeState.prototype.isOver = function(a, b) {
	if (this._selectedFigure) {
		return CompositeState.base.isOver.call(this, a, b)
	}
	if (a instanceof Point) {
		b = a.getY();
		a = a.getX()
	}
	if ((a >= this._x + this._Xmovement && a <= this._x + this._Xmovement + this._widthSmallRectangle && b >= this._y && b <= this._y + this._heightSmallRectangle) || (a >= this._x && a <= (this._x + this._width) && b >= (this._y + this._heightSmallRectangle) && b <= (this._y + this._height))) {
		return true
	}
	return false
};
CompositeState.prototype.setValue = function(e, c, a, d) {
	var b;
	for (b in this._components) {
		if (!(this._components[b] instanceof SuperComponent) && this._components[b].getId() == e) {
			this._components[b].setValue(c, a, d);
			this.updateComponents();
			return true
		}
	}
	return false
};
CompositeState.prototype.drawFigures = function(b) {
	var a;
	for (a = 0; a < this._figures.length; a += 1) {
		if (a == this._selectedFigure) {
			this._figures[a].draw(b, this._x, this._y, this._width, this._height, this._heightSmallRectangle, this._widthSmallRectangle, this._Xmovement)
		}
	}
};
CompositeState.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
CompositeState.prototype.setSpecification = function(a) {
	this._components[2].setVisibility(true);
	a = a.replace(/\n/gi, ";");
	this._components[2].setText(a)
};
CompositeState.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
CompositeState.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
CompositeState.prototype.getName = function() {
	return this._components[1].getValue()
};
CompositeState.prototype.getSpecification = function() {
	return this._components[2].getValue()
};
CompositeState.prototype.getStereotype = function() {
	return this._components[0]
};
CompositeState.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var EntryPoint = function(a) {
	a = a || {};
	EntryPoint.baseConstructor.call(this, a)
};
JSFun.extend(EntryPoint, Elliptical);
EntryPoint.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
EntryPoint.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
EntryPoint.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
EntryPoint.prototype.getName = function() {
	return this._components[1].getValue()
};
EntryPoint.prototype.getStereotype = function() {
	return this._components[0]
};
EntryPoint.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var ExitPoint = function(a) {
	a = a || {};
	ExitPoint.baseConstructor.call(this, a)
};
JSFun.extend(ExitPoint, Elliptical);
ExitPoint.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
ExitPoint.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
ExitPoint.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
ExitPoint.prototype.getName = function() {
	return this._components[1].getValue()
};
ExitPoint.prototype.getStereotype = function() {
	return this._components[0]
};
ExitPoint.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Junction = function(a) {
	a = a || {};
	Junction.baseConstructor.call(this, a)
};
JSFun.extend(Junction, Elliptical);
Junction.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Junction.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Junction.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Junction.prototype.getName = function() {
	return this._components[1].getValue()
};
Junction.prototype.getStereotype = function() {
	return this._components[0]
};
Junction.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var RegionState = function(a) {
	a = a || {};
	RegionState.baseConstructor.call(this, a)
};
JSFun.extend(RegionState, Region);
RegionState.prototype.addStereotype = function(a) {
	if (this._components[0]) {
		var a = a || "";
		this._components[0].addField("\xAB" + a + "\xBB")
	}
};
RegionState.prototype.setName = function(a) {
	if (this._components[1]) {
		this._components[1].setValue(a)
	}
};
RegionState.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
RegionState.prototype.getName = function() {
	return this._components[1].getValue()
};
RegionState.prototype.getStereotype = function() {
	return this._components[0]
};
RegionState.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var RegionStateItem = function(a) {
	a = a || {};
	RegionStateItem.baseConstructor.call(this, a)
};
JSFun.extend(RegionStateItem, RegionItem);
RegionStateItem.prototype.createRegion = function() {
	var a = this.getParent()._components.length;
	if (this.getParent()._orientation) {
		this.getParent().addRegion(new RegionState({
			parent: this.getParent()
		}))
	} else {
		this.getParent().addRegion(new RegionState({
			parent: this.getParent()
		}))
	}
};
var SimpleState = function(a) {
	a = a || {};
	SimpleState.baseConstructor.call(this, a)
};
JSFun.extend(SimpleState, Rectangular);
SimpleState.prototype.setElementXML = function(d) {
	this.setPosition(parseInt(d.getAttribute("x")), parseInt(d.getAttribute("y")));
	this.resetMovement();
	this.setWidth(parseInt(d.getAttribute("width")));
	this.setHeight(parseInt(d.getAttribute("height")));
	this.setBackgroundColor(d.getAttribute("backgroundColor"));
	var b;
	var c = d.childNodes;
	for (b = 0; b < c.length; b++) {
		if (c[b].nodeName == "item") {
			if (c[b].getAttribute("behaviors") != null && (c[b].getAttribute("visible") == "true" || c[b].getAttribute("visible") == "false")) {
				this.setValue(c[b].getAttribute("id"), c[b].getAttribute("value"), c[b].getAttribute("behaviors"), c[b].getAttribute("visible"))
			} else {
				this.setValue(c[b].getAttribute("id"), c[b].getAttribute("value"))
			}
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
SimpleState.prototype.setValue = function(e, c, a, d) {
	var b;
	for (b in this._components) {
		if (!(this._components[b] instanceof SuperComponent) && this._components[b].getId() == e) {
			this._components[b].setValue(c, a, d);
			this.updateComponents();
			return true
		}
	}
	return false
};
SimpleState.prototype.setVisibility = function(a) {
	this._visible = a;
	var c = true;
	if (this._selectedFigure && a) {
		c = false
	}
	for (var b = 0; b < this._components.length; b++) {
		if ((c || (!c && this._components[b]._id == "name")) && (!(this._components[b] instanceof SpecificationItem) || this._components[b] instanceof SpecificationItem && this._components[b].getValue() != "")) {
			this._components[b].setVisibility(a)
		}
	}
	if (this._container && c) {
		for (b = 0; b < this._nodeChilds.length; b++) {
			this._nodeChilds[b].setVisibility(a)
		}
	}
};
SimpleState.prototype.draw = function(a) {
	if (!this._visible) {
		return
	}
	SimpleState.base.draw.call(this, a);
	if (this._components[2]._visible) {
		a.save();
		a.fillStyle = "#000000";
		a.beginPath();
		a.moveTo(JSGraphic.toPixel(this.getX()), JSGraphic.toPixel(this.getY()) + this._components[0].getHeight() + this._components[1].getHeight());
		a.lineTo(JSGraphic.toPixel(this.getX() + this.getWidth()), JSGraphic.toPixel(this.getY()) + this._components[0].getHeight() + this._components[1].getHeight());
		a.closePath();
		a.fill();
		a.stroke();
		a.restore()
	}
};
SimpleState.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
SimpleState.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
SimpleState.prototype.setSpecification = function(a) {
	this._components[2].setVisibility(true);
	a = a.replace(/\n/gi, ";");
	this._components[2].setText(a)
};
SimpleState.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
SimpleState.prototype.getName = function() {
	return this._components[1].getValue()
};
SimpleState.prototype.getSpecification = function() {
	return this._components[2].getValue()
};
SimpleState.prototype.getStereotype = function() {
	return this._components[0]
};
SimpleState.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var StateMachineDiagram = function(a) {
	StateMachineDiagram.baseConstructor.call(this, a)
};
JSFun.extend(StateMachineDiagram, Diagram);
StateMachineDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
StateMachineDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var Terminate = function(a) {
	a = a || {};
	Terminate.baseConstructor.call(this, a)
};
JSFun.extend(Terminate, Elliptical);
Terminate.prototype.getLinkCentered = function(l, h) {
	if (l instanceof Point) {
		h = l.getY();
		l = l.getX()
	}
	var g = this.getCentralPoint();
	var c = g.getX();
	var b = g.getY();
	var a, m, e, d;
	if (l < c) {
		if (h < b) {
			a = this.getX();
			m = this.getY();
			e = this.getX() + this.getWidth();
			d = this.getY() + this.getHeight()
		} else {
			a = this.getX() + this.getWidth();
			m = this.getY();
			e = this.getX();
			d = this.getY() + this.getHeight()
		}
	} else {
		if (h < b) {
			a = this.getX() + this.getWidth();
			m = this.getY();
			e = this.getX();
			d = this.getY() + this.getHeight()
		} else {
			a = this.getX();
			m = this.getY();
			e = this.getX() + this.getWidth();
			d = this.getY() + this.getHeight()
		}
	}
	return JSGraphic.lineIntersection(a, m, e, d, l, h, g.getX(), g.getY())
};
Terminate.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Terminate.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Terminate.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Terminate.prototype.getName = function() {
	return this._components[1].getValue()
};
Terminate.prototype.getStereotype = function() {
	return this._components[0]
};
Terminate.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Transition = function(a) {
	a = a || {};
	Transition.baseConstructor.call(this, a)
};
JSFun.extend(Transition, Relation);
Transition.prototype.setComponentName = function(a) {
	if (!this._name) {
		this._name = new TransitionItem({
			id: "name"
		});
		this._addComponent(this._name)
	} else {
		this._name.setText(a)
	}
};
Transition.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Transition.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Transition.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Transition.prototype.getName = function() {
	return this._components[1].getValue()
};
Transition.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLStateMachineDiagram = function(b) {
	var a = new StateMachineDiagram(b);
	a.setType("UMLStateMachineDiagram");
	a.setName("State Machine diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLInitialPseudostate", "UMLFinalState", "UMLTerminate", "UMLEntryPoint", "UMLExitPoint", "UMLJunction", "UMLSimpleState", "UMLCompositeState", "UMLVerticalRegion", "UMLHorizontalRegion", "UMLTransition", "Region"]);
	return a
};
var UMLInitialPseudostate = function(b) {
	var a = new Elliptical(b);
	a.setType("UMLInitialPseudostate");
	a.setWidth(16);
	a.setHeight(16);
	a.addFigure(new EllipseFigure({
		color: "#000000",
		changeFigureColor: false
	}));
	return a
};
var UMLFinalState = function(b) {
	var a = new Elliptical(b);
	a.setType("UMLFinalState");
	a.setWidth(16);
	a.setHeight(16);
	a.addFigure(new HalfFilledEllipseFigure({
		color: "#ffffff",
		changeFigureColor: false
	}));
	return a
};
var UMLTerminate = function(b) {
	var b = b || {};
	var a = new Terminate(b);
	a.setType("UMLTerminate");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(20);
	a.setHeight(20);
	a.addFigure(new CrossFigure({
		color: "#000000",
		changeFigureColor: false
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLEntryPoint = function(b) {
	var b = b || {};
	var a = new EntryPoint(b);
	a.setType("UMLEntryPoint");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(14);
	a.setHeight(14);
	a.addFigure(new EllipseFigure({
		color: "#ffffff",
		changeFigureColor: false
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLExitPoint = function(b) {
	var b = b || {};
	var a = new ExitPoint(b);
	a.setType("UMLExitPoint");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(14);
	a.setHeight(14);
	a.addFigure(new CrossEllipseFigure({
		color: "#ffffff",
		changeFigureColor: false
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLJunction = function(b) {
	var b = b || {};
	var a = new Junction(b);
	a.setType("UMLJunction");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(14);
	a.setHeight(14);
	a.addFigure(new EllipseFigure({
		color: "#000000",
		changeFigureColor: false
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom,
		margin: 3
	}));
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLSimpleState = function(b) {
	var b = b || {};
	var a = new SimpleState(b);
	a.setType("UMLSimpleState");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(75);
	a.setHeight(30);
	a.setMoveable();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		position: Component.Static,
		margin: 5
	}));
	a.addComponent(new SpecificationItem({
		id: "specification",
		centered: false,
		position: Component.BottomLeft,
		margin: 10
	}));
	a.addFigure(new RoundedRectangleFigure({
		color: "#ffffbb"
	}));
	a.setMenu([
		[function() {
			for (var c = 0; c < a._components.length; c++) {
				if (a._components[c] instanceof SpecificationItem) {
					a._components[c]._visible = true;
					a._components[c].showDialog();
					a.removeContextualMenu()
				}
			}
		}, "Specifications"],
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLCompositeState = function(b) {
	b = b || {};
	b.includeComponentByRegion = false;
	var a = new CompositeState(b);
	a.setType("UMLCompositeState");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(100);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Xmovement
	}));
	a.addComponent(new TextBox({
		id: "name",
		text: "StateName",
		margin: 3,
		position: Component.Xmovement
	}));
	a.addComponent(new SpecificationItem({
		id: "specification",
		centered: false,
		position: Component.BottomLeft,
		margin: 10
	}));
	a.addFigure(new RegionFigure({
		color: "#ffffbb"
	}));
	a.setHeightSmallRectangle(a._components[0].getHeight() + a._components[1].getHeight());
	a.setWidthSmallRectangle(a._components[1].getWidth());
	if (b.setElementXml) {} else {
		a.addRegion(new Region({
			parent: a
		}))
	}
	a.setMenu([
		[function() {
			for (var c = 0; c < a._components.length; c++) {
				if (a._components[c] instanceof SpecificationItem) {
					a._components[c]._visible = true;
					a._components[c].showDialog();
					a.removeContextualMenu()
				}
			}
		}, "Specifications"],
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLVerticalRegion = function(b) {
	b = b || {};
	b.orientation = 1;
	var a = new CompositeState(b);
	a.setType("UMLVerticalRegion");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(320);
	a.setHeight(150);
	a.setMinHeight(50);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Xmovement
	}));
	a.addComponent(new TextBox({
		id: "name",
		text: "RegionName",
		margin: 3,
		position: Component.Xmovement
	}));
	a.addComponent(new SpecificationItem({
		id: "specification",
		centered: false,
		position: Component.BottomLeft,
		margin: 10
	}));
	a.addComponent(new RegionStateItem({
		id: "addRegion",
		text: "...",
		margin: 1,
		position: Component.BottomRight
	}));
	a.addFigure(new RegionFigure({
		color: "#ffffbb"
	}));
	a.setHeightSmallRectangle(a._components[0].getHeight() + a._components[1].getHeight());
	a.setWidthSmallRectangle(a._components[1].getWidth());
	if (b.setElementXml) {} else {
		a.addRegion(new RegionState({
			parent: a
		}));
		a.addRegion(new RegionState({
			parent: a
		}))
	}
	a.setMenu([
		[function() {
			for (var c = 0; c < a._components.length; c++) {
				if (a._components[c] instanceof SpecificationItem) {
					a._components[c]._visible = true;
					a._components[c].showDialog();
					a.removeContextualMenu()
				}
			}
		}, "Specifications"],
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLHorizontalRegion = function(b) {
	var b = b || {};
	var a = new CompositeState(b);
	a.setType("UMLHorizontalRegion");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(320);
	a.setHeight(150);
	a.setMinHeight(50);
	a.setMoveable();
	a.setContainer();
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Xmovement
	}));
	a.addComponent(new TextBox({
		id: "name",
		text: "RegionName",
		margin: 3,
		position: Component.Xmovement
	}));
	a.addComponent(new SpecificationItem({
		id: "specification",
		centered: false,
		position: Component.BottomLeft,
		margin: 10
	}));
	a.addComponent(new RegionStateItem({
		id: "addRegion",
		text: "...",
		margin: 1,
		position: Component.BottomRight
	}));
	a.addFigure(new RegionFigure({
		color: "#ffffbb"
	}));
	a.setHeightSmallRectangle(a._components[0].getHeight() + a._components[1].getHeight());
	a.setWidthSmallRectangle(a._components[1].getWidth());
	if (b.setElementXml) {} else {
		a.addRegion(new RegionState({
			parent: a
		}));
		a.addRegion(new RegionState({
			parent: a
		}))
	}
	a.setMenu([
		[function() {
			for (var c = 0; c < a._components.length; c++) {
				if (a._components[c] instanceof SpecificationItem) {
					a._components[c]._visible = true;
					a._components[c].showDialog();
					a.removeContextualMenu()
				}
			}
		}, "Specifications"],
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLTransition = function(b) {
	var a = new Transition(b);
	a.setType("UMLTransition");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new OpenTip());
	return a
};
var Actor = function(a) {
	a = a || {};
	Actor.baseConstructor.call(this, a)
};
JSFun.extend(Actor, Rectangular);
Actor.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Actor.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Actor.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Actor.prototype.getName = function() {
	return this._components[1].getValue()
};
Actor.prototype.getStereotype = function() {
	return this._components[0]
};
Actor.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var Communication = function(a) {
	a = a || {};
	Communication.baseConstructor.call(this, a)
};
JSFun.extend(Communication, Relation);
Communication.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Communication.prototype.setMultiplicityA = function(a) {
	this._components[1].setValue(a)
};
Communication.prototype.setMultiplicityB = function(a) {
	this._components[2].setValue(a)
};
Communication.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Communication.prototype.getMultiplicityA = function() {
	return this._components[1].getValue()
};
Communication.prototype.getMultiplicityB = function() {
	return this._components[2].getValue()
};
var Generalization = function(a) {
	a = a || {};
	Generalization.baseConstructor.call(this, a)
};
JSFun.extend(Generalization, Relation);
Generalization.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
Generalization.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
Generalization.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
Generalization.prototype.getName = function() {
	return this._components[1].getValue()
};
Generalization.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var GeneralizationSet = function(a) {
	a = a || {};
	this._pivotP = 2;
	GeneralizationSet.baseConstructor.call(this)
};
JSFun.extend(GeneralizationSet, Relation);
GeneralizationSet.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
GeneralizationSet.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
GeneralizationSet.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
GeneralizationSet.prototype.getName = function() {
	return this._components[1].getValue()
};
GeneralizationSet.prototype.getNameAsComponent = function() {
	return this._components[1]
};
GeneralizationSet.prototype.getRelations = function() {
	return this._relations
};
GeneralizationSet.prototype.setElements = function(b, a) {
	if (!(b instanceof Array)) {
		if (GeneralizationSet.base.setElements.call(this, b, a)) {
			this.updateParent();
			if (!this._orientation) {
				this._orientation = this._calculateOrientation()
			}
			return true
		}
		return false
	}
	for (i in b) {
		if (!(b[i] instanceof Node)) {
			return false
		}
	}
	if (b.length > 1) {
		this.setElements(b.shift(), b.shift());
		while (b[0]) {
			this.addElement(b.shift())
		}
		this.updateParent();
		if (!this._orientation) {
			this._orientation = this._calculateOrientation()
		}
		this._calculateLineEnds();
		return true
	} else {
		return false
	}
};
GeneralizationSet.prototype.getRelation = function(a) {
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			return this._relations[i]
		}
	}
};
GeneralizationSet.prototype.addElement = function(b) {
	if (!(b instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA == b || this._relations[i]._elemB == b) {
			return false
		}
	}
	relation = new SetLine({
		a: b,
		b: this
	});
	relation._calculateLineEnds();
	var a = new Point(relation.getCentralPoint());
	this._points.splice(this._pivotP, 0, a);
	relation._calculateLineEnds();
	relation._points[2] = this._points[this._pivotP];
	this._pivotP++;
	this.notifyChange();
	return true
};
GeneralizationSet.prototype.delElement = function(a) {
	if (!(a instanceof Node)) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i]._elemA === a || this._relations[i]._elemB === a) {
			this._relations[i].remove();
			return true
		}
	}
	return false
};
GeneralizationSet.prototype.notifyDeleted = function(a) {
	for (i = 0; i < this._relations.length; i++) {
		if (this._relations[i] === a && this._relations[i].getType() == "SetLine") {
			this._relations.splice(i, 1);
			this._pivotP--;
			this._points.splice(2 + i, 1)
		}
	}
};
GeneralizationSet.prototype._calculateLineEnds = function() {
	var a, p;
	var g = this._points.length;
	if (!this._points[3]) {
		a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
		p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
		this._points[0] = a;
		this._points[1] = p;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = new Point(this.getCentralPoint());
		this._points[3] = this._points[1];
		this._points[1] = this._points[2];
		this._points[2] = this._points[3];
		this._pivotP = 2;
		this._points[3] = p
	}
	if (this._elemA == this._elemB) {
		var b = this._elemA.getCentralPoint();
		var d = b.getX();
		var c = b.getY();
		var n = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
		var h = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
		var e;
		var m;
		if (this._selected == 2 || this._selected == 0 || this._selected == g - 1 || (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing) {
			if ((n - d) > 0) {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() + m, a.getY() + e);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() + m, a.getY() - e);
					this._points[3] = new Point(p.getX() + m, c)
				}
			} else {
				if ((h - c) > 0) {
					a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = h - a.getY();
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() + e);
					this._points[2] = new Point(p.getX() - m, a.getY() + e);
					this._points[3] = new Point(p.getX() - m, c)
				} else {
					a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					e = a.getY() - h;
					e = (e < 20) ? 20 : e;
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[1] = new Point(d, a.getY() - e);
					this._points[2] = new Point(p.getX() - m, a.getY() - e);
					this._points[3] = new Point(p.getX() - m, c)
				}
			}
		} else {
			if (this._selected == 3) {
				n = this._points[3]._x;
				h = this._points[3]._y;
				a = this._elemA.getLinkCentered(d, this._points[0]._y);
				if ((n - d) > 0) {
					p = this._elemA.getLinkCentered(d + this._elemA.getWidth() / 2, c);
					m = n - p.getX();
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() + m);
					this._points[3] = new Point(p.getX() + m, c)
				} else {
					p = this._elemA.getLinkCentered(d - this._elemA.getWidth() / 2, c);
					m = p.getX() - n;
					m = (m < 20) ? 20 : m;
					this._points[2].setX(p.getX() - m);
					this._points[3] = new Point(p.getX() - m, c)
				}
			} else {
				if (this._selected == 1) {
					n = this._points[1]._x;
					h = this._points[1]._y;
					p = this._elemA.getLinkCentered(this._points[4]._x, c);
					if ((h - c) > 0) {
						a = this._elemA.getLinkCentered(d, c + this._elemA.getHeight() / 2);
						e = h - a.getY();
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() + e);
						this._points[2].setY(a.getY() + e)
					} else {
						a = this._elemA.getLinkCentered(d, c - this._elemA.getHeight() / 2);
						e = a.getY() - h;
						e = (e < 20) ? 20 : e;
						this._points[1] = new Point(d, a.getY() - e);
						this._points[2].setY(a.getY() - e)
					}
				} else {
					if (this._selected == 2) {
						var o = 0;
						var l = 0;
						if (this._elemA._moved) {
							var o = (this._elemA._x - this._elemA._prex) / 2;
							var l = (this._elemA._y - this._elemA._prey) / 2;
							this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
							this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
							a = this._points[0];
							p = this._points[4];
							this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
							this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
							this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
						}
					} else {
						if (this._selected == -1) {
							var o = 0;
							var l = 0;
							if (this._elemA._moved) {
								var o = (this._elemA._x - this._elemA._prex) / 2;
								var l = (this._elemA._y - this._elemA._prey) / 2;
								this._points[0].setPoint(this._points[0]._x + o, this._points[0]._y + l);
								this._points[4].setPoint(this._points[4]._x + o, this._points[4]._y + l);
								a = this._points[0];
								p = this._points[4];
								this._points[1].setPoint(this._points[1]._x + o, this._points[1]._y + l);
								this._points[2].setPoint(this._points[2]._x + o, this._points[2]._y + l);
								this._points[3].setPoint(this._points[3]._x + o, this._points[3]._y + l)
							}
						}
					}
				}
			}
		}
		this._points[0] = a;
		this._points[4] = p;
		while (this._points[5]) {
			this._points.pop()
		}
	} else {
		if (g == 4) {
			a = this._elemA.getLinkCentered(this._points[1]);
			p = this._elemB.getLinkCentered(this._points[this._pivotP]);
			this._points[0] = a;
			this._points[3] = p
		} else {
			if (g > 4) {
				a = this._elemA.getLinkCentered(this._points[1]);
				p = this._elemB.getLinkCentered(this._points[this._pivotP]);
				this._points[0] = a;
				this._points[this._points.length - 1] = p;
				for (i = 0; i < this._relations.length; i++) {
					this._relations[i]._calculateLineEnds()
				}
				if (this._orientation) {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setX(this._points[this._pivotP].getX())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setY(this._points[1].getY() + 5)
					}
				} else {
					for (i = 1; i < this._pivotP; i++) {
						this._points[i].setY(this._points[this._pivotP].getY())
					}
					if (this._points[1].getX() == this._points[this._pivotP].getX() && this._points[1].getY() == this._points[this._pivotP].getY()) {
						this._points[1].setX(this._points[1].getX() + 5)
					}
				}
			} else {
				a = this._elemA.getLinkCentered(this._elemB.getCentralPoint());
				p = this._elemB.getLinkCentered(this._elemA.getCentralPoint());
				this._points[0] = a;
				this._points[1] = p;
				this._points[1] = new Point(this.getCentralPoint());
				this._points[2] = new Point(this.getCentralPoint());
				this._points[3] = this._points[1];
				this._points[1] = this._points[2];
				this._points[2] = this._points[3];
				this._pivotP = 2;
				this._points[3] = p
			}
		}
	}
};
GeneralizationSet.prototype._delUselessPoints = function() {
	var a;
	for (a = this._points.length - 1; a > this._pivotP; a--) {
		if (this._selectLine(this._points[a + 1], this._points[a - 1], this._points[a].getX(), this._points[a].getY(), 10)) {
			this._points.splice(a, 1)
		}
	}
};
GeneralizationSet.prototype.draw = function(c) {
	var h = this._points.length;
	var n = [];
	for (e = this._pivotP; e < h; e++) {
		n.push(this._points[e])
	}
	if (this._line) {
		this._line.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	if (this._end) {
		var b = this._points[h - 2].getX();
		var o = this._points[h - 2].getY();
		var l = this._points[h - 1].getX();
		var g = this._points[h - 1].getY();
		var d = Math.atan2(g - o, l - b);
		this._end.draw(c, l, g, d, this.getLineColor())
	}
	if (this._selected >= 0) {
		var e;
		for (e = 0; e < this._points.length; e++) {
			c.fillRect(parseInt(this._points[e].getX()) - 3, parseInt(this._points[e].pixelY()) - 3, 6, 6)
		}
	}
	n = [];
	for (e = 1; e <= this._pivotP; e++) {
		n.push(this._points[e])
	}
	if (n.length > 1) {
		if (this.getLineStyle() == "solid") {
			var m = new SolidLine()
		} else {
			var m = new DashedLine()
		}
		m.draw(c, n, this.getLineColor(), this.getLineWidth())
	}
	n = [];
	n[0] = this._points[0];
	n[1] = this._points[1];
	n[2] = this._points[this._pivotP];
	if (this.getLineStyle() == "solid") {
		var m = new SolidLine()
	} else {
		var m = new DashedLine()
	}
	m.draw(c, n, this.getLineColor(), this.getLineWidth());
	if (this._selected > -1) {
		this._drawComponentsShape(c)
	}
	this._drawComponents(c)
};
GeneralizationSet.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		if (this.isOver(c, e)) {
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
			if (d >= this._pivotP) {
				this._selectedLine = true;
				this._component = false;
				this._points.splice(this._selected, 0, new Point(c, e))
			} else {
				if (d >= 1) {
					this._selectedPoint = true;
					this._component = false;
					this._selected = this._pivotP
				} else {
					this._selectedPoint = true;
					this._component = false;
					this._selected = 1
				}
			}
			return true
		}
	}
	return false
};
GeneralizationSet.prototype._calculateOrientation = function() {
	var a = (this._elemA.getCentralPoint().getY() - this._elemB.getCentralPoint().getY()) / (this._elemA.getCentralPoint().getX() - this._elemB.getCentralPoint().getX());
	return (a < 1 && a > -1)
};
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation
};
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation
};
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation = true
};
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation = false
};
GeneralizationSet.prototype.getOrientation = function() {
	if (this._orientation) {
		return "x"
	}
	return "y"
};
GeneralizationSet.prototype.setLineStyle = function(a) {
	if (!(GeneralizationSet.base.setLineStyle.call(this, a))) {
		return false
	}
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			if (!(this._relations[i].setLineStyle(a))) {
				return false
			}
		}
	}
	return true
};
GeneralizationSet.prototype.setLineColor = function(a) {
	GeneralizationSet.base.setLineColor.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineColor(a)
		}
	}
};
GeneralizationSet.prototype.setLineWidth = function(a) {
	GeneralizationSet.base.setLineWidth.call(this, a);
	for (i in this._relations) {
		if (this._relations[i].getType() == "SetLine") {
			this._relations[i].setLineWidth(a)
		}
	}
};
var SetLine = function(a) {
	a = a || {};
	this._last = null;
	this._id = 0;
	this._type = "SetLine";
	this._line_color = "#000000";
	this._line_width = 1.25;
	this._points = [new Point(), new Point()];
	this._selected = -1;
	this._selectedBefore = false;
	this._moved = false;
	this._activeComponent = null;
	this._selectedLine = false;
	this._selectedPoint = false;
	this._relations = [];
	this._components = [];
	this._diagram = null;
	this.setElements(a.a, a.b);
	f = this;
	if (this._elemB) {
		this.setMenu([
			[function() {
				f._elemB.showStyleDialog({
					that: f._elemB
				});
				f._elemB.removeContextualMenu()
			}, "Style"]
		]);
		this.setLineStyle(this._elemB.getLineStyle());
		this.setLineColor(this._elemB.getLineColor());
		this.setLineWidth(this._elemB.getLineWidth())
	}
};
JSFun.extend(SetLine, Relation);
SetLine.prototype._delUselessPoints = function() {};
SetLine.prototype.select = function(c, e) {
	this._deselectComponent();
	var b = (this._diagram._touch) ? 4 : 0;
	if (this._diagram._activeMenu) {
		this.removeContextualMenu()
	}
	if (this._diagram._pressMouseRight == true || this._diagram._hold == true) {
		this.setType("SetLine");
		if (this.isOver(c, e)) {
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
	for (var d = 0; d > this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedLine = true;
			this._component = false;
			return true
		}
	}
	for (d = 0; d < this._points.length; d++) {
		if (Math.abs(c - this._points[d].getX()) <= 4 && Math.abs(e - this._points[d].getY()) <= 4) {
			if (d == 2) {
				return false
			}
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = d;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	for (var d = 0; d < this._points.length - 1; d++) {
		if (this._selectLine(this._points[d], this._points[d + 1], c, e, 20)) {
			if (this._selected > -1) {
				this._selectedBefore = true
			}
			this._selected = 1;
			this._selectedPoint = true;
			this._component = false;
			return true
		}
	}
	return false
};
SetLine.prototype._calculateLineEnds = function() {
	if (!this._elemB) {
		return false
	}
	var a = this._points[1];
	if (this._elemB._orientation) {
		if (this._points.length < 3) {
			var a = new Point(this._elemB._points[1].getX(), this._elemA.getCentralPoint().getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getY() < this._elemA.getY()) {
					this._points[2].setY(this._elemA.getY() - 20)
				} else {
					this._points[2].setY(this._elemA.getY() + this._elemA.getHeight() + 20)
				}
			}
			if (this._points[0].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[2].getX() <= this._elemA.getX()) {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX() - 10)
			} else {
				if (this._points[2].getX() >= this._elemA.getX() + this._elemA.getWidth() && this._points[0].getX() <= this._elemA.getX()) {
					this._points[0].setX(this._elemA.getX() + this._elemA.getWidth());
					this._points[1].setX(this._elemA.getX() + this._elemA.getWidth() + 10)
				}
			}
		}
	} else {
		if (this._points.length < 3) {
			var a = new Point(this._elemA.getCentralPoint().getX(), this._elemB._points[1].getY());
			this._points[0] = this._elemA.getLinkCentered(a)
		} else {
			if (this._elemA.isOver(this._points[2])) {
				if (this._elemB._points[this._elemB._pivotP].getX() < this._elemA.getX()) {
					this._points[2].setX(this._elemA.getX() - 20)
				} else {
					this._points[2].setX(this._elemA.getX() + this._elemA.getWidth() + 20)
				}
			}
			if (this._points[0].getY() <= this._elemA.getY() && this._points[2].getY() > this._elemA.getY() + this._elemA.getHeight()) {
				this._points[0].setY(this._elemA.getY() + this._elemA.getHeight());
				this._points[1].setY(this._elemA.getY() + this._elemA.getHeight() + 10)
			} else {
				if (this._points[0].getY() >= this._elemA.getY() + this._elemA.getHeight() && this._points[2].getY() <= this._elemA.getY()) {
					this._points[0].setY(this._elemA.getY());
					this._points[1].setY(this._elemA.getY() - 10)
				}
			}
		}
	}
	if (this._points.length < 3) {
		this._points[1] = a;
		this._points[1] = new Point(this.getCentralPoint());
		this._points[2] = a
	}
	this._points[0] = this._elemA.getLinkCentered(this._points[1])
};
SetLine.prototype.setElementXML = function(g, a) {
	var l = g.getAttribute("side_A");
	var h = g.getAttribute("side_B");
	var c = a[h];
	var d = a[l];
	if (!(c instanceof GeneralizationSet)) {
		return null
	}
	c.addElement(d);
	relation = c._relations[c._relations.length - 1];
	this.setId(g.getAttribute("id"));
	var e;
	var m = g.childNodes;
	var b = 0;
	for (e = 0; e < m.length; e++) {
		if (m[e].nodeName == "point") {
			this._points[b] = new Point(parseInt(m[e].getAttribute("x")), parseInt(m[e].getAttribute("y")));
			b++
		}
	}
	c.delElement(d);
	this.setLineStyle(c.getLineStyle());
	this.setLineColor(c.getLineColor());
	this.setLineWidth(c.getLineWidth());
	this._type = "SetLine";
	this._elemA = d;
	this._elemB = c;
	c._relations.splice(c._relations.length - 1, 1, this);
	this._points[2] = c._points[c._pivotP];
	c._pivotP++;
	c.notifyChange();
	d.addRelation(this)
};
var SubSystem = function(a) {
	a = a || {};
	SubSystem.baseConstructor.call(this, a)
};
JSFun.extend(SubSystem, Rectangular);
SubSystem.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[1].addField("\xAB" + a + "\xBB")
};
SubSystem.prototype.setName = function(a) {
	this._components[3].setValue(a)
};
SubSystem.prototype.getStereotypes = function() {
	return this._components[1]._childs
};
SubSystem.prototype.getName = function() {
	return this._components[3].getValue()
};
SubSystem.prototype.getStereotype = function() {
	return this._components[1]
};
SubSystem.prototype.getNameAsComponent = function() {
	return this._components[3]
};
var System = function(a) {
	a = a || {};
	System.baseConstructor.call(this, a)
};
JSFun.extend(System, Rectangular);
System.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
System.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
System.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
System.prototype.getName = function() {
	return this._components[1].getValue()
};
System.prototype.getStereotype = function() {
	return this._components[0]
};
System.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UseCase = function(a) {
	a = a || {};
	UseCase.baseConstructor.call(this, a)
};
JSFun.extend(UseCase, Elliptical);
UseCase.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
UseCase.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
UseCase.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
UseCase.prototype.getName = function() {
	return this._components[1].getValue()
};
UseCase.prototype.getStereotype = function() {
	return this._components[0]
};
UseCase.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UseCaseClassifier = function(a) {
	a = a || {};
	UseCaseClassifier.baseConstructor.call(this, a)
};
JSFun.extend(UseCaseClassifier, Rectangular);
UseCaseClassifier.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
UseCaseClassifier.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
UseCaseClassifier.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
UseCaseClassifier.prototype.getName = function() {
	return this._components[1].getValue()
};
UseCaseClassifier.prototype.getStereotype = function() {
	return this._components[0]
};
UseCaseClassifier.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UseCaseDiagram = function(a) {
	UseCaseDiagram.baseConstructor.call(this, a)
};
JSFun.extend(UseCaseDiagram, Diagram);
UseCaseDiagram.prototype.setXML = function(b, g) {
	var g = g || null;
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
		this._addElementXML(d[c], e, null, g)
	}
	for (c = 0; c < this._relations.length; c++) {
		this._relations[c].notifyChange()
	}
	this._sortNodesByArea();
	return true
};
UseCaseDiagram.prototype._addElementXML = function(g, e, d, l) {
	var d = d || null;
	var l = l || null;
	var h = e[g.getAttribute("id")];
	if (h) {
		if (d instanceof SuperNode && h instanceof Region) {
			h.addComponents(false)
		}
		if (h._stereotypeProperties && l) {
			h._stereotypeProperties.setStereotypesProfile(l)
		}
		h.setElementXML(g, e);
		if (d instanceof SuperNode && h instanceof Node) {
			h.setDiagram(this);
			if (h instanceof Region) {
				var b = h._parent._nodeChilds;
				var a = b.length;
				if (a > 0) {
					if (h._parent._orientation) {
						b[a - 1].setWidth(h._x - b[a - 1]._x)
					} else {
						b[a - 1].setHeight(h._y - b[a - 1]._y)
					}
					b[a - 1].updateComponents()
				}
			}
		} else {
			this._addElementOnly(h)
		}
		if (d && h instanceof Node) {
			d.addChild(h);
			if (h instanceof Swimlane) {
				h._parent.updateSizeComponentSwimlane()
			}
			d.updateContainer(false);
			if (d._parent instanceof SuperNode) {
				d._parent.updateContainer(false)
			}
		}
		for (var c = 0; c < g.childNodes.length; c++) {
			this._addElementXML(g.childNodes[c], e, h, l)
		}
	}
};
var UseCaseExtended = function(a) {
	a = a || {};
	UseCaseExtended.baseConstructor.call(this, a)
};
JSFun.extend(UseCaseExtended, Elliptical);
UseCaseExtended.prototype.addStereotype = function(a) {
	var a = a || "";
	this._components[0].addField("\xAB" + a + "\xBB")
};
UseCaseExtended.prototype.setName = function(a) {
	this._components[1].setValue(a)
};
UseCaseExtended.prototype.addExtensionPoint = function(a) {
	this._components[4].addField(a)
};
UseCaseExtended.prototype.getStereotypes = function() {
	return this._components[0]._childs
};
UseCaseExtended.prototype.getName = function() {
	return this._components[1].getValue()
};
UseCaseExtended.prototype.getExtensionPoints = function() {
	return this._components[4]._childs
};
UseCaseExtended.prototype.getStereotype = function() {
	return this._components[0]
};
UseCaseExtended.prototype.getNameAsComponent = function() {
	return this._components[1]
};
var UMLUseCaseDiagram = function(b) {
	var a = new UseCaseDiagram(b);
	a.setType("UMLUseCaseDiagram");
	a.setName("Use case diagram");
	a.setValidElements(["UMLNote", "UMLLine", "UMLActor", "UMLUseCase", "UMLUseCaseExtended", "UMLUseCaseClassifier", "UMLSystem", "UMLSubSystem", "UMLCommunication", "UMLExtend", "UMLInclude", "UMLGeneralization", "UMLGeneralizationSet", "SetLine"]);
	return a
};
var UMLActor = function(b) {
	var b = b || {};
	var a = new Actor(b);
	a.setType("UMLActor");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMinWidth(50);
	a.setMinHeight(70);
	a.setProportional();
	a.setMoveable();
	a.addFigure(new StickmanFigure());
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		position: Component.Bottom
	}));
	a.addComponent(new TextArea({
		id: "name",
		position: Component.Bottom
	}));
	a.setMenu([
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLUseCase = function(b) {
	var b = b || {};
	var a = new UseCase(b);
	a.setType("UMLUseCase");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(40);
	a.setMoveable();
	a.addFigure(new EllipseFigure());
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLUseCaseExtended = function(b) {
	var b = b || {};
	var a = new UseCaseExtended(b);
	a.setType("UMLUseCaseExtended");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(40);
	a.setMoveable();
	a.addFigure(new EllipseFigure());
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true
	}));
	a.addComponent(new Separator());
	a.addComponent(new Text({
		text: "extension points",
		centered: true
	}));
	a.addComponent(new TextFields({
		id: "extension",
		centered: true
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLSystem = function(b) {
	var b = b || {};
	var a = new System(b);
	a.setType("UMLSystem");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(150);
	a.setHeight(100);
	a.setMoveable();
	a.setContainer();
	a.addFigure(new RectangleFigure({
		color: "#c6dbdc"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new Tab({
		id: "name",
		margin: 5,
		text: "System name"
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLSubSystem = function(b) {
	var b = b || {};
	var a = new SubSystem(b);
	a.setType("UMLSubSystem");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setMinWidth(150);
	a.setHeight(100);
	a.setMoveable();
	a.setContainer();
	a.addFigure(new RectangleFigure({
		color: "#c6dbdc"
	}));
	a.addComponent(new Text({
		centered: true,
		text: "\xABsubsystem\xBB",
		margin: 1
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new ComponentSymbol({
		position: Component.TopRight,
		margin: 5
	}));
	a.addComponent(new TextBox({
		id: "name",
		centered: true,
		margin: 2
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLCommunication = function(b) {
	var a = new Communication(b);
	a.setType("UMLCommunication");
	a.addComponentStereotype();
	a.setComponentMultiplicityA();
	a.setComponentMultiplicityB();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	return a
};
var UMLUseCase = function(b) {
	var b = b || {};
	var a = new UseCase(b);
	a.setType("UMLUseCase");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(40);
	a.setMoveable();
	a.addFigure(new EllipseFigure());
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};
var UMLExtend = function(b) {
	var a = new Relation(b);
	a.setType("UMLExtend");
	a.setStereotype("\xABextend\xBB");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLInclude = function(b) {
	var a = new Relation(b);
	a.setType("UMLInclude");
	a.setStereotype("\xABinclude\xBB");
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new DashedLine());
	a.setEnd(new OpenTip());
	return a
};
var UMLGeneralization = function(b) {
	var a = new Generalization(b);
	a.setType("UMLGeneralization");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new CloseTip());
	return a
};
var UMLGeneralizationSet = function(b) {
	var a = new GeneralizationSet(b);
	a.setType("UMLGeneralizationSet");
	a.addComponentStereotype();
	a.setComponentName();
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"]
	]);
	a.setLine(new SolidLine());
	a.setEnd(new CloseTip());
	return a
};
var UMLUseCaseClassifier = function(b) {
	var b = b || {};
	var a = new UseCaseClassifier(b);
	a.setType("UMLUseCaseClassifier");
	setStereotypeProperties(a, b.stereotypes || []);
	a.setWidth(100);
	a.setHeight(40);
	a.setMoveable();
	a.addFigure(new RectangleFigure({
		color: "#ffffbb"
	}));
	a.addComponent(new StereotypeTagList({
		id: "stereotypes",
		centered: true
	}));
	a.addComponent(new TextArea({
		id: "name",
		centered: true,
		margin: 3
	}));
	a.addComponent(new ElipseSymbol({
		position: Component.TopRight,
		margin: 3
	}));
	a.setMenu([
		[function() {
			a.showStyleDialog({
				that: a
			});
			a.removeContextualMenu()
		}, "Style"],
		[function() {
			getStereotypeProperties(a).showTagValuesDialog();
			a.removeContextualMenu()
		}, "Tag value"],
		[function() {
			getStereotypeProperties(a).showApplyStereotypesDialog();
			a.removeContextualMenu()
		}, "Apply Stereotype"],
		[function() {
			getStereotypeProperties(a).showStereotypesDialog();
			a.removeContextualMenu()
		}, "Show Stereotype"]
	]);
	return a
};