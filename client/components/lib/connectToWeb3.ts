export default (window) => {
    const ethereum = window.ethereum

    console.log('!!', window, ethereum)
    if (!ethereum || !ethereum.isMetaMask) {
        throw new Error('Please install MetaMask.')
    }

    let currentChainId = null
    ethereum
        .send('eth_chainId')
        .then(handleChainChanged)
        .catch((err) => console.error(err)) // This should never happen

    ethereum.on('chainChanged', handleChainChanged)

    function handleChainChanged(chainId) {
        if (currentChainId !== chainId) {
            currentChainId = chainId
        }
    }

    let currentAccount = null
    ethereum
        .send('eth_accounts')
        // .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            if (err.code === 4100) {
                // EIP 1193 unauthorized error
                console.log('Please connect to MetaMask.')
            } else {
                console.error(err)
            }
        })

    ethereum.on('accountsChanged', handleAccountsChanged)

    function handleAccountsChanged(accounts) {
        console.log(accounts, '???')
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.')
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0]
        }
    }

    // This is equivalent to ethereum.enable()
    ethereum
        .send('eth_requestAccounts')
        .then(handleAccountsChanged)
        .catch((err) => {
            if (err.code === 4001) {
                // EIP 1193 userRejectedRequest error
                console.log('Please connect to MetaMask.')
            } else {
                console.error(err)
            }
        })
}
