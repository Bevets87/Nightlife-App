import React, { Component } from 'react'
import { bool, func } from 'prop-types'

import IconButton from './IconButton'
import faGlassMartini from '@fortawesome/fontawesome-free-solid/faGlassMartini'

import '../styles/components/Header.scss'

class Header extends Component {
  renderUnauth() {
    const { redirect } = this.props
    return(
      <div className="header__end">
        <button onClick={() => { redirect('/signin') }}>Sign In</button>
      </div>
    )
  }
  renderAuth() {
    const { signoutUser } = this.props
    return(
      <div className="header__end">
        <button onClick={signoutUser}>Sign Out</button>
      </div>
    )
  } 
  render() {
    const { authenticated, redirect } = this.props
    return(
      <div className="header">
        <div className="header__start">
          <IconButton icon={faGlassMartini} text={'NightLife'} className={'logo'} onClick={() => { redirect('/')}} />
        </div>
        {authenticated ? this.renderAuth() : this.renderUnauth()}
      </div>
    )
  }
}

Header.propTypes = {
  authenticated: bool,
  signoutUser: func,
  redirect: func
}

export default Header 