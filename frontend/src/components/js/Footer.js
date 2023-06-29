import '../css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return(
        <div className='outer-footer'>
            <div className='footer-contact'>
                <p><b>Kontakt</b></p>
                <p>V prípade akýchkoľvek otázok alebo o prípadnej spolupráci nás neváhaj kontaktovať prostredníctvom emailu alebo cez naše sociálne médiá</p>
                <p>weerit@gmail.com</p>
            </div>
            <div className='footer-socials'>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faLinkedin} />
            </div>
            
            <div className='footer-about'>
                <p><b>Weerit.sk</b></p>
                <p>Weerit je projekt, ktorý mňa ako 18 ročného programátora mal skutočne otestovať a uceliť všetko čo som sa o full stack web developmente naučil {'(MERN)'}, tak teda dúfam, že sa ti to tu páči :{')'}</p>
            </div>
        </div>
    )
}

export default Footer;