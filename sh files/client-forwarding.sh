{
    npx kill-port 3000
    REACT_POD_NAME=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep "react-app")
    kubectl port-forward $REACT_POD_NAME 3000:3000
} 2>&1 | tee ../client-forwarding.txt