// ===================== Selecting Elements =====================
const numberButtons = document.querySelectorAll(".btn");
const operationButtons = document.querySelectorAll(".btn-operation");
const scientificButtons = document.querySelectorAll(".btn-scientific");
const display = document.getElementById("display");
const historyBtn = document.getElementById("history-btn");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const historyList = document.getElementById("history-list");
const scientificMode = document.getElementById("scientific-mode");
const standardMode = document.getElementById("standard-mode");
const scientificContainer = document.querySelector(".scientific-buttons");

// ===================== Variables =====================
let displayExpression = ""; 
let jsExpression = "";     
let history = [];

const operators = ["+", "-", "*", "/", "%"];

// ===================== Number Buttons =====================
numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (displayExpression === "0" || display.textContent === "Error") {
            displayExpression = "";
            jsExpression = "";
        }
        displayExpression += btn.textContent;
        jsExpression += btn.textContent;
        display.textContent = displayExpression;
    });
});

// ===================== Operator Buttons =====================
operationButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;

        if(value === "AC" || value === "Clear"){
            clearDisplay();
            return;
        }
        if(value === "⌫"){
            backSpace();
            return;
        }
        if(value === "="){
            calculate();
            return;
        }
        if(displayExpression === "" && operators.includes(value)){
            return;
        }

        const last = displayExpression.slice(-1);
        if(operators.includes(last) && operators.includes(value)){
            return;
        }

        displayExpression += value;
        jsExpression += value;
        display.textContent = displayExpression;
    });
});

// ===================== Scientific Buttons =====================
scientificButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;

        if (displayExpression === "0" || display.textContent === "Error") {
            displayExpression = "";
            jsExpression = "";
        }

        switch(value){
            case "π":
                displayExpression += "π";
                jsExpression += `(${Math.PI})`;
                break;
            case "e":
                displayExpression += "e";
                jsExpression += `(${Math.E})`;
                break;
            case "√":
                displayExpression += "√(";
                jsExpression += "Math.sqrt(";
                break;
            case "x²":
                displayExpression += "²";
                jsExpression += "**2";
                break;
            case "x³":
                displayExpression += "³";
                jsExpression += "**3";
                break;
            case "log":
                displayExpression += "log(";
                jsExpression += "Math.log10(";
                break;
            case "ln":
                displayExpression += "ln(";
                jsExpression += "Math.log(";
                break;
            case "sin":
                displayExpression += "sin(";
                jsExpression += "Math.sin("; 
                break;
            case "cos":
                displayExpression += "cos(";
                jsExpression += "Math.cos(";
                break;
            case "tan":
                displayExpression += "tan(";
                jsExpression += "Math.tan(";
                break;
            case "(":
            case ")":
                displayExpression += value;
                jsExpression += value;
                break;
        }

        display.textContent = displayExpression;
    });
});

// ===================== Calculate =====================
function calculate(){
    if(displayExpression === "") return;

    try {
        let finalJsExpression = jsExpression;
        
        const openBrackets = (displayExpression.split("(").length - 1);
        const closeBrackets = (displayExpression.split(")").length - 1);

        if (openBrackets > closeBrackets) {
            const missing = ")".repeat(openBrackets - closeBrackets);
            displayExpression += missing;
            finalJsExpression += missing;
        }

        finalJsExpression = finalJsExpression.replace(/Math\.sin\(/g, "Math.sin((1)*Math.PI/180*");
        finalJsExpression = finalJsExpression.replace(/Math\.cos\(/g, "Math.cos((1)*Math.PI/180*");
        finalJsExpression = finalJsExpression.replace(/Math\.tan\(/g, "Math.tan((1)*Math.PI/180*");

        const result = new Function(`return ${finalJsExpression}`)();
        
        const finalResult = Number(result.toFixed(10)).toString();

        history.push({
            expression: displayExpression,
            result: finalResult
        });

        display.textContent = finalResult;
        displayExpression = finalResult;
        jsExpression = finalResult; 
        
        showHistory(); 

    } catch {
        display.textContent = "Error";
        displayExpression = "";
        jsExpression = "";
    }
}

// ===================== AC =====================

function clearDisplay(){
    displayExpression = "";
    jsExpression = "";
    display.textContent = "0";
}

// ===================== Backspace =====================

function backSpace(){
    let endsWithFunc = false;
    
    if (displayExpression.endsWith("sin(") || displayExpression.endsWith("cos(") || displayExpression.endsWith("tan(") || displayExpression.endsWith("logBound(")) {
        displayExpression = displayExpression.slice(0, -4); 
        jsExpression = jsExpression.slice(0, -10); 
        endsWithFunc = true;
    } else if (displayExpression.endsWith("log(")) {
        displayExpression = displayExpression.slice(0, -4); 
        jsExpression = jsExpression.slice(0, -12); 
        endsWithFunc = true;
    } else if (displayExpression.endsWith("ln(")) {
        displayExpression = displayExpression.slice(0, -3); 
        jsExpression = jsExpression.slice(0, -9);  
        endsWithFunc = true;
    } else if (displayExpression.endsWith("√(")) {
        displayExpression = displayExpression.slice(0, -2); 
        jsExpression = jsExpression.slice(0, -10); 
        endsWithFunc = true;
    }

    if (!endsWithFunc) {
        displayExpression = displayExpression.slice(0, -1);
        jsExpression = jsExpression.slice(0, -1);
    }
    
    display.textContent = displayExpression || "0";
}

historyBtn.addEventListener("click",()=>{
    if(historyList.style.display === "block"){
        historyList.style.display = "none";
        clearHistoryBtn.style.display = "none";
        historyBtn.textContent = "🕒 Show History";
    } else {
        historyList.style.display = "block";
        clearHistoryBtn.style.display = "block";
        historyBtn.textContent = "❌ Hide History";
        showHistory();
    }
});

function showHistory(){
    historyList.innerHTML = "";
    if(history.length === 0){
        historyList.innerHTML = "<div class='history-item'>No History</div>";
        return;
    }
    history.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("history-item");
        div.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(div);
    });

    historyList.scrollTop = historyList.scrollHeight;
}

clearHistoryBtn.addEventListener("click",()=>{
    history = [];
    showHistory();
});

// ===================== Scientific Mode Toggle =====================

scientificMode.addEventListener("click",()=>{
    scientificContainer.style.display = "grid";
    scientificMode.classList.add("active");
    standardMode.classList.remove("active");
});

standardMode.addEventListener("click",()=>{
    scientificContainer.style.display = "none";
    standardMode.classList.add("active");
    scientificMode.classList.remove("active");
});

// ===================== Keyboard Support =====================

window.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || e.key === ".") {
        const btn = Array.from(numberButtons).find(b => b.textContent === e.key);
        if (btn) btn.click();
    }
    if (operators.includes(e.key)) {
        const btn = Array.from(operationButtons).find(b => b.textContent === e.key);
        if (btn) btn.click();
    }
    if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        calculate();
    }
    if (e.key === "Backspace") {
        backSpace();
    }
    if (e.key === "Escape") {
        clearDisplay();
    }
});