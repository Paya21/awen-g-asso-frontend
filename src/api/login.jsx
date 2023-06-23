import { toast, Zoom, Slide } from 'react-toastify';

const login = async (data, navigate) => {
    // transform data to json
    const body = JSON.stringify(data);
    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });
      const result = await response.json();
      if (response.status === 200) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('userId', parseInt(result.userId));
        sessionStorage.setItem('associationId', result.associationId);
        sessionStorage.setItem('userLvl', parseInt(result.userLvl));
        toast.success('Vous êtes connecté', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
        navigate('/home');
      }
  
      if (response.status === 401) {
        toast.error('Identifiant ou mot de passe incorrect', {
          toastId: "custom-id-yes", // empêche la duplication des toasts et n'en affiche qu'un seul à l'écran
          className: 'myCustomToast'
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Une erreur est survenue', {
        toastId: "custom-id-yes",
        className: 'myCustomToast'
      });
    }
  };
  
  export default login;
  