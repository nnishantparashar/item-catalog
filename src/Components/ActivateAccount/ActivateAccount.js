import "./ActivateAccount.css";



const ActivateAccount = () => {
  

  //const API = "https://password-reset-mjhd.onrender.com/logout";
  const handleActivate = async () => {
    // fetch(API)
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((post) => {
    //     //setIsLoggedIn(false);
    //     alert(post.message);
    //   });
  };

  return (
    <div className="logout">
      <p>Click to activate your account</p>
      <button onClick={handleActivate}>Activate Account</button>
    </div>
  );
};

export default ActivateAccount;
