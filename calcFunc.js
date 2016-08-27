/**
 * Created by Mitali on 8/6/2016.
 */

var num = 0;
var a = [];
var opr ;
var prev =0;
var  prev_val;
var calc_val = 0;
var sci_calcObj = new ScientificCalculator();

function getValue(val,id) {
    var i=id;
    /* State 1 or value 1 denotes that a number has been clicked*/
    if(i==1) {
        if (prev == i) {
            val = prev_val.toString()+val.toString(); //if multiple digits are clicked like 1,2,3 means 123
            calc_val = parseFloat(val);
        }
        else{
            calc_val=val;
        }
        document.getElementById("value").value = calc_val;
        prev = id;
        prev_val = val;
    }

    /*Value 2 denotes an operator like "+" has been clicked, value 3 denotes "=" has been clicked*/
    if(i==2 || i==3){
        if(prev==1) {
            a[num] = calc_val;
            num++;
        }
        var op;
        prev=id;

        /*This is for operations that require two operands like "+"*/
        if(a.length>1){
            if(val == "+" || opr =="+"){
                op = sci_calcObj.calci.add(a);
           }
            if(val == "-" || opr =="-"){
                op = sci_calcObj.calci.subtract(a);
            }
            if(val == "*" || opr =="*"){
                op = sci_calcObj.calci.multiply(a);
            }
            if(val == "/" || opr =="/"){
                op = sci_calcObj.calci.divide(a);
            }

            opr = "";
            a = [];
            a[0] = op;
            num=1 ;
        }

        /*This loop calculates all Scientific calculator functions which require only one operand*/
        if(a.length==1){
            if(opr=="sine"){
                op=sci_calcObj.sin_pi(a);
                op = Math.round(op * 100) / 100;
                a[0]=op;
            }
            if(opr=="cosine"){
                op=sci_calcObj.cosine(a);
                op = Math.round(op * 100) / 100;
                a[0]=op;
            }
            if(opr=="tan"){
                op=sci_calcObj.tan(a);
                op = Math.round(op * 100) / 100;
                a[0]=op;
            }
            if(opr=="log"){
                op=sci_calcObj.logarithm(a);
                op = Math.round(op * 100) / 100;
                a[0]=op;
            }
        }

        /*This is just to print the output on the screen when "=" is clicked*/
        if(i==3){
            document.getElementById("value").value = a[0];
        }
        opr = val;
    }

    /* This will just clear screen*/
    if(i==4){
        prev=id;
        document.getElementById("value").value ="";
        a = [];
        num =0;
    }
}

function Calculator() {
}

Calculator.prototype.add=function(a) {
    var sum = 0;
    var i;
    for(i=0; i<a.length;i++){
        sum = sum+a[i];
    }
    return sum;
};

Calculator.prototype.subtract=function(a) {
    var subtract = a[0];
    var i;
    for(i=1; i<a.length;i++){
        subtract = subtract-a[i];
    }
    return subtract;
};

Calculator.prototype.multiply=function(a) {
    var multiply = 1;
    var i;
    for(i=0; i<a.length;i++){
        multiply = multiply*a[i];
    }
    return multiply;
};

Calculator.prototype.divide = function(a){
    if(a[1]==0){
        return NaN;
    }
    return parseFloat(a[0]/a[1]);
}

function ScientificCalculator(){
    this.calci = new Calculator();
}

ScientificCalculator.prototype.sin_pi = function(a){
    var num = Math.PI*a;
    return Math.sin(a);
}

ScientificCalculator.prototype.tan = function(a){
    return Math.tan(a);
}

ScientificCalculator.prototype.cosine = function(a){
    return Math.cos(a);
}

ScientificCalculator.prototype.logarithm = function(a){
    return Math.log(a);
}
