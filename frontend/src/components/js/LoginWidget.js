import '../css/loginwidget.css';
import GoogleButton from 'react-google-button'
import { useState, useEffect } from 'react';

const LoginWidget = () => {
    const [widgetClass, setWidgetClass] = useState('login-widget-wrapper');

    const google = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self')
    }

    useEffect(() => {
        setWidgetClass('login-widget-wrapper shown')
        setTimeout(() => {
            setWidgetClass('login-widget-wrapper hidden')
        }, 4000)
    }, [])

    return (
        <div className={widgetClass}>
            <div className='login-widget-text-container'>
                <div className='login-widget-title'>
                    <p>Prihlásenie</p>
                </div>
                <div className='login-widget-desc'>
                    <p>Pre pridávanie inzerátov sa musíš najprv prihlásiť</p>
                </div>
                <div className='login-button-wrapper'>
                    <GoogleButton type="dark" onClick={google} />
                </div>
            </div>

        </div>
    )
}

export default LoginWidget;