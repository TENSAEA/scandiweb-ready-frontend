import { useState } from 'react';
import { LOGIN } from '../graphql/mutations/user.mutation';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from "react-loader-spinner";

const Login = ({ refetchAuthUser }) => { // Receive refetchAuthUser as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

 // In your Login.jsx file, update the login mutation handler:

const [login, { loading }] = useMutation(LOGIN, {
  onCompleted: async (data) => {
    console.log('LOGIN mutation response:', data);
    if (data.login && data.login._id) {
      toast.success("Login successful!");
      
      // Explicitly refetch the auth user data
      const result = await refetchAuthUser();
      console.log("Auth refetch after login:", result);
      
      if (result?.data?.authUser) {
        navigate('/dashboard');
      } else {
        // If refetch didn't work, try once more after a short delay
        setTimeout(async () => {
          const retryResult = await refetchAuthUser();
          console.log("Retry auth refetch:", retryResult);
          navigate('/dashboard');
        }, 500);
      }
    } else {
      toast.error("Login failed. Please try again.");
    }
  },
  onError: (error) => {
    console.error(error);
    toast.error("Failed to login. Please try again.");
  },
});


  function Loader() {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    )
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('loginUser', username);
      await login({ variables: { input: { username, password } } }); // Updated to match the expected input structure
    } catch (error) {
      console.error(error);
    }
  };


  return (
    
    <>
  <div
    className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <div className="divide-y divide-gray-200">
          

            <div
              className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              
              <div className="relative">
                <input autoComplete="off" id="Username" name="Username"
                type="text" className="peer placeholder-transparent h-10 w-full
                border-b-2 border-gray-300 text-gray-900 focus:outline-none
                focus:borer-rose-600" placeholder="Username" onChange={(e) =>
                setUsername(e.target.value)} value={username} required />
                <label
                  htmlFor="Username"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Username</label
                >
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required

                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Password</label
                >
              </div>
              <div className="relative">
                <button type="submit" className=" cursor-pointer bg-cyan-500 text-white rounded-md px-2 py-1">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        </form>
        <div className=" w-full flex justify-center">
        <button
  className=" cursor-pointer flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
>
  {/* Optional: Add a generic icon or remove this section */}
  <svg
    className="h-6 w-6 mr-2 text-gray-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    />
  </svg>
  <span onClick={() => navigate("/signup")} >Sign Up</span>
</button>
        </div>
        
      </div>
    </div>
  </div>



    </>
  );
};

export default Login;
