function Equation() {
    var form = document.forms.coefficients;
    var template_for_searching = /\s*-?\s*\d*\s*\.?\s*\d*/;
    var template_for_definition_of_negative_number = /\s*-\s*(?!=\d+)/;
    var template_for_definition_of_one = /\s*?/;

    var a_general = form.elements.a.value.toString().match(template_for_searching).toString().replace(/\s+/g, "");
    var b_general = form.elements.b.value.toString().match(template_for_searching).toString().replace(/\s+/g, "");
    var c_general = form.elements.c.value.toString().match(template_for_searching).toString().replace(/\s+/g, "");
    var rs_general = form.elements.rs.value.toString().match(template_for_searching).toString().replace(/\s+/g, "");



    function toNumber(value) {
        return value == value.toString().match(template_for_definition_of_negative_number) ? -1 : (value == value.toString().match(template_for_definition_of_one) ? 1 : +value);
    }
    var a_number = toNumber(a_general),
        b_number = toNumber(b_general),
        c_number = +c_general,
        rs_number = +rs_general;

    a_general = (a_general == a_general.match(/^\s*1(?!=\w*)/) ? "" : (a_general == a_general.match(/^\s*-\s*1(?!=\w*)/) ? "-" : a_general));
    b_general = (b_general == b_general.match(/^\s*1(?!=\w*)/) ? "" : (b_general == b_general.match(/^\s*-\s*1(?!=\w*)/) ? "-" : b_general));
    if (a_number == 0) {
        LinearEquation();
    } else {
        QuadraticEquation()
    }

    function LinearEquation() {
        var visualRepresentation = b_general + "x" + (c_number > 0 ? "+" : "") + (c_number != 0 ? c_number : "") + "=" + rs_number;

        visualRepresentation += rs_number == 0 ? "" : "<br><br><span class='text-info'>Let's transform the equation<\/span><br><br>" + b_general + "x" + ((c_number - rs_number) > 0 ? "+" : "") + (c_number - rs_number) + "=0";
        document.getElementById("answer").innerHTML = visualRepresentation;
        c_number -= rs_number;
        var visualRepresentation2 = "<span class='text-warning'>Oh. Looks like a linear equation. For easier solving let\'s present it like <b>bx = c</b></span><br><br>" + b_general + "x=" + (-c_number);
        document.getElementById("answer2").innerHTML = visualRepresentation2;
        var answer = null;
        if (b_number == 0 && c_number == 0) {
            var answer = "<span class='text-info'>This equation has an infinite count of roots</span><br><br>x &#8712; R";
            document.getElementById("answer3").innerHTML = answer;
        } else if (b_number == 0 && c_number != 0) {
            answer = "<span class='text-info'>This equation has no roots</span>";
            document.getElementById("answer3").innerHTML = answer;
        } else {
            answer = "<span class='text-info'>There is the only one root<\/span><br><br>" + "x = " + (-c_number) + " &#247 " + b_number + " = " + -(c_number / b_number);
            document.getElementById("answer3").innerHTML = answer;
            document.getElementById("answer3").style.marginBottom = "5%";
            Plot(a_number, b_number, -c_number);
        }
    }


    function QuadraticEquation() {
        function twoRealRoots(a, c) {
            return "<span class='text-info'>Here's the answer</span><br><br>x<sub>1</sub> = " + "&#8730; " + "(" + (c + " &#247 " + a) + ") = " + Math.sqrt(c / a) + "<br>" + "x<sub>2</sub> = - " + "&#8730; " + "(" + (c + " &#247 " + a) + ") = " + -Math.sqrt(c / a);
        }

        function twoComplexRoots(a, c) {
            return "<span class='text-info'>Here's the answer</span><br><br>x<sub>1</sub> = i" + "&#8730; " + "(" + (Math.abs(c) + " &#247 " + Math.abs(a)) + ") = " + Math.sqrt(Math.abs(c) / Math.abs(a)) + "i" + "<br>" + "x<sub>2</sub> = i" + "&#8730; " + "(" + (Math.abs(c) + " &#247 " + Math.abs(a)) + ") = " + -Math.sqrt(Math.abs(c) / Math.abs(a)) + "i"
        }

        function twoRealRootsForZero(a, b) {
            return "<span class='text-info'>Each of the sides is equal to zero</span><br><br>x<sub>1</sub> = 0" + "<br>" + "x<sub>2</sub> = " + -(b / a);
        }

        function oneRoot(a, b) {
            return "<span class='text-info'>There is the only one root</span><br><br>x = - (" + b + " &#177 " + "2*" + a + ") = " + -(b / (2 * a));
        }

        function twoComplexRootsForD(a, b, d) {
            return "<span class='text-error'>There are the only complex roots. If it is useful for you...<\/span><br><br><span class='text-info'>Finding the complex roots</span><br><br>x<sub>1</sub> = - (" + b + " &#247 " + "2*" + a + ") + &#8730; (" + Math.abs(d) + "i<sup>2</sup>)" + " &#247 " + "2*" + a + " = " + -(b / (2 * a)) + " + " + Math.sqrt(Math.abs(d)) / (2 * a) + "i" + "<br>" + "x<sub>2</sub> = - (" + b + " &#247 " + "2*" + a + ") - &#8730; (" + Math.abs(d) + "i<sup>2</sup>)" + " &#247 " + "2*" + a + " = " + -(b_number / (2 * a_number)) + " - " + Math.sqrt(Math.abs(discriminant_value)) / (2 * a_number) + "i";
        }

        function twoRealRootsForD(a, b, d) {
            return "<span class='text-info'>Here is the answer</span><br><br>x<sub>1</sub> = - (" + b + " &#247 " + "2*" + a + ") + &#8730; (" + d + ")" + " &#247 " + "2*" + a + " = " + (-b+Math.sqrt(d))/(2*a) + "<br>" +  "x<sub>2</sub> = - (" + b + " &#247 " + "2*" + a + ") - &#8730; (" + d + ")" + " &#247 " + "2*" + a + " = " + (-b-Math.sqrt(d))/(2*a);
        }
        b_general = b_number > 0 ? "+" + b_general : (b_general == 0 ? "" : b_general);
        c_general = c_number > 0 ? "+" + c_general : c_general;
        var visualRepresentation = a_general + "x" + "<sup>2</sup>" + b_general + (b_general == 0 ? "" : "x") + (c_number != 0 ? c_general : "") + "=" + rs_number;
        visualRepresentation += rs_number == 0 ? "" : "<br><br><span class='text-info'>Let's transform the equation<\/span><br><br>" + a_general + "x" + "<sup>2</sup>" + b_general + (b_general == 0 ? "" : "x") + ((c_number - rs_number) > 0 ? "+" + (c_number - rs_number) : ((c_number - rs_number) == 0 ? "" : (c_number - rs_number))) + "=0";
        document.getElementById("answer").innerHTML = visualRepresentation;
        c_number -= rs_number;
        var answer = null;
        var discriminant_value = (Math.pow(b_number, 2) - 4 * a_number * c_number);
        var visibleRepresentation2 = null;
        if (b_general == 0) {
            c_number = c_number * (-1);
            visibleRepresentation2 = "<span class='text-info'>It's very simple example of quadratic equation.</span><br><br>" + a_general + "x<sup>2</sup>=" + c_number;
            document.getElementById("answer2").innerHTML = visibleRepresentation2;
            if (c_number / a_number >= 0) {
                answer = twoRealRoots(a_number, c_number);
                document.getElementById("answer3").innerHTML = answer;
                document.getElementById("answer3").style.marginBottom = "5%";
                Plot(a_number, b_number, c_number);
            } else {
                answer = twoComplexRoots(a_number, c_number);
                document.getElementById("answer3").innerHTML = answer;
                document.getElementById("answer3").style.marginBottom = "5%";
                Plot(a_number, b_number, c_number);
            }
        } else if (c_number == 0) {
            visibleRepresentation2 = "<span class='text-info'>First of all we can break out x</span><br><br>" + "x(" + a_general + "x" + (b_number > 0 ? "+" + b_number : b_number) + ")=0"; //pay attention
            document.getElementById("answer2").innerHTML = visibleRepresentation2;
            answer = twoRealRootsForZero(a_number, b_number);
            document.getElementById("answer3").innerHTML = answer;
            document.getElementById("answer3").style.marginBottom = "5%";
            Plot(a_number, b_number, c_number);
        } else {
            visibleRepresentation2 = "<span class='text-info'>Finding the discriminant</span><br><br>" + "&#916=" + "b<sup>2</sup>-4ac=" + Math.pow(b_number, 2) + (a_number * c_number > 0 ? "-" : "+") + 4 * Math.abs(a_number * c_number) + "=" + discriminant_value;
            document.getElementById("answer2").innerHTML = visibleRepresentation2;
            if (discriminant_value == 0) {
                answer = oneRoot(a_number, b_number);
                document.getElementById("answer3").innerHTML = answer;
                document.getElementById("answer3").style.marginBottom = "5%";
                Plot(a_number, b_number, c_number);
            } else if (discriminant_value < 0) {
                answer = twoComplexRootsForD(a_number, b_number, discriminant_value);
                document.getElementById("answer3").innerHTML = answer;
                document.getElementById("answer3").style.marginBottom = "5%";
                Plot(a_number, b_number, c_number);
            } else {
                answer = twoRealRootsForD(a_number, b_number, discriminant_value);
                document.getElementById("answer3").innerHTML = answer;
                document.getElementById("answer3").style.marginBottom = "5%";
                Plot(a_number, b_number, c_number);
            }

        }
    }
}