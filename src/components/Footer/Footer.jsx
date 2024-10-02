import './Footer.css'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className='footer'>
        <p>Developed by Dan Carlton</p>
        <p>{currentYear}</p>
    </footer>
  )
}

export default Footer
