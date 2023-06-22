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
        navigate('/home');
      }
  
      if (response.status === 401) {
        alert('Identifiant ou mot de passe incorrect');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export default login;
  