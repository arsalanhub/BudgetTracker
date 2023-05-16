{
    npx kill-port 5000

    SERVER_POD_NAME=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep "server")
    kubectl port-forward $SERVER_POD_NAME 5000:5000
} 2>&1 | tee ../server-forwarding.txt