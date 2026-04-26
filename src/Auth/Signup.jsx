import { signInWithGoogle } from "../firebase/auth";


function Signup() {
  return (
    <div className="container mt-5 text-center">

      <h3>Continue with Google</h3>

      <button
        className="btn btn-danger mt-3"
        onClick={signInWithGoogle}
      >
       Continue with Google
      </button>

    </div>
  );
}

export default Signup;