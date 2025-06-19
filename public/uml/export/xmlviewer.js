function convertXMLToJava() {
	try {
		var data = app.getXMLString();
		if (data.trim().length == 0) {
			Swal.fire({
				title: "Error",
				text: "Diagrama vacío!",
				icon: "warning"
			});
			return false;
		}
		var x2js = new X2JS();
		var n = vkbeautify.json(x2js.xml_str2json(data));
		createJavaObject(n);

	} catch (e) {
		console.log(e);
	}
}

function convertXMLToCpp() {
	try {
		var data = app.getXMLString();
		if (data.trim().length == 0) {
			Swal.fire({
				title: "Error",
				text: "Diagrama vacío!",
				icon: "warning"
			});
			return false;
		}
		var x2js = new X2JS();
		var n = vkbeautify.json(x2js.xml_str2json(data));
		createCppObject(n);

	} catch (e) {
		console.log(e);
	}
}

// xml to json
function convertXMLToJson() {

	var xml = app.getXMLString();

	if (xml.trim().length > 0) {
		try {
			var x2js = new X2JS();
			var code = vkbeautify.json(x2js.xml_str2json(xml));
			var saveData = (
				function () {
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					return function () {
						var name = "text/plain";
						var blob = new File([code], name);
						var url = window.URL.createObjectURL(blob);
						a.href = url;
						a.download = 'Pizarra ' + board_id + ' codeJson' + '.json';
						a.click();
						window.URL.revokeObjectURL(url);
					};
				}()
			);
			saveData();

		} catch (e) {
			console.log(e);
			Swal.fire({
				title: "Error",
				text: "Diagrama vacío!",
				icon: "warning"
			});
		}
	}
}

function exportXML() {
	try {
		var code = app.getXMLString();
		if (code.trim().length == 0) {
			Swal.fire({
				title: "Error",
				text: "Diagrama vacío!",
				icon: "warning"
			});
			return false;
		}
		var saveData = (
			function () {
				var a = document.createElement("a");
				document.body.appendChild(a);
				a.style = "display: none";
				return function () {
					var name = "text/plain";
					var blob = new File([code], name);
					var url = window.URL.createObjectURL(blob);
					a.href = url;
					a.download = 'Pizarra ' + board_id + ' codeXML' + '.xml';
					a.click();
					window.URL.revokeObjectURL(url);
				};
			}()
		);
		saveData();

	} catch (e) {
		console.log(e);
	}
}
