function quadraticOrNotEquation(a, b, c) {
    if (+a == 0) {
        return "The solution for your LINEAR equation is equal to " + -c / b;
    }
    else {
        var arrayOfRoots = [];
        var discriminant = Math.pow(b, 2) - 4 * a * c;
        if (discriminant != 0) {
            arrayOfRoots[0] = (discriminant > 0 ? ((-b + Math.sqrt(discriminant)) / (2 * a)).toPrecision(3) : (-b / (2 * a) + "+" + (Math.sqrt(Math.abs(discriminant)) / (2 * a)).toPrecision(3) + "i"));
            arrayOfRoots[1] = (discriminant > 0 ? ((-b - Math.sqrt(discriminant)) / (2 * a)).toPrecision(3) : (-b / (2 * a) + "-" + (Math.sqrt(Math.abs(discriminant)) / (2 * a)).toPrecision(3) + "i"));
        }
else {
            return "There is the only one solution: "+ (-b/(2*a));
        }
        return (arrayOfRoots[0].match(/[i]/g) == "i" ? "There are only complex solutions : (" + arrayOfRoots + ")" : "The real solutions are: (" + arrayOfRoots + ")");
    }
}

var equation = prompt("Write here your equation(which can be linear or quadratic).");

var a = equation.match(/-?\d*?\.?\d*?(?=x\^2)\s*?/);
a = (a == "" ? 1 : (a == "-" ? -1 : a));
var b = equation.match(/-?\s*?\d*?\.?\d*(?=[x])(?!x\^2)\s*?/);
b = (b == "" ? 1 : (b == "-" ? -1 : b));
var c = equation.match(/(?!2)-?\d+(?=[=])\s*?/);
var right_side = equation.match(/-?\d+$/);
c-= +right_side;

alert(quadraticOrNotEquation(a,b,c));
