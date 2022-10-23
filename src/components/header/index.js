import './index.css';
import { Typewriter } from 'react-simple-typewriter'


const Header = () => {
    return(
        <div className="header-background">
            <div className="max-width">
                <div className='header-row'>
                    <div className='header-text-wrapper'>
                        <h1 className='hero-text-large'>We&nbsp;
                        <Typewriter
                            words={['Know', 'See', 'Feel', 'Know']}
                            loop={5}
                            cursor
                            cursorStyle='_'
                            typeSpeed={400}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                        </h1>
                        <h4 className='hero-text-small'>You're a totally different person.</h4>
                        <h4 className='hero-text-small'>Different from what people see you as.</h4>
                        <h4 className='hero-text-small'>Reveal your darkest desires here, It's a safe space.</h4>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Header;