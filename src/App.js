import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const Password = props => {
  const {details, deleteUser, check} = props
  const {website, username, security, id} = details

  const deletePassword = () => {
    deleteUser(id)
  }

  const imgUrl = (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-image"
    />
  )

  const passwordEl = <p>{security}</p>

  const element = check ? passwordEl : imgUrl
  return (
    <li className="details-container">
      <p className="firstname">J</p>
      <div className="detailed">
        <p>{website}</p>
        <p>{username}</p>
        <p>{element}</p>
      </div>
      <button
        className="button1"
        type="button"
        onClick={deletePassword}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    count: 0,
    checked: false,
    searchInput: '',
  }

  onWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onPassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onAddClicked = event => {
    const {
      usernameInput,
      websiteInput,
      passwordInput,
      passwordsList,
    } = this.state
    event.preventDefault()
    const newPassword = {
      id: v4(),
      firstLetter: usernameInput[0],
      website: websiteInput,
      username: usernameInput,
      security: passwordInput,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      count: passwordsList.length + 1,
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onSearchChange = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  togglePasswords = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
  }

  deleteUser = id => {
    const {passwordsList} = this.state
    const deletedList = passwordsList.filter(each => each.id !== id)
    this.setState({
      passwordsList: deletedList,
    })
  }

  render() {
    const {passwordsList, count, checked, searchInput} = this.state

    const lengthofList = passwordsList.length
    const imgEl = (
      <div className="no-passwords">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password"
        />
        <p>No Passwords</p>
      </div>
    )
    const filteredList = passwordsList.filter(each =>
      each.website.includes(searchInput),
    )

    const downEl =
      lengthofList === 0
        ? imgEl
        : filteredList.map(each => (
            <Password
              details={each}
              key={each.id}
              check={checked}
              deleteUser={this.deleteUser}
            />
          ))

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="app-logo"
        />
        <div className="password-enter-container">
          <div className="password-form">
            <form>
              <h1>Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="inputEl"
                  onChange={this.onWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="inputEl"
                  onChange={this.onUsername}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="logo"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="inputEl"
                  onChange={this.onPassword}
                />
              </div>
              <div className="button-container">
                <button
                  type="submit"
                  className="button"
                  onClick={this.onAddClicked}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager"
            />
          </div>
        </div>
        <div className="password-shown-container">
          <div className="header">
            <h1>Your Passwords</h1>
            <p>{count}</p>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="inputEl"
                onChange={this.onSearchChange}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox">
            <input id="show" type="checkbox" onClick={this.togglePasswords} />
            <label htmlFor="show">Show Passwords</label>
          </div>
          <ul className="shown-passwords-list">{downEl}</ul>
        </div>
      </div>
    )
  }
}

export default App
