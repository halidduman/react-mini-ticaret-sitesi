const Login = () => {
  return (
    <>
      <div>
        <label>İsminiz</label>
        <input type="text" className="form-control shadow" />
      </div>
      <div>
        <label>Şifre</label>
        <input type="password" className="form-control shadow" />
      </div>
    </>
  );
};

export default Login;
