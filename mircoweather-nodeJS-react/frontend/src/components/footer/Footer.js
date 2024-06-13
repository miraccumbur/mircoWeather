import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
          <div>
              <a href='https://www.instagram.com/miraccumbur/' target='_blank' rel="noreferrer">
                  <img className='footer-icon' src='./icon/instagram.png'alt='instagram'></img>
                  <p>INSTAGRAM</p>
              </a>
              <a href='https://twitter.com/miraccumbur' target='_blank' rel="noreferrer">
                  <img className='footer-icon' src='./icon/twitter.png'alt='twitter'></img>
                  <p>TWITTER</p>
              </a>
          </div>
          <div>
              <a href='mailto:mircoweather@gmail.com'>
                  <img className='footer-icon' src='./icon/mail.png'alt='mail'></img>
                  <p>mircoweather@gmail.com</p>
              </a>
          </div>
          <p>created by mircos</p>
      </div>
    )
  }
}
