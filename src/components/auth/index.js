import { useState } from 'react'

import './LoginScreen.css'
import './RegisterScreen.css'
import './ResetPasswordScreen.css'
import './ForgotPasswordScreen.css'

const Log = (props) => {
  const [registerScreenModal, setRegisterScreenModal] = useState(props.signup)
  const [loginScreenModal, setLoginScreenModal] = useState(props.signin)
  const [forgotPasswordModal, setForgotPasswordModal] = useState(props.forgot)

  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setRegisterScreenModal(true)
      setLoginScreenModal(false)
      setForgotPasswordModal(false)
    } else if (e.target.id === 'login') {
      setRegisterScreenModal(false)
      setLoginScreenModal(true)
      setForgotPasswordModal(false)
    } else if (e.target.id === 'forgot') {
      setRegisterScreenModal(false)
      setLoginScreenModal(false)
      setForgotPasswordModal(true)
    }
  }

  function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginHandler = async (e) => {
      e.preventDefault()
    }

    return (
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{' '}
            <span onClick={handleModals} id="forgot" className="btn-log">
              Forgot Password?
            </span>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account?{' '}
          <span onClick={handleModals} id="register" className="btn-log">
            Register
          </span>
        </span>
      </form>
    )
  }

  const RegisterScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const registerHandler = async (e) => {
      e.preventDefault()

      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }

      if (password !== confirmpassword) {
        setPassword('')
        setConfirmPassword('')
        setTimeout(() => {
          setError('')
        }, 5000)
        return setError('Passwords do not match')
      }
    }

    return (
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <span className="register-screen__subtext">
          Already have an account?{' '}
          <span onClick={handleModals} id="login" className="btn-log">
            Login
          </span>
        </span>
      </form>
    )
  }

  const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const forgotPasswordHandler = async (e) => {
      e.preventDefault()

      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      }
    }

    return (
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    )
  }

  return (
    <>
      {registerScreenModal && <RegisterScreen />}
      {loginScreenModal && <LoginScreen />}
      {forgotPasswordModal && <ForgotPasswordScreen />}
    </>
  )
}

export default Log
