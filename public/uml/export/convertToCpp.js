function createCppObject(jsonData) {
    var convert = {};
    indent = "  ";
    classesArray = [];
    classObj = {};
	var cppCode = "#include <iostream>\nusing namespace std;\n\n"; 
    try {
        convert = JSON.parse(jsonData);
        classes = createClassesC(convert, "Pizarra", indent);
        var code = js_beautify(classes, {
            'indent_size': 1,
            'indent_char': ' '
        });
        code = code.split("- >").join("->");
		cppCode += code; 
    } catch (e) {
        console.log(e);
    }

    var saveData = (
        function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function () {
                var name = "text/plain";
                var blob = new File([cppCode], name);
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download = 'Pizarra ' + board_id + ' codeCpp' + '.cpp';
                a.click();
                URL.revokeObjectURL(url);
            };
        }()
    );
    saveData();
}

function createClassC(obj, label, indent) {
    var classText = "class " + label + " {\n";
    classText = classText + parserC(obj, indent) + "\n};";
    classesArray.push(classText);
}

function createClassesC(obj, startingLabel, indent) {
    createClassC(obj, startingLabel, indent);
    return classesArray.reverse().join("\n");
}

function parserC(obj, indent) {
    var output = "";
    var keys = Object.keys(obj);
    var keyNames = [];
    for (var i in keys) {
        keyNames[i] = keys[i][0].toUpperCase() + keys[i].slice(1);
        output += indent;
        switch (typeof obj[keys[i]]) {
            case 'string':
                output += 'std::string ' + keys[i] + ";\n";
                break;
            case 'number':
                output += 'float ' + keys[i] + ";\n";
                break;
            case 'boolean':
                output += 'bool ' + keys[i] + ";\n";
                break;
            default:
                if (Array.isArray(obj[keys[i]])) {
                    output += 'std::vector<Object> ' + keys[i] + ";\n";
                } else if (obj[keys[i]] == null || obj[keys[i]] == undefined) {
                    output += 'std::string ' + keys[i] + " = \"\";\n";
                } else {
                    classObj[keyNames[i]] = keyNames[i] + "Object";
                    output += keyNames[i] + " " + classObj[keyNames[i]] + ";\n";
                    output += parserC(obj[keys[i]], indent + "  ");
                }
        }
    }
    return output;
}
