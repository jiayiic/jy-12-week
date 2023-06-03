// Build the tip calculator
function calcTip(bill){
    if (bill >= 50 && bill <= 300)
        return bill * 0.15;
    else
        return bill * 0.2;
}

// Test data 
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

// Initialize empty array to store tips and total values of the bills
let tipsList = [];
let totals = [];

// Prime the loop, and call the function for each element in the array
for (let i = 0; i < bills.length; i++){
    let tip = calcTip(bills[i]);

    // Add the tip to the array
    tipsList.push(tip);

    // Add the total value to the array of totalValues
    totals.push(tip + bills[i]);
}

// Create an object to store the bills and tips
const billDesc = {
    bill: bills,
    tips: tipsList,
    total: totals
};

// Print the result
// console.log(billDesc);

function calcAverage(arr){
    let sum = 0;
    for (let i = 0; i < arr.length; i ++){
        sum += arr[i];
    }
    let average = sum / arr.length;
    return average;
}

console.log(billDesc.total)

console.log(calcAverage(billDesc.total));








