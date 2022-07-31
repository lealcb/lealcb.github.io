const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#textTransaction')
const inputTransactionAmount = document.querySelector('#amountTransaction')
const transactionType = document.querySelector('#transactionType')
const monthType = document.querySelector('#monthType')
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();



// const teste = () => 
// {

//     let firstnumber = balanceDisplay.textContent
//     let arraybalance = [];
//     arraybalance = firstnumber.split(" ");
//     let negNum = parseFloat(arraybalance[1])
    

//     if (negNum < 0) {
//         console.log(total)
//         console.log(balanceDisplay)
//         document.querySelector('#balance').style.color = 'red'
//     }
//     else {
//         console.log(total)
//         console.log(balanceDisplay)
//         document.querySelector('#balance').style.color = 'green'
//     }
// }
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount).toFixed(2)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} 
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
            x
        </button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () => {
    
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)
    console.log(total)
    balanceDisplay.textContent = `R$ ${total}`
    if (total < 0) {
        console.log(total)
        document.querySelector('#balance').style.color = 'red'
    }
    else if (total == 0){
        console.log(total)
        document.querySelector('#balance').style.color = 'white'
    }
    else {
       console.log(total)
        document.querySelector('#balance').style.color = 'green'
     }
incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addTransactions = () => {
    const transactionTypeIndex = transactionType.options[transactionType.selectedIndex].value;
    const transactionName = inputTransactionName.value.trim()
    today = dd + '/' + mm + '/' + yyyy
    let transactionAmountAux = inputTransactionAmount.value.trim().replace(/,/g, '.')
    const transactionAmount = transactionAmountAux.replace("-", ""
    )
   
    const transaction = {
        id: generateID(),
        name: transactionName + " " + today,
        amount: transactionTypeIndex === "expense" ? (Number(transactionAmount) * (-1)) : Number(transactionAmount),

    }

    transactions.push(transaction)
}

form.addEventListener('submit', event => {
    event.preventDefault()
    
    
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const transactionTypeIndex = transactionType.options[transactionType.selectedIndex].value;
    if (transactionName === '' || transactionAmount === '' || transactionTypeIndex === 'selectType') {
        alert('Por favor preencha os dados de Nome, Valor e Tipo da Transação!')
        return
    }

    addTransactions()
   
    updateLocalStorage()
    
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
    transactionType.selectedIndex = '0'

    

    init()
    
})
