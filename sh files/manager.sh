userInput = ""

while [[ "$userInput" != "exit" ]]; do
    echo ""
    echo "Welcome to Manager:"
    echo "1. To get server logs type: server-logs"
    echo "2. To get client logs type: client-logs"
    echo "3. For all logs cleanup type: clean-logs"
    echo "4. For stopping all services type: stop-services"
    echo "5. For exiting type: exit"
    echo "6. Run server tests: server-tests"
    echo "7. Pretty all: pretty-all"
    echo "8. For clearing screen type: cls"
    echo ""
    read userInput

    if [[ $userInput == "server-logs" ]]; then
        echo "Server logs added successfully"
        > ../server-logs.txt
        {
            SERVER_POD_NAME=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep "server")
            kubectl logs $SERVER_POD_NAME
        } >> ../server-logs.txt
    elif [[ $userInput == "client-logs" ]]; then
        echo "Client logs added successfully"
        > ../client-logs.txt
        {
            REACT_POD_NAME=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep "react-app")
            kubectl logs $REACT_POD_NAME
        } >> ../client-logs.txt
    elif [[ $userInput == "clean-logs" ]]; then
        rm "../run.txt"
        rm "../port-forwarding.txt"
        rm "../client-logs.txt"
        rm "../server-logs.txt"
        rm "../server-forwarding.txt"
        rm "../client-forwarding.txt"
        rm "../server-tests.txt"
    elif [[ $userInput == "stop-services" ]]; then
        kubectl delete service react-app-srv
        kubectl delete service server-srv
        kubectl delete deployment react-app-depl
        kubectl delete deployment server-depl
        npx kill-port 3000
        npx kill-port 5000
        rm "../run.txt"
        rm "../port-forwarding.txt"
        rm "../client-logs.txt"
        rm "../server-logs.txt"
        rm "../server-forwarding.txt"
        rm "../client-forwarding.txt"
        rm "../server-tests.txt"
    elif [[ $userInput == "server-tests" ]]; then
        cd ..
        rm server-tests.txt
        cd server
        {
           npm test
        } 2>&1 | tee ../server-tests.txt    
    elif [[ $userInput == "pretty-all" ]]; then
        cd .. 
        cd server
        npm run pretty
        cd ..
        cd client
        npm run pretty
    elif [[ $userInput == "cls" ]]; then
        clear
    fi
done