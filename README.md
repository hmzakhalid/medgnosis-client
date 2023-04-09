# Medgnosis

This is the Client code for Medgnosis. A Decentralized Privacy Preserving Federated Learning Platform.

![Medgnosis](https://github.com/hmzakhalid/med-gnosis)


### Supervisor: Dr. Hina Binte Haq
### Members:
* [Hamza Khalid](https://github.com/hmzakhalid)
* [Hamza Iftikhar](https://github.com/Ham-Ifti)

### Project Description:
It is a decentralized system that uses federated learning to train an algorithm across multiple servers without sharing the data in a secure way. 

### How it works
MedGnosis uses the Flower framework to implement federated learning. The framework enables the training of machine learning models on distributed datasets by aggregating the gradients calculated on the clients' devices in a secure manner.

The training process is performed in the following steps:

- The client requests the model from the blockchain.
- The clients perform training on their local data and calculate the gradients.
- The clients encrypt their gradients using secure aggregation and send them back to the server.
- The server aggregates the encrypted gradients and updates the model.
- The updated model is broadcasted back to the clients.
- The process is repeated until the model converges.
- The converged model is stored on the blockchain.