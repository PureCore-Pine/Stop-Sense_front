// import React, { useState } from 'react';

// interface FormData {
//   email: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
// }

// const RegisterForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Register Submitted:', formData);
//   };

//   return (
//     <div className="w-2/5 bg-[#F5E8D9] rounded-3xl shadow-lg p-14 opacity-95">
//       <h2 className="text-4xl text-center text-[#E5B85C] font-bold mb-6">Register</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-4 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
//             required
//             placeholder="Email"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full p-4 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
//             required
//             placeholder="Username"
//           />
//         </div>

//         <div>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-4 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
//             required
//             placeholder="Password"
//           />
//         </div>

//         <div>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full p-4 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
//             required
//             placeholder="Confirm Password"
//           />
//         </div>

//         <button type="submit" className="w-full py-4 text-white bg-[#E5B85C] text-lg rounded-full hover:bg-[#d3a14e] transition duration-300">
//           Sign up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;
import React, { useState } from 'react';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register Submitted:', formData);
  };

  return (
    <div className="w-140 bg-[#F5E8D9] rounded-3xl shadow-lg p-20 opacity-95">
      <h2 className="text-4xl text-center text-[#E5B85C] font-bold mb-8">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-5 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C] "
            required
            placeholder="Email"
          />
        </div>

        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-1 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
            required
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-1 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
            required
            placeholder="Password"
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 px-6 mt-1 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-[#E5B85C]"
            required
            placeholder="Confirm Password"
          />
        </div>

        <button type="submit" className="w-full py-4 mt-6 text-white bg-[#E5B85C] text-lg rounded-full hover:bg-[#d3a14e] transition duration-300">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
