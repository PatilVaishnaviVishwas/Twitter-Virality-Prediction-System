const Web3 = require('web3');
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tweetContracts",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "tweetId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "viral",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tweetId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "createTweetContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tweetId",
                "type": "uint256"
            }
        ],
        "name": "placeBet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tweetId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "retweets",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "likes",
                "type": "uint256"
            }
        ],
        "name": "checkVirality",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tweetId",
                "type": "uint256"
            }
        ],
        "name": "payout",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // Replace with your deployed contract address

// Event listener for the predict button
document.getElementById('predictBtn').addEventListener('click', async () => {
    const tweetId = document.getElementById('tweetId').value;

    // Check if MetaMask (or other Ethereum provider) is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Log the connected MetaMask account
            console.log("MetaMask account connected:", window.ethereum.selectedAddress);

            // Create contract instance
            const tweetPredictionContract = new web3.eth.Contract(contractABI, contractAddress);

            // Call createTweetContract function on the smart contract
            await tweetPredictionContract.methods.createTweetContract(tweetId, 24 * 60 * 60) // 1 day duration
                .send({ from: window.ethereum.selectedAddress });

            alert('Prediction placed for tweet: ' + tweetId);

        } catch (error) {
            console.error('Error in contract interaction:', error);
            alert('Error placing prediction. Please check console for details.');
        }
    } else {
        // If MetaMask is not installed, notify the user
        alert('Please install MetaMask!');
    }
});

// Optional: Additional event listener for logging when the Predict button is clicked
document.getElementById('predictBtn').addEventListener('click', () => {
    console.log('Predict button clicked');
});
