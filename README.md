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
1. For running deployments & service navigate to `sh files` directory and run `run.sh` logs will get sotred in `run.txt` for debugging
2. Use port forwarding by running `client-forwarding.sh` & `server-forwarding.sh` logs will get sotred in `port-forwarding.txt` for debugging
3. Use `manager.sh` to get `logs`, `clean logs` & `stop servies & deployments`

<!-- CONTACT -->
## Contact

Mohammad Arsalan - [@_Arsalaan_](https://mobile.twitter.com/_arsalaan_) | arsalanmohd237@gmail.com | [LinkedIn](https://www.linkedin.com/in/mohammadarsalan/)

<!-- Useful Links -->
## Useful Links

API is deployed here: https://budgettrackerapi.onrender.com/

Complete application is deployed here: https://budgettracker-82722.web.app/ and https://budgettracker-82722.firebaseapp.com/