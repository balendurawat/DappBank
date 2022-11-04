var ContractABI;
var ContractAddress = '';

var loginbutton = document.getElementById('connect_to_metamask');
var useraddress = document.getElementById('accountaddress');
var depositeinput = document.getElementById('depositeeth');
var withdrawinput = document.getElementById('withdraweth');
var depositebutton = document.getElementById('depositbutton');
var withdrawbutton = document.getElementById('withdrawbutton');
var getbalancebutton = document.getElementById('getbalance');
var balance = document.getElementById('balance');

// this will be triggered when the whole html is rendered

var address, web3, myContract

document.addEventListener('DOMContentLoaded', async () => {

    // to check if metamask is installed
    if (typeof window.ethereum !== 'undefined') {
        // window object checks for the browser properties
        console.log('MetaMask is installed')

        // var accounts = await ethereum.request({method: 'eth_requestAccounts'})
        // console.log(accounts);

        web3 = new Web3(window.ethereum);
        console.log("web3 is loaded", web3);

        myContract = new web3.eth.Contract((ContractABI, ContractAddress));
        console.log("contract is loaded", myContract);

        loginbutton.addEventListener('click', async () => {
            
            var accounts = await ethereum.request({method: 'eth_requestAccounts'});

            address = accounts[0];
            useraddress.innerText = address;

            useraddress.classList.remove('d-none');
        });

        ethereum.on('accountsChanged', async function (Accounts) {
            var accounts = await ethereum.request({method: 'eth_requestAccounts'});

            address = accounts[0];
            useraddress.innerText = address;
        });

        depositebutton.addEventListener('click', ()=> {
            console.log(depositeinput.value);
            myContract.methods.deposite().send({form: address, value: depositeinput.value}, function(err, res) {
                console.log(res);
            })
        });

        getbalancebutton.addEventListener('click' , () => {
            myContract.methods.getbalance().call({from: address}, function(err, res) {
                console.log(res);
                balance.innerText = res;
            })
        });



    } else {
        alert('install metamask');
    }


}) 