import React, { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [current, setCurrent] = useState('');

  const handleNavigationClick = (name) => {
    setCurrent(name);
  };

  const token = localStorage.getItem('access_token');

  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <>
      <Disclosure as="nav" className="bg-base-100">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <h1 className="font-bold text-xl">Go!Adventure</h1> */}
                    <Link to="/" onClick={() => handleNavigationClick('Dashboard')}>
                      <svg className="cursor-pointer" width="25" height="25" viewBox="0 0 126 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.5 117.25V98.5001C0.5 97.1459 0.708333 95.8438 1.125 94.5938C1.54167 93.3438 2.16667 92.1459 3 91.0001L55.1875 20.6876L48 11.0001C47.4792 10.2709 47.1146 9.51467 46.9063 8.73133C46.6979 7.95217 46.6458 7.17092 46.75 6.38758C46.8542 5.60841 47.1146 4.85425 47.5312 4.12508C47.9479 3.39591 48.5208 2.77091 49.25 2.25008C50.7083 1.20841 52.2708 0.791748 53.9375 1.00008C55.6042 1.20841 56.9583 2.04175 58 3.50008L63 10.2188L68 3.50008C69.0417 2.04175 70.3958 1.20841 72.0625 1.00008C73.7292 0.791748 75.2917 1.20841 76.75 2.25008C78.2083 3.29175 79.0417 4.64591 79.25 6.31258C79.4583 7.97925 79.0417 9.54175 78 11.0001L70.8125 20.6876L123 91.0001C123.833 92.1459 124.458 93.3438 124.875 94.5938C125.292 95.8438 125.5 97.1459 125.5 98.5001V117.25C125.5 119.021 124.9 120.504 123.7 121.7C122.504 122.9 121.021 123.5 119.25 123.5H6.75C4.97917 123.5 3.49583 122.9 2.3 121.7C1.1 120.504 0.5 119.021 0.5 117.25ZM63 31.1563L13 98.5001V111H31.75L57.8438 74.4376C59.0938 72.6668 60.8125 71.7813 63 71.7813C65.1875 71.7813 66.9062 72.6668 68.1562 74.4376L94.25 111H113V98.5001L63 31.1563ZM47.0625 111H78.9375L63 88.8126L47.0625 111ZM68.1562 74.4376L94.25 111L68.1562 74.4376C66.9062 72.6668 65.1875 71.7813 63 71.7813C60.8125 71.7813 59.0938 72.6668 57.8438 74.4376L31.75 111L57.8438 74.4376C59.0938 72.6668 60.8125 71.7813 63 71.7813C65.1875 71.7813 66.9062 72.6668 68.1562 74.4376Z"
                          fill="#43419E"
                        />
                      </svg>
                    </Link>
                    {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> */}
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to="/"
                        onClick={() => handleNavigationClick('Dashboard')}
                        className={`${current === 'Dashboard' ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                        aria-current={current === 'Dashboard' ? 'page' : undefined}
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/category"
                        onClick={() => handleNavigationClick('Category')}
                        className={`${current === 'Category' ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                        aria-current={current === 'Category' ? 'page' : undefined}
                      >
                        Category
                      </Link>

                      {token ? (
                        <Link
                          to="/history"
                          onClick={() => handleNavigationClick('History')}
                          className={`${current === 'History' ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                          aria-current={current === 'History' ? 'page' : undefined}
                        >
                          History
                        </Link>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="dropdown absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Popover as="div" className="relative mr-3">
                    <div>
                      <Popover.Button className="relative flex rounded-full indicator">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user Popover</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item">8</span>
                      </Popover.Button>
                    </div>
                    <Popover.Panel className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white  shadow-lg  focus:outline-none">
                      <div className="card-body">
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                          <button className="btn btn-primary btn-block">View cart</button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Popover>
                  {/* Profile */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full h-10 w-10 avatar">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {token ? (
                          <img className="h-8 w-8 rounded-full" src={user.profile_photo_url} alt="" />
                        ) : (
                          <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {token ? (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {token ? (
                              <div className="pl-1 md:pl-3 inline-block no-underline hover:text-black text-sm">Welcome, {user.nama}</div>
                            ) : (
                              <Link to="/login" className="pl-1 md:pl-3 inline-block no-underline hover:text-black text-sm">
                                Login User
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a onClick={() => document.getElementById('modal-logout').showModal()} className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200')}>
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      ) : (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200">
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link
                  to="/"
                  onClick={() => handleNavigationClick('Dashboard')}
                  className={`${current === 'Dashboard' ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={current === 'Dashboard' ? 'page' : undefined}
                >
                  Dashboard
                </Link>
                <Link
                  to="/category"
                  onClick={() => handleNavigationClick('Category')}
                  className={`${current === 'Category' ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={current === 'Category' ? 'page' : undefined}
                >
                  Category
                </Link>
                <Link
                  to="/history"
                  onClick={() => handleNavigationClick('History')}
                  className={`${current === 'History' ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current={current === 'History' ? 'page' : undefined}
                >
                  History
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* Modal Logout */}
      <dialog id="modal-logout" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout</h3>
          <p className="py-2">Apakah anda yakin ingin logout?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error text-white" onClick={handleLogout}>
                Yes
              </button>
              <button className="btn ms-2">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
