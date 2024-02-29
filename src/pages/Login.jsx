import React, { useState } from 'react';
import swal from 'sweetalert';

async function loginUser(credentials) {
  return fetch('https://goadventure.my.id/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    console.log(response);
    if ('access_token' in response.data) {
      swal('Success', response.meta.status, 'success', {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem('access_token', response.data['access_token']);
        localStorage.setItem('user', JSON.stringify(response.data['user']));
        window.location.href = '/';
      });
    } else {
      swal('Failed', response.meta.message, 'error');
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10 border-2 border-gray-200 p-[20px] md:p-[50px] rounded-md shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-dark-gray-900">Sign In</h3>
              <p className="mb-4 text-gray-700">Enter your email and password</p>

              <label className="mb-2 text-sm text-start text-gray-900 ">Email*</label>
              <input
                id="email"
                type="email"
                placeholder="mail@loopple.com"
                onChange={(e) => setEmail(e.target.value)}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-5 placeholder:text-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
              />
              <label className="mb-2 text-sm text-start text-gray-900">Password*</label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
                className="flex items-center w-full px-5 py-4 mb-7 mr-2 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
              />

              <button
                type="submit"
                className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none bg-blue-500 text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
              >
                Sign In
              </button>
              <p className="text-sm leading-relaxed text-gray-900">
                Not registered yet?{' '}
                <a href="#" className="font-bold text-gray-700">
                  Create an Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
