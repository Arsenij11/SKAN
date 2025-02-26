import React from 'react';
import skan from '../icons/6465f70937726c512fe72d7d2f4a4889.png';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <img src={skan} alt="skan logo" />
                <div className="address">
                        <p>г. Москва, Цветной б-р, 40</p>
                        <p>+7 495 771 21 11</p>
                        <p>skan.ru</p>
                        <p>Copyright. 2025</p>
                </div>
            </footer>
        )
    }
}

export default Footer;