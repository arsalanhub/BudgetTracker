{
   kubectl delete service react-app-srv
   kubectl delete service server-srv
   kubectl delete deployment react-app-depl
   kubectl delete deployment server-depl
   cd ..
   skaffold dev
} 2>&1 | tee ../run.txt