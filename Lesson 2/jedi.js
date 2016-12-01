function QuadraticEquation() {
    var a = 1, b = 1, c = 0, rightside = 0;
    var form = document.forms.coefficients;
    var template = /\s*?-\s*?/;
    if (form.elements.a.value != form.elements.a.value.match(template) && form.elements.a.value != '') {
        a = form.elements.a.value;
    }
    else if (form.elements.a.value == form.elements.a.value.match(template) && form.elements.a.value != 0) {
        a = -1
    }

    if (form.elements.b.value != form.elements.b.value.match(template) && form.elements.b.value != '') {
        b = form.elements.b.value;
    }
    else if (form.elements.b.value == form.elements.b.value.match(template)) {
        b = -1
    }

    if (form.elements.c.value != form.elements.c.value.match(template) && form.elements.c.value != '') {
        c = form.elements.c.value;
    }
    if (form.elements.rightside.value != form.elements.rightside.value.match(template) && form.elements.rightside.value != '') {
        rightside = form.elements.rightside.value;
    }
    a = (form.elements.a.value.match(/0/) == a  ? 0 : (a == 0 ? 1 : a));
    b = (form.elements.b.value.match(/0/) == b  ? 0 : (b == 0 ? 1 : b));
    +a;
    +b;
    +c;
    +rightside;

    var solution_explain = null;
    var visibleCoefficients = {
        a: a == 0 ? '' : (a > 1 ? a : (a == 1 ? '' : (a < -1 ? a : "-"))),
        b: b == 0 ? '' :(b > 1 ? ' + ' + b : (b == 1 ? ' + ' : (b < -1 ? ' - ' + Math.abs(b) : " - "))),
        c:(c >= 1 ? ' + ' + c : (c == 0 ? '' : ' - ' + Math.abs(c)))
    }

    var equationInput = ((a =='' && a == 0 ? '' : visibleCoefficients.a + "x" + "<sup>2<\/sup>") + (a == 0 && b > 0 ? visibleCoefficients.b.replace(/\s\+\s/, "") : visibleCoefficients.b ) + "x" + visibleCoefficients.c + ' = ' + rightside + (rightside != 0 ? "<br><br><span class='text-info'>Let's transform the equation<\/span><br><br>" + (a =='' && a == 0 ? '' : visibleCoefficients.a + "x" + "<sup>2<\/sup>") +  (a == 0 && b > 0 ? visibleCoefficients.b.replace(/\s\+\s/, "") : visibleCoefficients.b ) + "x" + ((c - rightside) > 0 ? ' + ' + (c - rightside) : ((c - rightside) == 0 ? '' : " - " + Math.abs((c - rightside)))) + " = 0" : ''));
    document.getElementById("answer").innerHTML = equationInput;
    c -= rightside;
    var discriminant_value = (Math.pow(b, 2) - 4 * a * c);
    var discriminant =  (c != 0 ? "<span class='text-info'>Then we must calculate discriminant<\/span><br><br>"+"&#916 = "+Math.pow(b, 2) + (a * c > 0 ? " - " : " + ") + "4*" + Math.abs(a) + "*" +  Math.abs(c) + " = " +  (Math.pow(b, 2) - 4 * a * c):"<br><span class='text-info'>Break out x<\/span><br><br>"+"x("+visibleCoefficients.a+"x"+(b >=1 ? " + " : " - ")+Math.abs(b)+") = 0");

    document.getElementById("answer2").innerHTML = discriminant;
    if (a == 0) {
       LinearEquation();
    }
    else if (c == 0) {
        solution_explain = "<br><span class='text-info'>Each of the sides is equal to zero. Here's the answer<\/span><br><br>"+"x<sub>1<\/sub>"+" = 0"+"<br>"+"x<sub>2<\/sub>"+" = " + -b/a;
        document.getElementById("answer3").innerHTML = solution_explain;
    }
    else if (discriminant_value > 0) {
        solution_explain = "<br><span class='text-info'>Finding the roots<\/span><br><br>"+"x<sub>1,2<\/sub>"+ " = (" + (b > 0 ? "-"+b : Math.abs(b)) + " &#247 " + (2*a) + ") &#177 &#8730;("+(Math.pow(b, 2) - 4 * a * c)+")"+" &#247 "+2*a + "<br><br><span class='text-info'>Here's the answer<\/span><br><br>"+"x"+"<sub>1<\/sub>"+" = "+((-b + Math.sqrt(discriminant_value)) / (2 * a)).toPrecision(3)+"<br>"+"x"+"<sub>2<\/sub>"+" = "+((-b - Math.sqrt(discriminant_value)) / (2 * a)).toPrecision(3)+"<br>";
        document.getElementById("answer3").innerHTML = solution_explain;
    }
    else if (discriminant_value == 0) {
        solution_explain = "<span class='text-info'>There is the only one root<\/span><br><br>"+ "x = "+(b > 0 ? "-"+b : Math.abs(b)) +" &#247 "+ (2*a) + " = " + (-b/2*a);
        document.getElementById("answer3").innerHTML = solution_explain;
    }
    else if (discriminant_value < 0) {
        solution_explain = "<span class='text-error'>There are the only complex roots. If it is useful for you...<\/span><br><br><span class='text-info'>Finding the complex roots<\/span><br><br>"+"x<sub>1,2<\/sub>"+ " = (" + (b > 0 ? "-"+b : Math.abs(b)) + " &#247 " + (2*a) + ") &#177 &#8730;("+(Math.pow(b, 2) - 4 * a * c)+")"+" &#247 "+2*a + " = (" + (b > 0 ? "-"+b : Math.abs(b)) + " &#247 " + (2*a) + ") &#177 i&#8730;("+(Math.abs(discriminant_value))+")"+" &#247 "+2*a+"<br><br><span class='text-info'>Here's the answer<\/span><br><br>"+"x"+"<sub>1<\/sub>"+" = "+((-b/(2*a))+" - "+Math.sqrt(Math.abs(discriminant_value))/(2*a)+"i")+"<br>"+"x"+"<sub>2<\/sub>"+" = "+((-b/(2*a))+" + "+Math.sqrt(Math.abs(discriminant_value))/(2*a)+"i")+"<br>";
        document.getElementById("answer3").innerHTML = solution_explain;
    }
    function equationForPlot(arg) {
        return a*Math.pow(arg,2)+b*arg+c;
    }
    function LinearEquation() {
        visibleCoefficients.b = (b > 0 ? visibleCoefficients.b.replace(/\s\+\s/, "") : visibleCoefficients.b );
        var linear_form = "<span class='text-warning'>Oh. Looks like a linear equation. For easier solving let\'s present it like <b>bx = c</b></span><br><br>"+visibleCoefficients.b+"x = "+(-c);
        document.getElementById("answer2").innerHTML = linear_form;
        solution_explain = "<span class='text-info'>There is the only one root<\/span><br><br>"+ "x = "+(-c) + " &#247 "+ b + " = " + (-c/b);
        document.getElementById("answer3").innerHTML = solution_explain;
        document.getElementById("answer3").style.marginBottom = "5%";
    }
    var ctx = document.getElementById("scatterChart");
    var scatterChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: "equation",
                fill: false,
                data: [{
                    x: -10,
                    y: equationForPlot(-10)}, {
                    x: -9,
                    y: equationForPlot(-9)
                }, {
                    x: -8,
                    y: equationForPlot(-8)
                } ,
                    {
                        x: -7,
                        y: equationForPlot(-7)
                    } ,
                    {
                        x: -6,
                        y: equationForPlot(-6)
                    } ,
                    {
                        x: -5,
                        y: equationForPlot(-5)
                    } ,
                    {
                        x: -4,
                        y: equationForPlot(-4)
                    } ,
                    {
                        x: -3,
                        y: equationForPlot(-3)
                    } ,
                    {
                        x: -2,
                        y: equationForPlot(-2)
                    } ,
                    {
                        x: -1,
                        y: equationForPlot(-1)
                    } ,
                    {
                        x: 0,
                        y: equationForPlot(0)
                    } ,
                    {
                        x: 1,
                        y: equationForPlot(1)
                    },
                    {
                        x: 2,
                        y: equationForPlot(2)
                    } ,
                    {
                        x: 3,
                        y: equationForPlot(3)
                    } ,
                    {
                        x: 4,
                        y: equationForPlot(4)
                    } ,
                    {
                        x: 5,
                        y: equationForPlot(5)
                    } ,
                    {
                        x: 6,
                        y: equationForPlot(6)
                    } ,
                    {
                        x: 7,
                        y: equationForPlot(7)
                    } ,
                    {
                        x: 8,
                        y: equationForPlot(8)
                    } ,
                    {
                        x: 9,
                        y: equationForPlot(9)
                    },
                    {
                        x: 10,
                        y: equationForPlot(10)}
                ]
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });

}

