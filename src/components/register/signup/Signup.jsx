import './signup.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Drawer, Input, Form, message, Dropdown, Menu } from 'antd';
import { signUp, login, logout } from '../../../store/slices/registerSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../../../firebase";

const Signup = () => {
  const dispatch = useDispatch();
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login(user));
        setUser(user);
      } else {
        dispatch(logout());
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const showSignupDrawer = () => {
    setSignupOpen(true);
  };

  const showLoginDrawer = () => {
    setLoginOpen(true);
  };

  const onClose = () => {
    setSignupOpen(false);
    setLoginOpen(false);
  };

  const onFinishSignup = async (values) => {
    try {
      const { email, password } = values;
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(signUp(user));
      setUser(user);
      setSignupOpen(false);
      message.success('Signup successful');
    } catch (error) {
      console.error('Error creating user:', error);
      message.error(error.message);
    }
  };

  const onFinishLogin = async (values) => {
    try {
      const { email, password } = values;
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(login(user));
      setUser(user);
      setLoginOpen(false);
      message.success('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      message.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      message.success('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      message.error(error.message);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        {user && <p>Welcome, {user.email}</p>}
      </Menu.Item>
      <Menu.Item>
        {user && (
          <Button className="signup-btn" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {!user && (
        <>
          <Button className="signup-btn" onClick={showSignupDrawer}>
            Sign Up
          </Button>
          <Button className="signup-btn" onClick={showLoginDrawer}>
            Login
          </Button>
        </>
      )}
      {user && <Dropdown overlay={menu} trigger={['click']}>
        <Button className="signup-btn">Account</Button>
      </Dropdown>}
      <Drawer width={400} title="Sign Up" placement="left" onClose={onClose} open={signupOpen}>
        <Form onFinish={onFinishSignup}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter a password' }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button className="signup-btn btn-margin" type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer width={400} title="Login" placement="left" onClose={onClose} open={loginOpen}>
        <Form onFinish={onFinishLogin}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter a password' }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button className="signup-btn btn-margin" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Signup;
