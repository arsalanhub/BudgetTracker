<!-- ABOUT THE PROJECT -->
## About The Project
1. This is one stop solution for tracking all your expenses
2. It has features such as Filtering record by year and adding new record
3. Backend of this application is build in Node.js and MongoDB

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
1. Make sure you have Nodejs installed.
2. MongoDB is good to have but not mandatory.
3. git bash if you are on windows.
4. (Optional) For running inside container you need Docker Desktop with kubernates enabled

### Installation
1. Clone the repo `git clone`
2. Goto client directory and type `npm install`
3. In the same directory run `npm start`
4. Goto server directory and type `npm install`
5. In the same directory run `npm start`
6. Make sure you set environment variables where ever needed.

### (Optinal) Running with container
1. Navigate to server and client and build and push there respective images
2. Navigate to ./infra/k8s and execute `kubectl apply -f .`
3. Check for running pods `kubectl get pods`
4. Do port-forwarding to navigate traffic for individual pods `kubectl port-forward pod/client-depl-7dbccbbf67-4mb9g 3000:3000`

<!-- CONTACT -->
## Contact

Mohammad Arsalan - [@_Arsalaan_](https://mobile.twitter.com/_arsalaan_) | arsalanmohd237@gmail.com | [LinkedIn](https://www.linkedin.com/in/mohammadarsalan/)

<!-- Useful Links -->
## Useful Links

API is deployed here: https://budgettrackerapi.onrender.com/

Complete application is deployed here: https://budgettracker-82722.web.app/ and https://budgettracker-82722.firebaseapp.com/